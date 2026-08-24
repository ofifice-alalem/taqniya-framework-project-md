# Workflow: Project Initialization & Stack Resolution

# Purpose
This workflow defines the step-by-step process for onboarding a new or existing software repository into the Taqniya AI Development Framework. It establishes `PROJECT/MD/stack.yaml` as the technology declaration entry point and scaffolds the standard `PROJECT/MD/` documentation structure.

# Scope
Executed during initial repository setup or when retrofitting an existing codebase with the Taqniya Framework.

---

## 1. Step-by-Step Initialization Protocol

```
STEP 1: Read Project Stack Configuration (PROJECT/MD/stack.yaml)
   │
   ▼
STEP 2: Validate Stack Configuration (Syntax, structure, single canonical declarations)
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
STEP 6: Scaffold & Populate Project MD (PROJECT/MD/*)
   │
   ▼
STEP 7: Build Task-Specific AI Context (Ingest minimal sufficient context)
   │
   ▼
STEP 8: Start Project Work (Proceed with Phase implementation)
```

---

## 2. Detailed Execution Guidelines

### Step 1: Read `PROJECT/MD/stack.yaml`
- Check if `PROJECT/MD/stack.yaml` exists.
- If missing, create `PROJECT/MD/stack.yaml` using canonical single technology declarations for frontend, backend, database, cache, API, authentication, testing, and deployment.

### Step 2: Validate Stack Configuration
- Verify that required metadata (project name, type) is present.
- Ensure values are single, unambiguous technology choices (e.g. `framework: "Laravel 11"`, NOT `framework: "Laravel 11 / Node.js Express"`).
- Apply the **"No Technology = No Assumption"** rule: do not invent defaults for omitted dimensions; prompt for clarification only if an omitted dimension is strictly required for the immediate task.

### Step 3: Resolve Technology Profiles & Configure Frontend Capabilities
- Scan `FRAMEWORK/06_stack_profiles/` for matching dimensional profiles:
  - If a declared technology matches a profile (e.g., `backend.name: "Laravel"` matches `06_stack_profiles/backend/laravel/`, `frontend.name: "React"` matches `06_stack_profiles/frontend/react/`), mark it as active.
  - If no specialized profile exists (e.g., Svelte, Django, FastAPI, Go), activate the **Unknown Profile Protocol** (apply universal Core principles and report missing profile).
- **Frontend Capability Selection:**
  - When `frontend:` is declared in `stack.yaml`, resolve the matching **Framework-Specific Recommended Baseline** from `FRAMEWORK/06_stack_profiles/frontend/common/capability_policy.md`:
    - `frontend.name: "React"` ➔ **React Recommended Baseline**
    - `frontend.name: "Vue"` ➔ **Vue Recommended Baseline**
    - `frontend.name: "Blade"` ➔ **Blade Recommended Baseline**
  - Prompt the developer: *"Do you want to adopt the Recommended Defaults baseline or Customize?"*
    - **Recommended Defaults:** Automatically populate `PROJECT/MD/frontend_capabilities.yaml` with the stack-specific baseline.
    - **Customize:** Present the 26 capabilities for the developer to set explicit states (`required`, `enabled`, `disabled`, `optional`).

### Step 4 & 5: Ingest Core and Relevant Profiles
- Load mandatory invariants from `03_ai_protocol/mandatory_rules.md`.
- Load matching profile rules and `frontend/common/capability_policy.md` for the active development domain.

### Step 6: Scaffold `PROJECT/MD/` Structure
Create the project specification tree under `PROJECT/MD/`:
```text
PROJECT/MD/
├── README.md                   (Overall project scope, overview, and state)
├── stack.yaml                  (Technology stack configuration)
├── frontend_capabilities.yaml  (Frontend engineering & performance policy decisions)
├── business_rules.md           (Global business logic and constraints)
├── data.md                     (Global data architecture & common entities)
├── design_rules.md             (Visual design tokens, typography & palette)
├── prompts/                    (AI Management & Review prompts)
│   ├── Project_Recovery.md
│   ├── Module_Review.md
│   ├── Phase_Review.md
│   └── phases_prompt.md
└── phases/                     (Functional phases tree)
    └── phase_00_sample/        (Standard phase template)
        ├── README.md
        ├── backend.md
        ├── frontend.md
        ├── routes.md
        └── data.md
```

### Step 7 & 8: Build Context and Begin Execution
- Load only task-relevant files into the AI context following `03_ai_protocol/context_loading.md`.
- Begin development according to Phase deliverables in `PROJECT/MD/phases/`.

# Verification
1. Confirm that `PROJECT/MD/stack.yaml` exists, is valid, and reflects the project's chosen technologies.
2. Confirm that technology profile resolution succeeded (or handled unknown technologies gracefully).
3. Confirm that `PROJECT/MD/` structure was scaffolded and synchronized.
