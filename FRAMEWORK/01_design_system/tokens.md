# Universal Design Token Architecture & Guidelines

# Purpose
This document defines the recommended taxonomy, naming conventions, and structural architecture for design tokens. It provides a standard baseline that bridges design intent and code implementation, while allowing each project to define its specific theme values in `PROJECT/MD/01_project_design/theme.md`.

# Scope
Applies to design systems, CSS variables, style dictionaries, and UI theme configurations across all client platforms.

---

## 1. Token Taxonomy & 3-Tier Hierarchy

The framework recommends structuring tokens into three distinct tiers:

```
[ Tier 1: Global / Primitive Tokens ] ──> Raw values (e.g., brand-blue, gray-900)
                   │
                   ▼
[ Tier 2: Semantic / Alias Tokens ]   ──> Contextual role (e.g., color-primary, color-bg-surface)
                   │
                   ▼
[ Tier 3: Component Tokens (Optional)] ──> Scoped element (e.g., button-bg-primary, input-border)
```

---

## 2. Recommended Semantic Token Taxonomy & Default Baselines

> **IMPORTANT:** All numeric values, breakpoints, and scale steps below are **RECOMMENDED DEFAULTS** for guidance. They are NOT mandatory universal constants. Each individual project defines its authoritative values in `PROJECT/MD/01_project_design/theme.md`.

### A. Semantic Color Tokens
- **Surfaces:** `color-bg-canvas`, `color-bg-surface`, `color-bg-surface-raised`, `color-bg-surface-sunken`, `color-bg-overlay`.
- **Text & Content:** `color-text-primary`, `color-text-secondary`, `color-text-muted`, `color-text-inverse`, `color-text-brand`.
- **Borders & Dividers:** `color-border-subtle`, `color-border-default`, `color-border-strong`, `color-border-focus`.
- **Status & Feedback:** `color-status-success`, `color-status-warning`, `color-status-danger`, `color-status-info`.

### B. Typography Tokens *(Recommended Defaults)*
- **Font Families:** `font-family-heading`, `font-family-body`, `font-family-mono`.
- **Scale Steps:** `font-size-xs` (12px), `font-size-sm` (14px), `font-size-base` (16px), `font-size-lg` (18px), `font-size-xl` (20px), `font-size-2xl` (24px), `font-size-3xl` (30px), `font-size-4xl` (36px).
- **Weights:** `font-weight-regular` (400), `font-weight-medium` (500), `font-weight-semibold` (600), `font-weight-bold` (700).

### C. Spacing Scale *(Recommended 4pt/8pt Grid Baseline)*
- `space-1` (4px), `space-2` (8px), `space-3` (12px), `space-4` (16px), `space-6` (24px), `space-8` (32px), `space-12` (48px), `space-16` (64px).

### D. Border Radius Scale *(Recommended Defaults)*
- `radius-none` (0px), `radius-sm` (4px), `radius-md` (8px), `radius-lg` (12px), `radius-xl` (16px), `radius-full` (9999px / capsule).

### E. Elevation & Shadows *(Recommended Defaults)*
- `elevation-none`, `elevation-sm` (subtle cards), `elevation-md` (cards/dropdowns), `elevation-lg` (modals/popovers), `elevation-xl` (floating overlays).

### F. Responsive Breakpoints *(Recommended Web Defaults)*
- `breakpoint-sm` (640px), `breakpoint-md` (768px), `breakpoint-lg` (1024px), `breakpoint-xl` (1280px), `breakpoint-2xl` (1536px).

### G. Layering / Z-Index Scale *(Recommended Defaults)*
- `z-base` (0), `z-dropdown` (1000), `z-sticky` (1100), `z-fixed` (1200), `z-backdrop` (1300), `z-modal` (1400), `z-popover` (1500), `z-tooltip` (1600), `z-toast` (1700).

---

## 3. Project-Specific Customization Protocol
- **HOW:** The global framework defines the token taxonomy and naming structure.
- **WHICH:** The project defines its exact brand colors, font families, and radius values in `PROJECT/MD/01_project_design/theme.md`.
- **RFC 2119 Rule:** Projects SHOULD establish and adhere to design tokens, avoiding arbitrary unjustified values in feature stylesheets.

# Verification
1. Confirm that project stylesheets and utility configurations map to semantic token names.
2. Verify that spacing and sizing values follow a consistent grid defined in `PROJECT/MD/01_project_design/theme.md`.
