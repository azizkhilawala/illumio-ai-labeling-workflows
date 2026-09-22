# Illumio Core: How Policy Works (UXD Reference)

**Confluence:** https://confluence.illum.io/spaces/UXD/pages/447167527
**Purpose:** UXD reference guide for understanding how the existing Illumio Core policy model works -- relevant context for designing the new Kubernetes Network Policy Authoring experience (CLOUD-10389).
**Author:** Aziz Khilawala
**Last Updated:** 2026-06-02

---

## The Big Picture

Illumio Core uses an **allow-list model**: all traffic is denied by default, and users explicitly define what is allowed. Think of it as -- everything is locked, and you hand out specific keys.

**Visualize traffic (Illumination) -> Label workloads -> Write rules (Draft) -> Preview impact -> Provision (Active) -> Enforce gradually**

---

## Step 1: Label Your Workloads -- The RAEL Model

Before writing any rules, every workload (server or VM) gets classified with four labels. This is called the **RAEL model**:

| Label | What it means | Example values |
| --- | --- | --- |
| **R**ole | What the workload does | Web, Database, API, Cache |
| **A**pplication | Which app it belongs to | HRM, ERP, Payment |
| **E**nvironment | Lifecycle stage | Production, QA, Development |
| **L**ocation | Where it lives | US-East, AWS-EU, On-Prem |

Labels are assigned in the PCE UI at **Servers & Endpoints -> Workloads -> Edit -> Label Assignment**, or automatically during VEN onboarding via pairing profiles. Newer versions also support **Flexible Labels** beyond the four RAEL dimensions.

### Why this matters for CLOUD-10389

- **Illumio labels** for hybrid and cross-cluster scenarios
- **K8s-native labels** for within-cluster policies

---

## Step 2: Visualize Traffic -- The Illumination Map

Before writing any rules, users open the **Illumination Map** -- Illumio's real-time traffic visualization tool.

| Color | Meaning |
| --- | --- |
| **Green** | Traffic allowed by an existing rule |
| **Red** | Traffic with no allowing rule (blocked under enforcement) |
| **Orange** | No rule exists but not currently blocked (enforcement not fully on) |

Two views:

- **Reported view** -- actual current state as reported by VENs
- **Draft view** -- shows the impact of pending rule changes in real time

Users can **click directly on a traffic line to create a rule** from the map -- this is Illumio's "see-then-secure" workflow.

---

## Step 3: Create a Ruleset

A **Ruleset** is a container for rules. It has two parts:

1. **Scope** -- which workloads this ruleset applies to, defined by Application + Environment + Location labels
2. **Rules** -- what traffic is explicitly allowed within and across that scope

### Step-by-step in the UI

1. Navigate to **Policy -> Rulesets & Rules**
2. Click **"Add"**
3. Name the ruleset (e.g., "HRM Production Rules")
4. Define the **scope** -- select Application, Environment, and Location labels
5. Save -- the Scopes and Rules tab appears
6. Click **"Add Rule"** and choose:
   - **Intra-Scope Rule** -- communication within the same group
   - **Extra-Scope Rule** -- communication from outside the group into it
7. For each rule, define:
   - **Consumers** -- who initiates the connection (source)
   - **Providers** -- who receives the connection (destination)
   - **Providing Service** -- port/protocol (e.g., TCP 443, TCP 3306)
8. Save -- the rule enters **Draft** state

### Scope Label Flexibility

Scope labels are **not all mandatory**. Each of the three dimensions (Application, Environment, Location) can be set to either a specific label or **All** (wildcard).

| Scope setting | What it covers |
| --- | --- |
| App = HRM, Env = Production, Loc = US-East | Only HRM workloads in Production in US-East |
| App = HRM, Env = Production, Loc = **All** | All HRM Production workloads regardless of location |
| App = HRM, Env = **All**, Loc = **All** | All HRM workloads in any environment, any location |
| App = **All**, Env = Production, Loc = **All** | Every workload in Production, across all apps and locations |
| App = **All**, Env = **All**, Loc = **All** | Every single managed workload (very broad -- use with caution) |

### Mapping Illumio Core concepts to Kubernetes

