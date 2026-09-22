"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter, Pill } from "@/design-system";
import { Icon } from "@/design-system/icons";
import styles from "./page.module.css";

/* ============================================================
   Types
   ============================================================ */

type ClusterRow = {
  name: string;
  cloud: string;
  region: string;
  cni: string;
  enforcementLevel: string;
  operatorStatus: string;
  workloadCount: number;
};

type ClusterNamespace = {
  cluster: string;
  namespace: string;
  labelStatus: "labeled" | "unlabeled";
  workloads: number;
};

type NamespaceAssignment = {
  namespace: string;
  cluster: string;
  role: string;
  app: string;
  env: string;
  loc: string;
  source: string;
};

type LabelMappingRule = {
  fromKey: string;
  toKey: string;
  valuesMap: string;
  allowCreate: boolean;
  source: string;
};

type WorkloadRow = {
  name: string;
  type: string;
  cluster: string;
  namespace: string;
  appLabel: string;
  envLabel: string;
  roleLabel: string;
  enforcement: string;
  isK8s: boolean;
};

type PolicyFinding = {
  severity: "High" | "Medium" | "Low";
  namespace: string;
  cluster: string;
  findingType: string;
  remediation: string;
};

type PostureCoverage = {
  namespace: string;
  cluster: string;
  coveragePct: number;
  protected: number;
  exposed: number;
  policyCount: number;
};

type K8sPolicy = {
  name: string;
  cluster: string;
  namespace: string;
  cni: string;
  source: string;
  delivery: string;
  drift: string;
  state: string;
  guardrailConflict: boolean;
  attribution: string;
};

type Recommendation = {
  title: string;
  evidence: string;
  coverage: string;
  action: string;
};

type FlowStatus = "Newly Protected" | "Protected" | "Would Block" | "Exposed" | "Unchanged";

type FlowRow = {
  id: string;
  source: string;
  destination: string;
  service: string;
  before: string;
  after: string;
  status: FlowStatus;
  why: string;
};

type PolicyLifecycleState =
  | "Drafting"
  | "Pending Review"
  | "Approved"
  | "Deploying"
  | "Active"
  | "Failed"
  | "Out-of-Sync";

/* ============================================================
   Mock Data
   ============================================================ */

const clusterRows: ClusterRow[] = [
  {
    name: "prod-eks-us-east-1",
    cloud: "AWS",
    region: "us-east-1",
    cni: "AWS VPC CNI",
    enforcementLevel: "Native Only",
    operatorStatus: "Connected",
    workloadCount: 42,
  },
  {
    name: "platform-aks-westus",
    cloud: "Azure",
    region: "westus",
    cni: "Azure CNI",
    enforcementLevel: "Hybrid with NSG",
    operatorStatus: "Degraded",
    workloadCount: 28,
  },
  {
    name: "shared-gke-us-central1",
    cloud: "GCP",
    region: "us-central1",
    cni: "GKE Dataplane V2",
    enforcementLevel: "Cilium Full",
    operatorStatus: "Connected",
    workloadCount: 19,
  },
];

const clusterNamespaces: ClusterNamespace[] = [
  { cluster: "prod-eks-us-east-1", namespace: "frontend", labelStatus: "labeled", workloads: 8 },
  { cluster: "prod-eks-us-east-1", namespace: "backend", labelStatus: "labeled", workloads: 14 },
  { cluster: "prod-eks-us-east-1", namespace: "payments", labelStatus: "unlabeled", workloads: 6 },
  { cluster: "platform-aks-westus", namespace: "observability", labelStatus: "labeled", workloads: 12 },
  { cluster: "platform-aks-westus", namespace: "platform-tools", labelStatus: "labeled", workloads: 9 },
  { cluster: "shared-gke-us-central1", namespace: "shared-services", labelStatus: "unlabeled", workloads: 5 },
  { cluster: "shared-gke-us-central1", namespace: "ingress", labelStatus: "labeled", workloads: 4 },
];

const namespaceAssignments: NamespaceAssignment[] = [
  {
    namespace: "frontend",
    cluster: "prod-eks-us-east-1",
    role: "web",
    app: "online-store",
    env: "production",
    loc: "aws-us-east-1",
    source: "platform-assignment",
  },
  {
    namespace: "backend",
    cluster: "prod-eks-us-east-1",
    role: "api",
    app: "online-store",
    env: "production",
    loc: "aws-us-east-1",
    source: "label-map",
  },
  {
    namespace: "observability",
    cluster: "platform-aks-westus",
    role: "monitoring",
    app: "platform",
    env: "production",
    loc: "azure-westus",
    source: "annotation",
  },
  {
    namespace: "shared-services",
    cluster: "shared-gke-us-central1",
    role: "infra",
    app: "shared",
    env: "production",
    loc: "gcp-us-central1",
    source: "k8s-native",
  },
];

const labelMappingRules: LabelMappingRule[] = [
  { fromKey: "app", toKey: "application", valuesMap: "pass-through", allowCreate: false, source: "platform-assignment" },
  {
    fromKey: "pod-type",
    toKey: "role",
    valuesMap: "web→frontend, api→backend, worker→batch",
    allowCreate: false,
    source: "label-map",
  },
  { fromKey: "environ", toKey: "env", valuesMap: "pass-through", allowCreate: true, source: "label-map" },
  { fromKey: "stage", toKey: "role", valuesMap: "pass-through", allowCreate: true, source: "annotation" },
];

const workloadRows: WorkloadRow[] = [
  {
    name: "web-frontend",
    type: "K8s Deployment",
    cluster: "prod-eks-us-east-1",
    namespace: "frontend",
    appLabel: "online-store",
    envLabel: "production",
    roleLabel: "web",
    enforcement: "Active",
    isK8s: true,
  },
  {
    name: "checkout-api",
    type: "K8s Deployment",
    cluster: "prod-eks-us-east-1",
    namespace: "backend",
    appLabel: "online-store",
    envLabel: "production",
    roleLabel: "api",
    enforcement: "Active",
    isK8s: true,
  },
  {
    name: "payments-worker",
    type: "K8s StatefulSet",
    cluster: "prod-eks-us-east-1",
    namespace: "payments",
    appLabel: "",
    envLabel: "production",
    roleLabel: "worker",
    enforcement: "Idle",
    isK8s: true,
  },
  {
    name: "prometheus",
    type: "K8s DaemonSet",
    cluster: "platform-aks-westus",
    namespace: "observability",
    appLabel: "platform",
    envLabel: "production",
    roleLabel: "monitoring",
    enforcement: "Active",
    isK8s: true,
  },
  {
    name: "grafana",
    type: "K8s Deployment",
    cluster: "platform-aks-westus",
    namespace: "observability",
    appLabel: "platform",
    envLabel: "production",
    roleLabel: "dashboard",
    enforcement: "Active",
    isK8s: true,
  },
  {
    name: "ingress-nginx",
    type: "K8s Deployment",
    cluster: "shared-gke-us-central1",
    namespace: "ingress",
    appLabel: "shared",
    envLabel: "production",
    roleLabel: "ingress",
    enforcement: "Idle",
    isK8s: true,
  },
  {
    name: "db-primary-01",
    type: "VM",
    cluster: "on-prem-datacenter",
    namespace: "us-east-dc1",
    appLabel: "online-store",
    envLabel: "production",
    roleLabel: "database",
    enforcement: "Active",
    isK8s: false,
  },
  {
    name: "cache-redis-01",
    type: "Cloud Instance",
    cluster: "aws-us-east-1",
    namespace: "vpc-prod",
    appLabel: "online-store",
    envLabel: "production",
    roleLabel: "cache",
    enforcement: "Active",
    isK8s: false,
  },
  {
    name: "rds-postgres-prod",
    type: "Cloud Instance",
    cluster: "aws-us-east-1",
    namespace: "vpc-prod",
    appLabel: "online-store",
    envLabel: "production",
    roleLabel: "database",
    enforcement: "Idle",
    isK8s: false,
  },
];

const k8sPolicies: K8sPolicy[] = [
  {
    name: "frontend-to-backend-https",
    cluster: "prod-eks-us-east-1",
    namespace: "backend",
    cni: "AWS VPC CNI",
    source: "frontend namespace",
    delivery: "Manual YAML",
    drift: "None",
    state: "Active",
    guardrailConflict: false,
    attribution: "Illumio-managed",
  },
  {
    name: "payments-egress-api",
    cluster: "prod-eks-us-east-1",
    namespace: "payments",
    cni: "AWS VPC CNI",
    source: "payments deployments",
    delivery: "GitOps planned",
    drift: "Unchecked",
    state: "Pending Review",
    guardrailConflict: false,
    attribution: "Illumio-managed",
  },
  {
    name: "cluster-wide-deny-override",
    cluster: "platform-aks-westus",
    namespace: "observability",
    cni: "Azure CNI",
    source: "all namespaces",
    delivery: "Operator planned",
    drift: "Detected",
    state: "Out-of-Sync",
    guardrailConflict: true,
    attribution: "External",
  },
];

const postureCoverages: PostureCoverage[] = [
  { namespace: "frontend", cluster: "prod-eks-us-east-1", coveragePct: 85, protected: 7, exposed: 1, policyCount: 3 },
  { namespace: "backend", cluster: "prod-eks-us-east-1", coveragePct: 42, protected: 6, exposed: 8, policyCount: 2 },
  { namespace: "payments", cluster: "prod-eks-us-east-1", coveragePct: 91, protected: 6, exposed: 0, policyCount: 4 },
  {
    namespace: "observability",
    cluster: "platform-aks-westus",
    coveragePct: 18,
    protected: 2,
    exposed: 10,
    policyCount: 1,
  },
];

