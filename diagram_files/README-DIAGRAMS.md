# iPaaS Platform - Architecture Diagrams

This folder contains 4 key diagrams explaining the iPaaS platform architecture.

## Diagrams Included

### 1. System Architecture (`1-system-architecture.mermaid`)
**Purpose**: High-level view of all system components and their relationships

**Shows**:
- Frontend layer (Web app, Admin portal)
- API Gateway
- Application services
- Temporal orchestration engine
- Integration connectors
- Data layer (PostgreSQL, MongoDB, Redis)
- Monitoring & observability
- External systems
- Security components

**Audience**: Engineers, architects, stakeholders

---

### 2. Data Flow Diagram (`2-data-flow.mermaid`)
**Purpose**: How data moves through the integration pipeline

**Shows**:
- Extract phase (API calls, authentication)
- Transform phase (validation, mapping, enrichment)
- Load phase (loading to Hopstack)
- Post-processing (logging, state updates, notifications)
- Error handling and retry logic

**Audience**: Product team, implementation engineers, customers

---

### 3. User Journey Map (`3-user-journey.mermaid`)
**Purpose**: Customer experience from setup to monitoring

**Shows**:
- Discovery: Browse and select integrations
- Configuration: Set up credentials and test
- Field Mapping: Map fields and transformations
- Activation: Enable and trigger first sync
- Monitoring: Dashboard and logs

**Audience**: Product managers, designers, sales, customer success

---

### 4. Temporal Workflow Diagram (`4-temporal-workflow.mermaid`)
**Purpose**: Detailed workflow execution with activities and state transitions

**Shows**:
- Workflow states and transitions
- Activity retry policies
- Error handling paths
- Success/failure outcomes
- State management

**Audience**: Backend engineers, DevOps, Temporal developers

---

## How to View These Diagrams

### Option 1: GitHub/GitLab (Recommended)
Simply view the `.mermaid` files in your repository - they render automatically!

### Option 2: VS Code
Install the "Markdown Preview Mermaid Support" extension, then preview any markdown file containing these diagrams.

### Option 3: Mermaid Live Editor
1. Go to https://mermaid.live/
2. Copy the content of any `.mermaid` file
3. Paste into the editor
4. Export as PNG/SVG if needed

### Option 4: Embed in Markdown
Create a markdown file and embed like this:

\`\`\`markdown
# System Architecture

\`\`\`mermaid
[paste diagram code here]
\`\`\`
\`\`\`

### Option 5: Convert to Images
Use Mermaid CLI to generate PNG/SVG files:

\`\`\`bash
npm install -g @mermaid-js/mermaid-cli
mmdc -i 1-system-architecture.mermaid -o system-architecture.png
\`\`\`

---

## Diagram Conventions

### Colors
- **Blue**: Frontend/User-facing
- **Orange**: Gateway/Routing
- **Purple**: Application logic
- **Green**: Temporal/Orchestration (highlighted with thick border)
- **Yellow**: Integration connectors
- **Pink**: Data storage
- **Teal**: Monitoring
- **Gray**: External systems
- **Red**: Security components

### Arrow Types
- **Solid arrows**: Direct data flow or API calls
- **Dotted arrows**: Monitoring, logging, or indirect connections

---

## Updating Diagrams

These are text-based diagrams, so they're easy to update:

1. Open the `.mermaid` file in any text editor
2. Modify the diagram syntax
3. Save and preview using one of the viewing options above
4. Commit to version control

**Tip**: Keep diagrams up-to-date as the architecture evolves!

---

## Related Documents

- **PRDs**: See `integration-*-prd.md` files for detailed feature specifications
- **API Documentation**: [Link to your API docs]
- **Temporal Documentation**: https://docs.temporal.io/

---

## Questions?

For questions about these diagrams or the architecture:
- Technical: [Engineering team contact]
- Product: [Product team contact]
- General: [Support email]
