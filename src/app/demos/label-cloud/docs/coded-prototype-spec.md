# Label Cloud Resources — Coded Prototype Design Spec

**Jira:** UXD-4278
**Date:** 2026-06-10
**Author:** Aziz Khilawala
**Status:** Approved
**Repo:** Desktop/IllumioVibeCodeRepo/archived_lightening_design_system
**Route:** `/demos/label-cloud`
**Parent spec:** `docs/superpowers/specs/2026-06-10-label-cloud-resources-design.md`

## Overview

Build a fully interactive coded prototype at `/demos/label-cloud` that demonstrates the redesigned Edit Labels experience for cloud resources. Uses the existing Lightning Design System components (Modal, Pill, Checkbox, Button, OptionSelector, AG Grid, SideNav, Header, Icon) with design tokens. No backend required — all state is local React state.

## Page Layout

Standard demo page layout following existing demos (e.g., `/demos/ai-labeling`):

- **SideNav** (left): Collapsed-capable sidebar with Illumio nav structure. "Cloud" > "Inventory" item active.
- **Header** (top): Breadcrumbs ["Home", "Insights", "Inventory"], title "Inventory", search bar, user avatar.
- **Main content**: Toolbar + AG Grid table filling remaining space.

### Component Mapping

| UI Element | Design System Component | Import |
|---|---|---|
| Sidebar navigation | `SideNav`, `SideNavSection`, `SideNavItem`, `SideNavSubItem` | `@/design-system` |
| Page header | `Header` | `@/design-system` |
| Toolbar buttons | `Button` with `Icon` | `@/design-system`, `@/design-system/icons` |
| Inventory table | `AgGridReact` with Lightning theme | `ag-grid-react`, `ag-grid-community` |
| Label pills in table | `Pill` with `icon={null}` `showCloseButton={false}` | `@/design-system` |
| Status cells | `Status` component | `@/design-system` |
| Edit Labels modal | `Modal`, `ModalHeader`, `ModalBody`, `ModalFooter` | `@/design-system` |
| Applied label chips | `Pill` with `onClose` handler | `@/design-system` |
| Checklist checkboxes | `Checkbox` component | `@/design-system` |
| Type badge pills | `Pill` with `variant="default"` `icon={null}` `showCloseButton={false}` | `@/design-system` |
| Search input | `TextField` | `@/design-system` |
| Create label form | `TextField`, `OptionSelector` | `@/design-system` |
| Warning banner | `NotificationBanner` or custom styled div with `var(--color-warning-bg)` | `@/design-system` |
| Change summary | Custom styled div with `var(--color-success-bg)` | tokens |
| Icons | `Icon` component with names: `pen`, `plus`, `lock`, `search`, `cloud`, `server`, `shield`, `tag` | `@/design-system/icons` |

## Inventory Table (AG Grid)

**Use Case 2: Main Page Table** from the table-grid cookbook. Full-page table filling available height.

### Columns

| Column | Field | Width | Renderer |
|---|---|---|---|
| Checkbox | (selection) | 50px | AG Grid built-in `rowSelection="multiple"` |
| Resource | `resource` | flex: 2 | Resource icon + name + subtitle (resource type) |
| Resource State | `state` | 120px | `Status` component (`enabled` variant for "Running") |
| Category | `category` | 120px | Plain text |
| Account ID | `accountId` | 180px | Cloud provider icon + ID text, `cell-mono` class |
| Region | `region` | 120px | Plain text |
| Labels | `labels` | 200px | `Pill` components, `variant="default"`, `icon={null}`, `showCloseButton={false}` |

### Toolbar

Above the table, a toolbar row containing:
- `Button` variant="outline" with `leftIcon={<Icon name="pen" size={16} />}`: "Edit Labels" — disabled when 0 rows selected, shows `Badge` with selected count when > 0
- Filter dropdowns using `OptionSelector`: View, Cloud, Account, Region, Resource Type, Category

### Mock Data

8 rows of cloud resources with realistic names, categories (Database, Compute, Storage, Container), account IDs, regions (us-west-2, eu-central-1), and pre-assigned labels.

## Edit Labels Modal

**Size:** `md` (500px) — fits the checklist well.

### State Machine

```
CLOSED → OPEN (click "Edit Labels" button)
OPEN → SEARCHING (type in search field)
OPEN → WARNING (check/uncheck triggers same-type replacement)
OPEN → CREATING (click "+ Create new label")
CREATING → OPEN (cancel or create)
OPEN → CLOSED (click Save, Cancel, or close)
```

