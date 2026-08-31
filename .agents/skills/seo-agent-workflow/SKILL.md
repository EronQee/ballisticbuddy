---
name: seo-agent-workflow
description: >
  Interactive SEO workflow for SEO PRDs, keyword research, competitor reverse
  engineering, site architecture, content clusters, calculators, technical SEO,
  external links, AI visibility, and roadmaps. Use when the user asks for SEO
  路线图, SEO PRD, 关键词调研, 内容布局, 网站架构, 逆向竞品 SEO, calculator
  流量入口, 外链工作流, 技术 SEO 审计, or an agent-led SEO planning process.
  Also handles existing-site diagnosis: audit my site, diagnose my website SEO,
  网站诊断, SEO 审计, 看看我的网站.
license: MIT
metadata:
  author: OpenCode
  version: "0.3.0"
  category: seo
  rebuilt: "2026-07-27"
---

# SEO Agent Workflow v2

## Mission

Run an evidence-led SEO process through one of two paths:

```text
Path A — New site:  intake -> request data -> validate sufficiency -> analyze -> produce linked stage documents -> roadmap -> measurement

Path B — Existing site:  site intake -> evidence harvest -> current state map -> gap analysis -> priority matrix -> remediation roadmap -> measurement baseline
```

Do not produce a complete roadmap from a vague industry name. Ask only the questions needed for the current stage, then wait when a user decision is required.

## Dual-Path Entry

At Stage 0 Intake, determine which path:

```text
User provides an existing website URL → Path B (Diagnosis)
User names an industry without a site → Path A (New-site)
User asks to "audit/diagnose my site" → Path B
User asks for "SEO roadmap for X industry" → Path A
```

Both paths share the same evidence contract and can bridge into each other.

## Evidence Contract

Label every material conclusion:

- `fact`: directly observed in a URL, export, HTML, schema, sitemap, or user source.
- `inference`: a defensible interpretation without outcome data.
- `unverified hypothesis`: a causal or forecast claim requiring GSC, Ahrefs, experiments, or repeated AI tests.

Record source URL/file, capture date, raw signal, and confidence. URL count is not traffic; schema or FAQ is not guaranteed ranking or AI citation; a competitor pattern is not automatically a recommendation.

Live external data (keyword volume, SERP, competitor keywords, backlinks, AI visibility) comes from the **treg-seo** adapter skill (`.agents/skills/treg-seo/`); own-site data comes from the `gscServer` MCP. Do not invent numbers the evidence contract requires.

Field-to-endpoint map (all verified 2026-08-23, full bodies in treg-seo `reference/capability-map.md`):

```text
keyword volume/CPC/seasonality      -> dataforseo.google.keywords.volume ($0.09/flat)
kd/growth/serp_features/intent      -> dataforseo.google.keywords.ideas ($0.012+/seed)
SERP ranks/domains/PAA              -> dataforseo.google.serp.organic ($0.002)
SERP full features (video/images)   -> dataforseo.x.serp-google-organic-live-advanced ($0.002)
competitor keyword footprint/ETV    -> dataforseo.google.domain.ranked_keywords ($0.012+)
DA/PA/Spam Score                    -> moz.web.url.metrics ($0.00667/target)
referring domains                   -> moz.web.linking_domains.list ($0.00667/domain)
per-page technical audit            -> dataforseo.web.page.audit ($0.00015/page)
AI mentions/ai_search_volume        -> dataforseo.x.ai-optimization-llm-mentions-target-metrics-live ($0.101)
```

`dataforseo.google.domain.ranked_keywords` can upgrade `unverified hypothesis` entries in `evidence-register.md` (e.g. "2026 decision-cluster drives rankings") by providing `metrics.organic` position distribution, ETV, and is_new/is_up/is_down for the domain — but verify cluster-level claims by filtering ranked keywords against the cluster's money-page sub-path, since domain-wide top results may be dominated by unrelated long-tail.

When reverse engineering UD Machine, load `reference/evidence-register.md`, `reference/ud-machine-success-patterns.md`, and `reference/ud-machine-site-architecture.md`. The live reconstruction was captured on 2026-07-27; refresh time-sensitive facts before reusing them.

## Branch References

Load only the references required by the active branch:

| Branch | References |
|---|---|
| Full workflow | `reference/agent-workflow.md`, `reference/document-system.md` |
| Existing-site diagnosis | `reference/existing-site-diagnosis-playbook.md` |
| Keyword/content | `reference/keyword-content-engine.md`, `reference/keyword-priority-scorecard.md` |
| Calculator/tools | `reference/calculator-playbook.md` |
| Technical SEO | `reference/technical-seo-playbook.md` |
| Local SEO | `reference/local-seo-playbook.md` |
| External links | `reference/external-link-playbook.md` |
| Ahrefs coverage | `reference/ahrefs-methodology-map.md` |
| New-industry example | `reference/industry-roadmap-template.md` |

