"use client";

import React, { useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import type { ColDef, RowClickedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "@/design-system/integrations/ag-grid-theme.css";

import { Header } from "../components/Header";
import { SideNav, SideNavSection, SideNavItem } from "../components/SideNav";
import { OptionSelector } from "../components/Form";
import { Button } from "../components/Button";
import { Pill } from "../components/Pill";
import {
  Slideout,
  SlideoutHeader,
  SlideoutBody,
  SlideoutSection,
  SlideoutFooter,
  SlideoutFooterGroup,
} from "../components/Slideout";
import { Icon } from "@/design-system/icons";

ModuleRegistry.registerModules([AllCommunityModule]);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PolicyDecision = "Allowed" | "Denied" | "Mixed";
type ResourceType = "Compute" | "Network Routing" | "Storage" | "Database" | "Unknown";
type CloudProvider = "aws" | "azure" | "gcp" | "oci";

interface FlowData {
  id: number;
  trafficStatus: PolicyDecision;
  // Source fields
  sourceIp: string;
  sourceName: string;
  sourceResourceType: ResourceType;
  sourceResourceSubtype: string;
  sourceLabels: string[];
  sourceCloud: CloudProvider;
  sourceAccount: string;
  sourceRegion: string;
  sourceCspId: string;
  sourceCategory: string;
  // Destination fields
  destIp: string;
  destName: string;
  destResourceType: ResourceType;
  destResourceSubtype: string;
  destLabels: string[];
  destCloud: CloudProvider;
  destAccount: string;
  destRegion: string;
  destCspId: string;
  destCategory: string;
  // Flow metadata
  port: number;
  protocol: string;
  byteCount: string;
  firstDetected: string;
  lastDetected: string;
  // Captured At (for filtering)
  capturedAt: "vpc_flow_log" | "firewall_flow_log" | "firewall_alert_log";
  capturedAtSource: string;
  // Firewall fields (for filtering)
  throughFirewall: string | null;
}

// ---------------------------------------------------------------------------
// Filter builder types
// ---------------------------------------------------------------------------

type FilterCategory =
  | "cloud"
  | "account"
  | "resource_name"
  | "region"
  | "resource_type"
  | "vpc_vnet_id"
  | "captured_at"
  | "through_firewall";

type FilterSourceDest = "source" | "destination" | "any";

interface ActiveFilter {
  id: string;
  sourceDest: FilterSourceDest;
  category: FilterCategory;
  operator: "=" | "in";
  value: string[];
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const FILTER_CATEGORIES: { id: FilterCategory; label: string }[] = [
  { id: "cloud", label: "Cloud" },
  { id: "account", label: "Account" },
  { id: "resource_name", label: "Resource Name" },
  { id: "region", label: "Region" },
  { id: "resource_type", label: "Resource Type" },
  { id: "vpc_vnet_id", label: "VPC/VNET ID" },
  { id: "captured_at", label: "Captured At" },
  { id: "through_firewall", label: "Through Firewall" },
];

const CLOUD_OPTIONS = [
  { id: "aws", label: "aws" },
  { id: "azure", label: "azure" },
  { id: "gcp", label: "gcp" },
  { id: "oci", label: "oci" },
];

const CAPTURED_AT_OPTIONS = [
  { id: "vpc_flow_log", label: "VPC Flow Log" },
  { id: "firewall_flow_log", label: "Firewall Flow Log" },
  { id: "firewall_alert_log", label: "Firewall Alert Log" },
];

const FIREWALL_OPTIONS = [
  { id: "prod-egress-fw", label: "prod-egress-fw" },
  { id: "dev-inspection-fw", label: "dev-inspection-fw" },
  { id: "staging-fw", label: "staging-fw" },
  { id: "corp-perimeter-fw", label: "corp-perimeter-fw" },
  { id: "dr-egress-fw", label: "dr-egress-fw" },
];

const TIME_RANGE_OPTIONS = [
  { id: "last_7_days", label: "Last 7 Days" },
  { id: "last_24_hours", label: "Last 24 Hours" },
  { id: "last_hour", label: "Last Hour" },
  { id: "custom", label: "Custom Range" },
];

const MATCH_CONDITION_OPTIONS = [
  { id: "and", label: "Match All Conditions (AND)" },
  { id: "or", label: "Match Any Condition (OR)" },
];

const MOCK_FLOWS: FlowData[] = [
  {
    id: 1,
    trafficStatus: "Allowed",
    sourceIp: "10.211.1.207",
    sourceName: "source-user-a",
    sourceResourceType: "Compute",
    sourceResourceSubtype: "EC2Instance",
    sourceLabels: ["env:prod", "team:platform"],
    sourceCloud: "aws",
    sourceAccount: "575207827313",
    sourceRegion: "us-west-2",
    sourceCspId: "i-0de5a2fa2fc66464d",
    sourceCategory: "Compute",
    destIp: "93.241.86.156",
    destName: "",
    destResourceType: "Unknown",
    destResourceSubtype: "",
    destLabels: [],
    destCloud: "aws",
    destAccount: "",
    destRegion: "",
    destCspId: "",
    destCategory: "",
    port: 123,
    protocol: "UDP",
    byteCount: "76 Bytes",
    firstDetected: "04/14/2026, 10:18:30",
    lastDetected: "04/14/2026, 10:18:30",
    capturedAt: "vpc_flow_log",
    capturedAtSource: "vpc-0abc123def4",
    throughFirewall: null,
  },
  {
    id: 2,
    trafficStatus: "Allowed",
    sourceIp: "10.211.1.207",
    sourceName: "source-user-a",
    sourceResourceType: "Compute",
    sourceResourceSubtype: "EC2Instance",
    sourceLabels: [],
    sourceCloud: "aws",
    sourceAccount: "575207827313",
    sourceRegion: "us-west-2",
    sourceCspId: "i-0de5a2fa2fc66464d",
    sourceCategory: "Compute",
    destIp: "93.241.86.156",
    destName: "",
    destResourceType: "Unknown",
    destResourceSubtype: "",
    destLabels: [],
    destCloud: "aws",
    destAccount: "",
    destRegion: "",
    destCspId: "",
    destCategory: "",
    port: 443,
    protocol: "TCP",
    byteCount: "1.2 KB",
    firstDetected: "04/14/2026, 10:15:00",
    lastDetected: "04/14/2026, 10:18:30",
    capturedAt: "vpc_flow_log",
    capturedAtSource: "vpc-0abc123def4",
    throughFirewall: null,
  },
  {
    id: 3,
    trafficStatus: "Allowed",
    sourceIp: "10.211.1.36",
    sourceName: "jan-den-ise-973",
    sourceResourceType: "Compute",
    sourceResourceSubtype: "EC2Instance",
    sourceLabels: [],
    sourceCloud: "aws",
    sourceAccount: "575207827313",
    sourceRegion: "us-east-1",
    sourceCspId: "i-0abc123def456",
    sourceCategory: "Compute",
    destIp: "185.125.190.56",
    destName: "Malicious IPs from Threat Feed",
    destResourceType: "Unknown",
    destResourceSubtype: "",
    destLabels: [],
    destCloud: "aws",
    destAccount: "",
    destRegion: "",
    destCspId: "",
    destCategory: "",
    port: 80,
    protocol: "TCP",
    byteCount: "4.8 KB",
    firstDetected: "04/14/2026, 09:45:00",
    lastDetected: "04/14/2026, 10:12:00",
    capturedAt: "firewall_alert_log",
    capturedAtSource: "prod-egress-fw",
    throughFirewall: "prod-egress-fw",
  },
  {
    id: 4,
    trafficStatus: "Denied",
    sourceIp: "10.211.1.36",
    sourceName: "jan-den-ise-973",
    sourceResourceType: "Compute",
    sourceResourceSubtype: "EC2Instance",
    sourceLabels: [],
    sourceCloud: "aws",
    sourceAccount: "575207827313",
    sourceRegion: "us-east-1",
    sourceCspId: "i-0abc123def456",
    sourceCategory: "Compute",
    destIp: "139.162.156.95",
    destName: "",
    destResourceType: "Unknown",
    destResourceSubtype: "",
    destLabels: [],
    destCloud: "aws",
    destAccount: "",
    destRegion: "",
    destCspId: "",
    destCategory: "",
    port: 22,
    protocol: "TCP",
    byteCount: "0 Bytes",
    firstDetected: "04/14/2026, 10:00:00",
    lastDetected: "04/14/2026, 10:00:00",
    capturedAt: "firewall_alert_log",
    capturedAtSource: "staging-fw",
    throughFirewall: "staging-fw",
  },
  {
    id: 5,
    trafficStatus: "Allowed",
    sourceIp: "10.211.1.36",
    sourceName: "jan-den-ise-973",
    sourceResourceType: "Compute",
    sourceResourceSubtype: "EC2Instance",
    sourceLabels: [],
    sourceCloud: "aws",
    sourceAccount: "575207827313",
    sourceRegion: "us-east-1",
    sourceCspId: "i-0abc123def456",
    sourceCategory: "Compute",
    destIp: "139.162.156.95",
    destName: "",
    destResourceType: "Unknown",
    destResourceSubtype: "",
    destLabels: [],
    destCloud: "aws",
    destAccount: "",
    destRegion: "",
    destCspId: "",
    destCategory: "",
    port: 443,
    protocol: "TCP",
    byteCount: "2.1 KB",
    firstDetected: "04/14/2026, 10:05:00",
    lastDetected: "04/14/2026, 10:15:00",
    capturedAt: "vpc_flow_log",
    capturedAtSource: "vpc-0def456ghi7",
    throughFirewall: null,
  },
  {
    id: 6,
    trafficStatus: "Denied",
    sourceIp: "10.211.1.36",
    sourceName: "jan-den-ise-973",
    sourceResourceType: "Compute",
    sourceResourceSubtype: "EC2Instance",
    sourceLabels: [],
    sourceCloud: "aws",
    sourceAccount: "575207827313",
    sourceRegion: "us-east-1",
    sourceCspId: "i-0abc123def456",
    sourceCategory: "Compute",
    destIp: "180.82.156.95",
    destName: "",
    destResourceType: "Unknown",
    destResourceSubtype: "",
    destLabels: [],
    destCloud: "aws",
    destAccount: "",
    destRegion: "",
    destCspId: "",
    destCategory: "",
    port: 3389,
    protocol: "TCP",
    byteCount: "0 Bytes",
    firstDetected: "04/14/2026, 09:30:00",
    lastDetected: "04/14/2026, 09:30:00",
    capturedAt: "firewall_alert_log",
    capturedAtSource: "dev-inspection-fw",
    throughFirewall: "dev-inspection-fw",
  },
  {
    id: 7,
    trafficStatus: "Allowed",
    sourceIp: "10.111.1.130",
    sourceName: "",
    sourceResourceType: "Network Routing",
    sourceResourceSubtype: "EC2VPCEndpoint",
    sourceLabels: [],
    sourceCloud: "aws",
    sourceAccount: "575207827313",
    sourceRegion: "us-west-2",
    sourceCspId: "vpce-0abc123",
    sourceCategory: "Network",
    destIp: "10.111.1.115",
    destName: "eng-proc-mm01",
    destResourceType: "Compute",
    destResourceSubtype: "EC2Instance",
    destLabels: ["env:dev"],
    destCloud: "aws",
    destAccount: "575207827313",
    destRegion: "us-west-2",
    destCspId: "i-0eng123",
    destCategory: "Compute",
    port: 443,
    protocol: "TCP",
    byteCount: "12.4 KB",
    firstDetected: "04/14/2026, 08:00:00",
    lastDetected: "04/14/2026, 10:18:30",
    capturedAt: "firewall_flow_log",
    capturedAtSource: "prod-egress-fw",
    throughFirewall: "prod-egress-fw",
  },
  {
    id: 8,
    trafficStatus: "Allowed",
    sourceIp: "10.211.1.35",
    sourceName: "aws-DES_ad2000ba",
    sourceResourceType: "Network Routing",
    sourceResourceSubtype: "EC2VPCEndpoint",
    sourceLabels: [],
    sourceCloud: "aws",
    sourceAccount: "575207827313",
    sourceRegion: "us-west-2",
    sourceCspId: "vpce-0des123",
    sourceCategory: "Network",
    destIp: "10.111.1.115",
    destName: "tpm-awsf...rkload-a",
    destResourceType: "Compute",
    destResourceSubtype: "EC2Instance",
    destLabels: [],
    destCloud: "aws",
    destAccount: "575207827313",
    destRegion: "us-west-2",
    destCspId: "i-0tpm123",
    destCategory: "Compute",
    port: 8080,
    protocol: "TCP",
    byteCount: "5.6 KB",
    firstDetected: "04/14/2026, 09:00:00",
    lastDetected: "04/14/2026, 10:10:00",
    capturedAt: "firewall_flow_log",
    capturedAtSource: "prod-egress-fw",
    throughFirewall: "prod-egress-fw",
  },
  {
    id: 9,
    trafficStatus: "Allowed",
    sourceIp: "10.211.1.35",
    sourceName: "aws-DES_ad2000ba",
    sourceResourceType: "Network Routing",
    sourceResourceSubtype: "EC2VPCEndpoint",
    sourceLabels: [],
    sourceCloud: "aws",
    sourceAccount: "575207827313",
    sourceRegion: "us-west-2",
    sourceCspId: "vpce-0des123",
    sourceCategory: "Network",
    destIp: "10.211.1.74",
    destName: "ops-dev-qa-873",
    destResourceType: "Compute",
    destResourceSubtype: "EC2Instance",
    destLabels: ["env:qa"],
    destCloud: "aws",
    destAccount: "575207827313",
    destRegion: "us-west-2",
    destCspId: "i-0ops123",
    destCategory: "Compute",
    port: 5432,
    protocol: "TCP",
    byteCount: "8.2 KB",
    firstDetected: "04/14/2026, 07:30:00",
    lastDetected: "04/14/2026, 10:15:00",
    capturedAt: "vpc_flow_log",
    capturedAtSource: "vpc-0abc123def4",
    throughFirewall: null,
  },
  {
    id: 10,
    trafficStatus: "Mixed",
    sourceIp: "10.211.1.35",
    sourceName: "aws-Gen_6574942a",
    sourceResourceType: "Network Routing",
    sourceResourceSubtype: "EC2VPCEndpoint",
    sourceLabels: [],
    sourceCloud: "aws",
    sourceAccount: "575207827313",
    sourceRegion: "us-east-1",
    sourceCspId: "vpce-0gen123",
    sourceCategory: "Network",
    destIp: "10.0.108.78",
    destName: "sba-dev-qa-873",
    destResourceType: "Compute",
    destResourceSubtype: "EC2Instance",
    destLabels: [],
    destCloud: "aws",
    destAccount: "575207827313",
    destRegion: "us-east-1",
    destCspId: "i-0sba123",
    destCategory: "Compute",
    port: 443,
    protocol: "TCP",
    byteCount: "3.4 KB",
    firstDetected: "04/14/2026, 08:45:00",
    lastDetected: "04/14/2026, 10:12:00",
    capturedAt: "firewall_alert_log",
    capturedAtSource: "prod-egress-fw",
    throughFirewall: "prod-egress-fw",
  },
];

// ---------------------------------------------------------------------------
// Cell renderers
// ---------------------------------------------------------------------------

const TrafficStatusBadge = ({
  variant,
  label,
}: {
  variant: "allowed" | "denied" | "mixed";
  label: string;
}) => {
  const styles: Record<
    string,
    { bg: string; iconColor: string; iconName: "check" | "xmark" | "triangle-exclamation" }
  > = {
    allowed: {
      bg: "var(--lightning-orange-75, #FFE6CC)",
      iconColor: "var(--lightning-orange-600, #CF630E)",
      iconName: "check",
    },
    denied: {
      bg: "var(--lightning-blue-50, #DBEBFE)",
      iconColor: "var(--lightning-blue-600, #2366ED)",
      iconName: "xmark",
    },
    mixed: {
      bg: "var(--lightning-orange-75, #FFE6CC)",
      iconColor: "var(--lightning-orange-600, #CF630E)",
      iconName: "triangle-exclamation",
    },
  };

  const { bg, iconColor, iconName } = styles[variant];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon name={iconName} size={14} color={iconColor} />
      </div>
      <span style={{ color: "var(--lightning-bluegray-900, #1F272F)", fontSize: 14 }}>
        {label}
      </span>
    </div>
  );
};

const TrafficStatusCellRenderer = ({ data }: { data: FlowData }) => {
  if (data.trafficStatus === "Allowed") {
    return <TrafficStatusBadge variant="allowed" label="Allowed" />;
  }
  if (data.trafficStatus === "Denied") {
    return <TrafficStatusBadge variant="denied" label="Blocked" />;
  }
  return <TrafficStatusBadge variant="mixed" label="Mixed" />;
};

const ResourceTypeBadge = ({ type, subtype }: { type: ResourceType; subtype: string }) => {
  if (type === "Unknown" || !subtype) {
    return <span style={{ color: "var(--lightning-bluegray-400, #98aab8)" }}>—</span>;
  }

  const bgColor =
    type === "Compute"
      ? "var(--lightning-blue-50, #DBEBFE)"
      : type === "Network Routing"
      ? "var(--lightning-green-50, #e6f7e9)"
      : "var(--lightning-gray-100, #f0f1f3)";

  const textColor =
    type === "Compute"
      ? "var(--lightning-blue-700, #1a4fba)"
      : type === "Network Routing"
      ? "var(--lightning-green-700, #0d7a25)"
      : "var(--lightning-gray-700, #4a5056)";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <Icon name="server" size={14} color={textColor} />
      <span
        style={{
          background: bgColor,
          color: textColor,
          padding: "2px 8px",
          borderRadius: 4,
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        {type}
      </span>
      <span style={{ color: "var(--lightning-bluegray-600, #63788f)", fontSize: 12 }}>
        {subtype}
      </span>
    </div>
  );
};

const SourceResourceCellRenderer = ({ data }: { data: FlowData }) => (
  <ResourceTypeBadge type={data.sourceResourceType} subtype={data.sourceResourceSubtype} />
);

const DestResourceCellRenderer = ({ data }: { data: FlowData }) => (
  <ResourceTypeBadge type={data.destResourceType} subtype={data.destResourceSubtype} />
);

const LabelsRenderer = ({ labels }: { labels: string[] }) => {
  if (!labels || labels.length === 0) {
    return <span style={{ color: "var(--lightning-bluegray-400, #98aab8)" }}>—</span>;
  }
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {labels.slice(0, 2).map((label, i) => (
        <span
          key={i}
          style={{
            background: "var(--lightning-gray-100, #f0f1f3)",
            color: "var(--lightning-gray-700, #4a5056)",
            padding: "2px 6px",
            borderRadius: 4,
            fontSize: 11,
          }}
        >
          {label}
        </span>
      ))}
      {labels.length > 2 && (
        <span style={{ color: "var(--lightning-bluegray-500, #7a90a4)", fontSize: 11 }}>
          +{labels.length - 2}
        </span>
      )}
    </div>
  );
};

const SourceLabelsCellRenderer = ({ data }: { data: FlowData }) => (
  <LabelsRenderer labels={data.sourceLabels} />
);

const DestLabelsCellRenderer = ({ data }: { data: FlowData }) => (
  <LabelsRenderer labels={data.destLabels} />
);

const NameCellRenderer = ({ value, data, isSource }: { value: string; data: FlowData; isSource: boolean }) => {
  const resourceType = isSource ? data.sourceResourceType : data.destResourceType;
  if (!value) {
    return <span style={{ color: "var(--lightning-bluegray-400, #98aab8)" }}>—</span>;
  }

  const iconName = resourceType === "Compute" ? "server" : resourceType === "Network Routing" ? "network-wired" : "circle";
  const iconColor = resourceType === "Compute" ? "var(--lightning-blue-600, #2366ed)" : "var(--lightning-green-600, #12a732)";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <Icon name={iconName} size={14} color={iconColor} />
      <span style={{ color: "var(--lightning-blue-600, #2366ed)", cursor: "pointer" }}>
        {value}
      </span>
    </div>
  );
};

const SourceNameCellRenderer = ({ data }: { data: FlowData }) => (
  <NameCellRenderer value={data.sourceName} data={data} isSource={true} />
);

const DestNameCellRenderer = ({ data }: { data: FlowData }) => (
  <NameCellRenderer value={data.destName} data={data} isSource={false} />
);

// Captured At cell renderer - AC4: Shows VPC ID, VNET ID, or Firewall ID
const CapturedAtCellRenderer = ({ data }: { data: FlowData }) => {
  // Per AC4: Show VPC ID for VPC Flow Logs, Firewall ID for FW logs
  const capturedAtConfig: Record<string, { idLabel: string; logType: string; color: string }> = {
    vpc_flow_log: {
      idLabel: "VPC ID",
      logType: "VPC Flow Log",
      color: "var(--lightning-blue-500, #3a88fc)"
    },
    firewall_flow_log: {
      idLabel: "Firewall ID",
      logType: "FW Flow Log",
      color: "var(--lightning-orange-400, #fc8d2b)"
    },
    firewall_alert_log: {
      idLabel: "Firewall ID",
      logType: "FW Alert Log",
      color: "var(--lightning-orange-400, #fc8d2b)"
    },
  };

  const config = capturedAtConfig[data.capturedAt];

  if (!config) {
    // AC3: No gray lines - should not happen with proper data
    return <span style={{ color: "var(--lightning-bluegray-400, #98aab8)" }}>—</span>;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: config.color,
          flexShrink: 0,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
        <span style={{ fontSize: 13, color: "var(--lightning-bluegray-900, #1F272F)" }}>
          {data.capturedAtSource}
        </span>
        <span style={{ fontSize: 11, color: "var(--lightning-bluegray-500, #7a90a4)" }}>
          {config.idLabel} · {config.logType}
        </span>
      </div>
    </div>
  );
};

// Firewall cell renderer
const FirewallCellRenderer = ({ data }: { data: FlowData }) => {
  if (!data.throughFirewall) {
    return <span style={{ color: "var(--lightning-bluegray-400, #98aab8)" }}>—</span>;
  }
  return (
    <span style={{ color: "var(--lightning-blue-600, #2366ed)", cursor: "pointer" }}>
      {data.throughFirewall}
    </span>
  );
};

// Rule ID cell renderer
const RuleIdCellRenderer = ({ data }: { data: FlowData }) => {
  // For demo purposes, show rule ID only for firewall alert logs
  if (data.capturedAt !== "firewall_alert_log") {
    return <span style={{ color: "var(--lightning-bluegray-400, #98aab8)" }}>—</span>;
  }
  return (
    <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13 }}>
      stateful:sid-{1000 + data.id}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Filter Builder Component
// ---------------------------------------------------------------------------

interface FilterBuilderProps {
  filters: ActiveFilter[];
  onFiltersChange: (filters: ActiveFilter[]) => void;
  onClear: () => void;
}

function FilterBuilder({ filters, onFiltersChange, onClear }: FilterBuilderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newFilter, setNewFilter] = useState<Partial<ActiveFilter>>({
    sourceDest: "source",
    category: "cloud",
    operator: "=",
    value: [],
  });

  const getValueOptions = (category: FilterCategory) => {
    switch (category) {
      case "cloud":
        return CLOUD_OPTIONS;
      case "captured_at":
        return CAPTURED_AT_OPTIONS;
      case "through_firewall":
        return FIREWALL_OPTIONS;
      default:
        return [];
    }
  };

  const addFilter = () => {
    if (newFilter.category && newFilter.value && newFilter.value.length > 0) {
      const filter: ActiveFilter = {
        id: `filter-${Date.now()}`,
        sourceDest: newFilter.sourceDest || "source",
        category: newFilter.category,
        operator: newFilter.operator || "=",
        value: newFilter.value,
      };
      onFiltersChange([...filters, filter]);
      setNewFilter({ sourceDest: "source", category: "cloud", operator: "=", value: [] });
      setIsOpen(false);
    }
  };

  const removeFilter = (id: string) => {
    onFiltersChange(filters.filter((f) => f.id !== id));
  };

  return (
    <div className="filter-builder">
      {/* Search input that opens filter builder */}
      <div className="filter-builder__search" onClick={() => setIsOpen(!isOpen)}>
        <Icon name="search" size={14} color="var(--lightning-bluegray-400, #98aab8)" />
        <span className="filter-builder__placeholder">Filter Traffic by...</span>
      </div>

      {/* Filter builder dropdown */}
      {isOpen && (
        <div className="filter-builder__dropdown">
          <div className="filter-builder__row">
            <div className="filter-builder__column">
              <div className="filter-builder__label">SOURCE / DESTINATION</div>
              <div className="filter-builder__options">
                {[
                  { id: "source", label: "Source (S)" },
                  { id: "destination", label: "Destination (D)" },
                  { id: "any", label: "Any (S/D)" },
                ].map((opt) => (
                  <div
                    key={opt.id}
                    className={`filter-builder__option ${newFilter.sourceDest === opt.id ? "active" : ""}`}
                    onClick={() => setNewFilter({ ...newFilter, sourceDest: opt.id as FilterSourceDest })}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-builder__column">
              <div className="filter-builder__label">CATEGORY</div>
              <div className="filter-builder__options">
                {FILTER_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className={`filter-builder__option ${newFilter.category === cat.id ? "active" : ""}`}
                    onClick={() => setNewFilter({ ...newFilter, category: cat.id, value: [] })}
                  >
                    {cat.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-builder__column">
              <div className="filter-builder__label">OPERATOR</div>
              <div className="filter-builder__options">
                {[
                  { id: "=", label: "=" },
                  { id: "in", label: "In" },
                ].map((op) => (
                  <div
                    key={op.id}
                    className={`filter-builder__option ${newFilter.operator === op.id ? "active" : ""}`}
                    onClick={() => setNewFilter({ ...newFilter, operator: op.id as "=" | "in" })}
                  >
                    {op.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-builder__column">
              <div className="filter-builder__label">VALUE</div>
              <div className="filter-builder__options">
                {getValueOptions(newFilter.category as FilterCategory).map((val) => (
                  <div
                    key={val.id}
                    className={`filter-builder__option ${newFilter.value?.includes(val.id) ? "active" : ""}`}
                    onClick={() => {
                      const current = newFilter.value || [];
                      const updated = current.includes(val.id)
                        ? current.filter((v) => v !== val.id)
                        : [...current, val.id];
                      setNewFilter({ ...newFilter, value: updated });
                    }}
                  >
                    {val.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="filter-builder__actions">
            <Button variant="secondary-ghost" size="sm" onClick={() => setIsOpen(false)}>
              Clear
            </Button>
            <Button variant="primary" size="sm" onClick={addFilter}>
              Run
            </Button>
          </div>
        </div>
      )}

      {/* Active filter pills */}
      {filters.length > 0 && (
        <div className="filter-builder__pills">
          {filters.map((filter) => {
            const categoryLabel = FILTER_CATEGORIES.find((c) => c.id === filter.category)?.label;
            const valueLabels = filter.value
              .map((v) => {
                if (filter.category === "cloud") return CLOUD_OPTIONS.find((o) => o.id === v)?.label;
                if (filter.category === "captured_at") return CAPTURED_AT_OPTIONS.find((o) => o.id === v)?.label;
                if (filter.category === "through_firewall") return FIREWALL_OPTIONS.find((o) => o.id === v)?.label;
                return v;
              })
              .join(", ");

            return (
              <Pill key={filter.id} showCloseButton onClose={() => removeFilter(filter.id)}>
                {categoryLabel}: {valueLabels}
              </Pill>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .filter-builder {
          position: relative;
        }
        .filter-builder__search {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: var(--bg-card, #ffffff);
          border: 1px solid var(--lightning-gray-200, #e6e8eb);
          border-radius: 6px;
          cursor: pointer;
          min-width: 200px;
        }
        .filter-builder__search:hover {
          border-color: var(--lightning-blue-400, #6ba8fc);
        }
        .filter-builder__placeholder {
          color: var(--lightning-bluegray-400, #98aab8);
          font-size: 13px;
        }
        .filter-builder__dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 4px;
          background: var(--bg-card, #ffffff);
          border: 1px solid var(--lightning-gray-200, #e6e8eb);
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 100;
          min-width: 600px;
        }
        .filter-builder__row {
          display: flex;
          border-bottom: 1px solid var(--lightning-gray-100, #f0f1f3);
        }
        .filter-builder__column {
          flex: 1;
          border-right: 1px solid var(--lightning-gray-100, #f0f1f3);
          max-height: 300px;
          overflow-y: auto;
        }
        .filter-builder__column:last-child {
          border-right: none;
        }
        .filter-builder__label {
          padding: 8px 12px;
          font-size: 11px;
          font-weight: 600;
          color: var(--lightning-bluegray-500, #7a90a4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: var(--lightning-gray-50, #f3f4f6);
          border-bottom: 1px solid var(--lightning-gray-100, #f0f1f3);
          position: sticky;
          top: 0;
        }
        .filter-builder__options {
          padding: 4px 0;
        }
        .filter-builder__option {
          padding: 8px 12px;
          font-size: 13px;
          color: var(--lightning-gray-900, #1d2024);
          cursor: pointer;
        }
        .filter-builder__option:hover {
          background: var(--lightning-blue-25, #f0f7ff);
        }
        .filter-builder__option.active {
          background: var(--lightning-blue-50, #e3f0fe);
          color: var(--lightning-blue-600, #2366ed);
        }
        .filter-builder__actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          padding: 12px;
        }
        .filter-builder__pills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Column Toggle Panel
// ---------------------------------------------------------------------------

interface ColumnTogglePanelProps {
  columns: { id: string; label: string; visible: boolean }[];
  onToggle: (id: string) => void;
}

function ColumnTogglePanel({ columns, onToggle }: ColumnTogglePanelProps) {
  return (
    <div className="column-toggle">
      <div className="column-toggle__header">
        <Icon name="columns-2" size={14} />
        <span>Columns</span>
      </div>
      <div className="column-toggle__list">
        {columns.map((col) => (
          <label key={col.id} className="column-toggle__item">
            <input
              type="checkbox"
              checked={col.visible}
              onChange={() => onToggle(col.id)}
            />
            <span>{col.label}</span>
          </label>
        ))}
      </div>

      <style jsx>{`
        .column-toggle {
          width: 48px;
          background: var(--bg-card, #ffffff);
          border-left: 1px solid var(--lightning-gray-200, #e6e8eb);
          display: flex;
          flex-direction: column;
        }
        .column-toggle__header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 12px 8px;
          font-size: 10px;
          font-weight: 600;
          color: var(--lightning-bluegray-600, #63788f);
          text-transform: uppercase;
          border-bottom: 1px solid var(--lightning-gray-200, #e6e8eb);
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
        .column-toggle__list {
          flex: 1;
          overflow-y: auto;
          padding: 8px 4px;
        }
        .column-toggle__item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 4px;
          font-size: 11px;
          color: var(--lightning-gray-700, #4a5056);
          cursor: pointer;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
        .column-toggle__item input {
          width: 14px;
          height: 14px;
          accent-color: var(--lightning-blue-500, #3a88fc);
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Flow Detail Slideout (Redesigned)
// ---------------------------------------------------------------------------

function FlowDetailPanel({
  flow,
  onClose,
}: {
  flow: FlowData;
  onClose: () => void;
}) {
  const [activeAnchor, setActiveAnchor] = useState("details");

  const anchors = [
    { id: "details", label: "Details" },
    { id: "source-dest", label: "Source & Destination" },
  ];

  return (
    <>
      <SlideoutHeader
        icon={<Icon name="server" size={20} />}
        iconColor="blue"
        title={flow.sourceName || flow.sourceIp}
        subtitle={flow.sourceIp}
      />

      <SlideoutBody
        anchors={anchors}
        activeAnchorId={activeAnchor}
        onAnchorChange={setActiveAnchor}
      >
        {/* Details Section */}
        <SlideoutSection id="details" title="Details">
          <div className="details-grid">
            <div className="details-row">
              <span className="details-label">Destination Port/Protocol</span>
              <span className="details-value">{flow.port}/{flow.protocol}</span>
            </div>
            <div className="details-row">
              <span className="details-label">Byte Count</span>
              <span className="details-value">{flow.byteCount}</span>
            </div>
            <div className="details-row">
              <span className="details-label">First Detected</span>
              <span className="details-value">{flow.firstDetected}</span>
            </div>
            <div className="details-row">
              <span className="details-label">Last Detected</span>
              <span className="details-value">{flow.lastDetected}</span>
            </div>
          </div>
        </SlideoutSection>

        {/* Source & Destination Side-by-Side */}
        <SlideoutSection id="source-dest" title="">
          <div className="source-dest-container">
            {/* Source Column */}
            <div className="endpoint-column">
              <div className="endpoint-header">
                <Icon name="server" size={16} color="var(--lightning-blue-600, #2366ed)" />
                <span className="endpoint-name">{flow.sourceName || "Unknown"}</span>
              </div>
              <div className="endpoint-title">Source</div>
              <div className="endpoint-grid">
                <div className="endpoint-row">
                  <span className="endpoint-label">IP Address</span>
                  <span className="endpoint-value">{flow.sourceIp}</span>
                </div>
                <div className="endpoint-row">
                  <span className="endpoint-label">Cloud</span>
                  <span className="endpoint-value cloud-badge">{flow.sourceCloud}</span>
                </div>
                <div className="endpoint-row">
                  <span className="endpoint-label">Account</span>
                  <span className="endpoint-value">{flow.sourceAccount || "—"}</span>
                </div>
                <div className="endpoint-row">
                  <span className="endpoint-label">CSP Id</span>
                  <span className="endpoint-value mono">{flow.sourceCspId || "—"}</span>
                </div>
                <div className="endpoint-row">
                  <span className="endpoint-label">Region</span>
                  <span className="endpoint-value">{flow.sourceRegion || "—"}</span>
                </div>
                <div className="endpoint-row">
                  <span className="endpoint-label">Category</span>
                  <span className="endpoint-value">{flow.sourceCategory || "—"}</span>
                </div>
                <div className="endpoint-row">
                  <span className="endpoint-label">Labels</span>
                  <div className="endpoint-value">
                    {flow.sourceLabels.length > 0 ? (
                      flow.sourceLabels.map((l, i) => (
                        <span key={i} className="label-tag">{l}</span>
                      ))
                    ) : (
                      "—"
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Destination Column */}
            <div className="endpoint-column">
              <div className="endpoint-header">
                <Icon name="server" size={16} color="var(--lightning-blue-600, #2366ed)" />
                <span className="endpoint-name">{flow.destName || flow.destIp}</span>
              </div>
              <div className="endpoint-title">Destination</div>
              <div className="endpoint-grid">
                <div className="endpoint-row">
                  <span className="endpoint-label">IP Address</span>
                  <span className="endpoint-value">{flow.destIp}</span>
                </div>
                <div className="endpoint-row">
                  <span className="endpoint-label">Cloud</span>
                  <span className="endpoint-value cloud-badge">{flow.destCloud}</span>
                </div>
                <div className="endpoint-row">
                  <span className="endpoint-label">Account</span>
                  <span className="endpoint-value">{flow.destAccount || "—"}</span>
                </div>
                <div className="endpoint-row">
                  <span className="endpoint-label">CSP Id</span>
                  <span className="endpoint-value mono">{flow.destCspId || "—"}</span>
                </div>
                <div className="endpoint-row">
                  <span className="endpoint-label">Region</span>
                  <span className="endpoint-value">{flow.destRegion || "—"}</span>
                </div>
                <div className="endpoint-row">
                  <span className="endpoint-label">Category</span>
                  <span className="endpoint-value">{flow.destCategory || "—"}</span>
                </div>
                <div className="endpoint-row">
                  <span className="endpoint-label">Labels</span>
                  <div className="endpoint-value">
                    {flow.destLabels.length > 0 ? (
                      flow.destLabels.map((l, i) => (
                        <span key={i} className="label-tag">{l}</span>
                      ))
                    ) : (
                      "—"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SlideoutSection>
      </SlideoutBody>

      <SlideoutFooter split>
        <SlideoutFooterGroup>
          <Button variant="secondary-outlined" size="sm">
            View in Inventory
          </Button>
        </SlideoutFooterGroup>
        <SlideoutFooterGroup>
          <Button variant="primary-ghost" size="sm">
            Copy Flow ID
          </Button>
          <Button variant="primary" size="sm" onClick={onClose}>
            Close
          </Button>
        </SlideoutFooterGroup>
      </SlideoutFooter>

      <style jsx>{`
        .details-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .details-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .details-label {
          font-size: 13px;
          color: var(--lightning-bluegray-600, #63788f);
        }
        .details-value {
          font-size: 13px;
          font-weight: 500;
          color: var(--lightning-gray-900, #1d2024);
        }
        .source-dest-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .endpoint-column {
          background: var(--lightning-gray-50, #f3f4f6);
          border-radius: 8px;
          padding: 16px;
        }
        .endpoint-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        .endpoint-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--lightning-blue-600, #2366ed);
        }
        .endpoint-title {
          font-size: 11px;
          font-weight: 600;
          color: var(--lightning-bluegray-500, #7a90a4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }
        .endpoint-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .endpoint-row {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .endpoint-label {
          font-size: 11px;
          color: var(--lightning-bluegray-500, #7a90a4);
        }
        .endpoint-value {
          font-size: 13px;
          color: var(--lightning-gray-900, #1d2024);
        }
        .endpoint-value.mono {
          font-family: "Geist Mono", monospace;
          font-size: 12px;
        }
        .endpoint-value.cloud-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .label-tag {
          display: inline-block;
          background: var(--lightning-blue-50, #e3f0fe);
          color: var(--lightning-blue-700, #1a4fba);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
          margin-right: 4px;
        }
      `}</style>
    </>
  );
}

// ---------------------------------------------------------------------------
// Main floorplan
// ---------------------------------------------------------------------------

export interface AwsFirewallTrafficFloorplanProps {
  pageTitle?: string;
}

export function AwsFirewallTrafficFloorplan({ pageTitle = "Traffic" }: AwsFirewallTrafficFloorplanProps) {
  // Filter state
  const [filters, setFilters] = useState<ActiveFilter[]>([]);
  const [timeRange, setTimeRange] = useState("last_7_days");
  const [matchCondition, setMatchCondition] = useState("and");

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    trafficStatus: true,
    sourceIp: true,
    sourceName: true,
    sourceResource: true,
    sourceLabels: true,
    destIp: true,
    destResource: true,
    destLabels: true,
    capturedAt: true,
    firewall: true,
    ruleId: true,
  });

  // Slideout state
  const [selectedFlow, setSelectedFlow] = useState<FlowData | null>(null);

  // Toggle column visibility
  const toggleColumn = useCallback((id: string) => {
    setColumnVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Filtered table data
  const filteredData = useMemo<FlowData[]>(() => {
    if (filters.length === 0) return MOCK_FLOWS;

    return MOCK_FLOWS.filter((flow) => {
      const results = filters.map((filter) => {
        if (filter.category === "cloud") {
          return filter.value.includes(flow.sourceCloud) || filter.value.includes(flow.destCloud);
        }
        if (filter.category === "captured_at") {
          return filter.value.includes(flow.capturedAt);
        }
        if (filter.category === "through_firewall") {
          return flow.throughFirewall !== null && filter.value.includes(flow.throughFirewall);
        }
        return true;
      });

      return matchCondition === "and" ? results.every(Boolean) : results.some(Boolean);
    });
  }, [filters, matchCondition]);

  // Column definitions
  const columnDefs = useMemo<ColDef<FlowData>[]>(() => {
    const cols: ColDef<FlowData>[] = [];

    if (columnVisibility.trafficStatus) {
      cols.push({
        field: "trafficStatus",
        headerName: "Traffic Status",
        width: 140,
        sortable: true,
        cellRenderer: TrafficStatusCellRenderer,
      });
    }
    if (columnVisibility.sourceIp) {
      cols.push({ field: "sourceIp", headerName: "Source IP", width: 130, sortable: true });
    }
    if (columnVisibility.sourceName) {
      cols.push({
        field: "sourceName",
        headerName: "Source Name",
        width: 160,
        sortable: true,
        cellRenderer: SourceNameCellRenderer,
      });
    }
    if (columnVisibility.sourceResource) {
      cols.push({
        field: "sourceResourceType",
        headerName: "Source Resource",
        width: 200,
        sortable: true,
        cellRenderer: SourceResourceCellRenderer,
      });
    }
    if (columnVisibility.sourceLabels) {
      cols.push({
        field: "sourceLabels",
        headerName: "Source Labels",
        width: 150,
        cellRenderer: SourceLabelsCellRenderer,
      });
    }
    if (columnVisibility.destIp) {
      cols.push({ field: "destIp", headerName: "Destination IP", width: 130, sortable: true });
    }
    if (columnVisibility.destResource) {
      cols.push({
        field: "destResourceType",
        headerName: "Destination Resource",
        width: 200,
        sortable: true,
        cellRenderer: DestResourceCellRenderer,
      });
    }
    if (columnVisibility.destLabels) {
      cols.push({
        field: "destLabels",
        headerName: "Destination Labels",
        width: 150,
        cellRenderer: DestLabelsCellRenderer,
      });
    }
    if (columnVisibility.capturedAt) {
      cols.push({
        field: "capturedAt",
        headerName: "Captured At",
        width: 180,
        sortable: true,
        cellRenderer: CapturedAtCellRenderer,
      });
    }
    if (columnVisibility.firewall) {
      cols.push({
        field: "throughFirewall",
        headerName: "Firewall",
        width: 150,
        sortable: true,
        cellRenderer: FirewallCellRenderer,
      });
    }
    if (columnVisibility.ruleId) {
      cols.push({
        field: "id",
        headerName: "Rule ID",
        flex: 1,
        minWidth: 140,
        sortable: true,
        cellRenderer: RuleIdCellRenderer,
      });
    }

    return cols;
  }, [columnVisibility]);

  const defaultColDef = useMemo<ColDef>(() => ({ resizable: true }), []);

  const handleRowClicked = useCallback((event: RowClickedEvent<FlowData>) => {
    if (event.data) setSelectedFlow(event.data);
  }, []);

  const columnToggleList = useMemo(
    () => [
      { id: "trafficStatus", label: "Traffic Status", visible: columnVisibility.trafficStatus },
      { id: "sourceIp", label: "Source IP", visible: columnVisibility.sourceIp },
      { id: "sourceName", label: "Source Name", visible: columnVisibility.sourceName },
      { id: "sourceResource", label: "Source Resource", visible: columnVisibility.sourceResource },
      { id: "sourceLabels", label: "Source Labels", visible: columnVisibility.sourceLabels },
      { id: "destIp", label: "Destination IP", visible: columnVisibility.destIp },
      { id: "destResource", label: "Destination Resource", visible: columnVisibility.destResource },
      { id: "destLabels", label: "Destination Labels", visible: columnVisibility.destLabels },
      { id: "capturedAt", label: "Captured At", visible: columnVisibility.capturedAt },
      { id: "firewall", label: "Firewall", visible: columnVisibility.firewall },
      { id: "ruleId", label: "Rule ID", visible: columnVisibility.ruleId },
    ],
    [columnVisibility]
  );

  return (
    <div className="aws-fw-floorplan">
      {/* Fixed SideNav */}
      <SideNav>
        <SideNavSection title="CloudSecure">
          <SideNavItem icon={<Icon name="grid" size={16} />} level={1}>
            Dashboard
          </SideNavItem>
          <SideNavItem icon={<Icon name="traffic-light" size={16} />} level={1} active>
            Traffic
          </SideNavItem>
          <SideNavItem icon={<Icon name="server" size={16} />} level={1}>
            Inventory
          </SideNavItem>
          <SideNavItem icon={<Icon name="shield" size={16} />} level={1}>
            Policies
          </SideNavItem>
        </SideNavSection>
      </SideNav>

      {/* Main area */}
      <div className="aws-fw-floorplan__main">
        <Header
          breadcrumbs={[
            { label: "CloudSecure", href: "/demos" },
            { label: pageTitle },
          ]}
          title={pageTitle}
          user={{ firstName: "Aziz", lastName: "Khilawala" }}
          sticky
        />

        <main className="aws-fw-floorplan__content">
          {/* Page description */}
          <div className="aws-fw-floorplan__description">
            <h2 className="aws-fw-floorplan__subtitle">Viewing Cloud Traffic Flows</h2>
            <p className="aws-fw-floorplan__desc-text">
              Browse the traffic flowing to and from your onboarded cloud resources. Filter the displayed traffic flows by resource type, flow status, time
              windows, and more. Use traffic flow information to help write policies.
            </p>
            <a href="#" className="aws-fw-floorplan__learn-more">
              <Icon name="circle-information" size={14} />
              Learn More
            </a>
          </div>

          {/* Filter bar */}
          <div className="aws-fw-floorplan__filter-bar">
            <FilterBuilder
              filters={filters}
              onFiltersChange={setFilters}
              onClear={() => setFilters([])}
            />

            <OptionSelector
              options={TIME_RANGE_OPTIONS}
              value={timeRange}
              onChange={(v) => setTimeRange(v as string)}
              placeholder="Time Range"
            />

            <OptionSelector
              options={MATCH_CONDITION_OPTIONS}
              value={matchCondition}
              onChange={(v) => setMatchCondition(v as string)}
              placeholder="Match Condition"
            />

            <div className="aws-fw-floorplan__filter-actions">
              <Button variant="secondary-ghost" size="sm">
                <Icon name="refresh-cw" size={14} />
                Refresh
              </Button>
              <Button variant="secondary-ghost" size="sm">
                Export
                <Icon name="chevron-down" size={12} />
              </Button>
              <Button variant="secondary-outlined" size="sm">
                <Icon name="chart-line" size={14} />
                Show Traffic Chart
              </Button>
            </div>
          </div>

          {/* Table with column toggle */}
          <div className="aws-fw-floorplan__table-wrapper">
            <div className="aws-fw-floorplan__table-container ag-theme-alpine">
              <AgGridReact<FlowData>
                rowData={filteredData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                domLayout="normal"
                headerHeight={32}
                rowHeight={40}
                pagination
                paginationPageSize={50}
                paginationPageSizeSelector={[10, 20, 50, 100]}
                animateRows
                rowStyle={{ cursor: "pointer" }}
                onRowClicked={handleRowClicked}
              />
            </div>
            <ColumnTogglePanel columns={columnToggleList} onToggle={toggleColumn} />
          </div>
        </main>
      </div>

      {/* Flow detail slideout */}
      <Slideout isOpen={!!selectedFlow} onClose={() => setSelectedFlow(null)} size="lg">
        {selectedFlow && (
          <FlowDetailPanel flow={selectedFlow} onClose={() => setSelectedFlow(null)} />
        )}
      </Slideout>

      <style jsx>{`
        .aws-fw-floorplan {
          min-height: 100vh;
          background: var(--bg-page, #f6f8f9);
        }

        .aws-fw-floorplan__main {
          display: flex;
          flex-direction: column;
          height: 100vh;
          margin-left: 220px;
          overflow: hidden;
        }

        .aws-fw-floorplan__content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 16px 24px;
          gap: 16px;
        }

        .aws-fw-floorplan__description {
          background: var(--bg-card, #ffffff);
          border: 1px solid var(--border-card, #e6e8eb);
          border-radius: 8px;
          padding: 16px 20px;
        }

        .aws-fw-floorplan__subtitle {
          font-size: 16px;
          font-weight: 600;
          color: var(--lightning-gray-900, #1d2024);
          margin: 0 0 8px 0;
        }

        .aws-fw-floorplan__desc-text {
          font-size: 13px;
          color: var(--lightning-bluegray-600, #63788f);
          margin: 0 0 12px 0;
          line-height: 1.5;
        }

        .aws-fw-floorplan__learn-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--lightning-blue-600, #2366ed);
          text-decoration: none;
        }

        .aws-fw-floorplan__learn-more:hover {
          text-decoration: underline;
        }

        .aws-fw-floorplan__filter-bar {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          flex-wrap: wrap;
        }

        .aws-fw-floorplan__filter-actions {
          display: flex;
          gap: 8px;
          margin-left: auto;
        }

        .aws-fw-floorplan__table-wrapper {
          flex: 1;
          display: flex;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid var(--lightning-gray-200, #e6e8eb);
          background: #ffffff;
          min-height: 0;
        }

        .aws-fw-floorplan__table-container {
          flex: 1;
          overflow: hidden;
        }

        :global(.aws-fw-floorplan .ag-row-hover) {
          background-color: var(--lightning-blue-25, #f0f7ff);
        }

        :global(.aws-fw-floorplan .ag-row-selected) {
          background-color: var(--lightning-blue-200, #92c7fe);
        }
      `}</style>
    </div>
  );
}
