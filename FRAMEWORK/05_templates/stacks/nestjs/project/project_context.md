# Project Context & Technology Stack — [PROJECT_NAME]

# 1. Project Overview
- **Project Name:** `[PROJECT_NAME]`
- **Domain / Industry:** `[DOMAIN_INDUSTRY]`
- **Purpose & Vision:** `[BRIEF_PROJECT_PURPOSE]`
- **Repository URL:** `[GIT_REPOSITORY_URL]`

---

## 2. Technology Stack & Profile Declaration

- **Active Backend Profile:** `06_stack_profiles/backend/nestjs/`
- **Backend Runtime & Framework:** Node.js 20+ / NestJS 10.x (TypeScript)
- **Frontend Architecture:** Vue.js 3 / React SPA (with Vite)
- **Primary Database:** MySQL 8.0 / PostgreSQL 16 (via Prisma ORM)
- **Caching & Key-Value:** Redis 7.x
- **Testing Ecosystem:** Vitest / Jest + Supertest
- **Package Manager:** npm / pnpm
- **Linters & Formatters:** ESLint & Prettier

---

## 3. Key NestJS Architectural Rules
- **Modular Topology:** Each domain subsystem lives in its own `Module` (`src/modules/*`).
- **Thin Controllers:** Controllers only handle routing, Swagger annotations, and DTO delegation.
- **Strict DTO Validation:** All input payloads validated via `class-validator` and `ValidationPipe`.
- **Database Encapsulation:** Multi-table mutations wrapped in `prisma.$transaction()`.
- **Financial Precision:** Currency amounts stored as integer minor units (`amount_cents BIGINT`).
- **Security & RBAC:** Passport JWT authentication + `@Roles(...)` decorator + `RolesGuard`.
