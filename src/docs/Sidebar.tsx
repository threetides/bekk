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
      <div className={styles["sidebar__brand"]}>
        <svg
          className={styles["sidebar__mark"]}
          viewBox="0 0 48 48"
          width="28"
          height="28"
          role="img"
          aria-hidden="true"
        >
          <path
            d="M 4 30 C 6 18, 10 6, 16 6 C 20 6, 24 12, 28 16 C 34 18, 40 20, 46 22 C 36 28, 24 28, 18 26 C 12 26, 6 28, 4 30 Z"
            fill="currentColor"
          />
        </svg>
        <span>bekk</span>
      </div>
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
