"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import type { ColDef, RowClickedEvent, SelectionChangedEvent, ICellRendererParams, GridOptions } from "ag-grid-community";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useRouter } from "next/navigation";

// Dynamically import AgGridReact with SSR disabled to prevent hydration issues
const AgGridReact = dynamic(
  () => import("ag-grid-react").then((mod) => mod.AgGridReact),
  { ssr: false }
) as typeof AgGridReactType;

import { Header } from "../components/Header";
import { SideNav, SideNavSection, SideNavItem } from "../components/SideNav";
import { Button } from "../components/Button";
import { Pill } from "../components/Pill";
import { Badge } from "../components/Badge";
import { Icon } from "@/design-system/icons";
import {
  Slideout,
  SlideoutHeader,
  SlideoutBody,
  SlideoutSection,
  SlideoutFooter,
  SlideoutFooterGroup,
} from "../components/Slideout";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "../components/Modal";
import { TextField } from "../components/Form";
import { useToast } from "../components/Toast";
import { FilterDropdown, type FilterOption } from "../components/FilterDropdown";
import { AddFilterMenu } from "../components/AddFilterMenu";
import { type LabelType as PillLabelType } from "@/design-system/pill-icons";

import {
  useResourcesByLabel,
  useApproveRecommendations,
  useIgnoreRecommendations,
  exportToCSV,
  type LabelType,
  type ResourceData,
} from "@/hooks/useAILabeling";
import { useAILabelingErrors, type APIError } from "@/hooks/useAILabelingErrors";
import { useDemoErrorMode } from "@/hooks/useDemoErrorMode";
import { NotificationBanner } from "../components/NotificationBanner";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const toLabelType = (type: LabelType): PillLabelType =>
  type.toLowerCase() as PillLabelType;

const formatTimestamp = (timestamp: string | undefined): string => {
  if (!timestamp) return "—";
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return timestamp;
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// ---------------------------------------------------------------------------
// Cell Renderers
// ---------------------------------------------------------------------------

function ResourceCell(params: ICellRendererParams<ResourceData>) {
  const data = params.data;
  if (!data) return null;

  const isCloud = data.resourceType === "cloud";

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {/* Resource Icon Container */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 24,
          height: 24,
          borderRadius: 4,
          background: "#f0f1fa",
          border: "1px solid #a4a6ee",
          flexShrink: 0,
        }}
      >
        <Icon
          name={isCloud ? "cloud" : "server"}
          size={14}
          color="#6366f1"
        />
      </span>
      {/* Resource Name and Hostname */}
      <span style={{ display: "inline-flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#1f272f",
            fontFamily: "'Geist', sans-serif",
            lineHeight: 1.3,
          }}
        >
          {data.resourceName}
        </span>
        {data.hostname && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: "#63788f",
              fontFamily: "'Geist', sans-serif",
              lineHeight: 1.3,
            }}
          >
            {data.hostname}
          </span>
        )}
      </span>
    </span>
  );
}

function PlatformTypeBadge(params: ICellRendererParams<ResourceData>) {
  const isCloud = params.value === "cloud";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 8px",
        borderRadius: 4,
        background: isCloud ? "#f5f7ff" : "#fcf8f2",
        border: `1px solid ${isCloud ? "#e6ebfc" : "#fbefe2"}`,
        whiteSpace: "nowrap",
        lineHeight: "normal",
        verticalAlign: "middle",
      }}
    >
      <Icon
        name={isCloud ? "cloud" : "server"}
        size={14}
        color={isCloud ? "#1c29d9" : "#a45409"}
      />
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: isCloud ? "#1c29d9" : "#a45409",
          fontFamily: "'Geist', sans-serif",
          lineHeight: 1,
        }}
      >
        {isCloud ? "Cloud" : "Data Center"}
      </span>
    </span>
  );
}

function CloudAccountCell(params: ICellRendererParams<ResourceData>) {
  const data = params.data;
  if (!data) return null;

  const csp = data.csp;
  const cspIconMap: Record<string, string> = {
    AWS: "csp-aws",
    Azure: "csp-azure",
    GCP: "csp-gcp",
  };
  const iconName = csp ? cspIconMap[csp] || "cloud" : null;

  if (iconName) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: "4px 8px",
          borderRadius: 6,
          border: "1px solid #d0d4d9",
          whiteSpace: "nowrap",
          lineHeight: "normal",
          verticalAlign: "middle",
        }}
      >
        <Icon name={iconName as "csp-aws" | "csp-azure" | "csp-gcp" | "cloud"} size={16} />
        <span style={{ fontSize: 13, color: "#1f272f", fontFamily: "'Geist Mono', monospace", lineHeight: 1 }}>
          {data.accountId || "—"}
        </span>
      </span>
    );
  }

  return (
    <span style={{ fontSize: 13, color: "#1f272f", fontFamily: "'Geist Mono', monospace" }}>
      {data.accountId || "—"}
    </span>
  );
}

function RegionCell(params: ICellRendererParams<ResourceData>) {
  const data = params.data;
  if (!data) return null;

  return (
    <span style={{ fontSize: 13, color: "#1f272f", fontFamily: "'Geist', sans-serif" }}>
      {data.region || "—"}
    </span>
  );
}

function GradientFlaskIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="flask-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="6.23%" stopColor="#0052D4" />
          <stop offset="53%" stopColor="#4364F7" />
          <stop offset="94.48%" stopColor="#6FB1FC" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3C6 2.44772 6.44772 2 7 2H17C17.5523 2 18 2.44772 18 3C18 3.55228 17.5523 4 17 4H16V9.07048C18.3896 10.4527 20 13.0374 20 16C20 18.2383 19.0795 20.2634 17.5989 21.7142C17.412 21.8974 17.1607 22 16.899 22H7.10102C6.83931 22 6.58804 21.8974 6.40112 21.7142C4.92053 20.2634 4 18.2383 4 16C4 13.0374 5.61038 10.4527 8 9.07048V4H7C6.44772 4 6 3.55228 6 3ZM10 4V9.67363C10 10.0597 9.77779 10.4112 9.42909 10.5769C8.02513 11.2438 6.92256 12.4387 6.3763 13.9038C7.36352 13.3466 8.47279 13.0368 9.60898 13.0031C9.71294 13 9.81758 13 9.98411 13H10.1972C11.5701 13 12.9124 13.4064 14.0547 14.1679C14.8685 14.7105 15.8247 15 16.8028 15H17.917C17.5885 13.0416 16.3113 11.4037 14.5709 10.5769C14.2222 10.4112 14 10.0597 14 9.67363V4H10Z"
        fill="url(#flask-gradient)"
      />
    </svg>
  );
}

function EvidenceButtonCell({ onClick }: { onClick: () => void }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Button
        variant="secondary-outlined"
        size="xs"
        iconOnly
        leftIcon={<GradientFlaskIcon size={16} />}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      />
    </span>
  );
}

function LabelPillsCell(params: ICellRendererParams<ResourceData>) {
  const data = params.data;
  if (!data || !data.existingLabels?.length) {
    return (
      <span style={{ fontSize: 12, color: "#b6c7d9", fontFamily: "'Geist', sans-serif" }}>
        —
      </span>
    );
  }

  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
      {data.existingLabels.slice(0, 3).map((label, i) => (
        <Pill
          key={i}
          labelType={label.type.toLowerCase() as PillLabelType}
          showCloseButton={false}
        >
          {label.type}: {label.value}
        </Pill>
      ))}
      {data.existingLabels.length > 3 && (
        <Badge variant="info">+{data.existingLabels.length - 3}</Badge>
      )}
    </span>
  );
}

const STATUS_MAP: Record<string, { label: string; variant: "info" | "created" | "draft" | "gray" }> = {
  PENDING: { label: "Pending", variant: "draft" },
  APPROVED: { label: "Approved", variant: "created" },
  IGNORED: { label: "Ignored", variant: "gray" },
};

