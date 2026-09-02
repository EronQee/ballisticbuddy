# BallisticBuddy Harness

> 本项目对 AI agent 的"运行时包装"——让模型从"能回答问题"变成"能在仓库里可靠干活"的
> 全部基础设施。模型会变，harness 是我们沉淀的护城河。

参考：nexu-io/harness-engineering-guide（四子系统模型）；Anthropic《Building Effective Agents》；
Addy Osmani《Loop Engineering》；OpenAI《Harness Engineering》。
源自 ElevatoX 项目 harness 体系（四子系统模型），按 BallisticBuddy 技术栈适配。

## 核心定义

A **harness** 是把裸语言模型变成 **agent** 的运行时包装：感知环境、做决定、多步行动。
BallisticBuddy 的 harness = 仓库里的 AGENTS.md + skills + 脚本/门禁 + 记忆文档。

四个子系统：

```
┌────────────────────────────────────────────┐
│           BALLISTICBUDDY HARNESS           │
│                                            │
│  ┌──────────┐ ┌─────────────┐ ┌─────────┐ │
│  │ Agentic  │ │ Skill /     │ │ Memory  │ │
│  │ Loop     │ │ Tool System │ │ Context │ │
│  │ (流程)   │ │ (技能)      │ │ (记忆)  │ │
│  └──────────┘ └─────────────┘ └─────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │            Guardrails                │ │
│  │        (可执行门禁, 非提示词)          │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

## 资产映射（本项目对应物）

### 1. Agentic Loop — 标准闭环流程

标准循环：**目标/验收标准 → 基线 → 实现 → 验证 gate → 独立评审 → 提交+日志 → 教训回写记忆**。

| 环节 | 位置 |
|---|---|
| 标准循环定义 | `.agents/skills/implement/SKILL.md` |
| 验收标准来源 | issue / `documention/plans/` spec |
| 验证 gate | `pnpm exec tsc --noEmit` / `pnpm lint` / `pnpm build` / `node scripts/check-guardrails.mjs` |
| 独立评审 | `.agents/skills/code-review/SKILL.md`（生成者不判自己的卷） |
| 迭代封顶 | implement skill 内置（无进展=失败信号，升级人工） |
| 暂停/恢复 | `.agents/skills/handoff/SKILL.md` + `documention/plans/ongoing/` |

> **验证可读性硬规则**：agent 不得自行调用 Playwright 截图/像素验证做视觉结论——
> 并非所有 agent 模型都是多模态的，截图对非多模态 agent 不可读。视觉验证必须用
> 文本/DOM/`getComputedStyle` 数值断言，或交人工/明确标注的多模态 agent 看截图。
> 详见 `documention/harness/MEMORY.md`（调试/验证方法坑）。

### 2. Skill / Tool System — 能力目录

Thin harness + thick skills。技能=工具+文档+行为规则的捆绑，按需加载。

| 资产 | 位置 |
|---|---|
| Skill 仓库 | `.agents/skills/`（核心闭环 + 写作规范） |
| Skill 选择路由 | `.agents/skills/ask-matt/SKILL.md` |
| Skill 写作规范 | `.agents/skills/writing-great-skills/SKILL.md` |
| 评审 | `.agents/skills/code-review/SKILL.md` |
| 交接 | `.agents/skills/handoff/SKILL.md` |

规则：技能应聚焦（3-8 个能力）、有 SKILL.md 说明"何时用/怎么用/约束"、可独立测试。
新技能上线前确认 `ask-matt` 能路由到它。

### 3. Memory & Context — 三层记忆

| 概念 | 范围 | 本项目位置 |
|---|---|---|
| Context | 单次调用装配 | `src/app/` 页面 + `src/collections/` schema |
| Session | 单次会话 | `.agents/skills/handoff/`（跨会话交接） |
| **Memory（长期）** | 跨会话持久 | **`documention/harness/MEMORY.md`（长期记忆）+ `documention/progress/`（daily logs）** |

双层记忆规则：
- **daily logs**（`documention/progress/`）：每次 push 后必写，便宜、追加即可（AGENTS.md）。
- **长期记忆**（`documention/harness/MEMORY.md`）：从 daily logs 提炼的可复用坑/规则，需要判断；发现新坑即写入，push 日志时顺带 curation。

注意：AGENTS.md 是**声明式行为规范**（该怎么做），MEMORY.md 是**经验式事实**（发生了什么、什么会坑）。两者都进上下文，职责不同。

### 4. Guardrails — 可执行门禁

核心原则（指南反复强调）：**约束必须在代码/CI 里，不在提示词里**。"请遵守规范"是概率性合规；"脚本卡住"才是确定性约束。

| 层级 | 实现 |
|---|---|
| 行为规则（声明式） | `AGENTS.md`（禁内部术语、风险分级决策） |
| 可执行扫描 | `scripts/check-guardrails.mjs`（用户面 banned-terms） |
| 构建门禁 | `pnpm lint` + `pnpm build` + `pnpm exec tsc --noEmit` |
| 高危操作（人工审批） | `git push` / 改 env / 改部署文件 → 必须显式请求，见 AGENTS.md |

风险分级（AGENTS.md）：Low/Medium/High，High 前置方案+回滚路径。

## 维护规则

1. **新坑/教训 → 写 `documention/harness/MEMORY.md`**（不是只记在 progress 里）。
2. **新技能 → 遵循 `writing-great-skills`，并确认 `ask-matt` 能路由到它**。
3. **新验证断言 → 进可执行脚本（guardrail / smoke），不要只写在 agent 记忆里**。
4. **guardrail 只增不减**：移除需说明理由；被拒绝/告警的行为要记录，用于改进提示词。
5. **一切循环封顶**：实现迭代、评审轮次、重计划都必须有上限；超限 = 规范问题，上报人工。

## 变更记录

- 2026-09-01：从 ElevatoX 迁移核心 harness 体系并适配（Payload CMS + Next.js 技术栈）。
