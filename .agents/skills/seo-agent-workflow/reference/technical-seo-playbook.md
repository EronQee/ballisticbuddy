# Technical SEO Playbook v2

## Inputs

```text
robots.txt
sitemap index and child sitemaps
crawler export (Screaming Frog / Sitebulb / Ahrefs Site Audit)
source and rendered HTML
HTTP status and redirect chain
canonical and meta robots
hreflang
GSC URL Inspection evidence
PageSpeed/CWV data
mobile test
structured-data validation
image inventory
server log samples (if available)
```

## Severity Definitions

| Severity | Definition | Action |
|---|---|---|
| critical | Blocks indexing or rendering; directly harms ranking ability | Fix within 48h |
| high | Significant ranking or UX damage | Fix within 1 week |
| medium | Ranking/UX harm but tolerable short-term | Current sprint |
| low | Best-practice deviation, no direct ranking harm | Backlog |
| info | Observation, no action needed | — |

---

## 1. Crawlability

| # | Check | Method | Severity (on fail) | Fix |
|---|---|---|---|---|
| 1.1 | robots.txt does not block important paths | Cross-check Disallow with URL inventory | critical | Remove or narrow Disallow; staging first |
| 1.2 | AI crawler access (GPTBot/Bytespider/PerplexityBot) | Check User-agent rules | info | Record policy; do not treat as ranking factor |
| 1.3 | Sitemap contains only canonical, indexable 200 URLs | Parse all sub-sitemaps; filter noindex/redirect/404/duplicate | high | Remove non-compliant URLs; log removals |
| 1.4 | Sitemap declared in robots.txt | Check Sitemap: directive | high | Add declaration |
| 1.5 | Sitemap lastmod reflects actual changes | Sample 10 URLs; compare lastmod vs actual modification | medium | Update or remove false lastmod |
| 1.6 | Orphan pages (in sitemap but no internal link, or vice versa) | Crawler export cross sitemap + internal link graph | high | Add internal link or add to sitemap; noindex if not meant to index |
| 1.7 | Parameter traps / crawl loops | Check URL params, pagination, facets, session IDs | high | Canonical / robots / nofollow pagination |
| 1.8 | Crawl rate reasonable | GSC crawl stats + server log sample | medium | Adjust Crawl-Delay or server resources |
| 1.9 | Broken internal links | Crawler 4xx/5xx report | high | Fix target or 301 redirect |
| 1.10 | Broken external links | Crawler external link report | low | Update or remove link |
| 1.11 | Intrusive interstitials | Mobile sample | medium | Remove or delay popup |
| 1.12 | llms.txt / ai.txt | Check existence | info | Record if present; do not create if absent; not a proven requirement |

---

## 2. Indexability

| # | Check | Method | Severity | Fix |
|---|---|---|---|---|
| 2.1 | Important URLs return 200 | Crawler report | critical (5xx) / high (4xx) | Fix server / 301 / create page |
| 2.2 | meta robots tags | Check name="robots" | critical (unexpected noindex) | Remove noindex; **staging required** |
| 2.3 | canonical tags | Check rel="canonical" | critical (wrong target) | Fix canonical; **staging required** |
| 2.4 | Canonical self-consistent | Cross URL inventory | high | Fix |
| 2.5 | Sitemap matches indexability | Sitemap URLs × indexability status | high | Remove noindex URLs or restore indexing |
| 2.6 | Internal links match indexability | Link graph × indexability | high | Remove links to noindex or restore indexing |
| 2.7 | GSC URL Inspection verified | Per-URL or sample | high | Diagnose "Discovered - not indexed" |
| 2.8 | Pagination canonical strategy | Check pagination chain canonicals | medium | Self-referencing vs View All |
| 2.9 | Leftover noindex (old test/temp pages) | Full-site scan | high | Remove noindex or confirm intent |

### Indexability Record Fields

```text
url, status_code, indexability, meta_robots, canonical_target,
sitemap_presence, internal_link_count, orphan, GSC_inspection_result,
GSC_inspection_date, last_crawled_date, notes
```

---

## 3. Rendering and Interactive Tools

