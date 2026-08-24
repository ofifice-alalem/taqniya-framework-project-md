# Runtime Specification: Task Context Resolution Protocol

# Purpose
This document establishes the **Task-Driven Context Loading Algorithm** powered by **Multi-Dimensional Task Impact Analysis**. It guarantees that the AI loads ONLY the minimal, relevant union of Core rules, Technology Profiles, and Project MD specifications required for the active task, completely eliminating context window pollution and prompt bloat.

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
    └─► Load Union of Target MD Specs (business_rules.md + data.md + phases/<target_phase>/*)
```

---

## 2. Multi-Dimensional Impact Matrix

A task may touch a single focused area or span multiple dimensions. The AI agent calculates the union of required authorities:

| Task Dimension | Trigger Criteria | Core Rules to Include | Profile Files to Include | Project MD Specs to Include |
| :--- | :--- | :--- | :--- | :--- |
| **UI & Styling** | Modifying visual views, styles, client state, or interactive UI components. | `00_core/coding_rules.md`<br>`01_design_system/*` | `frontend/common/*`<br>`frontend/{tech}/*`<br>`styling/{tech}/*` | `PROJECT/MD/frontend_capabilities.yaml`<br>`PROJECT/MD/design_rules.md`<br>`phases/<phase>/frontend.md` |
| **Domain Logic** | Modifying business formulas, invariants, state transitions. | `00_core/coding_rules.md`<br>`00_core/architecture.md` | `backend/{tech}/architecture.md`<br>`backend/{tech}/coding_rules.md` | `PROJECT/MD/business_rules.md`<br>`phases/<phase>/backend.md` |
| **Data & Storage** | Adding/modifying entities, collections, migrations, or queries. | `00_core/database_rules.md`<br>`00_core/coding_rules.md` | `backend/{tech}/database.md`<br>`database/{tech}/*` | `PROJECT/MD/data.md`<br>`phases/<phase>/data.md` |
| **Security & Auth** | Modifying permissions, policies, auth guards, or access checks. | `00_core/security_rules.md`<br>`00_core/coding_rules.md` | `backend/{tech}/security.md` | `PROJECT/MD/business_rules.md`<br>`phases/<phase>/routes.md` |
| **Testing & QA** | Authoring or updating automated test suites or regression tests. | `02_testing/*` | `testing/{tech}/*`<br>`backend/{tech}/testing.md` | `PROJECT/MD/stack.yaml`<br>`phases/<phase>/README.md` |
| **Architecture** | Changing module boundaries, adopting packages, or refactoring. | `00_core/architecture.md`<br>`00_core/package_policy.md` | `backend/{tech}/architecture.md` | `PROJECT/MD/stack.yaml`<br>`PROJECT/MD/business_rules.md` |

---

## 3. Non-Binding Illustrative Example: Multi-Dimensional Task

### Example Scenario: *"Add invoice creation and calculation feature"*
*(Assuming a project declared with a backend service and relational storage)*

1. **Impact Analysis Calculation:**
   - **Primary Domain:** Domain Logic (Calculation formulas & invariants)
   - **Affected Dimensions:** Backend + Storage + Security (Access controls) + Testing (Automated verification)
2. **Context Resolution (Union of Required Authorities):**
   - **Core Rules:** `00_core/architecture.md`, `00_core/database_rules.md`, `00_core/security_rules.md`, `02_testing/*`
   - **Active Profiles:** `06_stack_profiles/backend/{declared_backend}/`, `06_stack_profiles/database/{declared_database}/`
   - **Project MD:** `PROJECT/MD/stack.yaml`, `PROJECT/MD/business_rules.md`, `PROJECT/MD/data.md`, and target `phases/<phase_name>/{backend.md, data.md}`
   - **Explicitly Excluded (Omitted):** `01_design_system/*` (No UI involved in backend calculation engine), frontend styling profiles.

---

## 4. Execution Invariants
- **MUST NOT:** Never load documentation or profiles for untouched dimensions (e.g., omitting database rules when styling buttons).
- **MUST:** Dynamic context loading occurs per task, keeping prompt tokens minimal and AI reasoning laser-focused.
