# Plan: Themeable Pill Icon System

## Context

The Pill icons in `src/assets/illumio-icons/single/Pill Icon/` (157 icons) have a two-layer structure:
- Circle background (colored by label type)
- White icon content on top

These need to be themeable with separate `bgColor` and `iconColor` props, using proper design system color tokens.

---

## Label Type Color Mapping (Using Design Tokens)

| Label Type | Background Token | Icon Color |
|------------|------------------|------------|
| App | `var(--lightning-blue-400)` | `var(--lightning-contrast-white)` |
| Role | `var(--lightning-wisteria-500)` | `var(--lightning-contrast-white)` |
| Env | `var(--lightning-teal-600)` | `var(--lightning-contrast-white)` |
| Loc | `var(--lightning-purple-500)` | `var(--lightning-contrast-white)` |
| Default | `var(--lightning-bluegray-600)` | `var(--lightning-contrast-white)` |

---

## Proposed Structure

Following `.claude/skills/creation/component-creation.md`:

```
src/design-system/pill-icons/
├── PillIcon.tsx              # Main wrapper component
├── pill-icon.css             # Styles with design tokens
├── types.ts                  # PillIconName, PillIconProps types
├── registry.ts               # Maps icon names to components
├── index.ts                  # Barrel exports
└── icons/                    # Individual icon components
    ├── App.tsx
    ├── Role.tsx
    ├── Env.tsx
    └── ... (157 icons)
```

---

## Files to Create

### 1. `scripts/generate-pill-icons.ts`
Generation script for dual-color icons.

**Key behavior:**
- Read SVGs from `src/assets/illumio-icons/single/Pill Icon/`
- Extract `<circle>` as background layer
- Extract remaining elements as foreground layer
- Replace background `fill` → `{bgColor}` prop
- Replace foreground `fill` → `{iconColor}` prop
- Generate TypeScript components following design system patterns

### 2. `src/design-system/pill-icons/pill-icon.css`

```css
/* Pill Icon - Dual-color icons for label pills */

/* ============================================
   BASE
   ============================================ */

.ds-pill-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ============================================
   LABEL TYPE PRESETS (CSS Custom Properties)
   ============================================ */

.ds-pill-icon--app {
  --pill-icon-bg: var(--lightning-blue-400);
  --pill-icon-fg: var(--lightning-contrast-white);
}

.ds-pill-icon--role {
  --pill-icon-bg: var(--lightning-wisteria-500);
  --pill-icon-fg: var(--lightning-contrast-white);
}

.ds-pill-icon--env {
  --pill-icon-bg: var(--lightning-teal-600);
  --pill-icon-fg: var(--lightning-contrast-white);
}

.ds-pill-icon--loc {
  --pill-icon-bg: var(--lightning-purple-500);
  --pill-icon-fg: var(--lightning-contrast-white);
}

.ds-pill-icon--default {
  --pill-icon-bg: var(--lightning-bluegray-600);
  --pill-icon-fg: var(--lightning-contrast-white);
}
```

### 3. `src/design-system/pill-icons/types.ts`

```typescript
export type PillIconSize = 12 | 14 | 16 | 18 | 20 | 24 | number;

export type LabelType = 'app' | 'role' | 'env' | 'loc';

export type PillIconComponentProps = {
  size?: PillIconSize;
  bgColor?: string;
  iconColor?: string;
  className?: string;
};

export type PillIconComponent = React.FC<PillIconComponentProps>;

// Auto-generated from SVG files
export type PillIconName =
  | 'app'
  | 'role'
  | 'env'
  | 'user'
  | 'grid'
  // ... (157 total)
  ;

export type PillIconProps = {
  name: PillIconName;
  size?: PillIconSize;
  bgColor?: string;
  iconColor?: string;
  labelType?: LabelType;  // Convenience prop for preset colors
  className?: string;
};
```

### 4. `src/design-system/pill-icons/PillIcon.tsx`

