# Project Business Rules — [PROJECT_NAME]

# 1. Global Business Invariants
- **Identity Scheme:** Unified user code scheme (`[PREFIX]-XXXX`) or UUID identifier.
- **Data Safety:** Soft-deletes mandatory on all primary domain entities (`deletedAt`).
- **Audit Logging:** Sensitive mutations automatically recorded in `audit_logs`.
- **Transactions:** Multi-table mutations must be wrapped in `prisma.$transaction()`.
