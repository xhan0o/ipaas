# PRD: Integration Mapper

## Overview
Visual interface to map external integration fields to Hopstack platform fields (no-code mapping)

## User Persona
- Implementation Engineer (Internal)
- Customer Success team setting up new customers
- Need: Map fields without touching backend code

## Key Features

### 1. Split-Screen Layout
- **Left Panel**: External integration APIs & fields
- **Right Panel**: Hopstack platform APIs & fields
- **Center Canvas**: Visual connection lines
- **Ratio**: 30% | 40% | 30%

### 2. API Selection
- **Left dropdown**: Select integration API (e.g., "Shopify Orders API")
- **Right dropdown**: Select platform API (e.g., "Hopstack Orders API")
- **Auto-load fields** when API selected

### 3. Field Mapping Interface
- **Drag & drop** from left to right
- **Click to connect** alternative (for accessibility)
- **Connection lines**: Bezier curves, color-coded by data type
- **Hover state**: Highlight compatible fields
- **Incompatible fields**: Gray out + tooltip explaining why

### 4. Field Properties
- **Field name**
- **Data type** badge (String, Number, Date, Boolean, Object)
- **Required** indicator (red asterisk)
- **Sample value** (shown on hover)
- **Transformation option** (icon button)

### 5. Transformation Layer
- **Click on connection line** → Opens transformation modal
- **Available transformations**:
  - Format date (MM/DD/YYYY → YYYY-MM-DD)
  - Concatenate (First Name + Last Name → Full Name)
  - Split string
  - Math operations (+, -, *, /)
  - Conditional mapping (if/else)
  - Constant value
  - Lookup table

### 6. Template System
- **Save as template** button
- **Load template** dropdown
- **Default mappings** (pre-configured by admin)

## Sample Data - Shopify to Hopstack Orders Mapping

```
LEFT PANEL: Shopify Orders API
├─ order_id [String] *required
├─ order_number [Number] *required
├─ created_at [Date] *required
├─ customer
│  ├─ first_name [String]
│  ├─ last_name [String]
│  └─ email [String]
├─ line_items [Array]
│  ├─ sku [String]
│  ├─ quantity [Number]
│  └─ price [Number]
└─ shipping_address
   ├─ address1 [String]
   ├─ city [String]
   └─ zip [String]

RIGHT PANEL: Hopstack Orders API
├─ order_reference [String] *required
├─ order_date [Date] *required
├─ customer_name [String] *required
├─ customer_email [String]
├─ items [Array]
│  ├─ product_sku [String]
│  ├─ qty [Number]
│  └─ unit_price [Number]
└─ delivery_address
   ├─ street [String]
   ├─ city [String]
   └─ postal_code [String]

MAPPINGS:
order_id ────────────────→ order_reference
order_number ────────────→ (unmapped, not needed)
created_at ──────────────→ order_date
customer.first_name ─┐
customer.last_name ──┴──→ customer_name [Transform: Concatenate]
customer.email ──────────→ customer_email
line_items.sku ──────────→ items.product_sku
line_items.quantity ─────→ items.qty
line_items.price ────────→ items.unit_price
shipping_address.* ──────→ delivery_address.* [Auto-mapped]
```

## UX Flow
1. User selects integration from dropdown
2. System loads available APIs for that integration
3. User selects specific API (e.g., Orders)
4. Left panel populates with integration fields
5. User selects platform API from right dropdown
6. Right panel populates with platform fields
7. User drags field from left to right
8. Connection line appears
9. (Optional) User clicks line to add transformation
10. User clicks "Save Mapping"
11. System stores mapping as default for this integration

## Interaction Details

### Drag & Drop
- **On drag start**: Highlight compatible target fields
- **On hover**: Show dotted line preview
- **On drop**: Create solid connection line
- **Invalid drop**: Bounce back animation + error toast

### Connection Lines
- **Color coding**:
  - Blue: Direct mapping (same data type)
  - Orange: Type conversion (e.g., String → Number)
  - Green: With transformation applied
- **Line styles**:
  - Solid: Mapped
  - Dashed: Suggested (AI-powered)
  - Red: Error/incompatible

### Right-Click Menu
- **On field**: Copy, Paste, Clear mapping
- **On connection**: Edit transformation, Delete, Duplicate

## Validation Rules
- All required (*) platform fields must be mapped
- Warn if required integration fields are unmapped
- Data type compatibility check (with auto-conversion suggestion)
- Prevent circular mappings
- Check for duplicate mappings

## AI Suggestions (Future)
- **Auto-suggest mappings** based on field names
- **Learn from previous mappings** for similar integrations
- **Show confidence score** (85% match)
- **One-click apply all suggestions**

## Templates

### Default Template: Shopify Orders
```
Pre-configured mappings for common Shopify → Hopstack order flow
Saves 80% of mapping time for new customers
```

### Custom Template
Users can save their specific mappings and reuse for similar customers

## Error Handling
- **Mapping conflict**: "This field is already mapped. Overwrite?"
- **Type mismatch**: "String cannot be mapped to Number. Add transformation?"
- **Missing required**: Red indicator on "Save" with list of missing fields
- **Invalid transformation**: "Transformation failed: [error message]"

## Success Metrics
- Average mapping time < 10 minutes per integration
- 95% of mappings work without backend intervention
- Reduce implementation engineer workload by 70%

## Accessibility
- Keyboard navigation (Tab, Arrow keys)
- Screen reader support for all fields
- High contrast mode for connection lines
- Undo/Redo (Ctrl+Z / Ctrl+Y)
