# NestJS Feature Frontend Specification: [FEATURE_NAME]

# 1. Frontend Integration Contract
- **API Consumers:** Vue.js 3 / React SPA client applications.
- **Data Transport:** Decoupled REST JSON over HTTP.
- **Client State:** Pinia / Zustand store managing feature state.

---

## 2. Screens & View States
- **List View:** Paginated data table with search and filters.
- **Form Modal / Page:** Create and edit entity with inline field validation.
- **Four Standard States:** Loading, Empty, Error, and Success states.
