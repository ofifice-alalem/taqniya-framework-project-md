# Universal Frontend Performance Standards

# Purpose
This document defines the universal performance philosophy, optimization invariants, and resource budget constraints for modern web frontends under the Taqniya Framework.

---

## 1. Core Performance Philosophy

```
"Fast UI does not mean loading everything quickly.
 It means doing as little work as necessary."
```

### The 6 Performance Invariants:
1. **Don't load what isn't needed:** Split bundles; load routes and heavy components lazily.
2. **Don't render what isn't visible:** Virtualize large data tables; defer offscreen elements.
3. **Don't request what was already fetched:** Use client-side caching (SWR) and request deduplication.
4. **Don't calculate what hasn't changed:** Memoize expensive calculations and use fine-grained reactivity.
5. **Don't maintain unnecessary global state:** Keep state localized to where it is consumed.
6. **Don't retain unnecessary DOM nodes:** Clean up listeners, timers, and unmounted elements to prevent memory leaks.

---

## 2. Performance Budgets & Metrics

| Metric / Dimension | Target Threshold | Rationale |
| :--- | :--- | :--- |
| **Initial JS Bundle (Gzipped)** | `< 150 KB` per entrypoint | Ensures fast execution on mobile devices and 4G connections |
| **Interaction to Next Paint (INP)** | `< 200 ms` | Keeps UI typing, clicks, and toggles feeling instantaneous |
| **Animation / Micro-transitions** | `< 300 ms` | UI remains crisp and snappy without sluggish decorative animations |
| **Virtual Table Threshold** | `> 100 rows` | Automatically virtualize table rendering when records exceed 100 |
| **Debounce on Search / Filters** | `300 ms` | Eliminates rapid redundant API queries while typing |

---

## 3. Background Processing (Web Workers)

- **MUST:** Offload computationally heavy tasks (e.g., parsing/generating large CSV/Excel exports, client-side PDF rendering, intensive cryptographic operations, or complex data grouping) to Web Workers.
- **MUST NOT:** Execute CPU-blocking loops (> 50ms) on the main browser thread.