| # | Check | Method | Severity | Fix |
|---|---|---|---|---|
| 3.1 | Source vs rendered HTML difference | Compare curl/fetch with headless Chrome snapshot | critical (core content missing) | SSR or static pre-render |
| 3.2 | Calculator input labels crawlable | Check rendered HTML for field labels and units | high | Add static text |
| 3.3 | Calculator output labels crawlable | Check rendered HTML for output labels and units | high | Add static text |
| 3.4 | Calculator results in DOM (not only browser state) | Check output elements in rendered HTML | high | Write results to DOM |
| 3.5 | Static explanation text for citable facts | Check for noscript or static paragraph | high | Add static explanation |
| 3.6 | No-JS fallback | Disable JS; check core content | medium | Add noscript or SSR |
| 3.7 | Third-party scripts non-blocking | Check async/defer/blocking | medium | Add async/defer |
| 3.8 | Calculator mobile controls work | Mobile test | high | Fix touch targets / scroll / input |

---

## 4. URL, Canonical, Redirect

| # | Check | Method | Severity |
|---|---|---|---|
| 4.1 | URL uniqueness (no duplicate content at different URLs) | Crawler duplicate content report | high |
| 4.2 | Trailing slash consistency | Full-site check | medium |
| 4.3 | HTTPS everywhere | Mixed content + HTTP redirect check | critical |
| 4.4 | Language path format consistent | /{lang}/{path}/ consistency | high |
| 4.5 | Canonical self-consistent (self-referencing or explicit) | Full-site check | critical |
| 4.6 | 301 migration chains complete | Old URL → new URL mapping | high |
| 4.7 | >1 hop redirect chains | Crawler redirect report | medium |
| 4.8 | Soft 404s | 200 status + 404 content | high |
| 4.9 | URL parameter normalization | Sort/filter/pagination params | medium |
| 4.10 | Case consistency | URL case check | low |

---

## 5. Hreflang

| # | Check | Method | Severity |
|---|---|---|---|
| 5.1 | Reciprocal hreflang | Check bidirectional mapping | critical (missing) |
| 5.2 | Valid language/region codes (BCP 47) | Validate hreflang values | high |
| 5.3 | Canonical compatible with hreflang | Canonical points to same-language self | critical (conflict) |
| 5.4 | Missing language versions | Declared languages vs actual pages | high |
| 5.5 | Thin machine-translated content risk | Sample non-en pages for length/quality | high |
| 5.6 | x-default present and correct | Check hreflang="x-default" | medium |
| 5.7 | Self-referencing hreflang present | Each page includes own language | medium |
| 5.8 | Hreflang implementation consistent (one method) | sitemap vs HTML vs HTTP header | low |

---

## 6. Performance and Mobile

| # | Check | Method | Threshold | Severity (exceeded) |
|---|---|---|---|---|
| 6.1 | LCP | PageSpeed / CrUX | < 2.5s (p75) | high |
| 6.2 | INP | PageSpeed / CrUX | < 200ms (p75) | high |
| 6.3 | CLS | PageSpeed / CrUX | < 0.1 | medium |
| 6.4 | TTFB | Server measurement | < 800ms | medium |
| 6.5 | FCP | PageSpeed | < 1.8s | medium |
| 6.6 | Mobile usability | GSC / Lighthouse | pass | critical (fail) |
| 6.7 | Image bytes (>200KB without WebP/AVIF) | Crawler image report | — | medium |
| 6.8 | Lazy loading | Check loading="lazy" / Intersection Observer | — | low |
| 6.9 | Layout shift sources | Lighthouse CLS diagnostic | — | medium |
| 6.10 | Third-party script cost | Lighthouse / WebPageTest | < 300ms blocking | medium |
| 6.11 | Calculator mobile controls | Real device test | — | high |
| 6.12 | Calculator result latency | Measure input→output time | < 500ms | medium |
| 6.13 | Calculator error state UX | Test invalid inputs | Clear message | medium |

---

## 7. Structured Data

### Per-page-type schema requirements

| Page Type | Required Schema | Optional Schema |
|---|---|---|
| Money Page | BreadcrumbList, FAQPage | Product, Organization |
| Blog Article | Article/NewsArticle, BreadcrumbList, FAQPage | Person, ImageObject |
| Calculator | BreadcrumbList | SoftwareApplication, FAQPage |
| Category Hub | BreadcrumbList | CollectionPage |
| About/Contact | Organization | LocalBusiness |
| Homepage | Organization, WebSite, BreadcrumbList | SearchAction |

