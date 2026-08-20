# Laravel Feature Database Schema: [FEATURE_NAME]

# 1. Migration Specification

- **Migration File:** `database/migrations/YYYY_MM_DD_HHMMSS_create_[TABLE_NAME]_table.php`

```php
Schema::create('[TABLE_NAME]', function (Blueprint $table) {
    $table->id();
    $table->foreignId('organization_id')->constrained()->onDelete('restrict');
    $table->foreignId('customer_id')->constrained()->onDelete('restrict');
    $table->string('order_number')->unique();
    $table->bigInteger('total_cents');
    $table->char('currency', 3)->default('USD');
    $table->string('status')->default('draft');
    $table->timestamps();
    $table->softDeletes();

    $table->index(['organization_id', 'status']);
});
```
