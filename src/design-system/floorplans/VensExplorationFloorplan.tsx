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
import { Badge } from "../components/Badge";
import { Pill } from "../components/Pill";
import { Tabs, TabList } from "../components/Tab";
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

type VenState = "Active" | "Suspended" | "Stopped" | "Uninstalled";
type VenMode = "Visibility Only" | "Selective Enforcement" | "Full Enforcement";
type VenHealth = "Healthy" | "Warning" | "Error" | "Offline";
type OsType = "linux" | "windows" | "macos";
type PceSyncStatus = "In Sync" | "Out of Sync" | "Syncing";

interface VenData {
  id: string;
  hostname: string;
  ipAddress: string;
  venVersion: string;
  state: VenState;
  mode: VenMode;
  health: VenHealth;
  osType: OsType;
  osVersion: string;
  lastHeartbeat: string;
  pceSync: PceSyncStatus;
  workloadCount: number;
  labels: string[];
  pairingKey: string;
  installedAt: string;
  activatedAt: string;
  pceName: string;
  pceCluster: string;
}

// ---------------------------------------------------------------------------
// Filter options
// ---------------------------------------------------------------------------

const STATE_OPTIONS = [
  { id: "Active", label: "Active" },
  { id: "Suspended", label: "Suspended" },
  { id: "Stopped", label: "Stopped" },
  { id: "Uninstalled", label: "Uninstalled" },
];

const MODE_OPTIONS = [
  { id: "Visibility Only", label: "Visibility Only" },
  { id: "Selective Enforcement", label: "Selective Enforcement" },
  { id: "Full Enforcement", label: "Full Enforcement" },
];

const HEALTH_OPTIONS = [
  { id: "Healthy", label: "Healthy" },
  { id: "Warning", label: "Warning" },
  { id: "Error", label: "Error" },
  { id: "Offline", label: "Offline" },
];

