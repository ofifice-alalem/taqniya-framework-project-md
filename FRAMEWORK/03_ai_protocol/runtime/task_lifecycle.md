# Runtime Specification: The 10-Step Task Execution Lifecycle

# Purpose
This document defines the complete end-to-end execution lifecycle followed by the AI agent from the moment a user submits a prompt to the final verified completion.

---

## 1. The 10-Step Operational Flowchart

```
[ USER PROMPT / REQUEST ]
            │
            ▼
   1. BOOTSTRAP CHECK
   (Verify active workspace & project state)
            │
            ▼
   2. READ STACK CONFIGURATION
   (Parse PROJECT/MD/stack.yaml)
            │
            ▼
   3. RESOLVE PROFILES
   (Match 06_stack_profiles/* or prime Unknown Technology Protocol)
            │
            ▼
   4. TASK IMPACT ANALYSIS
   (Primary Domain + Affected Dimensions + Required Authorities)
            │
            ▼
   5. LOAD MINIMAL TASK CONTEXT
   (Task-Driven Context Loading: Core + Profile + Project MD)
            │
            ▼
   6. INSPECT EXISTING CODEBASE
   (Verify existing implementation, detect drift, check tests)
            │
            ▼
     7. EXECUTION ENGINE HANDOFF
     (Pass Resolved Governance Payload to configured Execution Engine)
              │
              ├─► Configured Engine (superpowers / claude_code / antigravity / codex / custom)
              │   (Autonomous implementation, planning loops, coding, testing)
              │
              └─► Native Fallback (Built-in autonomous Taqniya execution lifecycle)
              │
              ▼
    8. TAQNIYA VERIFICATION GATEKEEPER
    (Task-relevant tests, static analysis, linting, boundaries)
             │
             ▼
    9. SEMANTIC DOCUMENTATION SYNCHRONIZATION
    (Update affected PROJECT/MD/ specs + phase files)
             │
             ▼
    10. COMPLETION SIGN-OFF
    (Validate 10-Point DoD ➔ Output Concise Summary)
```

---

## 2. Step-by-Step Operational Detail

### Step 1: Bootstrap Check
Verify that the workspace is an active Taqniya project (`PROJECT/MD/stack.yaml` and `PROJECT/MD/` present).

### Step 2: Read Stack Configuration, Capabilities & Execution Engine
Extract declared technologies from `PROJECT/MD/stack.yaml`, active capability policies from `PROJECT/MD/frontend_capabilities.yaml`, and configured Execution Engine from `PROJECT/MD/execution_engine.yaml` following the resolution protocol.

### Step 3: Resolve Profiles & Capability Policies
Match declared technologies to `06_stack_profiles/{dimension}/{tech}/` and load `06_stack_profiles/frontend/common/capability_policy.md` and `execution_engine.md`. If a profile is missing, activate the Unknown Technology Protocol gracefully.

### Step 4: Task Impact Analysis
Analyze the user request to determine:
- **Primary Domain:** (e.g., Domain Logic, UI, Storage, Security, Architecture, Refactor).
- **Affected Dimensions:** (e.g., Backend, Database, Auth, Testing).
- **Required Authorities:** Identify exact Core rules, Profiles, and MD files needed.

### Step 5: Load Minimal Task Context
Load ONLY the union of Core rules, Technology Profiles, and Project MD specifications identified during impact analysis. Omit all irrelevant rules.

### Step 6: Inspect Existing Codebase
Read target source files, existing tests, and neighboring modules. Reconcile any divergence against Project MD using the Conflict Resolution Protocol.

### Step 7: Execution Engine Handoff & Implementation
- Pass the **Resolved Task Context** to the configured Execution Engine declared in `PROJECT/MD/execution_engine.yaml` (e.g., Superpowers, Claude Code, Antigravity, or Custom).
- The Execution Engine performs planning, iterative implementation, and error debugging within the constraints of Taqniya rules.
- If no external engine is configured or active, Taqniya executes directly following native structured task decomposition.

#### Task-Appropriate Testing Discipline:
- **Behavioral Changes & New Features:** SHOULD author failing automated tests first (TDD: Red ➔ Green ➔ Refactor) where practical and supported by the testing stack.
- **Refactoring & Optimization:** Run regression tests continuously to ensure behavioral invariants remain green.
- **Documentation, Formatting & Cosmetic UI Tasks:** TDD is NOT mandatory. Apply changes directly and verify via linting, static analysis, visual inspection, or doc synchronization.

### Step 8: Taqniya Verification Gatekeeper
Execute the 8-stage verification suite evaluating only applicable gates:
- [ ] Task-relevant automated tests pass 100% (where applicable).
- [ ] Static analysis & type checking pass with 0 errors (where configured).
- [ ] Linter passes with clean diffs.
- [ ] Architectural boundaries respected.
- [ ] Security rules and injection defenses verified.

### Step 9: Semantic Documentation Synchronization
Apply the Semantic Impact Flow: If system behavior, data structures, or routes changed, update the authoritative files in `PROJECT/MD/` and phase files in `PROJECT/MD/phases/`.

### Step 10: Completion Sign-Off
Confirm the 10-point Definition of Done is fully satisfied, then deliver a concise, evidence-based verification summary to the user.