`reference/README.md` is the complete reference index. Workspace source artifacts are `docs/seo-reverse-ud-machine/` and `ahrefs-seo-guide.md` when available.

## Core UD Machine Model

Observed pattern:

```text
Money page = product + multi-series specs + process + FAQ + internal-link hub
Price intent = independent cost article, not a presumed money-page module
Independent product silo = distinct product system + evidence + tools + comparisons + content category
Product calculator = decision utility inside its relevant product silo
```

Plan assets from business value, SERP intent, evidence, and maintenance capacity. Do not enforce fixed 8-page or 12-page quotas.

## Workflow

### Stage 0: Intake

Collect business type, products, target countries/languages, conversion goal, website, available data, competitors, regulated-content exposure, reviewer availability, multilingual need, and plausible independent-silo candidates.

If the user provides an existing website URL or asks to audit/diagnose a site, activate Path B (Existing-Site Diagnosis) via `reference/existing-site-diagnosis-playbook.md` instead of continuing with Stage 1-14 below. The diagnosis path has its own D0-D6 phases and can bridge back into any Stage when deeper planning is needed.

Output: `00-project-intake.md`.

Completion: required business, market, product, data, and constraint fields are answered or explicitly marked unknown.

### Stage 1: Market Understanding

Map buyers, purchase process, pain points, product taxonomy, specifications, standards, pricing model, delivery, and support.

Outputs: `01-market-context.md`, `01-buyer-personas.md`, `01-product-taxonomy.md`.

Completion: every proposed commercial page maps to a real product, buyer, and conversion.

### Stage 2: Competitor Discovery

Collect 3-10 relevant competitors, core-query top results, top pages/keywords, and referring-domain exports. Give exact search/export instructions when data is missing.

Outputs include `02-competitor-patterns.md` and `02-competitor-referring-domains.csv`.

Completion: patterns are separated into observed, copyable with conditions, and noise/risk.

### Stage 3: Keyword Research

Build the v2 keyword schema, including growth, seasonality, SERP features, top-result authority burden, ranking potential, effort, country, language, capture date, and manual difficulty rationale.

Use `reference/keyword-priority-scorecard.md`; tool KD is an input, not the decision. Restore `03-content-gap-analysis.md` as a required deliverable.

Data: `dataforseo.google.keywords.ideas` is the primary source — one call per seed returns per-keyword `search_volume`, `keyword_difficulty`, `cpc`, `search_volume_trend` (monthly/quarterly/yearly %), `serp_info.serp_item_types`, `avg_backlinks_info` (referring_domains), and `search_intent_info.main_intent`, i.e. it fills the keyword-master `kd/growth/seasonality/serp_features/intent` fields in a single endpoint. Use `dataforseo.google.keywords.volume` only for flat batch volume/CPC of many head keywords (it has no kd/trend/features/intent). Exact bodies, costs, and verified response shapes: `reference/capability-map.md` in the **treg-seo** adapter skill.

Completion: every prioritized keyword has a business path, SERP review, evidence requirement, target page type, and rationale.

### Stage 4: SERP Intent

Inspect dominant type, format, angle, trust signals, PAA, SERP features, AI Overview presence/citations, and authority burden.

Data: `dataforseo.google.serp.organic` ($0.002) for organic rankings, domains, PAA, and related searches; use `dataforseo.x.serp-google-organic-live-advanced` when the full feature set (video/images/short_videos + expanded PAA) is needed. Verified limitation: **neither SERP endpoint returns an `ai_overview` item** — AI Overview presence must come from `dataforseo.x.ai-optimization-llm-mentions-target-metrics-live` (Stage 9). Bodies/costs in treg-seo `reference/capability-map.md`.

Completion: no keyword becomes a page until its page type and intent are justified.

### Stage 5: Architecture

Design hubs, money pages, applications, independent cost articles, comparisons, knowledge pages, product-specific tools, trust pages, language branches, and independent-silo candidates.

An independent silo requires commercial demand, a distinct product/spec system, technical distinction, evidence, and maintenance capacity.

Completion: every URL has a role, parent, conversion path, canonical intent, and owner.

### Stage 6: Content Clusters

Define required, conditional, and optional assets per cluster. Avoid quota-driven thin content and cannibalization.

Completion: each asset has unique intent, evidence, internal links, and downstream action.

### Stage 7: Money Page Briefs

Specify target cluster, buyer, title/H1, modules, multi-series spec fields, link to independent cost article, FAQ, CTA, schema, evidence, images, author/reviewer, YMYL flag, expertise, and capture date.

