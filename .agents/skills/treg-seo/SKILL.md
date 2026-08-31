---
name: treg-seo
description: >
  Live SEO data gateway through treg — keyword volume/ideas, SERP, competitor
  analysis, backlinks & authority, and AI visibility. Use when a SEO task needs
  real external numbers that theory cannot supply: "keyword volume", "搜索量",
  "SERP", "排名", "backlinks", "反链", "DA/PA", "竞争对手关键词", "AI 可见性",
  "LLM mentions", "竞品调研". Own-site data (GSC) is NOT routed here — use the
  gscServer MCP tools instead.
---

# treg-seo — 给 SEO skills 的外部触手

SEO 理论 skill（seo-plan / seo-backlinks / seo-page / seo-geo / seo-agent-workflow 等）
只负责方法，**实时数据统一走本 adapter**。每个调用都要花钱（余额有限），所以先读成本再确认，
绝不默认连打一串。

## 何时用它（而不是直接编数据）

当任务需要以下**外部实时数据**时，先在这里查能力映射，再决定调用：

| 能力 | 对应阶段 |
|---|---|
| keyword_volume / keyword_ideas | 关键词调研、内容 brief |
| serp | SERP 意图、页面分析、竞品排名 |
| competitor | 竞品分析、域名排名词 |
| backlinks | 反链概况、DA/PA、锚文本、引用域 |
| ai_visibility | GEO / AI Overview 对标 |

**已实测端点速查（2026-08-23 验证，价格/返回字段均为实测，细节见 `reference/capability-map.md`）：**

```text
keywords.volume           $0.09/flat        volume/cpc/competition_index/monthly_searches（无kd/trend/intent）
keywords.ideas            $0.012+/seed      kd + trend% + serp_item_types(含ai_overview) + referring_domains + intent  ← keyword-master 主源
serp.organic              $0.002            rank/domain/PAA/related_searches
serp-organic-advanced     $0.002~0.004      加 video/images/short_videos + PAA 展开（仍无 ai_overview item）
domain.ranked_keywords    $0.012+           total_count + metrics.organic(pos分布+etv) + 每词 keyword_data
moz.url.metrics           $0.00667/row      DA/PA/spam_score/link counts
moz.linking_domains       $0.00667/域       引用域 + DA/spam + to_target + next_token
page.audit                $0.00015/页       onpage_score/TTI/LCP/CLS/checks矩阵/可读性 ← Stage 11 技术审计
ai llm-mentions           $0.101            mentions/ai_search_volume/sources_domain ← AI Overview 唯一可靠检测
```

**已验证限制**：SERP 端点（含 advanced + `load_async_ai_overview`）不返回 `ai_overview` item；AI Overview 检测必须走 `dataforseo.x.ai-optimization-llm-mentions-target-metrics-live`。

**原则：没有实时数据就没有结论。** 任何 skill 若声称"搜索量、DA、排名、竞品词"，
都必须来自本 adapter（或 gscServer MCP），不得凭记忆编造。

## 成本纪律（硬规则）

1. **调用前**执行 `python scripts/treg_call.py balance`，并向用户报出本能力的单价
   （见 `reference/capability-map.md` 的 `cost` 列）。
2. **确认一次即可**：同一批廉价调用（如 keyword_volume、serp）打包确认，不逐条问。
3. **绝不 4xx 换供应商重试**：4xx 通常是参数错误，修参数，不是换端点。
4. **GSC 数据不进 treg**：自有站点 performance / url_inspection / sitemaps
   用已配置的 `gscServer` MCP（免费），本 adapter 不提供 GSC 端点。
5. **备选降级顺序**：能力映射里的 `推荐` 供应商失败（429/5xx/超时）时，
   改用 `备选` 供应商（参数不同，重建请求）。

## 调用方式

```
python scripts/treg_call.py balance                     # 先看余额
python scripts/treg_call.py call <endpoint-id> --dry-run
python scripts/treg_call.py call <endpoint-id> --query engine=google --query q=coffee   # GET
python scripts/treg_call.py call <endpoint-id> --file body.json                          # POST（原始 body）
```

- `--dry-run`：只打印将发送的请求，不真正调用（不花钱）。
- GET 端点用 `--query K=V`（可重复）；POST 端点用 `--file <json>`（原始 body）或 `--data '<json>'`。
- **PowerShell 坑**：内联 `--data '{"a": 1}'` 的双引号会被吞掉，POST body 一律写进临时文件再 `--file`。
- 端点 ID、参数表 → `reference/capability-map.md`（单一事实源）。
- 凭证从 `<skill>/.treg/config.json` 运行时读取，**不回显、不入 repo**。

## 输出约定

- 一律 UTF-8 JSON；脚本内部已做 `reconfigure(encoding='utf-8')`，不受 PowerShell GBK 影响。
- 响应中包含 `cost_usd` 时，向用户报告实际花费。
- 未命中端点/参数错误：报告 treg/上游返回的原始错误，不臆造。

## 与 gscServer MCP 的分工

| 数据 | 走哪 |
|---|---|
| 自有站点：clicks/impressions/URL inspection/sitemaps | `gscServer` MCP（免费） |
| 外部：关键词量/SERP/竞品/反链/AI 可见性 | 本 adapter（treg 计费） |
