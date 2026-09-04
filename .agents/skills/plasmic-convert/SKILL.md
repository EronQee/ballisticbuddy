---
name: plasmic-convert
description: >
  Convert a React component into a Plasmic code component and complete the
  full workshop loop: land the file in src/components/plasmic/, auto-register
  via pnpm plasmic:sync, pass typecheck/lint, and hand back Studio verification
  steps. Use when the user wants to 把组件转成 plasmic, register 这个组件,
  加到 plasmic 车间, mentions Plasmic Studio debugging, or hands over component
  code meant for visual polishing in the workshop.
---

# Plasmic Convert

Convert any React component into a Plasmic code component and complete every
step needed for it to appear and work inside Plasmic Studio.

## When to use

- User hands over component code (pasted text, a file path, or a URL) and wants
  it registered for Plasmic Studio debugging
- A new component needs to enter the workshop directory
- Any mention of converting/registering a component "for plasmic"

## Inputs

- Component source code (required)
- Optional: desired registration name (defaults to the component name,
  PascalCase)

## Procedure

1. **Read the spec**: read `documention/plasmic-code-components.md` first.
   Convert following its §10 rules:
   - Extract hardcoded visual values into props, each with `defaultValue`
     (defaults must reproduce the original visuals exactly)
   - Root element carries `className`
   - Slots get `defaultValue` element trees (§4); `choice` uses `{value,label}[]`
   - `next/image` → `<img>`, `next/link` → `<a>` (visually equivalent)
   - Keep hooks/event logic; move data fetching, browser APIs, and external
     store/context reads out into props
   - Keep animations (framer-motion/CSS); optionally add a disable-switch prop
     such as `motionDisabled`
2. **Land the file**: write `src/components/plasmic/X.tsx` (X = component
   name). Props must be a named `interface` with a JSDoc comment on each field.
3. **Register via script**: run `pnpm plasmic:sync`. It parses the Props
   interface, maps types to Plasmic metadata (string-literal union → `choice`,
   `ReactNode` → `slot`, function → `eventHandler`), and only-add updates
   `plasmic-init-client.tsx` and the barrel export.
   JSDoc refinements the script understands:
   - Component level: `@plasmic displayName="..." description="..." section="..."`
   - Prop level: `@plasmic-choice A|B|C`, `@plasmic-slot allowed=A,B`,
     `@plasmic displayName="..." advanced hidden defaultValue=x`
   - What the script cannot express (templates, states, isAttachment, complex
     slot default trees) must be appended by hand afterwards.
4. **Barrel export**: `pnpm plasmic:sync` already updates
   `src/components/plasmic/index.ts`; only add manually when registering by hand.
5. **Verify**: run `pnpm exec tsc --noEmit` and
   `pnpm exec eslint "src/components/plasmic/**" "src/plasmic/**"` — zero
   errors or the step fails.
6. **Hand back**: always tell the user:
   - The registration name and displayName
   - `pnpm dev` → refresh the Studio project → Insert menu → search displayName
   - Studio edits do not write back to code; polish results must be fixed into
     the component file (see `documention/plasmic-workflow.md` Flow B)

## Constraints

- Component files go **only** in `src/components/plasmic/`
- Components must be visually self-contained: no data fetching, no external
  store/context reads (data enters via props; use `registerGlobalContext` if
  global state is truly required, and flag it in the hand-back)
- Never modify `src/app/(frontend)/plasmic-host/` or `src/proxy.ts`
- If a registration with the same name exists, report the conflict and ask
  whether to overwrite or rename

## References

- `documention/plasmic-code-components.md` — full API spec (required reading)
- `documention/plasmic-workflow.md` — workflow and hard rules
