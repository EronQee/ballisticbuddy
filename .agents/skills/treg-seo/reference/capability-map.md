# treg SEO 能力映射（单一事实源）

> 2026-08-23 更新：全部端点经真实调用逐字段验证（成本与返回形状均为实测，见各节「实测返回」）。
> 每次调用前先读对应行的 `cost` 并上报用户。
> 调用格式：`python scripts/treg_call.py call <endpoint-id> --file body.json`（POST body 写临时文件，避开 PowerShell 引号坑）。
> 成本字段说明：`call` = 每次请求固定费用；`row` = 按返回行计费；`word` = 按词计费。
> 所有端点示例已实测成功，可直接复用。

## 1. keyword_volume — 关键词搜索量

| 端点 | 推荐 | 成本 | 参数要点 |
|---|---|---|---|
| `dataforseo.google.keywords.volume` | ✔ 推荐 | $0.09/call（无论词数都 flat） | body 数组：`keywords[]`(≤1000, ≤80字符)、`location_code`、`language_code` |
| `serpstat.google.keywords.volume` | 备选 | $0.0005/result（Serpstat 按返回行计费） | body：`method`、`params.keywords[]`、`params.se`(如 `g_us`) |

```json
[{"keywords": ["coffee"], "location_code": 2840, "language_code": "en"}]
```

实测返回（每词）：`search_volume`、`competition`(HIGH/MEDIUM/LOW)、`competition_index`、`cpc`、`low_top_of_page_bid`、`high_top_of_page_bid`、`monthly_searches[12]`(year/month/search_volume)。
**缺口**：本端点**无 kd、无 trend %、无 SERP features、无 search intent**——keyword-master 的 `kd/growth/seasonality/serp_features/intent` 请走 `keywords.ideas`。

## 2. keyword_ideas — 相关词 / 联想词（keyword-master 字段主来源）

| 端点 | 推荐 | 成本 | 参数要点 |
|---|---|---|---|
| `dataforseo.google.keywords.ideas` | ✔ 推荐 | $0.012 + $0.00012/词 | body 数组：`keyword`、`location_code`、`language_code`、`depth`(0-4, 默认1)、`limit`(1-1000, 默认100) |
| `serpapi.google.keywords.ideas` | 备选 | $0.015/success | queryParams：`engine=google_autocomplete`、`q`（无量/CPC/难度，仅真实说法） |

```json
[{"keyword": "coffee", "location_code": 2840, "language_code": "en", "depth": 1, "limit": 15}]
```

实测返回（每 item 含完整 `keyword_data`）：
- `keyword_info.search_volume` / `cpc` / `competition` / `competition_level` / `monthly_searches[12]`
- `keyword_info.search_volume_trend.{monthly,quarterly,yearly}`（% 涨跌）→ keyword-master `growth`
- `keyword_properties.keyword_difficulty`（0-100）→ keyword-master `kd`
- `serp_info.serp_item_types`（含 `ai_overview`、`people_also_ask`、`video`、`images` 等）→ keyword-master `serp_features`
- `avg_backlinks_info.{backlinks,referring_domains,referring_main_domains,rank}` → keyword-master `top10_referring_domains` 参考
- `search_intent_info.main_intent`（transactional/informational/commercial）→ keyword-master `intent`
- `related_keywords[]` 子词（每词递归同样结构，`depth` 控制层数）

**一个端点覆盖 keyword-master 大部分字段，是 Stage 3 的首选数据源。**

## 3. serp — SERP 排名跟踪

| 端点 | 推荐 | 成本 | 参数要点 |
|---|---|---|---|
| `dataforseo.google.serp.organic` | ✔ 推荐 | $0.002/call | body 数组：`keyword`、`location_code`、`language_code`、`depth`(默认10, 每10结果计1单位) |
| `dataforseo.x.serp-google-organic-live-advanced` | 需要完整 feature 时 | $0.002/call（实测；catalog 标 $0.004） | 同左 + `load_async_ai_overview`、`people_also_ask_click_depth`、`calculate_rectangles` |
| `serpapi.google.serp.organic` | 备选 | $0.015/success | queryParams：`engine=google`、`q`、`gl`、`hl`；分页用 `start`，不用 `num` |

