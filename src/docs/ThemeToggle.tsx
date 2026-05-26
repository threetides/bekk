import { useEffect, useState } from "react"
import type { FC } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { Toggle, ToggleGroup } from "@/components/Toggle"
import styles from "./ThemeToggle.module.css"

type Theme = "auto" | "light" | "dark"

const STORAGE_KEY = "bekk-docs-theme"

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "auto"
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === "light" || stored === "dark" || stored === "auto") return stored
  return "auto"
}

function isTheme(value: string | undefined): value is Theme {
  return value === "auto" || value === "light" || value === "dark"
}

export const ThemeToggle: FC = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    if (theme === "auto") {
      document.documentElement.removeAttribute("data-theme")
    } else {
      document.documentElement.setAttribute("data-theme", theme)
    }
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return (
    <ToggleGroup
      value={[theme]}
      onValueChange={(value) => {
        const next = value[0]
        if (isTheme(next)) setTheme(next)
      }}
      aria-label="Theme"
      className={styles.toggle}
    >
      <Toggle
        value="light"
        size="sm"
        variant="ghost"
        className={styles["toggle__button"]}
        aria-label="Light theme"
      >
        <Sun aria-hidden />
      </Toggle>
      <Toggle
        value="auto"
        size="sm"
        variant="ghost"
        className={styles["toggle__button"]}
        aria-label="System theme"
      >
        <Monitor aria-hidden />
      </Toggle>
      <Toggle
        value="dark"
        size="sm"
        variant="ghost"
        className={styles["toggle__button"]}
        aria-label="Dark theme"
      >
        <Moon aria-hidden />
      </Toggle>
    </ToggleGroup>
  )
}