const OS_OPTIONS = [
  { id: "linux", label: "Linux" },
  { id: "windows", label: "Windows" },
  { id: "macos", label: "macOS" },
];

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_VENS: VenData[] = [
  {
    id: "ven-001",
    hostname: "prod-web-server-01",
    ipAddress: "10.0.1.15",
    venVersion: "24.2.0-build.12345",
    state: "Active",
    mode: "Full Enforcement",
    health: "Healthy",
    osType: "linux",
    osVersion: "Ubuntu 22.04 LTS",
    lastHeartbeat: "2 mins ago",
    pceSync: "In Sync",
    workloadCount: 3,
    labels: ["env:prod", "app:web", "loc:us-west-2"],
    pairingKey: "XYZ123ABC",
    installedAt: "Jan 15, 2026",
    activatedAt: "Jan 15, 2026",
    pceName: "pce-prod-west",
    pceCluster: "us-west-cluster-01",
  },
  {
    id: "ven-002",
    hostname: "db-primary-node",
    ipAddress: "10.0.2.50",
    venVersion: "24.2.0-build.12345",
    state: "Active",
    mode: "Full Enforcement",
    health: "Healthy",
    osType: "linux",
    osVersion: "RHEL 8.6",
    lastHeartbeat: "1 min ago",
    pceSync: "In Sync",
    workloadCount: 1,
    labels: ["env:prod", "app:database", "tier:data"],
    pairingKey: "ABC789DEF",
    installedAt: "Jan 10, 2026",
    activatedAt: "Jan 10, 2026",
    pceName: "pce-prod-west",
    pceCluster: "us-west-cluster-01",
  },
  {
    id: "ven-003",
    hostname: "api-gateway-02",
    ipAddress: "10.0.1.30",
    venVersion: "24.1.5-build.11000",
    state: "Active",
    mode: "Visibility Only",
    health: "Warning",
    osType: "linux",
    osVersion: "Amazon Linux 2",
    lastHeartbeat: "15 mins ago",
    pceSync: "Out of Sync",
    workloadCount: 2,
    labels: ["env:prod", "app:api"],
    pairingKey: "GHI456JKL",
    installedAt: "Feb 20, 2026",
    activatedAt: "Feb 20, 2026",
    pceName: "pce-prod-west",
    pceCluster: "us-west-cluster-01",
  },
  {
    id: "ven-004",
    hostname: "dev-workstation-01",
    ipAddress: "192.168.1.100",
    venVersion: "24.2.0-build.12345",
    state: "Active",
    mode: "Visibility Only",
    health: "Healthy",
    osType: "macos",
    osVersion: "macOS Sonoma 14.2",
    lastHeartbeat: "30 secs ago",
    pceSync: "In Sync",
    workloadCount: 1,
    labels: ["env:dev", "team:engineering"],
    pairingKey: "MNO321PQR",
    installedAt: "Mar 01, 2026",
    activatedAt: "Mar 01, 2026",
    pceName: "pce-dev-central",
    pceCluster: "dev-cluster-01",
  },
  {
    id: "ven-005",
    hostname: "win-server-2022-01",
    ipAddress: "10.0.3.25",
    venVersion: "24.2.0-build.12345",
    state: "Active",
    mode: "Selective Enforcement",
    health: "Healthy",
    osType: "windows",
    osVersion: "Windows Server 2022",
    lastHeartbeat: "5 mins ago",
    pceSync: "In Sync",
    workloadCount: 4,
    labels: ["env:prod", "app:ad", "os:windows"],
    pairingKey: "STU654VWX",
    installedAt: "Feb 15, 2026",
    activatedAt: "Feb 15, 2026",
    pceName: "pce-prod-east",
    pceCluster: "us-east-cluster-01",
  },
  {
    id: "ven-006",
    hostname: "cache-redis-01",
    ipAddress: "10.0.2.100",
    venVersion: "24.1.5-build.11000",
    state: "Suspended",
    mode: "Selective Enforcement",
    health: "Healthy",
    osType: "linux",
    osVersion: "Debian 11",
    lastHeartbeat: "2 hours ago",
    pceSync: "In Sync",
    workloadCount: 1,
    labels: ["env:prod", "app:cache"],
    pairingKey: "YZA987BCD",
    installedAt: "Jan 25, 2026",
    activatedAt: "Jan 25, 2026",
    pceName: "pce-prod-west",
    pceCluster: "us-west-cluster-01",
  },
  {
    id: "ven-007",
    hostname: "legacy-app-server",
    ipAddress: "10.0.5.10",
    venVersion: "23.5.2-build.8000",
    state: "Stopped",
    mode: "Visibility Only",
    health: "Error",
    osType: "linux",
    osVersion: "CentOS 7",
    lastHeartbeat: "1 day ago",
    pceSync: "Out of Sync",
    workloadCount: 1,
    labels: ["env:prod", "app:legacy", "decommission:pending"],
    pairingKey: "EFG123HIJ",
    installedAt: "Nov 10, 2025",
    activatedAt: "Nov 10, 2025",
    pceName: "pce-prod-west",
    pceCluster: "us-west-cluster-01",
  },
  {
    id: "ven-008",
    hostname: "monitoring-prometheus",
    ipAddress: "10.0.4.50",
    venVersion: "24.2.0-build.12345",
    state: "Active",
    mode: "Full Enforcement",
    health: "Healthy",
    osType: "linux",
    osVersion: "Ubuntu 20.04 LTS",
    lastHeartbeat: "1 min ago",
    pceSync: "In Sync",
    workloadCount: 2,
    labels: ["env:prod", "app:monitoring", "team:sre"],
    pairingKey: "KLM456NOP",
    installedAt: "Dec 05, 2025",
    activatedAt: "Dec 05, 2025",
    pceName: "pce-prod-west",
    pceCluster: "us-west-cluster-01",
  },
  {
    id: "ven-009",
    hostname: "staging-k8s-node-01",
    ipAddress: "10.1.1.20",
    venVersion: "24.2.0-build.12345",
    state: "Active",
    mode: "Visibility Only",
    health: "Healthy",
    osType: "linux",
    osVersion: "Ubuntu 22.04 LTS",
    lastHeartbeat: "3 mins ago",
    pceSync: "Syncing",
    workloadCount: 12,
    labels: ["env:staging", "platform:k8s", "node:worker"],
    pairingKey: "QRS789TUV",
    installedAt: "Mar 10, 2026",
    activatedAt: "Mar 10, 2026",
    pceName: "pce-staging",
    pceCluster: "staging-cluster-01",
  },
  {
    id: "ven-010",
    hostname: "test-vm-windows",
    ipAddress: "192.168.2.50",
    venVersion: "24.1.5-build.11000",
    state: "Active",
    mode: "Visibility Only",
    health: "Offline",
    osType: "windows",
    osVersion: "Windows 11 Pro",
    lastHeartbeat: "3 days ago",
    pceSync: "Out of Sync",
    workloadCount: 1,
    labels: ["env:test", "temp:true"],
    pairingKey: "WXY012ZAB",
    installedAt: "Apr 01, 2026",
    activatedAt: "Apr 01, 2026",
    pceName: "pce-dev-central",
    pceCluster: "dev-cluster-01",
  },
  {
    id: "ven-011",
    hostname: "payment-service-01",
    ipAddress: "10.0.6.15",
    venVersion: "24.2.0-build.12345",
    state: "Active",
    mode: "Full Enforcement",
    health: "Healthy",
    osType: "linux",
    osVersion: "RHEL 9.0",
    lastHeartbeat: "45 secs ago",
    pceSync: "In Sync",
    workloadCount: 1,
    labels: ["env:prod", "app:payments", "pci:true", "critical:true"],
    pairingKey: "CDE345FGH",
    installedAt: "Feb 01, 2026",
    activatedAt: "Feb 01, 2026",
    pceName: "pce-prod-east",
    pceCluster: "us-east-cluster-01",
  },
  {
    id: "ven-012",
    hostname: "ci-runner-03",
    ipAddress: "10.1.5.30",
    venVersion: "24.2.0-build.12345",
    state: "Active",
    mode: "Selective Enforcement",
    health: "Warning",
    osType: "linux",
    osVersion: "Ubuntu 22.04 LTS",
    lastHeartbeat: "8 mins ago",
    pceSync: "In Sync",
    workloadCount: 1,
    labels: ["env:ci", "app:runner", "ephemeral:true"],
    pairingKey: "IJK678LMN",
    installedAt: "Mar 15, 2026",
    activatedAt: "Mar 15, 2026",
    pceName: "pce-dev-central",
    pceCluster: "dev-cluster-01",
  },
  {
    id: "ven-013",
    hostname: "backup-server-01",
    ipAddress: "10.0.7.100",
    venVersion: "24.1.5-build.11000",
    state: "Uninstalled",
    mode: "Visibility Only",
    health: "Offline",
    osType: "linux",
    osVersion: "Rocky Linux 8",
    lastHeartbeat: "1 week ago",
    pceSync: "Out of Sync",
    workloadCount: 0,
    labels: ["env:prod", "app:backup", "decommissioned:true"],
    pairingKey: "OPQ901RST",
    installedAt: "Oct 15, 2025",
    activatedAt: "Oct 15, 2025",
    pceName: "pce-prod-west",
    pceCluster: "us-west-cluster-01",
  },
  {
    id: "ven-014",
    hostname: "queue-rabbitmq-01",
    ipAddress: "10.0.2.75",
    venVersion: "24.2.0-build.12345",
    state: "Active",
    mode: "Full Enforcement",
    health: "Healthy",
    osType: "linux",
    osVersion: "Debian 12",
    lastHeartbeat: "2 mins ago",
    pceSync: "In Sync",
    workloadCount: 1,
    labels: ["env:prod", "app:messaging", "tier:middleware"],
    pairingKey: "UVW234XYZ",
    installedAt: "Jan 20, 2026",
    activatedAt: "Jan 20, 2026",
    pceName: "pce-prod-west",
    pceCluster: "us-west-cluster-01",
  },
  {
    id: "ven-015",
    hostname: "analytics-spark-master",
    ipAddress: "10.0.8.10",
    venVersion: "24.2.0-build.12345",
    state: "Active",
    mode: "Selective Enforcement",
    health: "Healthy",
    osType: "linux",
    osVersion: "Ubuntu 20.04 LTS",
    lastHeartbeat: "1 min ago",
    pceSync: "In Sync",
    workloadCount: 8,
    labels: ["env:prod", "app:analytics", "platform:spark"],
    pairingKey: "ABC567DEF",
    installedAt: "Feb 28, 2026",
    activatedAt: "Feb 28, 2026",
    pceName: "pce-prod-east",
    pceCluster: "us-east-cluster-01",
  },
];

