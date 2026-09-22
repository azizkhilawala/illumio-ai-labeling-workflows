"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { APIError } from "./useAILabelingErrors";
import { DemoErrorConfig } from "./useDemoErrorMode";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type LabelType = "App" | "Role" | "Env" | "Loc";
export type RecommendationStatus = "PENDING" | "APPROVED" | "IGNORED";

export interface Label {
  type: LabelType;
  value: string;
}

export interface GroupedRecommendation {
  id: string;
  label: Label;
  totalResources: number;
  cloudCount: number;
  dataCenterCount: number;
  csp: string;
  evidence: string;
  lastUpdated?: string;
  // For approved
  approvedBy?: string;
  approvedAt?: string;
  // For ignored
  reason?: string;
  ignoredBy?: string;
  ignoredAt?: string;
}

export interface RecommendationsResponse {
  data: GroupedRecommendation[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface StatsResponse {
  data: {
    summary: {
      pending: number;
      approved: number;
      ignored: number;
      totalResources: number;
    };
    labelTypeCounts: Array<{ type: string; count: number }>;
    recentActivity: Array<{
      id: string;
      action: string;
      entityType: string;
      entityId: string;
      userName: string | null;
      createdAt: string;
    }>;
  };
}

export interface LabelsResponse {
  data: {
    labels: Array<{ id: string; type: LabelType; value: string }>;
    byType: Record<string, Array<{ id: string; value: string }>>;
  };
}

export interface ResourceData {
  id: string;
  resourceName: string;
  resourceType: "cloud" | "dc";
  csp: string | null;
  accountId: string;
  region: string;
  category: string | null;
  state: string | null;
  hostname: string | null;
  existingLabels: Array<{ type: string; value: string }>;
  evidence: {
    appExplanationShort: string | null;
    appExplanation: string | null;
    roleExplanationShort: string | null;
    roleExplanation: string | null;
  };
  cloudTags?: Record<string, string>;
  processes?: Array<{ name: string; type: string | null; count: number; port: number | null }>;
  status: string;
  approvedBy?: string;
  approvedAt?: string;
  ignoredBy?: string;
  ignoredAt?: string;
  ignoreReason?: string;
}

export interface ResourcesResponse {
  data: ResourceData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  labelSummary: {
    type: string;
    value: string;
    totalResources: number;
    cloudCount: number;
    dcCount: number;
  };
  lastUpdated?: string;
}

export interface ApprovedResourceData {
  id: string;
  resourceName: string;
  hostname: string | null;
  approvedLabel: {
    type: LabelType;
    value: string;
  };
  platformType: "CLOUD" | "DATA_CENTER";
  cloudProvider: string | null;
  accountId: string | null;
  region: string | null;
  approvedBy: string;
  approvedAt: string;
}

export interface ApprovedResourcesResponse {
  data: ApprovedResourceData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filterOptions: {
    csps: string[];
    labelTypes: string[];
    accounts: string[];
    regions: string[];
  };
}

export interface IgnoredResourceData {
  id: string;
  resourceName: string;
  hostname: string | null;
  ignoredLabel: {
    type: LabelType;
    value: string;
  };
  platformType: "CLOUD" | "DATA_CENTER";
  cloudProvider: string | null;
  accountId: string | null;
  region: string | null;
  ignoreReason: string | null;
  ignoredBy: string;
  ignoredAt: string;
}

export interface IgnoredResourcesResponse {
  data: IgnoredResourceData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filterOptions: {
    csps: string[];
    labelTypes: string[];
    accounts: string[];
    regions: string[];
  };
}

// ---------------------------------------------------------------------------
// Query Keys
// ---------------------------------------------------------------------------

export const aiLabelingKeys = {
  all: ["ai-labeling"] as const,
  recommendations: (params?: Record<string, unknown>) =>
    [...aiLabelingKeys.all, "recommendations", params] as const,
  approved: (params?: Record<string, unknown>) =>
    [...aiLabelingKeys.all, "approved", params] as const,
  approvedResources: (params?: Record<string, unknown>) =>
    [...aiLabelingKeys.all, "approved-resources", params] as const,
  ignored: (params?: Record<string, unknown>) =>
    [...aiLabelingKeys.all, "ignored", params] as const,
  ignoredResources: (params?: Record<string, unknown>) =>
    [...aiLabelingKeys.all, "ignored-resources", params] as const,
  stats: () => [...aiLabelingKeys.all, "stats"] as const,
  labels: (params?: Record<string, unknown>) =>
    [...aiLabelingKeys.all, "labels", params] as const,
  resources: (params?: Record<string, unknown>) =>
    [...aiLabelingKeys.all, "resources", params] as const,
};

// ---------------------------------------------------------------------------
// Fetch Functions
// ---------------------------------------------------------------------------

async function fetchRecommendations(
  params: {
    status?: RecommendationStatus;
    labelType?: LabelType;
    labelValues?: string[];
    page?: number;
    limit?: number;
    sortBy?: string;
    timeFilter?: string;
  } = {}
): Promise<RecommendationsResponse> {
  const searchParams = new URLSearchParams();

  if (params.status) searchParams.set("status", params.status);
  if (params.labelType) searchParams.set("labelType", params.labelType);
  if (params.labelValues?.length)
    searchParams.set("labelValues", params.labelValues.join(","));
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params.timeFilter && params.timeFilter !== "all")
    searchParams.set("timeFilter", params.timeFilter);

  const res = await fetch(`/api/ai-labeling/recommendations?${searchParams}`);
  if (!res.ok) {
    const error = new Error("Failed to fetch recommendations") as APIError;
    error.status = res.status;
    throw error;
  }
  return res.json();
}

async function fetchApproved(
  params: {
    labelType?: LabelType;
    page?: number;
    limit?: number;
    sortBy?: string;
    timeFilter?: string;
  } = {}
): Promise<RecommendationsResponse> {
  const searchParams = new URLSearchParams();

  if (params.labelType) searchParams.set("labelType", params.labelType);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params.timeFilter && params.timeFilter !== "all")
    searchParams.set("timeFilter", params.timeFilter);

