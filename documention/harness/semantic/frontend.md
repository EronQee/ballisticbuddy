# 前端 / 构建坑

> 持久事实：Next.js dev/prod 服务、缓存、构建产物、主题门。按需加载（路由见 INDEX.md）。

## 服务与端口

- **端口冲突**：`next start` EADDRINUSE 时是旧实例占着；先 `Get-NetTCPConnection
  -LocalPort <port>` 找 OwningProcess 再停，别猜。
- **两个实例同时读写 `.next`** 会报 `Cannot find module './NNN.js'`——验证时停旧
  服务、清 `.next` 再 rebuild。

## 缓存

- Next.js 缓存：改了内容本地看不到效果先怀疑缓存（`next start` 场景），别急着改代码。

## 构建产物与 sitemap

- `pnpm build` 后 `postbuild` 会跑 `next-sitemap`（见 `next-sitemap.config.cjs`）；
  新增路由后确认 sitemap 正确收录，别只信 `next build` 的产物。

## 全局 CSS 的 @import 顺序（2026-09-03，Turbopack 报错实锤）

- Tailwind v4 里外部字体 `@import url(...)` 必须放在 `globals.css` **第一行**
  （所有 `@import` 前、其他规则前）。若放在被引入的子文件（如
  `./ui-preview.css`）里，Turbopack 内联后会被推到规则后，报
  `Parsing CSS source code failed` + `@import rules must precede all rules`。
- 约定：Google Fonts 等外部 `@import` 一律放 `globals.css` 顶部第一条；
  本地样式蒸馏文件（`ui-preview.css`）只含 tokens + 类规则，不含外部 @import。
- 关联：`src/app/(frontend)/ui-preview.css` 是全局品牌样式唯一来源
  （类名 BEM 扁平、tokens 语义化 `--color-*`/`--ease-*`/`--font-*`）；
  改品牌样式先搜这里，别回填组件内联 `<style>`。

## `globals.css` 的 `html { opacity: 0 }` 主题门（2026-09-01，实锤踩坑）

- `(frontend)/globals.css` 末尾有 `html { opacity: 0 }`，只有
  `html[data-theme='light'|'dark']` 才恢复显示（防主题闪烁的 trick）。任何
  **自带 `<html>` 的 route-group layout**（如 `(preview)/layout.tsx`）若不设
  `data-theme` 或不挂 `<InitTheme />`，整个路由**永久隐形**。
- 症状极具迷惑性：HTTP 200、DOM/文本完整、滚动条正常很长、控制台 0 报错——就是全白。
- 修复：`(preview)/layout.tsx` 的 `<html>` 加 `data-theme="light"`（静态预览路由够用；
  动态路由用 `<InitTheme />`）。
- 已有 CI 断言：`scripts/check-guardrails.mjs` check 2（html-theme-gate）。
- 事件复盘见 `../episodic/ui-preview-whiteout-20260901.md`。
