import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Calendar, CheckCircle2 } from 'lucide-react'

const roadmapItems = [
  {
    date: '2025-10-30',
    title: 'Platform Foundation',
    items: [
      'CI/CD pipeline with GitHub Actions and Vercel',
      'ESLint configuration and code quality standards',
    ],
  },
  {
    date: '2025-10-29',
    title: 'Documentation & Setup',
    items: [
      'Project documentation and quickstart guides',
      'PRD documents for all core modules',
    ],
  },
  {
    date: '2025-10-27',
    title: 'Logging & Monitoring',
    items: [
      'Logs page with filtering and expandable rows',
      'Responsive design improvements across all pages',
    ],
  },
  {
    date: '2025-10-26',
    title: 'Integration Logs',
    items: [
      'Logs table component with real-time monitoring',
      'Trace every sync and retry operation',
    ],
  },
  {
    date: '2025-10-25',
    title: 'Field Mapper',
    items: [
      'Visual drag-and-drop mapper with ReactFlow',
      'Edge connections and field mapping interface',
    ],
  },
  {
    date: '2025-10-24',
    title: 'Integration Management',
    items: [
      'Integration card components and homepage layout',
      'Filtering, search, and configurator modal',
    ],
  },
  {
    date: '2025-10-23',
    title: 'Dashboard Features',
    items: [
      'Alerts panel for system notifications',
      'Integrations homepage with catalog view',
    ],
  },
  {
    date: '2025-10-21',
    title: 'Core Dashboard',
    items: [
      'Activity chart with Nivo visualization',
      'Integration health monitoring system',
    ],
  },
]

export default function RoadmapPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
            <Badge variant="outline" className="border-primary/40 bg-primary/15 text-primary">
              Release Timeline
            </Badge>
            <span>Product development history</span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Product Roadmap
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Track what we&apos;ve built and when. Features are grouped by release date.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {roadmapItems.map((item, index) => (
          <Card
            key={item.date}
            className="border-border/60 bg-card/70 p-6 transition-all hover:border-border hover:shadow-md"
          >
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                {index < roadmapItems.length - 1 && (
                  <div className="h-full w-0.5 bg-border/60" />
                )}
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </Badge>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {item.items.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}








