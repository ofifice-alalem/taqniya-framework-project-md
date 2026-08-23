# Vue 3 Coding Rules & Reactivity Hygiene

# Purpose
Defines TypeScript, Composition API, and reactivity rules for Vue 3.

---

## 1. Composition API Invariants

- **MUST:** Always use `<script setup lang="ts">`.
- **MUST:** Define typed props and emits using runtime type macros:
  ```vue
  <script setup lang="ts">
  interface Props {
    title: string;
    isActive?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    isActive: false,
  });
  const emit = defineEmits<{
    (e: 'update', id: string): void;
  }>();
  </script>
  ```
- **MUST NOT:** Destructure reactive props without `toRefs()` or `toRef()` as it breaks reactivity.
