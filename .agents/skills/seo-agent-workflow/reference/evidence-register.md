# Evidence Register — UD Machine

> **Capture date**: 2026-07-27
> **Source**: `https://ud-machine.com/`
> **Tools**: public HTTP (`Invoke-WebRequest`) + anysearch `extract`

This file records the source signal behind each core conclusion, making the reverse engineering reproducible.

## Sitemap & URL Inventory

| Claim | Source URL | Retrieval Date | Raw Signal | Confidence |
|---|---|---|---|---|
| sitemap index contains 7 sub-sitemaps | `https://ud-machine.com/sitemap_index.xml` | 2026-07-27 | XML content | fact |
| total URLs = 745 | all sub-sitemaps combined | 2026-07-27 | post(200+200+200+42) + page(95) + category(7) + local(1) | fact |
| `/blog/` = 649 | sub-sitemap parse | 2026-07-27 | path prefix count | fact |
| `/cnc-machine/` = 27 | sub-sitemap | 2026-07-27 | path prefix count | fact |
| `/extruder-machine/` = 15 | sub-sitemap | 2026-07-27 | path prefix count | fact |
| `/food-machine/` = 13 | sub-sitemap | 2026-07-27 | path prefix count | fact |
| `/calculators/` = 11 (incl index) | sub-sitemap | 2026-07-27 | path prefix count | fact |
| `/paper-making-machine/` = 10 | sub-sitemap | 2026-07-27 | path prefix count | fact |
| `/automatic-egg-roll-machine/` = 5 | sub-sitemap | 2026-07-27 | path prefix count | fact |
| `/phoenix-roll-machine/` = 5 | sub-sitemap | 2026-07-27 | path prefix count | fact |
| `/seaweed-egg-roll-machine/` = 4 | sub-sitemap | 2026-07-27 | path prefix count | fact |
| `local-sitemap.xml` contains only `/locations.kml/` | `https://ud-machine.com/local-sitemap.xml` | 2026-07-27 | XML content | fact |

## Tech Stack

| Claim | Source URL | Retrieval Date | Raw Signal | Confidence |
|---|---|---|---|---|
| Rank Math PRO SEO plugin | `twin-screw-extruder/` HTML | 2026-07-27 | HTML comment `Search Engine Optimization by Rank Math PRO` | fact |
| WordPress + Astra theme | same | 2026-07-27 | body class `wp-theme-astra astra-4.13.5` | fact |
| Elementor page builder | same | 2026-07-27 | body class `elementor-default elementor-kit-324 elementor-page` | fact |
| robots.txt allows full crawl (only wp-admin disallowed) | `https://ud-machine.com/robots.txt` | 2026-07-27 | `User-agent: *` + `Disallow: /wp-admin/` | fact |

## Multi-Language hreflang

| Claim | Source URL | Retrieval Date | Raw Signal | Confidence |
|---|---|---|---|---|
| 16 language versions | `twin-screw-extruder/` HTML head | 2026-07-27 | 16 `<link rel="alternate" hreflang="...">`: en, ar, nl, fr, de, it, ja, ko, ms, fa, pt, ro, ru, es, tr, zh-TW | fact |
| URL pattern `/{lang}/{original-path}/` | same | 2026-07-27 | e.g. `https://ud-machine.com/ar/extruder-machine/twin-screw-extruder/` | fact |

## Schema.org Implementation

| Claim | Source URL | Retrieval Date | Raw Signal | Confidence |
|---|---|---|---|---|
| Money page uses BreadcrumbList JSON-LD | `twin-screw-extruder/` HTML | 2026-07-27 | `<script type="application/ld+json" class="rank-math-schema-pro">` with BreadcrumbList | fact |
| Money page uses FAQPage microdata (not JSON-LD) | same | 2026-07-27 | `itemscope itemtype="https://schema.org/FAQPage"` on div | fact |
| Blog article uses full JSON-LD graph | `blog/egg-roll-machine-cost-factors/` HTML | 2026-07-27 | rank-math-schema-pro with Corporation/Organization, WebSite, ImageObject, BreadcrumbList, WebPage, Person, NewsArticle | fact |
| Blog article uses separate FAQPage JSON-LD | same | 2026-07-27 | second `<script type="application/ld+json">` with FAQPage + 7 Q&A | fact |
| Author field exists but may be placeholder | same | 2026-07-27 | `author nome`, gravatar placeholder | fact |
| Multiple author signatures | `blog/how-does-an-automatic-egg-roll-machine-work/` HTML | 2026-07-27 | `author jasonxue` | fact |

