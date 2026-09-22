"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { Header } from "../components/Header";
import { SideNav, SideNavSection, SideNavItem } from "../components/SideNav";
import { OptionSelector } from "../components/Form";
import { Button } from "../components/Button";
import { Pill } from "../components/Pill";
import { Tabs, TabList } from "../components/Tab";
import { Switch } from "../components/Switch";
import { Illustration } from "../illustrations";
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
import { Icon } from "@/design-system/icons";
import { type LabelType as PillLabelType } from "@/design-system/pill-icons";
import { Toggle } from "@/design-system/components/Toggle";
import { Tooltip } from "@/design-system/components/Tooltip";
import { FilterDropdown, type FilterOption } from "../components/FilterDropdown";
import { AddFilterMenu } from "../components/AddFilterMenu";
import { useRouter, useSearchParams } from "next/navigation";

// React Query hooks for data fetching
import {
  useRecommendations,
  useApproved,
  useIgnored,
  useLabels,
  useApprovedResources,
  useIgnoredResources,
  useApproveRecommendations,
  useIgnoreRecommendations,
  useRestoreRecommendations,
  useResetDemo,
  type LabelType as APILabelType,
  type GroupedRecommendation,
  type ApprovedResourceData,
  type IgnoredResourceData,
} from "@/hooks/useAILabeling";
import { useAILabelingErrors, type APIError } from "@/hooks/useAILabelingErrors";
import { useDemoErrorMode } from "@/hooks/useDemoErrorMode";
import { useToast } from "../components/Toast";
import { NotificationBanner } from "../components/NotificationBanner";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CSP = "AWS" | "Azure" | "GCP";
type LabelType = "App" | "Role" | "Env" | "Loc";
type TabId = "recommended" | "approved" | "ignored";

// Helper to convert page LabelType to PillIcon labelType
const toLabelType = (type: LabelType): PillLabelType =>
  type.toLowerCase() as PillLabelType;

// Mapping for Group By options to labelType
const groupByToLabelTypeMap: Record<string, PillLabelType> = {
  application: "app",
  role: "role",
  environment: "env",
  location: "loc",
};

interface LabelData {
  type: LabelType;
  value: string;
}

interface AppCardData {
  id: string;
  label: LabelData;
  totalResources: number;
  cloudCount: number;
  dataCenterCount: number;
  csp: CSP;
  evidence: string;
  lastUpdated?: string;
}

interface ApprovedAppData extends AppCardData {
  approvedBy: string;
  approvedAt: string;
}

interface IgnoredAppData extends AppCardData {
  reason: string;
  ignoredBy: string;
  ignoredAt: string;
}

// ---------------------------------------------------------------------------
// Filter options
// ---------------------------------------------------------------------------

// Predicted labels options are now generated dynamically based on Group By selection

const TIME_OPTIONS = [
  { id: "all", label: "All Time" },
  { id: "24h", label: "Last 24 Hours" },
  { id: "7d", label: "Last 7 Days" },
  { id: "30d", label: "Last 30 Days" },
  { id: "90d", label: "Last 90 Days" },
];

const GROUP_BY_OPTIONS: { id: string; label: string; icon: string }[] = [
  { id: "application", label: "Applications", icon: "grid" },
  { id: "role", label: "Roles", icon: "user" },
  { id: "environment", label: "Environments", icon: "leaf" },
  { id: "location", label: "Locations", icon: "location" },
];

const SORT_OPTIONS = [
  { id: "resources-desc", label: "Resource Count (High → Low)" },
  { id: "resources-asc", label: "Resource Count (Low → High)" },
  { id: "name-asc", label: "Label (A → Z)" },
  { id: "name-desc", label: "Label (Z → A)" },
  { id: "time-desc", label: "Time (New → Old)" },
  { id: "time-asc", label: "Time (Old → New)" },
];

const IGNORE_REASON_OPTIONS = [
  { id: "not-applicable", label: "Not applicable" },
  { id: "incorrect", label: "Incorrect recommendation" },
  { id: "already-labeled", label: "Already labeled" },
  { id: "other", label: "Other" },
];

// ---------------------------------------------------------------------------
// Tab definitions
// ---------------------------------------------------------------------------

const TAB_OPTIONS = [
  { id: "recommended", label: "Recommended" },
  { id: "approved", label: "Approved" },
  { id: "ignored", label: "Ignored" },
];

// ---------------------------------------------------------------------------
// Mock data - Recommended Apps
// ---------------------------------------------------------------------------

const MOCK_RECOMMENDED: AppCardData[] = [
  {
    id: "app-001",
    label: { type: "App", value: "CRM" },
    totalResources: 60,
    cloudCount: 55,
    dataCenterCount: 5,
    csp: "AWS",
    evidence: "Resources in this group share common naming patterns (crm-*) and communicate with known CRM database servers. Traffic analysis shows 95% internal communication within this application boundary.",
  },
  {
    id: "app-002",
    label: { type: "App", value: "Analytics" },
    totalResources: 45,
    cloudCount: 42,
    dataCenterCount: 3,
    csp: "AWS",
    evidence: "These resources process analytics data with consistent 'analytics_' prefixes. Connected to data warehouse and BI tools.",
  },
  {
    id: "app-003",
    label: { type: "App", value: "Payments" },
    totalResources: 32,
    cloudCount: 28,
    dataCenterCount: 4,
    csp: "AWS",
    evidence: "Payment processing infrastructure with PCI-compliant network segmentation. All resources communicate with payment gateway APIs.",
  },
  {
    id: "app-004",
    label: { type: "App", value: "Identity" },
    totalResources: 18,
    cloudCount: 18,
    dataCenterCount: 0,
    csp: "AWS",
    evidence: "Authentication and authorization services. Handles OAuth tokens and integrates with Cognito user pools.",
  },
  {
    id: "app-005",
    label: { type: "App", value: "Marketing" },
    totalResources: 24,
    cloudCount: 20,
    dataCenterCount: 4,
    csp: "Azure",
    evidence: "Marketing automation and campaign management resources. Connected to email delivery services and CRM integration.",
  },
  {
    id: "app-006",
    label: { type: "App", value: "Inventory" },
    totalResources: 38,
    cloudCount: 30,
    dataCenterCount: 8,
    csp: "AWS",
    evidence: "Inventory management system with warehouse integrations. Receives orders from e-commerce platform.",
  },
  {
    id: "app-007",
    label: { type: "App", value: "MLOps" },
    totalResources: 15,
    cloudCount: 15,
    dataCenterCount: 0,
    csp: "GCP",
    evidence: "Machine learning training and inference infrastructure. Connected to Cloud Storage with training datasets.",
  },
  {
    id: "app-008",
    label: { type: "App", value: "HR Portal" },
    totalResources: 12,
    cloudCount: 10,
    dataCenterCount: 2,
    csp: "AWS",
    evidence: "Human resources application handling employee data. Integrates with Workday API and LDAP directory.",
  },
  {
    id: "app-009",
    label: { type: "Role", value: "Database" },
    totalResources: 28,
    cloudCount: 22,
    dataCenterCount: 6,
    csp: "AWS",
    evidence: "Database tier resources including RDS instances and Aurora clusters. Receives connections from application tier.",
  },
  {
    id: "app-010",
    label: { type: "App", value: "CDN" },
    totalResources: 8,
    cloudCount: 8,
    dataCenterCount: 0,
    csp: "AWS",
    evidence: "Content delivery resources serving static assets through CloudFront. Contains images, CSS, and JavaScript files.",
  },
  {
    id: "app-011",
    label: { type: "App", value: "Logging" },
    totalResources: 16,
    cloudCount: 14,
    dataCenterCount: 2,
    csp: "AWS",
    evidence: "Centralized logging infrastructure with Elasticsearch cluster. Receives logs from all environments.",
  },
  {
    id: "app-012",
    label: { type: "App", value: "Orders" },
    totalResources: 22,
    cloudCount: 18,
    dataCenterCount: 4,
    csp: "AWS",
    evidence: "Order processing services connected to e-commerce platform. Communicates with payment and fulfillment systems.",
  },
];

const MOCK_APPROVED_INITIAL: ApprovedAppData[] = [
  {
    id: "approved-001",
    label: { type: "App", value: "API Gateway" },
    totalResources: 14,
    cloudCount: 14,
    dataCenterCount: 0,
    csp: "AWS",
    evidence: "API Gateway infrastructure serving microservices architecture.",
    approvedBy: "Aziz Khilawala",
    approvedAt: "Apr 13, 2026 10:30 AM",
  },
  {
    id: "approved-002",
    label: { type: "App", value: "Auth" },
    totalResources: 8,
    cloudCount: 8,
    dataCenterCount: 0,
    csp: "AWS",
    evidence: "Authentication service resources.",
    approvedBy: "John Smith",
    approvedAt: "Apr 12, 2026 3:15 PM",
  },
];

const MOCK_IGNORED_INITIAL: IgnoredAppData[] = [
  {
    id: "ignored-001",
    label: { type: "App", value: "Migration" },
    totalResources: 6,
    cloudCount: 6,
    dataCenterCount: 0,
    csp: "AWS",
    evidence: "Temporary migration resources.",
    reason: "Not applicable - temporary resource",
    ignoredBy: "Sarah Johnson",
    ignoredAt: "Apr 10, 2026 2:45 PM",
  },
];

// ---------------------------------------------------------------------------
// Group By Selector Component
// ---------------------------------------------------------------------------

