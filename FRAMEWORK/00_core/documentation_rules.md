# Documentation Standards & Single Source of Truth (SSoT) Protocol

# Purpose
This document establishes the universal rules for maintaining project documentation as an accurate, living specification under `PROJECT/MD/`. It defines the relationship between specifications, implementation, and tests.

# Scope
Applies to all project-level documentation under `PROJECT/MD/`, code comments, and API specifications.

---

## 1. The Precise Source of Truth (SSoT) Model

To prevent ambiguity, the Taqniya Framework defines a balanced, tripartite truth model:

```
┌────────────────────────────────────────────────────────┐
│ 1. PROJECT MD (PROJECT/MD/*)                           │
│    Source of truth for specifications, business rules,  │
│    architectural intent, schemas, design & phases.      │
├────────────────────────────────────────────────────────┤
│ 2. SOURCE CODE                                         │
│    Source of truth for current runtime implementation. │
├────────────────────────────────────────────────────────┤
│ 3. AUTOMATED TESTS                                     │
│    Executable verification of expected behavior.       │
└────────────────────────────────────────────────────────┘
```

---

## 2. Managing Divergence Between Code and Documentation

When the AI agent or engineer discovers a discrepancy between `PROJECT/MD/` and the actual source code:

- **MUST NOT:** The AI agent MUST NOT silently assume one side is right and overwrite the other.
- **MUST:** The AI agent MUST follow this 4-step reconciliation protocol:
  1. **Identify the Discrepancy:** Detail the exact difference (e.g., column name, endpoint parameter, business calculation).
  2. **Check Context & History:** Inspect git history and `PROJECT/MD/prompts/Project_Recovery.md` to determine whether the change was intentional.
  3. **Resolve or Clarify:**
     - If the code contains an unintended bug: Fix the code to match the documented specification and tests.
     - If the specification was intentionally evolved: Update `PROJECT/MD/` to reflect the approved implementation.
     - If intent is ambiguous: Request clarification before proceeding.
  4. **Synchronize:** Ensure `PROJECT/MD/`, source code, and tests are aligned.

---

## 3. Semantic Synchronization (Impact-Driven Updates)

Documentation synchronization is triggered by **semantic business impact**, not merely by touched file extensions:

```
CODE CHANGE DETECTED
        │
        ▼
Did behavior, business rules, database schema, or API contracts change?
        │
        ├─► YES ──► Update the corresponding PROJECT/MD/ specification & phase
        │
        └─► NO  ──► Documentation update is not required (e.g., internal refactor)
```

---

## 4. Documentation Style & Precision
- **SHOULD:** Write concise, technical, and structured specifications. Avoid verbose marketing prose.
- **SHOULD:** Use structured markdown tables for field schemas, endpoint parameters, and error codes.
- **SHOULD:** Link directly to related phase specifications using valid relative markdown paths in `PROJECT/MD/phases/`.

# Verification
1. Verify that semantic changes in behavior, schemas, or endpoints have corresponding updates in `PROJECT/MD/`.
2. Confirm that any discrepancy between code and docs was investigated rather than silently overwritten.
3. Check that phase documentation in `PROJECT/MD/phases/<phase_name>/` is kept up to date.
