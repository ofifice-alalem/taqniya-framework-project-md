# Prompt: Phases Creator

> **Purpose:** Generate a new standardized functional phase folder and its 5 specification files.

---

## Instructions for AI Agent

Create a new phase with:
- **Phase ID / Name:** `[e.g., phase_01_users]`
- **Goal:** `[Primary business goal]`
- **Scope:** `[List of capabilities to implement]`

### Required Output:
Create directory `PROJECT/MD/phases/<phase_name>/` containing:
1. `README.md`: Scope, deliverables, dependencies.
2. `backend.md`: Controllers, services, logic, permissions.
3. `frontend.md`: Screens, states, forms, interactions.
4. `routes.md`: API endpoints, methods, schemas.
5. `data.md`: Table schemas, columns, constraints, relations.
