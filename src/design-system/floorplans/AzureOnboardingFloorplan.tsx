"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
  Badge,
  NotificationBanner,
  toast,
  ToastProvider,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/design-system";
import { Icon } from "@/design-system/icons";

// ────────────────────────────────────────────
// Types
// ────────────────────────────────────────────

interface CloudAccount {
  id: string;
  name: string;
  provider: "azure" | "aws";
  tenantId: string;
  status: "connected" | "pending-approval" | "not-started" | "error";
  lastUpdated: string;
  path?: "easy" | "advanced";
  requestedAt?: string;
}

const MOCK_ACCOUNTS: CloudAccount[] = [
  {
    id: "1",
    name: "Production Azure",
    provider: "azure",
    tenantId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    status: "connected",
    lastUpdated: "May 5, 2026",
  },
  {
    id: "2",
    name: "Development Azure",
    provider: "azure",
    tenantId: "f9e8d7c6-b5a4-3210-9876-543210fedcba",
    status: "pending-approval",
    lastUpdated: "May 6, 2026",
    path: "advanced",
    requestedAt: "May 6, 2026 at 3:42 PM",
  },
  {
    id: "3",
    name: "AWS Production",
    provider: "aws",
    tenantId: "123456789012",
    status: "connected",
    lastUpdated: "Apr 28, 2026",
  },
  {
    id: "4",
    name: "Staging Azure",
    provider: "azure",
    tenantId: "",
    status: "not-started",
    lastUpdated: "—",
  },
];

const STATUS_CONFIG: Record<
  CloudAccount["status"],
  { label: string; variant: "new" | "info" | "draft" | "critical" }
> = {
  connected: { label: "Connected", variant: "new" },
  "pending-approval": { label: "Pending Approval", variant: "info" },
  "not-started": { label: "Not Started", variant: "draft" },
  error: { label: "Error", variant: "critical" },
};

// ────────────────────────────────────────────
// Components
// ────────────────────────────────────────────

function StatusWidget({
  label,
  count,
  icon,
  color,
}: {
  label: string;
  count: number;
  icon: string;
  color: string;
}) {
  return (
    <div className="azure-status-widget">
      <div className="azure-status-widget-icon" style={{ background: color + "1a" }}>
        <Icon name={icon as "cloud"} size={20} color={color} />
      </div>
      <div>
        <div className="azure-status-widget-count">{count}</div>
        <div className="azure-status-widget-label">{label}</div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────
// Admin Instructions (shared)
// ────────────────────────────────────────────

const ADMIN_STEPS = [
  {
    num: 1,
    title: 'Open the email from Microsoft Security',
    detail: 'Subject: "Please review the admin consent request for Illumio CloudSecure"',
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
    title: 'Grant Azure Resource Manager access',
    detail:
      'Go to Enterprise Apps → Illumio CloudSecure → Permissions → click "Grant admin consent for [Your Tenant]".',
  },
];

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
    "This grants read-only access — no write access is requested.",
    "",
    "Thanks!",
  ].join("\n");
}

function AdminInstructionsModal({
  isOpen,
  onClose,
  tenantId,
}: {
  isOpen: boolean;
  onClose: () => void;
  tenantId: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = ADMIN_STEPS.map((s) => `${s.num}. ${s.title}\n   ${s.detail}`).join("\n\n");
    navigator.clipboard.writeText(
      `Illumio CloudSecure — Azure Admin Approval Needed\n\n${text}\n\nTenant ID: ${tenantId}`,
    );
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
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <ModalHeader title="Admin Approval Steps" onClose={onClose} />
      <ModalBody>
        <div className="azure-modal-steps">
          <p className="azure-modal-steps-intro">
            Your Azure admin needs to complete these steps in the Microsoft Entra Portal:
          </p>
          {ADMIN_STEPS.map((step) => (
            <div key={step.num} className="azure-modal-step-item">
              <div className="azure-modal-step-num">{step.num}</div>
              <div>
                <div className="azure-modal-step-title">{step.title}</div>
                <div className="azure-modal-step-detail">{step.detail}</div>
              </div>
            </div>
          ))}
          <div className="azure-modal-steps-tenant">
            <span className="azure-modal-steps-tenant-label">Tenant ID</span>
            <code className="azure-modal-steps-tenant-value">{tenantId}</code>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div style={{ display: "flex", gap: 8, width: "100%", justifyContent: "flex-end" }}>
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
      </ModalFooter>
    </Modal>
  );
}

