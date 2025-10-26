'use client'

import { useState } from 'react'
import { logEntries } from '@/lib/mock-data'
import { LogsTable } from '@/components/logs/logs-table'
import { LogsFilters } from '@/components/logs/logs-filters'
import { LogStatus } from '@/types/integrations'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, RotateCcw } from 'lucide-react'

export default function LogsPage() {
  const [statusFilter, setStatusFilter] = useState<LogStatus | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLogs = logEntries.filter((log) => {
    const matchesStatus = statusFilter === 'All' || log.status === statusFilter
    const matchesSearch =
      log.integrationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.apiEndpoint.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesSearch
  })

  const failedCount = logEntries.filter(log => log.status === 'failed').length
  const warningCount = logEntries.filter(log => log.status === 'partial').length

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
            <Badge variant="outline" className="border-primary/40 bg-primary/15 text-primary">
              Event Stream
            </Badge>
            <span>
              {failedCount} failures · {warningCount} partials today
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Trace every sync
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Inspect payloads, retries, and response times across every connector in real-time.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="border-border/60">
            <RotateCcw className="mr-2 h-4 w-4" />
            Refresh stream
          </Button>
          <Button size="sm" className="shadow-soft-glow">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <LogsFilters
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <LogsTable logs={filteredLogs} />
    </div>
  )
}
