# PRD: Integration Logging Screen

## Overview
Monitor integration activity, errors, and performance for debugging and observability

## User Persona
- Implementation Engineer (Internal debugging)
- Customer Success (Customer support)
- Customer Admin (Self-service troubleshooting)
- Need: Quickly identify and resolve integration issues

## Key Features

### 1. Log List View
- **Table layout** with sortable columns
- **Columns**:
  - Timestamp
  - Integration name (with logo)
  - API endpoint
  - Status (Success/Failed/Pending)
  - Records processed
  - Duration (ms)
  - Actions (View details, Retry)

### 2. Filters
- **Time range**: Last hour, 24h, 7 days, 30 days, Custom
- **Status**: All, Success, Failed, Pending
- **Integration**: Multi-select dropdown
- **API endpoint**: Multi-select dropdown
- **Search**: By order ID, SKU, error message

### 3. Log Detail View
- **Click on row** → Expand inline OR open modal
- **Request Details**:
  - HTTP method & URL
  - Headers (sanitized, no auth tokens)
  - Request body (formatted JSON)
- **Response Details**:
  - Status code
  - Response time
  - Response body
  - Error message (if failed)
- **Mapped Data**:
  - Source fields → Platform fields
  - Transformation applied
  - Final payload sent to platform

### 4. Real-Time Updates
- **Auto-refresh** every 30 seconds (toggle on/off)
- **Live indicator** for active syncs
- **Toast notifications** for new failures

### 5. Bulk Actions
- **Retry failed logs** (checkbox select)
- **Export logs** (CSV, JSON)
- **Mark as resolved**

## Sample Data

```
Log Entries:

1. 
Timestamp: 2025-10-29 14:23:15
Integration: Shopify
API: Orders API → Platform Orders
Status: ✓ Success
Records: 25 orders processed
Duration: 1,243ms
Details: 25 orders synced successfully

2.
Timestamp: 2025-10-29 14:20:08
Integration: NetSuite
API: Inventory API → Platform Inventory
Status: ✗ Failed
Records: 0/150 processed
Duration: 15,002ms (timeout)
Error: "Connection timeout after 15s"
Actions: [Retry] [View Details]

3.
Timestamp: 2025-10-29 14:18:32
Integration: ShipStation
API: Shipments API → Platform Fulfillments
Status: ⚠ Partial Success
Records: 47/50 processed (3 failed)
Duration: 2,567ms
Error: "3 shipments missing tracking number"
Actions: [View Failed Items] [Retry Failed]

4.
Timestamp: 2025-10-29 14:15:01
Integration: Amazon Seller Central
API: Products API → Platform Products
Status: ⏳ Pending
Records: Processing...
Duration: -
```

## Detailed Log Example

```
LOG ID: #12847
Timestamp: 2025-10-29 14:20:08 UTC
Integration: NetSuite ERP
Direction: NetSuite → Platform
Status: Failed ✗

REQUEST:
GET https://api.netsuite.com/v1/inventory/items
Headers:
  Authorization: Bearer [REDACTED]
  Content-Type: application/json
Query Params:
  limit: 150
  lastModified: 2025-10-29T14:00:00Z

RESPONSE:
Status: 504 Gateway Timeout
Duration: 15,002ms
Body: {
  "error": "Gateway timeout",
  "message": "Upstream server did not respond within 15s"
}

ERROR DETAILS:
- NetSuite API taking longer than expected
- Possible causes: High NetSuite load, network issues
- Recommended: Reduce batch size, retry in 5 minutes

AFFECTED DATA:
- 150 inventory items pending sync
- Last successful sync: 2 hours ago

SUGGESTED ACTIONS:
[Retry Now] [Reduce Batch Size] [Contact NetSuite Support]
```

## UX Flow
1. User navigates to Logging screen
2. Sees list of recent integration activities
3. Applies filter (e.g., "Failed" + "Last 24h")
4. Clicks on failed log entry
5. Reviews request/response details
6. Clicks "Retry" button
7. System re-attempts sync
8. Log updates to "Success" or shows new error

## Visual Design

### Status Indicators
- **Success**: Green checkmark ✓
- **Failed**: Red X ✗
- **Partial**: Yellow warning ⚠
- **Pending**: Blue spinner ⏳
- **Retrying**: Orange refresh ↻

### Color Coding
- Success row: Light green background
- Failed row: Light red background
- Warning row: Light yellow background
- Clickable rows: Hover state with darker background

## Error Categories
- **Authentication errors** (401, 403)
- **Rate limiting** (429)
- **Timeout** (504)
- **Data validation** (400)
- **Not found** (404)
- **Server errors** (500, 502, 503)
- **Mapping errors** (Custom)

## Alerts & Notifications
- **Email alert** when error rate > 10% in 1 hour
- **Slack notification** for critical failures
- **In-app badge** showing unresolved error count

## Performance Considerations
- **Pagination**: 50 logs per page
- **Lazy load** detail view
- **Index by timestamp** for fast queries
- **Archive logs** older than 90 days

## Success Metrics
- Time to identify error < 2 minutes
- 80% of errors resolved via self-service
- Reduce support tickets related to integration issues by 60%

## Accessibility
- Color-blind friendly status indicators (icons + colors)
- Keyboard navigation (Tab through logs)
- Screen reader announces status changes
- High contrast mode support
