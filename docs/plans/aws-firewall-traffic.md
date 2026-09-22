# AWS Firewall Traffic — "Captured At" Filter Feature
## Demo Page Implementation Plan

> **Living Document** — Update this file as requirements change, Figma links are shared, or design decisions evolve.

---

## Context

The Illumio CloudSecure AWS Firewall GA workstream requires a new **Traffic page UX** that surfaces log-source attribution ("Captured At") for network flows. When Illumio ingests both VPC flow logs and AWS Network Firewall logs, the same logical flow may appear in multiple log sources with potentially conflicting policy decisions (e.g., Allowed at VPC, Denied at Firewall). This "mixed status" is a key UX differentiator vs. competitors.

**Goal:** 
1. Create a new **Demos / Prototypes gallery page** (`/demos`) that acts as a browsable landing page for all demos — showing cards with creator info, so design team members can discover and navigate to any demo.
2. Add the **AWS Firewall Traffic** demo as the first card in that gallery, linking to `/demo/aws-firewall-traffic`.

**Figma Note:** User will share Figma links as visual reference. Before writing Floorplan code, invoke the `figma:figma-implement-design` skill with the provided URL to extract pixel-accurate visual specs.

---

## Status

| Item | Status |
|------|--------|
| Plan saved to repo | ✅ Done |
| Figma links received | ⏳ Awaiting |
| Demos gallery page | ⏳ Pending |
| AWS Firewall demo route | ⏳ Pending |
| AwsFirewallTrafficFloorplan | ⏳ Pending |
| Nav registration | ⏳ Pending |

---

## Files to Create / Modify

| Action | File |
|--------|------|
| CREATE | `src/app/demos/page.tsx` — Demos gallery listing page |
| CREATE | `src/app/demo/aws-firewall-traffic/page.tsx` — AWS Firewall demo route |
| CREATE | `src/design-system/floorplans/AwsFirewallTrafficFloorplan.tsx` — demo content |
| MODIFY | `src/design-system/floorplans/index.ts` — export new floorplan |
| MODIFY | `src/app/page.tsx` — add "Demos" nav section with link to `/demos` |

---

## Skills to Read Before Writing Code (per CLAUDE.md)

1. **`.claude/skills/cookbooks/table-grid.md`** — MANDATORY before AG Grid table code
2. **`.claude/skills/recipes/badge-status.md`** — for Status/Badge renderers
3. **`.claude/skills/recipes/card.md`** — for the Demos gallery card layout
4. **`.claude/skills/recipes/icons.md`** — for Icon component usage
5. **`figma:figma-implement-design`** skill — when Figma links are provided

---

## Step-by-Step Implementation

### Step 0b — Receive Figma Links
- User shares Figma URL → invoke `figma:figma-implement-design` skill
- Extract: exact colors, spacing, typography, component variants
- Update Floorplan implementation to match before marking complete

---

### Step 1 — Create Demos Gallery Page

**File:** `src/app/demos/page.tsx`

This is a browsable listing page. Each demo is represented as a **Card** with:
- Demo title (linked to the demo route)
- Short description
- Creator name + avatar (initials-based, no external images needed)
- Created/updated date
- Status badge (e.g., "In Progress", "Review Ready", "Complete")
- Tag pills (e.g., "AWS", "Firewall", "Traffic")
- "View Demo →" button

**Layout:** Responsive card grid — 3 columns on wide screens, 2 on medium, 1 on narrow.

**Demo registry** (hardcoded array, easy to extend):
```typescript
const DEMO_REGISTRY = [
  {
    id: 'aws-firewall-traffic',
    title: 'AWS Firewall: Traffic',
    description: 'Captured At filter feature — surfaces log-source attribution for VPC and Firewall flows with mixed-status detection.',
    creator: 'Aziz Khilawala',
    createdAt: '2026-04-13',
    href: '/demo/aws-firewall-traffic',
    tags: ['AWS', 'Firewall', 'Traffic', 'Filters'],
    status: 'In Progress',
  },
  // Future demos appended here
];
```

