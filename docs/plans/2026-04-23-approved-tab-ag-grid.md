# Approved Tab AG Grid Implementation Plan

## Context

The AI Labeling landing page's Approved tab currently shows cards grouped by label. The Figma design requires an AG Grid table showing individual approved resources with specific columns and filters. This change is needed for the executive demo to display approved resources in a detailed table format.

**Figma Reference:** https://www.figma.com/design/8VVmi4sva1ehckP8wC2flJ/AI-Labeling---v2?node-id=1499-210381

---

## Current State

- **Approved API** (`/api/ai-labeling/approved`): Returns data grouped by label for card view
- **UI**: Shows `AppCard` components for approved items
- **No table view** for approved resources

## Target State (from Figma)

### Filters (in order)
1. CSP (dropdown)
2. Resource (dropdown) 
3. Approved Labels (dropdown)
4. Type (dropdown)
5. Account (dropdown)
6. Region (dropdown)
7. Add Filter (button)

### AG Grid Table Columns
1. **Resource Name** - Resource name with hostname subtitle
2. **Existing Labels** - Shows approved AI label with green checkmark icon + Pill
3. **Platform** - Cloud/Data Center badge
4. **Account / Region** - Account ID and region text
5. **Approved By** - Avatar + User name
6. **Approved Date** - Formatted date string

---

## Implementation Tasks

### Task 1: Create Approved Resources API Endpoint

**Create:** `src/app/api/ai-labeling/approved/resources/route.ts`

Returns flat list of approved resources (not grouped by label) with filters:
- `csp`: CloudProvider filter
- `labelType`: Label type filter  
- `labelValue`: Specific label value filter
- `accountId`: Account filter
- `region`: Region filter
- `page`, `limit`: Pagination

Response shape:
```typescript
{
  data: [{
    id: string,
    resourceName: string,
    hostname: string | null,
    approvedLabel: { type: LabelType, value: string },
    platformType: "CLOUD" | "DATA_CENTER",
    cloudProvider: string | null,
    accountId: string | null,
    region: string | null,
    approvedBy: string,
    approvedAt: string,
  }],
  pagination: { page, limit, total, totalPages },
  filterOptions: {
    csps: string[],
    labelTypes: string[],
    accounts: string[],
    regions: string[],
  }
}
```

---

### Task 2: Add useApprovedResources Hook

**Modify:** `src/hooks/useAILabeling.ts`

Add:
- `fetchApprovedResources()` function
- `useApprovedResources()` hook with filter params
- Types: `ApprovedResourceData`, `ApprovedResourcesResponse`

---

### Task 3: Create ApprovedResourcesTable Component

**Modify:** `src/design-system/floorplans/AILabelingFloorplan.tsx`

Create `ApprovedResourcesTable` component with:

**Column definitions:**
```typescript
const approvedColumnDefs: ColDef<ApprovedResourceData>[] = [
  { field: "resourceName", headerName: "Resource Name", cellRenderer: ResourceNameCell },
  { field: "approvedLabel", headerName: "Existing Labels", cellRenderer: ApprovedLabelCell },
  { field: "platformType", headerName: "Platform", cellRenderer: PlatformCell },
  { field: "accountId", headerName: "Account / Region", cellRenderer: AccountRegionCell },
  { field: "approvedBy", headerName: "Approved By", cellRenderer: ApprovedByCell },
  { field: "approvedAt", headerName: "Approved Date" },
]
```

**Custom cell renderers:**
- `ResourceNameCell`: Resource name + hostname subtitle
- `ApprovedLabelCell`: Green checkmark icon + Pill with label
- `PlatformCell`: Cloud/Data Center badge
- `AccountRegionCell`: Account ID and region
- `ApprovedByCell`: Avatar + user name

---

### Task 4: Add Approved Tab Filter Controls

**Modify:** `src/design-system/floorplans/AILabelingFloorplan.tsx`

Add filter state and controls for Approved tab:
```typescript
const [approvedFilters, setApprovedFilters] = useState({
  csp: null,
  labelType: null,
  approvedLabel: null,
  accountId: null,
  region: null,
});
```

Render filter dropdowns when `activeTab === "approved"`:
- CSP dropdown
- Resource dropdown (search/filter)
- Approved Labels dropdown
- Type dropdown
- Account dropdown
- Region dropdown

---

### Task 5: Integrate Table in Approved Tab

**Modify:** `src/design-system/floorplans/AILabelingFloorplan.tsx`

Update the rendering logic:
```typescript
// In the main content area:
{activeTab === "approved" ? (
  <ApprovedResourcesTable 
    filters={approvedFilters}
    onFilterChange={setApprovedFilters}
  />
) : activeTab === "recommended" && viewMode === "table" ? (
  <RecommendationsTable ... />
) : (
  renderCards(getCurrentData())
)}
```

---

## Files to Modify

| File | Action |
|------|--------|
| `src/app/api/ai-labeling/approved/resources/route.ts` | Create - New API endpoint |
| `src/hooks/useAILabeling.ts` | Modify - Add hook and types |
| `src/design-system/floorplans/AILabelingFloorplan.tsx` | Modify - Add table, filters, cell renderers |

---

## Verification

1. **TypeScript:** Run `npx tsc --noEmit`
2. **Build:** Run `npm run build`
3. **Manual test:**
   - Navigate to `/demos/ai-labeling`
   - Approve some resources from Recommended tab
   - Switch to Approved tab
   - Verify AG Grid table displays with all columns
   - Test filters (CSP, Label Type, Account, Region)
   - Verify cell renderers display correctly:
     - Resource name with hostname
     - Green checkmark + label pill
     - Platform badge
     - Avatar + approver name
4. **Commit changes**
