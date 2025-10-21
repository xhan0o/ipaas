import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardMetrics } from '@/types/integrations'
import { Activity, ArrowDownRight, ArrowUpRight, CheckCircle2, Database, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricsCardsProps {
  metrics: DashboardMetrics
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const inactiveCount = Math.max(metrics.totalIntegrations - metrics.activeIntegrations, 0)
  const coverage = metrics.totalIntegrations
    ? Math.round((metrics.activeIntegrations / metrics.totalIntegrations) * 100)
    : 0
  const recordsPerSync = metrics.activeSyncs ? Math.round(metrics.recordsSyncedToday / metrics.activeSyncs) : metrics.recordsSyncedToday

  const cards = [
    {
      title: 'Integration Coverage',
      value: metrics.activeIntegrations,
      suffix: `/ ${metrics.totalIntegrations}`,
      subtitle: `${coverage}% coverage • ${inactiveCount} paused`,
      trend: '+2 today',
      trendPositive: true,
      icon: Activity,
      accent: 'from-sky-500/40 via-sky-500/10 to-transparent',
    },
    {
      title: 'Success Rate',
      value: `${metrics.successRate}%`,
      subtitle: 'Rolling 24h window',
      trend: `${Math.max(metrics.successRate - 92, 0).toFixed(1)}% over SLA`,
      trendPositive: metrics.successRate >= 92,
      icon: CheckCircle2,
      accent: 'from-emerald-500/30 via-emerald-500/10 to-transparent',
    },
    {
      title: 'Records Synced',
      value: metrics.recordsSyncedToday.toLocaleString(),
      subtitle: 'Today',
      trend: `${recordsPerSync.toLocaleString()} avg / sync`,
      trendPositive: true,
      icon: Database,
      accent: 'from-violet-500/30 via-violet-500/10 to-transparent',
    },
    {
      title: 'Active Syncs',
      value: metrics.activeSyncs,
      subtitle: 'Running now',
      trend: '1.8m avg duration',
      trendPositive: true,
      icon: RefreshCw,
      accent: 'from-amber-500/30 via-amber-500/10 to-transparent',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card
            key={index}
            className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur"
          >
            <div
              className={cn(
                'pointer-events-none absolute inset-0 opacity-60 blur-2xl',
                `bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]`
              )}
              aria-hidden
            />
            <CardHeader className="relative flex flex-row items-start justify-between space-y-0 pb-4">
              <div className="space-y-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-foreground">
                    {card.value}
                  </span>
                  {card.suffix && (
                    <span className="text-base font-medium text-muted-foreground">
                      {card.suffix}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md shadow-black/20',
                  card.accent
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="relative flex items-center justify-between px-6 pb-6 pt-0 text-xs text-muted-foreground">
              <span>{card.subtitle}</span>
              <span
                className={cn(
                  'inline-flex items-center gap-1 font-medium',
                  card.trendPositive ? 'text-emerald-400' : 'text-rose-400'
                )}
              >
                {card.trendPositive ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}
                {card.trend}
              </span>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
