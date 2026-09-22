# Skills Guide for Claude Code

This guide helps team members understand and use the design and development skills installed in this repository.

## What Are Skills?

Skills are specialized instructions that enhance Claude's capabilities for specific tasks. They provide domain expertise, best practices, and structured workflows for design, development, accessibility, and more.

## How to Invoke Skills

### Method 1: Natural Language (Recommended)

Simply describe what you want. Claude will automatically use the relevant skill:

```
"Audit the Button component for accessibility"
"Add animations to the Modal component"  
"Review the spacing system across components"
```

### Method 2: Explicit Skill Reference

Reference a specific skill by name:

```
"Use the accessibility-audit skill on the Toast component"
"Apply animation-principles to the Slideout"
"Run design-token-audit on the codebase"
```

### Method 3: Slash Command

Some skills can be invoked with slash commands:

```
/animate - Animation patterns and best practices
/design-motion-principles - Motion design audit
```

---

## Skill Categories

### Animation & Motion

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `animate` | Animation patterns for Next.js/React (Framer Motion, CSS) | Adding transitions, hover effects, page animations |
| `animation-principles` | Core animation principles and timing | Understanding motion fundamentals |
| `design-motion-principles` | Expert motion audit (Emil Kowalski, Jakub Krehel, Jhey Tompkins) | Reviewing and improving existing animations |
| `micro-interaction-spec` | Micro-interaction specifications | Defining button presses, toggles, feedback |

### Accessibility

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `accessibility-audit` | WCAG compliance audit | Checking components for a11y issues |
| `accessibility-test-plan` | Accessibility testing strategy | Planning comprehensive a11y testing |

### Design Systems

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `color-system` | Color palette and usage guidelines | Defining or auditing colors |
| `spacing-system` | Spacing scale and application | Consistent margins/padding |
| `typography-scale` | Type scale and hierarchy | Font sizes, line heights, weights |
| `design-token` | Design token creation | Creating CSS variables/tokens |
| `design-token-audit` | Token usage audit | Finding hardcoded values |
| `icon-system` | Icon guidelines | Icon sizing, styling, usage |
| `theming-system` | Theme architecture | Dark mode, brand themes |
| `dark-mode-design` | Dark mode patterns | Implementing dark themes |
| `pattern-library` | Pattern documentation | Documenting reusable patterns |
| `naming-convention` | Naming standards | Consistent naming across system |

### Component Design

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `component-spec` | Component specification | Documenting component API/behavior |
| `handoff-spec` | Developer handoff docs | Preparing specs for implementation |
| `wireframe-spec` | Wireframe documentation | Low-fidelity design specs |
| `state-machine` | State management patterns | Complex component states |
| `loading-states` | Loading/skeleton patterns | Progress indicators, skeletons |
| `error-handling-ux` | Error state design | Form errors, API failures |
| `feedback-patterns` | User feedback mechanisms | Toasts, alerts, confirmations |
| `gesture-patterns` | Touch/gesture interactions | Swipe, pinch, drag patterns |

### UX Research

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `user-persona` | Persona creation | Defining target users |
| `journey-map` | User journey mapping | Mapping user experiences |
| `experience-map` | Experience visualization | Broader experience context |
| `empathy-map` | Empathy mapping | Understanding user emotions |
| `jobs-to-be-done` | JTBD framework | User motivation analysis |
| `interview-script` | Interview guide creation | User research interviews |
| `summarize-interview` | Interview synthesis | Analyzing research data |
| `usability-test-plan` | Usability testing | Planning user tests |
| `card-sort-analysis` | Card sort results | Information architecture |
| `affinity-diagram` | Affinity diagramming | Grouping research insights |

### Design Review & QA

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `design-critique` | Design feedback | Structured design review |
| `design-qa-checklist` | QA checklist | Pre-launch quality checks |
| `design-review-process` | Review workflow | Establishing review cadence |
| `heuristic-evaluation` | Nielsen heuristics | Expert UX evaluation |
| `visual-hierarchy` | Visual hierarchy audit | Layout and emphasis review |

### Testing & Metrics

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `a-b-test-design` | A/B test planning | Experiment design |
| `test-scenario` | Test case creation | Defining test scenarios |
| `metrics-definition` | KPI definition | Measuring success |
| `click-test-plan` | Click testing | First-click analysis |
| `diary-study-plan` | Longitudinal research | Extended user studies |

### Documentation & Process

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `design-brief` | Project brief creation | Kicking off projects |
| `design-rationale` | Decision documentation | Explaining design choices |
| `case-study` | Case study writing | Portfolio documentation |
| `presentation-deck` | Presentation structure | Stakeholder presentations |
| `documentation-template` | Doc templates | Consistent documentation |
| `design-system-adoption` | Adoption strategy | Rolling out design system |
| `version-control-strategy` | Versioning approach | Managing system versions |

