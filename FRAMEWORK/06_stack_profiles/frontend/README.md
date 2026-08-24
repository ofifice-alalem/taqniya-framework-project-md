# Frontend Technology Profiles Architecture

# Purpose
This directory houses modular **Frontend Technology Profiles** for the Taqniya Framework. It provides universal frontend engineering capabilities, performance policies, and framework-specific implementation rules for modern web applications.

---

## 1. 3-Tier Layering Architecture

```text
┌────────────────────────────────────────────────────────┐
│ 1. TAQNIYA CORE (00_core/)                             │
│ Universal engineering principles, clean code, security.│
│ (Technology-Neutral)                                   │
├────────────────────────────────────────────────────────┤
│ 2. FRONTEND COMMON CAPABILITIES (frontend/common/)     │
│ Universal web performance & engineering capabilities   │
│ (Routing, Caching, Lazy Loading, Virtualization, State)│
├────────────────────────────────────────────────────────┤
│ 3. TECHNOLOGY PROFILES (frontend/{react,vue,blade}/)   │
│ Idiomatic implementation rules for specific frameworks │
│ (React Hooks, Vue Composables, Blade + Livewire/Alpine)│
└────────────────────────────────────────────────────────┘
```

---

## 2. Directory Structure

```text
06_stack_profiles/frontend/
├── README.md                      # This overview document
├── common/                        # Universal Frontend Capabilities
│   ├── capability_matrix.md       # Master index & 26-capability matrix
│   ├── capability_policy.md       # Policy states, classifications & framework baselines
│   ├── performance.md             # Core philosophy ("Do as little work as necessary")
│   ├── navigation.md              # Client-side routing, prefetching & deep linking
│   ├── data_fetching.md           # Async data lifecycles, deduping & cancellation
│   ├── state_management.md        # State taxonomy & fine-grained reactivity
│   ├── rendering.md               # Reactive rendering, virtualization & optimistic UI
│   ├── code_splitting.md          # Route/component lazy loading & dynamic imports
│   ├── caching.md                 # Stale-While-Revalidate (SWR) & local storage
│   ├── asset_loading.md           # Image optimization, tree shaking & build budgets
│   ├── forms.md                   # Form states, validation & submission guards
│   └── accessibility.md           # Focus management, ARIA & RTL standards
│
├── react/                         # React SPA Stack Profile (v18.x / v19.x)
├── vue/                           # Vue 3 SPA Stack Profile (Composition API)
└── blade/                         # Laravel Blade Stack Profile (Livewire 3 / Alpine.js)
```

---

## 3. Frontend Capability Policy

Taqniya governs frontend engineering via explicit **Project Capability Policies** declared in `PROJECT/MD/frontend_capabilities.yaml`:
* **`required`**: The AI agent **MUST** implement this capability whenever a component or workflow meets the framework's defined activation threshold.
* **`enabled`**: The capability is approved and available for use in the project architecture.
* **`disabled`**: The AI agent is **STRICTLY FORBIDDEN** from importing or implementing this capability.
* **`optional`**: Not applied automatically; implemented ONLY upon explicit user prompt or project specification.

Detailed policy state definitions and canonical recommended defaults are documented in [`common/capability_policy.md`](common/capability_policy.md).
