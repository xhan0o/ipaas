'use client'

import { useState } from 'react'
import { integrations } from '@/lib/mock-data'
import { IntegrationCard } from '@/components/integrations/integration-card'
import { IntegrationFilters } from '@/components/integrations/integration-filters'
import { ConfiguratorDialog } from '@/components/integrations/configurator-dialog'
import { Integration, IntegrationCategory, IntegrationStatus } from '@/types/integrations'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<IntegrationCategory | 'All'>('All')
  const [statusFilter, setStatusFilter] = useState<IntegrationStatus | 'All'>('All')
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || integration.category === categoryFilter
    const matchesStatus = statusFilter === 'All' || integration.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
            <Badge variant="outline" className="border-primary/40 bg-primary/15 text-primary">
              Integration Catalog
            </Badge>
            <span>{integrations.length} available endpoints</span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Connect your stack
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Activate storefronts, ERPs, and carriers with opinionated blueprints designed for omnichannel fulfillment.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="border-border/60">
            <Sparkles className="mr-2 h-4 w-4" />
            Request build
          </Button>
          <Button size="sm" className="shadow-soft-glow">
            <Plus className="mr-2 h-4 w-4" />
            New integration
          </Button>
        </div>
      </div>

      <IntegrationFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredIntegrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            onConfigure={() => setSelectedIntegration(integration)}
          />
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <Card className="flex flex-col items-center justify-center space-y-3 border-dashed border-border/60 bg-card/70 py-16 text-center">
          <Badge variant="outline" className="border-border/50 bg-background/60 text-xs uppercase tracking-wide">
            No matches
          </Badge>
          <p className="text-lg font-semibold">We couldn&apos;t find that integration yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Try another search, or drop us a request and we&apos;ll prioritise the connector for you.
          </p>
          <Button variant="outline" size="sm" className="border-border/60">
            <Sparkles className="mr-2 h-4 w-4" />
            Request integration
          </Button>
        </Card>
      )}

      <ConfiguratorDialog
        integration={selectedIntegration}
        open={!!selectedIntegration}
        onOpenChange={(open) => !open && setSelectedIntegration(null)}
      />
    </div>
  )
}
