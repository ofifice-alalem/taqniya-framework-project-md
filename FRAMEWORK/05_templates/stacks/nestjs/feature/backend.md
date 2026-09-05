# NestJS Feature Backend Specification: [FEATURE_NAME]

# 1. Target Architecture & File Manifest
- **Feature Module:** `src/modules/[DOMAIN]/[ENTITY].module.ts`
- **Controller:** `src/modules/[DOMAIN]/[ENTITY].controller.ts`
- **Domain Service:** `src/modules/[DOMAIN]/[ENTITY].service.ts`
- **DTOs:**
  - `src/modules/[DOMAIN]/dto/create-[ENTITY].dto.ts`
  - `src/modules/[DOMAIN]/dto/update-[ENTITY].dto.ts`
  - `src/modules/[DOMAIN]/dto/query-[ENTITY].dto.ts`
- **Entity / Model:** `src/modules/[DOMAIN]/entities/[ENTITY].entity.ts`
- **Guard / Decorator (if scoped):** `src/modules/[DOMAIN]/guards/[ENTITY].guard.ts`

---

## 2. Implementation Rules
- **Controller:** Strictly delegates to `[ENTITY]Service`, uses route decorators (`@Get()`, `@Post()`), Swagger documentation (`@ApiTags()`, `@ApiOperation()`), and passes validated DTOs.
- **Service:** Coordinates business logic, domain rules, and atomic transactions via `prisma.$transaction()`.
- **Validation:** All inputs validated via `class-validator` decorators in DTOs.
- **Exceptions:** Throws semantic NestJS exceptions (`NotFoundException`, `ConflictException`, `BadRequestException`, `ForbiddenException`).
- **Data Access:** All database queries go through `PrismaService` with explicit pagination (`take`, `skip`).
