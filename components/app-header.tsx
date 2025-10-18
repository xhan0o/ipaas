"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { navItems } from '@/components/sidebar'
import { Bell, Command, Menu, PlusCircle, Rocket, X } from 'lucide-react'

export function AppHeader() {
  const pathname = usePathname()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border/40 bg-background/60 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/40 md:px-6">
        <div className="flex items-center gap-3 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Hopstack
            </span>
            <span className="text-sm font-semibold">iPaaS Platform</span>
          </div>
        </div>

        <div className="hidden flex-col md:flex">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Control Center
          </span>
          <span className="text-lg font-semibold">Hopstack iPaaS</span>
        </div>

        <div className="flex flex-1 items-center gap-3 md:justify-end">
          <div className="relative hidden max-w-md flex-1 items-center gap-2 rounded-2xl border border-border/40 bg-muted/30 px-4 py-2 text-sm text-muted-foreground shadow-sm transition-colors focus-within:border-primary focus-within:bg-background/80 focus-within:text-foreground sm:flex">
            <Command className="h-4 w-4" />
            <Input
              placeholder="Search or jump to an integration"
              className="h-auto border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <span className="hidden text-xs font-medium text-muted-foreground md:block">
              ⌘K
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden lg:flex">
              <Rocket className="mr-2 h-4 w-4" />
              Launch Flow
            </Button>
            <Button size="sm" className="hidden sm:flex">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Integration
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                3
              </span>
            </Button>
            <ThemeToggle />
            <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-primary/40 to-primary/20 text-sm font-semibold text-primary md:flex">
              WM
            </div>
          </div>
        </div>
      </header>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative z-10 flex w-72 flex-col border-r border-border/50 bg-background/95 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Navigate
                </p>
                <p className="text-base font-semibold">Hopstack iPaaS</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close navigation"
                onClick={() => setMobileNavOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="mt-6 space-y-2">
              {navItems.map(item => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 transition-colors',
                      isActive
                        ? 'border-primary/40 bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:border-border/60 hover:bg-muted/40 hover:text-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.title}</span>
                      {item.description && (
                        <span className="text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

