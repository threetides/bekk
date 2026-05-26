import { useEffect, useState } from "react"
import type { FC } from "react"
import styles from "./RailToc.module.css"

export interface RailEntry {
  id: string
  label: string
}

interface RailTocProps {
  entries: RailEntry[]
}

export const RailToc: FC<RailTocProps> = ({ entries }) => {
  const [active, setActive] = useState<string | undefined>(entries[0]?.id)

  useEffect(() => {
    if (entries.length === 0) return
    const elements = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const scroller = elements[0]?.closest("[data-docs-scroller]") ?? null

    const update = () => {
      const offset = 120
      let current: string | undefined = entries[0]?.id
      for (const el of elements) {
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = el.id
        }
      }
      setActive(current)
    }

    update()
    const target: EventTarget = scroller ?? window
    target.addEventListener("scroll", update, { passive: true })
    return () => {
      target.removeEventListener("scroll", update)
    }
  }, [entries])

  return (
    <aside className={styles.rail} aria-label="On this page">
      <div className={styles["rail__group"]}>
        <div className={styles["rail__label"]}>On this page</div>
        <div className={styles["rail__list"]}>
          {entries.map((entry) => (
            <a
              key={entry.id}
              href={`#${entry.id}`}
              className={styles["rail__link"]}
              data-active={entry.id === active ? "" : undefined}
              onClick={(e) => {
                const el = document.getElementById(entry.id)
                if (el) {
                  e.preventDefault()
                  el.scrollIntoView({ behavior: "smooth", block: "start" })
                  setActive(entry.id)
                }
              }}
            >
              {entry.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}
