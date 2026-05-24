import type { FC } from "react"
import { CodeBlock } from "./CodeBlock"
import styles from "./Quickstart.module.css"

const INSTALL = `npm install bekk @base-ui/react react react-dom`

const IMPORT_STYLES = `import "bekk/styles.css"`

const USE_EXAMPLE = `import { Button, Dialog } from "bekk"

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
}`

const A_LA_CARTE = `import "bekk/styles/tokens.css" // required — the design system
import "bekk/styles/reset.css" // optional — modern CSS reset
import "bekk/styles/fonts.css" // optional — Plus Jakarta Sans @font-face`

const DARK_MODE = `<html data-theme="dark">`

export const Quickstart: FC = () => {
  return (
    <article className={styles.quickstart}>
      <header className={styles["quickstart__head"]}>
        <p className={styles["quickstart__eyebrow"]}>Getting started</p>
        <h2 className={styles["quickstart__title"]}>Quickstart</h2>
        <p className={styles["quickstart__lede"]}>
          Install bekk, import the stylesheet once, and drop components into your app. Three steps
          to a working setup.
        </p>
      </header>

      <section className={styles["quickstart__section"]}>
        <h3 className={styles["quickstart__section-title"]}>1. Install</h3>
        <p className={styles["quickstart__body"]}>
          bekk depends on <code>react</code>, <code>react-dom</code>, and{" "}
          <code>@base-ui/react</code> as peer dependencies. Install them alongside the package.
        </p>
        <CodeBlock code={INSTALL} lang="bash" />
      </section>

      <section className={styles["quickstart__section"]}>
        <h3 className={styles["quickstart__section-title"]}>2. Import the stylesheet</h3>
        <p className={styles["quickstart__body"]}>
          Import the bundled stylesheet once at the entry of your app. This pulls in the design
          tokens, a polite CSS reset, and the Plus Jakarta Sans font face.
        </p>
        <CodeBlock code={IMPORT_STYLES} lang="tsx" />
      </section>

      <section className={styles["quickstart__section"]}>
        <h3 className={styles["quickstart__section-title"]}>3. Use a component</h3>
        <p className={styles["quickstart__body"]}>
          Import from <code>bekk</code> and compose. Each component's CSS is automatically pulled in
          by your bundler — you don't need a separate per-component stylesheet.
        </p>
        <CodeBlock code={USE_EXAMPLE} lang="tsx" />
      </section>

      <section className={styles["quickstart__section"]}>
        <h3 className={styles["quickstart__section-title"]}>Styling à la carte</h3>
        <p className={styles["quickstart__body"]}>
          <code>bekk/styles.css</code> is the kitchen-sink bundle. If you bring your own reset or
          your own brand font, import the pieces you want individually instead.
        </p>
        <CodeBlock code={A_LA_CARTE} lang="tsx" />
        <p className={styles["quickstart__body"]}>
          Only <code>tokens.css</code> is mandatory — without it, components have no values to read.
          Skip <code>fonts.css</code> and the <code>--font-family-sans</code> token falls back to{" "}
          <code>system-ui, sans-serif</code>.
        </p>
      </section>

      <section className={styles["quickstart__section"]}>
        <h3 className={styles["quickstart__section-title"]}>Theming</h3>
        <p className={styles["quickstart__body"]}>
          bekk follows the user's <code>prefers-color-scheme</code> by default. Force a theme per
          document by setting <code>data-theme</code> on the <code>html</code> element.
        </p>
        <CodeBlock code={DARK_MODE} lang="tsx" />
      </section>

      <div className={styles["quickstart__next"]}>
        <h3 className={styles["quickstart__next-title"]}>What's next</h3>
        <p className={styles["quickstart__next-desc"]}>
          Browse the components in the sidebar. Each page lists the anatomy, runnable examples, and
          a full props table.
        </p>
      </div>
    </article>
  )
}
