# Taqniya Design System — Architectural Design Rules

This document governs the global design principles, accessibility, and visual guidelines of the Taqniya Design System.

---

## 1. Directionality & RTL First Principle
1. **Native RTL Support**: The primary reading flow is Right-to-Left (`dir="rtl"`).
2. **Logical CSS Properties**: Prefer logical properties (`margin-inline`, `padding-inline`, `inset-inline`, `border-inline`) over physical properties (`left`/`right`) where possible.
3. **Icon Alignment**: Interactive leading icons are placed at the start of text (right in RTL), and chevron/disclosure indicators are placed at the end (left in RTL).

---

## 2. Spatial UI (VisionOS Glassmorphism) Rules
1. **Layered Elevation**: Backgrounds use subtle translucent surfaces (`rgba(...)`) with background blur (`backdrop-filter: blur(16px)`).
2. **Subtle Outlines**: Surfaces must be bounded by fine, crisp borders (`--bx-border`) to maintain separation against light and dark backdrops.
3. **Contrast Discipline**: All body text must maintain a minimum contrast ratio of **4.5:1** against surface backgrounds (WCAG 2.1 AA standard).

---

## 3. Typography & Hierarchy Rules
1. **Headings Consistency**: All section and card headings use `.bx-title` or `<h1>`-`<h6>` with `font-weight: 800` and negative letter spacing (`-0.01em`).
2. **Numbers & Codes**: Numerical values, timestamps, and architectural IDs should use `font-mono` (`JetBrains Mono`) for alignment clarity.
3. **Text Hierarchy**:
   - Title: `--bx-title`
   - Body: `--bx-text`
   - Secondary / Helper: `--bx-muted`

---

## 4. Interaction & Micro-Animations
1. **State Completeness**: Every interactive element (Buttons, Nav items, Cards, Inputs) MUST specify:
   - **Default State**
   - **Hover State** (Elevation lift or color shift)
   - **Active State** (Pressed scale or border highlight)
   - **Focus-Visible State** (Accessible focus ring)
   - **Disabled State** (Opacity 0.45, `pointer-events: none`)
2. **Animation Duration**: Micro-interactions must not exceed **300ms** to ensure the interface feels instantaneous and crisp.

---

## 5. Technology Neutrality
1. The framework design system provides the **Visual Contract** in pure HTML/CSS/JS.
2. Target project implementations (Laravel Blade, React, Vue) must implement native components conforming strictly to these visual tokens.
