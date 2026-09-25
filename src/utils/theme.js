const THEME_STORAGE_KEY = "personal-blog-theme"
const LIGHT_THEME = "light"
const DARK_THEME = "dark"

const isTheme = value => value === LIGHT_THEME || value === DARK_THEME

const getStoredTheme = storage => {
  try {
    const value = storage?.getItem(THEME_STORAGE_KEY)
    return isTheme(value) ? value : null
  } catch {
    return null
  }
}

const getSystemTheme = matchMedia =>
  matchMedia?.("(prefers-color-scheme: dark)").matches
    ? DARK_THEME
    : LIGHT_THEME

const getInitialTheme = ({ storage, matchMedia }) =>
  getStoredTheme(storage) || getSystemTheme(matchMedia)

const applyTheme = (theme, root) => {
  const resolvedTheme = isTheme(theme) ? theme : LIGHT_THEME

  if (root) {
    root.dataset.theme = resolvedTheme
    root.style.colorScheme = resolvedTheme
  }

  return resolvedTheme
}

const saveTheme = (theme, storage) => {
  if (!isTheme(theme)) return

  try {
    storage?.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // The active theme still works when storage is unavailable.
  }
}

const getThemeScript = () => `
  (function () {
    try {
      var storedTheme = localStorage.getItem(${JSON.stringify(
        THEME_STORAGE_KEY
      )});
      var theme = storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (error) {
      var fallback = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.dataset.theme = fallback;
      document.documentElement.style.colorScheme = fallback;
    }
  })();
`

module.exports = {
  DARK_THEME,
  LIGHT_THEME,
  THEME_STORAGE_KEY,
  applyTheme,
  getInitialTheme,
  getStoredTheme,
  getSystemTheme,
  getThemeScript,
  saveTheme,
}
