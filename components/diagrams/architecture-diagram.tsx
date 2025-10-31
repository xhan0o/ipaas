'use client'

interface Layer {
  title: string
  items: { name: string; description?: string }[]
  color: string
}

export function ArchitectureDiagram() {
  const layers: Layer[] = [
    {
      title: 'Frontend Layer',
      color: 'from-blue-50 to-blue-100/50 border-blue-200',
      items: [
        { name: 'Web Application', description: 'React - Customer Portal' },
        { name: 'Admin Portal', description: 'Internal Tools' },
      ],
    },
    {
      title: 'API Gateway',
      color: 'from-amber-50 to-amber-100/50 border-amber-200',
      items: [
        { name: 'API Gateway', description: 'Authentication & Routing' },
        { name: 'WebSocket Server', description: 'Real-time Updates' },
      ],
    },
    {
      title: 'Application Layer',
      color: 'from-purple-50 to-purple-100/50 border-purple-200',
      items: [
        { name: 'REST API Server', description: 'Business Logic' },
        { name: 'Auth Service', description: 'OAuth2/JWT' },
        { name: 'Mapper Service', description: 'Field Transformations' },
      ],
    },
    {
      title: 'Temporal Orchestration',
      color: 'from-emerald-50 to-emerald-100/50 border-emerald-300',
      items: [
        { name: 'Temporal Server', description: 'Workflow Engine' },
        { name: 'Temporal Workers', description: 'Activity Executors' },
      ],
    },
    {
      title: 'Integration Connectors',
      color: 'from-yellow-50 to-yellow-100/50 border-yellow-200',
      items: [
        { name: 'Shopify Connector' },
        { name: 'NetSuite Connector' },
        { name: 'ShipStation Connector' },
        { name: 'Amazon Connector' },
        { name: 'Generic HTTP Connector' },
      ],
    },
    {
      title: 'Data Layer',
      color: 'from-pink-50 to-pink-100/50 border-pink-200',
      items: [
        { name: 'PostgreSQL', description: 'Configs, Mappings, Credentials' },
        { name: 'MongoDB', description: 'Logs, Events, Time-series' },
        { name: 'Redis', description: 'Cache, Sessions, Rate Limiting' },
        { name: 'S3', description: 'File Uploads, Exports' },
      ],
    },
    {
      title: 'External Systems',
      color: 'from-slate-50 to-slate-100/50 border-slate-200',
      items: [
        { name: 'Third-party APIs', description: 'Shopify, NetSuite, etc.' },
        { name: 'Target Platform', description: 'Orders, Inventory, etc.' },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      {layers.map((layer, idx) => (
        <div key={layer.title} className="relative">
          {idx > 0 && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-2 bg-gradient-to-b from-transparent via-border to-border" />
          )}
          <div
            className={`rounded-xl border-2 bg-gradient-to-br ${layer.color} p-4 shadow-sm`}
          >
            <h4 className="font-semibold text-sm mb-3 text-foreground">{layer.title}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {layer.items.map((item) => (
                <div
                  key={item.name}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/80 dark:border-gray-700/80 shadow-sm"
                >
                  <div className="font-medium text-xs text-foreground">{item.name}</div>
                  {item.description && (
                    <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

