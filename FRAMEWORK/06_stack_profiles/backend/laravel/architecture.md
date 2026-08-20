# Laravel Architecture & Layered Boundaries

# Purpose
Enforces a strict, maintainable Layered Architecture for Laravel applications, ensuring thin controllers, isolated business logic, and structured data access.

---

## 1. Application Layer Flow

```
[ Incoming HTTP Request / Inertia Request ]
                   │
                   ▼
┌────────────────────────────────────────────────────────┐
│ 1. Routing & Middleware Layer                          │
│    (routes/web.php, routes/api.php, Auth Middleware)   │
└──────────────────┬─────────────────────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────────────────────┐
│ 2. Form Request / Validation Layer                     │
│    (app/Http/Requests/*StoreRequest.php)               │
└──────────────────┬─────────────────────────────────────┘
                   │ Passes validated DTO / array
                   ▼
┌────────────────────────────────────────────────────────┐
│ 3. Presentation Layer (Thin Controllers)               │
│    (app/Http/Controllers/*Controller.php)              │
└──────────────────┬─────────────────────────────────────┘
                   │ Invokes Action / Service
                   ▼
┌────────────────────────────────────────────────────────┐
│ 4. Domain & Application Layer (Actions / Services)     │
│    (app/Actions/*, app/Services/*)                     │
└──────────────────┬─────────────────────────────────────┘
                   │ Queries / Persists via
                   ▼
┌────────────────────────────────────────────────────────┐
│ 5. Data Access Layer (Repositories & Query Builders)   │
│    (app/Repositories/*, spatie/laravel-query-builder)  │
└──────────────────┬─────────────────────────────────────┘
                   │ Reads / Writes
                   ▼
┌────────────────────────────────────────────────────────┐
│ 6. Eloquent Models & Database Schema                   │
│    (app/Models/*, database/migrations/*)               │
└────────────────────────────────────────────────────────┘
```

---

## 2. Layer Rules & Conventions

### A. Controllers (`app/Http/Controllers/`)
- **MUST:** Remain thin (orchestration only).
- **MUST:** Delegate validation to Form Requests.
- **MUST:** Delegate business logic and multi-table mutations to Action or Service classes.
- **MUST NOT:** Execute direct database queries (`DB::table()`, raw SQL) or complex Eloquent query chains directly inside Controller methods.
- **SHOULD:** Return Inertia responses (`Inertia::render()`) or API Resource responses (`JsonResource`).

### B. Form Requests (`app/Http/Requests/`)
- **MUST:** Encapsulate all incoming validation rules and authorization checks (`authorize()` method).
- **SHOULD:** Provide helper methods to return typed DTOs (e.g., `$request->toDTO()`).

### C. Actions & Domain Services (`app/Actions/`, `app/Services/`)
- **MUST:** Contain core business logic, status transitions, and formula calculations.
- **MUST:** Wrap multi-table database operations in `DB::transaction()`.
- **SHOULD:** Prefer single-purpose Action classes (`CreateOrderAction`, `ApproveInvoiceAction`) over massive multi-thousand-line monolithic services.
- **SHOULD:** Dispatch Domain Events (`OrderCreatedEvent`, `InvoicePaidEvent`) for asynchronous side effects (emails, notifications).

### D. Repositories (`app/Repositories/`)
- **MUST:** Handle data querying, filtering, and persistence mechanics.
- **MUST:** Define explicit interface contracts (`app/Repositories/Contracts/*Interface.php`).
- **MUST NOT:** Contain business decision logic (e.g., checking user eligibility for a discount).

### E. Eloquent Models (`app/Models/`)
- **MUST:** Define explicit `$fillable` or `$guarded` properties.
- **MUST:** Define typed relationships (`belongsTo`, `hasMany`, `belongsToMany`).
- **MUST:** Use Attribute Casts (`protected function casts(): array`) for dates, enums, JSON, and encrypted fields.
- **SHOULD:** Keep models focused on schema relationships and simple local scopes (`scopeActive()`).

# Verification
1. Verify that controllers contain no database queries or business calculations.
2. Confirm that all incoming mutations are validated using Form Request classes.
3. Check that multi-table operations use `DB::transaction()`.
