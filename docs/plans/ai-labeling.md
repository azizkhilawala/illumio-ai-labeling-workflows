# AI Labeling Feature - GA Prototype Plan

## Context

The user is building a **GA prototype** for the AI Labeling feature, due May 7, 2026. This feature uses AI to recommend labels for cloud resources, helping users organize workloads with minimal manual effort.

**Core Workflow:**
1. AI analyzes cloud resources and recommends labels
2. Users review recommendations in a table view
3. Users can approve (single/bulk), edit + approve, or ignore with reason
4. Approved labels apply to resources; ignored labels are tracked separately

---

## Files to Create/Modify

| Action | File |
|--------|------|
| CREATE | `src/design-system/floorplans/AILabelingFloorplan.tsx` |
| CREATE | `src/app/demo/ai-labeling/page.tsx` |
| MODIFY | `src/app/demos/page.tsx` — Add to DEMO_REGISTRY |
| MODIFY | `src/design-system/floorplans/index.ts` — Export floorplan |
| MODIFY | `src/design-system/index.ts` — Export floorplan |

---

## Skills to Read Before Implementation

1. **`.claude/skills/cookbooks/table-grid.md`** — AG Grid setup with selection, custom renderers
2. **`.claude/skills/recipes/tabs.md`** — Tab navigation (use variant="secondary")
3. **`.claude/skills/recipes/badge-status.md`** — Badge for AI recommendations (variant="recommended")
4. **`.claude/skills/recipes/modal.md`** — Confirmation dialogs
5. **`.claude/skills/recipes/form-inputs.md`** — TextField for edit label, OptionSelector for filters
6. **`.claude/skills/recipes/empty-state.md`** — EmptyState component for empty tabs
7. **`.claude/skills/recipes/icons.md`** — Icon component usage (Dazzle library)

---

## Design System Components to Use

| Component | Import Path | Purpose |
|-----------|-------------|---------|
| Icon | `@/design-system/icons` | Dazzle icon library (use `sparkles` or `dazzling-star` for AI) |
| EmptyState | `@/design-system` | Empty state illustrations from Illustration folder |
| Badge | `@/design-system` | AI recommendation badge (variant="recommended") |
| Pill | `@/design-system` | Label pills for existing/recommended labels |
| Button | `@/design-system` | Action buttons (Approve, Ignore, Edit) |
| Modal | `@/design-system` | Confirmation dialogs |
| Slideout | `@/design-system` | Evidence slideout panel |
| Tabs, TabList, TabPanel | `@/design-system` | Tab navigation |
| OptionSelector | `@/design-system` | Filter dropdowns |
| RadioGroup, Radio | `@/design-system` | Group By radio buttons |
| TextField | `@/design-system` | Edit label input field |

---

## Component Structure

```
AILabelingFloorplan
├── SideNav (fixed left navigation)
├── Main Content Area
│   ├── Header (breadcrumbs: Home > Settings > AI Labeling, title: "AI Labeling")
│   ├── Tabs (Recommended, Approved, Ignored) — variant="secondary"
│   ├── Action Toolbar
│   │   ├── Left: Group By radio buttons (None, Application, Role, Environment, Location)
│   │   └── Right: Bulk action buttons (Approve, Ignore) + Export CSV
│   ├── Filter Bar (Cloud Provider, Resource Type, Label Type using OptionSelector)
│   └── Resources Table (AG Grid with row selection and grouping)
├── Evidence Slideout (resource details + AI explanation)
├── Approve Modal (single/bulk confirmation)
├── Ignore Modal (with reason dropdown)
└── Edit Label Modal (edit before approving)
```

---

## Tab Configurations

### Recommended Tab (Default)
- Shows AI-recommended labels pending review
- Columns: Checkbox, Resource, Type, Count, Region, Existing Labels, Recommended Label, Evidence
- Actions: Approve, Ignore, Edit + Approve (single and bulk)
- Empty state: Use `<EmptyState illustration="empty-state" title="No recommendations" description="Check back later for new AI-generated label recommendations." />`

