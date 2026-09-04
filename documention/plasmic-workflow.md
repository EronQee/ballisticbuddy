# Plasmic 组件工作流操作手册

> 定位：目前Plasmic 只作为**组件打磨车间**（视觉调试工具），不承载站点页面。
> 产出以**代码形态**沉淀回仓库，供任何 coding agent 直接复用。

---

## 0. 架构总览

```
┌─────────────────────────────────────────────────────────────┐
│  Plasmic Studio (studio.plasmic.app)                        │
│  项目 ID: .env.local NEXT_PUBLIC_PLASMIC_PROJECT_ID          │
└──────────────┬──────────────────────────────────────────────┘
               │ App Host = http://localhost:3000/plasmic-host
               ▼
┌─────────────────────────────────────────────────────────────┐
│  本地 dev server（pnpm dev）                                 │
│  组件注册: src/plasmic/plasmic-init-client.tsx               │
│  组件车间: src/components/plasmic/   ← 唯一允许入池的目录     │
└──────────────┬──────────────────────────────────────────────┘
               │ Studio Publish（Codegen 模式）
               ▼
┌─────────────────────────────────────────────────────────────┐
│  GitHub 分支 feat/plasmic-studio → plasmic/ 目录             │
│  （生成代码自动 commit 存档，纯只读参考，不直接 import）       │
└─────────────────────────────────────────────────────────────┘
```

**分支分工**

| 分支 | 职责 |
|---|---|
| `main` | 生产代码（Vercel 只部署此分支） |
| `feat/i18n-next-intl-a` 等功能分支 | 日常开发 |
| `feat/plasmic-studio` | **纯存档分支**：Studio Publish 后 codegen 自动 commit 生成的代码到 `plasmic/` 目录；落后主线无所谓，永不合并回 main |

---

## 1. 前置条件（一次性）

- `.env.local` 已填：
  ```
  NEXT_PUBLIC_PLASMIC_PROJECT_ID=...
  NEXT_PUBLIC_PLASMIC_PROJECT_API_TOKEN=...
  ```
- Studio 项目 → Configure project → App Host = `http://localhost:3000/plasmic-host`
- 本地 `pnpm dev`（host 页面需要 dev server 运行，Studio 才能连上）

### 硬规则（踩过的坑，勿改）

1. `src/app/(frontend)/plasmic-host/page.tsx` **必须保留 `'use client'`**。
   Turbopack 会把 Server Component 里的副作用导入优化掉 → 注册代码静默不执行
   → Studio 里组件永远不出现且无报错。
2. `src/proxy.ts` matcher 排除列表里**必须保留 `plasmic-host`**，
   否则被 next-intl 重写成 `/en/plasmic-host` 导致 404。
3. 所有 `PLASMIC.registerComponent` 只写在 `plasmic-init-client.tsx`。

---

## 2. 流程 A：注册一个新组件

**Step 1 — 组件入池**

在 `src/components/plasmic/xxx.tsx` 写组件（这是唯一允许的入池目录）。
要求：所有视觉值都做成 props 并给出 `defaultValue`，这样 Studio 才能自由调试。

**Step 2 — 注册**

打开 `src/plasmic/plasmic-init-client.tsx` 追加：

```tsx
import MyThing from '@/components/plasmic/MyThing'

PLASMIC.registerComponent(MyThing, {
  name: 'MyThing',
  displayName: 'My Thing',
  props: {
    title: 'string',
    count: 'number',
    enabled: 'boolean',
    variant: { type: 'choice', options: ['a', 'b'], defaultValue: 'a' },
    className: 'string',
    children: 'slot',           // 插槽：Studio 里可往里拖内容
    onClick: 'eventHandler',    // 事件回调
  },
})
```

常用 prop 类型：`string` / `number` / `boolean` / `object` /
`choice`(枚举) / `slot`(插槽) / `eventHandler`(事件)。

