# Label Cloud Resources — Figma Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an 8-screen high-fidelity Figma prototype for the redesigned Edit Labels experience on the Cloud Inventory page.

**Architecture:** Each flow is a Figma section containing a Horizontal Header, a Flow Card (story context), and screen frames (1440×1024). Screens are built by cloning the existing inventory table frame and overlaying modal states. The modal is constructed from native Figma nodes (frames, text, rectangles) matching the file's existing design system.

**Tech Stack:** Figma Plugin API via `use_figma` MCP tool. Components: Horizontal Header (key: `5e996dbc0c3bfa093a14d3bccb84db58202a89ec`), Flow Card (key: `3efde3b34b700193d91affb0a552acf72ca7eefe`), Vertical Header (key: `6b82abe179916f556fd854008fe745b277a51c20`). Target page: "Claude Prototype" (node `4017:18500`) in file `DkebmPQmiKQUBB7k9Bj4Zj`.

**Design Spec:** `docs/superpowers/specs/2026-06-10-label-cloud-resources-design.md`

---

### Task 1: Set Up Page Structure with Sections and Headers

**What:** Create the 3 flow sections and the Component Specs section on the Claude Prototype page, with Horizontal Header and Vertical Header instances. This creates the skeleton that all subsequent tasks build into.

**Files:** Figma file `DkebmPQmiKQUBB7k9Bj4Zj`, page node `4017:18500`

- [ ] **Step 1: Switch to the Claude Prototype page and create Flow 1 section**

```js
// use_figma: Create Flow 1 section with Horizontal Header
const page = figma.root.children.find(p => p.id === "4017:18500");
await figma.setCurrentPageAsync(page);

// Import components
const headerMedComp = await figma.importComponentByKeyAsync("5e996dbc0c3bfa093a14d3bccb84db58202a89ec");
const flowCardComp = await figma.importComponentByKeyAsync("3efde3b34b700193d91affb0a552acf72ca7eefe");
const vertHeaderComp = await figma.importComponentByKeyAsync("6b82abe179916f556fd854008fe745b277a51c20");

// Flow 1 Section
const s1 = figma.createSection();
s1.name = "Flow";
s1.x = 0; s1.y = 0;
s1.resize(11497, 1822);
s1.fills = [{ type: "SOLID", color: { r: 0.97, g: 0.976, b: 0.98 } }];

// Header inside section
const h1 = headerMedComp.createInstance();
s1.appendChild(h1);
h1.x = 100; h1.y = 100;

// Flow Card
const fc1 = flowCardComp.createInstance();
s1.appendChild(fc1);
fc1.x = 100; fc1.y = 500;

return { sectionId: s1.id, headerId: h1.id, flowCardId: fc1.id };
```

- [ ] **Step 2: Update Flow 1 header text and flow card content**

Load fonts and set the header text to "Applying/removing labels on a single cloud resource from Cloud Inventory page". Update the Flow Card text fields (Flow Name, User Story, Key User Flows) with Flow 1 content from the spec.

- [ ] **Step 3: Create Flow 2 and Flow 3 sections**

Create sections positioned below Flow 1 (y offsets at 2700 and 5400). Each gets a Horizontal Header and Flow Card instance. Set header text to:
- Flow 2: "Applying/removing labels on multiple cloud resources"
- Flow 3: "Creating a new label inline from the Edit Labels modal"

- [ ] **Step 4: Create Vertical Headers for each use case**

Create Vertical Header instances positioned to the left of each flow group. Two use cases:
- Use Case 1 (y=0): "Edit labels on cloud resources" — covers Flow 1 and Flow 2
- Use Case 2 (y=5400): "Create new labels inline" — covers Flow 3

- [ ] **Step 5: Take screenshot to verify skeleton layout**

Use `get_screenshot` on page `4017:18500` to verify all sections, headers, and flow cards are positioned correctly.

---

### Task 2: Build Screen 1 — Inventory Table with Single Row Selected

**What:** Clone the existing inventory table frame from the example page and modify it to show one row selected with the "Edit Labels" button active with a badge count of 1.

