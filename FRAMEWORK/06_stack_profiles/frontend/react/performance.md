# React Performance & Virtualization

# Purpose
Defines performance optimizations, lazy loading, and virtualization for React.

---

## 1. Route & Component Lazy Loading

- **MUST:** Wrap routes in `React.lazy()` with `Suspense` fallbacks:
  ```tsx
  const ReportsPage = React.lazy(() => import('./features/reports/ReportsPage'));
  ```

---

## 2. Table Virtualization (TanStack Virtual)

- **MUST:** Use `useVirtualizer` when rendering large data tables (> 100 rows):
  ```tsx
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });
  ```
