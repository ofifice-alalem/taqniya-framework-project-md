# Vue 3 Architecture & SFC Structure

# Purpose
Defines Single File Component (SFC) structures, composable design, and folder hierarchies for Vue 3.

---

## 1. Directory Structure

```text
src/
├── components/ui/             # Pure presentational UI components (Button.vue, Modal.vue)
├── composables/               # Shared business logic composables (useAuth, useNotifications)
├── features/                  # Domain-driven feature modules
│   └── users/
│       ├── components/        # UserTable.vue, UserModal.vue
│       ├── composables/       # useUserList.ts
│       └── types/             # user.types.ts
├── layouts/                   # AppLayout.vue, AuthLayout.vue
├── router/                    # Route definitions and lazy page imports
└── stores/                    # Pinia stores (useUIStore.ts, useAuthStore.ts)
```
