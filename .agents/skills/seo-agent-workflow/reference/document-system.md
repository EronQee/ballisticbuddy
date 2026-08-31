# SEO Document System v2

> Capture date: 2026-07-27

## Project Directory

When the user wants deliverables written to disk, create one of:

```text
seo-project-{industry}/      (Path A: New-site, Stage 0-14)
seo-diagnosis-{site}/        (Path B: Existing-site diagnosis, Phase D0-D6)
```

## Path A: Canonical Deliverable Manifest (New-Site)

```text
00-project-intake.md
01-market-context.md
01-buyer-personas.md
01-product-taxonomy.md
02-competitor-list.md
02-competitor-top-pages.csv
02-competitor-keywords.csv
02-competitor-patterns.md
02-competitor-referring-domains.csv
03-keyword-master.csv
03-keyword-clusters.md
03-keyword-prioritization.md
03-keyword-opportunity-map.md
03-content-gap-analysis.md
04-serp-intent-map.md
04-page-type-requirements.md
04-content-angle-map.md
05-site-map.md
05-url-structure.md
05-topic-silos.md
05-page-inventory.csv
05-independent-silo-candidates.md
06-content-clusters.md
06-cluster-to-keyword-map.csv
06-publishing-backlog.md
07-money-page-briefs/
08-internal-link-map.md
08-anchor-text-rules.md
08-silo-linking-matrix.csv
09-schema-plan.md
09-ai-answer-blocks.md
09-entity-profile.md
09-ai-visibility-test-plan.md
10-calculator-plan.md
10-calculator-specs/
11-technical-audit.md
11-production-checklist.md
12-link-prospect-list.csv
12-link-outreach-plan.md
12-link-reclamation-list.md
12-link-promotion-log.csv
12-link-alerts.md
12-link-measurement.md
local-seo/
13-90-day-roadmap.md
13-content-calendar.csv
14-measurement-plan.md
14-kpi-dashboard.md
```

## Path B: Diagnosis Deliverable Manifest (Existing-Site)

```text
D0-site-intake.md
D1-evidence-register.md
D2-url-inventory.csv
D2-page-templates.md
D2-content-coverage-map.md
D2-technical-summary.md
D2-internal-link-map.md
D3-architecture-gap.md
D3-content-gap.md
D3-technical-gap.md
D3-schema-ai-gap.md
D3-external-link-gap.md
D4-priority-matrix.csv
D5-remediation-roadmap.md
D5-remediation-calendar.csv
D6-measurement-baseline.md
```

When diagnosis bridges into Stage 0-14, create a combined directory or add Stage documents alongside diagnosis documents, referencing each other.

## Dependency Chain

```text
00-project-intake
  -> 01-market-context
  -> 01-product-taxonomy
  -> 02-competitor-list
  -> 02-competitor-referring-domains
  -> 03-keyword-master
  -> 03-content-gap-analysis
  -> 04-serp-intent-map
  -> 05-site-map
  -> 05-independent-silo-candidates
  -> 06-content-clusters
  -> 07-money-page-briefs
  -> 08-internal-link-map
  -> 09-schema-plan
  -> 09-ai-visibility-test-plan
  -> 10-calculator-plan
  -> 10-calculator-specs
  -> 11-technical-audit
  -> 11-production-checklist
  -> 12-link-prospect-list
  -> 12-link-outreach-plan
  -> 13-90-day-roadmap
  -> 14-measurement-plan
```

## Manifest Contract

