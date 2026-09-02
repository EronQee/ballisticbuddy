# ui-preview 白屏事件（2026-09-01）

> 事件复盘：一次"HTTP 200 但全白"的调试，产出两条长期规则。

## 发生了什么

`/ui-preview` 页面 HTTP 200、DOM 完整、控制台 0 报错，但视觉全白。初期只查 DOM
得出"页面正常"的误判，浪费一轮排查。

## 根因

`(frontend)/globals.css` 末尾的 `html { opacity: 0 }` 主题门：`(preview)/layout.tsx`
自带 `<html>` 但没设 `data-theme`，选择器永远不匹配，整路由永久隐形。

## 产出

- **事实**：主题门机制 → `../semantic/frontend.md`
- **方法论**：DOM 验证 ≠ 视觉正确；截图验证契约 → `../procedural/troubleshooting.md`
- **门禁**：`scripts/check-guardrails.mjs` check 2（html-theme-gate）
- **流程**：自带 `<html>` 的 layout 防主题门 → `../procedural/new-page.md`
