# Runtime Specification: Bootstrap Protocol

# Purpose
This document specifies the bootstrap sequence executed by the AI agent upon initiating any pair-programming session. It defines how the AI agent detects Taqniya governance, validates project structure, identifies the active workspace state, and primes the AI runtime with zero token waste.

---

## 1. Runtime Discovery Sequence

```text
[ Session Start / User Prompt ]
               │
               ▼
Check Workspace Root for:
1. PROJECT/MD/stack.yaml ?
2. PROJECT/MD/ ?
3. FRAMEWORK/ or global Taqniya installation ?
               │
               ├─► ALL PRESENT ────────► State A: ACTIVE TAQNIYA PROJECT
             │                         (Proceed to Stack Resolution)
             │
             ├─► CODE PRESENT, NO MD ─► State B: BROWNFIELD ADOPTION
             │                         (Suggest Taqniya Initialization Workflow)
             │
             └─► EMPTY WORKSPACE ─────► State C: GREENFIELD CREATION
                                       (Execute 04_workflows/project_initialization.md)
```

---

## 2. Project State Handlers

### State A: Active Taqniya Project (Normal Execution)
- **Condition:** `PROJECT/MD/stack.yaml` and `PROJECT/MD/` exist.
- **Action:**
  1. Load `PROJECT/MD/stack.yaml` into runtime cache.
  2. Proceed immediately to **Stack & Profile Resolution**.
  3. Classify user prompt and load minimal task context.

### State B: Brownfield Project Adoption
- **Condition:** Source code exists, but `PROJECT/MD/stack.yaml` or `PROJECT/MD/` is missing.
- **Action:**
  1. Inspect repository manifest (e.g., `composer.json`, `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`).
  2. Draft initial `PROJECT/MD/stack.yaml` based on detected manifest.
  3. Present to user for verification before applying strict governance rules.

### State C: Greenfield Project Initialization
- **Condition:** New or empty directory.
- **Action:**
  1. Prompt user for project name, purpose, and technology preferences (or read user prompt).
  2. Follow `04_workflows/project_initialization.md` to scaffold `PROJECT/MD/stack.yaml` and `PROJECT/MD/`.

---

## 3. Bootstrap Validation Checklist

Before executing user tasks in an Active Project (State A), the AI agent confirms:

```
[ ] 1. PROJECT/MD/stack.yaml is valid YAML and declares project name & type.
[ ] 2. PROJECT/MD/README.md exists and is readable.
[ ] 3. Global business rules and data architecture are documented in business_rules.md & data.md.
[ ] 4. Any required Technology Profiles are mapped or Unknown Protocol primed.
```

---

## 4. Performance & Token Optimization Invariant
- **MUST NOT:** The bootstrap sequence MUST NOT read all files in `PROJECT/MD/` or `06_stack_profiles/` into the initial context window.
- **MUST:** Bootstrap ONLY verifies the presence and validity of configuration files; full content reading is strictly deferred to the **Task Context Loader**.
