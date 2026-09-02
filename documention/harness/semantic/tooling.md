# 工具 / 脚本约定

> 持久事实：guardrail 扫描、正则、PowerShell 陷阱。按需加载（路由见 INDEX.md）。

- **banned-terms 正则小心误报**：按词边界或整词匹配，别裸用 `-match 'XXX'` 当证据
  （如 "paragraphs" 含 "rag" 子串）。
- PowerShell 里给 node 脚本传 `$` 要用单引号包 node -e 整段，或 `` ` `` 转义。
- 写 JSON 带 UTF-8 BOM 会让 Turbopack 报 invalid JSON（详见 semantic/i18n.md 工具链陷阱）。
- 脚本新增验证断言时，追加到 `scripts/check-guardrails.mjs`，不要只写在 agent 记忆里。
