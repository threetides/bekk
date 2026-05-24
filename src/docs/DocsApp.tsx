import { useEffect, useRef, useState } from "react"
import type { FC } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/Button"
import { Toast } from "@/components/Toast"
import { groupedPages, pages } from "./discover"
import { Sidebar } from "./Sidebar"
import { ComponentPage } from "./ComponentPage"
import { Overview } from "./Overview"
import { Quickstart } from "./Quickstart"
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
  const isOverview = slug === "" || slug === "overview"
  const isQuickstart = slug === "quickstart"
  const current = isOverview || isQuickstart ? undefined : pages.find((p) => p.slug === slug)
  const activeSlug = isOverview ? "overview" : isQuickstart ? "quickstart" : current?.slug
  const contentRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 })
    setMenuOpen(false)
  }, [activeSlug])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  return (
    <Toast.Provider>
      <div className={styles.docs}>
        <Sidebar
          groups={groupedPages}
          currentSlug={activeSlug}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
        <div
          className={styles["docs__backdrop"]}
          data-open={menuOpen ? "" : undefined}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        <div ref={contentRef} className={styles["docs__content"]}>
          <div className={styles["docs__topbar"]}>
            <Button
              className={styles["docs__menu-button"]}
              variant="ghost"
              size="sm"
              iconStart={<Menu aria-hidden />}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            />
            <ThemeToggle />
          </div>
          {isOverview ? (
            <Overview groups={groupedPages} />
          ) : isQuickstart ? (
            <Quickstart />
          ) : current ? (
            <ComponentPage page={current.page} />
          ) : (
            <div className={styles["docs__empty"]}>
              No components yet. Add one in <code>src/components/</code>.
            </div>
          )}
        </div>
      </div>
      <Toast.Viewport />
    </Toast.Provider>
  )
}