function GroupBySelector({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { id: string; label: string; icon: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.id === value) || options[0];

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "4px 12px",
          background: "#ffffff",
          border: "1px solid #b6c7d9",
          borderRadius: 8,
          cursor: "pointer",
          outline: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "#1f272f",
              fontFamily: "'Geist', sans-serif",
              lineHeight: "normal",
              whiteSpace: "nowrap",
            }}
          >
            Group By:
          </span>
          {/* Label pill showing selected value - using Pill component */}
          <Pill
            labelType={groupByToLabelTypeMap[selectedOption.id]}
            showCloseButton={false}
          >
            {selectedOption.label}
          </Pill>
        </div>
        {/* Chevron */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <Icon name="chevron-down" size={16} color="#63788f" />
        </div>
      </button>

      {/* Dropdown menu - matching Figma: 320px width, min 240px */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10,
            }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              width: 320,
              minWidth: 240,
              background: "#ffffff",
              borderRadius: 8,
              boxShadow: "0px 4px 24px rgba(133, 153, 172, 0.25)",
              backdropFilter: "blur(8px)",
              zIndex: 20,
              overflow: "hidden",
            }}
          >
            {/* Options container */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                padding: "4px 0",
                overflowX: "hidden",
                overflowY: "auto",
              }}
            >
              {/* Category wrapper */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 4px",
                }}
              >
                {options.map((option) => {
                  const isSelected = value === option.id;

                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        onChange(option.id);
                        setIsOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        width: "100%",
                        padding: "8px 4px",
                        background: "transparent",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      {/* Check icon - visible only when selected */}
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {isSelected && (
                          <Icon name="check" size={12} color="#2366ed" />
                        )}
                      </div>

                      {/* Label pill - using Pill component */}
                      <Pill
                        labelType={groupByToLabelTypeMap[option.id]}
                        showCloseButton={false}
                      >
                        {option.label}
                      </Pill>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Filter Dropdown Component
// ---------------------------------------------------------------------------

function PredictedLabelsDropdown({
  value,
  onChange,
  options,
  labelType,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  options: { id: string; label: string }[];
  labelType: LabelType;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter(
    (opt) => opt.id !== "all" && opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (optionId: string) => {
    if (value.includes(optionId)) {
      onChange(value.filter((v) => v !== optionId));
    } else {
      onChange([...value, optionId]);
    }
  };

  const hasSelection = value.length > 0;

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 8px",
          background: isOpen || hasSelection ? "#F2F5F7" : "#ffffff",
          border: `1px solid ${isOpen || hasSelection ? "#D0D4D9" : "#DBDFE2"}`,
          borderRadius: 6,
          cursor: "pointer",
          outline: "none",
          boxShadow: "0 1px 3px 0 rgba(31, 39, 47, 0.10)",
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#1D2024",
            fontFamily: "'Geist', sans-serif",
            lineHeight: "20px",
            whiteSpace: "nowrap",
          }}
        >
          Recommended Labels{hasSelection ? ` (${value.length})` : ""}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <Icon name="chevron-down" size={14} color="#63788f" />
        </div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10,
            }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              width: 250,
              maxHeight: 320,
              background: "#ffffff",
              borderRadius: 8,
              boxShadow: "1px 2px 8px rgba(69, 84, 101, 0.4)",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Search field */}
            <div style={{ padding: 8 }}>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  height: 32,
                  padding: 8,
                  border: "1px solid #b6c7d9",
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: "'Geist', sans-serif",
                  color: "#1f272f",
                  outline: "none",
                }}
              />
            </div>

            {/* Options list */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 8,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {filteredOptions.map((option) => (
                <label
                  key={option.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                  }}
                >
                  {/* Checkbox */}
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      border: `1px solid ${value.includes(option.id) ? "#2366ed" : "#c9d6e2"}`,
                      background: value.includes(option.id) ? "#2366ed" : "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                    onClick={() => handleToggle(option.id)}
                  >
                    {value.includes(option.id) && (
                      <Icon name="check" size={10} color="#ffffff" />
                    )}
                  </div>

                  {/* Label pill */}
                  <Pill
                    labelType={toLabelType(labelType)}
                    showCloseButton={false}
                  >
                    {option.label}
                  </Pill>
                </label>
              ))}
              {filteredOptions.length === 0 && (
                <div
                  style={{
                    padding: "12px 8px",
                    textAlign: "center",
                    color: "#7a90a4",
                    fontSize: 13,
                    fontFamily: "'Geist', sans-serif",
                  }}
                >
                  No labels found
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function TimeFilterDropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { id: string; label: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSelection = value !== "all";
  const selectedOption = options.find((o) => o.id === value);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 8px",
          background: isOpen || hasSelection ? "#F2F5F7" : "#ffffff",
          border: `1px solid ${isOpen || hasSelection ? "#D0D4D9" : "#DBDFE2"}`,
          borderRadius: 6,
          cursor: "pointer",
          outline: "none",
          boxShadow: "0 1px 3px 0 rgba(31, 39, 47, 0.10)",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 14,
            fontFamily: "'Geist', sans-serif",
            lineHeight: "20px",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontWeight: 500, color: "#1D2024" }}>Time</span>
          {hasSelection && (
            <>
              <span style={{ fontWeight: 400, color: "#63788f" }}>is</span>
              <span style={{ fontWeight: 500, color: "#1f272f" }}>{selectedOption?.label}</span>
            </>
          )}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <Icon name="chevron-down" size={14} color="#63788f" />
        </div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10,
            }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              minWidth: 200,
              background: "#ffffff",
              borderRadius: 8,
              boxShadow: "0px 4px 24px rgba(133, 153, 172, 0.25)",
              zIndex: 20,
              overflow: "hidden",
              padding: 4,
            }}
          >
            <div style={{ padding: 4 }}>
              {options.map((option) => {
                const isSelected = value === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      onChange(option.id);
                      setIsOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      width: "100%",
                      padding: "8px 4px",
                      background: "transparent",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {/* Radio button */}
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: `2px solid ${isSelected ? "#3a88fc" : "#c9d6e2"}`,
                        background: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#3a88fc",
                          }}
                        />
                      )}
                    </div>
                    {/* Label */}
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#1f272f",
                        fontFamily: "'Geist', sans-serif",
                        lineHeight: "20px",
                      }}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sort By Selector Component
// ---------------------------------------------------------------------------

function SortBySelector({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { id: string; label: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.id === value) || options[0];

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "4px 12px",
          background: "#ffffff",
          border: "1px solid #b6c7d9",
          borderRadius: 8,
          cursor: "pointer",
          outline: "none",
          height: 32,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "#1f272f",
              fontFamily: "'Geist', sans-serif",
              lineHeight: "normal",
              whiteSpace: "nowrap",
            }}
          >
            Sort by:
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "#1f272f",
              fontFamily: "'Geist', sans-serif",
              lineHeight: "normal",
              whiteSpace: "nowrap",
            }}
          >
            {selectedOption.label}
          </span>
        </div>
        {/* Chevron */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <Icon name="chevron-down" size={16} color="#63788f" />
        </div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10,
            }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              right: 0,
              minWidth: "100%",
              background: "#ffffff",
              border: "1px solid #e6e8eb",
              borderRadius: 8,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
              zIndex: 20,
              overflow: "hidden",
            }}
          >
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "8px 12px",
                  background: value === option.id ? "#f0f7ff" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: value === option.id ? 500 : 400,
                    color: "#1f272f",
                    fontFamily: "'Geist', sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  {option.label}
                </span>
                {value === option.id && (
                  <div style={{ marginLeft: "auto" }}>
                    <Icon name="check" size={14} color="#2366ed" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Video Banner Component
// ---------------------------------------------------------------------------

function VideoBanner({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#f7f4ee",
        borderRadius: 12,
        padding: "20px 60px 16px 24px",
        position: "relative",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        overflow: "visible",
        flexShrink: 0,
        minHeight: 136,
      }}
    >
      {/* Content Block */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flexShrink: 0,
        }}
      >
        {/* Text block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            color: "#1f272f",
            lineHeight: "normal",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "'Geist', sans-serif",
              maxWidth: 542,
            }}
          >
            AI labeling that feels effortless
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 400,
              fontFamily: "'Geist', sans-serif",
              maxWidth: 736,
            }}
          >
            Assign AI-recommended labels to resources based on ML evidence. Review recommendations, approve or ignore at scale, and keep your asset taxonomy in sync with confidence.
          </p>
        </div>

        {/* Button */}
        <div style={{ display: "flex", gap: 0 }}>
          <Button variant="secondary-outlined" size="xs">
            <Icon name="message-square" size={14} />
            Learn More
          </Button>
        </div>
      </div>

      {/* Video Thumbnail */}
      <div
        style={{
          flexShrink: 0,
          background: "#ffffff",
          border: "1px solid #ffb74a",
          borderRadius: 8,
          padding: 8,
          boxShadow: "0px 1px 1px rgba(31,39,47,0.1), 0px 1px 2px rgba(31,39,47,0.1), 0px 1px 3px rgba(31,39,47,0.1)",
        }}
      >
        <div
          style={{
            width: 180,
            height: 100,
            borderRadius: 4,
            background: "linear-gradient(135deg, #ff9f43 0%, #ff6b35 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative shapes */}
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 60,
              height: 60,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 4,
              transform: "rotate(15deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              right: 30,
              width: 80,
              height: 80,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 4,
              transform: "rotate(-10deg)",
            }}
          />

          {/* Play button */}
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
              zIndex: 1,
            }}
          >
            <Icon name="play" size={16} color="#ff6b35" />
          </div>

          {/* Timestamp badge */}
          <div
            style={{
              position: "absolute",
              bottom: 6,
              right: 6,
              background: "rgba(31, 39, 47, 0.72)",
              border: "0.2px solid rgba(255,255,255,0.24)",
              borderRadius: 2,
              padding: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 400,
                fontFamily: "'Geist Mono', monospace",
                color: "#ffffff",
                lineHeight: "normal",
                whiteSpace: "nowrap",
              }}
            >
              0:52
            </span>
          </div>
        </div>
      </div>

      {/* Close button */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 28,
            height: 28,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            padding: 2,
          }}
        >
          <Icon name="xmark" size={16} color="#63788f" />
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// App Card Component
// ---------------------------------------------------------------------------

function AppCard({
  data,
  onClick,
}: {
  data: AppCardData | ApprovedAppData | IgnoredAppData;
  onClick: (data: AppCardData) => void;
}) {

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e6e8eb",
        borderRadius: 6,
        padding: "12px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        width: "100%",
        minWidth: 288,
        minHeight: 180,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ paddingBottom: 4, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
          <Pill
            labelType={toLabelType(data.label.type)}
            showCloseButton={false}
          >
            {data.label.value}
          </Pill>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            fontWeight: 400,
            color: "#63788f",
            fontFamily: "'Geist', sans-serif",
            lineHeight: "normal",
          }}
        >
          Recommended for {data.totalResources} Resources
        </p>
      </div>

      {/* Resource Count Cards */}
      <div style={{ display: "flex", gap: 8, width: "100%" }}>
        {/* Cloud Card */}
        <div
          style={{
            width: 124,
            padding: "4px 8px",
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            background: "#f5f7ff",
            border: "1px solid #e6ebfc",
            minHeight: 1,
            minWidth: 1,
            flex: "1 0 0",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "'Geist Mono', monospace",
                color: "#1c29d9",
                lineHeight: "normal",
                whiteSpace: "nowrap",
              }}
            >
              {data.cloudCount}
            </span>
            <Icon name="cloud" size={16} color="#1c29d9" />
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'Geist', sans-serif",
              color: "#1c29d9",
              lineHeight: "normal",
              whiteSpace: "nowrap",
            }}
          >
            Cloud
          </span>
        </div>

        {/* Data Center Card */}
        <div
          style={{
            width: 124,
            padding: "4px 8px",
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            background: "#fcf8f2",
            border: "1px solid #fbefe2",
            minHeight: 1,
            minWidth: 1,
            flex: "1 0 0",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "'Geist Mono', monospace",
                color: "#a45409",
                lineHeight: "normal",
                whiteSpace: "nowrap",
              }}
            >
              {data.dataCenterCount}
            </span>
            <Icon name="server" size={16} color="#a45409" />
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'Geist', sans-serif",
              color: "#a45409",
              lineHeight: "normal",
              whiteSpace: "nowrap",
            }}
          >
            Data Center
          </span>
        </div>
      </div>

      {/* Last Updated Timestamp */}
      {data.lastUpdated && (
        <p
          style={{
            margin: 0,
            marginTop: -12,
            fontSize: 11,
            fontWeight: 400,
            color: "#a3b6c7",
            fontFamily: "'Geist', sans-serif",
            lineHeight: "normal",
          }}
        >
          Last Updated: {data.lastUpdated}
        </p>
      )}

      {/* Button Container */}
      <div style={{ paddingTop: 8, width: "100%" }}>
        <Button variant="secondary-outlined" size="sm" onClick={() => onClick(data)}>
          View Details
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Evidence Slideout
// ---------------------------------------------------------------------------

