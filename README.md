# bekk

A React component library built on Base UI.

`bekk` wraps [Base UI](https://base-ui.com)'s accessible primitives in a smaller
API and a single design-token visual language. It's published on npm as
[`@threetides/bekk`](https://www.npmjs.com/package/@threetides/bekk).

## Installation

```sh
npm install @threetides/bekk @base-ui/react react react-dom
```

bekk ships its styles separately from its components. Import the stylesheet once
at the entry of your app. This pulls in the design tokens, a CSS reset, and the
Plus Jakarta Sans font face:

```tsx
import "@threetides/bekk/styles.css"
```

## Usage

Import a component namespace from the package root and compose it:

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

Every component wraps a Base UI primitive, so keyboard navigation, ARIA wiring,
focus management, and screen reader support come along with it. The only
consumer-facing styling hooks are `className` and `style` on each component's
root element, for layout-level composition.

### Importing styles individually

`@threetides/bekk/styles.css` bundles everything. If you have your own reset or
your own brand font, import the pieces you want individually instead:

```tsx
import "@threetides/bekk/styles/tokens.css" // required: the design system
import "@threetides/bekk/styles/reset.css"  // optional: CSS reset
import "@threetides/bekk/styles/fonts.css"  // optional: Plus Jakarta Sans
```

Only `tokens.css` is mandatory; without it, components have no values to read.
If you skip `fonts.css`, the `--font-family-sans` token falls back to
`system-ui, sans-serif`.

## What's inside

```
src/
├── styles/         tokens.css + reset.css + fonts.css + styles.css
├── assets/         Plus Jakarta Sans variable font
├── components/     one folder per component (.tsx, .types.ts, .css, .docs.tsx)
├── docs/           in-repo docs-site shell (sidebar, routing, prop tables)
├── App.tsx         mounts the docs site
└── main.tsx        bootstraps styles + React
```

Every visual value (color, spacing, radius, type, motion, shadow) comes from a
single `tokens.css` file. Light and dark themes follow `prefers-color-scheme`
and can be overridden per-document with `html[data-theme="light" | "dark"]`.
The only dependencies are React and Base UI.

## Development

bekk uses [Bun](https://bun.sh) as its package manager and ships its own in-repo
docs site. Clone the repo and start the dev server to browse every component
with live examples and prop tables:

```sh
bun install
bun run dev      # serves the docs site at http://localhost:5173
```

Other scripts:

```sh
bun run build    # build the library into dist/
bun run check    # format + lint + type-check + test
bun run test     # run the test suite once
```

Architecture, conventions, and the per-component recipe live in
[`CLAUDE.md`](CLAUDE.md). Read it before adding a component.

## License

See [LICENSE](LICENSE).
