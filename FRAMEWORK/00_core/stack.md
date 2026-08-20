# Stack Configuration & Technology Resolution Governance

# Purpose
This document defines the universal protocol for declaring, validating, and resolving technology stacks within any software repository. It establishes the **User-Provided Stack Configuration (`stack.yaml`)** as the dynamic entry point for all technology-specific AI behavior, while keeping Taqniya Core completely technology-agnostic.

# Scope
Applies to all projects adopting the Taqniya Framework. Governs how technology choices are declared, validated, and translated into AI reasoning context.

---

## 1. Core Architectural Principle: Separation of Responsibilities

```
┌────────────────────────────────────────────────────────┐
│ TAQNIYA CORE (Global Constitution)                     │
│ Answers: "HOW TO REASON SAFELY AND CONSISTENTLY"       │
│ Knows universal engineering principles, architecture   │
│ governance, security, data integrity, testing & DoD.   │
│ DOES NOT KNOW which technologies the project uses.     │
├────────────────────────────────────────────────────────┤
│ STACK CONFIGURATION (stack.yaml)                       │
│ Answers: "WHAT TECHNOLOGIES IS THIS PROJECT USING?"   │
│ Declares frontend, backend, database, test tools, etc. │
├────────────────────────────────────────────────────────┤
│ TECHNOLOGY PROFILES (06_stack_profiles/*) [OPTIONAL]   │
│ Answers: "HOW TO WORK WITH THOSE SPECIFIC TOOLS"       │
│ Provides ecosystem-specific idioms, syntax, and tools. │
├────────────────────────────────────────────────────────┤
│ PROJECT MD (PROJECT/MD/*)                              │
│ Answers: "WHAT ARE WE BUILDING & SPECIFIC SPECS?"      │
│ Contains domain rules, entities, routes, and roadmaps. │
└────────────────────────────────────────────────────────┘
```

---

## 2. Technology Resolution Pipeline

When an AI agent or engineer begins work on a project, the technology stack is resolved through this pipeline:

```
[ USER ]
   │ Provides stack.yaml
   ▼
[ STACK CONFIGURATION (PROJECT/stack.yaml) ]
   │ Parsed & Validated
   ▼
[ STACK RESOLUTION PROTOCOL ]
   │
   ├─► Matches Declared Technologies ──► Discovers & Loads Technology Profiles (if available)
   │                                     (e.g., backend/laravel, testing/pest)
   │
   └─► Unmatched / Custom Technology ──► Activates Unknown Technology Protocol
                                         (Applies Core principles + reports missing profile)
   │
   ▼
[ ACTIVE AI CONTEXT ] = Taqniya Core Rules + Resolved Profiles + Project MD Specifications
   │
   ▼
[ TASK EXECUTION & VERIFICATION ]
```

---

## 3. The Mandatory Invariant: "NO TECHNOLOGY = NO ASSUMPTION"

- **MUST NOT:** If a technology dimension is omitted from `stack.yaml`, Taqniya **MUST NOT invent or assume a default technology**.
- **Task-Relevant Clarification Protocol:** A missing technology dimension requires user clarification **ONLY IF IT IS REQUIRED FOR THE CURRENT TASK**:

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

### Contextual Clarification Examples:
1. **Task: Create a database migration:**
   - If `frontend.framework` is omitted ➔ **Do NOT ask about frontend.** Proceed with the database migration.
2. **Task: Create a frontend UI component:**
   - If `frontend.framework` is omitted ➔ **Ask user:** *"Frontend framework is not specified in stack.yaml. Please provide the target framework (e.g., React, Vue, Svelte, or Vanilla JS)."*
3. **Task: Implement backend authentication:**
   - If `authentication.provider_or_library` is omitted ➔ **Ask user** if a specific auth provider/library is required or if standard framework mechanisms should be used.

---

## 4. Full Technology Dimension Independence

Frontend, backend, database, testing, and infrastructure are strictly independent configuration dimensions. Any valid combination is fully supported:

- **React + Laravel + PostgreSQL + Vitest + Pest**
- **Vue + Django + MySQL + Pytest + Playwright**
- **Svelte + FastAPI + SQLite + Vitest + Pytest**
- **Angular + NestJS + MongoDB + Jest + Cypress**
- **Next.js Fullstack + Prisma + PostgreSQL**
- **Go-Fiber + HTMX + PostgreSQL + Go Test**
- **Custom Proprietary Frameworks**

Taqniya Core makes zero assumptions about framework couplings (e.g., Laravel does not imply Inertia or Blade; Node.js does not imply React).

---

## 5. Stack Configuration Validation Protocol

Before executing tasks, the AI agent MUST validate `stack.yaml` against these rules:

1. **Syntax & Schema Check:** Verify valid YAML structure conforming to `05_templates/generic/project/stack.yaml`.
2. **Conflict Detection:** Check for mutually incompatible declarations (e.g., specifying both a headless REST API backend and an incompatible fullstack template without clarification).
3. **Missing Runtime Information:** If a declared framework requires a specific runtime version (e.g., PHP 8.3 or Node 20), verify that the runtime version is specified.
4. **No Silent Correction:** If a configuration conflict is detected, the AI agent MUST report the issue transparently and request user guidance rather than silently changing the user's technology choices.

---

## 6. Technology Profile Discovery & Unknown Technology Protocol

### A. Profile Discovery
Taqniya searches for modular technology profiles under `06_stack_profiles/` (e.g., `06_stack_profiles/backend/laravel/`, `06_stack_profiles/backend/*`, `06_stack_profiles/frontend/*`, `06_stack_profiles/database/*`).

### B. Profiles Are Optional Extensions
Technology profiles are **NOT mandatory** for Taqniya to function. If the user declares a technology for which no specialized profile exists (e.g., Svelte, Elixir/Phoenix, DynamoDB, or an in-house custom framework):

1. **Load Taqniya Core:** Apply universal Taqniya Core engineering principles and the architecture selected by the project, if documented.
2. **Report Missing Profile:** Inform the user:
   > *"Notice: No specialized profile found for '[Technology Name]'. Applying universal Taqniya Core engineering principles."*
3. **Do Not Invent Rules:** Do not invent speculative rules or hallucinate fake conventions for the unknown technology.
4. **Adhere to Project MD:** Follow any project-specific guidelines documented in `PROJECT/MD/00_project/architecture_overrides.md`.

---

## 7. Version Support & Custom Technologies
- **Version Support:** `stack.yaml` supports explicit version constraints (e.g., `version: "19.x"`, `version: "^8.3"`). The AI agent must respect version-specific language features and avoid using features deprecated or unavailable in the declared version.
- **Custom Technologies:** Custom or internal frameworks (e.g., `name: "MyCompanyFramework"`, `version: "2.1"`) are fully valid. Taqniya operates at the Core governance level and adapts seamlessly.

# Verification
1. Verify that `stack.yaml` exists at the project root (`PROJECT/stack.yaml`).
2. Confirm that all technologies used in code match the declarations in `stack.yaml`.
3. Verify that no unspecified technology was assumed without explicit user confirmation.
4. Verify that missing profiles trigger the Unknown Technology Protocol gracefully.
