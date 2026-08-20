# Runtime Specification: Conflict Resolution & Rule Precedence

# Purpose
This document defines the deterministic 9-level authority hierarchy and reconciliation protocols used by Antigravity when resolving conflicting guidelines across Core rules, Technology Profiles, Project MD specifications, and Source Code.

---

## 1. The 9-Level Authority Hierarchy

When two rules or instructions appear in conflict, the rule at the higher authority level MUST strictly override:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE 9-LEVEL AUTHORITY HIERARCHY                 │
├─────────┬──────────────────────────────────────────────────────────────┤
│ Level 1 │ Platform Safety & System Execution Constraints               │
├─────────┼──────────────────────────────────────────────────────────────┤
│ Level 2 │ Explicit Current User Direction in Active Prompt             │
│         │ (Overrides preferences & designs; subject to Level 1 & 3)    │
├─────────┼──────────────────────────────────────────────────────────────┤
│ Level 3 │ Taqniya Core Mandatory Invariants (MUST / Non-Negotiable)    │
│         │ (03_ai_protocol/mandatory_rules.md, Security Invariants)     │
├─────────┼──────────────────────────────────────────────────────────────┤
│ Level 4 │ Approved Project Decisions & Architecture Decision Records   │
│         │ (PROJECT/MD/06_decisions/ADR/, architecture_overrides.md)    │
├─────────┼──────────────────────────────────────────────────────────────┤
│ Level 5 │ Active Technology Profiles (06_stack_profiles/*)             │
├─────────┼──────────────────────────────────────────────────────────────┤
│ Level 6 │ Project MD Specifications (00_project/, 03_features/*)       │
├─────────┼──────────────────────────────────────────────────────────────┤
│ Level 7 │ Taqniya Core Recommended Guidelines (SHOULD / Best Practice) │
│         │ (Recommended token baselines, default naming conventions)    │
├─────────┼──────────────────────────────────────────────────────────────┤
│ Level 8 │ Existing Source Code (Executable Ground Truth)               │
├─────────┼──────────────────────────────────────────────────────────────┤
│ Level 9 │ General Ecosystem Conventions & AI Model Prior Knowledge     │
└─────────┴──────────────────────────────────────────────────────────────┘
```

---

## 2. User Direction Scope vs Mandatory Invariants

- **User Direction Scope:** The user's explicit prompt instructions can customize architectural styles, override recommended guidelines (Level 7), select specific libraries, and adjust design tokens.
- **Non-Overridable Boundary:** Explicit user direction MUST NOT override **Level 1 (Platform Safety)** or **Level 3 (Core Mandatory Invariants & Security)**. For instance, if a prompt instructs injecting unparameterized raw user input directly into dynamic queries without escaping or parameter binding, the AI agent MUST point out the security violation and apply safe parameterized bindings.

---

## 3. Mandatory Invariants (Level 3) vs Recommended Guidelines (Level 7)

To prevent duplication and clarify override boundaries, Taqniya Core distinguishes:

- **Level 3: Core Mandatory Invariants (MUST / Non-Negotiable):**
  - Zero unparameterized dynamic queries (injection defense).
  - Explicit boundary separation (transport decoupled from domain logic).
  - Test isolation (zero mutable state leakage between tests).
  - No secret credentials in version control.
  - SSoT verification before completion (DoD).
  *➔ **Operational Rule:** An ADR (Level 4) CANNOT override or disable a Level 3 Core Mandatory Invariant. If an ADR specifies X but Taqniya Core MUST mandates NOT X, **Taqniya Level 3 MUST wins**.*

- **Level 7: Core Recommended Guidelines (SHOULD):**
  - Recommended spacing scales (`4px / 8px / 16px`) and default breakpoints (`640px / 768px`).
  - Suggested layer naming idioms.
  - Default test naming conventions.
  *➔ CAN be customized or overridden by Project ADRs (Level 4) or Stack Profiles (Level 5).*

---

## 4. Concrete Conflict Scenarios & Resolutions

### Scenario A: Framework Convenience vs Core Security Invariant
* **Conflict:** Active framework docs permit raw query string concatenation, but `00_core/security_rules.md` strictly forbids dynamic string injection.
* **Resolution:** **Taqniya Core (Level 3) overrides.** All dynamic parameters MUST be passed through parameterized bindings regardless of framework convenience.

### Scenario B: Project ADR vs Technology Profile Default
* **Conflict:** Technology Profile defaults to an Action-Repository pattern, but `PROJECT/MD/06_decisions/ADR/ADR-004.md` explicitly adopts a Direct-Service pattern without repositories.
* **Resolution:** **Project ADR (Level 4) overrides Technology Profile (Level 5).** Implement the Direct-Service pattern as decided in the approved ADR.

### Scenario C: Project Specification vs Core Security Invariant
* **Conflict:** A feature specification in `PROJECT/MD/03_features/` requests storing unhashed user passwords in plaintext.
* **Resolution:** **Core Invariant (Level 3) overrides Project MD (Level 6).** Refuse plaintext storage, notify the user of the security violation, and hash passwords using standard algorithms.

---

## 5. Code vs Documentation Drift Reconciliation Protocol

When source code implementation contradicts `PROJECT/MD/` documentation:

```
Divergence Detected (Code does B, Documentation says A)
                         │
                         ▼
           Step 1: Check ADR & Git Commit History
                         │
                         ├─► ADR exists approving B ──► Update Documentation to B
                         │
                         ├─► Defect / Accidental Bug ─► Refactor Code to match Spec A
                         │
                         └─► Unclear Intent ──────────► Pause & Prompt User for Confirmation
```

### The SSoT Reconciliation Invariant:
- **MUST NOT:** Never blindly overwrite working source code without verifying whether the divergence was an intentional enhancement.
- **MUST:** Treat source code as executable truth, but hold specifications as design authority. Where ambiguity exists, request explicit user confirmation.