// ---------------------------------------------------------------------------
// Tab definitions
// ---------------------------------------------------------------------------

const TAB_OPTIONS = [
  { id: "all", label: "All VENs" },
  { id: "by-state", label: "By State" },
  { id: "by-mode", label: "By Mode" },
  { id: "health-issues", label: "Health Issues" },
];

// ---------------------------------------------------------------------------
// Cell renderers
// ---------------------------------------------------------------------------

const HostnameCellRenderer = ({ data }: { data: VenData }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Icon name="server" size={14} color="var(--lightning-blue-600, #2366ed)" />
      <span style={{ color: "var(--lightning-blue-600, #2366ed)", cursor: "pointer" }}>
        {data.hostname}
      </span>
    </div>
  );
};

const VenStateCellRenderer = ({ data }: { data: VenData }) => {
  const stateConfig: Record<VenState, { color: string; bg: string }> = {
    Active: { color: "var(--lightning-green-600, #12a732)", bg: "var(--lightning-green-50, #e6f7e9)" },
    Suspended: { color: "var(--lightning-orange-600, #cf630e)", bg: "var(--lightning-orange-50, #fef3e2)" },
    Stopped: { color: "var(--lightning-gray-500, #6b7280)", bg: "var(--lightning-gray-100, #f0f1f3)" },
    Uninstalled: { color: "var(--lightning-red-600, #c93734)", bg: "var(--lightning-red-50, #fde8e8)" },
  };

  const { color, bg } = stateConfig[data.state];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
      <span style={{ color, fontWeight: 500, fontSize: 13 }}>{data.state}</span>
    </div>
  );
};

