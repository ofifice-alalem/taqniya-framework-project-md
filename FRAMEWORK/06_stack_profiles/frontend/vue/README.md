# Vue 3 Technology Profile

# Purpose
This profile defines framework-specific implementation patterns, coding rules, state management, and testing practices for **Vue 3 (Composition API / SPA Architecture)** applications under the Taqniya Framework.

> **Note on Meta-Frameworks:** Fullstack/SSR frameworks (e.g., Nuxt) represent distinct architectural paradigms and are governed under dedicated stack profiles. This profile focuses strictly on Vue 3 Single Page Applications.

---

## 1. Preferred Ecosystem Defaults (Configurable via `stack.yaml`)

In accordance with Taqniya's **Dimension Independence Principle**, this profile does not enforce rigid external packages. The stack choices declared in `PROJECT/MD/stack.yaml` are authoritative. For standard Vue 3 projects, the recommended ecosystem defaults are:

- **Language:** TypeScript (`strict: true`) with `<script setup lang="ts">` *(Preferred)* or JavaScript
- **Routing:** Vue Router v4
- **State Management:**
  - Client UI State: `Pinia` *(Recommended)*
  - Server State & Cache: `TanStack Query Vue` *(Recommended)* or custom composables
- **Virtualization:** `vue-virtual-scroller` *(Recommended)* or `TanStack Virtual Vue`
- **Testing:** `Vitest` + `Vue Test Utils` + `Playwright`
- **Styling:** Tailwind CSS, CSS Modules, or Taqniya CSS Tokens

---

## 2. Profile Documents

- [`architecture.md`](architecture.md): SFC organization, composable boundaries, and feature structure.
- [`coding_rules.md`](coding_rules.md): `<script setup>`, Props/Emits typing, and reactivity hygiene.
- [`state.md`](state.md): Pinia stores, server caching, and storeToRefs.
- [`performance.md`](performance.md): `defineAsyncComponent`, `shallowRef`, and virtualization.
- [`testing.md`](testing.md): Component tests with Vitest and user interactions.
