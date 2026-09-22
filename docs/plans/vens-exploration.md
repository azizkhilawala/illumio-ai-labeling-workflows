# VENs Exploration Demo - Implementation Plan

## Context

The user is building a demo gallery for the Lightening Design System. After completing the AWS Firewall Traffic demo, they want to create a **VENs Exploration** demo page that matches a Figma design (node 796:74587) and showcases Illumio VEN (Virtual Enforcement Node) management capabilities.

**What is a VEN?** Illumio VEN is a lightweight agent installed on workloads that:
- Sends telemetry data (traffic flows, process info) to PCE (Policy Compute Engine)
- Receives and enforces security policies from PCE
- Operates in visibility-only, selective, or full enforcement modes
- Has heartbeat mechanism for health monitoring

---

## Files to Create/Modify

| Action | File |
|--------|------|
| CREATE | `src/design-system/floorplans/VensExplorationFloorplan.tsx` |
| CREATE | `src/app/demo/vens-exploration/page.tsx` |
| MODIFY | `src/app/demos/page.tsx` — Add to DEMO_REGISTRY |
| MODIFY | `src/design-system/floorplans/index.ts` — Export floorplan |
| MODIFY | `src/design-system/index.ts` — Export floorplan |

---

## Skills to Read Before Implementation

1. **`.claude/skills/cookbooks/table-grid.md`** — AG Grid table setup
2. **`.claude/skills/recipes/badge-status.md`** — Status/Badge renderers
3. **`.claude/skills/recipes/tabs.md`** — Tab navigation
4. **`.claude/skills/recipes/card.md`** — Video banner card
5. **`.claude/skills/recipes/icons.md`** — Icon component usage

---

## Component Structure

```
VensExplorationFloorplan
├── SideNav (fixed left navigation)
├── Main Content Area
│   ├── Header (breadcrumbs: Home > Servers & Endpoints > Workloads, title: "VENs")
│   ├── VideoBanner ("What are VENs?" educational banner)
│   ├── Tabs (All VENs, By State, By Mode, Health Issues)
│   ├── Action Toolbar (Unpair, Suspend, Resume, Refresh buttons)
│   ├── Filter Bar (State, Mode, Health, OS filters using OptionSelector)
│   └── VENs Table (AG Grid with pagination)
└── Slideout (VEN Detail Panel)
```

---

## Table Column Definitions

| Column | Field | Width | Renderer |
|--------|-------|-------|----------|
| Checkbox | — | 50px | Built-in selection |
| Hostname | `hostname` | 200px | `HostnameCellRenderer` (link style) |
| IP Address | `ipAddress` | 130px | Plain text |
| State | `state` | 120px | `VenStateCellRenderer` (Status component) |
| Mode | `mode` | 170px | `VenModeCellRenderer` (Badge with icon) |
| Health | `health` | 110px | `HealthCellRenderer` (dot + label) |
| VEN Version | `venVersion` | 160px | Plain monospace |
| OS | `osType` | 140px | `OsCellRenderer` (icon + name) |
| Last Heartbeat | `lastHeartbeat` | 150px | `HeartbeatCellRenderer` (relative time) |
| PCE Sync | `pceSync` | 120px | `PceSyncCellRenderer` |
| Labels | `labels` | flex | `LabelsCellRenderer` (Pills) |

---

## Custom Cell Renderers

### VenStateCellRenderer
- Active → `<Status status="enabled" />` (green)
- Suspended → `<Status status="warning" />` (orange)
- Stopped → `<Status status="disabled" />` (gray)
- Uninstalled → `<Status status="error" />` (red)

### VenModeCellRenderer
- Visibility Only → blue badge + eye icon
- Selective Enforcement → orange badge + shield-halved icon
- Full Enforcement → green badge + shield icon

### HealthCellRenderer
- Healthy → green dot + "Healthy"
- Warning → yellow dot + "Warning"
- Error → red dot + "Error"
- Offline → gray dot + "Offline"

### HeartbeatCellRenderer
- Display relative time (e.g., "2 mins ago")
- Green for recent (<5 min), orange for stale (5-30 min), red for very stale (>30 min)

