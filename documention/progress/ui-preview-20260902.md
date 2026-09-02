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