import type { FC, ReactNode } from "react"
import type { DocPage } from "./types"
import { Page } from "./Page"
import { Eyebrow } from "./Eyebrow"
import { ExampleCard } from "./ExampleCard"
import { PropTable } from "./PropTable"
import { RailToc, type RailEntry } from "./RailToc"
import { categorizeSlug } from "./discover"
import styles from "./ComponentPage.module.css"

/* Parse `…` runs in description / anatomy text as inline <code>. */
function inlineCode(text: string): ReactNode[] {
  return text.split(/(`[^`]+`)/g).map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={i} className={styles["page__inline-code"]}>
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

interface ComponentPageProps {
  page: DocPage
  slug: string
}

export const ComponentPage: FC<ComponentPageProps> = ({ page, slug }) => {
  const category = categorizeSlug(slug)
  const rail: RailEntry[] = [
    { id: "anatomy", label: "Anatomy" },
    { id: "examples", label: "Examples" },
    { id: "props", label: "Props" }
  ]

  return (
    <Page withRail>
      <div className={styles["page__body"]}>
        <header className={styles["page__head"]}>
          <div className={styles["page__path"]}>
            docs / {category.toLowerCase()} / {slug}
          </div>
          <h1 className={styles["page__title"]}>{page.name}</h1>
          <p className={styles["page__lede"]}>{inlineCode(page.description)}</p>
          <div className={styles["page__tags"]}>
            <span className={styles.tag}>{category}</span>
            <span className={styles.tag}>@threetides/bekk · {page.name}</span>
          </div>
        </header>

        <section className={styles.section} id="anatomy">
          <Eyebrow index="01" label="Anatomy" />
          <div className={styles.anatomy}>
            {page.anatomy.map((a) => (
              <div key={a.part} className={styles["anatomy__row"]}>
                <code className={styles["anatomy__part"]}>{a.part}</code>
                <span className={styles["anatomy__desc"]}>{inlineCode(a.description)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="examples">
          <Eyebrow index="02" label="Examples" />
          <div className={styles.examples}>
            {page.examples.map((ex) => (
              <article key={ex.title} className={styles.example}>
                <header className={styles["example__head"]}>
                  <h3 className={styles["example__title"]}>{ex.title}</h3>
                  {ex.description !== undefined && (
                    <p className={styles["example__desc"]}>{inlineCode(ex.description)}</p>
                  )}
                </header>
                <ExampleCard example={ex} />
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="props">
          <Eyebrow index="03" label="Props" />
          <div className={styles.props}>
            {Object.entries(page.props).map(([part, props]) => (
              <div key={part} className={styles["props__group"]}>
                <h3 className={styles["props__group-head"]}>{part}</h3>
                <PropTable props={props} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <RailToc entries={rail} />
    </Page>
  )
}