### Approved Tab
- Shows labels that have been approved
- Columns: Resource, Type, Count, Region, Applied Label, Approved By, Approved At
- Actions: View only (no bulk actions)
- Empty state: Use `<EmptyState illustration="empty-state" title="No approved labels yet" description="Review recommendations in the Recommended tab to approve labels." />`

### Ignored Tab
- Shows labels that were ignored
- Columns: Resource, Type, Count, Region, Ignored Label, Reason, Ignored By, Ignored At
- Actions: Restore (moves back to recommended)
- Empty state: Use `<EmptyState illustration="empty-state" title="No ignored labels" description="Labels you ignore will appear here." />`

---

## Table Column Definitions

### Recommended Tab Columns

| Column | Field | Width | Renderer |
|--------|-------|-------|----------|
| Checkbox | — | 50px | Built-in selection |
| Resource | `resourceName` | 200px | `ResourceCellRenderer` (link style, opens slideout) |
| Type | `resourceType` | 130px | Plain text (e.g., "EC2 Instance") |
| Count | `count` | 80px | Number |
| Region | `region` | 120px | Plain text (e.g., "us-west-2") |
| Existing Labels | `existingLabels` | 180px | `LabelsCellRenderer` (Pills) |
| Recommended Label | `recommendedLabel` | 200px | `AILabelCellRenderer` (Pill with star icon) |
| Evidence | `evidence` | 100px | `EvidenceCellRenderer` (link "View") |

### Approved Tab Columns

| Column | Field | Width | Renderer |
|--------|-------|-------|----------|
| Resource | `resourceName` | 200px | Plain text |
| Type | `resourceType` | 130px | Plain text |
| Count | `count` | 80px | Number |
| Region | `region` | 120px | Plain text |
| Applied Label | `appliedLabel` | 180px | `LabelsCellRenderer` |
| Approved By | `approvedBy` | 150px | Plain text |
| Approved At | `approvedAt` | 150px | Date format |

### Ignored Tab Columns

| Column | Field | Width | Renderer |
|--------|-------|-------|----------|
| Resource | `resourceName` | 200px | Plain text |
| Type | `resourceType` | 130px | Plain text |
| Count | `count` | 80px | Number |
| Region | `region` | 120px | Plain text |
| Ignored Label | `ignoredLabel` | 180px | `AILabelCellRenderer` |
| Reason | `reason` | 180px | Plain text |
| Ignored By | `ignoredBy` | 150px | Plain text |
| Ignored At | `ignoredAt` | 150px | Date format |

---

## Custom Cell Renderers

### AILabelCellRenderer
- Displays label as Pill with Icon component prefix
- Use `<Icon name="sparkles" size={12} />` or `<Icon name="dazzling-star" size={12} />` for AI indicator
- Uses Badge variant="recommended" styling
- Format: `[sparkles icon] App: CRM` or `[sparkles icon] Role: Web`

### ResourceCellRenderer
- Blue link-style text
- Click opens Evidence Slideout
- Shows resource name/hostname

### LabelsCellRenderer
- Display first 2-3 labels as Pill components
- Show "+N" indicator for overflow
- Color-coded by label type (App=blue, Role=green, Env=orange, Loc=purple)

### EvidenceCellRenderer
- Renders "View" link
- Opens Evidence Slideout on click

---

## Filter Implementation

```typescript
// Filter state
const [cspFilter, setCspFilter] = useState<string[]>([]);
const [resourceTypeFilter, setResourceTypeFilter] = useState<string[]>([]);
const [labelTypeFilter, setLabelTypeFilter] = useState<string[]>([]);
const [groupBy, setGroupBy] = useState<string>("none");

// Options
const CSP_OPTIONS = ["AWS", "Azure", "GCP"];
const RESOURCE_TYPE_OPTIONS = ["EC2 Instance", "S3 Bucket", "RDS Database", "Lambda Function", "VPC"];
const LABEL_TYPE_OPTIONS = ["Application", "Role", "Environment", "Location"];
const GROUP_BY_OPTIONS = ["none", "application", "role", "environment", "location"];
```

