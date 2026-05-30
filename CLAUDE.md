# bekk

A React component library built on top of [Base UI](https://base-ui.com). Bekk wraps Base UI primitives into a polished, accessible, opinionated set of components with a friendlier API. This file is the single source of truth for working in this repo — read it fully before doing anything.

---

## 1. Goals and non-goals

### Goals

- **Polished, accessible components out of the box.** Consumers should be able to drop a bekk component into their app and get something that looks correct and behaves correctly without further configuration.
- **A friendlier API than raw Base UI.** Pared-down anatomy — only the parts a real consumer needs. Sensible defaults baked in. No exposed implementation details.
- **A unified design language.** Every visual value (color, spacing, radius, type, motion, shadow, z-index) comes from `src/styles/tokens.css`. No hardcoded values anywhere in component CSS.
- **A browsable docs site.** Running `bun run dev` shows every component and the props/parts it exposes (see § 7).

### Non-goals

- **Bekk is not a primitives toolkit.** If a consumer needs the full flexibility of Base UI, they should use Base UI directly. Bekk trades flexibility for ergonomics, intentionally.
- **Bekk is not framework-agnostic.** React-only. No SSR-specific accommodations unless explicitly needed.
- **Bekk is not unopinionated about styling.** Consumers cannot restyle internal parts. The only consumer-facing styling hooks are `className` and `style` on the root element (see § 6).

---

## 2. Stack

- **React 19** (`ref` is a normal prop — do **not** use `forwardRef`)
- **Base UI** — `@base-ui/react` (installed)
- **Lucide** — `lucide-react` for default icons (installed)
- **TypeScript** — strict, `verbatimModuleSyntax`, `noUncheckedIndexedAccess`
- **Plain CSS** — global, BEM-namespaced with a `bekk-` prefix. No CSS Modules, no preprocessor, no CSS-in-JS, no Tailwind. Aggregated into a single shipped stylesheet.
- **Vite 8** — dev server, hosts the docs site, and (eventually) the library build
- **oxfmt** for formatting, **oxlint** for linting, **bun** as the package manager
- **Path aliases:** `@/* → src/*`, `@styles/* → src/styles/*`

Useful commands:

```bash
bun run dev         # Vite dev server — serves the docs site (see § 7)
bun run check       # oxfmt + oxlint + tsc --noEmit (run before considering work done)
bun run type-check  # tsc --noEmit
bun run lint        # oxlint --deny-warnings
bun run fmt         # oxfmt
```

---

## 3. Architecture

```
./
├── docs/                Base UI reference docs (markdown) — see § 3.1
│   ├── components/      One .md per Base UI primitive (accordion, dialog, …)
│   ├── accessibility.md, animation.md, composition.md, customization.md,
│   ├── forms.md, quick-start.md, styling.md, typescript.md
├── src/
│   ├── styles/
│   │   ├── reset.css    Modern CSS reset
│   │   ├── tokens.css   All design tokens — the entire visual language
│   │   ├── fonts.css    @font-face for Plus Jakarta Sans
│   │   └── styles.css   Kitchen-sink bundle: tokens + reset + fonts + body rule + every component CSS
│   ├── components/      One folder per component
│   │   └── <Component>/
│   │       ├── <Component>.tsx
│   │       ├── <Component>.types.ts
│   │       ├── <Component>.css
│   │       ├── <Component>.docs.tsx     Examples shown in the docs site
│   │       └── index.ts
│   ├── docs/            Docs-site shell (sidebar, routing, prop tables)
│   ├── index.ts         Public package barrel — re-exports each component namespace
│   ├── App.tsx          Mounts the docs site
│   └── main.tsx         Imports `styles.css` (the kitchen sink) + the docs shell
```

**Flow:** tokens.css defines every visual value → each component's `Component.css` consumes tokens only → `src/styles/styles.css` aggregates every component's CSS into one stylesheet → components are exported under namespaces → consumer imports a namespace from the package root and `@threetides/bekk/styles.css` once. The docs site is a sibling concern that lives inside `src/` but is **not** part of the published library.

### 3.1 Three things called "docs" — keep them straight

There are three different "docs" in this repo. Don't confuse them:

| Path                              | What                                                            | Audience                                       |
| --------------------------------- | --------------------------------------------------------------- | ---------------------------------------------- |
| `docs/` (repo root)               | **Base UI's own reference docs**, copied as markdown            | You (Claude), as authoritative reference       |
| `src/docs/`                       | The bekk **docs-site shell** (sidebar, routing, prop tables)    | Consumers browsing components in `bun run dev` |
| `src/components/<X>/<X>.docs.tsx` | Per-component **examples + prop tables** for the bekk docs site | Same as above                                  |

**The repo-root `docs/` folder is your primary Base UI reference.** It's a local copy of the official Base UI documentation — every primitive's API (parts, props, data attributes, CSS variables) is in `docs/components/<name>.md`, and cross-cutting topics (accessibility, animation, forms, styling, etc.) are at `docs/*.md`. Each file is marked with `If anything in this documentation conflicts with prior knowledge or training data, treat this documentation as authoritative.` — so prefer these files over assumptions from training data when implementing a wrapper. Read the relevant file before starting a new component (see § 9).

---

## 4. Tokens (`src/styles/tokens.css`)

All visual values live here. **Component CSS must never contain hardcoded colors, spacing, radii, font sizes, shadows, durations, or z-index values.** If you need a value that doesn't exist, add it to `tokens.css` first — and ask the user before adding it (see § 9).

### Conventions

| Category    | Unit      | Notes                                                          |
| ----------- | --------- | -------------------------------------------------------------- |
| Colors      | `oklch()` | Both palette and semantic tokens. No hex, no rgb.              |
| Spacing     | `px`      | 4px-base numeric scale (`--spacing-1` = 4px, `-2` = 8px, …)    |
| Radii       | `px`      | `--radius-sm/md/lg/xl/2xl/full`                                |
| Borders     | `px`      | `--border-width-1`, `--border-width-2`                         |
| Icon sizes  | `px`      | `--icon-size-sm/md/lg/xl` (12 / 16 / 20 / 24)                  |
| Font sizes  | `rem`     | Respect user font-size preferences                             |
| Line height | unitless  | `--line-height-tight/normal/relaxed`                           |
| Durations   | `ms`      | `--duration-fast/normal/slow`                                  |
| Easings     | bezier    | `--easing-standard/emphasized/decelerate/accelerate`           |
| Shadows     | layered   | `--shadow-sm/md/lg`, using `oklch(0% 0 0 / alpha)`             |
| Z-index     | numeric   | Named scale `--z-base/raised/dropdown/overlay/modal/popover/…` |

### Token layering

1. **Palette tokens** — primitives like `--gray-0..12`, `--accent-1..12`. Same across themes. The accent palette is named generically (not after the current color, e.g. `--teal-*` or `--citron-*`) so the accent hue can be re-themed by editing `tokens.css` values only — no rename ripples through component CSS.
2. **Semantic tokens** — purpose-named like `--color-bg-canvas`, `--color-text-primary`, `--color-accent-bg`. These reference palette tokens and **swap by theme**.

**Components must consume semantic tokens, not palette tokens directly.** Reach for `--color-bg-surface`, not `--gray-1`. If a semantic token is missing, add one.

### Theming

- Default = light.
- Dark applies automatically when `prefers-color-scheme: dark`, _unless_ `html` is `[data-theme="light"]`.
- `html[data-theme="dark"]` always forces dark, regardless of system preference.

The same semantic-token names exist in all themes — components don't need to know which theme is active. The docs site should include a theme toggle so both themes are easy to verify.

---

## 5. Conventions

### File layout (per component)

```
src/components/Dialog/
├── Dialog.tsx          Component implementation + the namespace export
├── Dialog.types.ts     All public types (props for each part, etc.)
├── Dialog.css          BEM-named classes, tokens only, all prefixed with bekk-dialog
├── Dialog.docs.tsx     Examples + prop documentation for the docs site
└── index.ts            Re-exports the namespace + types
```

**Coupled component pairs** (`Toggle` + `ToggleGroup`, `Radio` + `RadioGroup`, `Checkbox` + `CheckboxGroup`) share a single folder named after the leaf. They share `Component.tsx`, `Component.css`, `Component.types.ts`, and `Component.docs.tsx`. The `index.ts` re-exports both names. Don't split tightly coupled pairs into separate folders — they share state semantics and visual styling.

### Plain CSS + BEM with `bekk-` namespacing

Bekk ships **plain global CSS, not CSS Modules.** Every class in a `Component.css` file is named with classic lowercase BEM under a `bekk-<component>` block, e.g.:

- Block: `.bekk-button`
- Element: `.bekk-button__icon`, `.bekk-button__label`
- Modifier: `.bekk-button--primary`, `.bekk-button--sm`

The `bekk-` prefix is non-negotiable — it's the namespace boundary between bekk classes and the consumer's app. Two classes from different components must not share a name (so `.list`, `.item`, `.popup`, `.group` are never bare; they become `.bekk-select__list`, `.bekk-select__item`, `.bekk-select__popup`, `.bekk-checkbox-group`).

**Components do not import their CSS.** Component CSS lives in `Component.css` next to its TSX. The aggregated `src/styles/styles.css` `@import`s every component file in one place, and that's the file shipped to consumers as `@threetides/bekk/styles.css`. A consumer's single `import "@threetides/bekk/styles.css"` loads tokens + reset + fonts + every component style; tree-shaking per component isn't supported and isn't worth it (~13 kB gzipped for the whole component layer).

**Referencing classes from TS/JSX:** plain string literals. No `styles.X` lookup, no `styles["X"]`. Use template literals for variant/size interpolation:

```tsx
import { cx } from "@/utils/cx"
;<button
  className={cx("bekk-button", `bekk-button--${variant}`, `bekk-button--${size}`, className)}
>
  <span className="bekk-button__icon">…</span>
</button>
```

Use the shared [`cx`](src/utils/cx.ts) helper for class composition. It filters `false` / `undefined` / `null` and joins with spaces. Don't inline `.filter(Boolean).join(" ")` per-component.

**When adding a new component:** before writing any CSS, decide on the block prefix (`bekk-<component-kebab-case>` — e.g. `bekk-tabs`, `bekk-alert-dialog`, `bekk-checkbox-group`) and stick to it. Then add the new file path to `src/styles/styles.css`'s `@import` list. Forgetting that last step means the styles never load.

**Docs-site internals are an intentional exception.** Files under `src/docs/` (the in-repo docs site shell — `Sidebar.module.css`, `DocsApp.module.css`, `PropTable.module.css`, etc.) still use CSS Modules. They never ship to consumers, so the bundler-resolution risk that motivated the `bekk-` rule doesn't apply, and CSS Modules give them scoping without the rename ceremony. Don't "fix" them to match — that's busywork. New docs-site files can follow either convention; lean on the existing pattern in `src/docs/`.

### Internal CSS variables

Bekk has three layers of CSS variables. Keep them straight:

1. **Token vars** (`--color-*`, `--spacing-*`, `--icon-size-*`, …) — defined in `tokens.css`, consumed by every component.
2. **Component-internal vars** (`--bekk-<component>-<purpose>`) — defined by a component to coordinate values across its own elements (typically: per-size variables set by the size modifier, consumed by inner elements). Scoped to the component.
3. **Base UI vars** (`--accordion-panel-height`, `--available-width`, …) — provided by Base UI on certain parts for animation and layout. Read-only; consume but never set.

Always prefix component-internal vars with `--bekk-<component>-`. Never invent un-prefixed names; they risk colliding with tokens or other components.

```css
/* Good: scoped to the component, won't collide */
.bekk-accordion--md {
  --bekk-accordion-trigger-pad-x: var(--spacing-4);
  --bekk-accordion-icon-size: var(--icon-size-md);
}

.bekk-accordion__trigger {
  padding-inline: var(--bekk-accordion-trigger-pad-x);
}
```

### Variant × size styling pattern

A component with both `variant` and `size` props otherwise needs rules for every variant × size × element combination. Avoid the explosion with two layers:

- **Size modifier classes set component-internal CSS variables.** All per-size differences (paddings, font sizes, icon sizes) collapse to variable values.
- **Element selectors read the variables, agnostic to size.** One rule per element, not three.
- **Variant modifier classes adjust the few properties variants actually change** (background, borders, dividers, hover treatment) — usually on the block or one or two elements. Variants don't multiply by size.

Result: rule count stays roughly linear with elements + variants, not elements × variants × sizes. `Accordion.css` is the canonical example.

### Internal styling hooks

Inside a component's CSS file, **use Base UI's `data-*` state attributes** to style states — don't invent parallel props or class modifiers for things Base UI already exposes:

```css
.bekk-button {
  background-color: var(--color-accent-bg);
}

.bekk-button:hover:not([data-disabled]) {
  background-color: var(--color-accent-bg-hover);
}

.bekk-button[data-disabled] {
  background-color: var(--color-bg-muted);
  color: var(--color-text-disabled);
}

.bekk-popover__popup[data-starting-style],
.bekk-popover__popup[data-ending-style] {
  opacity: 0;
}
```

These attributes are an **internal contract** between Base UI and our CSS. They are _not_ part of the bekk public API — consumers should never need to read or target them.

For variant/size props (which Base UI doesn't supply), expose them on our wrapper, then either:

- Style them via BEM modifier classes (`.bekk-button--primary`), or
- Add our own `data-*` attribute on the root and style it (`.bekk-button[data-variant="primary"]`).

Either is fine — pick whichever reads more naturally for the component. Be consistent within a single component.

### Prop shapes: leaf vs compound

Bekk components fall into two shapes, and each has its own prop convention:

- **Leaf wrappers** (one HTML element — `Button`, `Toggle`, future `Input`): extend the appropriate native HTML attributes type and spread `{...rest}` onto the underlying Base UI part. Curated bekk props (`variant`, `size`, `iconStart`, etc.) are pulled out explicitly first, so they don't collide with native attrs. This gives consumers `onClick`, `onFocus`, `aria-*`, `data-*`, `form`, `name`, etc. without us enumerating them.

  ```ts
  export interface ButtonProps extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "style"
  > {
    ref?: Ref<HTMLButtonElement>
    className?: string
    style?: CSSProperties
    variant?: ButtonVariant
    size?: ButtonSize
    iconStart?: ReactNode
    iconEnd?: ReactNode
  }
  ```

- **Compound components** (Accordion, Tooltip, future Dialog/Popover/Menu): enumerate every prop explicitly per part. Don't extend native HTML attrs — these components have curated state APIs (`value`, `onValueChange`, `open`, `onOpenChange`, `disabled`, etc.), and surface-area discipline matters more than ergonomic event-handler forwarding. If a consumer needs an event handler we don't expose, add a prop.

The split corresponds to the encapsulation philosophy in § 6: leaves are essentially typed HTML elements with a styling layer, so passing native attrs through is honest. Compound components are stateful constructions where every prop should be a deliberate decision.

### React 19 refs

We're on React 19, so `ref` is just a prop. **Do not wrap components in `forwardRef`.** Accept `ref` in the props type and pass it through:

```tsx
interface ButtonProps {
  ref?: React.Ref<HTMLButtonElement>
  // …
}

export function Button({ ref, ...props }: ButtonProps) {
  return <BaseButton ref={ref} {...props} />
}
```

### TypeScript

- `import type` for type-only imports (enforced by `typescript/consistent-type-imports`).
- `??` over `||` for nullish defaults (enforced by `typescript/prefer-nullish-coalescing`).
- No `any` (enforced).
- Use `===` / `!==`, never `==` / `!=`.
- Component props live in `Component.types.ts`. Each exposed part has a Props interface; re-export them on the namespace (`Dialog.Trigger.Props`, etc.) if useful.

### Formatting

oxfmt config: no semicolons, no trailing commas. Don't fight it — just run `bun run fmt`.

---

## 6. Component API philosophy

### Compound, but pared down

Mirror Base UI's namespace pattern (`<Dialog.Root>`, `<Dialog.Trigger>`, `<Dialog.Content>`) — but **expose only the parts a real consumer needs**. Roll up Base UI's implementation parts inside our wrappers.

Example for Dialog. Base UI's anatomy is:

```
Dialog.Root, Dialog.Trigger, Dialog.Portal, Dialog.Backdrop, Dialog.Popup,
Dialog.Title, Dialog.Description, Dialog.Close
```

Bekk's anatomy collapses to:

```
Dialog.Root, Dialog.Trigger, Dialog.Content, Dialog.Title, Dialog.Description, Dialog.Close
```

where `Dialog.Content` internally renders `Dialog.Portal` + `Dialog.Backdrop` + `Dialog.Popup` with our styling and animation defaults. The consumer never sees portals or positioners.

**Rule of thumb:** if a Base UI part exists only because Base UI is a primitives library (Portal, Positioner, Backdrop wiring), absorb it into a parent wrapper. If a part is meaningfully content-bearing or has independent variations the consumer chooses (Trigger, Title, Item, Close), keep it visible.

### Full encapsulation

Bekk wrappers **do not forward** Base UI's escape hatches:

- ❌ No `render` prop on bekk components.
- ❌ No exposed `data-*` styling contract — those attributes exist for our internal CSS, not for consumer stylesheets.

If a consumer needs behavior we don't expose, the answer is to **add a new prop to the bekk component**, not to leak Base UI through.

**Inside the wrapper, however, Base UI's escape hatches are exactly the right tool.** Use Base UI's `render` prop, its `data-*` attributes, and its raw props freely within our implementation — they're _our_ tools for building typed, ergonomic surface props. Example: `Accordion.Trigger`'s `headingLevel` prop is implemented by passing the chosen `<hN />` element to Base UI Header's `render` prop. Consumer sees `headingLevel={2}`; Base UI's `render` is our implementation detail, not part of the public API.

### Allowed escape hatches

Two props are forwarded to the **root element** of each component part:

- **`className`** — for layout-level composition (margins, grid placement, flex layout in the surrounding container, etc.).
- **`style`** — for one-off overrides.

These are not for restyling internals. They land on the outermost rendered element so consumers can position the component within their layout. Document this on each component's prop type.

### Default behavior

Animations, transitions, sizes, and other visual defaults are baked in (using tokens). Consumers don't need to provide them. If a behavior is _configurable_, expose a small, named prop (e.g. `size="sm" | "md" | "lg"`, `variant="primary" | "secondary"`) — don't pass through every Base UI prop wholesale.

---

## 7. The docs site (`bun run dev`)

Running `bun run dev` serves a custom in-repo docs site (no Storybook, no Ladle, no new deps). It's the canonical way components are previewed during development and the way the user verifies a new component.

### Anatomy

- **`src/App.tsx`** mounts the docs site shell (sidebar + content area).
- **`src/docs/`** contains the shell: layout, routing, sidebar, prop-table rendering, theme toggle.
- **Per component**, `src/components/<Name>/<Name>.docs.tsx` exports:
  - A title and description.
  - A set of named examples (e.g. `"Default"`, `"With variants"`, `"Disabled"`).
  - A reference to the public anatomy (which parts the namespace exposes).
  - The Props interfaces for each exposed part (rendered as a table).
- **Discovery:** the docs site discovers `*.docs.tsx` files automatically (via Vite's `import.meta.glob`) so adding a component to the sidebar requires no manual wiring beyond creating the file.

### What a docs page must show

For every component, the docs page should cover at minimum:

1. **What it is** — a one-paragraph description.
2. **Anatomy** — the namespace parts bekk exposes (and a note about what's intentionally hidden vs raw Base UI).
3. **Examples** — at least a "default" example. Add examples for each variant, each size, each meaningful state (disabled, loading, open, etc.), and any edge cases discussed during planning (see § 9). **Every example must include a `code: string` field** showing the copy-pasteable JSX a consumer would write — rendered as a syntax-highlighted block under the preview by [`CodeBlock`](src/docs/CodeBlock.tsx) (shiki, dual-theme, with a copy-on-hover button).
4. **Props table** — for each exposed part, a table of props, types, defaults, and one-line descriptions.

**Authoring the `code` string.** Write the minimal JSX a consumer would copy into their own app — _not_ the demo source. Strip layout scaffolding (`LABEL_STYLE`, matrix wrappers, `Array.from({ length: N })` loops, etc.). Keep state hooks only when they're the point of the example (controlled state, derived UI). Match oxfmt style (double quotes, no semicolons, no trailing commas). For matrix examples (variants × sizes), one or two representative lines beats reproducing the whole grid. For overlay components, the trigger + content is the contract — don't include unrelated wrapping divs.

The docs site is part of the dev experience but **not** part of the published library. When the library build is eventually wired up, the docs entrypoint won't be in the package output. Syntax highlighting comes from [`shiki`](https://shiki.style) (devDependency), themes `github-light` + `github-dark` with `defaultColor: false` so the dual-theme CSS variables map to bekk's `[data-theme]` semantics. The block's background uses `--color-bg-sunken` so it reads recessed below the example surface in both themes.

---

## 8. How to add a new component

> **Build order: priority list, not alphabetical.** Components are added in the order below, prioritizing (a) components that unlock dogfooding the docs site and (b) high-traffic primitives that other components' docs depend on. The next component to build is the first unchecked item. Don't skip ahead unless the user explicitly asks.
>
> When a component ships, tick it off here and — if useful — add the next priority to the tail of the queue. This list is maintained as we learn what's actually needed.
>
> **Queue:**
>
> - [x] Accordion
> - [x] Button
> - [x] Toggle / ToggleGroup
> - [x] Tooltip
> - [x] Dialog
> - [x] AlertDialog
> - [x] Popover
> - [x] Toast
> - [x] NavigationMenu
> - [x] Field + Input
> - [x] Select
> - [x] Checkbox + CheckboxGroup
> - [x] Radio + RadioGroup
> - [x] Switch
> - [x] Textarea
> - [x] Tabs
> - [x] Autocomplete
>
> Before writing any code, ask the user the questions in § 9. This is not optional.

After those questions are answered:

1. **Create the folder:** `src/components/<Name>/`.
2. **Add `<Name>.types.ts`** with the prop interfaces for each exposed part. Each prop interface includes `className?: string`, `style?: React.CSSProperties`, and `ref?: React.Ref<...>` on the root element of that part.
3. **Add `<Name>.css`** with BEM-named classes prefixed `bekk-<name-kebab>`, consuming tokens only. No hardcoded values. Use Base UI's `data-*` state attributes for state styling.
4. **Register the new file in [`src/styles/styles.css`](src/styles/styles.css)** by adding an `@import "../components/<Name>/<Name>.css";` line. This is what makes the styles actually load for consumers — forgetting this step means the component looks unstyled in the wild.
5. **Add `<Name>.tsx`** implementing each part as a small wrapper around the corresponding Base UI part. Reference classes as plain string literals (e.g. `"bekk-dialog__popup"`, `` `bekk-dialog--${size}` ``) — no `styles[...]` lookups. Compose absorbed parts inside the wrapper (e.g. `Content` renders `Portal` + `Backdrop` + `Popup`). Assemble into the namespace:

   ```tsx
   export const Dialog = {
     Root: DialogRoot,
     Trigger: DialogTrigger,
     Content: DialogContent,
     Title: DialogTitle,
     Description: DialogDescription,
     Close: DialogClose
   }
   ```

6. **Add `<Name>.docs.tsx`** with the examples and prop tables agreed on in § 9. This is required, not optional — a component without a docs file is incomplete. Each example needs a `code: string` field (copy-pasteable JSX); see § 7 for the authoring rules.
7. **Add `index.ts`** to re-export the namespace:

   ```ts
   export { Dialog } from "./Dialog"
   export type * from "./Dialog.types"
   ```

8. **Update the package barrel `src/index.ts`** to re-export the new component + its public types. This is the file consumers will import from once bekk is published; if a component isn't here, it's not part of the public API. Easy to forget — make it part of the muscle memory.
9. **Add a token if you need a value you don't have** — but only after asking the user (see § 9).
10. **Verify in `bun run dev`.** Open the docs page, exercise every example, toggle between light and dark, check keyboard navigation. No automated tests are required for v1, but manual verification is.
11. **Run `bun run check`** until clean.
12. **Show the user** before committing.

---

## 9. Questions to ask before starting a new component

**Required, but lean.** A lot of decisions are inherited from prior components and from the conventions in § 9.0 below — don't re-ask them. Ask only what's genuinely component-specific or genuinely novel.

### 9.0 Inherited defaults — don't re-ask the user about these

Apply these by default to every new component. Before writing the pre-component questions:

1. **Read `docs/components/<name>.md`** (repo-root `docs/`, not `src/docs/` — see § 3.1) for the authoritative Base UI anatomy, props, data attributes, and CSS variables. Treat it as overriding any training-data assumptions about Base UI.
2. **Read the most recently built component in `src/components/`** to see how the conventions below were applied in practice.

Deviate only when the component genuinely demands it, and surface the deviation explicitly.

- **Anatomy.** Mirror Base UI's namespace, then pare down: absorb any part that exists only as Base UI implementation plumbing (Portal, Backdrop, Positioner, redundant heading wrappers around buttons, content-padding wrappers). Keep parts that carry meaningful content or have independent consumer variations. Aim for the smallest anatomy that doesn't lose expressiveness — usually 3–5 parts.
- **Variants + sizes.** Components with **meaningful visual variation** expose `variant` and `size` props.
  - Sizes: `"sm" | "md" | "lg"`. Default `"md"`.
  - Variants: `"default"` (the canonical look) plus `"ghost"` when the component is likely to appear nested inside other containers. Default `"default"`.
  - **If there's only one tasteful look** (e.g. Tooltip — there's no plausible second style), skip `variant` entirely. Don't invent variation that has no use case. `size` can also be skipped if the component has only one sensible size.
  - More variants/sizes get added only when a real use case demands it.
- **Heading level.** Components that render a heading expose `headingLevel?: 2 | 3 | 4 | 5 | 6`. Default `3` for components that live inline in page content (Accordion, Popover). Default `2` for modal overlays that take over the viewport and introduce their own heading hierarchy (Dialog, AlertDialog) — the title is the topmost heading inside the modal subtree. Use `headingElementFor(level)` from `@/utils/headingElement` to render the chosen tag via Base UI's `render` prop; don't redefine the lookup per component.
- **Icons.** Two patterns, by role:
  - **Baked-in icon** (Accordion's chevron, future Dialog close button): the icon is part of the visual identity. Bake in a sensible default from [`lucide-react`](https://lucide.dev/icons/) and expose an `icon` prop on the part that owns it so consumers can swap it. Position is fixed.
  - **Icon slots** (Button, Toggle, future Input adornments): the icon flanks user content. Expose `iconStart?: ReactNode` and `iconEnd?: ReactNode` props. Position is fixed by the prop name. Either may be omitted; both may be present alongside `children`.
  - In both cases: icon **size** comes from `--icon-size-*` tokens — wrap the lucide icon in a sized span and let CSS scale the SVG via `width/height: 100%`, rather than passing lucide's `size` prop.
- **Trigger parts (compound overlays).** Components with overlay behavior (Tooltip, Popover, future Dialog/Menu) expose a `Trigger` part whose only job is to wire Base UI's behavior into a consumer-provided element. Type its `children` as **`ReactElement`** (not `ReactNode`) and pass it to Base UI's `render` prop internally:

  ```tsx
  function TooltipTrigger({ children, ...rest }: TooltipTriggerProps) {
    return <BaseTooltip.Trigger render={children} {...rest} />
  }
  ```

  Consumers use it like this:

  ```tsx
  <Tooltip.Root>
    <Tooltip.Trigger>
      <Button iconStart={<Info />} aria-label="Info" />
    </Tooltip.Trigger>
    <Tooltip.Content>Account details</Tooltip.Content>
  </Tooltip.Root>
  ```

  The render prop is bekk's implementation detail. Typing children as `ReactElement` gives consumers a clear error if they pass multiple children or a string.

- **Behavioral props always exposed (when Base UI offers them):**
  - `disabled` — on the root, and per-item where the component has items.
  - Full controlled state — `value` / `defaultValue` / `onValueChange`, or `open` / `onOpenChange`, mirroring Base UI's controlled-state shape.
  - `multiple` — when the component supports it.
  - `hiddenUntilFound` — when Base UI offers it (SEO / in-page-search win).
- **Behavioral props always hidden:** `loopFocus`, `keepMounted`, `render`, `nativeButton`, and any other Base UI escape hatch. Base UI's default behavior stays. Lift only on demonstrated need.
- **Rare orientations / modes.** When Base UI offers a variant that's rare in practice (e.g. horizontal accordion), hardcode the common one and don't expose the prop. Add the alternative when a consumer actually needs it.
- **Token usage.** Components consume **semantic** tokens only, never palette tokens. If a needed value has no semantic token, add one — and surface the addition to the user before writing the component CSS.
- **Docs page baseline.** Every `<Name>.docs.tsx` always shows a "Default" example. Add these whenever the component has the relevant feature:
  1. **Variants × sizes matrix** — visual reference.
  2. **Disabled states** — root-level and per-item where meaningful.
  3. **Controlled state** — controlled-state props with an external setter.
  4. **Custom icon** — for any component that exposes an `icon` prop.

  Add component-specific examples beyond these when they demonstrate something the baseline doesn't (e.g. long content for height animation, edge-case states, special interactions).

  **Every example must include a `code` string.** See § 7 "What a docs page must show" for authoring rules. The rendering (shiki, copy button, dual-theme) is already wired in `CodeBlock` — you only write the string.

### 9.1 What to ask the user about, per component

After applying § 9.0, surface only:

1. **Component-specific anatomy.** Which Base UI parts you propose absorbing vs exposing. Always confirm — anatomy decisions are never silent.
2. **Token gaps.** Any value the component visually needs that has no semantic token yet. Propose names + values.
3. **Component-specific docs examples.** Anything beyond the baseline (long content, edge cases, special states).
4. **Genuine novelty.** Anything § 9.0 doesn't cover — a new prop name that future components will copy, a new cross-component pattern, a Base UI behavior that doesn't fit the defaults cleanly.
5. **Uncertainty.** Anything in the Base UI doc that's ambiguous and you want a call on before guessing.

Ask in batches, present tradeoffs where two reasonable options exist, don't fill in defaults silently. The first time a component introduces a pattern that should become a default for everyone, update § 9.0 itself.

---

## 10. What else to ask the user before committing

Beyond the per-component questions in § 9, **ask before committing** when any of the following come up:

- **Adding a token to `tokens.css`.** Show what you're adding, why, and where it slots into the scale.
- **Dependencies.** Anything beyond React + Base UI needs explicit approval first. Justify before installing.
- **Cross-component conventions.** Anything that, once established, future components will copy (a helper, a CSS pattern, a typing approach, a docs-site pattern).
- **Build / package / tooling config.** Touching `package.json`, `tsconfig.json`, `vite.config.ts`, lint/format config, the styles bootstrap order, or the docs-site shell.
- **Removing or renaming an existing public part.**

When unsure between two reasonable options, **present both with tradeoffs** rather than picking silently.

When the work is ready: ask before running `git commit`, `git push`, or anything else that affects shared state.

---

## 11. Known TODOs / not yet wired up

- **Package is published as [`@threetides/bekk`](https://www.npmjs.com/package/@threetides/bekk).** Library build (`bun run build`) produces `dist/` via `vite.lib.config.ts` + `tsconfig.lib.json` + `scripts/build-assets.mjs`. Externals: React, Base UI, lucide. Don't change the build wiring without an explicit ask.
- **Tests are scoped to bekk-specific logic, not exhaustive coverage.** Vitest + React Testing Library run via `bun run test` (and as part of `bun run check`). Targets the parts with real regression risk: `cx` utility, docs `groupPagesByCategory` / `categorizeSlug`, `Field.Root` required/disabled cascade and the auto-asterisk on `Field.Label`, Input's `clearable` + `passwordToggle` + ref merging + Field integration, and Select's selection flow + Field integration. We deliberately don't re-test Base UI behavior ("does Tooltip open on hover", focus traps, keyboard nav of the Select popup) — that's Base UI's job. Visual regressions still need eyes-on review in the docs site; consider Playwright snapshots if/when that's worth it.
- **Token palette is a starting point.** Neutral gray + a single generically-named accent palette (currently glacier / hue 198) + a few status colors. Iterate as real components reveal what's missing.
- **Docs app dogfoods bekk where a primitive exists.** Sidebar uses `NavigationMenu` + `Button`, theme toggle uses `Toggle`/`ToggleGroup`, `CodeBlock` copy button is `Button`, `DocsApp` uses `Toast.Provider`/`Viewport` and `Button` for the mobile menu trigger. The only remaining migration is prop tables, which need a `Table` component that doesn't exist yet. The Overview cards and the mobile-drawer backdrop are intentionally raw — they're content/chrome that don't map onto a bekk primitive.
- **Docs site features still missing:**
  - **"Show code" toggle per example** — code blocks are currently always shown under each example (with a copy-on-hover button). A toggle to collapse them would be nice once the pages get long. See [`CodeBlock`](src/docs/CodeBlock.tsx) and the `code` field on `DocExample`.
  - **Per-example theme override** — currently the theme toggle is global; useful to flip dark-mode on one example to verify it.
  - **Table of contents / anchor links** inside long component pages.
