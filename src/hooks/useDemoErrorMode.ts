"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export type DemoErrorType = "404" | "500" | "401" | "403" | "504" | "207" | null;

export interface DemoErrorConfig {
  enabled: boolean;
  errorType: DemoErrorType;
  shouldSimulateError: (endpoint: string) => boolean;
  getSimulatedResponse: () => { status: number; body: unknown };
}

/**
 * Hook to enable demo error mode via URL params.
 * Usage: ?demo_error=500|401|403|504|207
 */
export function useDemoErrorMode(): DemoErrorConfig {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const errorParam = searchParams.get("demo_error") as DemoErrorType;

    if (
      !errorParam ||
      !["404", "500", "401", "403", "504", "207"].includes(errorParam)
    ) {
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
        case 404:
          return { status: 404, body: { error: "Resource not found" } };
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
            body: {
              success: true,
              partial: true,
              succeeded: 2,
              failed: 1,
              failedIds: ["rec-003"],
            },
          };
        default:
          return { status: 200, body: {} };
      }
    };

    return {
      enabled: true,
      errorType: errorParam,
      shouldSimulateError: (endpoint: string) =>
        endpoint.includes("/api/ai-labeling"),
      getSimulatedResponse,
    };
  }, [searchParams]);
}
