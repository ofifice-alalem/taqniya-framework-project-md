# AI Agent Mandatory Invariants & Operating Constitution

# Purpose
This document defines the strict, non-negotiable behavioral invariants that all AI coding agents MUST adhere to at all times. These rules prevent hallucination, architectural drift, regression, unauthorized alterations, and speculative overengineering.

# Scope
Applies to every prompt, task execution, tool call, and file modification performed by an AI agent across any codebase.

---

## 1. The 8 Non-Negotiable AI Operating Invariants

### 1. No Modification Without Architectural Understanding
- **MUST NOT:** The AI MUST NOT edit code files blindly.
- **MUST:** Before modifying any file, the AI must inspect the surrounding architecture, identify the active subsystem/boundary, and review relevant specifications in `PROJECT/MD/` and any active Technology Profile in `06_stack_profiles/`.

### 2. No Duplicate Components or Unstyled Variants (Where a UI Exists)
- **MUST NOT:** WHERE A UI EXISTS, the AI MUST NOT create ad-hoc buttons, custom inputs, or duplicated UI elements when established components exist in the design system or project library.
- **MUST:** WHERE A UI EXISTS, always search existing components before authoring new UI elements.

### 3. No Unapproved External Packages
- **MUST NOT:** The AI MUST NOT introduce new third-party packages without verifying compliance with `00_core/package_policy.md` and project package policies.
- **MUST NOT:** Install a package for logic that can be written in a few lines of clean, native standard library code.

### 4. Project MD Specification SSoT
- **MUST NOT:** The AI MUST NOT invent business rules, data schemas, or interface structures without consulting `PROJECT/MD/`.
- **MUST:** Read authoritative specifications in `PROJECT/MD/` before implementing features.

### 5. No Completion Without Verification
- **MUST NOT:** The AI MUST NEVER declare a task complete without executing the required verification steps in `02_testing/verification.md`.
- **MUST NOT:** The AI MUST NEVER hide, delete, or skip failing tests to fake a passing state.

### 6. No Silent Architectural Boundary Violations
- **MUST NOT:** The AI MUST NOT take shortcuts that violate established architectural boundaries or bypass defined module interfaces.
- **MUST:** The AI MUST respect the boundaries and dependency direction defined by the active project architecture (whether Layered, Clean, Hexagonal, Modular Monolith, Event-Driven, CQRS, Serverless, Functional, or Custom), or author a formal ADR if an exception is justified.

### 7. No Silent Overwriting of Project Decisions & Business Rules
- **MUST NOT:** The AI MUST NOT revert or override decisions recorded in `PROJECT/MD/business_rules.md` or `PROJECT/MD/stack.yaml`.
- **MUST:** If an instruction appears to contradict an established rule, point out the conflict and request confirmation.

### 8. Strict Anti-Overengineering Discipline
- **MUST NOT:** Add abstraction layers (factories, custom adapters, micro-frameworks) without demonstrated requirement.
- **MUST NOT:** Refactor working, out-of-scope legacy files during a targeted task.
- **MUST:** Prefer the simplest robust design that satisfies the active requirements.

# Verification
1. Confirm that no unauthorized packages were added.
2. Confirm that all modified files respect project architectural boundaries.
3. Confirm that no existing project decisions were silently reverted.
4. Confirm all verification gates pass before outputting final response.
