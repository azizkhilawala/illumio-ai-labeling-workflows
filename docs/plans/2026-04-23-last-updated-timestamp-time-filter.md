# Label Recommendation Card: Last Updated Timestamp + Time Filter

## Context

The label recommendation cards need to display a "Last Updated" timestamp per the Figma design. Additionally, the existing Time filter dropdown (24h, 7d, 30d, 90d) needs to actually filter results based on this timestamp.

**Figma Reference:** https://www.figma.com/design/8VVmi4sva1ehckP8wC2flJ/AI-Labeling---v2?node-id=1331-122185

**Current State:**
- Database: `LabelRecommendation` model has `createdAt` and `updatedAt` fields (index exists on `createdAt`)
- API: `/api/ai-labeling/recommendations` does NOT return timestamps
- Card UI: No timestamp displayed on recommendation cards
- Time Filter: UI exists but NOT connected to API (filtering doesn't work)

**Target State:**
- Cards display "Last Updated: Apr 16, 2026 10:00 AM" below Cloud/Data Center counts
- Time filter dropdown filters recommendations by the `updatedAt` timestamp
- All three tabs (Recommended, Approved, Ignored) support time filtering

---

## Implementation Tasks

### Task 1: Update API to Return `lastUpdated` Timestamp

**Modify:** `src/app/api/ai-labeling/recommendations/route.ts`

Add `lastUpdated` field to the response. For grouped recommendations, use the most recent `updatedAt` from the underlying recommendations.

```typescript
// In the grouping logic, track the most recent updatedAt:
const lastUpdated = groupedRecs.reduce((latest, rec) => {
  return rec.updatedAt > latest ? rec.updatedAt : latest;
}, groupedRecs[0]?.updatedAt);

// Return formatted timestamp:
lastUpdated: lastUpdated?.toLocaleString("en-US", {
  month: "short",
  day: "numeric", 
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
})
```

---

### Task 2: Add Time Filter Parameter to APIs

**Modify:** `src/app/api/ai-labeling/recommendations/route.ts`

Add `timeFilter` query parameter support:

```typescript
const timeFilter = searchParams.get("timeFilter") || "all";

// Calculate date range based on filter
let dateFrom: Date | null = null;
if (timeFilter !== "all") {
  const now = new Date();
  switch (timeFilter) {
    case "24h": dateFrom = new Date(now.getTime() - 24 * 60 * 60 * 1000); break;
    case "7d": dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); break;
    case "30d": dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); break;
    case "90d": dateFrom = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000); break;
  }
}

// Add to Prisma where clause:
where: {
  ...existingConditions,
  ...(dateFrom && { updatedAt: { gte: dateFrom } }),
}
```

**Also update:** 
- `src/app/api/ai-labeling/approved/route.ts`
- `src/app/api/ai-labeling/ignored/route.ts`

---

### Task 3: Update Hook Types and Fetch Functions

**Modify:** `src/hooks/useAILabeling.ts`

Add `lastUpdated` to `GroupedRecommendation` interface:
```typescript
export interface GroupedRecommendation {
  // ... existing fields
  lastUpdated?: string;  // Formatted timestamp string
}
```

Add `timeFilter` parameter to fetch functions:
```typescript
export async function fetchRecommendations(params: {
  // ... existing params
  timeFilter?: string;
}): Promise<RecommendationsResponse> {
  const searchParams = new URLSearchParams();
  // ... existing params
  if (params.timeFilter && params.timeFilter !== "all") {
    searchParams.set("timeFilter", params.timeFilter);
  }
  // ...
}
```

Update `fetchApproved()` and `fetchIgnored()` similarly.

---

### Task 4: Update AppCard to Display Timestamp

**Modify:** `src/design-system/floorplans/AILabelingFloorplan.tsx`

Update `AppCardData` interface (around line 73):
```typescript
interface AppCardData {
  // ... existing fields
  lastUpdated?: string;  // "Apr 16, 2026 10:00 AM"
}
```

Update `AppCard` component (around line 1167) to display timestamp below the Cloud/Data Center boxes:
```tsx
{/* After the Cloud/Data Center count boxes */}
{data.lastUpdated && (
  <div style={{
    fontFamily: "var(--font-geist-sans)",
    fontSize: "11px",
    fontWeight: 400,
    color: "#a3b6c7",  // lightning-bluegray/500
    marginTop: "8px",
  }}>
    Last Updated: {data.lastUpdated}
  </div>
)}
```

---

### Task 5: Connect Time Filter to API Calls

**Modify:** `src/design-system/floorplans/AILabelingFloorplan.tsx`

Pass `timeFilter` state to the hooks/fetch calls:

```typescript
// In useEffect or data fetching logic:
const { data: recommendations } = useRecommendations({
  status: "PENDING",
  timeFilter: timeFilter,  // Add this
  // ... other params
});
```

Update the `useRecommendations`, `useApproved`, and `useIgnored` hooks to accept and use `timeFilter`.

---

## Files to Modify

| File | Action |
|------|--------|
| `src/app/api/ai-labeling/recommendations/route.ts` | Add `lastUpdated` to response + `timeFilter` param |
| `src/app/api/ai-labeling/approved/route.ts` | Add `timeFilter` param support |
| `src/app/api/ai-labeling/ignored/route.ts` | Add `timeFilter` param support |
| `src/hooks/useAILabeling.ts` | Add `lastUpdated` type + `timeFilter` to fetch functions |
| `src/design-system/floorplans/AILabelingFloorplan.tsx` | Display timestamp in card + connect filter to API |

---

## Verification

1. **TypeScript:** Run `npx tsc --noEmit`
2. **Build:** Run `npm run build`
3. **Manual test:**
   - Navigate to `/demos/ai-labeling`
   - Verify each recommendation card shows "Last Updated: [timestamp]"
   - Test time filter:
     - Select "Last 24 Hours" → only recent recommendations shown
     - Select "Last 7 Days" → expanded results
     - Select "All Time" → all recommendations
   - Verify filter works on all three tabs (Recommended, Approved, Ignored)
4. **Commit changes**
