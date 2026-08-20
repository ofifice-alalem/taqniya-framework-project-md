# Workflow: Project Initialization & Stack Resolution

# Purpose
This workflow defines the step-by-step process for onboarding a new or existing software repository into the Taqniya AI Development Framework. It establishes `stack.yaml` as the technology declaration entry point and scaffolds the `PROJECT/MD/` documentation structure.

# Scope
Executed during initial repository setup or when retrofitting an existing codebase with the Taqniya Framework.

---

## 1. Step-by-Step Initialization Protocol

```
STEP 1: Read Project Stack Configuration (PROJECT/stack.yaml)
   │
   ▼
STEP 2: Validate Stack Configuration (Syntax, structure, conflict detection)
   │
   ▼
STEP 3: Resolve Available Technology Profiles (from 06_stack_profiles/ or Core fallback)
   │
   ▼
STEP 4: Load Taqniya Core Principles (00_core/*)
   │
   ▼
STEP 5: Load Relevant Technology Profiles (e.g., backend/laravel/)
   │
   ▼
STEP 6: Scaffold & Populate Project MD (PROJECT/MD/* using 05_templates/)
   │
   ▼
STEP 7: Build Task-Specific AI Context (Ingest minimal sufficient context)
   │
   ▼
STEP 8: Start Project Work (Proceed with Phase 01 implementation)
```

---

## 2. Detailed Execution Guidelines

### Step 1: Read `stack.yaml`
- Check if `PROJECT/stack.yaml` exists.
- If missing, copy the template from `FRAMEWORK/05_templates/generic/project/stack.yaml` and populate it with the project's actual technologies.

### Step 2: Validate Stack Configuration
- Verify that required metadata (project name, type) is present.
- Check for conflicting configurations (e.g., conflicting runtime declarations).
- Apply the **"No Technology = No Assumption"** rule: do not invent defaults for omitted dimensions; prompt for clarification only if an omitted dimension is strictly required for the immediate task.

### Step 3: Resolve Technology Profiles
- Scan `FRAMEWORK/06_stack_profiles/` for matching dimensional profiles:
  - If a declared technology matches a profile (e.g., `backend.framework: "Laravel"` matches `06_stack_profiles/backend/laravel/`), mark it as active.
  - If no specialized profile exists (e.g., Svelte, Django, FastAPI, Go), activate the **Unknown Profile Protocol** (apply universal Core principles and report missing profile).

### Step 4 & 5: Ingest Core and Relevant Profiles
- Load mandatory invariants from `03_ai_protocol/mandatory_rules.md`.
- Load matching profile rules for the active development domain.

### Step 6: Scaffold `PROJECT/MD/` Structure
Create the project specification tree under `PROJECT/MD/`:
- Use `05_templates/stacks/{stack}/` if a specialized template bundle exists for your stack.
- Otherwise, use `05_templates/generic/` to scaffold:
  - `00_project/` (`project_context.md`, `business_rules.md`, `database.md`, `architecture_overrides.md`)
  - `01_project_design/` (`theme.md`, `brand.md`, `overrides.md`)
  - `02_project_structure/` (`backend.md`, `frontend.md`, `routes.md`, `permissions.md`)
  - `03_features/`
  - `04_implementation_phases/phase_01/`
  - `05_testing/`
  - `06_decisions/ADR/`
  - `07_change_log/`

### Step 7 & 8: Build Context and Begin Execution
- Load only task-relevant files into the AI context following `03_ai_protocol/context_loading.md`.
- Begin development according to Phase 01 deliverables.

# Verification
1. Confirm that `PROJECT/stack.yaml` exists, is valid, and reflects the project's chosen technologies.
2. Confirm that technology profile resolution succeeded (or handled unknown technologies gracefully).
3. Confirm that `PROJECT/MD/` was scaffolded and synchronized.
