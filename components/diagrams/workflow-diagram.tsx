'use client'

interface State {
  name: string
  description?: string
  substates?: { name: string; description?: string }[]
  color: string
  isEnd?: boolean
}

export function WorkflowDiagram() {
  const states: State[] = [
    {
      name: 'Workflow Started',
      description: 'User triggers sync',
      color: 'from-blue-50 to-blue-100/50 border-blue-200',
    },
    {
      name: 'Fetch Credentials',
      description: 'Load config',
      color: 'from-slate-50 to-slate-100/50 border-slate-200',
    },
    {
      name: 'Extract Data',
      description: 'Retry Policy: Max 3 attempts, exponential backoff',
      color: 'from-amber-50 to-amber-100/50 border-amber-200',
      substates: [
        { name: 'Call External API' },
        { name: 'Parse Response' },
        { name: 'Retry on Network Error' },
      ],
    },
    {
      name: 'Validate Data',
      description: 'Schema check, required fields, data types',
      color: 'from-purple-50 to-purple-100/50 border-purple-200',
      substates: [
        { name: 'Check Schema' },
        { name: 'Check Required Fields' },
        { name: 'Check Data Types' },
      ],
    },
    {
      name: 'Transform Data',
      description: 'Load mappings, apply transformations, enrich',
      color: 'from-indigo-50 to-indigo-100/50 border-indigo-200',
      substates: [
        { name: 'Load Mappings' },
        { name: 'Apply Field Mapping' },
        { name: 'Apply Transformations' },
        { name: 'Enrich Data' },
      ],
    },
    {
      name: 'Load to Platform',
      description: 'Retry Policy: Max 5 attempts, 2x backoff on 5xx errors',
      color: 'from-emerald-50 to-emerald-100/50 border-emerald-200',
      substates: [
        { name: 'Prepare Payload' },
        { name: 'Call Platform API' },
        { name: 'Verify Response' },
        { name: 'Retry on 5xx Error' },
      ],
    },
    {
      name: 'Update Sync State',
      description: 'Store last sync cursor, records processed, execution time',
      color: 'from-pink-50 to-pink-100/50 border-pink-200',
    },
    {
      name: 'Workflow Completed',
      description: 'Success ✓',
      color: 'from-green-50 to-green-100/50 border-green-300',
      isEnd: true,
    },
  ]

  return (
    <div className="space-y-4">
      {states.map((state, idx) => (
        <div key={state.name} className="relative">
          {/* Connector arrow */}
          {idx > 0 && !state.isEnd && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-2 bg-gradient-to-b from-transparent via-primary to-transparent" />
          )}
          
          <div className={`rounded-xl border-2 bg-gradient-to-br ${state.color} p-4 shadow-sm`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {state.isEnd ? (
                  <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-white/80 dark:bg-gray-800/80 flex items-center justify-center border border-white/80 dark:border-gray-700/80 shadow-sm">
                    <span className="text-xs font-bold text-foreground">{idx + 1}</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground mb-1">{state.name}</h4>
                {state.description && (
                  <p className="text-xs text-muted-foreground mb-3">{state.description}</p>
                )}
                
                {state.substates && (
                  <div className="mt-3 space-y-2">
                    {state.substates.map((substate, subIdx) => (
                      <div
                        key={subIdx}
                        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/80 dark:border-gray-700/80 text-xs font-medium text-foreground shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                          <span>{substate.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Error path (alternative) */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-sm flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-foreground mb-1">Workflow Failed</h4>
              <p className="text-xs text-muted-foreground">Error logged, state updated, notification sent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

