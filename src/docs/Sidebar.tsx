import type { FC } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/Button"
import { NavigationMenu } from "@/components/NavigationMenu"
import { NpmIcon } from "./icons"
import type { CategoryGroup } from "./discover"
import styles from "./Sidebar.module.css"

interface SidebarProps {
  groups: CategoryGroup[]
  currentSlug: string | undefined
  version: string
  open: boolean
  onClose: () => void
}

const START_LINKS = [
  { slug: "overview", label: "Overview" },
  { slug: "quickstart", label: "Quickstart" },
  { slug: "principles", label: "Principles" },
  { slug: "theming", label: "Theming" }
]

export const Sidebar: FC<SidebarProps> = ({ groups, currentSlug, version, open, onClose }) => {
  return (
    <aside className={styles.sidebar} data-open={open ? "" : undefined}>
      <div className={styles["sidebar__brand"]}>
        <img
          className={styles["sidebar__mark"]}
          src="/favicon.svg"
          width="28"
          height="28"
          alt=""
          aria-hidden="true"
        />
        <span className={styles["sidebar__wordmark"]}>bekk</span>
        <span className={styles["sidebar__version"]}>v{version}</span>
        <Button
          className={styles["sidebar__close"]}
          variant="ghost"
          size="sm"
          iconStart={<X aria-hidden />}
          aria-label="Close navigation menu"
          onClick={onClose}
        />
      </div>

      <NavigationMenu.Root
        orientation="vertical"
        variant="ghost"
        size="sm"
        aria-label="Documentation"
        className={styles["sidebar__nav"]}
      >
        <div className={styles["sidebar__group"]}>
          <h3 className={styles["sidebar__heading"]} data-index="00">
            Start
          </h3>
          <NavigationMenu.List>
            {START_LINKS.map((link) => (
              <NavigationMenu.Item key={link.slug}>
                <NavigationMenu.Link
                  href={`#/${link.slug}`}
                  active={link.slug === currentSlug}
                  className={styles["sidebar__link"]}
                >
                  {link.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </div>

        {groups.map((group, i) => (
          <div key={group.category} className={styles["sidebar__group"]}>
            <h3 className={styles["sidebar__heading"]} data-index={String(i + 1).padStart(2, "0")}>
              {group.category}
            </h3>
            <NavigationMenu.List>
              {group.pages.map((p) => (
                <NavigationMenu.Item key={p.slug}>
                  <NavigationMenu.Link
                    href={`#/${p.slug}`}
                    active={p.slug === currentSlug}
                    className={styles["sidebar__link"]}
                  >
                    {p.page.name}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </div>
        ))}
      </NavigationMenu.Root>

      <div className={styles["sidebar__footer"]}>
        <a
          href="https://www.npmjs.com/package/@threetides/bekk"
          target="_blank"
          rel="noreferrer"
          className={styles["sidebar__footer-link"]}
        >
          <NpmIcon />
          <span>npm</span>
        </a>
      </div>
    </aside>
  )
}
