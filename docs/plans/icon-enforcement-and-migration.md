# Plan: Enforce Design System Icons & Migrate Inline SVGs

## Context

The codebase has a comprehensive icon system with 1700+ icons in `src/design-system/icons/`, but 21 components contain inline SVGs instead of using the `<Icon>` component. This creates inconsistency, bloats bundle size, and makes icon updates difficult. This plan adds ESLint enforcement, a PR review checklist, and migrates existing inline SVGs.

## Scope

### Components to Migrate (17 files)
| Component | Inline SVGs | Replacement Icons |
|-----------|-------------|-------------------|
| Accordion.tsx | ChevronIcon | `chevron-down` |
| Button.tsx | spinner SVG | `loader` (with CSS animation) |
| DatePicker.tsx | ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon | `chevron-down`, `chevron-left`, `chevron-right` |
| Form/OptionSelector.tsx | ChevronDownIcon, CheckIcon | `chevron-down`, `check` |
| Form/TextField.tsx | CheckIcon, ErrorIcon, WarningIcon | `check`, `circle-exclamation`, `triangle-exclamation` |
| Modal.tsx | CloseIcon | `xmark` |
| NotificationBanner.tsx | InfoIcon, SuccessIcon, WarningIcon, ErrorIcon, LockIcon, CloseIcon | `circle-information`, `circle-check`, `triangle-exclamation`, `circle-xmark`, `lock`, `xmark` |
| OptionCard.tsx | DefaultIcon, CheckmarkIcon | `circle-exclamation`, `check` |
| Pill.tsx | CloseIcon, LocationIcon | `xmark`, `location-pin` |
| Selector.tsx | SearchIcon, CheckIcon, ChevronIcon, PlusIcon, CloseIcon | `search`, `check`, `chevron-down`, `plus`, `xmark` |
| Slideout.tsx | CloseIcon, ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, SmallCloseIcon | `xmark`, `chevron-left`, `chevron-right`, `arrow-up-right-from-square`, `xmark` |
| Status.tsx | CheckCircleIcon, DisableIcon, CircleXmarkIcon, CircleExclamationIcon, TriangleExclamationIcon | `circle-check`, `circle-minus`, `circle-xmark`, `circle-exclamation`, `triangle-exclamation` |
| Toast.tsx | SuccessIcon, ErrorIcon | `circle-check`, `circle-exclamation` |
| Tooltip.tsx | WarningIcon | `triangle-exclamation` |
| Wizard.tsx | CheckIcon | `check` |
| MapCircleNode.tsx | PlusIcon, CheckIcon, DefaultUserIcon | `plus`, `check`, `user` |
| MapSquareNode.tsx | PlusIcon, CheckIcon, DefaultIcon | `plus`, `check`, (keep custom) |

### Components to EXCLUDE (4 files - not icons)
- **Logo.tsx** - Brand logo SVGs (stay as SVGs)
- **Illustration.tsx** - Complex illustrations (stay as SVGs)
- **VideoBanner.tsx** - DefaultThumbnail placeholder graphic
- **Checkbox.tsx** - Checkbox marks with specific 10x8px sizing

## Implementation Steps

### Step 1: Update CLAUDE.md with PR Review Checklist
**File:** `CLAUDE.md`

Add Icon Usage Guidelines section:

```markdown
## Icon Usage Guidelines

When working with icons:
- Always use `<Icon name="..." />` from `@/design-system/icons` instead of inline SVGs
- Check `src/design-system/icons/types.ts` for available icon names
- If an icon doesn't exist, add it to `src/design-system/icons/icons/` following the existing pattern

### PR Review Checklist
- [ ] No inline SVGs - all icons use `<Icon name="..." />` from design-system
- [ ] Icon names match the IconName type (TypeScript will catch mismatches)
- [ ] Icon sizes are appropriate for the context (12, 16, 20, 24, 32)
```

### Step 2: Add ESLint Rule
**File:** `eslint.config.mjs`