**Components to use:**
- `Card` + `CardHeader` + `CardBody` + `CardFooter` (from `.claude/skills/recipes/card.md`)
- `Badge` for status (e.g., `variant="info"` for In Progress, `variant="success"` for Complete)
- `Pill` for tag labels
- `Button` (ghost or secondary) for "View Demo →" link
- `Icon` `arrow-right` for the CTA arrow

---

### Step 2 — Register Demos Page in Nav

**File:** `src/app/page.tsx`

Add a new nav section constant:
```typescript
const DEMOS: NavItem[] = [
  { id: "demos", label: "Demos", type: "floorplan", href: "/demos" },
];
```

Render a new "Demos & Prototypes" section in the SideNav, visually distinct from Foundations / Components / Floorplans.

---

### Step 3 — Create AWS Firewall Demo Route

**File:** `src/app/demo/aws-firewall-traffic/page.tsx`

```typescript
"use client";
import { AwsFirewallTrafficFloorplan } from "@/design-system";
export default function AwsFirewallTrafficPage() {
  return <AwsFirewallTrafficFloorplan pageTitle="AWS Firewall — Traffic" />;
}
```

---

### Step 4 — Build Filter Bar (inside Floorplan)

**Components:** `Selector` + `Button` + `Pill`

**Captured At filter** (`Selector`, `multiSelect={true}`, `showFooter={true}`, no search):
```typescript
options: [
  { id: 'vpc_flow_log',       label: 'VPC Flow Log',       icon: <Icon name="cloud" size={12} /> },
  { id: 'firewall_flow_log',  label: 'Firewall Flow Log',  icon: <Icon name="firewall" size={12} /> },
  { id: 'firewall_alert_log', label: 'Firewall Alert Log', icon: <Icon name="firewall" size={12} /> },
]
```
Default: all three selected (no filter applied).

**Through Firewall filter** (`Selector`, `multiSelect={true}`, `searchable={true}`, `searchPlaceholder="Search firewalls..."`):
- Mock options: 5 firewalls (prod-egress-fw, dev-inspection-fw, staging-fw, etc.)

**Go button** — `Button` variant primary.

**Active filter pills** — `Pill` with `showCloseButton={true}`:
- Format: `"Captured At: Firewall Alert Log"` or `"Captured At: 2 of 3"` if >2 selected
- Row renders conditionally below the filter dropdowns

**Layout:**
- Row 1: [Captured At ▾] [Through Firewall ▾] [Go]
- Row 2 (conditional): [active Pill ✕] [active Pill ✕]

---

### Step 5 — Build Traffic Table (inside Floorplan)

**Follow:** `.claude/skills/cookbooks/table-grid.md` (read before writing code)

**Use:** `AgGridReact` with `AllCommunityModule`, same setup as `TableGridFloorplan.tsx`

**Column definitions:**

| Column | Field | Width | Renderer |
|--------|-------|-------|----------|
| Source | `source` | 160px | plain text |
| Destination | `destination` | 160px | plain text |
| Service | `service` | 120px | plain text |
| Policy Decision | `policyDecision` | 160px | `PolicyDecisionCellRenderer` |
| Captured At | `capturedAt` | 200px | `CapturedAtCellRenderer` |
| Firewall | `firewall` | 180px | `FirewallCellRenderer` |
| Rule ID | `ruleId` | 160px | `RuleIdCellRenderer` |

**Custom cell renderers:**
- `PolicyDecisionCellRenderer`: `<Status status="success" />` for Allowed, `<Status status="fail" />` for Denied, orange `<Icon name="triangle-exclamation" size={12} />` + "Mixed" text for Mixed
- `CapturedAtCellRenderer`: 12px colored CSS dot + truncated resource name + log type in parens; "Multiple (N sources)" with yellow dot; `"— Unknown"` in gray italic
- `FirewallCellRenderer`: firewall name or `"—"`
- `RuleIdCellRenderer`: `"rule-group:rule-id"` or `"—"`

**Row click:** `onRowClicked` → sets `selectedFlow` state → opens Slideout

---

### Step 6 — Build Flow Detail Slideout (inside Floorplan)

**Component:** `Slideout`, `size="lg"`, `isOpen={!!selectedFlow}`, `onClose={() => setSelectedFlow(null)}`