## Page Templates & Modules

| Claim | Source URL | Retrieval Date | Raw Signal | Confidence |
|---|---|---|---|---|
| Money page modules: H1 + above-fold + CTA + solution overview + model cards + multi-series spec tables + process flowchart + applications + related products + FAQ + contact form | `twin-screw-extruder/`, `kurkure-production-line/`, `automatic-egg-roll-machine/` | 2026-07-27 | page body structure | fact |
| Multi-series spec tables (HT/CJWS/JC/HC/HD) | `twin-screw-extruder/` | 2026-07-27 | 5 tables | fact |
| Money page has NO price section | `twin-screw-extruder/`, `kurkure-production-line/` | 2026-07-27 | no price paragraph in body | fact |
| Price content lives in independent blog article | `blog/egg-roll-machine-cost-factors/` | 2026-07-27 | full price-tier article (home/commercial/industrial) + 5-year TCO | fact |
| Independent product silo has dedicated calculator sub-pages | 9 calculator URLs across egg-roll/phoenix/seaweed silos | 2026-07-27 | interactive calculator pages | fact |
| Generic unrelated calculators still exist | 10 calculator URLs in `/calculators/` | 2026-07-27 | sitemap listing + sample confirmation | fact |
| Independent product silo has comparison sub-pages | `automatic-egg-roll-machine/wafer-vs-spring-roll/`, `phoenix-roll-machine/phoenix-roll-vs-egg-roll-machine/` | 2026-07-27 | sitemap listing | fact |

## Independent Product Silo Upgrade Pattern (v2 new)

| Claim | Source URL | Retrieval Date | Raw Signal | Confidence |
|---|---|---|---|---|
| egg-roll series upgraded to top-level directory, not under `/food-machine/` | `https://ud-machine.com/automatic-egg-roll-machine/` | 2026-07-27 | URL path + nav menu independent item | fact |
| Independent silo has dedicated model line (UD05-2 / UD05-3 / UD-02 / UD-HT) | above pages | 2026-07-27 | spec tables & product cards | fact |
| Independent silo has dedicated engineering narrative | above pages | 2026-07-27 | long-form engineering notes (wafer vs spring roll, 6-station rotary workflow) | fact |
| Independent silo has sub-products (phoenix roll, seaweed egg roll) | nav menu | 2026-07-27 | nested menu structure | fact |
| Independent silo has dedicated calculator + comparison + blog category | sitemap + blog category | 2026-07-27 | `/blog/category/automatic-egg-roll-machine-blogs/` etc. | fact |

## Blog Black-Box Sampling (v3, 2026-08-05)

> **Capture date**: 2026-08-05
> **Source**: 6 sampled blog posts (2 fetched 2026-07-27, 4 fetched 2026-08-05)
> **Tools**: `webfetch` full-body extraction
> **Sampled URLs**: `blog/egg-roll-machine-cost-factors/`, `blog/how-does-a-kurkure-machine-work/`, `blog/gas-vs-electric-egg-roll-machine/`, `blog/continuous-vs-batch-egg-roll-production/`, `blog/specialty-paper-manufacturing-equipment/`, `blog/what-is-a-rubber-extrusion/`

