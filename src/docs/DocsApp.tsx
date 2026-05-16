import { useEffect, useState } from "react"
import type { FC } from "react"
import { pages } from "./discover"
import { Sidebar } from "./Sidebar"
import { ComponentPage } from "./ComponentPage"
import { ThemeToggle } from "./ThemeToggle"
import styles from "./DocsApp.module.css"

function useHashRoute(): string {
  const [hash, setHash] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash.replace(/^#\/?/, "")
  )
  useEffect(() => {
    const handler = () => setHash(window.location.hash.replace(/^#\/?/, ""))
    window.addEventListener("hashchange", handler)
    return () => window.removeEventListener("hashchange", handler)
  }, [])
  return hash
}

export const DocsApp: FC = () => {
  const slug = useHashRoute()
  const current = pages.find((p) => p.slug === slug) ?? pages[0]

  return (
    <div className={styles.docs}>
      <Sidebar pages={pages} currentSlug={current?.slug} />
      <div className={styles["docs__content"]}>
        <div className={styles["docs__topbar"]}>
          <ThemeToggle />
        </div>
        {current ? (
          <ComponentPage page={current.page} />
        ) : (
          <div className={styles["docs__empty"]}>
            No components yet. Add one in <code>src/components/</code>.
          </div>
        )}
      </div>
    </div>
  )
}
