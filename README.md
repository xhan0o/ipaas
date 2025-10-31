# iPaaS Platform

A modern Integration Platform as a Service (iPaaS) prototype built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

[![CI](https://github.com/xhan0o/ipaas/actions/workflows/ci.yml/badge.svg)](https://github.com/xhan0o/ipaas/actions/workflows/ci.yml)
[![Vercel](https://vercelbadge.vercel.app/api/xhan0o/ipaas)](https://vercel.com)

## Features

### 🎯 Dashboard
- Real-time integration health monitoring
- Activity timeline charts with Recharts
- Success rate metrics and analytics
- Critical alerts and notifications
- Integration status overview

### 🔌 Integrations Homepage
- Card-based integration grid
- Filter by category (E-commerce, ERP, Shipping, WMS, Marketplace)
- Filter by status (Active, Inactive, Available)
- Search functionality
- One-click configuration

### ⚙️ Integration Configurator
- Dynamic credential forms per integration
- API endpoint selection
- Test connection functionality
- Sandbox/Production environment toggle
- Secure credential handling (masked inputs)

### 🔀 Visual Field Mapper
- Drag-and-drop field mapping
- Split-panel layout (Source ↔ Target)
- Data type indicators
- Required field validation
- Transformation badges
- Mapping statistics

### 📝 Integration Logs
- Comprehensive activity logs
- Expandable row details
- Request/Response inspection
- Status filtering (Success, Failed, Partial, Pending)
- Search by integration or endpoint
- Retry failed operations

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- **Bun** (recommended) - [Install Bun](https://bun.sh)
- Node.js 18+ (alternative, but Bun is faster)

### Installation

```bash
# Install dependencies (using Bun)
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

> **Note**: This project uses Bun for faster installs and builds. If you prefer npm/yarn, you can use those instead, but Bun is recommended for the best experience.

The app will be available at `http://localhost:3000` (or the next available port).

## Project Structure

```
ipaas/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Dashboard page
│   ├── integrations/      # Integrations homepage
│   ├── mapper/           # Visual field mapper
│   ├── logs/             # Integration logs
│   ├── layout.tsx        # Root layout with sidebar
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── dashboard/        # Dashboard components
│   ├── integrations/     # Integration components
│   ├── mapper/           # Mapper components
│   ├── logs/             # Logging components
│   └── sidebar.tsx       # Navigation sidebar
├── lib/
│   ├── mock-data.ts      # Test data for all features
│   └── utils.ts          # Utility functions
└── types/
    └── integrations.ts   # TypeScript type definitions
```

## Mock Data

The prototype uses comprehensive mock data including:

- 12 sample integrations across 5 categories
- Real-time dashboard metrics
- 7 integration health statuses
- 6+ log entries with various states
- Pre-configured field mappings (Shopify → Platform)
- Activity timeline data (24 hours)
- Sample alerts and error scenarios

## Features by Module

### Dashboard
- **Metrics Cards**: Total integrations, success rate, records synced, active syncs
- **Health Status**: Real-time monitoring with color-coded indicators
- **Activity Chart**: Line chart showing sync activity over time
- **Alerts Panel**: Critical, warning, and info alerts with actions

### Integrations
- **Card Grid**: Responsive 4-column layout
- **Status Badges**: Active (green), Inactive (gray), Available (outline), Not Available (locked)
- **Filters**: Category and status filters with search
- **Configurator**: Modal with credentials, API selection, and test connection

### Mapper
- **Drag & Drop**: Intuitive field mapping interface
- **Type Indicators**: Color-coded data type badges
- **Required Fields**: Asterisk indicators and validation
- **Mapping Stats**: Progress tracking and completeness indicator
- **Template Support**: Save/load mapping templates

### Logs
- **Table View**: Sortable columns with expandable rows
- **Status Indicators**: Icons and colors for quick scanning
- **Details Panel**: Request/response inspection
- **Filters**: Status and search filters
- **Actions**: Retry failed operations

## Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Success**: Green
- **Warning**: Yellow/Orange
- **Error**: Red
- **Muted**: Gray

### Health Status
- 🟢 Healthy (90-100% success rate)
- 🟡 Warning (70-89% success rate)
- 🔴 Down (<70% success rate)
- ⚪ Paused

## Development

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run type-check` - Run TypeScript type checking without emitting files

### Adding New Integrations

1. Add integration to `lib/mock-data.ts` in the `integrations` array
2. Add corresponding health status in `integrationHealth` array
3. Add sample log entries in `logEntries` array
4. (Optional) Add field mappings for the mapper

### Extending Components

All components use shadcn/ui patterns and are fully typed with TypeScript. Follow the existing patterns in each module for consistency.

## CI/CD

This project uses GitHub Actions for continuous integration and Vercel for deployment.

### GitHub Actions

The CI pipeline runs on every push to `main` and on pull requests. It uses **Bun** for fast dependency installation and builds, matching the local development environment.

The pipeline performs:

- **Linting**: ESLint checks for code quality
- **Type Checking**: TypeScript compilation validation (`bun run type-check`)
- **Build Verification**: Ensures the project builds successfully

View the workflow at [.github/workflows/ci.yml](.github/workflows/ci.yml)

### Vercel Deployment

The project is configured for automatic deployment on Vercel using **Bun** for faster installs and builds:

- **Automatic Deployments**: Every push to `main` triggers a production deployment
- **Preview Deployments**: Pull requests get preview deployments
- **Build Caching**: Dependencies are cached to speed up builds
- **Optimized Output**: Standalone build mode reduces deployment size
- **Fast Package Manager**: Bun provides 3-5x faster install times compared to npm

#### Build Optimizations

- **Standalone Output**: Reduces deployment size by ~70%
- **SWC Minification**: Faster builds with better tree-shaking
- **Optimized Package Imports**: Tree-shaking for large packages (lucide-react, @nivo/*)
- **Static Asset Caching**: Long-term caching headers for static assets

To deploy manually:

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Next.js configuration
3. Deployments happen automatically on every push

## License

This is a prototype/demo project.

## Contact

For questions or feedback about this prototype, please open an issue on GitHub.

