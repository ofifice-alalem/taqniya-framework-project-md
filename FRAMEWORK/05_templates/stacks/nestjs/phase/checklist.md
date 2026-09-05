# NestJS Phase [PHASE_NUMBER] Operational Checklist

# 1. Database & Migrations
- [ ] Model added to `prisma/schema.prisma` with indexes and foreign keys.
- [ ] Run `npx prisma migrate dev --name [migration_name]`.
- [ ] Verify `prisma.$transaction()` used for multi-table mutations.
- [ ] Synchronize `PROJECT/MD/data.md` and phase `data.md`.

---

## 2. Backend & NestJS Architecture
- [ ] Create Feature Module: `src/modules/[domain]/[domain].module.ts`.
- [ ] Create DTOs with `class-validator` and `class-transformer`.
- [ ] Implement Domain Service with clean business logic.
- [ ] Implement Thin Controller with `@ApiTags()`, `@ApiOperation()`, and guards.
- [ ] Register endpoints in `routes.md` (SSoT).

---

## 3. Security & Access Control
- [ ] Apply `@UseGuards(JwtAuthGuard, RolesGuard)` where required.
- [ ] Verify IDOR defenses on resource endpoints.
- [ ] Ensure sensitive actions are logged in `audit_logs`.

---

## 4. Quality & Testing Gatekeeper
- [ ] Write unit tests for service in `src/modules/[domain]/[domain].service.spec.ts`.
- [ ] Write E2E test in `test/[domain].e2e-spec.ts`.
- [ ] `npm run test` passes 100%.
- [ ] `npm run lint` passes with 0 warnings/errors.
- [ ] `npm run build` succeeds without TypeScript errors.
- [ ] Update `PROJECT/MD/phases/<phase_name>/README.md`.
