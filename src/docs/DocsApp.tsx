import { useEffect, useRef, useState } from "react"
import type { FC } from "react"
import { Toast } from "@/components/Toast"
import { groupedPages, pages, categorizeSlug } from "./discover"
import { Sidebar } from "./Sidebar"
import { Topbar } from "./Topbar"
import { ComponentPage } from "./ComponentPage"
import { Overview } from "./Overview"
import { Quickstart } from "./Quickstart"
import { Principles } from "./Principles"
import { Theming } from "./Theming"
import styles from "./DocsApp.module.css"

const VERSION = "0.2.1"

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

const START_TITLES: Record<string, string> = {
  overview: "Overview",
  quickstart: "Quickstart",
  principles: "Principles",
  theming: "Theming"
}

function resolveCrumbs(
  slug: string,
  componentName: string | undefined
): {
  category: string
  title: string
} {
  if (START_TITLES[slug] !== undefined) {
    return { category: "Start", title: START_TITLES[slug] }
  }
  if (componentName !== undefined) {
    return { category: categorizeSlug(slug), title: componentName }
  }
  return { category: "Start", title: "Overview" }
}

export const DocsApp: FC = () => {
  const slug = useHashRoute()
  const normalizedSlug = slug === "" ? "overview" : slug
  const startKey: string | undefined =
    START_TITLES[normalizedSlug] !== undefined ? normalizedSlug : undefined
  const componentEntry =
    startKey === undefined ? pages.find((p) => p.slug === normalizedSlug) : undefined
  const activeSlug = startKey ?? componentEntry?.slug ?? "overview"
  const crumbs = resolveCrumbs(activeSlug, componentEntry?.page.name)

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

  let content
  if (startKey === "overview") {
    content = <Overview groups={groupedPages} version={VERSION} />
  } else if (startKey === "quickstart") {
    content = <Quickstart />
  } else if (startKey === "principles") {
    content = <Principles />
  } else if (startKey === "theming") {
    content = <Theming />
  } else if (componentEntry) {
    content = <ComponentPage page={componentEntry.page} slug={componentEntry.slug} />
  } else {
    content = (
      <div className={styles["docs__empty"]}>
        No components yet. Add one in <code>src/components/</code>.
      </div>
    )
  }

  return (
    <Toast.Provider>
      <div className={styles.docs}>
        <Sidebar
          groups={groupedPages}
          currentSlug={activeSlug}
          version={VERSION}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
        <div
          className={styles["docs__backdrop"]}
          data-open={menuOpen ? "" : undefined}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        <div ref={contentRef} className={styles["docs__content"]} data-docs-scroller="">
          <Topbar
            category={crumbs.category}
            title={crumbs.title}
            menuOpen={menuOpen}
            onOpenMenu={() => setMenuOpen(true)}
          />
          <main className={styles["docs__main"]}>{content}</main>
        </div>
      </div>
      <Toast.Viewport />
    </Toast.Provider>
  )
}
