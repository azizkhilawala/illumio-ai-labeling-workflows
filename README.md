# Lightning Design System

A modern React component library built with Lightning design tokens for building consistent, accessible UIs.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the component library.

## Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Design system showcase
│   ├── demos/                    # Demo pages
│   │   ├── ai-labeling/          # AI Labeling demo
│   │   ├── aws-firewall-traffic/ # AWS Firewall Traffic demo
│   │   └── vens-exploration/     # VENs Exploration demo
│   ├── dashboard/                # Dashboard floorplan demo
│   ├── settings/                 # Settings floorplan demo
│   ├── table-grid/               # Table floorplan demo
│   └── wizard/                   # Wizard floorplan demo
│
├── design-system/
│   ├── components/               # UI components
│   │   └── [ComponentName]/
│   │       ├── ComponentName.tsx
│   │       ├── component-name.css
│   │       └── index.ts
│   ├── floorplans/               # Page layout templates
│   │   ├── DashboardFloorplan.tsx
│   │   ├── SettingsFloorplan.tsx
│   │   ├── TableGridFloorplan.tsx
│   │   ├── WizardFloorplan.tsx
│   │   └── index.ts
│   ├── tokens/                   # Design tokens
│   │   ├── primitives.css        # Raw values (colors, spacing)
│   │   ├── semantic.css          # Use-case tokens
│   │   └── index.css
│   ├── icons/                    # Icon library
│   │   ├── icons/                # Individual icon components
│   │   ├── Icon.tsx              # Icon wrapper component
│   │   └── types.ts              # Icon type definitions
│   ├── pill-icons/               # Label-type colored icons
│   │   ├── icons/                # 158 dual-color pill icon components
│   │   ├── PillIcon.tsx          # PillIcon wrapper component
│   │   ├── pill-icon.css         # Label type color tokens
│   │   └── types.ts              # PillIconName and LabelType types
│   ├── illustrations/            # Illustration assets
│   ├── integrations/             # Third-party integrations
│   │   ├── ag-grid-theme.css     # AG Grid styling
│   │   └── chart-colors.ts       # AG Charts color tokens
│   └── index.ts                  # Main exports
│
.claude/skills/                   # Claude Code skills
├── recipes/                      # Component usage guides
├── cookbooks/                    # Complex UI patterns
└── creation/                     # Design system development
```

## Components

| Component | Description |
|-----------|-------------|
| Accordion | Collapsible content sections |
| Badge | Labels, priority indicators |
| Breadcrumb | Navigation trail |
| Button | Primary, outline, ghost variants |
| Card | Content containers with header/body/footer |
| Checkbox | Boolean form inputs |
| CoPilotButton | AI assistant trigger |
| DatePicker | Date selection input |
| FilterMenu | Dropdown filter controls |
| GlobalSearchInput | Search with keyboard shortcuts |
| Header | Page header with breadcrumbs and actions |
| Illustration | Empty state illustrations |
| Logo | Brand logos |
| MapNode | Network topology nodes |
| Modal | Dialog overlays |
| NotificationBanner | Alert banners |
| OptionCard | Selectable card options |
| Pill | Removable tags and filters |
| Radio | Single-select form inputs |
| Selector | Dropdowns and multi-select |
| SideNav | Collapsible sidebar navigation |
| Slideout | Side panel drawers |
| Status | State indicators (enabled, error, etc.) |
| Switch | Toggle switches |
| Tabs | Tab navigation |
| TextField | Text inputs with validation |
| Toast | Notification toasts |
| Toggle | On/off toggles |
| Tooltip | Hover hints |
| UserAvatar | User profile images |
| VideoBanner | Video embed banners |
| WidgetContainer | Dashboard widget wrapper |
| Wizard | Multi-step forms |

## Floorplans

Pre-built page layouts that combine components:

| Floorplan | Description |
|-----------|-------------|
| AILabelingFloorplan | AI-powered label recommendation interface |
| AwsFirewallTrafficFloorplan | AWS firewall traffic analysis dashboard |
| DashboardFloorplan | SideNav + Header + Widget grid |
| SettingsFloorplan | SideNav + Header + Settings forms |
| TableGridFloorplan | SideNav + Header + AG Grid table |
| VensExplorationFloorplan | VEN (Virtual Enforcement Node) exploration |
| WizardFloorplan | Multi-step wizard layout |

## Pill Icons

Dual-color icons designed for label types (App, Role, Env, Loc). These icons automatically apply the correct colors based on the label type.

```tsx
import { PillIcon } from "@/design-system/pill-icons";

