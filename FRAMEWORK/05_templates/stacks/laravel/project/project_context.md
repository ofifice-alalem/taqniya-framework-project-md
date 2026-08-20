# Project Context & Technology Stack — [PROJECT_NAME]

# 1. Project Overview
- **Project Name:** `[PROJECT_NAME]`
- **Domain / Industry:** `[DOMAIN_INDUSTRY]`
- **Purpose & Vision:** `[BRIEF_PROJECT_PURPOSE]`
- **Repository URL:** `[GIT_REPOSITORY_URL]`

---

## 2. Technology Stack & Profile Declaration

- **Active Backend Profile:** `06_stack_profiles/backend/laravel/`
- **Backend Runtime & Framework:** PHP 8.3 / Laravel 11.x
- **Frontend Architecture:** Inertia.js + React 18 / Vue 3 (with Vite)
- **Primary Database:** PostgreSQL 16 / MySQL 8.0
- **Caching & Queue:** Redis 7.2 (Laravel Horizon)
- **Testing Ecosystem:** Pest PHP v3 + Mockery + Paratest
- **Package Manager:** Composer 2.7+ & pnpm
- **Static Analysis & Linters:** Larastan (Level 8) & Laravel Pint

---

## 3. Key Laravel Architectural Rules
- **Thin Controllers:** Controllers delegate validation to Form Requests and operations to Actions.
- **Repository Pattern:** Repositories handle data access via interfaces.
- **Financial Policy:** All currency calculations strictly handled via `moneyphp/money` (zero float arithmetic).
- **Security & Authorization:** Spatie Permissions + Laravel Policies + Multi-tenant organization scoping on all queries.
