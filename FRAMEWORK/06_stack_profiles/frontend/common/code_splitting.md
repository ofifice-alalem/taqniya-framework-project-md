# Code Splitting & Lazy Loading Standards

# Purpose
This document defines rules for route-level code splitting, component-level lazy loading, and dynamic asset chunking.

---

## 1. Route-Level Code Splitting

- **MUST:** All primary application routes (e.g., `/dashboard`, `/reports`, `/settings`, `/users`) MUST be loaded asynchronously via dynamic imports (`import()`).
- **MUST NOT:** Import all application screens into a single monolithic entrypoint bundle.

---

## 2. Component-Level Lazy Loading

- **MUST:** Heavy UI elements that are not visible upon initial page load MUST be lazy-loaded on demand:
  - Complex modal dialogs and drawers containing large forms.
  - Interactive charting and data visualization libraries (e.g., ApexCharts, Chart.js).
  - Rich text editors, WYSIWYG editors, and PDF viewers.
  - Media uploaders and cropping tools.

---

## 3. Suspense & Skeleton Fallbacks

- **MUST:** Wrap lazy-loaded components in appropriate Suspense / Async boundaries with lightweight skeleton placeholders to prevent layout shifts (Cumulative Layout Shift - CLS = 0).
