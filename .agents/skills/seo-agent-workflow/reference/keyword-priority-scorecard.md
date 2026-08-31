# Keyword Priority Scorecard v2

## Why the Old Formula Was Removed

The old formula used undefined scales for intent fit, traffic potential, CPC signal, and difficulty penalty. It created false precision and conflicted with the ordinal business-potential guidance.

## Scorecard

### Business Fit

```text
3 = close to purchase and naturally leads to product/quote
2 = strong commercial research, comparison, or selection
1 = relevant buyer education
0 = unrelated or not monetizable
```

### SERP Intent Fit

```text
pass = planned page type, format, and angle match the top SERP
conditional = requires a differentiated or hybrid page
fail = planned page type conflicts with the top SERP
```

### Ranking Potential

```text
high = meaningful content/evidence/authority gap and ability to solve it
medium = competitive with content and authority investment
low = dominated by stronger authority or incompatible page types
```

### Authority Burden

Record top-page referring domains, relevance, brand strength, content depth, and unique evidence.

### Traffic and Trend

Record topic-level traffic potential, query breadth, growth window, trend direction, and seasonality.

### Content Effort

```text
low = simple research and maintenance
medium = SME, charts, or original examples required
high = calculator, experiment, certification, development, or ongoing data required
```

## Final Priority

```text
Immediate = business fit 3 + SERP pass + medium/high ranking potential + evidence available
Next = strong fit but needs asset, expert, or authority work
Later = useful but low feasibility or seasonal timing
Reject = poor fit, SERP mismatch, unsupported claim risk, or thin-content risk
```

Tool KD is a reference input, never the final decision.

## Required CSV Fields

```text
keyword,cluster,parent_topic,intent,volume,kd,cpc,growth,seasonality,traffic_potential,business_potential,serp_features,top10_referring_domains,serp_intent_fit,ranking_potential,content_effort,manual_difficulty_rationale,target_page_type,target_url,priority,source,notes,captured_at,country,language
```

## Acceptance Gates

Before a keyword enters the content plan it must pass:

```text
business fit gate
SERP page-type gate
evidence/expertise gate
authority-burden gate
internal-link and conversion-path gate
```