Add `no-restricted-syntax` rule to block inline `<svg>` elements outside allowed directories:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Block inline SVGs - use Icon component instead
  {
    files: ["src/**/*.tsx"],
    ignores: [
      "src/design-system/icons/**",
      "src/design-system/illustrations/**",
      "src/design-system/components/Logo/**",
      "src/design-system/components/Illustration/**",
      "src/design-system/components/Checkbox/**",
      "src/design-system/components/VideoBanner/**",
    ],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: 'JSXOpeningElement[name.name="svg"]',
          message: 'Use <Icon name="..." /> from @/design-system/icons instead of inline SVGs. See docs for available icons.',
        },
      ],
    },
  },
]);

export default eslintConfig;
```

### Step 3: Migrate Components (in order of complexity)

**3a. Simple replacements (1 icon each):**
- Modal.tsx
- Tooltip.tsx
- Wizard.tsx
- Accordion.tsx

**3b. Medium complexity (2-3 icons):**
- Button.tsx (spinner needs CSS animation preserved)
- Toast.tsx
- OptionCard.tsx
- Pill.tsx
- Form/TextField.tsx
- DatePicker.tsx
- Form/OptionSelector.tsx

**3c. Complex (4+ icons):**
- Selector.tsx
- Slideout.tsx
- Status.tsx
- NotificationBanner.tsx
- MapCircleNode.tsx
- MapSquareNode.tsx

### Step 4: Migration Pattern

For each component:
1. Add import: `import { Icon } from '@/design-system/icons';`
2. Remove inline SVG component definitions
3. Replace usage with `<Icon name="icon-name" size={16} />`
4. Adjust size prop to match original viewBox dimensions
5. Test component renders correctly

**Example migration (Modal.tsx):**
```tsx
// BEFORE
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
// Usage: <CloseIcon />

// AFTER
import { Icon } from '@/design-system/icons';
// Usage: <Icon name="xmark" size={16} />
```

### Step 5: Handle Special Cases

**Button spinner:** Keep CSS animation, use `loader` icon:
```tsx
<span className="ds-btn__spinner" aria-hidden="true">
  <Icon name="loader" size={16} className="ds-btn__spinner-icon" />
</span>
```
Update `button.css` to animate `.ds-btn__spinner-icon` instead of the SVG directly.

**Size mismatches:** Icon component uses 24px viewBox by default. For smaller icons (10px, 12px, 16px), pass explicit `size` prop.

## Files to Modify

1. `CLAUDE.md` - Add Icon Usage Guidelines and PR Review Checklist
2. `eslint.config.mjs` - Add no-restricted-syntax rule
3. `src/design-system/components/Modal/Modal.tsx`
4. `src/design-system/components/Tooltip/Tooltip.tsx`
5. `src/design-system/components/Wizard/Wizard.tsx`
6. `src/design-system/components/Accordion/Accordion.tsx`
7. `src/design-system/components/Button/Button.tsx`
8. `src/design-system/components/Button/button.css`
9. `src/design-system/components/Toast/Toast.tsx`
10. `src/design-system/components/OptionCard/OptionCard.tsx`
11. `src/design-system/components/Pill/Pill.tsx`
12. `src/design-system/components/Form/TextField.tsx`
13. `src/design-system/components/DatePicker/DatePicker.tsx`
14. `src/design-system/components/Form/OptionSelector.tsx`
15. `src/design-system/components/Selector/Selector.tsx`
16. `src/design-system/components/Slideout/Slideout.tsx`
17. `src/design-system/components/Status/Status.tsx`
18. `src/design-system/components/NotificationBanner/NotificationBanner.tsx`
19. `src/design-system/components/MapNode/MapCircleNode.tsx`
20. `src/design-system/components/MapNode/MapSquareNode.tsx`

## Key Files Reference

- Icon component: `src/design-system/icons/Icon.tsx`
- Icon types: `src/design-system/icons/types.ts` (IconName union type)
- Icon registry: `src/design-system/icons/registry.ts`

## Verification

1. Run `npm run lint` - should pass with no inline SVG errors
2. Run `npm run build` - verify no TypeScript errors
3. Run `npm run dev` and visually check:
   - Modal close button
   - Accordion chevron animation
   - Button loading spinner
   - Toast icons
   - Status component icons
   - All notification variants
4. Intentionally add an inline `<svg>` in a component - verify ESLint catches it
