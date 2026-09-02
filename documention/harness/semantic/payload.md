# Payload CMS 坑

> 持久事实：Payload schema/迁移/draft/媒体行为。按需加载（路由见 INDEX.md）。

## schema 变更与迁移

- `push: true` 只在开发环境自动建表；生产 Postgres 需
  `pnpm payload migrate:create` + `pnpm payload migrate`（见 README）。改 collection
  后线上部署必须带 migration，否则字段/表缺失。
- 本项目已挂 Payload `localization`（B 期，迁移 `20260902_081821_localization.ts`
  已对 Neon 执行）。字段级 `localized: true` 属 DB schema 变更，生产/构建不跑
  migration 会报 `relation "posts_locales" does not exist`（详见 semantic/i18n.md）。

## draft 与 publish

- `_status` 只有 `draft`/`published` 两态；revalidate hook 在 `afterChange` 且
  `_status === 'published'` 时触发前端 revalidate。改内容后本地 `next start`
  看不到新值 → 先检查是否走了 draft 未 publish，别急着改代码。

## media 变更

- 图片裁剪/替换后需重新 publish 引用它的页面，才能触发 Next.js 图片缓存 revalidate。

## migrate:create 交互陷阱（2026-09-02）

- `payload migrate:create` 的 create-vs-rename 确认**无法非交互跳过**：prompt 来自
  drizzle-kit `api.js` 里 bundled 的 hanji 原始 TTY 组件，没有 flag
  （`--force-accept-warning` 只跳过 blank-migration 确认，不覆盖这个）。非 TTY 管道
  喂 `\n` 只能应答第一个（hanji 在同一 chunk 里丢掉后续按键）。
- Payload 的 `requireDrizzleKit()` 解析到的是
  `node_modules/.pnpm/drizzle-kit@*/node_modules/drizzle-kit/api.js`（CJS），
  **不是 `api.mjs`**——改错文件=白改。
- 本地一次性 workaround：备份 → 断硬链接 → 在 Terminal 构造器加
  `if(!this.stdin.isTTY){setImmediate(()=>keypress("",{name:"return"}))}` →
  跑生成 → 还原原文件。新站空库可放心接受默认「create column」。
