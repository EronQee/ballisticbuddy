# ui-preview 页面打磨 — progress log

## 2026-09-02 — commit 89d1c1f (branch `harness-migration`, pushed to origin)

### Scope
`s /ui-preview` 页面八组件统一打磨 + 引入 framer-motion 依赖 + harness 文档补充。
包含此前二次迁移日志中标记"调试中、有意未提交"的 `src/components/ui-preview/`、
`src/app/(preview)/` 全量（含 uitest/uitest2 临时路由）。

### Changes / Files
- `src/app/(preview)/ui-preview/page.tsx` — 外包统一 wrapper `padding: 0 12px`
- 组件级 padding 恢复：Hero `24px`、About `120px`、Services `0 120px`、
  Testimonials `120px`、Road `240px 120px`（含各响应式断点还原）
- `PreviewHeader.tsx` — 去 `min-h-screen`，menu 改 absolute overlay（`padding: 24px 0 48px`、
  `justify-content:center`、`gap:240px`、`min-height:600px`、`perspective(1200px)`），
  默认折叠，fold/unfold 不占布局；header 根 padding `12px 0`；菜单样式落入
  `.framer-menu-overlay` 类（替换 Tailwind 布局类，不再依赖 JIT 扫描）
- `PreviewHero/PreviewAbout/PreviewServices.tsx` — 按钮 pointer/stem 水平居中对齐
  （stem 改 `top:50% + translateY(-50%)`，消除指针/杆缝隙），About 按钮 `nowrap`
- `PreviewMetrics.tsx` — 按 `.temporary/UI组件转换/DATA.txt` 还原原版动效：
  count-up（useCountUp）、IntersectionObserver 进入、逐格错峰、中线 scaleY、hover 微交互
- `PreviewRoad.tsx` — 卡片动效升级为阻尼弹簧：CSS `linear()` 弹簧采样曲线
  （CARD/STAR 两条，含超调/振荡）、复合 3D transform（perspective+translateY+scale+rotateX）、
  星星分层角动量（rotate 223°→323.64°，独立 1.25s+0.12s 延迟）、IntersectionObserver 触发
- 新增依赖 `framer-motion@^13.1.1`（后续统一动画将用它替换手写 scroll listener 与 CSS 采样）
- `documention/harness/MEMORY.md` + `README.md` — 新增"Playwright 截图不得由 agent
  自行调用"硬规则（非多模态 agent 无法读图，视觉验证用文本/DOM/computed-style 断言
  或交人工/多模态 agent）
- `.gitignore` — 新增 `.playwright-cli/`、`*.tsbuildinfo`

### Validation
- `pnpm exec tsc --noEmit` → 通过
- `pnpm lint` → 0 errors（13 存量 warnings）
- `node scripts/check-guardrails.mjs` → PASS
- Road 弹簧动画文本断言（headless, computed-style）：`translateY 120→0（超调到 -2.3）`、
  `scaleX 0.94→1.0015→1.0`、`opacity 0→1`；`framer-motion` 可由 node ESM resolve

### Deployment Notes
- 无需 env / migration / restart。
- `framer-motion` 为纯前端依赖，next build 会正常打包。
- 已知待办：其余组件动效统一到 framer-motion（About/Services 手写 scroll listener 性能、
  Header 退场动画、Testimonials layout 过渡、统一动效常量）——用户已确认用 framer-motion 统一，待下轮实施。

## 2026-09-03 — commit 7706ce5 (branch `feat/i18n-next-intl-a`, pushed to origin)

### Scope
`/ui-preview` 页面全局 CSS 蒸馏：全部组件内联 `<style>` 收敛进全局样式表，去除
framer 命名（类名/CSS 变量/`data-framer-*` 属性），命名改为语义化 BEM 风格。

### Changes / Files
- **新增** `src/app/(frontend)/ui-preview.css` — 蒸馏产物：设计 tokens
  （`--color-ink/paper/accent/line/blush`、`--ease-*`、`--font-display/serif`）、
  共享排版 preset（`.eyebrow/.display-lg/.display-md/.card-title/.text-body/.overline`）、
  各区块 BEM 类（`hero__*`、`metrics__*`、`about__*`、`services__*`、`workflow__*`、
  `testimonials__*`、`invite__*`、`site-footer__*`、`nav-overlay__*`）
- `globals.css` — 顶部引入 Google Fonts `@import`（CSS @import 必须前置，否则
  Turbopack 报 "Parsing CSS source code failed"）+ `@import './ui-preview.css'`；
  body 基础样式改品牌 token（Montserrat + paper 背景 + ink 前景）
- 删除 `PreviewGlobalStyles.tsx`（内容并入 ui-preview.css）
- 组件移除所有 `<style>` 块；framer 命名全部重命名：
  - 类：`framer-nav-link`→`nav-overlay-link`、`framer-hero-*`→`hero__*`、
    `framer-metric-*`→`metrics__*`、`framer-styles-preset-*`→共享排版类、
    `framer-1eoihhm`→`metrics`、`framer-i4ynwr`→`metrics__divider`、
    `svc/rd/tm/iv/ft` 缩写 → `services/workflow/testimonials/invite/site-footer` 语义块
  - 变量：`--token-<uuid>`/`--framer-ease`/`--framer-font-family` → 语义 tokens
  - 属性：`data-framer-name`、`data-framer-page-link-current`、`data-highlight`、
    `data-reset`、`data-border`（无 CSS 引用处）删除；About 按钮 `::after` 边框
    改用 `.about-cta__pointer::after` 选择器
- `(preview)/layout.tsx` — metadata description 去掉 "Framer 模板" 字样

### Validation
- `pnpm exec tsc --noEmit` → 通过
- `pnpm lint` → 0 errors（warnings 均为存量：lineRefs exhaustive-deps、next/image 等）
- `node scripts/check-guardrails.mjs` → PASS
- `pnpm build`（含 postbuild next-sitemap）→ 成功；曾遇 CSS @import 顺序报错，
  已将字体 @import 移至 globals.css 顶部修复
- DOM 验证（prod server, port 3100）：新类名存在、旧 framer 类名/变量/data 属性全无

### Deployment Notes
- 无需 env / migration / restart。
- 遗留（内容层，未动）：`framerusercontent.com` 图片 URL、`roman24.framer.website`/
  `framer.com` 外链、footer "Framer" 文案——属素材/内容，不在 CSS 命名范围。
- `dev-output.log` 未跟踪未提交（本地构建日志）。
