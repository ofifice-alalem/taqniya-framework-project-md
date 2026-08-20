# Laravel Testing Standards with Pest PHP

# Purpose
Defines the automated testing architecture, test conventions, and quality gates for Laravel projects using **Pest PHP** as the primary testing framework.

---

## 1. Primary Testing Stack
- **Test Runner:** **Pest PHP v3** (`pestphp/pest`, `pestphp/pest-plugin-laravel`).
- **Mocking:** Mockery & Pest Expectations (`expect()`).
- **Parallel Testing:** `brianium/paratest` / `php artisan test --parallel`.
- **Database Sandbox:** `Illuminate\Foundation\Testing\RefreshDatabase`.

---

## 2. Test Suite Structure

```text
tests/
├── Unit/                    # Pure unit tests (Actions, DTOs, calculations)
│   └── Billing/
│       └── TaxCalculatorTest.php
├── Feature/                 # Full HTTP lifecycle & Controller tests
│   ├── Orders/
│   │   ├── CreateOrderTest.php
│   │   └── UpdateOrderStatusTest.php
│   └── Security/
│       └── TenantIsolationTest.php
└── TestCase.php             # Base Laravel test case
```

---

## 3. Pest Testing Conventions & Examples

### A. Feature Test Example (HTTP & Permissions):
```php
<?php

declare(strict_types=1);

use App\Models\User;
use App\Models\Order;
use function Pest\Laravel\{actingAs, postJson, assertDatabaseHas};

it('allows authorized manager to create an order', function () {
    $user = User::factory()->manager()->create();
    $payload = [
        'customer_id' => 10,
        'items' => [
            ['product_id' => 1, 'quantity' => 2, 'unit_price_cents' => 5000],
        ],
    ];

    actingAs($user)
        ->postJson('/api/v1/orders', $payload)
        ->assertStatus(201)
        ->assertJsonPath('data.total_cents', 10000);

    assertDatabaseHas('orders', [
        'customer_id' => 10,
        'total_cents' => 10000,
    ]);
});
```

### B. Security / IDOR Test Example:
```php
it('prevents user from accessing orders belonging to another tenant', function () {
    $user = User::factory()->create(['organization_id' => 1]);
    $foreignOrder = Order::factory()->create(['organization_id' => 2]);

    actingAs($user)
        ->getJson("/api/v1/orders/{$foreignOrder->id}")
        ->assertStatus(403);
});
```

---

## 4. Test Execution & Quality Gates
- **Run Feature Tests:** `php artisan test --filter=[FeatureName]`
- **Run Full Suite in Parallel:** `php artisan test --parallel`
- **Requirement:** All task-related tests MUST pass. Any pre-existing unrelated failures MUST be reported rather than hidden.

# Verification
1. Run `php artisan test`.
2. Confirm tests follow Pest syntax and AAA structure.
3. Verify tenant authorization and boundary edge cases are covered.
