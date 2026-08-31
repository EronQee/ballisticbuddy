# SEO Agent Workflow Reference v2

> **重建日期**：2026-07-27

This reference directory is the skill's bundled knowledge base. It exists so the workflow does not depend on a single `SKILL.md` prompt.

Use these files as the operating manual whenever the user asks for SEO路线图, SEO PRD, keyword research workflow, content architecture, site architecture, competitor SEO reverse engineering, calculator as AI traffic entry, external link acquisition, technical SEO audit, existing-site diagnosis, or a coding-agent-to-SEO-agent workflow.

## Reference Map

| File | Purpose |
|---|---|
| `evidence-register.md` | Evidence register for UD Machine reverse engineering (capture date, source URL, raw signal, confidence) |
| `ud-machine-success-patterns.md` | Copyable success patterns reverse-engineered from `ud-machine.com` (2026-07-27), with fact/inference/hypothesis labels |
| `ud-machine-site-architecture.md` | Site structure, URL inventory, independent product silo upgrade pattern, multi-language hreflang, calculator placement |
| `keyword-content-engine.md` | Keyword research, intent slicing, content cluster engine, prioritization (v2 replaces false-precision formula) |
| `calculator-playbook.md` | Calculator/interactive tool as AI traffic entry — design principles, types, AI visibility measurement |
| `agent-workflow.md` | The interactive SEO Agent workflow: dual-path entry (new-site Stage 0-14 + existing-site Phase D0-D6) |
| `document-system.md` | Required project documents, deliverable manifest (Path A + Path B), and how they depend on each other |
| `existing-site-diagnosis-playbook.md` | Existing-site diagnosis path: evidence harvest → current state map → gap analysis → priority matrix → remediation roadmap |
| `industry-roadmap-template.md` | Example workflow for a new industry such as automotive bulletproof glass |
| `ahrefs-methodology-map.md` | How the local Ahrefs guide maps to the agent workflow (10-chapter coverage matrix) |
| `external-link-playbook.md` | Prospecting, editorial outreach, reclamation, quality, and risk controls |
| `technical-seo-playbook.md` | Crawl/index/render/performance/hreflang/schema audit and change control |
| `local-seo-playbook.md` | Conditional GBP, citation, review, local SERP, location-page, and rank-tracking workflow |
| `keyword-priority-scorecard.md` | Manual scorecard replacing the fixed-weight priority formula |

## Core Principle

The agent is not a one-shot SEO advice generator. It is an interactive SEO PRD generator that supports two paths:

```text
Path A (New-site):  Ask -> request external data -> validate sufficiency -> generate stage documents -> produce roadmap
Path B (Existing-site):  Harvest evidence -> map current state -> identify gaps -> prioritize fixes -> produce remediation roadmap
```

Incorrect behavior:

```text
User names an industry -> agent invents a full roadmap without data
User provides a URL -> agent invents a diagnosis without inspecting the site
```

## Evidence Discipline (v2)

Every conclusion must be labeled:

- `fact`: directly verifiable from public crawl.
- `inference`: reasonably derived from facts but unverified by traffic/ranking data.
- `unverified hypothesis`: causal claim, needs GSC/Ahrefs/experiment to confirm.

## Primary Reverse-Engineered Model v2

UD Machine's traffic model (observed 2026-07-27) is a B2B content factory:

```text
Product money pages carry commercial intent (product + spec table + process + FAQ, NOT price).
Blog long-tail pages carry informational intent.
Independent blog articles carry price/cost intent (NOT money page module).
FAQ blocks capture question intent.
Multi-series spec tables capture parameter intent.
Process diagrams capture how-it-works intent.
Images capture visual intent.
Product-specific calculators capture decision intent and may serve as AI traffic entry.
Independent product silos capture sub-category authority.
Multi-language hreflang captures international intent.
Schema helps search engines and AI understand page type and entity relationships.
```

Reusable atomic formula v2:

```text
Money Page = Product + Multi-Series Spec Sheet + Process Flow + FAQ + Internal Link Hub
Price Article = independent blog asset (NOT money page module)
Independent Silo = dedicated URL + dedicated model line + 3-5 calculators + comparison sub-pages + blog category + FAQ hub
```

## v2 Changes Summary

- Rebuilt UD Machine reverse engineering from 2026-07-27 live crawl (745 URLs, not stale 737).
- Added independent product silo upgrade pattern (egg-roll / phoenix / seaweed).
- Added multi-language hreflang coverage (16 languages).
- Corrected price content location (independent blog article, not money page module).
- Added product-specific calculator as AI traffic entry (9 calculators documented).
- Added Stage 10 Calculator Plan, Stage 11 Technical SEO Audit, Stage 12 External Link Acquisition.
- Replaced false-precision keyword priority formula with manual SERP review scorecard.
- Added growth, seasonality, serp_features, top10_referring_domains to keyword CSV.
- Restored content-gap-analysis.md and production-checklist.md to deliverable manifest.
- Added author/reviewer/YMYL/expertise fields to money page brief.
- Added AI visibility multi-prompt test plan.
- Added evidence register requirement.
- Labeled every conclusion as fact/inference/unverified hypothesis.
