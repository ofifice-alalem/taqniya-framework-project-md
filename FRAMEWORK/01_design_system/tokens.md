# Taqniya Design System — Tokens (Design Values Contract)

This document defines the authoritative, technology-neutral visual tokens of the Taqniya Design System.
It describes **VALUES ONLY** (no component implementation code).

---

## 1. Token Architecture Hierarchy

```
[ Tier 1: Global / Primitive Tokens ] ──> Raw HEX/RGBA values
                   │
                   ▼
[ Tier 2: Semantic / Role Tokens ]    ──> Contextual role (e.g., --bx-primary, --bx-surface-solid)
                   │
                   ▼
[ Tier 3: Component Tokens ]          ──> Scoped element (e.g., --bx-shadow-btn, --radius-m)
```

---

## 2. Color Palette Tokens

### A. Theme Surface & Base Colors
| Token Name | Light Mode (Default) | Dark Mode (Soft) | Role / Usage |
| :--- | :--- | :--- | :--- |
| `--bx-canvas` | `#EBEBFA` | `#28293D` | Application background canvas |
| `--bx-surface-solid` | `#EBEBFA` | `#31324B` | Card, modal & drawer solid surface |
| `--bx-primary` | `#5B3CE6` | `#8566FF` | Brand primary action / active state |
| `--bx-primary-hover` | `#482FD0` | `#987DFF` | Hover state for primary actions |
| `--bx-primary-contrast`| `#FFFFFF` | `#FFFFFF` | Text color on primary backgrounds |
| `--bx-title` | `#4834A6` | `#FFFFFF` | Primary headings & high-contrast titles |
| `--bx-text` | `#2D2B3D` | `#DCD9EF` | Main body text |
| `--bx-muted` | `#6B658E` | `#A5A0C8` | Secondary / placeholder / muted text |
| `--bx-border` | `#9D96D2` | `rgba(255, 255, 255, 0.18)` | Default container borders |
| `--bx-border-strong` | `#7870B8` | `rgba(255, 255, 255, 0.30)` | Elevated & active element borders |
| `--bx-divider` | `#B4AED8` | `rgba(255, 255, 255, 0.23)` | Horizontal table/card row dividers |
| `--bx-pill` | `rgba(91, 60, 230, 0.08)` | `rgba(133, 102, 255, 0.16)` | Soft pill & badge background |
| `--bx-table-header` | `rgba(91, 60, 230, 0.05)` | `rgba(255, 255, 255, 0.04)` | Table header & panel background |
| `--bx-row-hover` | `rgba(91, 60, 230, 0.06)` | `rgba(133, 102, 255, 0.14)` | Table row hover background |
| `--bx-row-active` | `rgba(91, 60, 230, 0.12)` | `rgba(133, 102, 255, 0.24)` | Selected table row background |

### B. Functional & State Colors
| Token Name | Light Mode | Dark Mode | Semantic Meaning |
| :--- | :--- | :--- | :--- |
| `--bx-danger` | `#EF4444` | `#F87171` | Destructive, error, critical alerts |
| `--bx-danger-bg` | `rgba(239, 68, 68, 0.08)` | `rgba(248, 113, 113, 0.15)` | Danger tint background |
| `--bx-success` | `#10B981` | `#34D399` | Success, confirmation, online status |
| `--bx-success-bg` | `rgba(16, 185, 129, 0.08)` | `rgba(52, 211, 153, 0.15)` | Success tint background |
| `--bx-warning` | `#F59E0B` | `#FBBF24` | Caution, pending, review required |
| `--bx-warning-bg` | `rgba(245, 158, 11, 0.08)` | `rgba(251, 191, 36, 0.15)` | Warning tint background |
| `--bx-info` | `#3B82F6` | `#60A5FA` | Informational notice, secondary links |
| `--bx-info-bg` | `rgba(59, 130, 246, 0.08)` | `rgba(96, 165, 250, 0.15)` | Info tint background |

---

## 3. Typography Tokens

### A. Font Families
- **Primary Body Font**: `'Tajawal', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Display & Headings**: `'Alexandria', 'Syne', -apple-system, sans-serif`
- **Monospace Code Font**: `'JetBrains Mono', monospace`

### B. Font Weights
- Regular: `400`
- Medium: `500`
- Bold: `700`
- Extra Bold / Heavy: `800`
- Black: `900`

---

## 4. Spacing, Radius & Elevation Tokens

### A. Border Radius Scale
- `--radius-s`: `0.625rem` (10px) — Small badges, mini buttons, inputs
- `--radius-m`: `0.875rem` (14px) — Buttons, input groups, dropdowns
- `--radius-l`: `1.25rem` (20px) — Cards, modals, drawers
- `--radius-xl`: `1.75rem` (28px) — Featured containers, carousels
- `--radius-full`: `9999px` — Pills, tags, circle action buttons

### B. Shadows & Spatial Depth
- `--bx-shadow-btn`: `0 4px 14px rgba(91, 60, 230, 0.2)`
- `--bx-shadow-btn-hover`: `0 8px 22px rgba(91, 60, 230, 0.3)`
- `--bx-shadow-modal`: `0 25px 50px -12px rgba(72, 52, 166, 0.25)`
- `--bx-shadow-dropdown`: `0 15px 30px -5px rgba(72, 52, 166, 0.12)`

### C. Motion & Easing
- Spring Transition: `cubic-bezier(0.23, 0.65, 0.74, 1.09)`
- Smooth Standard: `cubic-bezier(0.4, 0, 0.2, 1)`

---

## 5. Responsive Breakpoint Tokens
- `xs`: `< 576px` (Mobile phones)
- `sm`: `≥ 576px` (Large phones / phablets)
- `md`: `≥ 768px` (Tablets)
- `lg`: `≥ 992px` (Small laptops / desktops)
- `xl`: `≥ 1200px` (Desktops)
- `xxl`: `≥ 1400px` (Wide monitors / screens)
