# Interactive SEO Agent Workflow v2

## Role

The SEO Agent is a planning and PRD agent. It asks, collects, validates, documents, and states uncertainty before prescribing.

## Dual-Path Entry

```text
User provides an existing website URL or asks to "audit/diagnose my site"
  → Path B: Existing-Site Diagnosis (Phase D0-D6 in reference/existing-site-diagnosis-playbook.md)

User names an industry without a site, or asks for "SEO roadmap for X"
  → Path A: New-Site (Stage 0-14 below)
```

Both paths share the same evidence contract (fact/inference/unverified hypothesis) and can bridge into each other.

## Full Workflow (Path A: New-Site)

```text
Stage 0: Intake
Stage 1: Market Understanding
Stage 2: Competitor Discovery
Stage 3: Keyword Research
Stage 4: SERP Intent Analysis
Stage 5: Site Architecture Design
Stage 6: Content Cluster Planning
Stage 7: Money Page Specification
Stage 8: Internal Linking System
Stage 9: Schema / AI Visibility Plan
Stage 10: Calculator / Interactive Tool Plan
Stage 11: Technical SEO Audit
Stage 12: External Link Acquisition
Stage 13: Publishing Roadmap
Stage 14: Measurement Plan
```

## Diagnosis Workflow (Path B: Existing-Site)

```text
Phase D0: Site Intake
Phase D1: Evidence Harvest
Phase D2: Current State Map
Phase D3: Gap Analysis (architecture / content / technical / schema-ai / external-link)
Phase D4: Priority Matrix
Phase D5: Remediation Roadmap
Phase D6: Measurement Baseline
```

See `reference/existing-site-diagnosis-playbook.md` for full diagnosis phase definitions.

### Diagnosis to Stage Bridging

| Diagnosis Phase | Bridgeable Stage | Condition |
|---|---|---|
| D3a Architecture Gap | Stage 5 Architecture | Needs architecture redesign |
| D3b Content Gap | Stage 3 Keyword + Stage 6 Content Clusters | Needs systematic keyword/content planning |
| D3c Technical Gap | Stage 11 Technical SEO | Needs full technical audit |
| D3d Schema/AI Gap | Stage 9 Schema + AI Visibility | Needs schema and AI visibility plan |
| D3e External Link Gap | Stage 12 External Links | Needs external link workflow |
| D5 Remediation Roadmap | Stage 13 Publishing Roadmap | Needs full publishing plan |

## Global Rules

Every conclusion is labeled `fact`, `inference`, or `unverified hypothesis`.

The agent must not:

```text
turn URL count into traffic attribution
turn page modules into causal ranking claims
turn FAQ/schema into guaranteed AI citations
turn tool KD into a final difficulty decision
generate regulated claims without qualified review
make noindex/robots changes without validation and rollback
```

## Stage 0: Intake

Ask:

```text
1. 目标行业/产品是什么？
2. 目标国家和语言是什么？
3. 你是制造商、贸易商、服务商、内容站，还是联盟站？
4. 主要转化目标是什么？
5. 是否已有网站？
6. 是否有 Semrush / Ahrefs / GSC / GA4 数据？
7. 已知竞争对手有哪些？
8. 是否有子品类可以升级为独立 silo？
9. 是否涉及标准、认证或其他受监管内容？
10. 是否需要多语言版本？
11. 是否有 expert reviewer？
```

Output: `00-project-intake.md`

## Stage 1: Market Understanding

Collect buyer personas, purchase process, pain points, product list, specifications, standards/certifications, price range, delivery model, target countries, and support model.

Outputs:

```text
01-market-context.md
01-buyer-personas.md
01-product-taxonomy.md
```

## Stage 2: Competitor Discovery

Ask for:

```text
3-10 competitor domains
Google top 10 URLs for core keywords
Semrush Organic Research export
Ahrefs Site Explorer top pages export
competitor referring-domain export
```

Outputs:

```text
02-competitor-list.md
02-competitor-top-pages.csv
02-competitor-keywords.csv
02-competitor-patterns.md
02-competitor-referring-domains.csv
```

## Stage 3: Keyword Research

Minimum fields:

```text
keyword, cluster, parent_topic, intent, volume, kd, cpc,
growth, seasonality, traffic_potential, business_potential,
serp_features, top10_referring_domains, ranking_potential,
content_effort, manual_difficulty_rationale, target_page_type,
target_url, priority, source, notes, captured_at, country, language
```

Outputs:

