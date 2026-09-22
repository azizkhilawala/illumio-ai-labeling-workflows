# CLOUD-10389: Agentless Container Network Policy Authoring

**Epic Link:** https://jira.illum.io/browse/CLOUD-10389
**Status:** To Do
**Assignee:** Unassigned
**Reporter:** Nick Sappa
**Created:** May 9, 2025
**Updated:** June 26, 2026

---

## Objectives

- Visibility of existing Network Policies
- Enable Illumio customers running Illumio Agentless containers solution to author Kubernetes-native Network Policies for consistent segmentation across their Kubernetes environment, including complex cross-cluster, multicloud, and hybrid deployments
- Allow Security and Infrastructure teams to create granular Kubernetes network policies without deep expertise in YAML or custom extensions, reducing configuration errors and accelerating policy authoring
- Provide a unified interface to preview, validate, and stage policies before enforcement, helping ensure compliance and minimize risk in production deployments
- Support seamless operation across diverse Kubernetes environments (single-cluster, multi-cluster, hybrid, and cloud)
- Simplify policy management: Define and manage network policies centrally with capabilities for policy staging (dry run) and an intuitive policy builder UI

As a member of the Security or Kubernetes/Cloud Infrastructure team, I want a simple and guided way to create Kubernetes network segmentation policies across single-cluster, multi-cluster, and hybrid environments without needing deep Kubernetes Network Policy expertise. I need to be able to start with basic segmentation and progressively expand to more advanced use cases, while easily creating and previewing ingress and egress rules based on discovered Kubernetes labels, namespaces, clusters, and cloud metadata. The solution must support native Kubernetes NetworkPolicies where applicable and extend them with Illumio constructs (services, Illumio labels, CIDR ranges, and IP lists) for cross-cluster, multicloud, and hybrid scenarios, serving as a prerequisite step before full segmentation enforcement in a follow-on epic.

---

## Key Scope

- Guided UI/wizard for creating policies (single-cluster to start, extend to multi-cluster/hybrid)
- Dynamic discovery and exposure of relevant resources only:
  - Kubernetes labels, namespaces, clusters, deployments/workloads
  - Cloud metadata/tags (e.g., VPC, region, project)
- Support for authoring:
  - Native NetworkPolicy (ingress/egress rules using K8s selectors)
  - Illumio extensions (services, Illumio labels, CIDR ranges, IP lists) for cross-cluster/multicloud/hybrid scenarios
- Real-time preview: YAML view, visual traffic summary/diagram, basic validation
- Output: Download YAML (native) or save as Illumio policy definition (extended)
- CNI compatibility indicators (e.g., warn on Cilium-only features)

---

## Out of Scope (for this Epic)

- Actual enforcement of policies in clusters
- Full bidirectional GitOps sync
- Advanced L7 policy authoring
- Policy conflict detection across clusters

---

## Acceptance Criteria

### Dedicated Kubernetes Network Policy Tab

- Provide a dedicated Kubernetes Network Policy tab within the existing Illumio Policy UI as a focused interface for authoring policies, aligned with existing Illumio UI patterns and designed to avoid unnecessary context switching
  - Policy creation, editing, or enforcement directly from Unified Console views (for example, right-clicking a workload or service to select "Create Policy" or using a "Segment This Application" action) is **out of scope** for this epic and is mentioned only to provide context for future development
- The tab must be a focused workspace scoped exclusively to Kubernetes-related authoring (single-cluster native Kubernetes, multi-cluster connectivity, hybrid/cloud extensions)

### CNI Compatibility

- Network policies must be compatible with the majority of CNIs in the market
- The UI must clearly indicate when a policy is supported only by a specific CNI (e.g., cluster-wide policies using CiliumClusterwideNetworkPolicy are Cilium-only)

### Dynamic Resource Discovery

The policy authoring UI must dynamically discover and expose only relevant resources for selection in rules, including:
- Kubernetes labels
- Namespaces
- K8s Clusters
- Deployments (and other relevant workload types)
- Cloud provider metadata/tags

UI must provide easy selection of sources/destinations based on discovered context (application, workload, namespace, cluster, environment).

### Full Authoring Lifecycle

Authoring UI must support the full authoring lifecycle:
- Create/edit ingress/egress rules
- Perform what-if impact simulation/analysis
- Preview generated YAML
- Download YAML (in native Kubernetes NetworkPolicy format where applicable, or using Illumio-specific policy rules and constructs for cross-cluster, multi-cloud, and hybrid connectivity where native constructs are insufficient)

### Dry-Run / Staging & Impact Visualization

- Dry-run/staging mode simulates enforcement (preview allowed/blocked traffic) in UI Policy Builder
- Direct visualization of results (e.g., updated traffic maps, before/after views, highlighted flows) with clear feedback

### Policy Recommendations

- Must have a Kubernetes policy recommendations option based on observed traffic over selectable time ranges (for example, 12 hours, 24 hours, 3 days, etc.)

### YAML Preview & Editing

- Policies are represented/exportable in standard YAML format (compatible with Kubernetes-native tools like `kubectl apply`) for review, audit, or GitOps integration
- The solution must provide a real-time YAML preview of the generated Kubernetes Network Policy
- The solution must allow users to edit Kubernetes Network Policies via a YAML editor, with all changes automatically reflected in the Dry-Run/Staging environment and the Impact Visualization UI after the policy is saved

### Policy Management

The solution should provide a centralized interface for defining, managing, and auditing Network Policies with the following capabilities:
- Policy status: Active, Draft, etc.
- Versioning and change history
- Rollback to previous policy versions
- Support for draft and active policy states, allowing policies to be staged and reviewed before enforcement

---

## Segmentation Use Cases

Related epic: [CLOUD-15382](https://jira.illum.io/browse/CLOUD-15382)

Must support the following key use cases for segmentation (enforceable via label-based segmentation, native Kubernetes policies, or hybrid enforcement):

1. Cluster-wide policy
2. Kubernetes Namespace (Cluster 1) to Kubernetes Namespace (Cluster 1)
3. Kubernetes Namespace (Cluster 1) to Kubernetes Service (Cluster 2)
4. Kubernetes Namespace to Native cloud resource (using cloud tags, resource names, and metadata such as VPC, subnet)
5. Kubernetes Namespace to Illumio-labeled workload
6. Kubernetes application (label-based) to Native cloud resource
