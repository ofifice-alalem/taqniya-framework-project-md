# Frontend State Management & Reactivity Standards

# Purpose
This document establishes the state categorization taxonomy, ownership rules, and fine-grained reactivity constraints for modern web applications.

---

## 1. The 5-Category State Taxonomy

To avoid monolithic or chaotic state architecture, state MUST be strictly categorized:

| Category | Definition | Recommended Scope / Tooling |
| :--- | :--- | :--- |
| **1. Local Component State** | UI state used exclusively within a single component (e.g., `isOpen`, `activeTab`, local input value) | Component internal state (`useState`, `ref`) |
| **2. Shared Global UI State** | Client-only state shared across multiple unrelated components (e.g., `theme`, `sidebarCollapsed`, `activeNotifications`) | Global state store (Zustand, Pinia, Context) |
| **3. Server Cache State** | Remote data retrieved from backend APIs (e.g., `usersList`, `orderDetails`) | Server-state library (TanStack Query, SWR, Pinia Colada) |
| **4. URL / Route State** | State that should be shareable and bookmarkable (e.g., `page=2`, `search=abc`, `status=active`, `tab=billing`) | URL Query Parameters (`useSearchParams`) |
| **5. Persistent Client State** | State surviving browser restarts/reloads (e.g., `authToken`, `userPreferences`) | `localStorage`, `IndexedDB` |

---

## 2. State Ownership & Invariants

- **MUST NOT:** Do not duplicate Server Cache State into Shared Global UI Stores without explicit synchronization mechanics.
- **MUST NOT:** Do not place ephemeral form inputs into global stores.
- **MUST:** Keep state as close to the consuming component as possible (State Colocation).
- **SHOULD:** Use fine-grained selectors (e.g., `useStore(state => state.user)`) to prevent unnecessary component re-renders when unrelated store properties change.
