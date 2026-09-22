/**
 * Chart Colors - Design System Token Mapping
 *
 * These colors map to Lightning Design System tokens for use in AG Charts.
 * AG Charts requires hex values, so we provide the token values directly.
 *
 * Reference: src/design-system/tokens/primitives.css
 */

export const CHART_COLORS = {
  // Primary palette (400 level - optimal for data visualization)
  blue400: '#4B97FA',      // --lightning-blue-400
  green400: '#47C462',     // --lightning-green-400
  purple400: '#7468E3',    // --lightning-purple-400
  orange400: '#FC8D2B',    // --lightning-orange-400
  teal400: '#2BCCCB',      // --lightning-teal-400
  indigo400: '#5F86FB',    // --lightning-indigo-400

  // Severity colors (400 level)
  critical: '#C026D3',     // --lightning-magenta-400
  high: '#EC6359',         // --lightning-red-400
  medium: '#FC8D2B',       // --lightning-orange-400
  low: '#EEB804',          // --lightning-yellow-400

  // Neutral colors
  gray100: '#F3F4F5',      // --lightning-gray-100
  gray200: '#E6E8EB',      // --lightning-gray-200
  gray300: '#D1D5DB',      // --lightning-gray-300

  // Text colors for chart labels
  textPrimary: '#475569',  // --lightning-bluegray-700
  textSecondary: '#64748B', // --lightning-bluegray-500
  textMuted: '#94A3B8',    // --lightning-bluegray-400
  bluegray600: '#334155',  // --lightning-bluegray-600 (axis labels)
} as const;

// Chart axis label defaults (per dashboard-design skill: 11px for graph labels)
export const CHART_AXIS_LABEL = {
  fontSize: 11,
  color: CHART_COLORS.textSecondary,
} as const;

// Chart legend defaults
export const CHART_LEGEND = {
  fontSize: 11,
  color: CHART_COLORS.textPrimary,
} as const;

// Severity color array for donut/pie charts
export const SEVERITY_COLORS = [
  CHART_COLORS.critical,
  CHART_COLORS.high,
  CHART_COLORS.medium,
  CHART_COLORS.low,
] as const;

// Primary color palette for general charts
export const PRIMARY_PALETTE = [
  CHART_COLORS.blue400,
  CHART_COLORS.green400,
  CHART_COLORS.purple400,
  CHART_COLORS.orange400,
  CHART_COLORS.teal400,
  CHART_COLORS.indigo400,
] as const;

// Extended 10-color palette for categorical data (all Lightning design tokens)
// Use for pie charts, line charts, bar charts with multiple categories
export const CATEGORICAL_PALETTE = [
  '#FC8D2B',  // --lightning-orange-400
  '#8B5CF6',  // --lightning-violet-400
  '#5F86FB',  // --lightning-indigo-400
  '#FF2CA1',  // --lightning-rose-400
  '#943BFF',  // --lightning-violet-400 (alt)
  '#EEB804',  // --lightning-yellow-400
  '#8EA743',  // --lightning-olive-400
  '#47C462',  // --lightning-green-400
  '#2BCCCB',  // --lightning-teal-400
  '#4B97FA',  // --lightning-blue-400
] as const;

// Alias for backwards compatibility
export const DISTRIBUTION_PALETTE = CATEGORICAL_PALETTE;
