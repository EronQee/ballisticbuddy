# 故障排查 / 调试方法

> 硬规则：先搜索，后苦干 + 调试方法论。每次会话必加载。

## 排查顺序（硬规则：先搜索，后苦干）

1. 成熟技术（Payload、Next.js、npm/pnpm、Docker…）出现异常时，**第一步永远是
   外部搜索找现成解法，不要先在本地翻源码/试错**。绝大多数坑早有人踩过。
2. **搜索要组合工具**，单一工具会漏：
   - 通用语义搜索 → 理解问题本质、找相关讨论/论坛/文档。
   - GitHub 原生搜索（`gh search issues "<关键词>" --repo 仓库名`）→ 精准锁定
     issue 全文/标题，往往直接带 workaround。
   - 官方文档站（payloadcms.com/docs 等）。
3. 只有当「搜索确认无现成答案」时才自己想办法（翻源码、读 node_modules、写脚本验证）。
4. 搜索措辞用报错原文的关键片段 + 技术栈名，别只搜问题描述。

## DOM 验证 ≠ 视觉正确（2026-09-01，ui-preview 白屏误判教训）

- `opacity: 0` / `visibility: hidden` 的页面，`innerText`、`scrollHeight`、
  元素存在性、控制台 0 报错**全部照常通过**——只查 DOM 会得出"页面正常"的错误结论。
- 判断"用户看到什么"必须断言**计算样式或像素**：playwright
  `eval "getComputedStyle(document.documentElement).opacity"`，或直接 screenshot
  给人看。排查"白屏/隐形"类问题时，第一条命令就该查 computed opacity。

## 水合报错噪音 ≠ 根因

- 浏览器插件（如 Trancy 注入 `trancy-version` 属性）会在 `<html>` 上触发
  hydration mismatch 警告，且报错树可能指向无关路由（/admin/login）。
- 插件噪音先放一边；SSR HTML 完整 + 无头浏览器 DOM 正常时，优先对比
  "可见性层"（CSS opacity/visibility/display），而不是追水合警告。

## Playwright 截图不得由 agent 自行调用（2026-09-02，harness 硬规则）

- 截图/像素验证输出的是图像，而**并非所有 agent 模型都是多模态的**——非多模态
  agent 拿不到截图里的视觉结论。这不是性能问题，是**可验证性契约**：验证结果
  必须是所有 agent 都能读取的文本/数值，不能是只对部分模型可见的图像。
- 视觉验证一律：
  1. 优先用**文本断言**（DOM + `getComputedStyle` 计算样式、
     `getBoundingClientRect` 几何数值、文本内容），agent 能直接读结果；
  2. 必须看像素时，交给**用户人工**或**明确标注的多模态 agent** 看截图，
     agent 只负责产出截图路径。
