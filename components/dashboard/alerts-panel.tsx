'use client'

import type { JSX } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert } from '@/types/integrations'
import { formatDistanceToNow } from 'date-fns'
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AlertsPanelProps {
  alerts: Alert[]
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  const priorityTokens: Record<Alert['priority'], { icon: JSX.Element; accent: string; badge: string; gradient: string }> = {
    critical: {
      icon: <AlertCircle className="h-5 w-5" />,
      accent: 'text-rose-400',
      badge: 'Critical',
      gradient: 'from-rose-500/25 via-rose-500/10 to-transparent',
    },
    warning: {
      icon: <AlertTriangle className="h-5 w-5" />,
      accent: 'text-amber-400',
      badge: 'Warning',
      gradient: 'from-amber-400/20 via-amber-400/10 to-transparent',
    },
    info: {
      icon: <Info className="h-5 w-5" />,
      accent: 'text-sky-400',
      badge: 'Info',
      gradient: 'from-sky-400/20 via-sky-400/10 to-transparent',
    },
  }

  return (
    <Card className="border-border/60 bg-card/85 backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Active Alerts</CardTitle>
        <p className="text-sm text-muted-foreground">
          Prioritize incidents before they degrade downstream SLAs.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map(alert => {
          const tokens = priorityTokens[alert.priority]

          return (
            <div
              key={alert.id}
              className="relative flex items-start gap-4 overflow-hidden rounded-2xl border border-border/50 bg-background/70 px-4 py-4"
            >
              <div
                className={cn(
                  'pointer-events-none absolute inset-0 opacity-70',
                  `bg-gradient-to-r ${tokens.gradient}`
                )}
                aria-hidden
              />
              <div className="relative mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-background/80 text-lg">
                <span className={tokens.accent}>{tokens.icon}</span>
              </div>
              <div className="relative flex flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="rounded-full border-border/50 px-2 font-semibold uppercase">
                    {tokens.badge}
                  </Badge>
                  <span>• {alert.integrationName}</span>
                  <span>
                    • {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-foreground">{alert.message}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Button variant="outline" size="sm" className="border-border/60">
                    View playbook
                  </Button>
                  {alert.priority === 'critical' && (
                    <Button size="sm" className="shadow-soft-glow">
                      Escalate now
                    </Button>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 text-muted-foreground">
                <X className="h-4 w-4" />
              </Button>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
