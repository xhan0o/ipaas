"use client"

import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'hopstack-theme'

const applyThemeClass = (theme: Theme) => {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
}

const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'

  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }

    const preferred = getPreferredTheme()
    applyThemeClass(preferred)
    return preferred
  })

  useEffect(() => {
    const preferred = getPreferredTheme()
    setThemeState(preferred)
    applyThemeClass(preferred)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (event: MediaQueryListEvent) => {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        const nextTheme: Theme = event.matches ? 'dark' : 'light'
        setThemeState(nextTheme)
        applyThemeClass(nextTheme)
      }
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  const setTheme = useCallback((value: Theme) => {
    setThemeState(value)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, value)
    }
    applyThemeClass(value)
  }, [])

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
  }, [setTheme, theme])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

