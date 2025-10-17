"use client"

import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative"
    >
      <Sun
        className="h-5 w-5 transition-all duration-300 ease-out"
        style={{ opacity: isDark ? 0 : 1, transform: `scale(${isDark ? 0.5 : 1}) rotate(${isDark ? -90 : 0}deg)` }}
      />
      <Moon
        className="absolute h-5 w-5 transition-all duration-300 ease-out"
        style={{ opacity: isDark ? 1 : 0, transform: `scale(${isDark ? 1 : 0.5}) rotate(${isDark ? 0 : 90}deg)` }}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

