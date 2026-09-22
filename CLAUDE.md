# Project Instructions

## Skills Organization

Skills are organized into three categories:

| Category | Path | Purpose |
|----------|------|---------|
| **Recipes** | `.claude/skills/recipes/` | Individual component usage guides |
| **Cookbooks** | `.claude/skills/cookbooks/` | Complex UI patterns (dashboards, tables, charts) |
| **Creation** | `.claude/skills/creation/` | Design system development skills |

## Dashboard & Data Skills

Always use the appropriate cookbook when building complex UI:

| Task | Skill |
|------|-------|
| Creating a table | `.claude/skills/cookbooks/table-grid.md` |
| Creating a dashboard | `.claude/skills/cookbooks/dashboard.md` |
| Creating any visualization (charts, gauges, graphs) | `.claude/skills/cookbooks/data-visualization.md` |
| Creating content for a widget | `.claude/skills/cookbooks/widget-content.md` |

> **CRITICAL: Data Visualization in Widgets**
>
> When adding ANY chart to a widget (pie, donut, line, bar, gauge), you **MUST** read and follow `.claude/skills/cookbooks/data-visualization.md` BEFORE writing code. Key specs:
> - Pie/Donut: **212x212px**, `innerRadiusRatio: 0.47`
> - Line/Bar: **height: 212px** (explicit pixels required)
> - Gauges: **180x180px** (single) or **120x120px** (paired)
>
> Never use `height: "100%"` for AG Charts—always use explicit pixel values.

## Component Usage

For individual component usage, refer to the recipes:

| Component | Recipe |
|-----------|--------|
| Button | `.claude/skills/recipes/button.md` |
| Form Inputs | `.claude/skills/recipes/form-inputs.md` |
| Header | `.claude/skills/recipes/header.md` |
| SideNav | `.claude/skills/recipes/sidenav.md` |
| Widget | `.claude/skills/recipes/widget.md` |
| Badge/Status | `.claude/skills/recipes/badge-status.md` |
| Pill | `.claude/skills/recipes/pill.md` |
| Modal | `.claude/skills/recipes/modal.md` |
| Icons | `.claude/skills/recipes/icons.md` |
| Tabs | `.claude/skills/recipes/tabs.md` |
| Toast | `.claude/skills/recipes/toast.md` |
| Card | `.claude/skills/recipes/card.md` |
| Empty State | `.claude/skills/recipes/empty-state.md` |
| Accordion | `.claude/skills/recipes/accordion.md` |
| DatePicker | `.claude/skills/recipes/datepicker.md` |

## Design System Development

For creating or extending the design system:

| Task | Skill |
|------|-------|
| Creating new components | `.claude/skills/creation/component-creation.md` |
| Design token reference | `.claude/skills/creation/design-tokens.md` |
| Development workflow | `.claude/skills/creation/workflow.md` |
| Writing documentation or UI text | `.claude/skills/creation/writing-style-guide.md` |

## External Skills (70+ Available)

Additional skills are installed for animation, accessibility, UX research, and more:

| Category | Key Skills |
|----------|------------|
| **Animation** | `animate`, `design-motion-principles`, `animation-principles` |
| **Accessibility** | `accessibility-audit`, `accessibility-test-plan` |
| **Design Systems** | `design-token-audit`, `color-system`, `spacing-system`, `typography-scale` |
| **Components** | `component-spec`, `loading-states`, `error-handling-ux`, `feedback-patterns` |
| **UX Research** | `user-persona`, `journey-map`, `usability-test-plan` |
| **Documentation** | `handoff-spec`, `design-rationale`, `case-study` |

> **Full Guide:** See [docs/skills-guide.md](docs/skills-guide.md) for complete skill documentation and usage examples.

## Icon Usage Guidelines

When working with icons:
- Always use `<Icon name="..." />` from `@/design-system/icons` instead of inline SVGs
- Check `src/design-system/icons/types.ts` for available icon names
- If an icon doesn't exist, add it to `src/design-system/icons/icons/` following the existing pattern

### PR Review Checklist
- [ ] No inline SVGs - all icons use `<Icon name="..." />` from design-system
- [ ] Icon names match the IconName type (TypeScript will catch mismatches)
- [ ] Icon sizes are appropriate for the context (12, 16, 20, 24, 32)
