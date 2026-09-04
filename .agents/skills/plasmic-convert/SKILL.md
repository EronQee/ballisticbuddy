# Skill: plasmic-convert

<!-- trigger: plasmic-convert | 把组件转成 plasmic / register 这个组件 / 转 plasmic 组件 | 让组件进入 Plasmic Studio 可视化调试体系 -->

## Purpose

把任意 React 组件代码转换为符合本项目规范的 Plasmic code component，并**完成全部入池动作**（落盘、注册、barrel 导出、校验），形成可在 Plasmic Studio 中直接调试的闭环。

## When to use

- 用户说「把 X 转成 plasmic 组件」「register 这个组件」「加到 plasmic 车间」
- 用户给出一段组件代码/文件，希望进 Studio 打磨
- 新组件需要注册进 `plasmic-init-client.tsx` 时

## Inputs

- 组件源码（用户粘贴、给出文件路径、或给出 URL）
- 可选：期望的注册名（默认取组件名 camelCase 大写开头）

## Procedure

1. **读规范**：先读 `documention/plasmic-code-components.md`（API 全量规范），转换遵循其 §10 提示词的 7 条规则：
   - 硬编码视觉值 → props + `defaultValue`（默认值必须与原视觉一致）
   - 根元素挂 `className`
   - slot 给 `defaultValue` 元素树（§4）；choice 用 `{value,label}[]`
   - `next/image`→`<img>`、`next/link`→`<a>`（视觉等价替换）
   - hooks/事件保留；**数据请求、浏览器 API、外部 store/context 改为 props 传入**
   - 动画（framer-motion/CSS）保留，可加 `motionDisabled` 类开关 prop
2. **落盘**：写入 `src/components/plasmic/X.tsx`（X = 组件名）
3. **注册**：在 `src/plasmic/plasmic-init-client.tsx` 追加 `PLASMIC.registerComponent(...)`（放在已有注册之后）
4. **导出**：在 `src/components/plasmic/index.ts` 追加 barrel 导出
5. **校验**：`pnpm exec tsc --noEmit` + `pnpm exec eslint "src/components/plasmic/**" "src/plasmic/**"`（零 error 才算过）
6. **交付说明**（输出给用户，勿省略）：
   - 注册名 & displayName
   - 提示：`pnpm dev` → Studio 刷新项目 → Insert 搜 displayName
   - 提醒：Studio 里的调整不会回写代码，满意后要固化（见 `documention/plasmic-workflow.md` 流程 B）

## Constraints

- 组件文件**只允许**放 `src/components/plasmic/`
- 组件必须**视觉自包含**：不 fetch 数据、不读外部 store/context（数据一律 props 进；确需全局状态的用 `registerGlobalContext`，并在交付说明里标注）
- 不修改 `src/app/(frontend)/plasmic-host/` 和 `src/proxy.ts`（硬规则见 workflow 文档）
- 已存在同名注册 → 先报告冲突，问用户覆盖还是改名

## References

- `documention/plasmic-code-components.md` — API 规范（必读）
- `documention/plasmic-workflow.md` — 工作流与硬规则
