# Plasmic App Host 组件不显示 / Turbopack 副作用导入被优化（2026-09-04）

> 三层排障（凭据 → 网络 → 构建器行为）+ A/B 对照实验定位 Turbopack 差异的完整案例。

## 发生了什么

1. 集成 Plasmic（loader-nextjs v2 + App Router）：安装、`plasmic-init`、`/plasmic-host`
   页面、注册 `Button`/`HeroSection`，静态检查与 host 页面 200 全部通过。
2. Studio 配置 App Host 后：Studio 与 host 连接正常（studio.js 注入成功、
   studio bundle 全 200），但 Insert 菜单永远搜不到注册的组件，且无任何报错。
3. 排障穿透三层：
   - **凭据层**：假 token → 403，真 token → 4xx，确认凭据有效；
   - **网络层**：机器有 TUN 代理（fake-ip 198.18.0.1），一度误判为网络干扰；
     后用户浏览器直连 codegen-origin 返回 401（可达）推翻此判断；
   - **构建器层**：用 create-next-app 搭纯净 Pages Router 最小 host（同 loader 版本、
     同凭据、同 Studio 项目）做 A/B 对照——**最小 host 成功显示组件**，锁定主项目环境。
4. 最终用注册表探针 + 标记变量实锤：主项目 host 页面在浏览器里
   `__PlasmicComponentRegistry` 为空、`plasmic-init-client` 模块从未执行
   （标记变量为 null），但页面无任何报错。

## 根因

- 官方文档的 host 页面写法是 **Server Component + 仅副作用导入 client 模块**。
  webpack（Pages Router 时代）会执行该导入；**Next 16 Turbopack 会把
  Server Component 中未被显式使用的 client 模块副作用导入优化掉**——
  注册代码静默不执行。最小 host 是 Pages Router（webpack 语义的模块求值时机），
  所以成功。
- Studio 侧的 `getRegisteredCodeComponents` 是 memoizeOne 且读
  `window.parent.__PlasmicComponentRegistry`，空结果永久缓存，之后即使注册也
  不会出现——放大了"无报错、无自愈"的迷惑性。

## 解决

- `src/app/(frontend)/plasmic-host/page.tsx` 顶部加 `'use client'`，让副作用导入
  落在客户端图内。一处修复，Playwright 验证注册表恢复 `["Button","ZebraMagicHeroTest"]`，
  Studio 实测组件出现。

## 固化

- **事实**：Turbopack 副作用导入陷阱 + Plasmic 集成结构 + 探针方法 →
  `../semantic/frontend.md`
- **行为教训**：
  1. "官方文档写法"在构建器换代（webpack→Turbopack）后可能静默失效；
     凡是"依赖导入副作用"的代码，必须用运行时标记验证真的执行了；
  2. A/B 最小对照实验是从"环境问题"泥潭中抽身的最快路径——本次三层静态
     分析数小时不如一个 30 秒对照实验；
  3. 机器级代理（TUN/fake-ip）会让一切远程 API 调试先被污染，应把
     "本机代理状态"列入排查清单第一层而不是最后一层。
