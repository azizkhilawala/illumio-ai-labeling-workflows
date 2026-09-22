# CLOUD-15382: Agentless Kubernetes Segmentation Enforcement

**Epic Link:** https://jira.illum.io/browse/CLOUD-15382
**Status:** In Progress
**Assignee:** Kunal Gandhi
**Reporter:** Nick Sappa
**Created:** February 10, 2026
**Updated:** June 30, 2026

---

## Objectives

- Deliver true agentless enforcement of network segmentation for Kubernetes workloads with zero agents installed in pods/containers or on cluster nodes
- Rely primarily on CNI capabilities, native Kubernetes NetworkPolicies, and -- when necessary -- cloud provider security groups (AWS Security Groups, Azure NSGs, GCP Firewall Rules) to enforce policies
- The solution must support a phased rollout of segmentation with real-time visibility across the entire lifecycle, including policy authoring, policy translation into enforcement artifacts, simulation/staging with impact preview, and enforcement
- The solution must work across major managed Kubernetes platforms and self-managed clusters while remaining fully agentless

---

## Use Cases

### Persona 1: The Security Administrator

**Use Case 1: Cluster-wide Global Guardrail**
Scenario: Ensure that all pods in the cluster, regardless of who created them, are forbidden from reaching the public internet by default.

**Use Case 2: K8s Namespace to Illumio-labeled Workload**
Scenario: A microservice in K8s needs to pull data from a legacy Oracle database running on a bare-metal server managed by Illumio.

**Use Case 3: K8s Namespace to Native Cloud Resource (Egress)**
Scenario: A production microservice in the `payments` namespace needs to connect to an AWS RDS instance or an Azure SQL database without using hardcoded, static IP whitelists.

**Use Case 3.1: Namespace (C1) Pod Label `Admin` to K8s Service (C2)**
Scenario: From the "Management" cluster, only pods with the specific label `admin` are permitted to reach a "Maintenance" service in the Production cluster, where the "Maintenance" service is exposed as a NodePort or LoadBalancer service to allow controlled cross-cluster communication from the labeled pods.

**Use Case 4: Agentless Cloud-Native Policy Enforcement**
Scenario: Enforce pre-authored (approved) segmentation policies on live Kubernetes clusters in a fully agentless, Kubernetes, and cloud-native manner, so that critical container infrastructure can be segmented to prevent lateral movement.

**Use Case 5: CNI-Confirmed Policy Status & Visibility**
Scenario: Verify in a central UI that security policies are not just "pushed" but are actually "active" and enforced by the CNI.

**Use Case 6: Automated Security Guardrail Conflict Resolution**
Scenario: The system must prevent policy drift by blocking any workload-level policy that conflicts with organizational security guardrails. The system must perform a pre-flight check before enforcement, and if a conflict is detected, the policy must not move to Enforce and must return a "Guardrail Conflict" error status.

**Use Case 7: Policy Coverage Visualization**
Scenario: Visually differentiate between "Protected" traffic (governed by a policy) and "Exposed" traffic (flowing by default) to prioritize where new rules are needed.

---

### Persona 2: Kubernetes/Cloud Platform Infrastructure Team Member

**Use Case 1: K8s Namespace (Cluster 1) to K8s Service (Cluster 2)**
Scenario: The "Payment Service" in Cluster A must reach the "Ledger Service" in Cluster B across different regions, where the "Ledger Service" is exposed as a NodePort or LoadBalancer service to enable external access from Cluster A.

**Use Case 2: Namespace (C1) Pod Label `Admin` to K8s Service (C2)**
Scenario: From the "Management" cluster, only pods with the specific label `admin` are permitted to reach a "Maintenance" service in the Production cluster, where the "Maintenance" service is exposed as a NodePort or LoadBalancer service to allow controlled cross-cluster communication from the labeled pods.

**Use Case 2.1: Service Account (C1) to Service Account (C2)**
Scenario: TBD

**Use Case 3: Pod to Kubernetes API Server Isolation**
Scenario: Restrict API server access (port 6443) only to pods that explicitly require it. By default, every pod can "talk" to the K8s API server. A compromised pod can use its service account token to query the cluster for other secrets.

