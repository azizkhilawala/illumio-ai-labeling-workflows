# AI Labeling - Forrester Demo UXD Bug Hunt — JIRA Epic + Template Bug Creation Plan

## Context

The UXD team needs to conduct a bug hunt for the AI Labeling feature ahead of the Forrester demo (scheduled for today, May 7, 2026). This follows the same process established by the CloudSecure Bug Hunt pilot. A new JIRA epic is needed as the parent ticket, plus a template bug ticket that team members can clone to quickly file bugs with all the right fields pre-filled.

---

## Step 1: Create the JIRA Epic

| Field | Value |
|-------|-------|
| **Project** | `EYE` |
| **Issue Type** | `Epic` |
| **Summary** | `AI Labeling - Forrester Demo UXD Bug Hunt` |
| **Assignee** | `aziz.khilawala` |
| **Reporter** | `shyam.chandrasekar` |
| **Priority** | `High` |
| **Labels** | `uxd-bughunt-ai-labeling`, `AILabeling`, `AI_labelling` |
| **Component** | `AI/ML` |
| **Epic Name** | `AI Labeling Bug Hunt` |

### Epic Description

**Objective:** Focused UXD bug hunt to identify and fix UI issues in AI Labeling before the Forrester demo.

**Scope:** Full AI Labeling feature — Recommendations (card/table views), Details page, Evidence slide-out, Approved/Ignored tabs, Confirmation modals, Filters, Sort, CSV export.

**Environment:**
- URL: https://dev.console.ilabs.io
- Tenant: TPM Dev
- Access: Owner for all team members
- Team member emails: aziz.khilawala+tpm_dev@illumio.com, jessie.lyu+tpm_dev@illumio.com, kevin.singh+tpm_dev@illumio.com, sandra.luo+tpm_dev@illumio.com, ginnie.lo+tpm_dev@illumio.com, yoon.park+tpm_dev@illumio.com, radhika.rayadu+tpm_dev@illumio.com

**Bug Filing Instructions:**
1. Create bug tickets directly on this epic — use the template ticket below to clone
2. Each bug ticket must include:
   - Type = Bug
   - Component = AI/ML
   - Label = `uxd-bughunt-ai-labeling`
   - Epic Link = this epic
   - Priority = use your judgement
3. Include a clear summary and steps to reproduce in each ticket

**Design References:**
- [GA Figma Prototype](https://www.figma.com/proto/8VVmi4sva1ehckP8wC2flJ/AI-Labeling---v2?node-id=1331-122682&p=f&viewport=859%2C4762%2C0.12&t=3KTff9pqErxmAJCV-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1331%3A122682&page-id=1331%3A114925&show-proto-sidebar=1)
- [GA Figma Design File](https://www.figma.com/design/8VVmi4sva1ehckP8wC2flJ/AI-Labeling---v2?node-id=1331-122679&t=REsMX5SWCvtXPpzn-4)
- [Video Walkthrough](https://cln.sh/YrzktrwM)
- Parent UX Epic: EYE-139070

---

## Step 2: Link Epic to Parent UX Epic

Create a "Related" link between the new epic and EYE-139070.

---

## Step 3: Create Template Bug Ticket

| Field | Value |
|-------|-------|
| **Project** | `EYE` |
| **Issue Type** | `Bug` |
| **Summary** | `[TEMPLATE] AI Labeling Bug Hunt - Clone This Ticket` |
| **Assignee** | `aziz.khilawala` |
| **Component** | `AI/ML` |
| **Priority** | `Medium` |
| **Labels** | `uxd-bughunt-ai-labeling` |
| **Epic Link** | The new bug hunt epic |

### Template Bug Description

**Summary:** [Replace with a clear, concise bug title]

**Steps to Reproduce:**
1. Navigate to https://dev.console.ilabs.io (Tenant: TPM Dev)
2. [Step 2]
3. [Step 3]

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happens]

**Screenshots/Recordings:**
[Attach screenshots or screen recordings]

**Severity Guide:**
- Low: Aesthetic issue, does not prevent use as intended
- Medium: Functionality has a workaround, user not completely blocked
- High: User is blocked
- Critical: No workaround, critical feature broken

---

## Step 4: Update Epic Description with Template Key

Update the epic description to include the template ticket key so team members can easily find and clone it.
