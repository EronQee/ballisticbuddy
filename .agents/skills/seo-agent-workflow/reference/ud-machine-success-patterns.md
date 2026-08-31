# UD Machine Success Patterns v2

> **Capture date**: 2026-07-27
> **Evidence**: see `evidence-register.md`

This file records the copyable patterns from `https://ud-machine.com/`. It is not a defect list. Do not copy unrelated calculators, off-topic lifestyle pages, placeholder social links, or low-quality noise.

## High-Level Pattern

`fact`: UD Machine appears to operate as a B2B machinery content factory combining product catalog, buyer guide library, FAQ database, specification library, price explainer library (as independent articles), process/how-it-works library, image-heavy equipment pages, product-specific calculators, multi-language versions, and schema-supported WordPress publishing.

`inference`: traffic likely comes from breadth and long-tail compounding rather than one heroic page.

## Pattern 1: Money Pages Are Hybrid Assets (fact)

Example pages:

```text
/extruder-machine/twin-screw-extruder/
/food-machine/kurkure-production-line/
/food-machine/pet-food-production-line/
/food-machine/fish-feed-production-line/
/extruder-machine/plastic-compounding-machine/
```

These pages combine multiple search intents:

| Page Module | Search Intent | Example Query |
|---|---|---|
| H1 and above-fold pitch | Purchase | `kurkure production line manufacturer` |
| Multi-series model/spec table | Parameter comparison | `twin screw extruder L/D ratio 44` |
| Process flow | Informational | `how twin screw extruder works` |
| Component breakdown | Technical evaluation | `co-rotating vs counter-rotating extruder` |
| FAQ (microdata) | Long-tail questions | `what is L/D ratio in extruder` |
| Related blogs | Learning and internal link support | `parallel vs conical twin screw extruder` |

Reusable formula v2:

```text
Money Page = Product + Multi-Series Spec Sheet + Process Flow + FAQ + Internal Link Hub
```

`fact`: The sampled money pages did not show a clear price section.

## Pattern 2: One Product Becomes Many Search Assets (fact, quota fixed by SERP not number)

Content is sliced by intent, not by random article ideas.

Required assets:

```text
1. Product money page
2. Multi-series spec tables
3. FAQ (count by PAA + buyer concerns)
```

Conditional assets:

```text
4. Cost / price guide (independent blog article)
5. Buying guide
6. How it works article
7. Process guide
8. X vs Y comparison
```

Conditional (when sub-category upgrades to independent silo):

```text
9. 3-5 product-specific calculators
10. Independent comparison sub-pages
11. Independent blog category
12. Independent FAQ hub
```

Optional:

```text
13. Troubleshooting guide
14. Standards / compliance guide
15. Top manufacturers / suppliers
16. Case study
```

## Pattern 3: Long-Tail First (fact)

The site covers long-tail, commercial, and technical terms:

```text
egg roll machine cost factors
manual vs automatic egg roll machine
egg roll machine capacity planning
how to start egg roll production line
feuilletine production line
medical grade extruder
sheet extruder buyer guide
```

Copyable rule:

```text
Do not ask only whether a keyword has high search volume.
Ask whether the keyword can naturally introduce the product.
```

## Pattern 4: Multi-Series Spec Tables Are SEO Assets (fact)

`fact`: twin-screw-extruder page has 5 tables (HT / CJWS Plus / JC / HC / HD series), each with Model, Diameter, L/D Ratio, Screw Speed, Motor Power, Specific Torque, Capacity.

Copyable rule:

```text
Every B2B money page needs selection/spec tables, grouped by series/model, not a single table.
```

## Pattern 5: Price Content Is Independent Blog Asset (v2 corrected)

`fact`: Old docs claimed money pages had a "price section". The sampled live money pages did not show one; sampled price intent appeared in independent blog content.

`fact`: Price content lives in independent blog articles like `/blog/egg-roll-machine-cost-factors/`, structured as:

```text
1. In Short (quick answer)
2. Price tiers table (home / commercial / industrial)
3. 10 cost driver table
4. 5-year TCO model
5. Lead time & hidden procurement costs
6. How to match cost to scale
7. FAQ schema (7 Q&A)
8. References & Sources (USPTO patent, EIA energy data)
```

Copyable rule:

```text
Price page = independent blog article, NOT money page module
```

## Pattern 6: FAQ Captures Query Fan-Out (fact, implementation corrected)

`fact`: Money page uses microdata `itemscope itemtype="https://schema.org/FAQPage"`.

`fact`: Blog articles use separate `<script type="application/ld+json">` for FAQPage (separate from rank-math-schema-pro main graph).

Copyable rule:

```text
FAQ count per money page driven by PAA + real buyer concerns (not fixed 8-12)
FAQ must cover purchase, price, parameters, installation, maintenance, materials, capacity, after-sales
```

