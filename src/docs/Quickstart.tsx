import type { FC, ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { Page } from "./Page"
import { CodeBlock } from "./CodeBlock"
import styles from "./Quickstart.module.css"

const INSTALL = `# with bun, npm, or pnpm
bun add @threetides/bekk @base-ui/react react react-dom`

const IMPORT_STYLES = `import "@threetides/bekk/styles.css"`

const USE_EXAMPLE = `import { Button, Dialog } from "@threetides/bekk"

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

const A_LA_CARTE = `import "@threetides/bekk/styles/tokens.css" // required — the design system
import "@threetides/bekk/styles/reset.css" // optional — modern CSS reset
import "@threetides/bekk/styles/fonts.css" // optional — Plus Jakarta Sans @font-face`

const DARK_MODE = `<html data-theme="dark">`

interface StepProps {
  index: string
  title: string
  children: ReactNode
}

const Step: FC<StepProps> = ({ index, title, children }) => (
  <article className={styles.step}>
    <div className={styles["step__index"]}>{index}</div>
    <div className={styles["step__body"]}>
      <h2 className={styles["step__title"]}>{title}</h2>
      {children}
    </div>
  </article>
)

export const Quickstart: FC = () => {
  return (
    <Page>
      <header className={styles.head}>
        <div className={styles["head__path"]}>docs / start / quickstart</div>
        <h1 className={styles["head__title"]}>Get bekk into your app.</h1>
        <p className={styles.lede}>
          Install bekk, import the stylesheet once, drop components into your app. Works in any
          React&nbsp;19 project.
        </p>
        <div className={styles["head__tags"]}>
          <span className={styles.tag}>
            <span className={styles["tag__dot"]} aria-hidden="true" />
            React 19
          </span>
          <span className={styles.tag}>Base UI · peer dep</span>
          <span className={styles.tag}>Plain CSS · no runtime</span>
        </div>
      </header>

      <section className={styles.steps}>
        <Step index="01" title="Install">
          <p className={styles.prose}>
            bekk depends on <code>react</code>, <code>react-dom</code>, and{" "}
            <code>@base-ui/react</code> as peer dependencies. Install them alongside the package.
          </p>
          <CodeBlock code={INSTALL} lang="bash" filename="terminal — bash" />
        </Step>

        <Step index="02" title="Import the stylesheet">
          <p className={styles.prose}>
            Import the bundled stylesheet once at the entry of your app. This pulls in the design
            tokens, a polite CSS reset, and the Plus Jakarta Sans font face. There's nothing else to
            load — every component reads from this single file.
          </p>
          <CodeBlock code={IMPORT_STYLES} lang="tsx" filename="src/main.tsx" />
          <div className={styles["step__note"]}>
            Want to bring your own reset or font? Import individual pieces instead — see "à la
            carte" below.
          </div>
        </Step>

        <Step index="03" title="Use a component">
          <p className={styles.prose}>
            Import from <code>@threetides/bekk</code> and compose. Components are namespaced —{" "}
            <code>Dialog.Root</code>, <code>Dialog.Trigger</code>, and so on — so the structure of
            the JSX mirrors the structure of the rendered UI.
          </p>
          <CodeBlock code={USE_EXAMPLE} lang="tsx" filename="example.tsx" />
        </Step>

        <Step index="04" title="Theme it">
          <p className={styles.prose}>
            bekk follows the user's <code>prefers-color-scheme</code> by default. Force a theme per
            document by setting <code>data-theme</code> on the <code>html</code> element —{" "}
            <code>"light"</code> or <code>"dark"</code>. The manual override always wins over the
            media query.
          </p>
          <CodeBlock code={DARK_MODE} lang="html" filename="index.html" />
        </Step>

        <Step index="05" title="Styling à la carte">
          <p className={styles.prose}>
            <code>@threetides/bekk/styles.css</code> is the kitchen-sink bundle. If you bring your
            own reset or your own brand font, import the pieces you want individually instead.
          </p>
          <CodeBlock code={A_LA_CARTE} lang="tsx" filename="src/main.tsx" />
          <p className={styles.prose}>
            Only <code>tokens.css</code> is mandatory. Skip <code>fonts.css</code> and the{" "}
            <code>--font-family-sans</code> token falls back to <code>system-ui, sans-serif</code>.
          </p>
        </Step>
      </section>

      <div className={styles["next-grid"]}>
        <a href="#/principles" className={styles["next-card"]}>
          <span className={styles["next-card__eyebrow"]}>
            <ArrowRight aria-hidden /> Next
          </span>
          <span className={styles["next-card__name"]}>Principles</span>
          <span className={styles["next-card__desc"]}>
            The four ideas behind every component decision in bekk.
          </span>
        </a>
        <a href="#/overview" className={styles["next-card"]}>
          <span className={styles["next-card__eyebrow"]}>
            <ArrowRight aria-hidden /> Browse
          </span>
          <span className={styles["next-card__name"]}>Components</span>
          <span className={styles["next-card__desc"]}>
            Every component, with examples and a full props table.
          </span>
        </a>
      </div>
    </Page>
  )
}
