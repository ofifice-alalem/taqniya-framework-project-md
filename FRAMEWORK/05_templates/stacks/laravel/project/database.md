# Global Database Schema & Eloquent Architecture — [PROJECT_NAME]

# 1. Database Specifications
- **Engine:** PostgreSQL 16 / MySQL 8.0
- **Primary Key:** `$table->id()` (BigInt unsigned auto-increment) / `$table->uuid('id')`
- **Charset:** `utf8mb4` / `utf8mb4_unicode_ci`
- **Timezone:** UTC

---

## 2. Core Tables Schema Catalog

### Table: `users`
- **Columns:**
  - `id`: `BIGINT UNSIGNED PRIMARY KEY`
  - `organization_id`: `BIGINT UNSIGNED NOT NULL, FOREIGN KEY -> organizations(id) ON DELETE RESTRICT`
  - `name`: `VARCHAR(255) NOT NULL`
  - `email`: `VARCHAR(255) NOT NULL UNIQUE`
  - `password`: `VARCHAR(255) NOT NULL`
  - `created_at` / `updated_at`: `TIMESTAMP UTC`
  - `deleted_at`: `TIMESTAMP NULL (SoftDeletes)`
- **Indexes:**
  - `idx_users_org_email`: `[organization_id, email]`

### Table: `invoices`
- **Columns:**
  - `id`: `BIGINT UNSIGNED PRIMARY KEY`
  - `organization_id`: `BIGINT UNSIGNED NOT NULL, FOREIGN KEY -> organizations(id)`
  - `customer_id`: `BIGINT UNSIGNED NOT NULL, FOREIGN KEY -> customers(id) ON DELETE RESTRICT`
  - `invoice_number`: `VARCHAR(50) NOT NULL UNIQUE`
  - `total_cents`: `BIGINT NOT NULL (MoneyPHP minor units)`
  - `currency`: `CHAR(3) NOT NULL DEFAULT 'USD'`
  - `status`: `VARCHAR(30) NOT NULL DEFAULT 'draft'`
  - `created_at` / `updated_at`: `TIMESTAMP UTC`
