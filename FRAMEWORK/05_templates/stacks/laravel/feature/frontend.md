# Laravel Feature Frontend (Inertia.js): [FEATURE_NAME]

# 1. Inertia Page & Components
- **Page Component:** `resources/js/Pages/[DOMAIN]/Index.tsx`
- **Form Drawer / Modal:** `resources/js/Pages/[DOMAIN]/Components/CreateModal.tsx`

---

## 2. Inertia Page Props Contract
```typescript
interface [FEATURE]IndexProps {
    items: {
        data: Array<[ENTITY_ITEM]>;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    filters: {
        search?: string;
        status?: string;
    };
    auth: {
        user: User;
        permissions: Record<string, boolean>;
    };
}
```
