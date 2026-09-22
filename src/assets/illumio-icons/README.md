# Custom Illumio Icons

This folder contains custom SVG icons created by the Illumio design team.

## Folder Structure

```
illumio-icons/
├── linear/       <- Linear/outlined style icons
├── solid/        <- Solid/filled style icons
└── single/       <- Single-style icons (no variants)
```

## How to Export from Figma

1. Open the Illumio Icons Figma file
2. Select the icon(s) you want to export
3. Right-click -> Export -> SVG
4. Save to the appropriate folder:
   - Icons with multiple styles: `linear/` and `solid/`
   - Icons with single style only: `single/`

## Naming Convention

Use kebab-case matching the Figma component names:
- `illumio-logo.svg` (not `IllumioLogo.svg`)
- `custom-badge.svg` (not `custom_badge.svg`)

## Generating React Components

After adding SVG files, run:

```bash
npx ts-node scripts/generate-icons.ts
```

This will generate React components alongside the Dazzle icons.

## Usage

```tsx
import { Icon } from '@/design-system/icons';

// Custom icon with variants
<Icon name="illumio-logo" variant="solid" size={24} />

// Single-style icon (uses 'linear' variant by default)
<Icon name="custom-badge" size={16} />
```
