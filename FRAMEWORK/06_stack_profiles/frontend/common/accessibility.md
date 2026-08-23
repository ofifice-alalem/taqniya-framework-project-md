# Frontend Accessibility (A11y) & Focus Management

# Purpose
This document defines accessibility requirements, keyboard navigation standards, and screen reader feedback for modern web interfaces.

---

## 1. Directionality & RTL Standards

- **MUST:** All frontend views must render with native RTL flow (`dir="rtl"`) as the primary directionality.
- **MUST:** Use CSS logical properties (`margin-inline`, `padding-inline`, `inset-inline`, `border-inline`) rather than physical left/right properties.

---

## 2. Focus Management & Modals

- **MUST (Focus Trap):** When a modal dialog or offcanvas drawer is opened, trap keyboard focus within the container.
- **MUST (Escape Key):** Pressing `Escape` MUST close open modals, dropdowns, and drawers.
- **MUST (Focus Restoration):** Upon closing a dialog, restore focus to the triggering element.

---

## 3. Contrast & Touch Targets

- **MUST:** Text must maintain a minimum contrast ratio of **4.5:1** against backgrounds (WCAG 2.1 AA).
- **MUST:** Touch targets on mobile must have a minimum size of `44x44px`.
