'use client'

import { Badge, badgeVariants } from '@/components/ui/badge'
import type { VariantProps } from 'class-variance-authority'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { LogEntry } from '@/types/integrations'
import { formatDistanceToNow } from 'date-fns'
import { CheckCircle2, XCircle, AlertTriangle, Clock, ChevronDown, ChevronRight, RotateCw } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface LogsTableProps {
  logs: LogEntry[]
}

export function LogsTable({ logs }: LogsTableProps) {
  const [expandedLog, setExpandedLog] = useState<string | null>(null)

  const getStatusIcon = (status: LogEntry['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'partial':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-blue-500" />
    }
  }

  type BadgeVariant = VariantProps<typeof badgeVariants>['variant']

  const getStatusVariant = (status: LogEntry['status']): BadgeVariant => {
    switch (status) {
      case 'success':
        return 'success'
      case 'failed':
        return 'error'
      case 'partial':
        return 'warning'
      case 'pending':
        return 'secondary'
    }
  }

  const rowAccent: Record<LogEntry['status'], string> = {
    success: 'border-l-2 border-emerald-400/50',
    failed: 'border-l-2 border-rose-500/60',
    partial: 'border-l-2 border-amber-400/60',
    pending: 'border-l-2 border-sky-400/60',
  }

  const toggleExpand = (logId: string) => {
    setExpandedLog(prev => (prev === logId ? null : logId))
  }

  return (
    <Card className="border-border/60 bg-card/85 backdrop-blur">
      <Table>
        <TableHeader>
          <TableRow className="border-border/40">
            <TableHead className="w-12" />
            <TableHead className="text-muted-foreground">Timestamp</TableHead>
            <TableHead className="text-muted-foreground">Integration</TableHead>
            <TableHead className="text-muted-foreground">API Endpoint</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Records</TableHead>
            <TableHead className="text-muted-foreground">Duration</TableHead>
            <TableHead className="text-right text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map(log => {
            const isExpanded = expandedLog === log.id

            return (
              <>
                <TableRow
                  key={log.id}
                  className={cn(
                    'border-l-2 border-transparent bg-background/60 transition hover:border-primary/40 hover:bg-primary/5',
                    isExpanded && cn(rowAccent[log.status], 'bg-primary/10 shadow-soft-glow')
                  )}
                  onClick={() => toggleExpand(log.id)}
                >
                  <TableCell className="align-top pt-5">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </TableCell>
                  <TableCell className="align-top pt-5 text-sm font-medium text-foreground">
                    {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                  </TableCell>
                  <TableCell className="align-top pt-5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{log.logo}</span>
                      <span className="font-semibold">{log.integrationName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="align-top pt-5 text-sm text-muted-foreground">
                    {log.apiEndpoint}
                  </TableCell>
                  <TableCell className="align-top pt-5">
                    <Badge variant={getStatusVariant(log.status)} className="gap-1 capitalize">
                      {getStatusIcon(log.status)}
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="align-top pt-5 text-sm font-medium">
                    {log.recordsProcessed}/{log.totalRecords}
                  </TableCell>
                  <TableCell className="align-top pt-5 text-sm text-muted-foreground">
                    {log.duration > 0 ? `${log.duration}ms` : '—'}
                  </TableCell>
                  <TableCell className="align-top pt-5 text-right">
                    {(log.status === 'failed' || log.status === 'partial') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:text-primary"
                        onClick={event => {
                          event.stopPropagation()
                        }}
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>

                {isExpanded && (
                  <TableRow>
                    <TableCell colSpan={8} className="bg-background/80">
                      <div className="grid gap-4 p-5 md:grid-cols-2">
                        {log.requestDetails && (
                          <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                            <h4 className="text-sm font-semibold text-foreground">Request</h4>
                            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <span className="text-xs uppercase tracking-wide text-muted-foreground/80">Method</span>
                                <Badge variant="outline" className="rounded-full border-border/50 px-2">
                                  {log.requestDetails.method}
                                </Badge>
                              </div>
                              <div>
                                <span className="text-xs uppercase tracking-wide text-muted-foreground/80">URL</span>
                                <p className="mt-1 break-all rounded-xl bg-background/60 p-2 text-xs">
                                  {log.requestDetails.url}
                                </p>
                              </div>
                              <div>
                                <span className="text-xs uppercase tracking-wide text-muted-foreground/80">Headers</span>
                                <pre className="mt-1 whitespace-pre-wrap rounded-xl bg-background/60 p-2 text-xs">
                                  {JSON.stringify(log.requestDetails.headers, null, 2)}
                                </pre>
                              </div>
                            </div>
                          </div>
                        )}

                        {log.responseDetails && (
                          <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                            <h4 className="text-sm font-semibold text-foreground">Response</h4>
                            <div className="mt-3 space-y-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <span className="text-xs uppercase tracking-wide text-muted-foreground/80">
                                  Status
                                </span>
                                <Badge
                                  variant={
                                    log.responseDetails.statusCode >= 200 &&
                                    log.responseDetails.statusCode < 300
                                      ? 'success'
                                      : 'error'
                                  }
                                  className="rounded-full"
                                >
                                  {log.responseDetails.statusCode}
                                </Badge>
                              </div>
                              <div>
                                <span className="text-xs uppercase tracking-wide text-muted-foreground/80">
                                  Duration
                                </span>
                                <p className="mt-1 text-xs text-foreground">{log.duration}ms</p>
                              </div>
                              {log.responseDetails.body && (
                                <div>
                                  <span className="text-xs uppercase tracking-wide text-muted-foreground/80">
                                    Payload
                                  </span>
                                  <pre className="mt-1 max-h-48 overflow-auto rounded-xl bg-background/60 p-2 text-xs">
                                    {JSON.stringify(log.responseDetails.body, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {log.error && (
                          <div className="md:col-span-2">
                            <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4">
                              <h4 className="text-sm font-semibold text-rose-200">
                                Error detail
                              </h4>
                              <p className="mt-2 text-sm text-rose-100">
                                {log.error}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )
          })}
        </TableBody>
      </Table>

      {logs.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-2 py-12 text-center">
          <p className="text-lg font-semibold text-foreground">No logs found</p>
          <p className="text-sm text-muted-foreground">
            Adjust your filters or load a different timeframe.
          </p>
        </div>
      )}
    </Card>
  )
}