```typescript
'use client';

import React from 'react';
import type { PillIconProps, LabelType } from './types';
import { getPillIcon } from './registry';
import './pill-icon.css';

// Import all icons to register them
import './icons';

// Label type to CSS class mapping
const LABEL_TYPE_CLASSES: Record<LabelType, string> = {
  app: 'ds-pill-icon--app',
  role: 'ds-pill-icon--role',
  env: 'ds-pill-icon--env',
  loc: 'ds-pill-icon--loc',
};

// Default colors using design tokens (for inline style fallback)
const DEFAULT_COLORS = {
  bgColor: 'var(--lightning-bluegray-600)',
  iconColor: 'var(--lightning-contrast-white)',
};

export const PillIcon: React.FC<PillIconProps> = ({
  name,
  size = 18,
  bgColor,
  iconColor,
  labelType,
  className = '',
}) => {
  const IconComponent = getPillIcon(name);

  if (!IconComponent) {
    console.warn(`PillIcon: Unknown icon name "${name}"`);
    return null;
  }

  // Build class list
  const classes = [
    'ds-pill-icon',
    labelType ? LABEL_TYPE_CLASSES[labelType] : 'ds-pill-icon--default',
    className,
  ].filter(Boolean).join(' ');

  // Use provided colors or fall back to CSS custom properties
  const finalBgColor = bgColor || 'var(--pill-icon-bg, var(--lightning-bluegray-600))';
  const finalIconColor = iconColor || 'var(--pill-icon-fg, var(--lightning-contrast-white))';

  return (
    <IconComponent
      size={size}
      bgColor={finalBgColor}
      iconColor={finalIconColor}
      className={classes}
    />
  );
};

export default PillIcon;
```

### 5. `src/design-system/pill-icons/registry.ts`

```typescript
import type { PillIconComponent } from './types';

const pillIconRegistry = new Map<string, PillIconComponent>();

export function registerPillIcon(name: string, component: PillIconComponent): void {
  pillIconRegistry.set(name, component);
}

export function getPillIcon(name: string): PillIconComponent | undefined {
  return pillIconRegistry.get(name);
}

export function getAllPillIconNames(): string[] {
  return Array.from(pillIconRegistry.keys());
}
```

### 6. `src/design-system/pill-icons/index.ts`

```typescript
// Pill Icons - Dual-color icons for use in Pill components
export { PillIcon } from './PillIcon';
export type {
  PillIconProps,
  PillIconName,
  PillIconSize,
  PillIconComponentProps,
  LabelType,
} from './types';

// Re-export individual icons for direct import
export * from './icons';
```

### 7. Individual Icon Components (Generated)

Example: `src/design-system/pill-icons/icons/App.tsx`

```typescript
import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const App: React.FC<PillIconComponentProps> = ({
  size = 18,
  bgColor = 'var(--lightning-bluegray-600)',
  iconColor = 'var(--lightning-contrast-white)',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-pill-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="9" cy="9" r="9" fill={bgColor} />
      {/* Icon content */}
      <path d="M9.4 8.81951..." fill={iconColor} />
    </svg>
  );
};

registerPillIcon('app', App);
```

---

## Files to Modify

### `src/design-system/index.ts`

Add PillIcon exports:

```typescript
// Pill Icons
export { PillIcon } from './pill-icons';
export type { PillIconProps, PillIconName, LabelType } from './pill-icons';
```

---

## Component API

```tsx
import { PillIcon } from '@/design-system';

// Using labelType preset (recommended)
<PillIcon name="app" labelType="app" />
<PillIcon name="role" labelType="role" />
<PillIcon name="env" labelType="env" />
<PillIcon name="user" labelType="loc" />

// Using custom colors with design tokens
<PillIcon 
  name="app" 
  bgColor="var(--lightning-blue-400)"
  iconColor="var(--lightning-contrast-white)"
/>

// Using custom colors with hex (when needed)
<PillIcon 
  name="custom-icon" 
  bgColor="#FF5733"
  iconColor="#FFFFFF"
  size={24}
/>

// Default styling (bluegray background)
<PillIcon name="grid" />
```

---

## Cleanup After Implementation

1. **Remove Pill icons from regular icon generation**
   - Update `scripts/generate-icons.ts` to exclude `single/Pill Icon/` folder
   - Delete generated Pill icon files from `src/design-system/icons/icons/`

2. **Update existing usage**
   - Replace `<Icon name="app" />` with `<PillIcon name="app" labelType="app" />`

---

## Verification Checklist

- [ ] Run `npx ts-node scripts/generate-pill-icons.ts` - generates 157 icons
- [ ] `npm run build` passes without errors
- [ ] All colors use CSS variables (no hardcoded hex in output)
- [ ] CSS classes use `ds-` prefix
- [ ] Component exports added to `src/design-system/index.ts`
- [ ] Test in browser:
  ```tsx
  <PillIcon name="app" labelType="app" />
  <PillIcon name="role" labelType="role" />
  <PillIcon name="env" labelType="env" />
  ```
- [ ] Verify colors match design tokens

---

## Design System Compliance

Following `.claude/skills/creation/component-creation.md`:

| Requirement | Implementation |
|-------------|----------------|
| CSS variables for colors | `var(--lightning-*)` tokens |
| CSS class prefix | `ds-pill-icon` |
| File naming | `PillIcon.tsx`, `pill-icon.css` |
| TypeScript types | Exported from `types.ts` |
| Barrel exports | `index.ts` in component folder |
| Main export | Added to `design-system/index.ts` |
