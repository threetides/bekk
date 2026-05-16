import type { FC } from "react"
import type { DiscoveredPage } from "./discover"
import styles from "./Sidebar.module.css"

interface SidebarProps {
  pages: DiscoveredPage[]
  currentSlug: string | undefined
}

export const Sidebar: FC<SidebarProps> = ({ pages, currentSlug }) => {
  return (
    <nav className={styles.sidebar} aria-label="Components">
      <div className={styles["sidebar__brand"]}>bekk</div>
      <ul className={styles["sidebar__list"]}>
        {pages.map((p) => (
          <li key={p.slug}>
            <a
              href={`#/${p.slug}`}
              className={styles["sidebar__link"]}
              data-active={p.slug === currentSlug ? "" : undefined}
            >
              {p.page.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
