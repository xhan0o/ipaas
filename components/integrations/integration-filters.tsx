import { Input } from '@/components/ui/input'
import { IntegrationCategory, IntegrationStatus } from '@/types/integrations'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface IntegrationFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  categoryFilter: IntegrationCategory | 'All'
  onCategoryChange: (category: IntegrationCategory | 'All') => void
  statusFilter: IntegrationStatus | 'All'
  onStatusChange: (status: IntegrationStatus | 'All') => void
}

const categories: (IntegrationCategory | 'All')[] = [
  'All',
  'E-commerce',
  'ERP',
  'Shipping',
  'WMS',
  'Marketplace',
]

const statuses: (IntegrationStatus | 'All')[] = [
  'All',
  'active',
  'inactive',
  'available',
]

export function IntegrationFilters({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
}: IntegrationFiltersProps) {
  return (
    <Card className="border-border/60 bg-card/80 backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Find integrations</CardTitle>
        <p className="text-sm text-muted-foreground">
          Filter by channel, readiness, and lifecycle stage.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, capability, or API"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-12 rounded-xl border-border/60 bg-background/70 pl-11 text-sm"
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const isActive = categoryFilter === category
              return (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className={cn(
                    'rounded-full border-border/60 bg-background/60 text-xs font-semibold text-muted-foreground transition hover:text-foreground',
                    isActive && 'border-primary/40 bg-primary/15 text-primary shadow-soft-glow'
                  )}
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </Button>
              )
            })}
          </div>
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
