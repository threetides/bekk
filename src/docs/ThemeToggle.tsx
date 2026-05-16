import { useEffect, useState } from "react"
import type { FC } from "react"
import { Toggle, ToggleGroup } from "@/components/Toggle"
import styles from "./ThemeToggle.module.css"

type Theme = "auto" | "light" | "dark"

const STORAGE_KEY = "bekk-docs-theme"
const THEMES = ["auto", "light", "dark"] as const

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
      {THEMES.map((t) => (
        <Toggle key={t} value={t} size="sm" variant="ghost" className={styles["toggle__button"]}>
          {t}
        </Toggle>
      ))}
    </ToggleGroup>
  )
}
