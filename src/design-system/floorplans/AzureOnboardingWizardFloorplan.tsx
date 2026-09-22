"use client";

import React, { useReducer, useState, useCallback } from "react";
import {
  Wizard,
  WizardHeader,
  WizardBody,
  WizardStepper,
  WizardContent,
  WizardContentBody,
  WizardFooter,
  WizardFormSection,
  useWizard,
  TextField,
  RadioGroup,
  Checkbox,
  Button,
  OptionCard,
  OptionCardGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
  NotificationBanner,
} from "@/design-system";
import { Icon } from "@/design-system/icons";

// ────────────────────────────────────────────
// Types & State
// ────────────────────────────────────────────

type OnboardingPath = "easy" | "advanced";

interface FormData {
  scope: "tenant" | "subscription";
  tenantName: string;
  subscriptionName: string;
  tenantId: string;
  subscriptionId: string;
  permissions: "read-only" | "read-write";
  serviceAccount: string;
  serviceAccountToken: string;
  deploymentCompleted: boolean;
  selfAttestApproved: boolean;
}

interface WizardState {
  path: OnboardingPath;
  adminStatus: "unknown" | "admin" | "non-admin";
  showAzureLoginModal: boolean;
  showApprovalConfirmation: boolean;
  approvalRequestedAt: string | null;
  isResuming: boolean;
  savedTenantId: string;
  savedSubscriptionId: string;
  formData: FormData;
}

type WizardAction =
  | { type: "SET_PATH"; path: OnboardingPath }
  | { type: "SET_ADMIN_STATUS"; status: WizardState["adminStatus"] }
  | { type: "SHOW_AZURE_LOGIN" }
  | { type: "HIDE_AZURE_LOGIN" }
  | { type: "SHOW_APPROVAL_CONFIRMATION" }
  | { type: "UPDATE_FORM"; field: keyof FormData; value: string | boolean };

const initialFormData: FormData = {
  scope: "subscription",
  tenantName: "",
  subscriptionName: "",
  tenantId: "",
  subscriptionId: "",
  permissions: "read-only",
  serviceAccount: "",
  serviceAccountToken: "",
  deploymentCompleted: false,
  selfAttestApproved: false,
};

const initialState: WizardState = {
  path: "easy",
  adminStatus: "unknown",
  showAzureLoginModal: false,
  showApprovalConfirmation: false,
  approvalRequestedAt: null,
  isResuming: false,
  savedTenantId: "",
  savedSubscriptionId: "",
  formData: { ...initialFormData },
};

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case "SET_PATH":
      return { ...state, path: action.path };
    case "SET_ADMIN_STATUS":
      return { ...state, adminStatus: action.status };
    case "SHOW_AZURE_LOGIN":
      return { ...state, showAzureLoginModal: true };
    case "HIDE_AZURE_LOGIN":
      return { ...state, showAzureLoginModal: false };
    case "SHOW_APPROVAL_CONFIRMATION":
      return {
        ...state,
        showApprovalConfirmation: true,
        approvalRequestedAt: new Date().toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };
    case "UPDATE_FORM": {
      const next = { ...state, formData: { ...state.formData, [action.field]: action.value } };
      if (
        state.isResuming &&
        (action.field === "tenantId" || action.field === "subscriptionId")
      ) {
        const idsChanged =
          next.formData.tenantId !== state.savedTenantId ||
          next.formData.subscriptionId !== state.savedSubscriptionId;
        if (idsChanged) {
          next.formData.selfAttestApproved = false;
        }
      }
      return next;
    }
    default:
      return state;
  }
}

// ────────────────────────────────────────────
// Step Computation
// ────────────────────────────────────────────

function computeSteps(path: OnboardingPath) {
  if (path === "advanced") {
    return [
      { id: "choose-experience", label: "Choose Your Experience" },
      { id: "connect-azure", label: "Connect your Azure Cloud" },
      { id: "select-permissions", label: "Select Permissions" },
      { id: "setup-access", label: "Set Up Access" },
      { id: "confirm-complete", label: "Confirm & Complete" },
    ];
  }
  return [
    { id: "choose-experience", label: "Choose Your Experience" },
    { id: "confirm-admin", label: "Confirm Admin Privileges" },
    { id: "connect-azure", label: "Connect your Azure Cloud" },
    { id: "vnet-flow-logs", label: "Enable VNet Flow Logs" },
    { id: "select-permissions", label: "Select Permissions" },
    { id: "confirm-complete", label: "Confirm & Complete" },
  ];
}

// ────────────────────────────────────────────
// Shared Components
// ────────────────────────────────────────────

function AzureIcon({ size = 31 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 4,
        border: "0.8px solid var(--lightning-bluegray-300, #c9d6e2)",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon name="cloud" size={Math.round(size * 0.5)} color="#0078D4" />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="azure-summary-row">
      <span className="azure-summary-label">{label}</span>
      <span className="azure-summary-value">{value}</span>
    </div>
  );
}

// ────────────────────────────────────────────
// Step 1: Choose Your Onboarding Experience
// ────────────────────────────────────────────

function ChooseExperienceStep({
  state,
  dispatch,
}: {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
}) {
  return (
    <WizardContentBody
      title="Choose Your Onboarding Experience"
      description="Select the setup style that best fits your needs. You can switch paths anytime."
    >
      <OptionCardGroup direction="vertical">
        <OptionCard
          title="Easy Onboarding (New)"
          description="Quick setup with automation — requires Global Administrator privileges."
          icon={<Icon name="bolt" size={16} />}
          selected={state.path === "easy"}
          selectionType="radio"
          onChange={() => dispatch({ type: "SET_PATH", path: "easy" })}
        />
        <OptionCard
          title="Advanced Onboarding"
          description="Supports least-privilege access — non-admins can request approval."
          icon={<Icon name="gear" size={16} />}
          selected={state.path === "advanced"}
          selectionType="radio"
          onChange={() => dispatch({ type: "SET_PATH", path: "advanced" })}
        />
      </OptionCardGroup>
    </WizardContentBody>
  );
}

// ────────────────────────────────────────────
// Easy Path: Connect your Azure Cloud
// ────────────────────────────────────────────

