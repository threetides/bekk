# bekk

A small, opinionated React component library built on top of [Base UI](https://base-ui.com). Bekk wraps Base UI's accessible primitives in a friendlier, pared-down API and a single design-token-driven visual language.

Published on npm as [`@threetides/bekk`](https://www.npmjs.com/package/@threetides/bekk).

---

## What you get

- **Accessible by default.** Every component is a thin wrapper over a Base UI primitive, so keyboard navigation, ARIA wiring, focus management and screen reader support come along for free.
- **A friendlier API than raw Base UI.** Compound components, but pared down — only the parts you actually use. Portals, positioners and backdrops are absorbed into wrappers so you don't have to assemble them yourself.
- **One design language.** Every visual value — color, spacing, radius, type, motion, shadow — comes from a single `tokens.css` file. Tokens are oklch colors, px lengths, rem font sizes.
- **Light and dark out of the box.** Auto-follows `prefers-color-scheme`, overridable per-document with `html[data-theme="light" | "dark"]`.
- **Fully encapsulated styling.** No `className`-everywhere, no exposed internal `data-*` hooks. The only consumer styling hooks are `className` and `style` on each component's root element, for layout-level composition.
- **Minimal dependencies.** React and Base UI. That's it.

## Quickstart

```bash
npm install @threetides/bekk @base-ui/react react react-dom
```

Import the stylesheet once at the entry of your app — this pulls in the design tokens, a polite CSS reset, and the Plus Jakarta Sans font face:

```tsx
import "@threetides/bekk/styles.css"
```

Then use the components:

```tsx
import { Button, Dialog } from "@threetides/bekk"

export function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Welcome</Dialog.Title>
        <Dialog.Description>
          A polished, accessible dialog with sensible defaults.
        </Dialog.Description>
        <Dialog.Close>
          <Button>Close</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}
```

### Styling à la carte

`@threetides/bekk/styles.css` is the kitchen-sink bundle. If you have your own reset or your own brand font, import the pieces you want individually instead:

```tsx
import "@threetides/bekk/styles/tokens.css" // required — the design system
import "@threetides/bekk/styles/reset.css" // optional — modern CSS reset
import "@threetides/bekk/styles/fonts.css" // optional — Plus Jakarta Sans @font-face
```

Only `tokens.css` is mandatory. Without it, components have no values to read. If you skip `fonts.css`, the `--font-family-sans` token falls back to `system-ui, sans-serif`.

## Documentation

Bekk ships its own in-repo docs site (no Storybook required). Clone the repo and run `bun run dev` to browse every component, see live examples, and read prop tables.

When the package is published, a hosted version of the docs site will live at its own URL.

---

## Developing

Bekk uses [Bun](https://bun.sh) as the package manager and runs on Node-compatible tooling.

```bash
git clone <repo>
cd bekk
bun install
bun run dev      # serves the docs site at http://localhost:5173
```

### Scripts

| Script               | What it does                           |
| -------------------- | -------------------------------------- |
| `bun run dev`        | Vite dev server — serves the docs site |
| `bun run build`      | Build the library into `dist/`         |
| `bun run build:docs` | Build the docs site                    |
| `bun run check`      | Format + lint + type-check + test      |
| `bun run test`       | Run the test suite once                |
| `bun run fmt`        | `oxfmt`                                |
| `bun run lint`       | `oxlint --deny-warnings`               |
| `bun run type-check` | `tsc --noEmit`                         |

### Stack

- **React 19** (uses native `ref` as a prop — no `forwardRef`)
- **[Base UI](https://base-ui.com)** — `@base-ui/react`
- **TypeScript** — strict
- **CSS Modules + classic BEM** — pure CSS, no preprocessor, no CSS-in-JS, no Tailwind
- **Vite 8**
- **oxfmt + oxlint**

### Project layout

```
src/
├── styles/         tokens.css + reset.css + fonts.css + styles.css
├── assets/         PlusJakartaSans-VariableFont_wght.woff2
├── components/     one folder per component (Component.tsx, .types.ts, .module.css, .docs.tsx, index.ts)
├── docs/           docs-site shell (sidebar, routing, prop tables, docs-shell.css)
├── App.tsx         mounts the docs site
└── main.tsx        bootstraps styles + React
```

### Contributing

Architecture, conventions, the per-component recipe and the **required pre-component question checklist** all live in [`CLAUDE.md`](./CLAUDE.md). Read it before opening a PR or asking an AI assistant to add a component.

---

## License

MIT
