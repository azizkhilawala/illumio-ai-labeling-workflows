# AI Labeling Error Handling Implementation Plan

## Context

The AI Labeling feature currently has inconsistent error handling:
- Some mutations show toasts, others silently fail to console
- No HTTP status code differentiation (all errors treated as generic failures)
- No demo mode for developers to test error states
- `ErrorEmptyState` illustration exists but is unused

This plan introduces centralized error handling, consistent feedback patterns, and a developer demo mode.

---

## Error Handling Matrix

| Status Code | Feedback Type | Component | User Action |
|-------------|---------------|-----------|-------------|
| 200 | Toast (success) | `useToast().success()` | None |
| 207 | Toast (warning) | `useToast().warning()` | Review partial failures |
| 401 | Banner (persistent) | `NotificationBanner status="error"` | Sign in |
| 403 | Banner (persistent) | `NotificationBanner status="error"` | Contact admin |
| 500 | Toast (error) | `useToast().error()` with retry action | Retry |
| 504 | Toast (error) | `useToast().error()` with retry action | Try again |
| Query Error | EmptyState | `EmptyState illustration="error"` | Retry |

---

## Implementation Tasks

### Task 1: Create Centralized Error Handler Utility

**Create:** `src/hooks/useAILabelingErrors.ts`

```typescript
"use client";

import { useCallback } from "react";
import { useToast } from "@/design-system/components/Toast";

export type ErrorCode = 401 | 403 | 500 | 504 | 207 | number;
export type FeedbackType = "toast" | "banner" | "empty-state";

export interface APIError extends Error {
  status: number;
  code?: string;
  details?: unknown;
}

export interface ErrorConfig {
  status: number;
  feedbackType: FeedbackType;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
  persistent?: boolean;
}

export interface PartialSuccessResult {
  succeeded: number;
  failed: number;
  failedIds?: string[];
}

const getErrorConfig = (
  status: number,
  context: string,
  retryFn?: () => void
): ErrorConfig => {
  switch (status) {
    case 401:
      return {
        status: 401,
        feedbackType: "banner",
        title: "Session Expired",
        description: "Your session has expired. Please sign in again.",
        persistent: true,
      };
    case 403:
      return {
        status: 403,
        feedbackType: "banner",
        title: "Access Denied",
        description: "You don't have permission. Contact your administrator.",
        persistent: true,
      };
    case 500:
      return {
        status: 500,
        feedbackType: "toast",
        title: `${context} Failed`,
        description: "A server error occurred. Please try again.",
        action: retryFn ? { label: "Retry", onClick: retryFn } : undefined,
      };
    case 504:
      return {
        status: 504,
        feedbackType: "toast",
        title: "Request Timeout",
        description: "The request took too long. Please try again.",
        action: retryFn ? { label: "Try Again", onClick: retryFn } : undefined,
      };
    default:
      return {
        status,
        feedbackType: "toast",
        title: `${context} Failed`,
        description: "An unexpected error occurred. Please try again.",
        action: retryFn ? { label: "Retry", onClick: retryFn } : undefined,
      };
  }
};

export function useAILabelingErrors() {
  const toast = useToast();

  const handleError = useCallback(
    (error: APIError | Error, context: string, retryFn?: () => void): ErrorConfig => {
      const status = (error as APIError).status || 500;
      const config = getErrorConfig(status, context, retryFn);

      if (config.feedbackType === "toast") {
        toast.error(config.title, {
          description: config.description,
          action: config.action,
          duration: 5000,
        });
      }

      return config;
    },
    [toast]
  );

  const handlePartialSuccess = useCallback(
    (result: PartialSuccessResult, context: string) => {
      toast.warning(`${context} Partially Completed`, {
        description: `${result.succeeded} succeeded, ${result.failed} failed.`,
        duration: 7000,
      });
    },
    [toast]
  );

  return { handleError, handlePartialSuccess };
}
```

---

### Task 2: Create Demo Mode Hook

**Create:** `src/hooks/useDemoErrorMode.ts`

```typescript
"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export type DemoErrorType = "500" | "401" | "403" | "504" | "207" | null;

export interface DemoErrorConfig {
  enabled: boolean;
  errorType: DemoErrorType;
  shouldSimulateError: (endpoint: string) => boolean;
  getSimulatedResponse: () => { status: number; body: unknown };
}

export function useDemoErrorMode(): DemoErrorConfig {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const errorParam = searchParams.get("demo_error") as DemoErrorType;

    if (!errorParam || !["500", "401", "403", "504", "207"].includes(errorParam)) {
      return {
        enabled: false,
        errorType: null,
        shouldSimulateError: () => false,
        getSimulatedResponse: () => ({ status: 200, body: {} }),
      };
    }

    const status = parseInt(errorParam, 10);

    const getSimulatedResponse = () => {
      switch (status) {
        case 401:
          return { status: 401, body: { error: "Session expired" } };
        case 403:
          return { status: 403, body: { error: "Access denied" } };
        case 500:
          return { status: 500, body: { error: "Internal server error" } };
        case 504:
          return { status: 504, body: { error: "Gateway timeout" } };
        case 207:
          return {
            status: 207,
            body: { success: true, partial: true, succeeded: 2, failed: 1 },
          };
        default:
          return { status: 200, body: {} };
      }
    };

    return {
      enabled: true,
      errorType: errorParam,
      shouldSimulateError: (endpoint: string) =>
        endpoint.includes("/api/ai-labeling/recommendations"),
      getSimulatedResponse,
    };
  }, [searchParams]);
}
```

