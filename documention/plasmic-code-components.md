# Plasmic Code Component 开发参考

> 基于 [官方 Code Components Reference](https://docs.plasmic.app/learn/code-components-ref/) 提炼，
> 结合本项目约定（loader 模式）。工作流程见 `documention/plasmic-workflow.md`。
>
> **注册位置**：所有 `PLASMIC.registerComponent` 只写在
> `src/plasmic/plasmic-init-client.tsx`；组件本体放 `src/components/plasmic/`。

---

## 1. registerComponent 元数据全景

```ts
PLASMIC.registerComponent(MyComponent, meta)
```

| meta 字段 | 作用 | 备注 |
|---|---|---|
| `name` ★必填 | 唯一标识名（camelCase，首字母大写） | 生成代码 / slot 引用都用它 |
| `props` ★必填 | prop 名 → 元数据（见 §2） | |
| `displayName` | Studio UI 显示名 | 允许空格/中文 |
| `description` | Studio 中的帮助说明 | |
| `section` | Insert 菜单分组名 | 默认 "Custom components"；`thumbnailUrl` 仅在设了 section 时显示 |
| `thumbnailUrl` | 插入菜单缩略图 | |
| `classNameProp` | 接收根元素 css 类的 prop | 默认 `className`；自定义名时必填 |
| `defaultStyles` | 每次插入实例时套用的默认样式 | CSSProperties，见 §8 |
| `templates` | 插入时的预设变体菜单 | `{ 模板名: { previewImg, props, styles } }` |
| `isAttachment` | 注册为 Custom Behaviors 包装器 | 有 `children` slot 约束（见 §6） |
| `styleSections` | 控制 Studio 样式面板开放度 | `false` 不可调样式 / `true` 全开 / 数组见 §8 |
| `providesData` | 组件通过 `DataProvider` 提供数据时必须 true | |
| `parentComponentName` | 嵌套显示在指定父组件的插入菜单下 | |
| `hideFromContentCreators` | 对 content-creator 角色隐藏 | |
| `variants` | 注册变体：名 → `{ cssSelector, displayName }` | Studio 里可切换 |
| `states` | 注册状态（见 §5） | |

> 仅 codegen 模式相关（本项目为 loader，不涉及）：`importPath` / `importName` /
> `isDefaultExport` / `isRepeatable`。

---

## 2. Prop 类型全表

**简写**：`props: { title: 'string' }` 等价于 `{ title: { type: 'string' } }`。

### 类型 → Studio 控件

| type | Studio 控件 |
|---|---|
| `string` | 文本框（`control: 'large'` = 大编辑器+文件上传；`isLocalizable` 进本地化导出） |
| `number` | 数字框或滑条（`control: 'slider'` 需 `min`/`max`，均可为控制函数；`step`） |
| `boolean` | 开关 |
| `choice` | 下拉（`options` 必填，见下）；`multiSelect: true` 变多选数组 |
| `dateString` | 日期选择（ISO 字符串） |
| `dateRangeStrings` | 日期范围选择 |
| `code` | 代码编辑器（`lang` 必填：css/html/javascript/json） |
| `href` | 链接选择器（项目页面或任意 URL） |
| `imageUrl` | 图片选择器（Studio 项目资产） |
| `color` | 取色器；`keepCssVar: true` 时 token 传 `var(--TOKEN)` 而非解析后的 hex |
| `object` | JSON 编辑器；或 `fields` 定义 schema 表单化；`nameFunc(obj)` 定义列表预览名 |
| `array` | 列表构建器（`itemType` 目前仅支持 object） |
| `slot` | 插槽（ReactNode），见下 |
| `eventHandler` | 交互/事件（`argTypes` 必填：`[{name, type}]`） |
| `cardPicker` | 卡片选择弹窗（`options: {value, imgUrl, footer, label}[]`） |
| `class` | css 类 prop，让用户样式化组件子元素（见 §7） |
| `themeResetClass` | 应用 Plasmic 默认样式+css 变量的类（portal 场景） |

### 所有类型通用选项

| 选项 | 作用 |
|---|---|
| `displayName` | 属性面板显示名 |
| `defaultValue` | 默认值（slot 则为元素树，见 §4） |
| `defaultValueHint` | 占位提示（slot 不支持） |
| `required` | 必填标记 |
| `advanced` | 默认折叠到高级区 |
| `readOnly` | 只读 |
| `editOnly` | 仅 Studio 内生效，不进生成代码 |
| `uncontrolledProp` | 配合 `editOnly`：值转发给生成代码的另一个 prop（如 `value`→`defaultValue`） |
| `hidden` | 控制函数，返回 true 隐藏（见 §3） |
| `validator(v, ctx)` | 返回 `true` 或错误信息 |
| `helpText` | 属性面板帮助文字 |

### slot 专有选项

| 选项 | 作用 |
|---|---|
| `allowedComponents` | 限制插槽内可放的注册组件名 |
| `hidePlaceholder` | 空插槽占位符默认隐藏（适合可选图标位） |
| `isRepeated` | slot 作为 `repeatedElement()` 重复渲染 |
| `allowRootWrapper` | 允许整个组件作为插槽内容传入 |
| `renderPropParams` | slot 为 render prop 时的参数名（数据选择器可用） |
| `defaultValue` | **强烈建议必填**：否则空插槽在画布上是空白盒子 |

### choice 专有选项

- `options`: `string[]` 或 `{value, label}[]` 或控制函数（动态选项，见 §3）

---

## 3. 控制函数（Prop Control Functions）

签名：`(props, ctx) => value`。`props` = 当前实例 props；`ctx` = 组件通过
`setControlContextData` 上报的数据（不是 React Context）。

```tsx
function ProductCard({ productId, setControlContextData }) {
  const { slugs } = useCtx()
  setControlContextData?.({ slugs })   // 仅 Studio 渲染时注入，副作用调用
  return ...
}

PLASMIC.registerComponent(ProductCard, {
  props: {
    hasEnd: 'boolean',
    end: { type: 'number', hidden: (props) => !props.hasEnd },
    productId: {
      type: 'choice',
      options: (props, ctx) => ctx?.slugs ?? [],
    },
  },
})
```

- 可用于：`hidden` / `choice.options` / `number.min|max|step` / `cardPicker.*` 等
- `ctx` 初始为 `null`（实例未渲染时控件先渲染），做好空值防御

---

## 4. slot defaultValue 元素树

`defaultValue` 可以是单个元素或元素数组。节点格式：

```ts
{ type: 'text',   value: '文字', tag: 'div', styles: {...}, attrs: {...} }
{ type: 'hbox',   children: [...], tag: 'div' }   // 横向堆叠
{ type: 'vbox',   children: [...] }               // 纵向堆叠
{ type: 'box',    children: [...] }
{ type: 'img',    src: 'https://...' }
{ type: 'input' | 'password' | 'textarea' }
{ type: 'component', name: 'Button', props: { children: [{type:'text', value:'OK'}] } }
{ type: 'default-component', kind: 'button', props: {...} }  // 项目默认按钮等
```

纯字符串是 unstyled span 的简写。`styles` 用 CSSProperties（约束见 §8）。

---

## 5. States（状态注册）

```ts
PLASMIC.registerComponent(MyInput, {
  states: {
    value: {
      type: 'writable',        // 或 'readonly'
      variableType: 'text',    // text|number|boolean|array|object
      valueProp: 'value',      // 受控 prop
      onChangeProp: 'onChange',
      initVal: '',             // 或 initFunc: (props) => ...
      onChangeArgsToValue: (e) => e.target.value,
    },
  },
})
```

- `writable`：父级可读写（需 `valueProp` + `onChangeProp`）
- `readonly`：父级只读（仅 `onChangeProp`）
- 注册后 Studio 可对状态做交互绑定（点击赋值等）

---

## 6. Attachments（Custom Behaviors）

`isAttachment: true` 后组件出现在右侧面板 Custom Behaviors 区，用作**包装器**
（动画/视差/tilt 等）。约束：组件应只有一个名为 `children` 的 slot prop。
props 照常注册。典型例：ParallaxWrapper（`speed: 'number'` + `children: 'slot'`）。

---

## 7. `class` prop 与 `classNameProp` 约定

- 根元素样式：Studio 自动往 `classNameProp`（默认 `className`）注入生成的类。
  组件实现里必须把它挂到根元素上，否则设计面板样式不生效。
- `class` 类型 prop：暴露**子元素**的可样式化句柄：
  ```ts
  headerClass: {
    type: 'class',
    styleSections: ['typography'],        // 限制该类可调的样式区
    selectors: [ { selector: ':component .header', label: 'Header' } ],
  }
  ```
  特殊 selector：`:component` = 组件根；`:self` = 挂载该类的元素。

---

## 8. 样式书写约束（defaultStyles / templates / 元素树 styles）

- 一律**原子属性**，禁用 shorthand（如 `font`）；间距用 `columnGap`/`rowGap`
- 部分属性只接受单值（`fontFamily` 无 fallback 列表）
- `styleSections` 可选值：`typography` `sizing` `spacing` `background`
  `transform` `transitions` `layout` `overflow` `border` `shadows` `effects` `visibility`

---

## 9. 本项目落地清单（快速对照）

新增一个 code component 的完整检查单：

1. [ ] 组件文件 → `src/components/plasmic/X.tsx`
2. [ ] 根元素挂 `className`（Studio 样式生效的前提）
3. [ ] 所有可调试视觉值做成 props + `defaultValue`
4. [ ] slot 一律给 `defaultValue`（避免空盒子）
5. [ ] `plasmic-init-client.tsx` 注册（name 用 camelCase+大写开头）
6. [ ] barrel 导出 → `src/components/plasmic/index.ts`
7. [ ] dev server 热更后，Studio 刷新项目验证出现 + 属性面板正确
8. [ ] 打磨满意 → 固化回组件代码（见 workflow 文档流程 B）→ commit

---

## 10. AI 转换提示词模板

把任意 React 组件代码转成 Plasmic code component 时，
**attach 本文档 + 组件代码文件**，配下面的提示词：

```
这是 Plasmic code component 的注册规范（附件文档）。
这是我的组件代码（附件文件）。
请把它转换为一个 Plasmic code component：
1. 按文档 §1-§2 把所有硬编码的视觉值提取成 props，全部带 defaultValue
2. 根元素挂 className 并支持外部覆盖（文档 §7）
3. slot 一律给 defaultValue 元素树（文档 §4）；没有 slot 就不需要
4. 若有 next/image、next/link，替换为 <img>/<a>（视觉等价）
5. React hooks/事件逻辑可保留，但数据请求、浏览器 API 移出组件改为 props 传入
6. 输出：① 完整组件 TSX（含 props 接口定义）② registerComponent 调用代码
7. 最后按文档 §9 检查单逐项自检并标注结果
```

**约束说明（给 AI 的补充，可选）**：

- name 命名：camelCase 且首字母大写（如 `PricingCard`）
- choice 的 options 用 `{value, label}[]` 形式以便显示友好名
- 数字/字符串默认值必须与原代码的视觉表现一致（转换不改变外观）
- 如组件含动画（CSS transition/keyframes），保留并说明哪个 prop 控制开关
