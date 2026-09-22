# Custom Illumio Icons & Illustrations System

## Context

The design system currently uses Dazzle icons (external library) with a generation script that converts SVGs to React components. The team needs to add **custom Illumio icons and illustrations** that:
- Are created by the Illumio design team in Figma
- Include icons with mixed variant support (some with linear/solid variants, some single-style)
- Include multi-colored illustrations with fixed colors (not themeable)

This plan establishes a scalable, maintainable system for custom assets alongside Dazzle icons.

---

## Current Icon Architecture

```
src/assets/icons/              <- Dazzle SVG source files
├── linear/*.svg
├── solid/*.svg
├── duotone/*.svg
└── monochrome/*.svg

src/design-system/icons/       <- Generated React components
├── icons/*.tsx                <- Individual icon components
├── Icon.tsx                   <- Main Icon component
├── registry.ts                <- Icon registry
└── types.ts                   <- IconName union type

scripts/generate-icons.ts      <- Converts SVGs -> React components
```

**Key behavior**: Current script replaces all `stroke` and `fill` colors with `{color}` prop for theming.

---

## Proposed Structure for Custom Assets

```
src/assets/
├── icons/                     <- Dazzle icons (existing)
│   ├── linear/*.svg
│   ├── solid/*.svg
│   └── ...
│
├── illumio-icons/             <- NEW: Custom Illumio icons
│   ├── linear/*.svg           <- Icons with variants
│   ├── solid/*.svg
│   └── single/*.svg           <- Single-style icons (no variants)
│
└── illumio-illustrations/     <- NEW: Multi-colored illustrations
    └── *.svg                   <- Fixed colors, not themeable

src/design-system/
├── icons/                     <- Existing (Dazzle + Custom icons)
│   ├── icons/*.tsx
│   └── ...
│
└── illustrations/             <- NEW: Illustration components
    ├── illustrations/*.tsx
    ├── Illustration.tsx
    └── types.ts
```

---

## Implementation Plan

### Step 1: Create Folder Structure

Create new asset directories:
- `src/assets/illumio-icons/linear/`
- `src/assets/illumio-icons/solid/`
- `src/assets/illumio-icons/single/`
- `src/assets/illumio-illustrations/`

Create output directories:
- `src/design-system/illustrations/`
- `src/design-system/illustrations/illustrations/`

### Step 2: Update Icon Generation Script

**Edit:** `scripts/generate-icons.ts`

Add support for:
1. Multiple source directories (Dazzle + Illumio icons)
2. `single/` variant folder for icons without style variants
3. Config flag to specify source paths

```typescript
const ICON_SOURCES = [
  { path: 'src/assets/icons', prefix: '' },           // Dazzle
  { path: 'src/assets/illumio-icons', prefix: '' },   // Custom
];
```

### Step 3: Create Illustration Generation Script

**New File:** `scripts/generate-illustrations.ts`

Key differences from icon script:
- **Does NOT replace colors** - preserves original SVG colors
- Outputs to `src/design-system/illustrations/`
- Simpler props (just `size`, `className`)
- No variant support

```typescript
// Illustration components preserve original colors
export const EmptyState: React.FC<IllustrationProps> = ({
  width = 200,
  height,
  className = '',
}) => { ... };
```

### Step 4: Create Illustration Component & Types

**New Files:**
- `src/design-system/illustrations/types.ts`
- `src/design-system/illustrations/Illustration.tsx`
- `src/design-system/illustrations/index.ts`

```typescript
// types.ts
export type IllustrationName = 'empty-state' | 'error' | 'success' | ...;
export type IllustrationProps = {
  width?: number;
  height?: number;
  className?: string;
};

// Illustration.tsx - registry-based like Icon.tsx
export const Illustration: React.FC<{ name: IllustrationName } & IllustrationProps>
```

### Step 5: Update README Documentation

**Edit:** `src/assets/icons/README.md`

Add sections for:
- Custom Illumio icons (where to export, naming)
- Illustrations (different handling, fixed colors)
- Which Figma files to use

---

## Files Summary

| Action | File | Purpose |
|--------|------|---------|
| **Create** | `src/assets/illumio-icons/README.md` | Document custom icon export process |
| **Create** | `src/assets/illumio-illustrations/README.md` | Document illustration export process |
| **Edit** | `scripts/generate-icons.ts` | Add multi-source support, single variant |
| **Create** | `scripts/generate-illustrations.ts` | New script for illustrations (no color replacement) |
| **Create** | `src/design-system/illustrations/types.ts` | Illustration type definitions |
| **Create** | `src/design-system/illustrations/Illustration.tsx` | Main Illustration component |
| **Create** | `src/design-system/illustrations/registry.ts` | Illustration registry |
| **Create** | `src/design-system/illustrations/index.ts` | Barrel export |
| **Edit** | `src/assets/icons/README.md` | Update with full documentation |

---

## Usage Examples

```tsx
// Custom Illumio icon (themeable, like Dazzle)
import { Icon } from '@/design-system/icons';
<Icon name="illumio-logo" variant="solid" size={24} color="var(--brand-primary)" />

// Single-style custom icon
<Icon name="custom-badge" size={16} />

// Multi-colored illustration (fixed colors)
import { Illustration } from '@/design-system/illustrations';
<Illustration name="empty-state" width={200} />
```

---

## Verification

1. **Generate icons**: Run `npx ts-node scripts/generate-icons.ts` - should process both Dazzle and custom icons
2. **Generate illustrations**: Run `npx ts-node scripts/generate-illustrations.ts`
3. **Build check**: `npm run build` passes
4. **Visual test**: Add demo in page.tsx showing custom icons and illustrations
5. **Color preservation**: Verify illustrations retain original multi-color design
