# Local SEO Conditional Branch v2

Use only for a storefront, service-area business, or location-driven demand.

## Activation Test

```text
Does the business meet any of these?
- Has a physical storefront
- Is a Service Area Business (SAB)
- Has multiple service locations
- Target search queries trigger map pack (verified via Google search)
- Customers search with city/region/ZIP modifiers

If all no → skip this playbook
If any yes → continue
```

## Outputs

```text
local-seo/00-local-business-intake.md
local-seo/01-gbp-audit.md
local-seo/02-citation-inventory.csv
local-seo/03-local-serp-map.md
local-seo/04-review-policy.md
local-seo/05-location-page-gate.md
local-seo/06-local-rank-tracking.md
```

---

## 1. Local Business Intake

### Fields

| Field | Description | Required |
|---|---|---|
| business_name | Actual registered name (match GBP) | yes |
| legal_name | Legal entity name (if different) | conditional |
| business_type | storefront / SAB / hybrid | yes |
| primary_category | GBP primary category | yes |
| secondary_categories | GBP additional (max 9) | yes |
| address | Street, city, state/province, ZIP, country | storefront: yes; SAB: no |
| service_area | Service area (cities/radius/regions) | SAB: yes |
| phone | Primary phone | yes |
| website | Primary site URL | yes |
| hours | Operating hours (including exceptions) | storefront: yes |
| languages_served | Service languages | conditional |
| payment_methods | Accepted payments | conditional |
| attributes | GBP attributes (wheelchair accessible, women-led, etc.) | conditional |
| service_area_type | Hide address + show service area vs show address | SAB required |

### Business Type Decision

```text
storefront: customers visit physical location → GBP + citation + review + location page
SAB (Service Area Business): provider visits customer → GBP (hidden address) + citation + review
hybrid: both → treat as storefront + declare service area
multi-location: >1 physical location → each location gets own GBP + own location page
```

---

## 2. GBP Audit

### Complete Field Checklist

| # | Check | Method | Severity (missing/wrong) |
|---|---|---|---|
| 2.1 | GBP verified and I have management access | GBP dashboard | critical |
| 2.2 | Business name matches actual (no keyword stuffing) | Compare to registration | high (if stuffing) |
| 2.3 | Primary category accurate and specific | GBP + Google search verification | high |
| 2.4 | Secondary categories cover main services | GBP dashboard | medium |
| 2.5 | Address consistent with NAP | Cross website/citation/GBP | high |
| 2.6 | Service area correctly declared | GBP dashboard | high (SAB) |
| 2.7 | Phone consistent with NAP | Cross website/citation/GBP | high |
| 2.8 | Website URL correct and accessible | Click-verify | high |
| 2.9 | Hours accurate (including holiday exceptions) | GBP dashboard | medium |
| 2.10 | Description filled and natural (<750 chars) | GBP dashboard | medium |
| 2.11 | Photos ≥10 (exterior, interior, team, work scenes) | GBP dashboard count | medium |
| 2.12 | New photo upload frequency ≥1/month | GBP dashboard history | low |
| 2.13 | Services/Products list filled | GBP dashboard | medium |
| 2.14 | Q&A responded to | GBP dashboard | medium |
| 2.15 | Posts published ≥1/week | GBP dashboard history | low |
| 2.16 | Review count >0 | GBP dashboard | high (if 0) |
| 2.17 | Review rating ≥4.0 | GBP dashboard | high (if <4.0) |
| 2.18 | Negative reviews have responses | GBP dashboard | medium |
| 2.19 | No suspension/soft ban signs | Search brand name to verify appearance | critical |

---

## 3. Citation and NAP

### Citation Inventory

| Platform Category | Platforms to Check | Priority |
|---|---|---|
| Major aggregators | Google GBP, Bing Places, Apple Maps, Yelp, Facebook | critical |
| Industry directories | Industry-specific (e.g., manufacturing: ThomasNet, IndustryNet; medical: Healthgrades; legal: Avvo) | high |
| General directories | BBB, YellowPages, Manta, Foursquare, Hotfrog | medium |
| Social/review | LinkedIn, Glassdoor, Trustpilot, G2 | medium |
| Regional directories | Local chamber of commerce, city .gov directories | conditional |

### NAP Consistency Checks

| # | Check | Method | Severity |
|---|---|---|---|
| 3.1 | Name consistent across all platforms | Per-platform comparison | high |
| 3.2 | Address consistent across all platforms (including abbreviations/suite numbers) | Per-platform comparison | high |
| 3.3 | Phone consistent across all platforms | Per-platform comparison | high |
| 3.4 | Website URL consistent across all platforms | Per-platform comparison | medium |
| 3.5 | No duplicate listings (multiple listings on same platform) | Search verification | high |
| 3.6 | No erroneous info (closed/old address/old phone) | Search verification | high |
| 3.7 | Ownership/management claimed | Per-platform verification | high |

### Citation Inventory CSV Fields

```text
platform, url, name_on_platform, address_on_platform, phone_on_platform,
website_on_platform, nap_consistent, duplicate_listing, ownership_claimed,
errors_notes, priority, status (existing/to-create/to-fix/to-claim), captured_at
```

---

## 4. Local SERP

### Check Method

For each core service + city/region combination, run a Google search and record:

