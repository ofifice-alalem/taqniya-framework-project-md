# Frontend Engineering & Performance Capability Matrix

# Purpose
This document defines the **26 core frontend performance and engineering capabilities** supported across modern web frameworks in Taqniya. It establishes their priority, purpose, and implementation mechanisms across **React, Vue, and Blade**.

> **Policy Governance:** For policy states (`required`, `enabled`, `disabled`, `optional`), Threshold vs Structural classifications, and framework baselines, see [`capability_policy.md`](capability_policy.md). Project choices are declared in `PROJECT/MD/frontend_capabilities.yaml`.

---

## 1. Core Performance Architecture Pillars

```text
                    FRONTEND PERFORMANCE
                           │
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
   Navigation           Loading             Rendering
        │                  │                  │
     Routing          Code Splitting      Components
     Prefetching      Lazy Loading        Reactive State
                      Caching             Virtualization
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ↓
                      Network
                           │
                ┌──────────┼──────────┐
                ↓          ↓          ↓
             Caching    Deduping   Cancellation
                │
                ↓
           Minimal Requests
```

---

## 2. Complete 26-Capability Matrix

### Implementation Classification Legend:
* **Built-in:** Directly provided by framework/runtime core.
* **Ecosystem:** Idiomatic, standard ecosystem tooling (e.g., React Router, Vue Router, Pinia).
* **Library-assisted:** Standard community library integration (e.g., TanStack Query, Virtualizer).
* **Build/Platform:** Handled by bundlers (Vite/Rollup) or browser web platform APIs.
* **Islands / Livewire / Alpine:** Progressive enhancement for server-rendered stacks.

---

### A. Core Capabilities (1 – 16)

| # | Capability Key | Core Objective / Benefit | React ⚛️ | Vue 🟢 | Blade 🟠 | Detailed Standard |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | `client_side_routing` | Instant page transitions without full browser reload | Ecosystem *(React Router)* | Ecosystem *(Vue Router)* | Islands *(Livewire wire:navigate)* | [`navigation.md`](navigation.md) |
| **2** | `code_splitting` | Prevent loading entire application JS upfront | Build/Platform *(dynamic import)* | Build/Platform *(dynamic import)* | Build/Platform *(Vite Chunks)* | [`code_splitting.md`](code_splitting.md) |
| **3** | `lazy_loading` | Load pages and non-critical routes on-demand | Built-in *(React.lazy)* | Built-in *(defineAsyncComponent)* | Islands *(Livewire / Alpine x-show)* | [`code_splitting.md`](code_splitting.md) |
| **4** | `component_architecture` | Modular, isolated presentation and logic containers | Built-in *(Components)* | Built-in *(SFCs)* | Built-in *(Blade Components)* | [`rendering.md`](rendering.md) |
| **5** | `reactive_state` | Update only affected DOM nodes without cascading re-renders | Built-in *(useState / useActionState)* | Built-in *(Reactivity: ref/reactive)* | Islands *(Alpine.js / Livewire)* | [`state_management.md`](state_management.md) |
| **6** | `async_data_fetching` | Load data on-demand with standardized 4-state lifecycles | Library *(TanStack Query / SWR)* | Library *(TanStack Query Vue / useFetch)* | Islands *(Livewire / AJAX)* | [`data_fetching.md`](data_fetching.md) |
| **7** | `client_caching_swr` | Instant UI display with background revalidation | Library *(TanStack Query / SWR)* | Library *(TanStack Query Vue / SWR)* | Library *(HTTP / Alpine Cache)* | [`caching.md`](caching.md) |
| **8** | `prefetching_on_intent` | Pre-load data/chunks on hover before user clicks | Ecosystem *(Router / Query Prefetch)* | Ecosystem *(Router / Query Prefetch)* | Islands *(wire:navigate.hover)* | [`navigation.md`](navigation.md) |
| **9** | `optimistic_ui` | Immediate UI response before server confirmation | Built-in *(useOptimistic / Query)* | Library *(TanStack Query / Pinia)* | Islands *(Alpine / wire:dirty)* | [`rendering.md`](rendering.md) |
| **10** | `request_deduplication` | Prevent identical simultaneous API calls | Library *(TanStack Query / Axios)* | Library *(TanStack Query Vue / Axios)* | Platform *(Server Debounce / Cache)* | [`data_fetching.md`](data_fetching.md) |
| **11** | `pagination_incremental` | Avoid loading large datasets in a single payload | Ecosystem *(Cursor / Offset Hooks)* | Ecosystem *(Cursor / Offset)* | Built-in *(Eloquent Pagination)* | [`data_fetching.md`](data_fetching.md) |
| **12** | `virtualized_lists` | Render only visible rows for 1,000+ records | Library *(TanStack Virtual)* | Library *(vue-virtual-scroller)* | Library *(Virtualizer JS)* | [`rendering.md`](rendering.md) |
| **13** | `asset_optimization` | Minimize CSS/JS weights, responsive srcset, and layouts | Build/Platform *(Vite / Rollup)* | Build/Platform *(Vite / Rollup)* | Build/Platform *(Vite Plugin)* | [`asset_loading.md`](asset_loading.md) |
| **14** | `tree_shaking` | Eliminate dead code automatically via named ES imports | Build/Platform *(ES Modules)* | Build/Platform *(ES Modules)* | Build/Platform *(ES Modules)* | [`asset_loading.md`](asset_loading.md) |
| **15** | `production_build_opts` | Minification, asset hashing, and gzip/brotli compression | Build/Platform *(Terser / esbuild)* | Build/Platform *(esbuild / Rollup)* | Build/Platform *(Vite Production)* | [`asset_loading.md`](asset_loading.md) |
| **16** | `error_loading_boundaries` | Prevent isolated component crashes from breaking the application | Built-in *(Error Boundaries / Suspense)*| Built-in *(onErrorCaptured / Suspense)* | Islands *(Livewire Fallback)* | [`data_fetching.md`](data_fetching.md) |

