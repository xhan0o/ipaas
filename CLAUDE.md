# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an iPaaS (Integration Platform as a Service) project for Hopstack, a warehouse management platform. The system enables customers to connect and sync data between Hopstack and external platforms (e.g., Shopify, NetSuite, ShipStation, Amazon Seller Central).

**Current Status**: Planning phase - PRDs available in `/PRDfiles/`, no implementation code yet.

## Product Architecture (Planned)

### Core Modules

1. **Integrations Homepage** (`PRDfiles/integrations-homepage-prd.md`)
   - Customer-facing integration marketplace
   - Card-based grid showing available integrations by category (ERP, Shipping, E-commerce, WMS, Marketplace)
   - Integration status: Active, Inactive, Available (based on subscription tier)
   - Search and category/status filters

2. **Integration Dashboard** (`PRDfiles/integration-dashboard-prd.md`)
   - Analytics and monitoring hub for integration health
   - Key metrics: success rate, records synced, active syncs
   - Real-time health indicators (Healthy/Warning/Down based on success rate thresholds)
   - Activity timeline charts, error trends, top synced APIs
   - Auto-refresh every 60 seconds, WebSocket support for real-time updates

3. **Integration Configurator** (`PRDfiles/integration-configurator-prd.md`)
   - Per-integration credential and API endpoint setup
   - Dynamic forms based on integration type (API keys, secrets, base URLs, environment toggles)
   - Test connection functionality before saving
   - Secure credential storage (encrypted, masked inputs)

4. **Integration Mapper** (`PRDfiles/integration-mapper-prd.md`)
   - Visual no-code field mapping interface
   - Split-screen layout: External API fields (left) → Hopstack fields (right)
   - Drag-and-drop or click-to-connect mapping
   - Transformation layer: date formatting, concatenation, splits, math, conditionals, lookups
   - Template system for reusable mappings

5. **Integration Logging** (`PRDfiles/integration-logging-prd.md`)
   - Activity monitoring and debugging interface
   - Detailed request/response logs with status codes, duration, error messages
   - Real-time updates with auto-refresh (30s intervals)
   - Filters: time range, status, integration, API endpoint, keyword search
   - Bulk actions: retry failed logs, export logs (CSV/JSON)

### Key Design Patterns

**Data Flow**:
```
External System API → Configurator (credentials) → Mapper (field transformations) → Hopstack Platform → Logging (observability)
```

**Health Status Logic**:
- Healthy: 90-100% success rate (green 🟢)
- Warning: 70-89% success rate (yellow 🟡)
- Down: <70% success rate (red 🔴)

**Security Requirements**:
- All credentials encrypted at rest
- Masked input fields for secrets
- Request logs must redact authentication headers
- Auto-logout after 15 minutes of inactivity on configurator

**Real-time Features**:
- Dashboard: 60-second auto-refresh + WebSocket for active syncs
- Logging: 30-second auto-refresh + toast notifications for failures

### Integration Examples (from PRDs)

Common integrations to support:
- **E-commerce**: Shopify, WooCommerce, Amazon Seller Central
- **ERP**: NetSuite, SAP, QuickBooks
- **Shipping**: ShipStation, FedEx, UPS
- **WMS**: Various warehouse management systems

### Performance Requirements

- Dashboard load time: <2 seconds
- Chart render time: <500ms
- Logging pagination: 50 entries per page
- Log retention: 90 days (archive older logs)

### Accessibility Requirements

- Keyboard navigation support (Tab, Arrow keys, shortcuts)
- Screen reader compatibility
- High contrast mode
- Color-blind friendly indicators (use icons + colors)
- Alt text for charts and graphs

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000 or next available port)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

**Note**: The app uses Node.js 18+ (create-next-app requires 20+ but the built app runs on 18+)

## Field Mapping Transformation Rules

When implementing the mapper transformation layer:
- Date format conversions must be bidirectional
- Type mismatches (String → Number) should auto-suggest transformations
- Prevent circular mappings in validation
- All required platform fields must be mapped before saving
- Connection line color coding:
  - Blue: Direct mapping (same type)
  - Orange: Type conversion
  - Green: Custom transformation applied
  - Red: Error/incompatible

## Error Categories for Logging

Standardize error categorization:
- Authentication errors (401, 403)
- Rate limiting (429)
- Timeout (504)
- Data validation (400)
- Not found (404)
- Server errors (500, 502, 503)
- Mapping errors (custom validation failures)

## Testing Strategy

When implementing tests, ensure coverage for:
- Credential validation and secure storage
- Field mapping transformations (all types)
- Connection line logic and validation rules
- Real-time sync status updates
- Retry logic for failed operations
- Log filtering and search functionality
