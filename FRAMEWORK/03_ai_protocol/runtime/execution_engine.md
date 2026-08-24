# Runtime Specification: Universal Execution Engine Contract

# Purpose
This document defines the formal, technology-agnostic interoperability contract between the **Taqniya AI Development Framework** (Governance, Architecture, Policies, Verification) and the **Configured Execution Engine** (Task Planning, Implementation, Debugging, Workflow Execution).

Taqniya is 100% execution-engine-agnostic. It does not contain engine-specific branching or hardcoded workflows. It provides a universal task handoff interface and enforces immutable verification gates.

---

## 1. Pure Architectural Duality: "WHAT vs HOW"

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        TAQNIYA FRAMEWORK (WHAT)                        │
│                   "WHAT RULES & POLICIES MUST BE MET"                  │
├────────────────────────────────────────────────────────────────────────┤
│ • Architectural boundary governance, layer isolation, & coupling rules │
│ • Non-negotiable security invariants, perimeter auth, & input defense  │
│ • Data integrity, schema consistency, & storage evolution standards    │
│ • Frontend capability policies & design system token enforcement       │
│ • Multi-Stage Pre-Completion Verification Gatekeeper                   │
│ • Semantic Project MD Documentation Synchronization                    │
│ • Strict 10-Point Definition of Done (DoD)                             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Delivers Universal Resolved Context
                                    │ (Prompt + Stack Rules + Policies + MD)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    CONFIGURED EXECUTION ENGINE (HOW)                   │
│                       "HOW TO EXECUTE THE TASK"                        │
├────────────────────────────────────────────────────────────────────────┤
│ • Task decomposition, dependency mapping, & actionable step planning   │
│ • Internal execution methodology (TDD loops, progressive coding)       │
│ • Systematic hypothesis-driven debugging & error isolation             │
│ • Source code authoring, migrations, and test case creation            │
│ • Internal code quality inspection & self-reflection                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Configuration Schema & Engine Resolution

Projects declare their active execution engine via `PROJECT/MD/execution_engine.yaml`:

```yaml
# PROJECT/MD/execution_engine.yaml
execution_engine:
  name: "superpowers" # Must match an engine registered in execution_engines.yaml
```

### Canonical Registry (`execution_engines.yaml`):
The list of recognized execution engines is maintained in [`FRAMEWORK/03_ai_protocol/runtime/execution_engines.yaml`](execution_engines.yaml):
* **`superpowers`**: External agent workflow methodology (Structured planning, subagents, TDD).
* **`claude_code`**: CLI-driven agentic execution environment.
* **`antigravity`**: IDE interactive agent environment.
* **`codex`**: Direct code generation and patch synthesis.
* **`custom`**: User-defined orchestration scripts, custom runners, or manual workflows.
* **`native`**: Built-in structured execution lifecycle provided directly by Taqniya Runtime.

---

## 3. Strict Resolution & Fallback Rules

| Scenario | System Behavior | Rationale / Action |
| :--- | :--- | :--- |
| **Valid Recognized Engine** | **ACCEPT & PROCEED** | Delivers Resolved Task Context to the configured engine. |
| **Missing File (`execution_engine.yaml`)** | **DEFAULT TO `native`** | Taqniya executes directly via its built-in structured lifecycle (`task_lifecycle.md`). No crash or error. |
| **Unknown Engine / Typo (e.g., `claud_code`)** | **CONFIGURATION ERROR (HALT)** | Prevents silent bugs. The AI stops and requests the developer to fix the name against `execution_engines.yaml`. |
| **Internal Flags Present (`tdd: true`, etc.)** | **DISREGARDED** | `execution_engine.yaml` specifies ONLY engine identity. Internal workflow mechanics belong to the engine. |

---

## 4. Definition of `native` Execution Engine

> **DEFINITION:**  
> **`native`** is the baseline, built-in execution engine methodology recognized by Taqniya.  
> When selected (or when `execution_engine.yaml` is absent), the AI operates as a direct execution engine performing standard sequential task decomposition, code implementation, and testing, without delegating to an external agent orchestrator or third-party workflow methodology.  
> Like all other engines, `native` operates strictly under Taqniya governance and must pass all verification gates.

---

## 5. Universal Handoff Contract: Inputs & Outputs

Taqniya treats all execution engines identically through a standardized I/O interface:

```text
               1. USER PROMPT
                     │
                     ▼
          2. TAQNIYA RESOLVED CONTEXT
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
  Inputs Delivered:         Outputs Expected:
  • Active Task Prompt      • Clean Source Code
  • Stack Profile Rules     • Passing Automated Tests
  • Project MD Specs        • Architectural Boundary Adherence
  • Capability Policies     • Traceable Diffs
        │                         │
        └────────────┬────────────┘
                     ▼
       3. EXECUTION ENGINE HANDOFF
      (Engine executes internally)
                     │
                     ▼
       4. TAQNIYA VERIFICATION
      (8-Stage Quality Gatekeeper)
                     │
                     ▼
       5. COMPLETION SIGN-OFF
```

---

## 6. Strict Authority Boundaries

> **NON-NEGOTIABLE INVARIANT:**  
> The Execution Engine operates **strictly within** the boundaries established by Taqniya and `PROJECT/MD/`.

| The Execution Engine CAN: | The Execution Engine CANNOT: |
| :--- | :--- |
| Decompose tasks into logical implementation steps. | Modify `stack.yaml` or change declared technologies without user approval. |
| Choose optimal internal planning and reasoning loops. | Bypass or disable `frontend_capabilities.yaml` policy states. |
| Write source code, migrations, and test cases. | Violate security rules (e.g., raw SQL injection, perimeter bypass). |
| Execute test runners, linters, and build commands. | Declare a task complete if Taqniya verification gates fail. |
| Perform hypothesis-driven debugging on failures. | Silently override approved business rules in `PROJECT/MD/`. |

---

## 7. The Engine Interchangeability Test (Swappability)

Taqniya guarantees **100% Engine Swappability**:
* Changing `name: "superpowers"` to `name: "claude_code"` or `name: "codex"` requires **zero changes** to `00_core/`, `01_design_system/`, `06_stack_profiles/`, or the 10-step lifecycle.
* Taqniya never evaluates `if (engine == "superpowers")` in its core logic; it delivers the same universal context and validates the same universal quality gates.
