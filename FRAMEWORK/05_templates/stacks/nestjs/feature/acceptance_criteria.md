# NestJS Feature Acceptance Criteria: [FEATURE_NAME]

# 1. Given-When-Then Verification Scenarios

### Scenario 1: Authorized Record Creation
- **Given:** Authenticated user with role/permission `[ROLE_OR_PERMISSION]`.
- **When:** Submits `POST /api/v1/[RESOURCES]` with valid `Create[ENTITY]Dto` payload.
- **Then:**
  - Record created in database via `PrismaService`.
  - HTTP `201 Created` returned with envelope `{ success: true, data: { ... } }`.
  - Event `[RESOURCE_CREATED_EVENT]` emitted or job dispatched (if applicable).

---

### Scenario 2: Validation Failure
- **Given:** Payload missing required field `[REQUIRED_FIELD]` or invalid format.
- **When:** Submits `POST /api/v1/[RESOURCES]`.
- **Then:**
  - Global `ValidationPipe` catches error.
  - HTTP `400 Bad Request` or `422 Unprocessable Entity` returned with field-specific error messages.

---

### Scenario 3: Unauthorized Access (RBAC)
- **Given:** Authenticated user without required role in `@Roles(...)`.
- **When:** Invokes protected endpoint `[METHOD] /api/v1/[RESOURCES]`.
- **Then:**
  - `RolesGuard` rejects request.
  - HTTP `403 Forbidden` returned with error message.

---

## 2. Test Mapping
| Scenario | Test File | Status |
| :--- | :--- | :--- |
| Unit Test (Domain Logic) | `src/modules/[DOMAIN]/[ENTITY].service.spec.ts` | `[PASS / PENDING]` |
| Controller Unit Test | `src/modules/[DOMAIN]/[ENTITY].controller.spec.ts` | `[PASS / PENDING]` |
| E2E HTTP Test | `test/[DOMAIN]/[ENTITY].e2e-spec.ts` | `[PASS / PENDING]` |
