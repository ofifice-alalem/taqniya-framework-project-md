# Rendering Performance, Virtualization & Optimistic UI

# Purpose
This document defines rendering standards, DOM virtualization rules for high-density enterprise datasets, and optimistic UI update patterns.

---

## 1. Minimal DOM Footprint & Virtualization

- **MUST (Virtualization Threshold):** When displaying data tables or lists exceeding **100 records**, the implementation MUST employ DOM Virtualization (e.g., TanStack Virtual, `react-window`, `vue-virtual-scroller`).
- **Rule:** Only render the DOM nodes currently visible within the active viewport window (plus a small overscan buffer), recycling elements as the user scrolls.

---

## 2. Preventing Cascading Re-Renders

- **MUST:** Memoize expensive calculations (e.g., sorting 5,000 items, data transformations) using framework memoization tools (`useMemo`, `computed`).
- **MUST:** Pass stable callback references (`useCallback`, stable methods) to pure child components to prevent unnecessary re-rendering during parent state updates.
- **MUST NOT:** Create inline object literals or anonymous functions inside heavy loop render functions if they break memoization.

---

## 3. Optimistic UI Updates

- **SHOULD (Optimistic Mutations):** For instantaneous user feedback on actions with high success probability (e.g., toggling a switch, liking, starring, archiving an item, updating status):
  1. Immediately update the client UI to the expected final state.
  2. Dispatch the network mutation in the background.
  3. If the server request fails, rollback the UI state to its previous value and display a non-intrusive toast alert.
