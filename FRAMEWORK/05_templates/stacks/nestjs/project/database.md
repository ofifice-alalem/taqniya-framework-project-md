# Project Database Architecture & Prisma Standards — [PROJECT_NAME]

# 1. Persistence Standards
- **Engine:** MySQL 8.0 / PostgreSQL 16
- **ORM:** Prisma Client
- **Migration Discipline:** Prisma Migrate (`npx prisma migrate dev`)
- **Precision:** Integer minor units (`_cents BIGINT`) for financial data.
