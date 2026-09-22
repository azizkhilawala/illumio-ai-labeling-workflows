# Design Brief: Agentless Container Network Policy Authoring

**Confluence:** https://confluence.illum.io/spaces/UXD/pages/447166204
**Epic:** [CLOUD-10389](https://jira.illum.io/browse/CLOUD-10389) -- Agentless Container Network Policy Authoring
**UXD Spike:** [UXD-4235](https://jira.illum.io/browse/UXD-4235) -- Understand Containers Epic
**Reporter:** Nick Sappa | **Designer:** Aziz Khilawala
**Status:** Spike / Discovery
**Last Updated:** 2026-06-01

---

## 1. Problem Statement

Illumio customers running the Agentless Containers solution currently have **no dedicated, Kubernetes-native way to author network policies** within the Illumio UI. Today, Illumio CloudSecure provides container traffic **visibility** (Cloud Map) and can **enforce** policies, but policy creation relies on Illumio's general policy model -- which was not designed specifically for Kubernetes constructs like namespaces, labels, and selectors.

Security and Infrastructure teams need to create granular Kubernetes network policies **without deep expertise in YAML** or Kubernetes internals. They need a guided, visual experience that reduces configuration errors and accelerates policy authoring across single-cluster, multi-cluster, and hybrid deployments.

---

## 2. Background: Kubernetes Basics

### What is Kubernetes?

Kubernetes (K8s) is an orchestration platform that manages containerized applications across many machines. Think of it as a restaurant kitchen manager -- it decides which machine runs which application, restarts failed ones, and scales up when demand increases.

### Key Concepts

| Concept | Simple Explanation |
| --- | --- |
| **Cluster** | The entire infrastructure -- all machines, networking, and storage grouped together |
| **Node** | A single machine (physical or virtual) that runs applications |
| **Pod** | The smallest unit -- wraps one or more containers sharing a network address |
| **Namespace** | A logical partition (like a neighborhood) so different teams/environments don't collide |
| **Deployment** | Ensures the right number of pods are always running |
| **Service** | Provides a stable address so traffic reaches the right pods |
| **Labels** | Key-value tags on resources (e.g., `app: frontend`, `env: production`) used to connect everything |
| **Network Policy** | A firewall rule defining which pods can communicate -- by default, all pods can talk to all pods |
| **CNI** | Container Network Interface -- the networking plugin (Cilium, Calico, etc.) that actually enforces policies |
| **YAML** | The plain-text configuration format Kubernetes uses to define resources |
| **Ingress** | Rules about who can send traffic INTO a pod (incoming) |
| **Egress** | Rules about where a pod can send traffic OUT TO (outgoing) |

---

## 3. What Illumio Has Today vs. What's Needed

### Current State (Illumio CloudSecure -- Agentless Containers)

- **Visibility:** Cloud Map shows pod-to-pod, service-to-service, and namespace-aware traffic
- **Enforcement:** Cloud-operator converts Illumio policies into native Kubernetes NetworkPolicies
- **Agentless:** Lightweight operator at cluster level -- no software inside individual pods
- **Supported platforms:** EKS, AKS, GKE, OpenShift, Oracle OKE

### Gap (What's Missing)

- No dedicated Kubernetes Network Policy authoring UI
- No guided wizard/builder for creating policies visually
- No real-time YAML preview or inline YAML editor
- No dry-run / simulation capability ("what happens if I enforce this?")
- No impact visualization (before/after traffic views)
- No policy recommendations based on observed traffic
- No policy lifecycle management (draft/active states, versioning, rollback)
- No YAML export for kubectl/GitOps workflows
- No CNI compatibility warnings

---

## 4. Target Users

| Persona | Description | Key Need |
| --- | --- | --- |
| **Security Team** | Defines segmentation policies, ensures compliance | Guided policy creation without Kubernetes expertise, compliance validation |
| **Kubernetes/Cloud Infrastructure Team** | Manages clusters, deploys workloads | YAML preview/edit, CNI compatibility info, GitOps-friendly export |
| **Platform Engineering** | Oversees multi-cluster environments | Cross-cluster policies, centralized management |

---

## 5. Scope of Work

### In Scope (This Epic)

#### 5.1 Policy Authoring Wizard/Builder

- Guided step-by-step flow for creating network policies
- Dynamic discovery of Kubernetes resources (labels, namespaces, clusters, deployments, cloud metadata)
- Source/destination selection based on discovered context
- Progressive disclosure: simple single-cluster -> advanced multi-cluster/hybrid

#### 5.2 Policy Lifecycle Management

- Centralized policy list/table with status (Draft, Active)
- Versioning and change history
- Rollback to previous versions
- Policy editing capabilities

#### 5.3 Preview, Validation & Dry-Run

- Real-time YAML preview panel (updates as user builds visually)
- Inline YAML editor with bidirectional sync to visual builder
- Dry-run simulation: preview allowed/blocked traffic before enforcement
- Impact visualization: before/after traffic views, highlighted flows
- CNI compatibility indicators (warn on CNI-specific features)

#### 5.4 Policy Recommendations

- Suggest policies based on observed traffic over selectable time ranges (12h, 24h, 3 days)
- Review, modify, and approve recommendations

#### 5.5 Output & Export

- Download YAML in native Kubernetes NetworkPolicy format
- Save as Illumio policy definition for extended/hybrid scenarios
- Compatible with kubectl apply and GitOps workflows

#### 5.6 Segmentation Use Cases

| # | Use Case | Description |
| --- | --- | --- |
| 1 | Cluster-wide policy | Blanket rule for entire cluster (e.g., deny all by default) |
| 2 | Namespace to Namespace (same cluster) | Frontend neighborhood can talk to backend neighborhood |
| 3 | Namespace to Service (cross-cluster) | Frontend in Cluster A talks to payments in Cluster B |
| 4 | Namespace to Cloud resource | Backend talks to AWS RDS database |
| 5 | Namespace to Illumio-labeled workload | Backend talks to a VM managed by Illumio Core |
| 6 | App to Cloud resource | Anything labeled `app: orders` can talk to S3 bucket |

### Out of Scope

- Actual enforcement of policies in clusters
- Full bidirectional GitOps sync
- Advanced L7 policy authoring
- Policy conflict detection across clusters
- Policy creation from Unified Console views (right-click actions)

---

## 6. Key UX Challenges

### 6.1 Progressive Disclosure in the Policy Builder

**Challenge:** The wizard must serve both simple use cases (single-cluster, namespace-to-namespace) and complex ones (cross-cluster, hybrid with Illumio extensions) without overwhelming users.
**Approach to explore:** TurboTax-style simple/expert modes, or a linear wizard that reveals complexity only when selected resources require it.

### 6.2 Bidirectional YAML <-> Visual Builder Sync

**Challenge:** Changes in the visual builder update the YAML preview, AND edits in the YAML editor update the visual builder. Invalid YAML must be handled gracefully.
**Approach to explore:** One-way sync (visual -> YAML) with a manual "apply" action for YAML -> visual, with validation errors shown inline.

### 6.3 Dry-Run Impact Visualization

**Challenge:** Showing "what would happen" requires comparing proposed policies against actual observed traffic. The before/after view must be immediately understandable.
**Approach to explore:** Traffic flow diff view -- green (newly allowed), red (would be blocked), gray (unchanged). Similar to code diff patterns.

### 6.4 Native vs. Illumio Extensions

**Challenge:** Users need to understand when they're within standard Kubernetes capabilities vs. when they need Illumio-specific constructs for cross-cluster/hybrid scenarios.
**Approach to explore:** Clear visual indicators and contextual messaging when the user's policy requires Illumio extensions, with explanation of what this means for export format.

### 6.5 Policy Recommendation Trust

**Challenge:** Users need to trust AI/automated recommendations. Transparency about why a recommendation was made is critical.
**Approach to explore:** Show traffic evidence for each recommendation (e.g., "1,247 flows observed in last 24h between namespace A and B").

### 6.6 CNI Compatibility

**Challenge:** Not all CNI plugins support all features. Users may not know which CNI their clusters use.
**Approach to explore:** Auto-detect CNI from cluster metadata, surface warnings inline when a feature is CNI-specific (e.g., cluster-wide policies are Cilium-only).

---

## 7. Competitive Reference

| Tool | Strengths | Gaps |
| --- | --- | --- |
| **Cilium Network Policy Editor** (editor.networkpolicy.io) | Visual policy builder, real-time YAML | No traffic visibility, no simulation |
| **Cilium Hubble UI** | Live traffic dependency graph | Read-only, no policy editing |
| **Calico Enterprise** | Tiered policies, staged dry-run, service graph | Calico-only, expensive |
| **Calico Policy Recommendations** | Traffic-based policy suggestions | Calico ecosystem only |

**Market gap:** No tool combines visual building + traffic recommendations + live simulation + YAML export in a single integrated UI. This is Illumio's opportunity.

---

## 8. Design Deliverables

| Phase | Deliverable |
| --- | --- |
| **Spike (UXD-4235)** | UX challenge summary, user flow map, PM/Eng questions, effort assessment |
| **Discovery** | User research, competitive analysis deep-dive, information architecture |
| **Design** | Wireframes -> high-fidelity mockups -> interactive prototype |
| **Validation** | Usability testing with target personas |
| **Handoff** | Annotated specs, design tokens, component documentation |

---

## 9. Figma Design

| Asset | Link |
| --- | --- |
| **UXD Spike Presentation** | [Containers Network Policy UXD Spike -- Figma Slides](https://www.figma.com/slides/UjDtPIdwxDley0gV0qbGDk) |

---

## 10. Resources & References

### Meeting Recordings

| Meeting | Attendees | Link |
| --- | --- | --- |
| **Containers Epic Kickoff** | Kevin, Radhika, Tina, Nick Sappa | [Zoom Recording](https://illumio.zoom.us/rec/share/nbVydvTfv48oEmfGIuNI_ewXovMQyU0Mh5fJtN7nHLU0rWQ80mzm-CfihMy_OEwc.9qS8B7ZGnFgDb5DJ) (Passcode: Z.cbk588) |

### Learning Resources

| Resource | Description |
| --- | --- |
| [Kubernetes Network Policy Explained (YouTube)](https://youtu.be/AFlqEGPB3f4?si=oti-wUjKZ4nV0Grc) | Video walkthrough of Kubernetes network policies |
| [Red Hat ACS Workshop -- Network Graph](https://redhat-scholars.github.io/acs-workshop/acs-workshop/06-network_graph.html) | Hands-on workshop showing network graph visualization in Red Hat Advanced Cluster Security -- useful competitive/UX reference |
| [Cilium Network Policy Editor](https://editor.networkpolicy.io/?id=wEhq8iYElYXzA6g3) | Interactive visual network policy builder -- the closest existing UX reference for our policy builder |

### Product Documentation

| Resource | Description |
| --- | --- |
| [Illumio Agentless Containers Overview](https://product-docs-repo.illumio.com/Tech-Docs/CloudSecure/out/en/get-started/agentless-containers-overview.html) | Official Illumio documentation for the agentless containers solution |

---

## 11. Open Questions for PM/Engineering

1. What is the priority order of the 6 segmentation use cases?
2. Is there a phased rollout plan (single-cluster first, then multi-cluster)?
3. Which CNIs are must-support vs. nice-to-have?
4. How does the new K8s Network Policy tab relate to the existing Policy page in CloudSecure?
5. What traffic data is available for dry-run simulation? Is it real-time or historical?
6. Are there API constraints that limit what the YAML editor can support?
7. What is the target release timeline?
8. Will the policy recommendations use ML/AI or rule-based heuristics?

---

## 12. Key Links

- **Epic:** [CLOUD-10389 -- Agentless Container Network Policy Authoring](https://jira.illum.io/browse/CLOUD-10389)
- **UXD Spike:** [UXD-4235 -- Understand Containers Epic](https://jira.illum.io/browse/UXD-4235)
- **Figma Slides:** [Containers Network Policy UXD Spike](https://www.figma.com/slides/UjDtPIdwxDley0gV0qbGDk)
- **Illumio CloudSecure Docs:** [Agentless Containers Overview](https://product-docs-repo.illumio.com/Tech-Docs/CloudSecure/out/en/get-started/agentless-containers-overview.html)
- **Competitive Reference:** [Cilium Network Policy Editor](https://editor.networkpolicy.io/)
