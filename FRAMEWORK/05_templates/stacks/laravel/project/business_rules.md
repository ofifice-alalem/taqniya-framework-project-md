# Global Business Rules & Domain Invariants — [PROJECT_NAME]

# 1. Ubiquitous Domain Terminology

| Domain Term | Canonical Definition | Forbidden Synonyms |
| :--- | :--- | :--- |
| `[ENTITY_1]` | `[Primary account holder]` | `[User, Buyer, Client]` |
| `[ENTITY_2]` | `[Finalized billing invoice]` | `[Bill, Receipt]` |

---

## 2. Core Business Invariants & Constraints

1. **[INVARIANT_01_NAME]:**
   - *Rule:* `[Statement of business invariant]`
   - *Enforcement:* `[Laravel Action & DB Foreign Key]`

2. **[MONETARY_RULE]:**
   - *Rule:* All monetary amounts must be calculated and persisted as integer minor units (cents/halalas) using `MoneyPHP` / `cknow/laravel-money`.
   - *Constraint:* PHP `float` data types are strictly prohibited in currency math.

3. **[TENANT_ISOLATION]:**
   - *Rule:* Queries must always scope by `organization_id` using Eloquent Global Scopes or Repository filters.
