# Laravel Database Standards & Eloquent Governance

# Purpose
Defines database design, Eloquent ORM conventions, migration safety, and query optimization rules for Laravel applications.

---

## 1. Schema & Migration Standards
- **Migration Naming:** Follow standard timestamped naming: `YYYY_MM_DD_HHMMSS_create_orders_table.php`.
- **Primary Keys:** Use `$table->id()` (unsigned BigInteger) or `$table->uuid('id')->primary()` / `$table->ulid('id')->primary()`.
- **Foreign Keys:** Use constrained foreign keys:
  ```php
  $table->foreignId('customer_id')
        ->constrained('customers')
        ->onDelete('restrict');
  ```
- **Reversible Migrations:** Every migration MUST implement both `up()` and `down()` methods cleanly.

---

## 2. Eloquent Performance & N+1 Prevention
- **Prevent Lazy Loading in Development:** Enable strict Eloquent mode in `AppServiceProvider`:
  ```php
  Model::preventLazyLoading(! $this->app->isProduction());
  Model::preventSilentlyDiscardingAttributes(! $this->app->isProduction());
  ```
- **Eager Loading:** Always eager load relationships (`with(['items', 'customer'])`) when serializing or looping over collections.
- **Pagination Required:** Use `paginate()` or `cursorPaginate()` for all list endpoints. Never call `->get()` or `->all()` without limits on unbounded tables.

---

## 3. Financial Columns Storage
- Store currency amounts in database columns as integer minor units (e.g., `BIGINT` for cents/halalas) using column name suffixes like `amount_cents` or `total_cents`.
- Pair currency columns with a 3-character ISO currency code column: `currency CHAR(3) DEFAULT 'USD'`.

# Allowed
- Using Spatie Query Builder (`QueryBuilder::for(Order::class)->allowedFilters(...)`) for standardized filtering.
- Using Eloquent Scopes and Custom Query Builders.

# Forbidden
- Executing unbounded `->all()` or `->get()` on production tables.
- Disabling Foreign Key checks in migrations (`DB::statement('SET FOREIGN_KEY_CHECKS=0')`).
- Unparameterized raw queries (`DB::raw("WHERE id = {$id}")`).

# Verification
1. Verify foreign key constraints exist on all foreign key columns.
2. Confirm `preventLazyLoading()` is enabled in development.
3. Check all query code for eager loading.