  const res = await fetch(`/api/ai-labeling/approved?${searchParams}`);
  if (!res.ok) {
    const error = new Error("Failed to fetch approved labels") as APIError;
    error.status = res.status;
    throw error;
  }
  return res.json();
}

async function fetchIgnored(
  params: {
    labelType?: LabelType;
    page?: number;
    limit?: number;
    sortBy?: string;
    timeFilter?: string;
  } = {}
): Promise<RecommendationsResponse> {
  const searchParams = new URLSearchParams();

  if (params.labelType) searchParams.set("labelType", params.labelType);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params.timeFilter && params.timeFilter !== "all")
    searchParams.set("timeFilter", params.timeFilter);

  const res = await fetch(`/api/ai-labeling/ignored?${searchParams}`);
  if (!res.ok) {
    const error = new Error("Failed to fetch ignored labels") as APIError;
    error.status = res.status;
    throw error;
  }
  return res.json();
}

async function fetchStats(): Promise<StatsResponse> {
  const res = await fetch("/api/ai-labeling/stats");
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

async function fetchResourcesByLabel(params: {
  labelType: LabelType;
  labelValue: string;
  status?: RecommendationStatus;
  csp?: string[];
  platformType?: "cloud" | "dc";
  page?: number;
  limit?: number;
}): Promise<ResourcesResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("labelType", params.labelType);
  searchParams.set("labelValue", params.labelValue);
  if (params.status) searchParams.set("status", params.status);
  if (params.csp?.length) {
    searchParams.set("csp", params.csp.join(","));
  }
  if (params.platformType) {
    searchParams.set("platformType", params.platformType === "cloud" ? "CLOUD" : "DATA_CENTER");
  }
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));

  const res = await fetch(`/api/ai-labeling/recommendations/resources?${searchParams}`);
  if (!res.ok) throw new Error("Failed to fetch resources");
  return res.json();
}

async function fetchLabels(
  params: {
    type?: LabelType;
    status?: RecommendationStatus;
  } = {}
): Promise<LabelsResponse> {
  const searchParams = new URLSearchParams();

  if (params.type) searchParams.set("type", params.type);
  if (params.status) searchParams.set("status", params.status);

  const res = await fetch(`/api/ai-labeling/labels?${searchParams}`);
  if (!res.ok) throw new Error("Failed to fetch labels");
  return res.json();
}

async function fetchApprovedResources(
  params: {
    csp?: string[];
    labelType?: LabelType;
    labelValue?: string;
    accountId?: string;
    region?: string;
    page?: number;
    limit?: number;
  } = {}
): Promise<ApprovedResourcesResponse> {
  const searchParams = new URLSearchParams();

  if (params.csp?.length) searchParams.set("csp", params.csp.join(","));
  if (params.labelType) searchParams.set("labelType", params.labelType);
  if (params.labelValue) searchParams.set("labelValue", params.labelValue);
  if (params.accountId) searchParams.set("accountId", params.accountId);
  if (params.region) searchParams.set("region", params.region);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));

  const res = await fetch(`/api/ai-labeling/approved/resources?${searchParams}`);
  if (!res.ok) throw new Error("Failed to fetch approved resources");
  return res.json();
}

