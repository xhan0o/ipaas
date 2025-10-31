import {
  Integration,
  IntegrationHealth,
  DashboardMetrics,
  ActivityData,
  Alert,
  LogEntry,
  FieldMapping,
} from '@/types/integrations'

// Integrations List
export const integrations: Integration[] = [
  {
    id: 'shopify',
    name: 'Shopify',
    logo: '🛍️',
    category: 'E-commerce',
    status: 'active',
    description: 'Sync orders, products, and inventory from Shopify',
    availableAPIs: ['Orders API', 'Products API', 'Inventory API', 'Customers API', 'Fulfillments API']
  },
  {
    id: 'netsuite',
    name: 'NetSuite',
    logo: '📊',
    category: 'ERP',
    status: 'active',
    description: 'Enterprise resource planning integration',
    availableAPIs: ['Inventory API', 'Orders API', 'Customers API', 'Invoices API']
  },
  {
    id: 'shipstation',
    name: 'ShipStation',
    logo: '📦',
    category: 'Shipping',
    status: 'inactive',
    description: 'Shipping and fulfillment management',
    availableAPIs: ['Shipments API', 'Tracking API', 'Carriers API']
  },
  {
    id: 'amazon',
    name: 'Amazon Seller Central',
    logo: '📦',
    category: 'Marketplace',
    status: 'active',
    description: 'Amazon marketplace integration',
    availableAPIs: ['Products API', 'Orders API', 'Inventory API', 'Reports API']
  },
  {
    id: 'sap',
    name: 'SAP',
    logo: '🏢',
    category: 'ERP',
    status: 'not_available',
    description: 'SAP ERP integration (Enterprise plan required)',
    availableAPIs: []
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    logo: '🛒',
    category: 'E-commerce',
    status: 'available',
    description: 'WordPress e-commerce platform',
    availableAPIs: ['Orders API', 'Products API', 'Customers API']
  },
  {
    id: 'fedex',
    name: 'FedEx',
    logo: '✈️',
    category: 'Shipping',
    status: 'active',
    description: 'FedEx shipping integration',
    availableAPIs: ['Shipping API', 'Tracking API', 'Rates API']
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    logo: '💰',
    category: 'ERP',
    status: 'active',
    description: 'Accounting and financial management',
    availableAPIs: ['Invoices API', 'Customers API', 'Products API']
  },
  {
    id: 'ups',
    name: 'UPS',
    logo: '📮',
    category: 'Shipping',
    status: 'active',
    description: 'UPS shipping and tracking',
    availableAPIs: ['Shipping API', 'Tracking API', 'Address Validation API']
  },
  {
    id: 'magento',
    name: 'Magento',
    logo: '🏬',
    category: 'E-commerce',
    status: 'available',
    description: 'Magento e-commerce platform',
    availableAPIs: ['Orders API', 'Products API', 'Inventory API']
  },
  {
    id: 'odoo',
    name: 'Odoo',
    logo: '🔧',
    category: 'ERP',
    status: 'inactive',
    description: 'Open-source ERP system',
    availableAPIs: ['Products API', 'Sales API', 'Inventory API']
  },
  {
    id: 'bigcommerce',
    name: 'BigCommerce',
    logo: '🏪',
    category: 'E-commerce',
    status: 'available',
    description: 'BigCommerce e-commerce platform',
    availableAPIs: ['Orders API', 'Products API', 'Customers API']
  },
]

// Dashboard Metrics
export const dashboardMetrics: DashboardMetrics = {
  totalIntegrations: 12,
  activeIntegrations: 6,
  successRate: 94.5,
  recordsSyncedToday: 12547,
  activeSyncs: 3
}