### Strategy & Planning

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `design-principles` | Principle definition | Establishing design values |
| `design-sprint-plan` | Sprint planning | Design sprint facilitation |
| `north-star-vision` | Vision definition | Long-term product vision |
| `opportunity-framework` | Opportunity sizing | Prioritizing initiatives |
| `competitive-analysis` | Competitor research | Market analysis |
| `stakeholder-alignment` | Stakeholder management | Getting buy-in |
| `team-workflow` | Team process design | Workflow optimization |
| `prototype-strategy` | Prototyping approach | Choosing prototype fidelity |

### Layout & Visual

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `layout-grid` | Grid system design | Defining layout grids |
| `responsive-design` | Responsive patterns | Multi-device layouts |
| `data-visualization` | Data viz guidelines | Charts, graphs, dashboards |
| `illustration-style` | Illustration guidelines | Custom illustration style |
| `ux-writing` | Microcopy guidelines | UI text and messaging |

### UI/UX Pro Max Suite

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `ui-ux-pro-max` | Comprehensive UI/UX skill | Full design workflow |
| `ckm-design` | General design principles | Design fundamentals |
| `ckm-design-system` | Design system creation | Building systems |
| `ckm-ui-styling` | UI styling techniques | Visual polish |
| `ckm-brand` | Brand identity | Brand guidelines |
| `ckm-banner-design` | Banner design | Marketing banners |
| `ckm-slides` | Presentation design | Slide decks |

---

## Common Workflows

### 1. Component Development

```
# When creating a new component:
"Use component-spec to define the DatePicker API"
"Check loading-states patterns for async components"
"Apply feedback-patterns to form submission"

# When improving existing components:
"Run accessibility-audit on the Modal"
"Use animate to add enter/exit transitions"
"Check design-token usage in Button"
```

### 2. Design System Audit

```
# Full system audit:
"Run design-token-audit across all components"
"Check spacing-system consistency"
"Audit typography-scale usage"
"Review color-system for accessibility"

# Motion audit:
"Use design-motion-principles to audit all animations"
"Check animation timing and easing consistency"
```

### 3. Accessibility Review

```
"Run accessibility-audit on the Form components"
"Create accessibility-test-plan for the design system"
"Check color contrast in Badge and Status components"
```

### 4. Documentation

```
"Generate component-spec for the Wizard"
"Create handoff-spec for the new DatePicker"
"Write design-rationale for the SideNav redesign"
"Document the theming-system architecture"
```

### 5. Adding Animation

```
# Simple animations:
"Use animate to add hover effects to Card"
"Add micro-interaction-spec for Button press states"

# Complex animations:
"Implement loading-states for data tables"
"Add page transitions using animate skill"
"Use animation-principles for the onboarding flow"
```

---

## Tips for Best Results

### Be Specific
Instead of: "Make it better"
Say: "Use accessibility-audit to check the Modal for keyboard navigation and screen reader support"

### Provide Context
Instead of: "Add animations"
Say: "Use animate to add subtle enter/exit animations to the Toast component, following the existing spring timing in Modal"

### Chain Skills
```
"First run design-token-audit on Button, then use the findings to update hardcoded values to tokens"
```

### Reference Existing Patterns
```
"Use animate to add transitions to Slideout, matching the animation style already used in Modal"
```

---

## Skill Locations

Skills are installed in two locations:

```
.claude/skills/
├── cookbooks/          # Complex UI patterns (internal)
├── creation/           # Design system development (internal)
├── recipes/            # Component usage guides (internal)
├── animate             # Animation patterns (external)
├── accessibility-audit # A11y auditing (external)
├── design-motion-principles # Motion audit (external)
└── ... (70+ external skills)
```

**Internal skills** (`cookbooks/`, `creation/`, `recipes/`) are project-specific guides for this design system.

**External skills** (symlinked) are general-purpose skills from the community.

---

## Installing New Skills

To add new skills from the community:

```bash
npx skills add <github-user>/<repo-name> --yes
```

Example:
```bash
npx skills add delphi-ai/animate-skill --yes
```

---

## Quick Reference Card

| Task | Skill to Use |
|------|--------------|
| Add animations | `animate`, `animation-principles` |
| Check accessibility | `accessibility-audit` |
| Audit motion design | `design-motion-principles` |
| Document component | `component-spec`, `handoff-spec` |
| Review design | `design-critique`, `heuristic-evaluation` |
| Check tokens | `design-token-audit` |
| Error states | `error-handling-ux` |
| Loading states | `loading-states` |
| Form feedback | `feedback-patterns` |
| Color system | `color-system`, `dark-mode-design` |
| Typography | `typography-scale` |
| Spacing | `spacing-system` |
| User research | `user-persona`, `journey-map` |
| Testing | `usability-test-plan`, `a-b-test-design` |

---

## Need Help?

- View all installed skills: `ls .claude/skills/`
- Read a skill's documentation: Ask Claude to "show me the animate skill documentation"
- Find skills for a task: Ask Claude "which skill should I use for [task]?"
