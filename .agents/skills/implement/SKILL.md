---
name: implement
description: "Implement a piece of work based on a spec or set of tickets, using the standard BallisticBuddy closed loop (plan → baseline → implement → verify gate → independent review → log → memory curation)."
disable-model-invocation: true
---

# Implement — BallisticBuddy Standard Closed Loop

Run the work through the harness loop defined in `documention/harness/README.md`.
The generator (you) must not be the judge of your own work — verification and
review are separate, explicit gates (harness principle: never grade your own exam).

## When to Use

- User asks to implement a spec, ticket, or issue.
- You are about to make code changes that need verification.

## The Loop

```
1. SPEC    — restate goal + acceptance criteria (from issue/spec/ticket)
2. BASELINE— run the pre-change gates so you know the starting state
3. IMPLEMENT— smallest safe change; run typecheck regularly
4. VERIFY  — run the full gate suite (below); iterate capped
5. REVIEW  — /code-review (independent, adversarial)
6. LOG     — commit + progress log (AGENTS.md)
7. MEMORY  — write any reusable pitfall to documention/harness/MEMORY.md
```

## 1. Spec — Acceptance Criteria First

Before writing code, state in one or two lines:
- **Goal**: what the work must achieve.
- **Acceptance**: the observable checks that prove it. (A vague goal like "improve
  the page" has no stop condition — make it checkable: "render published content
  from Payload when present; show fallback otherwise".)
- **Boundary**: what is explicitly out of scope (avoid scope creep).

## 2. Baseline

Run the gates **before** changing anything and record the result. A change that
passes a baseline that was already failing proves nothing.

## 3. Implement

- Make the smallest safe change. One bounded change at a time (easier to verify,
  easier to undo).
- Use tests where possible, at pre-agreed seams.
- Follow repository facts (AGENTS.md, MEMORY.md, existing code) — inspect
  adjacent files/services before writing.

## 4. Verify — The Gate Suite (mandatory)

Run in this order after each meaningful change; **all must pass**:

| Gate | Command | When |
|---|---|---|
| Typecheck | `pnpm exec tsc --noEmit` | after any TS/TSX change |
| Lint | `pnpm lint` | after any code change |
| Guardrails | `node scripts/check-guardrails.mjs` | after any user-facing copy / schema content change |
| Tests | `pnpm test:int` | after any logic / rendering contract change |

Build (`pnpm build`) once at the end.

**Iteration cap**: if a gate keeps failing after ~3 focused fixes with no
progress toward green, STOP and surface to the user — this is a spec problem,
not an execution problem. Do not loop indefinitely.

## 5. Review — Independent Judge

Once the gates are green, run `/code-review` to review the work. You must not
self-approve: the reviewer is a separate pass over the diff (standards + spec).

## 6. Log

- Commit to the current branch (never push unless asked).
- After any `git push`, update/create the progress log under
  `documention/progress/` per AGENTS.md.

## 7. Memory Curation

If you hit something a future agent would hit again (a Payload quirk, a cache
gotcha, a schema trap), append it to `documention/harness/MEMORY.md` — even a
one-line note. This is what turns the harness from documentation into a
learning system. Check existing MEMORY entries first to avoid duplicates.

## Stop Conditions

The loop is done when: gates green → review passed (or issues fixed and
re-verified) → committed → logged → memory curated. Anything else means the
task is NOT done — report status honestly, don't declare completion early
(context anxiety warning: do not rush to "done" just because the session is long).