---

## Group By Implementation

Using AG Grid's row grouping feature:
- Radio button group above the table
- Options: None (flat list), Application, Role, Environment, Location
- Groups show count and expandable rows
- Pattern: `rowGroupPanelShow: 'never'` with programmatic grouping via column defs

---

## Evidence Slideout Design

### Header
- Title: "Evidence" 
- Subtitle: Resource name

### Body Sections (with anchors):
1. **Resource Details**
   - Resource Name
   - Resource Type
   - Cloud Provider
   - Region
   - Account ID

2. **Existing Labels**
   - Grid of current label pills

3. **AI Recommendation**
   - Recommended Label: `[sparkles icon] App: CRM` (Pill with star)
   - Evidence: "This EC2 instance is tagged with 'crm-prod' and runs in the same VPC as other CRM workloads. Traffic patterns show 95% communication with known CRM database servers."

### Footer Actions
- Ignore (ghost button)
- Edit (secondary button)
- Approve (primary button)

---

## Modal Designs

### Approve Modal (Single)
- Title: "Approve Label"
- Content: "Apply [sparkles icon] App: CRM to [resource-name]?"
- Description: "This label will be applied to the resource."
- Buttons: Cancel, Approve

### Approve Modal (Bulk)
- Title: "Approve Labels"
- Content: Shows count ("12 Resources")
- Optional: Editable label field if all selected share same recommendation
- Description: "What happens next?" explanation
- Buttons: Cancel, Approve

### Ignore Modal
- Title: "Ignore Recommendation"
- Content: Resource name or count
- Reason dropdown: "Not applicable", "Incorrect", "Already labeled", "Other"
- Optional: Notes text field
- Buttons: Cancel, Ignore

### Edit Label Modal
- Title: "Edit Label"
- Content: Current recommendation shown
- Editable fields: Label Type dropdown, Label Value text field
- Preview: Shows final label format
- Buttons: Cancel, Save & Approve

---

## State Management

```typescript
// Tab state
const [activeTab, setActiveTab] = useState<"recommended" | "approved" | "ignored">("recommended");

// Selection state
const [selectedRows, setSelectedRows] = useState<string[]>([]);

// Modal state
const [approveModalOpen, setApproveModalOpen] = useState(false);
const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);
const [editModalOpen, setEditModalOpen] = useState(false);
const [currentResource, setCurrentResource] = useState<Resource | null>(null);

// Slideout state
const [slideoutOpen, setSlideoutOpen] = useState(false);
const [slideoutResource, setSlideoutResource] = useState<Resource | null>(null);

// Data state (simulate state changes)
const [recommendedData, setRecommendedData] = useState<Resource[]>(MOCK_RECOMMENDED);
const [approvedData, setApprovedData] = useState<Resource[]>([]);
const [ignoredData, setIgnoredData] = useState<Resource[]>([]);
```

---

## Mock Data (20+ Records)

Include varied scenarios across tabs:
- Multiple CSPs (AWS, Azure, GCP)
- Different resource types (EC2, S3, RDS, Lambda, VPC)
- Different regions (us-west-2, us-east-1, eu-west-1)
- Various label recommendations (App, Role, Environment, Location)
- Resources with existing labels vs. no labels
- Different evidence explanations

Sample record:
```typescript
{
  id: "r-001",
  resourceName: "crm-prod-web-01",
  resourceType: "EC2 Instance",
  csp: "AWS",
  region: "us-west-2",
  accountId: "123456789012",
  count: 1,
  existingLabels: [{ type: "Env", value: "Production" }],
  recommendedLabel: { type: "App", value: "CRM" },
  evidence: "This EC2 instance is tagged with 'crm-prod' and runs in the same VPC as other CRM workloads.",
}
```

