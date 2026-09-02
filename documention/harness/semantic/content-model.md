# 数据模型 / 内容流坑

> 持久事实：Payload collections 与前端渲染的契约。按需加载（路由见 INDEX.md）。

- 内容以 Payload collections 为准（`src/collections/`），**不要仅凭本地 seed 或代码
  fallback 推断线上数据状态**。查线上用 Payload REST/GraphQL API 或 admin。
- Payload `pages` 的 layout builder blocks 与前端渲染的 block 组件一一对应；
  新增 block 必须同时改 `src/blocks/` 的 schema 与前端渲染分支，否则 admin 存了
  前端不渲染（静默丢失）。
- `search` 插件索引是异步生成的，改动内容后搜索结果显示有滞后属正常。
- CMS 正文本地化走 Payload `localized` 字段按 locale 录入（B 期已落地），
  **不进 `messages/*.json` 字典**；字典只装静态 UI 文案。翻译管线计划见
  `documention/plans/ongoing/n8n-payload-translation-api.md`。
