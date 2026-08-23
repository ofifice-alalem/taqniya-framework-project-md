# React Architecture & Component Structure

# Purpose
Defines folder structures, component separation, and boundary rules for React applications.

---

## 1. Modular Feature-Based Directory Structure

```text
src/
├── components/ui/             # Reusable atomic UI components (Button, Modal, Input, Card)
├── features/                  # Domain-driven feature modules
│   ├── users/
│   │   ├── api/               # Feature-specific TanStack Query hooks (useUsersQuery)
│   │   ├── components/        # Feature UI components (UserTable, UserFormModal)
│   │   ├── types/             # Feature TypeScript DTOs
│   │   └── hooks/             # Feature custom hooks
├── layouts/                   # MainLayout, AuthLayout, DashboardLayout
├── routes/                    # Route definitions and lazy page imports
├── stores/                    # Global Zustand stores (themeStore, authStore)
└── lib/                       # API clients, axios/fetch instance, utilities
```

---

## 2. Component Boundary Rules

- **Presentational vs Container Components:** Keep dumb UI components in `components/ui/` pure (props-in, events-out).
- **Custom Hooks for Logic:** Extract complex logic or data fetching into dedicated custom hooks (`useUserList()`).
- **No Monolithic Files:** Break JSX views exceeding 150 lines into smaller sub-components.
