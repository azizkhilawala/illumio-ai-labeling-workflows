# Label Cloud Resources in Inventory UI — Design Spec

**Jira:** UXD-4278
**Date:** 2026-06-10
**Author:** Aziz Khilawala
**Status:** Approved
**Figma file:** DkebmPQmiKQUBB7k9Bj4Zj (page: Claude Prototype, node: 4017:18500)

## Overview

Design the experience for applying and removing labels on cloud resources from the Cloud Inventory page. The prototype addresses 5 critical UX issues found in the current Core implementation and covers 3 user flows: single-resource editing, multi-resource editing, and inline label creation.

## Problems Being Solved

1. **Modal does not identify the target resource** — users can't confirm which resource they're editing
2. **Same-type label replacement is silent** — selecting a new label of the same type silently replaces the existing one with no warning
3. **Tooltip positioning is broken** — label tooltips in the dropdown render at incorrect screen positions
4. **Bulk-edit silently overwrites conflicts** — no preview or confirmation when overwriting differing labels across multiple resources
5. **Warning banners are inconsistent** — warnings appear when clearing labels but not when replacing them

## Constraints

- Cannot assign or remove system labels (show as locked/disabled)
- Cannot remove labels assigned via Terraform (show as locked/disabled)
- Must follow a similar pattern to Core's label assignment flow
- Applicable to all label types except Service-based types and via Terraform

## Approach

Enhanced modal pattern. Keep the existing modal interaction model (consistent with Core) but fix all identified issues with an improved internal layout.

## Modal Component Design

### A. Header

**Single resource:** Display the resource name, icon, and type.
```
Edit Labels
🔹 glacier-storage-alpha-server-005f-instance (Database)
```

**Multiple resources:** Display the count, matching Core's existing pattern.
```
Edit Labels
Modify Label assignments for 3 Resources.
```

### B. Applied Labels Chips

Removable chips displayed above the checklist showing currently applied labels. Chips can be clicked to remove (× icon on each chip).

**Multi-resource conflict handling:** When selected resources have differing labels of the same type, display "Multiple [type] Labels" chips (e.g., "Multiple Location Labels") matching Core's existing pattern. These chips are clickable to expand and show the individual label values across resources.

### C. Search + Flat Checklist

A single flat searchable list replaces the current grouped dropdown. Key properties:

- **Checkboxes** for multi-select (not radio buttons, not a flat tag list)
- **Label name** as primary text
- **Type badge** displayed as a subtle pill on the right side of each row (e.g., "Application", "Environment", "Location")
- **Search** filters across all labels by name, regardless of type
- **Selected labels float to top** of the list, separated by a visual divider from unselected labels
- **System and Terraform labels** appear at the bottom of the list with:
  - 🔒 lock icon prefix
  - Disabled/checked checkbox
  - Reduced opacity
  - Tooltip on hover explaining why they can't be modified
  - "System" or "Terraform" type badge
- **"+ Create new label" button** always visible at the bottom of the dropdown list. Clicking it transitions the dropdown into an inline creation form (see Flow 3).

### D. Inline Warnings

Warning banners appear inside the modal for all destructive label operations:

- **Same-type replacement:** "Selecting [new-label] will replace [existing-label] (same type: Application)"
- **Clearing all labels of a type:** "Removing all [type] labels from this resource"
- **Bulk-overwrite of conflicts:** "This will overwrite differing [type] labels across N resources"

Warnings use a yellow/amber banner with ⚠️ icon. They appear immediately when the triggering action occurs (not deferred to Save).

### E. Footer + Change Summary

**Change summary** (visible when changes have been made):
```
Changes: Adding staging · Removing web-frontend · Unchanged: 2 labels
```
Displayed as a green-tinted summary bar above the action buttons. Shows the full diff of what will change when Save is clicked.

**Count summary:** "3 labels applied · 1 managed" displayed on the left side of the footer.

**Action buttons** (right-aligned):
- Cancel — closes modal, discards all changes
- Undo Changes — resets all modifications back to original state
- Save (primary) — applies all changes

## Prototype Screens

### Flow 1: Edit Labels on a Single Resource (4 screens)

**Screen 1 — Table with selection:**
Cloud Inventory table. User selects one row via checkbox. "Edit Labels" button in toolbar shows badge count (1). Resource row is highlighted.

**Screen 2 — Modal open (default state):**
Modal opens with header identifying the resource. Applied labels shown as chips. Flat checklist below with all available labels, checkboxes, type badges. System/Terraform labels locked at bottom. Search bar at top of checklist. "Create new label" button at bottom.

**Screen 3 — Warning state:**
User unchecks a label or selects a same-type replacement. Inline warning banner appears above the checklist. Chips update to reflect the pending change.

**Screen 4 — Change summary before Save:**
User clicks Save (or the summary is visible as they make changes). Green change summary bar shows: "Adding 1, Removing 1, Unchanged 2". User confirms with Save or reverts with Undo Changes.

### Flow 2: Edit Labels on Multiple Resources (2 screens)

**Screen 5 — Table with multi-selection:**
Cloud Inventory table. User selects 3 rows. "Edit Labels" button shows badge count (3).

**Screen 6 — Modal with conflict handling:**
Modal header: "Modify Label assignments for 3 Resources." Chip area shows applied labels, with "Multiple [type] Labels" chips for conflicting types (matching Core's existing pattern). These conflict chips are clickable to expand and show which individual values are applied. Checklist shows all labels with checkboxes.

### Flow 3: Create New Label Inline (2 screens)

**Screen 7 — No match search result:**
User types a value in the search field that returns no matches. The checklist shows "No labels found". A visible "+ Create new label" button is present at the bottom of the dropdown.

**Screen 8 — Inline creation form:**
The dropdown transitions to an inline form matching Core's pattern:
- **Name** field (pre-filled with the search term)
- **Type** dropdown ("Select a type for the new Label")
- Create and Cancel buttons
- Warning banner if the label type would conflict with existing labels

## Edge Case States

| Scenario | Behavior |
|----------|----------|
| System label | Shown with 🔒 icon, disabled checkbox (checked), "System" badge, tooltip: "System-managed label — cannot be modified" |
| Terraform label | Shown with 🔒 icon, disabled checkbox (checked), "Terraform" badge, tooltip: "Assigned via Terraform — cannot be removed here" |
| Same-type replacement | Inline warning: "Selecting [X] will replace [Y] (same type: [type])" |
| Clearing all of a type | Inline warning: "Removing all [type] labels from this resource" |
| Bulk conflict overwrite | Inline warning: "This will overwrite differing [type] labels across N resources" |
| No labels exist | Empty checklist with message: "No labels available" + "Create new label" button |
| Search with no results | "No labels found" + "Create new label" button |

## Figma Deliverable Structure

Built on the "Claude Prototype" page (node 4017:18500) in the existing Label Cloud Figma file. Follows the same layout pattern as the Example Design File page:

1. **Flow 1 section** — orange header, flow card, 4 screen frames (1440×1024)
2. **Flow 2 section** — orange header, flow card, 2 screen frames
3. **Flow 3 section** — orange header, flow card, 2 screen frames
4. **Component & Interaction Specs section** — annotated modal anatomy, edge case states

Each screen uses existing design system components from the file (inventory table, modal shell, buttons, chips, form controls).