function EasyConnectAzureStep({
  state,
  dispatch,
}: {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
}) {
  return (
    <WizardContentBody
      icon={<AzureIcon size={42} />}
      title="Connect your Azure Cloud"
      description="Connect your Azure cloud resources to Illumio."
    >
      <div className="azure-step-content">
        <WizardFormSection highlighted>
          <div className="wizard-form-fields">
            <TextField
              label="Tenant ID"
              placeholder="Paste your Tenant ID from the Azure Portal"
              required
              value={state.formData.tenantId}
              onChange={(value: string) =>
                dispatch({ type: "UPDATE_FORM", field: "tenantId", value })
              }
              helperText="Your tenant must have at least one active subscription to complete onboarding successfully."
            />
          </div>
        </WizardFormSection>

        <div className="azure-divider" />

        <div className="azure-next-steps-preview">
          <span className="azure-next-steps-label">Next step:</span>
          <div className="azure-next-step-item">
            <div className="azure-next-step-icon" style={{ background: "#dbeafe" }}>
              <Icon name="user" size={14} color="#2366ed" />
            </div>
            <span>Sign in as a Global Administrator</span>
          </div>
          <div className="azure-next-step-item">
            <div className="azure-next-step-icon" style={{ background: "#d1fae5" }}>
              <Icon name="shield-check" size={14} color="#16a34a" />
            </div>
            <span>Authorize permissions for Illumio</span>
            <Tooltip
              content="Easy onboarding requires Global Administrator privileges to automatically configure permissions for Illumio."
              position="right"
            >
              <span style={{ display: "inline-flex", cursor: "help" }}>
                <Icon name="circle-information" size={14} color="var(--lightning-bluegray-400)" />
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </WizardContentBody>
  );
}

// ────────────────────────────────────────────
// Advanced Path: Connect your Azure Cloud
// ────────────────────────────────────────────

