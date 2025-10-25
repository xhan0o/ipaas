'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapperCanvas } from '@/components/mapper/mapper-canvas'
import { shopifyFieldMappings } from '@/lib/mock-data'
import { Save, Download, Upload, Sparkles, Wand2 } from 'lucide-react'

// Sample field definitions
const shopifyFields = [
  { id: 'order_id', name: 'order_id', type: 'String', required: true },
  { id: 'order_number', name: 'order_number', type: 'Number', required: true },
  { id: 'created_at', name: 'created_at', type: 'Date', required: true },
  { id: 'customer.first_name', name: 'customer.first_name', type: 'String', required: false },
  { id: 'customer.last_name', name: 'customer.last_name', type: 'String', required: false },
  { id: 'customer.email', name: 'customer.email', type: 'String', required: false },
  { id: 'line_items.sku', name: 'line_items.sku', type: 'String', required: true },
  { id: 'line_items.quantity', name: 'line_items.quantity', type: 'Number', required: true },
  { id: 'line_items.price', name: 'line_items.price', type: 'Number', required: true },
]

const hopstackFields = [
  { id: 'order_reference', name: 'order_reference', type: 'String', required: true },
  { id: 'order_date', name: 'order_date', type: 'Date', required: true },
  { id: 'customer_name', name: 'customer_name', type: 'String', required: true },
  { id: 'customer_email', name: 'customer_email', type: 'String', required: false },
  { id: 'items.product_sku', name: 'items.product_sku', type: 'String', required: true },
  { id: 'items.qty', name: 'items.qty', type: 'Number', required: true },
  { id: 'items.unit_price', name: 'items.unit_price', type: 'Number', required: true },
]

export default function MapperPage() {
  const [sourceAPI, setSourceAPI] = useState('Shopify Orders API')
  const [targetAPI, setTargetAPI] = useState('Hopstack Orders API')
  const [mappings, setMappings] = useState(shopifyFieldMappings)

  const handleSave = () => {
    console.log('Saving mappings:', mappings)
    // Show success toast
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
            <Badge variant="outline" className="border-primary/40 bg-primary/15 text-primary">
              Flow Studio
            </Badge>
            <span>Visual mapping workspace</span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Model field relationships
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Drag and drop to align upstream payloads with Hopstack&apos;s canonical data model. Apply transforms and validations before you ship.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="border-border/60">
            <Upload className="mr-2 h-4 w-4" />
            Load template
          </Button>
          <Button variant="outline" size="sm" className="border-border/60">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="shadow-soft-glow" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save mapping
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/60 bg-card/80 backdrop-blur">
          <div className="space-y-3 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Source integration
            </p>
            <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
              <label className="text-sm font-medium text-foreground">External system</label>
              <div className="relative mt-3">
                <select
                  value={sourceAPI}
                  onChange={event => setSourceAPI(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-border/60 bg-background/80 px-4 py-3 text-sm font-medium text-foreground shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option>Shopify Orders API</option>
                  <option>NetSuite Inventory API</option>
                  <option>Amazon Products API</option>
                </select>
                <Sparkles className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>
        </Card>
        <Card className="border-border/60 bg-card/80 backdrop-blur">
          <div className="space-y-3 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Target platform API
            </p>
            <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
              <label className="text-sm font-medium text-foreground">Hopstack domain</label>
              <div className="relative mt-3">
                <select
                  value={targetAPI}
                  onChange={event => setTargetAPI(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-border/60 bg-background/80 px-4 py-3 text-sm font-medium text-foreground shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option>Hopstack Orders API</option>
                  <option>Hopstack Inventory API</option>
                  <option>Hopstack Products API</option>
                </select>
                <Wand2 className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <MapperCanvas
        sourceFields={shopifyFields}
        targetFields={hopstackFields}
        mappings={mappings}
        onMappingsChange={setMappings}
      />

      <Card className="border-border/60 bg-card/80 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-6 p-6">
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Total mappings
              </p>
              <p className="mt-2 text-3xl font-semibold text-foreground">
                {mappings.length}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Required coverage
              </p>
              <p className="mt-2 text-3xl font-semibold text-foreground">
                {mappings.filter(m => m.required).length} / {hopstackFields.filter(f => f.required).length}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Transformations applied
              </p>
              <p className="mt-2 text-3xl font-semibold text-foreground">
                {mappings.filter(m => m.transformation).length}
              </p>
            </div>
          </div>
          <Badge
            variant={
              mappings.filter(m => m.required).length === hopstackFields.filter(f => f.required).length
                ? 'success'
                : 'warning'
            }
            className="rounded-full px-4 py-1 text-sm font-semibold"
          >
            {mappings.filter(m => m.required).length === hopstackFields.filter(f => f.required).length
              ? 'Ready to deploy'
              : 'Complete required fields'}
          </Badge>
        </div>
      </Card>
    </div>
  )
}
