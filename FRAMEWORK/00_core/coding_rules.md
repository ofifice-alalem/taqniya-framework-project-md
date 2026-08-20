# Global Coding Standards & Clean Code Rules

# Purpose
This document defines universal programming standards, code hygiene, and quality expectations across all codebases adopting the Taqniya Framework. It prioritizes readability, maintainability, type safety, error resilience, and explicit anti-overengineering discipline.

# Scope
Applies to all source code written across backend, frontend, CLI scripts, and utility modules in all programming languages.

---

## 1. Naming Conventions & Domain Ubiquity
- **MUST:** Use expressive, intention-revealing names. Avoid single-letter variables except for standard short iteration indexes (`i`, `j`) in small loops.
- **MUST:** Use exact ubiquitous domain terms from `PROJECT/MD/00_project/business_rules.md` (e.g., maintain consistency between `Invoice`, `Customer`, `Order`; do not mix synonyms arbitrarily).
- **SHOULD:** Prefix boolean variables and functions with explicit predicates: `is_active`, `has_permission`, `can_edit`, `should_retry`.
- **SHOULD:** Name functions and methods with active verb-noun phrases: `calculateTaxAmount()`, `dispatchNotification()`, `findActiveSubscriptions()`.

---

## 2. Strong Typing & Strict Execution
- **MUST:** Enable strict typing modes wherever supported by the runtime (e.g., TypeScript strict mode, Python type annotations, strict types in typed languages).
- **MUST:** Provide explicit type signatures for all public function parameters, return types, and class member variables.
- **SHOULD NOT:** Use indiscriminate `any`, `mixed`, or untyped dictionary bags when a structured interface, DTO, or Value Object can be declared.

---

## 3. Function Design & Cyclomatic Complexity
- **SHOULD:** Keep functions and methods small and focused on a single logical task (typically under 30–40 lines).
- **SHOULD:** Maintain low cyclomatic complexity (maximum 3 levels of nested indentation).
- **SHOULD:** Use guard clauses and early returns to handle preconditions, validation errors, and edge cases early:
  ```
  // Guard Clause Pattern
  if (!user.isActive()) {
      return Result.failure("User is inactive");
  }
  if (!order.hasStock()) {
      return Result.failure("Out of stock");
  }
  return processOrder(order);
  ```
- **SHOULD:** Limit parameter counts to 3–4 arguments. Group related arguments into a typed DTO or parameter object.

---

## 4. Robust Error Handling & Fault Resilience
- **MUST NOT:** Swallowed exceptions or empty `catch` blocks are STRICTLY FORBIDDEN. Always handle, log, wrap, or rethrow exceptions with meaningful contextual data.
- **SHOULD:** Throw domain-specific exceptions (e.g., `InsufficientFundsException`, `ResourceNotFoundException`) rather than generic system exceptions.
- **SHOULD:** Fail fast at system boundaries by validating inputs before executing state mutations.

---

## 5. Anti-Overengineering Mandate (Simplicity First)
- **MUST NOT:** Create new abstraction layers (factories, adapters, custom frameworks) without demonstrated necessity.
- **MUST NOT:** Refactor working, out-of-scope files during a targeted bug fix or small feature task.
- **MUST NOT:** Introduce complex architectural patterns for simple CRUD operations.
- **SHOULD:** Prefer the simplest design that satisfies all currently documented requirements (YAGNI & KISS principles).
- **SHOULD:** Reuse existing helper functions and utilities before authoring new ones.

---

## 6. Comments & Documentation Standards
- **SHOULD:** Write self-documenting code through clear naming and small functions, making comments for trivial control flow redundant.
- **SHOULD:** Write comments to explain **"Why"** a non-obvious algorithm or domain rule exists, not **"What"** standard syntax is doing.
- **MUST:** Clean up all temporary debugging artifacts (e.g., `console.log`, `print()`, `var_dump()`, debugger breakpoints) before completing a task.

# Verification
1. Verify strict type declarations on all modified and newly created files.
2. Confirm cyclomatic complexity is low and guard clauses are utilized.
3. Check that all exceptions are explicitly handled or documented.
4. Verify that no temporary debug logs exist in the diff.