- Code components reference docs
    
    [Overview](https://docs.plasmic.app/learn/code-components/)
    
    [Setting up an app host](https://docs.plasmic.app/learn/app-hosting/)
    
    [Registering code components](https://docs.plasmic.app/learn/registering-code-components/)
    
    [Writing code components](https://docs.plasmic.app/learn/writing-code-components/)
    
    [Registered variants](https://docs.plasmic.app/learn/registered-variants/)
    
    [Development workflow](https://docs.plasmic.app/learn/app-host-dev-workflow/)
    
    [Custom prop controls](https://docs.plasmic.app/learn/custom-controls/)
    
    [**Editor actions**](https://docs.plasmic.app/learn/editor-actions/)
    
    [Custom behaviors](https://docs.plasmic.app/learn/custom-behaviors/)
    
    [Dynamic pages](https://docs.plasmic.app/learn/dynamic-pages-code/)
    
    [Element actions](https://docs.plasmic.app/learn/element-actions/)
    
    [Global contexts](https://docs.plasmic.app/learn/global-contexts/)
    
    [registerToken API reference](https://docs.plasmic.app/learn/registering-tokens/)
    
    [registerComponent API reference](https://docs.plasmic.app/learn/code-components-ref/)
    
    [registerGlobalContext API reference](https://docs.plasmic.app/learn/global-contexts-ref/)
    
    [registerFunction API reference](https://docs.plasmic.app/learn/registering-custom-functions/)

**Step 3 — 生效**

dev server 热更新自动带上 → 回 Studio **刷新项目** → Insert 菜单（蓝色 `+` 或按 `Q`）
搜 displayName。

> 改了 props 定义后同样需要刷新 Studio 项目才能看到新属性面板。

---

## 3. 流程 B：Studio 打磨 → 固化回代码（核心动作）

1. 在 Studio 画布拖入组件、调 props/样式，**自由试**。
2. 试满意后，**把最终视觉手工固化回组件代码**——loader 模式下
   Studio 里的微调存在 Plasmic 云端，**不会自动写回仓库**。
   固化内容 = 组件文件的 `defaultValue` / `className` / 内联样式。
3. 验证固化：刷新 Studio，画布默认态应该和固化后的代码一致。
4. （可选）Studio 右上 Code → **Publish** → codegen 自动把生成的代码
   commit 到 `feat/plasmic-studio` 分支的 `plasmic/` 目录（见流程 C）。

---

## 4. 流程 C：coding agent 从 plasmic-studio 分支复用组件

**`plasmic/` 目录的定位：生成代码存档，只读参考，不直接 import。**

coding agent 的工作流：

1. `git fetch origin feat/plasmic-studio`，查看
   `origin/feat/plasmic-studio:plasmic/` 下的生成代码
   （可 `git show` / `git checkout` 该分支浏览）。
2. 从生成代码里**提取**：布局结构、className 组合、间距/字号/颜色 token 用法。
3. 把最终形态**落成正式组件**写进 `src/components/plasmic/xxx.tsx`
   （在主开发分支上做），并在 `plasmic-init-client.tsx` 注册。
4. 站点页面通过 `import { X } from '@/components/plasmic'`
   （barrel export 在 `src/components/plasmic/index.ts`）复用。
5. 组件进 `index.ts` barrel 导出，即可被任意页面 import。

> 为什么不直接 import 生成代码：生成物依赖 `@plasmicapp/react-web` 运行时
> 且与主项目依赖结构不同；择优搬进自有组件才能长期维护、无 Plasmic 依赖锁定。

---

## 5. 不对外展示 / 不 index（已内置，勿破坏）

- `/plasmic-host` 页面：`robots: { index: false, follow: false }`（noindex）
- `next-sitemap.config.cjs` 的 `exclude: ['/*', ...]` 覆盖 `/plasmic-host`
- 站点内无任何链接指向它；`src/components/plasmic/` 是纯源码目录，无路由

---

## 6. 排障速查

| 症状 | 探针/检查 |
|---|---|
| Studio 里搜不到注册组件 | host 页面浏览器 console 执行 `globalThis.__PlasmicComponentRegistry?.map(r => r.meta.name)`；空数组 = 注册未执行，查硬规则 1 |
| `/plasmic-host` 404 | 查 `src/proxy.ts` matcher 排除列表（硬规则 2） |
| Studio 报 host 连接失败/转圈 | dev server 是否在跑；App Host URL 是否含完整路径 `/plasmic-host` |
| loader API 异常 4xx（凭据确认无误） | 先怀疑本机 TUN 代理干扰（fake-ip 网段 198.18.0.1），浏览器直连测试再下结论 |
| Studio 微调在其他页面不生效 | 正常现象：Studio 调整不回写代码，回看流程 B 的固化步骤 |

详细排障复盘见 `documention/harness/episodic/plasmic-apphost-turbopack-side-effect-import-20260904.md`。
