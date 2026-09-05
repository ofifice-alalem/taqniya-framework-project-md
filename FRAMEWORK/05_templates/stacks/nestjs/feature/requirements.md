# NestJS Feature Requirements: [FEATURE_NAME]

# 1. Functional Scope & Objectives
- **Feature Name:** `[FEATURE_NAME]`
- **Target Domain Module:** `src/modules/[DOMAIN]/`
- **Objective:** `[BRIEF_FEATURE_OBJECTIVE]`

---

## 2. In-Scope Endpoints & Actions
- `POST /api/v1/[RESOURCES]` — Create a new entity instance.
- `GET /api/v1/[RESOURCES]` — Paginated list with filtering and search.
- `GET /api/v1/[RESOURCES]/:id` — Retrieve single entity details.
- `PUT /api/v1/[RESOURCES]/:id` — Update entity.
- `DELETE /api/v1/[RESOURCES]/:id` — Soft-delete entity.

---

## 3. Technical & Non-Functional Requirements
- **Validation:** Enforced via DTOs and `class-validator`.
- **Authorization:** Enforced via `@UseGuards(JwtAuthGuard, RolesGuard)` and `@Roles(...)`.
- **Audit Logging:** Mutations recorded via `AuditInterceptor` or explicit service logging.
- **Performance:** Bounded database queries with `take` and `skip`.
