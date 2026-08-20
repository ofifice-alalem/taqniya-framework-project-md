# Workflow: Architecture Compliance & Boundary Audit

# Purpose
This workflow establishes the protocol for auditing source code against the complete architecture hierarchy: Taqniya Core Principles, Active Technology Profiles, Project-Specific Architecture, and approved ADRs.

# Scope
Executed prior to writing code, during code generation, and as part of peer code reviews.

---

## 1. Multi-Tier Compliance Audit Flow

```
Step 1: Identify Selected Project Architecture & Active Technology Profiles
   │
   ▼
Step 2: Inspect Global Core Principles (00_core/architecture.md)
   │
   ▼
Step 3: Inspect Active Technology Profiles (06_stack_profiles/*)
   │
   ▼
Step 4: Inspect Project Overrides & ADRs (PROJECT/MD/00_project/ & 06_decisions/ADR/)
   │
   ▼
Step 5: Detect Violations & Remediate / Document
```

---

## 2. Universal Structural Boundary Audit Checklist

### A. Ingress & Interface Boundaries
- [ ] Are interface handlers (HTTP, CLI, Events, UI) focused strictly on transport orchestration and parameter validation?
- [ ] Are handlers free of core domain calculations, direct raw queries, and business state decisions?
- [ ] Is input validation encapsulated at the interface perimeter?

### B. Domain & Business Logic Boundaries
- [ ] Is core business logic encapsulated in cohesive domain units (e.g., Use Cases, Services, Actions, or pure functions according to project architecture)?
- [ ] Are domain functions decoupled from external transport objects (e.g., not depending directly on raw HTTP requests)?
- [ ] Are multi-entity state mutations properly coordinated using atomic transactions or consistency controls (where supported)?

### C. Infrastructure & Persistence Boundaries
- [ ] Are storage queries, external API integrations, and hardware interactions encapsulated behind clean module or interface boundaries?
- [ ] Are infrastructure modules free of business decision logic?
- [ ] Are dynamic queries parameterized and protected against injection attacks?

---

## 3. Conflict Reconciliation Protocol
When code or requirements appear to conflict with standard architecture:
1. **Check for Approved ADRs:** Check `PROJECT/MD/06_decisions/ADR/` to see if an intentional architectural decision was made.
2. **Apply Precedence Hierarchy:** Follow the 9-level rule hierarchy in `03_ai_protocol/project_md_protocol.md`.
3. **Remediate or Author ADR:** If the deviation is accidental, refactor to proper boundaries. If the exception is necessary and justified, author a formal ADR before proceeding.

# Verification
1. Walk through the Boundary Audit Checklist for every modified component.
2. Verify zero circular dependencies exist across modified modules.
3. Confirm that all business rules reside in designated domain components.
