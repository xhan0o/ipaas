'use client'

interface Stage {
  title: string
  steps: { action: string; satisfaction: number; roles: string[] }[]
  color: string
}

export function UserJourneyDiagram() {
  const stages: Stage[] = [
    {
      title: 'Discovery',
      color: 'from-blue-50 to-blue-100/50 border-blue-200',
      steps: [
        { action: 'Browse integrations page', satisfaction: 5, roles: ['Customer'] },
        { action: 'Search for Shopify', satisfaction: 5, roles: ['Customer'] },
        { action: 'View integration details', satisfaction: 4, roles: ['Customer'] },
        { action: 'Check available APIs', satisfaction: 4, roles: ['Customer'] },
      ],
    },
    {
      title: 'Configuration',
      color: 'from-purple-50 to-purple-100/50 border-purple-200',
      steps: [
        { action: 'Click "Configure" button', satisfaction: 5, roles: ['Customer'] },
        { action: 'Enter API credentials', satisfaction: 3, roles: ['Customer'] },
        { action: 'Select sandbox/production', satisfaction: 4, roles: ['Customer'] },
        { action: 'Choose required APIs', satisfaction: 4, roles: ['Customer'] },
        { action: 'Test connection', satisfaction: 2, roles: ['Customer'] },
        { action: 'See success message', satisfaction: 5, roles: ['Customer'] },
        { action: 'Save configuration', satisfaction: 5, roles: ['Customer'] },
      ],
    },
    {
      title: 'Field Mapping',
      color: 'from-emerald-50 to-emerald-100/50 border-emerald-200',
      steps: [
        { action: 'Open mapper interface', satisfaction: 4, roles: ['Customer', 'Support'] },
        { action: 'Review auto-suggestions', satisfaction: 5, roles: ['Customer', 'Support'] },
        { action: 'Drag fields to map', satisfaction: 3, roles: ['Customer', 'Support'] },
        { action: 'Add transformations', satisfaction: 3, roles: ['Customer', 'Support'] },
        { action: 'Preview mapped data', satisfaction: 4, roles: ['Customer', 'Support'] },
        { action: 'Save mappings', satisfaction: 5, roles: ['Customer', 'Support'] },
      ],
    },
    {
      title: 'Activation',
      color: 'from-amber-50 to-amber-100/50 border-amber-200',
      steps: [
        { action: 'Enable integration', satisfaction: 5, roles: ['Customer'] },
        { action: 'Trigger first sync', satisfaction: 3, roles: ['Customer'] },
        { action: 'Wait for sync completion', satisfaction: 2, roles: ['Customer'] },
        { action: 'View success notification', satisfaction: 5, roles: ['Customer'] },
      ],
    },
    {
      title: 'Monitoring',
      color: 'from-pink-50 to-pink-100/50 border-pink-200',
      steps: [
        { action: 'Check dashboard', satisfaction: 5, roles: ['Customer'] },
        { action: 'View sync logs', satisfaction: 4, roles: ['Customer'] },
        { action: 'Investigate errors', satisfaction: 2, roles: ['Customer', 'Support'] },
        { action: 'Retry failed syncs', satisfaction: 3, roles: ['Customer'] },
        { action: 'Celebrate success', satisfaction: 5, roles: ['Customer'] },
      ],
    },
  ]

  const getSatisfactionColor = (score: number) => {
    if (score >= 5) return 'bg-emerald-500'
    if (score >= 4) return 'bg-blue-500'
    if (score >= 3) return 'bg-amber-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      {stages.map((stage, stageIdx) => (
        <div key={stage.title} className="relative">
          {stageIdx > 0 && (
            <div className="absolute -top-4 left-0 w-full flex items-center justify-center">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="absolute w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-border" />
            </div>
          )}
          
          <div className={`rounded-xl border-2 bg-gradient-to-br ${stage.color} p-5 shadow-sm`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/80 dark:bg-gray-800/80 flex items-center justify-center border border-white/80 dark:border-gray-700/80 shadow-sm">
                <span className="text-lg font-bold text-foreground">{stageIdx + 1}</span>
              </div>
              <h4 className="font-semibold text-base text-foreground">{stage.title}</h4>
            </div>
            
            <div className="space-y-2">
              {stage.steps.map((step, stepIdx) => (
                <div
                  key={stepIdx}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/80 dark:border-gray-700/80 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">{step.action}</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        {step.roles.map((role) => (
                          <span
                            key={role}
                            className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < step.satisfaction ? getSatisfactionColor(step.satisfaction) : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-medium text-muted-foreground ml-1 w-4">
                        {step.satisfaction}/5
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

