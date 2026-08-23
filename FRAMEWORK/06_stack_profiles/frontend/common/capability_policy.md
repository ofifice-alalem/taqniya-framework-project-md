# Frontend Capability Policy & Decision Engine

# Purpose
This document defines the authoritative policy specification, decision states, and runtime evaluation rules governing frontend capabilities across all web projects under the Taqniya Framework.

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
│ (e.g., lazy_loading: required, virtualization: disabled)│
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
| **`required`** | **Mandatory when in scope** | The AI agent **MUST** apply this capability whenever the active component/view meets the framework-defined activation threshold (e.g., virtualize when rows > 100). The agent does NOT ask for permission. |
| **`enabled`** | **Permitted & Available** | The capability is vetted and supported in the project architecture. The AI agent may apply it where standard engineering practices dictate. |
| **`disabled`** | **Forbidden** | The AI agent **MUST NOT** import, wire up, or implement this capability in the project under any circumstances unless the project policy is explicitly updated. |
| **`optional`** | **Elective / Explicit Only** | The capability is **NOT applied automatically** by the AI agent. It is implemented ONLY when explicitly requested in the active task prompt or specified in project specifications. |

---

## 3. Canonical Recommended Defaults Profile

During project initialization, Taqniya provides a **Canonical Recommended Defaults** baseline. This profile optimizes standard business applications without introducing unnecessary overengineering:

```yaml
# Taqniya Canonical Recommended Defaults Baseline
frontend:
  capabilities:
    # --- Core Performance & Navigation (Required) ---
    client_side_routing: required
    code_splitting: required
    lazy_loading: required
    component_architecture: required
    reactive_state: required
    async_data_fetching: required
    client_caching_swr: required
    prefetching_on_intent: required
    optimistic_ui: enabled
    request_deduplication: required
    pagination_incremental: required
    asset_optimization: required
    tree_shaking: required
    production_build_opts: required
    error_loading_boundaries: required
    debouncing_throttling: required
    request_cancellation: required
    route_loading_states: required
    component_lazy_loading: required
    form_state_optimization: required
    accessibility_standards: required

    # --- Advanced / High-Density Capabilities (Elective) ---
    virtualized_lists: optional
    background_web_workers: optional
    persistent_client_state: optional
    bundle_size_analysis: optional
```

---

## 4. Scope-Triggered Execution Rule

> **CRITICAL INVARIANT:**  
> `required` does **NOT** mean "apply unconditionally to every single element."  
> It means: **"When a component or workflow enters the scope defined in the corresponding framework standard, implementation is mandatory."**

### Examples:
* `lazy_loading: required` ➔ Apply to heavy dialogs, complex charts, and non-critical routes as defined in [`code_splitting.md`](code_splitting.md). Do NOT lazy-load critical initial viewport elements.
* `virtualized_lists: required` ➔ Apply when a data table renders **> 100 items** as defined in [`rendering.md`](rendering.md). Do NOT virtualize small 10-row lookup lists.
* `virtualized_lists: disabled` ➔ Never import virtualization packages or add virtualization wrappers, even for large tables (render standard paginated rows instead).
