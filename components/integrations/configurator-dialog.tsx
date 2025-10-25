'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Integration } from '@/types/integrations'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'

interface ConfiguratorDialogProps {
  integration: Integration | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConfiguratorDialog({
  integration,
  open,
  onOpenChange,
}: ConfiguratorDialogProps) {
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null)
  const [selectedAPIs, setSelectedAPIs] = useState<string[]>([])

  if (!integration) return null

  const handleTest = async () => {
    setTesting(true)
    setTestResult(null)

    // Simulate API test
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Random success/failure for demo
    setTestResult(integration.status === 'active' ? 'success' : 'error')
    setTesting(false)
  }

  const toggleAPI = (api: string) => {
    setSelectedAPIs((prev) =>
      prev.includes(api) ? prev.filter((a) => a !== api) : [...prev, api]
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{integration.logo}</span>
            <div>
              <DialogTitle>{integration.name} Configuration</DialogTitle>
              <DialogDescription>
                Configure credentials and select APIs to enable
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Credentials Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Credentials</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <Input
                placeholder="Enter your API key"
                defaultValue={
                  integration.status === 'active' ? 'sk_test_xxxxxxxxxxxxx' : ''
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">API Secret</label>
              <Input
                type="password"
                placeholder="Enter your API secret"
                defaultValue={integration.status === 'active' ? '••••••••••••••' : ''}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Environment</label>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent"
                >
                  Sandbox
                </Badge>
                <Badge
                  variant="default"
                  className="cursor-pointer"
                >
                  Production
                </Badge>
              </div>
            </div>
          </div>

          {/* Available APIs Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Available APIs</h3>
            <div className="space-y-2">
              {integration.availableAPIs?.map((api) => (
                <label
                  key={api}
                  className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={selectedAPIs.includes(api)}
                    onChange={() => toggleAPI(api)}
                  />
                  <span className="text-sm">{api}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Test Connection */}
          <div className="space-y-3">
            <Button
              onClick={handleTest}
              disabled={testing}
              variant="outline"
              className="w-full"
            >
              {testing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {testing ? 'Testing Connection...' : 'Test Connection'}
            </Button>

            {testResult === 'success' && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span>Connection successful! All systems operational.</span>
              </div>
            )}

            {testResult === 'error' && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <XCircle className="h-4 w-4" />
                <span>Connection failed. Please check your credentials.</span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            // Save logic here
            onOpenChange(false)
          }}>
            Save & Enable
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
