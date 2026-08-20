# Runtime Specification: Superpowers Integration Contract

# Purpose
This document establishes the formal interoperability contract between **Taqniya AI Development Framework** and **Superpowers** (or any external workflow methodology). It guarantees that the two systems operate in complete harmony without overlap, role competition, or authority conflicts.

---

## 1. Division of Responsibility: "HOW vs WHAT"

```
┌────────────────────────────────────────────────────────┐
│                      SUPERPOWERS                       │
│                  "HOW TO DO THE WORK"                  │
├────────────────────────────────────────────────────────┤
│ • Task decomposition & step-by-step planning           │
│ • Test-Driven Development (TDD) loop coordination      │
│ • Systematic debugging & hypothesis testing            │
│ • Iterative execution & refactoring workflows          │
│ • Code review routines & self-reflection               │
└───────────────────────────┬────────────────────────────┘
                            │  Operates INSIDE the
                            │  boundaries defined by:
                            ▼
┌────────────────────────────────────────────────────────┐
│                   TAQNIYA FRAMEWORK                    │
│             "WHAT RULES MUST BE FOLLOWED"              │
├────────────────────────────────────────────────────────┤
│ • Architectural boundary governance & coupling rules   │
│ • Security invariants & defense-in-depth               │
│ • Data integrity, consistency & storage standards      │
│ • Design system tokens & accessibility benchmarks      │
│ • Multi-stage Pre-Completion Verification Gatekeeper   │
│ • Semantic Project MD Documentation Synchronization    │
│ • Strict 10-Point Definition of Done (DoD)             │
└────────────────────────────────────────────────────────┘
```

---

## 2. Superpowers Availability & Fallback Protocol

> **CRITICAL INVARIANT:** **Superpowers MUST NOT be assumed to exist.**

```
[ Antigravity Task Execution ]
              │
              ▼
Is Superpowers Available & Active in the Host?
              │
              ├─► YES ──► Engage Superpowers Workflow Methodology
              │           (Planning ➔ TDD ➔ Debugging loops within Taqniya rules)
              │
              └─► NO  ──► Execute Standard Taqniya Task Lifecycle
                          (Direct autonomous execution following task_lifecycle.md)
```

Taqniya is 100% self-sufficient. If Superpowers is not installed, Taqniya continues operating seamlessly without any degraded governance or blocked workflows.

---

## 3. Technology-Neutral Collaboration Model

When executing complex tasks under both systems:

1. **Taqniya Primes Governance & Constraints:**
   - Reads `PROJECT/MD/stack.yaml` and extracts declared technology dimensions.
   - Resolves applicable Technology Profiles from `06_stack_profiles/*`.
   - Loads authoritative project specifications from `PROJECT/MD/` (domain rules, data structures, interface contracts).
   - Enforces non-negotiable security boundaries (parameterized queries, perimeter validation, access controls).

2. **Superpowers Drives the Execution Workflow:**
   - Decomposes deliverables based on the project's selected architecture:
     $$\text{Interface / Ingress} \longrightarrow \text{Domain Business Logic} \longrightarrow \text{Persistence / External Adapters} \longrightarrow \text{Tests}$$
   - When behavioral changes are introduced, coordinates TDD loops (failing test first ➔ minimal code ➔ refactor).
   - If unexpected execution failures arise, engages systematic hypothesis-driven debugging.

3. **Taqniya Enforces Verification & SSoT Synchronization:**
   - Audits code changes against project architecture boundaries and active profile idioms.
   - Executes the 8-Stage Verification Gatekeeper.
   - Synchronizes semantic specifications in `PROJECT/MD/` and updates active phase documentation in `PROJECT/MD/phases/`.
   - Validates the 10-point Definition of Done before declaring completion.

---

## 4. Non-Interference Guarantees

1. **Taqniya does NOT micromanage workflow mechanics:** Taqniya does not dictate how Superpowers structures its internal planning prompts, how it debugs syntax errors, or what scratchpads it uses.
2. **Superpowers CANNOT bypass Taqniya standards:** Superpowers cannot declare a task complete if Taqniya verification gates fail, if security rules are violated, or if documentation synchronization is omitted.
3. **Harmonious Coexistence:** Superpowers provides the execution workflow methodology; Taqniya provides the engineering governance and mandatory constraints.