function EvidencePanel({
  app,
  onClose,
  onApprove,
  onIgnore,
  showError = false,
  onRetry,
}: {
  app: AppCardData;
  onClose: () => void;
  onApprove: (app: AppCardData) => void;
  onIgnore: (app: AppCardData) => void;
  showError?: boolean;
  onRetry?: () => void;
}) {
  const [activeAnchor, setActiveAnchor] = useState("details");

  const anchors = [
    { id: "details", label: "Details" },
    { id: "resources", label: "Resources" },
    { id: "recommendation", label: "AI Recommendation" },
  ];

  return (
    <>
      <SlideoutHeader
        icon={<Icon name="sparkles" size={20} />}
        iconColor="purple"
        title="Evidence"
        subtitle={app.label.value}
      />

      {showError ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            minHeight: 400,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Illustration name="error-empty-state" width={150} height={141} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#1f272f",
                  fontFamily: "'Geist', sans-serif",
                }}
              >
                Unable to Load Evidence
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#63788f",
                  fontFamily: "'Geist', sans-serif",
                }}
              >
                The requested data could not be found. This may be a temporary issue.
              </span>
            </div>
            {onRetry && (
              <Button variant="secondary" size="sm" onClick={onRetry}>
                <Icon name="refresh-cw" size={16} />
                Retry
              </Button>
            )}
          </div>
        </div>
      ) : (
        <SlideoutBody
          anchors={anchors}
          activeAnchorId={activeAnchor}
          onAnchorChange={setActiveAnchor}
        >
          <SlideoutSection id="details" title="Details">
            <div className="details-grid">
              <div className="details-row">
                <span className="details-label">Label</span>
                <Pill labelType={toLabelType(app.label.type)} showCloseButton={false}>
                  {app.label.value}
                </Pill>
              </div>
              <div className="details-row">
                <span className="details-label">Cloud Provider</span>
                <span className="details-value">{app.csp}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Total Resources</span>
                <span className="details-value mono">{app.totalResources}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Cloud Resources</span>
                <span className="details-value mono">{app.cloudCount}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Data Center Resources</span>
                <span className="details-value mono">{app.dataCenterCount}</span>
              </div>
            </div>
          </SlideoutSection>

          <SlideoutSection id="resources" title="Resources">
            <p style={{ margin: 0, fontSize: 13, color: "var(--lightning-bluegray-600)" }}>
              This application label is recommended for {app.totalResources} resources across your infrastructure.
            </p>
          </SlideoutSection>

          <SlideoutSection id="recommendation" title="AI Recommendation">
            <div className="recommendation-card">
              <div className="recommendation-label">
                <Pill labelType={toLabelType(app.label.type)} showCloseButton={false}>
                  {app.label.value}
                </Pill>
              </div>
              <div className="recommendation-evidence">
                <span className="evidence-title">Evidence</span>
                <p className="evidence-text">{app.evidence}</p>
              </div>
            </div>
          </SlideoutSection>
        </SlideoutBody>
      )}

      {!showError && (
        <SlideoutFooter split>
          <SlideoutFooterGroup>
            <Button variant="primary-ghost" size="sm" onClick={() => onIgnore(app)}>
              Ignore
            </Button>
          </SlideoutFooterGroup>
          <SlideoutFooterGroup>
            <Button variant="primary" size="sm" onClick={() => onApprove(app)}>
              Approve
            </Button>
          </SlideoutFooterGroup>
        </SlideoutFooter>
      )}

      <style jsx>{`
        .details-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .details-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .details-label {
          font-size: 13px;
          color: var(--lightning-bluegray-600, #63788f);
        }
        .details-value {
          font-size: 13px;
          font-weight: 500;
          color: var(--lightning-gray-900, #1d2024);
        }
        .details-value.mono {
          font-family: "Geist Mono", monospace;
          font-size: 12px;
        }
        .recommendation-card {
          background: var(--lightning-gray-50, #f3f4f6);
          border-radius: 8px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .recommendation-label {
          display: flex;
        }
        .recommendation-evidence {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .evidence-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--lightning-bluegray-600);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .evidence-text {
          margin: 0;
          font-size: 13px;
          color: var(--lightning-gray-700);
          line-height: 1.5;
        }
      `}</style>
    </>
  );
}

// ---------------------------------------------------------------------------
// Approve Modal
// ---------------------------------------------------------------------------

function ApproveModal({
  isOpen,
  onClose,
  app,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  app: AppCardData | null;
  onConfirm: () => void;
}) {
  if (!app) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small">
      <ModalHeader title="Approve Label" />
      <ModalBody>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ margin: 0, color: "var(--lightning-gray-700)", fontSize: 14 }}>
            Apply the label to <strong>{app.totalResources} resources</strong>?
          </p>

          <Pill labelType={toLabelType(app.label.type)} showCloseButton={false}>
            {app.label.value}
          </Pill>

          <div
            style={{
              background: "var(--lightning-blue-50)",
              borderRadius: 6,
              padding: 12,
            }}
          >
            <p style={{ margin: 0, fontSize: 12, color: "var(--lightning-blue-700)" }}>
              <strong>What happens next?</strong><br />
              The approved label will be applied to all {app.totalResources} resources and synced to your cloud environment.
            </p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={onConfirm}>Approve</Button>
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
  app,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  app: AppCardData | null;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState<string[]>([]);

  const handleConfirm = () => {
    onConfirm(IGNORE_REASON_OPTIONS.find(o => o.id === reason[0])?.label || "Not applicable");
  };

  if (!app) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small">
      <ModalHeader title="Ignore Recommendation" />
      <ModalBody>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ margin: 0, color: "var(--lightning-gray-700)", fontSize: 14 }}>
            Ignore the AI recommendation for <strong>{app.label.value}</strong>?
          </p>

          <OptionSelector
            label="Reason"
            options={IGNORE_REASON_OPTIONS}
            value={reason}
            onChange={(v) => setReason(v as string[])}
            placeholder="Select a reason"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleConfirm} disabled={reason.length === 0}>
          Ignore
        </Button>
      </ModalFooter>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Reset Confirmation Modal
// ---------------------------------------------------------------------------

function ResetConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small">
      <ModalHeader title="Reset Demo" />
      <ModalBody>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 14 }}>
            Are you sure you want to reset the demo? This will:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
            <li>Reset all label recommendations to pending</li>
            <li>Remove all approved label assignments</li>
            <li>Clear the audit history</li>
          </ul>
          <div style={{
            background: "var(--lightning-red-50)",
            borderRadius: 6,
            padding: 12,
          }}>
            <p style={{ margin: 0, fontSize: 12, color: "var(--lightning-red-700)" }}>
              <strong>Warning:</strong> This action cannot be undone.
            </p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm} loading={isLoading}>
          Reset Demo
        </Button>
      </ModalFooter>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Recommendations Table Component
// ---------------------------------------------------------------------------