**SlideoutHeader:**
- Mixed: `icon={<Icon name="triangle-exclamation" />}`, `iconColor="orange"`, title = source → dest
- Normal: `icon={<Icon name="firewall" />}`, `iconColor="blue"`, title = source → dest
- `subtitle` = service + time window

**SlideoutBody** with anchors: `["Overview", "Log Sources", "Firewall Details"]`

**Sections:**
1. **Overview** — source, dest, service, time window
2. **Log Sources** (only for mixed status) — orange warning banner + inner breakdown table (Source | Type | Decision | Details) using `Status` component per row + "Effective outcome: DENIED" note
3. **Firewall Details** (when firewall data exists) — firewall name, rule ID, rule action, protocol

**SlideoutFooter:** `[View in Inventory]` (secondary) + `[Copy Flow ID]` (ghost)

---

### Step 7 — Mock Data

8 rows covering all scenarios:
```typescript
// 1. VPC-only Allowed    → blue dot, no FW/Rule
// 2. FW Alert Denied     → orange dot, prod-egress-fw, stateful:sid-2001
// 3. Mixed status        → yellow dot "Multiple (2)", prod-egress-fw, stateful:sid-3005
// 4. Unknown source      → gray "— Unknown", no FW/Rule
// 5. FW Flow Allowed     → orange dot, prod-egress-fw, no rule
// 6. FW Alert Denied     → orange dot, dev-inspection-fw, stateful:sid-1001
// 7. VPC-only Allowed    → blue dot, no FW/Rule
// 8. FW Alert Denied     → orange dot, staging-fw, stateful:sid-4200
```

---

### Step 8 — Export Floorplan

**`src/design-system/floorplans/index.ts`** — append:
```typescript
export { AwsFirewallTrafficFloorplan } from './AwsFirewallTrafficFloorplan';
```

---

## Component → UX Spec Mapping

| UX Spec Element | Design System Component | Key Props |
|-----------------|------------------------|-----------|
| Demos gallery card | `Card` + `CardHeader/Body/Footer` | per card.md recipe |
| Status badge on card | `Badge` | `variant="info"` / `"success"` |
| Tag pills on card | `Pill` | default variant |
| Captured At dropdown | `Selector` | `multiSelect`, `showFooter` |
| Through Firewall typeahead | `Selector` | `multiSelect`, `searchable` |
| Active filter pill | `Pill` | `showCloseButton`, `onClose` |
| Go button | `Button` | `variant="primary"` |
| Traffic table | `AgGridReact` | per table-grid cookbook |
| Policy Decision cell | `Status` | `status="success|fail"` |
| Mixed status cell | `Icon` + span | `name="triangle-exclamation"` |
| Captured At dot | CSS circle + `Icon` | `name="cloud"` / `"firewall"` |
| Flow detail panel | `Slideout` | `size="lg"`, anchors |
| Mixed status banner | div + `Icon` | orange background |
| Log sources mini-table | plain divs | `Status` per row |

---

## Verification Checklist

- [ ] `npm run dev` → `/demos` page loads with AWS Firewall Traffic card visible
- [ ] Card shows: title, description, "Aziz Khilawala" creator, date, "In Progress" badge, tags
- [ ] "View Demo →" on card navigates to `/demo/aws-firewall-traffic`
- [ ] Filter bar renders: [Captured At ▾] [Through Firewall ▾] [Go]
- [ ] Captured At dropdown: 3 checkbox options + Select All + Apply/Clear
- [ ] Through Firewall: typeahead search + 5 mock firewalls
- [ ] Selecting filters + Go → active Pill(s) appear; ✕ clears them
- [ ] Table: 8 rows, 7 columns, correct data per scenario
- [ ] Row 3 (Mixed): orange ⚠ + "Mixed" in Policy Decision, yellow dot + "Multiple (2)" in Captured At
- [ ] Row click → Slideout opens with flow details
- [ ] Row 3 click → Slideout shows orange banner + log sources breakdown
- [ ] `npm run build` — TypeScript no errors

---

## Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-04-13 | Aziz Khilawala | Initial plan created |
