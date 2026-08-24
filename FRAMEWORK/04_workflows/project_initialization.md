# Workflow: Project Initialization & Stack Resolution

# Purpose
This workflow defines the step-by-step process for onboarding a new or existing software repository into the Taqniya AI Development Framework. It establishes the Tripartite Project Specification Model (`stack.yaml` + `frontend_capabilities.yaml` + `execution_engine.yaml`) and scaffolds the standard `PROJECT/MD/` documentation structure.

# Scope
Executed during initial repository setup or when retrofitting an existing codebase with the Taqniya Framework.

---

## 1. Step-by-Step Initialization Protocol

```text
STEP 1: Read Project Stack Configuration (PROJECT/MD/stack.yaml)
   │
   ▼
STEP 2: Validate Stack Configuration (Syntax, structure, single canonical declarations)
   │
   ▼
STEP 3: Resolve Technology Profiles (Match 06_stack_profiles/* or Core fallback)
   │
   ▼
STEP 4: Configure Frontend Capabilities (If frontend declared ➔ Recommended vs Customize)
   │
   ▼
STEP 5: Select Execution Engine (Read execution_engines.yaml catalog ➔ Write execution_engine.yaml)
   │
   ▼
STEP 6: Scaffold & Populate Project MD (PROJECT/MD/* Specifications)
   │
   ▼
STEP 7: Build Task-Specific Minimal Context (Lazy loading via Task Impact Analysis)
   │
   ▼
STEP 8: Verification & Phase Execution (Validate DoD & start Phase deliverables)
```

---

## 2. Detailed Execution Guidelines

### Step 1: Read `PROJECT/MD/stack.yaml`
- Check if `PROJECT/MD/stack.yaml` exists.
- If missing, create `PROJECT/MD/stack.yaml` declaring single canonical technology choices for frontend, backend, database, cache, API, authentication, testing, and deployment.

### Step 2: Validate Stack Configuration
- Verify that required metadata (project name, type) is present.
- Ensure values are single, unambiguous technology choices (e.g. `backend.name: "Laravel 11"`, NOT `backend.name: "Laravel 11 / Node.js Express"`).
- Apply the **"No Technology = No Assumption"** rule: do not invent defaults for omitted dimensions; prompt for clarification only if an omitted dimension is strictly required for the immediate task.

### Step 3: Resolve Technology Profiles
- Scan `FRAMEWORK/06_stack_profiles/` for matching dimensional profiles:
  - If a declared technology matches a profile (e.g., `backend.name: "Laravel"` matches `06_stack_profiles/backend/laravel/`, `frontend.name: "React"` matches `06_stack_profiles/frontend/react/`), mark it as active.
  - If no specialized profile exists (e.g., Svelte, Django, FastAPI, Go), activate the **Unknown Technology Protocol** (apply universal Core principles and report missing profile).

### Step 4: Configure Frontend Capabilities (If Frontend Declared)
- When `frontend:` is declared in `stack.yaml`:
  - Identify the matching **Framework-Specific Recommended Baseline** from `FRAMEWORK/06_stack_profiles/frontend/common/capability_policy.md`:
    - `frontend.name: "React"` ➔ **React Recommended Baseline**
    - `frontend.name: "Vue"` ➔ **Vue Recommended Baseline**
    - `frontend.name: "Blade"` ➔ **Blade Recommended Baseline**
  - Prompt the developer: *"Do you want to adopt the Recommended Defaults baseline or Customize?"*
    - **Recommended Defaults:** Populate `PROJECT/MD/frontend_capabilities.yaml` with the stack-specific baseline.
    - **Customize:** Present the 26 capabilities for the developer to set explicit states (`required`, `enabled`, `disabled`, `optional`).

### Step 5: Select Execution Engine
- Read the recognized engines from the canonical catalog [`FRAMEWORK/03_ai_protocol/runtime/execution_engines.yaml`](../03_ai_protocol/runtime/execution_engines.yaml).
- Prompt the developer to select their preferred execution engine (e.g., `superpowers`, `claude_code`, `antigravity`, `codex`, `custom`, or `native`).
- Generate `PROJECT/MD/execution_engine.yaml` based on the developer's choice. (If omitted, Taqniya defaults automatically to `native`).

### Step 6: Scaffold `PROJECT/MD/` Structure & Ingest Core Governance
- Load mandatory invariants from `03_ai_protocol/mandatory_rules.md`.
- Load matching profile rules, `frontend/common/capability_policy.md`, and `runtime/execution_engine.md`.
- Create the project specification tree under `PROJECT/MD/`:
```text
PROJECT/MD/
├── README.md                   (Overall project scope, overview, and state)
├── stack.yaml                  (Technology stack configuration)
├── frontend_capabilities.yaml  (Frontend engineering & performance policy decisions)
├── execution_engine.yaml       (Configured execution engine methodology)
├── business_rules.md           (Global business logic and constraints)
├── data.md                     (Global data architecture & common entities)
├── design_rules.md             (Visual design tokens, typography & palette)
├── prompts/                    (AI Management & Review prompts)
│   ├── README.md
│   ├── 01_project_initialization/
│   │   ├── initialize_project.md
│   │   └── review_project_configuration.md
│   ├── 02_project_analysis/
│   │   └── analyze_project_rules.md
│   ├── 03_database/
│   │   ├── design_database.md
│   │   └── implement_database.md
│   └── 04_phases/
│       ├── analyze_phase.md
│       ├── execute_phase.md
│       └── review_phase.md
└── phases/                     (Functional phases tree)
    └── phase_00_sample/        (Standard phase template)
        ├── README.md
        ├── backend.md
        ├── frontend.md
        ├── routes.md
        └── data.md
```

### Step 7: Build Task-Specific Minimal Context
- Load only task-relevant files into the AI context following `03_ai_protocol/context_loading.md` and `03_ai_protocol/runtime/context_resolution.md`.

### Step 8: Initialization Verification & Baseline Audit
- Validate that the Tripartite Model files exist and are syntactically valid (`stack.yaml`, `frontend_capabilities.yaml`, `execution_engine.yaml`).
- Begin development according to Phase deliverables in `PROJECT/MD/phases/`.

---

# Verification
1. Confirm that `PROJECT/MD/stack.yaml`, `frontend_capabilities.yaml`, and `execution_engine.yaml` exist and are valid.
2. Confirm that technology profile resolution succeeded (or handled unknown technologies gracefully).
3. Confirm that `PROJECT/MD/` structure was scaffolded and synchronized.
