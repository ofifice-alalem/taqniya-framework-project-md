# Runtime Specification: Task Context Resolution Protocol

# Purpose
This document establishes the **Task-Driven Context Loading Algorithm** powered by **Multi-Dimensional Task Impact Analysis**. It guarantees that Antigravity loads ONLY the minimal, relevant union of Core rules, Technology Profiles, and Project MD specifications required for the active task, completely eliminating context window pollution and prompt bloat.

---

## 1. The Core Principle: "Task Impact Analysis, Never Repository-Driven"

```
❌ WRONG (Repository-Driven Context Bloat):
Load all 00_core/ + all 01_design_system/ + all 06_stack_profiles/ + all PROJECT/MD/

✅ CORRECT (Multi-Dimensional Task Impact Analysis):
User Prompt
    │
    ▼
[ Task Impact Analysis ]
    │
    ├─► 1. Primary Domain: (e.g., Domain Logic)
    ├─► 2. Affected Dimensions: (e.g., Backend + Storage + Security + Testing)
    │
    ▼
[ Dynamic Context Assembly ]
    │
    ├─► Load Union of Core Rules (architecture + storage + security + testing)
    ├─► Load Union of Active Profiles (e.g., backend/{tech} + database/{tech} + testing/{tech})
    └─► Load Union of Target MD Specs (business_rules.md + data.md + acceptance_criteria.md)
```

---

## 2. Multi-Dimensional Impact Matrix

A task may touch a single focused area or span multiple dimensions. Antigravity calculates the union of required authorities:

| Task Dimension | Trigger Criteria | Core Rules to Include | Profile Files to Include | Project MD Specs to Include |
| :--- | :--- | :--- | :--- | :--- |
| **UI & Styling** | Modifying visual views, styles, or interactive UI components. | `00_core/coding_rules.md`<br>`01_design_system/*` | `frontend/{tech}/*`<br>`styling/{tech}/*` | `01_project_design/theme.md`<br>Feature `interfaces.md` |
| **Domain Logic** | Modifying business formulas, invariants, state transitions. | `00_core/coding_rules.md`<br>`00_core/architecture.md` | `backend/{tech}/architecture.md`<br>`backend/{tech}/coding_rules.md` | `00_project/business_rules.md`<br>Feature `business_rules.md` |
| **Data & Storage** | Adding/modifying entities, collections, migrations, or queries. | `00_core/database_rules.md`<br>`00_core/coding_rules.md` | `backend/{tech}/database.md`<br>`database/{tech}/*` | `00_project/database.md`<br>Feature `data.md` |
| **Security & Auth** | Modifying permissions, policies, auth guards, or access checks. | `00_core/security_rules.md`<br>`00_core/coding_rules.md` | `backend/{tech}/security.md` | `02_project_structure/permissions.md`<br>Feature `acceptance_criteria.md` |
| **Testing & QA** | Authoring or updating automated test suites or regression tests. | `02_testing/*` | `testing/{tech}/*`<br>`backend/{tech}/testing.md` | Feature `acceptance_criteria.md`<br>`05_testing/test_cases.md` |
| **Architecture** | Changing module boundaries, adopting packages, or refactoring. | `00_core/architecture.md`<br>`00_core/package_policy.md` | `backend/{tech}/architecture.md` | `00_project/architecture_overrides.md`<br>`06_decisions/ADR/*` |

---

## 3. Non-Binding Illustrative Example: Multi-Dimensional Task

> **Note:** The scenario and technology names below are purely illustrative examples demonstrating how the union of authorities is computed.

### Example Scenario: *"Add invoice creation and calculation feature"*
*(Assuming a project declared with a backend service and relational storage)*

1. **Impact Analysis Calculation:**
   - **Primary Domain:** Domain Logic (Calculation formulas & invariants)
   - **Affected Dimensions:** Backend + Storage + Security (Access controls) + Testing (Automated verification)
2. **Context Resolution (Union of Required Authorities):**
   - **Core Rules:** `00_core/architecture.md`, `00_core/database_rules.md`, `00_core/security_rules.md`, `02_testing/*`
   - **Active Profiles:** `06_stack_profiles/backend/{declared_backend}/`, `06_stack_profiles/database/{declared_database}/`
   - **Project MD:** `PROJECT/MD/00_project/business_rules.md`, `database.md`, and feature `requirements.md` / `data.md` / `acceptance_criteria.md`
   - **Explicitly Excluded (Omitted):** `01_design_system/*` (No UI involved in backend calculation engine), frontend styling profiles.

---

## 4. Execution Invariants
- **MUST NOT:** Never load documentation or profiles for untouched dimensions (e.g., omitting database rules when styling buttons).
- **MUST:** Dynamic context loading occurs per task, keeping prompt tokens minimal and AI reasoning laser-focused.