| # | Check | Method | Severity |
|---|---|---|---|
| 7.1 | JSON-LD syntax valid | Rich Results Test / schema.org validator | critical |
| 7.2 | Schema matches visible content | Manual sample of 5 pages | critical (inconsistent) |
| 7.3 | No unshown prices/ratings/reviews in schema | Cross page content | critical |
| 7.4 | FAQPage has >0 readable Q&A | Check mainEntity | high |
| 7.5 | BreadcrumbList matches URL hierarchy | Cross URL structure | medium |
| 7.6 | Organization name/URL/logo consistent | Full-site check | medium |
| 7.7 | ImageObject references accessible | Check url/contentUrl | low |
| 7.8 | No HowTo schema wrapping calculators | Check calculator pages | high |

---

## 8. Security Headers

| # | Check | Severity |
|---|---|---|
| 8.1 | HSTS (Strict-Transport-Security) | medium |
| 8.2 | X-Content-Type-Options: nosniff | low |
| 8.3 | X-Frame-Options / CSP frame-ancestors | low |
| 8.4 | Referrer-Policy | low |
| 8.5 | Permissions-Policy | info |

---

## 9. Image SEO

| # | Check | Severity |
|---|---|---|
| 9.1 | Alt text non-empty and descriptive | high (product images missing) |
| 9.2 | Filename contains keyword and is readable | medium |
| 9.3 | File size reasonable (<200KB, WebP/AVIF preferred) | medium |
| 9.4 | Width/height attributes set (prevent CLS) | medium |
| 9.5 | srcset / picture responsive | low |
| 9.6 | Lazy loading (non-above-fold images) | low |
| 9.7 | Image sitemap (if needed) | info |

---

## 10. Change Control

Any noindex, robots, canonical, or hreflang change must follow:

```text
1. before snapshot: record current state (curl / screenshot / GSC inspection / ranking snapshot)
2. change owner: who and why
3. staging test: deploy to staging; run full audit checklist (sections 1-9 above)
4. validation evidence: save staging results and comparison
5. deployment date: record go-live time
6. rollback steps: pre-record exact rollback commands
7. after snapshot: record new state post-change
8. monitoring window: minimum 7 days GSC/ranking monitoring
9. decision threshold: pre-define what data triggers rollback
10. action: continue / change / rollback
```

### Safety Rules

```text
Any noindex / robots / canonical / hreflang change:
  - Must staging-validate first
  - Must have rollback steps
  - Must have 7-day monitoring window
  - Must verify via GSC URL Inspection

Batch changes (>10 URLs):
  - Execute in batches of ≤50
  - At least 3 days between batches

Emergency changes (e.g. accidental noindex on key page):
  - May skip staging, but must retroactively validate within 24h
```

---

## 11. Production Checklist

Pre-publish gates:

```text
[ ] robots.txt has no unexpected blocks
[ ] Sitemap contains all intended indexable URLs, no noindex/redirect/404
[ ] Every important URL is indexable (200 + no noindex + canonical correct)
[ ] No orphan pages in internal link graph
[ ] Rendering check passed (source vs rendered consistent)
[ ] Calculator crawlable (input/output/static explanation)
[ ] Hreflang reciprocal complete (if multilingual)
[ ] LCP < 2.5s, INP < 200ms, CLS < 0.1 (at least lab data)
[ ] Mobile usability pass
[ ] Structured data valid + matches visible content
[ ] Image alt non-empty (product pages 100%, blog >= 80%)
[ ] HTTPS everywhere
[ ] No broken internal links
[ ] Change control record updated
[ ] GSC sitemap submitted
[ ] GSC URL Inspection sample passed
```

---

## 12. Audit Report Template

```markdown
## Technical SEO Audit Report

**Audit date**:
**Scope**:
**Tools**:

### Summary

| Severity | Count |
|---|---|
| critical | |
| high | |
| medium | |
| low | |
| info | |

### Findings

| # | Category | Finding | Severity | Affected URLs | Evidence | Fix | Owner | Status | captured_at |
|---|---|---|---|---|---|---|---|---|---|
```
