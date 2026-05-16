import type { FC } from "react"
import type { DocPage } from "./types"
import { PropTable } from "./PropTable"
import styles from "./ComponentPage.module.css"

interface ComponentPageProps {
  page: DocPage
}

export const ComponentPage: FC<ComponentPageProps> = ({ page }) => {
  return (
    <article className={styles.page}>
      <header className={styles["page__head"]}>
        <h2 className={styles["page__name"]}>{page.name}</h2>
        <p className={styles["page__description"]}>{page.description}</p>
      </header>

      <section className={styles["page__section"]}>
        <h3 className={styles["page__section-title"]}>Anatomy</h3>
        <ul className={styles["page__anatomy"]}>
          {page.anatomy.map((a) => (
            <li key={a.part}>
              <code className={styles["page__anatomy-part"]}>{a.part}</code>
              <span>{a.description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles["page__section"]}>
        <h3 className={styles["page__section-title"]}>Examples</h3>
        <div className={styles["page__examples"]}>
          {page.examples.map((ex) => (
            <div key={ex.title} className={styles["page__example"]}>
              <h4 className={styles["page__example-title"]}>{ex.title}</h4>
              {ex.description !== undefined && (
                <p className={styles["page__example-desc"]}>{ex.description}</p>
              )}
              <div className={styles["page__example-preview"]}>{ex.render()}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles["page__section"]}>
        <h3 className={styles["page__section-title"]}>Props</h3>
        {Object.entries(page.props).map(([part, props]) => (
          <div key={part} className={styles["page__props"]}>
            <h4 className={styles["page__props-part"]}>{part}</h4>
            <PropTable props={props} />
          </div>
        ))}
      </section>
    </article>
  )
}
