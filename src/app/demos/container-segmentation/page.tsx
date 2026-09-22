"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "@/design-system";
import { Icon } from "@/design-system/icons";
import styles from "./page.module.css";

type UseCase = "ns-ns-same" | "ns-ns-cross" | "ns-vm-labels" | "ns-vm-cidr";

type ClusterInfo = {
  id: string;
  label: string;
  cni: string;
  compatibility: string;
  cloud: string;
};

type Direction = "Ingress" | "Egress" | "Both";

type SelectorType = "all" | "labels" | "deployment";

type FlowStatus = "Newly Protected" | "Protected" | "Would Block" | "Exposed" | "Unchanged";

type PolicyState = "Drafting" | "Pending Review" | "Approved" | "Deploying" | "Active" | "Out-of-Sync";

type DeliveryMethod = "manual-yaml" | "operator" | "gitops" | "illumio-gitops";

type FlowRow = {
  id: string;
  source: string;
  destination: string;
  port: string;
  before: string;
  after: string;
  status: FlowStatus;
  reason: string;
};

type PolicyRow = {
  name: string;
  cluster: string;
  namespace: string;
  cni: string;
  source: string;
  destination: string;
  delivery: string;
  drift: "None" | "Detected" | "Unchecked";
  state: PolicyState;
};

type Recommendation = {
  title: string;
  evidence: string;
  coverage: number;
  confidence: "high" | "medium" | "prerequisite";
  action: string;
  actionLabel: string;
};

type Finding = {
  severity: "critical" | "warning" | "good";
  title: string;
  description: string;
};

type VersionEntry = {
  version: number;
  state: "Draft" | "Active" | "Superseded";
  timestamp: string;
  description: string;
  diff: string;
};

type ClusterStatus = {
  cluster: string;
  state: "Pending" | "Active" | "Out-of-Sync";
  delivery: string;
  cni: string;
  drift: string;
  lastSync: string;
};

const CLUSTERS: ClusterInfo[] = [
  { id: "prod-eks-us-east-1", label: "prod-eks-us-east-1", cni: "AWS VPC CNI + Calico", compatibility: "Native Kubernetes", cloud: "AWS" },
  { id: "platform-aks-westus", label: "platform-aks-westus", cni: "Azure CNI", compatibility: "Native Kubernetes", cloud: "Azure" },
  { id: "shared-gke-us-central1", label: "shared-gke-us-central1", cni: "Dataplane V2", compatibility: "Illumio Extended", cloud: "GCP" },
];

const NAMESPACES = ["frontend", "backend", "payments", "observability", "shared-services", "ingress"];

const NS_POD_COUNTS: Record<string, number> = {
  frontend: 3, backend: 5, payments: 4, observability: 6, "shared-services": 8, ingress: 2,
};

const USE_CASE_OPTIONS = [
  { id: "ns-ns-same" as UseCase, title: "NS → NS", subtitle: "Same Cluster", icon: "lock" as const, description: "Namespace-to-namespace within a single cluster. Pure K8s NetworkPolicy output.", badges: [{ label: "K8s Native", color: "blue" }, { label: "Most Common", color: "green" }] },
  { id: "ns-ns-cross" as UseCase, title: "NS → NS", subtitle: "Cross-Cluster", icon: "link" as const, description: "Namespace-to-namespace across clusters. Requires Illumio labels for identity.", badges: [{ label: "Illumio Labels", color: "amber" }] },
  { id: "ns-vm-labels" as UseCase, title: "NS → VM", subtitle: "Illumio Labels", icon: "server" as const, description: "K8s namespace to VM/cloud workload using Illumio labels. Cloud or Core managed.", badges: [{ label: "Illumio Labels", color: "amber" }, { label: "Hybrid", color: "purple" }] },
  { id: "ns-vm-cidr" as UseCase, title: "NS → VM", subtitle: "IP / CIDR", icon: "globe" as const, description: "K8s namespace to external VM via IP address or CIDR range. No Illumio labels needed.", badges: [{ label: "High Churn", color: "red" }, { label: "K8s Native", color: "gray" }] },
];

const PORT_CHIPS = ["TCP 443", "TCP 8080", "TCP 3306", "UDP 53", "All Ports"];

const POLICIES: PolicyRow[] = [
  { name: "frontend-to-backend-https", cluster: "prod-eks-us-east-1", namespace: "backend", cni: "Calico", source: "frontend namespace", destination: "backend namespace", delivery: "Manual YAML", drift: "None", state: "Drafting" },
  { name: "payments-egress-api", cluster: "prod-eks-us-east-1", namespace: "payments", cni: "Calico", source: "payments deployments", destination: "cloud resources", delivery: "GitOps planned", drift: "Unchecked", state: "Pending Review" },
  { name: "observability-scrape", cluster: "platform-aks-westus", namespace: "observability", cni: "Azure CNI", source: "prometheus service", destination: "all app namespaces", delivery: "Operator planned", drift: "Detected", state: "Out-of-Sync" },
];

const FLOWS: FlowRow[] = [
  { id: "flow-1", source: "frontend/web", destination: "backend/api", port: "TCP 443", before: "Default allow", after: "Allowed by draft", status: "Newly Protected", reason: "Matched draft rule" },
  { id: "flow-2", source: "frontend/web", destination: "backend/api", port: "TCP 8080", before: "Default allow", after: "Blocked by deny", status: "Would Block", reason: "No matching port in draft" },
  { id: "flow-3", source: "payments/worker", destination: "backend/api", port: "TCP 443", before: "Default allow", after: "Unchanged", status: "Unchanged", reason: "Outside source scope" },
  { id: "flow-4", source: "internet", destination: "frontend/web", port: "TCP 443", before: "Exposed", after: "Exposed", status: "Exposed", reason: "No ingress policy" },
];