### Modal Header (`ModalHeader`)

- **Single resource:** "Edit Labels" + subtitle with resource name and type
- **Multiple resources:** "Edit Labels" + subtitle "Modify Label assignments for N Resources."

### Modal Body (`ModalBody`)

**Applied Labels Chips section:**
- Row of `Pill` components with `onClose` handlers for each applied label
- Multi-resource conflicts: yellow-tinted `Pill` with `variant="warning"` showing "Multiple [type] Labels"

**Search bar:**
- `TextField` with `placeholder="Search labels..."` and search icon
- Filters the checklist in real-time by label name

**Flat Checklist:**
- Scrollable container (`maxHeight: 280px`, `overflowY: auto`)
- Each row: `Checkbox` + label name text + `Pill` type badge (right-aligned)
- **Selected labels** at top with `var(--lightning-blue-25)` background
- **Unselected labels** below a 1px divider
- **Locked labels** at bottom with `opacity: 0.5`, `disabled` Checkbox, `Icon name="lock"` prefix, tooltip on hover
- Sort order: selected → unselected → locked

**"+ Create new label" button:**
- `Button` variant="outline" full-width with dashed border and `Icon name="plus"`
- Clicking toggles the checklist area to show an inline form

**Inline Create Form (when active):**
- `TextField` label="Name" pre-filled with search term
- `OptionSelector` label="Type" with options: Application, Environment, Location, Role
- `Button` "Create" (primary) + `Button` "Cancel" (ghost)

**Warning Banner:**
- Yellow banner using `var(--color-warning-bg)` background with `var(--color-warning)` border
- `Icon name="triangle-exclamation"` + warning text
- Appears for: same-type replacement, clearing all labels of a type, bulk conflict overwrite

**Change Summary Bar:**
- Green banner using `var(--color-success-bg)` background with `var(--color-success)` border
- Shows: "Changes: Adding [label] · Removing [label] · Unchanged: N labels"
- Visible when there are pending changes

### Modal Footer (`ModalFooter`)

- Left side: count summary text ("3 labels applied · 2 managed") in `var(--text-secondary)`
- Right side: `Button variant="ghost"` "Cancel" + `Button variant="outline"` "Undo Changes" + `Button variant="primary"` "Save"

## State Management

All local React state, no backend:

```typescript
// Table state
selectedRows: Resource[]                    // AG Grid selection
 
// Modal state  
isModalOpen: boolean
modalMode: 'checklist' | 'creating'         // Toggle between checklist and inline form
searchQuery: string                         // Search filter text

// Label state (per resource or bulk)
originalLabels: Map<string, Label[]>        // Original state for undo
pendingLabels: Map<string, Label[]>         // Current working state
availableLabels: Label[]                    // All labels in the system

// Warning state
activeWarning: { type: string; message: string } | null

// Create form state
newLabelName: string
newLabelType: string
```

### Label Type

```typescript
interface Label {
  id: string;
  name: string;
  type: 'Application' | 'Environment' | 'Location' | 'Role' | 'System' | 'Terraform';
  locked: boolean;     // true for System and Terraform labels
}
```

## Edge Cases (All Interactive)

| Scenario | Behavior |
|---|---|
| System label | `Checkbox disabled checked`, `Icon name="lock"`, `opacity: 0.5`, tooltip: "System-managed label" |
| Terraform label | Same as system, tooltip: "Assigned via Terraform" |
| Same-type replacement | Warning banner + auto-uncheck the replaced label |
| Clear all of type | Warning banner when last label of a type is unchecked |
| Bulk conflicts | "Multiple [type] Labels" pills with `variant="warning"` |
| Empty search | "No labels found" message + "+ Create new label" button |
| Save | Close modal, update table Pills, show brief success state |
| Undo Changes | Reset to `originalLabels`, clear warnings |

## File Structure

```
src/app/demos/label-cloud/
├── page.tsx              # Main page: layout, SideNav, Header, table, modal orchestration
├── page.module.css       # Page-level styles (table container, toolbar, AG Grid overrides)
├── EditLabelsModal.tsx   # Modal component with all internal state and sub-sections
├── EditLabelsModal.module.css  # Modal-specific styles (checklist rows, warnings, chips)
├── data.ts               # Mock data: resources, available labels, type definitions
```
