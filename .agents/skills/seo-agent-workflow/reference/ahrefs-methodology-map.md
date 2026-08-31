# Ahrefs Methodology Map v2

This file maps the local Ahrefs SEO guide into the SEO Agent workflow. It is a coverage control, not a claim that every technique is automatically executed by the skill.

## Coverage Status

- `covered-executable`: inputs, decisions, and outputs exist.
- `covered-partial`: mentioned but missing important controls.
- `conditional`: branch depends on project type.
- `missing`: no workflow treatment.
- `unsafe`: wording may cause overclaiming or dangerous execution.

## Ten-Chapter Matrix

| Chapter | Status | Workflow Coverage | Main Gap / Required Control |
|---|---|---|---|
| 01 How Search Engines Work | covered-partial | Stage 11 technical audit; Stage 8 internal links; sitemap and rendering checks | Add crawl/render/index evidence, URL Inspection, freshness and locale test context |
| 02 SEO Basics | covered-partial | Stage 0, 5, 11, 14 | Add platform/host/HTTPS/mobile/performance baseline, sitemap submission, GA4/GSC setup, Share of Voice baseline |
| 03 Keyword Research | covered-executable with safeguards | Stage 3 and Stage 4 | Keep growth, seasonality, SERP features, referring domains, manual SERP review; do not use fixed formula |
| 04 SEO Content | covered-partial | Stage 6 and Stage 7 | Add expertise/YMYL gate, author/reviewer, original evidence, freshness trigger, content-gap acceptance criteria |
| 05 On-Page SEO | covered-partial | Stage 7, 8, 11 | Add title/meta/heading QA, image bytes/filename/alt, external citations, broken links, E-E-A-T, zero-click answer checks |
| 06 Link Building | covered-executable v2 | Stage 12 | Require prospect quality rubric, outreach, promotion, reclamation, measurement; prohibit manipulative tactics |
| 07 Technical SEO | covered-executable v2 | Stage 11 | Require robots/meta robots/canonical/redirect/hreflang/render/CWV/mobile/schema checks plus staging/rollback |
| 08 Local SEO | conditional-partial | Stage 0 branch, Stage 1, Stage 5, Stage 9 | Add GBP fields, citation inventory, local-intent SERP, review policy, map-pack tracking, unique location-page gate |
| 09 What AI Means for SEO | covered-partial | Stage 9 and Stage 14 | Separate zero-click visibility, mentions, citations, retrievals, clicks, AI content governance, crawler policy |
| 10 How AI Search Engines Work | covered-partial with safeguards | Stage 9 and Stage 14 | Use repeated multi-prompt/provider/locale tests; record citation diversity, accuracy, freshness; never promise citation |

## Search Engine Foundations

Workflow implications:

```text
Pages must be discoverable through internal links and sitemap.
Important pages must not be orphaned.
Source HTML and rendered HTML may differ.
Indexability must be checked, not assumed.
Locale and personalization affect SERP observations.
```

Outputs:

```text
05-site-map.md
08-internal-link-map.md
11-technical-audit.md
14-measurement-plan.md
```

## SEO Basics

Workflow implications:

```text
Record platform, host/CDN, HTTPS, mobile, performance, URL structure, sitemap, GSC, GA4, and conversion events.
For local businesses, branch into GBP, NAP, reviews, citations, and location pages.
```

Outputs:

```text
00-project-intake.md
05-url-structure.md
11-technical-audit.md
13-90-day-roadmap.md
14-measurement-plan.md
```

## Keyword Research

Workflow implications:

```text
Start from seed keywords and customer language.
Use competitor keywords, top pages, Content Gap, GSC, and PAA.
Cluster by parent topic and SERP similarity.
Evaluate volume, traffic potential, KD, CPC, growth, seasonality, business potential, SERP features, and top-page authority.
Do not rely on volume or tool KD alone.
```

Outputs:

```text
03-keyword-master.csv
03-keyword-clusters.md
03-keyword-prioritization.md
03-content-gap-analysis.md
04-serp-intent-map.md
```

## SEO Content and On-Page SEO

Workflow implications:

```text
Choose proven topics with traffic, business, ranking, and evidence potential.
Match content type, format, and angle to SERP.
Add unique expertise, examples, specs, cases, and sources.
Check titles, H1, headings, URLs, links, images, schema, UX, and content accuracy.
```

Outputs:

```text
04-page-type-requirements.md
06-content-clusters.md
07-money-page-briefs/
08-internal-link-map.md
11-production-checklist.md
```

## External Link Acquisition

Workflow implications:

```text
Backlinks remain a difficulty and authority input.
Analyze competitor referring domains.
Build link-worthy data, tools, guides, comparisons, and original research.
Use editorial outreach and reclamation.
Do not buy links, exchange links, automate forum/Q&A links, or mass-submit directories.
```

Outputs:

```text
02-competitor-referring-domains.csv
12-link-prospect-list.csv
12-link-outreach-plan.md
12-link-reclamation-list.md
```

## Technical SEO

Workflow implications:

```text
Audit crawlability, indexability, robots, canonical, redirects, rendering, sitemaps, orphans, mobile, CWV, schema, images, and hreflang.
Any noindex/robots/canonical change requires staging validation and rollback.
```

Outputs:

```text
11-technical-audit.md
11-production-checklist.md
```

## Local SEO

Use only when the business has a storefront, service area, or location-driven demand.

```text
Capture GBP category/hours/address/service area/services/photos.
Check NAP and citations.
Map local-intent SERPs.
Use compliant review policy.
Avoid thin doorway location pages.
```

## AI Search

Workflow implications:

```text
AI visibility is probabilistic.
Organic discoverability remains foundational.
Measure mention, citation, cited URL, retrieval, click, accuracy, freshness, and citation diversity separately.
Run repeated prompts across providers and locales.
FAQ/schema/answer blocks can support interpretation but do not guarantee citations.
```

Outputs:

```text
09-schema-plan.md
09-ai-answer-blocks.md
09-entity-profile.md
09-ai-visibility-test-plan.md
14-measurement-plan.md
```
