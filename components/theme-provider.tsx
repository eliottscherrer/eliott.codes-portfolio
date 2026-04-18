"use client"

import * as React from "react"

import {
  applyThemeToDocument,
  DEFAULT_THEME,
  resolveTheme,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type Theme,
  type ThemeAttribute,
} from "@/lib/theme"

type ThemeProviderProps = {
  attribute?: ThemeAttribute
  children: React.ReactNode
  defaultTheme?: Theme
  disableTransitionOnChange?: boolean
  enableColorScheme?: boolean
  enableSystem?: boolean
  storageKey?: string
}

type ThemeContextValue = {
  resolvedTheme: ResolvedTheme | undefined
  setTheme: (theme: Theme) => void
  theme: Theme | undefined
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

function disableTransitionsTemporarily() {
  const style = document.createElement("style")
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{transition:none!important}",
    ),
  )
  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    window.setTimeout(() => {
      document.head.removeChild(style)
    }, 1)
  }
}

function getStoredTheme(storageKey: string, defaultTheme: Theme) {
  if (typeof window === "undefined") {
    return undefined
  }

  const storedTheme = window.localStorage.getItem(storageKey)
  if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
    return storedTheme
  }

  return defaultTheme
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = DEFAULT_THEME,
  disableTransitionOnChange = false,
  enableColorScheme = true,
  enableSystem = true,
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme | undefined>(() =>
    getStoredTheme(storageKey, defaultTheme),
  )
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme | undefined>(() =>
    typeof window === "undefined"
      ? undefined
      : resolveTheme(getStoredTheme(storageKey, defaultTheme) ?? defaultTheme, enableSystem),
  )

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const updateTheme = (nextTheme: Theme) => {
      const nextResolvedTheme = resolveTheme(nextTheme, enableSystem)
      const cleanup = disableTransitionOnChange
        ? disableTransitionsTemporarily()
        : undefined

      applyThemeToDocument(nextResolvedTheme, attribute, enableColorScheme)
      setResolvedTheme(nextResolvedTheme)
      cleanup?.()
    }

    const syncTheme = () => {
      const nextTheme = getStoredTheme(storageKey, defaultTheme) ?? defaultTheme
      setThemeState(nextTheme)
      updateTheme(nextTheme)
    }

    syncTheme()

    const handleMediaChange = () => {
      const activeTheme = getStoredTheme(storageKey, defaultTheme) ?? defaultTheme
      if (activeTheme === "system") {
        updateTheme(activeTheme)
      }
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === storageKey) {
        syncTheme()
      }
    }

    mediaQuery.addEventListener("change", handleMediaChange)
    window.addEventListener("storage", handleStorage)

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange)
      window.removeEventListener("storage", handleStorage)
    }
  }, [
    attribute,
    defaultTheme,
    disableTransitionOnChange,
    enableColorScheme,
    enableSystem,
    storageKey,
  ])

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme)
      window.localStorage.setItem(storageKey, nextTheme)

      const nextResolvedTheme = resolveTheme(nextTheme, enableSystem)
      const cleanup = disableTransitionOnChange
        ? disableTransitionsTemporarily()
        : undefined

      applyThemeToDocument(nextResolvedTheme, attribute, enableColorScheme)
      setResolvedTheme(nextResolvedTheme)
      cleanup?.()
    },
    [attribute, disableTransitionOnChange, enableColorScheme, enableSystem, storageKey],
  )

  const value = React.useMemo(
    () => ({
      resolvedTheme,
      setTheme,
      theme,
    }),
    [resolvedTheme, setTheme, theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}
