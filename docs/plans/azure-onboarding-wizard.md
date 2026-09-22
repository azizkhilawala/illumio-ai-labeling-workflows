# Azure Onboarding Wizard Prototype — Implementation Plan

## Context

**JIRA:** UXD-4196 — Update Azure Onboarding Workflow for Advanced Onboarding  
**Driver:** Wells Fargo requires least-privileged access onboarding (no Global Admin, no service principals)  
**Goal:** Prototype the v2.1 workflow from the FigJam board as an interactive demo, matching Figma designs using existing design system components.

**Key v2.1 change:** In the Advanced path, Azure itself detects admin vs non-admin during OAuth login. Non-admin users see "Request Approval" → save progress → exit → resume after admin approves.

---

## Advanced Path — 5 Steps (from Figma + FigJam v2.1)

| Step | ID | Title | Figma Node |
|------|----|-------|-----------|
| 1 | `choose-experience` | Choose Your Onboarding Experience | 8048:53533 / 8066:56987 |
| 2 | `connect-azure` | Connect your Azure Cloud | 8066:57340 |
| 3 | `select-permissions` | Select Permissions | 7003:116729 |
| 4 | `setup-access` | Set up Access | 7003:117258 |
| 5 | `confirm-complete` | Confirm & Complete | 7003:116835 |

### Non-Admin Branch (after Step 2 Azure Login)
- Azure Login detects non-admin → shows "Request Approval" modal screen
- User clicks "Save & Exit" → redirects to Onboarding Page with "Pending Approval" status
- After admin approves (simulated) → user resumes at Step 3

### Azure Login Flow (between Step 2 and Step 3)
- After filling Tenant form → "Save & Continue" opens Azure Login Modal
- Modal Phase 1: Email field + "Sign In" (1.5s simulated delay)
- Modal Phase 2: Simulation control panel — choose "Admin" or "Non-Admin"
  - Admin → closes modal, proceeds to Step 3
  - Non-Admin → shows "Approval Required" screen → "Save & Exit"

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/app/demos/azure-onboarding/page.tsx` | Onboarding Page (cloud account list) |
| `src/app/demos/azure-onboarding/wizard/page.tsx` | Wizard route |
| `src/design-system/floorplans/AzureOnboardingFloorplan.tsx` | Onboarding Page floorplan |
| `src/design-system/floorplans/AzureOnboardingWizardFloorplan.tsx` | Wizard floorplan (main file) |

## Files to Modify

| File | Change |
|------|--------|
| `src/app/demos/page.tsx` | Add entry to `DEMO_REGISTRY` |
| `src/design-system/floorplans/index.ts` | Export both new floorplans |

---

## Architecture

- **Two-page structure** matching AI Labeling pattern
- **`useReducer`** state machine for wizard branching (path, adminStatus, formData, showModal)
- **Dynamic steps** computed from state → passed to `<Wizard steps={computedSteps}>`
- **Step content** rendered by step ID (not index) for resilience

## Design System Components Used

Wizard, WizardHeader, WizardBody, WizardStepper, WizardContent, WizardContentBody, WizardFooter, WizardFormSection, TextField, RadioGroup, Checkbox, Button, Modal, Toast, NotificationBanner, Badge, Status, Icon, Logo

---

## Implementation Sequence

### Phase 1: Scaffolding
1. Create demo folder structure + stub floorplans
2. Register in DEMO_REGISTRY + export from barrel files
3. Verify routing

### Phase 2: Wizard — Steps 1-2
4. Build wizard floorplan with useReducer + dynamic steps
5. Step 1: Choose Experience (Easy/Advanced OptionCards)
6. Step 2: Connect Azure Cloud (Radio Tenant/Subscription + form fields)
7. Azure Login Modal with simulation controls

### Phase 3: Wizard — Steps 3-5
8. Step 3: Select Permissions (Read Only / Read and Write OptionCards)
9. Step 4: Set up Access (Service Account + PowerShell code block)
10. Step 5: Confirm & Complete (summary rows)

### Phase 4: Onboarding Page + Resume Flow
11. Build Onboarding Page with cloud account list + status badges
12. Simulation controls for approval/denial
13. Resume flow via query params

### Phase 5: Polish
14. Match all spacing/colors/typography to Figma
15. Test all user flows end-to-end

---

## Verification

### Manual Walkthrough (3 flows)
1. **Advanced/Admin**: Choose Advanced → Connect Azure → Login (Admin) → Select Permissions → Set up Access → Confirm & Complete
2. **Advanced/Non-Admin**: Choose Advanced → Connect Azure → Login (Non-Admin) → Request Approval → Save & Exit → Onboarding Page "Pending" → Simulate Approval → Resume → Select Permissions → ... → Complete
3. **Easy Path**: Choose Easy → (7-step flow, lower priority)

### Checks
- `npm run dev` → all routes load
- `npx tsc --noEmit` passes
- All icons use `<Icon name="..." />`
- CSS variables used (no hardcoded colors)
