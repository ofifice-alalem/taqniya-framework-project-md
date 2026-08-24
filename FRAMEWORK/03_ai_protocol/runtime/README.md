# Taqniya Runtime Protocol & AI Execution Architecture

# Purpose
The **Taqniya Runtime Protocol** defines the active operating machinery that bridges **Taqniya Core (Engineering Standards)**, **Stack Configuration (`PROJECT/MD/stack.yaml`)**, **Technology Profiles (`06_stack_profiles/*`)**, **Project Specifications (`PROJECT/MD/*`)**, and the **Configured Execution Engine** into a unified, conflict-free pair-programming experience.

It transforms Taqniya from a static documentation blueprint into an active runtime contract that guides the AI autonomously across every task lifecycle.

---

## 1. System Responsibility Matrix

To eliminate friction and ensure zero overlapping authority, responsibilities are strictly partitioned:

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                             SYSTEM ROLES                                 │
├────────────────────┬─────────────────────────────────────────────────────┤
│ System Component   │ Core Operational Responsibility                     │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Taqniya Core       │ WHAT RULES & STANDARDS MUST BE FOLLOWED             │
│                    │ Universal boundary governance, security, data       │
│                    │ integrity, testing pyramid, DoD, and AI invariants. │
├────────────────────┼─────────────────────────────────────────────────────┤
│PROJECT/MD/stack.yaml│ WHAT TECHNOLOGIES & ARCHITECTURE ARE USED          │
│                    │ Authoritative declaration of runtimes, frameworks,  │
│                    │ communication modes (direct/api_first/hybrid), etc. │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Technology Profile │ HOW TO APPLY RULES TO SPECIFIC TOOLS                │
│ (06_stack_profiles)│ Ecosystem idioms, syntax patterns, approved packages,│
│                    │ and toolchain-specific testing/linting commands.    │
├────────────────────┼─────────────────────────────────────────────────────┤
│ PROJECT/MD/        │ WHAT ARE WE BUILDING & PROJECT-SPECIFIC DECISIONS   │
│                    │ stack.yaml, frontend_capabilities.yaml, database.md,│
│                    │ execution_engine.yaml, business rules, data, design.│
├────────────────────┼─────────────────────────────────────────────────────┤
│ Execution Engine   │ HOW TO PLAN AND EXECUTE TASKS METHODICALLY          │
│ (Declared in MD)   │ Autonomous implementation, planning loops, coding,  │
│                    │ and testing methodologies (superpowers, codex, etc.)│
└────────────────────┴─────────────────────────────────────────────────────┘
```

---

## 2. Dynamic Runtime Pipeline

```
                     ┌───────────────────────────────┐
                     │          USER PROMPT          │
                     └───────────────┬───────────────┘
                                     │
                                     ▼
                     ┌───────────────────────────────┐
                     │     1. BOOTSTRAP PROTOCOL     │
                     │  (Detect workspace & stack)   │
                     └───────────────┬───────────────┘
                                     │
                                     ▼
                     ┌───────────────────────────────┐
                     │     2. STACK RESOLVER         │
                     │ (Parse PROJECT/MD/stack.yaml) │
                     └───────────────┬───────────────┘
                                     │
                                     ▼
                     ┌───────────────────────────────┐
                     │    3. PROFILE RESOLVER        │
                     │  (Match 06_stack_profiles/*)  │
                     └───────────────┬───────────────┘
                                     │
                                     ▼
                     ┌───────────────────────────────┐
                     │ 4. CONTEXT RESOLUTION PROTOCOL│
                     │   (Task-Driven Lazy Loading)  │
                     └───────────────┬───────────────┘
                                     │
                                     ▼
                     ┌───────────────────────────────┐
                     │  5. EXECUTION ENGINE WORKFLOW │
                     │   (Configured Engine in MD)   │
                     └───────────────┬───────────────┘
                                     │
                                     ▼
                     ┌───────────────────────────────┐
                     │   6. TAQNIYA VERIFICATION     │
                     │    (8-Stage Quality Gate)     │
                     └───────────────┬───────────────┘
                                     │
                                     ▼
                     ┌───────────────────────────────┐
                     │  7. SEMANTIC DOC SYNC & DoD   │
                     │  (PROJECT/MD/ + phase files)  │
                     └───────────────────────────────┘
```

---

## 3. Runtime Specification & Engine Modules

| Specification / Module | Purpose & Focus Area |
| :--- | :--- |
| **[1. Bootstrap Protocol](bootstrap.md)** | Workspace detection, project initialization, validation checks, and startup sequence. |
| **[2. Stack Resolution](stack_resolution.md)** | Parsing `PROJECT/MD/stack.yaml`, extracting multi-dimensional technologies, and zero-assumption rules. |
| **[3. Profile Resolution](profile_resolution.md)** | Mapping technologies to `06_stack_profiles/*`, version matching, and Unknown Technology Fallback. |
| **[4. Context Resolution](context_resolution.md)** | Task-driven minimal context loading algorithm preventing prompt bloat and token waste. |
| **[5. Conflict Resolution](conflict_resolution.md)** | 9-level authority hierarchy, rule precedence, and resolving Code vs Documentation drift. |
| **[6. Task Lifecycle](task_lifecycle.md)** | End-to-end 10-step execution lifecycle from initial user prompt to verified completion. |
| **[7. Execution Engine Contract](execution_engine.md)** | Interoperability contract between the configured Execution Engine (HOW to work) and Taqniya (WHAT rules to enforce). |
| **[8. Execution Engine Catalog](execution_engines.yaml)** | Master catalog of registered and recognized execution engines (superpowers, claude_code, codex, antigravity, custom, native). |
| **[9. Runtime Engine Resolver](engine_resolver.js)** | Authoritative runtime module validating configured engines, missing file fallbacks, and error gates. |
| **[10. Runtime Resolver Audit](audit_runtime.js)** | Automated 11-point integration test suite verifying engine resolution and governance preservation. |
