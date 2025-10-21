'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IntegrationHealth } from '@/types/integrations'
import { formatDistanceToNow } from 'date-fns'
import { ExternalLink, Pause, Settings } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface HealthStatusProps {
  integrations: IntegrationHealth[]
}

export function HealthStatus({ integrations }: HealthStatusProps) {
  const statusTokens: Record<IntegrationHealth['status'], { label: string; badge: 'success' | 'warning' | 'error' | 'secondary'; indicator: string }> = {
    healthy: {
      label: 'Healthy',
      badge: 'success',
      indicator: 'bg-emerald-400',
    },
    warning: {
      label: 'Warning',
      badge: 'warning',
      indicator: 'bg-amber-400',
    },
    down: {
      label: 'Down',
      badge: 'error',
      indicator: 'bg-rose-500',
    },
    paused: {
      label: 'Paused',
      badge: 'secondary',
      indicator: 'bg-slate-400',
    },
  }

  return (
    <Card className="border-border/60 bg-card/80 backdrop-blur">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Integration Health</CardTitle>
        <p className="text-sm text-muted-foreground">
          Track sync performance and intervene before downstream impact.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {integrations.map(integration => {
          const status = statusTokens[integration.status]

          return (
            <div
              key={integration.integrationId}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-border/50 bg-background/70 px-4 py-4 transition hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="flex min-w-[200px] flex-1 items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/50 text-2xl">
                  {integration.logo}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-foreground">
                      {integration.integrationName}
                    </h4>
                    <Badge
                      variant={status.badge as any}
                      className="gap-1 rounded-full"
                    >
                      <span
                        className={cn('h-1.5 w-1.5 rounded-full', status.indicator)}
                      />
                      {status.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last sync {formatDistanceToNow(integration.lastSync, { addSuffix: true })}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-wrap items-center justify-end gap-3 text-sm">
                <div className="rounded-xl border border-border/50 bg-background/60 px-3 py-2">
                  <p className="text-sm font-semibold text-foreground">
                    {integration.successRate}% success
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {integration.recordsSynced.toLocaleString()} records today
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href="/logs">
                    <Button variant="outline" size="sm" className="border-border/60">
                      <ExternalLink className="mr-1.5 h-4 w-4" />
                      Open logs
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Pause className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