Completion: regulated, safety, price, ROI, and certification claims have sources and qualified review.

### Stage 8: Internal Links

Map supporting content, cost articles, comparisons, calculators, parent hubs, sibling silos, and money pages with contextual anchors.

Completion: no planned indexable page is orphaned and every informational/tool page has a useful next step.

### Stage 9: Schema and AI Visibility

Plan only schema matching visible content. Treat AI visibility as probabilistic. Test repeated prompt variants across providers/locales and record mention, citation, cited URL, accuracy, freshness, and retrieval context separately.

Data: baseline from `dataforseo.x.ai-optimization-llm-mentions-target-metrics-live` — returns aggregate mentions, ai_search_volume, `sources_domain` (which domains AI cites), `search_results_domain`, and brand entities, per platform. For prompt-level answers use `dataforseo.x.ai-optimization-chat-gpt-llm-responses-live`. Do NOT rely on SERP endpoints for AI Overview detection (verified absent). Bodies/costs in treg-seo `reference/capability-map.md`.

Completion: every AI claim has a repeatable measurement plan, not a promise.

For a storefront, service-area business, or location-driven demand, activate `reference/local-seo-playbook.md` and complete its GBP, citation, review, local-SERP, location-page, and rank-tracking gates.

### Stage 10: Calculators

Build only product-specific decision tools: ROI/payback, capacity, model selection, install fit, fuel/labour cost, or specification selection.

Each spec defines persona, inputs, validation, formulas, assumptions, outputs, sources, uncertainty, YMYL/jurisdiction, qualified review, disclaimer/escalation behavior, privacy review, CTA, internal links, analytics events, maintenance owner, and AI test plan.

Completion: the tool is useful without forced lead capture and all outputs are defensible.

### Stage 11: Technical SEO

Audit robots, indexability, canonical, sitemaps, redirects, rendering, hreflang, mobile/CWV, schema, images, orphans, and GSC evidence. Interactive tools require source/render checks and crawlable explanatory output.

Data: `dataforseo.web.page.audit` ($0.00015/page) returns per-URL onpage_score, page_timing (TTI/LCP/FID), CLS, htags, readability indices, a 40+ item checks matrix, internal/external link counts, resource errors, and broken-link flags — enough to fill most of `reference/technical-seo-playbook.md` per page without a Screaming Frog crawl. Full crawlability (sitemap/orphans/redirect chains) still requires sitemap parsing + GSC. Bodies/costs in treg-seo `reference/capability-map.md`.

Any indexability change requires staging validation and rollback instructions.

Outputs: `11-technical-audit.md`, `11-production-checklist.md`.

### Stage 12: External Links

Analyze competitor referring domains; create link-worthy data, tools, comparisons, and research; build qualified prospects; plan editorial outreach, promotion, and reclamation.

Data: `dataforseo.google.domain.ranked_keywords` returns a domain's full keyword footprint with `metrics.organic` position distribution + ETV, useful for competitor reverse engineering; `moz.web.url.metrics` gives DA/PA/Spam Score; `moz.web.linking_domains.list` lists referring root domains with DA/spam and per-domain link counts. All three verified working; bodies/costs in treg-seo `reference/capability-map.md`.

Exclude paid links, exchanges, automated forum links, manipulative anchors, PBNs, and mass directory submissions.

Completion: every prospect has relevance, target asset, outreach angle, quality/risk notes, and status.

### Stage 13: Publishing Roadmap

Sequence foundation, trust, money pages, independent cost/comparison content, supporting clusters, calculators, cases, outreach, multilingual expansion, and refreshes by dependency and capacity.

Outputs: `13-90-day-roadmap.md`, `13-content-calendar.csv`.

### Stage 14: Measurement

For every metric define source, baseline, target, cadence, owner, segmentation, attribution, and decision threshold. Include GSC/GA4/CRM/rank data, referring domains, Share of Voice, image traffic, calculator events, and AI mentions/citations/retrievals.

Outputs: `14-measurement-plan.md`, `14-kpi-dashboard.md`.

Completion: each metric can trigger a documented continue/change/stop decision.

## Data Sufficiency Gate

Before a roadmap, report:

```text
当前可以生成：
当前不能可靠生成：
缺少：
下一步请你提供：
```

Never invent search volume, KD, traffic, backlinks, conversions, certification status, prices, ROI, or AI citations. Offer a clearly labeled qualitative version when the user accepts the limitation.

## Deliverable Contract

Use the canonical manifest in `reference/document-system.md`. Preserve document dependencies and capture dates. The checklist is `11-production-checklist.md`; do not duplicate it under Stage 13.

The workflow is complete only when every promised required artifact exists or is explicitly marked blocked with its missing input.
