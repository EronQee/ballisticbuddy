## BallisticBuddy Agent Playbook

### 1) Role and mission
- You are a practical coding agent for this repository.
- Default user communication language is Chinese; keep technical terms in English when needed.
- Convert simple requests into safe, production-aware implementation steps.
- Prefer minimal, reversible changes over broad refactors.

### 2) Project reality (source of truth)
- Fullstack: Payload CMS 3.x (monolithic, served alongside the site) + Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- Config: `src/payload.config.ts`; collections in `src/collections/`; globals in `src/globals/` (Header/Footer)
- Frontend routes: `src/app/(frontend)/`; admin/API under `src/app/(payload)/`
- Database: Vercel Postgres (`@payloadcms/db-vercel-postgres`); local dev via `docker-compose.yml`
- Media: Cloudflare R2 / S3-compatible (`@payloadcms/storage-s3`)
- Tests: vitest (`vitest.config.mts`) + Playwright (`playwright.config.ts`)
- Build quality: ESLint (`eslint.config.mjs`) + `tsc --noEmit`
- Package manager: pnpm (single root package, not a workspace)
- Deploy: Vercel (`vercel.json`, `next-sitemap` postbuild)

### 3) Core operating rules
- Understand first, edit second: inspect related routes/components/services before writing code.
- Follow repository facts, not assumptions from memory.
- **Search before grind (hard rule): when a mature technology (Payload, Next.js, npm/pnpm, Docker…) misbehaves, search externally FIRST for existing solutions — web search + `gh search issues` + official docs — and only reverse-engineer locally when no answer exists.** Most bugs are already solved upstream.
- For risky or ambiguous operations, present 2-3 options before execution.
- Always include one recommended option with reason, tradeoffs, and rollback note.
- Do not silently modify env/secrets/deploy settings/database behavior.
- Do not mix unrelated cleanup into delivery work.

### 4) Standard workflow
1. Confirm intent: what to change and how success is measured.
2. Impact scan: identify affected paths (`src/app/`, `src/components/`, `src/collections/`, deployment files).
3. Implement smallest safe change.
4. Validate with relevant commands.
5. Report clearly: change summary, rationale, validation, remaining risk.

### 5) Daily command reference
- `pnpm install`
- `pnpm dev` (Next.js dev, serves Payload admin + frontend together)
- `pnpm build` (runs `next build` + `next-sitemap` postbuild)
- `pnpm start`
- `pnpm lint` (ESLint)
- `pnpm exec tsc --noEmit` (typecheck)
- `pnpm test:int` (vitest) / `pnpm test:e2e` (Playwright)
- `pnpm payload` (Payload CLI: `migrate:create` / `migrate` / `generate:types`)

### 6) Risk tiers and decision policy
- Low risk: copy/content updates, isolated style tweaks, local component bug fixes
- Medium risk: shared state flow, API/block mapping updates, middleware behavior, collection field additions (non-destructive)
- High risk: auth/permissions, DB config, migrations on production, schema/content-model changes, deploy pipeline changes

Before high-risk execution, provide:
- Recommended plan and reason
- Alternative plan and tradeoff
- Explicit rollback path

### 7) Code map
- Frontend routes: `src/app/(frontend)/`
- Payload admin + API routes: `src/app/(payload)/`
- Layout builder blocks (schema + frontend render): `src/blocks/`
- Collections: `src/collections/`; Globals: `src/globals/` (Header, Footer)
- Hooks / access control: `src/hooks/`, `src/access/`
- Data fetching helpers: `src/app/(frontend)/_api/`, `src/app/(frontend)/_hooks/`
- Utilities: `src/utilities/`

### 7.5) Harness system (how this agent is wrapped into a reliable loop)
- Harness blueprint: `documention/harness/README.md` — the four subsystems
  (agentic loop, skills, memory, guardrails) mapped to this repo's assets.
- **Long-term engineering memory: `documention/harness/MEMORY.md`** — reusable
  pitfalls and hard rules distilled from `documention/progress/` (daily logs).
  Before doing anything that smells like a known trap (Payload schema migration,
  `.next` cache, draft/publish, media revalidation, etc.), read the relevant MEMORY section.
- Standard implementation loop: `.agents/skills/implement/SKILL.md` — spec →
  baseline → implement → gate suite → independent review → log → memory curation.
- Guardrail gate (deterministic, CI-enforced): `node scripts/check-guardrails.mjs`
  — banned internal terms on user-facing surfaces.
- Maintenance rules:
  1. New pitfall/lesson → append to `documention/harness/MEMORY.md` (not only progress logs).
  2. New skill → follow `.agents/skills/writing-great-skills` and ensure
     `.agents/skills/ask-matt` can route to it.
  3. New verification assertion → add to `scripts/check-guardrails.mjs` (or a
     test), never only in agent memory.
  4. Guardrails are only added, never silently removed; denied/warned actions
     are signals to improve prompts, not to loosen the gate.
  5. Every loop is capped: implementation iterations, review rounds, and
     re-plans have explicit limits; exceeding them = spec problem → escalate.

### 8) Definition of done
- Change exactly matches user intent with no hidden side effects.
- Relevant checks were run and passed.
- Validation steps are documented.
- Known gaps/risks are explicitly stated with next actions.

### 9) User-facing copy rules (mandatory)
- Never expose internal tooling, process, or verification terminology on any user-facing surface:
  pages, copy, FAQ, schema, metadata, alt text, emails, or landing content.
- Internal verification jargon (RAG, ticket IDs, internal source names, process names)
  is a hard no on user-facing surfaces — a visitor should never read a tool, only a product fact.
- Verify-by-usage: if a word or phrase would only make sense to the team, it does not belong on the page.
- Verification notes belong in code comments only, never in rendered HTML.
- When reviewing any page before merge, grep for internal jargon that leaked.

### 10) Pause-and-resume archive rule (mandatory)
- If a requirement is not finished and the user indicates "do it another day" (pause/defer/schedule later), the agent must create an archive note in:
  - `documention/plans/ongoing/`
- This archive note is required before ending the session.
- Recommended filename format:
  - `<topic>-progress-YYYYMMDD-HHmm.md`
- Minimum required sections in the archive note:
  - `Context`: user goal and current boundary
  - `Done`: completed changes with file paths
  - `Pending`: clear next tasks
  - `Blockers`: open issues/risks/decisions needed
  - `Resume Steps`: exact commands/files to restart quickly

### 11) Post-push progress log rule (mandatory)
- After every successful `git push`, the agent must update or create a progress record in:
  - `documention/progress/`
- This log update is required in the same turn as the push; do not skip it.
- Preferred behavior:
  - If the task belongs to an existing progress file, append a new dated section.
  - If no suitable file exists, create a new file with a clear topic-based name.
- Minimum required items per push log entry:
  - `Date/Commit`: date and commit hash pushed
  - `Scope`: what changed (high level)
  - `Files`: key file paths touched
  - `Validation`: commands/checks run and result
  - `Deployment Notes`: anything required to deploy safely (env, restart, migration, cache)
