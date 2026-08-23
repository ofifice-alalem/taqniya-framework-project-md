# React Technology Profile

# Purpose
This profile defines framework-specific implementation patterns, coding rules, state management, and testing practices for **React (v18.x / v19.x SPA Architecture)** applications under the Taqniya Framework.

> **Note on Meta-Frameworks:** Fullstack/SSR frameworks (e.g., Next.js App Router) represent distinct architectural paradigms and are governed under dedicated stack profiles. This profile focuses strictly on React Client/SPA applications.

---

## 1. Preferred Ecosystem Defaults (Configurable via `stack.yaml`)

In accordance with Taqniya's **Dimension Independence Principle**, this profile does not enforce rigid external packages. The stack choices declared in `PROJECT/MD/stack.yaml` are authoritative. For standard React projects, the recommended ecosystem defaults are:

- **Language:** TypeScript (`strict: true`) *(Preferred)* or JavaScript (ES6+)
- **Routing:** React Router v6+
- **State Management:**
  - Client UI State: `Zustand` *(Recommended)*, Redux Toolkit, or Context API
  - Server State & Cache: `TanStack Query` *(Recommended)* or SWR
- **Virtualization:** `TanStack Virtual` *(Recommended)* or `react-window`
- **Testing:** `Vitest` + `React Testing Library` + `Playwright`
- **Styling:** Tailwind CSS, CSS Modules, or Taqniya CSS Tokens

---

## 2. Profile Documents

- [`architecture.md`](architecture.md): Component hierarchy, folder structures, and boundary rules.
- [`coding_rules.md`](coding_rules.md): React Hooks invariants, clean JSX, and TypeScript typing.
- [`state.md`](state.md): Zustand stores, TanStack Query hooks, and selective subscriptions.
- [`performance.md`](performance.md): `React.lazy`, `useMemo`, `useCallback`, and virtualization patterns.
- [`testing.md`](testing.md): Testing React components, user interactions, and mocking.