// Integration Health Status
export const integrationHealth: IntegrationHealth[] = [
  {
    integrationId: 'shopify',
    integrationName: 'Shopify',
    logo: '🛍️',
    status: 'healthy',
    successRate: 99.8,
    lastSync: new Date(Date.now() - 2 * 60 * 1000), // 2 min ago
    recordsSynced: 1250
  },
  {
    integrationId: 'netsuite',
    integrationName: 'NetSuite',
    logo: '📊',
    status: 'healthy',
    successRate: 99.2,
    lastSync: new Date(Date.now() - 5 * 60 * 1000), // 5 min ago
    recordsSynced: 850
  },
  {
    integrationId: 'shipstation',
    integrationName: 'ShipStation',
    logo: '📦',
    status: 'warning',
    successRate: 87.1,
    lastSync: new Date(Date.now() - 45 * 60 * 1000), // 45 min ago
    recordsSynced: 320
  },
  {
    integrationId: 'amazon',
    integrationName: 'Amazon',
    logo: '📦',
    status: 'healthy',
    successRate: 99.5,
    lastSync: new Date(Date.now() - 1 * 60 * 1000), // 1 min ago
    recordsSynced: 2100
  },
  {
    integrationId: 'fedex',
    integrationName: 'FedEx',
    logo: '✈️',
    status: 'down',
    successRate: 45.2,
    lastSync: new Date(Date.now() - 120 * 60 * 1000), // 2 hrs ago
    recordsSynced: 0
  },
  {
    integrationId: 'quickbooks',
    integrationName: 'QuickBooks',
    logo: '💰',
    status: 'healthy',
    successRate: 100,
    lastSync: new Date(Date.now() - 10 * 60 * 1000), // 10 min ago
    recordsSynced: 540
  },
  {
    integrationId: 'ups',
    integrationName: 'UPS',
    logo: '📮',
    status: 'warning',
    successRate: 89.3,
    lastSync: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
    recordsSynced: 180
  },
]

// Activity Timeline Data (Last 24 hours)
export const activityData: ActivityData[] = [
  { timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), integrationId: 'shopify', recordCount: 120 },
  { timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000), integrationId: 'shopify', recordCount: 250 },
  { timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000), integrationId: 'shopify', recordCount: 350 },
  { timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), integrationId: 'shopify', recordCount: 280 },
  { timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000), integrationId: 'amazon', recordCount: 420 },
  { timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000), integrationId: 'amazon', recordCount: 380 },
  { timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), integrationId: 'netsuite', recordCount: 150 },
  { timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), integrationId: 'netsuite', recordCount: 200 },
  { timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), integrationId: 'shopify', recordCount: 300 },
  { timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), integrationId: 'quickbooks', recordCount: 100 },
  { timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), integrationId: 'amazon', recordCount: 450 },
  { timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), integrationId: 'ups', recordCount: 80 },
]

// Alerts
export const alerts: Alert[] = [
  {
    id: 'alert-1',
    integrationId: 'fedex',
    integrationName: 'FedEx',
    priority: 'critical',
    message: 'FedEx API authentication failing - 156 shipments pending',
    timestamp: new Date(Date.now() - 120 * 60 * 1000),
    resolved: false
  },
  {
    id: 'alert-2',
    integrationId: 'shipstation',
    integrationName: 'ShipStation',
    priority: 'warning',
    message: 'Response time degraded - Avg: 3.2s (normal: 1.1s)',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    resolved: false
  },
  {
    id: 'alert-3',
    integrationId: 'netsuite',
    integrationName: 'NetSuite',
    priority: 'info',
    message: 'Rate limit approaching - 850/1000 calls used today',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    resolved: false
  },
]

