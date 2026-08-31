# Existing-Site Diagnosis Playbook v2

> Added: 2026-07-27
> Use when the user has a live website and needs diagnosis + recommendations, not a from-scratch plan.

## When to Use

- User says "look at my website SEO" / "audit my site" / "diagnose my site"
- User provides a live URL
- User wants to know what is wrong and what to fix, in priority order

## Relationship to Stage 0-14

| New-site path (Stage 0-14) | Diagnosis path (Phase D0-D6) |
|---|---|
| Start from industry name | Start from existing URL |
| Design from scratch | Audit current state → identify gaps → prioritize fixes |
| External research driven | Existing GSC/GA4/Ahrefs + competitor comparison |
| Full SEO PRD | Diagnosis report + priority fix list + supplementary roadmap |

Diagnosis can run standalone, or feed into any Stage 0-14 phase when deeper planning is needed.

---

## Diagnosis Workflow

### Phase D0: Site Intake

Collect in addition to standard Stage 0 intake:

```text
site URL
current CMS / tech stack
GSC / GA4 / Ahrefs / Semrush access?
rank tracker?
CRM tracking organic leads?
recent crawler export?
core business goal (leads / ecommerce / brand)
known SEO pain points
```

Output: `D0-site-intake.md`

### Phase D1: Evidence Harvest

Non-invasive data collection from the live site:

```text
1. robots.txt and sitemap structure
2. URL inventory (derived from sitemap)
3. sample page HTML (home, product, blog, category, about)
4. hreflang implementation (if multilingual)
5. schema implementation (JSON-LD + microdata)
6. page template structure (H1/title/meta/internal-links/CTA)
7. Core Web Vitals (PageSpeed API public data)
8. mobile usability
9. HTTPS / security headers
10. image SEO sample (alt / filename / size)
```

If user provides GSC/GA4/Ahrefs data, merge into evidence base.

Output: `D1-evidence-register.md` (each entry: source URL + retrieval date + raw signal + confidence)

### Phase D2: Current State Map

Structured description of what the site currently is:

```text
1. URL inventory (bucketed by type: product/blog/category/tool/trust/other)
2. page template catalog (modules, schema, internal-link pattern per template)
3. content coverage map (which topics have pages, which are missing)
4. technical SEO summary (indexability / rendering / performance / schema / hreflang)
5. internal link structure (silo boundaries / orphan pages / anchor patterns)
6. backlink overview (if Ahrefs data available)
7. traffic overview (if GSC/GA4 data available)
```

Outputs:

```text
D2-url-inventory.csv
D2-page-templates.md
D2-content-coverage-map.md
D2-technical-summary.md
D2-internal-link-map.md
```

### Phase D3: Gap Analysis

Compare current state to best-practice model, identify gaps:

#### D3a: Architecture Gap

| Check | Method | Gap Type |
|---|---|---|
| Product category hubs exist? | Cross-check URL inventory | missing-structure |
| Money pages are mixed-intent? | Sample page modules | partial-implementation |
| Price content is independent blog? | Check money page for price section | wrong-placement |
| Independent silo candidates? | Evaluate sub-category commercial value + URL structure | missing-opportunity |
| Multilingual versions? | Check hreflang | missing-structure |
| Calculators are product-specific? | Check /calculators/ directory | noise-or-missing |

#### D3b: Content Gap

```text
1. Compare current keyword coverage vs competitor keyword coverage
2. Identify missing content by intent type (purchase/comparison/learning/decision/question)
3. Check for thin content / cannibalization / outdated content
4. Check money page for missing key modules (spec table / FAQ / process flow / CTA)
5. Check blog coverage of question/comparison/price keywords
6. Check for product-specific calculators
```

#### D3c: Technical Gap

Run full checklist from `reference/technical-seo-playbook.md`, bucket by severity.

#### D3d: Schema / AI Gap

```text
1. Which page types lack schema
2. Schema matches visible content?
3. FAQ schema implemented? (blog vs money page implementation method)
4. AI visibility test (multi-prompt sample, record mention/citation/cited URL)
```

