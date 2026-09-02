# ui-preview 动效统一 framer-motion — 待办归档

## Context
用户已确认用 framer-motion 统一 /ui-preview 各组件动效（此前 Road 用 CSS `linear()` 弹簧采样实现，
其余组件仍用手写 scroll listener / CSS transition）。用户指示"先 push 现有变更到最新分支再说"，
动效统一工作推迟到后续会话。

## Done（已随 89d1c1f 推送）
- 引入 `framer-motion@^13.1.1` 依赖
- Road 卡片：CSS `linear()` 阻尼弹簧（超调/振荡）+ 复合 3D transform + 星星分层角动量 + IO 触发
- 其余组件（Header/Hero/About/Services/Metrics/Testimonials/Invite/Footer）为 CSS/手写实现，未迁移

## Pending
1. 建 `src/utilities/motion.ts`：统一 `EASE = [0.16,1,0.3,1]`、`SPRING = { type:'spring', stiffness, damping }` 常量
2. Header：`AnimatePresence` 菜单退场动画（目前收起瞬间消失）
3. About：手写 scroll listener + setState → `whileInView`/`useInView`（消性能问题）
4. Services：手写 scroll listener → `useScroll()` + `useTransform()`
5. Testimonials：6 属性手写 transition → `layout` prop（FLIP）
6. Road：CSS `linear()` 采样 → framer-motion `spring`（真物理，兼容旧浏览器）
7. Metrics count-up：可评估是否保留自写 hook（已达标，非必须迁移）

## Blockers
- 无。均为低风险纯前端改动，各自可独立回滚。

## Resume Steps
1. `pnpm dev` → 打开 http://localhost:3000/ui-preview
2. 建 `src/utilities/motion.ts` 常量，从 Pending 顺序 2→6 逐个迁移组件
3. 每组件迁移后 `pnpm exec tsc --noEmit` + `pnpm lint`
4. 完成后按 §11 追加本文件为 progress 记录