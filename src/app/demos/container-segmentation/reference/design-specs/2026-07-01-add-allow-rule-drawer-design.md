# Add Allow Rule Drawer — Design Spec

**Date:** 2026-07-01
**Scope:** A slide-in drawer for authoring a single Kubernetes allow rule, triggered from the "Add Rule" button in the Allow Rules section of the Policies tab (`agentless-k8s` demo). Covers Traffic Direction, Source selector, Destination selector, Port/Protocol, and a live Rule Preview YAML snippet.

---

## Context

The production Illumio PCE rule-writing experience uses an inline table row with six fields: Scope Type, Sources, Source Process/Service, Destinations, Destination Services, Rule Options. For Kubernetes rules, a side drawer is more appropriate because:

1. K8s source/destination selectors (namespace, pod label, CIDR) need more explanation than narrow table columns allow
2. Source Process/Service and Rule Options do not apply to K8s NetworkPolicy and are omitted
3. A live YAML preview gives K8s users confidence in what policy will be generated

The drawer result appears as a new row in the Allow Rules table after saving, maintaining visual parity with the production list view.

**Production field → K8s drawer mapping:**

| Production field | K8s Drawer field | Status |
|---|---|---|
| Scope Type | Traffic Direction (option cards) | Adapted |
| Sources | Source selector (namespace / pod label / all pods / CIDR) | Adapted |
| Source Process/Service | *(omitted)* | Not applicable to K8s |
| → | → (visual arrow) | Kept |
| Destinations | Destination selector (same options as Source) | Adapted |
| Destination Services | Port / Protocol | Direct equivalent |
| Rule Options | *(omitted)* | VEN-only, not applicable |
| — | Rule Preview (new) | K8s addition |

---

## Architecture

**File changes:**
- `src/app/demos/agentless-k8s/page.tsx` — add `AddRuleDrawer` component (inline, same pattern as `AddPolicyModal`); wire "Add Rule" button into PoliciesTab; add new rule to mock `k8sPolicies` array on save
- `src/app/demos/agentless-k8s/page.module.css` — add drawer styles

**Pattern:** Inline component, no new files. State with `useState`. No external dependencies.

**Design system imports added:** No new imports needed — uses `Button`, `Badge`, `Icon` already imported.

---

## Drawer Layout

**Width:** 480px, fixed right edge, full viewport height
**Overlay:** Semi-transparent backdrop (`rgba(0,0,0,0.25)`) behind the drawer; rule table remains visible but dimmed
**Z-index:** Above page content, below any existing modals

```
┌─────────────────────────────────────────┐
│ Add Allow Rule                        × │  ← sticky header
├─────────────────────────────────────────┤
│                                         │
│  TRAFFIC DIRECTION                      │
│  [option cards: Same / Cross namespace] │
│                                         │
│  SOURCE                                 │
│  [selector type toggle]                 │
│  [chip picker / label input / CIDR]     │
│                                         │
│  ──────────  →  ──────────              │
│                                         │
│  DESTINATION                            │
│  [selector type toggle]                 │
│  [chip picker / label input]            │
│                                         │
│  PORT / PROTOCOL                        │
│  [protocol dropdown] [port input]       │
│  [ ] All Ports                          │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  RULE PREVIEW                           │
│  [live YAML code block]                 │
│                                         │
├─────────────────────────────────────────┤
│                    Cancel   Add Rule →  │  ← sticky footer
└─────────────────────────────────────────┘
```

---

## Section 1 — Traffic Direction

Two option cards using the same `.optionCard` / `.optionCardSelected` CSS classes as the Add Policy Modal.

| Card | Icon | Title | Subtitle |
|---|---|---|---|
| Intra-Scope | `shield` | Same Namespace | Traffic between pods within the same namespace boundary. |
| Extra-Scope | `arrow-right` | Cross-Namespace | Traffic from a pod in one namespace to a pod in a different namespace. |

- Default selection: **Same Namespace**
- Selecting Cross-Namespace reveals the External IP option in the Source selector

---

## Section 2 — Source Selector

**Label:** `Source`

Three selector type tabs rendered as pill-toggle buttons:

```
[ Namespace ]  [ Pod Label ]  [ All Pods ]
```

For Extra-Scope only, a fourth tab appears:
```
[ Namespace ]  [ Pod Label ]  [ All Pods ]  [ External IP ]
```

### Namespace mode (default)
Chip grid of available namespaces. Multi-select. Same `.scopeChip` / `.scopeChipActive` pattern.

Mock options: `frontend`, `backend`, `payments`, `observability`, `shared-services`, `ingress`

### Pod Label mode
Key=value pair input:
```
key  [ app              ]  =  value  [ web            ]
                                      + Add selector
```
Multiple selectors can be added (AND logic — all must match).

### All Pods mode
Read-only chip: `All Pods` (gray, same as Org Policy "All" chip pattern)

### External IP mode (Extra-Scope only)
Text input:
```
CIDR  [ 10.32.0.0/16  ]
      e.g. 0.0.0.0/0 for any external source
```

---

## Section 3 — Directional Arrow

Full-width horizontal separator with a centered `→` arrow between Source and Destination sections. Same visual as the flow arrows in the existing map tab.

---

## Section 4 — Destination Selector

Identical field structure to Source selector, with these differences:
- **No External IP tab** — NetworkPolicy destination is always a pod/namespace within the cluster
- If Intra-Scope is selected, namespace chips are pre-filtered to only show the same namespace as the source (or "same namespace" label if none selected yet)

