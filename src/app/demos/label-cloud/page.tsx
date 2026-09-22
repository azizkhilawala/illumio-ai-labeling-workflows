"use client";

import React, { useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import type { ColDef, SelectionChangedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "@/design-system/integrations/ag-grid-theme.css";

import { Header } from "@/design-system/components/Header";
import { Button } from "@/design-system/components/Button";
import { Badge } from "@/design-system/components/Badge";
import { Pill } from "@/design-system/components/Pill";
import { Status } from "@/design-system/components/Status";
import { useLabelSave } from "./useLabelSave";
import { Icon } from "@/design-system/icons";
import type { IconName } from "@/design-system/icons";

import {
  MOCK_RESOURCES,
  AVAILABLE_LABELS,
  type Resource,
  type Label,
} from "./data";
import { EditLabelsModal } from "./EditLabelsModal";
import { ErrorDetailModal } from "./ErrorDetailModal";
import type { DomainError } from "./data";

import styles from "./page.module.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const LABEL_TYPE_TO_PILL: Record<string, "app" | "env" | "loc" | "role" | undefined> = {
  Application: "app",
  Environment: "env",
  Location: "loc",
  Role: "role",
};

const cloudProviderIconMap: Record<string, IconName> = {
  aws: "csp-aws",
  azure: "csp-azure",
  gcp: "csp-gcp",
  oci: "csp-oci",
};

const ResourceCellRenderer = (props: { data: Resource }) => {
  if (!props.data) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ color: "var(--lightning-blue-600)", fontWeight: 500 }}>
        {props.data.resource}
      </span>
      <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
        {props.data.resourceType}
      </span>
    </div>
  );
};

const AccountCellRenderer = (props: { data: Resource }) => {
  if (!props.data) return null;
  const iconName = cloudProviderIconMap[props.data.cloudProvider] || "cloud";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <Icon name={iconName} size={16} />
      <span className="cell-mono">{props.data.accountId}</span>
    </div>
  );
};

function LabelPill({ label }: { label: Label }) {
  const lt = LABEL_TYPE_TO_PILL[label.type];
  if (label.locked) {
    return (
      <Pill variant="default" showCloseButton={false} disabled>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <Icon name="lock" size={12} />
          {label.name}
        </span>
      </Pill>
    );
  }
  return (
    <Pill
      variant="default"
      labelType={lt}
      showCloseButton={false}
    >
      {label.name}
    </Pill>
  );
}

const LabelsCellRenderer = (props: { data: Resource; context: { labelMap: Map<string, Label> } }) => {
  if (!props.data) return null;
  const labels = props.data.labels
    .map((id) => props.context.labelMap.get(id))
    .filter((l): l is Label => l !== undefined);
  if (labels.length === 0) {
    return <span style={{ color: "var(--text-muted)" }}>—</span>;
  }
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "nowrap", overflow: "visible" }}>
      {labels.map((l) => (
        <LabelPill key={l.id} label={l} />
      ))}
    </div>
  );
};

