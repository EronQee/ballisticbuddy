# i18n B 期 + proxy 修复 + harness 三层重构 — progress log

## Date/Commit
- 2026-09-03 / `82e8c57`（B 期）、`65685b4`（proxy 修复）、`4294c26`（harness 重构）
- 分支 `feat/i18n-next-intl-a` 推送 origin

## Scope
1. **i18n B 期**（09-02 会话完成，本次入库）：Payload `localization` + 字段级
   `localized: true`（迁移 `20260902_081821_localization.ts`，已对 Neon 执行）；
   前台按 locale 查内容（`getPayloadLocale` 收窄）；pages/posts-sitemap 6 locale
   hreflang + x-default；Header/Footer/CMSLink/Card/Pagination/Search 换
   `createNavigation` Link；B 期 4 产出 n8n 翻译管线 API 文档。
2. **proxy matcher 修复**：matcher 排除 `ui-preview|uitest|uitest2`，
   修复 `(preview)` 路由被 next-intl middleware 改写进 `[locale]/[slug]` 兜底 → 404。
3. **harness 记忆重构**：单文件 MEMORY.md 拆为三层
   （semantic/episodic/procedural）+ INDEX.md 路由索引 + 必加载清单；
   新增 procedural/new-page.md（新建页标准流程：matcher 同步、字典直写文案、
   主题门、noindex）与 agent-behavior.md；新增 scripts/consolidate-memory.mjs
   （dry-run 建议器，永不自动写文件）；MEMORY.md → MEMORY.md.deprecated 冻结；
   AGENTS.md §7.5、implement skill、n8n 文档引用同步更新。

## Files
- B 期：`src/payload.config.ts`、`src/collections/{Pages,Posts}`、`src/blocks/*`、
  `src/i18n/*`、`src/i18n/getPayloadLocale.ts`（新）、
  `src/app/(frontend)/(sitemaps)/localized.ts`（新）+ 两个 sitemap route、
  `src/migrations/20260902_081821_localization.{ts,json}`（新）、
  `src/components/*`、`next-sitemap.config.cjs`、
  `documention/plans/ongoing/n8n-payload-translation-api.md`（新）
- proxy：`src/proxy.ts`
- harness：`documention/harness/{INDEX.md,README.md,MEMORY.md.deprecated,
  semantic/*,procedural/*,episodic/*}`、`AGENTS.md`、
  `.agents/skills/implement/SKILL.md`、`scripts/consolidate-memory.mjs`（新）

## Validation
- `pnpm exec tsc --noEmit` — 0 错误
- `pnpm lint` — 0 错误（17 条既有 unused 警告，与改动无关）
- `node scripts/check-guardrails.mjs` — PASS
- `pnpm build` + postbuild sitemap — 成功
- `node scripts/consolidate-memory.mjs` — dry-run 正常输出
- B 期冒烟（09-02 会话已验）：`/` `/pt` `/ar`(rtl) 等 6 locale 200、
  `/admin/login` 200、sitemap hreflang 实测互备

## Deployment Notes
- **无新增 env**；迁移文件已在 repo，生产库首次部署前需跑一次
  `pnpm payload migrate`（或配 `prodMigrations`）——`vercel.json` build 目前
  不含 migrate 步骤（i18n B 期计划文档遗留观察项）。
- proxy matcher 变更随部署生效；部署后建议冒烟：`/ui-preview` 200、
  `/pt` `/ar` 200、`/sitemap.xml` 含 hreflang。
- 分支推送，未合并 main；合并节奏由用户决定。
