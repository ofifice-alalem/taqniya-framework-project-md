# NestJS Feature Database Specification: [FEATURE_NAME]

# 1. Target Prisma Schema Definition
```prisma
model [Entity] {
  id          BigInt    @id @default(autoincrement())
  uuid        String    @unique @default(uuid()) @db.VarChar(36)
  name        String    @db.VarChar(191)
  status      String    @default("active") @db.VarChar(20)
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  deletedAt   DateTime? @map("deleted_at")

  @@map("[table_name]")
  @@index([status])
}
```

---

## 2. Integrity Constraints & Foreign Keys
- Primary Key: `id BIGINT UNSIGNED AUTO_INCREMENT`
- Foreign Keys: `ON DELETE RESTRICT ON UPDATE CASCADE`
- Precision Invariant: Financial values stored as integer cents (`amount_cents BIGINT`).
