"use client";

import React, { useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import type { ColDef, PaginationChangedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { Header } from "../components/Header";
import {
  SideNav,
  SideNavSection,
  SideNavItem,
  SideNavSubItem,
  SideNavDivider,
} from "../components/SideNav";
import { Status } from "../components/Status";
import type { StatusVariant } from "../components/Status";
import { Badge } from "../components/Badge";
import type { BadgeVariant } from "../components/Badge";
import { Icon } from "@/design-system/icons";
import { Grid } from "../icons/icons/Grid";
import { Table } from "../icons/icons/Table";
import { WhatsNew } from "../icons/icons/WhatsNew";
import { CircleQuestion } from "../icons/icons/CircleQuestion";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Row data type
interface RowData {
  id: number;
  header1: string;
  header2: string;
  header3: string;
  header4: number;
  header5: string;
  header6: string;
  header7: number;
  header8: string;
}

// Map status values to Status component variants
const statusToVariant: Record<string, StatusVariant> = {
  'Enabled': 'enabled',
  'Disabled': 'disabled',
  'Success': 'success',
  'Error': 'error',
  'Warning': 'warning',
};

// Map priority values to Badge component variants
const priorityToVariant: Record<string, BadgeVariant> = {
  'Critical': 'critical',
  'High': 'high',
  'Medium': 'medium',
  'Low': 'low',
};

// Cell renderer for Status component
const StatusCellRenderer = (props: { value: string }) => {
  const variant = statusToVariant[props.value] || 'enabled';
  return <Status status={variant} />;
};

// Cell renderer for Badge component
const BadgeCellRenderer = (props: { value: string }) => {
  const variant = priorityToVariant[props.value] || 'info';
  return <Badge variant={variant}>{props.value}</Badge>;
};

// Generate dummy data - 20 rows for 2 pages (10 per page)
const generateDummyData = (): RowData[] => {
  const statuses = ['Enabled', 'Disabled', 'Success', 'Error', 'Warning'];
  const categories = ['Category A', 'Category B', 'Category C', 'Category D'];
  const regions = ['North', 'South', 'East', 'West'];
  const priorities = ['Critical', 'High', 'Medium', 'Low'];

  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    header1: `Item ${i + 1}`,
    header2: `Description for item ${i + 1}`,
    header3: statuses[i % statuses.length],
    header4: Math.floor(Math.random() * 10000) + 1000,
    header5: categories[i % categories.length],
    header6: regions[i % regions.length],
    header7: parseFloat((Math.random() * 100).toFixed(2)),
    header8: priorities[i % priorities.length],
  }));
};

export interface TableGridFloorplanProps {
  pageTitle?: string;
}

