import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Integration } from '@/types/integrations'
import { ArrowUpRight, Lock, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IntegrationCardProps {
  integration: Integration
  onConfigure: () => void
}

export function IntegrationCard({ integration, onConfigure }: IntegrationCardProps) {
  const statusMeta: Record<Integration['status'], { label: string; variant: 'success' | 'secondary' | 'outline' | 'error'; hint: string; buttonVariant: 'default' | 'outline'; cta: string }> = {
    active: {
      label: 'Active',
      variant: 'success',
      hint: 'Syncs running',
      buttonVariant: 'outline',
      cta: 'Manage',
    },
    inactive: {
      label: 'Inactive',
      variant: 'secondary',
      hint: 'Ready to resume',
      buttonVariant: 'default',
      cta: 'Enable',
    },
    available: {
      label: 'Available',
      variant: 'outline',
      hint: 'Blueprint ready',
      buttonVariant: 'default',
      cta: 'Configure',
    },
    not_available: {
      label: 'Enterprise',
      variant: 'error',
      hint: 'Upgrade required',
      buttonVariant: 'outline',
      cta: 'Upgrade plan',
    },
  }

  const meta = statusMeta[integration.status]
  const extraApis = Math.max((integration.availableAPIs?.length || 0) - 3, 0)
  const displayApis = integration.availableAPIs?.slice(0, 3) ?? []
  const isLocked = integration.status === 'not_available'
  const isActive = integration.status === 'active'

  const buttonVariant = isLocked ? 'outline' : meta.buttonVariant
  const buttonIcon = isActive ? <Settings className="mr-2 h-4 w-4" /> : <ArrowUpRight className="mr-2 h-4 w-4" />

  const buttonDisabled = isLocked
  const buttonLabel = meta.cta

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border-border/50 bg-card/80 backdrop-blur transition hover:border-primary/40 hover:bg-primary/10">
      <div className="pointer-events-none absolute inset-0 opacity-70 group-hover:opacity-100" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_65%)]" />
      </div>
      <CardHeader className="relative space-y-4 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/80 text-3xl">
              {integration.logo}
            </div>
            <div className="space-y-2">
              <CardTitle className="text-lg font-semibold">
                {integration.name}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={meta.variant as any} className="rounded-full px-2 py-0 text-[11px] uppercase">
                  {integration.status === 'not_available' && <Lock className="mr-1 h-3 w-3" />}
                  {meta.label}
                </Badge>
                <Badge variant="outline" className="rounded-full border-border/60 px-2 py-0 text-[11px] uppercase tracking-wide text-muted-foreground">
                  {integration.category}
                </Badge>
              </div>
            </div>
          </div>
          {isLocked && (
            <Badge variant="outline" className="rounded-full border-amber-400/60 bg-amber-400/10 text-[11px] font-semibold text-amber-400">
              <Lock className="mr-1 h-3 w-3" /> Enterprise
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {integration.description}
        </p>
      </CardHeader>
      <CardContent className="relative flex flex-wrap gap-2 pt-0 text-xs text-muted-foreground">
        {displayApis.length > 0 ? (
          <>
            {displayApis.map(api => (
              <span
                key={api}
                className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[11px] font-medium"
              >
                {api}
              </span>
            ))}
            {extraApis > 0 && (
              <span className="rounded-full border border-border/40 bg-background/70 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                +{extraApis} more
              </span>
            )}
          </>
        ) : (
          <span className="rounded-full border border-dashed border-border/50 px-3 py-1 text-[11px] uppercase">
            Template in progress
          </span>
        )}
      </CardContent>
      <CardFooter className="relative mt-auto flex items-center justify-between pt-4">
        <div className="space-y-1">
          <span className="text-xs font-medium text-muted-foreground">
            {meta.hint}
          </span>
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground/70">
            Updated 2 hours ago
          </span>
        </div>
        <Button
          className={cn('min-w-[140px] justify-center rounded-xl', buttonVariant === 'default' && 'shadow-soft-glow')}
          variant={buttonVariant}
          size="sm"
          onClick={onConfigure}
          disabled={buttonDisabled}
        >
          {buttonIcon}
          {buttonLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}