#### D3e: External Link Gap

```text
1. Current referring domains count and quality
2. Gap vs competitor referring domains
3. Link-worthy assets list (existing and missing)
```

Outputs:

```text
D3-architecture-gap.md
D3-content-gap.md
D3-technical-gap.md
D3-schema-ai-gap.md
D3-external-link-gap.md
```

### Phase D4: Priority Matrix

Sort all gaps by impact and fix cost:

| Priority | Definition | Example |
|---|---|---|
| P0 - Critical | Directly blocks indexing or severely harms ranking | Accidental noindex, key page 5xx, robots block |
| P1 - High | Significant ranking/conversion upside | Money page missing FAQ/specs/price article, architecture needs restructuring |
| P2 - Medium | Improvement available but requires investment | Add calculators, add blog clusters, optimize CWV, add schema |
| P3 - Low | Best-practice improvements | Image alt completion, security headers, internal-link anchor optimization |
| P4 - Noise | Things that should not be copied | Generic calculators, low-quality encyclopedia content |

Record per gap:

```text
gap_id, category, description, current_state, target_state, evidence,
severity (P0-P4), estimated_effort, dependency, owner, status
```

Output: `D4-priority-matrix.csv`

### Phase D5: Remediation Roadmap

Sequence fixes by dependency:

```text
Immediate (1-2 weeks):
  - Fix P0 critical technical SEO issues
  - Fix highest-impact P1 issues (money page FAQ/specs/CTA)

Short-term (3-6 weeks):
  - Fill core content gaps (price article / comparison / buying guide)
  - Fix architecture gaps (independent silo upgrade / internal-link restructure)
  - Add critical schema

Medium-term (7-12 weeks):
  - Develop product-specific calculators
  - Start external link acquisition
  - Build blog clusters
  - Multilingual expansion (if applicable)

Ongoing:
  - Content publishing cadence
  - AI visibility measurement
  - Ranking and conversion monitoring
  - Continuous technical SEO audit
```

Outputs:

```text
D5-remediation-roadmap.md
D5-remediation-calendar.csv
```

### Phase D6: Measurement Baseline

Establish measurement baseline for post-diagnosis improvement:

```text
1. Record baseline values for all core metrics
2. Track before/after changes for each fix
3. Define success criteria per fix
4. Set monitoring frequency and alert thresholds
```

Use Stage 14 measurement plan template, but fill baseline with current measured values.

Output: `D6-measurement-baseline.md`

---

## Bridging to Stage 0-14

After diagnosis, if user needs deeper planning, bridge from any Phase to corresponding Stage:

| Diagnosis Phase | Bridgeable Stage | Condition |
|---|---|---|
| D3a Architecture Gap | Stage 5 Architecture | Needs architecture redesign |
| D3b Content Gap | Stage 3 Keyword + Stage 6 Content Clusters | Needs systematic keyword/content planning |
| D3c Technical Gap | Stage 11 Technical SEO | Needs full technical audit |
| D3d Schema/AI Gap | Stage 9 Schema + AI Visibility | Needs schema and AI visibility plan |
| D3e External Link Gap | Stage 12 External Links | Needs external link workflow |
| D5 Remediation Roadmap | Stage 13 Publishing Roadmap | Needs full publishing plan |

Bridging does not require redoing completed diagnosis work — reference D0-D6 outputs as Stage inputs.

---

## Outputs

```text
seo-diagnosis-{site}/
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

---

## Agent Rules (Diagnosis Path)

1. Collect evidence before judging. Do not infer traffic from URL list; do not infer ranking from page existence.
2. Each finding must have severity (P0-P4) and evidence source.
3. Distinguish confirmed issues from suspected issues — suspected issues need more data to verify.
4. Do not force the full Stage 0-14 process unless the user needs it.
5. Fix recommendations must be specific: what to change, how to change, how to verify after.
6. If user provides GSC/GA4 data, prioritize data-driven diagnosis over HTML inference.
7. Diagnosis outputs can bridge seamlessly into any Stage 0-14 phase.
