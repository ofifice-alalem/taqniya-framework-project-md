# Laravel Phase [PHASE_NUMBER] Operational Checklist

# 1. Database & Migrations
- [ ] Write migration files with `$table->foreignId()->constrained()`.
- [ ] Verify `php artisan migrate` and `php artisan migrate:rollback`.
- [ ] Synchronize `00_project/database.md`.

---

## 2. Backend Architecture
- [ ] Create Form Requests with strict validation.
- [ ] Create single-purpose Actions (`app/Actions/*`).
- [ ] Implement Repository interfaces (`app/Repositories/*`).
- [ ] Implement Thin Controller.
- [ ] Register routes in `routes/api.php` or `routes/web.php`.

---

## 3. Frontend & Inertia
- [ ] Create Inertia Views in `resources/js/Pages/*`.
- [ ] Apply design tokens and verify 8 interactive states.

---

## 4. Quality & Testing
- [ ] Write Pest tests in `tests/Feature/*`.
- [ ] `php artisan test` passes 100%.
- [ ] `vendor/bin/phpstan analyse` passes at Level 8.
- [ ] `vendor/bin/pint --test` passes.
- [ ] Update `07_change_log/changes.md`.
