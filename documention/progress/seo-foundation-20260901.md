# SEO Foundation Progress Log

## 2026-09-01 — 首批 SEO 前期工程文档（commit 025150a）
- **Date/Commit**: 2026-09-01 / `025150a` (branch: harness-migration)
- **Scope**: ballisticbuddy.com 外贸独立站（防弹玻璃 + 防弹轮胎）SEO 前期工程完成，含实时数据调研与全套规划文档
- **Files**:
  - `documention/plans/seo-foundation/00-project-intake.md` — 项目录入
  - `documention/plans/seo-foundation/01-product-taxonomy.md` — 产品规格体系
  - `documention/plans/seo-foundation/02-competitor-patterns.md` — 竞品模式（ETV 拆解）
  - `documention/plans/seo-foundation/03-keyword-master.csv` — 关键词主表 90+ 词
  - `documention/plans/seo-foundation/04-serp-intent-map.md` — SERP 意图
  - `documention/plans/seo-foundation/05-site-map.md` / `05-url-structure.md` — 站点结构 + URL 规则
  - `documention/plans/seo-foundation/06-content-clusters.md` / `06-messaging-positioning.md` — 内容集群 + 定位文案
  - `documention/plans/seo-foundation/07-money-page-briefs/armored-vehicles-hub.md` — 整车 hub 页 brief
  - `documention/plans/seo-foundation/13-90-day-roadmap.md` — 90 天路线图
  - `.gitignore` — 新增 `.temporary` 忽略规则
- **Validation**: 数据全部来自 treg-seo 实时调用（dataforseo keywords.ideas/volume/serp/domain.ranked_keywords），共花费 $0.62，未编造数字；关键词/竞品/意图均可溯源
- **Deployment Notes**: 纯文档变更，无代码/无 DB/无 env 变更，无需部署。域名（ballisticbuddy.com）尚未购买绑定，素材（测试报告/打靶视频/规格书）待业务方提供后方可进入 roadmap 阶段 1（建 money page）

## 2026-09-03 — SEO Page Foundation 基建落地（commit 87836d8，分支 feat/i18n-next-intl-a）
- **Date/Commit**: 2026-09-03 / `87836d8`
- **Scope**: 关闭 GitHub issues #1-3（SEO Page Foundation）：
  1. **next-intl UI copy 字典**（issue #1）：`messages/*.json`（6 locale）扩展 Navigation/NotFound/Search/Posts/Pagination/Theme/Common/PlaceholderImage/Blocks 命名空间；Header Nav、not-found、search、posts、Card、PageRange、Pagination、ThemeSelector 硬编码字符串全部提取为 `useTranslations`/`getTranslations`。
  2. **多段 URL 路由**（issue #2）：`[locale]/[slug]` → `[[...slug]]` catch-all；slug 数组 join 成全路径查询；Pages collection 新增 `path` 字段 + 校验（`slugField` 默认 slugify 会剥掉 `/`，按 issue 方案加自定义字段）；`generatePreviewPath`/PayloadRedirects/CMSLink/generateMeta/pages-sitemap 全部支持 `path || slug`；`[locale]/page.tsx` 删除，home 由 catch-all 空 slug 承接（Next 16 不允许 `page.tsx` 与可选 catch-all 同特异性共存）。
  3. **语义 blocks + 占位图**（issue #3）：新增 FAQ（含 FAQPage JSON-LD）、Pricing（必填 disclaimer）、SpecTable、StatBand、TrustBand、VehicleDiagram 六个 block + `PlaceholderImage` 组件，全部字段 `localized: true`，注册进 Pages collection layout 与 RenderBlocks。
- **Files**: `messages/*.json`、`src/app/(frontend)/[locale]/[[...slug]]/*`（原 `[slug]` 重命名）、`src/collections/Pages/index.ts`、`src/blocks/{FAQ,Pricing,SpecTable,StatBand,TrustBand,VehicleDiagram}/`、`src/components/PlaceholderImage/`、`src/components/{Card,Link,PageRange,PayloadRedirects}/`、`src/components/ui/pagination.tsx`、`src/providers/Theme/ThemeSelector/`、`src/search/Component.tsx`、`src/utilities/{generateMeta,generatePreviewPath}.ts`、`src/app/(frontend)/(sitemaps)/pages-sitemap.xml/route.ts`、`src/migrations/20260903_074333.{ts,json}`（含 `pages.path` + `_pages_v.version_path` 列）、`src/payload-types.ts`、`.gitignore`（忽略 `dev-output.log`）
- **Validation**: `pnpm payload generate:types` ✓；`pnpm exec tsc --noEmit` ✓；`pnpm lint` 0 errors（169 既有 warnings，无新增）；`node scripts/check-guardrails.mjs` PASS；`pnpm build` ✓（catch-all 路由正确生成）；dev server 实测：`/products/bulletproof-vehicle-glass` 与 `/en/products/bulletproof-vehicle-glass` 200 且渲染正文、`/` `/posts` `/search` 200、未知路径 404；`/next/seed` 建测试页后已删除。
- **Deployment Notes**: 已对 Neon 生产库执行 `pnpm payload migrate`（迁移 `20260903_074333`，仅 ADD COLUMN/CREATE TABLE，无数据丢失；需在 migrate 确认提示输入 `y`）。上线前注意：给多段页面在 admin 填 `path` 字段（如 `products/bulletproof-vehicle-glass`）；home 用空 slug 承接（勿再建 `[locale]/page.tsx`）；新增 UI 文案走字典，CMS 正文走 Payload localized 字段。
