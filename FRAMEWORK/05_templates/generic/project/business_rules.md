# Global Business Rules & Domain Invariants — [PROJECT_NAME]

# 1. Ubiquitous Domain Terminology

| Domain Term | Canonical Definition | Forbidden Synonyms |
| :--- | :--- | :--- |
| `[ENTITY_1]` | `[Canonical description of primary domain entity]` | `[Ambiguous synonyms]` |
| `[ENTITY_2]` | `[Canonical description of secondary domain entity]` | `[Ambiguous synonyms]` |
| `[ENTITY_3]` | `[Canonical description of transactional entity]` | `[Ambiguous synonyms]` |

---

## 2. Core Business Invariants & Constraints

1. **[INVARIANT_01_NAME]:**
   - *Rule Statement:* `[Statement of business invariant that must never be violated]`
   - *Enforcement Mechanism:* `[PROJECT_DEFINED (e.g., Domain validation | Application logic | Authorization policy | Storage constraint | Event invariant | External system rule)]`
   - *Exception / Error Handling:* `[Throws domain error | Returns failure response | Emits error event]`

2. **[INVARIANT_02_NAME]:**
   - *Rule Statement:* `[Statement of numerical, state, or calculation accuracy invariant]`
   - *Enforcement Mechanism:* `[PROJECT_DEFINED]`

3. **[INVARIANT_03_NAME]:**
   - *Rule Statement:* `[Statement of resource ownership or access boundary (where applicable)]`
   - *Enforcement Mechanism:* `[PROJECT_DEFINED]`

---

## 3. Financial, Calculation & Precision Rules *(If Applicable)*
- **Numeric Handling:** `[e.g., Decimal precision, integer minor units, or dedicated math types]`
- **Rounding Mode:** `[e.g., Half-Up / Banker's Rounding / Floor / Ceil]`
- **Calculation Sequence:** `[e.g., Subtotal -> Discounts -> Taxable Base -> Tax -> Total]`

---

## 4. Authorization & Permission Matrix *(If Applicable)*

| Role | Scope & Permissions | Key Restrictions |
| :--- | :--- | :--- |
| `[ADMIN_ROLE]` | `[System management and full operational access]` | `[Restricted from audit log deletion]` |
| `[OPERATOR_ROLE]` | `[Standard operational permissions]` | `[Restricted from administrative actions]` |
| `[VIEWER_ROLE]` | `[Read-only access to assigned resources]` | `[Cannot perform mutations]` |