const RECOMMENDATIONS: Recommendation[] = [
  { title: "Allow frontend → backend HTTPS", evidence: "1,284 flows observed over 3 days", coverage: 92, confidence: "high", action: "use-draft", actionLabel: "Use as Draft" },
  { title: "Limit frontend → backend ports", evidence: "TCP 8080 seen from 2 workloads only", coverage: 78, confidence: "medium", action: "review", actionLabel: "Review" },
  { title: "Map checkout-api ownership", evidence: "Missing Illumio app label on checkout-api", coverage: 64, confidence: "prerequisite", action: "map-label", actionLabel: "Map Label" },
];

const FINDINGS: Finding[] = [
  { severity: "critical", title: "backend namespace has no default deny policy", description: "All pods accept traffic from any source by default" },
  { severity: "warning", title: "frontend → backend TCP 8080 has no observed owner", description: "2 workloads sending traffic on unattributed port" },
  { severity: "critical", title: "Guardrail conflict: overly permissive allow-all in observability", description: "Conflicts with org-level deny policy for cross-namespace traffic" },
  { severity: "good", title: "checkout-api HTTPS path covered by draft", description: "Your current draft policy protects this flow" },
  { severity: "warning", title: "3 stale NetworkPolicies referencing deleted deployments", description: "Policies still active but target pods no longer exist" },
];

const VERSIONS: VersionEntry[] = [
  { version: 13, state: "Draft", timestamp: "Just now", description: "Allow frontend → backend on TCP 443 (both directions)", diff: "+ 2 NetworkPolicy objects added" },
  { version: 12, state: "Active", timestamp: "2 days ago", description: "No container policy for backend namespace", diff: "" },
  { version: 11, state: "Superseded", timestamp: "5 days ago", description: "DNS egress rule for observability", diff: "" },
];

const CLUSTER_STATUSES: ClusterStatus[] = [
  { cluster: "prod-eks-us-east-1", state: "Pending", delivery: "Manual YAML", cni: "Calico", drift: "None detected", lastSync: "—" },
  { cluster: "platform-aks-westus", state: "Active", delivery: "Operator", cni: "Azure CNI", drift: "None detected", lastSync: "12 min ago" },
  { cluster: "shared-gke-us-central1", state: "Out-of-Sync", delivery: "GitOps", cni: "Dataplane V2", drift: "Detected", lastSync: "3 hrs ago" },
];

function buildYaml({ policyName, namespace, sourceNamespace, destLabels, protocol, port }: {
  policyName: string; namespace: string; sourceNamespace: string;
  destLabels: string[]; protocol: string; port: string;
}) {
  const podSelector = destLabels.length > 0
    ? `    matchLabels:\n${destLabels.map((l) => { const [k, v] = l.split("="); return `      ${k}: ${v}`; }).join("\n")}`
    : "    {}";
  return `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ${policyName}
  namespace: ${namespace}
  labels:
    managed-by: illumio
    illumio.io/policy-state: draft
    illumio.io/direction: both
spec:
  podSelector:
${podSelector}
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: ${sourceNamespace}
      ports:
        - protocol: ${protocol}
          port: ${port}`;
}

function StatusBadge({ state }: { state: PolicyState }) {
  const variant =
    state === "Active" ? "new"
    : state === "Out-of-Sync" ? "high"
    : state === "Pending Review" ? "info"
    : state === "Deploying" ? "recommended"
    : "draft";
  return <Badge variant={variant}>{state}</Badge>;
}

function FlowBadge({ status }: { status: FlowStatus }) {
  const className =
    status === "Newly Protected" || status === "Protected" ? styles.goodBadge
    : status === "Would Block" ? styles.warnBadge
    : status === "Exposed" ? styles.riskBadge
    : styles.neutralBadge;
  return <span className={className}>{status}</span>;
}

function TextMetric({ label, value, tone }: { label: string; value: string; tone?: "good" | "warn" | "risk" }) {
  return (
    <div className={styles.metric}>
      <span>{label}</span>
      <strong className={tone ? styles[tone] : undefined}>{value}</strong>
    </div>
  );
}

