# Add Policy Modal — Design Spec

**Date:** 2026-07-01
**Scope:** Add Policy modal prototype in the `agentless-k8s` demo, triggered from the Policies tab. Covers policy type selection (Org / App / K8s), name, description, and a scope field that adapts per type.

---

## Context

The existing `agentless-k8s` demo (`src/app/demos/agentless-k8s/page.tsx`) has a Policies tab with a policy list table. This spec adds an "Add Policy" button that opens a modal for creating a new policy. The modal is a self-contained prototype — no real API calls, all state local.

Production reference: Image of Illumio PCE Add Policy modal shows Name, Description, and Scope (label picker). This prototype extends that with a Policy Type selector step.

---

## Architecture

**File changes:**
- `src/app/demos/agentless-k8s/page.tsx` — add modal trigger button + `AddPolicyModal` component (inline, same file pattern)
- `src/app/demos/agentless-k8s/page.module.css` — add option card styles

**Pattern:** Same inline component style as the rest of the demo. No new files. State managed with `useState`.

**Design system imports used:**
- `Modal, ModalHeader, ModalBody, ModalFooter` from `@/design-system`
- `Button, Badge, TextField` from `@/design-system`
- `Icon` from `@/design-system/icons`

No `OptionSelector` for the scope — built as custom pill-chip multi-select using inline CSS to match the demo aesthetic and avoid dependency on OptionSelector's dropdown UX, which is too dense for this prototype context.

---

## Modal Layout

**Size:** `lg` (700px wide)

```
┌─────────────────────────────────────┐
│ Add Policy                        × │
├─────────────────────────────────────┤
│ Policy Type                         │
│ ┌─────────────────────────────────┐ │
│ │ 🛡  Organizational Policy    ◉  │ │  ← blue border when selected
│ │     Enforce baseline rules...   │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ⬡  Application Policy        ○  │ │
│ │     Segment by App/Env/Loc...   │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ☸  Kubernetes Policy          ○  │ │
│ │     Namespace-scoped rules...   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ * Policy Name                       │
│ ┌─────────────────────────────────┐ │
│ │ Enter policy name               │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Policy Description                  │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Policy Scope                        │
│ [scope field — varies by type]      │
│ helper text                         │
├─────────────────────────────────────┤
│                    Cancel  Save →   │
└─────────────────────────────────────┘
```

---

## Option Cards

Three stacked cards, full width, with radio selection semantics.

**Card anatomy:**
- Left: 36×36 blue circle icon container with `Icon` component inside
- Center: bold title + muted description (13px)
- Right: radio dot (CSS circle, filled blue when selected)
- Border: `1px solid #dde3ea` default → `2px solid #2366ed` when selected
- Background: white default → `#f6fbff` when selected

| Card | Icon | Title | Description |
|---|---|---|---|
| 1 | `shield` | Organizational Policy | Enforce baseline rules across all workloads. Scope is always All. |
| 2 | `firewall` | Application Policy | Segment by App, Environment, and Location labels. Controls intra- and cross-group traffic. |
| 3 | `container-storage` | Kubernetes Policy | Namespace-scoped rules for K8s clusters. Supports multi-cluster and multi-namespace selection. |

---

## Policy Scope Field — Per Type

### Organizational Policy

Read-only display. No picker shown.

```
Policy Scope
[ ⊕ All ]   ← gray chip, not clickable
Organizational policies always apply to all workloads.
```

### Application Policy

Multi-select pill-chip picker. Click to toggle. Labels grouped by type.

**Mock options:**
```
App: online-store     App: payments       App: platform-tools
Env: production       Env: staging        Env: development
Loc: aws-us-east-1    Loc: azure-westus   Loc: gcp-us-central1
```

Chips use `Pill` component with `labelType` prop (`app`, `env`, `loc`) for color coding. Selected chips show as filled/active. Unselected are outlined/muted.

Helper text: *Scope determines which workloads this policy's rules are applied to.*

### Kubernetes Policy

Two cascading sections: Cluster picker → Namespace picker.

**Cluster options (multi-select chips):**
```
prod-eks-us-east-1 (AWS)    platform-aks-westus (Azure)    shared-gke-us-central1 (GCP)
```

**Namespace options (multi-select chips, from all clusters):**
```
frontend    backend    payments    observability    shared-services    ingress
```

**Guardrail warning:** If all 3 clusters AND all namespaces are selected, show an amber callout:
> "This policy will apply to every workload across all clusters. Review rules carefully before provisioning."

Helper text: *Select one or more clusters and namespaces. Leave namespaces unselected to apply to all namespaces in the selected clusters.*

---

## State

```ts
type PolicyType = "org" | "app" | "k8s";

// Modal open state on Policies tab
const [addPolicyOpen, setAddPolicyOpen] = useState(false);

// Modal internal state
const [policyType, setPolicyType] = useState<PolicyType>("org");
const [policyName, setPolicyName] = useState("");
const [policyDescription, setPolicyDescription] = useState("");
const [selectedLabels, setSelectedLabels] = useState<string[]>([]);    // app
const [selectedClusters, setSelectedClusters] = useState<string[]>([]); // k8s
const [selectedNamespaces, setSelectedNamespaces] = useState<string[]>([]); // k8s
```

---

## Validation

- **Save button disabled** until `policyName.trim()` is non-empty
- No other required fields — scope is optional in the prototype
- On Save: close modal, reset all state (no actual persistence)

---

## CSS Classes to Add (page.module.css)

```
.optionCard          — base card style
.optionCardSelected  — active state (blue border + bg)
.optionCardIcon      — 36px blue circle container
.optionCardRadio     — right-side radio dot
.optionCardRadioSelected — filled blue dot
.scopeChipGrid       — flex-wrap container for pill chips
.scopeChip           — individual clickable scope chip
.scopeChipActive     — selected state
.readOnlyScope       — gray "All" chip display
.guardrailWarning    — amber callout for K8s all-all selection
```

---

## Trigger

In the Policies tab section header, replace or augment the existing filter rail with an "Add Policy" button (primary, sm):

```tsx
<Button variant="primary" size="sm" onClick={() => setAddPolicyOpen(true)}>
  Add Policy
</Button>
```

---

## Verification

1. "Add Policy" button is visible in the Policies tab header
2. Clicking opens the modal at `lg` size
3. Three option cards render; clicking each selects it (blue border, radio filled)
4. Switching policy types updates the Scope section immediately
5. Org: scope shows read-only "All" chip
6. App: scope shows colored label pills, clicking toggles selection
7. K8s: scope shows cluster chips + namespace chips; selecting all triggers amber warning
8. Save is disabled with empty name, enabled once name is typed
9. Save closes modal and resets state
10. Cancel closes without changes