const VenModeCellRenderer = ({ data }: { data: VenData }) => {
  const modeConfig: Record<VenMode, { bg: string; color: string; icon: "eye" | "shield-check" | "shield" }> = {
    "Visibility Only": {
      bg: "var(--lightning-blue-50, #e3f0fe)",
      color: "var(--lightning-blue-700, #1a4fba)",
      icon: "eye",
    },
    "Selective Enforcement": {
      bg: "var(--lightning-orange-50, #fef3e2)",
      color: "var(--lightning-orange-700, #a94e0a)",
      icon: "shield-check",
    },
    "Full Enforcement": {
      bg: "var(--lightning-green-50, #e6f7e9)",
      color: "var(--lightning-green-700, #0d7a25)",
      icon: "shield",
    },
  };

  const { bg, color, icon } = modeConfig[data.mode];

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: bg,
        color,
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      <Icon name={icon} size={12} color={color} />
      {data.mode}
    </div>
  );
};

const HealthCellRenderer = ({ data }: { data: VenData }) => {
  const healthConfig: Record<VenHealth, { color: string; icon: "circle-check" | "triangle-exclamation" | "circle-xmark" | "circle-minus" }> = {
    Healthy: { color: "var(--lightning-green-500, #22c55e)", icon: "circle-check" },
    Warning: { color: "var(--lightning-yellow-500, #eab308)", icon: "triangle-exclamation" },
    Error: { color: "var(--lightning-red-500, #ef4444)", icon: "circle-xmark" },
    Offline: { color: "var(--lightning-gray-400, #9ca3af)", icon: "circle-minus" },
  };

  const { color, icon } = healthConfig[data.health];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <Icon name={icon} size={14} color={color} />
      <span style={{ color: "var(--lightning-gray-700, #4a5056)", fontSize: 13 }}>{data.health}</span>
    </div>
  );
};

const OsCellRenderer = ({ data }: { data: VenData }) => {
  const osLabels: Record<OsType, string> = {
    linux: "Linux",
    windows: "Windows",
    macos: "macOS",
  };

  return (
    <span style={{ color: "var(--lightning-gray-700, #4a5056)", fontSize: 13 }}>
      {osLabels[data.osType]}
    </span>
  );
};

const HeartbeatCellRenderer = ({ data }: { data: VenData }) => {
  // Determine color based on heartbeat recency
  let color = "var(--lightning-green-600, #12a732)"; // Recent
  if (data.lastHeartbeat.includes("hour") || data.lastHeartbeat.includes("day") || data.lastHeartbeat.includes("week")) {
    color = "var(--lightning-red-600, #c93734)"; // Very stale
  } else if (data.lastHeartbeat.includes("min") && parseInt(data.lastHeartbeat) > 10) {
    color = "var(--lightning-orange-600, #cf630e)"; // Stale
  }

  return (
    <span style={{ color, fontSize: 13 }}>
      {data.lastHeartbeat}
    </span>
  );
};

