const test = require("node:test")
const assert = require("node:assert/strict")

const {
  THEME_STORAGE_KEY,
  applyTheme,
  getInitialTheme,
  getStoredTheme,
  getSystemTheme,
  saveTheme,
} = require("../src/utils/theme")

const createStorage = initialValue => {
  const values = new Map()
  if (initialValue !== undefined) values.set(THEME_STORAGE_KEY, initialValue)

  return {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  }
}

const createMatchMedia = prefersDark => query => ({
  matches: query === "(prefers-color-scheme: dark)" && prefersDark,
})

test("stored theme preference overrides the system preference", () => {
  const storage = createStorage("light")

  assert.equal(
    getInitialTheme({ storage, matchMedia: createMatchMedia(true) }),
    "light"
  )
})

test("system theme is the fallback when no preference is stored", () => {
  assert.equal(getSystemTheme(createMatchMedia(true)), "dark")
  assert.equal(getSystemTheme(createMatchMedia(false)), "light")
})

test("saved theme persists for the next initialization", () => {
  const storage = createStorage()
  saveTheme("dark", storage)

  assert.equal(getStoredTheme(storage), "dark")
  assert.equal(
    getInitialTheme({ storage, matchMedia: createMatchMedia(false) }),
    "dark"
  )
})

test("invalid stored values fall back to the system preference", () => {
  const storage = createStorage("sepia")

  assert.equal(
    getInitialTheme({ storage, matchMedia: createMatchMedia(true) }),
    "dark"
  )
})

test("unavailable storage does not prevent theme initialization", () => {
  const storage = {
    getItem: () => {
      throw new Error("storage disabled")
    },
    setItem: () => {
      throw new Error("storage disabled")
    },
  }

  assert.doesNotThrow(() => saveTheme("dark", storage))
  assert.equal(
    getInitialTheme({ storage, matchMedia: createMatchMedia(false) }),
    "light"
  )
})

test("applying a theme updates the document root and rejects invalid values", () => {
  const root = { dataset: {}, style: {} }

  assert.equal(applyTheme("dark", root), "dark")
  assert.equal(root.dataset.theme, "dark")
  assert.equal(root.style.colorScheme, "dark")
  assert.equal(applyTheme("sepia", root), "light")
  assert.equal(root.dataset.theme, "light")
})