| Claim | Source URL | Retrieval Date | Raw Signal | Confidence |
|---|---|---|---|---|
| Blog contains three content generations, not two | all 6 samples | 2026-07-27 / 2026-08-05 | 2024 = Wikipedia-only refs + AI-hallucination residue; 2025 = academic refs + tables but still hallucination residue; 2026 = deep decision content | fact |
| 2024-generation posts use thin sourcing (Wikipedia) | `blog/how-does-a-kurkure-machine-work/`, `blog/what-is-a-rubber-extrusion/` | 2026-07-27 / 2026-08-05 | References = 3 Wikipedia links each (Snack/Machine/Food extrusion; Extrusion/Natural rubber/Manufacturing) + 1 internal product link | fact |
| 2024-generation posts contain leaked AI persona/garbled text | `blog/what-is-a-rubber-extrusion/` | 2026-08-05 | "As a Human Resource Manager/Overseer, Training, and consultant, I am responsible for ensuring…", "the role of the rubber executive who is well informed" | fact |
| 2025-generation posts cite academic sources but keep hallucination residue | `blog/specialty-paper-manufacturing-equipment/` | 2026-08-05 | 2 Semantic Scholar papers + 3 Wikipedia; still has "behavioral chauvinism", "Rao circa", "Hispanic population", "WHO recommends the use of IoT" | fact |
| 2026-generation posts cite verifiable primary/secondary sources | `blog/egg-roll-machine-cost-factors/`, `gas-vs-electric-egg-roll-machine/`, `continuous-vs-batch-egg-roll-production/` | 2026-08-05 | eCFR (21 CFR 117/117.40), OSHA 1910.212/1910.110, ISO 14159, EUR-Lex (EU Machinery Reg 2023/1230), USPTO patents, EIA, BLS, MDPI Applied Sciences (2025 peer-reviewed), Taylor & Francis, RIT thesis, ENERGY STAR, HSE | fact |
| 2026 posts include original worked cost/decision math | `egg-roll-machine-cost-factors/` | 2026-07-27 | cost per 1,000 sellable rolls worked example ($0.64/1,000 @ placeholder rate), 5-yr TCO table, fuel-to-throughput crossover matrix | fact |
| 2026 posts include decision frameworks (not just info) | `gas-vs-electric-egg-roll-machine/`, `continuous-vs-batch-egg-roll-production/` | 2026-08-05 | SKU-Count Fit Line, Cost Per 1,000 Sellable Rolls Selector, Facility Readiness checklist, RFQ checklist | fact |
| 2026 posts carry explicit transparency/disclosure blocks | `gas-vs-electric-egg-roll-machine/`, `continuous-vs-batch-egg-roll-production/` | 2026-08-05 | "Transparency note" (directory/oven data = proxy only); "About This Article" + "Reviewed by the Suzhou UDTECH Technology Co., Ltd. technical team" | fact |
| Multiple named authors operate the 2026 cluster | `gas-vs-electric-egg-roll-machine/` (nome), `continuous-vs-batch-egg-roll-production/` (Karry), `egg-roll-machine-cost-factors/` (nome), `how-does-an-automatic-egg-roll-machine-work/` (jasonxue), `pork-floss-snacks-explained/` (Jasonxue) | 2026-08-05 | author bylines | fact |
| Internal link target pattern is money-page + sibling decision posts | all 4 samples | 2026-08-05 | every 2026 post links to `/automatic-egg-roll-machine/` and 4-6 related `/blog/` decision posts | fact |
| 2026 posts end with CTA + FAQ + References | all 4 samples | 2026-08-05 | contact/quote CTA, FAQPage JSON-LD, "References & Sources" | fact |
| Publishing cadence is cluster-based, not chronological | 2026-07-10 to 07-13 "Recently Posted" block | 2026-08-05 | 7 posts in 4 days, all egg-roll-cluster decision topics (private-label, rotary workflow, gas-vs-electric, market trends, continuous-vs-batch) | fact |
| 2026 decision-content cluster is the current traffic strategy | all samples | 2026-08-05 | 2-gen contrast + cluster cadence + GEO-style citation engineering | inference (strong; needs GSC/Ahrefs to confirm rankings) |
| 2026 posts are engineered for AI-search citation (GEO) | all 3 recent samples | 2026-08-05 | citable authoritative sources, answer-shaped FAQ, disclosure blocks, decision tables | inference (strong; verify via AI-answer sampling) |

