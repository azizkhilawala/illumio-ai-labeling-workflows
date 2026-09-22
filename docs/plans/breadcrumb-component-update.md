# Plan: Update Breadcrumb Component to Match Figma Design

## Context

The current Breadcrumb component in `src/design-system/components/Header/Header.tsx` needs to be updated to match the Figma design specifications. The design includes proper interactive states (Default, Hover, Focus, Active, Non-link), uses icon components from the design system, and follows exact token specifications for spacing, typography, and colors.

**Figma Sources:**
- Breadcrumb: `node-id=183-15979`
- Breadcrumb-item: `node-id=163-12277`

---

## Implementation Plan

### Task 1: Extract Breadcrumb to Standalone Component

**Files to create:**
- `src/design-system/components/Breadcrumb/Breadcrumb.tsx`
- `src/design-system/components/Breadcrumb/breadcrumb.css`
- `src/design-system/components/Breadcrumb/index.ts`

**Rationale:** Separating Breadcrumb from Header makes it reusable and testable independently.

---

### Task 2: Implement BreadcrumbItem Component

**Props interface:**
```typescript
type BreadcrumbItemProps = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive?: boolean;  // Current page (non-link state)
  className?: string;
};
```

**States from Figma:**
| State | Background | Text Color | Border | Notes |
|-------|------------|------------|--------|-------|
| Default | none | `--lightning-bluegray-600` | none | Link, clickable |
| Hover | `--lightning-bluegray-200` | `--lightning-bluegray-700` | none | Cursor pointer |
| Focus | `--lightning-bluegray-200` | `--lightning-bluegray-700` | `--lightning-blue-500` + shadow | Keyboard nav |
| Active | `--lightning-bluegray-200` | `--lightning-bluegray-800` | none | Mouse down |
| Non-link | none | `--lightning-bluegray-400` | none | Current page |

**Styling tokens:**
- Gap (icon ↔ text): `--spacing-1` (2px)
- Padding: `--spacing-1` (2px)
- Border radius: `--spacing-1` (2px)
- Font: `--family-font-family-default` (Geist)
- Font size: `--font-size-text-s` (13px)
- Font weight: `--weight-medium` (500)
- Icon size: 16px
- Focus shadow: `0 0 0 2px #B5DAFB`

---

### Task 3: Implement Breadcrumb Container Component

**Props interface:**
```typescript
type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};
```

**Separator:** Use `<Slash variant="linear" size={16} />` icon instead of "/" text

**Styling tokens:**
- Gap between items: `--spacing-2` (4px)
- Separator color: `--lightning-bluegray-400`

---

### Task 4: Update Header Component

**Changes:**
1. Import new Breadcrumb from `@/design-system/components/Breadcrumb`
2. Remove inline Breadcrumb component (lines 81-115)
3. Remove breadcrumb CSS from `header.css` (lines 94-148)

---

## Files to Modify

| File | Action |
|------|--------|
| `src/design-system/components/Breadcrumb/Breadcrumb.tsx` | Create |
| `src/design-system/components/Breadcrumb/breadcrumb.css` | Create |
| `src/design-system/components/Breadcrumb/index.ts` | Create (export component + types) |
| `src/design-system/components/Header/Header.tsx` | Modify (import from new Breadcrumb, remove inline component) |
| `src/design-system/components/Header/header.css` | Modify (remove breadcrumb styles) |

---

## Existing Assets to Reuse

- `src/design-system/icons/icons/Grid.tsx` - Grid icon (variant="linear")
- `src/design-system/icons/icons/Slash.tsx` - Slash separator (variant="linear")
- `src/design-system/tokens/primitives.css` - All tokens already defined

---

## Token Mapping (Figma → Code)

| Figma Token | Code Token |
|-------------|------------|
| `--spacing/spacing-1` | `--spacing-1` (2px) |
| `--spacing/spacing-2` | `--spacing-2` (4px) |
| `--font-size/text-s` | `--font-size-text-s` (13px) |
| `--weight/medium` | `--weight-medium` (500) |
| `--family/font-family-default` | `--family-font-family-default` |
| `--lightning/bluegray/400` | `--lightning-bluegray-400` |
| `--lightning/bluegray/600` | `--lightning-bluegray-600` |
| `--lightning/bluegray/700` | `--lightning-bluegray-700` |
| `--lightning/bluegray/800` | `--lightning-bluegray-800` |
| `--lightning/bluegray/200` | `--lightning-bluegray-200` |
| `--lightning/blue/500` | `--lightning-blue-500` |

---

## Verification

1. **Visual check:** Run dev server and compare breadcrumb against Figma screenshot
2. **State testing:** Verify all 5 states (Default, Hover, Focus, Active, Non-link)
3. **Scalability:** Test with 1, 2, 3+ breadcrumb items
4. **Accessibility:** Verify keyboard navigation and focus states
5. **Token alignment:** Inspect computed styles match Figma values
