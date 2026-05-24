import type { FC } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/Button"
import { NavigationMenu } from "@/components/NavigationMenu"
import type { CategoryGroup } from "./discover"
import styles from "./Sidebar.module.css"

interface SidebarProps {
  groups: CategoryGroup[]
  currentSlug: string | undefined
  open: boolean
  onClose: () => void
}

export const Sidebar: FC<SidebarProps> = ({ groups, currentSlug, open, onClose }) => {
  return (
    <div className={styles.sidebar} data-open={open ? "" : undefined}>
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
        aria-label="Components"
        className={styles["sidebar__nav"]}
      >
        <div className={styles["sidebar__group"]}>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                href="#/overview"
                active={currentSlug === "overview"}
                className={styles["sidebar__link"]}
              >
                Overview
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                href="#/quickstart"
                active={currentSlug === "quickstart"}
                className={styles["sidebar__link"]}
              >
                Quickstart
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </div>
        {groups.map((group) => (
          <div key={group.category} className={styles["sidebar__group"]}>
            <h3 className={styles["sidebar__heading"]}>{group.category}</h3>
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
    </div>
  )
}
