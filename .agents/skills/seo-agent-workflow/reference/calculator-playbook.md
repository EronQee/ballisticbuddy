# Calculator Playbook v2

> Capture date: 2026-07-27
> Evidence: live UD Machine crawl; see `evidence-register.md`

## Core Position

`fact`: UD Machine has product-specific tools embedded under independent product silos.

`inference`: These tools may become strong decision-intent and AI-retrieval entry points because they produce parameterized outputs.

`unverified hypothesis`: Their actual AI citation or conversion performance still requires repeated measurement.

## Observed Product-Specific Tools

```text
/automatic-egg-roll-machine/wafer-egg-roll-production-roi/
/automatic-egg-roll-machine/model-decision-helper/
/automatic-egg-roll-machine/annual-fuel-cost-calculator/
/phoenix-roll-machine/roi-payback-calculator/
/phoenix-roll-machine/phoenix-roll-capacity-annual-output-planner/
/phoenix-roll-machine/plant-readiness-check/
/seaweed-egg-roll-machine/capacity-planner/
/seaweed-egg-roll-machine/install-fit-checker/
/seaweed-egg-roll-machine/labour-savings-calculator/
```

## Tool Types

| Type | User Decision | Typical Inputs | Typical Outputs |
|---|---|---|---|
| ROI / payback | whether to invest | capex, labour, output, waste, price | payback, annual gain, five-year net |
| Capacity planner | what capacity is needed | target volume, shifts, uptime | annual output, model recommendation |
| Model decision helper | which model fits | output tier, market, energy, SKU variety | model + rationale |
| Install fit checker | whether facility is ready | power, air, space, utilities | ready/not ready + missing requirements |
| Fuel/labour cost | operating-cost comparison | local price, use, labour | annual cost or savings |
| Spec selector | which specification applies | threat/use/application | candidate specification + assumptions |

## When to Build One

Build a tool only when all are true:

```text
The decision occurs in the buyer journey.
The inputs can be defined and validated.
The outputs have a defensible formula or source.
The product team can maintain the assumptions.
The result leads naturally to a product, quote, or next action.
The tool is useful without forced lead capture.
```

Do not build a calculator merely to create a URL or to imitate a competitor.

## Required Calculator Brief

```text
Goal
Target keyword
Search intent
User persona
Input fields
Validation rules
Formula and assumptions
Output fields
Source data and capture date
Citable fact answer
Uncertainty/range handling
YMYL classification and jurisdiction
Qualified formula/source reviewer
Disclaimer and escalation behavior
Data/privacy review
Internal links
CTA
Schema
Analytics events
AI visibility test plan
Owner and review cadence
```

## AI Visibility Test Plan

For each tool:

```text
1. Define 5-10 query intents.
2. Write at least 5 prompt variants per intent.
3. Test ChatGPT, Perplexity, Gemini, and Google AI Overview when available.
4. Repeat on multiple dates and locales.
5. Record mention, citation, cited URL, retrieval context, claim accuracy, freshness, and click.
6. Compare calculator URL against the related money page and cost article.
```

Never claim that a calculator, FAQ, schema, or fixed answer block guarantees AI inclusion.

## Internal Link Pattern

```text
Calculator -> product money page
Calculator -> independent cost article
Calculator -> relevant comparison page
Money page -> calculator
Blog article -> calculator when decision intent is detected
```

## Analytics Events

At minimum:

```text
calculator_view
calculator_start
calculator_complete
calculator_result_view
calculator_cta_click
calculator_share
calculator_error
```

Store only the data needed for measurement. Do not collect sensitive personal or financial data unless the project has a lawful, documented reason.

## Do Not Copy

The observed generic `/calculators/` directory includes mortgage, puppy-weight, medical, math, and unrelated construction tools. These can dilute topical relevance and may create YMYL obligations. They are not a recommended SEO pattern for a B2B site.
