# Universal Design System Rules & UI Governance

# Purpose
This document establishes universal design principles, accessibility benchmarks, component reuse policies, and interactive state standards. It provides a consistent UX foundation while allowing each individual project to define its unique visual brand, tokens, and theme in `PROJECT/MD/01_project_design/theme.md`.

# Scope
Applies to all projects containing a user interface (Web, Mobile, Desktop, CLI). For headless services, libraries, SDKs, serverless functions, background workers, or backend-only APIs without a user interface, this design system module is **NOT APPLICABLE**. Web-specific references (HTML, ARIA, CSS) serve as illustrative examples and do not constrain non-web interfaces.

---

## 1. Global Principles vs Project Theme Boundaries

```
    Taqniya Design System (01_design_system/*)
          │  (Universal principles: accessibility, states, token taxonomy, component contracts)
          ▼
    Project Theme & Brand (PROJECT/MD/01_project_design/theme.md)
          │  (Project brand colors, typography values, spacing scale, visual theme)
          ▼
    UI Implementation (Client Components & Stylesheets)
```

---

## 2. The Reuse-First Policy
- **MUST:** AI agents and developers MUST inspect existing project components and standard design system primitives before creating a new UI element.
- **MUST NOT:** Create ad-hoc, duplicate components (such as a second custom Button or separate unstyled text input) when an existing component can be reused or extended with a clean prop/variant.

---

## 3. Token-Driven Styling & Magic Values
- **SHOULD:** Prefer semantic design tokens for colors, spacing, typography, and borders over arbitrary magic numbers.
- **SHOULD NOT:** Use arbitrary hardcoded values without technical or visual justification.
- **Exceptions:** Project-specific one-off micro-adjustments or brand-specific artistic elements are permitted when intentional and documented in the project theme.

---

## 4. Mandatory Interactive States
Every interactive element (buttons, inputs, links, list items, cards) MUST support and render the following interactive states where applicable to the target platform:

1. **Default / Idle:** Baseline resting appearance.
2. **Hover:** Visual feedback on pointer hover (where pointer devices exist).
3. **Focus / Focus-Visible:** Distinct, high-contrast focus indicator for keyboard/accessibility navigation.
4. **Active / Pressed:** Visual feedback on click, tap, or key activation.
5. **Disabled:** Dimmed opacity, suppressed interaction events.
6. **Loading / Busy:** Spinner or skeleton indicator with accessibility busy indicators.
7. **Empty:** Dedicated empty state message with a primary Call-To-Action (CTA).
8. **Error / Invalid:** Clear error border, accessible error message text, and invalid state indicators.

---

## 5. Accessibility (a11y) Standards (WCAG 2.1 AA)
- **MUST:** Ensure text and interactive controls meet a minimum contrast ratio of 4.5:1 against their background (3:1 for large text).
- **MUST:** All interactive components must be operable via accessible navigation (e.g., keyboard `Tab`, `Enter`, `Space`, `Escape`, `Arrow` keys on desktop/web; assistive touch on mobile).
- **MUST:** Form inputs must have accessible label associations. Icon-only controls must provide accessible descriptions or screen-reader text.

---

## 6. Responsive Design & Layout Hierarchy
- **SHOULD:** Build responsive layouts that adapt gracefully across target device viewports (e.g., Mobile, Tablet, Desktop).
- **SHOULD:** Maintain clear typographic hierarchy between primary headings, section headers, body text, and captions.

# Verification
1. Verify that UI elements utilize defined design tokens and standard components.
2. Confirm accessible navigation operates smoothly across all interactive elements.
3. Check contrast ratios against WCAG 2.1 AA standards.
4. Verify all interactive states are styled and functional where applicable.
