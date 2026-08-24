# Frontend Capability Policy & Decision Engine

# Purpose
This document defines the authoritative policy specification, classification models (Threshold vs Structural), and stack-specific recommended baselines governing frontend capabilities across all web projects under the Taqniya Framework.

---

## 1. Division of Responsibilities

```text
┌────────────────────────────────────────────────────────┐
│ 1. WHAT TECHNOLOGIES? (PROJECT/MD/stack.yaml)          │
│ Declares framework, runtime, language, bundler.        │
│ (e.g., Vue 3, React 19, Blade)                         │
├────────────────────────────────────────────────────────┤
│ 2. WHAT CAPABILITIES ARE ACTIVE?                       │
│    (PROJECT/MD/frontend_capabilities.yaml)             │
│ Declares project-level capability policy states.       │
│ (e.g., lazy_loading: required, virtualization: optional)│
├────────────────────────────────────────────────────────┤
│ 3. WHAT DO POLICY STATES MEAN? (This Document)         │
│ Defines required, enabled, disabled, and optional.     │
├────────────────────────────────────────────────────────┤
│ 4. HOW ARE THEY IMPLEMENTED? (common/* & profiles/*)   │
│ Detailed engineering rules and activation thresholds.  │
└────────────────────────────────────────────────────────┘
```

---

## 2. The 4 Strict Policy States

AI agents MUST evaluate declared capability states according to these deterministic definitions:

| Policy State | Architectural Meaning | AI Agent Execution Directive |
| :--- | :--- | :--- |
| **`required`** | **Mandatory when in scope** | The AI agent **MUST** apply this capability whenever the active component/view meets the framework's defined threshold or architectural rule. The agent does NOT ask for permission. |
| **`enabled`** | **Permitted & Available** | The capability is approved and available in the project architecture. The AI agent may implement it according to framework rules, but omitting it does NOT constitute a policy failure. |
| **`disabled`** | **Forbidden** | The AI agent **MUST NOT** import, wire up, or implement this capability in the project under any circumstances unless project policy is explicitly updated. |
| **`optional`** | **Elective / Explicit Only** | The capability is **NOT applied automatically** by the AI agent. It is implemented ONLY when explicitly requested in the active task prompt or specified in project specifications. |

---

## 3. The Two Capability Execution Models

To prevent AI guesswork, capabilities are strictly classified into two operational categories:

```text
                                CAPABILITY TYPES
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
  A. Threshold-Triggered                               B. Structural / Architectural
  (Evaluated against concrete metrics)                 (Applied as structural architecture)
```

### A. Threshold-Triggered Capabilities
These capabilities activate **ONLY** when a quantifiable threshold or condition defined in the Framework is satisfied:

| Capability Key | Activation Threshold | Reference Standard |
| :--- | :--- | :--- |
| `virtualized_lists` | Active dataset / table row count **exceeds 100 items** simultaneously mounted in DOM. | [`rendering.md`](rendering.md) |
| `background_web_workers` | CPU-intensive operation blocking the main UI thread for **> 50ms**. | [`performance.md`](performance.md) |
| `lazy_loading` | Non-critical route entrypoint or component weight **> 30KB minified**. | [`code_splitting.md`](code_splitting.md) |
| `component_lazy_loading` | Heavy modal dialogs, rich-text editors, or chart engines not visible on initial render. | [`code_splitting.md`](code_splitting.md) |
| `image_lazy_loading` | Images located below the initial viewport fold (`loading="lazy"`). | [`asset_loading.md`](asset_loading.md) |
| `debouncing_throttling` | Real-time search inputs, autocomplete, or window resize handlers (apply **300ms debounce**). | [`data_fetching.md`](data_fetching.md) |

### B. Structural / Architectural Capabilities
These capabilities govern the structural design of code. When `required`, they apply to every matching architectural construct without threshold checks:

| Capability Key | Structural Requirement | Reference Standard |
| :--- | :--- | :--- |
| `client_side_routing` | All internal navigation uses router links (`<Link>` / `<RouterLink>` / `wire:navigate`), never full page reloads (`<a href>`). | [`navigation.md`](navigation.md) |
| `component_architecture` | Strict separation between presentation components (props down) and container components (state/queries). | [`rendering.md`](rendering.md) |
| `reactive_state` | Fine-grained state scoping (local state inside components; server cache in query layer; avoid global store pollution). | [`state_management.md`](state_management.md) |
| `client_caching_swr` | Server data fetching utilizes Stale-While-Revalidate caching with key-based cache invalidation. | [`caching.md`](caching.md) |
| `request_cancellation` | All async data hooks and API queries wire an `AbortController` signal to abort on unmount/re-query. | [`data_fetching.md`](data_fetching.md) |
| `form_state_optimization` | All forms implement `isSubmitting` double-submit guards, real-time validation, and backend 422 error mapping. | [`forms.md`](forms.md) |
| `accessibility_standards` | All views support native RTL flow (`dir="rtl"`), modal focus traps, Escape key dismissal, and WCAG AA contrast. | [`accessibility.md`](accessibility.md) |
| `tree_shaking` | All external library imports use named ES module syntax exclusively (no `import * as _`). | [`asset_loading.md`](asset_loading.md) |

---

## 4. Stack-Specific Recommended Baselines

During project initialization, Taqniya applies the **Framework-Specific Recommended Baseline** matching the declared frontend technology:

