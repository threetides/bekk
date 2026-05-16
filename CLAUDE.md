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

| Category    | Unit      | Notes                                                           |
| ----------- | --------- | --------------------------------------------------------------- |
| Colors      | `oklch()` | Both palette and semantic tokens. No hex, no rgb.               |
| Spacing     | `px`      | 4px-base numeric scale (`--spacing-1` = 4px, `-2` = 8px, …)     |
| Radii       | `px`      | `--radius-sm/md/lg/xl/2xl/full`                                 |
| Borders     | `px`      | `--border-width-1`, `--border-width-2`                          |
| Font sizes  | `rem`     | Respect user font-size preferences                              |
| Line height | unitless  | `--line-height-tight/normal/relaxed`                            |
| Durations   | `ms`      | `--duration-fast/normal/slow`                                   |
| Easings     | bezier    | `--easing-standard/emphasized/decelerate/accelerate`            |
| Shadows     | layered   | `--shadow-sm/md/lg`, using `oklch(0% 0 0 / alpha)`              |
| Z-index     | numeric   | Named scale `--z-base/raised/dropdown/overlay/modal/popover/…`  |

### Token layering

1. **Palette tokens** — primitives like `--gray-0..12`, `--teal-1..12`. Same across themes.
2. **Semantic tokens** — purpose-named like `--color-bg-canvas`, `--color-text-primary`, `--color-accent-bg`. These reference palette tokens and **swap by theme**.

**Components must consume semantic tokens, not palette tokens directly.** Reach for `--color-bg-surface`, not `--gray-1`. If a semantic token is missing, add one.

### Theming

- Default = light.
- Dark applies automatically when `prefers-color-scheme: dark`, *unless* `html` is `[data-theme="light"]`.
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

### CSS Modules + BEM

Classes inside `.module.css` files use **classic lowercase BEM**:

- Block: `.button`
- Element: `.button__icon`, `.button__label`
- Modifier: `.button--primary`, `.button--sm`

Because CSS Modules already give us local scope, BEM here is **purely a readability convention**. It also keeps modifiers visually distinct from elements without needing data attributes.

**Referencing classes from TS/JSX:** BEM names contain `--` and `__`, which are not valid JS identifiers — so always use bracket notation:

```tsx
import styles from "./Button.module.css"

<button
  className={[
    styles.button,
    variant === "primary" && styles["button--primary"],
    size === "sm" && styles["button--sm"],
  ].filter(Boolean).join(" ")}
>
  <span className={styles["button__icon"]}>…</span>
</button>
```

Add a tiny `clsx`-style helper if it feels noisy — not as a dependency, just a local utility.

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

These attributes are an **internal contract** between Base UI and our CSS. They are *not* part of the bekk public API — consumers should never need to read or target them.

For variant/size props (which Base UI doesn't supply), expose them on our wrapper, then either:
- Style them via BEM modifier classes (`.button--primary`), or
- Add our own `data-*` attribute on the root and style it (`.button[data-variant="primary"]`).

Either is fine — pick whichever reads more naturally for the component. Be consistent within a single component.

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

### Allowed escape hatches

Two props are forwarded to the **root element** of each component part:

- **`className`** — for layout-level composition (margins, grid placement, flex layout in the surrounding container, etc.).
- **`style`** — for one-off overrides.

These are not for restyling internals. They land on the outermost rendered element so consumers can position the component within their layout. Document this on each component's prop type.

### Default behavior

Animations, transitions, sizes, and other visual defaults are baked in (using tokens). Consumers don't need to provide them. If a behavior is *configurable*, expose a small, named prop (e.g. `size="sm" | "md" | "lg"`, `variant="primary" | "secondary"`) — don't pass through every Base UI prop wholesale.

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

> **Build order: alphabetical.** Components are added in alphabetical order of their Base UI component name (see `docs/components/`). The next component to build is the alphabetically-first one not yet in `src/components/`. Don't skip ahead unless the user explicitly asks.
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
     Close: DialogClose,
   }
   ```

5. **Add `<Name>.docs.tsx`** with the examples and prop tables agreed on in § 9. This is required, not optional — a component without a docs file is incomplete.
6. **Add `index.ts`** to re-export the namespace:

   ```ts
   export { Dialog } from "./Dialog"
   export type * from "./Dialog.types"
   ```

7. **Add a token if you need a value you don't have** — but only after asking the user (see § 9).
8. **Verify in `bun run dev`.** Open the docs page, exercise every example, toggle between light and dark, check keyboard navigation. No automated tests are required for v1, but manual verification is.
9. **Run `bun run check`** until clean.
10. **Show the user** before committing.

---

## 9. Questions to ask before starting a new component

**Required.** Open a new component task by asking the user the following, in batches. Don't write code until they're answered.

1. **Anatomy — which Base UI parts to expose vs absorb.**
   Walk through the Base UI doc for the component (in `docs/components/<name>.md`) and propose, for each Base UI part: visible part of the bekk namespace, absorbed into a wrapper, or omitted. Confirm before proceeding. Anatomy decisions should never be made silently.

2. **Props — what each exposed part should accept.**
   The bekk-curated prop set, not Base UI passthrough. For each exposed part: which variants (e.g. `variant="primary" | "secondary"`), which sizes (`size="sm" | "md" | "lg"`), which behavior toggles, and what defaults. Be concrete — propose the prop names and value unions.

3. **Token gaps — any new tokens needed.**
   If the component visually requires values that don't exist in `tokens.css` (a new color role, a new spacing stop, a new shadow, a new duration), surface them up front with proposed names and values. Token decisions get made before code, not during.

4. **Docs coverage — examples to show in the docs site.**
   Which scenarios the docs page should demonstrate: default usage, every variant, every size, every meaningful state (disabled, loading, controlled, open, etc.), and any tricky edge cases. This sets the scope of `<Name>.docs.tsx`.

5. **Anything you're uncertain about.**
   If anything in the Base UI doc or the requested behavior is fuzzy — naming, defaults, animation behavior, accessibility expectations, interaction with other components — ask. Don't guess. The user prefers explicit decisions over clever defaults.

Ask these in batches, present tradeoffs where two reasonable options exist, and don't fill in defaults silently.

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
- **Token palette is a starting point.** Neutral gray + teal accent + a few status colors. Iterate as real components reveal what's missing.
