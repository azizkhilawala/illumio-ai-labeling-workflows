# Platform Visual Consistency with Clear Differentiation

**Meeting Date:** June 22, 2026

---

The UI and UX for the agentless container solution must follow the same design language, layout patterns, interaction models, and visual style as the rest of the Illumio platform -- so that users moving between K8s and non-K8s workflows experience no additional friction or learning curve. At the same time, the UI must provide clear visual differentiation between traditional workloads/policies (VEN-managed, cloud security groups) and agentless K8s workloads/policies -- through distinct icons, badges, labels, or contextual indicators -- so that users can immediately identify the workload type, enforcement mechanism, and policy scope without ambiguity.

---

## Unified Map

### K8s Resource Hierarchy

Render K8s workloads on the same Map canvas following the hierarchy: Cloud > Region > Account > K8s Cluster > K8s Namespace > Resources. K8s hierarchy must be visually distinct with its own visual boundary, but all interactions (selection, zooming, tooltips) behave identically to non-K8s workloads.

### Dual-Grouping

The Map must support independent Group By controls for K8s and non-K8s portions. Non-K8s may be grouped by Application/Environment while K8s is simultaneously grouped by Namespace/Deployment. The Group By dropdown must include both Illumio label dimensions and K8s metadata dimensions.

### Traffic Flow Visualization

- Cross-boundary traffic (K8s <-> non-K8s) renders as a single flow line
- Color coding: green (allowed), red (blocked), amber (unprotected/default-allow)
- Protected vs. exposed vs. blocked traffic visually differentiated
- Blocked/denied flows show source/destination context, matched rule, and protocol/port

### Draft View

The Map must include a Draft View showing the impact of staged Policy before enforcement -- visualizing how proposed policies would change traffic flows.

---

## K8s-Aware Querying/Filtering

- Add filter keys: K8s Namespace, K8s Cluster, K8s Label (key=value), K8s Object Type
- Add result columns: Namespace, Cluster, K8s Labels
- Queries must span K8s and non-K8s workloads in the same result set

---

## Inventory & Workload Detail

### Unified Inventory with K8s Subsection

K8s workloads appear in the same inventory views as all other workloads -- a query for "App=Payment" returns servers AND K8s Deployments. K8s resources (Deployments, Services, Namespaces, NetworkPolicies) are kept in a dedicated subsection within each inventory section for K8s-specific navigation.

### K8s Filtering & Grouping

- Filter keys: K8s Namespace, K8s Cluster, K8s Object Type, K8s Label
- Group By must support: Application, Environment, Namespace, Cluster

### Workload Detail View

Clicking a K8s workload shows:

- Illumio labels (if mapped)
- K8s labels (always, including unmapped)
- Label source attribution (platform-assignment / label-map / annotation / k8s-native)
- Namespace and cluster context
- Associated policies (K8s NetworkPolicies + Illumio policies)
- Traffic flows (ingress/egress)
- Enforcement status
- Replica count
- Container images
- Service account

---

## Policy Management

### Policy Authoring

Follows Illumio policy model -- must NOT expose raw K8s NetworkPolicy syntax (no podSelector/namespaceSelector).

Dynamic resource discovery:
- K8s labels from live clusters
- Namespaces across all clusters
- Clusters with CNI type/version
- Deployments
- Illumio labels

Protocol selector (TCP, UDP, SCTP), named port support, multi-port per rule, "All Ports".

### Impact Simulation

Draft views in the traffic table and Map combined with a "Show Impact" action that visualizes what traffic would be allowed/blocked by the proposed policy.

### Policy Export

- Download as K8s NetworkPolicy YAML (kubectl apply compatible)
- Save as Illumio policy definition
- Export for GitOps (commit-ready format)

### Policy List

Policies covering K8s clusters and namespaces appear in the same Policy List with the same columns as existing policies. Per-policy per-cluster enforcement status displayed.

### Policy Lifecycle States

Every policy displays a visible lifecycle state badge: Drafting > Pending Review > Approved > Deploying > Active/Enforced > Failed/Out-of-Sync. Must follow the same or similar approach as the current platform.

### Versioning & Rollback

Should follow current approach.

### Deployment Workflow Selection

UI presents workflow options:
- Manual YAML Export
- Illumio Operator
- Pure GitOps (ArgoCD/Flux)
- Illumio + GitOps

---

## Agentless Container as Part of Network Posture

Agentless container must be integrated into the existing Network Posture section as a dedicated widget -- not a separate page or standalone experience. The widget must follow the same concept, layout, and interaction patterns as the existing posture views for traditional policies, including:

- Discovery and display of existing K8s NetworkPolicies with source attribution (Illumio-managed vs. External)
- Coverage analysis (protected vs. exposed workload counts, namespaces with no policies, overly permissive rules, overly restrictive, stale rules, etc.)
- Policy findings with severity and suggested remediation in a properly formatted document
