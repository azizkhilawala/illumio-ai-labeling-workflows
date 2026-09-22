# Icon System Implementation Plan

## Context

This codebase has no dedicated icon system. Icons are currently handled ad-hoc via inline SVGs directly in components or `React.ReactNode` props that accept arbitrary JSX. This makes it impossible to:
- Maintain visual consistency across the design system
- Connect Figma designs to code via Code Connect
- Benefit from tree-shaking for icons

The goal is to create a full icon system from the Dazzle Figma icon library (1,711 icons, 4 style variants each) that integrates seamlessly with this repo's existing patterns.

---

## Discovery Summary

### Repo Setup
- **Framework**: Next.js 16 + React 19 + TypeScript (strict)
- **Styling**: Tailwind CSS v4 + component CSS files
- **Components**: `src/design-system/components/` with folder-per-component
- **Exports**: Named exports, barrel files in `index.ts`
- **Path alias**: `@/*` → `./src/*`

### Figma Library
- **URL**: https://www.figma.com/design/yjpAxPPRpqEqlktxzADuhY/Dazzle-Icon?node-id=501-38091
- **Total icons**: ~1,711
- **Variant property**: `Style`
- **Variant values**: Linear, Solid, Duotone, Monochrome
- **Naming convention**: kebab-case (e.g., `circle-exclamation`, `address-book`)

---

## Implementation Plan

### Step 1: Create Icon System Structure

Create the following folder structure:

```
src/design-system/icons/
├── Icon.tsx              # Base wrapper component
├── icon.css              # Icon styles (sizing, color)
├── types.ts              # IconName, IconVariant, IconProps types
├── registry.ts           # Maps icon names to components
├── index.ts              # Barrel exports
└── icons/                # 1,711 individual icon files
    ├── CircleExclamation.tsx
    ├── AddressBook.tsx
    ├── ArrowDown.tsx
    └── ... (all icons)
```

**Files to create:**

1. **`types.ts`** - TypeScript types
   ```tsx
   export type IconVariant = 'linear' | 'solid' | 'duotone' | 'monochrome';
   export type IconName = 'circle-exclamation' | 'address-book' | ... ; // Union of all 1,711 names
   export type IconSize = 12 | 16 | 20 | 24 | 32 | number;
   export type IconProps = {
     name: IconName;
     variant?: IconVariant;
     size?: IconSize;
     color?: string;
     className?: string;
   };
   ```

2. **`Icon.tsx`** - Base wrapper component
   - Accepts `name`, `variant`, `size`, `color`, `className`
   - Looks up icon component from registry
   - Passes variant to the specific icon component
   - Applies consistent sizing/color via CSS variables

3. **`icon.css`** - Styles
   - `.ds-icon` base class
   - Size modifiers: `.ds-icon--12`, `.ds-icon--16`, etc.
   - Uses `currentColor` by default for inheritance

4. **`registry.ts`** - Icon registry
   - Maps kebab-case names to PascalCase components
   - Enables dynamic icon lookup by name

5. **`index.ts`** - Barrel exports
   - Export `Icon` component
   - Export all individual icons for direct import
   - Export types

### Step 2: Generate Individual Icon Components

For each of the ~1,711 icons, generate a file like:

```tsx
// icons/CircleExclamation.tsx
import React from 'react';
import type { IconVariant } from '../types';

type Props = {
  variant?: IconVariant;
  size?: number;
  color?: string;
  className?: string;
};

export const CircleExclamation: React.FC<Props> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <path d="..." stroke={color} strokeWidth="1.5" />
      )}
      {variant === 'solid' && (
        <path d="..." fill={color} />
      )}
      {variant === 'duotone' && (
        <>
          <path d="..." fill={color} opacity="0.2" />
          <path d="..." stroke={color} strokeWidth="1.5" />
        </>
      )}
      {variant === 'monochrome' && (
        <path d="..." fill={color} />
      )}
    </svg>
  );
};
```

**Process:**
1. Use Figma MCP `get_design_context` to fetch SVG paths for each icon
2. Extract path data for each variant
3. Generate the component file with conditional rendering per variant

### Step 3: Create Code Connect Files

Create `Icon.figma.tsx` to map Figma components to code:

```tsx
// Icon.figma.tsx
import figma from '@figma/code-connect';
import { Icon } from './Icon';

// Map each icon component set to the Icon component
figma.connect(Icon, 'https://www.figma.com/design/yjpAxPPRpqEqlktxzADuhY/...', {
  props: {
    style: figma.enum('Style', {
      'Linear': 'linear',
      'Solid': 'solid',
      'Duotone': 'duotone',
      'Monochrome': 'monochrome',
    }),
  },
  example: (props) => <Icon name="circle-exclamation" variant={props.style} />,
});

// Repeat for each icon component set...
```

After creating all mappings, use `send_code_connect_mappings` via Figma MCP to publish.

### Step 4: Update Main Barrel Export

Add icon exports to `src/design-system/index.ts`:

```tsx
// Icons
export { Icon } from './icons';
export type { IconProps, IconName, IconVariant } from './icons';

// Individual icons for direct import
export * from './icons/icons';
```

### Step 5: Update Base Components

Update existing components that use inline SVGs or `React.ReactNode` icon props:

| Component | Current | Update |
|-----------|---------|--------|
| `Toast` | Inline `CloseIcon`, `SuccessIcon`, `ErrorIcon` | Import from icon system |
| `TextField` | Inline `CheckIcon`, `ErrorIcon`, `WarningIcon` | Import from icon system |
| `SideNav` | Inline chevron SVGs | Import from icon system |
| `Header` | Inline search icon SVG | Import from icon system |
| `Button` | `leftIcon: React.ReactNode` | Keep prop but document Icon usage |

Components to modify:
- `src/design-system/components/Toast/Toast.tsx`
- `src/design-system/components/Form/TextField.tsx`
- `src/design-system/components/SideNav/SideNav.tsx`
- `src/design-system/components/Header/Header.tsx`

### Step 6: Documentation & Verification

1. **Verify build**: Run `npm run build` to ensure no TypeScript errors
2. **Verify dev server**: Run `npm run dev` and check icons render correctly
3. **Verify Code Connect**: Use Figma Dev Mode to confirm mappings work
4. **Test tree-shaking**: Verify unused icons are excluded from bundle

---

## Critical Files

### New files to create:
- `src/design-system/icons/Icon.tsx`
- `src/design-system/icons/icon.css`
- `src/design-system/icons/types.ts`
- `src/design-system/icons/registry.ts`
- `src/design-system/icons/index.ts`
- `src/design-system/icons/Icon.figma.tsx`
- `src/design-system/icons/icons/*.tsx` (1,711 files)

### Files to modify:
- `src/design-system/index.ts` (add icon exports)
- `src/design-system/components/Toast/Toast.tsx`
- `src/design-system/components/Form/TextField.tsx`
- `src/design-system/components/SideNav/SideNav.tsx`
- `src/design-system/components/Header/Header.tsx`

---

## Execution Approach

Due to the scale (1,711 icons), this will be executed in batches:

1. **Foundation** (first): Create Icon.tsx, types.ts, icon.css, registry.ts, index.ts
2. **Icons by category** (parallel agents): Generate icon files in batches by category
3. **Code Connect** (after icons): Create figma.tsx files and publish mappings
4. **Component updates** (last): Update existing components to use new icons

---

## Verification

1. `npm run build` passes without errors
2. `npm run dev` shows icons rendering at `/` or a test page
3. Figma Dev Mode shows Code Connect snippets for icons
4. Bundle analyzer shows tree-shaking working (only used icons in bundle)
