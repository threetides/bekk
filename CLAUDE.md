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
- **CSS Modules** — pure CSS, no preprocessor, no CSS-in-JS, no Tailwind
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
src/
├── styles/
│   ├── reset.css        Modern CSS reset (already in place)
│   ├── tokens.css       All design tokens — the entire visual language
│   └── index.css        Font face, html/body/root sizing
├── components/          One folder per component (does not exist yet)
│   └── <Component>/
│       ├── <Component>.tsx
│       ├── <Component>.types.ts
│       ├── <Component>.module.css
│       ├── <Component>.docs.tsx     Examples shown in the docs site
│       └── index.ts
├── docs/                Docs-site shell (sidebar, routing, prop tables)
├── index.ts             (future) public package barrel — re-exports each component namespace
├── App.tsx              Mounts the docs site
└── main.tsx             Imports the three stylesheets in order: index → reset → tokens
```

**Flow:** tokens.css defines every visual value → component CSS modules consume tokens only → components are exported under namespaces → consumer imports a namespace from the package root. The docs site is a sibling concern that lives inside `src/` but is **not** part of the published library.

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
├── Dialog.module.css   BEM-named classes, tokens only
├── Dialog.docs.tsx     Examples + prop documentation for the docs site
└── index.ts            Re-exports the namespace + types
```

**Coupled component pairs** (`Toggle` + `ToggleGroup`, `Radio` + `RadioGroup`, `Checkbox` + `CheckboxGroup`) share a single folder named after the leaf. They share `Component.tsx`, `Component.module.css`, `Component.types.ts`, and `Component.docs.tsx`. The `index.ts` re-exports both names. Don't split tightly coupled pairs into separate folders — they share state semantics and visual styling.

### CSS Modules + BEM

Classes inside `.module.css` files use **classic lowercase BEM**:

- Block: `.button`
- Element: `.button__icon`, `.button__label`
- Modifier: `.button--primary`, `.button--sm`

Because CSS Modules already give us local scope, BEM here is **purely a readability convention**. It also keeps modifiers visually distinct from elements without needing data attributes.

**Referencing classes from TS/JSX:** BEM names contain `--` and `__`, which are not valid JS identifiers — so always use bracket notation:

```tsx
import { cx } from "@/utils/cx"
import styles from "./Button.module.css"
;<button
  className={cx(
    styles.button,
    variant === "primary" && styles["button--primary"],
    size === "sm" && styles["button--sm"]
  )}
>
  <span className={styles["button__icon"]}>…</span>
</button>
```

Use the shared [`cx`](src/utils/cx.ts) helper for class composition. It filters `false` / `undefined` / `null` and joins with spaces. Don't inline `.filter(Boolean).join(" ")` per-component.

### Internal CSS variables

Bekk has three layers of CSS variables. Keep them straight:

1. **Token vars** (`--color-*`, `--spacing-*`, `--icon-size-*`, …) — defined in `tokens.css`, consumed by every component.
2. **Component-internal vars** (`--bekk-<component>-<purpose>`) — defined by a component to coordinate values across its own elements (typically: per-size variables set by the size modifier, consumed by inner elements). Scoped to the component.
3. **Base UI vars** (`--accordion-panel-height`, `--available-width`, …) — provided by Base UI on certain parts for animation and layout. Read-only; consume but never set.

Always prefix component-internal vars with `--bekk-<component>-`. Never invent un-prefixed names; they risk colliding with tokens or other components.

```css
/* Good: scoped to the component, won't collide */
.accordion--md {
  --bekk-accordion-trigger-pad-x: var(--spacing-4);
  --bekk-accordion-icon-size: var(--icon-size-md);
}

.accordion__trigger {
  padding-inline: var(--bekk-accordion-trigger-pad-x);
}
```

### Variant × size styling pattern

A component with both `variant` and `size` props otherwise needs rules for every variant × size × element combination. Avoid the explosion with two layers:

- **Size modifier classes set component-internal CSS variables.** All per-size differences (paddings, font sizes, icon sizes) collapse to variable values.
- **Element selectors read the variables, agnostic to size.** One rule per element, not three.
- **Variant modifier classes adjust the few properties variants actually change** (background, borders, dividers, hover treatment) — usually on the block or one or two elements. Variants don't multiply by size.

Result: rule count stays roughly linear with elements + variants, not elements × variants × sizes. `Accordion.module.css` is the canonical example.

### Internal styling hooks

Inside a component's CSS module, **use Base UI's `data-*` state attributes** to style states — don't invent parallel props or class modifiers for things Base UI already exposes:

```css
.button {
  background-color: var(--color-accent-bg);
}

.button:hover:not([data-disabled]) {
  background-color: var(--color-accent-bg-hover);
}

.button[data-disabled] {
  background-color: var(--color-bg-muted);
  color: var(--color-text-disabled);
}

.popup[data-starting-style],
.popup[data-ending-style] {
  opacity: 0;
}
```

These attributes are an **internal contract** between Base UI and our CSS. They are _not_ part of the bekk public API — consumers should never need to read or target them.