```json
[{"keyword": "coffee", "location_code": 2840, "language_code": "en", "depth": 10}]
```

实测返回：
- 顶部 `item_types`（organic + popular_products + people_also_ask + related_searches；advanced 变体再加 short_videos/images/video）
- 每 organic item：`rank_group`、`rank_absolute`、`page`、`domain`、`title`、`description`、`url`、`breadcrumb`
- `se_results_count`（SERP 结果总数）、`refinement_chips[]`（New/Used/Under $350 等）
- **PAA**（`people_also_ask` item 带 `expanded_element` 含 `people_also_ask_ai_overview_expanded_element`）

**已验证：两种 SERP 端点都不返回 `ai_overview` item**——即使 keyword 的 `serp_item_types` 标了 `ai_overview` 且 `load_async_ai_overview: true`。AI Overview 检测请走 `dataforseo.x.ai-optimization-llm-mentions-target-metrics-live`（见第 6 节）。

## 4. competitor — 竞品分析

| 端点 | 推荐 | 成本 | 参数要点 |
|---|---|---|---|
| `dataforseo.google.domain.ranked_keywords` | ✔ 推荐 | $0.012 + $0.00012/词 | body 数组：`target`(域名去 scheme/www 或全 URL)、`location_code`、`language_code`、`limit`(1-1000)、`order_by`、`filters`、`historical_serp_mode`(live/lost/all)、`load_rank_absolute` |
| `spyfu.google.domain.competitors` | 备选 | $0.0002/result | queryParams：`domain`、`countryCode`、`pageSize`(≤550)、`startingRow` |
| `spyfu.google.domain.overview` | 备选 | $0.001/result(1行=1月) | queryParams：`domain`、`countryCode`、`pastNMonths`(务必给1) |

```json
[{"target": "ud-machine.com", "location_code": 2840, "language_code": "en", "limit": 30}]
```

实测返回：
- `total_count`（该域名排名的关键词总数）、`metrics.organic`：**pos_1/pos_2_3/pos_4_10/…/pos_91_100 位置分布 + `etv`(估计流量) + `is_new/is_up/is_down` + count** → 可直接验证 evidence-register 假设
- 每 item 含完整 `keyword_data`（volume/kd/serp_info/search_intent，同 keywords.ideas）
- **排序/过滤必须用完整点路径**：`order_by` 的值如 `["ranked_serp_element.serp_item.etv,desc"]`，`filters` 如 `["ranked_serp_element.serp_item.rank_group","<=",10]`（裸名如 `etv,desc` 会报 `Invalid Field: 'order_by'`）。每关键词的 etv 在 `ranked_serp_element.serp_item.etv`；`metrics.organic.etv` 是域级聚合，不能用于 item 排序。`historical_serp_mode` 用 `live`(默认)/`lost`/`all` 区分现存/丢失排名。
- 默认排序（`ranked_serp_element.serp_item.rank_group,asc`）可能返回与业务无关的低 KD 长尾词；按 `ranked_serp_element.serp_item.etv,desc` 排序才能看到真实流量来源，按子路径 `relative_url` 过滤才能验证某 cluster 的贡献

## 5. backlinks — 反链与权威度

| 端点 | 推荐 | 成本 | 参数要点 |
|---|---|---|---|
| `moz.web.url.metrics` | ✔ 推荐 | $0.00667/row(1 target) | body 对象：`targets[]`(≤50)、可选 `distributions`(+1 row) |
| `dataforseo.web.url.metrics` | 备选 | $0.024/call + $0.000036/row | body 数组：`targets[]`(≤1000)、`rank_scale`(one_hundred/one_thousand) |
| `moz.web.backlinks.summary` | ✔ 推荐 | $0.0133/call(2 rows: target + distributions) | body 对象：`targets[]`、`distributions: true`(必须) |
| `dataforseo.web.backlinks.summary` | 备选 | $0.024/call + $0.000036/row | body 数组：`target`、`internal_list_limit` |
| `moz.web.linking_domains.list` | ✔ 推荐 | $0.00667/域 | body 对象：`target`、`target_scope`(默认page, 用root_domain)、`filter`(external)、`limit`(1-50, 默认25)、`next_token`分页 |
| `moz.web.backlinks.list` | 备选 | $0.00667/链 | body 对象：`target`、`target_scope`、`filter`、`limit`(1-50) |
| `moz.web.anchors.list` | ✔ 推荐 | $0.00667/锚 | body 对象：`target`、`scope`、`limit`(1-50) |
| `dataforseo.web.backlinks.competitors` | 备选 | $0.024/call + $0.000036/row | body 数组：`target`、`limit`、`exclude_large_domains` |
| `moz.web.site.top_pages` | ✔ 推荐 | $0.00667/页 | body 对象：`target`、`scope`、`filter`、`sort`、`limit`(1-50) |
| `dataforseo.web.page.audit` | ✔ 推荐(技术审计) | **$0.00015/页** | body 数组：`url`(完整绝对URL) |