---

## Demo Registry Entry

```typescript
{
  id: "ai-labeling",
  title: "AI Labeling",
  description: "AI-powered label recommendations for cloud resources with approve/ignore/edit workflows, bulk actions, evidence explanations, and group-by visualization.",
  creator: "Aziz Khilawala",
  createdAt: "Apr 14, 2026",
  href: "/demo/ai-labeling",
  tags: ["AI", "Labels", "Cloud", "Recommendations"],
  status: "In Progress",
}
```

---

## Implementation Sequence

1. **Create AILabelingFloorplan.tsx**
   - Set up page layout with SideNav + Header
   - Implement Tabs (Recommended, Approved, Ignored)
   - Add Group By radio buttons
   - Build filter bar with OptionSelector components
   - Create AG Grid table with column definitions for each tab
   - Implement custom cell renderers (AILabelCellRenderer, ResourceCellRenderer, LabelsCellRenderer)
   - Add row selection and bulk action toolbar
   - Build Evidence Slideout
   - Create confirmation modals (Approve, Ignore, Edit)
   - Implement state transitions (recommend → approve/ignore)
   - Add empty states for each tab
   - Add mock data

2. **Create page route** (`src/app/demo/ai-labeling/page.tsx`)

3. **Register demo** (add to DEMO_REGISTRY in `src/app/demos/page.tsx`)

4. **Update exports** (floorplans/index.ts and design-system/index.ts)

---

## Verification Checklist

- [ ] `npm run dev` → `/demos` page shows AI Labeling card
- [ ] Click card → navigates to `/demo/ai-labeling`
- [ ] Header shows breadcrumbs: Home > Settings > AI Labeling
- [ ] Tabs switch between Recommended, Approved, Ignored
- [ ] Recommended tab shows data with AI label pills (sparkles icon prefix)
- [ ] Group By radio buttons change table grouping
- [ ] Filters (CSP, Resource Type, Label Type) filter the table
- [ ] Row checkbox selection enables bulk action buttons
- [ ] Click resource name → opens Evidence Slideout
- [ ] Slideout shows resource details, existing labels, AI recommendation with explanation
- [ ] Slideout Approve button → opens Approve Modal → moves row to Approved tab
- [ ] Slideout Ignore button → opens Ignore Modal with reason → moves row to Ignored tab
- [ ] Slideout Edit button → opens Edit Modal → can modify label → approve
- [ ] Bulk select + Approve → opens bulk modal → moves all to Approved
- [ ] Bulk select + Ignore → opens bulk modal with reason → moves all to Ignored
- [ ] Approved tab shows approved resources with Applied Label, Approved By/At columns
- [ ] Ignored tab shows ignored resources with Reason, Ignored By/At columns
- [ ] Empty states render correctly when tabs have no data
- [ ] `npm run build` — TypeScript no errors

---

## Reference Files

- `src/design-system/floorplans/VensExplorationFloorplan.tsx` — Tab + Table + Slideout pattern
- `src/design-system/floorplans/AwsFirewallTrafficFloorplan.tsx` — Filter + Modal pattern
- `src/design-system/components/Badge/Badge.tsx` — Badge variant="recommended"
- `src/design-system/components/Illustration/Illustration.tsx` — EmptyState component
- `src/design-system/icons/types.ts` — Available icon names (sparkles, dazzling-star)
- `.claude/skills/cookbooks/table-grid.md` — AG Grid implementation guide

---

## Figma References

| UI Element | Node ID |
|------------|---------|
| Landing Page (Table) | 1331:119040 |
| Details Page | 1331:119178 |
| Evidence Slideout | 1514:93960 |
| Approved Tab | 1331:119113 |
| Ignored Tab | (reference Approved structure) |
| Approve Modal | 1331:126828 |
| Ignore Modal | 1331:126838 |
| Empty States | 1331:119058, 1331:119072, 1331:119086 |
