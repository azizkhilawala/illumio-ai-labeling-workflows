# Agentless K8s Demo — Design Spec

**Date:** 2026-07-01  
**Source:** Agentless-K8s-Platform-Alignment-Requirements Docx Format.pdf  
**Scope:** New standalone demo prototype at `/demos/agentless-k8s/` covering the full E2E product experience for Illumio's Agentless Kubernetes Segmentation offering.

---

## Context

The requirements document describes a unified platform where Kubernetes workloads are managed through the same workflows, data models, and interfaces customers already use for VMs and cloud instances. The goal of this demo is to show that story end-to-end: from connecting a cluster, mapping K8s labels to Illumio labels, seeing K8s workloads in the unified inventory and map, authoring a policy, and tracking its lifecycle — all without deploying per-node agents.

The existing `container-segmentation` demo covers only the policy-authoring step. This new demo adds the four missing areas (cluster management, label mapping, inventory, unified map) and enhances the policy area with posture, advisory, and guardrail compliance.

---

## Architecture

**File layout:**
```
src/app/demos/agentless-k8s/
  page.tsx         ← single React component, all logic inline
  page.module.css  ← scoped styles, following existing naming conventions
```

**Pattern:** Custom-built demo (same pattern as `container-segmentation/page.tsx`). All data is static TypeScript constants defined at the top of the file. State managed with `useState`. No external data fetching, no new npm dependencies.

**Design system imports:** `Badge`, `Button`, `Pill` from `@/design-system`; `Icon` from `@/design-system/icons`. No inline SVGs.

**Navigation:** Shell header with back link (`← Demos`), page title ("Agentless K8s Segmentation"), and top-level tab bar with 5 tabs. Same visual treatment as the existing demo.

---

## Tab 1 — Clusters

**Purpose:** Show all connected K8s clusters as first-class platform objects.

**Layout:** Section header with "Connect Cluster" button (secondary-outlined). Cluster table with columns:
- Cluster name (bold, clickable to expand)
- Cloud provider (AWS / GCP / Azure) with provider icon
- Region
- CNI type (e.g., "AWS VPC CNI", "Cilium", "GKE Dataplane V2", "Calico")
- Enforcement level badge: `Cilium Full` (info), `Native Only` (new), `Hybrid with NSG` (medium), `Calico Full` (recommended)
- Illumio Operator status badge: `Connected` (new), `Degraded` (medium), `Disconnected` (high)
- Workload count

**Expansion row:** Clicking a cluster row reveals a namespace tree showing the K8s resource hierarchy: Cluster → Namespaces → resource counts per namespace. Each namespace row shows its Illumio label assignment status (labeled / unlabeled).

**Mock data:** 3 clusters (prod-eks-us-east-1, platform-aks-westus, shared-gke-us-central1) matching the existing demo constants.

---

## Tab 2 — Label Map

**Purpose:** Show how K8s labels bridge to Illumio labels without any in-cluster CRDs or agents.

**Layout:** Two sections stacked vertically.

**Section A — Platform-defined assignments (Container Workload Profile equivalent):**
Table with columns: Namespace, Cluster, Role label, App label, Env label, Loc label. Rows show namespaces with their Illumio label assignments. An "Add assignment" button in the section header.

**Section B — K8s-to-Illumio mapping rules (Platform-side LabelMap equivalent):**
Table with columns: K8s Label Key (fromKey), Illumio Label Type (toKey), Value Map (summary or "pass-through"), Allow Create, Source. A "Add rule" button in the section header.

**Precedence rail:** A numbered horizontal strip at the top of the tab showing:
`1 Platform-defined → 2 Label-map → 3 Annotation → 4 K8s-native`
with the current source highlighted.

**Label source attribution pills** (per REQ-LABEL-06): each label in Section A shows a colored pill indicating source — `platform-assignment` (blue), `label-map` (teal), `annotation` (purple), `k8s-native` (gray). Uses the existing `Pill` component with `labelType` prop.

**Mock data:** 4 mapping rules (app→application, pod-type→role with valuesMap, environ→env, stage→role) plus 4 namespace assignments.

---

## Tab 3 — Inventory

**Purpose:** K8s workloads appear in the same inventory as cloud and on-premises workloads. No separate K8s tab.

**Layout:** Filter bar at top with pill-chips for: K8s Namespace, K8s Cluster, K8s Object Type (Deployment/StatefulSet/DaemonSet/Service), K8s Label (key=value), Illumio App label, Illumio Env label. Unified workload table below.

**Table columns:** Name, Type (K8s Deployment / K8s StatefulSet / VM / Cloud Instance), Cluster/Host, Namespace/Location, App label, Env label, Role label, Enforcement status badge.

**Row types mixed:** Some rows are K8s Deployments (with namespace and cluster), others are traditional workloads (VMs with hostname and location). This visually demonstrates platform unification.

