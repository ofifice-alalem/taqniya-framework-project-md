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
[ Update Active Phase Checklist & Log Entry in changes.md ]
```

---

## 2. Affected Specification Authority Matrix

| Affected Area | Potential Trigger Conditions | Target Documentation to Update |
| :--- | :--- | :--- |
| **Business Rules** | Altered domain invariants, calculation formulas, validation limits, state machines. | `PROJECT/MD/00_project/business_rules.md`<br>Feature `business_rules.md` |
| **Data Architecture** | Added/modified entities, collections, tables, fields, schemas, or indexes. | `PROJECT/MD/00_project/database.md`<br>Feature `data.md` / `database.md` |
| **API & Transport Contracts** | Added/modified endpoints, commands, payload schemas, response structures. | `PROJECT/MD/02_project_structure/routes.md`<br>Feature `interfaces.md` / `routes.md` |
| **UI & Theme** | Altered design tokens, styling rules, interactive components, responsive behaviors. | `PROJECT/MD/01_project_design/theme.md`<br>Feature `interfaces.md` / `frontend.md` |
| **Architecture & Structure** | Modified module boundaries, dependency flow, new component categories. | `PROJECT/MD/00_project/architecture_overrides.md`<br>`02_project_structure/*` |
| **Security & Permissions** | Changed auth strategies, role permissions, token lifespans, sanitization rules. | `PROJECT/MD/02_project_structure/permissions.md` |
| **Configuration & Infra** | Changed environment parameters, deployment definitions, container settings. | `PROJECT/MD/00_project/project_context.md`<br>`PROJECT/stack.yaml` |
| **Technical Decisions** | Adopted a new library, altered fundamental architectural design. | `PROJECT/MD/06_decisions/ADR/` |

---

## 3. Step-by-Step Update Procedure

1. **Evaluate Semantic Impact:** Inspect the git diff to identify which specifications (if any) changed.
2. **Update Targeted Authorities:** Apply precise updates directly to the affected markdown files. Do not modify unrelated files.
3. **Update Feature Acceptance Criteria (If Feature Task):** Mark completed scenarios as verified with references to the passing test suite.
4. **Update Phase Checklist (If Phase Task):** Mark completed items from `[ ]` to `[x]` in `04_implementation_phases/phase_{N}/checklist.md`.
5. **Log Structured Change Entry:** Add an entry at the top of `PROJECT/MD/07_change_log/changes.md`:

```markdown
## [YYYY-MM-DD] - [Feature / Task / Bugfix Title]
- **Type:** [Feature | Bugfix | Refactor | Security | Data Architecture | Configuration]
- **Scope:** [Affected domain, module, or package]
- **Summary of Changes:**
  - [Concise description of code and behavior change]
- **Testing & Verification:**
  - [Summary of passing test suites and quality gates]
- **Documentation Updated:** [List of modified Project MD files]
```

# Verification
1. Confirm that all semantic specification changes are reflected in their respective Project MD authorities.
2. Confirm that unrelated documentation files were NOT modified.
3. Confirm that `changes.md` has the newest entry recorded at the top.
