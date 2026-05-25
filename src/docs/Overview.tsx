import type { FC } from "react"
import type { CategoryGroup } from "./discover"
import styles from "./Overview.module.css"

interface OverviewProps {
  groups: CategoryGroup[]
}

const PRINCIPLES = [
  {
    title: "Polished by default",
    description: "Drop a component in and it looks and behaves correctly — no configuration needed."
  },
  {
    title: "Accessible foundations",
    description: "Built on Base UI primitives, so keyboard, focus, and ARIA come for free."
  },
  {
    title: "Friendlier API",
    description: "Pared-down anatomy, sensible defaults, and no leaked implementation details."
  },
  {
    title: "Unified design language",
    description:
      "Every visual value flows from a single token layer — themeable, consistent, predictable."
  }
]

function teaser(description: string): string {
  const firstSentence = description.match(/^[^.!?]*[.!?]/)?.[0] ?? description
  return firstSentence.replace(/`/g, "")
}

export const Overview: FC<OverviewProps> = ({ groups }) => {
  return (
    <article className={styles.overview}>
      <header className={styles["overview__head"]}>
        <p className={styles["overview__eyebrow"]}>Component library</p>
        <h2 className={styles["overview__title"]}>bekk</h2>
        <p className={styles["overview__lede"]}>
          A polished, accessible React component library built on top of Base UI. Bekk wraps Base UI
          primitives into an opinionated set of components with a friendlier API.
        </p>
      </header>

      <section className={styles["overview__section"]}>
        <h3 className={styles["overview__section-title"]}>Principles</h3>
        <ul className={styles["overview__principles"]}>
          {PRINCIPLES.map((p) => (
            <li key={p.title} className={styles["overview__principle"]}>
              <h4 className={styles["overview__principle-title"]}>{p.title}</h4>
              <p className={styles["overview__principle-desc"]}>{p.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles["overview__section"]}>
        <h3 className={styles["overview__section-title"]}>Components</h3>
        <div className={styles["overview__groups"]}>
          {groups.map((group) => (
            <div key={group.category} className={styles["overview__group"]}>
              <h4 className={styles["overview__group-title"]}>{group.category}</h4>
              <div className={styles["overview__cards"]}>
                {group.pages.map((p) => (
                  <a key={p.slug} href={`#/${p.slug}`} className={styles["overview__card"]}>
                    <span className={styles["overview__card-name"]}>{p.page.name}</span>
                    <span className={styles["overview__card-desc"]}>
                      {teaser(p.page.description)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
