"use client";

import { useCallback } from "react";
import { useToast } from "@/design-system/components/Toast";

export type ErrorCode = 404 | 401 | 403 | 500 | 504 | 207 | number;
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

function getErrorConfig(
  status: number,
  context: string,
  retryFn?: () => void
): ErrorConfig {
  switch (status) {
    case 404:
      return {
        status: 404,
        feedbackType: "banner",
        title: `Unable to Load ${context}`,
        description: "The requested data could not be found. This may be a temporary issue.",
        action: retryFn ? { label: "Retry", onClick: retryFn } : undefined,
        persistent: false,
      };
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
}

export function useAILabelingErrors() {
  const toast = useToast();

  const handleError = useCallback(
    (
      error: APIError | Error,
      context: string,
      retryFn?: () => void
    ): ErrorConfig => {
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
