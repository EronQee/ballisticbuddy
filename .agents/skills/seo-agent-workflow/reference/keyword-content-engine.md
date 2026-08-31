# Keyword and Content Engine v2

> Capture date: 2026-07-27

## Core Thesis

The goal is not a long keyword list. The goal is a mapped system of:

```text
keyword clusters -> search intent -> SERP page type -> evidence-backed page brief -> internal links -> conversion or decision tool
```

Traffic decomposition is an inference, not a measured fact:

```text
Possible Organic Visibility = Money Pages + Long-Tail Blog + FAQ + Images + Product Tools + Multi-Language Pages
```

## Keyword Sources

Use external data whenever possible:

```text
Semrush Keyword Magic Tool
Semrush Organic Research
Semrush Keyword Gap
Ahrefs Matching Terms
Ahrefs Questions
Ahrefs Top Pages
Ahrefs Content Gap
Google Search Console queries
Google SERP People Also Ask
Google related searches
customer language and sales-call notes
industry forums and communities
```

AI brainstorming may generate seeds, but it cannot supply trustworthy search volume, difficulty, growth, or ranking evidence.

## Keyword Types

| Type | Buyer Stage | Page Type | Example Pattern | Business Potential |
|---|---|---|---|---:|
| Product | Purchase | Money page | `{product}` | 3 |
| Manufacturer | Purchase | Money page | `{product} manufacturer` | 3 |
| Supplier | Purchase | Money page | `{product} supplier` | 3 |
| Price | Commercial investigation | Independent cost article | `{product} price` | 3 |
| Cost factors | Commercial investigation | Independent cost article | `{product} cost factors` | 3 |
| Specification | Evaluation | Product/spec page | `{product} output kg/h` | 3 |
| Buying guide | Evaluation | Guide | `how to choose {product}` | 2 |
| Comparison | Evaluation | Comparison page | `{product} vs {alternative}` | 2 |
| Process | Learning | Process article | `how does {product} work` | 2 |
| Calculator | Decision | Product-specific tool | `{product} ROI calculator` | 3 |
| Material | Learning | Knowledge article | `what is {material}` | 1-2 |
| Generic encyclopedia | Awareness | Usually avoid | `what is recycling` | 0-1 |

## Keyword Master Fields v2

Use this schema for `03-keyword-master.csv`:

```text
keyword
cluster
parent_topic
intent
volume
kd
cpc
growth
seasonality
traffic_potential
business_potential
serp_features
top10_referring_domains
serp_intent_fit
ranking_potential
content_effort
manual_difficulty_rationale
target_page_type
target_url
priority
source
notes
captured_at
country
language
```

Definitions:

- `kd`: third-party estimate only; never the sole difficulty decision.
- `growth`: trend or change over the chosen time window.
- `seasonality`: recurring demand pattern or seasonal risk.
- `traffic_potential`: expected topic-level traffic, not just the head keyword volume.
- `top10_referring_domains`: authority burden for the actual SERP, not only a tool score.
- `ranking_potential`: manual assessment based on SERP quality, authority, intent fit, and evidence.
- `content_effort`: research, SME, design, development, and maintenance cost.

## Prioritization v2

Do not use the old fixed formula:

```text
Business Potential * 3 + Intent Fit * 2 + Traffic Potential + CPC - Difficulty Penalty
```

The old formula had undefined scales and created false precision. Use a documented scorecard:

```text
1. Business fit: 0-3
2. SERP intent fit: manual pass/fail + notes
3. Ranking potential: low/medium/high + evidence
4. Traffic potential: topic-level estimate
5. Authority burden: top-10 referring-domain notes
6. Growth/seasonality: trend notes
7. Content effort: low/medium/high
8. Conversion path: quote, tool, catalog, or education
9. Priority: immediate / next / later / reject
```

The output must explain why a keyword was prioritized. Keep the raw tool metrics and the human judgment separate.

## Content Asset Decision Tree

Every core product must have:

```text
Product money page
Multi-series spec tables
FAQ driven by actual questions
```

Add assets only when supported by demand, SERP, buyer journey, evidence, and capacity:

```text
Cost article
Buying guide
How-it-works article
Production process
Comparison
Troubleshooting
Standards/compliance guide
Case study
Top manufacturers list
```

Add a dedicated product silo and tools only when the sub-category has:

```text
commercial demand
distinct product/spec system
distinct engineering story
enough evidence
maintenance capacity
```

Then consider:

```text
ROI/payback calculator
capacity planner
model decision helper
install fit checker
cost calculator
comparison sub-pages
independent blog category
```

Do not require eight or twelve assets by quota. Avoid cannibalization and thin pages.

## Price Content Correction

Observed UD Machine pattern:

```text
Money page -> product/spec/process/FAQ/CTA
Independent blog -> price tiers/cost drivers/TCO/hidden costs/FAQ
```

Price pages should state whether values are verified quotes, market ranges, or illustrative estimates. Cite the source and capture date.

## Calculator Content Pattern

Product-specific calculators target decision intent:

```text
ROI/payback
capacity
model selection
installation readiness
fuel/labour cost
specification selection
```

Each tool brief must define inputs, validation, outputs, source facts, assumptions, calculation formula, CTA, internal links, and AI visibility test plan.

## SERP Intent Gate

Before assigning a page type, inspect:

```text
Are top pages product pages, blog guides, category pages, marketplaces, videos, forums, PDFs, or calculators?
Are they lists, how-to guides, comparisons, calculators, or landing pages?
What angle dominates: best, cheap, beginner, manufacturer, price, standard, specification?
What SERP features appear: PAA, images, videos, shopping, AI Overview, local pack?
What trust signals are common?
What are the top pages' referring-domain patterns?
```

If SERP is mostly product pages, do not create only a blog post. If SERP is mostly educational guides, do not create only a thin product page. If SERP is calculator-led, build a useful tool rather than a text page that only mentions calculation.

## Brief Before Writing

Every page or tool needs a brief:

```text
target keyword
keyword cluster
search intent
SERP page type
user questions
must-cover subtopics
internal links in
internal links out
CTA
schema type
differentiation angle
evidence needed
YMYL flag
expertise required
freshness trigger
captured_at
```

## Content Quality Gates

Before publication:

```text
Does the page add first-hand expertise or original evidence?
Are claims supported by sources or product data?
Is an expert reviewer required?
Does it match the actual SERP intent?
Does it answer the query early?
Does it avoid unsupported price, certification, ROI, or safety claims?
Does it have a clear internal-link and conversion path?
Is the page worth maintaining?
```