```json
{"targets": ["moz.com"]}
```

实测返回：
- `moz.web.url.metrics`：`page_authority`、`domain_authority`、`spam_score`、`link_propensity` + 全套 pages/root_domains 计数（to_page/to_subdomain/to_root_domain，含 nofollow/redirect/deleted 拆分）
- `moz.web.linking_domains.list`：每域 `root_domain`、`domain_authority`、`spam_score`、`link_propensity`、`to_target.{pages,nofollow_pages,redirect_pages,deleted_pages}`、`next_token` 分页续取
- `dataforseo.web.page.audit`（Stage 11 技术审计首选，超便宜）：`onpage_score`、`meta.{title,description,htags,canonical,favicon}`、`content.{plain_text_word_count, readability 6项, description_to_content_consistency}`、`page_timing.{time_to_interactive,largest_contentful_paint,first_input_delay}`、`cumulative_layout_shift`、`checks`(40+ 项布尔矩阵：title_too_long/no_image_alt/low_content_rate/…) 、`internal_links_count`、`external_links_count`、`resource_errors`、`broken_links/broken_resources`、`social_media_tags`。单页一次调用即可填 technical-seo-playbook 大半清单。

## 6. ai_visibility — AI 可见性 / AEO（AI Overview 检测唯一可靠路径）

| 端点 | 推荐 | 成本 | 参数要点 |
|---|---|---|---|
| `dataforseo.x.ai-optimization-llm-mentions-target-metrics-live` | ✔ 推荐 | $0.101/call | body 数组：`target[]`(domain 或 keyword 实体 + `search_scope:["answer"]`)、`location_code`、`language_code`、`platform`(chat_gpt/google)、`internal_list_limit` |
| `dataforseo.x.ai-optimization-ai-keyword-data-keywords-search-volume-live` | 备选 | $0.0102/call | body 数组：`keywords[]`(≤1000)、`location_code`、`language_code` |
| `dataforseo.x.ai-optimization-chat-gpt-llm-responses-live` | 备选 | $0.0292/call | body 数组：`user_prompt`(≤500字符)、`model_name`、`web_search`、`max_output_tokens` |

```json
[{"language_code": "en", "location_code": 2840, "platform": "chat_gpt", "target": [{"keyword": "egg roll machine", "search_scope": ["answer"]}], "internal_list_limit": 5}]
```

实测返回（llm-mentions）：`aggregated_metrics` 含
- 顶层：`total.mentions`（总提及数）、`total.ai_search_volume`（AI 搜索量）
- `sources_domain[]`（被 AI 引用最多的域名：key + mentions + ai_search_volume）
- `search_results_domain[]`（AI 搜索返回中出现的域名）
- `brand_entities_title[]` / `brand_entities_category[]`
- `platform[]` / `location[]` / `language[]` 维度聚合

**Stage 9 的 AI 可见性基线直接取自本端点；SERP 端点无法替代。**

## 委派规则

- **GSC（自有站点数据）**：不在此表。用已配置的 `gscServer` MCP：
  `gscServer_get_search_analytics` / `inspect_url_enhanced` / `list_sitemaps_enhanced`。
- 所有端点响应含 `cost` 字段时，务必向用户报告实际花费。
- 4xx 是参数错误，修参数不换供应商；429/5xx/超时才按「备选」列降级，且重建请求体。
