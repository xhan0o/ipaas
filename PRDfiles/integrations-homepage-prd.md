# PRD: Integrations Homepage

## Overview
Customer-facing page showing available integrations based on subscription

## User Persona
- Warehouse Manager / Operations Lead
- Need: Quick access to enable/configure integrations

## Key Features

### 1. Integration Grid
- **Layout**: Card-based grid (3-4 columns)
- **Each Card Shows**:
  - Integration logo
  - Integration name
  - Status badge (Active/Inactive/Available)
  - Category tag (ERP, Shipping, E-commerce, WMS)
  - "Configure" button

### 2. Filters & Search
- **Search bar**: Filter by integration name
- **Category filters**: All, ERP, Shipping, E-commerce, WMS, Marketplace
- **Status filters**: Active, Inactive, Available

### 3. Integration Status
- **Active**: Green badge, "Manage" button
- **Inactive**: Gray badge, "Enable" button  
- **Not Available**: Locked icon, "Upgrade Plan" button

## Sample Data

```
Integrations:
- Shopify (E-commerce) - Active
- NetSuite (ERP) - Active
- ShipStation (Shipping) - Inactive
- Amazon Seller Central (Marketplace) - Inactive
- SAP (ERP) - Not Available (Enterprise plan)
- WooCommerce (E-commerce) - Available
- FedEx (Shipping) - Available
- QuickBooks (ERP) - Active
```

## UX Flow
1. User lands on page → sees grid of integrations
2. Applies filter (e.g., "Shipping") → grid updates
3. Clicks "Configure" on inactive integration → opens configurator modal
4. Clicks "Manage" on active integration → opens settings page

## Success Metrics
- Time to find integration < 10 seconds
- Click-through rate on "Configure" button
- Number of integrations enabled per customer

## Edge Cases
- No integrations available for plan → Show upgrade CTA
- All integrations active → Show "All set" message
- Search returns no results → Show "Request integration" option