### LabelsCellRenderer
- Display first 2-3 labels as Pill components
- Show "+N" indicator for additional labels

---

## Filter Implementation

```typescript
// Filter state
const [stateFilter, setStateFilter] = useState<string[]>([]);
const [modeFilter, setModeFilter] = useState<string[]>([]);
const [healthFilter, setHealthFilter] = useState<string[]>([]);
const [osFilter, setOsFilter] = useState<string[]>([]);

// Options
const STATE_OPTIONS = ["Active", "Suspended", "Stopped", "Uninstalled"];
const MODE_OPTIONS = ["Visibility Only", "Selective Enforcement", "Full Enforcement"];
const HEALTH_OPTIONS = ["Healthy", "Warning", "Error", "Offline"];
const OS_OPTIONS = ["linux", "windows", "macos"];
```

---

## Mock Data (15-20 VEN Records)

Include varied scenarios:
- Active + Full Enforcement + Healthy (happy path)
- Active + Visibility Only + Warning (policy not enforcing)
- Suspended + Selective + Healthy (paused VEN)
- Stopped + Error (problematic VEN)
- Different OS types (Linux, Windows, macOS)
- Different PCE sync states (In Sync, Out of Sync, Syncing)
- Various heartbeat ages for time-based coloring

---

## Slideout Design (VEN Details)

### Sections with Anchors:
1. **VEN Details** — ID, Version, State, Mode, Health, Install/Activation dates
2. **Workload Info** — OS type/version, Workload count, Pairing key
3. **PCE Connection** — PCE name, Cluster, Sync status, Last heartbeat
4. **Labels** — Grid of label pills

### Footer Actions:
- View Workload (secondary)
- Suspend/Resume VEN (ghost)
- Close (primary)

---

## Demo Registry Entry

```typescript
{
  id: "vens-exploration",
  title: "VENs Exploration",
  description: "VEN management page with status filtering, enforcement mode display, health indicators, bulk actions, and detailed slideout panel.",
  creator: "Aziz Khilawala",
  createdAt: "Apr 14, 2026",
  href: "/demo/vens-exploration",
  tags: ["VEN", "Workloads", "Agents", "Enforcement"],
  status: "In Progress",
}
```

---

## Implementation Sequence

1. **Create VensExplorationFloorplan.tsx**
   - Set up page layout with SideNav + Header
   - Add VideoBanner component
   - Implement Tabs structure
   - Add Action Toolbar buttons
   - Build filter bar with OptionSelector components
   - Create AG Grid table with column definitions
   - Implement all custom cell renderers
   - Build VEN detail slideout
   - Add mock data

2. **Create page route** (`src/app/demo/vens-exploration/page.tsx`)

3. **Register demo** (add to DEMO_REGISTRY in `src/app/demos/page.tsx`)

4. **Update exports** (floorplans/index.ts and design-system/index.ts)

---

## Verification Checklist

- [ ] `npm run dev` → `/demos` page shows VENs Exploration card
- [ ] Card displays: title, description, creator "Aziz Khilawala", date, "In Progress" badge, tags
- [ ] Click card → navigates to `/demo/vens-exploration`
- [ ] Header shows breadcrumbs: Home > Servers & Endpoints > Workloads
- [ ] VideoBanner renders with "What are VENs?" content
- [ ] Tabs switch between views
- [ ] Action buttons render (Unpair, Suspend, Resume, Refresh)
- [ ] Filters render and filter the table
- [ ] Table displays 15+ VEN rows with correct column data
- [ ] State column shows colored Status indicators
- [ ] Mode column shows appropriate badges with icons
- [ ] Health column shows colored dots
- [ ] Heartbeat column shows relative time with color coding
- [ ] Labels column shows pills with "+N" overflow
- [ ] Row click opens slideout with VEN details
- [ ] Slideout anchors navigate to sections
- [ ] `npm run build` — TypeScript no errors

---

## Reference Files

- `src/design-system/floorplans/AwsFirewallTrafficFloorplan.tsx` — Pattern reference
- `src/design-system/icons/types.ts` — Available icon names
- `.claude/skills/cookbooks/table-grid.md` — AG Grid implementation guide