| Field | Description |
|---|---|
| query | Search term (e.g., `bulletproof glass installation los angeles`) |
| city/region | Target area |
| map_pack_present | yes/no |
| map_pack_position | Position if in map pack |
| map_pack_competitors | Other businesses in map pack |
| organic_top_3 | Top 3 organic results |
| local_intent | yes (city/region modifier) / no |
| dominant_page_type | Product page / location page / GBP / directory / blog |
| serp_features | AI Overview / images / video / shopping / knowledge panel |
| search_date | Query date |

### Local Keyword Discovery

```text
Discover local keywords from:
1. Google Autocomplete ({service} + {city})
2. People Also Ask (local variants)
3. GBP Insights search terms
4. GSC queries with city/region words
5. Competitor GBP visible queries

Record per keyword: keyword, city, intent, volume_estimate, map_pack_present, target_page
```

---

## 5. Review Policy

### Allowed

```text
- Authentic customers spontaneously leave positive or negative reviews
- Timely, professional responses to all reviews (within 24-48h)
- Natural reminder to leave a review after service completion (no star specified, no gating)
- Display authentic reviews on website and GBP
- Offline remediation for negative reviews; invite update if resolved
```

### Prohibited

```text
- Incentivized reviews (discounts, gifts, cash)
- Review gating (ask satisfaction first, only route satisfied customers)
- Selective positive-review requests
- Fabricated reviews
- Self-reviews or employee reviews
- Deleting or hiding negative reviews
- Revealing customer personal info in responses
- Bulk-purchased review services
```

### Review Response Templates

```text
Positive: thank + specific mention of what they praised + welcome back
Negative: apologize + acknowledge + provide offline contact + no public argument
```

### Review Monitoring

```text
- Frequency: at least weekly
- Platforms: Google GBP + Yelp + industry platforms + Trustpilot
- Record: review_count, average_rating, new_reviews_per_month, response_rate, response_time_median
- Alerts: rating drop >0.3 / new 1-star review / 7 days no new reviews (if previously steady)
```

---

## 6. Location Page Gate

### Creation Conditions

Create an independent location page only when ALL conditions are met:

```text
[ ] Has independent physical address or clearly defined service area
[ ] Has independent team (not HQ remote service)
[ ] Has local cases or project photos
[ ] Has local customer reviews
[ ] Service/product has local differences (inventory, pricing, delivery)
[ ] Has authentic local content (not HQ content with city name swapped)
```

### Prohibited

```text
- Doorway pages: city-name-swapped template pages (violates Google spam policy)
- Virtual location pages without independent address
- Thin location pages without authentic local evidence
- Multiple location pages at same address (different city names)
```

### Location Page Content Requirements

```text
- Independent H1 with city + service
- Local NAP (matching GBP)
- Local team introduction
- Local cases/projects
- Local service area map
- Local customer reviews
- Local FAQ
- CTA (local phone / form / directions link)
- Schema: LocalBusiness + BreadcrumbList + FAQPage
- Internal links: → product money page → related location page → GBP
```

---

## 7. Local Rank Tracking

### Tracking Setup

| Field | Description |
|---|---|
| Tool | BrightLocal / Whitespark / Local Falcon / manual |
| Keywords | Core service terms + city/region modifiers |
| Locations | Center point of each target city/ZIP |
| Search depth | Map pack + top 20 organic |
| Frequency | Weekly / biweekly |
| Device | Mobile-first (60%+ of local searches are mobile) |

### Tracking Metrics

```text
map_pack_visibility (appears + position)
map_pack_share_of_voice (position 1=100%, 2=80%, 3=60%...)
local_organic_position
local_organic_clicks (GSC city-filtered)
gbp_actions (call/direction/website/booking)
gbp_impressions
gbp_search_queries (discovery queries)
review_velocity (new reviews/month)
review_rating_trend
citation_accuracy_rate
```

### Share of Local Voice (SoLV)

```text
For each core query + city:
  SoLV = Σ(my position weights) / Σ(all competitor position weights) × 100%

Position weights: 1=100%, 2=80%, 3=60%, 4=40%, 5=20%, else=0

Track SoLV trend monthly.
```

---

## 8. Measurement

### Metrics

| Metric | Source | Baseline | Target | Cadence | Owner |
|---|---|---|---|---|---|
| GBP impressions | GBP Insights | | | weekly | |
| GBP actions (call/direction/website) | GBP Insights | | | weekly | |
| Map pack visibility | rank tracker | | | weekly | |
| SoLV per city | rank tracker | | | monthly | |
| Local organic clicks | GSC (city-filtered) | | | weekly | |
| Local organic leads | CRM | | | monthly | |
| Review count | GBP + platforms | | | monthly | |
| Review rating | GBP + platforms | | | monthly | |
| Review velocity | GBP + platforms | | | monthly | |
| Review response rate | manual | | | monthly | |
| Citation accuracy rate | citation audit | | | quarterly | |
| Citation count | citation audit | | | quarterly | |
| Location page traffic | GA4 | | | monthly | |
| Location page leads | CRM | | | monthly | |

Each metric must include `baseline / target / cadence / owner / decision_threshold`.

### Decision Thresholds

```text
If review_rating < 4.0 → trigger review remediation plan
If citation_accuracy < 90% → trigger citation fix sprint
If SoLV drops > 10% MoM → trigger local SERP diagnosis
If GBP actions drop > 20% WoW → trigger GBP optimization review
If map pack falls out of position 3 → trigger competitive analysis
```