| Illumio Core | Kubernetes Equivalent |
| --- | --- |
| Consumer | Ingress "from" -- who can send traffic in |
| Provider | The pod the policy targets |
| Providing Service | Port / protocol |
| Scope (App + Env + Location) | Namespace + label selectors |
| Scope dimension set to "All" | Wildcard selector (e.g., all namespaces) |
| Intra-scope rule | Namespace-to-namespace (same cluster) |
| Extra-scope rule | Cross-cluster or hybrid policy |
| Ruleset | Network Policy object |

---

## Step 4: Draft vs. Active -- Two-Stage Provisioning

| State | What it means |
| --- | --- |
| **Draft** | Changes are saved but have zero effect on real traffic. Safe to edit, preview, and delete. |
| **Active** | Rules are pushed to workloads and enforced. Only happens when you explicitly Provision. |

### The provisioning flow

1. After saving rules, click the **"Provision"** button in the toolbar
2. A **"Draft Changes"** page shows all pending additions, modifications, and deletions
3. Review what will change
4. Click **"Provision"** to activate
5. Each provision is saved as a **numbered version** with a timestamp -- full audit trail and rollback support

---

## Step 5: Provision Statuses

| Status | Indicator | What it means |
| --- | --- | --- |
| **Active** | No badge | The object is live and currently enforced on workloads |
| **Addition Pending** | Green badge | A new object has been created in Draft but not yet provisioned |
| **Modification Pending** | Yellow / orange badge | An existing Active object has been edited in Draft -- the old version is still enforced |
| **Deletion Pending** | Red badge | An object has been marked for deletion in Draft -- it remains Active until provisioned |

### Workload / VEN Statuses

| Status | What it means |
| --- | --- |
| **Active** | VEN is connected and policy is fully in sync |
| **Stopped** | VEN is installed but not running |
| **Suspended** | VEN is temporarily paused and not enforcing policy |
| **Unmanaged** | Workload exists in PCE but has no VEN installed |
| **Deactivation Pending** | VEN is scheduled to be removed |

### Enforcement Mode Statuses (per workload)

| Mode | What it means |
| --- | --- |
| **Idle** | VEN is installed but making no firewall changes |
| **Visibility Only** | Monitoring all traffic, blocking nothing |
| **Selective** | Blocking on specific ports only, rest is monitored |
| **Full** | All traffic not covered by a rule is blocked |

---

## Step 6: Enforcement Modes -- Gradual Rollout

| Mode | What it does |
| --- | --- |
| **Idle** | VEN installed, no firewall changes made yet |
| **Visibility Only** | Monitors all traffic, does not block anything |
| **Selective Enforcement** | Blocks on specific ports only, rest stays in visibility mode |
| **Full Enforcement** | Everything not explicitly allowed by a rule is blocked |

### Enforcement Boundaries

A separate mechanism for creating virtual firewalls between specific groups. Created at **Policy -> Enforcement Boundaries**. Faster to deploy than full allow-list policies -- rules supersede boundaries.

---

## How It All Maps to CLOUD-10389

| Illumio Core (existing) | K8s Policy Epic (new -- CLOUD-10389) |
| --- | --- |
| Illumination Map (see traffic) | Cloud Map + policy recommendations |
| RAEL labels on workloads | K8s labels + namespaces + cloud metadata tags |
| Rulesets with scoped rules | Policy builder wizard |
| Scope label set to "All" (wildcard) | Wildcard namespace / label selector |
| Consumer / Provider / Service | Ingress / Egress with pod selectors |
| Draft -> Provision -> Active | Draft -> Dry-Run -> Active |
| Addition / Modification / Deletion Pending badges | Policy status indicators in K8s policy UI |
| Enforcement modes (gradual) | Dry-run simulation (before/after impact view) |
| Rollback to version N | Version history + rollback |
| PCE provisions to VEN (iptables) | Cloud-operator provisions to K8s NetworkPolicy YAML |
| Illumio policy format | Illumio format + native K8s YAML export |

---

## Hands-On Tutorial: Build a Policy from Scratch (ShopApp Example)

### The Scenario: "ShopApp" -- A 3-Tier Web Application

