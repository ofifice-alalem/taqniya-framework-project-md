# Workflow: Post-Implementation Documentation Update

# Purpose
This workflow defines the semantic procedure for documenting completed features, bug fixes, refactors, and architectural updates. It ensures consistent, structured, and auditable records across the codebase without updating unrelated documentation.

# Scope
Executed immediately following code implementation and prior to marking any development task as complete.

---

## 1. The Semantic Impact Documentation Flow

Documentation updates are driven strictly by **meaningful specification changes**, updating only the specific Project MD authority affected:

```
[ Implementation Change Completed ]
                 │
                 ▼
Did system behavior, data structures, contracts, or specifications change?
                 │
                 ├─► YES ──► Identify Affected Project MD Authority
                 │           (Update ONLY the relevant specification files)
                 │
                 └─► NO  ──► Documentation update NOT required
                             (e.g., cosmetic refactor, internal variable rename)
                 │
                 ▼
[ Update Active Phase Documentation in PROJECT/MD/phases/<phase>/ ]
```

---

## 2. Affected Specification Authority Matrix

| Affected Area | Potential Trigger Conditions | Target Documentation to Update |
| :--- | :--- | :--- |
| **Business Rules** | Altered domain invariants, calculation formulas, validation limits, state machines. | `PROJECT/MD/business_rules.md`<br>`PROJECT/MD/phases/<phase>/backend.md` |
| **Data Architecture** | Added/modified entities, collections, tables, fields, schemas, or indexes. | `PROJECT/MD/data.md`<br>`PROJECT/MD/phases/<phase>/data.md` |
| **API & Transport Contracts** | Added/modified endpoints, commands, payload schemas, response structures. | `PROJECT/MD/phases/<phase>/routes.md` |
| **UI & Theme** | Altered design tokens, styling rules, interactive components, responsive behaviors. | `PROJECT/MD/design_rules.md`<br>`PROJECT/MD/phases/<phase>/frontend.md` |
| **Architecture & Stack** | Modified stack dependencies, frameworks, libraries or hosting configuration. | `PROJECT/MD/stack.yaml`<br>`PROJECT/MD/business_rules.md` |
| **Phase Scope & Status** | Completed phase goals, updated phase requirements or deliverables. | `PROJECT/MD/phases/<phase>/README.md`<br>`PROJECT/MD/README.md` |

---

## 3. Step-by-Step Update Procedure

1. **Evaluate Semantic Impact:** Inspect the git diff to identify which specifications (if any) changed.
2. **Update Targeted Authorities:** Apply precise updates directly to the affected markdown files in `PROJECT/MD/`. Do not modify unrelated files.
3. **Update Phase Deliverables (If Phase Task):** Update status and completed items in `PROJECT/MD/phases/<phase_name>/README.md`.
4. **Use Review Prompts (If Needed):** Execute `PROJECT/MD/prompts/Phase_Review.md` or `Module_Review.md` to verify documentation completeness.

# Verification
1. Confirm that all semantic specification changes are reflected in their respective Project MD authorities.
2. Confirm that unrelated documentation files were NOT modified.
3. Confirm that phase documentation in `PROJECT/MD/phases/` is updated.