async function fetchIgnoredResources(
  params: {
    csp?: string[];
    labelType?: LabelType;
    labelValue?: string;
    accountId?: string;
    region?: string;
    page?: number;
    limit?: number;
  } = {}
): Promise<IgnoredResourcesResponse> {
  const searchParams = new URLSearchParams();

  if (params.csp?.length) searchParams.set("csp", params.csp.join(","));
  if (params.labelType) searchParams.set("labelType", params.labelType);
  if (params.labelValue) searchParams.set("labelValue", params.labelValue);
  if (params.accountId) searchParams.set("accountId", params.accountId);
  if (params.region) searchParams.set("region", params.region);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));

  const res = await fetch(`/api/ai-labeling/ignored/resources?${searchParams}`);
  if (!res.ok) throw new Error("Failed to fetch ignored resources");
  return res.json();
}

// ---------------------------------------------------------------------------
// Hooks - Queries
// ---------------------------------------------------------------------------

export function useRecommendations(
  params: {
    labelType?: LabelType;
    labelValues?: string[];
    page?: number;
    limit?: number;
    sortBy?: string;
    timeFilter?: string;
  } = {}
) {
  return useQuery({
    queryKey: aiLabelingKeys.recommendations(params),
    queryFn: () => fetchRecommendations({ ...params, status: "PENDING" }),
  });
}

export function useApproved(
  params: {
    labelType?: LabelType;
    page?: number;
    limit?: number;
    sortBy?: string;
    timeFilter?: string;
  } = {}
) {
  return useQuery({
    queryKey: aiLabelingKeys.approved(params),
    queryFn: () => fetchApproved(params),
  });
}

export function useIgnored(
  params: {
    labelType?: LabelType;
    page?: number;
    limit?: number;
    sortBy?: string;
    timeFilter?: string;
  } = {}
) {
  return useQuery({
    queryKey: aiLabelingKeys.ignored(params),
    queryFn: () => fetchIgnored(params),
  });
}

export function useStats() {
  return useQuery({
    queryKey: aiLabelingKeys.stats(),
    queryFn: fetchStats,
  });
}

export function useLabels(
  params: {
    type?: LabelType;
    status?: RecommendationStatus;
  } = {}
) {
  return useQuery({
    queryKey: aiLabelingKeys.labels(params),
    queryFn: () => fetchLabels(params),
  });
}

export function useResourcesByLabel(params: {
  labelType: LabelType;
  labelValue: string;
  status?: RecommendationStatus;
  csp?: string[];
  platformType?: "cloud" | "dc";
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: aiLabelingKeys.resources(params),
    queryFn: () => fetchResourcesByLabel(params),
    enabled: !!params.labelType && !!params.labelValue,
  });
}

export function useApprovedResources(
  params: {
    csp?: string[];
    labelType?: LabelType;
    labelValue?: string;
    accountId?: string;
    region?: string;
    page?: number;
    limit?: number;
  } = {}
) {
  return useQuery({
    queryKey: aiLabelingKeys.approvedResources(params),
    queryFn: () => fetchApprovedResources(params),
  });
}

export function useIgnoredResources(
  params: {
    csp?: string[];
    labelType?: LabelType;
    labelValue?: string;
    accountId?: string;
    region?: string;
    page?: number;
    limit?: number;
  } = {}
) {
  return useQuery({
    queryKey: aiLabelingKeys.ignoredResources(params),
    queryFn: () => fetchIgnoredResources(params),
  });
}

// ---------------------------------------------------------------------------
// Hooks - Mutations
// ---------------------------------------------------------------------------

export function useApproveRecommendations(demoConfig?: DemoErrorConfig) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      ids,
      userId = "current-user",
      userName = "Current User",
    }: {
      ids: string[];
      userId?: string;
      userName?: string;
    }) => {
      // Demo mode simulation
      if (demoConfig?.enabled && demoConfig.shouldSimulateError("/api/ai-labeling/recommendations")) {
        const simulated = demoConfig.getSimulatedResponse();
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (simulated.status !== 200 && simulated.status !== 207) {
          const error = new Error("Simulated error") as APIError;
          error.status = simulated.status;
          throw error;
        }
        return simulated.body;
      }

      const res = await fetch("/api/ai-labeling/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve", ids, userId, userName }),
      });

      if (!res.ok) {
        const error = new Error("Failed to approve recommendations") as APIError;
        error.status = res.status;
        throw error;
      }

      const data = await res.json();
      if (res.status === 207 || data.partial) {
        return { ...data, partial: true };
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabelingKeys.all });
    },
  });
}

