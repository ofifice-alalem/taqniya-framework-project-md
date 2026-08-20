# Testing Strategy & Quality Governance

# Purpose
This document establishes the universal testing philosophy, test categorization, and quality benchmarks across all projects under the Taqniya Framework. It defines WHAT quality standards must be satisfied, while Technology Profiles dictate HOW verification is executed, and the project defines WHICH suites are applicable.

# Scope
Applies to all automated test suites across backend, frontend, API, CLI, mobile, and distributed components.

---

## 1. Testing Responsibilities & Division of Concerns

```
┌────────────────────────────────────────────────────────┐
│ TAQNIYA TESTING STANDARD (Core Quality Governance)     │
│ Governs: WHAT standards must be satisfied              │
│ (Pyramid distribution, isolation, determinism, gates) │
├────────────────────────────────────────────────────────┤
│ TECHNOLOGY PROFILES (Ecosystem Tooling & Idioms)       │
│ Governs: HOW tests are authored and executed           │
│ (Test runners, assertion syntax, fixtures, mocks)      │
├────────────────────────────────────────────────────────┤
│ PROJECT SPECIFICATION (Project MD & stack.yaml)        │
│ Governs: WHICH test suites are configured and required │
│ (Unit, Integration, Feature, E2E, Regression scope)    │
└────────────────────────────────────────────────────────┘
```

---

## 2. The Pragmatic Testing Pyramid

```
                / \
               / E2E \             ◄── Critical User Journeys (Smoke / Interface Flows)
              /-------\
             / Feature \           ◄── Ingress, Commands, Workflows & Lifecycle (High ROI)
            /-----------\
           / Integration \         ◄── Persistence, External Adapters, Infrastructure
          /---------------\
         /    Unit Tests   \       ◄── Business Calculations, Domain Invariants, Pure Logic
        /-------------------\
```

---

## 3. Test Categories & Selection Guidelines

### A. Unit Tests (Isolated & Fast)
- **Scope:** Pure domain logic, business algorithms, formulas, state machine transitions, and validation rules.
- **Constraints:** Zero database/network I/O, sub-millisecond execution.
- **When to Use:** Mandatory for critical business algorithms and domain rules.

### B. Integration Tests (Persistence & Infrastructure)
- **Scope:** Storage mappers, queries, cache drivers, and third-party adapter clients (where applicable).
- **Constraints:** Runs against test storage sandboxes; mocks external third-party network APIs.
- **When to Use:** Verifying storage interactions, query correctness, and infrastructure adapters.

### C. Feature / Functional Tests (High Return on Investment)
- **Scope:** Complete command/request lifecycles, authentication/authorization boundaries, state mutations, and response serialization.
- **Constraints:** Runs in an isolated test environment with fresh state per test.
- **When to Use:** Recommended for newly exposed endpoints, CLI commands, or interface workflows.

### D. End-to-End (E2E) Tests (Critical User Flows)
- **Scope:** Critical user journeys and revenue/authentication paths (where applicable).
- **When to Use:** Smoke testing primary user journeys.

### E. Regression Tests (Bug Defense)
- **Scope:** Verified bug fixes.
- **Requirement:** A failing test reproducing the defect SHOULD be written prior to applying the fix.

---

## 4. Coverage Expectations: Value Over Vanity Metrics
- **Target Meaningful Coverage:** Prioritize 100% test coverage on critical domain logic, calculations, and security boundaries over chasing arbitrary 90%+ line coverage on trivial boilerplate.
- **Avoid Testing Framework Plumbing:** Do not write tests to verify that standard language or library features work unless custom logic is involved.

# Allowed
- Using factories, test builders, and fixture generators.
- Mocking external third-party network APIs (e.g., payment gateways, email providers) in automated suites.
- Running parallel test runners to maintain rapid feedback loops.

# Forbidden
- Making unmocked external network calls to production/staging third-party servers during test runs.
- Writing tests that depend on execution order or shared mutable global state.

# Verification
1. Confirm that new domain logic has corresponding Unit tests.
2. Confirm that newly exposed interfaces or commands have corresponding Feature/Functional tests (where applicable).
3. Verify test suites execute deterministically in random order.