**Use Case 4: Host Network Isolation**
Scenario: System-level pods requiring `hostNetwork: true` (sharing the node's IP) must be restricted from accessing the internal pod-to-pod virtual network to prevent an attacker from using a compromised node-level service to "hop" into private application traffic.

**Use Case 5: Native CNI Enforcement**
Scenario: As a platform owner, the system must utilize the installed CNI to enforce segmentation so there is no longer a need to rely on proprietary privileged agents running on infrastructure. CNIs to support:
- AWS VPC CNI
- GKE Dataplane V2
- Azure CNI Powered by Cilium
- Cilium
- OpenShift OVN
- Calico

**Use Case 6: Multi-CNI Network Policy Compatibility**
Scenario: Ensure teams can create and enforce native Kubernetes NetworkPolicies that work consistently across clusters running different CNIs (such as Cilium or Calico), without needing to rewrite or adjust policies for each environment.

**Use Case 7: Apply & Distribute Network Policies Across Multiple Clusters**
Scenario: A fintech company operates 38 Kubernetes clusters across AWS EKS, Google GKE, and on-prem OpenShift. They must comply with a PCI control requiring that all payment-service workloads (Kubernetes labels: `app=payment-service`, `env=prod`) deny all outbound traffic except to approved internal databases (namespace: `db`, port: `5432`).

---

### Persona 3: The App Owner / Developer

Focus: Application functionality and micro-segmentation within their own domain.

**Use Case 1: Namespace to Namespace (Same Cluster)**
Scenario: Within the same cluster, workloads in the "frontend-ns" namespace must be able to communicate with services in the "backend-ns" namespace.

**Use Case 2: Namespace to Namespace with Label Filtering (Same Cluster)**
Scenario: Within the same cluster, only workloads in the "frontend-ns" namespace that have a specific label (such as `app: api-client`) must be able to communicate with workloads in the "backend-ns" namespace that match an exact label (such as `app: api-server`).

**Use Case 3: K8s Application (Label-based) to Native Cloud Resource**
Scenario: A pod labeled `app: report-gen` needs access to an AWS S3 Bucket, but no other pods in that same namespace should have that permission.

**Use Case 3.1: Multiple CIDR Support**
Scenario: Explore the best manner to support multiple (but finely tuned) CIDR ranges for a given policy, as an alternative approach due to limited FQDN capabilities.
- Investigate native CNI support for multiple CIDRs (e.g., arrays, CIDRgroup resource, etc.)
- Investigate the creation of CRD for multiple CIDRs

---

## Acceptance Criteria

1. No agents or privileged components are deployed in pods or on nodes during enforcement
2. Native NetworkPolicy authored policies are correctly applied as Kubernetes API objects in target namespaces/clusters
3. Network Policy must be enforced within 5 minutes after the user clicks **Apply Policy** in a supported cluster, and confirm that the NetworkPolicy object has been created and is associated with the correct pods
4. Illumio-extended policies are translated and enforced using CNI, native K8s, or cloud security groups as appropriate per cluster
5. Blocked/denied flows appear in the UI with source/destination context, matched rule, and policy name
6. Must support Policy Impact feature to simulate the effect of a new or modified K8s Network Policy before it is applied, showing which workloads, services, or traffic flows would be affected, blocked, or allowed
7. Should have Policy enable/disable and rollback capabilities
8. Must provide UI Alerts for failures or partial enforcement issues
9. Must provide clear per-cluster enforcement level indicators (e.g., "Cilium full", "Native only", "Hybrid with NSG")
10. The policy page displays the policy statuses in a separate field:
    - **Applied:** Policy has been successfully pushed and applied
    - **Pending:** Changes not yet fully provisioned/applied to workloads or enforcement points
    - **Error:** Provisioning failed (due to conflicts, CNI issues, or API errors etc)
    - **Approved / Not Approved**
11. Display warnings for CNI partial support
12. Enforcement can be rolled back or disabled without residual changes
13. Must support the following operational workflows for enforcing network segmentation (in priority order):
    1. **Manual YAML Export Workflow:** UI Illumio (Authoring) -> Download .yaml -> kubectl apply
    2. **Illumio Orchestrated Enforcement Workflow:** UI Illumio (Authoring) -> Illumio Operator -> CNI
    3. **Pure GitOps Sync (ArgoCD/Flux):** UI Illumio (Authoring) -> Git Commit -> ArgoCD Sync -> K8s API
    4. **Illumio + GitOps Source of Truth:** UI Illumio (Authoring) -> Git (Truth) -> ArgoCD -> Native CNI (Enforcement)
14. The product must provide basic drift detection for each Network Policy:
    - First iteration: presented as a visual indicator
    - Second iteration: introduce Active Reconciliation -- if the policy is deleted or modified manually, have an option to "Auto-Remediate" (re-apply the desired state)

---

## Supported Documentation

- Agentless Containers Segmentation Milestones: https://confluence.illum.io/x/DKCNGQ
- Engineering Task Breakdown for Agentless Containers Segmentation: https://confluence.illum.io/x/MoqjGg
