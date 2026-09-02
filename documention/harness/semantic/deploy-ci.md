# 部署 / CI 坑

> 持久事实：Vercel、环境变量、native 依赖。按需加载（路由见 INDEX.md）。

- Vercel 部署限制：免费版 cron 只支持 daily（scheduled publish 受影响），
  payload-cloud 代理会缓存，Next.js 缓存被禁用（fetch 走 `no-store`）。
- `@payloadcms/db-vercel-postgres` 的 `POSTGRES_URL` 必须与 `vercel.json` 环境变量
  对齐；本地方便用 Docker compose（`docker-compose.yml`）起 Postgres。
- Windows 下 `pnpm` 的 native 依赖（sharp/esbuild）若未编译，见
  `package.json` 的 `pnpm.onlyBuiltDependencies`；新加 native 包要加进该列表，
  否则 `pnpm approve-builds`。
- **生产部署前需确认 Vercel 上 `payload migrate` 的执行时机**（当前 `vercel.json`
  build 只有 `pnpm build`，不含 migrate；本地已迁移，生产库首次部署前要跑一次
  迁移或配 `prodMigrations`）。
- proxy.ts（Next 16 middleware 改名）在 Vercel 上的 matcher 行为需留意（i18n B 期遗留观察项）。
