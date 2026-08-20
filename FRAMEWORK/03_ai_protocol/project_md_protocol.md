# Project MD Interaction Protocol & Rule Priority Hierarchy

# Purpose
This document governs how AI agents interact with project-specific documentation (`PROJECT/MD/`), defines the precise Single Source of Truth (SSoT) model, and establishes the strict rule precedence hierarchy for resolving conflicts.

# Scope
Applies to all project-level documentation reading, writing, and conflict reconciliation across all repositories.

---

## 1. The Tripartite Source of Truth Model

```
┌────────────────────────────────────────────────────────┐
│ 1. PROJECT MD (PROJECT/MD/*)                           │
│    Authoritative specification for requirements,       │
│    business rules, architectural intent, and schemas.   │
├────────────────────────────────────────────────────────┤
│ 2. SOURCE CODE                                         │
│    Authoritative implementation of runtime behavior.   │
├────────────────────────────────────────────────────────┤
│ 3. AUTOMATED TESTS                                     │
│    Executable verification of expected behavior.       │
└────────────────────────────────────────────────────────┘
```

---

## 2. Rule Priority & Conflict Resolution Hierarchy

When instructions, standards, or specifications conflict, the AI agent MUST resolve them using this exact precedence order:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Platform & System Safety Constraints                                │
│    (Prevent data destruction, credential exposure, or security leaks)  │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Explicit Current User Direction in Active Prompt                    │
│    (Controls choices and preferences; subject to Levels 1 & 3)         │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Taqniya Core Mandatory Invariants (MUST / MUST NOT)                 │
│    (03_ai_protocol/mandatory_rules.md, Security & Data Safety)         │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Project Architecture Decisions / Approved ADRs                      │
│    (PROJECT/MD/06_decisions/ADR/, architecture_overrides.md)           │
├────────────────────────────────────────────────────────────────────────┤
│ 5. Technology / Stack Profiles (06_stack_profiles/*)                   │
├────────────────────────────────────────────────────────────────────────┤
│ 6. Project MD Specifications                                           │
│    (00_project/, 03_features/*/acceptance_criteria, data.md)           │
├────────────────────────────────────────────────────────────────────────┤
│ 7. Taqniya Recommended Guidelines (SHOULD / SHOULD NOT)                │
│    (00_core/*, 01_design_system/*, 02_testing/* baselines)              │
├────────────────────────────────────────────────────────────────────────┤
│ 8. Existing Source Code / Implementation Evidence                      │
├────────────────────────────────────────────────────────────────────────┤
│ 9. General Community Conventions & AI Preferences                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Legitimate Customization vs Silent Overrides
- **Customization Is Permitted:** A project MAY customize or override generic framework defaults (e.g., choosing GraphQL over REST, or using a specific ORM) by documenting it in `PROJECT/MD/00_project/architecture_overrides.md` or an approved ADR.
- **No Silent Violations (Level 3 Precedence):** A project MUST NOT silently violate Level 1 Safety or Level 3 Mandatory Invariants (e.g., an ADR cannot secretly disable parameterized SQL queries or security perimeter checks). If an ADR specifies X but Taqniya Core MUST mandates NOT X, **Taqniya Level 3 MUST wins**.
- **Explicit Rationale:** Any architectural customization within valid boundaries must state the reason and impact clearly in an ADR.

---

## 4. Discrepancy Resolution Protocol
When code and `PROJECT/MD/` diverge:
1. **Identify the Divergence:** Isolate the exact mismatch.
2. **Check History & ADRs:** Determine if the code was intentionally updated.
3. **Reconcile:** Fix the code if it was a bug; update `PROJECT/MD/` if the specification evolved.
4. **Clarify When Ambiguous:** If intent cannot be confirmed from git history, prompt the user for clarification before applying breaking edits.

# Verification
1. Verify that `PROJECT/MD/` was consulted prior to modifying source code.
2. Confirm that any documented project override follows the ADR / override format.
3. Verify that semantic changes are synchronized back to `PROJECT/MD/`.