---

### B. Extended Capabilities (17 – 26)

| # | Capability Key | Core Objective / Benefit | React ⚛️ | Vue 🟢 | Blade 🟠 | Detailed Standard |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| **17** | `debouncing_throttling` | Throttle search inputs (300ms), scroll and resize events | Library *(use-debounce / lodash)* | Library *(VueUse useDebounce)* | Islands *(wire:model.live.debounce)* | [`data_fetching.md`](data_fetching.md) |
| **18** | `request_cancellation` | Abort stale requests on navigation or typing via AbortController | Platform *(AbortController)* | Platform *(AbortController)* | Islands *(Livewire Request Cancel)* | [`data_fetching.md`](data_fetching.md) |
| **19** | `route_loading_states` | Instant skeleton / progress indicators during route transitions | Built-in *(Suspense / Skeleton)* | Built-in *(Suspense / Skeleton)* | Islands *(wire:loading indicators)* | [`navigation.md`](navigation.md) |
| **20** | `component_lazy_loading` | Defer heavy dialogs, rich-text, and charts until opened | Built-in *(dynamic import / lazy)* | Built-in *(defineAsyncComponent)* | Islands *(Alpine x-show / defer)* | [`code_splitting.md`](code_splitting.md) |
| **21** | `image_lazy_loading` | Native HTML5 deferred loading for below-the-fold images | Platform *(HTML5 loading="lazy")* | Platform *(HTML5 loading="lazy")* | Platform *(HTML5 loading="lazy")* | [`asset_loading.md`](asset_loading.md) |
| **22** | `form_state_optimization` | Double-submit guards, validation feedback, and 422 error mapping | Library *(React Hook Form / Zod)* | Library *(VeeValidate / FormKit)* | Islands *(Livewire validation)* | [`forms.md`](forms.md) |
| **23** | `accessibility_standards` | Native RTL support, focus traps, and WCAG AA contrast compliance | Platform *(ARIA / Tailwind RTL)* | Platform *(ARIA / Tailwind RTL)* | Platform *(ARIA / Tailwind RTL)* | [`accessibility.md`](accessibility.md) |
| **24** | `persistent_client_state` | Preserve user filters and column settings in LocalStorage/IndexedDB | Library *(Zustand Persist / idb)* | Library *(VueUse useStorage)* | Islands *(Alpine persist)* | [`state_management.md`](state_management.md) |
| **25** | `background_web_workers` | Offload heavy CPU computations from the UI main thread | Platform *(Web Workers)* | Platform *(Web Workers)* | Platform *(Web Workers / Server)* | [`performance.md`](performance.md) |
| **26** | `bundle_size_analysis` | Monitor bundle weight distribution and heavy packages | Build/Platform *(rollup-plugin-visualizer)*| Build/Platform *(rollup-plugin-visualizer)*| Build/Platform *(Vite Visualizer)*| [`performance.md`](performance.md) |
