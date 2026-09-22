"use client";

import React, { useState, useMemo } from "react";
import { AgCharts } from "ag-charts-react";
import {
  ModuleRegistry as ChartsModuleRegistry,
  AllCommunityModule as AllChartsModule,
} from "ag-charts-community";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../integrations/ag-grid-theme.css";
import { CHART_COLORS, CATEGORICAL_PALETTE } from "../integrations/chart-colors";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Register AG Charts modules
ChartsModuleRegistry.registerModules([AllChartsModule]);

import { Header } from "../components/Header";
import {
  SideNav,
  SideNavSection,
  SideNavItem,
  SideNavSubItem,
  SideNavDivider,
} from "../components/SideNav";
import { WidgetContainer, WidgetGrid } from "../components/WidgetContainer";
import { Checkbox } from "../components/Form/Checkbox";
import { Grid } from "../icons/icons/Grid";
import { Server } from "../icons/icons/Server";
import { Cloud } from "../icons/icons/Cloud";
import { ChartBar } from "../icons/icons/ChartBar";
import { Shield } from "../icons/icons/Shield";
import { File } from "../icons/icons/File";
import { WhatsNew } from "../icons/icons/WhatsNew";
import { CircleQuestion } from "../icons/icons/CircleQuestion";
import { Badge } from "../components/Badge/Badge";
import { Icon } from "@/design-system/icons";

// Gradient color for title icons
const GRADIENT_COLOR = "url(#lightning-gradient-100)";

// ============================================================================
// DATA VISUALIZATION COMPONENTS
// ============================================================================

