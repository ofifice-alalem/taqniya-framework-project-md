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

---

## 6. Project Integration & On-Demand AI Implementation Protocol (Strict SSoT)

When building pages, features, or interfaces in target projects (e.g., Laravel, React, Vue apps in this workspace), the AI Agent MUST strictly adhere to the following 4 rules:

### 1. Mandatory Upstream Reference
- `FRAMEWORK/01_design_system/` is the **Single Source of Truth (SSoT)**.
- Never write ad-hoc, inline, or unapproved CSS styles in project templates.
- Always inspect the corresponding component in `FRAMEWORK/01_design_system/components/XX-name/` before creating a UI element.

### 2. On-Demand / Just-In-Time (JIT) Generation
- **DO NOT** generate or copy all 23 components into a target project in bulk.
- Generate **ONLY** the specific component(s) required by the immediate feature or view being implemented (e.g., if creating a login page, generate only the form, input, button, and alert components).

### 3. Native Technology Adaptation
- Convert the pure HTML/CSS/JS reference into the native component syntax of the target project:
  - **Laravel Projects**: Generate modular Blade components (e.g., `resources/views/components/ui/button.blade.php`, `<x-ui.button>`, `<x-ui.card>`).
  - **React / Next.js Projects**: Generate typed JSX/TSX components (e.g., `components/ui/Button.tsx`).
  - **Vue Projects**: Generate Single File Components (e.g., `components/ui/Button.vue`).
- Preserve exact CSS classes (`.bx-btn`, `.bx-card`, `.bx-input`, `.bx-title`) and CSS custom properties (`var(--bx-primary)`, etc.).

### 4. Zero Divergence Rule
- Component props, slots, and variations in the target project must strictly reflect the structure and behavioral states defined in the Design System.
- Global styles and tokens must be loaded via `taqniya.css` or the project's compiled asset pipeline.

### 5. Missing Component Intake & Resolution Protocol
When a required UI element (e.g., Timeline, Kanban Board, Treeview, File Uploader, Date Range Picker) does **NOT** exist in `FRAMEWORK/01_design_system/components/`:
1. **Never Improvise Secretly**: The AI Agent MUST pause and ask the user:
   > *"المكون المطلوبة `[Component Name]` غير موجود حالياً في منظومة تقنية للتصميم. هل لديك صورة أو تصميم مرجعي تود اعتماده، أم أقوم بإنشاء المكون الجديد مع وراثة كامل خصائص وتوكنز المنظومة (Spatial UI, RTL, Alexandria/Tajawal Fonts, Tokens)؟"*
2. **Inherit Design Contract Strictly**: If generated, the component must strictly inherit:
   - Surface & elevation tokens (`--bx-surface-solid`, `--bx-border`, `--bx-primary`, `--bx-title`, `--bx-muted`).
   - Logical RTL properties (`margin-inline`, `padding-inline`, `border-inline`).
   - Typography hierarchy (Alexandria for titles, Tajawal for body, JetBrains Mono for dates/numbers).
   - Complete interaction states (Default, Hover, Active, Focus, Disabled).
3. **Upstream Framework Registration**: Once approved by the user, the newly created component should be documented and registered into `FRAMEWORK/01_design_system/components/` so it becomes a permanent reusable asset for all future projects.