```text
                  FRAMEWORK (Frontend Layer)
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
         React SPA         Vue 3 SPA        Laravel Blade
         Baseline          Baseline         Baseline
```

### 1. React Recommended Baseline (`frontend.name: "React"`)
```yaml
frontend:
  capabilities:
    client_side_routing: required      # React Router DOM
    code_splitting: required           # dynamic import() chunks
    lazy_loading: required             # React.lazy + Suspense for routes
    component_architecture: required   # Functional components + TypeScript
    reactive_state: required           # useState / useActionState / Zustand
    async_data_fetching: required      # TanStack Query v5
    client_caching_swr: required       # TanStack Query SWR
    prefetching_on_intent: required    # Query prefetching on hover
    optimistic_ui: enabled             # React 19 useOptimistic
    request_deduplication: required    # TanStack Query QueryClient
    pagination_incremental: required   # useInfiniteQuery / offset
    asset_optimization: required       # Vite asset hashing & responsive images
    tree_shaking: required             # ES module named imports
    production_build_opts: required    # Terser / esbuild minification
    error_loading_boundaries: required # React ErrorBoundary + Suspense
    debouncing_throttling: required    # use-debounce (300ms)
    request_cancellation: required     # AbortSignal in queryFn
    route_loading_states: required     # Top-level Suspense skeletons
    component_lazy_loading: required   # Dynamic import for dialogs/charts
    image_lazy_loading: required       # Native loading="lazy"
    form_state_optimization: required  # React Hook Form + Zod validation
    accessibility_standards: required  # Native RTL + focus trap
    persistent_client_state: optional  # Zustand persist
    virtualized_lists: optional        # TanStack Virtual (> 100 rows)
    background_web_workers: optional   # Comlink / Web Workers
    bundle_size_analysis: optional     # rollup-plugin-visualizer
```

### 2. Vue 3 Recommended Baseline (`frontend.name: "Vue"`)
```yaml
frontend:
  capabilities:
    client_side_routing: required      # Vue Router 4
    code_splitting: required           # dynamic import() chunks
    lazy_loading: required             # defineAsyncComponent for routes
    component_architecture: required   # Single File Components (<script setup>)
    reactive_state: required           # Vue 3 Reactivity (ref / reactive / Pinia)
    async_data_fetching: required      # TanStack Query Vue / useFetch
    client_caching_swr: required       # Query cache / SWR
    prefetching_on_intent: required    # Router link prefetching
    optimistic_ui: enabled             # Pinia optimistic mutation
    request_deduplication: required    # Query client deduping
    pagination_incremental: required   # Incremental fetch composable
    asset_optimization: required       # Vite asset optimization
    tree_shaking: required             # ES module named imports
    production_build_opts: required    # esbuild / Rollup production build
    error_loading_boundaries: required # onErrorCaptured + Suspense
    debouncing_throttling: required    # VueUse useDebounceFn (300ms)
    request_cancellation: required     # AbortController signal
    route_loading_states: required     # Router transition skeletons
    component_lazy_loading: required   # defineAsyncComponent for heavy dialogs
    image_lazy_loading: required       # Native loading="lazy"
    form_state_optimization: required  # VeeValidate / FormKit validation
    accessibility_standards: required  # Native RTL + focus trap
    persistent_client_state: optional  # VueUse useStorage
    virtualized_lists: optional        # vue-virtual-scroller (> 100 rows)
    background_web_workers: optional   # Web Workers
    bundle_size_analysis: optional     # rollup-plugin-visualizer
```

### 3. Laravel Blade Recommended Baseline (`frontend.name: "Blade"`)
```yaml
frontend:
  capabilities:
    client_side_routing: required      # Livewire 3 wire:navigate (SPA transitions)
    code_splitting: required           # Vite chunk splitting for asset bundles
    lazy_loading: required             # Livewire lazy loading (wire:lazy)
    component_architecture: required   # Blade Components (<x-component>)
    reactive_state: required           # Alpine.js fine-grained reactivity & Livewire
    async_data_fetching: required      # Livewire async actions & AJAX
    client_caching_swr: required       # Livewire response caching & HTTP cache
    prefetching_on_intent: required    # wire:navigate.hover
    optimistic_ui: enabled             # Alpine x-effect & wire:dirty
    request_deduplication: required    # Server-side debounce / request deduping
    pagination_incremental: required   # Eloquent cursor & LengthAwarePaginator
    asset_optimization: required       # Laravel Vite plugin optimization
    tree_shaking: required             # ES module named imports in app.js
    production_build_opts: required    # Vite production build & asset versioning
    error_loading_boundaries: required # Livewire fallback & Blade error views
    debouncing_throttling: required    # wire:model.live.debounce.300ms
    request_cancellation: required     # Livewire automatic request cancellation
    route_loading_states: required     # wire:loading indicators & skeletons
    component_lazy_loading: required   # Alpine x-show with deferred rendering
    image_lazy_loading: required       # Native loading="lazy"
    form_state_optimization: required  # Livewire Real-time Validation & 422 mapping
    accessibility_standards: required  # Native RTL + ARIA
    persistent_client_state: optional  # Alpine $persist
    virtualized_lists: optional        # Virtualizer JS (> 100 rows)
    background_web_workers: optional   # Laravel Queues (Server) / Web Workers
    bundle_size_analysis: optional     # Vite visualizer
```
