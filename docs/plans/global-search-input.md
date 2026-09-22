# Global Search Input Component

> **Save Location:** Copy this plan to `docs/plans/global-search-input.md` during implementation

## Context

Create a new `GlobalSearchInput` component matching the Figma design exactly. Currently, a basic `SearchInput` exists inside Header.tsx, but it doesn't match the design specs and uses inline SVGs instead of the icon system.

**Why a separate component?**
- Has its own Figma component ("Global Search Input") - cleaner Code Connect mapping
- Follows the repo's folder-per-component pattern
- Reusable across the app (not just Header)
- Easier to maintain and test independently

**Figma Source:** https://www.figma.com/design/nQIg3RmqEf2wGebvBo4wg1?node-id=163-8359

---

## Token Mapping (Figma → Codebase)

| Figma Token | Codebase Equivalent | Status |
|-------------|---------------------|--------|
| `--lightning/gray/100` (#edf0f2) | `--lightning-gray-100` | Match |
| `--lightning/gray/200` (#e6e8eb) | `--lightning-gray-200` | Match |
| `--lightning/gray/300` (#dbdfe2) | `--lightning-gray-300` | Match |
| `--lightning/gray/600` (#7b858f) | `--lightning-gray-600` | Match |
| `--lightning/gray/900` (#1f272f) | `--lightning-gray-900` | Match |
| `--lightning/contrast/white` | `--lightning-contrast-white` | Match |
| `--font-size/text-xs` (12px) | `--font-size-text-xs` | Match |

All tokens align - no mismatches.

---

## Implementation Plan

### Step 1: Create GlobalSearchInput Component

**Create:** `src/design-system/components/GlobalSearchInput/GlobalSearchInput.tsx`

```tsx
import React from 'react';
import { Search, Command } from '@/design-system/icons/icons';
import './global-search-input.css';

export type GlobalSearchInputProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onActivate?: () => void;
  className?: string;
};

export const GlobalSearchInput: React.FC<GlobalSearchInputProps> = ({
  placeholder = 'Search',
  onSearch,
  onActivate,
  className = '',
}) => {
  const classes = ['ds-global-search-input', className].filter(Boolean).join(' ');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch((e.target as HTMLInputElement).value);
    }
  };

  const handleShortcutClick = () => {
    onActivate?.();
  };

  return (
    <div className={classes}>
      <div className="ds-global-search-input__left">
        <span className="ds-global-search-input__icon">
          <Search variant="linear" size={13} />
        </span>
        <input
          type="text"
          className="ds-global-search-input__field"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        type="button"
        className="ds-global-search-input__shortcut"
        onClick={handleShortcutClick}
        aria-label="Press Command K to search"
      >
        <Command variant="linear" size={16} />
        <span>K</span>
      </button>
    </div>
  );
};
```

### Step 2: Create GlobalSearchInput Styles

**Create:** `src/design-system/components/GlobalSearchInput/global-search-input.css`

```css
/* Global Search Input - Figma: node-id=163-8359 */

.ds-global-search-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  min-width: 306px;
  padding-left: var(--offset-medium); /* 12px */
  padding-right: var(--offset-xs-small); /* 6px */
  padding-top: var(--offset-xs-small); /* 6px */
  padding-bottom: var(--offset-xs-small); /* 6px */
  background-color: var(--lightning-gray-100);
  border: 1px solid var(--lightning-gray-200);
  border-radius: var(--radius-md); /* 8px */
  box-shadow: inset 0px 1px 3px 0px rgba(25, 33, 61, 0.1);
}

.ds-global-search-input__left {
  display: flex;
  align-items: center;
  gap: var(--offset-x-small); /* 4px */
  flex: 1;
}

.ds-global-search-input__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--lightning-gray-600);
}

.ds-global-search-input__field {
  flex: 1;
  border: none;
  background: transparent;
  font-family: var(--family-font-family-default);
  font-size: var(--font-size-text-xs); /* 12px */
  font-weight: var(--weight-regular); /* 400 */
  color: var(--lightning-gray-900);
  outline: none;
  min-width: 0;
}

.ds-global-search-input__field::placeholder {
  color: var(--lightning-gray-600);
}

.ds-global-search-input__shortcut {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--offset-x-small); /* 4px */
  padding: var(--offset-x-small) var(--offset-small); /* 4px 8px */
  background-color: var(--lightning-contrast-white);
  border: 1px solid var(--lightning-gray-300);
  border-radius: 6px;
  font-family: var(--family-font-family-default);
  font-size: var(--font-size-text-xs); /* 12px */
  font-weight: var(--weight-medium); /* 500 */
  color: var(--lightning-gray-900);
  line-height: 20px;
  cursor: pointer;
  box-shadow: 0px 1px 3px 0px rgba(31, 39, 47, 0.1);
  flex-shrink: 0;
}

.ds-global-search-input__shortcut:hover {
  background-color: var(--lightning-gray-50);
}

.ds-global-search-input__shortcut:focus-visible {
  outline: 2px solid var(--lightning-blue-500);
  outline-offset: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .ds-global-search-input {
    min-width: 200px;
  }
}

@media (max-width: 480px) {
  .ds-global-search-input__shortcut {
    display: none;
  }
}
```

### Step 3: Create Barrel Export

**Create:** `src/design-system/components/GlobalSearchInput/index.ts`

```tsx
export { GlobalSearchInput } from './GlobalSearchInput';
export type { GlobalSearchInputProps } from './GlobalSearchInput';
```

### Step 4: Add to Design System Exports

**Edit:** `src/design-system/index.ts`

Add:
```tsx
export { GlobalSearchInput } from './components/GlobalSearchInput';
export type { GlobalSearchInputProps } from './components/GlobalSearchInput';
```

### Step 5: Update Header.tsx

**Edit:** `src/design-system/components/Header/Header.tsx`

1. Import the new component:
```tsx
import { GlobalSearchInput } from '@/design-system/components/GlobalSearchInput';
```

2. Replace `<SearchInput ... />` usage with `<GlobalSearchInput ... />`

3. Remove the old `SearchInput` component definition (lines 116-153)

4. Update the `SearchInputProps` type reference if exported

### Step 6: Clean Up Header CSS

**Edit:** `src/design-system/components/Header/header.css`

Remove old `.ds-search-input` styles (lines 150-199) - they'll live in the new component's CSS file.

### Step 7: Update Header Exports

**Edit:** `src/design-system/components/Header/index.ts`

Remove `SearchInput` export if present, or keep as re-export of `GlobalSearchInput` for backwards compatibility.

### Step 8: Create Code Connect Mappings

Run via Figma MCP `send_code_connect_mappings`:

```json
{
  "fileKey": "nQIg3RmqEf2wGebvBo4wg1",
  "mappings": [
    {
      "nodeId": "163:8359",
      "componentName": "GlobalSearchInput",
      "source": "src/design-system/components/GlobalSearchInput/GlobalSearchInput.tsx",
      "label": "React"
    },
    {
      "nodeId": "163:8347",
      "componentName": "Search",
      "source": "src/design-system/icons/icons/Search.tsx",
      "label": "React"
    },
    {
      "nodeId": "65:4488",
      "componentName": "Button",
      "source": "src/design-system/components/Button/Button.tsx",
      "label": "React"
    },
    {
      "nodeId": "163:8239",
      "componentName": "Command",
      "source": "src/design-system/icons/icons/Command.tsx",
      "label": "React"
    }
  ]
}
```

---

## Files Summary

| Action | File |
|--------|------|
| **Create** | `src/design-system/components/GlobalSearchInput/GlobalSearchInput.tsx` |
| **Create** | `src/design-system/components/GlobalSearchInput/global-search-input.css` |
| **Create** | `src/design-system/components/GlobalSearchInput/index.ts` |
| **Edit** | `src/design-system/index.ts` (add export) |
| **Edit** | `src/design-system/components/Header/Header.tsx` (use new component) |
| **Edit** | `src/design-system/components/Header/header.css` (remove old styles) |
| **Edit** | `src/design-system/components/Header/index.ts` (update exports) |
| **Copy** | This plan → `docs/plans/global-search-input.md` |

---

## Verification

1. **Visual Match**: `npm run dev` - compare to Figma screenshot
   - Container BG: #edf0f2
   - Border: #e6e8eb
   - Placeholder: #7b858f
   - Height: 40px

2. **Type Check**: `npx tsc --noEmit` - no errors

3. **Icons**: Search (13px) and Command (16px) render correctly

4. **Keyboard**: Enter triggers onSearch, shortcut button clickable

5. **Code Connect**: Figma Dev Mode shows React snippets

6. **Backwards Compat**: Header still works with new component
