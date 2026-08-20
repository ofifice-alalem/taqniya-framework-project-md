# Runtime Specification: Stack Resolution Protocol

# Purpose
This document specifies how Antigravity reads, validates, and extracts technology choices from `PROJECT/MD/stack.yaml`. It governs how declared technology dimensions are interpreted without making unverified assumptions.

---

## 1. Multi-Dimensional Technology Architecture

The Stack Resolution Protocol inspects `PROJECT/MD/stack.yaml` and extracts independent top-level dimensions:

```
[ PROJECT/MD/stack.yaml ]
         │
         ├──► 1. Project Metadata (name, type, environment)
         ├──► 2. Frontend (framework, language, styling, state_management, component_library)
         ├──► 3. Backend (framework, language, architecture)
         ├──► 4. Database & Storage (main, orm)
         ├──► 5. Cache (driver)
         ├──► 6. API & Transport (type, format)
         ├──► 7. Authentication & Security (type, library)
         ├──► 8. Automated Testing (unit, e2e)
         └──► 9. Build & Deployment (container, ci_cd, hosting)
```

---

## 2. The Invariant: "NO TECHNOLOGY = NO ASSUMPTION"

1. **Zero Silent Defaults:** If a dimension is omitted from `PROJECT/MD/stack.yaml` (e.g., `frontend` or `database` is omitted), Taqniya MUST NOT assume a default technology.
2. **Dimension Decoupling:** Declared technologies in one dimension do not imply tools in another:
   - Declaring `backend.framework: Laravel 11` does NOT imply Blade, Inertia, or MySQL.
   - Declaring `frontend.framework: React 18` does NOT imply a Node.js backend or Tailwind styling.
   - Declaring `database.main: PostgreSQL 16` does NOT imply relational ORMs over raw queries.

---

## 3. The 7-Step Deterministic Stack Resolution Sequence

When executing any task, Antigravity executes this deterministic sequence:

1. **Read Configuration:** Read `PROJECT/MD/stack.yaml` from the project directory.
2. **Parse Declared Dimensions:** Extract all specified tools, libraries, and single canonical technology declarations.
3. **Determine Task-Relevant Dimensions:** Cross-reference the active prompt against Task Impact Analysis to identify which dimensions are affected.
4. **Detect Missing Required Dimensions:** Check if any dimension required for the active task is omitted from `PROJECT/MD/stack.yaml`.
5. **Conditional Clarification:**
   - **IF** a missing dimension is strictly required to implement the current task safely ➔ Pause and prompt the user for clarification.
   - **IF** a missing dimension is irrelevant to the active task ➔ Proceed safely without asking.
6. **Zero Guessing:** Never guess, assume, or hallucinate an unspecified technology.
7. **Ignore Irrelevant Omissions:** Never block task execution or interrupt the user for missing dimensions that do not impact the immediate deliverable.

### Concrete Clarification Scenarios:

| Active Task | Missing Dimension in `PROJECT/MD/stack.yaml` | Resolution Action |
| :--- | :--- | :--- |
| *"Change button padding and focus ring"* | Database is omitted | **DO NOT ASK.** Database is irrelevant to UI styling. |
| *"Create database migration for subscriptions"* | Database is omitted | **ASK USER.** Cannot write migration without knowing storage engine/tool. |
| *"Implement JWT authentication middleware"* | Backend runtime is omitted | **ASK USER.** Cannot author middleware without knowing backend language/framework. |
| *"Update project README documentation"* | Frontend & Backend are omitted | **DO NOT ASK.** Documentation update proceeds without runtime dependencies. |

---

## 4. Stack Validation Rules

1. **Schema Integrity:** Verify standard YAML syntax with single canonical values.
2. **Version Resolution:** A version SHOULD be declared when version-specific behavior or compatibility matters. If the active task requires a specific version and it is unknown, request clarification.
3. **No Conflicting Declarations:** Check that declared tools do not directly conflict without explanation.
4. **Transparent Notification:** If a declared dependency appears invalid or deprecated, notify the user transparently without silently rewriting `PROJECT/MD/stack.yaml`.
