import { dashboardMetrics, integrationHealth, alerts } from '@/lib/mock-data'
import { MetricsCards } from '@/components/dashboard/metrics-cards'
import { HealthStatus } from '@/components/dashboard/health-status'
import { ActivityChart } from '@/components/dashboard/activity-chart'
import { AlertsPanel } from '@/components/dashboard/alerts-panel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Sparkles } from 'lucide-react'

export default function DashboardPage() {
  const activeAlerts = alerts.filter(a => !a.resolved)

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
            <Badge variant="outline" className="border-primary/40 bg-primary/15 text-primary">
              Live Mode
            </Badge>
            <span>Last health check 12s ago</span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Mission Control
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Monitor integration performance, prioritize incidents, and orchestrate dependable fulfilment flows.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="border-border/60">
            <Clock className="mr-2 h-4 w-4" />
            Schedule report
          </Button>
          <Button size="sm" className="shadow-soft-glow">
            <Sparkles className="mr-2 h-4 w-4" />
            Deploy changes
          </Button>
        </div>
      </div>

      <MetricsCards metrics={dashboardMetrics} />

      <div className="grid gap-8 xl:grid-cols-[1.7fr_1fr]">
        <div className="space-y-8">
          <ActivityChart />
          <HealthStatus integrations={integrationHealth} />
        </div>

        <div className="space-y-6">
          {activeAlerts.length > 0 && <AlertsPanel alerts={activeAlerts} />}
        </div>
      </div>
    </div>
  )
}