**Detail panel:** Clicking any row opens a right-side slide-in detail panel (using `position: sticky` sidebar pattern from existing demo) showing:
- All Illumio labels with colored source attribution pills
- K8s metadata: namespace, cluster, object type, replica count, container images
- Associated policies (NetworkPolicy from K8s, Illumio policy)
- Traffic flows summary (ingress/egress counts)
- Enforcement status

**Mock data:** 6 K8s workloads + 3 traditional workloads mixed in the same table.

---

## Tab 4 — Map

**Purpose:** Show K8s workloads on the same unified map as all other workloads, with cross-boundary traffic flows.

**Layout:** Dot-grid canvas (same CSS background pattern as existing `mapCanvas`). Map area contains:
- K8s clusters rendered as named rectangular boundary containers (dark border, subtle fill, cluster name badge in top-left)
- Namespaces appear as labeled sub-regions inside each cluster
- Workload nodes (same `mapNode` styling as existing demo) inside namespaces
- On-premises/cloud nodes outside cluster boundaries

**Traffic flows:**
- Green line + arrow = protected (active NetworkPolicy)
- Amber line = exposed (no policy, default-allow)
- Red line = blocked/denied
- Dashed line = cross-boundary K8s ↔ non-K8s

**Group By dropdown** in map header: `Application / Environment` (Illumio labels) or `Namespace / Cluster` (K8s metadata). Changing this re-renders the grouping labels on nodes.

**Legend:** Compact 4-row legend in top-right corner: Protected, Exposed, Blocked, Cross-boundary.

**Mock state:** 2 clusters shown, 3 namespaces with workloads, 2 cross-boundary flows (K8s namespace → on-prem DB, K8s namespace → AWS RDS).

---

## Tab 5 — Policies

**Purpose:** Full policy authoring workspace. Reuses and extends the existing `container-segmentation` pattern.

**Structure:** Same 6 sub-tabs as existing demo: Author | Impact | YAML | Lifecycle | Advisor | Posture.

**Enhancements over existing demo:**

*Author tab:*
- Consumer/Provider selectors include both Illumio labels AND K8s constructs (namespace, deployment, pod label key=value, K8s Service)
- Use case selector at top: Same-cluster namespace isolation / Cross-cluster service access / K8s to cloud resource / K8s to Illumio-labeled workload / Cluster-wide guardrail
- CNI compatibility indicator per rule (warn badge when using Cilium-only features)
- Guardrail pre-flight check: if a guardrail rule would be violated, a blocking callout appears

*Posture tab (significantly expanded):*
- Per-namespace coverage table: namespace, cluster, coverage %, protected workloads, exposed workloads, policies count
- Progress bar per row showing coverage score
- Findings table below: severity badge (High/Medium/Low), namespace/cluster, finding type (Missing isolation / Unrestricted egress / Stale policy / Overlapping policies / Missing DNS exception), suggested remediation action with "Create policy" shortcut

*Policy list at top of tab:*
- Adds "Guardrail Conflict" column with a `Guardrail Conflict` badge variant when violated
- Source attribution column: `Illumio-managed` (new badge) vs `External` (draft badge)

**Policy state lifecycle** (per REQ-LIFE-01): Drafting → Pending Review → Approved → Deploying → Active/Enforced → Failed/Out-of-Sync. Shown in the sidebar lifecycle card.

**Delivery workflows** (per REQ-LIFE-04): Selector in the YAML/review panel for Manual YAML Export / Illumio Operator / Pure GitOps / Illumio + GitOps.

---

## Data Model (Mock Constants)

All TypeScript types defined at top of `page.tsx`:

```ts
type ClusterRow = { name, cloud, region, cni, enforcementLevel, operatorStatus, workloadCount }
type NamespaceAssignment = { namespace, cluster, role, app, env, loc }
type LabelMappingRule = { fromKey, toKey, valuesMap, allowCreate, source }
type WorkloadRow = { name, type, cluster, namespace, appLabel, envLabel, roleLabel, enforcement }
type PolicyFinding = { severity, namespace, cluster, findingType, remediation }
type PostureCoverage = { namespace, cluster, coveragePct, protected, exposed, policyCount }
```

---

## Error Handling & Edge Cases

No real API calls — all state is local. No error states needed beyond what's shown in mock data (Detected drift, Guardrail Conflict, Out-of-Sync).

---

## Verification

1. Run `npm run dev` and navigate to `/demos/agentless-k8s`
2. Verify all 5 tabs render without TypeScript or console errors
3. Verify tab switching works; active tab is highlighted
4. Verify cluster row expansion shows namespace tree
5. Verify inventory row click opens detail panel
6. Verify policy author consumer/provider dropdowns include K8s options
7. Verify posture tab shows per-namespace coverage scores and findings
8. Verify guardrail conflict badge appears in policy list
9. Verify map shows cluster boundary containers with flow lines and legend
10. Check responsive layout at 1200px and 760px breakpoints
