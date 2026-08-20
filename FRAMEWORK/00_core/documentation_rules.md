# Documentation Standards & Single Source of Truth (SSoT) Protocol

# Purpose
This document establishes the universal rules for maintaining project documentation as an accurate, living specification. It defines the relationship between specifications, implementation, tests, and Architecture Decision Records (ADRs).

# Scope
Applies to all project-level documentation under `PROJECT/MD/`, code comments, API specifications, and ADRs.

---

## 1. The Precise Source of Truth (SSoT) Model

To prevent ambiguity, the Taqniya Framework defines a balanced, tripartite truth model:

```
┌────────────────────────────────────────────────────────┐
│ 1. PROJECT MD (PROJECT/MD/*)                           │
│    Source of truth for specifications, business rules,  │
│    architectural intent, schemas, and requirements.     │
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
  2. **Check Context & History:** Inspect recent commits, change logs (`PROJECT/MD/07_change_log/changes.md`), and approved ADRs to determine whether the change was intentional.
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
        ├─► YES ──► Update the corresponding PROJECT/MD/ specification
        │
        └─► NO  ──► Documentation update is not required (e.g., internal refactor)
```

---

## 4. Architecture Decision Records (ADR) Standard
- **MUST:** Any non-trivial architectural or technical decision (choosing a package, changing data flow, switching auth mechanisms, modifying multi-tenancy models) MUST be recorded as an ADR in `PROJECT/MD/06_decisions/ADR/`.
- **MUST:** ADRs must document: Title, Status (Proposed / Accepted / Deprecated / Superseded), Context, Decision Drivers, Considered Alternatives, Decision Outcome, and Consequences.

---

## 5. Documentation Style & Precision
- **SHOULD:** Write concise, technical, and structured specifications. Avoid verbose marketing prose.
- **SHOULD:** Use structured markdown tables for field schemas, endpoint parameters, and error codes.
- **SHOULD:** Link directly to related feature specifications and phase checklists using valid relative markdown paths.

# Verification
1. Verify that semantic changes in behavior, schemas, or endpoints have corresponding updates in `PROJECT/MD/`.
2. Confirm that any discrepancy between code and docs was investigated rather than silently overwritten.
3. Check that completed tasks have entries logged in `PROJECT/MD/07_change_log/changes.md`.
