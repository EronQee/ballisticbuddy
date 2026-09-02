# proxy matcher 劫持 / 新页面文案欠债事件（2026-09-03）

> 事件复盘：一次 404 排查 + 一次 agent 默认行为对话，产出四条长期规则。

## 发生了什么

1. i18n A 期（0f27edb，09-02）新增 `src/proxy.ts`，matcher 用 next-intl 官方推荐式
   排除，未考虑 09-01 已上线的 `(preview)` 路由 → `/ui-preview` 被改写成
   `/en/ui-preview` → `[locale]/[slug]` 兜底查 Payload 失败 → 404。
2. 同日用户追问："如果我不提 next-intl，你新建页面是不是会硬编码文案、事后让我
   自己提取？"——诚实回答是"会"（仓库惯例是硬编码 + 规则不在必读路径），用户
   要求把正确默认固化。

## 根因

- 技术侧：matcher 排除列表没有随新路由组维护；i18n 验证只测了 `[locale]` 内正式路由。
- 流程侧：「新页面文案走字典」「预览路由同步 matcher」两条知识只存在于 plan 文档，
  不在任何必读路径上——知识靠"碰巧读到"必然漏。

## 产出

- **事实**：proxy matcher 劫持机制与修复 → `../semantic/i18n.md`
- **硬规则**：新页面文案从第一行走字典；预览路由同步 matcher → `../procedural/new-page.md`
- **行为规则**：仓库惯例≠正确默认；"你是不是会 X"= 默认行为检验信号 →
  `../procedural/agent-behavior.md`
- guardrails 增量检查（扫描硬编码文案）留待存量字典债还清后再上（当前误报率高）。