- [ ] **Step 1: Clone the inventory table frame to the prototype page**

```js
// use_figma: Clone existing inventory frame
const srcPage = figma.root.children.find(p => p.id === "2002:975");
await figma.setCurrentPageAsync(srcPage);
const srcFrame = await figma.getNodeByIdAsync("4001:11700");
const clone = srcFrame.clone();

const destPage = figma.root.children.find(p => p.id === "4017:18500");
await figma.setCurrentPageAsync(destPage);
destPage.appendChild(clone);
clone.name = "Screen 1 - Single row selected";

return { clonedId: clone.id };
```

- [ ] **Step 2: Position Screen 1 inside the Flow 1 section**

Move the cloned frame into the Flow 1 section at position x=1353, y=677 (matching the example page layout).

- [ ] **Step 3: Verify with screenshot**

Take a screenshot of Screen 1 to confirm the table renders correctly with one selected row and the Edit Labels button showing badge count 1.

---

### Task 3: Build Screen 2 — Modal Open (Default State)

**What:** Create the Edit Labels modal with the flat checklist, applied label chips, search bar, type badges, locked system labels, and "Create new label" button. Overlay it on the inventory table.

- [ ] **Step 1: Clone Screen 1 as the base for Screen 2**

Clone Screen 1, rename to "Screen 2 - Modal open", position to the right of Screen 1 (x offset +1611).

- [ ] **Step 2: Build the modal frame structure**

Create the modal container frame (width 520, corner radius 12, white fill, drop shadow). Position centered over the table. Build the internal structure:
- A. Header: "Edit Labels" title + resource name subtitle
- B. Chips area: 3 applied label chips (web-frontend, production, us-west-2) with × icons
- C. Search input bar
- D. Flat checklist with 10 rows:
  - 3 selected (checked, blue tint): web-frontend [Application], production [Environment], us-west-2 [Location]
  - 5 unselected: api-gateway [Application], data-pipeline [Application], staging [Environment], development [Environment], eu-central-1 [Location]
  - 2 locked (disabled, reduced opacity): 🔒 system-managed-vpc [System], 🔒 tf-managed-network [Terraform]
- E. Footer: "3 labels applied · 2 managed" + Cancel / Undo Changes / Save buttons
- "Create new label" button at bottom of checklist

Each checklist row: checkbox + label name text + type badge pill (right-aligned).

- [ ] **Step 3: Add the semi-transparent backdrop overlay**

Add a dark overlay rectangle (opacity 0.4) behind the modal, covering the full frame, to indicate the modal is blocking the table.

- [ ] **Step 4: Verify with screenshot**

Take a screenshot of Screen 2 to confirm modal layout, chips, checklist rows with type badges, locked labels, and footer render correctly.

---

### Task 4: Build Screen 3 — Warning State

**What:** Show the modal after the user has made a change that triggers an inline warning (same-type replacement).

- [ ] **Step 1: Clone Screen 2 as the base**

Clone Screen 2, rename to "Screen 3 - Warning state", position to the right.

- [ ] **Step 2: Modify checklist to show the change**

- Uncheck "web-frontend" (move to unselected area)
- Check "api-gateway" (move to selected area, blue tint)
- Update chips: remove "web-frontend" chip, add "api-gateway" chip

- [ ] **Step 3: Add inline warning banner**

Insert a yellow/amber warning banner between the chips and the search bar:
- Background: #FEF3CD, border: 1px solid #FFC107, rounded corners
- Content: ⚠️ "Selecting **api-gateway** will replace **web-frontend** (same type: Application)"

- [ ] **Step 4: Show the change summary in the footer**

Add the green change summary bar above the action buttons:
- Background: #F0FDF4, border: 1px solid #BBF7D0
- Content: "Changes: Adding **api-gateway** · Removing **web-frontend** · Unchanged: 2 labels"

- [ ] **Step 5: Verify with screenshot**

---

### Task 5: Build Screen 4 — Change Summary Before Save

**What:** Show the final state before the user commits — the change summary is prominently visible and the Save button is ready.

