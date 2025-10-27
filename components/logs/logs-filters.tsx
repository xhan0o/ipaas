import { Input } from '@/components/ui/input'
import { LogStatus } from '@/types/integrations'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface LogsFiltersProps {
  statusFilter: LogStatus | 'All'
  onStatusChange: (status: LogStatus | 'All') => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

const statuses: (LogStatus | 'All')[] = ['All', 'success', 'failed', 'partial', 'pending']

export function LogsFilters({
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange,
}: LogsFiltersProps) {
  return (
    <Card className="border-border/60 bg-card/80 backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Filter stream</CardTitle>
        <p className="text-sm text-muted-foreground">
          Narrow results by outcome or jump straight to a connector.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by integration or endpoint..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-12 rounded-xl border-border/60 bg-background/70 pl-11 text-sm"
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Status
          </p>
          <div className="flex flex-wrap gap-2">
            {statuses.map(status => {
              const isActive = statusFilter === status
              return (
                <Button
                  key={status}
                  variant="outline"
                  size="sm"
                  className={cn(
                    'rounded-full border-border/60 bg-background/60 text-xs font-semibold capitalize text-muted-foreground transition hover:text-foreground',
                    isActive && 'border-primary/40 bg-primary/15 text-primary shadow-soft-glow'
                  )}
                  onClick={() => onStatusChange(status)}
                >
                  {status}
                </Button>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
