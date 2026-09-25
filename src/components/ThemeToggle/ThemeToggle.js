import * as React from "react"

import themeUtils from "../../utils/theme"
import * as styles from "./ThemeToggle.module.css"

const {
  DARK_THEME,
  LIGHT_THEME,
  applyTheme,
  getInitialTheme,
  getStoredTheme,
  saveTheme,
} = themeUtils

const ThemeIcon = ({ theme }) =>
  theme === DARK_THEME ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.25 15.17A9 9 0 0 1 8.83 3.75a9 9 0 1 0 11.42 11.42Z" />
    </svg>
  )

const ThemeToggle = () => {
  const [theme, setTheme] = React.useState(null)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const initialTheme = getInitialTheme({
      storage: window.localStorage,
      matchMedia: window.matchMedia.bind(window),
    })

    setTheme(applyTheme(initialTheme, document.documentElement))

    const handleSystemThemeChange = event => {
      if (getStoredTheme(window.localStorage)) return

      const systemTheme = event.matches ? DARK_THEME : LIGHT_THEME
      setTheme(applyTheme(systemTheme, document.documentElement))
    }

    mediaQuery.addEventListener?.("change", handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener?.("change", handleSystemThemeChange)
    }
  }, [])

  const handleToggle = () => {
    const nextTheme = theme === DARK_THEME ? LIGHT_THEME : DARK_THEME
    saveTheme(nextTheme, window.localStorage)
    setTheme(applyTheme(nextTheme, document.documentElement))
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={handleToggle}
      aria-label="Dark mode"
      aria-pressed={theme === DARK_THEME}
    >
      <ThemeIcon theme={theme} />
      <span>Theme</span>
    </button>
  )
}

export default ThemeToggle
