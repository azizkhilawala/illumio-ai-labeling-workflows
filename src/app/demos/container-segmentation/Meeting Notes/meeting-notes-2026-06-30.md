# Kubernetes Policy Flow Discussion

**Meeting Date:** June 30, 2026
**Attendees:** Aziz Khilawala, Nick Sappa (PM)
**FigJam:** https://www.figma.com/board/cnfhK9mnTyLwGf0CkQBZny/Container-Segmentation?node-id=29-79&t=82OEBVpQSWMJZY70-1

---

## Kubernetes Policy Flow Overview

- Overall flow confirmed:
  1. Onboard containers
  2. Ingest container resources (with Kubernetes native labels)
  3. Map Kubernetes labels to Illumio labels (TBD: backend + UI treatment)
  4. Create intent-based policies
  5. Review draft on map view
  6. Export YAML
- Label display in UI: assumed to show as Illumio labels, possibly with special icons in some cases
- Tabs on policies page (Organization, Application, etc.) may be removed

---

## Scope and Policy Types

- Scope is always namespace + cluster (namespaces are not unique across clusters, so cluster context is required)
  - Cluster-wide policy: all workloads in that cluster follow the policy
  - Kubernetes labels or Illumio labels (mapped to Kubernetes resources) can define scope
- Three policy types discussed:
  1. Kubernetes resources to Kubernetes resources using native labels only (single-cluster, no Illumio labels needed)
  2. Kubernetes resources using Illumio labels (not a native network policy; requires Illumio label mapping)
  3. Kubernetes resources to external workloads via IP/CIDR (high policy churn, unlikely to be used in practice)
- Starting focus: single-cluster policy scoped to namespace + cluster

---

## Open Questions and Next Steps

- "Show impact" vs. draft policy view: distinction unclear for Kubernetes
  - Draft mode shows allowed/denied connections on map (simulation)
  - Show impact currently tied to security controls in table format; unclear if applicable to Kubernetes
  - Flagged as a question mark for now
- YAML export flow has multiple forks:
  - Open question: how to track whether a downloaded/edited policy was ever applied, and whether it's still an Illumio-owned policy
- Label mapping (Kubernetes to Illumio) still needs to be determined
- Colleague prototyping a Kubernetes-flavored version of the current policy UI in Claude; may share or discuss tomorrow

---

## Next Steps

- **Prototype Kubernetes policy flow against current UI structure** (Aziz)
  - Build from containers frame to see how Kubernetes scope and labels map to the existing product structure.
- **Clarify "show impact" behavior for Kubernetes**
  - Determine whether the existing show impact feature maps to Kubernetes, or needs a redefined meaning (staging/simulation).
- **Resolve YAML export and provisioning forks**
  - Decide how to handle policy ownership and status tracking when customers download and self-apply YAML outside Illumio.