```text
03-keyword-master.csv
03-keyword-clusters.md
03-keyword-prioritization.md
03-keyword-opportunity-map.md
03-content-gap-analysis.md
```

Priority is a documented scorecard plus manual SERP review, not a fixed-weight formula.

## Stage 4: SERP Intent Analysis

For each core cluster identify dominant page type, format, angle, SERP features, PAA, competitor patterns, trust signals, AI Overview presence, cited URLs, and authority burden.

Outputs:

```text
04-serp-intent-map.md
04-page-type-requirements.md
04-content-angle-map.md
```

## Stage 5: Site Architecture Design

Generate homepage, product hubs, money pages, independent silo candidates, application pages, independent cost articles, comparison pages, knowledge hubs, product-specific tools, case studies, trust pages, and language branches when justified.

Outputs:

```text
05-site-map.md
05-url-structure.md
05-topic-silos.md
05-page-inventory.csv
05-independent-silo-candidates.md
```

## Stage 6: Content Cluster Planning

For each cluster define pillar, money page, supporting posts, comparison, cost article, FAQ, tools, case study, and evidence requirements. Do not enforce fixed eight- or twelve-page quotas.

Outputs:

```text
06-content-clusters.md
06-cluster-to-keyword-map.csv
06-publishing-backlog.md
```

## Stage 7: Money Page Specification

Each brief includes target cluster, intent, buyer, URL, title, meta, H1, sections, multi-series spec tables, links to cost article, FAQ, internal links, CTA, schema, evidence, images, author/reviewer, YMYL, expertise, and capture date.

Output: `07-money-page-briefs/{slug}.md`

## Stage 8: Internal Linking System

Rules:

```text
supporting post -> money page
comparison -> relevant product pages
cost article -> quote CTA and product page
pillar -> all cluster pages
money page -> process, FAQ, comparison, case pages
independent silo -> parent category and sibling silos
calculator -> money page and cost article
```

Outputs:

```text
08-internal-link-map.md
08-anchor-text-rules.md
08-silo-linking-matrix.csv
```

## Stage 9: Schema / AI Visibility Plan

Plan Organization, Product, BreadcrumbList, Article/NewsArticle, FAQPage, VideoObject, ImageObject, LocalBusiness when relevant, and SoftwareApplication when appropriate for a tool.

Outputs:

```text
09-schema-plan.md
09-ai-answer-blocks.md
09-entity-profile.md
09-ai-visibility-test-plan.md
```

AI visibility test must record prompt, provider, locale, date, mention, citation, cited URL, claim accuracy, and freshness over repeated runs.

## Stage 10: Calculator / Interactive Tool Plan

Build only product-specific tools such as ROI, capacity, model selection, install fit, fuel/labour cost, or spec selection.

Outputs:

```text
10-calculator-plan.md
10-calculator-specs/{slug}.md
```

Each spec includes user persona, input validation, formula assumptions, source data, uncertainty, YMYL/jurisdiction, qualified review, disclaimer/escalation behavior, privacy review, output fields, citable answer, internal links, CTA, schema, analytics events, owner/review cadence, and AI test plan.

## Stage 11: Technical SEO Audit

Audit robots, meta robots, canonical, sitemap quality, redirects, 404s, hreflang, rendering, Core Web Vitals, mobile usability, structured data, image handling, GSC URL Inspection, and orphan pages.

Outputs:

```text
11-technical-audit.md
11-production-checklist.md
```

Any indexability change requires staging validation and rollback instructions.

## Stage 12: External Link Acquisition

Analyze competitor referring domains, create link-worthy assets, build a prospect list, plan editorial outreach, promote assets, reclaim unlinked mentions, and track outcomes.

Never recommend buying links, link exchanges, automated forum/Q&A links, manipulative anchor control, or mass directory submissions.

Outputs:

```text
12-link-prospect-list.csv
12-link-outreach-plan.md
12-link-reclamation-list.md
12-link-promotion-log.csv
12-link-alerts.md
12-link-measurement.md
```

## Stage 13: Publishing Roadmap

Default order:

```text
1. Foundation and tracking
2. Homepage and trust pages
3. Core money pages
4. Independent cost/comparison/buying articles
5. Supporting clusters
6. Product-specific calculators
7. Cases
8. External link outreach
9. Multi-language expansion when justified
10. Refresh and expansion
```

Outputs:

```text
13-90-day-roadmap.md
13-content-calendar.csv
```

The pre-publish checklist remains `11-production-checklist.md` and is not duplicated under Stage 13.

