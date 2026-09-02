# 验证清单

> 改动后必跑的验证步骤。每次会话必加载。

| 命令 | 何时 |
|---|---|
| `pnpm exec tsc --noEmit` | 任何 TS/TSX 改动后 |
| `pnpm lint` | 任何代码改动后 |
| `pnpm build` | 路由/页面/组件改动后 |
| `node scripts/check-guardrails.mjs` | 任何用户可见文案改动后 |
| `pnpm test:int` / `pnpm test:e2e` | 逻辑/渲染契约改动后 |

补充规则：

- 新增可验证断言 → 进 `scripts/check-guardrails.mjs`（或测试），不要只写在记忆里。
- 视觉/渲染验证遵守 `troubleshooting.md` 的截图硬规则（文本断言优先）。
- 新建/改造页面另见 `new-page.md` 的逐项核对清单。
