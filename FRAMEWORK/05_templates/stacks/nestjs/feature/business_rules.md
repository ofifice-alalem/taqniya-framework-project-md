# NestJS Feature Business Rules: [FEATURE_NAME]

# 1. Domain Invariants & Rules
- **Rule 1:** `[SPECIFIC_BUSINESS_RULE_1]`
- **Rule 2:** `[SPECIFIC_BUSINESS_RULE_2]`

---

## 2. State Machine & Transitions
- `DRAFT` ➔ `ACTIVE` ➔ `ARCHIVED`
- Direct transitions from `DRAFT` to `ARCHIVED` are prohibited.

---

## 3. Forbidden Actions
- Modifying records in `ARCHIVED` state.
- Unauthorized cross-tenant or unassigned resource mutation.