export function TableGridFloorplan({ pageTitle = "Table Grid" }: TableGridFloorplanProps) {
  const [sideNavCollapsed, setSideNavCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState("table-grid");

  const handleNavSelect = (item: string) => {
    setSelectedItem(item);
  };

  const breadcrumbs = [
    { label: "Home", href: "/", icon: <Grid variant="linear" size={16} /> },
    { label: "Data", href: "#" },
    { label: pageTitle },
  ];

  // Icon buttons for the header
  const iconButtons = [
    {
      icon: <WhatsNew variant="linear" size={20} />,
      onClick: () => console.log('Magic clicked'),
      ariaLabel: "What's New",
    },
    {
      icon: <CircleQuestion variant="linear" size={20} />,
      onClick: () => console.log('Help clicked'),
      ariaLabel: 'Help',
    },
  ];

  // Column definitions
  const columnDefs = useMemo<ColDef<RowData>[]>(() => [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
      sortable: true,
      filter: true,
    },
    {
      field: 'header1',
      headerName: 'Header 1',
      flex: 1,
      minWidth: 120,
      sortable: true,
      filter: true,
    },
    {
      field: 'header2',
      headerName: 'Header 2',
      flex: 2,
      minWidth: 200,
      sortable: true,
      filter: true,
    },
    {
      field: 'header3',
      headerName: 'Status',
      width: 120,
      sortable: true,
      filter: true,
      cellRenderer: StatusCellRenderer,
    },
    {
      field: 'header4',
      headerName: 'Amount',
      width: 120,
      sortable: true,
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => params.value?.toLocaleString(),
      cellClass: 'cell-number',
    },
    {
      field: 'header5',
      headerName: 'Category',
      width: 130,
      sortable: true,
      filter: true,
    },
    {
      field: 'header6',
      headerName: 'Region',
      width: 100,
      sortable: true,
      filter: true,
    },
    {
      field: 'header7',
      headerName: 'Progress',
      width: 110,
      sortable: true,
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => `${params.value}%`,
      cellClass: 'cell-number',
    },
    {
      field: 'header8',
      headerName: 'Priority',
      width: 120,
      sortable: true,
      filter: true,
      cellRenderer: BadgeCellRenderer,
    },
  ], []);

  // Row data
  const rowData = useMemo(() => generateDummyData(), []);

  // Default column definition
  const defaultColDef = useMemo<ColDef>(() => ({
    resizable: true,
  }), []);

  // Pagination callback
  const onPaginationChanged = useCallback((event: PaginationChangedEvent) => {
    // Handle pagination change if needed
  }, []);

  return (
    <div className="table-grid-floorplan">
      {/* SideNav */}
      <SideNav
        collapsed={sideNavCollapsed}
        onToggleCollapse={() => setSideNavCollapsed(!sideNavCollapsed)}
      >
        <SideNavSection title="Overview" collapsible defaultExpanded>
          <SideNavItem
            icon={<Icon name="grid" size={16} />}
            level={1}
            active={selectedItem === "dashboard"}
            onClick={() => handleNavSelect("dashboard")}
          >
            Dashboard
          </SideNavItem>
          <SideNavItem
            icon={<Icon name="table" size={16} />}
            level={1}
            active={selectedItem === "table-grid"}
            onClick={() => handleNavSelect("table-grid")}
          >
            Table Grid
          </SideNavItem>
          <SideNavItem
            icon={<Icon name="chart-bar" size={16} />}
            level={1}
            active={selectedItem === "reports"}
            onClick={() => handleNavSelect("reports")}
          >
            Reports
          </SideNavItem>
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Data Views" collapsible defaultExpanded>
          <SideNavItem icon={<Icon name="table" size={16} />} level={1} expandable defaultExpanded>
            Tables
            <SideNavSubItem active={selectedItem === "all-data"} onClick={() => handleNavSelect("all-data")}>All Data</SideNavSubItem>
            <SideNavSubItem active={selectedItem === "filtered"} onClick={() => handleNavSelect("filtered")}>Filtered</SideNavSubItem>
            <SideNavSubItem active={selectedItem === "archived"} onClick={() => handleNavSelect("archived")}>Archived</SideNavSubItem>
          </SideNavItem>
          <SideNavItem
            icon={<Icon name="users" size={16} />}
            level={1}
            active={selectedItem === "users"}
            onClick={() => handleNavSelect("users")}
          >
            Users
          </SideNavItem>
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="System" collapsible>
          <SideNavItem
            icon={<Icon name="gear" size={16} />}
            level={1}
            active={selectedItem === "settings"}
            onClick={() => handleNavSelect("settings")}
          >
            Settings
          </SideNavItem>
        </SideNavSection>
      </SideNav>

      {/* Main Content Area */}
      <div className="table-grid-floorplan__main">
        {/* Header */}
        <Header
          breadcrumbs={breadcrumbs}
          title={pageTitle}
          titleIcon={<Table variant="solid" size={20} color="url(#lightning-gradient-100)" />}
          showInfoButton
          onInfoClick={() => console.log('Info clicked')}
          iconButtons={iconButtons}
          user={{ firstName: "John", lastName: "Doe", avatarUrl: "https://i.pravatar.cc/40" }}
          showCoPilot
          onCoPilotClick={() => console.log('CoPilot clicked')}
          sticky
        />

        {/* Content */}
        <main className="table-grid-floorplan__content">
          <div className="table-grid-floorplan__table-container ag-theme-alpine">
            <AgGridReact<RowData>
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 20, 50]}
              onPaginationChanged={onPaginationChanged}
              domLayout="normal"
              rowSelection="multiple"
              animateRows={true}
              suppressCellFocus={false}
            />
          </div>
        </main>
      </div>

      <style jsx>{`
        .table-grid-floorplan {
          min-height: 100vh;
          background: var(--bg-page, #f6f8f9);
        }

        .table-grid-floorplan__main {
          display: flex;
          flex-direction: column;
          height: 100vh;
          margin-left: ${sideNavCollapsed ? '64px' : '220px'};
          transition: margin-left 0.2s ease;
          overflow: hidden;
        }

        .table-grid-floorplan__content {
          flex: 1;
          padding: var(--offset-large, 16px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .table-grid-floorplan__table-container {
          flex: 1;
          width: 100%;
          border-radius: var(--radius-md, 8px);
          overflow: hidden;
          border: 1px solid var(--lightning-gray-200, #e6e8eb);
          background: var(--lightning-contrast-white, #ffffff);
        }

        /* AG Grid Lightning Design System Overrides */
        :global(.table-grid-floorplan .ag-theme-alpine) {
          /* Base colors */
          --ag-background-color: var(--lightning-contrast-white, #ffffff);
          --ag-foreground-color: var(--lightning-gray-900, #1d2024);
          --ag-secondary-foreground-color: var(--lightning-bluegray-600, #63788f);

          /* Header styling - white background, 30px height */
          --ag-header-background-color: var(--lightning-contrast-white, #ffffff);
          --ag-header-foreground-color: var(--lightning-gray-900, #1d2024);
          --ag-header-height: 30px;

          /* Row styling - min 32px, hug content with 4px padding */
          --ag-row-height: 32px;
          --ag-row-hover-color: var(--lightning-blue-25, #f0f7ff);
          --ag-selected-row-background-color: var(--lightning-blue-200, #92c7fe);
          --ag-odd-row-background-color: var(--lightning-contrast-white, #ffffff);

          /* Border styling - no row borders */
          --ag-border-color: var(--lightning-gray-200, #e6e8eb);
          --ag-row-border-color: transparent;
          --ag-borders: none;
          --ag-borders-row: none;
          --ag-header-column-separator-display: none;
          --ag-cell-horizontal-border: none;

          /* Typography - Geist font */
          --ag-font-family: 'Geist', var(--family-font-family-default, -apple-system, sans-serif);
          --ag-font-size: 14px;

          /* Spacing - 4px vertical padding for cells */
          --ag-cell-horizontal-padding: 12px;
          --ag-cell-vertical-padding: 4px;
          --ag-grid-size: 4px;

          /* Focus and selection */
          --ag-range-selection-border-color: var(--lightning-blue-500, #3a88fc);
          --ag-input-focus-border-color: var(--lightning-blue-500, #3a88fc);
          --ag-checkbox-checked-color: var(--lightning-blue-500, #3a88fc);

          /* Misc */
          --ag-border-radius: 0;
          --ag-card-radius: 0;
        }

        /* Header styling */
        :global(.table-grid-floorplan .ag-header) {
          border-bottom: 1px solid var(--lightning-gray-200, #e6e8eb);
        }

        :global(.table-grid-floorplan .ag-header-cell) {
          padding-left: 12px;
          padding-right: 12px;
        }

        :global(.table-grid-floorplan .ag-header-cell-label) {
          font-family: 'Geist', var(--family-font-family-default, -apple-system, sans-serif);
          font-weight: 600;
          font-size: 13px;
          color: var(--lightning-gray-900, #1d2024);
          text-transform: none;
          letter-spacing: 0;
        }

        :global(.table-grid-floorplan .ag-header-cell-text) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Row styling */
        :global(.table-grid-floorplan .ag-row) {
          border-bottom: none;
        }

        /* Cell styling - 14px regular Geist, no border */
        :global(.table-grid-floorplan .ag-cell) {
          display: flex;
          align-items: center;
          font-family: 'Geist', var(--family-font-family-default, -apple-system, sans-serif);
          font-size: 14px;
          font-weight: 400;
          color: var(--lightning-gray-900, #1d2024);
          line-height: 1.4;
          border-bottom: none;
          padding-top: 4px;
          padding-bottom: 4px;
        }

        :global(.table-grid-floorplan .ag-row-hover .ag-cell) {
          background-color: var(--lightning-blue-25, #f0f7ff);
        }

        :global(.table-grid-floorplan .ag-row-selected .ag-cell) {
          background-color: var(--lightning-blue-200, #92c7fe);
        }

        /* Number cells - use Geist Mono for tabular data */
        :global(.table-grid-floorplan .ag-cell.cell-number) {
          font-family: 'Geist Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
          font-variant-numeric: tabular-nums;
        }

        /* Link-style cells */
        :global(.table-grid-floorplan .ag-cell.cell-link) {
          color: var(--lightning-blue-600, #2366ed);
          cursor: pointer;
        }

        :global(.table-grid-floorplan .ag-cell.cell-link:hover) {
          text-decoration: underline;
        }

        /* Pagination panel styling - 8px padding, min 32px height */
        :global(.table-grid-floorplan .ag-paging-panel) {
          border-top: 1px solid var(--lightning-gray-200, #e6e8eb);
          padding: 8px 12px;
          background: var(--lightning-contrast-white, #ffffff);
          min-height: 32px;
          height: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        :global(.table-grid-floorplan .ag-paging-row-summary-panel) {
          font-family: 'Geist', var(--family-font-family-default, -apple-system, sans-serif);
          font-size: 13px;
          font-weight: 400;
          color: var(--lightning-bluegray-600, #63788f);
          margin: 0;
        }

        :global(.table-grid-floorplan .ag-paging-page-summary-panel) {
          font-family: 'Geist', var(--family-font-family-default, -apple-system, sans-serif);
          font-size: 13px;
          font-weight: 400;
          color: var(--lightning-bluegray-600, #63788f);
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
        }

        :global(.table-grid-floorplan .ag-paging-number) {
          font-weight: 500;
        }

        :global(.table-grid-floorplan .ag-paging-button) {
          border-radius: 4px;
          width: 24px;
          height: 24px;
          min-width: 24px;
          margin: 0 2px;
          opacity: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :global(.table-grid-floorplan .ag-paging-button:hover:not(.ag-disabled)) {
          background: var(--lightning-blue-50, #e3f0fe);
        }

        :global(.table-grid-floorplan .ag-paging-button.ag-disabled) {
          opacity: 0.4;
        }

        :global(.table-grid-floorplan .ag-icon) {
          color: var(--lightning-bluegray-500, #7a8fa5);
        }

        /* Sort icons */
        :global(.table-grid-floorplan .ag-sort-indicator-icon) {
          color: var(--lightning-bluegray-400, #9baaba);
        }

        :global(.table-grid-floorplan .ag-header-cell:hover .ag-sort-indicator-icon) {
          color: var(--lightning-bluegray-600, #63788f);
        }

        /* Filter icon */
        :global(.table-grid-floorplan .ag-header-icon) {
          color: var(--lightning-bluegray-400, #9baaba);
        }

        /* Checkbox styling */
        :global(.table-grid-floorplan .ag-checkbox-input-wrapper) {
          width: 16px;
          height: 16px;
        }

        :global(.table-grid-floorplan .ag-checkbox-input-wrapper::after) {
          border-radius: 3px;
        }

        /* Scrollbar styling */
        :global(.table-grid-floorplan .ag-body-horizontal-scroll-viewport::-webkit-scrollbar),
        :global(.table-grid-floorplan .ag-body-vertical-scroll-viewport::-webkit-scrollbar) {
          width: 8px;
          height: 8px;
        }

        :global(.table-grid-floorplan .ag-body-horizontal-scroll-viewport::-webkit-scrollbar-thumb),
        :global(.table-grid-floorplan .ag-body-vertical-scroll-viewport::-webkit-scrollbar-thumb) {
          background: var(--lightning-gray-300, #d0d4d9);
          border-radius: 4px;
        }

        :global(.table-grid-floorplan .ag-body-horizontal-scroll-viewport::-webkit-scrollbar-track),
        :global(.table-grid-floorplan .ag-body-vertical-scroll-viewport::-webkit-scrollbar-track) {
          background: var(--lightning-gray-50, #f3f4f6);
        }

        /* Remove default AG Grid borders */
        :global(.table-grid-floorplan .ag-root-wrapper) {
          border: none;
          border-radius: var(--radius-md, 8px);
        }

        :global(.table-grid-floorplan .ag-header-row) {
          border: none;
        }

        :global(.table-grid-floorplan .ag-pinned-left-header),
        :global(.table-grid-floorplan .ag-pinned-right-header) {
          border: none;
        }
      `}</style>
    </div>
  );
}