export default function LabelCloudPage() {
  const [selectedRows, setSelectedRows] = useState<Resource[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES);
  const [availableLabels, setAvailableLabels] = useState<Label[]>(AVAILABLE_LABELS);
  const [retryLabelIds, setRetryLabelIds] = useState<string[] | undefined>(undefined);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [domainErrors, setDomainErrors] = useState<DomainError[]>([]);
  const [errorFailedCount, setErrorFailedCount] = useState(0);
  const [errorSucceededCount, setErrorSucceededCount] = useState(0);

  const labelMap = useMemo(
    () => new Map(availableLabels.map((l) => [l.id, l])),
    [availableLabels]
  );

  const handleCreateLabel = useCallback((label: Label) => {
    setAvailableLabels((prev) => [...prev, label]);
  }, []);

  const applyLabels = useCallback(
    (resourceIds: string[], labelIds: string[]) => {
      setResources((prev) =>
        prev.map((r) =>
          resourceIds.includes(r.id) ? { ...r, labels: labelIds } : r
        )
      );
    },
    []
  );

  const handleRetryOpenModal = useCallback(
    (resourceIds: string[], labelIds: string[]) => {
      const retryResources = resources.filter((r) => resourceIds.includes(r.id));
      setSelectedRows(retryResources);
      setRetryLabelIds(labelIds);
      setIsModalOpen(true);
    },
    [resources]
  );

  const handleDomainErrors = useCallback(
    (errors: DomainError[], failedCount: number, succeededCount: number) => {
      setDomainErrors(errors);
      setErrorFailedCount(failedCount);
      setErrorSucceededCount(succeededCount);
      setErrorModalOpen(true);
    },
    []
  );

  const { save } = useLabelSave({
    onSuccess: applyLabels,
    onRetryOpenModal: handleRetryOpenModal,
    onDomainErrors: handleDomainErrors,
  });

  const handleModalSave = useCallback(
    (resourceIds: string[], labelIds: string[]) => {
      save({ resourceIds, labelIds });
      setRetryLabelIds(undefined);
    },
    [save]
  );

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setRetryLabelIds(undefined);
    setSelectedRows([]);
  }, []);

  const columnDefs = useMemo<ColDef<Resource>[]>(
    () => [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
        maxWidth: 50,
        suppressHeaderMenuButton: true,
        pinned: "left",
      },
      {
        field: "resource",
        headerName: "Resource",
        flex: 2,
        minWidth: 300,
        cellRenderer: ResourceCellRenderer,
        pinned: "left",
      },
      {
        field: "state",
        headerName: "Resource State",
        width: 130,
        cellRenderer: () => <Status status="enabled" />,
      },
      {
        field: "category",
        headerName: "Category",
        width: 160,
      },
      {
        field: "accountId",
        headerName: "Account ID",
        width: 240,
        cellRenderer: AccountCellRenderer,
      },
      {
        field: "region",
        headerName: "Region",
        width: 130,
      },
      {
        field: "labels",
        headerName: "Labels",
        minWidth: 300,
        flex: 2,
        cellRenderer: LabelsCellRenderer,
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
    }),
    []
  );

  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent<Resource>) => {
      setSelectedRows(event.api.getSelectedRows());
      setRetryLabelIds(undefined);
    },
    []
  );

  return (
    <div className={styles.pageLayout}>
      <Header
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Demos", href: "/demos" },
          { label: "Label Cloud" },
        ]}
        title="Inventory"
        searchPlaceholder="Search..."
        user={{ firstName: "Aziz", lastName: "Khilawala" }}
        sticky
      />

      <main className={styles.content}>
        <div className={styles.toolbar}>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Icon name="pen" size={16} />}
            disabled={selectedRows.length === 0}
            onClick={() => {
              setRetryLabelIds(undefined);
              setIsModalOpen(true);
            }}
          >
            Edit Labels
          </Button>
          {selectedRows.length > 0 && (
            <Badge variant="info">{selectedRows.length}</Badge>
          )}

          <div className={styles.toolbarRight}>
            <Button variant="ghost" size="sm">
              Cloud
            </Button>
            <Button variant="ghost" size="sm">
              Region
            </Button>
            <Button variant="ghost" size="sm">
              Category
            </Button>
          </div>
        </div>

        <div className={`${styles.tableContainer} ag-theme-alpine`}>
          <AgGridReact<Resource>
            rowData={resources}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowHeight={44}
            rowSelection="multiple"
            onSelectionChanged={onSelectionChanged}
            animateRows={true}
            domLayout="normal"
            suppressCellFocus={false}
            context={{ labelMap }}
          />
        </div>
      </main>

      <EditLabelsModal
        isOpen={isModalOpen && selectedRows.length > 0}
        selectedResources={selectedRows}
        availableLabels={availableLabels}
        onSave={handleModalSave}
        onCreateLabel={handleCreateLabel}
        onClose={handleModalClose}
        initialLabelIds={retryLabelIds}
      />

      <ErrorDetailModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        errors={domainErrors}
        failedCount={errorFailedCount}
        succeededCount={errorSucceededCount}
      />
    </div>
  );
}
