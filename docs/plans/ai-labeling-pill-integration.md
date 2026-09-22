# AI Labeling Page - Pill/PillIcon Integration Plan

## Context

The AI Labeling feature is built and functional, but the label pills throughout the page use custom inline styles with Icon components instead of the proper Pill component with PillIcon integration. We recently created a robust PillIcon system with 157 dual-color icons and updated the Pill component to support `labelType` and `pillIconName` props. This plan updates the AI Labeling page to use these proper design system components for consistent styling and easier maintenance.

**Why this matters:**
- Consistent label appearance across the application
- Proper use of design system color tokens via CSS custom properties
- Simplified code by removing hardcoded color mappings
- PillIcon provides proper app/role/env/loc colored icons automatically

---

## File to Modify

| Action | File |
|--------|------|
| MODIFY | `src/design-system/floorplans/AILabelingFloorplan.tsx` |

---

## LabelType Mapping

The page uses uppercase `LabelType` ("App", "Role", "Env", "Loc") but PillIcon expects lowercase:

| Page LabelType | PillIcon labelType | PillIcon name |
|----------------|-------------------|---------------|
| `"App"` | `"app"` | `"app"` |
| `"Role"` | `"role"` | `"role"` |
| `"Env"` | `"env"` | `"env"` |
| `"Loc"` | `"loc"` | `"loc"` |

Add a helper function:
```typescript
const toLabelType = (type: LabelType): 'app' | 'role' | 'env' | 'loc' => 
  type.toLowerCase() as 'app' | 'role' | 'env' | 'loc';
```

---

## Components to Update

### 1. GroupBySelector (lines 357-368, 471-483)
**Current:** Uses Pill with custom Icon and hardcoded GROUP_BY_ICON_COLORS
```tsx
<Pill
  icon={<Icon name={selectedOption.icon as "grid"} size={12} color={GROUP_BY_ICON_COLORS[selectedOption.id] || "#63788f"} />}
  showCloseButton={false}
>
  {selectedOption.label}
</Pill>
```

**Updated:** Use Pill with labelType prop
```tsx
<Pill
  labelType={groupByToLabelTypeMap[selectedOption.id]}
  showCloseButton={false}
>
  {selectedOption.label}
</Pill>
```

Where `groupByToLabelTypeMap = { application: 'app', role: 'role', environment: 'env', location: 'loc' }`

### 2. PredictedLabelsDropdown (lines 662-694)
**Current:** Inline styled div with dashed border and Icon
```tsx
<div style={{ display: "inline-flex", ... border: `1px dashed ${labelBorderColor}`, ... }}>
  <Icon name={labelIcon as "grid"} size={12} color={labelIconColor} />
  <span>...</span>
  <div><Icon name="sparkles" size={8} color="#a855f7" /></div>
</div>
```

**Updated:** Use Pill component with labelType
```tsx
<Pill labelType={toLabelType(labelType)} showCloseButton={false}>
  {labelType}: {option.label}
</Pill>
```

### 3. AppCard (lines 1239-1271)
**Current:** Inline styled div with dashed border, sparkles icon
```tsx
<div style={{ display: "inline-flex", ... border: `1px dashed ${labelBorderColor}`, ... }}>
  <Icon name={labelIcon as "grid"} size={16} color={labelIconColor} />
  <span>{data.label.type}: {data.label.value}</span>
  <div><Icon name="sparkles" size={12} color="#a855f7" /></div>
</div>
```

**Updated:** Use Pill component with labelType
```tsx
<Pill labelType={toLabelType(data.label.type)} showCloseButton={false}>
  {data.label.type}: {data.label.value}
</Pill>
```

### 4. EvidencePanel (lines 1432-1435)
**Current:** Pill with inline Icon
```tsx
<Pill>
  <Icon name="sparkles" size={12} color="var(--lightning-purple-500)" />
  {app.label.type}: {app.label.value}
</Pill>
```

**Updated:** Use Pill with labelType
```tsx
<Pill labelType={toLabelType(app.label.type)} showCloseButton={false}>
  {app.label.type}: {app.label.value}
</Pill>
```

### 5. EvidencePanel AI Recommendation section (lines 1465-1479)
**Current:** Inline styled div with purple background
```tsx
<div style={{ ... background: "var(--lightning-purple-50)", ... }}>
  <Icon name="sparkles" size={14} color="var(--lightning-purple-500)" />
  {app.label.type}: {app.label.value}
</div>
```

**Updated:** Use Pill with labelType
```tsx
<Pill labelType={toLabelType(app.label.type)} showCloseButton={false}>
  {app.label.type}: {app.label.value}
</Pill>
```

### 6. ApproveModal (lines 1587-1603)
**Current:** Inline styled div with purple background
```tsx
<div style={{ ... background: "var(--lightning-purple-50)", ... }}>
  <Icon name="sparkles" size={14} color="var(--lightning-purple-500)" />
  {app.label.type}: {app.label.value}
</div>
```

**Updated:** Use Pill with labelType
```tsx
<Pill labelType={toLabelType(app.label.type)} showCloseButton={false}>
  {app.label.type}: {app.label.value}
</Pill>
```

---

## Code to Remove

After updates, remove these unused constants:
- `LABEL_TYPE_ICONS` (lines 280-285)
- `LABEL_TYPE_BORDER_COLORS` (lines 288-293)
- `LABEL_TYPE_ICON_COLORS` (lines 296-301)
- `GROUP_BY_ICON_COLORS` (lines 308-313)

---

## Import Updates

Add to imports:
```typescript
import { PillIcon, type LabelType as PillLabelType } from '@/design-system/pill-icons';
```

Note: Rename the import to avoid conflict with the existing `LabelType` in the file.

---

## Implementation Steps

1. Add helper function `toLabelType` and `groupByToLabelTypeMap`
2. Update GroupBySelector to use Pill with labelType
3. Update PredictedLabelsDropdown to use Pill with labelType
4. Update AppCard to use Pill with labelType
5. Update EvidencePanel pills to use labelType
6. Update ApproveModal to use Pill with labelType
7. Remove unused color/icon mapping constants
8. Update imports

---

## Verification Checklist

- [ ] GroupBySelector shows colored pill icons matching label type
- [ ] PredictedLabelsDropdown shows colored pill icons
- [ ] AppCard header shows proper colored label pill
- [ ] EvidencePanel Details section shows colored pill
- [ ] EvidencePanel AI Recommendation shows colored pill
- [ ] ApproveModal shows colored label pill
- [ ] Colors match design system tokens:
  - App: `--lightning-blue-400` background
  - Role: `--lightning-wisteria-500` background
  - Env: `--lightning-teal-600` background
  - Loc: `--lightning-purple-500` background
- [ ] `npm run build` — TypeScript no errors

---

## Reference Files

- `src/design-system/components/Pill/Pill.tsx` — Pill component with labelType and pillIconName props
- `src/design-system/pill-icons/PillIcon.tsx` — PillIcon wrapper with labelType preset colors
- `src/design-system/pill-icons/pill-icon.css` — CSS custom properties for label type colors
- `src/design-system/pill-icons/types.ts` — PillIconName and LabelType types