## Link Equity Flow (权重流, HTML-observable facts)

> No SEO tool required — extracted from the 6 sampled article bodies. This answers "what do the blogs serve and where does link equity flow", not "how many clicks".

| Claim | Source URL | Retrieval Date | Raw Signal | Confidence |
|---|---|---|---|---|
| 2026 decision posts funnel body anchors + CTA to the egg-roll silo money page | `blog/gas-vs-electric-egg-roll-machine/`, `blog/continuous-vs-batch-egg-roll-production/`, `blog/egg-roll-machine-cost-factors/` | 2026-08-05 | body anchor `/automatic-egg-roll-machine/` in every post; end CTA "Review the automatic egg roll machine" / "See the UDTECH UD05 Continuous Wafer Egg Roll Line" → same URL | fact |
| 2026 posts also anchor silo-internal pages | `gas-vs-electric-egg-roll-machine/` | 2026-08-05 | anchor `/automatic-egg-roll-machine/wafer-vs-spring-roll/` | fact |
| 2026 posts interlink 4-6 sibling decision posts (cluster self-loop) | all 3 recent samples | 2026-08-05 | "Related Articles" sections cross-link the same cluster (manual-vs-automatic, capacity-planning, cost-factors, roi, how-to-start, food-safety) | fact |
| 2024 posts make sparse body anchors, no CTA funnel | `blog/what-is-a-rubber-extrusion/` | 2026-08-05 | single anchor to `/extruder-machine/rubber-extruder/`, no end-of-article CTA | fact |
| 2024/2025 posts leak equity to unrelated posts | `blog/specialty-paper-manufacturing-equipment/` | 2026-08-05 | hard-crammed link to kurkure post; Related Posts include minnesota-food, texas-food, king-of-snacks | fact |
| Equity destination: 2026 cluster → egg-roll silo; old posts → diffuse blog-to-blog | all 6 samples | 2026-08-05 | anchor analysis above | fact |
| Clicks/rankings per post still unmeasured | — | — | no free public source; requires GSC/Ahrefs | unverified |

## Causal Claims (Unverified Hypotheses)

| Claim | Evidence Level | What Would Verify It |
|---|---|---|
| blog long-tail coverage contributes most traffic | inference (based on URL share 649/745; blog black-box sampling 2026-08-05 shows active cluster-authoring) | GSC per-URL clicks + Ahrefs top pages |
| 2026 decision-content cluster (not the 2024 long-tail flood) is what currently drives rankings | **upgraded to strong inference** (4 samples show a deliberate cluster + GEO content engine) | GSC clicks by post date + Ahrefs top pages ranking by publish date |
| independent silo upgrade improved sub-category rankings | unverified hypothesis | Ahrefs Site Explorer subdirectory ranking trend |
| calculator serves as AI traffic entry | unverified hypothesis | Brand Radar / multi-prompt AI citation measurement |
| multi-language hreflang expanded total traffic | unverified hypothesis | GSC international report + per-language ranking data |
| FAQ schema improves AI citation probability | unverified hypothesis | multi-prompt repeated sampling, comparing pages with/without FAQ |

## Verification Tools Now Available (2026-08-23)

The following treg endpoints (adapter skill `treg-seo`, exact bodies in its `reference/capability-map.md`) can upgrade the hypotheses above from `unverified` to verified measurement without paid tooling:

| Hypothesis | Endpoint | What It Returns | How to Use |
|---|---|---|---|
| long-tail blog contributes most traffic | `dataforseo.google.domain.ranked_keywords` on `ud-machine.com` | `metrics.organic.etv` + position distribution + per-keyword volume/KD/intent | Filter ranked keywords by `/blog/` paths vs `/automatic-egg-roll-machine/` sub-path; compare ETV share |
| 2026 decision-cluster drives rankings | same endpoint, filter by cluster money-page sub-path | `is_new`/`is_up`/`is_down` flags per keyword | Check whether cluster keywords show `is_new`/`is_up` momentum vs stale 2024 keywords |
| calculator serves as AI traffic entry | `dataforseo.x.ai-optimization-llm-mentions-target-metrics-live` | `sources_domain` + `search_results_domain` + brand entities per keyword | Query calculator keywords (e.g. "egg roll machine ROI") and check if ud-machine.com appears in AI sources |
| FAQ schema improves AI citation | same llm-mentions endpoint, compare `sources_domain` presence with/without FAQ | per-keyword mention counts | Run same keyword family across FAQ vs non-FAQ pages |

