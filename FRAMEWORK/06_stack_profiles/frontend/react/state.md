# React State Management (Zustand & TanStack Query)

# Purpose
Governs state architecture in React using Zustand for client state and TanStack Query for server state.

---

## 1. Zustand Client Stores

- **MUST:** Use atomic selectors when subscribing to Zustand stores to prevent unnecessary component re-renders:
  ```tsx
  // Recommended: Selective subscription
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  ```

---

## 2. TanStack Query Server State

- **MUST:** Define structured query keys for caching and invalidation:
  ```tsx
  export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: (filters: UserFilters) => [...userKeys.lists(), filters] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id: string) => [...userKeys.details(), id] as const,
  };
  ```
- **MUST:** Invalidate query cache upon successful mutations (`queryClient.invalidateQueries({ queryKey: userKeys.lists() })`).