function ScopeModal({
  isOpen,
  onClose,
  selectedUseCase,
  onUseCaseChange,
  selectedCluster,
  onClusterChange,
  secondCluster,
  onSecondClusterChange,
  onContinue,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedUseCase: UseCase;
  onUseCaseChange: (uc: UseCase) => void;
  selectedCluster: string;
  onClusterChange: (id: string) => void;
  secondCluster: string;
  onSecondClusterChange: (id: string) => void;
  onContinue: () => void;
}) {
  const cluster = CLUSTERS.find((c) => c.id === selectedCluster) ?? CLUSTERS[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <ModalHeader title="Create Network Policy" />
      <ModalBody>
        <div style={{ display: "grid", gap: 20 }}>
          {/* Cluster selector */}
          <div className={styles.modalSection}>
            <div className={styles.modalLabel}>Cluster</div>
            <select className={styles.modalSelect} value={selectedCluster} onChange={(e) => onClusterChange(e.target.value)}>
              {CLUSTERS.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Use case cards */}
          <div className={styles.modalSection}>
            <div className={styles.modalLabel}>Use Case</div>
            <div className={styles.useCaseGrid} role="radiogroup" aria-label="Use Case">
              {USE_CASE_OPTIONS.map((uc) => (
                <div
                  key={uc.id}
                  role="radio"
                  aria-checked={selectedUseCase === uc.id}
                  tabIndex={0}
                  className={`${styles.useCaseCard} ${selectedUseCase === uc.id ? styles.useCaseCardSelected : ""}`}
                  onClick={() => onUseCaseChange(uc.id)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onUseCaseChange(uc.id); }}
                >
                  <div className={styles.useCaseCardIcon}>
                    <Icon name={uc.icon} size={20} />
                  </div>
                  <div className={styles.useCaseCardBody}>
                    <div className={styles.useCaseCardTitle}>{uc.title}</div>
                    <div className={styles.useCaseCardSubtitle}>{uc.subtitle}</div>
                    <div className={styles.useCaseCardDesc}>{uc.description}</div>
                    <div className={styles.useCaseCardBadges}>
                      {uc.badges.map((b) => (
                        <span key={b.label} className={styles[`badge_${b.color}`]}>{b.label}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second cluster for cross-cluster */}
          {selectedUseCase === "ns-ns-cross" && (
            <div className={styles.modalSection}>
              <div className={styles.modalLabel}>Destination Cluster</div>
              <select className={styles.modalSelect} value={secondCluster} onChange={(e) => onSecondClusterChange(e.target.value)}>
                {CLUSTERS.filter((c) => c.id !== selectedCluster).map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          )}

          {/* CNI info banner */}
          <div className={styles.cniBanner}>
            <Icon name="circle-information" size={16} />
            <span><strong>{cluster.label}</strong> — {cluster.cni} · {cluster.compatibility}</span>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary-outlined" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={onContinue}>Continue →</Button>
      </ModalFooter>
    </Modal>
  );
}

export default function ContainerSegmentationPage() {
  const [showScopeModal, setShowScopeModal] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase>("ns-ns-same");
  const [selectedCluster, setSelectedCluster] = useState(CLUSTERS[0].id);
  const [secondCluster, setSecondCluster] = useState(CLUSTERS[1].id);
  const [sourceNamespace, setSourceNamespace] = useState("frontend");
  const [destNamespace, setDestNamespace] = useState("backend");
  const [scopeComplete, setScopeComplete] = useState(false);
  const [direction, setDirection] = useState<Direction>("Both");
  const [sourceSelector, setSourceSelector] = useState<SelectorType>("all");
  const [destSelector, setDestSelector] = useState<SelectorType>("labels");
  const [selectedSourceLabels, setSelectedSourceLabels] = useState<string[]>([]);
  const [selectedDestLabels, setSelectedDestLabels] = useState<string[]>(["app=api", "tier=web"]);
  const [selectedPorts, setSelectedPorts] = useState<string[]>(["TCP 443"]);
  const [protocol, setProtocol] = useState("TCP");
  const [port, setPort] = useState("443");
  const [activeTab, setActiveTab] = useState("Author");
  const [selectedPolicy, setSelectedPolicy] = useState(POLICIES[0].name);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("manual-yaml");
  const [flowFilter, setFlowFilter] = useState("All");
  const [timeRange, setTimeRange] = useState("3 days");
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  const cluster = CLUSTERS.find((c) => c.id === selectedCluster) ?? CLUSTERS[0];
  const isNative = selectedUseCase === "ns-ns-same" || selectedUseCase === "ns-vm-cidr";

  const filteredFlows = flowFilter === "All"
    ? FLOWS
    : FLOWS.filter((f) =>
        flowFilter === "Protected" ? f.status === "Newly Protected" || f.status === "Protected"
        : flowFilter === "Would Block" ? f.status === "Would Block"
        : f.status === "Unchanged"
      );

  const yaml = useMemo(
    () => buildYaml({
      policyName: "frontend-to-backend-https",
      namespace: destNamespace,
      sourceNamespace,
      destLabels: destSelector === "labels" ? selectedDestLabels : [],
      protocol,
      port,
    }),
    [destNamespace, sourceNamespace, destSelector, selectedDestLabels, protocol, port],
  );

  function handleScopeModalContinue() {
    setShowScopeModal(false);
    setWorkspaceOpen(true);
    setScopeComplete(false);
    setActiveTab("Author");
  }

  function handleScopeComplete() {
    setScopeComplete(true);
  }

  return (
    <main className={styles.page}>
      {/* Header */}
      <header className={styles.shellHeader}>
        <div className={styles.headerLeft}>
          <Link href="/demos" className={styles.backLink}>
            <Icon name="arrow-left" size={14} />
            Demos
          </Link>
          <div>
            <div className={styles.kicker}>Policy / Rulesets / Container Segmentation</div>
            <h1>Container segmentation policy</h1>
          </div>
        </div>
        <div className={styles.headerActions}>
          <Button variant="primary" size="sm" onClick={() => setShowScopeModal(true)}>
            Add Policy
          </Button>
        </div>
      </header>

      {/* Policy List */}
      <section className={styles.policyList}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Policies</h2>
            <p>Kubernetes network policies</p>
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.policyTable}>
            <thead>
              <tr>
                <th>Policy</th>
                <th>Cluster</th>
                <th>Namespace</th>
                <th>CNI</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Delivery</th>
                <th>Drift</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {POLICIES.map((p) => (
                <tr key={p.name} className={selectedPolicy === p.name ? styles.selectedRow : undefined} onClick={() => setSelectedPolicy(p.name)}>
                  <td>{p.name}</td>
                  <td>{p.cluster}</td>
                  <td>{p.namespace}</td>
                  <td>{p.cni}</td>
                  <td>{p.source}</td>
                  <td>{p.destination}</td>
                  <td>{p.delivery}</td>
                  <td><span className={p.drift === "Detected" ? styles.riskText : styles.subtleText}>{p.drift}</span></td>
                  <td><StatusBadge state={p.state} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ScopeModal
        isOpen={showScopeModal}
        onClose={() => setShowScopeModal(false)}
        selectedUseCase={selectedUseCase}
        onUseCaseChange={setSelectedUseCase}
        selectedCluster={selectedCluster}
        onClusterChange={setSelectedCluster}
        secondCluster={secondCluster}
        onSecondClusterChange={setSecondCluster}
        onContinue={handleScopeModalContinue}
      />
      {/* Workspace */}
      {workspaceOpen && (
        <div className={styles.workspace}>
          {/* Sidebar */}
          <aside className={styles.sidePanel}>
            <div className={styles.intentBox}>
              <span className={styles.intentIcon}>
                <Icon name={USE_CASE_OPTIONS.find((u) => u.id === selectedUseCase)?.icon ?? "lock"} size={18} />
              </span>
              <div>
                <strong>{USE_CASE_OPTIONS.find((u) => u.id === selectedUseCase)?.title} {USE_CASE_OPTIONS.find((u) => u.id === selectedUseCase)?.subtitle}</strong>
                <span>{cluster.label}</span>
                <span>{cluster.cni} · {cluster.compatibility}</span>
              </div>
            </div>

            {["Scope", "Rule", "Validation", "Review", "Delivery"].map((step, i) => (
              <div key={step} className={styles.stepRow}>
                <span className={i === 0 && scopeComplete ? styles.stepDone : i === 1 && scopeComplete ? styles.stepActive : i === 0 && !scopeComplete ? styles.stepActive : styles.stepIdle}>
                  {i === 0 && scopeComplete ? "✓" : i + 1}
                </span>
                <div>
                  <strong>{step}</strong>
                  <span>
                    {i === 0 ? (scopeComplete ? `${sourceNamespace} → ${destNamespace}` : "Select namespaces")
                    : i === 1 ? (scopeComplete ? "In progress" : "Pending")
                    : "Pending"}
                  </span>
                </div>
              </div>
            ))}

            <div className={styles.lifecycleCard}>
              <h3>Lifecycle</h3>
              {["Drafting", "Pending Review", "Approved", "Active"].map((s, i) => (
                <div key={s} className={styles.lifecycleRow}>
                  <span className={i === 0 ? styles.lifecycleActive : styles.lifecycleDot} />
                  <span>{s}</span>
                </div>
              ))}
            </div>

            {activeTab === "Impact" && scopeComplete && (
              <div className={styles.sidebarContextCard}>
                <h3>Draft Rule</h3>
                <div><strong>{sourceNamespace}</strong> → <strong>{destNamespace}</strong></div>
                <span>{destSelector === "labels" ? selectedDestLabels.join(", ") : "All pods"}</span>
                <span className={styles.good}>{selectedPorts.join(", ")} · {direction}</span>
              </div>
            )}

            {activeTab === "Impact" && (
              <div className={styles.sidebarContextCard}>
                <h3>Impact Summary</h3>
                <TextMetric label="Newly Protected" value="1,284" tone="good" />
                <TextMetric label="Would Block" value="17" tone="warn" />
                <TextMetric label="Exposed" value="3" tone="risk" />
                <TextMetric label="Unchanged" value="412" />
              </div>
            )}
          </aside>

          {/* Main panel */}
          <section className={styles.authoringPanel}>
            <div className={styles.tabs} role="tablist">
              {["Author", "Impact", "YAML", "Lifecycle", "Advisor", "Posture"].map((tab) => (
                <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? styles.activeTab : undefined} onClick={() => setActiveTab(tab)}>
                  {tab}
                </button>
              ))}
            </div>
            <div className={styles.tabContent}>
              {activeTab === "Author" && (
                <div className={styles.authorGrid}>
                  {/* Scope section */}
                  <section className={styles.formSection}>
                    <div className={styles.sectionHeader}>
                      <div>
                        <h2>Scope</h2>
                        <p>Cluster and namespace selection</p>
                      </div>
                      {scopeComplete ? <Badge variant="new">Complete</Badge> : <Badge variant="info-light">Required</Badge>}
                    </div>
                    {!scopeComplete ? (
                      <div className={styles.scopeForm}>
                        <div className={styles.scopeRow}>
                          <label className={styles.field}>
                            <span>Source Namespace</span>
                            <select value={sourceNamespace} onChange={(e) => setSourceNamespace(e.target.value)}>
                              {NAMESPACES.map((ns) => <option key={ns} value={ns}>{ns}</option>)}
                            </select>
                          </label>
                          <div className={styles.scopeArrow}>→</div>
                          <label className={styles.field}>
                            <span>Destination {selectedUseCase === "ns-vm-cidr" ? "IP/CIDR" : selectedUseCase === "ns-vm-labels" ? "VM Labels" : "Namespace"}</span>
                            {selectedUseCase === "ns-vm-cidr" ? (
                              <input placeholder="e.g. 10.32.0.0/16" defaultValue="10.32.0.0/16" />
                            ) : selectedUseCase === "ns-vm-labels" ? (
                              <input placeholder="Role=Web, App=ShopApp" defaultValue="Role=Web, App=ShopApp" />
                            ) : (
                              <select value={destNamespace} onChange={(e) => setDestNamespace(e.target.value)}>
                                {NAMESPACES.filter((ns) => ns !== sourceNamespace).map((ns) => <option key={ns} value={ns}>{ns}</option>)}
                              </select>
                            )}
                          </label>
                        </div>
                        {selectedUseCase === "ns-ns-cross" && (
                          <div className={styles.useCaseBanner}>
                            <Icon name="circle-information" size={16} />
                            <span>Cross-cluster requires Illumio labels for workload identity across cluster boundaries.</span>
                          </div>
                        )}
                        {selectedUseCase === "ns-vm-labels" && (
                          <div className={styles.useCaseBanner}>
                            <Icon name="circle-information" size={16} />
                            <span>Hybrid policy — Illumio manages VM identity. Output will be Illumio policy format.</span>
                          </div>
                        )}
                        {selectedUseCase === "ns-vm-cidr" && (
                          <div className={styles.useCaseBannerWarn}>
                            <Icon name="square-exclamation" size={16} />
                            <span>IP-based rules have high churn when VMs restart with new addresses.</span>
                          </div>
                        )}
                        <div style={{ padding: "0 18px 18px" }}>
                          <Button variant="primary" size="sm" onClick={handleScopeComplete}>Confirm Scope</Button>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.scopeSummary}>
                        <div className={styles.scopeSummaryItem}>
                          <div className={styles.scopeSummaryLabel}>Source Namespace</div>
                          <span className={styles.scopeChip}>{sourceNamespace}</span>
                        </div>
                        <div className={styles.scopeArrow}>→</div>
                        <div className={styles.scopeSummaryItem}>
                          <div className={styles.scopeSummaryLabel}>Destination {selectedUseCase === "ns-vm-cidr" ? "IP/CIDR" : selectedUseCase === "ns-vm-labels" ? "VM" : "Namespace"}</div>
                          <span className={styles.scopeChip}>{selectedUseCase === "ns-vm-cidr" ? "10.32.0.0/16" : selectedUseCase === "ns-vm-labels" ? "Role=Web" : destNamespace}</span>
                        </div>
                      </div>
                    )}
                  </section>

                  {/* Rule section */}
                  {scopeComplete && (
                    <section className={styles.formSection}>
                      <div className={styles.sectionHeader}>
                        <div>
                          <h2>Rule</h2>
                          <p>Define source, destination, and port/protocol</p>
                        </div>
                        <Badge variant="draft">Draft</Badge>
                      </div>
                      <div className={styles.ruleContent}>
                        {/* Direction Picker */}
                        <div className={styles.ruleField}>
                          <div className={styles.ruleFieldLabel}>Direction</div>
                          <div className={styles.directionPicker}>
                            {(["Ingress", "Egress", "Both"] as Direction[]).map((d) => (
                              <button key={d} type="button" className={`${styles.directionBtn} ${direction === d ? styles.directionBtnActive : ""}`} onClick={() => setDirection(d)}>
                                {d}{d === "Both" ? " ↔" : ""}
                              </button>
                            ))}
                          </div>
                          {direction === "Both" && <div className={styles.directionHint}>Both: generates ingress + egress rules for bidirectional communication</div>}
                        </div>

                        {/* Source / Destination / Port grid */}
                        <div className={styles.ruleGrid}>
                          {/* Source */}
                          <div>
                            <div className={styles.ruleFieldLabel}>Source</div>
                            <div className={styles.ruleFieldHint}>Select workloads within source namespace</div>
                            <div className={styles.selectorChips}>
                              {(["all", "labels", "deployment"] as SelectorType[]).map((s) => (
                                <button key={s} type="button" className={`${styles.selectorChip} ${sourceSelector === s ? styles.selectorChipActive : ""}`} onClick={() => setSourceSelector(s)}>
                                  {s === "all" ? "All Pods" : s === "labels" ? "Pod Labels" : "Deployment"}
                                </button>
                              ))}
                            </div>
                            <div className={styles.selectorValue}>
                              {sourceSelector === "all" && <span>All pods in <strong>{sourceNamespace}</strong></span>}
                              {sourceSelector === "labels" && (
                                <div className={styles.labelChips}>
                                  {selectedSourceLabels.map((l) => <span key={l} className={styles.labelChip}>{l}</span>)}
                                  {selectedSourceLabels.length === 0 && <span className={styles.placeholderText}>Select pod labels...</span>}
                                </div>
                              )}
                              {sourceSelector === "deployment" && <span>Select deployment...</span>}
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className={styles.ruleArrow}>→</div>

                          {/* Destination */}
                          <div>
                            <div className={styles.ruleFieldLabel}>Destination</div>
                            <div className={styles.ruleFieldHint}>Select workloads within destination namespace</div>
                            <div className={styles.selectorChips}>
                              {(["all", "labels", "deployment"] as SelectorType[]).map((s) => (
                                <button key={s} type="button" className={`${styles.selectorChip} ${destSelector === s ? styles.selectorChipActive : ""}`} onClick={() => setDestSelector(s)}>
                                  {s === "all" ? "All Pods" : s === "labels" ? "Pod Labels" : "Deployment"}
                                </button>
                              ))}
                            </div>
                            <div className={styles.selectorValue}>
                              {destSelector === "all" && <span>All pods in <strong>{destNamespace}</strong></span>}
                              {destSelector === "labels" && (
                                <div className={styles.labelChips}>
                                  {selectedDestLabels.map((l) => <span key={l} className={styles.labelChip}>{l}</span>)}
                                  {selectedDestLabels.length === 0 && <span className={styles.placeholderText}>Select pod labels...</span>}
                                </div>
                              )}
                              {destSelector === "deployment" && <span>Select deployment...</span>}
                            </div>
                          </div>
                        </div>

                        {/* Port / Protocol */}
                        <div className={styles.ruleField}>
                          <div className={styles.ruleFieldLabel}>Port / Protocol</div>
                          <div className={styles.portChips}>
                            {PORT_CHIPS.map((p) => (
                              <button key={p} type="button" className={`${styles.portChip} ${selectedPorts.includes(p) ? styles.portChipActive : ""}`}
                                onClick={() => setSelectedPorts((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p])}>
                                {p}
                              </button>
                            ))}
                          </div>
                          <div className={styles.portInputRow}>
                            <select className={styles.portSelect} value={protocol} onChange={(e) => setProtocol(e.target.value)}>
                              <option>TCP</option><option>UDP</option><option>SCTP</option>
                            </select>
                            <input className={styles.portInput} value={port} onChange={(e) => setPort(e.target.value)} placeholder="Port" />
                            <button type="button" className={styles.addPortLink}>+ Add port</button>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Rule Summary Band */}
                  {scopeComplete && (
                    <div className={styles.summaryBand}>
                      <div>
                        <span>Rule summary</span>
                        <strong>
                          Allow {sourceSelector === "all" ? `all pods in ${sourceNamespace}` : selectedSourceLabels.join(", ") || sourceNamespace} to reach{" "}
                          {destSelector === "all" ? `all pods in ${destNamespace}` : selectedDestLabels.join(", ") || destNamespace} on{" "}
                          {selectedPorts.join(", ") || `${protocol} ${port}`}
                        </strong>
                      </div>
                      <button type="button" onClick={() => setActiveTab("Impact")}>
                        View Impact <Icon name="arrow-right" size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "Impact" && (
                <div className={styles.impactLayout}>
                  {/* Before / After Split */}
                  <div className={styles.beforeAfterSplit}>
                    {/* Before panel */}
                    <div className={styles.impactPanel}>
                      <div className={styles.impactPanelHeader}>
                        <span>Before</span>
                        <span className={styles.riskBadge}>Current State</span>
                      </div>
                      <div className={styles.impactMap}>
                        <div className={styles.nsBox}>
                          <Icon name="container-storage" size={20} />
                          <strong>{sourceNamespace}</strong>
                          <span>{NS_POD_COUNTS[sourceNamespace] ?? 0} pods</span>
                          <span className={styles.riskText}>Exposed</span>
                        </div>
                        <div className={styles.flowLines}>
                          <div className={styles.flowLineDashed + " " + styles.flowLineAmber}>TCP 443 · default allow</div>
                          <div className={styles.flowLineDashed + " " + styles.flowLineAmber}>TCP 8080 · default allow</div>
                          <div className={styles.flowLineDashed + " " + styles.flowLineRed}>Any · no policy</div>
                        </div>
                        <div className={styles.nsBox}>
                          <Icon name="container-storage" size={20} />
                          <strong>{destNamespace}</strong>
                          <span>{NS_POD_COUNTS[destNamespace] ?? 0} pods</span>
                          <span className={styles.riskText}>Exposed</span>
                        </div>
                      </div>
                    </div>
                    {/* After panel */}
                    <div className={styles.impactPanel}>
                      <div className={styles.impactPanelHeader}>
                        <span>After</span>
                        <span className={styles.goodBadge}>With Draft Policy</span>
                      </div>
                      <div className={styles.impactMap}>
                        <div className={`${styles.nsBox} ${styles.nsBoxProtected}`}>
                          <Icon name="container-storage" size={20} />
                          <strong>{sourceNamespace}</strong>
                          <span>{NS_POD_COUNTS[sourceNamespace] ?? 0} pods</span>
                          <span className={styles.good}>Protected</span>
                        </div>
                        <div className={styles.flowLines}>
                          <div className={styles.flowLineSolid + " " + styles.flowLineGreen}>TCP 443 ✓ allowed</div>
                          <div className={styles.flowLineSolid + " " + styles.flowLineRed}>TCP 8080 ✕ blocked</div>
                          <div className={styles.flowLineSolid + " " + styles.flowLineRed}>Any ✕ default deny</div>
                        </div>
                        <div className={`${styles.nsBox} ${styles.nsBoxProtected}`}>
                          <Icon name="container-storage" size={20} />
                          <strong>{destNamespace}</strong>
                          <span>{NS_POD_COUNTS[destNamespace] ?? 0} pods</span>
                          <span className={styles.good}>Protected</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Flow Table */}
                  <div className={styles.flowTableSection}>
                    <div className={styles.flowTableHeader}>
                      <span className={styles.flowTableTitle}>Affected Flows</span>
                      <div className={styles.flowFilterChips}>
                        {["All", "Protected", "Would Block", "Unchanged"].map((f) => (
                          <button key={f} type="button" className={`${styles.flowFilterChip} ${flowFilter === f ? styles.flowFilterChipActive : ""}`} onClick={() => setFlowFilter(f)}>
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.tableWrap}>
                      <table className={styles.flowTable}>
                        <thead>
                          <tr><th>Source</th><th>Destination</th><th>Port</th><th>Before</th><th>After</th><th>Status</th><th>Reason</th></tr>
                        </thead>
                        <tbody>
                          {filteredFlows.map((f) => (
                            <tr key={f.id}>
                              <td>{f.source}</td><td>{f.destination}</td><td>{f.port}</td>
                              <td>{f.before}</td><td>{f.after}</td>
                              <td><FlowBadge status={f.status} /></td>
                              <td>{f.reason}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className={styles.impactWarning}>
                      <Icon name="square-exclamation" size={16} />
                      <span>17 flows would be blocked. Review before enforcing.</span>
                    </div>
                  </div>

                  {/* Action bar */}
                  <div className={styles.tabActionBar}>
                    <Button variant="secondary-outlined" size="sm" onClick={() => setActiveTab("Author")}>← Back to Author</Button>
                    <Button variant="primary" size="sm" onClick={() => setActiveTab("YAML")}>View YAML →</Button>
                  </div>
                </div>
              )}
              {activeTab === "YAML" && (
                <div className={styles.yamlLayout}>
                  <div className={styles.yamlMainCol}>
                    {/* Format banner */}
                    <div className={isNative ? styles.formatBannerNative : styles.formatBannerExtended}>
                      <Icon name={isNative ? "circle-check" : "circle-information"} size={16} />
                      <span>{isNative
                        ? "Kubernetes NetworkPolicy — compatible with all major CNIs."
                        : "Illumio Policy — requires Illumio Operator or labels for enforcement."
                      }</span>
                    </div>

                    {/* YAML code block */}
                    <div className={styles.yamlBlock}>
                      <div className={styles.yamlBlockHeader}>
                        <span>frontend-to-backend-https.yaml</span>
                        <div className={styles.compactActions}>
                          <Button variant="secondary-outlined" size="sm" leftIcon={<Icon name="file-copy" size={16} />}>Copy</Button>
                          <Button variant="primary" size="sm" leftIcon={<Icon name="download" size={16} />}>Download</Button>
                        </div>
                      </div>
                      <pre className={styles.codeBlock}>{yaml}</pre>
                    </div>

                    {/* Bidirectional note */}
                    {direction === "Both" && (
                      <div className={styles.bidirectionalNote}>
                        <Icon name="arrow-right" size={16} />
                        <span><strong>Both directions selected</strong> — a return NetworkPolicy for <code>{sourceNamespace}</code> namespace will also be generated.</span>
                      </div>
                    )}

                    {/* Delivery methods */}
                    <div className={styles.deliverySection}>
                      <h2>Delivery Method</h2>
                      <p className={styles.deliverySubtext}>How this policy will be applied to the cluster</p>
                      <div className={styles.deliveryGrid}>
                        {([
                          { id: "manual-yaml" as DeliveryMethod, icon: "file-arrow-up-alt" as const, title: "Manual YAML Export", desc: "Download .yaml → kubectl apply -f" },
                          { id: "operator" as DeliveryMethod, icon: "shield-check" as const, title: "Illumio Operator", desc: "Illumio Operator → CNI enforcement" },
                          { id: "gitops" as DeliveryMethod, icon: "chart-network" as const, title: "Pure GitOps", desc: "Git commit → ArgoCD / Flux sync → K8s API" },
                          { id: "illumio-gitops" as DeliveryMethod, icon: "link" as const, title: "Illumio + GitOps", desc: "Illumio → Git (source of truth) → ArgoCD → CNI" },
                        ]).map((d) => (
                          <div key={d.id} className={`${styles.deliveryCard} ${deliveryMethod === d.id ? styles.deliveryCardSelected : ""} ${!isNative && d.id === "manual-yaml" ? styles.deliveryCardDisabled : ""}`}
                            onClick={() => { if (isNative || d.id !== "manual-yaml") setDeliveryMethod(d.id); }}>
                            <Icon name={d.icon} size={20} />
                            <div>
                              <div className={styles.deliveryCardTitle}>{d.title}</div>
                              <div className={styles.deliveryCardDesc}>{d.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action bar */}
                    <div className={styles.tabActionBar}>
                      <Button variant="secondary-outlined" size="sm" onClick={() => setActiveTab("Impact")}>← Back to Impact</Button>
                      <div className={styles.compactActions}>
                        <Button variant="secondary-outlined" size="sm">Save Draft</Button>
                        <Button variant="primary" size="sm" leftIcon={<Icon name="download" size={16} />}>Download YAML</Button>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar review panel */}
                  <div className={styles.yamlSidePanel}>
                    <div className={styles.reviewPanel}>
                      <h2>Review</h2>
                      <TextMetric label="Affected namespaces" value="2" />
                      <TextMetric label="Affected workloads" value="18" />
                      <TextMetric label="Artifact" value={isNative ? "K8s Native" : "Extended"} tone={isNative ? "good" : "warn"} />
                      <TextMetric label="Direction" value={direction} />
                    </div>
                    <div className={styles.cniChecklist}>
                      <h3>CNI Compatibility</h3>
                      {["Calico", "Cilium", "Azure CNI", "AWS VPC CNI"].map((cni) => (
                        <div key={cni} className={styles.cniCheckItem}>
                          <Icon name="circle-check" size={14} />
                          <span>{cni}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "Lifecycle" && (
                <div className={styles.lifecycleLayout}>
                  {/* Version History */}
                  <section className={styles.formSection}>
                    <div className={styles.sectionHeader}>
                      <div><h2>Version History</h2><p>Draft changes, diffs, and rollback</p></div>
                    </div>
                    <div className={styles.versionList}>
                      {VERSIONS.map((v) => (
                        <div key={v.version} className={`${styles.versionCard} ${v.state === "Draft" ? styles.versionCardDraft : ""} ${v.state === "Superseded" ? styles.versionCardFaded : ""}`}>
                          <div className={styles.versionCardHeader}>
                            <div className={styles.versionCardLeft}>
                              <span className={styles.versionNumber}>v{v.version}</span>
                              <Badge variant={v.state === "Draft" ? "draft" : v.state === "Active" ? "new" : "info-light"}>{v.state}</Badge>
                            </div>
                            <span className={styles.versionTimestamp}>{v.timestamp}</span>
                          </div>
                          <div className={styles.versionDesc}>{v.description}</div>
                          {v.diff && <div className={styles.versionDiff}>{v.diff}</div>}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Per-Cluster Status */}
                  <section className={styles.formSection}>
                    <div className={styles.sectionHeader}>
                      <div><h2>Per-Cluster Enforcement</h2><p>Status, drift detection, delivery</p></div>
                    </div>
                    <div className={styles.clusterStatusList}>
                      {CLUSTER_STATUSES.map((cs) => (
                        <div key={cs.cluster} className={`${styles.clusterStatusCard} ${cs.state === "Out-of-Sync" ? styles.clusterStatusDrift : ""}`}>
                          <div className={styles.clusterStatusHeader}>
                            <span>{cs.cluster}</span>
                            <Badge variant={cs.state === "Active" ? "new" : cs.state === "Out-of-Sync" ? "high" : "draft"}>{cs.state}</Badge>
                          </div>
                          <div className={styles.clusterStatusGrid}>
                            <div><span className={styles.subtleText}>Delivery:</span> {cs.delivery}</div>
                            <div><span className={styles.subtleText}>CNI:</span> {cs.cni}</div>
                            <div><span className={cs.drift === "Detected" ? styles.riskText : styles.subtleText}>Drift:</span> <span className={cs.drift === "Detected" ? styles.riskText : undefined}>{cs.drift}</span></div>
                            <div><span className={styles.subtleText}>Last sync:</span> {cs.lastSync}</div>
                          </div>
                          {cs.state === "Out-of-Sync" && (
                            <div className={styles.clusterStatusActions}>
                              <Button variant="primary" size="sm">Auto-Remediate</Button>
                              <Button variant="secondary-outlined" size="sm">View Diff</Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}
              {activeTab === "Advisor" && (
                <div className={styles.advisorLayout}>
                  <div className={styles.advisorHeader}>
                    <div><h2>Policy Recommendations</h2><p>Based on observed traffic patterns</p></div>
                    <div className={styles.timeRangeChips}>
                      {["12h", "24h", "3 days", "7 days"].map((t) => (
                        <button key={t} type="button" className={`${styles.timeRangeChip} ${timeRange === t ? styles.timeRangeChipActive : ""}`} onClick={() => setTimeRange(t)}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={styles.recommendationGrid}>
                    {RECOMMENDATIONS.map((r) => (
                      <article key={r.title} className={styles.recommendationCard}>
                        <div className={styles.cardTopline}>
                          <Icon name="sparkles" size={18} />
                          <Badge variant={r.coverage >= 80 ? "new" : r.coverage >= 60 ? "medium" : "draft"}>{r.coverage}%</Badge>
                        </div>
                        <h2>{r.title}</h2>
                        <p>{r.evidence}</p>
                        <div className={styles.confidenceRow}>
                          <span className={`${styles.confidenceDot} ${styles[`confidence_${r.confidence}`]}`} />
                          <span>{r.confidence === "high" ? "High confidence" : r.confidence === "medium" ? "Medium confidence" : "Prerequisite"}</span>
                        </div>
                        <div className={styles.recActions}>
                          <Button variant={r.action === "map-label" ? "secondary-outlined" : "primary"} size="sm">{r.actionLabel}</Button>
                          {r.action !== "map-label" && <Button variant="secondary-outlined" size="sm">Review</Button>}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "Posture" && (
                <div className={styles.postureGrid}>
                  {/* Coverage */}
                  <section className={styles.postureWidget}>
                    <div className={styles.sectionHeader}>
                      <div><h2>Network Policy Posture</h2><p>Coverage analysis for {cluster.label}</p></div>
                      <span className={styles.posturePercent}>32%</span>
                    </div>
                    <div className={styles.postureBars}><span style={{ width: "32%" }} /></div>
                    <div className={styles.postureStats}>
                      <TextMetric label="Existing NetworkPolicies" value="18" />
                      <TextMetric label="Illumio-managed" value="7" />
                      <TextMetric label="External / pre-existing" value="11" />
                      <TextMetric label="Coverage gaps" value="7 namespaces" tone="warn" />
                      <TextMetric label="Guardrail conflicts" value="1" tone="risk" />
                    </div>
                  </section>

                  {/* Findings */}
                  <section className={styles.formSection}>
                    <div className={styles.sectionHeader}>
                      <div><h2>Findings</h2><p>Issues from policy analysis</p></div>
                    </div>
                    <div className={styles.findingList}>
                      {FINDINGS.map((f) => (
                        <div key={f.title} className={styles.findingItem}>
                          <Badge variant={f.severity === "critical" ? "high" : f.severity === "warning" ? "medium" : "new"}>
                            {f.severity === "critical" ? "Critical" : f.severity === "warning" ? "Warning" : "Good"}
                          </Badge>
                          <div>
                            <div className={styles.findingTitle}>{f.title}</div>
                            <div className={styles.findingDesc}>{f.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
