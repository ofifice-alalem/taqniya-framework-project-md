# Laravel Coding Standards & PHP Hygiene

# Purpose
Establishes language-specific coding standards, static analysis benchmarks, and code formatting rules for Laravel projects.

---

## 1. PHP Standards & Type Safety
- **Strict Types Mandatory:** Every PHP file MUST start with `declare(strict_types=1);` immediately below the opening tag.
- **Explicit Return & Parameter Types:** All methods, functions, and closures MUST declare explicit parameter types and return types.
- **Native PHP 8.3 Features:**
  - Use Constructor Property Promotion for dependency injection.
  - Use native Enums backed by `string` or `int` for domain states.
  - Use match expressions instead of complex `switch` statements.
  - Use readonly properties or readonly classes for immutable DTOs and Value Objects.

---

## 2. Laravel Idioms & Clean Code
- **Laravel Pint:** All code MUST pass Laravel Pint formatting (`./vendor/bin/pint --test`).
- **Static Analysis (Larastan):** All code MUST pass Larastan / PHPStan analysis at Level 8 without baseline suppressions (`./vendor/bin/phpstan analyse`).
- **Avoid Global Helpers in Domain Code:** Prefer dependency injection or dedicated Facades over unimported global helpers where appropriate.
- **Laravel Collections:** Use Collection pipelines (`collect($items)->filter()->map()->values()`) for readable transformations, but prefer SQL-level filtering for large datasets.

---

## 3. Financial & Date Handling
- **Monetary Policy:** ALL monetary calculations MUST use `moneyphp/money` or `cknow/laravel-money`. Storing and calculating currency using PHP `float` is STRICTLY PROHIBITED.
- **Date Handling:** ALL date and time operations MUST use `Illuminate\Support\Carbon` or native PHP `DateTimeImmutable`. Explicitly handle timezones.

# Allowed
- Using Laravel Form Requests, API Resources, and Custom Casts.
- Creating Readonly DTOs for type-safe parameter transport.

# Forbidden
- Using `float` or `double` for currency math.
- Omitting `declare(strict_types=1);`.
- Leaving `dd()`, `dump()`, `ray()`, or `Log::debug()` artifacts in committed code.

# Verification
1. Run `./vendor/bin/pint --test`.
2. Run `./vendor/bin/phpstan analyse`.
3. Check that strict types and explicit return types are present on all modified files.
