# NestJS Package Evaluation & Dependency Policy

# Purpose
Governs approved external dependencies, licensing compliance, and security standards for NestJS applications under the Taqniya Framework.

---

## 1. Approved Package Catalog

| Category | Approved Packages | Purpose |
| :--- | :--- | :--- |
| **Framework Core** | `@nestjs/common`<br>`@nestjs/core`<br>`@nestjs/platform-express`<br>`@nestjs/platform-fastify`<br>`reflect-metadata`<br>`rxjs` | Official NestJS runtime and reactive streams. |
| **Configuration** | `@nestjs/config`<br>`joi` or `zod` | Typed configuration loader with environment schema validation. |
| **Database & ORM** | `@prisma/client`<br>`prisma` *(dev)*<br>`mysql2` / `pg` | Next-generation type-safe ORM, migrations, and database drivers. |
| **Validation & DTOs** | `class-validator`<br>`class-transformer` | Declarative DTO validation and input transformation. |
| **Security & Auth** | `@nestjs/passport`<br>`passport`<br>`passport-jwt`<br>`@nestjs/jwt`<br>`argon2` or `bcrypt`<br>`helmet`<br>`@nestjs/throttler` | Enterprise authentication, password hashing, security headers, and rate limiting. |
| **API Documentation** | `@nestjs/swagger`<br>`swagger-ui-express` | Automatic OpenAPI 3.0 / 3.1 specification generation. |
| **Testing & Quality** | `@nestjs/testing`<br>`supertest`<br>`vitest` or `jest`<br>`eslint`<br>`prettier` | Automated unit/E2E test runners and code quality formatters. |
| **Date & Time** | `date-fns` or `dayjs` | Lightweight, immutable date handling in UTC (avoid Moment.js). |

---

## 2. Prohibited Packages & Anti-Patterns

- **MUST NOT (Moment.js):** Do not install `moment` due to massive bundle size and mutability. Use native `Date`, `date-fns`, or `dayjs`.
- **MUST NOT (Mixed ORMs):** Never mix `prisma` with `typeorm` or raw `mysql2` connections in the same service.
- **MUST NOT (Unmaintained Libraries):** Avoid packages without updates in the last 12 months or with open critical CVEs.
- **MUST NOT (Trivial Packages):** Do not install packages for trivial operations (e.g. `is-number`, `left-pad`).

---

## 3. License Compliance
- **Permitted:** MIT, Apache 2.0, BSD-2-Clause, BSD-3-Clause, ISC.
- **Restricted:** GPLv3, AGPL require explicit organizational approval.

---

## 4. Verification Checklist
1. Run `npm audit` with 0 high/critical vulnerabilities.
2. Confirm lockfile (`package-lock.json` or `pnpm-lock.yaml`) is committed.
3. Confirm dev-dependencies (`@types/*`, `vitest`, `prisma`) are placed under `devDependencies`.