// Basic usage with label type
<PillIcon name="app" labelType="app" size={16} />
<PillIcon name="role" labelType="role" size={16} />
<PillIcon name="env" labelType="env" size={16} />
<PillIcon name="loc" labelType="loc" size={16} />
```

| Label Type | Primary Color | Secondary Color |
|------------|---------------|-----------------|
| `app` | Blue | Light Blue |
| `role` | Wisteria | Light Wisteria |
| `env` | Teal | Light Teal |
| `loc` | Purple | Light Purple |

158 pill icons available. See `src/design-system/pill-icons/types.ts` for full list.

## Icons

The icon library includes 1,800+ icons. Import using the `Icon` component:

```tsx
import { Icon } from "@/design-system/icons";

<Icon name="check" size={16} color="var(--lightning-blue-600)" />
```

### CSP (Cloud Service Provider) Icons

Brand-colored icons for cloud providers. These preserve original brand colors and don't accept a `color` prop:

| Icon Name | Provider |
|-----------|----------|
| `csp-aws`, `csp-aws-bordered` | Amazon Web Services |
| `csp-azure`, `csp-azure-bordered` | Microsoft Azure |
| `csp-gcp`, `csp-gcp-bordered` | Google Cloud Platform |
| `csp-oci`, `csp-oci-bordered` | Oracle Cloud Infrastructure |

```tsx
<Icon name="csp-aws" size={24} />
<Icon name="csp-azure-bordered" size={24} />
```

## Design Tokens

All tokens are CSS custom properties in `src/design-system/tokens/`:

### Colors
```css
/* Primary palette */
--lightning-blue-600      /* Primary actions */
--lightning-gray-900      /* Primary text */
--lightning-bluegray-600  /* Secondary text */

/* Semantic tokens */
--bg-page                 /* Page background */
--bg-card                 /* Card background */
--text-primary            /* Primary text */
--text-secondary          /* Secondary text */
--border-card             /* Card borders */
--btn-primary-bg          /* Primary button */
```

### Spacing
```css
--offset-xx-small: 2px;
--offset-x-small: 4px;
--offset-small: 8px;
--offset-medium: 12px;
--offset-large: 16px;
--offset-x-large: 20px;
--offset-xx-large: 24px;
--offset-xxx-large: 32px;
```

### Typography
```css
/* Font families */
--family-font-family-default  /* Geist */
--family-font-family-number   /* Geist Mono */

/* Font sizes */
--font-size-text-m: 14px;     /* Body text */
--font-size-text-s: 13px;     /* Small text */
--font-size-caption-xs: 10px; /* Labels */

/* Font weights */
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-round: 9999px;
```

## Usage

```tsx
import { Button, Card, CardBody, Badge, Status } from "@/design-system";

export default function Example() {
  return (
    <Card>
      <CardBody>
        <Status status="enabled" />
        <Badge variant="critical">Critical</Badge>
        <Button variant="primary">Get Started</Button>
      </CardBody>
    </Card>
  );
}
```

---

# Contributing Guide

## 1. Creating a New Component from Figma

### Step 1: Set up the component folder

```bash
mkdir -p src/design-system/components/NewComponent
touch src/design-system/components/NewComponent/{NewComponent.tsx,new-component.css,index.ts}
```

### Step 2: Implement the component

Follow the skill at `.claude/skills/creation/component-creation.md`:

```tsx
// NewComponent.tsx
import React from 'react';
import './new-component.css';

type NewComponentProps = {
  variant?: 'default' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
};