// 1. Severity Pie Chart (Donut with severity colors - 212×212px, ~100px inner circle)
const SeverityPieChart = () => {
  const data: { severity: "critical" | "high" | "medium" | "low"; label: string; count: number }[] = [
    { severity: "critical", label: "CRITICAL", count: 17 },
    { severity: "high", label: "HIGH", count: 34 },
    { severity: "medium", label: "MEDIUM", count: 36 },
    { severity: "low", label: "LOW", count: 16 },
  ];
  const colors = [CHART_COLORS.critical, CHART_COLORS.high, CHART_COLORS.medium, CHART_COLORS.low];
  const total = data.reduce((sum, d) => sum + d.count, 0);

  const options = useMemo(() => ({
    data,
    series: [{
      type: "donut" as const,
      angleKey: "count",
      innerRadiusRatio: 0.47,  // ~100px inner circle on 212px chart
      fills: colors,
      strokeWidth: 0,
    }],
    legend: { enabled: false },
    background: { visible: false },
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  } as const), []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, height: "100%", width: "100%" }}>
      <div style={{ position: "relative", width: 212, height: 212, flexShrink: 0 }}>
        <AgCharts options={options as never} style={{ width: 212, height: 212 }} />
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}>
          <span style={{
            display: "block",
            fontSize: 20,
            fontWeight: 700,
            fontFamily: "'Geist Mono', monospace",
            color: "var(--lightning-bluegray-900, #1f272f)",
          }}>{total}</span>
          <span style={{
            fontSize: 12,
            fontFamily: "'Geist', sans-serif",
            color: "var(--lightning-bluegray-600, #334155)",
          }}>Items</span>
        </div>
      </div>
      {/* Legend with Badge components */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.map((item, i) => (
          <div key={item.severity} style={{ display: "flex", alignItems: "center", gap: "var(--offset-x-small, 4px)" }}>
            {/* Color chip - pill shape */}
            <div style={{
              width: 6,
              height: 16,
              borderRadius: 50,
              backgroundColor: colors[i],
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "'Geist Mono', monospace",
              color: "var(--lightning-bluegray-900, #1f272f)",
            }}>
              {item.count}
            </span>
            <Badge variant={item.severity}>{item.label}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. Categorical Pie Chart (Donut with checkbox legend - 212×212px, 10 categories)
const CategoricalPieChart = () => {
  const allData = [
    { category: "Servers", count: 150 },
    { category: "Endpoints", count: 120 },
    { category: "Cloud", count: 100 },
    { category: "Network", count: 95 },
    { category: "Storage", count: 85 },
    { category: "Database", count: 80 },
    { category: "Security", count: 75 },
    { category: "Identity", count: 70 },
    { category: "Compute", count: 65 },
    { category: "Analytics", count: 60 },
  ];
  const colors = CATEGORICAL_PALETTE;

  // Track which categories are visible
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(
    new Set(allData.map(d => d.category))
  );

  const toggleCategory = (category: string) => {
    setVisibleCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Filter data based on visible categories
  const filteredData = allData.filter(d => visibleCategories.has(d.category));
  const filteredColors = allData
    .map((d, i) => ({ color: colors[i], visible: visibleCategories.has(d.category) }))
    .filter(c => c.visible)
    .map(c => c.color);

  const visibleTotal = filteredData.reduce((sum, d) => sum + d.count, 0);

  const options = useMemo(() => ({
    data: filteredData.length > 0 ? filteredData : [{ category: "Empty", count: 1 }],
    series: [{
      type: "donut" as const,
      angleKey: "count",
      innerRadiusRatio: 0.47,  // ~100px inner circle on 212px chart
      fills: filteredData.length > 0 ? filteredColors : [CHART_COLORS.gray200],
      strokeWidth: 0,
    }],
    legend: { enabled: false },
    background: { visible: false },
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  } as const), [filteredData, filteredColors]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, height: "100%", width: "100%" }}>
      <div style={{ position: "relative", width: 212, height: 212, flexShrink: 0 }}>
        <AgCharts options={options as never} style={{ width: 212, height: 212 }} />
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}>
          <span style={{
            display: "block",
            fontSize: 20,
            fontWeight: 700,
            fontFamily: "'Geist Mono', monospace",
            color: "var(--lightning-bluegray-900, #1f272f)",
          }}>{visibleTotal}</span>
          <span style={{
            fontSize: 12,
            fontFamily: "'Geist', sans-serif",
            color: "var(--lightning-bluegray-600, #334155)",
          }}>Total</span>
        </div>
      </div>
      {/* Two-column legend layout */}
      <div style={{ display: "flex", gap: 12 }}>
        {[0, 1].map(col => (
          <div key={col} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {allData.slice(col * 5, col * 5 + 5).map((item, idx) => {
              const i = col * 5 + idx;
              const isVisible = visibleCategories.has(item.category);
              return (
                <div
                  key={item.category}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--offset-x-small, 4px)",
                    width: 160,
                    opacity: isVisible ? 1 : 0.5,
                  }}
                >
                  <Checkbox
                    checked={isVisible}
                    onChange={() => toggleCategory(item.category)}
                    color={colors[i]}
                  />
                  <span style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "'Geist Mono', monospace",
                    color: "var(--lightning-bluegray-900, #1f272f)",
                  }}>
                    {item.count}
                  </span>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 400,
                    fontFamily: "'Geist', sans-serif",
                    color: "var(--lightning-bluegray-700, #455465)",
                  }}>
                    {item.category}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Categorical Line Chart with Checkbox Legend (212px height, 2x1 widget)
const CategoricalLineChart = () => {
  const categories = [
    { key: "cat1", label: "Category 1", count: 63 },
    { key: "cat2", label: "Category 2", count: 54 },
    { key: "cat3", label: "Category 3", count: 59 },
    { key: "cat4", label: "Category 4", count: 50 },
    { key: "cat5", label: "Category 5", count: 50 },
    { key: "cat6", label: "Category 6", count: 52 },
    { key: "cat7", label: "Category 7", count: 63 },
  ];
  const colors = CATEGORICAL_PALETTE;

  // Sample time series data
  const allData = [
    { date: "1/14/26", cat1: 12, cat2: 8, cat3: 15, cat4: 6, cat5: 10, cat6: 4, cat7: 14 },
    { date: "1/21/26", cat1: 14, cat2: 10, cat3: 12, cat4: 8, cat5: 11, cat6: 6, cat7: 16 },
    { date: "1/28/26", cat1: 10, cat2: 15, cat3: 8, cat4: 12, cat5: 9, cat6: 24, cat7: 10 },
    { date: "2/7/26", cat1: 16, cat2: 12, cat3: 10, cat4: 14, cat5: 8, cat6: 10, cat7: 12 },
    { date: "2/14/26", cat1: 11, cat2: 9, cat3: 14, cat4: 10, cat5: 12, cat6: 8, cat7: 11 },
  ];

  // Track visible categories
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(
    new Set(categories.map(c => c.key))
  );

  const toggleCategory = (key: string) => {
    setVisibleCategories(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const options = useMemo(() => ({
    data: allData,
    series: categories
      .filter(cat => visibleCategories.has(cat.key))
      .map((cat) => {
        const originalIndex = categories.findIndex(c => c.key === cat.key);
        return {
          type: "line" as const,
          xKey: "date",
          yKey: cat.key,
          yName: cat.label,
          stroke: colors[originalIndex],
          strokeWidth: 2,
          marker: { enabled: false },
          interpolation: { type: "smooth" as const },
        };
      }),
    axes: [
      {
        type: "category" as const,
        position: "bottom" as const,
        label: {
          fontSize: 12,
          fontFamily: "'Geist Mono', monospace",
          color: CHART_COLORS.bluegray600,
        },
      },
      {
        type: "number" as const,
        position: "left" as const,
        label: {
          fontSize: 12,
          fontFamily: "'Geist Mono', monospace",
          color: CHART_COLORS.bluegray600,
        },
        min: 0,
        max: 25,
      },
    ],
    legend: { enabled: false },
    background: { visible: false },
    padding: { top: 10, right: 10, bottom: 10, left: 10 },
  } as const), [visibleCategories]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, height: "100%", width: "100%" }}>
      {/* Chart area */}
      <div style={{ flex: 1, height: 212, minWidth: 0 }}>
        <AgCharts options={options as never} style={{ width: "100%", height: 212 }} />
      </div>
      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 160, flexShrink: 0 }}>
        {categories.map((cat, i) => {
          const isVisible = visibleCategories.has(cat.key);
          return (
            <div
              key={cat.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--offset-x-small, 4px)",
                opacity: isVisible ? 1 : 0.5,
              }}
            >
              <Checkbox
                checked={isVisible}
                onChange={() => toggleCategory(cat.key)}
                color={colors[i]}
              />
              <span style={{
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "'Geist Mono', monospace",
                color: "var(--lightning-bluegray-900, #1f272f)",
              }}>
                {cat.count}
              </span>
              <span style={{
                fontSize: 14,
                fontWeight: 400,
                fontFamily: "'Geist', sans-serif",
                color: "var(--lightning-bluegray-700, #455465)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 4. Severity Line Chart with Badge Legend (212px height, 2x1 widget)
const SeverityLineChart = () => {
  const severities: { key: string; severity: "critical" | "high" | "medium" | "low"; label: string; count: number }[] = [
    { key: "critical", severity: "critical", label: "CRITICAL", count: 75 },
    { key: "high", severity: "high", label: "HIGH", count: 89 },
    { key: "medium", severity: "medium", label: "MEDIUM", count: 45 },
    { key: "low", severity: "low", label: "LOW", count: 32 },
  ];
  const colors = [CHART_COLORS.critical, CHART_COLORS.high, CHART_COLORS.medium, CHART_COLORS.low];

  // Sample time series data
  const allData = [
    { date: "1/14/26", critical: 12, high: 18, medium: 6, low: 4 },
    { date: "1/21/26", critical: 14, high: 19, medium: 8, low: 5 },
    { date: "1/28/26", critical: 16, high: 17, medium: 10, low: 6 },
    { date: "2/7/26", critical: 15, high: 16, medium: 12, low: 5 },
    { date: "2/14/26", critical: 14, high: 15, medium: 10, low: 4 },
  ];

  // Track visible severities
  const [visibleSeverities, setVisibleSeverities] = useState<Set<string>>(
    new Set(severities.map(s => s.key))
  );

  const toggleSeverity = (key: string) => {
    setVisibleSeverities(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const options = useMemo(() => ({
    data: allData,
    series: severities
      .filter(sev => visibleSeverities.has(sev.key))
      .map((sev) => {
        const originalIndex = severities.findIndex(s => s.key === sev.key);
        return {
          type: "line" as const,
          xKey: "date",
          yKey: sev.key,
          yName: sev.label,
          stroke: colors[originalIndex],
          strokeWidth: 2,
          marker: { enabled: false },
          interpolation: { type: "smooth" as const },
        };
      }),
    axes: [
      {
        type: "category" as const,
        position: "bottom" as const,
        label: {
          fontSize: 12,
          fontFamily: "'Geist Mono', monospace",
          color: CHART_COLORS.bluegray600,
        },
      },
      {
        type: "number" as const,
        position: "left" as const,
        label: {
          fontSize: 12,
          fontFamily: "'Geist Mono', monospace",
          color: CHART_COLORS.bluegray600,
        },
        min: 0,
        max: 25,
      },
    ],
    legend: { enabled: false },
    background: { visible: false },
    padding: { top: 10, right: 10, bottom: 10, left: 10 },
  } as const), [visibleSeverities]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, height: "100%", width: "100%" }}>
      {/* Chart area */}
      <div style={{ flex: 1, height: 212, minWidth: 0 }}>
        <AgCharts options={options as never} style={{ width: "100%", height: 212 }} />
      </div>
      {/* Legend with Badge components */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
        {severities.map((sev, i) => {
          const isVisible = visibleSeverities.has(sev.key);
          return (
            <div
              key={sev.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--offset-x-small, 4px)",
                opacity: isVisible ? 1 : 0.5,
              }}
            >
              <Checkbox
                checked={isVisible}
                onChange={() => toggleSeverity(sev.key)}
                color={colors[i]}
              />
              <span style={{
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "'Geist Mono', monospace",
                color: "var(--lightning-bluegray-900, #1f272f)",
              }}>
                {sev.count}
              </span>
              <Badge variant={sev.severity}>{sev.label}</Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 5. Horizontal Bar Chart for Number Comparison (212px height)
const HorizontalBarChart = () => {
  const options = useMemo(() => ({
    data: [
      { category: "API Gateway", count: 245 },
      { category: "Database", count: 189 },
      { category: "Storage", count: 156 },
      { category: "Compute", count: 134 },
      { category: "Network", count: 98 },
    ],
    series: [{
      type: "bar" as const,
      direction: "horizontal" as const,
      xKey: "category",
      yKey: "count",
      fill: CHART_COLORS.blue400,
      strokeWidth: 0,
      cornerRadius: 4,
    }],
    axes: [
      { type: "category" as const, position: "left" as const, label: { fontSize: 12, color: CHART_COLORS.textPrimary } },
      { type: "number" as const, position: "bottom" as const, label: { fontSize: 11, color: CHART_COLORS.textSecondary } },
    ],
    background: { visible: false },
    padding: { top: 10, right: 20, bottom: 10, left: 10 },
  } as const), []);

  return (
    <div style={{ width: "100%", height: 212 }}>
      <AgCharts options={options as never} style={{ width: "100%", height: 212 }} />
    </div>
  );
};

// 5. Stacked Bar Chart for Category Trends (212px height)
const StackedBarChart = () => {
  const options = useMemo(() => ({
    data: [
      { month: "Jan", critical: 8, high: 15, medium: 25, low: 40 },
      { month: "Feb", critical: 12, high: 18, medium: 30, low: 35 },
      { month: "Mar", critical: 6, high: 22, medium: 28, low: 42 },
      { month: "Apr", critical: 10, high: 14, medium: 32, low: 38 },
      { month: "May", critical: 5, high: 20, medium: 26, low: 45 },
      { month: "Jun", critical: 9, high: 16, medium: 35, low: 48 },
    ],
    series: [
      { type: "bar" as const, xKey: "month", yKey: "critical", yName: "Critical", fill: CHART_COLORS.critical, stacked: true, strokeWidth: 0 },
      { type: "bar" as const, xKey: "month", yKey: "high", yName: "High", fill: CHART_COLORS.high, stacked: true, strokeWidth: 0 },
      { type: "bar" as const, xKey: "month", yKey: "medium", yName: "Medium", fill: CHART_COLORS.medium, stacked: true, strokeWidth: 0 },
      { type: "bar" as const, xKey: "month", yKey: "low", yName: "Low", fill: CHART_COLORS.low, stacked: true, strokeWidth: 0 },
    ],
    axes: [
      { type: "category" as const, position: "bottom" as const, label: { fontSize: 11, color: CHART_COLORS.textSecondary } },
      { type: "number" as const, position: "left" as const, label: { fontSize: 11, color: CHART_COLORS.textSecondary } },
    ],
    legend: {
      position: "bottom" as const,
      item: { label: { fontSize: 11, color: CHART_COLORS.textPrimary }, marker: { size: 8 } },
    },
    background: { visible: false },
    padding: { top: 10, right: 10, bottom: 5, left: 10 },
  } as const), []);

  return (
    <div style={{ width: "100%", height: 212 }}>
      <AgCharts options={options as never} style={{ width: "100%", height: 212 }} />
    </div>
  );
};

// 6a. Single Gauge Chart (180×180px)
const SingleGaugeChart = ({ percentage, label }: { percentage: number; label: string }) => {
  const color = percentage >= 70 ? CHART_COLORS.green400 : percentage >= 50 ? CHART_COLORS.orange400 : CHART_COLORS.high;

  const options = useMemo(() => ({
    data: [
      { segment: "Score", value: percentage },
      { segment: "Remaining", value: 100 - percentage },
    ],
    series: [{
      type: "donut" as const,
      angleKey: "value",
      innerRadiusRatio: 0.7,
      fills: [color, CHART_COLORS.gray200],
      strokeWidth: 0,
    }],
    legend: { enabled: false },
    background: { visible: false },
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  } as const), [percentage, color]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ position: "relative", width: 180, height: 180, flexShrink: 0 }}>
          <AgCharts options={options as never} style={{ width: 180, height: 180 }} />
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}>
            <span style={{ display: "block", fontSize: 28, fontWeight: 700, fontFamily: "'Geist Mono', monospace", color }}>{percentage}%</span>
          </div>
        </div>
        <span style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 8 }}>{label}</span>
      </div>
    </div>
  );
};

// 6b. Dual Gauge Chart (120×120px each)
const DualGaugeChart = () => {
  const gauges = [
    { percentage: 72, label: "OWASP LLM Top 10" },
    { percentage: 85, label: "OWASP ML Top 10" },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", height: "100%", gap: 16 }}>
      {gauges.map((g) => {
        const color = g.percentage >= 70 ? CHART_COLORS.green400 : g.percentage >= 50 ? CHART_COLORS.orange400 : CHART_COLORS.high;

        const options = {
          data: [
            { segment: "Score", value: g.percentage },
            { segment: "Remaining", value: 100 - g.percentage },
          ],
          series: [{
            type: "donut" as const,
            angleKey: "value",
            innerRadiusRatio: 0.7,
            fills: [color, CHART_COLORS.gray200],
            strokeWidth: 0,
          }],
          legend: { enabled: false },
          background: { visible: false },
          padding: { top: 0, right: 0, bottom: 0, left: 0 },
        } as const;

        return (
          <div key={g.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
              <AgCharts options={options as never} style={{ width: 120, height: 120 }} />
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: 18,
                fontWeight: 700,
                fontFamily: "'Geist Mono', monospace",
                color,
              }}>{g.percentage}%</div>
            </div>
            <span style={{ fontSize: 10, color: "var(--text-secondary)", textAlign: "center", marginTop: 4, maxWidth: 90 }}>{g.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// AG Grid - Assets Table (per widget-content.md: headerHeight=30, rowHeight=32, domLayout=autoHeight)
const AssetsTableWidget = () => {
  const columnDefs: ColDef[] = useMemo(() => [
    { field: 'name', headerName: 'Asset Name', flex: 2, minWidth: 120 },
    { field: 'type', headerName: 'Type', flex: 1, minWidth: 80 },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 80 },
    { field: 'risk', headerName: 'Risk', flex: 1, minWidth: 60 },
    { field: 'lastSeen', headerName: 'Last Seen', flex: 1, minWidth: 100 },
  ], []);

  const rowData = useMemo(() => [
    { name: 'prod-server-01', type: 'Server', status: 'Online', risk: 'Low', lastSeen: '2 min ago' },
    { name: 'db-primary', type: 'Database', status: 'Online', risk: 'Medium', lastSeen: '5 min ago' },
    { name: 'api-gateway', type: 'Service', status: 'Online', risk: 'Low', lastSeen: '1 min ago' },
    { name: 'worker-node-03', type: 'Server', status: 'Warning', risk: 'High', lastSeen: '15 min ago' },
    { name: 'cache-redis', type: 'Cache', status: 'Online', risk: 'Low', lastSeen: '3 min ago' },
    { name: 'lb-frontend', type: 'Load Balancer', status: 'Online', risk: 'Low', lastSeen: '1 min ago' },
  ], []);

  const defaultColDef: ColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
  }), []);

  return (
    <div className="widget-table ag-theme-alpine">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        domLayout="autoHeight"
        headerHeight={30}
        rowHeight={32}
      />
    </div>
  );
};

// Parent items with icons (for header title icon lookup) - solid with gradient
const PARENT_TITLE_ICONS: Record<string, React.ReactNode> = {
  servers: <Server variant="solid" size={20} color={GRADIENT_COLOR} />,
  insights: <ChartBar variant="solid" size={20} color={GRADIENT_COLOR} />,
  "policy-objects": <File variant="solid" size={20} color={GRADIENT_COLOR} />,
};

// Title icons for nav items (solid with gradient) - for header display
const NAV_TITLE_ICONS: Record<string, React.ReactNode> = {
  dashboard: <Grid variant="solid" size={20} color={GRADIENT_COLOR} />,
  cloud: <Cloud variant="solid" size={20} color={GRADIENT_COLOR} />,
  ransomware: <Shield variant="solid" size={20} color={GRADIENT_COLOR} />,
  "risky-traffic": <File variant="solid" size={20} color={GRADIENT_COLOR} />,
  "malicious-ip": <File variant="solid" size={20} color={GRADIENT_COLOR} />,
  "shadow-llms": <File variant="solid" size={20} color={GRADIENT_COLOR} />,
  map: <File variant="solid" size={20} color={GRADIENT_COLOR} />,
  traffic: <File variant="solid" size={20} color={GRADIENT_COLOR} />,
  mesh: <File variant="solid" size={20} color={GRADIENT_COLOR} />,
  reports: <File variant="solid" size={20} color={GRADIENT_COLOR} />,
  policies: <File variant="solid" size={20} color={GRADIENT_COLOR} />,
  "deny-rules": <File variant="solid" size={20} color={GRADIENT_COLOR} />,
};

// Navigation items configuration
const NAV_ITEMS = {
  dashboard: { label: "Dashboard", icon: <Icon name="grid" size={16} /> },
  "servers-overview": { label: "Overview", parent: "servers" },
  "servers-inventory": { label: "Inventory", parent: "servers" },
  cloud: { label: "Cloud", icon: <Icon name="cloud" size={16} /> },
  ransomware: { label: "Ransomware Protection", icon: <Icon name="shield" size={16} /> },
  "insights-summaries": { label: "Agent Summaries", parent: "insights" },
  "insights-traffic": { label: "Resource Traffic", parent: "insights" },
  "insights-hub": { label: "Insights Hub", parent: "insights" },
  "risky-traffic": { label: "Risky Traffic", icon: <Icon name="file" size={16} /> },
  "malicious-ip": { label: "Malicious IP Threats", icon: <Icon name="file" size={16} /> },
  "shadow-llms": { label: "Shadow LLMs", icon: <Icon name="file" size={16} /> },
  map: { label: "Map", icon: <Icon name="compass" size={16} /> },
  traffic: { label: "Traffic", icon: <Icon name="file" size={16} /> },
  mesh: { label: "Mesh", icon: <Icon name="file" size={16} /> },
  reports: { label: "Reports", icon: <Icon name="file" size={16} /> },
  policies: { label: "Policies", icon: <Icon name="diagram-project" size={16} /> },
  "deny-rules": { label: "Deny Rules", icon: <Icon name="file" size={16} /> },
  "policy-services": { label: "Services", parent: "policy-objects" },
  "policy-ip-lists": { label: "IP Lists", parent: "policy-objects" },
  "policy-labels": { label: "Labels", parent: "policy-objects" },
  "policy-user-groups": { label: "User Groups", parent: "policy-objects" },
} as const;

type NavItemId = keyof typeof NAV_ITEMS;

type DashboardFloorplanProps = {
  pageTitle?: string;
  breadcrumbs?: { label: string; href?: string; icon?: React.ReactNode }[];
};

export const DashboardFloorplan: React.FC<DashboardFloorplanProps> = ({
  pageTitle: initialPageTitle,
  breadcrumbs: initialBreadcrumbs,
}) => {
  const [sideNavCollapsed, setSideNavCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState<NavItemId>("insights-summaries");

  const handleNavSelect = (itemId: NavItemId) => {
    setSelectedItem(itemId);
  };

  // Get current page title based on selection
  const currentItem = NAV_ITEMS[selectedItem];
  const pageTitle = initialPageTitle || currentItem.label;
  const breadcrumbs = initialBreadcrumbs || [
    { label: "Home", href: "#", icon: <Grid variant="linear" size={16} /> },
    { label: pageTitle },
  ];

  // Get icon for current page (solid with gradient for header title)
  const getPageIcon = () => {
    // Check if there's a direct title icon for this nav item
    if (NAV_TITLE_ICONS[selectedItem]) {
      return NAV_TITLE_ICONS[selectedItem];
    }
    // Check if this item has a parent with a title icon
    if ('parent' in currentItem && currentItem.parent) {
      return PARENT_TITLE_ICONS[currentItem.parent] || null;
    }
    return null;
  };
  const pageIcon = getPageIcon();

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

  return (
    <div className="dashboard-floorplan">
      {/* SideNav */}
      <SideNav
        collapsed={sideNavCollapsed}
        onToggleCollapse={() => setSideNavCollapsed(!sideNavCollapsed)}
      >
        <SideNavSection>
          <SideNavItem
            icon={<Icon name="grid" size={16} />}
            level={1}
            active={selectedItem === "dashboard"}
            onClick={() => handleNavSelect("dashboard")}
          >
            Dashboard
          </SideNavItem>
          <SideNavItem icon={<Icon name="server" size={16} />} level={1} expandable defaultExpanded={selectedItem.startsWith("servers-")}>
            Servers & Endpoints
            <SideNavSubItem active={selectedItem === "servers-overview"} onClick={() => handleNavSelect("servers-overview")}>Overview</SideNavSubItem>
            <SideNavSubItem active={selectedItem === "servers-inventory"} onClick={() => handleNavSelect("servers-inventory")}>Inventory</SideNavSubItem>
          </SideNavItem>
          <SideNavItem
            icon={<Icon name="cloud" size={16} />}
            level={1}
            active={selectedItem === "cloud"}
            onClick={() => handleNavSelect("cloud")}
          >
            Cloud
          </SideNavItem>
          <SideNavItem
            icon={<Icon name="shield" size={16} />}
            level={1}
            active={selectedItem === "ransomware"}
            onClick={() => handleNavSelect("ransomware")}
          >
            Ransomware Protection
          </SideNavItem>
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Insights" collapsible defaultExpanded>
          <SideNavItem icon={<Icon name="chart-line" size={16} />} level={1} expandable defaultExpanded={selectedItem.startsWith("insights-")}>
            Insights Agent
            <SideNavSubItem active={selectedItem === "insights-summaries"} onClick={() => handleNavSelect("insights-summaries")}>Agent Summaries</SideNavSubItem>
            <SideNavSubItem active={selectedItem === "insights-traffic"} onClick={() => handleNavSelect("insights-traffic")}>Resource Traffic</SideNavSubItem>
            <SideNavSubItem active={selectedItem === "insights-hub"} onClick={() => handleNavSelect("insights-hub")}>Insights Hub</SideNavSubItem>
          </SideNavItem>
          <SideNavItem
            icon={<Icon name="file" size={16} />}
            level={1}
            active={selectedItem === "risky-traffic"}
            onClick={() => handleNavSelect("risky-traffic")}
          >
            Risky Traffic
          </SideNavItem>
          <SideNavItem
            icon={<Icon name="file" size={16} />}
            level={1}
            active={selectedItem === "malicious-ip"}
            onClick={() => handleNavSelect("malicious-ip")}
          >
            Malicious IP Threats
          </SideNavItem>
          <SideNavItem
            icon={<Icon name="file" size={16} />}
            level={1}
            active={selectedItem === "shadow-llms"}
            onClick={() => handleNavSelect("shadow-llms")}
          >
            Shadow LLMs
          </SideNavItem>
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Explore" collapsible defaultExpanded>
          <SideNavItem
            icon={<Icon name="compass" size={16} />}
            level={1}
            active={selectedItem === "map"}
            onClick={() => handleNavSelect("map")}
          >
            Map
          </SideNavItem>
          <SideNavItem
            icon={<Icon name="file" size={16} />}
            level={1}
            active={selectedItem === "traffic"}
            onClick={() => handleNavSelect("traffic")}
          >
            Traffic
          </SideNavItem>
          <SideNavItem
            icon={<Icon name="file" size={16} />}
            level={1}
            active={selectedItem === "mesh"}
            onClick={() => handleNavSelect("mesh")}
          >
            Mesh
          </SideNavItem>
          <SideNavItem
            icon={<Icon name="file" size={16} />}
            level={1}
            active={selectedItem === "reports"}
            onClick={() => handleNavSelect("reports")}
          >
            Reports
          </SideNavItem>
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Segmentation" collapsible defaultExpanded>
          <SideNavItem
            icon={<Icon name="diagram-project" size={16} />}
            level={1}
            active={selectedItem === "policies"}
            onClick={() => handleNavSelect("policies")}
          >
            Policies
          </SideNavItem>
          <SideNavItem
            icon={<Icon name="file" size={16} />}
            level={1}
            active={selectedItem === "deny-rules"}
            onClick={() => handleNavSelect("deny-rules")}
          >
            Deny Rules
          </SideNavItem>
          <SideNavItem icon={<Icon name="file" size={16} />} level={1} expandable defaultExpanded={selectedItem.startsWith("policy-")}>
            Policy Objects
            <SideNavSubItem active={selectedItem === "policy-services"} onClick={() => handleNavSelect("policy-services")}>Services</SideNavSubItem>
            <SideNavSubItem active={selectedItem === "policy-ip-lists"} onClick={() => handleNavSelect("policy-ip-lists")}>IP Lists</SideNavSubItem>
            <SideNavSubItem active={selectedItem === "policy-labels"} onClick={() => handleNavSelect("policy-labels")}>Labels</SideNavSubItem>
            <SideNavSubItem active={selectedItem === "policy-user-groups"} onClick={() => handleNavSelect("policy-user-groups")}>User Groups</SideNavSubItem>
          </SideNavItem>
        </SideNavSection>
      </SideNav>

      {/* Main Content Area */}
      <div className="dashboard-floorplan__main">
        {/* Header */}
        <Header
          breadcrumbs={breadcrumbs}
          title={pageTitle}
          titleIcon={pageIcon}
          showInfoButton
          onInfoClick={() => console.log('Info clicked')}
          iconButtons={iconButtons}
          user={{ firstName: "John", lastName: "Doe", avatarUrl: "https://i.pravatar.cc/40" }}
          showCoPilot
          onCoPilotClick={() => console.log('CoPilot clicked')}
          sticky
        />

        {/* Content */}
        <main className="dashboard-floorplan__content">
          {/* Row 1: Pie Charts */}
          <WidgetGrid columns={4} gap="sm">
            <WidgetContainer span={2} title="Severity Pie Chart">
              <SeverityPieChart />
            </WidgetContainer>
            <WidgetContainer span={2} title="Categorical Pie Chart">
              <CategoricalPieChart />
            </WidgetContainer>
          </WidgetGrid>

          {/* Row 2: Line Charts (2x1 widgets) */}
          <WidgetGrid columns={4} gap="sm">
            <WidgetContainer span={2} title="Categorical Line Chart">
              <CategoricalLineChart />
            </WidgetContainer>
            <WidgetContainer span={2} title="Severity Line Chart">
              <SeverityLineChart />
            </WidgetContainer>
          </WidgetGrid>

          {/* Row 3: Bar Charts */}
          <WidgetGrid columns={4} gap="sm">
            <WidgetContainer span={2} title="Horizontal Bar Chart">
              <HorizontalBarChart />
            </WidgetContainer>
            <WidgetContainer span={2} title="Stacked Bar Chart">
              <StackedBarChart />
            </WidgetContainer>
          </WidgetGrid>

          {/* Row 4: Gauges */}
          <WidgetGrid columns={4} gap="sm">
            <WidgetContainer span={1} title="Single Gauge (180px)">
              <SingleGaugeChart percentage={73} label="Score" />
            </WidgetContainer>
            <WidgetContainer span={1} title="Dual Gauges (120px)">
              <DualGaugeChart />
            </WidgetContainer>
            <WidgetContainer span={1} title="Single Gauge (High)">
              <SingleGaugeChart percentage={92} label="Score" />
            </WidgetContainer>
            <WidgetContainer span={1} title="Single Gauge (Low)">
              <SingleGaugeChart percentage={38} label="Score" />
            </WidgetContainer>
          </WidgetGrid>

          {/* Row 5: Table */}
          <WidgetGrid columns={4} gap="sm">
            <WidgetContainer span={4} title="Data Table">
              <AssetsTableWidget />
            </WidgetContainer>
          </WidgetGrid>
        </main>
      </div>

      <style jsx>{`
        .dashboard-floorplan {
          min-height: 100vh;
          background: var(--bg-page);
        }

        .dashboard-floorplan__main {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: ${sideNavCollapsed ? '64px' : '220px'};
          display: flex;
          flex-direction: column;
          transition: left 0.2s ease;
          overflow: hidden;
        }

        .dashboard-floorplan__content {
          flex: 1;
          padding: var(--offset-x-large);
          overflow-y: auto;
          overflow-x: hidden;
        }

        .dashboard-floorplan__content :global(.ds-widget-grid) + :global(.ds-widget-grid) {
          margin-top: var(--offset-medium);
        }

        /* Widget table - per widget-content.md */
        .widget-table {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default DashboardFloorplan;
