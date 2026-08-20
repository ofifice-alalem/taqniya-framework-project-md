# Definition of Done (DoD) & Task Completion Criteria

# Purpose
This document defines the universal Definition of Done (DoD). A task, feature, or bug fix is NEVER complete simply because source code was edited. It is complete ONLY when all requirements, relevant tests, verification gates, and documentation synchronizations are fully satisfied.

# Scope
Applies to every task completed by AI agents and software engineers across all projects.

---

## 1. The 10-Point Universal Definition of Done Checklist

An AI agent or engineer may declare a development task "COMPLETE" only when all applicable items below are checked and verified:

```
[ ] 1. Functional Requirements Satisfied:
    - All requirements and acceptance criteria in the active feature specification or user prompt are satisfied.

[ ] 2. Architectural Boundaries Respected:
    - Implementation respects the architecture, boundaries, responsibilities, and dependency direction defined by the active project architecture.
    - Code complies with Taqniya Core and active Technology Profile rules (if applicable).

[ ] 3. Task-Relevant Automated Test Suite Green:
    - New behavior has tests; bug fixes have regression tests (where testing tools are configured).
    - All task-related and regression tests pass 100%.

[ ] 4. Static Analysis & Type Safety Pass (Where Applicable):
    - Static analysis and type checking pass with zero errors on modified files according to project configuration.

[ ] 5. Code Quality & Formatting Clean:
    - Project linter/formatter ran with zero unformatted diffs (where configured).
    - Code is free of dead code, commented-out blocks, and unused imports.

[ ] 6. Zero Debug Artifacts Left in Code:
    - All temporary debugging statements (e.g., console logs, debug prints, breakpoints, dump calls) are completely removed.

[ ] 7. Design System & Accessibility Verified (For UI Tasks):
    - UI leverages semantic design tokens; arbitrary magic values avoided.
    - Interactive states handled; accessibility and keyboard navigation verified (where applicable).

[ ] 8. Data Integrity & Safety Confirmed (For Storage Tasks):
    - Relevant data integrity, consistency, constraints, indexing, persistence safety, and migration requirements are satisfied according to the active storage technology and project specification (where applicable).

[ ] 9. Semantic Documentation Synchronized:
    - Relevant specification updates reflected in Project MD (e.g., business rules, data architecture, routes, or phase checklists where applicable).

[ ] 10. Change Log Recorded & Pre-Existing Debt Reported:
    - Task summary, modified files, and verification results logged in PROJECT/MD/07_change_log/changes.md.
    - Any pre-existing unrelated test failures or repo debt transparently reported.
```

---

## 2. Prohibition Against False Completion
- **MUST NOT:** The AI agent MUST NOT report that a task is finished if tests fail, if static analysis reports errors on modified code, or if documentation synchronization was skipped.
- **MUST:** If blocked by an external environment issue, missing dependency, or invalid credentials, report the exact blocker with evidence rather than pretending the task was completed.

# Verification
1. Walk through the 10-point DoD checklist item-by-item for applicable dimensions.
2. Confirm all automated verification gates passed.
3. Include the concise verification summary in the final response.