export const NewComponent: React.FC<NewComponentProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  children,
}) => {
  const classes = [
    'ds-new-component',
    `ds-new-component--${variant}`,
    `ds-new-component--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
};

export type { NewComponentProps };
```

### Step 3: Use design tokens in CSS

```css
/* new-component.css */
.ds-new-component {
  font-family: var(--family-font-family-default);
  background-color: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-md);
  padding: var(--offset-medium);
}

.ds-new-component--primary {
  background-color: var(--btn-primary-bg);
  color: var(--lightning-contrast-white);
}
```

### Step 4: Export the component

```ts
// index.ts
export { NewComponent } from './NewComponent';
export type { NewComponentProps } from './NewComponent';
```

Add to `src/design-system/index.ts`:
```ts
export { NewComponent } from './components/NewComponent';
export type { NewComponentProps } from './components/NewComponent';
```

### Checklist
- [ ] All colors use CSS variables (`var(--lightning-*)` or semantic tokens)
- [ ] Spacing uses offset tokens (`var(--offset-*)`)
- [ ] CSS classes use `ds-` prefix
- [ ] Component exports types
- [ ] Added to `design-system/index.ts`
- [ ] Interactive states styled (hover, focus, disabled)

---

## 2. Creating a New Floorplan

Floorplans are page-level layout templates that combine multiple components.

### Step 1: Create the floorplan file

```bash
touch src/design-system/floorplans/NewFloorplan.tsx
```

### Step 2: Implement the floorplan

```tsx
"use client";

import React, { useState } from "react";
import {
  Header,
  SideNav,
  SideNavSection,
  SideNavItem,
  // ... other components
} from "@/design-system";

type NewFloorplanProps = {
  pageTitle: string;
  // ... custom props
};

export const NewFloorplan: React.FC<NewFloorplanProps> = ({
  pageTitle,
}) => {
  const [sideNavCollapsed, setSideNavCollapsed] = useState(false);

  return (
    <div className="floorplan">
      <SideNav
        collapsed={sideNavCollapsed}
        onToggleCollapse={() => setSideNavCollapsed(!sideNavCollapsed)}
      >
        {/* Navigation items */}
      </SideNav>

      <div className="floorplan__main">
        <Header
          breadcrumbs={[{ label: "Home" }, { label: pageTitle }]}
          title={pageTitle}
          sticky
        />
        <main className="floorplan__content">
          {/* Page content */}
        </main>
      </div>

      <style jsx>{`
        .floorplan { min-height: 100vh; background: var(--bg-page); }
        .floorplan__main {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          left: ${sideNavCollapsed ? '64px' : '220px'};
          display: flex;
          flex-direction: column;
          transition: left 0.2s ease;
        }
        .floorplan__content {
          flex: 1;
          padding: var(--offset-x-large);
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};
```

### Step 3: Export the floorplan

Add to `src/design-system/floorplans/index.ts`:
```ts
export { NewFloorplan } from './NewFloorplan';
```

### Step 4: Create a demo page

```tsx
// src/app/new-floorplan/page.tsx
import { NewFloorplan } from "@/design-system/floorplans";

export default function NewFloorplanPage() {
  return <NewFloorplan pageTitle="New Floorplan Demo" />;
}
```

---

## 3. Creating a Demo Page

Demo pages showcase features and designs. There are two locations:

| Location | Purpose | Git Status |
|----------|---------|------------|
| `src/app/demos/` | Public demos (shared with team) | Committed |
| `src/app/demo/` | Temporary/private demos | Gitignored |

### Existing Demos

- `/demos/ai-labeling` - AI-powered label recommendations
- `/demos/aws-firewall-traffic` - AWS firewall traffic analysis
- `/demos/vens-exploration` - VEN exploration interface

### Step 1: Create the demo folder

```bash
# For public demos (committed to git)
mkdir -p src/app/demos/[project-name]
touch src/app/demos/[project-name]/page.tsx

# For temporary/private demos (gitignored)
mkdir -p src/app/demo/[project-name]
touch src/app/demo/[project-name]/page.tsx
```

### Step 2: Implement the demo

```tsx
"use client";

import React from "react";
// Import from design system
import { Button, Card, CardBody } from "@/design-system";

export default function ProjectDemoPage() {
  return (
    <div style={{ padding: "var(--offset-x-large)" }}>
      <h1>Project Demo</h1>
      {/* Demo content */}
    </div>
  );
}
```

**Note:** The main design system showcase at `src/app/page.tsx` is the official component library viewer.

---

## 4. Creating a Skill

Skills are Claude Code instructions organized in `.claude/skills/`:

| Folder | Purpose |
|--------|---------|
| `recipes/` | Individual component usage guides |
| `cookbooks/` | Complex UI patterns (dashboards, tables) |
| `creation/` | Design system development skills |

### Step 1: Choose the right folder

- **Recipe**: Single component usage (e.g., `button.md`, `modal.md`)
- **Cookbook**: Multi-component patterns (e.g., `dashboard.md`, `data-visualization.md`)
- **Creation**: Development workflows (e.g., `component-creation.md`)

### Step 2: Create the skill file

```bash
touch .claude/skills/recipes/new-component.md
```

### Step 3: Write the skill

```markdown
# New Component Recipe

Usage guide for NewComponent.

## Import

\`\`\`tsx
import { NewComponent } from "@/design-system";
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'default' \| 'primary'` | `'default'` | Visual style |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |

## Examples

### Basic Usage

\`\`\`tsx
<NewComponent variant="primary" size="md">
  Content here
</NewComponent>
\`\`\`

## Best Practices

1. Use semantic variants for consistent styling
2. Always provide accessible labels
```

### Step 4: Update the index

Add to `.claude/skills/recipes/index.md`:

```markdown
| NewComponent | `.claude/skills/recipes/new-component.md` |
```

### Step 5: Update CLAUDE.md

Add the skill reference to `CLAUDE.md` if it's a commonly used component.

---

## Skills Quick Reference

| Task | Skill |
|------|-------|
| Component usage | `.claude/skills/recipes/[component].md` |
| Dashboard layout | `.claude/skills/cookbooks/dashboard.md` |
| Data visualization | `.claude/skills/cookbooks/data-visualization.md` |
| Table/grid | `.claude/skills/cookbooks/table-grid.md` |
| Creating components | `.claude/skills/creation/component-creation.md` |
| Design tokens | `.claude/skills/creation/design-tokens.md` |

---

## License

MIT