// ────────────────────────────────────────────
// Account Row (expandable for pending)
// ────────────────────────────────────────────

function AccountRow({
  account,
  onShowSteps,
}: {
  account: CloudAccount;
  onShowSteps: (tenantId: string) => void;
}) {
  const [expanded, setExpanded] = useState(account.status === "pending-approval");
  const statusCfg = STATUS_CONFIG[account.status];
  const isPending = account.status === "pending-approval";

  const handleResendEmail = () => {
    const subject = encodeURIComponent(
      "Reminder: Approve Illumio CloudSecure for Azure onboarding",
    );
    const body = encodeURIComponent(getAdminEmailBody(account.tenantId));
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <div className={`azure-account-row-wrapper ${isPending && expanded ? "expanded" : ""}`}>
      <div className="azure-account-row" onClick={() => isPending && setExpanded(!expanded)}>
        <div className="azure-account-name">
          {isPending && (
            <Icon
              name={expanded ? "chevron-down" : "chevron-right"}
              size={12}
              color="var(--lightning-bluegray-400, #96a7b6)"
            />
          )}
          <Icon
            name="cloud"
            size={16}
            color={account.provider === "azure" ? "#0078D4" : "#FF9900"}
          />
          <span>{account.name}</span>
        </div>
        <div className="azure-account-tenant">{account.tenantId || "—"}</div>
        <div>
          <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
        </div>
        <div className="azure-account-date">{account.lastUpdated}</div>
        <div className="azure-account-actions">
          {account.status === "pending-approval" && (
            <Link
              href={`/demos/azure-onboarding/wizard?resume=true&path=${account.path || "advanced"}&tenantId=${account.tenantId}&subscriptionName=${encodeURIComponent(account.name)}`}
              style={{ textDecoration: "none" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button size="sm" variant="primary-ghost">
                Resume
              </Button>
            </Link>
          )}
          {account.status === "not-started" && (
            <Link href="/demos/azure-onboarding/wizard" style={{ textDecoration: "none" }}>
              <Button size="sm" variant="primary-ghost">
                Start
              </Button>
            </Link>
          )}
        </div>
      </div>

      {isPending && expanded && (
        <div className="azure-pending-expansion">
          <div className="azure-pending-expansion-info">
            <Icon name="clock" size={16} color="#d97706" />
            <span>
              Waiting for admin approval since {account.requestedAt || account.lastUpdated}
            </span>
          </div>
          <div className="azure-pending-expansion-actions">
            <Link
              href={`/demos/azure-onboarding/wizard?resume=true&path=${account.path || "advanced"}&tenantId=${account.tenantId}&subscriptionName=${encodeURIComponent(account.name)}`}
              style={{ textDecoration: "none" }}
            >
              <Button size="sm" variant="primary" leftIcon={<Icon name="arrow-right" size={14} />}>
                Resume Onboarding
              </Button>
            </Link>
            <Button
              size="sm"
              leftIcon={<Icon name="mail" size={14} />}
              onClick={handleResendEmail}
            >
              Resend Email
            </Button>
            <Button
              size="sm"
              leftIcon={<Icon name="list-check" size={14} />}
              onClick={() => onShowSteps(account.tenantId)}
            >
              View Steps
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────
// Main Export
// ────────────────────────────────────────────

export interface AzureOnboardingFloorplanProps {
  pageTitle?: string;
}

export function AzureOnboardingFloorplan({
  pageTitle = "Cloud Onboarding",
}: AzureOnboardingFloorplanProps) {
  const [showApprovalBanner, setShowApprovalBanner] = useState(false);
  const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);
  const [stepsModalTenantId, setStepsModalTenantId] = useState<string | null>(null);

  const totalCount = accounts.length;
  const connectedCount = accounts.filter((a) => a.status === "connected").length;
  const pendingCount = accounts.filter((a) => a.status === "pending-approval").length;

  const handleSimulateApproval = () => {
    setShowApprovalBanner(true);
    toast.success("Admin has approved the consent request for Development Azure.");
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === "2" ? { ...a, status: "connected" as const, lastUpdated: "May 7, 2026" } : a,
      ),
    );
  };

  const handleSimulateDenial = () => {
    toast.error("Admin has denied the consent request for Development Azure.");
    setAccounts((prev) =>
      prev.map((a) => (a.id === "2" ? { ...a, status: "error" as const } : a)),
    );
  };

  return (
    <ToastProvider>
      <div className="azure-onboarding-page">
        {/* Header */}
        <div className="azure-page-header">
          <div>
            <div className="azure-breadcrumb">
              <Link
                href="/demos"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 13,
                  color: "var(--lightning-blue-600, #2366ed)",
                  textDecoration: "none",
                }}
              >
                <Icon name="arrow-left" size={14} />
                Demos
              </Link>
            </div>
            <h1 className="azure-page-title">{pageTitle}</h1>
          </div>
          <Link href="/demos/azure-onboarding/wizard" style={{ textDecoration: "none" }}>
            <Button variant="primary" leftIcon={<Icon name="plus" size={14} />}>
              Add Cloud Account
            </Button>
          </Link>
        </div>

        {/* Approval Banner */}
        {showApprovalBanner && (
          <div style={{ marginBottom: 20 }}>
            <NotificationBanner
              status="success"
              onClose={() => setShowApprovalBanner(false)}
            >
              Admin consent has been granted for Development Azure. You can now resume
              onboarding.
            </NotificationBanner>
          </div>
        )}

        {/* Status Widgets */}
        <div className="azure-widgets">
          <StatusWidget label="Total" count={totalCount} icon="cloud" color="#3a88fc" />
          <StatusWidget label="Connected" count={connectedCount} icon="check" color="#16a34a" />
          <StatusWidget
            label="Pending"
            count={pendingCount}
            icon="circle-exclamation"
            color="#d97706"
          />
        </div>

        {/* Account List */}
        <div className="azure-account-table">
          <div className="azure-account-header-row">
            <div className="azure-account-name">Name</div>
            <div className="azure-account-tenant">Tenant / Account ID</div>
            <div>Status</div>
            <div className="azure-account-date">Last Updated</div>
            <div className="azure-account-actions">Actions</div>
          </div>
          {accounts.map((account) => (
            <AccountRow
              key={account.id}
              account={account}
              onShowSteps={(tenantId) => setStepsModalTenantId(tenantId)}
            />
          ))}
        </div>

        {/* Simulation Controls */}
        <div className="azure-sim-controls">
          <div className="azure-sim-badge">Simulation Controls</div>
          <p className="azure-sim-description">
            Simulate the admin approval workflow for the &ldquo;Development Azure&rdquo; account
            that is pending approval.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <Button size="sm" variant="primary" onClick={handleSimulateApproval}>
              Simulate Admin Approval
            </Button>
            <Button size="sm" onClick={handleSimulateDenial}>
              Simulate Admin Denial
            </Button>
          </div>
        </div>
        {/* Admin Instructions Modal */}
        <AdminInstructionsModal
          isOpen={stepsModalTenantId !== null}
          onClose={() => setStepsModalTenantId(null)}
          tenantId={stepsModalTenantId || ""}
        />
      </div>

      <style jsx>{`
        :global(.azure-onboarding-page) {
          min-height: 100vh;
          background: var(--lightning-gray-25, #f7f9fa);
          padding: 32px 48px;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-page-header) {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        :global(.azure-breadcrumb) {
          margin-bottom: 8px;
        }

        :global(.azure-page-title) {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: var(--lightning-bluegray-900, #1f272f);
        }

        :global(.azure-widgets) {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        :global(.azure-status-widget) {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: white;
          border: 1px solid var(--lightning-bluegray-200, #dfe6ed);
          border-radius: 8px;
          min-width: 160px;
        }

        :global(.azure-status-widget-icon) {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        :global(.azure-status-widget-count) {
          font-size: 24px;
          font-weight: 700;
          color: var(--lightning-bluegray-900, #1f272f);
          line-height: 1;
        }

        :global(.azure-status-widget-label) {
          font-size: 12px;
          color: var(--lightning-bluegray-600, #63788f);
          margin-top: 2px;
        }

        :global(.azure-account-table) {
          background: white;
          border: 1px solid var(--lightning-bluegray-200, #dfe6ed);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        :global(.azure-account-header-row) {
          display: grid;
          grid-template-columns: 1.5fr 2fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 12px 20px;
          background: var(--lightning-gray-25, #f7f9fa);
          border-bottom: 1px solid var(--lightning-bluegray-200, #dfe6ed);
          font-size: 12px;
          font-weight: 600;
          color: var(--lightning-bluegray-600, #63788f);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        :global(.azure-account-row) {
          display: grid;
          grid-template-columns: 1.5fr 2fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 14px 20px;
          align-items: center;
          border-bottom: 1px solid var(--lightning-bluegray-100, #eef2f6);
          font-size: 13px;
          color: var(--lightning-bluegray-900, #1f272f);
        }

        :global(.azure-account-row:last-child) {
          border-bottom: none;
        }

        :global(.azure-account-name) {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }

        :global(.azure-account-tenant) {
          font-size: 12px;
          color: var(--lightning-bluegray-600, #63788f);
          font-family: "Geist Mono", monospace;
        }

        :global(.azure-account-date) {
          font-size: 12px;
          color: var(--lightning-bluegray-500, #7a90a4);
        }

        :global(.azure-account-actions) {
          display: flex;
          justify-content: flex-end;
        }

        :global(.azure-sim-controls) {
          border: 2px dashed var(--lightning-bluegray-200, #dfe6ed);
          border-radius: 8px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        :global(.azure-sim-badge) {
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
        }

        :global(.azure-sim-description) {
          font-size: 13px;
          color: var(--lightning-bluegray-600, #63788f);
          margin: 0;
          line-height: 1.5;
        }

        /* ── Expandable Account Row ── */

        :global(.azure-account-row-wrapper) {
          border-bottom: 1px solid var(--lightning-bluegray-100, #eef2f6);
        }

        :global(.azure-account-row-wrapper:last-child) {
          border-bottom: none;
        }

        :global(.azure-account-row-wrapper.expanded) {
          background: var(--lightning-blue-25, #eff6ff);
        }

        :global(.azure-account-row-wrapper .azure-account-row) {
          border-bottom: none;
        }

        :global(.azure-account-row-wrapper.expanded .azure-account-row) {
          cursor: pointer;
        }

        :global(.azure-account-row-wrapper .azure-account-row:hover) {
          background: var(--lightning-gray-25, #f7f9fa);
        }

        :global(.azure-account-row-wrapper.expanded .azure-account-row:hover) {
          background: transparent;
        }

        :global(.azure-pending-expansion) {
          padding: 0 20px 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        :global(.azure-pending-expansion-info) {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #92400e;
          background: #fef3c7;
          border: 1px solid #fbbf24;
          border-radius: 6px;
          padding: 10px 14px;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-pending-expansion-actions) {
          display: flex;
          gap: 8px;
        }

        /* ── Admin Steps Modal ── */

        :global(.azure-modal-steps) {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 4px 0;
        }

        :global(.azure-modal-steps-intro) {
          font-size: 13px;
          color: var(--lightning-bluegray-600, #63788f);
          margin: 0;
          line-height: 1.5;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-modal-step-item) {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        :global(.azure-modal-step-num) {
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

        :global(.azure-modal-step-title) {
          font-size: 13px;
          font-weight: 600;
          color: var(--lightning-bluegray-900, #1f272f);
          line-height: 1.5;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-modal-step-detail) {
          font-size: 12px;
          color: var(--lightning-bluegray-500, #7a90a4);
          line-height: 1.4;
          margin-top: 2px;
          font-family: "Geist", sans-serif;
        }

        :global(.azure-modal-steps-tenant) {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: var(--lightning-gray-25, #f7f9fa);
          border: 1px solid var(--lightning-bluegray-200, #dfe6ed);
          border-radius: 6px;
          margin-top: 4px;
        }

        :global(.azure-modal-steps-tenant-label) {
          font-size: 12px;
          font-weight: 600;
          color: var(--lightning-bluegray-600, #63788f);
          font-family: "Geist", sans-serif;
        }

        :global(.azure-modal-steps-tenant-value) {
          font-size: 12px;
          font-family: "Geist Mono", monospace;
          color: var(--lightning-bluegray-900, #1f272f);
          background: none;
          padding: 0;
        }
      `}</style>
    </ToastProvider>
  );
}
