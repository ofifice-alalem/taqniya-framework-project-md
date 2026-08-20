# Context Loading & Lazy-Loading Protocol

# Purpose
This document defines the systematic 10-step protocol for discovering and loading the minimal sufficient context required to execute a task safely. It integrates the User-Provided Stack Configuration (`stack.yaml`), modular Technology Profiles, and Project MD specifications while preventing LLM context bloat, token wastage, and instruction drift.

# Scope
Applies to all AI coding agents determining which documentation, configuration, and source files to ingest for any given user prompt.

---

## 1. The 10-Step Context-Loading Algorithm

For every task, the AI agent MUST execute the following lazy-loading sequence:

```
[ Step 1: Ingest Mandatory Taqniya Core Invariants (03_ai_protocol/mandatory_rules.md) ]
                               │
                               ▼
[ Step 2: Read & Parse Project Stack Configuration (PROJECT/stack.yaml) ]
                               │
                               ▼
[ Step 3: Determine Required Technology Dimensions for Active Task ]
                               │
                               ▼
[ Step 4: Resolve Only Relevant Technology Profiles (from 06_stack_profiles/) ]
                               │
                               ▼
[ Step 5: Determine & Ingest Relevant Project Specifications (PROJECT/MD/00_project/*) ]
                               │
                               ▼
[ Step 6: Ingest Active Feature Specification (PROJECT/MD/03_features/{feature}/*) ]
                               │
                               ▼
[ Step 7: Ingest Active Phase Checklist (PROJECT/MD/04_implementation_phases/{phase}/*) ]
                               │
                               ▼
[ Step 8: Ingest Relevant Architecture Decision Records (PROJECT/MD/06_decisions/ADR/) ]
                               │
                               ▼
[ Step 9: Assemble Minimal Sufficient Context (Verify zero irrelevant profiles loaded) ]
                               │
                               ▼
[ Step 10: Execute Task & Verify ]
```

---

## 2. Task-Specific Dimension Resolution & Clarification

The AI agent resolves **ONLY** the technology dimensions required by the active task. Omitted dimensions that are irrelevant to the current task do not block execution:

```
Missing Technology in stack.yaml
        │
        ▼
Is it required for the current task?
        │
        ├─► YES ──► Prompt user for clarification before proceeding
        │
        └─► NO  ──► Continue task execution safely without assumption
```

### Loading & Clarification Matrix:

| Active Task Domain | Required Technology Dimensions | Technology Profiles Loaded | Project MD Specs Loaded | Ignored / Excluded (Do NOT Load or Ask) |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend UI Component** | `frontend.name`<br>`styling.name` | Frontend Profile *(e.g., react/)*<br>Styling Profile *(e.g., tailwind/)* | `01_project_design/theme.md`<br>`03_features/{f}/interfaces.md` | Database engine, Backend framework, Queue workers |
| **Database Schema / Migration** | `database.name`<br>`database.migration_tool` | Database Profile *(e.g., postgresql/)*<br>Backend Profile *(if ORM-based)* | `00_project/database.md`<br>`03_features/{f}/data.md` | Frontend UI framework, Design tokens, CSS rules |
| **Backend API / Service** | `backend.name`<br>`backend.language` | Backend Profile *(e.g., laravel/, fastapi/)* | `00_project/business_rules.md`<br>`03_features/{f}/implementation.md`<br>`03_features/{f}/interfaces.md` | Frontend component trees, UI styling libraries |
| **Automated Testing** | `testing.name` | Testing Profile *(e.g., pest/, vitest/)* | `03_features/{f}/acceptance_criteria.md`<br>`05_testing/test_cases.md` | Unrelated deployment / cloud configurations |
| **Bug Fix / Debugging** | Targeted runtime/framework | Targeted Technology Profile | `00_project/business_rules.md`<br>`07_change_log/changes.md` | Unrelated feature specs and phase roadmaps |
| **Architectural Decision / ADR**| High-level stack architecture | Relevant Technology Profiles | `00_project/architecture_overrides.md`<br>`06_decisions/ADR/` | Component CSS files and individual view templates |

---

## 3. Unknown Profile Handling During Context Loading
If `stack.yaml` specifies a technology without a corresponding specialized profile under `06_stack_profiles/`:
1. Ingest universal Taqniya Core rules.
2. Ingest `PROJECT/MD/00_project/architecture_overrides.md` for any project-specific conventions.
3. Inform the user:
   > *"Notice: Operating under universal Taqniya Core engineering principles for [Technology Name] (no specialized profile active)."*
4. **MUST NOT:** Never invent hallucinated rules or fake package policies for unknown technologies.

# Verification
1. Verify that `stack.yaml` was read prior to loading technology-specific rules.
2. Confirm that only task-relevant technology profiles were loaded into active context.
3. Verify that zero unrelated domain profiles (e.g., loading database profile for a CSS tweak) were ingested.
4. Confirm that unneeded omitted dimensions did not trigger unnecessary user clarification prompts.
