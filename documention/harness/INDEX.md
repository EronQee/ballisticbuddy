# BallisticBuddy Memory Index

> Agent 根据当前任务类型**按需加载**对应记忆文件，不要全量读取。
> 本文件 + procedural/agent-behavior.md + procedural/verification.md = 每次会话必加载。

## 三层记忆架构

```
documention/harness/
├── INDEX.md                ← 你在这里（路由索引）
├── semantic/               持久事实："我知道什么"
│   ├── payload.md          Payload schema/迁移/draft/media
│   ├── frontend.md         Next.js 服务/缓存/构建/主题门
│   ├── i18n.md             next-intl/proxy/Payload localization
│   ├── content-model.md    collections/blocks/正文本地化
│   ├── deploy-ci.md        Vercel/env/native 依赖
│   └── tooling.md          guardrail 脚本/正则/PowerShell
├── episodic/               事件复盘："发生了什么"
│   ├── ui-preview-whiteout-20260901.md
│   ├── proxy-matcher-hijack-20260903.md
│   └── plasmic-apphost-turbopack-side-effect-import-20260904.md
└── procedural/             行为规则："该怎么做"
    ├── agent-behavior.md   惯例≠默认/复盘信号/知识固化
    ├── troubleshooting.md  先搜索后苦干/DOM≠视觉/截图契约
    ├── verification.md     验证清单
    └── new-page.md         新建页面标准流程
```

## 路由表：按任务类型加载

| 任务类型 | 加载文件 |
|---|---|
| Payload collection/migration/draft/media | `semantic/payload.md` |
| Next.js 缓存/构建/端口/白屏 | `semantic/frontend.md` + `procedural/troubleshooting.md` |
| i18n/翻译/字典/proxy/matcher | `semantic/i18n.md` |
| blocks/正文内容/搜索索引 | `semantic/content-model.md` |
| Vercel/env/部署 | `semantic/deploy-ci.md` |
| guardrail/脚本/正则 | `semantic/tooling.md` |
| 排查故障/报错 | `procedural/troubleshooting.md` + 相关 semantic 文件 |
| 验证改动 | `procedural/verification.md` |
| **新建/改造页面** | `procedural/new-page.md` + `semantic/i18n.md` |
| Agent 行为反思 | `procedural/agent-behavior.md` |
| 回顾历史事件 | `episodic/` 按文件名日期查找 |

## 每次会话必加载

1. **本文件**（INDEX.md）— 路由表
2. **`procedural/agent-behavior.md`** — 行为规则
3. **`procedural/verification.md`** — 验证清单

## 新坑写入规则

1. 先查本文件路由表，找到对应文件路径
2. 直接 append 到该文件（semantic/episodic/procedural 对应层）
3. 没有匹配文件 → 新建一个并在路由表中注册
4. **只写提炼后的事实/规则**，禁止粘贴原始 progress log 段落（Files/Validation/
   Deployment 等日志结构留在 `documention/progress/`）
5. **禁止**往 `MEMORY.md.deprecated` 追加内容（已废弃）

## Consolidation（教训提炼）

从 `documention/progress/` 提炼到本目录：

```bash
node scripts/consolidate-memory.mjs           # dry-run：只输出"哪些 progress 条目
                                              #   匹配了哪个记忆文件"的建议，不写文件
node scripts/consolidate-memory.mjs --days 3  # 只看最近 N 天
```

**设计约束**：本脚本只做建议器（dry-run），**永不自动写文件**——curation 是人工/
agent 的编辑动作。关键词分类不可靠，自动写入会把原始日志灌进记忆文件、
污染记忆质量。

## 维护规则

1. **新坑/教训 → 写对应 semantic/episodic/procedural 文件**（不是只记在 progress 里）
2. **新技能 → 遵循 `writing-great-skills`，并确认 `ask-matt` 能路由到它**
3. **新验证断言 → 进 `scripts/check-guardrails.mjs`（或测试），不要只写在 agent 记忆里**
4. **guardrail 只增不减**：移除需说明理由
5. **一切循环封顶**：超限 = 规范问题，上报人工