- [ ] **Step 1: Clone Screen 3 as the base**

Clone Screen 3, rename to "Screen 4 - Change summary", position to the right.

- [ ] **Step 2: Remove the inline warning banner**

The warning has already been acknowledged. Remove the yellow warning banner. The change summary in the footer remains visible.

- [ ] **Step 3: Verify with screenshot**

---

### Task 6: Build Screen 5 — Multi-Select Table

**What:** Show the inventory table with 3 rows selected and the Edit Labels button showing badge count 3.

- [ ] **Step 1: Clone Screen 1 as the base**

Clone Screen 1, rename to "Screen 5 - Multi-select table", move into Flow 2 section.

- [ ] **Step 2: Modify to show 3 selected rows**

Check the checkboxes on 3 rows and highlight them. Update the Edit Labels badge count from 1 to 3.

- [ ] **Step 3: Verify with screenshot**

---

### Task 7: Build Screen 6 — Modal with Conflict Handling

**What:** Show the Edit Labels modal for multiple resources with "Multiple [type] Labels" conflict chips.

- [ ] **Step 1: Clone Screen 2 as the base**

Clone Screen 2, rename to "Screen 6 - Bulk edit with conflicts", move into Flow 2 section.

- [ ] **Step 2: Update modal header**

Change the subtitle from the resource name to "Modify Label assignments for 3 Resources."

- [ ] **Step 3: Replace chips with conflict chips**

Replace the individual label chips with:
- "web-frontend" chip (shared across all 3)
- "Multiple Environment Labels" chip (yellow tinted, with × icon)
- "Multiple Location Labels" chip (yellow tinted, with × icon)

- [ ] **Step 4: Verify with screenshot**

---

### Task 8: Build Screen 7 — No Match Search Result

**What:** Show the modal after the user types a search term with no results, with the "Create new label" button visible.

- [ ] **Step 1: Clone Screen 2 as the base**

Clone Screen 2, rename to "Screen 7 - No match search", move into Flow 3 section.

- [ ] **Step 2: Update search bar and checklist**

- Set search input text to "hello-world"
- Replace checklist rows with an empty state message: "No labels found"
- Ensure the "+ Create new label" button remains visible below the empty state

- [ ] **Step 3: Verify with screenshot**

---

### Task 9: Build Screen 8 — Inline Label Creation Form

**What:** Show the modal with the dropdown transitioned to an inline creation form (Name + Type fields).

- [ ] **Step 1: Clone Screen 7 as the base**

Clone Screen 7, rename to "Screen 8 - Inline create form", position to the right.

- [ ] **Step 2: Replace checklist area with inline form**

Replace the empty checklist and "+ Create new label" button with:
- Text at top: "hello-world" (the search term)
- Section header: "General"
- Name field: label "* Name", input pre-filled with "hello-world"
- Type field: label "* Type", dropdown with placeholder "Select a type for the new Label"
- Create (primary) and Cancel buttons at bottom

This matches Core's existing inline creation pattern from the reference screenshot.

- [ ] **Step 3: Verify with screenshot**

---

### Task 10: Final Review and Annotation

**What:** Add step labels above each screen, verify all screens are properly positioned, and take a final full-page screenshot.

- [ ] **Step 1: Add step header labels**

Import the small Horizontal Header component (key: `d1b24c1faab9733247d0ad1ee753cff7869332da`). Create instances above each screen frame with step descriptions:
- "Step 1: Select a row and click Edit Labels"
- "Step 2: Modal opens with flat checklist, type badges, and applied label chips"
- "Step 3: Warning appears when replacing a label of the same type"
- "Step 4: Change summary visible before saving"
- "Step 5: Select multiple rows"
- "Step 6: Modal shows conflict chips for differing labels"
- "Step 7: Search with no match — Create new label button visible"
- "Step 8: Inline form for creating a new label"

- [ ] **Step 2: Resize all sections to fit their content**

For each section, compute the max extents of children and resize with 100px padding.

- [ ] **Step 3: Take final full-page screenshot**

Use `get_screenshot` on the full page to verify the complete prototype layout.
