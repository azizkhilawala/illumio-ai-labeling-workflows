# Illumio Illustrations

This folder contains multi-colored illustrations created by the Illumio design team.

Unlike icons, illustrations preserve their original colors and are not themeable.

## Folder Structure

```
illumio-illustrations/
├── empty-state.svg
├── error.svg
├── success.svg
└── ...
```

## How to Export from Figma

1. Open the Illumio Illustrations Figma file
2. Select the illustration you want to export
3. Right-click -> Export -> SVG
4. Save to this folder with a kebab-case name

## Naming Convention

Use kebab-case for all illustration files:
- `empty-state.svg` (not `EmptyState.svg`)
- `no-results.svg` (not `no_results.svg`)

## Color Preservation

Illustrations retain their original colors from Figma. Unlike icons:
- Colors are NOT replaced with CSS variables
- No `color` prop is available
- The illustration renders exactly as designed

## Generating React Components

After adding SVG files, run:

```bash
npx ts-node scripts/generate-illustrations.ts
```

## Usage

```tsx
import { Illustration } from '@/design-system/illustrations';

// Specify width (height auto-calculated from aspect ratio)
<Illustration name="empty-state" width={200} />

// Specify height (width auto-calculated from aspect ratio)
<Illustration name="error" height={150} />

// Specify both dimensions
<Illustration name="success" width={300} height={200} />
```

## Direct Imports

For tree-shaking, you can also import illustrations directly:

```tsx
import { EmptyState } from '@/design-system/illustrations/illustrations';

<EmptyState width={200} />
```