function StatusBadge({ value }: { value: string }) {
  const config = STATUS_MAP[value] || { label: value, variant: "info" };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

function StatusCell(params: ICellRendererParams<ResourceData>) {
  const value = params.value as string;
  return <StatusBadge value={value} />;
}

// ---------------------------------------------------------------------------
// Resource Evidence Slideout
// ---------------------------------------------------------------------------

function ResourceEvidenceSlideout({
  resource,
  labelType,
  labelValue,
  onClose,
  onApprove,
  onIgnore,
}: {
  resource: ResourceData | null;
  labelType: LabelType;
  labelValue: string;
  onClose: () => void;
  onApprove: (resource: ResourceData) => void;
  onIgnore: (resource: ResourceData) => void;
}) {
  const [activeAnchor, setActiveAnchor] = useState("evidence");

  const anchors = [
    { id: "evidence", label: "Evidence" },
    { id: "details", label: "Resource Details" },
    { id: "tags", label: resource?.resourceType === "cloud" ? "Cloud Tags" : "Processes" },
  ];

  if (!resource) return null;

  const evidenceText =
    labelType === "App"
      ? resource.evidence?.appExplanation || resource.evidence?.appExplanationShort
      : resource.evidence?.roleExplanation || resource.evidence?.roleExplanationShort;

  return (
    <>
      <SlideoutHeader
        icon={<Icon name="sparkles" size={20} />}
        iconColor="purple"
        title={resource.resourceName}
        subtitle={`${labelValue}`}
      />

      <SlideoutBody
        anchors={anchors}
        activeAnchorId={activeAnchor}
        onAnchorChange={setActiveAnchor}
      >
        {/* Evidence Section */}
        <SlideoutSection id="evidence" title="AI Evidence">
          <div
            style={{
              background: "#f8f5ff",
              border: "1px solid #e5d9ff",
              borderRadius: 8,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="sparkles" size={16} color="#7c3aed" />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#7c3aed",
                  fontFamily: "'Geist', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Recommendation Reasoning
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "#1f272f",
                fontFamily: "'Geist', sans-serif",
                lineHeight: 1.6,
              }}
            >
              {evidenceText || "No detailed evidence available for this resource."}
            </p>
          </div>

          <div style={{ marginTop: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid #e6e8eb",
              }}
            >
              <span style={{ fontSize: 13, color: "#63788f", fontFamily: "'Geist', sans-serif" }}>
                Recommended Label
              </span>
              <Pill labelType={toLabelType(labelType)} showCloseButton={false}>
                {labelValue}
              </Pill>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid #e6e8eb",
              }}
            >
              <span style={{ fontSize: 13, color: "#63788f", fontFamily: "'Geist', sans-serif" }}>
                Status
              </span>
              <StatusBadge value={resource.status} />
            </div>
          </div>
        </SlideoutSection>

        {/* Resource Details Section */}
        <SlideoutSection id="details" title="Resource Details">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { label: "Name", value: resource.resourceName },
              { label: "Type", value: resource.category || resource.resourceType },
              { label: "Platform", value: resource.resourceType === "cloud" ? "Cloud" : "Data Center" },
              { label: "CSP", value: resource.csp || "—" },
              { label: "Account ID", value: resource.accountId || "—" },
              { label: "Region", value: resource.region || "—" },
              { label: "State", value: resource.state || "—" },
              { label: "Hostname", value: resource.hostname || "—" },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #f0f2f4",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: "#63788f",
                    fontFamily: "'Geist', sans-serif",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#1f272f",
                    fontFamily: label === "Account ID" || label === "Hostname" ? "'Geist Mono', monospace" : "'Geist', sans-serif",
                    textAlign: "right",
                    maxWidth: "60%",
                    wordBreak: "break-all",
                  }}
                >
                  {String(value)}
                </span>
              </div>
            ))}
          </div>

          {resource.existingLabels && resource.existingLabels.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#63788f",
                  fontFamily: "'Geist', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Existing Labels
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {resource.existingLabels.map((label, i) => (
                  <Pill
                    key={i}
                    labelType={label.type.toLowerCase() as PillLabelType}
                    showCloseButton={false}
                  >
                    {label.type}: {label.value}
                  </Pill>
                ))}
              </div>
            </div>
          )}
        </SlideoutSection>

        {/* Cloud Tags or Processes Section */}
        <SlideoutSection
          id="tags"
          title={resource.resourceType === "cloud" ? "Cloud Tags" : "Processes"}
        >
          {resource.resourceType === "cloud" ? (
            resource.cloudTags && Object.keys(resource.cloudTags).length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {Object.entries(resource.cloudTags).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 0",
                      borderBottom: "1px solid #f0f2f4",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontFamily: "'Geist Mono', monospace",
                        color: "#63788f",
                        fontWeight: 500,
                      }}
                    >
                      {key}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontFamily: "'Geist Mono', monospace",
                        color: "#1f272f",
                        textAlign: "right",
                        maxWidth: "55%",
                        wordBreak: "break-all",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: 13, color: "#63788f", fontFamily: "'Geist', sans-serif" }}>
                No cloud tags found for this resource.
              </p>
            )
          ) : resource.processes && resource.processes.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {resource.processes.map((proc, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    background: "#f8f9fa",
                    borderRadius: 6,
                    border: "1px solid #e6e8eb",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#1f272f",
                        fontFamily: "'Geist Mono', monospace",
                      }}
                    >
                      {proc.name}
                    </span>
                    {proc.type && (
                      <span
                        style={{
                          fontSize: 11,
                          color: "#63788f",
                          fontFamily: "'Geist', sans-serif",
                        }}
                      >
                        {proc.type}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    {proc.port && (
                      <span
                        style={{
                          fontSize: 12,
                          fontFamily: "'Geist Mono', monospace",
                          color: "#63788f",
                        }}
                      >
                        :{proc.port}
                      </span>
                    )}
                    <Badge variant="info">{proc.count}</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: 13, color: "#63788f", fontFamily: "'Geist', sans-serif" }}>
              No processes found for this resource.
            </p>
          )}
        </SlideoutSection>
      </SlideoutBody>

      {resource.status === "PENDING" && (
        <SlideoutFooter split>
          <SlideoutFooterGroup>
            <Button variant="primary-ghost" size="sm" onClick={() => onIgnore(resource)}>
              Ignore
            </Button>
          </SlideoutFooterGroup>
          <SlideoutFooterGroup>
            <Button variant="primary" size="sm" onClick={() => onApprove(resource)}>
              Approve
            </Button>
          </SlideoutFooterGroup>
        </SlideoutFooter>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Approve Modal
// ---------------------------------------------------------------------------

function ApproveModal({
  isOpen,
  onClose,
  selectedResources,
  labelType,
  labelValue,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedResources: ResourceData[];
  labelType: LabelType;
  labelValue: string;
  onConfirm: (editedLabelValue: string) => void;
}) {
  const [editedLabelValue, setEditedLabelValue] = useState(labelValue);

  const handleConfirm = () => {
    onConfirm(editedLabelValue);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <ModalHeader title="Approve Label Recommendation" onClose={onClose} />
      <ModalBody>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ margin: 0, fontSize: 14, color: "#63788f", fontFamily: "'Geist', sans-serif" }}>
            Apply this label to <strong style={{ color: "#1f272f" }}>{selectedResources.length} resource{selectedResources.length !== 1 ? "s" : ""}</strong>?
          </p>

          {/* Editable label */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#63788f",
                fontFamily: "'Geist', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Label to Apply
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Pill labelType={toLabelType(labelType)} showCloseButton={false}>
                {labelType}
              </Pill>
              <div style={{ flex: 1 }}>
                <TextField
                  value={editedLabelValue}
                  onChange={setEditedLabelValue}
                  placeholder="Label value"
                />
              </div>
            </div>
          </div>

          {/* Resource list */}
          {selectedResources.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#63788f",
                  fontFamily: "'Geist', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Resources ({selectedResources.length})
              </span>
              <div
                style={{
                  maxHeight: 180,
                  overflowY: "auto",
                  border: "1px solid #e6e8eb",
                  borderRadius: 6,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {selectedResources.map((resource, i) => (
                  <div
                    key={resource.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderBottom: i < selectedResources.length - 1 ? "1px solid #f0f2f4" : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Icon
                        name={resource.resourceType === "cloud" ? "cloud" : "server"}
                        size={14}
                        color={resource.resourceType === "cloud" ? "#1c29d9" : "#a45409"}
                      />
                      <span
                        style={{
                          fontSize: 13,
                          color: "#1f272f",
                          fontFamily: "'Geist', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {resource.resourceName}
                      </span>
                    </div>
                    {resource.region && (
                      <span style={{ fontSize: 12, color: "#63788f", fontFamily: "'Geist', sans-serif" }}>
                        {resource.region}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              background: "#f0f7ff",
              border: "1px solid #cce0ff",
              borderRadius: 8,
              padding: 12,
            }}
          >
            <p style={{ margin: 0, fontSize: 13, color: "#1c4ed8", fontFamily: "'Geist', sans-serif" }}>
              <strong>What happens next:</strong> The label will be applied to the selected resources and synced to your environment.
            </p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary-ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Approve {selectedResources.length > 0 ? `(${selectedResources.length})` : ""}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Ignore Modal
// ---------------------------------------------------------------------------

function IgnoreModal({
  isOpen,
  onClose,
  selectedResources,
  labelType,
  labelValue,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedResources: ResourceData[];
  labelType: LabelType;
  labelValue: string;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(reason);
    setReason("");
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <ModalHeader title="Ignore Recommendation" onClose={onClose} />
      <ModalBody>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ margin: 0, fontSize: 14, color: "#63788f", fontFamily: "'Geist', sans-serif", display: "block" }}>
            Ignore the AI recommendation for{" "}
            <Pill labelType={toLabelType(labelType)} showCloseButton={false}>
              {labelValue}
            </Pill>{" "}
            on <strong style={{ color: "#1f272f" }}>{selectedResources.length} resource{selectedResources.length !== 1 ? "s" : ""}</strong>?
          </span>

          {/* Resource list */}
          {selectedResources.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#63788f",
                  fontFamily: "'Geist', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Resources ({selectedResources.length})
              </span>
              <div
                style={{
                  maxHeight: 160,
                  overflowY: "auto",
                  border: "1px solid #e6e8eb",
                  borderRadius: 6,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {selectedResources.map((resource, i) => (
                  <div
                    key={resource.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 12px",
                      borderBottom: i < selectedResources.length - 1 ? "1px solid #f0f2f4" : "none",
                    }}
                  >
                    <Icon
                      name={resource.resourceType === "cloud" ? "cloud" : "server"}
                      size={14}
                      color={resource.resourceType === "cloud" ? "#1c29d9" : "#a45409"}
                    />
                    <span
                      style={{
                        fontSize: 13,
                        color: "#1f272f",
                        fontFamily: "'Geist', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {resource.resourceName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reason textarea */}
          <div>
            <TextField
              label="Reason (optional)"
              placeholder="Explain why you are ignoring this recommendation..."
              value={reason}
              onChange={setReason}
              size="long"
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary-ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Ignore {selectedResources.length > 0 ? `(${selectedResources.length})` : ""}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Main Floorplan
// ---------------------------------------------------------------------------

export interface AILabelingDetailFloorplanProps {
  labelType: LabelType;
  labelValue: string;
}

export function AILabelingDetailFloorplan({
  labelType,
  labelValue,
}: AILabelingDetailFloorplanProps) {
  const router = useRouter();
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  // Prevent hydration mismatch - only render AG Grid after mount
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Grid state
  const [selectedRows, setSelectedRows] = useState<ResourceData[]>([]);

  // Slideout state
  const [slideoutResource, setSlideoutResource] = useState<ResourceData | null>(null);

  // Modal state
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);
  const [modalResources, setModalResources] = useState<ResourceData[]>([]);

  // Auth error state for persistent banner
  const [authError, setAuthError] = useState<{ status: number; message: string } | null>(null);

  // Filter state
  const [visibleFilters, setVisibleFilters] = useState<string[]>([
    "csp", "resource", "type", "account", "region"
  ]);
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>({
    csp: [],
    resource: [],
    type: [],
    account: [],
    region: [],
    existingLabels: [],
  });

  // Data fetching - fetch all resources (up to 1000) for demo purposes
  const { data: resourcesResponse, isLoading } = useResourcesByLabel({
    labelType,
    labelValue,
    status: "PENDING",
    limit: 1000,
  });

  // Error handling hooks
  const demoConfig = useDemoErrorMode();
  const { handleError, handlePartialSuccess } = useAILabelingErrors();

  const approveMutation = useApproveRecommendations(demoConfig);
  const ignoreMutation = useIgnoreRecommendations(demoConfig);

  const resources: ResourceData[] = useMemo(() => {
    return resourcesResponse?.data || [];
  }, [resourcesResponse]);

  const labelSummary = resourcesResponse?.labelSummary;

  // ---------------------------------------------------------------------------
  // Filter Options
  // ---------------------------------------------------------------------------

  const cspOptions: FilterOption[] = useMemo(() => [
    { id: "AWS", label: "AWS", icon: <Icon name="csp-aws" size={16} /> },
    { id: "Azure", label: "Azure", icon: <Icon name="csp-azure" size={16} /> },
    { id: "GCP", label: "GCP", icon: <Icon name="csp-gcp" size={16} /> },
  ], []);

  const typeOptions: FilterOption[] = useMemo(() => [
    { id: "cloud", label: "Cloud", icon: <Icon name="cloud" size={16} color="#1c29d9" /> },
    { id: "datacenter", label: "Data Center", icon: <Icon name="server" size={16} color="#a45409" /> },
  ], []);

  const resourceOptions: FilterOption[] = useMemo(() => {
    const uniqueResources = [...new Set(resources.map((r) => r.resourceName))];
    return uniqueResources.slice(0, 50).map((name) => ({ id: name, label: name }));
  }, [resources]);

  const accountOptions: FilterOption[] = useMemo(() => {
    const uniqueAccounts = [...new Set(resources.map((r) => r.accountId).filter(Boolean))];
    return uniqueAccounts.map((id) => ({ id: id!, label: id! }));
  }, [resources]);

  const regionOptions: FilterOption[] = useMemo(() => {
    const uniqueRegions = [...new Set(resources.map((r) => r.region).filter(Boolean))];
    return uniqueRegions.map((region) => ({ id: region!, label: region! }));
  }, [resources]);

  const existingLabelsOptions: FilterOption[] = useMemo(() => {
    const allLabels: string[] = [];
    resources.forEach((r) => {
      r.existingLabels?.forEach((l) => {
        const key = `${l.type}:${l.value}`;
        if (!allLabels.includes(key)) allLabels.push(key);
      });
    });
    return allLabels.map((label) => ({ id: label, label }));
  }, [resources]);

  // All available filters
  const allFilters = useMemo(() => [
    { id: "csp", label: "CSP" },
    { id: "resource", label: "Resource" },
    { id: "type", label: "Type" },
    { id: "account", label: "Account" },
    { id: "region", label: "Region" },
    { id: "existingLabels", label: "Existing Labels" },
  ], []);

  // Filters available in Add Filter menu (not currently visible)
  const availableFiltersForMenu = useMemo(() => {
    return allFilters.filter((f) => !visibleFilters.includes(f.id));
  }, [allFilters, visibleFilters]);

  // Filter handlers
  const handleFilterChange = useCallback((filterId: string, values: string[]) => {
    setFilterValues((prev) => ({ ...prev, [filterId]: values }));
  }, []);

  const handleAddFilter = useCallback((filterId: string) => {
    setVisibleFilters((prev) => [...prev, filterId]);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilterValues({
      csp: [],
      resource: [],
      type: [],
      account: [],
      region: [],
      existingLabels: [],
    });
  }, []);

  // Filter resources based on current filter values
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      // CSP filter
      if (filterValues.csp.length > 0 && !filterValues.csp.includes(resource.csp || "")) {
        return false;
      }
      // Resource name filter
      if (filterValues.resource.length > 0 && !filterValues.resource.includes(resource.resourceName)) {
        return false;
      }
      // Type filter
      if (filterValues.type.length > 0 && !filterValues.type.includes(resource.resourceType)) {
        return false;
      }
      // Account filter
      if (filterValues.account.length > 0 && !filterValues.account.includes(resource.accountId || "")) {
        return false;
      }
      // Region filter
      if (filterValues.region.length > 0 && !filterValues.region.includes(resource.region || "")) {
        return false;
      }
      // Existing labels filter
      if (filterValues.existingLabels.length > 0) {
        const resourceLabels = resource.existingLabels?.map((l) => `${l.type}:${l.value}`) || [];
        const hasMatchingLabel = filterValues.existingLabels.some((label) => resourceLabels.includes(label));
        if (!hasMatchingLabel) return false;
      }
      return true;
    });
  }, [resources, filterValues]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.values(filterValues).some((values) => values.length > 0);
  }, [filterValues]);

  // ---------------------------------------------------------------------------
  // Column Definitions
  // ---------------------------------------------------------------------------

  // Create evidence button cell renderer with access to setSlideoutResource
  const EvidenceCell = useCallback(
    (params: ICellRendererParams<ResourceData>) => {
      const data = params.data;
      if (!data) return null;
      return (
        <EvidenceButtonCell
          onClick={() => setSlideoutResource(data)}
        />
      );
    },
    []
  );

  const columnDefs = useMemo<ColDef<ResourceData>[]>(
    () => [
      {
        headerName: "",
        width: 32,
        maxWidth: 32,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        sortable: false,
        filter: false,
        resizable: false,
        suppressMovable: true,
        lockPosition: "left",
      },
      {
        headerName: "Resource",
        field: "resourceName",
        flex: 2,
        minWidth: 180,
        sortable: true,
        filter: false,
        cellRenderer: ResourceCell,
      },
      {
        headerName: "Type",
        field: "resourceType",
        flex: 1,
        minWidth: 120,
        sortable: true,
        filter: false,
        cellRenderer: PlatformTypeBadge,
      },
      {
        headerName: "Account",
        field: "accountId",
        flex: 2,
        minWidth: 180,
        sortable: true,
        filter: false,
        cellRenderer: CloudAccountCell,
      },
      {
        headerName: "Region",
        field: "region",
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: false,
        cellRenderer: RegionCell,
      },
      {
        headerName: "Existing Labels",
        field: "existingLabels",
        flex: 2,
        minWidth: 180,
        sortable: false,
        filter: false,
        cellRenderer: LabelPillsCell,
      },
      {
        headerName: "Evidence",
        field: "id",
        width: 90,
        maxWidth: 90,
        minWidth: 90,
        sortable: false,
        filter: false,
        resizable: false,
        suppressMovable: true,
        cellRenderer: EvidenceCell,
        headerClass: "ag-header-cell-center",
        cellClass: "ag-cell-center",
      },
    ],
    [EvidenceCell]
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: true,
    }),
    []
  );

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleRowClick = useCallback((event: RowClickedEvent<ResourceData>) => {
    if (event.data) {
      setSlideoutResource(event.data);
    }
  }, []);

  const handleSelectionChanged = useCallback((event: SelectionChangedEvent<ResourceData>) => {
    setSelectedRows(event.api.getSelectedRows());
  }, []);

  const handleApproveSelected = useCallback(() => {
    const resourcesToApprove = selectedRows.length > 0 ? selectedRows : resources;
    setModalResources(resourcesToApprove);
    setApproveModalOpen(true);
  }, [selectedRows, resources]);

  const handleIgnoreSelected = useCallback(() => {
    const resourcesToIgnore = selectedRows.length > 0 ? selectedRows : resources;
    setModalResources(resourcesToIgnore);
    setIgnoreModalOpen(true);
  }, [selectedRows, resources]);

  const handleApproveFromSlideout = useCallback((resource: ResourceData) => {
    setModalResources([resource]);
    setSlideoutResource(null);
    setApproveModalOpen(true);
  }, []);

  const handleIgnoreFromSlideout = useCallback((resource: ResourceData) => {
    setModalResources([resource]);
    setSlideoutResource(null);
    setIgnoreModalOpen(true);
  }, []);

  const handleApproveConfirm = useCallback(
    (_editedLabelValue: string) => {
      const ids = modalResources.map((r) => r.id);
      const resourceNames = modalResources.map((r) => r.resourceName);
      approveMutation.mutate(
        { ids, userName: "Current User" },
        {
          onSuccess: (data) => {
            setApproveModalOpen(false);
            setModalResources([]);
            setSelectedRows([]);

            if (data?.partial) {
              handlePartialSuccess(
                { succeeded: data.succeeded, failed: data.failed },
                "Approval"
              );
            } else {
              const description = resourceNames.length === 1
                ? `${labelType} label applied to ${resourceNames[0]}`
                : `${labelType} label applied to ${resourceNames.length} resources`;

              showSuccessToast("Label Approved", {
                description,
                action: {
                  label: "Go to Approved Tab",
                  onClick: () => router.push("/demos/ai-labeling?tab=approved"),
                },
                duration: 5000,
              });
            }
          },
          onError: (err) => {
            const config = handleError(err as APIError, "Approval", () => handleApproveConfirm(_editedLabelValue));
            if (config.status === 401 || config.status === 403) {
              setAuthError({ status: config.status, message: config.description });
            }
            setApproveModalOpen(false);
            setModalResources([]);
          },
        }
      );
    },
    [modalResources, approveMutation, labelType, showSuccessToast, router, handleError, handlePartialSuccess]
  );

  const handleIgnoreConfirm = useCallback(
    (reason: string) => {
      const ids = modalResources.map((r) => r.id);
      const resourceNames = modalResources.map((r) => r.resourceName);
      ignoreMutation.mutate(
        { ids, reason, userName: "Current User" },
        {
          onSuccess: (data) => {
            setIgnoreModalOpen(false);
            setModalResources([]);
            setSelectedRows([]);

            if (data?.partial) {
              handlePartialSuccess(
                { succeeded: data.succeeded, failed: data.failed },
                "Ignore"
              );
            } else {
              const description = resourceNames.length === 1
                ? `${labelType} label ignored for ${resourceNames[0]}`
                : `${labelType} label ignored for ${resourceNames.length} resources`;

              showSuccessToast("Label Ignored", {
                description,
                action: {
                  label: "Go to Ignored Tab",
                  onClick: () => router.push("/demos/ai-labeling?tab=ignored"),
                },
                duration: 5000,
              });
            }
          },
          onError: (err) => {
            const config = handleError(err as APIError, "Ignore", () => handleIgnoreConfirm(reason));
            if (config.status === 401 || config.status === 403) {
              setAuthError({ status: config.status, message: config.description });
            }
            setIgnoreModalOpen(false);
            setModalResources([]);
          },
        }
      );
    },
    [modalResources, ignoreMutation, labelType, showSuccessToast, router, handleError, handlePartialSuccess]
  );

  const handleExport = useCallback(async () => {
    try {
      await exportToCSV("recommended");
    } catch (err) {
      console.error("Export failed:", err);
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="ai-labeling-detail">
      {/* Main area */}
      <div className="ai-labeling-detail__main">
        <Header
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Demos", href: "/demos" },
            { label: "AI Labeling", href: "/demos/ai-labeling" },
            { label: labelValue },
          ]}
          title="Recommended Label:"
          titleSuffix={
            <Pill labelType={toLabelType(labelType)} showCloseButton={false}>
              {labelValue}
            </Pill>
          }
          user={{ firstName: "Aziz", lastName: "Khilawala" }}
          sticky
        />

        {/* Auth Error Banner */}
        {authError && (
          <div style={{ padding: "0 24px", paddingTop: 16 }}>
            <NotificationBanner
              status="error"
              title={authError.status === 401 ? "Session Expired" : "Access Denied"}
              description={authError.message}
              showCloseButton
              onClose={() => setAuthError(null)}
              buttonText={authError.status === 401 ? "Sign In" : undefined}
              onButtonClick={authError.status === 401 ? () => router.push("/login") : undefined}
            />
          </div>
        )}

        {/* Demo Error Mode Indicator */}
        {demoConfig.enabled && (
          <div style={{ padding: "0 24px", paddingTop: 16 }}>
            <NotificationBanner
              status="info"
              title={`Demo Error Mode: ${demoConfig.errorType}`}
              description={
                demoConfig.errorType === "500"
                  ? "Select rows → Click Approve/Ignore → Server error toast with Retry button appears."
                  : demoConfig.errorType === "401"
                  ? "Select rows → Click Approve/Ignore → Session expired banner appears at top."
                  : demoConfig.errorType === "403"
                  ? "Select rows → Click Approve/Ignore → Access denied banner appears at top."
                  : demoConfig.errorType === "504"
                  ? "Select rows → Click Approve/Ignore → Timeout error toast with Try Again button appears."
                  : demoConfig.errorType === "207"
                  ? "Select rows → Click Approve/Ignore → Partial success warning toast shows 2 succeeded, 1 failed."
                  : "Unknown error type"
              }
            />
          </div>
        )}

        <main className="ai-labeling-detail__content">
          {/* Global Actions Bar */}
          <div className="ai-labeling-detail__actions-bar">
            {/* Left side: Approve and Ignore buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Icon name="circle-check" size={16} />}
                onClick={handleApproveSelected}
                disabled={selectedRows.length === 0}
                loading={approveMutation.isPending}
              >
                Approve
              </Button>
              <Button
                variant="secondary-outlined"
                size="sm"
                leftIcon={<Icon name="xmark" size={16} />}
                onClick={handleIgnoreSelected}
                disabled={selectedRows.length === 0}
              >
                Ignore
              </Button>
            </div>

            {/* Right side: Last Updated and Export */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  color: "#63788f",
                  fontFamily: "'Geist', sans-serif",
                }}
              >
                Last Updated: {formatTimestamp(resourcesResponse?.lastUpdated)}
              </span>
              <Button
                variant="secondary-outlined"
                size="sm"
                leftIcon={<Icon name="file-arrow-right" size={16} />}
                onClick={handleExport}
              >
                Export CSV
              </Button>
            </div>
          </div>

          {/* Filter Row */}
          <div className="ai-labeling-detail__filters">
            {visibleFilters.includes("csp") && (
              <FilterDropdown
                label="CSP"
                options={cspOptions}
                selectedValues={filterValues.csp}
                onChange={(values) => handleFilterChange("csp", values)}
              />
            )}
            {visibleFilters.includes("resource") && (
              <FilterDropdown
                label="Resource"
                options={resourceOptions}
                selectedValues={filterValues.resource}
                onChange={(values) => handleFilterChange("resource", values)}
              />
            )}
            {visibleFilters.includes("type") && (
              <FilterDropdown
                label="Type"
                options={typeOptions}
                selectedValues={filterValues.type}
                onChange={(values) => handleFilterChange("type", values)}
                showSearch={false}
              />
            )}
            {visibleFilters.includes("account") && (
              <FilterDropdown
                label="Account"
                options={accountOptions}
                selectedValues={filterValues.account}
                onChange={(values) => handleFilterChange("account", values)}
              />
            )}
            {visibleFilters.includes("region") && (
              <FilterDropdown
                label="Region"
                options={regionOptions}
                selectedValues={filterValues.region}
                onChange={(values) => handleFilterChange("region", values)}
              />
            )}
            {visibleFilters.includes("existingLabels") && (
              <FilterDropdown
                label="Existing Labels"
                options={existingLabelsOptions}
                selectedValues={filterValues.existingLabels}
                onChange={(values) => handleFilterChange("existingLabels", values)}
              />
            )}

            {/* Add Filter Menu */}
            <AddFilterMenu
              availableFilters={availableFiltersForMenu}
              onAddFilter={handleAddFilter}
            />

            {/* Reset Button */}
            {hasActiveFilters && (
              <Button
                variant="secondary-ghost"
                size="sm"
                leftIcon={<Icon name="xmark" size={14} />}
                onClick={handleResetFilters}
              >
                Reset
              </Button>
            )}
          </div>

          {/* AG Grid */}
          <div className="ai-labeling-detail__grid-wrapper ag-theme-alpine">
            {!isMounted || isLoading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    border: "3px solid #e6e8eb",
                    borderTopColor: "#3a88fc",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                <span style={{ fontSize: 14, color: "#63788f", fontFamily: "'Geist', sans-serif" }}>
                  Loading resources...
                </span>
              </div>
            ) : (
              <AgGridReact<ResourceData>
                theme="legacy"
                rowData={filteredResources}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={20}
                paginationPageSizeSelector={[10, 20, 50, 100]}
                rowSelection="multiple"
                animateRows={true}
                suppressCellFocus={false}
                domLayout="normal"
                onRowClicked={handleRowClick}
                onSelectionChanged={handleSelectionChanged}
                getRowId={(params) => params.data.id}
              />
            )}
          </div>
        </main>
      </div>

      {/* Resource Evidence Slideout */}
      {slideoutResource && (
        <Slideout
          isOpen={true}
          onClose={() => setSlideoutResource(null)}
          size="lg"
        >
          <ResourceEvidenceSlideout
            resource={slideoutResource}
            labelType={labelType}
            labelValue={labelValue}
            onClose={() => setSlideoutResource(null)}
            onApprove={handleApproveFromSlideout}
            onIgnore={handleIgnoreFromSlideout}
          />
        </Slideout>
      )}

      {/* Approve Modal */}
      <ApproveModal
        isOpen={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        selectedResources={modalResources}
        labelType={labelType}
        labelValue={labelValue}
        onConfirm={handleApproveConfirm}
      />

      {/* Ignore Modal */}
      <IgnoreModal
        isOpen={ignoreModalOpen}
        onClose={() => setIgnoreModalOpen(false)}
        selectedResources={modalResources}
        labelType={labelType}
        labelValue={labelValue}
        onConfirm={handleIgnoreConfirm}
      />

      <style jsx>{`
        .ai-labeling-detail {
          min-height: 100vh;
          background: var(--bg-page, #f6f8f9);
        }

        .ai-labeling-detail__main {
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
        }

        .ai-labeling-detail__content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 16px 24px;
          gap: 12px;
        }

        .ai-labeling-detail__actions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-shrink: 0;
        }

        .ai-labeling-detail__filters {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .ai-labeling-detail__grid-wrapper {
          flex: 1;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--lightning-gray-200, #e6e8eb);
          background: var(--lightning-contrast-white, #ffffff);
          min-height: 0;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* AG Grid overrides */
        :global(.ai-labeling-detail .ag-theme-alpine) {
          --ag-background-color: var(--lightning-contrast-white, #ffffff);
          --ag-foreground-color: var(--lightning-gray-900, #1d2024);
          --ag-secondary-foreground-color: var(--lightning-bluegray-600, #63788f);
          --ag-header-background-color: var(--lightning-gray-50, #f8f9fa);
          --ag-header-foreground-color: var(--lightning-bluegray-600, #63788f);
          --ag-border-color: var(--lightning-gray-200, #e6e8eb);
          --ag-row-border-color: var(--lightning-gray-100, #f0f2f4);
          --ag-row-hover-color: var(--lightning-gray-50, #f8f9fa);
          --ag-selected-row-background-color: var(--lightning-blue-50, #eff6ff);
          --ag-font-family: "Geist", sans-serif;
          --ag-font-size: 13px;
          --ag-cell-horizontal-padding: 16px;
          --ag-row-height: 56px;
          --ag-header-height: 40px;
          height: 100%;
        }

        :global(.ai-labeling-detail .ag-theme-alpine .ag-cell) {
          display: flex;
          align-items: center;
        }

        :global(.ai-labeling-detail .ag-theme-alpine .ag-cell-wrapper) {
          width: 100%;
        }

        :global(.ai-labeling-detail .ag-theme-alpine .ag-header-cell-center .ag-header-cell-label) {
          justify-content: center;
        }

        :global(.ai-labeling-detail .ag-theme-alpine .ag-cell-center) {
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
