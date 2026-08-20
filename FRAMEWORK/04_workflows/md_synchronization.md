# Workflow: Semantic Project MD Synchronization

# Purpose
This workflow establishes the operational procedure for keeping `PROJECT/MD/` accurately synchronized with source code changes. It replaces mechanical file-type triggers with a **semantic impact-driven synchronization model** across all software and storage paradigms.

# Scope
Executed during coding sessions, pull request preparation, and feature implementation tasks.

---

## 1. The Semantic Impact Decision Flow

Documentation updates are driven strictly by **meaningful changes to specifications**, not merely by touched file extensions:

```
[ Code Change Detected ]
           │
           ▼
Did this change alter system behavior, data architecture, API/transport contracts,
business calculations, authorization rules, or architectural decisions?
           │
           ├─► YES ──► Follow the Semantic Synchronization Matrix below
           │
           └─► NO  ──► Documentation update is NOT required
                       (e.g., internal variable rename, cosmetic refactor, performance tweak)
```

---

## 2. Semantic Synchronization Matrix

| Semantic Impact Area | Trigger Condition | Target Documentation Authority |
| :--- | :--- | :--- |
| **Data Architecture Changes** | Added or modified entities, attributes, collections, relationships, constraints, or indexes. | `PROJECT/MD/data.md`<br>`PROJECT/MD/phases/<phase>/data.md` |
| **API & Transport Contracts** | Added or modified endpoints, commands, payload schemas, response structures, or status codes. | `PROJECT/MD/phases/<phase>/routes.md` |
| **Business Rules & Logic** | Altered domain formulas, discounts, tax rates, validation bounds, or state transitions. | `PROJECT/MD/business_rules.md`<br>`PROJECT/MD/phases/<phase>/backend.md` |
| **UI & Theme Tokens** | Changed color tokens, spacing scale, font sizes, or component styling rules. | `PROJECT/MD/design_rules.md`<br>`PROJECT/MD/phases/<phase>/frontend.md` |
| **Dependencies & Stack** | Added or updated third-party frameworks, engines, or stack libraries. | `PROJECT/MD/stack.yaml`<br>`PROJECT/MD/business_rules.md` |
| **Phase / Task Completed** | Completed an operational phase deliverable or milestone. | `PROJECT/MD/phases/<phase>/README.md`<br>`PROJECT/MD/README.md` |

---

## 3. Storage Paradigm Data Representation

When updating Data Architecture documentation in `PROJECT/MD/data.md` or `PROJECT/MD/phases/<phase>/data.md`, the exact representation reflects the project's active storage technology:

- **Relational / SQL:** Tables, columns, data types, primary keys, foreign constraints, indexes, and migrations.
- **Document / NoSQL:** Collections, document structures, embedded schemas, validation rules, and collection indexes.
- **Graph Databases:** Node labels, properties, relationship types, edge directions, and graph indexes.
- **Key-Value Stores:** Key namespaces, value serialization formats, TTL expirations, and partition keys.
- **Cloud-Native / Stateless:** Event schemas, message payloads, and persistence adapters.

---

## 4. Step-by-Step Synchronization Procedure

1. **Inspect Semantic Delta:** Review your git diff to identify any changes that alter specifications.
2. **Apply Structured Updates:** Update the target markdown files under `PROJECT/MD/` with exact signatures, schemas, types, and constraints.
3. **Update Phase Status:** In the active `PROJECT/MD/phases/phase_*/README.md`, update status and deliverables.
4. **Consult AI Prompts:** Use `PROJECT/MD/prompts/Module_Review.md` or `Phase_Review.md` to audit project state consistency.
5. **Atomic Commit:** Commit source code and documentation updates in the same git commit.

# Verification
1. Confirm that all semantic specification changes are reflected in `PROJECT/MD/`.
2. Confirm that routine internal refactors without behavioral changes did not trigger redundant documentation edits.
3. Confirm that phase files in `PROJECT/MD/phases/` reflect the exact updated state.
