import { useEffect, useState } from "react"
import type { FC } from "react"
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
    <div className={styles.toggle} role="radiogroup" aria-label="Theme">
      {THEMES.map((t) => (
        <button
          key={t}
          type="button"
          role="radio"
          aria-checked={theme === t}
          onClick={() => setTheme(t)}
          className={styles["toggle__button"]}
          data-active={theme === t ? "" : undefined}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
