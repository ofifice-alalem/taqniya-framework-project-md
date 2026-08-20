# Laravel Stack Profile — Taqniya AI Development Framework

# Purpose
This profile establishes the technology-specific architectural, coding, database, security, and testing standards for applications built on the **Laravel** ecosystem. It specializes the global Taqniya Framework standards for modern Laravel development.

# Scope
Applies to all repositories where `PROJECT/MD/00_project/project_context.md` declares Laravel as the primary backend framework.

---

## 1. Role in the Taqniya Hierarchy

```
    Taqniya Core (00_core/*)
          │  (Universal principles: layered architecture, security, clean code)
          ▼
    Laravel Backend Profile (06_stack_profiles/backend/laravel/*)
          │  (Laravel idioms: Form Requests, Actions, Repositories, Eloquent, Pest)
          ▼
    Project MD (PROJECT/MD/*)
          │  (Domain business rules, project entities, routes, theme)
          ▼
    Source Code (app/*, routes/*, database/*)
```

---

## 2. Profile Documents & Responsibilities

| Document | Responsibility |
| :--- | :--- |
| **[`stack.md`](stack.md)** | Baseline runtime requirements (PHP 8.3+, Laravel 11, Composer, Vite). |
| **[`architecture.md`](architecture.md)** | Strict Layered Architecture (Thin Controllers -> Actions -> Repositories -> Models). |
| **[`coding_rules.md`](coding_rules.md)** | PHP standards, strict types (`declare(strict_types=1);`), Pint, Larastan Level 8. |
| **[`database.md`](database.md)** | Eloquent conventions, migrations, eager loading, and MoneyPHP integration. |
| **[`security.md`](security.md)** | Sanctum auth, Form Request validation, Policies & Gates, IDOR prevention. |
| **[`testing.md`](testing.md)** | Pest PHP testing suite, Mockery, RefreshDatabase, and Feature test standards. |
| **[`package_policy.md`](package_policy.md)** | Approved Laravel ecosystem packages (Spatie, Prettus, MoneyPHP, DomPDF). |

---

## 3. How to Activate This Profile
In the project's `PROJECT/stack.yaml`, specify:
```yaml
backend:
  framework:
    name: "Laravel"
    version: "11.x"
```
Or in `PROJECT/MD/00_project/project_context.md`, specify:
```markdown
- **Active Backend Profile:** `06_stack_profiles/backend/laravel/`
```
When this profile is declared, AI agents and engineers MUST respect both the global Taqniya core rules and the specialized rules in this profile.