const policyFindings: PolicyFinding[] = [
  {
    severity: "High",
    namespace: "backend",
    cluster: "prod-eks-us-east-1",
    findingType: "Missing isolation",
    remediation: "Add default-deny NetworkPolicy",
  },
  {
    severity: "High",
    namespace: "observability",
    cluster: "platform-aks-westus",
    findingType: "Unrestricted egress",
    remediation: "Scope egress to known destinations",
  },
  {
    severity: "Medium",
    namespace: "payments",
    cluster: "prod-eks-us-east-1",
    findingType: "Overlapping policies",
    remediation: "Consolidate into single ruleset",
  },
  {
    severity: "Low",
    namespace: "frontend",
    cluster: "prod-eks-us-east-1",
    findingType: "Stale policy",
    remediation: "Remove policy for retired deployment",
  },
  {
    severity: "Medium",
    namespace: "observability",
    cluster: "platform-aks-westus",
    findingType: "Missing DNS exception",
    remediation: "Add egress rule for UDP 53",
  },
];

const recommendations: Recommendation[] = [
  {
    title: "Isolate payments namespace",
    evidence: "No default-deny found — 6 exposed workloads",
    coverage: "91%",
    action: "Create isolation policy",
  },
  {
    title: "Restrict backend ingress",
    evidence: "1,284 observed flows over 14 days",
    coverage: "78%",
    action: "Use current draft",
  },
  {
    title: "Add DNS egress exception",
    evidence: "DNS queries blocked in observability ns",
    coverage: "64%",
    action: "Create DNS policy",
  },
];

const impactFlows: FlowRow[] = [
  {
    id: "flow-1",
    source: "frontend/web",
    destination: "backend/api",
    service: "TCP 443",
    before: "Default allow",
    after: "Allowed by draft",
    status: "Newly Protected",
    why: "Matched frontend-to-backend-https",
  },
  {
    id: "flow-2",
    source: "frontend/web",
    destination: "backend/api",
    service: "TCP 8080",
    before: "Default allow",
    after: "Blocked by default deny",
    status: "Would Block",
    why: "No matching service in draft",
  },
  {
    id: "flow-3",
    source: "payments/worker",
    destination: "backend/api",
    service: "TCP 443",
    before: "Default allow",
    after: "Unchanged",
    status: "Unchanged",
    why: "Outside selected consumer scope",
  },
  {
    id: "flow-4",
    source: "internet",
    destination: "frontend/web",
    service: "TCP 443",
    before: "Exposed",
    after: "Exposed",
    status: "Exposed",
    why: "No frontend ingress policy selected",
  },
];

const consumers = [
  "namespace: frontend",
  "deployment: web",
  "label: tier=edge",
  "Illumio label: app=online-store",
  "CIDR: 10.32.0.0/16",
];

const providers = [
  "namespace: backend",
  "service: checkout-api",
  "label: app=api",
  "Illumio label: role=database",
  "K8s API server",
];

const services = ["TCP 443", "TCP 8443", "TCP named port https", "UDP 53", "All ports"];

/* ============================================================
   Helper Components
   ============================================================ */

function FlowBadge({ status }: { status: FlowStatus }) {
  const className =
    status === "Newly Protected" || status === "Protected"
      ? styles.goodBadge
      : status === "Would Block"
        ? styles.warnBadge
        : status === "Exposed"
          ? styles.riskBadge
          : styles.neutralBadge;
  return <span className={className}>{status}</span>;
}

function SeverityBadge({ severity }: { severity: "High" | "Medium" | "Low" }) {
  const cls = severity === "High" ? styles.riskBadge : severity === "Medium" ? styles.warnBadge : styles.neutralBadge;
  return <span className={cls}>{severity}</span>;
}

function EnforcementBadge({ level }: { level: string }) {
  const variant =
    level === "Active"
      ? "new"
      : level === "Idle"
        ? "draft"
        : level === "Out-of-Sync"
          ? "high"
          : level === "Pending Review"
            ? "info"
            : "draft";
  return <Badge variant={variant}>{level}</Badge>;
}

function OperatorStatusBadge({ status }: { status: string }) {
  const variant = status === "Connected" ? "new" : status === "Degraded" ? "medium" : "high";
  return <Badge variant={variant}>{status}</Badge>;
}

function EnforcementLevelBadge({ level }: { level: string }) {
  const variant =
    level === "Cilium Full"
      ? "info"
      : level === "Native Only"
        ? "new"
        : level === "Hybrid with NSG"
          ? "medium"
          : "recommended";
  return <Badge variant={variant}>{level}</Badge>;
}

function PolicyStateBadge({ state }: { state: string }) {
  const variant =
    state === "Active"
      ? "new"
      : state === "Out-of-Sync"
        ? "high"
        : state === "Pending Review"
          ? "info"
          : state === "Deploying"
            ? "recommended"
            : "draft";
  return <Badge variant={variant}>{state}</Badge>;
}

