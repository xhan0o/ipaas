'use client'

interface Phase {
  title: string
  description: string
  steps: string[]
  color: string
}

export function DataFlowDiagram() {
  const phases: Phase[] = [
    {
      title: 'Extract',
      description: 'Trigger events and fetch data via authenticated API calls',
      color: 'from-amber-50 to-amber-100/50 border-amber-200',
      steps: ['Trigger Event', 'Fetch Data', 'Raw Data'],
    },
    {
      title: 'Transform',
      description: 'Validate schemas, apply field mappings, execute transformations',
      color: 'from-purple-50 to-purple-100/50 border-purple-200',
      steps: ['Validate Data', 'Field Mapper', 'Enrich Data'],
    },
    {
      title: 'Load',
      description: 'Final validation, load to platform via API, handle responses',
      color: 'from-emerald-50 to-emerald-100/50 border-emerald-200',
      steps: ['Final Validation', 'Load to Platform', 'API Response'],
    },
    {
      title: 'Post-Process',
      description: 'Log results, update state, and notify users',
      color: 'from-pink-50 to-pink-100/50 border-pink-200',
      steps: ['Log Result', 'Update State', 'Notify'],
    },
  ]

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
        {phases.map((phase, idx) => (
          <div key={phase.title} className="flex-shrink-0 flex items-start gap-4 min-w-0">
            {/* Arrow connector */}
            {idx > 0 && (
              <div className="hidden md:block mt-8 flex-shrink-0">
                <div className="w-8 h-0.5 bg-gradient-to-r from-border via-primary/50 to-transparent" />
                <div className="absolute mt-[-4px] ml-6 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-primary/50" />
              </div>
            )}
            
            <div className={`flex-1 rounded-xl border-2 bg-gradient-to-br ${phase.color} p-4 shadow-sm min-w-[240px]`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-white/80 dark:bg-gray-800/80 flex items-center justify-center border border-white/80 dark:border-gray-700/80 shadow-sm">
                  <span className="text-sm font-bold text-foreground">{idx + 1}</span>
                </div>
                <h4 className="font-semibold text-sm text-foreground">{phase.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{phase.description}</p>
              <div className="space-y-2">
                {phase.steps.map((step) => (
                  <div
                    key={step}
                    className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/80 dark:border-gray-700/80 text-xs font-medium text-foreground shadow-sm"
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile arrows */}
      <div className="md:hidden space-y-2 mt-4">
        {phases.slice(0, -1).map((_, idx) => (
          <div key={idx} className="flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

