# Breakpoints Component (نقاط التوقف وتجاوب الشاشات)

## Purpose
Provides the responsive breakpoint foundations and an interactive live viewport dimension detector for testing responsive behaviors across 6 standardized screen sizes.

## Supported Breakpoints
- **xs**: `< 576px` (Mobile phones)
- **sm**: `≥ 576px` (Phablets)
- **md**: `≥ 768px` (Tablets)
- **lg**: `≥ 992px` (Laptops)
- **xl**: `≥ 1200px` (Desktops)
- **xxl**: `≥ 1400px` (Ultra-wide screens)

## Structure
- Live Viewport Display: `#liveViewportWidth`
- Active Badge: `#activeBreakpointBadge`
- Breakpoint Matrix Table: `#breakpoints tbody tr`

## Dependencies
- `css/taqniya.css` (Design tokens and CSS custom properties)
- `js/taqniya.js`
