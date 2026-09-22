# CLOUD-15374: Unified Console Visibility for Kubernetes Resources

**Epic Link:** https://jira.illum.io/browse/CLOUD-15374
**Status:** To Do
**Assignee:** Unassigned
**Reporter:** Nick Sappa
**Created:** February 10, 2026
**Updated:** June 26, 2026

---

## Objectives

- Provide clear, real-time visibility into Kubernetes environments directly within the Illumio Unify Console so Security and Infrastructure teams can understand Kubernetes infrastructure, network traffic patterns, dependencies, and communication flows without leaving the console or applying special handling
- Ensure Kubernetes agentless workloads are represented using the same underlying data model as traditional workloads in the Unify Console, following Illumio's core platform approach of unified, consistent representation across all workload types
- Deliver intuitive, visual representations (traffic maps, flow diagrams, application dependency graphs) that treat Kubernetes resources as first-class citizens with no Kubernetes-specific deviations in user experience, grouping, filtering, or interaction patterns
- Separate Kubernetes/container-specific infrastructure visually on the map only for clarity, while preserving full parity in behavior, data model, and console mechanics with traditional workloads
- Provide built-in visibility for agentless Kubernetes environments as a foundation for future policy, enforcement, and compliance features, without creating separate Kubernetes-only workflows

As a Security or Kubernetes/Cloud Infrastructure team member, I want agentless Kubernetes containers and workloads to appear and function in the Illumio Unify Console exactly like traditional workloads (VMs, cloud instances), so that I can manage, investigate, and secure my entire hybrid environment using the same console views, grouping mechanisms, filters, and navigation patterns -- with no special Kubernetes-only handling, tabs, or separate experiences required.

---

## Acceptance Criteria

1. Represent Kubernetes workloads in the Unified Console using **native Kubernetes labels**, without directly mapping them to Illumio labels, while preserving all existing Illumio platform capabilities such as policy authoring, enforcement, visibility, and compliance reporting
   - Kubernetes labels (e.g., `app: billing`) must be searchable and groupable in the Unified Console alongside traditional Illumio labels (e.g., `Role: Web`) without a manual mapping step

2. No Kubernetes-specific tabs, sections, modes, or handling required -- all interactions use existing console patterns

3. The "Workload" data object must be extended to support K8s attributes (Namespace, Cluster, Deployment) as standard metadata fields, ensuring existing UI components (Tables, Lists) can render them

4. Map shows Kubernetes in a visually separated segment/layer, but selection, zooming, clicking, tooltips, and actions behave identically to VMs/cloud instances

5. The map must render traffic flows between K8s pods and non-K8s workloads (VMs/Cloud Instances)

6. Existing Group By mechanisms fully support Kubernetes workloads (e.g., by Application, Environment, Role)

7. New filter keys must be added to the Standard Filter Bar and behave exactly like existing filters:
   - K8s Resource Name
   - K8s Object Type (Deployment, Namespace, multi-type)
   - K8s Cluster ID/Name
   - K8s Namespace Name
   - K8s Label

8. Filtering/grouping works uniformly across Kubernetes and traditional workloads -- no separate panels or silos
