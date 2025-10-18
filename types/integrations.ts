export type IntegrationCategory = 'ERP' | 'Shipping' | 'E-commerce' | 'WMS' | 'Marketplace'
export type IntegrationStatus = 'active' | 'inactive' | 'available' | 'not_available'
export type HealthStatus = 'healthy' | 'warning' | 'down' | 'paused'
export type LogStatus = 'success' | 'failed' | 'partial' | 'pending'
export type ErrorCategory = 'auth' | 'timeout' | 'validation' | 'not_found' | 'server' | 'rate_limit' | 'mapping'

export interface Integration {
  id: string
  name: string
  logo: string
  category: IntegrationCategory
  status: IntegrationStatus
  description: string
  availableAPIs?: string[]
}

export interface IntegrationHealth {
  integrationId: string
  integrationName: string
  logo: string
  status: HealthStatus
  successRate: number
  lastSync: Date
  recordsSynced: number
}

export interface DashboardMetrics {
  totalIntegrations: number
  activeIntegrations: number
  successRate: number
  recordsSyncedToday: number
  activeSyncs: number
}

export interface ActivityData {
  timestamp: Date
  integrationId: string
  recordCount: number
}

export interface ErrorTrend {
  integrationId: string
  date: Date
  errorCount: number
  errorType: ErrorCategory
}

export interface Alert {
  id: string
  integrationId: string
  integrationName: string
  priority: 'critical' | 'warning' | 'info'
  message: string
  timestamp: Date
  resolved: boolean
}

export interface LogEntry {
  id: string
  timestamp: Date
  integrationId: string
  integrationName: string
  logo: string
  apiEndpoint: string
  status: LogStatus
  recordsProcessed: number
  totalRecords: number
  duration: number
  error?: string
  requestDetails?: {
    method: string
    url: string
    headers: Record<string, string>
    body?: any
  }
  responseDetails?: {
    statusCode: number
    body?: any
  }
}

export interface FieldMapping {
  sourceField: string
  targetField: string
  dataType: string
  transformation?: string
  required: boolean
}

export interface IntegrationConfig {
  integrationId: string
  credentials: {
    apiKey?: string
    apiSecret?: string
    baseUrl?: string
    accountId?: string
    environment: 'sandbox' | 'production'
  }
  enabledAPIs: string[]
  fieldMappings: FieldMapping[]
}
