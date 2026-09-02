# 新建页面标准流程

> 触发词：新建页面 / 新 route / 新预览页 / 改造页面。每次命中必读本文件。

## 1. 定路由与分组

- 正式页面 → `src/app/(frontend)/[locale]/`（进 i18n、sitemap、hreflang）。
- 内部预览页 → `src/app/(preview)/`（robots noindex）。
  **必须同步把路径加进 `src/proxy.ts` matcher 排除列表**，否则被 i18n middleware
  改写进 `[locale]/[slug]` 兜底 → 404（详见 `../semantic/i18n.md` proxy matcher 节）。

## 2. 文案从第一行走字典（硬规则）

- `[locale]` 下新页面/组件直接用 `useTranslations`/`getTranslations`，同步往
  `messages/*.json`（6 locale：en/pt/ar/es/fr/ru）加 key。**不要先硬编码后提取**。
- CMS 正文不进字典——走 Payload `localized` 字段按 locale 录入
  （详见 `../semantic/content-model.md`）。
- 背景事件见 `../episodic/proxy-matcher-hijack-20260903.md`（同一天发现的两个
  新页面陷阱促成本流程）。

## 3. 自带 `<html>` 的 layout 防主题门

- route-group layout 若自带 `<html>`：静态预览路由加 `data-theme="light"`，
  动态路由挂 `<InitTheme />`，否则整路由隐形（详见 `../semantic/frontend.md`）。

## 4. 上线前核对

- robots：预览页 layout 必须 `robots: { index: false, follow: false }`。
- sitemap：正式页确认被 `next-sitemap` 收录；预览页确认**不**被收录。
- 验证清单跑一遍（`verification.md`）；用户可见文案改动的跑 guardrail。