---

### Task 3: Update useAILabeling.ts

**Modify:** `src/hooks/useAILabeling.ts`

Changes:
1. Import `APIError` type from `useAILabelingErrors`
2. Replace generic `throw new Error()` with `APIError` including status code
3. Add `demoConfig` parameter to mutation hooks
4. Return partial success data when status is 207

Key changes to `useApproveRecommendations`:
```typescript
export function useApproveRecommendations(demoConfig?: DemoErrorConfig) {
  return useMutation({
    mutationFn: async ({ ids, userId, userName }) => {
      // Demo mode simulation
      if (demoConfig?.enabled && demoConfig.shouldSimulateError("/api/...")) {
        const simulated = demoConfig.getSimulatedResponse();
        if (simulated.status !== 200 && simulated.status !== 207) {
          const error = new Error("Simulated error") as APIError;
          error.status = simulated.status;
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        return simulated.body;
      }

      const res = await fetch("/api/ai-labeling/recommendations", { ... });
      
      if (!res.ok) {
        const error = new Error("Failed to approve") as APIError;
        error.status = res.status;
        throw error;
      }
      
      const data = await res.json();
      if (res.status === 207 || data.partial) {
        return { ...data, partial: true };
      }
      return data;
    },
  });
}
```

---

### Task 4: Update AILabelingFloorplan.tsx

**Modify:** `src/design-system/floorplans/AILabelingFloorplan.tsx`

Changes:
1. Import `NotificationBanner`, `EmptyState`, error hooks
2. Add `authError` state for persistent banner
3. Integrate `useAILabelingErrors` and `useDemoErrorMode`
4. Pass `demoConfig` to mutations
5. Update `onError` handlers to use `handleError`
6. Render auth banner when `authError` is set
7. Render `ErrorEmptyState` when `recommendationsError` exists

```typescript
// Add state
const [authError, setAuthError] = useState<{ status: number; message: string } | null>(null);
const { handleError, handlePartialSuccess } = useAILabelingErrors();
const demoConfig = useDemoErrorMode();

// Pass demo config to mutations
const approveMutation = useApproveRecommendations(demoConfig);

// Update onError handlers
onError: (error: APIError) => {
  const config = handleError(error, "Approval", () => handleApproveConfirm());
  if (config.status === 401 || config.status === 403) {
    setAuthError({ status: config.status, message: config.description });
  }
  setApproveModalOpen(false);
}

// Render auth banner
{authError && (
  <NotificationBanner
    status="error"
    title={authError.status === 401 ? "Session Expired" : "Access Denied"}
    description={authError.message}
    showCloseButton
    onClose={() => setAuthError(null)}
  />
)}

// Render error empty state
{recommendationsError && (
  <EmptyState
    illustration="error"
    title="Failed to Load Recommendations"
    description="We couldn't load your recommendations."
    linkText="Retry"
    onLinkClick={() => refetchRecommendations()}
  />
)}
```

---

### Task 5: Update AILabelingDetailFloorplan.tsx

**Modify:** `src/design-system/floorplans/AILabelingDetailFloorplan.tsx`

Apply same patterns as Task 4:
- Add auth error banner state
- Integrate error handler hooks
- Pass demo config to mutations
- Consistent error handling for approve/ignore

---

### Task 6: Add 207 Partial Success to API

**Modify:** `src/app/api/ai-labeling/recommendations/route.ts`

Update POST handler to track per-item success/failure:
```typescript
const results = { succeeded: 0, failed: 0, failedIds: [] };

for (const id of ids) {
  try {
    await processSingleRecommendation(id, ...);
    results.succeeded++;
  } catch {
    results.failed++;
    results.failedIds.push(id);
  }
}

if (results.failed > 0 && results.succeeded > 0) {
  return NextResponse.json({ partial: true, ...results }, { status: 207 });
}
```

---

## Files Summary

| File | Action |
|------|--------|
| `src/hooks/useAILabelingErrors.ts` | Create |
| `src/hooks/useDemoErrorMode.ts` | Create |
| `src/hooks/useAILabeling.ts` | Modify - add APIError, demo support |
| `src/design-system/floorplans/AILabelingFloorplan.tsx` | Modify - add banners, error handling |
| `src/design-system/floorplans/AILabelingDetailFloorplan.tsx` | Modify - mirror error handling |
| `src/app/api/ai-labeling/recommendations/route.ts` | Modify - add 207 support |

---

## Demo Mode Usage

Test error states by adding URL parameters:

```
/demos/ai-labeling?demo_error=500   # Server error toast with retry
/demos/ai-labeling?demo_error=401   # Auth expired banner
/demos/ai-labeling?demo_error=403   # Access denied banner
/demos/ai-labeling?demo_error=504   # Timeout toast with retry
/demos/ai-labeling?demo_error=207   # Partial success warning
```

---

## Verification

1. **TypeScript:** Run `npx tsc --noEmit`
2. **Build:** Run `npm run build`
3. **Manual Testing:**
   - Visit `/demos/ai-labeling?demo_error=500` → verify error toast with "Retry" button appears
   - Visit `/demos/ai-labeling?demo_error=401` → verify auth banner appears at top
   - Visit `/demos/ai-labeling?demo_error=403` → verify access denied banner appears
   - Visit `/demos/ai-labeling?demo_error=504` → verify timeout toast with "Try Again" button
   - Visit `/demos/ai-labeling?demo_error=207` → verify warning toast shows partial success count
   - Click retry/try again buttons → verify mutation fires again
   - Dismiss auth banner → verify it closes
