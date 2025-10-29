# PRD: Integration Dashboard

## Overview
High-level analytics and monitoring dashboard for integration health and performance

## User Persona
- Operations Manager (Monitor overall health)
- Customer Admin (Track usage)
- Executive (Business metrics)
- Need: Quick overview of integration status and trends

## Key Features

### 1. Overview Cards (Top Row)
- **Total Integrations**: Count (Active/Inactive/Total)
- **Success Rate**: Percentage (last 24h)
- **Total Records Synced**: Count (today)
- **Active Syncs**: Real-time count

### 2. Integration Health Status
- **List of all active integrations** with health indicator
- **Each item shows**:
  - Integration logo & name
  - Status: Healthy / Warning / Down
  - Last sync time
  - Success rate (24h)
  - Quick actions (View logs, Pause, Configure)

### 3. Activity Timeline Chart
- **Line chart**: Records synced over time
- **Time ranges**: 24h, 7d, 30d, 90d
- **Multiple lines**: One per integration (color-coded)
- **Hover**: Show exact count + timestamp
- **Toggle on/off** specific integrations

### 4. Error Trends
- **Bar chart**: Errors by integration (last 7 days)
- **Stacked by error type**: Auth, Timeout, Validation, etc.
- **Click on bar**: Drills down to error logs

### 5. Top Synced APIs
- **Horizontal bar chart**
- **Shows**: Top 10 most active API endpoints
- **Metrics**: Total calls, Avg response time
- **Sort by**: Volume or response time

### 6. Alerts & Issues
- **List of recent alerts**
- **Priority levels**: Critical, Warning, Info
- **Auto-dismiss** resolved issues
- **Click to view**: Opens logging screen filtered to issue

## Sample Data

```
OVERVIEW CARDS:
┌─────────────────────┬─────────────────────┬─────────────────────┬─────────────────────┐
│ Total Integrations  │ Success Rate        │ Records Synced      │ Active Syncs        │
│ 8 Active / 12 Total │ 98.5%              │ 12,547 (today)      │ 3 running now       │
└─────────────────────┴─────────────────────┴─────────────────────┴─────────────────────┘

INTEGRATION HEALTH:
┌────────────────────────────────────────────────────────────────┐
│ 🟢 Shopify          Healthy      Last sync: 2 min ago   99.8%  │
│ 🟢 NetSuite         Healthy      Last sync: 5 min ago   99.2%  │
│ 🟡 ShipStation      Warning      Last sync: 45 min ago  92.1%  │
│ 🟢 Amazon           Healthy      Last sync: 1 min ago   99.5%  │
│ 🔴 FedEx            Down         Last sync: 2 hrs ago   45.2%  │
│ 🟢 QuickBooks       Healthy      Last sync: 10 min ago  100%   │
│ 🟢 WooCommerce      Healthy      Last sync: 3 min ago   98.9%  │
│ 🟡 UPS              Warning      Last sync: 30 min ago  89.3%  │
└────────────────────────────────────────────────────────────────┘

ACTIVITY TIMELINE (Last 24 Hours):
    │
15k │     ╱╲
    │    ╱  ╲      ╱╲
10k │   ╱    ╲    ╱  ╲
    │  ╱      ╲  ╱    ╲
 5k │ ╱        ╲╱      ╲___
    │╱
    └─────────────────────────
     0h  6h  12h  18h  24h

TOP SYNCED APIS (Last 7 Days):
Shopify Orders        ████████████████ 45,231 calls
NetSuite Inventory    ███████████      28,542 calls
Amazon Products       ██████████       22,109 calls
ShipStation Shipments █████████        18,445 calls
QuickBooks Invoices   ████████         15,002 calls

ERROR TRENDS (Last 7 Days):
              Mon Tue Wed Thu Fri Sat Sun
Shopify       ▃   ▁   ▁   ▁   ▂   ▁   ▁
NetSuite      ▆   ▅   ▃   ▂   ▃   ▄   ▅
ShipStation   █   ▇   ▅   ▆   ▇   ▆   ▅  <-- High
FedEx         ██  ██  ██  ██  ██  ██  ██ <-- Critical
UPS           ▄   ▅   ▃   ▆   ▅   ▄   ▃

RECENT ALERTS:
🔴 Critical: FedEx API authentication failing (2 hours ago)
   → 156 shipments pending | [View Details] [Reconfigure]

🟡 Warning: ShipStation response time degraded (45 min ago)
   → Avg response: 3.2s (normal: 1.1s) | [View Logs]

🔵 Info: NetSuite rate limit approaching (1 hour ago)
   → 850/1000 calls used today | [Optimize Schedule]
```

## UX Flow
1. User navigates to Dashboard (landing page)
2. Sees overview cards with key metrics
3. Scrolls to Integration Health section
4. Notices FedEx is "Down" (red)
5. Clicks on FedEx row
6. Opens Integration Logging filtered to FedEx errors
7. Returns to dashboard
8. Reviews error trends chart
9. Sees FedEx has consistent failures all week
10. Clicks alert banner at top
11. Navigates to configuration to fix credentials

## Visual Design

### Health Indicators
- **Healthy (90-100%)**: Green circle 🟢
- **Warning (70-89%)**: Yellow circle 🟡
- **Down (<70%)**: Red circle 🔴
- **Paused**: Gray circle ⚪
- **Never synced**: Blue circle (new) 🔵

### Alert Colors
- **Critical**: Red background, white text
- **Warning**: Yellow background, black text
- **Info**: Blue background, white text

### Chart Colors
- Use distinct colors for each integration
- Consistent across all charts
- Color-blind friendly palette

## Refresh & Real-Time
- **Auto-refresh**: Every 60 seconds
- **Real-time updates**: WebSocket for active syncs
- **Manual refresh**: Button in top-right corner
- **Last updated**: Timestamp displayed

## Drill-Down Navigation
- **Click integration card** → Integration Logging (filtered)
- **Click chart data point** → Detail view for that time period
- **Click error bar** → Error logs for that integration
- **Click alert** → Relevant configuration or logs

## Widgets (Customizable)
- **Drag & drop** to reorder
- **Show/hide** specific widgets
- **Resize** (Small, Medium, Large)
- **Save layout** per user

## Export Options
- **PDF report**: Full dashboard snapshot
- **CSV export**: Raw data for each chart
- **Schedule reports**: Email daily/weekly summaries

## Filters
- **Date range**: Quick select or custom
- **Integration type**: E-commerce, ERP, Shipping, etc.
- **Status filter**: Show only Healthy/Warning/Down

## Mobile Responsiveness
- **Mobile view**: Stack widgets vertically
- **Simplified charts**: Key metrics only
- **Swipe navigation**: Between widgets
- **Push notifications**: For critical alerts

## Success Metrics
- Dashboard viewed daily by 80% of active customers
- Time to detect issues reduced by 70%
- Proactive issue resolution (before customer reports)

## Performance
- **Load time**: < 2 seconds
- **Chart render**: < 500ms
- **API data cache**: 5 minutes
- **Lazy load**: Below-the-fold widgets

## Accessibility
- **High contrast mode**
- **Keyboard shortcuts**: R (refresh), F (filters), E (export)
- **Screen reader**: Announces status changes
- **Alt text**: For all charts and graphs
