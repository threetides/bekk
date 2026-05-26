import type { FC } from "react"
import { Page } from "./Page"
import { Eyebrow } from "./Eyebrow"
import { CodeBlock } from "./CodeBlock"
import styles from "./ContentPage.module.css"

const ACCENT_SNIPPET = `/* Palette — 12 steps, consistent lightness curve.
   Named generically: --accent-N, not --glacier-N. */
--accent-1:  oklch(98% 0.015 198);
--accent-2:  oklch(95% 0.035 198);
--accent-6:  oklch(78% 0.115 198);  /* default surface */
--accent-8:  oklch(60% 0.115 198);  /* default foreground */
--accent-12: oklch(14% 0.035 198);

/* Semantic — purpose-named, references a palette step. */
--color-accent-bg:       var(--accent-6);
--color-accent-bg-hover: var(--accent-7);
--color-accent-fg:       var(--accent-8);
--color-accent-border:   var(--accent-6);`

const THEME_OVERRIDE = `<!-- Auto: follows prefers-color-scheme -->
<html>

<!-- Manual: data-theme always wins over the media query -->
<html data-theme="dark">
<html data-theme="light">`

export const Theming: FC = () => {
  return (
    <Page>
      <header className={styles.head}>
        <div className={styles["head__path"]}>docs / start / theming</div>
        <h1 className={styles["head__title"]}>How theming works in bekk.</h1>
        <p className={styles.lede}>
          Every visual value in bekk — color, type, spacing, radius, motion, shadow, z-index — lives
          as a CSS custom property in <code>tokens.css</code>. Components reference those tokens;
          the tokens themselves carry the theme.
        </p>
      </header>

      <section className={styles.section}>
        <Eyebrow index="01" label="Two layers" />
        <p className={styles.prose}>
          Tokens are organized in two layers. The <strong>palette</strong> —{" "}
          <code>--gray-0..12</code>, <code>--accent-1..12</code>, plus a small set of status hues —
          provides stable colors with a consistent lightness curve. The <strong>semantic</strong>{" "}
          layer — <code>--color-bg-canvas</code>, <code>--color-accent-fg</code>,{" "}
          <code>--color-text-primary</code>, and friends — points at palette steps and carries
          meaning. Components only ever reach for the semantic layer.
        </p>
      </section>

      <section className={styles.section}>
        <Eyebrow index="02" label="The accent is generic" />
        <p className={styles.prose}>
          The accent palette is named by position, not by color. The current hue happens to be
          glacier — pale cyan-blue, hue 198, atmospheric rather than electric — but no component
          references it as "glacier" anywhere. That keeps the relationship between palette and
          semantic stable as the hue evolves.
        </p>
        <CodeBlock code={ACCENT_SNIPPET} lang="css" filename="tokens.css" />
      </section>

      <section className={styles.section}>
        <Eyebrow index="03" label="Light and dark" />
        <p className={styles.prose}>
          Light is the default. Dark applies automatically under{" "}
          <code>@media (prefers-color-scheme: dark)</code>. A <code>data-theme</code> attribute on{" "}
          the <code>html</code> element forces either theme regardless of the system preference; the
          manual override always wins over the media query.
        </p>
        <CodeBlock code={THEME_OVERRIDE} lang="html" filename="index.html" />
        <p className={styles.prose}>
          The same semantic token names exist in both themes — components don't need to know which
          theme is active. The token layer does the swapping.
        </p>
      </section>

      <section className={styles.section}>
        <Eyebrow index="04" label="What isn't a styling hook" />
        <p className={styles.prose}>
          Internal class names (<code>bekk-button__icon</code>, <code>bekk-dialog__popup</code>,
          etc.) and Base UI <code>data-*</code> attributes are an implementation detail — not a
          public API. The only consumer-facing styling surface is <code>className</code> and{" "}
          <code>style</code> on the root element of each component part, intended for layout-level
          composition. If you need a behavior that bekk doesn't expose, that's a missing prop, not a
          missing hook.
        </p>
      </section>
    </Page>
  )
}
