# Laravel Stack Specification & Runtime Environment

# Purpose
Defines the baseline runtime, package manager, and tooling requirements for Laravel projects adopting the Taqniya Framework.

# Standards & Versions

## 1. Core Runtime & Framework
- **PHP Version:** PHP 8.2+ (Recommended: PHP 8.3+).
- **Framework Version:** Laravel 11.x (or modern LTS).
- **Web Server / Process Manager:** Nginx with PHP-FPM, or Laravel Octane (FrankenPHP / Swoole) for high-concurrency environments.
- **Queue Worker:** Laravel Queue Worker with Redis driver (or Laravel Horizon).

## 2. Frontend Integration
- **Default Frontend Stack:** Inertia.js (React 18+ or Vue 3+) with Vite bundler.
- **Alternative Stacks:** Blade + Alpine.js + Tailwind CSS, or Headless REST/GraphQL API.

## 3. Tooling & Ecosystem
- **Package Manager:** Composer 2.7+.
- **Frontend Asset Manager:** npm / pnpm / yarn.
- **Code Style:** Laravel Pint (`preset: laravel`).
- **Static Analysis:** Larastan / PHPStan (Target Level: 8).
- **IDE Support:** `barryvdh/laravel-ide-helper` (dev only).

# Rules
- **MUST:** Pin exact PHP and Laravel versions in `composer.json`.
- **MUST:** Commit `composer.lock` and `package-lock.json` / `pnpm-lock.yaml` to source control.
- **SHOULD:** Utilize Laravel Sail or Docker Compose for consistent local development environments.