For variant/size props (which Base UI doesn't supply), expose them on our wrapper, then either:

- Style them via BEM modifier classes (`.button--primary`), or
- Add our own `data-*` attribute on the root and style it (`.button[data-variant="primary"]`).

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
3. **Examples** — at least a "default" example. Add examples for each variant, each size, each meaningful state (disabled, loading, open, etc.), and any edge cases discussed during planning (see § 9).
4. **Props table** — for each exposed part, a table of props, types, defaults, and one-line descriptions.

The docs site is part of the dev experience but **not** part of the published library. When the library build is eventually wired up, the docs entrypoint won't be in the package output.

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
> - [ ] Dialog — high-traffic primitive; exercises the absorbed-parts pattern (Portal + Backdrop + Popup → Content) future overlay components will copy
> - [ ] NavigationMenu — unlocks dogfooding the docs sidebar (§ 11)
>
> Before writing any code, ask the user the questions in § 9. This is not optional.

After those questions are answered:

1. **Create the folder:** `src/components/<Name>/`.
2. **Add `<Name>.types.ts`** with the prop interfaces for each exposed part. Each prop interface includes `className?: string`, `style?: React.CSSProperties`, and `ref?: React.Ref<...>` on the root element of that part.
3. **Add `<Name>.module.css`** with BEM-named classes consuming tokens only. No hardcoded values. Use Base UI's `data-*` state attributes for state styling.
4. **Add `<Name>.tsx`** implementing each part as a small wrapper around the corresponding Base UI part. Compose absorbed parts inside the wrapper (e.g. `Content` renders `Portal` + `Backdrop` + `Popup`). Assemble into the namespace:

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

5. **Add `<Name>.docs.tsx`** with the examples and prop tables agreed on in § 9. This is required, not optional — a component without a docs file is incomplete.
6. **Add `index.ts`** to re-export the namespace:

   ```ts
   export { Dialog } from "./Dialog"
   export type * from "./Dialog.types"
   ```

7. **Update the package barrel `src/index.ts`** to re-export the new component + its public types. This is the file consumers will import from once bekk is published; if a component isn't here, it's not part of the public API. Easy to forget — make it part of the muscle memory.
8. **Add a token if you need a value you don't have** — but only after asking the user (see § 9).
9. **Verify in `bun run dev`.** Open the docs page, exercise every example, toggle between light and dark, check keyboard navigation. No automated tests are required for v1, but manual verification is.
10. **Run `bun run check`** until clean.
11. **Show the user** before committing.

---

## 9. Questions to ask before starting a new component

**Required, but lean.** A lot of decisions are inherited from prior components and from the conventions in § 9.0 below — don't re-ask them. Ask only what's genuinely component-specific or genuinely novel.

### 9.0 Inherited defaults — don't re-ask the user about these

Apply these by default to every new component. Before writing the pre-component questions, check this list AND read the most recently built component in `src/components/` to see how the same patterns were applied. Deviate only when the component genuinely demands it, and surface the deviation explicitly.

- **Anatomy.** Mirror Base UI's namespace, then pare down: absorb any part that exists only as Base UI implementation plumbing (Portal, Backdrop, Positioner, redundant heading wrappers around buttons, content-padding wrappers). Keep parts that carry meaningful content or have independent consumer variations. Aim for the smallest anatomy that doesn't lose expressiveness — usually 3–5 parts.
- **Variants + sizes.** Components with **meaningful visual variation** expose `variant` and `size` props.
  - Sizes: `"sm" | "md" | "lg"`. Default `"md"`.
  - Variants: `"default"` (the canonical look) plus `"ghost"` when the component is likely to appear nested inside other containers. Default `"default"`.
  - **If there's only one tasteful look** (e.g. Tooltip — there's no plausible second style), skip `variant` entirely. Don't invent variation that has no use case. `size` can also be skipped if the component has only one sensible size.
  - More variants/sizes get added only when a real use case demands it.
- **Heading level.** Components that render a heading expose `headingLevel?: 2 | 3 | 4 | 5 | 6`, default `3`.
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

- **Library build is not configured.** `package.json` is `private: true`, no `main` / `module` / `exports` map, no externals, no `vite build --lib` config, no `tsc` declarations build. The intent is to publish as an npm package (`bekk`); the wiring is intentionally deferred. Don't change this without an explicit ask.
- **No `src/index.ts` barrel yet.** It'll be the package entrypoint that re-exports every component namespace. Create it the first time you add a component.
- **No `src/components/` directory yet.** Create it with the first component.
- **No `src/docs/` shell yet.** The docs-site infrastructure (sidebar, routing, prop-table rendering, theme toggle, `*.docs.tsx` auto-discovery) gets built alongside the first component. Confirm scope with the user when that work starts.
- **No tests.** Components are verified manually via the docs site. If we adopt a test runner, that's a separate, deliberate decision.
- **Token palette is a starting point.** Neutral gray + a single generically-named accent palette (currently glacier / hue 198) + a few status colors. Iterate as real components reveal what's missing.
- **Docs app is hand-rolled HTML.** The sidebar, prop tables, theme toggle and example previews are bespoke markup in `src/docs/`. Eventually the docs app should dogfood bekk's own components (e.g. the theme toggle becomes `ToggleGroup`, the sidebar becomes `NavigationMenu`, prop tables get a real table component). Migrate piecewise once those components exist; don't gate the docs site on it.
- **Docs site features still missing:**
  - **"Show code" toggle per example** — consumers will want to copy markup.
  - **Per-example theme override** — currently the theme toggle is global; useful to flip dark-mode on one example to verify it.
  - **Sidebar categorization** — fine at 1 component, awkward at 30. Group by domain (Form, Overlay, Layout, Feedback, …).
  - **Table of contents / anchor links** inside long component pages.