Caveat: domain-wide top-ranked-keyword results are dominated by unrelated low-KD long-tail (observed 2026-08-23: top items included "maroon vs burgundy", "detroit famous food"). Cluster-level claims MUST filter by the cluster's URL sub-path, not use the raw domain list.

## Verified Measurement Sample (2026-08-23)

Live calls made against `ud-machine.com` to validate the workflow; raw responses archived in the session workdir.

| Claim | Endpoint | Result | Confidence |
|---|---|---|---|
| ud-machine.com has organic visibility footprint | `dataforseo.google.domain.ranked_keywords` | total_count **11061** keywords; metrics.organic: pos_1=7, pos_2_3=119, pos_4_10=1439; **ETV 122,811** | fact |
| top ranked keywords are dominated by unrelated long-tail | same, top-30 items | items included "maroon vs burgundy", "detroit famous food", "cuantas pulgadas es una yarda" — low-KD informational, mostly business-irrelevant | fact |
| **traffic ETV is entirely off-topic (2026-08-23)** | `ranked_keywords` order_by `etv,desc` limit 100 | **0 business keywords in top 100 by ETV**; 61/100 are generic (unit conversion "how many inches in a yard" etv=3986 pos=5, color comparison "teal vs turquoise" pos=7, fashion "polo or ralph lauren" etv=5047, "sig fig calculator" pos=5); top business keyword appears well below | fact |
| **generic keywords get zero AI citations for ud-machine** | `ai-optimization-llm-mentions` on "how many inches in a yard" | 1752 mentions / 30386 ai_volume, but sources_domain = reddit/angi/bobvila(家居)/biologyinsights — **ud-machine.com absent** | fact |
| **business keyword AI citations also exclude ud-machine** | `ai-optimization-llm-mentions` on "egg roll machine" | 313 mentions / 6944 ai_volume; sources = reddit/wikipedia/foodnetwork/kingarthurbaking/chefsresource — **ud-machine.com absent** from keyword-level top sources | fact |
| ud-machine.com is cited by ChatGPT AI search | `dataforseo.x.ai-optimization-llm-mentions-target-metrics-live` (target domain, platform chat_gpt, loc 2840) | `sources_domain` rank 2: **37 mentions / 1278 ai_search_volume** (behind only en.wikipedia.org); `search_results_domain` rank 1: **210 mentions / 5151**; total 245 mentions / 6386 ai_search_volume | fact |
| AI Overview cannot be fetched via SERP endpoints | `dataforseo.x.serp-google-organic-live-advanced` + `dataforseo.google.serp.organic` on a keyword whose `serp_item_types` included `ai_overview`, with `load_async_ai_overview: true` | both returned 0 `ai_overview` items; must use the llm-mentions endpoint | fact |

**Strategic reading (inference, strong):** ud-machine.com's domain-level AI citations (37 mentions, sources_domain rank 2) are driven by generic calculator/pages that happen to carry the domain, NOT by business keywords. The generic content generates Google visibility + domain-level AI noise, but neither the generic keywords NOR the business keywords surface ud-machine.com at keyword level in AI answers. The 2026 decision-content cluster is therefore the correct pivot but has not yet converted generic-domain authority into business-keyword AI citations (or Google top positions). This is the gap to exploit when competing against ud-machine.

Implication for the workflow: the "2026 decision-cluster drives rankings" and "calculator serves as AI traffic entry" hypotheses remain unverified at cluster level — domain-wide numbers confirm visibility but not attribution. To attribute, filter ranked_keywords by money-page sub-path and run llm-mentions per calculator keyword family.
