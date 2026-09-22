# Icon Assets

This folder contains SVG exports from the **Dazzle Figma icon library**.

For custom Illumio icons, see [../illumio-icons/README.md](../illumio-icons/README.md).

For illustrations, see [../illumio-illustrations/README.md](../illumio-illustrations/README.md).

## Folder Structure

```
src/assets/
├── icons/                   <- Dazzle icons (this folder)
│   ├── linear/
│   ├── solid/
│   ├── duotone/
│   └── monochrome/
│
├── illumio-icons/           <- Custom Illumio icons
│   ├── linear/
│   ├── solid/
│   └── single/
│
└── illumio-illustrations/   <- Multi-colored illustrations
    └── *.svg
```

## How to Export from Figma

1. Open the Dazzle Icon file:
   https://www.figma.com/design/yjpAxPPRpqEqlktxzADuhY/Dazzle-Icon?node-id=501-38091

2. For each style (Linear, Solid, Duotone, Monochrome):
   - Select the icons you want to export
   - Right-click -> Export -> SVG
   - Save to the corresponding folder here

3. **Naming convention**: Use kebab-case matching the Figma names
   - `circle-exclamation.svg` (not `CircleExclamation.svg`)
   - `address-book.svg` (not `address_book.svg`)

## Generating React Components

After adding SVG files, run the generation script:

```bash
npx ts-node scripts/generate-icons.ts
```

This will:
- Read all SVGs from both `src/assets/icons/` AND `src/assets/illumio-icons/`
- Generate React components in `src/design-system/icons/icons/`
- Update the `IconName` type with all icon names
- Register icons in the icon registry

## Usage

```tsx
// Using the Icon component (recommended)
import { Icon } from '@/design-system/icons';

<Icon name="circle-exclamation" variant="solid" size={24} />

// Direct import for tree-shaking
import { CircleExclamation } from '@/design-system/icons/icons';

<CircleExclamation variant="linear" size={16} />
```
