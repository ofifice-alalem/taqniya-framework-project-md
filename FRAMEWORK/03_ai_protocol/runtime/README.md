# Taqniya Runtime Protocol & AI Execution Architecture

# Purpose
The **Taqniya Runtime Protocol** defines the active operating machinery that bridges **Antigravity (AI Host)**, **Taqniya Core (Engineering Standards)**, **Stack Configuration (`PROJECT/stack.yaml`)**, **Technology Profiles (`06_stack_profiles/*`)**, **Project Specifications (`PROJECT/MD/*`)**, and **Superpowers (Optional Workflow Engine)** into a unified, conflict-free pair-programming experience.

It transforms Taqniya from a static documentation blueprint into an active runtime contract that guides the AI autonomously across every task lifecycle.

---

## 1. System Responsibility Matrix

To eliminate friction and ensure zero overlapping authority, responsibilities are strictly partitioned:

```
┌──────────────────────────────────────────────────────────────────────────┐
│                             SYSTEM ROLES                                 │
├────────────────────┬─────────────────────────────────────────────────────┤
│ System Component   │ Core Operational Responsibility                     │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Antigravity        │ HOST & EXECUTION AGENT                              │
│                    │ Reads files, runs tools, executes commands, reports. │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Taqniya Core       │ WHAT RULES & STANDARDS MUST BE FOLLOWED             │
│                    │ Universal boundary governance, security, data       │
│                    │ integrity, testing pyramid, DoD, and AI invariants. │
├────────────────────┼─────────────────────────────────────────────────────┤
│ PROJECT/stack.yaml │ WHAT TECHNOLOGIES ARE USED IN THIS PROJECT          │
│                    │ Authoritative declaration of runtimes, frameworks,  │
│                    │ engines, tools, and package managers.               │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Technology Profile │ HOW TO APPLY RULES TO SPECIFIC TOOLS                │
│ (06_stack_profiles)│ Ecosystem idioms, syntax patterns, approved packages,│
│                    │ and toolchain-specific testing/linting commands.    │
├────────────────────┼─────────────────────────────────────────────────────┤
│ PROJECT/MD/        │ WHAT ARE WE BUILDING & PROJECT-SPECIFIC DECISIONS   │
│                    │ Ubiquitous domain language, schemas, routes, ADRs,  │
│                    │ business rules, and implementation phase roadmaps.  │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Superpowers        │ HOW TO PLAN AND EXECUTE TASKS METHODICALLY          │
│                    │ Task decomposition, TDD cycles, debugging loops,    │
│                    │ code review routines, and verification planning.    │
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
                     │   (Parse PROJECT/stack.yaml)  │
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
                     │    5. SUPERPOWERS WORKFLOW    │
                     │     (Plan / TDD / Execute)    │
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
                     │  (Project MD + changes.md)    │
                     └───────────────────────────────┘
```

---

## 3. Runtime Specification Catalog

| Specification File | Purpose & Focus Area |
| :--- | :--- |
| **[1. Bootstrap Protocol](bootstrap.md)** | Workspace detection, project initialization, validation checks, and startup sequence. |
| **[2. Stack Resolution](stack_resolution.md)** | Parsing `PROJECT/stack.yaml`, extracting multi-dimensional technologies, and zero-assumption rules. |
| **[3. Profile Resolution](profile_resolution.md)** | Mapping technologies to `06_stack_profiles/*`, version matching, and Unknown Technology Fallback. |
| **[4. Context Resolution](context_resolution.md)** | Task-driven minimal context loading algorithm preventing prompt bloat and token waste. |
| **[5. Conflict Resolution](conflict_resolution.md)** | 9-level authority hierarchy, rule precedence, and resolving Code vs Documentation drift. |
| **[6. Task Lifecycle](task_lifecycle.md)** | End-to-end 10-step execution lifecycle from initial user prompt to verified completion. |
| **[7. Superpowers Integration](superpowers_integration.md)** | Interoperability contract between Superpowers (HOW to work) and Taqniya (WHAT rules to enforce). |
| **[8. Antigravity Activation](antigravity_activation.md)** | Concrete Antigravity hooks, global rules, and workspace entry points. |