| Document | Required | Acceptance Criteria | Downstream Consumer |
|---|---|---|---|
| `00-project-intake.md` | yes | business, market, products, data, constraints captured | all stages |
| `01-product-taxonomy.md` | yes | every product, variant, application, and silo candidate listed | architecture, clusters |
| `02-competitor-referring-domains.csv` | yes when data available | top referring domains and quality notes | link acquisition, prioritization |
| `03-keyword-master.csv` | yes | v2 fields plus manual SERP rationale | SERP, architecture, clusters |
| `03-content-gap-analysis.md` | yes | competitor gap and evidence sources documented | backlog |
| `04-serp-intent-map.md` | yes | dominant page type and angle per cluster | architecture, briefs |
| `05-independent-silo-candidates.md` | conditional | commercial, technical, evidence, and maintenance justification | site map |
| `06-content-clusters.md` | yes | page/tool roles and links mapped | briefs, backlog |
| `07-money-page-briefs/` | yes | every planned money page has complete brief | production |
| `09-ai-visibility-test-plan.md` | yes | prompt/provider/locale/repeat/citation fields defined | measurement |
| `10-calculator-plan.md` | conditional | only commercially relevant tools proposed | development |
| `11-technical-audit.md` | yes | crawl/index/render/performance checks with severity | roadmap |
| `11-production-checklist.md` | yes | pre-publish and change-control checks | publishing |
| `12-link-prospect-list.csv` | yes | relevance, quality, destination, status fields | outreach |
| `12-link-promotion-log.csv` | yes | asset, channel, date, owner, result recorded | authority measurement |
| `12-link-alerts.md` | conditional | competitor/new/lost link alert rules and actions | authority monitoring |
| `12-link-measurement.md` | yes | baseline, target, cadence, owner, thresholds | roadmap iteration |
| `local-seo/` | conditional | local-business intake plus GBP, citation, review, SERP, location-page, and rank-tracking gates | local roadmap |
| `13-90-day-roadmap.md` | yes | dependencies and owners sequenced | execution |
| `14-measurement-plan.md` | yes | source, baseline, target, cadence, owner, attribution | iteration |

## Core Templates

### `03-keyword-master.csv`

```text
keyword,cluster,parent_topic,intent,volume,kd,cpc,growth,seasonality,traffic_potential,business_potential,serp_features,top10_referring_domains,serp_intent_fit,ranking_potential,content_effort,manual_difficulty_rationale,target_page_type,target_url,priority,source,notes,captured_at,country,language
```

### `05-independent-silo-candidates.md`

```markdown
# Independent Silo Candidates

## Candidate: {name}
- Commercial demand evidence:
- Independent product/spec system:
- Technical distinction:
- SERP evidence:
- Calculator candidates:
- Comparison candidates:
- Evidence/SME availability:
- Maintenance capacity:
- Decision: promote / keep under parent / reject
```

### `07-money-page-briefs/{slug}.md`

```markdown
# Money Page Brief: {Page Name}

## Goal
## Target Keywords
## Search Intent
## Page Type
## URL
## Title Tag
## Meta Description
## H1
## Required Sections
## Multi-Series Specification Table Fields
## Price Article Link
## FAQ
## Internal Links In
## Internal Links Out
## CTA
## Schema
## Evidence Needed
## Images Needed
## Author / Reviewer
## YMYL Flag
## Expertise Required
## captured_at
```

### `10-calculator-specs/{slug}.md`

```markdown
# Calculator Spec: {Name}

## Goal
## Target Keyword
## Search Intent
## User Persona
## Input Fields
## Validation Rules
## Formula and Assumptions
## Output Fields
## Citable Fact Answer
## Source Data
## Uncertainty / Range Handling
## YMYL and Jurisdiction
## Qualified Reviewer
## Disclaimer / Escalation Behavior
## Data Privacy Review
## Schema
## Internal Links
## CTA
## Analytics Events
## AI Visibility Test Plan
## Owner / Review Cadence
## captured_at
```

### `11-production-checklist.md`

```markdown
# Production Checklist

## Content
- SERP intent matched:
- Claims sourced:
- Expert review complete when required:
- Price/certification/ROI assumptions labeled:

## On-Page
- Title/H1/headings checked:
- Meta description checked:
- Internal links checked:
- Image alt/bytes/filename checked:

## Technical
- Canonical checked:
- Robots/meta robots checked:
- Structured data validated:
- Redirects and 404s checked:
- Hreflang reciprocal when applicable:
- Mobile and rendering checked:

## Change Control
- Staging verified:
- Rollback plan documented:
- Capture date recorded:
```

### `14-measurement-plan.md`

```markdown
# Measurement Plan

| Metric | Source | Baseline | Target | Cadence | Owner | Attribution / Segmentation | Decision Threshold | Continue / Change / Stop Action |
|---|---|---|---|---|---|---|---|---|
```

## Principles

1. Each document is an input to the next stage.
2. Keyword lists must pass through SERP intent mapping before becoming pages.
3. Site architecture must come from product taxonomy and keyword clusters.
4. Independent silos require commercial and evidence justification.
5. Product-specific calculators require a decision use case.
6. Money page briefs must precede copywriting.
7. Price content is an independent article unless the SERP proves otherwise.
8. Internal link maps are designed before publication.
9. Measurement is defined before execution.
10. Every research claim has a capture date and evidence level.
