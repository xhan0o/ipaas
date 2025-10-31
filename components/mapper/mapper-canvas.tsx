'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FieldMapping } from '@/types/integrations'
import { ArrowRight, Trash2, Wand2 } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Field {
  id: string
  name: string
  type: string
  required: boolean
}

interface MapperCanvasProps {
  sourceFields: Field[]
  targetFields: Field[]
  mappings: FieldMapping[]
  onMappingsChange: (mappings: FieldMapping[]) => void
}

export function MapperCanvas({
  sourceFields,
  targetFields,
  mappings,
  onMappingsChange,
}: MapperCanvasProps) {
  const [draggedField, setDraggedField] = useState<Field | null>(null)
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null)

  const handleDragStart = (field: Field) => {
    setDraggedField(field)
  }

  const handleDragEnd = () => {
    setDraggedField(null)
    setHoveredTarget(null)
  }

  const handleDrop = (targetField: Field) => {
    if (!draggedField) return

    // Check if mapping already exists
    const existingIndex = mappings.findIndex(
      m => m.targetField === targetField.id
    )

    const newMapping: FieldMapping = {
      sourceField: draggedField.id,
      targetField: targetField.id,
      dataType: targetField.type,
      required: targetField.required,
    }

    if (existingIndex >= 0) {
      // Update existing mapping
      const updated = [...mappings]
      updated[existingIndex] = newMapping
      onMappingsChange(updated)
    } else {
      // Add new mapping
      onMappingsChange([...mappings, newMapping])
    }

    setDraggedField(null)
    setHoveredTarget(null)
  }

  const handleRemoveMapping = (targetField: string) => {
    onMappingsChange(mappings.filter(m => m.targetField !== targetField))
  }

  const isMapped = (fieldId: string) => {
    return mappings.some(m => m.targetField === fieldId)
  }

  const getMapping = (targetFieldId: string) => {
    return mappings.find(m => m.targetField === targetFieldId)
  }

  const typeClassMap: Record<string, string> = {
    String: 'border-sky-400/40 bg-sky-500/10 text-sky-600 dark:text-sky-200',
    Number: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-200',
    Date: 'border-violet-400/40 bg-violet-500/10 text-violet-600 dark:text-violet-200',
    Boolean: 'border-amber-400/40 bg-amber-500/10 text-amber-600 dark:text-amber-200',
  }

  const getTypeColor = (type: string) => {
    return typeClassMap[type] || 'border-slate-400/40 bg-slate-500/10 text-slate-600 dark:text-slate-200'
  }

  return (
    <Card className="border-border/60 bg-card/90 backdrop-blur">
      <div className="grid gap-8 p-6 lg:grid-cols-[1fr,auto,1fr]">
        {/* Source Fields */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Source fields
            </h3>
            <Badge variant="outline" className="rounded-full border-border/60 text-xs">
              {sourceFields.length} fields
            </Badge>
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {sourceFields.map((field) => (
              <div
                key={field.id}
                draggable
                onDragStart={() => handleDragStart(field)}
                onDragEnd={handleDragEnd}
                className="group cursor-move rounded-2xl border border-border/60 bg-background/70 p-3 transition hover:border-primary/40 hover:bg-primary/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium text-foreground">
                        {field.name}
                      </span>
                      {field.required && (
                        <span className="text-xs text-rose-400">• required</span>
                      )}
                    </div>
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                        getTypeColor(field.type)
                      )}
                    >
                      {field.type}
                    </span>
                  </div>
                  <div className="opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connection Indicator */}
        <div className="hidden items-center justify-center lg:flex">
          <div className="h-full w-px bg-border" />
        </div>

        {/* Target Fields */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Target fields · Platform
            </h3>
            <Badge variant="outline" className="rounded-full border-border/60 text-xs">
              {targetFields.length} fields
            </Badge>
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {targetFields.map((field) => {
              const mapping = getMapping(field.id)
              const isHovered = hoveredTarget === field.id

              return (
                <div
                  key={field.id}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setHoveredTarget(field.id)
                  }}
                  onDragLeave={() => setHoveredTarget(null)}
                  onDrop={() => handleDrop(field)}
                  className={cn(
                    'rounded-2xl border border-border/60 bg-background/70 p-3 transition hover:border-primary/40 hover:bg-primary/10',
                    isMapped(field.id) && 'border-emerald-400/60 bg-emerald-500/10 shadow-soft-glow',
                    !isMapped(field.id) && isHovered && 'border-sky-400/60 bg-sky-500/10'
                  )}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium text-foreground">
                            {field.name}
                          </span>
                          {field.required && (
                            <span className="text-xs text-rose-400">• required</span>
                          )}
                        </div>
                        <span
                          className={cn(
                            'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                            getTypeColor(field.type)
                          )}
                        >
                          {field.type}
                        </span>
                      </div>
                      {mapping && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={event => {
                            event.stopPropagation()
                            handleRemoveMapping(field.id)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>

                    {mapping && (
                      <div className="mt-3 rounded-xl border border-border/40 bg-background/70 p-3">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <ArrowRight className="h-3.5 w-3.5 text-primary" />
                          <span className="font-mono text-sm text-foreground">
                            {mapping.sourceField}
                          </span>
                          {mapping.transformation && (
                            <Badge variant="secondary" className="gap-1 rounded-full border border-border/30 bg-secondary/40 text-[10px] uppercase">
                              <Wand2 className="h-3 w-3" />
                              {mapping.transformation}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Card>
  )
}