Use this tutorial to practice policy creation in the Illumio PCE UI using a realistic fictional app called **ShopApp**.

```
Internet -> [Load Balancer] -> [Web Server] -> [App Server] -> [Database]
```

**Goal:** Write policies so each tier can only talk to the next tier -- nothing else.

**Tip for testing without real workloads:** Go to **Infrastructure -> Unmanaged Workloads -> Add** to create dummy IP entries and practice policy creation without needing actual VEN-connected machines.

---

### Phase 1: Create Labels

Navigate to: **Policy Objects -> Labels -> Add**

#### Role labels

| Type | Name | Use |
| --- | --- | --- |
| Role | Web | The web / frontend tier |
| Role | App | The application / middleware tier |
| Role | DB | The database tier |

#### Application labels

| Type | Name |
| --- | --- |
| Application | ShopApp |

#### Environment labels

| Type | Name |
| --- | --- |
| Environment | Production |
| Environment | QA |

#### Location labels

| Type | Name |
| --- | --- |
| Location | US-East |

**Steps for each label:** Go to Policy Objects -> Labels -> click Add -> select type -> enter name -> Save.

---

### Phase 2: Create Test Workloads (Unmanaged)

Navigate to: **Infrastructure -> Unmanaged Workloads -> Add**

| Workload name | IP Address | Role | Application | Environment | Location |
| --- | --- | --- | --- | --- | --- |
| shopapp-web-01 | 10.0.1.10 | Web | ShopApp | Production | US-East |
| shopapp-app-01 | 10.0.2.10 | App | ShopApp | Production | US-East |
| shopapp-db-01 | 10.0.3.10 | DB | ShopApp | Production | US-East |
| shopapp-lb-01 | 10.0.0.10 | -- | ShopApp | Production | US-East |

---

### Phase 3: Create Services (Ports)

Navigate to: **Policy Objects -> Services -> Add**

| Service name | Protocol | Port | What it represents |
| --- | --- | --- | --- |
| HTTPS | TCP | 443 | Public web traffic |
| ShopApp-Internal | TCP | 8080 | Web to App communication |
| MySQL | TCP | 3306 | App to Database communication |

---

### Phase 4: Create the Ruleset

Navigate to: **Policy -> Rulesets & Rules -> Add**

| Field | Value |
| --- | --- |
| **Name** | ShopApp Production Rules |
| **Application (scope)** | ShopApp |
| **Environment (scope)** | Production |
| **Location (scope)** | All (wildcard -- covers all locations) |

Click **Save**. The ruleset now shows a Scopes and Rules tab.

---

### Phase 5: Add the 3 Rules

Navigate to the **Rules** tab inside your new ruleset.

Note:
- **Provider = Destination** (the workload *receiving* the traffic)
- **Consumer = Source** (the workload *initiating* the traffic)

#### Rule 1 -- Allow Web tier to receive HTTPS from anywhere

Click **Add Rule -> Extra-Scope Rule**

| Field | Value |
| --- | --- |
| **Consumers** | All Workloads |
| **Providers** | Role: Web |
| **Providing Service** | HTTPS (TCP 443) |

#### Rule 2 -- Allow Web tier to talk to App tier

Click **Add Rule -> Intra-Scope Rule**

| Field | Value |
| --- | --- |
| **Consumers** | Role: Web |
| **Providers** | Role: App |
| **Providing Service** | ShopApp-Internal (TCP 8080) |

#### Rule 3 -- Allow App tier to talk to Database tier

Click **Add Rule -> Intra-Scope Rule**

| Field | Value |
| --- | --- |
| **Consumers** | Role: App |
| **Providers** | Role: DB |
| **Providing Service** | MySQL (TCP 3306) |

#### What you should see now

Your ruleset should show 3 rules, all with green **Addition Pending** badges. Nothing is enforced yet -- all Draft.

| # | Type | Consumer | Provider | Service |
| --- | --- | --- | --- | --- |
| 1 | Extra-scope | All Workloads | Role: Web | HTTPS :443 |
| 2 | Intra-scope | Role: Web | Role: App | ShopApp-Internal :8080 |
| 3 | Intra-scope | Role: App | Role: DB | MySQL :3306 |