const PceSyncCellRenderer = ({ data }: { data: VenData }) => {
  const syncConfig: Record<PceSyncStatus, { color: string; bg: string }> = {
    "In Sync": { color: "var(--lightning-green-700, #0d7a25)", bg: "var(--lightning-green-50, #e6f7e9)" },
    "Out of Sync": { color: "var(--lightning-red-700, #9f1d1d)", bg: "var(--lightning-red-50, #fde8e8)" },
    Syncing: { color: "var(--lightning-blue-700, #1a4fba)", bg: "var(--lightning-blue-50, #e3f0fe)" },
  };

  const { color, bg } = syncConfig[data.pceSync];

  return (
    <span
      style={{
        background: bg,
        color,
        padding: "2px 6px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 500,
      }}
    >
      {data.pceSync}
    </span>
  );
};

const LabelsCellRenderer = ({ data }: { data: VenData }) => {
  if (!data.labels || data.labels.length === 0) {
    return <span style={{ color: "var(--lightning-bluegray-400, #98aab8)" }}>—</span>;
  }

  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {data.labels.slice(0, 2).map((label, i) => (
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
      {data.labels.length > 2 && (
        <span style={{ color: "var(--lightning-bluegray-500, #7a90a4)", fontSize: 11 }}>
          +{data.labels.length - 2}
        </span>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// VEN Detail Slideout
// ---------------------------------------------------------------------------

function VenDetailPanel({ ven, onClose }: { ven: VenData; onClose: () => void }) {
  const [activeAnchor, setActiveAnchor] = useState("details");

  const anchors = [
    { id: "details", label: "VEN Details" },
    { id: "workload", label: "Workload Info" },
    { id: "pce", label: "PCE Connection" },
    { id: "labels", label: "Labels" },
  ];

  return (
    <>
      <SlideoutHeader
        icon={<Icon name="server" size={20} />}
        iconColor="blue"
        title={ven.hostname}
        subtitle={ven.ipAddress}
      />

      <SlideoutBody
        anchors={anchors}
        activeAnchorId={activeAnchor}
        onAnchorChange={setActiveAnchor}
      >
        {/* VEN Details Section */}
        <SlideoutSection id="details" title="VEN Details">
          <div className="details-grid">
            <div className="details-row">
              <span className="details-label">VEN ID</span>
              <span className="details-value mono">{ven.id}</span>
            </div>
            <div className="details-row">
              <span className="details-label">VEN Version</span>
              <span className="details-value mono">{ven.venVersion}</span>
            </div>
            <div className="details-row">
              <span className="details-label">State</span>
              <VenStateCellRenderer data={ven} />
            </div>
            <div className="details-row">
              <span className="details-label">Mode</span>
              <VenModeCellRenderer data={ven} />
            </div>
            <div className="details-row">
              <span className="details-label">Health</span>
              <HealthCellRenderer data={ven} />
            </div>
            <div className="details-row">
              <span className="details-label">Installed At</span>
              <span className="details-value">{ven.installedAt}</span>
            </div>
            <div className="details-row">
              <span className="details-label">Activated At</span>
              <span className="details-value">{ven.activatedAt}</span>
            </div>
          </div>
        </SlideoutSection>

        {/* Workload Info Section */}
        <SlideoutSection id="workload" title="Workload Info">
          <div className="details-grid">
            <div className="details-row">
              <span className="details-label">OS Type</span>
              <span className="details-value">{ven.osType === "linux" ? "Linux" : ven.osType === "windows" ? "Windows" : "macOS"}</span>
            </div>
            <div className="details-row">
              <span className="details-label">OS Version</span>
              <span className="details-value">{ven.osVersion}</span>
            </div>
            <div className="details-row">
              <span className="details-label">Workload Count</span>
              <span className="details-value">{ven.workloadCount}</span>
            </div>
            <div className="details-row">
              <span className="details-label">Pairing Key</span>
              <span className="details-value mono">{ven.pairingKey}</span>
            </div>
          </div>
        </SlideoutSection>

        {/* PCE Connection Section */}
        <SlideoutSection id="pce" title="PCE Connection">
          <div className="details-grid">
            <div className="details-row">
              <span className="details-label">PCE Name</span>
              <span className="details-value">{ven.pceName}</span>
            </div>
            <div className="details-row">
              <span className="details-label">PCE Cluster</span>
              <span className="details-value">{ven.pceCluster}</span>
            </div>
            <div className="details-row">
              <span className="details-label">Sync Status</span>
              <PceSyncCellRenderer data={ven} />
            </div>
            <div className="details-row">
              <span className="details-label">Last Heartbeat</span>
              <HeartbeatCellRenderer data={ven} />
            </div>
          </div>
        </SlideoutSection>

        {/* Labels Section */}
        <SlideoutSection id="labels" title="Labels">
          {ven.labels.length > 0 ? (
            <div className="labels-grid">
              {ven.labels.map((label, i) => (
                <Pill key={i}>{label}</Pill>
              ))}
            </div>
          ) : (
            <span style={{ color: "var(--lightning-bluegray-400, #98aab8)", fontSize: 13 }}>
              No labels assigned
            </span>
          )}
        </SlideoutSection>
      </SlideoutBody>

      <SlideoutFooter split>
        <SlideoutFooterGroup>
          <Button variant="secondary-outlined" size="sm">
            View Workload
          </Button>
        </SlideoutFooterGroup>
        <SlideoutFooterGroup>
          <Button variant="primary-ghost" size="sm">
            {ven.state === "Suspended" ? "Resume VEN" : "Suspend VEN"}
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
        .details-value.mono {
          font-family: "Geist Mono", monospace;
          font-size: 12px;
        }
        .labels-grid {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
}

// ---------------------------------------------------------------------------
// Main floorplan
// ---------------------------------------------------------------------------

export interface VensExplorationFloorplanProps {
  pageTitle?: string;
}

export function VensExplorationFloorplan({ pageTitle = "VENs" }: VensExplorationFloorplanProps) {
  // State
  const [activeTab, setActiveTab] = useState("all");
  const [stateFilter, setStateFilter] = useState<string[]>([]);
  const [modeFilter, setModeFilter] = useState<string[]>([]);
  const [healthFilter, setHealthFilter] = useState<string[]>([]);
  const [osFilter, setOsFilter] = useState<string[]>([]);
  const [selectedVen, setSelectedVen] = useState<VenData | null>(null);
  const [selectedRows, setSelectedRows] = useState<VenData[]>([]);

  // Filter active pills
  const activeFilters: { label: string; onClear: () => void }[] = [];
  if (stateFilter.length > 0) {
    activeFilters.push({
      label: `State: ${stateFilter.join(", ")}`,
      onClear: () => setStateFilter([]),
    });
  }
  if (modeFilter.length > 0) {
    activeFilters.push({
      label: `Mode: ${modeFilter.join(", ")}`,
      onClear: () => setModeFilter([]),
    });
  }
  if (healthFilter.length > 0) {
    activeFilters.push({
      label: `Health: ${healthFilter.join(", ")}`,
      onClear: () => setHealthFilter([]),
    });
  }
  if (osFilter.length > 0) {
    activeFilters.push({
      label: `OS: ${osFilter.join(", ")}`,
      onClear: () => setOsFilter([]),
    });
  }

  // Filtered data
  const filteredData = useMemo<VenData[]>(() => {
    let data = MOCK_VENS;

    // Tab-based filtering
    if (activeTab === "health-issues") {
      data = data.filter((v) => v.health !== "Healthy");
    }

    // Dropdown filters
    if (stateFilter.length > 0) {
      data = data.filter((v) => stateFilter.includes(v.state));
    }
    if (modeFilter.length > 0) {
      data = data.filter((v) => modeFilter.includes(v.mode));
    }
    if (healthFilter.length > 0) {
      data = data.filter((v) => healthFilter.includes(v.health));
    }
    if (osFilter.length > 0) {
      data = data.filter((v) => osFilter.includes(v.osType));
    }

    return data;
  }, [activeTab, stateFilter, modeFilter, healthFilter, osFilter]);

  // Column definitions
  const columnDefs = useMemo<ColDef<VenData>[]>(
    () => [
      {
        field: "hostname",
        headerName: "Hostname",
        width: 200,
        sortable: true,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        cellRenderer: HostnameCellRenderer,
      },
      {
        field: "ipAddress",
        headerName: "IP Address",
        width: 130,
        sortable: true,
        cellClass: "cell-number",
      },
      {
        field: "state",
        headerName: "State",
        width: 120,
        sortable: true,
        cellRenderer: VenStateCellRenderer,
      },
      {
        field: "mode",
        headerName: "Mode",
        width: 180,
        sortable: true,
        cellRenderer: VenModeCellRenderer,
      },
      {
        field: "health",
        headerName: "Health",
        width: 110,
        sortable: true,
        cellRenderer: HealthCellRenderer,
      },
      {
        field: "venVersion",
        headerName: "VEN Version",
        width: 180,
        sortable: true,
        cellClass: "cell-number",
      },
      {
        field: "osType",
        headerName: "OS",
        width: 100,
        sortable: true,
        cellRenderer: OsCellRenderer,
      },
      {
        field: "lastHeartbeat",
        headerName: "Last Heartbeat",
        width: 130,
        sortable: true,
        cellRenderer: HeartbeatCellRenderer,
      },
      {
        field: "pceSync",
        headerName: "PCE Sync",
        width: 110,
        sortable: true,
        cellRenderer: PceSyncCellRenderer,
      },
      {
        field: "labels",
        headerName: "Labels",
        flex: 1,
        minWidth: 200,
        cellRenderer: LabelsCellRenderer,
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(() => ({ resizable: true }), []);

  const handleRowClicked = useCallback((event: RowClickedEvent<VenData>) => {
    if (event.data) setSelectedVen(event.data);
  }, []);

  return (
    <div className="vens-floorplan">
      {/* Fixed SideNav */}
      <SideNav>
        <SideNavSection title="PCE">
          <SideNavItem icon={<Icon name="grid" size={16} />} level={1}>
            Dashboard
          </SideNavItem>
          <SideNavItem icon={<Icon name="server" size={16} />} level={1} active>
            VENs
          </SideNavItem>
          <SideNavItem icon={<Icon name="users" size={16} />} level={1}>
            Workloads
          </SideNavItem>
          <SideNavItem icon={<Icon name="shield" size={16} />} level={1}>
            Policies
          </SideNavItem>
          <SideNavItem icon={<Icon name="bell" size={16} />} level={1}>
            Events
          </SideNavItem>
        </SideNavSection>
      </SideNav>

      {/* Main area */}
      <div className="vens-floorplan__main">
        <Header
          breadcrumbs={[
            { label: "Home", href: "/demos" },
            { label: "Servers & Endpoints" },
            { label: "Workloads" },
          ]}
          title={pageTitle}
          user={{ firstName: "Aziz", lastName: "Khilawala" }}
          sticky
        />

        <main className="vens-floorplan__content">
          {/* Video Banner */}
          <div className="vens-floorplan__banner">
            <div className="vens-floorplan__banner-content">
              <div className="vens-floorplan__banner-icon">
                <Icon name="server" size={24} color="var(--lightning-blue-500, #3a88fc)" />
              </div>
              <div>
                <h3 className="vens-floorplan__banner-title">What are VENs?</h3>
                <p className="vens-floorplan__banner-desc">
                  Virtual Enforcement Nodes (VENs) are lightweight agents installed on workloads that provide visibility
                  and enforce security policies. VENs communicate with the PCE to receive policy updates and report
                  telemetry data about network flows.
                </p>
              </div>
            </div>
            <Button variant="primary-ghost" size="sm">
              <Icon name="circle-play" size={14} />
              Watch the Video
            </Button>
          </div>

          {/* Tabs */}
          <div className="vens-floorplan__tabs">
            <Tabs
              activeTab={activeTab}
              onChange={setActiveTab}
              variant="secondary"
            >
              <TabList tabs={TAB_OPTIONS} />
            </Tabs>
          </div>

          {/* Action Toolbar */}
          <div className="vens-floorplan__toolbar">
            <div className="vens-floorplan__actions">
              <Button variant="secondary-outlined" size="sm" disabled={selectedRows.length === 0}>
                Unpair
              </Button>
              <Button variant="secondary-outlined" size="sm" disabled={selectedRows.length === 0}>
                Suspend
              </Button>
              <Button variant="secondary-outlined" size="sm" disabled={selectedRows.length === 0}>
                Resume
              </Button>
              <Button variant="secondary-ghost" size="sm">
                <Icon name="refresh-cw" size={14} />
                Refresh
              </Button>
            </div>

            <div className="vens-floorplan__filters">
              <OptionSelector
                options={STATE_OPTIONS}
                value={stateFilter}
                onChange={(v) => setStateFilter(v as string[])}
                placeholder="State"
                multiSelect
              />
              <OptionSelector
                options={MODE_OPTIONS}
                value={modeFilter}
                onChange={(v) => setModeFilter(v as string[])}
                placeholder="Mode"
                multiSelect
              />
              <OptionSelector
                options={HEALTH_OPTIONS}
                value={healthFilter}
                onChange={(v) => setHealthFilter(v as string[])}
                placeholder="Health"
                multiSelect
              />
              <OptionSelector
                options={OS_OPTIONS}
                value={osFilter}
                onChange={(v) => setOsFilter(v as string[])}
                placeholder="OS"
                multiSelect
              />
            </div>
          </div>

          {/* Active filter pills */}
          {activeFilters.length > 0 && (
            <div className="vens-floorplan__filter-pills">
              {activeFilters.map((f, i) => (
                <Pill key={i} showCloseButton onClose={f.onClear}>
                  {f.label}
                </Pill>
              ))}
            </div>
          )}

          {/* VENs Table */}
          <div className="vens-floorplan__table ag-theme-alpine">
            <AgGridReact<VenData>
              rowData={filteredData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              domLayout="normal"
              headerHeight={32}
              rowHeight={40}
              pagination
              paginationPageSize={20}
              paginationPageSizeSelector={[10, 20, 50, 100]}
              animateRows
              rowSelection="multiple"
              rowStyle={{ cursor: "pointer" }}
              onRowClicked={handleRowClicked}
              onSelectionChanged={(event) => {
                setSelectedRows(event.api.getSelectedRows());
              }}
            />
          </div>
        </main>
      </div>

      {/* VEN detail slideout */}
      <Slideout isOpen={!!selectedVen} onClose={() => setSelectedVen(null)} size="lg">
        {selectedVen && (
          <VenDetailPanel ven={selectedVen} onClose={() => setSelectedVen(null)} />
        )}
      </Slideout>

      <style jsx>{`
        .vens-floorplan {
          min-height: 100vh;
          background: var(--bg-page, #f6f8f9);
        }

        .vens-floorplan__main {
          display: flex;
          flex-direction: column;
          height: 100vh;
          margin-left: 220px;
          overflow: hidden;
        }

        .vens-floorplan__content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 16px 24px;
          gap: 16px;
        }

        .vens-floorplan__banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, var(--lightning-blue-50, #e3f0fe) 0%, var(--lightning-blue-100, #c7e1fc) 100%);
          border: 1px solid var(--lightning-blue-200, #92c7fe);
          border-radius: 8px;
          padding: 16px 20px;
        }

        .vens-floorplan__banner-content {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .vens-floorplan__banner-icon {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .vens-floorplan__banner-title {
          margin: 0 0 4px 0;
          font-size: 15px;
          font-weight: 600;
          color: var(--lightning-gray-900, #1d2024);
        }

        .vens-floorplan__banner-desc {
          margin: 0;
          font-size: 13px;
          color: var(--lightning-bluegray-700, #435466);
          line-height: 1.5;
          max-width: 700px;
        }

        .vens-floorplan__tabs {
          border-bottom: 1px solid var(--lightning-gray-200, #e6e8eb);
        }

        .vens-floorplan__toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .vens-floorplan__actions {
          display: flex;
          gap: 8px;
        }

        .vens-floorplan__filters {
          display: flex;
          gap: 8px;
        }

        .vens-floorplan__filters > :global(*) {
          width: 140px;
        }

        .vens-floorplan__filter-pills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .vens-floorplan__table {
          flex: 1;
          min-height: 0;
          border-radius: 8px;
          border: 1px solid var(--lightning-gray-200, #e6e8eb);
          background: #ffffff;
          overflow: hidden;
        }

        :global(.vens-floorplan .ag-row-hover) {
          background-color: var(--lightning-blue-25, #f0f7ff);
        }

        :global(.vens-floorplan .ag-row-selected) {
          background-color: var(--lightning-blue-200, #92c7fe);
        }
      `}</style>
    </div>
  );
}
