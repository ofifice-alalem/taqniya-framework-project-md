# Pre-Completion Verification & Quality Gatekeeper

# Purpose
This document establishes the multi-stage Verification Gatekeeper. No task, feature, or bug fix may be marked complete, submitted for review, or merged until all applicable verification gates are evaluated and satisfied.

# Scope
Applies to all tasks executed by AI agents and software engineers across all repositories.

---

## 1. Gate Evaluation States

To prevent forcing irrelevant gates while guaranteeing absolute rigor on applicable ones, every gate is evaluated in one of four states:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        GATE EVALUATION STATES                          │
├───────────────────┬────────────────────────────────────────────────────┤
│ REQUIRED          │ Gate strictly applies to the active task; MUST pass│
│                   │ 100% before completion sign-off.                   │
├───────────────────┼────────────────────────────────────────────────────┤
│ NOT APPLICABLE    │ Gate touches an untouched dimension (e.g., Design  │
│ (N/A)             │ System for backend/CLI tasks, or DB for pure UI).  │
├───────────────────┼────────────────────────────────────────────────────┤
│ OPTIONAL          │ Advisory / non-blocking recommendation check.      │
├───────────────────┼────────────────────────────────────────────────────┤
│ FAILED            │ Gate failed. BLOCKS task completion immediately.   │
└───────────────────┴────────────────────────────────────────────────────┘
```

---

## 2. The 8-Stage Verification Gatekeeper

```
┌────────────────────────────────────────────────────────────────────────┐
│               THE 8-STAGE VERIFICATION GATEKEEPER                      │
├────────────────────────────────────────────────────────────────────────┤
│  Gate 1: Task-Relevant Automated Test Suite (100% Green when req.)     │
│  Gate 2: Static Analysis & Strict Type Checking (Zero Task Errors)     │
│  Gate 3: Code Style & Automated Linting Checks (Clean Diff)            │
│  Gate 4: Compilation, Build & Asset Pipeline Pass (Clean Bundle)       │
│  Gate 5: Architectural Boundary & Responsibility Audit                 │
│  Gate 6: Design System & Token Compliance (WHERE A UI EXISTS)          │
│  Gate 7: Semantic Documentation Synchronization (MD Updated)           │
│  Gate 8: Zero Debug Artifacts & Transparent Pre-Existing Debt Report   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Gate Specifications

### Gate 1: Automated Test Suite (Task-Relevant)
- **Status:** `REQUIRED` for behavioral changes and bug fixes; `N/A` for documentation or purely cosmetic changes where automated tests do not apply.
- **Requirement:** 100% passing tests on all task-related and regression test suites.
- **Pre-Existing Failures:** If unrelated pre-existing test failures exist in the repository, they MUST be explicitly documented and reported, rather than falsely attributed to the active task.

### Gate 2: Static Analysis & Type Checking
- **Status:** `REQUIRED` where static analysis/type checking tooling is configured for the project stack; `N/A` otherwise.
- **Requirement:** Zero errors introduced on modified files at the project's configured strictness level.

### Gate 3: Linting & Code Formatting
- **Status:** `REQUIRED` where linter/formatter tooling is configured.
- **Requirement:** All newly created and modified files adhere to project styling conventions with zero unformatted diffs.

### Gate 4: Build & Compilation Pass
- **Status:** `REQUIRED` for compiled languages and projects with asset bundlers; `N/A` for interpreted/scripting projects without a build step.
- **Requirement:** Production compilation or asset bundling commands succeed with zero fatal errors.

### Gate 5: Architectural Boundary Audit
- **Status:** `REQUIRED` for all code modifications.
- **Requirement:** Audit modified files against the project's selected architectural style and active Technology Profile:
  - Ingress/interface handlers remain focused on transport orchestration.
  - Domain business logic is isolated and decoupled from transport protocols.
  - Infrastructure and persistence details are properly encapsulated.

### Gate 6: Design System & Token Compliance (Where a UI Exists)
- **Status:** `REQUIRED` for UI tasks; `N/A` for headless APIs, backend services, CLIs, libraries, or data pipelines.
- **Requirement:** Audit modified UI components against `01_design_system/*` and `PROJECT/MD/01_project_design/`:
  - Styles leverage semantic tokens; arbitrary magic numbers are avoided.
  - Interactive states (Hover, Focus, Disabled, Loading, Error, Empty) are handled where applicable.
  - Accessibility and interaction controls are verified.

### Gate 7: Semantic Documentation Synchronization
- **Status:** `REQUIRED` when system behavior, data schemas, API contracts, or business rules change; `N/A` for non-semantic internal refactors.
- **Requirement:** Update the corresponding files in `PROJECT/MD/` and log the change in `PROJECT/MD/07_change_log/changes.md`.

### Gate 8: Zero Debug Artifacts & Clean Diff
- **Status:** `REQUIRED` for all tasks.
- **Requirement:** Remove all temporary debugging code (e.g., debug logs, breakpoints, print dumps). Ensure no unresolved task-related issues remain.

---

## 4. Verification Output Summary Format

When reporting task completion, provide a concise, evidence-based verification summary indicating the status of applicable gates:

```text
✅ Verification Summary:
- Gate 1 (Tests): [Passed | N/A (Doc/Config task)] ([X] tests passed, 0 failures)
- Gate 2 (Static Analysis): [Passed | N/A] (0 errors on modified files)
- Gate 3 (Linting): [Passed | N/A] (Clean diff)
- Gate 4 (Build): [Passed | N/A] (Clean compilation / bundle)
- Gate 5 (Architecture): Compliant with Project Architecture & Active Profiles
- Gate 6 (Design System): [Passed | N/A (No UI)] (Tokens & Accessibility verified)
- Gate 7 (Documentation): [Synchronized | N/A (Internal refactor)] (PROJECT/MD/ updated)
- Gate 8 (Cleanliness): Zero debug artifacts remaining
```