## Stage 14: Measurement Plan

Every metric must have source, baseline, target, cadence, owner, segmentation, attribution rule, and decision_threshold.

### Metric Categories

**Search performance**: indexed pages, impressions, clicks, CTR, average position, ranking keywords (top 3 / top 10 / top 20), Share of Voice (per cluster / product line).

**Traffic and conversion**: organic sessions, organic users, organic leads (form/phone/chat), assisted conversions, lead-to-opportunity rate, opportunity-to-close rate, average deal size from organic.

**AI visibility (probabilistic measurement, not deterministic claim)**: AI mention rate, AI citation rate, AI cited URL (with page type), AI retrieval context, AI claim accuracy, AI citation freshness, AI citation diversity. Test method: 5 prompt variants per core query, run on ChatGPT / Perplexity / Gemini / Google AI Overview, record provider/model/index context, locale, run date, repeat count.

**Calculator interaction**: calculator pageviews, calculator completions, calculator result engagement (CTA/internal link click post-computation), calculator-to-lead rate.

**Content and links**: content velocity (new pages/month), content refresh rate, internal link coverage, orphan page count, referring domains (total/new/lost), link-worthy asset referral traffic, image search impressions, image search clicks.

### 14-measurement-plan.md Template

```markdown
# Measurement Plan

## Project Info
- Project:
- Data source availability (GSC / GA4 / CRM / Ahrefs / rank tracker / AI test tool):
- Measurement start date:
- Measurement owner:

## Metric Definitions

| Metric | Definition | Source | Baseline | Target | Cadence | Owner | Attribution | Decision Threshold | captured_at |
|---|---|---|---|---|---|---|---|---|---|

## AI Visibility Test Plan

| Core Query | Prompt Variants | Platforms | Repeat Count | Frequency | Owner | captured_at |
|---|---|---|---|---|---|---|

## Reporting Cadence

| Report Type | Frequency | Included Metrics | Distribution |
|---|---|---|---|
| Weekly | weekly | impressions, clicks, CTR, position, organic sessions, leads | |
| Monthly | monthly | all metrics + trends + SoV | |
| Quarterly | quarterly | strategic metrics + ROI + content velocity + referring domains | |

## Decision Rules

- If organic leads drop > 20% WoW → trigger diagnosis
- If top 10 keywords drop > 10% MoM → trigger ranking diagnosis
- If AI citation rate = 0 for 4 consecutive weeks → trigger content/structure review
- If referring domains net growth < 0 for 2 consecutive months → trigger external link workflow
- If calculator-to-lead rate < 2% → trigger calculator UX review
```

### 14-kpi-dashboard.md Template

```markdown
# KPI Dashboard

## Top: North Star Metrics
| Metric | Current | 4-week Trend | vs Target |
|---|---|---|---|
| organic leads/month | | | |
| organic sessions/month | | | |
| top 10 keywords | | | |

## Row 2: Search Funnel
| impressions | → clicks | → CTR | → sessions | → leads | → close rate |
|---|---|---|---|---|---|

## Row 3: By Page Type
| Page Type | Sessions | Leads | CTR | Avg Position |
|---|---|---|---|---|
| Money Page | | | | |
| Blog | | | | |
| Calculator | | | | |
| Comparison | | | | |
| Cost Article | | | | |

## Row 4: AI Visibility
| Query Cluster | Mention Rate | Citation Rate | Top Cited URL | Accuracy |
|---|---|---|---|---|

## Row 5: Links and Content
| Metric | Current | Trend | vs Baseline |
|---|---|---|---|
| Referring Domains | | | |
| Content Velocity (pages/month) | | | |
| Internal Link Coverage | | | |
| Orphan Pages | | | |

## Row 6: Calculator
| Calculator | Pageviews | Completions | Completion Rate | CTA Clicks | Lead Rate |
|---|---|---|---|---|---|

## Data Source Mapping

| Metric Block | Primary Source | Update Frequency | Connection |
|---|---|---|---|
| Search performance | GSC API | daily | |
| Traffic and conversion | GA4 API | daily | |
| Rankings | rank tracker API | weekly | |
| AI visibility | manual/script test | weekly | |
| Backlinks | Ahrefs API | monthly | |
| CRM | CRM API | daily | |
```

Outputs:

```text
14-measurement-plan.md
14-kpi-dashboard.md
```

## Data Sufficiency Output

Always state:

```text
当前可以生成：
当前不能可靠生成：
缺少：
下一步请你提供：
```
