# NestJS Stack Profile — Taqniya AI Development Framework

# Purpose
This profile establishes the technology-specific architectural, coding, database, security, and testing standards for applications built on the **NestJS** ecosystem (Node.js / TypeScript). It specializes the global Taqniya Framework standards for modern, enterprise-grade NestJS modular development.

# Scope
Applies to all repositories where `PROJECT/MD/stack.yaml` declares NestJS as the primary backend framework.

---

## 1. Role in the Taqniya Hierarchy

```
    Taqniya Core (00_core/*)
          │  (Universal principles: layered architecture, security, clean code, data safety)
          ▼
    NestJS Backend Profile (06_stack_profiles/backend/nestjs/*)
          │  (NestJS idioms: Modules, Controllers, Services, DTOs, Guards, Interceptors, Prisma)
          ▼
    Project MD (PROJECT/MD/*)
          │  (Domain business rules, project entities, routes, database schema)
          ▼
    Source Code (src/modules/*, src/common/*, prisma/*)
```

---

## 2. Profile Documents & Responsibilities

| Document | Responsibility |
| :--- | :--- |
| **[`stack.md`](stack.md)** | Baseline runtime requirements (Node.js 20+, NestJS 10.x, TypeScript 5.x, Fastify/Express). |
| **[`architecture.md`](architecture.md)** | Strict Modular Architecture (Modules -> Controllers -> Services -> Prisma/Repositories). |
| **[`coding_rules.md`](coding_rules.md)** | TypeScript strict idioms, class-validator DTOs, naming conventions, ESLint & Prettier. |
| **[`database.md`](database.md)** | Prisma ORM / TypeORM integration, transaction handling (`prisma.$transaction`), Money precision in cents. |
| **[`security.md`](security.md)** | Passport JWT authentication, RolesGuard RBAC, Throttler rate limiting, Helmet, IDOR defense. |
| **[`testing.md`](testing.md)** | Unit testing with Vitest/Jest and `@nestjs/testing`, E2E testing with Supertest. |
| **[`package_policy.md`](package_policy.md)** | Approved NestJS ecosystem packages (`@nestjs/swagger`, `prisma`, `class-validator`, etc.). |

---

## 3. How to Activate This Profile
In the project's `PROJECT/MD/stack.yaml`, specify:
```yaml
backend:
  name: "NestJS"
  version: "10.x"
  language: "TypeScript"
  package_manager: "npm" # or pnpm
```
When this profile is declared, AI agents and engineers MUST respect both the global Taqniya core rules and the specialized rules in this profile.
