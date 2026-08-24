# [PROJECT_NAME] — Documentation Hub (PROJECT/MD)

> **Single Source of Truth (SSoT) for [PROJECT_NAME] Specifications, Architecture, and Functional Phases**

---

## 1. Project Navigation Map

| File / Directory | Purpose & Contents |
| :--- | :--- |
| **`README.md`** | Project overview, scope, nature of system, and phases index. |
| **`stack.yaml`** | Technology stack configuration (Frontend, Backend, DB, Cache, API, Auth, Testing, Deploy). |
| **`frontend_capabilities.yaml`** | Frontend engineering & performance policy decisions. |
| **`execution_engine.yaml`** | Configured execution engine selection. |
| **`business_rules.md`** | Global business rules, entity lifecycles, and operational constraints. |
| **`data.md`** | Global data architecture, core shared entities, and relationships. |
| **`database.md`** | Authoritative database schema blueprint (SSoT). |
| **`design_rules.md`** | Visual design tokens (colors, typography, spacing, radius, shadows). |
| **`prompts/`** | 4-tier structured AI lifecycle prompts (`01_initialization`, `02_analysis`, `03_database`, `04_phases`). |
| **`phases/`** | Functional implementation phases (`phase_00_*`, `phase_01_*`, etc.). |

---

## 2. Active Roadmap Status

- **Current Phase:** `[PHASE_NUMBER]` — `[PHASE_TITLE]`
- **Active Focus:** `[ACTIVE_FEATURE_OR_TASK]`
- **Overall Progress:** `[PERCENTAGE]%`

---

## 3. Engineering Guidelines for AI Agents & Developers
1. **Specification SSoT:** Inspect relevant documentation in `PROJECT/MD/` before writing or modifying code.
2. **Semantic Synchronization:** Update phase documentation whenever system behavior, schemas, or endpoints change.
3. **Verification Gatekeeper:** Verify task-relevant tests and static analysis before marking tasks complete.