// Log Entries
export const logEntries: LogEntry[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    integrationId: 'shopify',
    integrationName: 'Shopify',
    logo: '🛍️',
    apiEndpoint: 'Orders API → Platform Orders',
    status: 'success',
    recordsProcessed: 25,
    totalRecords: 25,
    duration: 1243,
    requestDetails: {
      method: 'GET',
      url: 'https://api.shopify.com/admin/orders.json',
      headers: { 'Content-Type': 'application/json' },
    },
    responseDetails: {
      statusCode: 200,
      body: { orders: [] }
    }
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    integrationId: 'netsuite',
    integrationName: 'NetSuite',
    logo: '📊',
    apiEndpoint: 'Inventory API → Platform Inventory',
    status: 'failed',
    recordsProcessed: 0,
    totalRecords: 150,
    duration: 15002,
    error: 'Connection timeout after 15s',
    requestDetails: {
      method: 'GET',
      url: 'https://api.netsuite.com/v1/inventory/items',
      headers: { 'Content-Type': 'application/json' },
    },
    responseDetails: {
      statusCode: 504,
      body: { error: 'Gateway timeout' }
    }
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    integrationId: 'shipstation',
    integrationName: 'ShipStation',
    logo: '📦',
    apiEndpoint: 'Shipments API → Platform Fulfillments',
    status: 'partial',
    recordsProcessed: 47,
    totalRecords: 50,
    duration: 2567,
    error: '3 shipments missing tracking number',
    requestDetails: {
      method: 'GET',
      url: 'https://api.shipstation.com/shipments',
      headers: { 'Content-Type': 'application/json' },
    },
    responseDetails: {
      statusCode: 200,
    }
  },
  {
    id: 'log-4',
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
    integrationId: 'amazon',
    integrationName: 'Amazon',
    logo: '📦',
    apiEndpoint: 'Products API → Platform Products',
    status: 'pending',
    recordsProcessed: 0,
    totalRecords: 200,
    duration: 0,
  },
  {
    id: 'log-5',
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    integrationId: 'quickbooks',
    integrationName: 'QuickBooks',
    logo: '💰',
    apiEndpoint: 'Invoices API → Platform Invoices',
    status: 'success',
    recordsProcessed: 42,
    totalRecords: 42,
    duration: 856,
    requestDetails: {
      method: 'GET',
      url: 'https://api.quickbooks.com/v3/invoice',
      headers: { 'Content-Type': 'application/json' },
    },
    responseDetails: {
      statusCode: 200,
    }
  },
  {
    id: 'log-6',
    timestamp: new Date(Date.now() - 35 * 60 * 1000),
    integrationId: 'fedex',
    integrationName: 'FedEx',
    logo: '✈️',
    apiEndpoint: 'Shipping API → Platform Shipments',
    status: 'failed',
    recordsProcessed: 0,
    totalRecords: 30,
    duration: 2100,
    error: 'Authentication failed - Invalid API credentials',
    requestDetails: {
      method: 'POST',
      url: 'https://api.fedex.com/ship/v1/shipments',
      headers: { 'Content-Type': 'application/json' },
    },
    responseDetails: {
      statusCode: 401,
      body: { error: 'Unauthorized' }
    }
  },
]

// Field Mappings for Shopify
export const shopifyFieldMappings: FieldMapping[] = [
  {
    sourceField: 'order_id',
    targetField: 'order_reference',
    dataType: 'String',
    required: true
  },
  {
    sourceField: 'created_at',
    targetField: 'order_date',
    dataType: 'Date',
    transformation: 'formatDate',
    required: true
  },
  {
    sourceField: 'customer.first_name + customer.last_name',
    targetField: 'customer_name',
    dataType: 'String',
    transformation: 'concatenate',
    required: true
  },
  {
    sourceField: 'customer.email',
    targetField: 'customer_email',
    dataType: 'String',
    required: false
  },
  {
    sourceField: 'line_items.sku',
    targetField: 'items.product_sku',
    dataType: 'String',
    required: true
  },
  {
    sourceField: 'line_items.quantity',
    targetField: 'items.qty',
    dataType: 'Number',
    required: true
  },
  {
    sourceField: 'line_items.price',
    targetField: 'items.unit_price',
    dataType: 'Number',
    required: true
  },
]