Tabs:
```
[ Namespace ]  [ Pod Label ]  [ All Pods ]
```

---

## Section 5 — Port / Protocol

```
Protocol   [ TCP ▾ ]        options: TCP | UDP | SCTP
Port       [ 443        ]   placeholder: "e.g. 443 or 8080-8090"
```

**All Ports shortcut:**
```
[✓] All Ports   ← when checked, protocol and port fields are disabled
```

**Mock named port examples shown as quick-select chips below the input:**
```
Suggested:  [ HTTPS 443 ]  [ HTTP 80 ]  [ MySQL 3306 ]  [ DNS 53 UDP ]
```
Clicking a chip fills the protocol + port fields.

---

## Section 6 — Rule Preview

A live read-only code block that regenerates as the user changes any field. Displays the Kubernetes NetworkPolicy YAML that would be created.

**Header:** `Rule Preview` with a `Copy` button (ghost, sm) on the right.

**Example output (Intra-Scope, namespace=frontend→backend, TCP 443):**
```yaml
# Allow Rule — Same Namespace
podSelector:
  matchLabels: {}
ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: frontend
    ports:
      - protocol: TCP
        port: 443
```

**Example output (Extra-Scope, pod label source, All Ports):**
```yaml
# Allow Rule — Cross-Namespace
podSelector:
  matchLabels: {}
ingress:
  - from:
    - namespaceSelector: {}
      podSelector:
        matchLabels:
          app: web
```

**Empty state** (before any field is filled):
```
Select Traffic Direction, Source, and Destination
to preview the generated NetworkPolicy YAML.
```

---

## State

```ts
type TrafficDirection = "intra" | "extra";
type SourceMode = "namespace" | "podlabel" | "allpods" | "cidr";
type DestMode = "namespace" | "podlabel" | "allpods";

// Drawer open state (inside PoliciesTab)
const [addRuleOpen, setAddRuleOpen] = useState(false);

// Drawer internal state
const [direction, setDirection] = useState<TrafficDirection>("intra");
const [sourceMode, setSourceMode] = useState<SourceMode>("namespace");
const [selectedSourceNs, setSelectedSourceNs] = useState<string[]>([]);
const [sourcePodLabels, setSourcePodLabels] = useState<{key:string; value:string}[]>([{key:"",value:""}]);
const [sourceCidr, setSourceCidr] = useState("");
const [destMode, setDestMode] = useState<DestMode>("namespace");
const [selectedDestNs, setSelectedDestNs] = useState<string[]>([]);
const [destPodLabels, setDestPodLabels] = useState<{key:string; value:string}[]>([{key:"",value:""}]);
const [protocol, setProtocol] = useState("TCP");
const [port, setPort] = useState("");
const [allPorts, setAllPorts] = useState(false);
```

---

## Validation

- **Add Rule enabled** when: at least one Source selection + at least one Destination selection is made
- Port field: only required when "All Ports" is unchecked
- CIDR input: basic pattern match `/^\d+\.\d+\.\d+\.\d+\/\d+$/`

---

## On Save

1. Close drawer, reset all state
2. Append a new row to the `k8sPolicies` mock array:
   - name: auto-generated from source+dest (e.g. `frontend-to-backend-tcp443`)
   - cluster: `prod-eks-us-east-1` (first cluster, mock)
   - namespace: destination namespace(s)
   - state: `"Drafting"`
   - guardrailConflict: false
   - attribution: `"Illumio-managed"`

---

## Trigger

In PoliciesTab, replace the existing `filterRail` "Add Rule" placeholder (if any) or add a new button in the Allow Rules section header:

```tsx
<Button
  variant="primary"
  size="sm"
  leftIcon={<Icon name="circle-plus" size={16} />}
  onClick={() => setAddRuleOpen(true)}
>
  Add Rule
</Button>
```

---

## CSS Classes to Add

```
.drawer              — fixed right panel, 480px wide, full height, white bg, shadow
.drawerBackdrop      — full-screen overlay behind drawer
.drawerHeader        — sticky top bar with title + close button
.drawerBody          — scrollable middle section with padding
.drawerFooter        — sticky bottom bar with Cancel + Add Rule
.drawerSection       — labeled section block (gap + label + content)
.drawerSectionLabel  — uppercase 11px muted label
.selectorTypeTabs    — pill toggle group for Namespace/Pod Label/All Pods
.selectorTypeTab     — individual tab pill button
.selectorTypeTabActive — selected state
.podLabelRow         — key=value pair row with remove button
.portRow             — protocol + port side by side
.quickPortChip       — suggested port shortcut chip
.rulePreviewBlock    — dark code block for YAML preview
.directionArrow      — centered → separator between source and destination
```

---

## Verification

1. "Add Rule" button appears in the Allow Rules section header of the Policies tab
2. Clicking opens the 480px drawer from the right; backdrop dims the rule table
3. Traffic Direction cards work — selecting Cross-Namespace reveals External IP tab in Source
4. Namespace mode: clicking namespace chips toggles selection (blue active state)
5. Pod Label mode: key+value inputs appear; "Add selector" adds a second row
6. All Pods mode: read-only gray chip shown
7. Destination selector mirrors Source behavior; no External IP tab
8. Port quick-select chips fill protocol + port fields
9. All Ports checkbox disables port + protocol fields
10. Rule Preview YAML updates live as any field changes
11. Add Rule button disabled until Source + Destination have at least one selection
12. Saving closes drawer, resets state, and appends a new Drafting row to the policy table
13. Cancel closes drawer without changes
14. No TypeScript errors
