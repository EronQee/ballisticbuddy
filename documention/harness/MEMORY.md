# BallisticBuddy Long-Term Engineering Memory

> 跨会话的工程经验：踩过的坑、验证过的结论、必须遵守的硬规则。
> 从 `documention/progress/`（daily logs）提炼而来。发现新坑 → 追加到对应分节。
> AGENTS.md 是"该怎么做"，本文件是"发生了什么、什么会坑"。

## 项目事实基线（技术栈速览）

- **CMS/后端**：Payload 3.x（`src/payload.config.ts`），Postgres 适配器
  （`@payloadcms/db-vercel-postgres`），生产为 Vercel Postgres。
- **前端**：Next.js 16（App Router），React 19，TypeScript，Tailwind CSS v4，
  shadcn/ui 组件。
- **包管理**：pnpm（根目录单包，非 workspace）。`pnpm --ignore-workspace install` 为
  安装命令（`package.json` 里 `ii` 脚本）。
- **测试**：vitest（单元/集成，`vitest.config.mts`）+ Playwright（e2e，`playwright.config.ts`）。
- **存储**：S3（`@payloadcms/storage-s3`）；认证用 Payload 内置 users 集合。
- **域名/部署**：见 `.env.example` 与 `vercel.json`。

> 迁移自 ElevatoX 的 MEMORY 框架。ElevatoX 具体的 Strapi/SEO 坑**不迁移**——
> 技术栈不同，留在这里只会误导。下方分节从空开始，逐坑积累本项目的经验。

## Payload CMS 坑（本项目最高频候选）

> 尚未踩坑。经验积累后在此分节追加，参照 ElevatoX 的教训清单格式：
> 症状 / 根因 / 修复 / 部署注意，每条带日期与可复现命令。

### 已知的 Payload 通用注意事项（来自模板与官方文档）
- **schema 变更与迁移**：`push: true` 只在开发环境自动建表；生产 Postgres 需
  `pnpm payload migrate:create` + `pnpm payload migrate`（见 README）。改 collection
  后线上部署必须带 migration，否则字段/表缺失。
- **draft 与 publish**：`_status` 只有 `draft`/`published` 两态；revalidate hook 在
  `afterChange` 且 `_status === 'published'` 时触发前端 revalidate。改内容后本地
  `next start` 看不到新值 → 检查是否走了 draft 未 publish。
- **media 变更**：图片裁剪/替换后需重新 publish 引用它的页面，才能触发 Next.js 图片缓存 revalidate。

## 前端/构建坑

- **端口冲突**：`next start` EADDRINUSE 时是旧实例占着；先 `Get-NetTCPConnection
  -LocalPort <port>` 找 OwningProcess 再停，别猜。
- **两个实例同时读写 `.next`** 会报 `Cannot find module './NNN.js'`——验证时停旧服务、
  清 `.next` 再 rebuild。
- `pnpm build` 后 `postbuild` 会跑 `next-sitemap`（见 `next-sitemap.config.cjs`）；
  新增路由后确认 sitemap 正确收录，别只信 `next build` 的产物。
- Next.js 缓存：改了内容本地看不到效果先怀疑缓存（`next start` 场景），别急着改代码。

## 数据模型/内容流坑

- 内容以 Payload collections 为准（`src/collections/`），**不要仅凭本地 seed 或代码
  fallback 推断线上数据状态**。查线上用 Payload REST/GraphQL API 或 admin。
- Payload `pages` 的 layout builder blocks 与前端渲染的 block 组件一一对应；
  新增 block 必须同时改 `src/blocks/` 的 schema 与前端渲染分支，否则 admin 存了
  前端不渲染（静默丢失）。
- `search` 插件索引是异步生成的，改动内容后搜索结果显示有滞后属正常。

## 部署/CI 坑

- Vercel 部署限制：免费版 cron 只支持 daily（scheduled publish 受影响），
  payload-cloud 代理会缓存，Next.js 缓存被禁用（fetch 走 `no-store`）。
- `@payloadcms/db-vercel-postgres` 的 `POSTGRES_URL` 必须与 `vercel.json` 环境变量
  对齐；本地方便用 Docker compose（`docker-compose.yml`）起 Postgres。
- Windows 下 `pnpm` 的 native 依赖（sharp/esbuild）若未编译，见 `package.json`
  `pnpm.onlyBuiltDependencies`；新加 native 包要加进该列表，否则 `pnpm approve-builds`。

## 工具/脚本约定

- banned-terms 正则小心误报：按词边界或整词匹配，别裸用 `-match 'XXX'` 当证据。
- PowerShell 里给 node 脚本传 `$` 要用单引号包 node -e 整段，或 `\`` 转义。
- 脚本新增验证断言时，追加到 `scripts/check-guardrails.mjs`，不要只写在 agent 记忆里。

## 故障排查顺序（硬规则：先搜索，后苦干）

- 成熟技术（Payload、Next.js、npm/pnpm、Docker…）出现异常时，**第一步永远是
  外部搜索找现成解法，不要先在本地翻源码/试错**。绝大多数坑早有人踩过。
- **搜索要组合工具**，单一工具会漏：
  - 通用语义搜索 → 理解问题本质、找相关讨论/论坛/文档。
  - GitHub 原生搜索（`gh search issues "<关键词>" --repo 仓库名`）→ 精准锁定
    issue 全文/标题，往往直接带 workaround。
  - 官方文档站（payloadcms.com/docs 等）。
- 只有当「搜索确认无现成答案」时才自己想办法（翻源码、读 node_modules、写脚本验证）。
- 搜索措辞用报错原文的关键片段 + 技术栈名，别只搜问题描述。

## 验证清单（改动后必跑）

| 命令 | 何时 |
|---|---|
| `pnpm exec tsc --noEmit` | 任何 TS/TSX 改动后 |
| `pnpm lint` | 任何代码改动后 |
| `pnpm build` | 路由/页面/组件改动后 |
| `node scripts/check-guardrails.mjs` | 任何用户可见文案改动后 |
| `pnpm test:int` / `pnpm test:e2e` | 逻辑/渲染契约改动后 |

## 变更记录

- 2026-09-01：从 ElevatoX 迁移记忆框架，清空 Strapi/SEO 具体内容，按 Payload/Next 重建基线。
