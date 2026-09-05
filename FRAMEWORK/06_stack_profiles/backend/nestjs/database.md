# NestJS Database Governance & Persistence Standards

# Purpose
Establishes database persistence, query optimization, migration management, and data integrity standards for NestJS applications using Prisma ORM (or TypeORM) under the Taqniya Framework.

---

## 1. ORM Architecture & Service Lifecycle

In NestJS applications, database access is mediated through a dedicated `PrismaModule` and `PrismaService`:

```typescript
// src/database/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
```

---

## 2. Transactional Integrity & Multi-Table Mutations

- **MUST:** Any business operation mutating more than one record or across dependent tables MUST be wrapped in an atomic database transaction.
- **Rule:** Use Prisma's interactive transaction API:

```typescript
async transferStudent(studentId: number, targetSectionId: number, adminId: number): Promise<void> {
  await this.prisma.$transaction(async (tx) => {
    // 1. Verify target section capacity
    const section = await tx.section.findUnique({ where: { id: targetSectionId } });
    if (!section || section.currentEnrollment >= section.maxCapacity) {
      throw new BadRequestException('Target section is at maximum capacity');
    }

    // 2. Update student section
    await tx.student.update({
      where: { id: studentId },
      data: { sectionId: targetSectionId },
    });

    // 3. Increment section counter
    await tx.section.update({
      where: { id: targetSectionId },
      data: { currentEnrollment: { increment: 1 } },
    });

    // 4. Log to audit trail
    await tx.auditLog.create({
      data: {
        userId: adminId,
        action: 'STUDENT_SECTION_TRANSFER',
        entityType: 'student',
        entityId: studentId,
        newValues: { targetSectionId },
      },
    });
  });
}
```

---

## 3. Financial Data Storage & Precision Invariant

- **MUST:** All monetary amounts (tuition, fees, salary, balance) MUST be stored as integer minor units (`BIGINT` or `Int` in Prisma) using the standard `_cents` suffix (e.g., `amount_cents`, `balance_cents`, `fee_cents`).
- **MUST NOT:** Using floating-point types (`Float`, `Double`) for currency or financial values is STRICTLY FORBIDDEN.
- **MUST:** Pair currency amounts with an explicit 3-character ISO 4217 currency code: `currency String @default("USD") @db.Char(3)`.

---

## 4. Query Bounding & Anti-N+1 Performance

- **MUST:** All queries returning unbounded collections MUST enforce pagination via `take` (limit) and `skip` (offset):
  ```typescript
  const [data, total] = await Promise.all([
    this.prisma.user.findMany({
      where: filters,
      take: Math.min(limit, 100), // Max 100 records per page
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    }),
    this.prisma.user.count({ where: filters }),
  ]);
  ```
- **MUST NOT:** Unbounded `.findMany()` queries without `take` are forbidden in production APIs.
- **Anti-N+1:** Use Prisma's `include` or `select` relations to eager-load associated entities in a single optimized query rather than looping over results with individual database calls.

---

## 5. Soft Delete Discipline

- For entities implementing soft deletion, schemas must declare `deletedAt DateTime? @map("deleted_at")`.
- Queries querying active records MUST filter out deleted records: `where: { deletedAt: null }` (or via Prisma Client Extensions).

---

## 6. Verification Checklist
1. Verify multi-entity mutations use `prisma.$transaction()`.
2. Confirm financial fields are declared as `Int` or `BigInt` with `_cents` suffix.
3. Confirm all list endpoints implement pagination parameters (`page`, `limit`).
4. Verify migration scripts in `prisma/migrations/` match `PROJECT/MD/database.md` 1:1.
