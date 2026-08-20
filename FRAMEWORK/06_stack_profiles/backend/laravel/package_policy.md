# Laravel Approved Package Policy & Ecosystem Governance

# Purpose
Defines the vetted, approved, and restricted packages within the Laravel ecosystem for projects adopting the Laravel Stack Profile.

---

## 1. Vetted & Approved Packages Catalog

### Core & Integration:
- `inertiajs/inertia-laravel`: Inertia.js server-side adapter.
- `tightenco/ziggy`: Named route generator for frontend JavaScript.

### Architecture & Repositories:
- `prettus/l5-repository`: Repository Pattern standard implementation.

### Authorization & Permissions:
- `spatie/laravel-permission`: Role & permission management.

### Query Building & Filtering:
- `spatie/laravel-query-builder`: Declarative API filtering and sorting.

### Financials & Calculations:
- `cknow/laravel-money` & `moneyphp/money`: Strictly enforced currency handling.

### Auditing & History:
- `owen-it/laravel-auditing`: Model audit trails.

### PDF & Excel Generation:
- `barryvdh/laravel-dompdf` / `dompdf/dompdf`: Standard PDF document rendering.
- `maatwebsite/excel` / `phpoffice/phpspreadsheet`: Excel import and export pipelines.

### Testing & Code Quality (require-dev):
- `pestphp/pest` & `pestphp/pest-plugin-laravel`: Pest testing suite.
- `mockery/mockery`: Object mocking.
- `brianium/paratest`: Parallel test runner.
- `nunomaduro/larastan` & `phpstan/phpstan`: Static type analysis.
- `barryvdh/laravel-ide-helper`: IDE auto-completion helper.
- `barryvdh/laravel-debugbar`: Local profiling and query debug.

---

## 2. Package Rules
- **MUST:** Place testing and development tools strictly inside `require-dev`.
- **MUST NOT:** Introduce external packages for basic string or array operations that native PHP or Laravel `Str`/`Arr` helpers already provide.
- **SHOULD:** Prefer official Spatie, Laravel, and Barryvdh packages over unverified third-party libraries.
