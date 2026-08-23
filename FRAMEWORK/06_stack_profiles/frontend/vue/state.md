# Vue 3 State Management & Pinia

# Purpose
Governs state architecture in Vue 3 using Pinia.

---

## 1. Pinia Store Design

- **MUST:** Use the Setup Store syntax (`defineStore` with a function):
  ```ts
  export const useUIStore = defineStore('ui', () => {
    const sidebarOpen = ref(false);
    function toggleSidebar() {
      sidebarOpen.value = !sidebarOpen.value;
    }
    return { sidebarOpen, toggleSidebar };
  });
  ```
- **MUST:** Use `storeToRefs()` when destructuring state properties from Pinia stores in components.