---

### Phase 6: Preview in Draft View (Illumination)

Navigate to: **Illuminate -> Illumination -> switch to Draft view**

- Find your ShopApp workloads -- they should be grouped together
- **Green lines** = traffic allowed by your new rules
- **Red lines** = existing traffic not covered -- would be blocked once enforced

---

### Phase 7: Provision

1. Click the **Provision** button in the top toolbar
2. Click **Draft Changes** -- review the summary:
   - 1 Ruleset added: ShopApp Production Rules
   - 3 Rules added
3. Click **Provision**

The green Addition Pending badges disappear -- rules are now **Active**.

---

### Phase 8: Things to Explore Further

#### Add a QA environment rule

Create a second ruleset scoped to `ShopApp + QA` with identical rules but HTTP :80. Notice how scopes let you have environment-specific rules without duplicating workload configs.

#### Test the wildcard scope

Create a ruleset scoped to `App = All, Env = All, Loc = All` and add a DNS rule (UDP 53). This is how global baseline rules work.

#### Add a rule mid-policy

Edit your existing ruleset and add a 4th rule: **Role: App -> All Workloads -> HTTPS :443** (simulates the App tier calling an external API). Notice the **Modification Pending** badge appears -- existing 3 rules stay Active while only this change is Draft.

#### Try deleting a rule

Mark Rule 1 for deletion. Notice the **Deletion Pending** badge. The rule stays enforced until you provision the deletion.

#### Create an Enforcement Boundary

Navigate to **Policy -> Enforcement Boundaries -> Add** and block all traffic between `Env = Production` and `Env = QA`. Faster than writing individual deny rules.

---

## What Each Phase Teaches You

| Phase | Key concept learned |
| --- | --- |
| Creating labels | RAEL model -- how workloads are classified |
| Defining scope | Partial wildcards (All) vs specific labels |
| Intra vs Extra-scope rules | Rule types and when to use each |
| Draft badges | Nothing changes until provisioned |
| Illumination Draft view | See impact before committing |
| Provisioning | Two-stage commit model + versioning |
| Modifying an active ruleset | Modification Pending vs Addition Pending |
| Enforcement Boundary | Fast isolation without allow-list rules |

---

## How This Maps to CLOUD-10389

| Illumio Core (what you just did) | K8s policy builder (what you are designing) |
| --- | --- |
| Create Role/App/Env labels | Select namespace + K8s labels in wizard |
| Define ruleset scope | Choose which clusters/namespaces policy applies to |
| Add Consumer -> Provider rule | Define ingress/egress rule with pod selectors |
| Draft badges | Draft policy status in UI |
| Illumination Draft view | Dry-run simulation before enforcement |
| Provision button | Activate / enforce policy action |
| Enforcement Boundary | Cluster-wide deny-all baseline policy |

---

## Key Links

- **Epic:** [CLOUD-10389 -- Agentless Container Network Policy Authoring](https://jira.illum.io/browse/CLOUD-10389)
- **UXD Spike:** [UXD-4235 -- Understand Containers Epic](https://jira.illum.io/browse/UXD-4235)
- **Design Brief:** [Containers Network Policy Authoring -- Confluence](https://confluence.illum.io/pages/viewpage.action?pageId=447166204)
- **Illumio Core Policy Docs:** [The Illumio Policy Model](https://product-docs-repo.illumio.com/Tech-Docs/Core/24.5/Security-Policy/out/en/security-policy/overview-of-security-policy/the-illumio-policy-model.html)
- **Illumio Core Ruleset Docs:** [Rulesets](https://product-docs-repo.illumio.com/Tech-Docs/Core/23.5/Security-Policy/out/en/create-security-policy/rulesets.html)
- **Illumination Map Docs:** [About Illumination](https://product-docs-repo.illumio.com/Tech-Docs/Core/22.5/Visualization/out/en/visualization/illumination/about-illumination.html)
- **Enforcement Modes:** [Illumio Policy Enforcement Model](https://product-docs-repo.illumio.com/Tech-Docs/Core/25.2/Security-Policy/out/en/security-policy-guide-25-2-10/illumio-policy-enforcement-model.html)
