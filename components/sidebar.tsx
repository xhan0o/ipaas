'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Grid3x3, GitBranch, FileText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type NavItem = {
  title: string
  description: string
  href: string
  icon: LucideIcon
  badge?: string
}

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    description: 'Realtime pulse & alerts',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Integrations',
    description: 'Connect storefronts & ERPs',
    href: '/integrations',
    icon: Grid3x3,
  },
  {
    title: 'Mapper',
    description: 'Model & transform payloads',
    href: '/mapper',
    icon: GitBranch,
    badge: 'Flow Studio',
  },
  {
    title: 'Logs',
    description: 'Trace every sync & retry',
    href: '/logs',
    icon: FileText,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="relative z-20 hidden h-screen w-72 flex-col border-r border-border/40 bg-background/80 px-4 py-6 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 lg:w-80 md:flex">
      <div className="absolute inset-x-10 top-6 h-32 rounded-full bg-primary/20 blur-3xl" aria-hidden />

      <div className="relative flex flex-1 flex-col gap-6">
        <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-4 py-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/40">
            HX
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wide text-primary/80">
              Hopstack Cloud
            </span>
            <span className="text-base font-semibold text-foreground">
              Integration Control
            </span>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-2xl border border-transparent px-3 py-2 transition-all duration-200 hover:border-border/60 hover:bg-muted/40 hover:shadow-sm',
                  isActive && 'border-primary/60 bg-primary/15 shadow-lg shadow-primary/30 shadow-soft-glow'
                )}
              >
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 text-muted-foreground transition-colors duration-200 group-hover:bg-muted/60 group-hover:text-foreground',
                    isActive && 'bg-primary/20 text-primary'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {item.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </div>
                {item.badge && (
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="rounded-2xl border border-border/60 bg-background/70 p-4 shadow-inner">
            <p className="text-sm font-semibold text-foreground">
              Release highlight
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Adaptive retries shipped • View the launch notes for more insight.
            </p>
            <Link href="/logs" className="mt-3 block">
              <span className="inline-flex w-full items-center justify-center rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/20">
                View roadmap
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/80 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
              WM
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                Warehouse Manager
              </p>
              <p className="text-xs text-muted-foreground">
                manager@hopstack.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
