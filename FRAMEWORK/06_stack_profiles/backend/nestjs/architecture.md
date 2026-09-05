# NestJS Architecture & Modular Boundary Governance

# Purpose
Enforces a strict, maintainable Modular Layered Architecture for NestJS applications under the Taqniya Framework, ensuring thin controllers, isolated business logic, structured dependency injection, and clean data access.

---

## 1. Request Lifecycle & Boundary Flow

```text
[ Incoming HTTP Request / Client Payload ]
                   │
                   ▼
┌────────────────────────────────────────────────────────┐
│ 1. Routing & Perimeter Middleware                      │
│    (Helmet, CORS, Throttler, Request Logging)          │
└──────────────────┬─────────────────────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────────────────────┐
│ 2. Guards & Authentication Perimeter                   │
│    (JwtAuthGuard, RolesGuard, ChildContextGuard)       │
└──────────────────┬─────────────────────────────────────┘
                   │ Authorized Request
                   ▼
┌────────────────────────────────────────────────────────┐
│ 3. Interceptors (Pre-Controller)                       │
│    (Audit Logging Pre-Hook, Context Enrichment)        │
└──────────────────┬─────────────────────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────────────────────┐
│ 4. Validation Pipes & DTO Boundary                     │
│    (ValidationPipe, class-validator, typed DTOs)       │
└──────────────────┬─────────────────────────────────────┘
                   │ Validated Typed DTO
                   ▼
┌────────────────────────────────────────────────────────┐
│ 5. Presentation Layer (Thin Controllers)               │
│    (HTTP Routing, Swagger Metadata, DTO Delegation)    │
└──────────────────┬─────────────────────────────────────┘
                   │ Invokes Domain Service
                   ▼
┌────────────────────────────────────────────────────────┐
│ 6. Application & Domain Layer (Services)               │
│    (Business Logic, Transaction Management, Events)    │
└──────────────────┬─────────────────────────────────────┘
                   │ Queries / Mutates via
                   ▼
┌────────────────────────────────────────────────────────┐
│ 7. Data Access Layer (Prisma / Repositories)           │
│    (PrismaService, Query Builders, Connection Pool)    │
└──────────────────┬─────────────────────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────────────────────┐
│ 8. Database Storage & Schemas                          │
│    (MySQL 8.0, PostgreSQL, Redis Cache)                │
└──────────────────┬─────────────────────────────────────┘
                   │ Response Payload
                   ▼
┌────────────────────────────────────────────────────────┐
│ 9. Interceptors (Post-Controller) & Exception Filters  │
│    (Response Envelope Formatting, Audit Log Commit,    │
│     Standardized HttpExceptionFilter on errors)        │
└────────────────────────────────────────────────────────┘
```

---

## 2. Structural Layer Responsibilities & Rules

### A. Feature Modules (`src/modules/*/[feature].module.ts`)
- **Role:** Encapsulate a complete functional domain.
- **Rule:** Every feature phase MUST correspond to a dedicated Feature Module.
- **Rule:** Modules MUST declare their controllers in `controllers: [...]`, internal domain logic in `providers: [...]`, and explicitly export only reusable services in `exports: [...]`.
- **MUST NOT:** Avoid circular module dependencies; resolve cross-module references using forward references (`forwardRef()`) sparingly or extract shared domain contracts into shared modules.

### B. Presentation Layer / Thin Controllers (`*.controller.ts`)
- **Role:** Transport orchestration ONLY:
  - Route mapping via decorators (`@Get()`, `@Post()`, `@Put()`, `@Delete()`).
  - Swagger documentation via decorators (`@ApiTags()`, `@ApiOperation()`, `@ApiResponse()`).
  - Parameter extraction (`@Param()`, `@Query()`, `@Body()`, `@CurrentUser()`).
  - Passing validated DTOs directly to domain services.
- **MUST:** Remain thin and focused strictly on HTTP concerns.
- **MUST NOT:** Execute direct database queries (`prisma.user.findMany(...)`, raw SQL) inside controllers.
- **MUST NOT:** Contain business calculation formulas, status transition logic, or financial operations.

### C. Domain & Application Services (`*.service.ts`)
- **Role:** The core of business logic:
  - Implement business rules, domain invariants, and validations.
  - Coordinate multi-table database mutations inside atomic transactions (`prisma.$transaction`).
  - Emit domain events, dispatch jobs, and manage caching.
- **MUST:** Throw semantic NestJS HTTP exceptions (`NotFoundException`, `ConflictException`, `BadRequestException`, `ForbiddenException`).
- **MUST NOT:** Reference raw HTTP request/response objects (`req`, `res`); services must be transport-agnostic and testable in isolation.

### D. Data Access & Persistence Layer (Prisma / Repositories)
- **Role:** Encapsulate database interactions:
  - `PrismaService`: Injects Prisma Client with connection lifecycle hooks (`onModuleInit`, `enableShutdownHooks`).
  - Strict typing: Use generated Prisma client types or domain entities.
  - Non-destructive query bounding: Always use `take` and `skip` (pagination) on multi-record queries.

---

## 3. Cross-Cutting Enterprise Components

1. **Guards (`common/guards/`):**
   - Enforce authentication via Passport JWT (`JwtAuthGuard`).
   - Enforce RBAC via `@Roles('admin', 'teacher')` and `RolesGuard`.
   - Never perform database mutations inside Guards (read-only verification).

2. **Interceptors (`common/interceptors/`):**
   - Standardize JSON responses into unified envelopes: `{ success: true, data: ..., meta: ... }`.
   - Record user activity and mutation payloads to `audit_logs`.

3. **Exception Filters (`common/filters/`):**
   - Catch all unhandled exceptions and format them into predictable HTTP error payloads matching `routes.md` (SSoT).

---

## 4. Verification Checklist
1. Verify that no Controller injects `PrismaService` directly; all persistence goes through domain Services.
2. Confirm all Controllers use typed DTOs with `@Body()`, `@Query()`, and `@Param()`.
3. Verify that Controllers remain under 100–150 lines and contain zero business algorithms.
4. Confirm multi-table mutations are wrapped in `prisma.$transaction()`.
