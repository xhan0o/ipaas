import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ArchitectureDiagram } from '@/components/diagrams/architecture-diagram'
import { DataFlowDiagram } from '@/components/diagrams/data-flow-diagram'
import { UserJourneyDiagram } from '@/components/diagrams/user-journey-diagram'
import { WorkflowDiagram } from '@/components/diagrams/workflow-diagram'
import { BookOpen, Layers, Workflow, Users, Database, Shield, Zap } from 'lucide-react'

export default function InfoPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Platform Guide
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Architecture overview and product execution guide
            </p>
          </div>
        </div>
      </div>

      {/* Index / Table of Contents */}
      <nav aria-label="On this page" className="rounded-xl border border-border/60 bg-card p-4">
        <div className="text-xs font-medium text-muted-foreground mb-2">On this page</div>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          <li><a className="hover:text-primary underline-offset-4 hover:underline" href="#overview">Platform Overview</a></li>
          <li><a className="hover:text-primary underline-offset-4 hover:underline" href="#architecture">System Architecture</a></li>
          <li><a className="hover:text-primary underline-offset-4 hover:underline" href="#data-flow">Data Flow Pipeline</a></li>
          <li><a className="hover:text-primary underline-offset-4 hover:underline" href="#user-journey">User Journey</a></li>
          <li><a className="hover:text-primary underline-offset-4 hover:underline" href="#workflow">Workflow Execution</a></li>
          <li><a className="hover:text-primary underline-offset-4 hover:underline" href="#product-features">Product Features</a></li>
          <li><a className="hover:text-primary underline-offset-4 hover:underline" href="#design-philosophy">Design Philosophy</a></li>
          <li><a className="hover:text-primary underline-offset-4 hover:underline" href="#tech-stack">Technical Stack</a></li>
        </ul>
      </nav>

      {/* Overview Section */}
      <section id="overview" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Platform Overview</h2>
          <p className="text-muted-foreground">
            An Integration Platform as a Service (iPaaS) designed to connect external systems
            with Hopstack&apos;s fulfillment platform. Built for reliability, scalability, and
            operational excellence.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/60 bg-card/50 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Multi-System Integration</h3>
                <p className="text-sm text-muted-foreground">Connect E-commerce, ERP, Shipping, and more</p>
              </div>
            </div>
          </Card>

          <Card className="border-border/60 bg-card/50 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <Workflow className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold">Workflow Orchestration</h3>
                <p className="text-sm text-muted-foreground">Temporal-powered reliable execution</p>
              </div>
            </div>
          </Card>

          <Card className="border-border/60 bg-card/50 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold">Self-Service Configuration</h3>
                <p className="text-sm text-muted-foreground">No-code setup and mapping</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">System Architecture</h2>
          </div>
          <p className="text-muted-foreground">
            High-level view of system components and their relationships across frontend,
            orchestration, and data layers.
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">Component Architecture</h3>
            <p className="text-sm text-muted-foreground">
              Frontend applications, API gateway, Temporal orchestration engine, integration connectors, and data storage layers.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-4 md:p-6">
            <ArchitectureDiagram />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/60 bg-card/50 p-6">
            <h3 className="mb-3 font-semibold flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Data Layer
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• PostgreSQL: Configs, mappings, credentials</li>
              <li>• MongoDB: Logs, events, time-series data</li>
              <li>• Redis: Cache, sessions, rate limiting</li>
              <li>• S3: File uploads, exports</li>
            </ul>
          </Card>

          <Card className="border-border/60 bg-card/50 p-6">
            <h3 className="mb-3 font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security & Observability
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Vault: Secrets management</li>
              <li>• Encryption service for credentials</li>
              <li>• ELK stack for logging</li>
              <li>• Prometheus/Grafana metrics</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Data Flow Section */}
      <section id="data-flow" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Data Flow Pipeline</h2>
          </div>
          <p className="text-muted-foreground">
            End-to-end data transformation from external sources to Hopstack platform,
            including extract, transform, and load phases.
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">ETL Pipeline</h3>
            <p className="text-sm text-muted-foreground">
              Extract phase (API calls, authentication), Transform phase (validation, mapping, enrichment), Load phase (Hopstack API), and Post-processing (logging, notifications).
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-4 md:p-6">
            <DataFlowDiagram />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/60 bg-card/50 p-4">
            <h3 className="mb-2 text-sm font-semibold">Extract</h3>
            <p className="text-xs text-muted-foreground">
              Trigger events (schedule/webhook/manual), fetch data via authenticated API calls
            </p>
          </Card>
          <Card className="border-border/60 bg-card/50 p-4">
            <h3 className="mb-2 text-sm font-semibold">Transform</h3>
            <p className="text-xs text-muted-foreground">
              Validate schemas, apply field mappings, execute transformations, enrich with defaults
            </p>
          </Card>
          <Card className="border-border/60 bg-card/50 p-4">
            <h3 className="mb-2 text-sm font-semibold">Load</h3>
            <p className="text-xs text-muted-foreground">
              Final validation, load to Hopstack via API, handle responses and retries
            </p>
          </Card>
        </div>
      </section>

      {/* User Journey Section */}
      <section id="user-journey" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">User Journey</h2>
          </div>
          <p className="text-muted-foreground">
            Customer experience from integration discovery through configuration, mapping,
            activation, and ongoing monitoring.
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">Customer Integration Setup</h3>
            <p className="text-sm text-muted-foreground">
              Journey map showing discovery, configuration, field mapping, activation, and monitoring phases with satisfaction scores.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-4 md:p-6">
            <UserJourneyDiagram />
          </div>
        </div>
      </section>

      {/* Temporal Workflow Section */}
      <section id="workflow" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Workflow className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Workflow Execution</h2>
          </div>
          <p className="text-muted-foreground">
            Temporal-powered workflow with state management, retry policies, and error handling
            for reliable data synchronization.
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">Temporal Workflow States</h3>
            <p className="text-sm text-muted-foreground">
              Workflow execution with activities, retry policies, error handling paths, and state transitions.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-4 md:p-6">
            <WorkflowDiagram />
          </div>
        </div>

        <Card id="product-features" className="border-border/60 bg-card/50 p-6 scroll-mt-24">
          <h3 className="mb-4 font-semibold">Key Workflow Features</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Retry Policies</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Extract: Max 3 attempts, exponential backoff</li>
                <li>• Load: Max 5 attempts, 2x backoff on 5xx errors</li>
                <li>• Timeout protection at each phase</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">State Management</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Last sync cursor tracking</li>
                <li>• Records processed count</li>
                <li>• Execution time metrics</li>
                <li>• Success rate calculations</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Product Features Section */}
      <section id="product-features" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Product Features</h2>
          <p className="text-muted-foreground">
            Core capabilities delivered to enable seamless integration management.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/60 bg-card/50 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Integrations Dashboard</h3>
                <Badge variant="outline" className="mt-1 text-xs">Monitoring</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time health monitoring, activity timelines, success rate metrics, and
              proactive alerting for integration performance.
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Integration health status indicators</li>
              <li>• Activity timeline charts (24h/7d/30d/90d)</li>
              <li>• Error trends and top synced APIs</li>
              <li>• Critical alerts and notifications</li>
            </ul>
          </Card>

          <Card className="border-border/60 bg-card/50 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Zap className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold">Integration Configuration</h3>
                <Badge variant="outline" className="mt-1 text-xs">Setup</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Self-service credential configuration with connection testing and API endpoint
              selection for each integration.
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Dynamic credential forms per integration</li>
              <li>• Test connection validation</li>
              <li>• Sandbox/Production toggle</li>
              <li>• Selective API endpoint activation</li>
            </ul>
          </Card>

          <Card className="border-border/60 bg-card/50 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Workflow className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold">Visual Field Mapper</h3>
                <Badge variant="outline" className="mt-1 text-xs">No-Code</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Drag-and-drop interface for mapping external integration fields to Hopstack
              platform fields with transformation support.
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Split-panel layout (Source ↔ Target)</li>
              <li>• Data type indicators and validation</li>
              <li>• Transformation rules (format, concatenate, lookup)</li>
              <li>• Template system for common mappings</li>
            </ul>
          </Card>

          <Card className="border-border/60 bg-card/50 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <Database className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Integration Logs</h3>
                <Badge variant="outline" className="mt-1 text-xs">Observability</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Comprehensive activity logs with request/response inspection, filtering, and
              retry capabilities for debugging and auditing.
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Expandable row details</li>
              <li>• Status filtering (Success/Failed/Partial/Pending)</li>
              <li>• Request/Response inspection</li>
              <li>• Retry failed operations</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Design Philosophy Section */}
      <section id="design-philosophy" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Design Philosophy</h2>
          <p className="text-muted-foreground">
            Principles that guided the platform&apos;s user experience and technical execution.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/60 bg-card/50 p-6">
            <h3 className="mb-3 font-semibold">Operational Clarity</h3>
            <p className="text-sm text-muted-foreground">
              Prioritize visibility into integration health and performance. Real-time status
              indicators, comprehensive logging, and actionable alerts enable proactive issue
              resolution.
            </p>
          </Card>

          <Card className="border-border/60 bg-card/50 p-6">
            <h3 className="mb-3 font-semibold">Self-Service Empowerment</h3>
            <p className="text-sm text-muted-foreground">
              Enable customers to configure integrations and map fields without engineering
              intervention. Intuitive interfaces reduce setup time and support burden.
            </p>
          </Card>

          <Card className="border-border/60 bg-card/50 p-6">
            <h3 className="mb-3 font-semibold">Reliability First</h3>
            <p className="text-sm text-muted-foreground">
              Temporal orchestration ensures data synchronization reliability with retry
              policies, state management, and error recovery. Built for production-grade
              operations.
            </p>
          </Card>

          <Card className="border-border/60 bg-card/50 p-6">
            <h3 className="mb-3 font-semibold">Scalable Architecture</h3>
            <p className="text-sm text-muted-foreground">
              Microservices design with clear separation of concerns. Connector-based
              architecture allows rapid integration additions without core platform changes.
            </p>
          </Card>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Technical Stack</h2>
          <p className="text-muted-foreground">
            Technologies powering the platform across frontend, orchestration, and data layers.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/60 bg-card/50 p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Frontend
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>Next.js 15 (App Router)</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>shadcn/ui</li>
              <li>React Server Components</li>
            </ul>
          </Card>

          <Card className="border-border/60 bg-card/50 p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Orchestration
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>Temporal Workflows</li>
              <li>Activity Retries</li>
              <li>State Management</li>
              <li>Event Sourcing</li>
            </ul>
          </Card>

          <Card className="border-border/60 bg-card/50 p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Data Layer
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>PostgreSQL</li>
              <li>MongoDB</li>
              <li>Redis</li>
              <li>S3 Object Storage</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  )
}

