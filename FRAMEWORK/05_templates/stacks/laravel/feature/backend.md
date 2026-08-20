# Laravel Feature Backend Architecture: [FEATURE_NAME]

# 1. Classes & File Locations

- **Controller:** `app/Http/Controllers/[ENTITY]Controller.php`
- **Form Request:** `app/Http/Requests/[ENTITY]StoreRequest.php`
- **Action:** `app/Actions/[DOMAIN]/Create[ENTITY]Action.php`
- **Repository:** `app/Repositories/[ENTITY]Repository.php`
- **Repository Interface:** `app/Repositories/Contracts/[ENTITY]RepositoryInterface.php`
- **Model:** `app/Models/[ENTITY].php`
- **Policy:** `app/Policies/[ENTITY]Policy.php`

---

## 2. Implementation Rules
- Controller only handles validation delegation and responses (`return Inertia::render(...)` or `return new [RESOURCE]Resource(...)`).
- Transactions are managed inside Action classes with `DB::transaction()`.
