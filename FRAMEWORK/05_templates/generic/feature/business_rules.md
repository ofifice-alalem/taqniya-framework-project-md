# Feature Business Rules & Invariants: [FEATURE_NAME]

# 1. Feature Domain Rules
1. **[RULE_01_IDENTIFIER]:**
   - *Rule Statement:* `[Clear statement of domain rule, formula, or constraint]`
   - *Enforcement Mechanism:* `[Domain validation | Application logic | Storage constraint | Event check]`
   - *Error Handling:* `[Error code / Exception thrown / Failure response returned]`

2. **[RULE_02_IDENTIFIER]:**
   - *Rule Statement:* `[Calculation formula, precision rule, or state transition constraint]`
   - *Condition / Constraint:* `[Boundary condition or prerequisite state]`

---

## 2. State Machine & Transitions *(If Applicable)*
```
[ INITIAL_STATE ] ──( Action / Event )──► [ INTERMEDIATE_STATE ] ──► [ FINAL_STATE ]
```
- **Allowed Transitions:** `[Explicit list of valid state movements]`
- **Forbidden Transitions:** `[Disallowed jumps and error handling]`

---

## 3. Authorization & Permissions *(If Applicable)*
- **Required Permission / Role:** `[Role or permission required to perform action]`
- **Ownership Scoping:** `[Contextual owner / tenant filter applied to operations]`
