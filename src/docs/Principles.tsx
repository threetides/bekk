import type { FC } from "react"
import { Page } from "./Page"
import { Eyebrow } from "./Eyebrow"
import styles from "./ContentPage.module.css"

const PRINCIPLES = [
  {
    title: "Polished by default",
    body: "Drop a component in and it looks and behaves correctly. No configuration needed, no escape hatches required. Defaults — for spacing, motion, focus rings, animations — are baked in via tokens; consumers don't have to wire them up."
  },
  {
    title: "Accessible foundations",
    body: "Every bekk component wraps a Base UI primitive, so keyboard navigation, focus management, ARIA attributes and screen-reader semantics are inherited. We don't reimplement these concerns — we lean on Base UI and stay out of its way."
  },
  {
    title: "Friendlier API than raw Base UI",
    body: "Compound components, but pared down — only the parts a real consumer actually uses. Portals, positioners and backdrops are absorbed into wrappers. The JSX you write is what you read in the rendered UI."
  },
  {
    title: "One visual language",
    body: "Color, spacing, radius, typography, motion, shadow — every visual value comes from a single tokens.css. Components reference semantic tokens, which reference a palette layer. The relationship is consistent across every component, in both themes."
  }
]

const NON_GOALS = [
  "A primitives toolkit. If you need raw flexibility, use Base UI directly.",
  "Framework-agnostic. React-only.",
  "Open-ended styling. Internal classes and Base UI data attributes are not a public API."
]

export const Principles: FC = () => {
  return (
    <Page>
      <header className={styles.head}>
        <div className={styles["head__path"]}>docs / start / principles</div>
        <h1 className={styles["head__title"]}>The ideas behind bekk.</h1>
        <p className={styles.lede}>
          Four constraints that shape every component decision. They're what make bekk small, what
          make it consistent, and what make it predictable to use.
        </p>
      </header>

      <section className={styles.section}>
        <Eyebrow index="01" label="Goals" />
        <div className={styles["principle-list"]}>
          {PRINCIPLES.map((p, i) => (
            <article key={p.title} className={styles.principle}>
              <span className={styles["principle__num"]}>P/{String(i + 1).padStart(2, "0")}</span>
              <h2 className={styles["principle__title"]}>{p.title}</h2>
              <p className={styles["principle__body"]}>{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <Eyebrow index="02" label="Non-goals" />
        <ul className={styles["non-goals"]}>
          {NON_GOALS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </Page>
  )
}
