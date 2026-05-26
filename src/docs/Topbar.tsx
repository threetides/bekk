import type { FC } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/Button"
import { ThemeToggle } from "./ThemeToggle"
import styles from "./Topbar.module.css"

interface TopbarProps {
  category: string
  title: string
  onOpenMenu: () => void
  menuOpen: boolean
}

export const Topbar: FC<TopbarProps> = ({ category, title, onOpenMenu, menuOpen }) => {
  return (
    <div className={styles.topbar}>
      <div className={styles["topbar__inner"]}>
        <Button
          className={styles["topbar__menu-button"]}
          variant="ghost"
          size="sm"
          iconStart={<Menu aria-hidden />}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          onClick={onOpenMenu}
        />
        <div className={styles["topbar__crumbs"]}>
          <span>Docs</span>
          <span className={styles["topbar__sep"]} aria-hidden="true">
            /
          </span>
          <span className={styles["topbar__category"]}>{category}</span>
          <span className={styles["topbar__sep"]} aria-hidden="true">
            /
          </span>
          <strong className={styles["topbar__title"]}>{title}</strong>
        </div>
        <div className={styles["topbar__spacer"]} />
        <div className={styles["topbar__actions"]}>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
