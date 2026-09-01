# Harness 体系迁移 — progress log

## 2026-09-01 — commit 8821746 (branch `harness-migration`, pushed to origin)

### Scope
将 elevatoX 项目的 harness 体系迁移并适配到 ballisticbuddy（Payload CMS + Next.js 16 技术栈），
分两批落地：核心 harness（第一批）+ treg-seo / seo-agent-workflow（第二批）。

### Files
- `AGENTS.md` — 新建，Agent Playbook（Payload/Next 命令与代码图、§7.5 harness、§9-11 规则）
- `documention/harness/README.md` — 四子系统蓝图，映射改为本仓库资产
- `documention/harness/MEMORY.md` — 长期记忆框架，清空 Strapi/SEO 专属内容，按本栈重建基线
- `documention/progress/` / `documention/plans/ongoing/` — 目录骨架
- `.agents/skills/` — 15 个技能：
  - 核心闭环：implement, code-review, handoff, to-spec, to-tickets, grilling 系列,
    prototype, wayfinder, writing-great-skills, ask-matt（适配本地 tracker、移除 Strapi 引用）
  - treg-seo（凭证 `.treg/config.json` 未迁移，gitignore 排除）
  - seo-agent-workflow（全量复制，含 ud-machine 案例 reference）
- `scripts/check-guardrails.mjs` — 通用 banned-terms 门禁骨架
- `package.json` — 新增 `check:guardrails` 脚本
- `.gitignore` — 新增 `.agents/skills/treg-seo/.treg/`

### Validation
- `node scripts/check-guardrails.mjs` → PASS
- `treg_call.py call ... --dry-run` → 正常（$LASTEXITCODE=0）
- 所有迁移文件 UTF-8 无损（21 文件 treg/seo + 27 核心文件抽查）
- 跨 skill 引用全部指向已迁移文件；无 elevatoX/Strapi 残留引用
- git 确认无 treg 凭证被 stage

### Deployment Notes
- 无需 env / migration / restart；纯仓库资产新增。
- 使用 treg-seo 前需在本地放 `.agents/skills/treg-seo/.treg/config.json` 或设 `TREG_TOKEN`。
- `seo-agent-workflow` 依赖的 `docs/seo-reverse-ud-machine/`、`ahrefs-seo-guide.md` 为
  elevatoX workspace 专属源材料，本仓库暂缺（文档标注 "when available"），属预期。

## 2026-09-01 — commits eb8d3b3 + 44a4eda (branch `harness-migration`, pushed to origin)

### Date/Commit
- 2026-09-01 / `eb8d3b3` — ESLint 修复
- 2026-09-01 / `44a4eda` — guardrail + MEMORY 沉淀

### Scope
1. 修复 `pnpm lint` 崩溃：`eslint-config-next@16` 已改为原生 flat config，
   旧 `eslint.config.mjs` 经 FlatCompat 转换触发 `@eslint/eslintrc` 循环引用
   TypeError。改为直接导入 `eslint-config-next/core-web-vitals` 与
   `eslint-config-next/typescript`。修好后 linter 首次真正运行，清理全部 8 个
   存量 error：PreviewRoad 转义实体（真修复）；Card/useClickableCard 返回结构
   扁平化消除 react-hooks/refs 误报（真修复）；Theme/ThemeSelector/Header/
   PreviewAbout 的 SSR 水合 setState-in-effect 逐行 disable 并注明原因。
2. guardrail 新增 check 2（html-theme-gate）：自带 `<html>` 的 route-group
   layout 必须设 `data-theme` 或挂 `<InitTheme />`，否则被 globals.css
   `html { opacity: 0 }` 主题门整路由隐形；对应 MEMORY 新增 3 条踩坑记忆。

### Files
- `eslint.config.mjs`
- `src/utilities/useClickableCard.ts`、`src/components/Card/index.tsx`
- `src/providers/Theme/index.tsx`、`src/providers/Theme/ThemeSelector/index.tsx`
- `src/Header/Component.client.tsx`
- `scripts/check-guardrails.mjs`、`documention/harness/MEMORY.md`

### Validation
- `pnpm lint` → 0 errors（剩 13 条存量 warnings，不阻塞）
- `pnpm exec tsc --noEmit` → 通过
- `node scripts/check-guardrails.mjs` → PASS

### Deployment Notes
- 无需 env / migration / restart；纯 lint 配置与脚本资产变更。
- `@eslint/eslintrc` devDependency 已无代码引用，暂留未删（可选后续清理）。
- 未跟踪的 `src/components/ui-preview/`、`src/app/(preview)/`（ui-preview 功能，
  调试中）有意未提交；`PreviewRoad/PreviewAbout` 的 lint 修复在其中，随功能一起提交。
