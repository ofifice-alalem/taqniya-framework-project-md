# Vue 3 Performance & Testing

# Purpose
Defines performance optimizations and testing practices for Vue 3.

---

## 1. Async Components & Virtualization

- **Async Components:** Use `defineAsyncComponent` for heavy dialogs and offscreen widgets.
- **Large Objects:** Use `shallowRef` or `shallowReactive` for large immutable data arrays to avoid deep reactivity tracking overhead.

---

## 2. Testing with Vitest & Vue Test Utils

- **Test User Interactions:** Mount components using `@vue/test-utils` and test events, emits, and visual state transitions.