function Field({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextMetric({ label, value, tone }: { label: string; value: string; tone?: "good" | "warn" | "risk" }) {
  return (
    <div className={styles.metric}>
      <span>{label}</span>
      <strong className={tone ? styles[tone] : undefined}>{value}</strong>
    </div>
  );
}

function SourcePill({ source }: { source: string }) {
  const labelType =
    source === "platform-assignment"
      ? "app"
      : source === "label-map"
        ? "role"
        : source === "annotation"
          ? "env"
          : "loc";
  return (
    <Pill showCloseButton={false} labelType={labelType}>
      {source}
    </Pill>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  const bg = pct >= 80 ? "#0c8727" : pct >= 50 ? "#2366ed" : "#a45409";
  return (
    <div className={styles.progressBarWrap}>
      <div className={styles.progressBarFill} style={{ width: `${pct}%`, background: bg }} />
    </div>
  );
}

function buildYaml(ns: string, consumer: string, svc: string): string {
  const src = consumer.includes("frontend") ? "frontend" : "selected";
  const parts = svc.split(" ");
  const proto = parts[0] === "All" ? "TCP" : parts[0];
  const port = parts[1] && parts[1] !== "named" ? parts[1] : "443";
  return `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-ingress-${ns}
  namespace: ${ns}
  labels:
    managed-by: illumio
    illumio.io/policy-state: draft
spec:
  podSelector: {}
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: ${src}
      ports:
        - protocol: ${proto}
          port: ${port}`;
}

/* ============================================================
   Tab Content Components
   ============================================================ */

function ClustersTab({
  expandedCluster,
  setExpandedCluster,
}: {
  expandedCluster: string | null;
  setExpandedCluster: (v: string | null) => void;
}) {
  return (
    <div className={styles.contentArea}>
      <div className={styles.card} style={{ overflow: "hidden" }}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Connected Clusters</h2>
            <p>Kubernetes clusters managed through the Illumio Operator</p>
          </div>
          <Button variant="secondary-outlined" size="sm" leftIcon={<Icon name="circle-plus" size={16} />}>
            Connect Cluster
          </Button>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Cluster</th>
                <th>Cloud</th>
                <th>Region</th>
                <th>CNI</th>
                <th>Enforcement Level</th>
                <th>Operator Status</th>
                <th>Workloads</th>
              </tr>
            </thead>
            <tbody>
              {clusterRows.map((row) => {
                const isExpanded = expandedCluster === row.name;
                const rowNs = clusterNamespaces.filter((ns) => ns.cluster === row.name);
                return (
                  <React.Fragment key={row.name}>
                    <tr
                      className={isExpanded ? styles.selectedRow : undefined}
                      onClick={() => setExpandedCluster(isExpanded ? null : row.name)}
                    >
                      <td>
                        <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
                          <Icon name={isExpanded ? "chevron-down" : "chevron-right"} size={14} />
                          <strong>{row.name}</strong>
                        </div>
                      </td>
                      <td>
                        <div className={styles.cloudIcon}>
                          <Icon
                            name={
                              row.cloud === "AWS" ? "csp-aws" : row.cloud === "Azure" ? "csp-azure" : "csp-gcp"
                            }
                            size={16}
                          />
                          {row.cloud}
                        </div>
                      </td>
                      <td>{row.region}</td>
                      <td>{row.cni}</td>
                      <td>
                        <EnforcementLevelBadge level={row.enforcementLevel} />
                      </td>
                      <td>
                        <OperatorStatusBadge status={row.operatorStatus} />
                      </td>
                      <td>{row.workloadCount}</td>
                    </tr>
                    {isExpanded && (
                      <tr className={styles.expansionRow}>
                        <td colSpan={7}>
                          <div className={styles.namespaceTree}>
                            {rowNs.map((ns) => (
                              <div key={ns.namespace} className={styles.namespaceTreeItem}>
                                <Icon name="diagram-nested" size={14} />
                                <span className={styles.nsLabel}>{ns.namespace}</span>
                                <span className={styles.nsCount}>{ns.workloads} workloads</span>
                                {ns.labelStatus === "labeled" ? (
                                  <Badge variant="new">Labeled</Badge>
                                ) : (
                                  <Badge variant="draft">Unlabeled</Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LabelMapTab() {
  const precedenceSteps = [
    "Platform-defined",
    "Label-map",
    "Annotation",
    "K8s-native",
  ];

  return (
    <div className={styles.contentArea}>
      {/* Precedence rail */}
      <div className={styles.precedenceRail}>
        {precedenceSteps.map((step, i) => (
          <div key={step} className={styles.precedenceStep}>
            <span className={styles.precedenceNumber}>{i + 1}</span>
            {step}
          </div>
        ))}
      </div>

      <div className={styles.labelMapLayout}>
        {/* Section A — namespace assignments */}
        <div className={styles.card} style={{ overflow: "hidden" }}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Namespace Assignments</h2>
              <p>Platform-defined label assignments per namespace (Container Workload Profile equivalent)</p>
            </div>
            <button type="button" className={styles.actionBtn}>
              <Icon name="plus" size={14} />
              Add assignment
            </button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Namespace</th>
                  <th>Cluster</th>
                  <th>Role</th>
                  <th>App</th>
                  <th>Env</th>
                  <th>Loc</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {namespaceAssignments.map((row) => (
                  <tr key={`${row.cluster}/${row.namespace}`}>
                    <td>
                      <strong>{row.namespace}</strong>
                    </td>
                    <td>{row.cluster}</td>
                    <td>
                      <Pill showCloseButton={false} labelType="role">
                        {row.role}
                      </Pill>
                    </td>
                    <td>
                      <Pill showCloseButton={false} labelType="app">
                        {row.app}
                      </Pill>
                    </td>
                    <td>
                      <Pill showCloseButton={false} labelType="env">
                        {row.env}
                      </Pill>
                    </td>
                    <td>
                      <Pill showCloseButton={false} labelType="loc">
                        {row.loc}
                      </Pill>
                    </td>
                    <td>
                      <SourcePill source={row.source} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section B — mapping rules */}
        <div className={styles.card} style={{ overflow: "hidden" }}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>K8s-to-Illumio Mapping Rules</h2>
              <p>Translate Kubernetes label keys/values to Illumio label types without in-cluster CRDs</p>
            </div>
            <button type="button" className={styles.actionBtn}>
              <Icon name="plus" size={14} />
              Add rule
            </button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>K8s Label Key</th>
                  <th>Illumio Label Type</th>
                  <th>Value Map</th>
                  <th>Allow Create</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {labelMappingRules.map((rule) => (
                  <tr key={rule.fromKey}>
                    <td>
                      <code style={{ background: "#f0f3f6", borderRadius: 4, fontSize: 12, padding: "2px 6px" }}>
                        {rule.fromKey}
                      </code>
                    </td>
                    <td>
                      <Pill showCloseButton={false} labelType="role">
                        {rule.toKey}
                      </Pill>
                    </td>
                    <td style={{ color: "#63788f", fontSize: 12 }}>{rule.valuesMap}</td>
                    <td>
                      {rule.allowCreate ? (
                        <Icon name="circle-check" size={16} color="#0c8727" />
                      ) : (
                        <Icon name="circle-xmark" size={16} color="#63788f" />
                      )}
                    </td>
                    <td>
                      <SourcePill source={rule.source} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function InventoryTab({
  selectedWorkload,
  setSelectedWorkload,
}: {
  selectedWorkload: WorkloadRow | null;
  setSelectedWorkload: (w: WorkloadRow | null) => void;
}) {
  return (
    <div className={styles.contentArea}>
      {/* Filter bar */}
      <div className={styles.inventoryFilterBar}>
        {["K8s Namespace", "K8s Cluster", "Object Type", "K8s Label", "App label", "Env label"].map((f) => (
          <button key={f} type="button" className={styles.filterChip}>
            <Icon name="filter" size={12} />
            {f}
          </button>
        ))}
      </div>

      <div className={selectedWorkload ? styles.workspace : undefined}>
        <div className={styles.card} style={{ overflow: "hidden" }}>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Cluster / Host</th>
                  <th>Namespace / Location</th>
                  <th>App</th>
                  <th>Env</th>
                  <th>Role</th>
                  <th>Enforcement</th>
                </tr>
              </thead>
              <tbody>
                {workloadRows.map((row) => (
                  <tr
                    key={row.name}
                    className={selectedWorkload?.name === row.name ? styles.selectedRow : undefined}
                    onClick={() => setSelectedWorkload(selectedWorkload?.name === row.name ? null : row)}
                  >
                    <td>
                      <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
                        <Icon name={row.isK8s ? "container-storage" : "server"} size={14} />
                        <strong>{row.name}</strong>
                      </div>
                    </td>
                    <td style={{ color: "#63788f", fontSize: 12 }}>{row.type}</td>
                    <td>{row.cluster}</td>
                    <td>{row.namespace}</td>
                    <td>
                      {row.appLabel ? (
                        <Pill showCloseButton={false} labelType="app">
                          {row.appLabel}
                        </Pill>
                      ) : (
                        <span style={{ color: "#63788f", fontSize: 12 }}>—</span>
                      )}
                    </td>
                    <td>
                      <Pill showCloseButton={false} labelType="env">
                        {row.envLabel}
                      </Pill>
                    </td>
                    <td>
                      <Pill showCloseButton={false} labelType="role">
                        {row.roleLabel}
                      </Pill>
                    </td>
                    <td>
                      <EnforcementBadge level={row.enforcement} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedWorkload && (
          <div className={styles.detailPanel}>
            <div className={styles.detailPanelHeader}>
              <h3>{selectedWorkload.name}</h3>
              <button type="button" className={styles.closeBtn} onClick={() => setSelectedWorkload(null)}>
                <Icon name="xmark" size={14} />
                Close
              </button>
            </div>

            <div className={styles.detailSection}>
              <h4>Illumio Labels</h4>
              <div className={styles.pillRail}>
                {selectedWorkload.appLabel && (
                  <Pill showCloseButton={false} labelType="app">
                    {selectedWorkload.appLabel}
                  </Pill>
                )}
                <Pill showCloseButton={false} labelType="env">
                  {selectedWorkload.envLabel}
                </Pill>
                <Pill showCloseButton={false} labelType="role">
                  {selectedWorkload.roleLabel}
                </Pill>
              </div>
            </div>

            {selectedWorkload.isK8s && (
              <div className={styles.detailSection}>
                <h4>K8s Metadata</h4>
                <div className={styles.detailRow}>
                  <span>Type</span>
                  <span>{selectedWorkload.type}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Cluster</span>
                  <span>{selectedWorkload.cluster}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Namespace</span>
                  <span>{selectedWorkload.namespace}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Replicas</span>
                  <span>3</span>
                </div>
              </div>
            )}

            <div className={styles.detailSection}>
              <h4>Policy</h4>
              <div className={styles.detailRow}>
                <span>Enforcement</span>
                <span>{selectedWorkload.enforcement}</span>
              </div>
              <div className={styles.detailRow}>
                <span>NetworkPolicies</span>
                <span>2 active</span>
              </div>
            </div>

            <div className={styles.detailSection}>
              <h4>Traffic Summary</h4>
              <div className={styles.detailRow}>
                <span>Ingress flows</span>
                <span className={styles.good}>48 protected</span>
              </div>
              <div className={styles.detailRow}>
                <span>Egress flows</span>
                <span className={styles.good}>12 protected</span>
              </div>
              <div className={styles.detailRow}>
                <span>Exposed</span>
                <span className={styles.warn}>{selectedWorkload.enforcement === "Idle" ? "3" : "0"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MapTab({
  policyGroupBy,
  setPolicyGroupBy,
}: {
  policyGroupBy: string;
  setPolicyGroupBy: (v: string) => void;
}) {
  return (
    <div className={styles.contentArea}>
      <div className={styles.mapTabLayout}>
        <div className={styles.mapHeader}>
          <h2>Unified Workload Map</h2>
          <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
            <span className={styles.mapGroupByLabel}>Group by:</span>
            <select
              className={styles.mapGroupBySelect}
              value={policyGroupBy}
              onChange={(e) => setPolicyGroupBy(e.target.value)}
            >
              <option value="app-env">Application / Environment</option>
              <option value="ns-cluster">Namespace / Cluster</option>
            </select>
          </div>
        </div>

        <div className={styles.mapCanvas}>
          {/* Legend */}
          <div className={styles.mapLegend}>
            <span className={styles.legendTitle}>Legend</span>
            <div className={styles.legendRow}>
              <div className={`${styles.legendLine} ${styles.legendLineGreen}`} />
              <span>Protected</span>
            </div>
            <div className={styles.legendRow}>
              <div className={`${styles.legendLine} ${styles.legendLineAmber}`} />
              <span>Exposed</span>
            </div>
            <div className={styles.legendRow}>
              <div className={`${styles.legendLine} ${styles.legendLineRed}`} />
              <span>Blocked</span>
            </div>
            <div className={styles.legendRow}>
              <div className={`${styles.legendLine} ${styles.legendLineDashed}`} />
              <span>Cross-boundary</span>
            </div>
          </div>

          {/* K8s cluster boundaries */}
          <div className={styles.clusterBoundaryRow}>
            {/* Cluster 1 — prod-eks-us-east-1 */}
            <div className={styles.clusterBoundary}>
              <span className={styles.clusterBadge}>prod-eks-us-east-1</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
                <div className={styles.namespaceBoundary}>
                  <span className={styles.nsTitle}>frontend</span>
                  <div className={styles.mapNodeGrid}>
                    <div className={`${styles.mapNode} ${styles.nodeSource}`}>
                      <Icon name="container-storage" size={16} />
                      <strong>web</strong>
                      <span>Deployment</span>
                    </div>
                  </div>
                </div>
                <div className={styles.namespaceBoundary}>
                  <span className={styles.nsTitle}>backend</span>
                  <div className={styles.mapNodeGrid}>
                    <div className={`${styles.mapNode} ${styles.nodeProvider}`}>
                      <Icon name="container-storage" size={16} />
                      <strong>checkout</strong>
                      <span>Deployment</span>
                    </div>
                  </div>
                </div>
                <div className={styles.namespaceBoundary}>
                  <span className={styles.nsTitle}>payments</span>
                  <div className={styles.mapNodeGrid}>
                    <div className={styles.mapNode}>
                      <Icon name="container-storage" size={16} />
                      <strong>worker</strong>
                      <span>StatefulSet</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cluster 2 — platform-aks-westus */}
            <div className={styles.clusterBoundary}>
              <span className={styles.clusterBadge}>platform-aks-westus</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
                <div className={styles.namespaceBoundary}>
                  <span className={styles.nsTitle}>observability</span>
                  <div className={styles.mapNodeGrid}>
                    <div className={`${styles.mapNode} ${styles.nodeSource}`}>
                      <Icon name="container-storage" size={16} />
                      <strong>prometheus</strong>
                      <span>DaemonSet</span>
                    </div>
                    <div className={`${styles.mapNode} ${styles.nodeProvider}`}>
                      <Icon name="container-storage" size={16} />
                      <strong>grafana</strong>
                      <span>Deployment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* External / on-prem nodes below cluster boundaries */}
          <div className={styles.externalNodesRow}>
            <div className={`${styles.mapNode} ${styles.nodeExternal}`}>
              <Icon name="server" size={16} />
              <strong>db-primary</strong>
              <span>On-prem VM</span>
            </div>
            <div className={`${styles.mapNode} ${styles.nodeExternal}`}>
              <Icon name="cloud" size={16} />
              <strong>rds-postgres</strong>
              <span>AWS RDS</span>
            </div>
            <div className={`${styles.mapNode} ${styles.nodeExternal}`}>
              <Icon name="cloud" size={16} />
              <strong>redis-cache</strong>
              <span>AWS ElastiCache</span>
            </div>
          </div>

          {/* Flow description labels */}
          <div
            style={{
              bottom: 16,
              color: "#63788f",
              fontSize: 12,
              left: 16,
              position: "absolute",
            }}
          >
            <div style={{ alignItems: "center", display: "flex", gap: 6, marginBottom: 4 }}>
              <div style={{ background: "#0c8727", borderRadius: 2, height: 3, width: 20 }} />
              <span>frontend → backend TCP 443 (protected)</span>
            </div>
            <div style={{ alignItems: "center", display: "flex", gap: 6, marginBottom: 4 }}>
              <div style={{ borderTop: "3px dashed #2366ed", width: 20 }} />
              <span>payments → rds-postgres (cross-boundary)</span>
            </div>
            <div style={{ alignItems: "center", display: "flex", gap: 6 }}>
              <div style={{ background: "#a45409", borderRadius: 2, height: 3, width: 20 }} />
              <span>prometheus scrape (exposed)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Add Policy Modal
   ============================================================ */

type PolicyType = "org" | "app" | "k8s";

const APP_SCOPE_OPTIONS: { id: string; labelType: "app" | "env" | "loc"; label: string }[] = [
  { id: "app-online-store", labelType: "app", label: "App: online-store" },
  { id: "app-payments", labelType: "app", label: "App: payments" },
  { id: "app-platform-tools", labelType: "app", label: "App: platform-tools" },
  { id: "env-production", labelType: "env", label: "Env: production" },
  { id: "env-staging", labelType: "env", label: "Env: staging" },
  { id: "env-development", labelType: "env", label: "Env: development" },
  { id: "loc-aws-us-east-1", labelType: "loc", label: "Loc: aws-us-east-1" },
  { id: "loc-azure-westus", labelType: "loc", label: "Loc: azure-westus" },
  { id: "loc-gcp-us-central1", labelType: "loc", label: "Loc: gcp-us-central1" },
];

const K8S_CLUSTER_OPTIONS = [
  { id: "prod-eks-us-east-1", label: "prod-eks-us-east-1", cloud: "AWS" },
  { id: "platform-aks-westus", label: "platform-aks-westus", cloud: "Azure" },
  { id: "shared-gke-us-central1", label: "shared-gke-us-central1", cloud: "GCP" },
];

const K8S_NAMESPACE_OPTIONS = ["frontend", "backend", "payments", "observability", "shared-services", "ingress"];

const POLICY_TYPE_OPTIONS: {
  id: PolicyType;
  icon: string;
  title: string;
  description: string;
}[] = [
  {
    id: "org",
    icon: "shield",
    title: "Organizational Policy",
    description: "Enforce baseline rules across all workloads. Scope is always All.",
  },
  {
    id: "app",
    icon: "firewall",
    title: "Application Policy",
    description: "Segment by App, Environment, and Location labels. Controls intra- and cross-group traffic.",
  },
  {
    id: "k8s",
    icon: "container-storage",
    title: "Kubernetes Policy",
    description: "Namespace-scoped rules for K8s clusters. Supports multi-cluster and multi-namespace selection.",
  },
];

function AddPolicyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [policyType, setPolicyType] = useState<PolicyType>("org");
  const [policyName, setPolicyName] = useState("");
  const [policyDescription, setPolicyDescription] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedClusters, setSelectedClusters] = useState<string[]>([]);
  const [selectedNamespaces, setSelectedNamespaces] = useState<string[]>([]);

  const allClustersSelected = selectedClusters.length === K8S_CLUSTER_OPTIONS.length;
  const allNamespacesSelected = selectedNamespaces.length === K8S_NAMESPACE_OPTIONS.length;
  const showGuardrailWarning = policyType === "k8s" && allClustersSelected && allNamespacesSelected;

  function toggleLabel(id: string) {
    setSelectedLabels((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function toggleCluster(id: string) {
    setSelectedClusters((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function toggleNamespace(ns: string) {
    setSelectedNamespaces((prev) => (prev.includes(ns) ? prev.filter((x) => x !== ns) : [...prev, ns]));
  }

  function handleClose() {
    setPolicyType("org");
    setPolicyName("");
    setPolicyDescription("");
    setSelectedLabels([]);
    setSelectedClusters([]);
    setSelectedNamespaces([]);
    onClose();
  }

  const canSave = policyName.trim().length > 0;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="large">
      <ModalHeader title="Add Policy" />
      <ModalBody>
        <div style={{ display: "grid", gap: 20 }}>
          {/* Policy Type */}
          <div className={styles.modalSection}>
            <div className={styles.modalLabel}>Policy Type</div>
            <div style={{ display: "grid", gap: 10 }}>
              {POLICY_TYPE_OPTIONS.map((opt) => (
                <div
                  key={opt.id}
                  role="radio"
                  aria-checked={policyType === opt.id}
                  tabIndex={0}
                  className={`${styles.optionCard} ${policyType === opt.id ? styles.optionCardSelected : ""}`}
                  onClick={() => setPolicyType(opt.id)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setPolicyType(opt.id); }}
                >
                  <div className={styles.optionCardIcon}>
                    <Icon name={opt.icon as Parameters<typeof Icon>[0]["name"]} size={20} />
                  </div>
                  <div className={styles.optionCardBody}>
                    <div className={styles.optionCardTitle}>{opt.title}</div>
                    <div className={styles.optionCardDesc}>{opt.description}</div>
                  </div>
                  <div className={`${styles.optionRadio} ${policyType === opt.id ? styles.optionRadioSelected : ""}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Policy Name */}
          <div className={styles.modalSection}>
            <label className={styles.modalLabel} htmlFor="policy-name">
              Policy Name<span className={styles.modalRequired}>*</span>
            </label>
            <input
              id="policy-name"
              className={styles.modalInput}
              placeholder="Enter policy name"
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
            />
          </div>

          {/* Policy Description */}
          <div className={styles.modalSection}>
            <label className={styles.modalLabel} htmlFor="policy-desc">
              Policy Description
            </label>
            <textarea
              id="policy-desc"
              className={styles.modalTextarea}
              placeholder="Enter description"
              value={policyDescription}
              onChange={(e) => setPolicyDescription(e.target.value)}
            />
          </div>

          {/* Policy Scope — adapts per type */}
          <div className={styles.modalSection}>
            <div className={styles.modalLabel}>Policy Scope</div>

            {policyType === "org" && (
              <>
                <div>
                  <span className={styles.readOnlyScopeChip}>
                    <Icon name="circle-information" size={14} />
                    All
                  </span>
                </div>
                <div className={styles.scopeHelperText}>
                  Organizational policies always apply to all workloads.
                </div>
              </>
            )}

            {policyType === "app" && (
              <>
                <div className={styles.scopeChipGrid}>
                  {APP_SCOPE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`${styles.scopeChip} ${selectedLabels.includes(opt.id) ? styles.scopeChipActive : ""}`}
                      onClick={() => toggleLabel(opt.id)}
                    >
                      <Pill
                        showCloseButton={false}
                        labelType={opt.labelType}
                      >
                        {opt.label}
                      </Pill>
                    </button>
                  ))}
                </div>
                <div className={styles.scopeHelperText}>
                  Scope determines which workloads this policy&apos;s rules are applied to.
                </div>
              </>
            )}

            {policyType === "k8s" && (
              <>
                <div className={styles.scopeSubLabel}>Clusters</div>
                <div className={styles.scopeChipGrid}>
                  {K8S_CLUSTER_OPTIONS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`${styles.scopeChip} ${selectedClusters.includes(c.id) ? styles.scopeChipActive : ""}`}
                      onClick={() => toggleCluster(c.id)}
                    >
                      {c.label}
                      <span style={{ color: "#94a3b8", fontWeight: 400 }}>({c.cloud})</span>
                    </button>
                  ))}
                </div>
                <div className={styles.scopeSubLabel}>Namespaces</div>
                <div className={styles.scopeChipGrid}>
                  {K8S_NAMESPACE_OPTIONS.map((ns) => (
                    <button
                      key={ns}
                      type="button"
                      className={`${styles.scopeChip} ${selectedNamespaces.includes(ns) ? styles.scopeChipActive : ""}`}
                      onClick={() => toggleNamespace(ns)}
                    >
                      {ns}
                    </button>
                  ))}
                </div>
                {showGuardrailWarning && (
                  <div className={styles.guardrailBanner}>
                    <Icon name="square-exclamation" size={18} />
                    <span>
                      This policy will apply to every workload across all clusters. Review rules carefully before provisioning.
                    </span>
                  </div>
                )}
                <div className={styles.scopeHelperText}>
                  Select one or more clusters and namespaces. Leave namespaces unselected to apply to all namespaces in the selected clusters.
                </div>
              </>
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary-outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" disabled={!canSave} onClick={handleClose}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

/* ============================================================
   Add Rule Drawer Types
   ============================================================ */

type TrafficDirection = "intra" | "extra";
type SourceMode = "namespace" | "podlabel" | "allpods" | "cidr";
type DestMode = "namespace" | "podlabel" | "allpods";

const NS_OPTIONS = ["frontend", "backend", "payments", "observability", "shared-services", "ingress"];

const NS_POD_COUNTS: Record<string, number> = {
  frontend: 3, backend: 2, payments: 4,
  observability: 6, "shared-services": 8, ingress: 2,
};

const QUICK_PORTS: { label: string; protocol: string; port: string }[] = [
  { label: "HTTPS 443", protocol: "TCP", port: "443" },
  { label: "HTTP 80", protocol: "TCP", port: "80" },
  { label: "MySQL 3306", protocol: "TCP", port: "3306" },
  { label: "DNS 53", protocol: "UDP", port: "53" },
  { label: "gRPC 50051", protocol: "TCP", port: "50051" },
];

function buildRuleYaml({
  direction,
  sourceMode,
  selectedSourceNs,
  sourcePodLabels,
  sourceCidr,
  destMode,
  selectedDestNs,
  destPodLabels,
  protocol,
  port,
  allPorts,
}: {
  direction: TrafficDirection;
  sourceMode: SourceMode;
  selectedSourceNs: string[];
  sourcePodLabels: { key: string; value: string }[];
  sourceCidr: string;
  destMode: DestMode;
  selectedDestNs: string[];
  destPodLabels: { key: string; value: string }[];
  protocol: string;
  port: string;
  allPorts: boolean;
}): string {
  const lines: string[] = [];
  lines.push(`# Allow Rule — ${direction === "intra" ? "Same Namespace" : "Cross-Namespace"}`);
  lines.push("podSelector:");
  if (destMode === "podlabel" && destPodLabels.some((l) => l.key)) {
    lines.push("  matchLabels:");
    destPodLabels.filter((l) => l.key).forEach((l) => lines.push(`    ${l.key}: "${l.value}"`));
  } else {
    lines.push("  matchLabels: {}");
  }
  lines.push("ingress:");
  lines.push("  - from:");

  if (sourceMode === "namespace" && selectedSourceNs.length > 0) {
    selectedSourceNs.forEach((ns) => {
      lines.push("    - namespaceSelector:");
      lines.push("        matchLabels:");
      lines.push(`          kubernetes.io/metadata.name: ${ns}`);
    });
  } else if (sourceMode === "podlabel" && sourcePodLabels.some((l) => l.key)) {
    lines.push("    - podSelector:");
    lines.push("        matchLabels:");
    sourcePodLabels.filter((l) => l.key).forEach((l) => lines.push(`          ${l.key}: "${l.value}"`));
  } else if (sourceMode === "allpods") {
    lines.push("    - podSelector: {}");
  } else if (sourceMode === "cidr" && sourceCidr) {
    lines.push("    - ipBlock:");
    lines.push(`        cidr: ${sourceCidr}`);
  } else {
    lines.push("    - podSelector: {}");
  }

  if (!allPorts && port) {
    lines.push("    ports:");
    lines.push(`      - protocol: ${protocol}`);
    lines.push(`        port: ${port}`);
  } else if (!allPorts) {
    lines.push("    ports: []  # specify a port above");
  }

  return lines.join("\n");
}

/* ============================================================
   AddRuleDrawer Component
   ============================================================ */

function AddRuleDrawer({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (ruleName: string) => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<TrafficDirection>("intra");
  const [sourceMode, setSourceMode] = useState<SourceMode>("namespace");
  const [selectedSourceNs, setSelectedSourceNs] = useState<string[]>([]);
  const [sourcePodLabels, setSourcePodLabels] = useState<{ key: string; value: string }[]>([{ key: "", value: "" }]);
  const [sourceCidr, setSourceCidr] = useState("");
  const [destMode, setDestMode] = useState<DestMode>("namespace");
  const [selectedDestNs, setSelectedDestNs] = useState<string[]>([]);
  const [destPodLabels, setDestPodLabels] = useState<{ key: string; value: string }[]>([{ key: "", value: "" }]);
  const [protocol, setProtocol] = useState("TCP");
  const [port, setPort] = useState("");
  const [allPorts, setAllPorts] = useState(false);

  const hasSource =
    (sourceMode === "namespace" && selectedSourceNs.length > 0) ||
    (sourceMode === "podlabel" && sourcePodLabels.some((l) => l.key)) ||
    sourceMode === "allpods" ||
    (sourceMode === "cidr" && sourceCidr.length > 0);

  const hasDest =
    (destMode === "namespace" && selectedDestNs.length > 0) ||
    (destMode === "podlabel" && destPodLabels.some((l) => l.key)) ||
    destMode === "allpods";

  const canAdd = hasSource && hasDest;

  const previewFilled = hasSource && hasDest;

  const yaml = useMemo(
    () =>
      buildRuleYaml({
        direction,
        sourceMode,
        selectedSourceNs,
        sourcePodLabels,
        sourceCidr,
        destMode,
        selectedDestNs,
        destPodLabels,
        protocol,
        port,
        allPorts,
      }),
    [direction, sourceMode, selectedSourceNs, sourcePodLabels, sourceCidr, destMode, selectedDestNs, destPodLabels, protocol, port, allPorts],
  );

  function reset() {
    setStep(1);
    setDirection("intra");
    setSourceMode("namespace");
    setSelectedSourceNs([]);
    setSourcePodLabels([{ key: "", value: "" }]);
    setSourceCidr("");
    setDestMode("namespace");
    setSelectedDestNs([]);
    setDestPodLabels([{ key: "", value: "" }]);
    setProtocol("TCP");
    setPort("");
    setAllPorts(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleAdd() {
    const srcPart = sourceMode === "namespace" ? selectedSourceNs[0] ?? "source" : sourceMode;
    const dstPart = destMode === "namespace" ? selectedDestNs[0] ?? "dest" : destMode;
    const portPart = allPorts ? "all" : port || "any";
    onAdd(`${srcPart}-to-${dstPart}-${protocol.toLowerCase()}${portPart}`);
    reset();
    onClose();
  }

  function toggleSourceNs(ns: string) {
    setSelectedSourceNs((prev) => (prev.includes(ns) ? prev.filter((x) => x !== ns) : [...prev, ns]));
  }

  function toggleDestNs(ns: string) {
    setSelectedDestNs((prev) => (prev.includes(ns) ? prev.filter((x) => x !== ns) : [...prev, ns]));
  }

  function updateSourceLabel(index: number, field: "key" | "value", val: string) {
    setSourcePodLabels((prev) => prev.map((l, i) => (i === index ? { ...l, [field]: val } : l)));
  }

  function updateDestLabel(index: number, field: "key" | "value", val: string) {
    setDestPodLabels((prev) => prev.map((l, i) => (i === index ? { ...l, [field]: val } : l)));
  }

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.drawerBackdrop} onClick={handleClose} />
      <aside className={`${styles.drawer} ${step === 2 ? styles.drawerExpanded : ""}`} aria-label="Add Allow Rule" style={{ transition: "width 300ms ease" }}>
        {/* Header */}
        <div className={styles.drawerHeader}>
          <div>
            <h2 style={{ margin: 0 }}>Add Allow Rule</h2>
            <div className={styles.stepperBar}>
              <div className={`${styles.stepperDot} ${step >= 1 ? styles.stepperDotDone : ""}`}>✓</div>
              <span className={`${styles.stepperLabel} ${step === 1 ? styles.stepperLabelActive : ""}`}>Rule Definition</span>
              <div className={styles.stepperConnector} />
              <div className={`${styles.stepperDot} ${step === 2 ? styles.stepperDotActive : ""}`}>2</div>
              <span className={`${styles.stepperLabel} ${step === 2 ? styles.stepperLabelActive : ""}`}>Review Impact</span>
            </div>
          </div>
          <button type="button" className={styles.drawerClose} onClick={handleClose} aria-label="Close">
            <Icon name="xmark" size={18} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.drawerBody} style={step === 2 ? { padding: 0 } : undefined}>
          {step === 1 && (
            <>
              {/* Traffic Direction */}
              <div className={styles.drawerSection}>
                <div className={styles.drawerSectionLabel}>Traffic Direction</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {([
                    { id: "intra" as TrafficDirection, icon: "shield" as const, title: "Same Namespace", desc: "Traffic between pods within the same namespace boundary." },
                    { id: "extra" as TrafficDirection, icon: "firewall" as const, title: "Cross-Namespace", desc: "Traffic from a pod in one namespace to a pod in a different namespace." },
                  ] as const).map((opt) => (
                    <div
                      key={opt.id}
                      role="radio"
                      aria-checked={direction === opt.id}
                      tabIndex={0}
                      className={`${styles.optionCard} ${direction === opt.id ? styles.optionCardSelected : ""}`}
                      onClick={() => setDirection(opt.id)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setDirection(opt.id); }}
                    >
                      <div className={styles.optionCardIcon}>
                        <Icon name={opt.icon} size={18} />
                      </div>
                      <div className={styles.optionCardBody}>
                        <div className={styles.optionCardTitle}>{opt.title}</div>
                        <div className={styles.optionCardDesc}>{opt.desc}</div>
                      </div>
                      <div className={`${styles.optionRadio} ${direction === opt.id ? styles.optionRadioSelected : ""}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Source */}
              <div className={styles.drawerSection}>
                <div className={styles.drawerSectionLabel}>Source</div>
                <div className={styles.selectorTypeTabs}>
                  {(["namespace", "podlabel", "allpods", ...(direction === "extra" ? ["cidr"] : [])] as SourceMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      className={`${styles.selectorTypeTab} ${sourceMode === mode ? styles.selectorTypeTabActive : ""}`}
                      onClick={() => setSourceMode(mode)}
                    >
                      {mode === "namespace" ? "Namespace" : mode === "podlabel" ? "Pod Label" : mode === "allpods" ? "All Pods" : "External IP"}
                    </button>
                  ))}
                </div>

                {sourceMode === "namespace" && (
                  <div className={styles.scopeChipGrid}>
                    {NS_OPTIONS.map((ns) => (
                      <button
                        key={ns}
                        type="button"
                        className={`${styles.scopeChip} ${selectedSourceNs.includes(ns) ? styles.scopeChipActive : ""}`}
                        onClick={() => toggleSourceNs(ns)}
                      >
                        {ns}
                      </button>
                    ))}
                  </div>
                )}

                {sourceMode === "podlabel" && (
                  <div style={{ display: "grid", gap: 8 }}>
                    {sourcePodLabels.map((lbl, i) => (
                      <div key={i} className={styles.podLabelRow}>
                        <input
                          className={styles.podLabelInput}
                          placeholder="key"
                          value={lbl.key}
                          onChange={(e) => updateSourceLabel(i, "key", e.target.value)}
                        />
                        <span className={styles.podLabelEquals}>=</span>
                        <input
                          className={styles.podLabelInput}
                          placeholder="value"
                          value={lbl.value}
                          onChange={(e) => updateSourceLabel(i, "value", e.target.value)}
                        />
                        <button
                          type="button"
                          className={styles.podLabelRemove}
                          onClick={() => setSourcePodLabels((prev) => prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev)}
                          aria-label="Remove selector"
                        >
                          <Icon name="xmark" size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className={styles.addSelectorBtn}
                      onClick={() => setSourcePodLabels((prev) => [...prev, { key: "", value: "" }])}
                    >
                      <Icon name="circle-plus" size={14} />
                      Add selector
                    </button>
                  </div>
                )}

                {sourceMode === "allpods" && (
                  <span className={styles.readOnlyScopeChip}>All Pods</span>
                )}

                {sourceMode === "cidr" && (
                  <div>
                    <span className={styles.fieldLabel}>CIDR</span>
                    <input
                      className={styles.cidrInput}
                      placeholder="e.g. 10.32.0.0/16 or 0.0.0.0/0"
                      value={sourceCidr}
                      onChange={(e) => setSourceCidr(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Direction Arrow */}
              <div className={styles.directionArrow}>→</div>

              {/* Destination */}
              <div className={styles.drawerSection}>
                <div className={styles.drawerSectionLabel}>Destination</div>
                <div className={styles.selectorTypeTabs}>
                  {(["namespace", "podlabel", "allpods"] as DestMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      className={`${styles.selectorTypeTab} ${destMode === mode ? styles.selectorTypeTabActive : ""}`}
                      onClick={() => setDestMode(mode)}
                    >
                      {mode === "namespace" ? "Namespace" : mode === "podlabel" ? "Pod Label" : "All Pods"}
                    </button>
                  ))}
                </div>

                {destMode === "namespace" && (
                  <div className={styles.scopeChipGrid}>
                    {NS_OPTIONS.map((ns) => (
                      <button
                        key={ns}
                        type="button"
                        className={`${styles.scopeChip} ${selectedDestNs.includes(ns) ? styles.scopeChipActive : ""}`}
                        onClick={() => toggleDestNs(ns)}
                      >
                        {ns}
                      </button>
                    ))}
                  </div>
                )}

                {destMode === "podlabel" && (
                  <div style={{ display: "grid", gap: 8 }}>
                    {destPodLabels.map((lbl, i) => (
                      <div key={i} className={styles.podLabelRow}>
                        <input
                          className={styles.podLabelInput}
                          placeholder="key"
                          value={lbl.key}
                          onChange={(e) => updateDestLabel(i, "key", e.target.value)}
                        />
                        <span className={styles.podLabelEquals}>=</span>
                        <input
                          className={styles.podLabelInput}
                          placeholder="value"
                          value={lbl.value}
                          onChange={(e) => updateDestLabel(i, "value", e.target.value)}
                        />
                        <button
                          type="button"
                          className={styles.podLabelRemove}
                          onClick={() => setDestPodLabels((prev) => prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev)}
                          aria-label="Remove selector"
                        >
                          <Icon name="xmark" size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className={styles.addSelectorBtn}
                      onClick={() => setDestPodLabels((prev) => [...prev, { key: "", value: "" }])}
                    >
                      <Icon name="circle-plus" size={14} />
                      Add selector
                    </button>
                  </div>
                )}

                {destMode === "allpods" && (
                  <span className={styles.readOnlyScopeChip}>All Pods</span>
                )}
              </div>

              {/* Port / Protocol */}
              <div className={styles.drawerSection}>
                <div className={styles.drawerSectionLabel}>Port / Protocol</div>
                <div className={styles.portRow}>
                  <div>
                    <span className={styles.fieldLabel}>Protocol</span>
                    <select
                      className={styles.portSelect}
                      value={protocol}
                      onChange={(e) => setProtocol(e.target.value)}
                      disabled={allPorts}
                    >
                      <option>TCP</option>
                      <option>UDP</option>
                      <option>SCTP</option>
                    </select>
                  </div>
                  <div>
                    <span className={styles.fieldLabel}>Port</span>
                    <input
                      className={styles.portInput}
                      placeholder="e.g. 443 or 8080-8090"
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                      disabled={allPorts}
                    />
                  </div>
                </div>
                <div className={styles.allPortsRow}>
                  <input
                    type="checkbox"
                    id="allPorts"
                    checked={allPorts}
                    onChange={(e) => setAllPorts(e.target.checked)}
                  />
                  <label htmlFor="allPorts">All Ports</label>
                </div>
                <div className={styles.quickPortChips}>
                  {QUICK_PORTS.map((qp) => (
                    <button
                      key={qp.label}
                      type="button"
                      className={styles.quickPortChip}
                      onClick={() => { setProtocol(qp.protocol); setPort(qp.port); setAllPorts(false); }}
                    >
                      {qp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rule Preview */}
              <div className={styles.drawerSection}>
                <div className={styles.rulePreviewHeader}>
                  <div className={styles.drawerSectionLabel}>Rule Preview</div>
                  {previewFilled && (
                    <Button
                      variant="secondary-outlined"
                      size="sm"
                      leftIcon={<Icon name="file-copy" size={14} />}
                      onClick={() => navigator.clipboard.writeText(yaml)}
                    >
                      Copy
                    </Button>
                  )}
                </div>
                {previewFilled ? (
                  <pre className={styles.rulePreviewBlock}>{yaml}</pre>
                ) : (
                  <div className={styles.rulePreviewEmpty}>
                    Select Traffic Direction, Source, and Destination to preview the generated NetworkPolicy YAML.
                  </div>
                )}
              </div>
            </>
          )}
          {step === 2 && (() => {
            // Compute impact data
            const sourceNs = sourceMode === "namespace" ? selectedSourceNs : sourceMode === "allpods" ? ["(all pods)"] : sourceMode === "cidr" ? [sourceCidr || "external"] : ["pod label"];
            const destNs = destMode === "namespace" ? selectedDestNs : destMode === "allpods" ? ["(all pods)"] : ["pod label"];
            const sourcePodCount = sourceMode === "namespace" ? selectedSourceNs.reduce((s, ns) => s + (NS_POD_COUNTS[ns] ?? 1), 0) : sourceMode === "allpods" ? 28 : 1;
            const destPodCount = destMode === "namespace" ? selectedDestNs.reduce((s, ns) => s + (NS_POD_COUNTS[ns] ?? 1), 0) : destMode === "allpods" ? 28 : 1;
            const totalPods = sourcePodCount + destPodCount;
            const portLabel = allPorts ? "All Ports" : port ? `${protocol} ${port}` : "Any Port";
            const directionLabel = direction === "intra" ? "Same Namespace" : "Cross-Namespace";
            const shortYaml = yaml.split("\n").slice(0, 8).join("\n") + "\n...";
            return (
              <>
                <div className={styles.impactLayout}>
                  {/* Rule Summary */}
                  <div className={styles.ruleSummaryPanel}>
                    <div className={styles.ruleSummarySection}>
                      <div className={styles.ruleSummaryLabel}>Direction</div>
                      <div className={styles.ruleSummaryValue}>{directionLabel}</div>
                    </div>
                    <div className={styles.ruleSummarySection}>
                      <div className={styles.ruleSummaryLabel}>Source</div>
                      <div className={styles.ruleSummaryValue}>{sourceNs.join(", ") || "—"}</div>
                      <div className={styles.ruleSummaryValueMuted}>{sourcePodCount} pods</div>
                    </div>
                    <div className={styles.ruleSummarySection}>
                      <div className={styles.ruleSummaryLabel}>Destination</div>
                      <div className={styles.ruleSummaryValue}>{destNs.join(", ") || "—"}</div>
                      <div className={styles.ruleSummaryValueMuted}>{destPodCount} pods</div>
                    </div>
                    <div className={styles.ruleSummarySection}>
                      <div className={styles.ruleSummaryLabel}>Port / Protocol</div>
                      <div className={styles.ruleSummaryValue}>{portLabel}</div>
                    </div>
                    <div className={styles.ruleSummarySection}>
                      <div className={styles.ruleSummaryLabel}>Rule Preview</div>
                      <pre className={styles.ruleSummaryYaml}>{shortYaml}</pre>
                    </div>
                  </div>

                  {/* Map area */}
                  <div className={styles.mapArea}>
                    <div className={styles.mapGrid}>
                      {/* BEFORE */}
                      <div className={`${styles.mapPanel} ${styles.mapPanelBefore}`}>
                        <div className={styles.mapPanelLabel}>Before</div>
                        <div className={styles.clusterBoundary}>
                          <span className={styles.clusterNameLabel}>prod-eks-us-east-1</span>
                          {sourceNs.slice(0, 2).map((ns, i) => (
                            <div key={ns} style={i > 0 ? { marginTop: 4 } : undefined} className={styles.nsBox}>
                              <div className={styles.nsBoxName}>{ns}</div>
                              <div className={styles.nsBoxPodCount}>{NS_POD_COUNTS[ns] ?? sourcePodCount} pods</div>
                            </div>
                          ))}
                          <div className={styles.mapConnector}>
                            <div className={`${styles.mapConnectorLine} ${styles.mapConnectorLineBefore}`} style={{ flex: "0 0 16px" }} />
                            <div className={`${styles.mapConnectorBadge} ${styles.mapConnectorBadgeBefore}`}>✕ BLOCKED</div>
                            <div className={`${styles.mapConnectorLine} ${styles.mapConnectorLineBefore}`} style={{ flex: "0 0 16px" }} />
                          </div>
                          {destNs.slice(0, 2).map((ns) => (
                            <div key={ns} className={styles.nsBox}>
                              <div className={styles.nsBoxName}>{ns}</div>
                              <div className={styles.nsBoxPodCount}>{NS_POD_COUNTS[ns] ?? destPodCount} pods</div>
                            </div>
                          ))}
                        </div>
                        <div className={`${styles.mapPanelFootNote} ${styles.mapPanelFootNoteBefore}`}>No policy · traffic blocked</div>
                      </div>

                      {/* AFTER */}
                      <div className={`${styles.mapPanel} ${styles.mapPanelAfter}`}>
                        <div className={styles.mapPanelLabel}>After</div>
                        <div className={styles.clusterBoundary}>
                          <span className={styles.clusterNameLabel}>prod-eks-us-east-1</span>
                          {sourceNs.slice(0, 2).map((ns, i) => (
                            <div key={ns} style={i > 0 ? { marginTop: 4 } : undefined} className={styles.nsBox}>
                              <div className={styles.nsBoxName}>{ns}</div>
                              <div className={styles.nsBoxPodCount}>{NS_POD_COUNTS[ns] ?? sourcePodCount} pods</div>
                            </div>
                          ))}
                          <div className={styles.mapConnector}>
                            <div className={`${styles.mapConnectorLine} ${styles.mapConnectorLineAfter}`} style={{ flex: "0 0 14px" }} />
                            <div className={`${styles.mapConnectorBadge} ${styles.mapConnectorBadgeAfter}`}>{portLabel}</div>
                            <div className={styles.mapConnectorArrow}>▼</div>
                          </div>
                          {destNs.slice(0, 2).map((ns) => (
                            <div key={ns} className={styles.nsBox}>
                              <div className={styles.nsBoxName}>{ns}</div>
                              <div className={styles.nsBoxPodCount}>{NS_POD_COUNTS[ns] ?? destPodCount} pods</div>
                            </div>
                          ))}
                        </div>
                        <div className={`${styles.mapPanelFootNote} ${styles.mapPanelFootNoteAfter}`}>1 NetworkPolicy · traffic allowed</div>
                      </div>
                    </div>

                    {/* Stats bar */}
                    <div className={styles.impactStatsBar}>
                      <div className={styles.impactStat}>
                        <div className={`${styles.impactStatValue} ${styles.impactStatValueGreen}`}>{totalPods}</div>
                        <div className={styles.impactStatLabel}>Pods Matched</div>
                      </div>
                      <div className={styles.impactStat}>
                        <div className={`${styles.impactStatValue} ${styles.impactStatValueGreen}`}>1</div>
                        <div className={styles.impactStatLabel}>NetworkPolicy Created</div>
                      </div>
                      <div className={styles.impactStat}>
                        <div className={styles.impactStatValue}>0</div>
                        <div className={styles.impactStatLabel}>Conflicts Found</div>
                      </div>
                      <div className={styles.impactStat}>
                        <div className={`${styles.impactStatValue} ${styles.impactStatValueAmber}`}>Draft</div>
                        <div className={styles.impactStatLabel}>Provision Status</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>

        {/* Footer */}
        <div className={styles.drawerFooter}>
          {step === 1 ? (
            <>
              <Button variant="secondary-outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" disabled={!canAdd} onClick={() => setStep(2)}>
                Review Impact →
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary-outlined" onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Button variant="secondary-outlined" onClick={handleClose}>
                Discard
              </Button>
              <Button variant="primary" onClick={handleAdd}>
                Add Rule
              </Button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

function PoliciesTab() {
  const [activePolicyTab, setActivePolicyTab] = useState("Author");
  const [consumer, setConsumer] = useState(consumers[0]);
  const [provider, setProvider] = useState(providers[0]);
  const [service, setService] = useState(services[0]);
  const [useCase, setUseCase] = useState("Same-cluster namespace isolation");
  const [selectedPolicy, setSelectedPolicy] = useState(k8sPolicies[0].name);
  const [addPolicyOpen, setAddPolicyOpen] = useState(false);
  const [addRuleOpen, setAddRuleOpen] = useState(false);

  const yaml = useMemo(() => buildYaml("backend", consumer, service), [consumer, service]);
  const isGuardrail = useCase === "Cluster-wide guardrail";

  const useCases = [
    "Same-cluster namespace isolation",
    "Cross-cluster service access",
    "K8s to cloud resource",
    "K8s to Illumio-labeled workload",
    "Cluster-wide guardrail",
  ];

  return (
    <div className={styles.contentArea}>
      <AddRuleDrawer isOpen={addRuleOpen} onClose={() => setAddRuleOpen(false)} onAdd={(name) => console.log("Rule added:", name)} />
      <AddPolicyModal isOpen={addPolicyOpen} onClose={() => setAddPolicyOpen(false)} />

      {/* Policy list */}
      <div className={styles.card} style={{ marginBottom: 16, overflow: "hidden" }}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Policies</h2>
            <p>Kubernetes NetworkPolicies managed by Illumio</p>
          </div>
          <div className={styles.filterRail}>
            <button type="button">Cluster: all</button>
            <button type="button">Namespace: all</button>
            <button type="button">Drift: all</button>
            <Button
              variant="secondary-outlined"
              size="sm"
              leftIcon={<Icon name="circle-plus" size={16} />}
              onClick={() => setAddRuleOpen(true)}
            >
              Add Rule
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Icon name="circle-plus" size={16} />}
              onClick={() => setAddPolicyOpen(true)}
            >
              Add Policy
            </Button>
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Policy</th>
                <th>Cluster</th>
                <th>Namespace</th>
                <th>CNI</th>
                <th>Delivery</th>
                <th>Drift</th>
                <th>State</th>
                <th>Guardrail Conflict</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {k8sPolicies.map((p) => (
                <tr
                  key={p.name}
                  className={selectedPolicy === p.name ? styles.selectedRow : undefined}
                  onClick={() => setSelectedPolicy(p.name)}
                >
                  <td>
                    <strong>{p.name}</strong>
                  </td>
                  <td>{p.cluster}</td>
                  <td>{p.namespace}</td>
                  <td>{p.cni}</td>
                  <td>{p.delivery}</td>
                  <td>
                    <span className={p.drift === "Detected" ? styles.riskText : styles.subtleText}>{p.drift}</span>
                  </td>
                  <td>
                    <PolicyStateBadge state={p.state} />
                  </td>
                  <td>
                    {p.guardrailConflict ? (
                      <span className={styles.guardrailBadge}>
                        <Icon name="triangle-exclamation" size={12} />
                        &nbsp;Conflict
                      </span>
                    ) : (
                      <span className={styles.subtleText}>—</span>
                    )}
                  </td>
                  <td>
                    {p.attribution === "Illumio-managed" ? (
                      <Badge variant="new">Illumio-managed</Badge>
                    ) : (
                      <Badge variant="draft">External</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Policy sub-tabs */}
      <div className={styles.authoringPanel}>
        <div className={styles.tabs} role="tablist" aria-label="Policy workspace tabs">
          {["Author", "Impact", "YAML", "Lifecycle", "Advisor", "Posture"].map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activePolicyTab === tab}
              className={activePolicyTab === tab ? styles.activeTab : undefined}
              onClick={() => setActivePolicyTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {/* ---- Author ---- */}
          {activePolicyTab === "Author" && (
            <div className={styles.authorGrid}>
              <section className={styles.formSection}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Use Case</h2>
                    <p>Select the segmentation scenario to author</p>
                  </div>
                  <Badge variant="info-light">Step 1</Badge>
                </div>
                <div className={styles.useCaseField}>
                  <label className={styles.fieldLabel} htmlFor="useCase">
                    Scenario
                  </label>
                  <select
                    id="useCase"
                    className={styles.useCaseSelect}
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                  >
                    {useCases.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
                {isGuardrail && (
                  <div className={styles.calloutRisk}>
                    <Icon name="triangle-exclamation" size={18} />
                    <span>
                      <strong>Guardrail pre-flight check:</strong> A cluster-wide guardrail rule may conflict with
                      existing policies in platform-aks-westus (observability namespace). Review the conflict before
                      deploying.
                    </span>
                  </div>
                )}
              </section>

              <section className={styles.formSection}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Scope</h2>
                    <p>Cluster and namespace targeting</p>
                  </div>
                  <Badge variant="info-light">Step 2</Badge>
                </div>
                <div className={styles.formGrid}>
                  <Field
                    label="Cluster"
                    value="prod-eks-us-east-1"
                    onChange={() => {}}
                    options={clusterRows.map((c) => c.name)}
                  />
                  <Field
                    label="Namespace"
                    value="backend"
                    onChange={() => {}}
                    options={["frontend", "backend", "payments", "observability"]}
                  />
                  <Field
                    label="Direction"
                    value="Ingress"
                    onChange={() => {}}
                    options={["Ingress", "Egress", "Both"]}
                  />
                  <label className={styles.field}>
                    <span>Workload refinement</span>
                    <input value="service: checkout-api" readOnly />
                  </label>
                </div>
                <div className={styles.pillRail}>
                  <Pill showCloseButton={false} labelType="loc">
                    cluster context retained
                  </Pill>
                  <Pill showCloseButton={false} labelType="app">
                    label source: k8s-native
                  </Pill>
                  <Pill showCloseButton={false} labelType="role">
                    owner: platform-assignment
                  </Pill>
                </div>
              </section>

              <section className={styles.formSection}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Rule</h2>
                    <p>Consumer, provider, services (K8s and Illumio constructs)</p>
                  </div>
                  <Badge variant="draft">Draft</Badge>
                </div>
                <div className={styles.ruleBuilder}>
                  <Field label="Consumer" value={consumer} onChange={setConsumer} options={consumers} />
                  <div className={styles.directionCell}>
                    <span>Ingress</span>
                    <Icon name="arrow-right" size={18} />
                  </div>
                  <Field label="Provider" value={provider} onChange={setProvider} options={providers} />
                  <Field label="Service" value={service} onChange={setService} options={services} />
                </div>
                <div className={styles.callout}>
                  <Icon name="circle-information" size={18} />
                  <span>
                    CNI compatibility: <strong>AWS VPC CNI — Native Kubernetes NetworkPolicy</strong>. All selectors are
                    supported natively without Illumio extensions.
                  </span>
                </div>
              </section>

              <section className={styles.summaryBand}>
                <div>
                  <span>Rule summary</span>
                  <strong>
                    Allow {consumer} to reach {provider} on {service} (prod-eks-us-east-1 / backend).
                  </strong>
                </div>
                <button type="button">
                  Show Impact
                  <Icon name="arrow-right" size={16} />
                </button>
              </section>
            </div>
          )}

          {/* ---- Impact ---- */}
          {activePolicyTab === "Impact" && (
            <div className={styles.impactGrid}>
              <section className={`${styles.formSection} ${styles.mapPanelInner}`}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Impact preview</h2>
                    <p>Before/after observed traffic</p>
                  </div>
                  <Badge variant="preview">Preview</Badge>
                </div>
                <div className={styles.mapCanvasSmall}>
                  <div className={`${styles.mapNodeSmall} ${styles.nodeSource}`}>
                    <Icon name="container-storage" size={20} />
                    <strong>frontend</strong>
                    <span>namespace</span>
                  </div>
                  <div className={styles.flowLine}>
                    <span>TCP 443</span>
                  </div>
                  <div className={`${styles.mapNodeSmall} ${styles.nodeProvider}`}>
                    <Icon name="server" size={20} />
                    <strong>backend</strong>
                    <span>namespace</span>
                  </div>
                </div>
                <div className={styles.metricGrid}>
                  <TextMetric label="Protected flows" value="1,284" tone="good" />
                  <TextMetric label="Would block" value="17" tone="warn" />
                  <TextMetric label="Exposed" value="3" tone="risk" />
                  <TextMetric label="Unchanged" value="412" />
                </div>
              </section>

              <section className={styles.formSection}>
                <div className={styles.tableWrap}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Service</th>
                        <th>Before</th>
                        <th>After</th>
                        <th>Status</th>
                        <th>Why</th>
                      </tr>
                    </thead>
                    <tbody>
                      {impactFlows.map((flow) => (
                        <tr key={flow.id}>
                          <td>{flow.source}</td>
                          <td>{flow.destination}</td>
                          <td>{flow.service}</td>
                          <td>{flow.before}</td>
                          <td>{flow.after}</td>
                          <td>
                            <FlowBadge status={flow.status} />
                          </td>
                          <td>{flow.why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {/* ---- YAML ---- */}
          {activePolicyTab === "YAML" && (
            <div className={styles.yamlLayout}>
              <section className={styles.formSection}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Generated YAML</h2>
                    <p>Native Kubernetes NetworkPolicy</p>
                  </div>
                  <div className={styles.compactActions}>
                    <Button
                      variant="secondary-outlined"
                      size="sm"
                      leftIcon={<Icon name="file-copy" size={16} />}
                    >
                      Copy
                    </Button>
                    <Button variant="primary" size="sm" leftIcon={<Icon name="download" size={16} />}>
                      Download
                    </Button>
                  </div>
                </div>
                <pre className={styles.codeBlock}>{yaml}</pre>
              </section>
              <section className={styles.reviewPanel}>
                <h2>Review</h2>
                <div className={styles.reviewList}>
                  <TextMetric label="Affected namespaces" value="2" />
                  <TextMetric label="Affected workloads" value="18" />
                  <TextMetric label="Artifact" value="Native K8s" tone="good" />
                  <TextMetric label="Delivery" value="Manual YAML" />
                </div>
                <div className={styles.callout}>
                  <Icon name="circle-information" size={18} />
                  <span>Delivery method: Manual YAML export. Download and apply with kubectl or your GitOps pipeline.</span>
                </div>
                <div>
                  <label className={styles.field}>
                    <span>Delivery workflow</span>
                    <select>
                      <option>Manual YAML Export</option>
                      <option>Illumio Operator</option>
                      <option>Pure GitOps</option>
                      <option>Illumio + GitOps</option>
                    </select>
                  </label>
                </div>
              </section>
            </div>
          )}

          {/* ---- Lifecycle ---- */}
          {activePolicyTab === "Lifecycle" && (
            <div className={styles.lifecycleLayout}>
              <section className={styles.formSection}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Draft changes</h2>
                    <p>Version, diff, approval, rollback</p>
                  </div>
                  <PolicyStateBadge state="Drafting" />
                </div>
                <div className={styles.diffGrid}>
                  <div>
                    <span>v12 current</span>
                    <pre>no container policy for backend namespace</pre>
                  </div>
                  <div>
                    <span>v13 draft</span>
                    <pre>allow frontend namespace to backend namespace on TCP 443</pre>
                  </div>
                </div>
                <section className={styles.formSection} style={{ margin: "0 18px 18px", padding: 0 }}>
                  <div style={{ padding: "12px 14px 0" }}>
                    <h2>Per-cluster status</h2>
                  </div>
                  <div className={styles.statusStack}>
                    <TextMetric label="prod-eks-us-east-1" value="Ready for export" tone="good" />
                    <TextMetric label="platform-aks-westus" value="Pending review" />
                    <TextMetric label="shared-gke-us-central1" value="Extended artifact" tone="warn" />
                  </div>
                </section>
              </section>
              <div className={styles.lifecycleCard}>
                <h3>Policy Lifecycle</h3>
                {(
                  [
                    "Drafting",
                    "Pending Review",
                    "Approved",
                    "Deploying",
                    "Active",
                    "Failed / Out-of-Sync",
                  ] as string[]
                ).map((state, i) => (
                  <div key={state} className={styles.lifecycleRow}>
                    <span
                      className={
                        i === 0
                          ? styles.lifecycleActive
                          : state === "Failed / Out-of-Sync"
                            ? styles.lifecycleFailed
                            : styles.lifecycleDot
                      }
                    />
                    <span>{state}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- Advisor ---- */}
          {activePolicyTab === "Advisor" && (
            <div className={styles.recommendationGrid}>
              {recommendations.map((item) => (
                <article key={item.title} className={styles.recommendationCard}>
                  <div className={styles.cardTopline}>
                    <Icon name="sparkles" size={18} />
                    <Badge variant="recommended">{item.coverage}</Badge>
                  </div>
                  <h2>{item.title}</h2>
                  <p>{item.evidence}</p>
                  <button type="button">{item.action}</button>
                </article>
              ))}
            </div>
          )}

          {/* ---- Posture ---- */}
          {activePolicyTab === "Posture" && (
            <div className={styles.postureGrid}>
              <section className={styles.postureWidget}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Policy posture</h2>
                    <p>Per-namespace coverage</p>
                  </div>
                  <Badge variant="info">59% avg</Badge>
                </div>
                <div className={styles.tableWrap}>
                  <table className={styles.coverageTable}>
                    <thead>
                      <tr>
                        <th>Namespace</th>
                        <th>Cluster</th>
                        <th>Coverage</th>
                        <th>Protected</th>
                        <th>Exposed</th>
                        <th>Policies</th>
                      </tr>
                    </thead>
                    <tbody>
                      {postureCoverages.map((row) => (
                        <tr key={`${row.cluster}/${row.namespace}`}>
                          <td>
                            <strong>{row.namespace}</strong>
                          </td>
                          <td style={{ color: "#63788f", fontSize: 12 }}>{row.cluster}</td>
                          <td>
                            <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
                              <ProgressBar pct={row.coveragePct} />
                              <span style={{ fontSize: 12, fontWeight: 700, minWidth: 32 }}>{row.coveragePct}%</span>
                            </div>
                          </td>
                          <td className={styles.good}>{row.protected}</td>
                          <td className={row.exposed > 0 ? styles.warn : styles.good}>{row.exposed}</td>
                          <td>{row.policyCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className={styles.formSection}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Findings</h2>
                    <p>Policy gaps and remediation suggestions</p>
                  </div>
                  <Badge variant="high">{policyFindings.length} findings</Badge>
                </div>
                <div className={styles.findingList}>
                  {policyFindings.map((f) => (
                    <div key={`${f.namespace}-${f.findingType}`} className={styles.findingRow}>
                      <SeverityBadge severity={f.severity} />
                      <span className={styles.subtleText}>{f.namespace}</span>
                      <span className={styles.findingText}>{f.findingType}</span>
                      <button type="button" className={styles.actionBtn}>
                        Create policy
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Page Root
   ============================================================ */

export default function AgentlessK8sPage() {
  const [activeTopTab, setActiveTopTab] = useState("Clusters");
  const [expandedCluster, setExpandedCluster] = useState<string | null>(null);
  const [selectedWorkload, setSelectedWorkload] = useState<WorkloadRow | null>(null);
  const [policyGroupBy, setPolicyGroupBy] = useState("app-env");

  return (
    <main className={styles.page}>
      {/* Shell header */}
      <header className={styles.shellHeader}>
        <div className={styles.headerLeft}>
          <Link href="/demos" className={styles.backLink}>
            <Icon name="arrow-left" size={14} />
            Demos
          </Link>
          <div>
            <div className={styles.kicker}>Kubernetes / Agentless</div>
            <h1>Agentless K8s Segmentation</h1>
          </div>
        </div>
        <div className={styles.headerActions}>
          <Button
            variant="secondary-outlined"
            size="sm"
            leftIcon={<Icon name="file-arrow-up-alt" size={16} />}
          >
            Save draft
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Icon name="download" size={16} />}>
            Download YAML
          </Button>
        </div>
      </header>

      {/* Top-level tab bar */}
      <div className={styles.topTabsWrap}>
        <div className={styles.topTabs} role="tablist" aria-label="Agentless K8s workspace tabs">
          {["Clusters", "Label Map", "Inventory", "Map", "Policies"].map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTopTab === tab}
              className={activeTopTab === tab ? styles.activeTopTab : undefined}
              onClick={() => setActiveTopTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTopTab === "Clusters" && (
        <ClustersTab expandedCluster={expandedCluster} setExpandedCluster={setExpandedCluster} />
      )}
      {activeTopTab === "Label Map" && <LabelMapTab />}
      {activeTopTab === "Inventory" && (
        <InventoryTab selectedWorkload={selectedWorkload} setSelectedWorkload={setSelectedWorkload} />
      )}
      {activeTopTab === "Map" && <MapTab policyGroupBy={policyGroupBy} setPolicyGroupBy={setPolicyGroupBy} />}
      {activeTopTab === "Policies" && <PoliciesTab />}
    </main>
  );
}
