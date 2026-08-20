# Workflow: Design System & UI Compliance

# Purpose
This workflow establishes the verification procedure for ensuring all frontend views, styling, and UI components comply with the Global Design System, project-specific theme tokens, and accessibility standards.

# Scope
Executed during all frontend development, page creation, component authoring, and UI bug fixing.

---

## 1. UI Compliance Audit Routine

```
Step 1: Inspect Project Theme & Token Definitions (PROJECT/MD/design_rules.md)
   │
   ▼
Step 2: Component Reuse Audit (Scan for existing primitives before writing new HTML)
   │
   ▼
Step 3: Token Verification (Ensure styles leverage semantic tokens and avoid unjustified magic values)
   │
   ▼
Step 4: Interactive States Audit (Verify all 8 states are styled and functional)
   │
   ▼
Step 5: Accessibility & Keyboard Navigation Audit (WCAG 2.1 AA)
   │
   ▼
Step 6: Responsive Viewport Testing (Mobile, Tablet, Desktop)
```

---

## 2. Design System Compliance Checklist

### A. Token Usage & Styling
- [ ] Are all colors referenced via semantic design tokens (e.g., `var(--color-bg-surface)`)?
- [ ] Are all spacing values (margins, padding, gaps) adhering strictly to the 4px/8px scale?
- [ ] Are typography classes using defined font scale and font family tokens?
- [ ] Are border radiuses and box shadows using standard tokens?

### B. Component Reuse
- [ ] Were existing primitive components (`Button`, `Input`, `Modal`, `Card`, `Table`, `Badge`) utilized?
- [ ] Is the page free of duplicate ad-hoc buttons or inline custom inputs?

### C. Interactive States (All 8 States)
- [ ] **Default / Idle:** Clean base presentation.
- [ ] **Hover:** Subtle visual elevation or color shift.
- [ ] **Focus / Focus-Visible:** High-contrast focus ring for keyboard navigation.
- [ ] **Active / Pressed:** Visual depression feedback.
- [ ] **Disabled:** Opacity reduced, `cursor: not-allowed`, click suppressed.
- [ ] **Loading:** Spinner/skeleton active with `aria-busy="true"`.
- [ ] **Empty:** Informative illustration/message with primary CTA.
- [ ] **Error:** Red border, clear error message, `aria-invalid="true"`.

### D. Accessibility & Semantics
- [ ] Semantic HTML5 elements used (`<button>`, `<nav>`, `<main>`, `<dialog>`).
- [ ] Form inputs have associated `<label>` elements.
- [ ] Icon-only interactive elements contain `aria-label` or screen-reader text.
- [ ] Text contrast meets minimum 4.5:1 ratio against backgrounds.

# Verification
1. Walk through the UI Compliance Checklist for every modified view/component.
2. Confirm that UI elements leverage semantic design tokens and avoid arbitrary magic numbers.
3. Test keyboard navigation using `Tab`, `Enter`, and `Escape`.