export function useIgnoreRecommendations(demoConfig?: DemoErrorConfig) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      ids,
      reason,
      userId = "current-user",
      userName = "Current User",
    }: {
      ids: string[];
      reason?: string;
      userId?: string;
      userName?: string;
    }) => {
      // Demo mode simulation
      if (demoConfig?.enabled && demoConfig.shouldSimulateError("/api/ai-labeling/recommendations")) {
        const simulated = demoConfig.getSimulatedResponse();
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (simulated.status !== 200 && simulated.status !== 207) {
          const error = new Error("Simulated error") as APIError;
          error.status = simulated.status;
          throw error;
        }
        return simulated.body;
      }

      const res = await fetch("/api/ai-labeling/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ignore", ids, reason, userId, userName }),
      });

      if (!res.ok) {
        const error = new Error("Failed to ignore recommendations") as APIError;
        error.status = res.status;
        throw error;
      }

      const data = await res.json();
      if (res.status === 207 || data.partial) {
        return { ...data, partial: true };
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabelingKeys.all });
    },
  });
}

export function useRestoreRecommendations(demoConfig?: DemoErrorConfig) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      ids,
      userId = "current-user",
      userName = "Current User",
    }: {
      ids: string[];
      userId?: string;
      userName?: string;
    }) => {
      // Demo mode simulation
      if (demoConfig?.enabled && demoConfig.shouldSimulateError("/api/ai-labeling/ignored")) {
        const simulated = demoConfig.getSimulatedResponse();
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (simulated.status !== 200) {
          const error = new Error("Simulated error") as APIError;
          error.status = simulated.status;
          throw error;
        }
        return simulated.body;
      }

      const res = await fetch("/api/ai-labeling/ignored", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, userId, userName }),
      });

      if (!res.ok) {
        const error = new Error("Failed to restore recommendations") as APIError;
        error.status = res.status;
        throw error;
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabelingKeys.all });
    },
  });
}

export function useUpdateRecommendation(demoConfig?: DemoErrorConfig) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      action,
      reason,
      newLabelType,
      newLabelValue,
      userId = "current-user",
      userName = "Current User",
    }: {
      id: string;
      action: "approve" | "ignore" | "edit";
      reason?: string;
      newLabelType?: LabelType;
      newLabelValue?: string;
      userId?: string;
      userName?: string;
    }) => {
      // Demo mode simulation
      if (demoConfig?.enabled && demoConfig.shouldSimulateError(`/api/ai-labeling/recommendations/${id}`)) {
        const simulated = demoConfig.getSimulatedResponse();
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (simulated.status !== 200) {
          const error = new Error("Simulated error") as APIError;
          error.status = simulated.status;
          throw error;
        }
        return simulated.body;
      }

      const res = await fetch(`/api/ai-labeling/recommendations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          reason,
          newLabelType,
          newLabelValue,
          userId,
          userName,
        }),
      });

      if (!res.ok) {
        const error = new Error(`Failed to ${action} recommendation`) as APIError;
        error.status = res.status;
        throw error;
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabelingKeys.all });
    },
  });
}

export function useResetDemo(demoConfig?: DemoErrorConfig) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId = "current-user",
      userName = "Current User",
    }: {
      userId?: string;
      userName?: string;
    } = {}) => {
      // Demo mode simulation
      if (demoConfig?.enabled && demoConfig.shouldSimulateError("/api/ai-labeling/reset")) {
        const simulated = demoConfig.getSimulatedResponse();
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (simulated.status !== 200) {
          const error = new Error("Simulated error") as APIError;
          error.status = simulated.status;
          throw error;
        }
        return simulated.body;
      }

      const res = await fetch("/api/ai-labeling/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userName }),
      });

      if (!res.ok) {
        const error = new Error("Failed to reset demo") as APIError;
        error.status = res.status;
        throw error;
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aiLabelingKeys.all });
    },
  });
}

export async function exportToCSV(tab: "recommended" | "approved" | "ignored"): Promise<void> {
  const res = await fetch(`/api/ai-labeling/export?tab=${tab}`);
  if (!res.ok) throw new Error("Failed to export");

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ai-labeling-${tab}-${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