function AdvancedConnectAzureStep({
  state,
  dispatch,
}: {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
}) {
  const scopeOptions = [
    { value: "tenant", label: "Tenant" },
    { value: "subscription", label: "Subscription" },
  ];

  const idsChanged =
    state.isResuming &&
    (state.formData.tenantId !== state.savedTenantId ||
      state.formData.subscriptionId !== state.savedSubscriptionId);

  const showSelfAttest = state.isResuming && !idsChanged;

  return (
    <WizardContentBody
      icon={<AzureIcon size={42} />}
      title="Connect your Azure Cloud"
      description="When you select the Tenant or Subscription, Illumio determines the scope of Azure resources to secure."
    >
      <div className="azure-step-content">
        {showSelfAttest && (
          <div className="azure-self-attest-banner">
            <NotificationBanner
              status="info"
              title="Approval Pending"
              description={`You requested admin consent${state.approvalRequestedAt ? ` on ${state.approvalRequestedAt}` : ""}. Once your Azure administrator has approved the request in Microsoft Entra Portal, confirm below to continue.`}
            />
            <div className="azure-self-attest-checkbox">
              <Checkbox
                label="I confirm my admin has approved the consent request for Illumio CloudSecure"
                checked={state.formData.selfAttestApproved}
                onChange={(checked: boolean) =>
                  dispatch({ type: "UPDATE_FORM", field: "selfAttestApproved", value: checked })
                }
              />
            </div>
            <div className="azure-self-attest-actions">
              <Button
                size="sm"
                leftIcon={<Icon name="list" size={14} />}
                onClick={() => {
                  const el = document.getElementById("admin-instructions-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Admin Instructions
              </Button>
              <Button
                size="sm"
                leftIcon={<Icon name="mail" size={14} />}
                onClick={() => {
                  const subject = encodeURIComponent(
                    "Action needed: Approve Illumio CloudSecure for Azure onboarding",
                  );
                  const body = encodeURIComponent(getAdminEmailBody(state.formData.tenantId));
                  window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
                }}
              >
                Resend Email
              </Button>
            </div>
          </div>
        )}

        {idsChanged && (
          <NotificationBanner
            status="warning"
            title="Tenant or Subscription ID changed"
            description="The IDs have changed from what was originally submitted. You'll need to sign in again to request new consent."
          />
        )}

        <div className="azure-select-scope-section">
          <div className="azure-select-scope-header">
            <Icon name="shield-check" size={20} color="#2366ed" />
            <span>Select Integration Scope</span>
          </div>

          <RadioGroup
            options={scopeOptions}
            value={state.formData.scope}
            onChange={(val: string) =>
              dispatch({ type: "UPDATE_FORM", field: "scope", value: val })
            }
          />

          <WizardFormSection highlighted>
            <div className="wizard-form-fields">
              {state.formData.scope === "tenant" && (
                <TextField
                  label="Tenant Name"
                  placeholder="A friendly name to identify your tenant"
                  required
                  value={state.formData.tenantName}
                  onChange={(value: string) =>
                    dispatch({ type: "UPDATE_FORM", field: "tenantName", value })
                  }
                  helperText="A friendly name to identify your tenant"
                />
              )}
              {state.formData.scope === "subscription" && (
                <TextField
                  label="Subscription Name"
                  placeholder="A friendly name to identify your subscription"
                  required
                  value={state.formData.subscriptionName}
                  onChange={(value: string) =>
                    dispatch({ type: "UPDATE_FORM", field: "subscriptionName", value })
                  }
                  helperText="A friendly name to identify your subscription"
                />
              )}
              <TextField
                label="Tenant ID"
                placeholder="Paste your Tenant ID from the Azure Portal"
                required
                value={state.formData.tenantId}
                onChange={(value: string) =>
                  dispatch({ type: "UPDATE_FORM", field: "tenantId", value })
                }
                helperText="Found in Azure Tenant console under 'Tenant ID'"
              />
              {state.formData.scope === "subscription" && (
                <TextField
                  label="Subscription ID"
                  placeholder="Paste your Subscription ID from the Azure Portal"
                  required
                  value={state.formData.subscriptionId}
                  onChange={(value: string) =>
                    dispatch({ type: "UPDATE_FORM", field: "subscriptionId", value })
                  }
                  helperText="Found in Azure Subscription console under 'Subscription ID'"
                />
              )}
            </div>
          </WizardFormSection>
        </div>

        {showSelfAttest && (
          <div id="admin-instructions-section">
            <AdminInstructionsCard tenantId={state.formData.tenantId} />
          </div>
        )}
      </div>
    </WizardContentBody>
  );
}

// ────────────────────────────────────────────
// Select Permissions
// ────────────────────────────────────────────

function SelectPermissionsStep({
  state,
  dispatch,
}: {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
}) {
  const [showPermissions, setShowPermissions] = useState(false);

  return (
    <WizardContentBody
      title="Select Permissions"
      description="Choose the level of access for your Azure integration."
    >
      <OptionCardGroup direction="vertical">
        <OptionCard
          title="Read Only"
          description="Provides the necessary permissions to build your AI security graph for visibility across your subscription or tenant."
          icon={<Icon name="eye" size={16} />}
          selected={state.formData.permissions === "read-only"}
          selectionType="radio"
          onChange={() =>
            dispatch({ type: "UPDATE_FORM", field: "permissions", value: "read-only" })
          }
        />
        <OptionCard
          title="Read and Write"
          description="Provides the necessary permissions for visibility and to use one-click quarantine remediation capabilities across your subscription or tenant."
          icon={<Icon name="pencil" size={16} />}
          selected={state.formData.permissions === "read-write"}
          selectionType="radio"
          onChange={() =>
            dispatch({ type: "UPDATE_FORM", field: "permissions", value: "read-write" })
          }
        />
      </OptionCardGroup>

      <div style={{ marginTop: 8 }}>
        <Button
          size="sm"
          leftIcon={<Icon name="circle-information" size={14} />}
          onClick={() => setShowPermissions(!showPermissions)}
        >
          {showPermissions ? "Hide" : "Show"} Permissions (Optional)
        </Button>
      </div>

      {showPermissions && (
        <div className="azure-permissions-detail">
          <p>Application.Read.All, Domain.Read.All, User.Read, openid, profile, offline_access</p>
          {state.formData.permissions === "read-write" && (
            <p style={{ marginTop: 4 }}>+ user_impersonation (Azure Resource Manager)</p>
          )}
        </div>
      )}
    </WizardContentBody>
  );
}

// ────────────────────────────────────────────
// Set up Access
// ────────────────────────────────────────────

function buildEasyScript(formData: FormData): string {
  const tid = formData.tenantId || "<azure-tenant-id>";
  const key = formData.serviceAccount || "<service-account-key>";
  const token = formData.serviceAccountToken || "<service-account-token>";
  const csTid = "<cloudsecure-tenant-id>";
  const scopeFlag =
    formData.scope === "subscription"
      ? `-sid ${formData.subscriptionId || "<subscription-id>"}`
      : `-tid ${tid}`;
  const nsgFlag = formData.permissions === "read-write" ? " -nsg" : "";

  return [
    `Invoke-WebRequest -Uri https://cloudsecure-onboarding-templates.s3.us-west-2.amazonaws.com/cloudsecure/illumio-init.ps1 -OutFile (Join-Path $PWD.Path "illumio-init.ps1");`,
    `./illumio-init.ps1 ${scopeFlag} -serviceAccountKey ${key} -serviceAccountToken ${token} -csTenantId ${csTid} -url https://cloud.illum.io${nsgFlag}`,
  ].join("\n");
}

function buildAdvancedScript(formData: FormData): string {
  const key = formData.serviceAccount || "<YourServiceAccountKeyId>";
  const token = formData.serviceAccountToken || "<YourServiceAccountToken>";
  const csTid = "<CloudsecureTenantId>";
  const clientId = "<ClientId>";
  const clientSecret = "<YourClientSecret>";
  const azTid = formData.tenantId || "<AzureTenantId>";
  const subId =
    formData.scope === "subscription"
      ? formData.subscriptionId || "<SubscriptionId>"
      : "";

  return [
    `$serviceAccountKeyId = "${key}"`,
    `$serviceAccountToken = "${token}"`,
    `$clientSecret = "${clientSecret}"`,
    "",
    '$authString = "$($serviceAccountKeyId):$($serviceAccountToken)"',
    "$encodedAuthString = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($authString))",
    "$encodedClientSecret = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($clientSecret))",
    "",
    "$headers = @{",
    `  "X-Tenant-Id"   = "${csTid}"`,
    '  "Content-Type"  = "application/json"',
    '  "Authorization" = "Basic $encodedAuthString"',
    "}",
    "",
    "$body = @{",
    '  "type"            = "AzureRole"',
    `  "client_id"       = "${clientId}"`,
    '  "client_secret"   = $encodedClientSecret',
    `  "subscription_id" = "${subId}"`,
    `  "azure_tenant_id" = "${azTid}"`,
    "} | ConvertTo-Json -Depth 10",
    "",
    "Invoke-WebRequest -Uri 'https://cloud.illum.io/api/v1/integrations/cloud_credentials' -Method Post -Headers $headers -Body $body",
  ].join("\n");
}

function SetupAccessStep({
  state,
  dispatch,
}: {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
}) {
  const [copied, setCopied] = useState(false);

  const isEasy = state.path === "easy";
  const powershellCmd = isEasy
    ? buildEasyScript(state.formData)
    : buildAdvancedScript(state.formData);

  const handleCopy = () => {
    navigator.clipboard.writeText(powershellCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <WizardContentBody
      title="Set up Access"
      description={
        isEasy
          ? "Configure your Azure service account and deploy the required components to establish secure communication between your Azure environment and Illumio."
          : "Configure your Azure service account and run the callback script to send your manually created credentials back to Illumio."
      }
    >
      <div className="azure-step-content">
        <div className="azure-setup-section">
          <div className="azure-setup-section-header">
            <span className="azure-setup-section-num">1.</span>
            <span className="azure-setup-section-title">Select Service Account</span>
            <Tooltip
              content="Service accounts are Illumio-managed credentials that authenticate API communication with your Azure environment. Select an existing service account or create a new one. The Key ID will be pre-filled in the script below."
              position="right"
            >
              <span style={{ display: "inline-flex", cursor: "help" }}>
                <Icon name="circle-information" size={14} color="var(--lightning-bluegray-400)" />
              </span>
            </Tooltip>
          </div>
          <WizardFormSection highlighted>
            <TextField
              label="Service Account"
              placeholder="Select or enter service account"
              required
              value={state.formData.serviceAccount}
              onChange={(value: string) =>
                dispatch({ type: "UPDATE_FORM", field: "serviceAccount", value })
              }
              helperText="Select or create a service account to enable programmatic access to Azure resources, and download its credentials."
            />
          </WizardFormSection>
        </div>

        <div className="azure-setup-section">
          <div className="azure-setup-section-header">
            <span className="azure-setup-section-num">2.</span>
            <span className="azure-setup-section-title">Paste Service Account Token</span>
            <Tooltip
              content="Paste the token from the credentials file you downloaded when creating the service account. This token authenticates Illumio's API requests. If lost, regenerate it in Settings > Service Accounts."
              position="right"
            >
              <span style={{ display: "inline-flex", cursor: "help" }}>
                <Icon name="circle-information" size={14} color="var(--lightning-bluegray-400)" />
              </span>
            </Tooltip>
          </div>
          <WizardFormSection highlighted>
            <TextField
              label="Service Account Token"
              placeholder="Enter token"
              required
              value={state.formData.serviceAccountToken}
              onChange={(value: string) =>
                dispatch({ type: "UPDATE_FORM", field: "serviceAccountToken", value })
              }
              helperText="Copy and paste the token from your downloaded service account credentials file."
            />
          </WizardFormSection>
        </div>

        <div className="azure-divider" />

        <div className="azure-setup-section">
          <div className="azure-setup-section-header">
            <span className="azure-setup-section-num">3.</span>
            <span className="azure-setup-section-title">
              {isEasy ? "Complete & Confirm Setup" : "Complete & Confirm Setup"}
            </span>
            <Tooltip
              content={
                isEasy
                  ? "Open Azure Cloud Shell in a new tab and run this command to create the Entra ID application and send credentials to Illumio. Check the box below once the script completes. Illumio will verify the credentials and begin syncing your Azure resources. If any issues are found, you'll see an error on the Onboarding page."
                  : "Ensure you have registered an Entra ID application, created a client secret, and assigned the Reader role in the Azure Portal before running this script. Check the box below once the script completes. Illumio will verify the credentials and begin syncing your Azure resources. If the credentials are invalid or admin consent was not granted, you'll see an error on the Onboarding page."
              }
              position="right"
            >
              <span style={{ display: "inline-flex", cursor: "help" }}>
                <Icon name="circle-information" size={14} color="var(--lightning-bluegray-400)" />
              </span>
            </Tooltip>
          </div>

          <div className="azure-code-block">
            <div className="azure-code-header">
              <span>{isEasy ? "Azure Cloud Shell Command" : "PowerShell Callback Script"}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="azure-code-btn" title="Download">
                  <Icon name="download" size={14} color="white" />
                </button>
                <button className="azure-code-btn" onClick={handleCopy} title="Copy">
                  <Icon name={copied ? "check" : "clipboard"} size={14} color="white" />
                  <span style={{ marginLeft: 4, fontSize: 11 }}>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
            <pre className="azure-code-body">
              <code>{powershellCmd}</code>
            </pre>
          </div>

          <div style={{ marginTop: 16 }}>
            <Checkbox
              label="I have run the script and confirmed it completed successfully"
              checked={state.formData.deploymentCompleted}
              onChange={(checked: boolean) =>
                dispatch({ type: "UPDATE_FORM", field: "deploymentCompleted", value: checked })
              }
            />
          </div>
        </div>
      </div>
    </WizardContentBody>
  );
}

// ────────────────────────────────────────────
// Confirm & Complete
// ────────────────────────────────────────────

function ConfirmCompleteStep({ state }: { state: WizardState }) {
  return (
    <WizardContentBody
      title="Confirm & Complete"
      description="Review and confirm your Azure onboarding configuration."
    >
      <div className="azure-summary">
        <SummaryRow
          label="Onboarding Path"
          value={state.path === "easy" ? "Easy Onboarding" : "Advanced Onboarding"}
        />
        <SummaryRow
          label="Integration Scope"
          value={
            <span className="azure-summary-pill">
              <Icon name="cloud" size={14} color="var(--lightning-blue-500, #3a88fc)" />
              {state.formData.scope === "tenant" ? "Tenant" : "Subscription"}
            </span>
          }
        />
        {state.formData.scope === "tenant" && state.formData.tenantName && (
          <SummaryRow label="Tenant Name" value={state.formData.tenantName} />
        )}
        {state.formData.scope === "subscription" && state.formData.subscriptionName && (
          <SummaryRow label="Subscription Name" value={state.formData.subscriptionName} />
        )}
        <SummaryRow
          label="Azure Tenant"
          value={
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <AzureIcon size={20} />
              <span className="azure-mono">{state.formData.tenantId || "—"}</span>
            </span>
          }
        />
        {state.formData.scope === "subscription" && (
          <SummaryRow
            label="Subscription ID"
            value={<span className="azure-mono">{state.formData.subscriptionId || "—"}</span>}
          />
        )}
        <SummaryRow
          label="Permissions"
          value={
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="eye" size={14} color="var(--lightning-bluegray-700, #455465)" />
              {state.formData.permissions === "read-write" && (
                <Icon name="pencil" size={14} color="var(--lightning-bluegray-700, #455465)" />
              )}
              {state.formData.permissions === "read-only" ? "Read Only" : "Read and Write"}
            </span>
          }
        />
        {state.path === "advanced" && (
          <SummaryRow label="Service Account" value={state.formData.serviceAccount || "—"} />
        )}
      </div>
    </WizardContentBody>
  );
}

// ────────────────────────────────────────────
// Admin Instructions (shared content)
// ────────────────────────────────────────────

const ADMIN_STEPS = [
  {
    num: 1,
    title: "Open the email from Microsoft Security",
    detail:
      'Subject: "Please review the admin consent request for Illumio CloudSecure"',
  },
  {
    num: 2,
    title: 'Click "Review request" in the email',
    detail: "This opens the Entra Portal admin consent page.",
  },
  {
    num: 3,
    title: 'Click "Review permissions and consent" → Accept',
    detail: "Grants basic identity permissions (profile, openid, offline_access).",
  },
  {
    num: 4,
    title: "Grant Azure Resource Manager access",
    detail:
      'Go to Enterprise Apps → Illumio CloudSecure → Permissions → click "Grant admin consent for [Your Tenant]".',
  },
];

function getAdminInstructionsText(tenantId: string) {
  return [
    "Illumio CloudSecure — Azure Admin Approval Needed",
    "",
    ...ADMIN_STEPS.map((s) => `${s.num}. ${s.title}\n   ${s.detail}`),
    "",
    `Tenant ID: ${tenantId || "N/A"}`,
  ].join("\n");
}

function getAdminEmailBody(tenantId: string) {
  const steps = ADMIN_STEPS.map((s) => `${s.num}. ${s.title}\n   ${s.detail}`).join("\n\n");
  return [
    "Hi,",
    "",
    "I've started onboarding our Azure environment to Illumio CloudSecure and need admin approval to continue.",
    "",
    'You should receive an email from Microsoft Security (MSSecurity-noreply@microsoft.com) with the subject "Please review the admin consent request for Illumio CloudSecure".',
    "",
    "Steps to approve:",
    steps,
    "",
    `Tenant ID: ${tenantId || "N/A"}`,
    "",
    "This grants read-only access to our Azure subscriptions and network data. No write access is requested.",
    "",
    "Thanks!",
  ].join("\n");
}

function AdminInstructionsCard({ tenantId }: { tenantId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(getAdminInstructionsText(tenantId));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(
      "Action needed: Approve Illumio CloudSecure for Azure onboarding",
    );
    const body = encodeURIComponent(getAdminEmailBody(tenantId));
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <div className="azure-admin-instructions">
      <div className="azure-admin-instructions-header">
        <Icon name="list" size={16} color="var(--lightning-bluegray-700, #455465)" />
        <span>What your admin needs to do</span>
      </div>
      <div className="azure-admin-steps">
        {ADMIN_STEPS.map((step) => (
          <div key={step.num} className="azure-admin-step">
            <div className="azure-admin-step-num">{step.num}</div>
            <div>
              <div className="azure-admin-step-title">{step.title}</div>
              <div className="azure-admin-step-detail">{step.detail}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="azure-admin-actions">
        <Button size="sm" leftIcon={<Icon name="mail" size={14} />} onClick={handleEmail}>
          Email Admin
        </Button>
        <Button
          size="sm"
          leftIcon={<Icon name={copied ? "check" : "clipboard"} size={14} />}
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy Instructions"}
        </Button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────
// Approval Requested (non-admin)
// ────────────────────────────────────────────

function ApprovalRequestedStep({
  state,
  onClose,
}: {
  state: WizardState;
  onClose: () => void;
}) {
  return (
    <div className="azure-approval-confirmation">
      <div className="azure-approval-confirmation-hero">
        <div className="azure-approval-confirmation-icon">
          <Icon name="clock" size={36} color="#d97706" />
        </div>
        <h2 className="azure-approval-confirmation-title">Approval Requested</h2>
        <p className="azure-approval-confirmation-desc">
          Your request has been sent to your Azure admin. Microsoft will email them directly.
          Once they approve, you can resume onboarding.
        </p>
      </div>

      <AdminInstructionsCard tenantId={state.formData.tenantId} />

      <div className="azure-saved-details">
        <div className="azure-saved-details-title">Saved details</div>
        <div className="azure-saved-details-grid">
          <span className="azure-saved-details-label">Tenant ID</span>
          <span className="azure-saved-details-value azure-mono">
            {state.formData.tenantId || "—"}
          </span>
          {state.formData.scope === "subscription" && (
            <>
              <span className="azure-saved-details-label">Subscription</span>
              <span className="azure-saved-details-value">
                {state.formData.subscriptionName || "—"}
                {state.formData.subscriptionId && (
                  <span className="azure-mono" style={{ marginLeft: 8, color: "var(--lightning-bluegray-500)" }}>
                    {state.formData.subscriptionId}
                  </span>
                )}
              </span>
            </>
          )}
          <span className="azure-saved-details-label">Scope</span>
          <span className="azure-saved-details-value">
            {state.formData.scope === "tenant" ? "Tenant" : "Subscription"}
          </span>
          <span className="azure-saved-details-label">Requested</span>
          <span className="azure-saved-details-value">
            {state.approvalRequestedAt || "—"}
          </span>
          <span className="azure-saved-details-label">Status</span>
          <span className="azure-saved-details-value">
            <span className="azure-status-pending-badge">
              <Icon name="clock" size={12} color="#2366ed" />
              Pending Approval
            </span>
          </span>
        </div>
      </div>

      <div className="azure-approval-confirmation-footer">
        <Button
          variant="primary"
          leftIcon={<Icon name="arrow-left" size={14} />}
          onClick={onClose}
        >
          Close &amp; Return Later
        </Button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────
// Azure Login Modal (Simulated OAuth)
// ────────────────────────────────────────────

function AzureLoginModal({
  isOpen,
  onClose,
  onAdminLogin,
  onNonAdminExit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdminLogin: () => void;
  onNonAdminExit: () => void;
}) {
  const [phase, setPhase] = useState<"email" | "simulation" | "approval-required">("email");
  const [email, setEmail] = useState("user@contoso.com");
  const [loading, setLoading] = useState(false);
  const [simulatedRole, setSimulatedRole] = useState<string>("admin");
  const [justification, setJustification] = useState("");

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPhase("simulation");
    }, 1500);
  };

  const handleContinue = () => {
    if (simulatedRole === "admin") {
      onAdminLogin();
      resetAndClose();
    } else {
      setPhase("approval-required");
    }
  };

  const handleRequestApproval = () => {
    onNonAdminExit();
    resetAndClose();
  };

  const resetAndClose = () => {
    setPhase("email");
    setLoading(false);
    setSimulatedRole("admin");
    setJustification("");
    onClose();
  };

  const roleOptions = [
    { value: "admin", label: "Simulate as Admin" },
    { value: "non-admin", label: "Simulate as Non-Admin" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} size="medium">
      <ModalHeader
        title={
          phase === "approval-required" ? "Approval Required" : "Sign in to Microsoft Azure"
        }
        onClose={resetAndClose}
      />
      <ModalBody>
        {phase === "email" && (
          <div className="azure-modal-content">
            <p className="azure-modal-subtitle">
              Enter your email to sign in to your Azure account.
            </p>
            <TextField
              label="Email"
              placeholder="user@contoso.com"
              value={email}
              onChange={(value: string) => setEmail(value)}
            />
          </div>
        )}

        {phase === "simulation" && (
          <div className="azure-modal-content">
            <div className="azure-simulation-panel">
              <div className="azure-simulation-badge">Simulation</div>
              <p className="azure-simulation-description">
                In production, Azure detects your admin status automatically during the OAuth flow.
                For this demo, choose which role to simulate:
              </p>
              <RadioGroup
                options={roleOptions}
                value={simulatedRole}
                onChange={setSimulatedRole}
              />
              {simulatedRole === "non-admin" && (
                <div className="azure-approval-notice">
                  <Icon name="circle-exclamation" size={16} color="#d97706" />
                  <span>
                    Non-admin users will see an &ldquo;Approval Required&rdquo; screen from Azure
                    Entra ID.
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {phase === "approval-required" && (
          <div className="azure-modal-content">
            <div className="azure-approval-screen">
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <Icon name="shield" size={32} color="#d97706" />
                <h3
                  style={{
                    margin: "12px 0 8px",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--lightning-bluegray-900, #1f272f)",
                  }}
                >
                  Approval Required
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--lightning-bluegray-600, #63788f)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Your Azure administrator needs to approve access for this application before you
                  can proceed. Your progress will be saved.
                </p>
              </div>
              <TextField
                label="Justification"
                placeholder="Enter reason for access..."
                value={justification}
                onChange={(value: string) => setJustification(value)}
                helperText="This will be sent to your Azure administrator for review"
              />
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        {phase === "email" && (
          <Button variant="primary" onClick={handleSignIn} loading={loading} disabled={!email}>
            Sign In
          </Button>
        )}
        {phase === "simulation" && (
          <Button variant="primary" onClick={handleContinue}>
            Continue
          </Button>
        )}
        {phase === "approval-required" && (
          <div style={{ display: "flex", gap: 8, width: "100%", justifyContent: "flex-end" }}>
            <Button onClick={resetAndClose}>Cancel</Button>
            <Button variant="primary" onClick={handleRequestApproval}>
              Request Approval &amp; Save Progress
            </Button>
          </div>
        )}
      </ModalFooter>
    </Modal>
  );
}

// ────────────────────────────────────────────
// Wizard Inner (inside Wizard context)
// ────────────────────────────────────────────

function WizardInner({
  state,
  dispatch,
  onExit,
}: {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
  onExit?: () => void;
}) {
  const { currentStep, nextStep } = useWizard();
  const steps = computeSteps(state.path);
  const currentStepId = steps[currentStep]?.id;

  const idsChanged =
    state.isResuming &&
    (state.formData.tenantId !== state.savedTenantId ||
      state.formData.subscriptionId !== state.savedSubscriptionId);

  const canSelfAttest = state.isResuming && !idsChanged && state.formData.selfAttestApproved;

  const handleNext = useCallback(() => {
    if (currentStepId === "connect-azure") {
      if (state.path === "advanced" && canSelfAttest) {
        nextStep();
      } else {
        dispatch({ type: "SHOW_AZURE_LOGIN" });
      }
    } else {
      nextStep();
    }
  }, [currentStepId, state.path, canSelfAttest, dispatch, nextStep]);

  const handleAdminLogin = useCallback(() => {
    dispatch({ type: "SET_ADMIN_STATUS", status: "admin" });
    dispatch({ type: "HIDE_AZURE_LOGIN" });
    nextStep();
  }, [dispatch, nextStep]);

  const handleNonAdminExit = useCallback(() => {
    dispatch({ type: "SET_ADMIN_STATUS", status: "non-admin" });
    dispatch({ type: "HIDE_AZURE_LOGIN" });
    dispatch({ type: "SHOW_APPROVAL_CONFIRMATION" });
  }, [dispatch]);

  const isNextDisabled = (): boolean => {
    if (currentStepId === "connect-azure") {
      if (state.path === "easy") {
        return !state.formData.tenantId.trim();
      }
      if (state.formData.scope === "subscription") {
        if (
          !state.formData.subscriptionName.trim() ||
          !state.formData.tenantId.trim() ||
          !state.formData.subscriptionId.trim()
        ) {
          return true;
        }
      } else {
        if (!state.formData.tenantName.trim() || !state.formData.tenantId.trim()) return true;
      }
      if (state.isResuming && !idsChanged && !state.formData.selfAttestApproved) {
        return true;
      }
      return false;
    }
    if (currentStepId === "setup-access") {
      return !state.formData.deploymentCompleted;
    }
    return false;
  };

  const getNextButtonLabel = (): string | undefined => {
    if (currentStepId === "connect-azure") {
      if (state.path === "advanced" && canSelfAttest) {
        return "Continue";
      }
      return "Sign in with Microsoft";
    }
    return undefined;
  };

  const renderStep = () => {
    switch (currentStepId) {
      case "choose-experience":
        return <ChooseExperienceStep state={state} dispatch={dispatch} />;
      case "connect-azure":
        if (state.path === "easy") {
          return <EasyConnectAzureStep state={state} dispatch={dispatch} />;
        }
        return <AdvancedConnectAzureStep state={state} dispatch={dispatch} />;
      case "select-permissions":
        return <SelectPermissionsStep state={state} dispatch={dispatch} />;
      case "setup-access":
        return <SetupAccessStep state={state} dispatch={dispatch} />;
      case "confirm-complete":
        return <ConfirmCompleteStep state={state} />;
      default:
        return (
          <WizardContentBody
            title={steps[currentStep]?.label || "Step"}
            description="This step is part of the Easy onboarding path."
          >
            <div className="azure-placeholder">
              <Icon name="circle-information" size={32} color="var(--lightning-bluegray-300)" />
              <p>Easy path step — coming in a future iteration.</p>
            </div>
          </WizardContentBody>
        );
    }
  };

  if (state.showApprovalConfirmation) {
    return <ApprovalRequestedStep state={state} onClose={() => onExit?.()} />;
  }

  return (
    <>
      {renderStep()}
      <WizardFooter
        onNext={handleNext}
        disableNext={isNextDisabled()}
        nextLabel={getNextButtonLabel()}
        completeLabel="Complete"
      />
      <AzureLoginModal
        isOpen={state.showAzureLoginModal}
        onClose={() => dispatch({ type: "HIDE_AZURE_LOGIN" })}
        onAdminLogin={handleAdminLogin}
        onNonAdminExit={handleNonAdminExit}
      />
    </>
  );
}

// ────────────────────────────────────────────
// Main Export
// ────────────────────────────────────────────

export interface AzureOnboardingWizardFloorplanProps {
  onComplete?: () => void;
  onExit?: () => void;
  resume?: {
    path: OnboardingPath;
    tenantId?: string;
    subscriptionId?: string;
    subscriptionName?: string;
    approvalRequestedAt?: string;
  };
}

export function AzureOnboardingWizardFloorplan({
  onComplete,
  onExit,
  resume,
}: AzureOnboardingWizardFloorplanProps) {
  const [state, dispatch] = useReducer(wizardReducer, initialState, (init) => {
    if (!resume) return init;
    return {
      ...init,
      path: resume.path,
      isResuming: true,
      savedTenantId: resume.tenantId || "",
      savedSubscriptionId: resume.subscriptionId || "",
      approvalRequestedAt: resume.approvalRequestedAt || null,
      formData: {
        ...init.formData,
        tenantId: resume.tenantId || "",
        subscriptionId: resume.subscriptionId || "",
        subscriptionName: resume.subscriptionName || "",
        scope: resume.subscriptionId ? "subscription" as const : "tenant" as const,
      },
    };
  });
  const computedSteps = computeSteps(state.path);

  const resumeStepIndex = resume
    ? computedSteps.findIndex((s) => s.id === "connect-azure")
    : 0;

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    } else {
      alert("Azure onboarding complete! In a real app, this would submit the configuration.");
    }
  };

  return (
    <>
      <Wizard steps={computedSteps} onComplete={handleComplete} initialStep={resumeStepIndex}>
        <WizardHeader
          logo={<AzureIcon />}
          title="Add Azure Cloud"
          actions={
            <Button size="sm" leftIcon={<Icon name="arrow-left" size={14} />} onClick={onExit}>
              Exit
            </Button>
          }
        />
        <WizardBody>
          <WizardStepper />
          <WizardContent>
            <WizardInner state={state} dispatch={dispatch} onExit={onExit} />
          </WizardContent>
        </WizardBody>
      </Wizard>

      <style jsx>{`
        :global(.azure-step-content) {
          display: flex;
          flex-direction: column;
          gap: var(--offset-large, 16px);
          max-width: 600px;
        }

        :global(.wizard-form-fields) {
          display: flex;
          flex-direction: column;
          gap: var(--offset-large, 16px);
        }

        :global(.azure-divider) {
          height: 1px;
          background: var(--lightning-bluegray-200, #dfe6ed);
          margin: 8px 0;
        }

        /* -- Self Attest Banner -- */

        :global(.azure-self-attest-banner) {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px;
          background: var(--lightning-blue-25, #eff6ff);
          border: 1px solid var(--lightning-blue-200, #a3cdfe);
          border-radius: 8px;
        }

        :global(.azure-self-attest-checkbox) {
          padding: 4px 0;
        }

        :global(.azure-self-attest-actions) {
          display: flex;
          gap: 8px;
        }

        /* -- Select Scope Section -- */

        :global(.azure-select-scope-section) {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        :global(.azure-select-scope-header) {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: var(--lightning-bluegray-900, #1f272f);
          font-family: "Geist", sans-serif;
        }

        /* -- Next Steps Preview (Easy path) -- */

        :global(.azure-next-steps-preview) {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        :global(.azure-next-steps-label) {
          font-size: 14px;
          font-weight: 500;
          color: var(--lightning-blue-600, #2366ed);
          font-family: "Geist", sans-serif;
        }

        :global(.azure-next-step-item) {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--lightning-bluegray-900, #1f272f);
          font-family: "Geist", sans-serif;
        }

        :global(.azure-next-step-icon) {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* -- Setup Sections (numbered 1, 2, 3) -- */

        :global(.azure-setup-section) {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        :global(.azure-setup-section-header) {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        :global(.azure-setup-section-num) {
          font-size: 14px;
          font-weight: 700;
          color: var(--lightning-bluegray-900, #1f272f);
          font-family: "Geist", sans-serif;
        }

        :global(.azure-setup-section-title) {
          font-size: 14px;
          font-weight: 600;
          color: var(--lightning-bluegray-900, #1f272f);
          font-family: "Geist", sans-serif;
        }

        /* -- Code Section -- */

        :global(.azure-code-section) {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        :global(.azure-code-section-title) {
          font-size: var(--font-size-text-m, 14px);
          font-weight: 600;
          color: var(--lightning-bluegray-900, #1f272f);
          margin: 0;
        }

        :global(.azure-code-section-desc) {
          font-size: 13px;
          color: var(--lightning-bluegray-600, #63788f);
          margin: 0;
          line-height: 1.5;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-code-block) {
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--lightning-bluegray-200, #dfe6ed);
        }

        :global(.azure-code-header) {
          background: #455465;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 500;
          color: white;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-code-btn) {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          opacity: 0.8;
          color: white;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-code-btn:hover) {
          opacity: 1;
        }

        :global(.azure-code-body) {
          background: #3b4857;
          padding: 16px;
          margin: 0;
          overflow-x: auto;
        }

        :global(.azure-code-body code) {
          font-family: "Geist Mono", monospace;
          font-size: 11px;
          color: white;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        /* -- Summary -- */

        :global(.azure-summary) {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 600px;
        }

        :global(.azure-summary-row) {
          display: flex;
          align-items: center;
          gap: 48px;
          padding: 12px 0;
          border-bottom: 1px solid var(--lightning-bluegray-100, #eef2f6);
        }

        :global(.azure-summary-label) {
          flex: 0 0 180px;
          font-size: 13px;
          font-weight: 500;
          color: var(--lightning-bluegray-600, #63788f);
          font-family: "Geist", sans-serif;
        }

        :global(.azure-summary-value) {
          font-size: 13px;
          font-weight: 500;
          color: var(--lightning-bluegray-900, #1f272f);
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-summary-pill) {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: var(--lightning-blue-25, #eff6ff);
          border: 1px solid var(--lightning-blue-200, #a3cdfe);
          border-radius: 16px;
          font-size: 13px;
          color: var(--lightning-blue-700, #1b51da);
        }

        :global(.azure-permissions-detail) {
          padding: 16px;
          background: var(--lightning-gray-25, #f7f9fa);
          border-radius: 8px;
          border: 1px solid var(--lightning-bluegray-200, #dfe6ed);
          font-size: 12px;
          color: var(--lightning-bluegray-700, #455465);
          line-height: 1.6;
        }

        :global(.azure-permissions-detail p) {
          margin: 0;
        }

        :global(.azure-placeholder) {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 60px 0;
          text-align: center;
          color: var(--lightning-bluegray-500, #7a90a4);
          font-size: 14px;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-placeholder p) {
          margin: 0;
        }

        /* -- Modal -- */

        :global(.azure-modal-content) {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 8px 0;
        }

        :global(.azure-modal-subtitle) {
          font-size: 14px;
          color: var(--lightning-bluegray-600, #63788f);
          margin: 0;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-simulation-panel) {
          border: 2px dashed var(--lightning-bluegray-200, #dfe6ed);
          border-radius: 8px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        :global(.azure-simulation-badge) {
          display: inline-flex;
          align-self: flex-start;
          padding: 2px 10px;
          background: var(--lightning-blue-25, #eff6ff);
          border: 1px solid var(--lightning-blue-300, #6fb1fc);
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          color: var(--lightning-blue-600, #2366ed);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-simulation-description) {
          font-size: 13px;
          color: var(--lightning-bluegray-600, #63788f);
          margin: 0;
          line-height: 1.5;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-approval-notice) {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 12px 16px;
          background: #fef3c7;
          border: 1px solid #fbbf24;
          border-radius: 8px;
          font-size: 13px;
          color: #92400e;
          line-height: 1.4;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-approval-screen) {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* -- Approval Confirmation -- */

        :global(.azure-approval-confirmation) {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 560px;
          margin: 0 auto;
          padding: 32px 0;
        }

        :global(.azure-approval-confirmation-hero) {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        :global(.azure-approval-confirmation-icon) {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #fef3c7;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }

        :global(.azure-approval-confirmation-title) {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: var(--lightning-bluegray-900, #1f272f);
          font-family: "Geist", sans-serif;
        }

        :global(.azure-approval-confirmation-desc) {
          margin: 0;
          font-size: 14px;
          color: var(--lightning-bluegray-600, #63788f);
          line-height: 1.5;
          max-width: 400px;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-approval-confirmation-footer) {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding-top: 8px;
        }

        /* -- Admin Instructions -- */

        :global(.azure-admin-instructions) {
          border: 1px solid var(--lightning-bluegray-200, #dfe6ed);
          border-radius: 8px;
          background: white;
          overflow: hidden;
        }

        :global(.azure-admin-instructions-header) {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 20px;
          background: var(--lightning-gray-25, #f7f9fa);
          border-bottom: 1px solid var(--lightning-bluegray-200, #dfe6ed);
          font-size: 14px;
          font-weight: 600;
          color: var(--lightning-bluegray-800, #2c3a47);
          font-family: "Geist", sans-serif;
        }

        :global(.azure-admin-steps) {
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        :global(.azure-admin-step) {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        :global(.azure-admin-step-num) {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--lightning-blue-50, #dbeafe);
          color: var(--lightning-blue-700, #1b51da);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-admin-step-title) {
          font-size: 13px;
          font-weight: 600;
          color: var(--lightning-bluegray-900, #1f272f);
          line-height: 1.5;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-admin-step-detail) {
          font-size: 12px;
          color: var(--lightning-bluegray-500, #7a90a4);
          line-height: 1.4;
          margin-top: 2px;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-admin-actions) {
          display: flex;
          gap: 8px;
          padding: 14px 20px;
          border-top: 1px solid var(--lightning-bluegray-100, #eef2f6);
        }

        /* -- Saved Details -- */

        :global(.azure-saved-details) {
          border: 1px solid var(--lightning-bluegray-200, #dfe6ed);
          border-radius: 8px;
          background: var(--lightning-gray-25, #f7f9fa);
          overflow: hidden;
        }

        :global(.azure-saved-details-title) {
          padding: 12px 20px;
          font-size: 13px;
          font-weight: 600;
          color: var(--lightning-bluegray-700, #455465);
          border-bottom: 1px solid var(--lightning-bluegray-200, #dfe6ed);
          font-family: "Geist", sans-serif;
        }

        :global(.azure-saved-details-grid) {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 0;
          padding: 4px 20px;
        }

        :global(.azure-saved-details-label) {
          font-size: 12px;
          font-weight: 500;
          color: var(--lightning-bluegray-500, #7a90a4);
          padding: 8px 0;
          border-bottom: 1px solid var(--lightning-bluegray-100, #eef2f6);
          font-family: "Geist", sans-serif;
        }

        :global(.azure-saved-details-value) {
          font-size: 12px;
          font-weight: 500;
          color: var(--lightning-bluegray-900, #1f272f);
          padding: 8px 0;
          border-bottom: 1px solid var(--lightning-bluegray-100, #eef2f6);
          display: flex;
          align-items: center;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-saved-details-grid > :nth-last-child(-n + 2)) {
          border-bottom: none;
        }

        :global(.azure-mono) {
          font-family: "Geist Mono", monospace;
        }

        :global(.azure-status-pending-badge) {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 2px 10px;
          background: var(--lightning-blue-25, #eff6ff);
          border: 1px solid var(--lightning-blue-200, #a3cdfe);
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          color: var(--lightning-blue-600, #2366ed);
          font-family: "Geist", sans-serif;
        }
      `}</style>
    </>
  );
}
