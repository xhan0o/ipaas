# PRD: Integration Configurator

## Overview
Screen to configure individual integration credentials and settings

## User Persona
- IT Admin / Operations Manager
- Need: Set up integration credentials securely and test connectivity

## Key Features

### 1. Configuration Form
- **Dynamic fields based on integration type**
- **Common fields**:
  - API Key / Token
  - API Secret (masked input)
  - Environment (Sandbox/Production toggle)
  - Base URL (if applicable)
  - Account ID / Store Name

### 2. API Endpoints Selection
- **Checkbox list of available APIs**
- **Example for Shopify**:
  - ☑ Orders API
  - ☑ Products API
  - ☑ Inventory API
  - ☐ Customers API
  - ☐ Fulfillments API
- **Select All / Deselect All** buttons

### 3. Test Connection
- **Test button** (prominent, CTA style)
- **States**:
  - Default: "Test Connection"
  - Loading: "Testing..." with spinner
  - Success: Green checkmark + "Connection successful"
  - Failure: Red X + Error message

### 4. Save & Enable
- **Save button**: Stores credentials (encrypted)
- **Enable toggle**: Activates integration
- **Auto-save draft** every 30 seconds

## Sample Data - Shopify Configuration

```
Integration: Shopify
Fields:
- Store Name: "mystore.myshopify.com"
- API Key: "shpat_xxxxxxxxxxxxx"
- API Secret: "•••••••••••••••"
- Environment: Production (toggle)

Available APIs:
✓ Orders API - Fetch new orders
✓ Products API - Sync product catalog
✓ Inventory API - Update stock levels
□ Customers API - Customer data
□ Fulfillments API - Shipment tracking

Test Result:
✓ Connection successful
✓ Orders API: 150 orders found
✓ Products API: 523 products found
✓ Inventory API: Synced
```

## UX Flow
1. User clicks "Configure" from homepage
2. Modal/page opens with integration-specific form
3. User fills credentials
4. Clicks "Test Connection"
5. System validates → Shows success/error
6. User selects required APIs
7. Clicks "Save & Enable"
8. Returns to homepage with "Active" status

## Validation Rules
- All required fields must be filled
- API credentials must pass test before saving
- Show inline errors for invalid formats
- Prevent saving if test fails

## Error Handling
- **Invalid credentials**: "Authentication failed. Check your API key."
- **Network error**: "Unable to connect. Check your internet connection."
- **Rate limit**: "Too many attempts. Try again in 5 minutes."
- **API deprecated**: "This API version is no longer supported. Update your integration."

## Security
- Mask sensitive fields (API Secret, tokens)
- Store credentials encrypted in database
- Never log full credentials
- Auto-logout after 15 min inactivity on this screen

## Success Metrics
- Test success rate > 95%
- Average configuration time < 3 minutes
- Support tickets for "connection issues" decrease