`unverified hypothesis`: Whether FAQ schema improves AI citation needs multi-prompt measurement.

## Pattern 7: Independent Product Silo Upgrade (v2 new, most important)

When a sub-category has enough commercial value, UD Machine upgrades it from a normal product page to an independent top-level directory:

```text
/food-machine/  <- normal category
    /food-machine/kurkure-production-line/  <- normal money page

/automatic-egg-roll-machine/  <- independent top-level silo (not under /food-machine/)
    /automatic-egg-roll-machine/wafer-egg-roll-production-roi/  <- calculator
    /automatic-egg-roll-machine/model-decision-helper/  <- calculator
    /automatic-egg-roll-machine/annual-fuel-cost-calculator/  <- calculator
    /automatic-egg-roll-machine/wafer-vs-spring-roll/  <- comparison

/phoenix-roll-machine/  <- sub-product independent silo
    /phoenix-roll-machine/roi-payback-calculator/
    /phoenix-roll-machine/phoenix-roll-capacity-annual-output-planner/
    /phoenix-roll-machine/plant-readiness-check/
    /phoenix-roll-machine/phoenix-roll-vs-egg-roll-machine/

/seaweed-egg-roll-machine/  <- sub-product independent silo
    /seaweed-egg-roll-machine/capacity-planner/
    /seaweed-egg-roll-machine/install-fit-checker/
    /seaweed-egg-roll-machine/labour-savings-calculator/
```

Independent silo has:

- Independent top-level URL
- Independent model line (UD05-2 / UD05-3 / UD-02 / UD-HT)
- Independent engineering narrative (wafer vs spring roll distinction, 6-station rotary workflow)
- 3-5 dedicated calculator sub-pages
- 1-2 comparison sub-pages
- Independent blog category

Copyable formula v2 (core pattern):

```text
Upgrade a sub-category to independent silo when:
1. Enough commercial search demand
2. Independent model/spec system
3. Clear technical distinction from parent category
4. Can support 3-5 dedicated calculators
5. Can support independent comparison pages

Independent silo must include:
- Independent money page (with dedicated model line)
- 3-5 dedicated calculators
- 1-2 comparison sub-pages
- Independent blog category
- Independent FAQ hub
```

`unverified hypothesis`: Whether independent silo outperforms subdirectory needs subdirectory ranking trend data.

## Pattern 8: Product-Specific Calculator as AI Traffic Entry (v2 new, see calculator-playbook.md)

`fact`: UD Machine has 9 product-specific calculators across 3 independent product silos.

`inference`: Calculators may be good AI citation entry points because they output interactive, parameterized, citable fact answers.

`unverified hypothesis`: Whether calculators are actually cited by AI needs multi-prompt measurement.

Copyable rule:

```text
Each core product should have 3-5 dedicated calculators
Calculators must relate directly to product purchase decisions
Calculators must output citable fact answers (price range, ROI, capacity, selection)
Never use generic unrelated calculators
```

## Pattern 9: Multi-Language hreflang Coverage (v2 new)

`fact`: Each core page has 16-language hreflang alternates.

`fact`: URL pattern `/{lang}/{original-path}/`.

Copyable rule:

```text
If target market is multi-language, plan full hreflang coverage
URL pattern: /{lang}/{original-path}/
Each language version must have real content translation
```

## Pattern 10: Publishing Velocity (fact)

Sitemap shows heavy blog publishing and updates in 2026.

Copyable rule:

```text
Month 1: core money pages + cost pages + buying guides
Month 2: process, comparison, how-it-works pages
Month 3: FAQ hubs, calculators, troubleshooting pages
Month 4+: cases, refreshes, new long-tail expansion, sub-category silo upgrade
```

## Pattern 11: Blog Pages Are Bridges to Product Pages (fact)

Blog template includes:

```text
Title, TOC, date/author, featured image, H2/H3 question structure,
contextual product links, reference sources, FAQ, related posts,
main products, recently posted, contact CTA
```

Copyable rule:

```text
Every supporting article must have 3 conversion bridges:
1. In-text contextual product link
2. Sidebar/footer product module
3. Article-end CTA
```

## Pattern 12: Multi-Business-Line Expansion (fact, but be careful)

Covers: Food Machine, Extruder Machine, Paper Making Machine, CNC/Laser Machine, egg-roll independent silo.

Copyable rule:

```text
Only expand "supply-chain-adjacent" topics, not unrelated topics.
```

## Pattern 13: WordPress + Rank Math PRO (fact)

`fact`: WordPress + Rank Math PRO + Astra + Elementor.

Copyable rule:

```text
Design content production system first, then let tools scale.
Platform choice should be based on project needs, not forced WordPress.
Label as "observed technology, if verified".
```
