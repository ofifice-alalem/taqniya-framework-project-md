# Universal Testing Rules & Quality Invariants

# Purpose
This document defines concrete rules for authoring maintainable, decoupled automated tests. It governs behavior-driven assertion practices, test isolation, edge-case coverage, and the handling of pre-existing failures.

# Scope
Applies to all automated tests across all testing frameworks and software domains.

---

## 1. Test Behavior, Not Internal Implementation Details
- **MUST:** Tests should verify **WHAT** the system does (inputs, outputs, state mutations, emitted events, response payloads), NOT **HOW** internal private variables or private methods operate.
- **MUST NOT:** Assert on private internal method invocations or private class state unless testing through public interfaces.
- **SHOULD:** Ensure internal code refactoring that preserves external behavior does NOT break existing tests.

---

## 2. Mandatory Tests for New Behavior & Regressions
- **MUST:** New behavior, interfaces, commands, workflows, or business rules must receive appropriate automated verification where applicable before task completion.
- **SHOULD:** When fixing a bug, author a regression test that fails prior to the fix and passes once the fix is applied.

---

## 3. Strict Test Isolation & Zero State Leakage
- **MUST:** Tests MUST be order-independent. Running tests in randomized order MUST produce identical results.
- **MUST:** Isolate mutable external state used by a test. When persistent storage is involved, use an appropriate isolated storage mechanism (e.g., in-memory stores, temporary sandboxes, transaction rollbacks, or clean test fixtures).
- **MUST NOT:** Rely on shared mutable global state between test cases.

---

## 4. Boundary & Edge Case Testing Guidelines
Every test suite covering domain logic, workflows, or interfaces SHOULD verify:
1. **Happy Path:** Standard valid execution scenario.
2. **Boundary Values:** Zero values, minimum/maximum bounds, boundary limits.
3. **Empty / Null States:** Empty collections, null optional parameters, empty strings.
4. **Security & Authorization *(where applicable)*:** Unauthorized access attempts, unauthenticated calls, boundary violations.
5. **Conflict & Error States:** Duplicate records, invalid inputs, expected failure conditions.

---

## 5. Handling Pre-Existing vs Task-Related Test Failures
- **MUST:** All task-related tests MUST pass 100% before declaring completion.
- **MUST NOT:** The AI agent MUST NEVER hide, delete, or skip failing tests to fake a passing build.
- **MUST:** If pre-existing, unrelated test failures exist in the repository:
  1. The AI agent MUST explicitly report them in the task summary.
  2. The AI agent MUST NOT falsely claim that the entire repository is broken by the current change.
  3. The AI agent SHOULD distinguish between active task test results and pre-existing repository debt.

# Verification
1. Run test suites with randomized execution order to verify zero state leakage.
2. Confirm that boundary edge cases have explicit test coverage where applicable.
3. Verify that all task-related tests are passing.
