# Laravel Security Standards & Defense In Depth

# Purpose
Establishes Laravel-specific security configurations, authentication patterns, authorization gates, and data protection rules.

---

## 1. Authentication & API Tokens
- **Session Auth:** Use Laravel standard session driver with `HttpOnly`, `Secure`, and `SameSite=Lax` cookie attributes.
- **API Token Auth:** Use **Laravel Sanctum** (for SPAs, mobile apps, and lightweight tokens) or **Laravel Passport** (for OAuth2 servers).
- **Token Expiration:** Always set expiration limits on Sanctum personal access tokens in `config/sanctum.php`.

---

## 2. Authorization, Policies & Spatie Permissions
- **Server-Side Gate Enforcement:** Every mutating endpoint MUST be protected by a dedicated Policy (`app/Policies/*Policy.php`) or Gate:
  ```php
  $this->authorize('update', $order);
  // or via FormRequest:
  public function authorize(): bool {
      return $this->user()->can('update', $this->route('order'));
  }
  ```
- **Role-Based Access Control:** Use `spatie/laravel-permission` for managing roles, permissions, and guard scoping.
- **Tenant Scoping (IDOR Prevention):** Always scope queries to the authenticated tenant:
  ```php
  $order = $request->user()->currentOrganization->orders()->findOrFail($id);
  ```

---

## 3. Mass-Assignment & CSRF Protection
- **Mass Assignment:** Explicitly configure `$fillable` on all Eloquent models. Never use `$guarded = []` in production models.
- **CSRF Tokens:** All state-changing web routes (`POST`, `PUT`, `PATCH`, `DELETE`) must pass through Laravel's `ValidateCsrfToken` middleware.

# Allowed
- Using Laravel Gates, Policies, and Middleware.
- Using Sanctum abilities for granular API token authorization.

# Forbidden
- Modifying or accessing records using raw user-provided IDs without tenant verification.
- Disabling CSRF protection on standard browser endpoints without explicit authorization.

# Verification
1. Confirm authorization checks exist on all mutating controller methods.
2. Verify all models declare explicit `$fillable` arrays.
3. Check that API endpoints require valid Sanctum / Session authentication.