function RecommendationsTable({
  data,
  onViewDetails
}: {
  data: AppCardData[];
  onViewDetails: (app: AppCardData) => void;
}) {
  // Cell renderer for Discovered Labels column
  const LabelCellRenderer = useCallback((params: ICellRendererParams<AppCardData>) => {
    const app = params.data;
    if (!app) return null;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: "100%" }}>
        <Pill labelType={toLabelType(app.label.type)} showCloseButton={false}>
          {app.label.value}
        </Pill>
      </div>
    );
  }, []);

  // Cell renderer for Recommended Resources column
  const ResourcesCellRenderer = useCallback((params: ICellRendererParams<AppCardData>) => {
    const app = params.data;
    if (!app) return null;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16, height: "100%" }}>
        <span style={{ fontWeight: 500, fontSize: 14, color: "#1f272f" }}>{app.totalResources}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#2563eb", fontSize: 13 }}>
          <Icon name="cloud" size={14} />
          {app.cloudCount}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#16a34a", fontSize: 13 }}>
          <Icon name="server" size={14} />
          {app.dataCenterCount}
        </span>
      </div>
    );
  }, []);

  // Cell renderer for Action column
  const ActionCellRenderer = useCallback((params: ICellRendererParams<AppCardData>) => {
    const app = params.data;
    if (!app) return null;
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
        <Button variant="secondary" size="sm" onClick={() => onViewDetails(app)}>
          View Details
        </Button>
      </div>
    );
  }, [onViewDetails]);

  const columnDefs = useMemo<ColDef<AppCardData>[]>(() => [
    {
      field: "label.value",
      headerName: "Discovered Labels",
      flex: 2,
      minWidth: 200,
      cellRenderer: LabelCellRenderer,
      sortable: true,
    },
    {
      field: "totalResources",
      headerName: "Recommended Resources",
      flex: 1.5,
      minWidth: 200,
      cellRenderer: ResourcesCellRenderer,
      sortable: true,
    },
    {
      field: "lastUpdated",
      headerName: "Last Updated",
      flex: 1,
      minWidth: 180,
      sortable: true,
    },
    {
      headerName: "Action",
      width: 130,
      cellRenderer: ActionCellRenderer,
      sortable: false,
      resizable: false,
    },
  ], [LabelCellRenderer, ResourcesCellRenderer, ActionCellRenderer]);

  const defaultColDef = useMemo<ColDef>(() => ({
    resizable: true,
    suppressMovable: true,
  }), []);

  return (
    <div
      className="ag-theme-alpine"
      style={{
        width: "100%",
        height: data.length > 0 ? Math.min(data.length * 48 + 49, 500) : 200,
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid #dfe6ed",
      }}
    >
      <AgGridReact<AppCardData>
        theme="legacy"
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowHeight={48}
        headerHeight={32}
        domLayout="normal"
        suppressCellFocus={true}
        getRowId={(params) => params.data.id}
      />
      <style jsx global>{`
        .ag-theme-alpine {
          --ag-header-background-color: #f9fafb;
          --ag-header-foreground-color: #7b858f;
          --ag-border-color: #e6e8eb;
          --ag-row-hover-color: #f3f4f6;
          --ag-font-family: 'Geist', sans-serif;
          --ag-font-size: 14px;
          --ag-header-column-separator-display: none;
        }
        .ag-theme-alpine .ag-header-cell-text {
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
        }
        .ag-theme-alpine .ag-cell {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Approved Tab Filters Toolbar
// ---------------------------------------------------------------------------

interface ApprovedTabFiltersProps {
  filterOptions: {
    csps: FilterOption[];
    resources: FilterOption[];
    approvedLabels: FilterOption[];
    types: FilterOption[];
    accounts: FilterOption[];
    regions: FilterOption[];
    approvedBy: FilterOption[];
    approvedOn: FilterOption[];
  };
  filterValues: Record<string, string[]>;
  visibleFilters: string[];
  onFilterChange: (filterId: string, values: string[]) => void;
  onAddFilter: (filterId: string) => void;
  onResetFilters: () => void;
  onExportCSV?: () => void;
}

function ApprovedTabFilters({
  filterOptions,
  filterValues,
  visibleFilters,
  onFilterChange,
  onAddFilter,
  onResetFilters,
  onExportCSV,
}: ApprovedTabFiltersProps) {
  const allFilters = [
    { id: "csp", label: "CSP" },
    { id: "resource", label: "Resource" },
    { id: "approvedLabels", label: "Approved Labels" },
    { id: "type", label: "Type" },
    { id: "account", label: "Account" },
    { id: "region", label: "Region" },
    { id: "approvedBy", label: "Approved By" },
    { id: "approvedOn", label: "Approved On" },
  ];

  const availableFilters = allFilters.filter((f) => !visibleFilters.includes(f.id));
  const hasActiveFilters = Object.values(filterValues).some((v) => v.length > 0);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {visibleFilters.includes("csp") && (
          <FilterDropdown
            label="CSP"
            options={filterOptions.csps}
            selectedValues={filterValues.csp || []}
            onChange={(values) => onFilterChange("csp", values)}
          />
        )}
        {visibleFilters.includes("resource") && (
          <FilterDropdown
            label="Resource"
            options={filterOptions.resources}
            selectedValues={filterValues.resource || []}
            onChange={(values) => onFilterChange("resource", values)}
          />
        )}
        {visibleFilters.includes("approvedLabels") && (
          <FilterDropdown
            label="Approved Labels"
            options={filterOptions.approvedLabels}
            selectedValues={filterValues.approvedLabels || []}
            onChange={(values) => onFilterChange("approvedLabels", values)}
          />
        )}
        {visibleFilters.includes("type") && (
          <FilterDropdown
            label="Type"
            options={filterOptions.types}
            selectedValues={filterValues.type || []}
            onChange={(values) => onFilterChange("type", values)}
            showSearch={false}
          />
        )}
        {visibleFilters.includes("account") && (
          <FilterDropdown
            label="Account"
            options={filterOptions.accounts}
            selectedValues={filterValues.account || []}
            onChange={(values) => onFilterChange("account", values)}
          />
        )}
        {visibleFilters.includes("region") && (
          <FilterDropdown
            label="Region"
            options={filterOptions.regions}
            selectedValues={filterValues.region || []}
            onChange={(values) => onFilterChange("region", values)}
          />
        )}
        {visibleFilters.includes("approvedBy") && (
          <FilterDropdown
            label="Approved By"
            options={filterOptions.approvedBy}
            selectedValues={filterValues.approvedBy || []}
            onChange={(values) => onFilterChange("approvedBy", values)}
          />
        )}
        {visibleFilters.includes("approvedOn") && (
          <FilterDropdown
            label="Approved On"
            options={filterOptions.approvedOn}
            selectedValues={filterValues.approvedOn || []}
            onChange={(values) => onFilterChange("approvedOn", values)}
          />
        )}

        <AddFilterMenu
          availableFilters={availableFilters}
          onAddFilter={onAddFilter}
        />

        {hasActiveFilters && (
          <Button
            variant="secondary-ghost"
            size="sm"
            leftIcon={<Icon name="xmark" size={14} />}
            onClick={onResetFilters}
          >
            Reset
          </Button>
        )}
      </div>

      <Button
        variant="secondary"
        size="md"
        leftIcon={<Icon name="file-arrow-right" size={20} />}
        onClick={onExportCSV}
      >
        Export CSV
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ignored Tab Filters Component
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Ignored Tab Filters Toolbar
// ---------------------------------------------------------------------------

interface IgnoredTabFiltersProps {
  filterOptions: {
    csps: FilterOption[];
    resources: FilterOption[];
    ignoredLabels: FilterOption[];
    types: FilterOption[];
    accounts: FilterOption[];
    regions: FilterOption[];
    ignoredBy: FilterOption[];
    ignoredOn: FilterOption[];
  };
  filterValues: Record<string, string[]>;
  visibleFilters: string[];
  onFilterChange: (filterId: string, values: string[]) => void;
  onAddFilter: (filterId: string) => void;
  onResetFilters: () => void;
  onExportCSV?: () => void;
}

function IgnoredTabFilters({
  filterOptions,
  filterValues,
  visibleFilters,
  onFilterChange,
  onAddFilter,
  onResetFilters,
  onExportCSV,
}: IgnoredTabFiltersProps) {
  const allFilters = [
    { id: "csp", label: "CSP" },
    { id: "resource", label: "Resource" },
    { id: "ignoredLabels", label: "Ignored Labels" },
    { id: "type", label: "Type" },
    { id: "account", label: "Account" },
    { id: "region", label: "Region" },
    { id: "ignoredBy", label: "Ignored By" },
    { id: "ignoredOn", label: "Ignored On" },
  ];

  const availableFilters = allFilters.filter((f) => !visibleFilters.includes(f.id));
  const hasActiveFilters = Object.values(filterValues).some((v) => v.length > 0);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {visibleFilters.includes("csp") && (
          <FilterDropdown
            label="CSP"
            options={filterOptions.csps}
            selectedValues={filterValues.csp || []}
            onChange={(values) => onFilterChange("csp", values)}
          />
        )}
        {visibleFilters.includes("resource") && (
          <FilterDropdown
            label="Resource"
            options={filterOptions.resources}
            selectedValues={filterValues.resource || []}
            onChange={(values) => onFilterChange("resource", values)}
          />
        )}
        {visibleFilters.includes("ignoredLabels") && (
          <FilterDropdown
            label="Ignored Labels"
            options={filterOptions.ignoredLabels}
            selectedValues={filterValues.ignoredLabels || []}
            onChange={(values) => onFilterChange("ignoredLabels", values)}
          />
        )}
        {visibleFilters.includes("type") && (
          <FilterDropdown
            label="Type"
            options={filterOptions.types}
            selectedValues={filterValues.type || []}
            onChange={(values) => onFilterChange("type", values)}
            showSearch={false}
          />
        )}
        {visibleFilters.includes("account") && (
          <FilterDropdown
            label="Account"
            options={filterOptions.accounts}
            selectedValues={filterValues.account || []}
            onChange={(values) => onFilterChange("account", values)}
          />
        )}
        {visibleFilters.includes("region") && (
          <FilterDropdown
            label="Region"
            options={filterOptions.regions}
            selectedValues={filterValues.region || []}
            onChange={(values) => onFilterChange("region", values)}
          />
        )}
        {visibleFilters.includes("ignoredBy") && (
          <FilterDropdown
            label="Ignored By"
            options={filterOptions.ignoredBy}
            selectedValues={filterValues.ignoredBy || []}
            onChange={(values) => onFilterChange("ignoredBy", values)}
          />
        )}
        {visibleFilters.includes("ignoredOn") && (
          <FilterDropdown
            label="Ignored On"
            options={filterOptions.ignoredOn}
            selectedValues={filterValues.ignoredOn || []}
            onChange={(values) => onFilterChange("ignoredOn", values)}
          />
        )}

        <AddFilterMenu
          availableFilters={availableFilters}
          onAddFilter={onAddFilter}
        />

        {hasActiveFilters && (
          <Button
            variant="secondary-ghost"
            size="sm"
            leftIcon={<Icon name="xmark" size={14} />}
            onClick={onResetFilters}
          >
            Reset
          </Button>
        )}
      </div>

      <Button
        variant="secondary"
        size="md"
        leftIcon={<Icon name="file-arrow-right" size={20} />}
        onClick={onExportCSV}
      >
        Export CSV
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Approved Resources Table Component
// ---------------------------------------------------------------------------

function ApprovedResourcesTable({
  filters,
}: {
  filters: {
    csp: string[] | null;
    labelType: LabelType | null;
    labelValue: string | null;
    accountId: string | null;
    region: string | null;
  };
}) {
  const { data: response, isLoading } = useApprovedResources({
    csp: filters.csp || undefined,
    labelType: filters.labelType as APILabelType || undefined,
    labelValue: filters.labelValue || undefined,
    accountId: filters.accountId || undefined,
    region: filters.region || undefined,
    limit: 1000,
  });

  const data = response?.data || [];

  // Cell renderer for Resource Name column
  const ResourceNameCellRenderer = useCallback((params: ICellRendererParams<ApprovedResourceData>) => {
    const resource = params.data;
    if (!resource) return null;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: "100%" }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            background: "#f0f1fa",
            border: "1px solid #a4a6ee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="server" size={14} color="#5e46dd" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#1f272f" }}>{resource.resourceName}</span>
          {resource.hostname && (
            <span style={{ fontSize: 12, color: "#63788f" }}>{resource.hostname}</span>
          )}
        </div>
      </div>
    );
  }, []);

  // Cell renderer for Approved Labels column (approved label with checkmark)
  const ApprovedLabelCellRenderer = useCallback((params: ICellRendererParams<ApprovedResourceData>) => {
    const resource = params.data;
    if (!resource) return null;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: "100%" }}>
        <Icon name="circle-check" variant="solid" size={16} color="var(--lightning-green-500, #12A732)" />
        <Pill labelType={toLabelType(resource.approvedLabel.type)} showCloseButton={false}>
          {resource.approvedLabel.value}
        </Pill>
      </div>
    );
  }, []);

  // Cell renderer for Platform column
  const PlatformCellRenderer = useCallback((params: ICellRendererParams<ApprovedResourceData>) => {
    const resource = params.data;
    if (!resource) return null;
    const isCloud = resource.platformType === "CLOUD";
    return (
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 8px",
            borderRadius: 4,
            background: isCloud ? "#f5f7ff" : "#fcf8f2",
            border: `1px solid ${isCloud ? "#e6ebfc" : "#fbefe2"}`,
          }}
        >
          <Icon name={isCloud ? "cloud" : "server"} size={14} color={isCloud ? "#1c29d9" : "#a45409"} />
          <span style={{ fontSize: 13, fontWeight: 500, color: isCloud ? "#1c29d9" : "#a45409" }}>
            {isCloud ? "Cloud" : "Data Center"}
          </span>
        </div>
      </div>
    );
  }, []);

  // Cell renderer for Account column (with CSP icon)
  const AccountCellRenderer = useCallback((params: ICellRendererParams<ApprovedResourceData>) => {
    const resource = params.data;
    if (!resource) return null;
    const csp = resource.cloudProvider;
    return (
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        {csp && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid #d0d4d9",
            }}
          >
            <Icon name={csp === "AWS" ? "csp-aws" : csp === "Azure" ? "csp-azure" : "csp-gcp"} size={16} />
            <span style={{ fontSize: 13, color: "#1f272f" }}>{resource.accountId || "-"}</span>
          </div>
        )}
        {!csp && <span style={{ fontSize: 13, color: "#1f272f" }}>{resource.accountId || "-"}</span>}
      </div>
    );
  }, []);

  // Cell renderer for Region column
  const RegionCellRenderer = useCallback((params: ICellRendererParams<ApprovedResourceData>) => {
    const resource = params.data;
    if (!resource) return null;
    return (
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <span style={{ fontSize: 13, color: "#1f272f" }}>{resource.region || "-"}</span>
      </div>
    );
  }, []);

  // Cell renderer for Approved By column
  const ApprovedByCellRenderer = useCallback((params: ICellRendererParams<ApprovedResourceData>) => {
    const resource = params.data;
    if (!resource) return null;
    const initials = resource.approvedBy
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: "100%" }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#e0e7ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 600, color: "#4f46e5" }}>{initials}</span>
        </div>
        <span style={{ fontSize: 13, color: "#1f272f" }}>{resource.approvedBy}</span>
      </div>
    );
  }, []);

  const columnDefs = useMemo<ColDef<ApprovedResourceData>[]>(() => [
    {
      field: "resourceName",
      headerName: "Resource",
      flex: 2,
      minWidth: 250,
      cellRenderer: ResourceNameCellRenderer,
      sortable: true,
    },
    {
      field: "approvedLabel",
      headerName: "Approved Labels",
      flex: 1.2,
      minWidth: 150,
      cellRenderer: ApprovedLabelCellRenderer,
      sortable: false,
    },
    {
      field: "platformType",
      headerName: "Type",
      flex: 1,
      minWidth: 130,
      cellRenderer: PlatformCellRenderer,
      sortable: true,
    },
    {
      field: "accountId",
      headerName: "Account",
      flex: 1.5,
      minWidth: 180,
      cellRenderer: AccountCellRenderer,
      sortable: true,
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
      minWidth: 120,
      cellRenderer: RegionCellRenderer,
      sortable: true,
    },
    {
      field: "approvedBy",
      headerName: "Approved By",
      flex: 1.2,
      minWidth: 150,
      cellRenderer: ApprovedByCellRenderer,
      sortable: true,
    },
    {
      field: "approvedAt",
      headerName: "Approved On",
      flex: 1,
      minWidth: 140,
      sortable: true,
    },
  ], [ResourceNameCellRenderer, ApprovedLabelCellRenderer, PlatformCellRenderer, AccountCellRenderer, RegionCellRenderer, ApprovedByCellRenderer]);

  const defaultColDef = useMemo<ColDef>(() => ({
    resizable: true,
    suppressMovable: true,
  }), []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 300,
          background: "#ffffff",
          borderRadius: 8,
          border: "1px solid #dfe6ed",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
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
            Loading approved resources...
          </span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 8,
          border: "1px solid var(--lightning-gray-200, #e6e8eb)",
          minHeight: 400,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: 40,
          }}
        >
          <Illustration name="positive-neutral-empty-state" width={150} height={150} />
          <div style={{ textAlign: "center", maxWidth: 400 }}>
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: 16,
                fontWeight: 600,
                color: "#1f272f",
                fontFamily: "'Geist', sans-serif",
              }}
            >
              No approved labels yet.
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "#63788f",
                fontFamily: "'Geist', sans-serif",
                lineHeight: 1.5,
              }}
            >
              Approved recommendations will show up here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="ag-theme-alpine"
      style={{
        width: "100%",
        height: Math.min(data.length * 56 + 49, 600),
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid #dfe6ed",
      }}
    >
      <AgGridReact<ApprovedResourceData>
        theme="legacy"
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowHeight={56}
        headerHeight={32}
        domLayout="normal"
        suppressCellFocus={true}
        getRowId={(params) => params.data.id}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ignored Tab - Table Component
// ---------------------------------------------------------------------------

function IgnoredResourcesTable({
  filters,
}: {
  filters: {
    csp: string[] | null;
    labelType: LabelType | null;
    labelValue: string | null;
    accountId: string | null;
    region: string | null;
  };
}) {
  const { data: response, isLoading } = useIgnoredResources({
    csp: filters.csp || undefined,
    labelType: filters.labelType as APILabelType || undefined,
    labelValue: filters.labelValue || undefined,
    accountId: filters.accountId || undefined,
    region: filters.region || undefined,
    limit: 1000,
  });

  const data = response?.data || [];

  // Cell renderer for Resource Name column
  const ResourceNameCellRenderer = useCallback((params: ICellRendererParams<IgnoredResourceData>) => {
    const resource = params.data;
    if (!resource) return null;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: "100%" }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            background: "#f0f1fa",
            border: "1px solid #a4a6ee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="server" size={14} color="#5e46dd" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#1f272f" }}>{resource.resourceName}</span>
          {resource.hostname && (
            <span style={{ fontSize: 12, color: "#63788f" }}>{resource.hostname}</span>
          )}
        </div>
      </div>
    );
  }, []);

  // Cell renderer for Ignored Labels column (ignored label with circle-xmark)
  const IgnoredLabelCellRenderer = useCallback((params: ICellRendererParams<IgnoredResourceData>) => {
    const resource = params.data;
    if (!resource) return null;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: "100%" }}>
        <Icon name="circle-xmark" variant="solid" size={16} color="var(--lightning-red-500, #EA4542)" />
        <Pill labelType={toLabelType(resource.ignoredLabel.type)} showCloseButton={false}>
          {resource.ignoredLabel.value}
        </Pill>
      </div>
    );
  }, []);

  // Cell renderer for Platform column
  const PlatformCellRenderer = useCallback((params: ICellRendererParams<IgnoredResourceData>) => {
    const resource = params.data;
    if (!resource) return null;
    const isCloud = resource.platformType === "CLOUD";
    return (
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 8px",
            borderRadius: 4,
            background: isCloud ? "#f5f7ff" : "#fcf8f2",
            border: `1px solid ${isCloud ? "#e6ebfc" : "#fbefe2"}`,
          }}
        >
          <Icon name={isCloud ? "cloud" : "server"} size={14} color={isCloud ? "#1c29d9" : "#a45409"} />
          <span style={{ fontSize: 13, fontWeight: 500, color: isCloud ? "#1c29d9" : "#a45409" }}>
            {isCloud ? "Cloud" : "Data Center"}
          </span>
        </div>
      </div>
    );
  }, []);

  // Cell renderer for Account column
  const AccountCellRenderer = useCallback((params: ICellRendererParams<IgnoredResourceData>) => {
    const resource = params.data;
    if (!resource) return null;
    const csp = resource.cloudProvider;
    return (
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        {csp && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid #d0d4d9",
            }}
          >
            <Icon name={csp === "AWS" ? "csp-aws" : csp === "Azure" ? "csp-azure" : "csp-gcp"} size={16} />
            <span style={{ fontSize: 13, color: "#1f272f" }}>{resource.accountId || "-"}</span>
          </div>
        )}
        {!csp && <span style={{ fontSize: 13, color: "#1f272f" }}>{resource.accountId || "-"}</span>}
      </div>
    );
  }, []);

  // Helper to format relative time
  const formatRelativeTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }, []);

  // Cell renderer for Comment column (tooltip icon)
  const CommentCellRenderer = useCallback((params: ICellRendererParams<IgnoredResourceData>) => {
    const resource = params.data;
    if (!resource) return null;

    // Check if there's a valid comment (not null, undefined, empty, or "Not specified")
    const hasComment = resource.ignoreReason &&
      resource.ignoreReason.trim().length > 0 &&
      resource.ignoreReason.trim().toLowerCase() !== "not specified";

    // If no comment, just show a dash
    if (!hasComment) {
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <span style={{ fontSize: 13, color: "#94a3b8" }}>-</span>
        </div>
      );
    }

    // Get user initials for the comment card
    const initials = resource.ignoredBy
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const commentCardContent = (
      <div className="comment-card">
        <div className="comment-card__avatar">
          <span className="comment-card__avatar-initials">{initials}</span>
        </div>
        <div className="comment-card__content">
          <div className="comment-card__header">
            <span className="comment-card__name">{resource.ignoredBy}</span>
            <span className="comment-card__time">{formatRelativeTime(resource.ignoredAt)}</span>
          </div>
          <p className="comment-card__text">{resource.ignoreReason}</p>
        </div>
      </div>
    );

    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <Tooltip
          content={commentCardContent}
          position="top"
          className="ds-tooltip--comment-card"
          showArrow={false}
          usePortal={true}
        >
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              padding: 4,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="message-square-lines" size={16} color="#64748b" />
          </button>
        </Tooltip>
      </div>
    );
  }, [formatRelativeTime]);

  // Cell renderer for Ignored By column
  const IgnoredByCellRenderer = useCallback((params: ICellRendererParams<IgnoredResourceData>) => {
    const resource = params.data;
    if (!resource) return null;
    const initials = resource.ignoredBy
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: "100%" }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#dfe6ed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 500, color: "#3b4857" }}>{initials}</span>
        </div>
        <span style={{ fontSize: 13, color: "#1f272f" }}>{resource.ignoredBy}</span>
      </div>
    );
  }, []);

  const columnDefs = useMemo<ColDef<IgnoredResourceData>[]>(() => [
    {
      field: "resourceName",
      headerName: "Resource",
      flex: 2,
      minWidth: 250,
      cellRenderer: ResourceNameCellRenderer,
      sortable: true,
    },
    {
      field: "ignoredLabel",
      headerName: "Ignored Labels",
      flex: 1.2,
      minWidth: 150,
      cellRenderer: IgnoredLabelCellRenderer,
      sortable: false,
    },
    {
      field: "platformType",
      headerName: "Type",
      flex: 1,
      minWidth: 120,
      cellRenderer: PlatformCellRenderer,
      sortable: true,
    },
    {
      field: "accountId",
      headerName: "Account",
      flex: 1.5,
      minWidth: 200,
      cellRenderer: AccountCellRenderer,
      sortable: true,
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
      minWidth: 120,
      sortable: true,
    },
    {
      field: "ignoreReason",
      headerName: "Comment",
      flex: 0.8,
      minWidth: 100,
      cellRenderer: CommentCellRenderer,
      sortable: false,
    },
    {
      field: "ignoredBy",
      headerName: "Ignored By",
      flex: 1.2,
      minWidth: 140,
      cellRenderer: IgnoredByCellRenderer,
      sortable: true,
    },
    {
      field: "ignoredAt",
      headerName: "Ignored On",
      flex: 1.2,
      minWidth: 160,
      sortable: true,
    },
  ], [ResourceNameCellRenderer, IgnoredLabelCellRenderer, PlatformCellRenderer, AccountCellRenderer, CommentCellRenderer, IgnoredByCellRenderer]);

  const defaultColDef = useMemo<ColDef>(() => ({
    resizable: true,
    suppressMovable: true,
  }), []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 300,
          background: "#ffffff",
          borderRadius: 8,
          border: "1px solid #dfe6ed",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
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
            Loading ignored resources...
          </span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 8,
          border: "1px solid var(--lightning-gray-200, #e6e8eb)",
          minHeight: 400,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: 40,
          }}
        >
          <Illustration name="positive-neutral-empty-state" width={150} height={150} />
          <div style={{ textAlign: "center", maxWidth: 400 }}>
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: 16,
                fontWeight: 600,
                color: "#1f272f",
                fontFamily: "'Geist', sans-serif",
              }}
            >
              No ignored labels
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "#63788f",
                fontFamily: "'Geist', sans-serif",
                lineHeight: 1.5,
              }}
            >
              Ignored recommendations will show up here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="ag-theme-alpine"
      style={{
        width: "100%",
        height: Math.min(data.length * 56 + 49, 600),
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid #dfe6ed",
      }}
    >
      <AgGridReact<IgnoredResourceData>
        theme="legacy"
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowHeight={56}
        headerHeight={32}
        domLayout="normal"
        suppressCellFocus={true}
        getRowId={(params) => params.data.id}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main floorplan
// ---------------------------------------------------------------------------

export interface AILabelingFloorplanProps {
  pageTitle?: string;
}

export function AILabelingFloorplan({ pageTitle = "AI Labeling" }: AILabelingFloorplanProps) {
  type ViewMode = "card" | "table";
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Tab state - initialize from URL query param
  const tabParam = searchParams.get("tab");
  const initialTab: TabId = (tabParam === "approved" || tabParam === "ignored") ? tabParam : "recommended";
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);

  // Sync activeTab with URL query param changes
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl === "approved" || tabFromUrl === "ignored") {
      setActiveTab(tabFromUrl);
    } else if (!tabFromUrl) {
      setActiveTab("recommended");
    }
  }, [searchParams]);

  // Banner state
  const [showBanner, setShowBanner] = useState(true);

  // Filter state
  const [predictedLabelsFilter, setPredictedLabelsFilter] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [groupBy, setGroupBy] = useState<string[]>(["application"]);
  const [sortBy, setSortBy] = useState<string>("resources-desc");

  // Discovery toggle
  const [showDiscovery, setShowDiscovery] = useState(true);

  // Slideout state
  const [slideoutApp, setSlideoutApp] = useState<AppCardData | null>(null);

  // Modal state
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [modalApp, setModalApp] = useState<AppCardData | null>(null);

  // Auth error state for persistent banner
  const [authError, setAuthError] = useState<{ status: number; message: string } | null>(null);

  // Approved tab filter state (new format with visible filters)
  const [approvedVisibleFilters, setApprovedVisibleFilters] = useState<string[]>([
    "csp", "resource", "approvedLabels", "type", "account"
  ]);
  const [approvedFilterValues, setApprovedFilterValues] = useState<Record<string, string[]>>({
    csp: [],
    resource: [],
    approvedLabels: [],
    type: [],
    account: [],
    region: [],
    approvedBy: [],
    approvedOn: [],
  });

  // Ignored tab filter state (new format with visible filters)
  const [ignoredVisibleFilters, setIgnoredVisibleFilters] = useState<string[]>([
    "csp", "resource", "ignoredLabels", "type", "account"
  ]);
  const [ignoredFilterValues, setIgnoredFilterValues] = useState<Record<string, string[]>>({
    csp: [],
    resource: [],
    ignoredLabels: [],
    type: [],
    account: [],
    region: [],
    ignoredBy: [],
    ignoredOn: [],
  });

  // Map Group By selection to label type
  const groupByToLabelType: Record<string, LabelType> = {
    application: "App",
    role: "Role",
    environment: "Env",
    location: "Loc",
  };

  // Get the current label type based on Group By selection
  const currentLabelType = groupByToLabelType[groupBy[0]] || "App";

  // ---------------------------------------------------------------------------
  // React Query hooks for data fetching
  // ---------------------------------------------------------------------------

  const {
    data: recommendationsResponse,
    isLoading: isLoadingRecommendations,
    error: recommendationsError,
    refetch: refetchRecommendations,
  } = useRecommendations({
    labelType: currentLabelType as APILabelType,
    labelValues: predictedLabelsFilter.length > 0 ? predictedLabelsFilter : undefined,
    sortBy,
    timeFilter,
  });

  const {
    data: approvedResponse,
    isLoading: isLoadingApproved,
    error: approvedError,
    refetch: refetchApproved,
  } = useApproved({
    labelType: currentLabelType as APILabelType,
    sortBy,
    timeFilter,
  });

  const {
    data: ignoredResponse,
    isLoading: isLoadingIgnored,
    error: ignoredError,
    refetch: refetchIgnored,
  } = useIgnored({
    labelType: currentLabelType as APILabelType,
    sortBy,
    timeFilter,
  });

  const { data: labelsResponse } = useLabels({
    type: currentLabelType as APILabelType,
    status: "PENDING",
  });

  // Error handling hooks
  const demoConfig = useDemoErrorMode();
  const { handleError, handlePartialSuccess } = useAILabelingErrors();

  // Mutations with demo mode support
  const approveMutation = useApproveRecommendations(demoConfig);
  const ignoreMutation = useIgnoreRecommendations(demoConfig);
  const restoreMutation = useRestoreRecommendations(demoConfig);
  const resetMutation = useResetDemo(demoConfig);
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  // ---------------------------------------------------------------------------
  // Fallback to mock data if API is not available
  // ---------------------------------------------------------------------------

  const recommendedData: AppCardData[] = useMemo(() => {
    if (recommendationsResponse?.data) {
      return recommendationsResponse.data.map((rec: GroupedRecommendation) => ({
        id: rec.id,
        label: rec.label as { type: LabelType; value: string },
        totalResources: rec.totalResources,
        cloudCount: rec.cloudCount,
        dataCenterCount: rec.dataCenterCount,
        csp: rec.csp as CSP,
        evidence: rec.evidence,
        lastUpdated: rec.lastUpdated,
      }));
    }
    // Fallback to mock data filtered by label type
    return MOCK_RECOMMENDED.filter((app) => app.label.type === currentLabelType);
  }, [recommendationsResponse, currentLabelType]);

  const approvedData: ApprovedAppData[] = useMemo(() => {
    if (approvedResponse?.data) {
      return approvedResponse.data.map((rec: GroupedRecommendation) => ({
        id: rec.id,
        label: rec.label as { type: LabelType; value: string },
        totalResources: rec.totalResources,
        cloudCount: rec.cloudCount,
        dataCenterCount: rec.dataCenterCount,
        csp: rec.csp as CSP,
        evidence: rec.evidence,
        approvedBy: rec.approvedBy || "Unknown",
        approvedAt: rec.approvedAt || "",
        lastUpdated: rec.lastUpdated,
      }));
    }
    return [];
  }, [approvedResponse]);

  const ignoredData: IgnoredAppData[] = useMemo(() => {
    if (ignoredResponse?.data) {
      return ignoredResponse.data.map((rec: GroupedRecommendation) => ({
        id: rec.id,
        label: rec.label as { type: LabelType; value: string },
        totalResources: rec.totalResources,
        cloudCount: rec.cloudCount,
        dataCenterCount: rec.dataCenterCount,
        csp: rec.csp as CSP,
        evidence: rec.evidence,
        reason: rec.reason || "Not specified",
        ignoredBy: rec.ignoredBy || "Unknown",
        ignoredAt: rec.ignoredAt || "",
        lastUpdated: rec.lastUpdated,
      }));
    }
    return [];
  }, [ignoredResponse]);

  // CSP options for filters
  const cspFilterOptions: FilterOption[] = useMemo(() => [
    { id: "AWS", label: "AWS", icon: <Icon name="csp-aws" size={20} /> },
    { id: "Azure", label: "Azure", icon: <Icon name="csp-azure" size={20} /> },
    { id: "GCP", label: "GCP", icon: <Icon name="csp-gcp" size={20} /> },
  ], []);

  // Type options for filters
  const typeFilterOptions: FilterOption[] = useMemo(() => [
    { id: "Cloud", label: "Cloud" },
    { id: "Data Center", label: "Data Center" },
  ], []);

  // Generate filter options for Approved tab from data
  const approvedFilterOptions = useMemo(() => {
    const resources = new Map<string, FilterOption>();
    const labels = new Map<string, FilterOption>();
    const accounts = new Map<string, FilterOption>();
    const regions = new Map<string, FilterOption>();
    const approvedByUsers = new Map<string, FilterOption>();
    const approvedDates = new Map<string, FilterOption>();

    approvedData.forEach((item) => {
      // Resource - use label value as resource identifier
      const resourceId = item.label.value;
      if (!resources.has(resourceId)) {
        resources.set(resourceId, { id: resourceId, label: resourceId });
      }

      // Approved Labels - combine type and value
      const labelId = `${item.label.type}:${item.label.value}`;
      if (!labels.has(labelId)) {
        labels.set(labelId, { id: labelId, label: `${item.label.type}: ${item.label.value}` });
      }

      // Approved By
      if (item.approvedBy && !approvedByUsers.has(item.approvedBy)) {
        approvedByUsers.set(item.approvedBy, { id: item.approvedBy, label: item.approvedBy });
      }

      // Approved On - format date
      if (item.approvedAt) {
        const dateStr = new Date(item.approvedAt).toLocaleDateString();
        if (!approvedDates.has(dateStr)) {
          approvedDates.set(dateStr, { id: dateStr, label: dateStr });
        }
      }
    });

    return {
      csps: cspFilterOptions,
      resources: Array.from(resources.values()),
      approvedLabels: Array.from(labels.values()),
      types: typeFilterOptions,
      accounts: Array.from(accounts.values()),
      regions: Array.from(regions.values()),
      approvedBy: Array.from(approvedByUsers.values()),
      approvedOn: Array.from(approvedDates.values()),
    };
  }, [approvedData, cspFilterOptions, typeFilterOptions]);

  // Generate filter options for Ignored tab from data
  const ignoredFilterOptions = useMemo(() => {
    const resources = new Map<string, FilterOption>();
    const labels = new Map<string, FilterOption>();
    const accounts = new Map<string, FilterOption>();
    const regions = new Map<string, FilterOption>();
    const ignoredByUsers = new Map<string, FilterOption>();
    const ignoredDates = new Map<string, FilterOption>();

    ignoredData.forEach((item) => {
      // Resource - use label value as resource identifier
      const resourceId = item.label.value;
      if (!resources.has(resourceId)) {
        resources.set(resourceId, { id: resourceId, label: resourceId });
      }

      // Ignored Labels - combine type and value
      const labelId = `${item.label.type}:${item.label.value}`;
      if (!labels.has(labelId)) {
        labels.set(labelId, { id: labelId, label: `${item.label.type}: ${item.label.value}` });
      }

      // Ignored By
      if (item.ignoredBy && !ignoredByUsers.has(item.ignoredBy)) {
        ignoredByUsers.set(item.ignoredBy, { id: item.ignoredBy, label: item.ignoredBy });
      }

      // Ignored On - format date
      if (item.ignoredAt) {
        const dateStr = new Date(item.ignoredAt).toLocaleDateString();
        if (!ignoredDates.has(dateStr)) {
          ignoredDates.set(dateStr, { id: dateStr, label: dateStr });
        }
      }
    });

    return {
      csps: cspFilterOptions,
      resources: Array.from(resources.values()),
      ignoredLabels: Array.from(labels.values()),
      types: typeFilterOptions,
      accounts: Array.from(accounts.values()),
      regions: Array.from(regions.values()),
      ignoredBy: Array.from(ignoredByUsers.values()),
      ignoredOn: Array.from(ignoredDates.values()),
    };
  }, [ignoredData, cspFilterOptions, typeFilterOptions]);

  // Handler functions for approved tab filters
  const handleApprovedFilterChange = useCallback((filterId: string, values: string[]) => {
    setApprovedFilterValues(prev => ({ ...prev, [filterId]: values }));
  }, []);

  const handleApprovedAddFilter = useCallback((filterId: string) => {
    setApprovedVisibleFilters(prev => [...prev, filterId]);
  }, []);

  const handleApprovedResetFilters = useCallback(() => {
    setApprovedFilterValues({
      csp: [],
      resource: [],
      approvedLabels: [],
      type: [],
      account: [],
      region: [],
      approvedBy: [],
      approvedOn: [],
    });
  }, []);

  // Handler functions for ignored tab filters
  const handleIgnoredFilterChange = useCallback((filterId: string, values: string[]) => {
    setIgnoredFilterValues(prev => ({ ...prev, [filterId]: values }));
  }, []);

  const handleIgnoredAddFilter = useCallback((filterId: string) => {
    setIgnoredVisibleFilters(prev => [...prev, filterId]);
  }, []);

  const handleIgnoredResetFilters = useCallback(() => {
    setIgnoredFilterValues({
      csp: [],
      resource: [],
      ignoredLabels: [],
      type: [],
      account: [],
      region: [],
      ignoredBy: [],
      ignoredOn: [],
    });
  }, []);

  // Generate dynamic predicted labels options based on Group By and data
  const predictedLabelsOptions = useMemo(() => {
    const options = [{ id: "all", label: "Recommended Labels" }];

    // Use labels from API if available
    if (labelsResponse?.data?.byType?.[currentLabelType]) {
      labelsResponse.data.byType[currentLabelType].forEach((label: { id: string; value: string }) => {
        options.push({ id: label.value, label: label.value });
      });
    } else {
      // Fallback to extracting from recommended data
      const uniqueValues = new Set<string>();
      recommendedData.forEach((app) => {
        if (app.label.type === currentLabelType) {
          uniqueValues.add(app.label.value);
        }
      });
      Array.from(uniqueValues)
        .sort()
        .forEach((value) => {
          options.push({ id: value, label: value });
        });
    }

    return options;
  }, [labelsResponse, recommendedData, currentLabelType]);

  // Reset filter when Group By changes
  useEffect(() => {
    setPredictedLabelsFilter([]);
  }, [groupBy]);

  // Filtered data (sorting is now done by API, but keep client-side filtering)
  const filteredRecommendedData = useMemo(() => {
    let data = recommendedData;

    // Filter by specific label values if selected (additional client-side filtering)
    if (predictedLabelsFilter.length > 0) {
      data = data.filter((app) => predictedLabelsFilter.includes(app.label.value));
    }

    return data;
  }, [recommendedData, predictedLabelsFilter]);

  // Handlers
  const handleOpenDetails = useCallback((app: AppCardData) => {
    const labelType = app.label.type.toLowerCase();
    const labelValue = encodeURIComponent(app.label.value);
    const demoError = searchParams.get("demo_error");
    const demoParam = demoError ? `&demo_error=${demoError}` : "";
    router.push(`/demos/ai-labeling/${labelType}?value=${labelValue}${demoParam}`);
  }, [router, searchParams]);

  const handleApprove = useCallback((app: AppCardData) => {
    setModalApp(app);
    setApproveModalOpen(true);
  }, []);

  const handleIgnore = useCallback((app: AppCardData) => {
    setModalApp(app);
    setIgnoreModalOpen(true);
  }, []);

  const handleApproveConfirm = useCallback(() => {
    if (!modalApp) return;

    approveMutation.mutate(
      { ids: [modalApp.id], userName: "Aziz Khilawala" },
      {
        onSuccess: (data) => {
          if (data?.partial) {
            handlePartialSuccess(
              { succeeded: data.succeeded, failed: data.failed },
              "Approval"
            );
          } else {
            showSuccessToast("Labels Approved", {
              description: `Successfully approved label for ${modalApp.label.value}.`,
            });
          }
          setApproveModalOpen(false);
          setSlideoutApp(null);
          setModalApp(null);
        },
        onError: (error) => {
          const config = handleError(error as APIError, "Approval", () => handleApproveConfirm());
          if (config.status === 401 || config.status === 403) {
            setAuthError({ status: config.status, message: config.description });
          }
          setApproveModalOpen(false);
          setModalApp(null);
        },
      }
    );
  }, [modalApp, approveMutation, handleError, handlePartialSuccess, showSuccessToast]);

  const handleIgnoreConfirm = useCallback((reason: string) => {
    if (!modalApp) return;

    ignoreMutation.mutate(
      { ids: [modalApp.id], reason, userName: "Aziz Khilawala" },
      {
        onSuccess: (data) => {
          if (data?.partial) {
            handlePartialSuccess(
              { succeeded: data.succeeded, failed: data.failed },
              "Ignore"
            );
          } else {
            showSuccessToast("Label Ignored", {
              description: `Successfully ignored label for ${modalApp.label.value}.`,
            });
          }
          setIgnoreModalOpen(false);
          setSlideoutApp(null);
          setModalApp(null);
        },
        onError: (error) => {
          const config = handleError(error as APIError, "Ignore", () => handleIgnoreConfirm(reason));
          if (config.status === 401 || config.status === 403) {
            setAuthError({ status: config.status, message: config.description });
          }
          setIgnoreModalOpen(false);
          setModalApp(null);
        },
      }
    );
  }, [modalApp, ignoreMutation, handleError, handlePartialSuccess, showSuccessToast]);

  const handleResetConfirm = useCallback(() => {
    resetMutation.mutate(
      { userName: "Current User" },
      {
        onSuccess: () => {
          setResetModalOpen(false);
          showSuccessToast("Demo Reset", {
            description: "All recommendations have been reset to pending.",
            duration: 5000,
          });
        },
        onError: (error) => {
          const config = handleError(error as APIError, "Reset", () => handleResetConfirm());
          if (config.status === 401 || config.status === 403) {
            setAuthError({ status: config.status, message: config.description });
          }
          setResetModalOpen(false);
        },
      }
    );
  }, [resetMutation, showSuccessToast, handleError]);

  // Render cards
  const renderCards = (data: (AppCardData | ApprovedAppData | IgnoredAppData)[]) => {
    if (data.length === 0) {
      // Get empty state content based on active tab
      const emptyStateContent = {
        recommended: {
          title: "No recommendations",
          description: "Check back later for new AI-generated label recommendations.",
        },
        approved: {
          title: "No approved labels yet.",
          description: "Approved recommendations will show up here.",
        },
        ignored: {
          title: "No ignored labels",
          description: "Ignored recommendations will show up here.",
        },
      };

      const { title, description } = emptyStateContent[activeTab];

      return (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
            borderRadius: 8,
            border: "1px solid var(--lightning-gray-200, #e6e8eb)",
            minHeight: 400,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              padding: 40,
            }}
          >
            <Illustration name="positive-neutral-empty-state" width={150} height={150} />
            <div style={{ textAlign: "center", maxWidth: 400 }}>
              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#1f272f",
                  fontFamily: "'Geist', sans-serif",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: "#63788f",
                  fontFamily: "'Geist', sans-serif",
                  lineHeight: 1.5,
                }}
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(288px, 1fr))",
          gap: 12,
        }}
      >
        {data.map((app) => (
          <AppCard key={app.id} data={app} onClick={handleOpenDetails} />
        ))}
      </div>
    );
  };

  // Get current data based on tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "recommended":
        return filteredRecommendedData;
      case "approved":
        return approvedData;
      case "ignored":
        return ignoredData;
      default:
        return [];
    }
  };

  // Check if currently loading
  const isLoading =
    (activeTab === "recommended" && isLoadingRecommendations) ||
    (activeTab === "approved" && isLoadingApproved) ||
    (activeTab === "ignored" && isLoadingIgnored);

  const totalResources = useMemo(() => {
    return filteredRecommendedData.reduce((acc, app) => acc + app.totalResources, 0);
  }, [filteredRecommendedData]);

  const viewOptions = [
    {
      id: "card",
      label: "",
      icon: <Icon name="grid" size={16} />,
    },
    {
      id: "table",
      label: "",
      icon: <Icon name="table-alt" size={16} />,
    },
  ];

  return (
    <div className="ai-labeling">
      {/* Main area */}
      <div className="ai-labeling__main">
        <Header
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Demos", href: "/demos" },
            { label: "AI Labeling" },
          ]}
          title={pageTitle}
          user={{ firstName: "Aziz", lastName: "Khilawala" }}
          sticky
        />

        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            padding: "16px 24px",
            gap: 16,
          }}
        >
          {/* Video Banner */}
          {showBanner && <VideoBanner onDismiss={() => setShowBanner(false)} />}

          {/* Auth Error Banner */}
          {authError && (
            <NotificationBanner
              status="error"
              title={authError.status === 401 ? "Session Expired" : "Access Denied"}
              description={authError.message}
              showCloseButton
              onClose={() => setAuthError(null)}
              buttonText={authError.status === 401 ? "Sign In" : undefined}
              onButtonClick={authError.status === 401 ? () => router.push("/login") : undefined}
            />
          )}

          {/* Demo Error Mode Indicator */}
          {demoConfig.enabled && (
            <NotificationBanner
              status="info"
              title={`Demo Error Mode: ${demoConfig.errorType}`}
              description={
                demoConfig.errorType === "404"
                  ? "Tab content shows error illustration with Retry. Click any card → Slideout also shows error illustration."
                  : demoConfig.errorType === "500"
                  ? "Click a card → Click Approve/Ignore → Server error toast with Retry button appears."
                  : demoConfig.errorType === "401"
                  ? "Click a card → Click Approve/Ignore → Session expired banner appears at top."
                  : demoConfig.errorType === "403"
                  ? "Click a card → Click Approve/Ignore → Access denied banner appears at top."
                  : demoConfig.errorType === "504"
                  ? "Click a card → Click Approve/Ignore → Timeout error toast with Try Again button appears."
                  : demoConfig.errorType === "207"
                  ? "Click a card → Click Approve/Ignore → Partial success warning toast shows 2 succeeded, 1 failed."
                  : "Unknown error type"
              }
            />
          )}

          {/* Tabs */}
          <Tabs
            id="ai-labeling-tabs"
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as TabId)}
            variant="primary"
          >
            <TabList tabs={TAB_OPTIONS} />
          </Tabs>

          {/* Toolbar - Different for each tab */}
          {activeTab === "approved" ? (
            <ApprovedTabFilters
              filterOptions={approvedFilterOptions}
              filterValues={approvedFilterValues}
              visibleFilters={approvedVisibleFilters}
              onFilterChange={handleApprovedFilterChange}
              onAddFilter={handleApprovedAddFilter}
              onResetFilters={handleApprovedResetFilters}
            />
          ) : activeTab === "ignored" ? (
            <IgnoredTabFilters
              filterOptions={ignoredFilterOptions}
              filterValues={ignoredFilterValues}
              visibleFilters={ignoredVisibleFilters}
              onFilterChange={handleIgnoredFilterChange}
              onAddFilter={handleIgnoredAddFilter}
              onResetFilters={handleIgnoredResetFilters}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <GroupBySelector
                  value={groupBy[0] || "application"}
                  onChange={(v) => setGroupBy([v])}
                  options={GROUP_BY_OPTIONS}
                />

                <div
                  style={{
                    width: 1,
                    height: 32,
                    background: "var(--lightning-gray-200, #e6e8eb)",
                  }}
                />

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: "#1f272f",
                      fontFamily: "'Geist', sans-serif",
                      lineHeight: "normal",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Filter by:
                  </span>
                  <PredictedLabelsDropdown
                    options={predictedLabelsOptions}
                    value={predictedLabelsFilter}
                    onChange={setPredictedLabelsFilter}
                    labelType={currentLabelType}
                  />
                  <TimeFilterDropdown
                    options={TIME_OPTIONS}
                    value={timeFilter}
                    onChange={setTimeFilter}
                  />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <SortBySelector
                  value={sortBy}
                  onChange={setSortBy}
                  options={SORT_OPTIONS}
                />
                <Button
                  variant="secondary"
                  size="md"
                  leftIcon={<Icon name="file-arrow-right" size={20} />}
                >
                  Export CSV
                </Button>
                <Button
                  variant="secondary-outlined"
                  size="md"
                  leftIcon={<Icon name="refresh-ccw" size={20} />}
                  onClick={() => setResetModalOpen(true)}
                >
                  Reset Demo
                </Button>
              </div>
            </div>
          )}

          {/* Applications Discovered Section */}
          {activeTab === "recommended" && (() => {
            const hasError = demoConfig.errorType === "404" ||
              (recommendationsError && (recommendationsError as APIError).status === 404) ||
              (recommendationsError && !((recommendationsError as APIError).status === 404));

            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 0",
                }}
              >
                <div className="flex items-center justify-between" style={{ width: "100%" }}>
                  <div className="flex items-center gap-2">
                    <Icon name="stars" size={20} color="var(--lightning-magenta-500, #A21CAF)" />
                    <span style={{
                      fontFamily: "var(--font-geist-sans, 'Geist', sans-serif)",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--lightning-bluegray-900, #020617)",
                    }}>
                      {hasError ? "No Recommendations Found" : (
                        <>
                          {filteredRecommendedData.length} {
                            groupBy[0] === "application" ? "Applications" :
                            groupBy[0] === "role" ? "Roles" :
                            groupBy[0] === "environment" ? "Environments" :
                            groupBy[0] === "location" ? "Locations" : "Items"
                          } Discovered
                        </>
                      )}
                    </span>
                  </div>
                  {!hasError && (
                    <Toggle
                      options={viewOptions}
                      value={viewMode}
                      onChange={(value) => setViewMode(value as ViewMode)}
                    />
                  )}
                </div>
              </div>
            );
          })()}

          {/* Card Grid / Table */}
          {showDiscovery && (
            // Error State - Check for specific error types
            (() => {
              // Get current error based on active tab
              const currentError = activeTab === "recommended"
                ? recommendationsError
                : activeTab === "approved"
                ? approvedError
                : ignoredError;

              // Check if it's a 404 error (demo mode or actual)
              const is404Error = demoConfig.errorType === "404" ||
                (currentError && (currentError as APIError).status === 404);

              // Check if it's any other error (500, network, etc.)
              const isOtherError = currentError && !is404Error;

              if (is404Error || isOtherError) {
                return (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#ffffff",
                      borderRadius: 8,
                      border: "1px solid var(--lightning-gray-200, #e6e8eb)",
                      minHeight: 400,
                      padding: 24,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <Illustration name="error-empty-state" width={150} height={141} />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 4,
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 400,
                            color: "#1f272f",
                            fontFamily: "'Geist', sans-serif",
                          }}
                        >
                          {activeTab === "recommended"
                            ? "Unable to Load Recommendations"
                            : activeTab === "approved"
                            ? "Unable to Load Approved Resources"
                            : "Unable to Load Ignored Resources"}
                        </span>
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 400,
                            color: "#63788f",
                            fontFamily: "'Geist', sans-serif",
                          }}
                        >
                          {is404Error
                            ? "The requested data could not be found. This may be a temporary issue."
                            : "A server error occurred. Please try again."}
                        </span>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          if (activeTab === "recommended") {
                            refetchRecommendations();
                          } else if (activeTab === "approved") {
                            refetchApproved();
                          } else {
                            refetchIgnored();
                          }
                        }}
                      >
                        <Icon name="refresh-cw" size={16} />
                        Retry
                      </Button>
                    </div>
                  </div>
                );
              }
              return null;
            })() || (isLoading ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffffff",
                  borderRadius: 8,
                  border: "1px solid var(--lightning-gray-200, #e6e8eb)",
                  minHeight: 400,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
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
                  <span
                    style={{
                      fontSize: 14,
                      color: "#63788f",
                      fontFamily: "'Geist', sans-serif",
                    }}
                  >
                    Loading...
                  </span>
                </div>
              </div>
            ) : activeTab === "approved" ? (
              <ApprovedResourcesTable
                filters={{
                  csp: approvedFilterValues.csp.length > 0 ? approvedFilterValues.csp : null,
                  labelType: null,
                  labelValue: null,
                  accountId: approvedFilterValues.account.length > 0 ? approvedFilterValues.account[0] : null,
                  region: approvedFilterValues.region.length > 0 ? approvedFilterValues.region[0] : null,
                }}
              />
            ) : activeTab === "ignored" ? (
              <IgnoredResourcesTable
                filters={{
                  csp: ignoredFilterValues.csp.length > 0 ? ignoredFilterValues.csp : null,
                  labelType: null,
                  labelValue: null,
                  accountId: ignoredFilterValues.account.length > 0 ? ignoredFilterValues.account[0] : null,
                  region: ignoredFilterValues.region.length > 0 ? ignoredFilterValues.region[0] : null,
                }}
              />
            ) : activeTab === "recommended" && viewMode === "table" ? (
              <RecommendationsTable data={filteredRecommendedData} onViewDetails={handleOpenDetails} />
            ) : (
              renderCards(getCurrentData())
            ))
          )}

          {/* Pagination placeholder */}
          {showDiscovery && getCurrentData().length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "12px 0",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: "var(--lightning-bluegray-600, #63788f)",
                  fontFamily: "'Geist', sans-serif",
                }}
              >
                Showing {getCurrentData().length} of {getCurrentData().length}
              </span>
            </div>
          )}
        </main>
      </div>

      {/* Evidence Slideout */}
      <Slideout isOpen={!!slideoutApp} onClose={() => setSlideoutApp(null)} size="lg">
        {slideoutApp && (
          <EvidencePanel
            app={slideoutApp}
            onClose={() => setSlideoutApp(null)}
            onApprove={handleApprove}
            onIgnore={handleIgnore}
            showError={demoConfig.errorType === "404"}
            onRetry={() => {
              // In demo mode, just close and reopen the slideout to simulate retry
              const currentApp = slideoutApp;
              setSlideoutApp(null);
              setTimeout(() => setSlideoutApp(currentApp), 100);
            }}
          />
        )}
      </Slideout>

      {/* Modals */}
      <ApproveModal
        isOpen={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        app={modalApp}
        onConfirm={handleApproveConfirm}
      />

      <IgnoreModal
        isOpen={ignoreModalOpen}
        onClose={() => setIgnoreModalOpen(false)}
        app={modalApp}
        onConfirm={handleIgnoreConfirm}
      />

      <ResetConfirmationModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={handleResetConfirm}
        isLoading={resetMutation.isPending}
      />

      <style jsx>{`
        .ai-labeling {
          min-height: 100vh;
          background: var(--bg-page, #f6f8f9);
        }

        .ai-labeling__main {
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
