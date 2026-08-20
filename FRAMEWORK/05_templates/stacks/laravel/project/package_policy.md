# Approved Packages & Ecosystem Standards — [PROJECT_NAME]

# 1. Approved Packages
- **Architecture:** `prettus/l5-repository`
- **Permissions:** `spatie/laravel-permission`
- **Query Builder:** `spatie/laravel-query-builder`
- **Money:** `cknow/laravel-money` & `moneyphp/money`
- **Audit Trails:** `owen-it/laravel-auditing`
- **PDF & Excel:** `barryvdh/laravel-dompdf`, `maatwebsite/excel`
- **Testing (Dev):** `pestphp/pest`, `pestphp/pest-plugin-laravel`, `mockery/mockery`, `brianium/paratest`
- **Code Quality (Dev):** `nunomaduro/larastan`, `barryvdh/laravel-ide-helper`

# 2. Package Rules
- Testing tools MUST be placed strictly inside `require-dev`.
- External packages require evaluation against `00_core/package_policy.md` before installation.
