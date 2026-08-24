# Activation Workflow: Antigravity IDE Integration

# Purpose
This document defines the activation and configuration procedure for operating the **Taqniya AI Development Framework** within the **Antigravity IDE** (and compatible environment hosts). It outlines how to point workspace rules or global hooks to Taqniya's technology-agnostic runtime protocol.

---

## 1. Activation Specification vs Host Configuration

```text
┌────────────────────────────────────────────────────────────────────────┐
│              ACTIVATION SPECIFICATION vs HOST CONFIGURATION            │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Activation Procedure (This Document):                               │
│    Defines the setup steps, hook structures, and workspace             │
│    instructions for connecting the host environment to Taqniya.        │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Host Execution Trigger (Physical Execution Hook):                   │
│    Taqniya operates as a governance framework; actual invocation       │
│    depends on the environment's supported instruction mechanism        │
│    (e.g., workspace GEMINI.md, system rules, or IDE customization).    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Recommended Host Hook Models

### Model A: Project Workspace Hook (Recommended for Project-Level Activation)
Place a `GEMINI.md` or `AGENTS.md` file in the project workspace root:

```markdown
# [PROJECT_NAME] — Engineering Instructions

This project is governed by the **Taqniya AI Development Framework v1.0**.

- **Stack Configuration:** `PROJECT/MD/stack.yaml`
- **Capabilities & Policies:** `PROJECT/MD/frontend_capabilities.yaml`
- **Execution Engine:** `PROJECT/MD/execution_engine.yaml`
- **Project Specifications (SSoT):** `PROJECT/MD/`
- **Taqniya Framework Root:** `FRAMEWORK/`

## Operating Directives:
1. Read `PROJECT/MD/stack.yaml`, `frontend_capabilities.yaml`, and `execution_engine.yaml` before proposing code.
2. Perform Task Impact Analysis to load only relevant `PROJECT/MD/` and `06_stack_profiles/` files.
3. Obey the 9-level conflict hierarchy: Platform Safety > User Direction > Core Mandatory > Stack Specs > Profiles > Functional Phases.
4. Execute via the configured Execution Engine, then run the 8-Stage Verification Gatekeeper.
5. Record completed deliverables in `PROJECT/MD/phases/<phase_name>/README.md`.
```

### Model B: Global Host Rule (For Machine-Wide Auto-Discovery)
If the host supports global rule injection (e.g., `~/.gemini/config/rules/taqniya.md`), install a global rule that detects `PROJECT/MD/stack.yaml` in opened workspaces and delegates execution to Taqniya runtime protocols.

### Model C: Custom IDE Skill (`taqniya`)
If the host utilizes on-demand skill discovery (e.g., `~/.gemini/config/skills/taqniya/SKILL.md`), wrap Taqniya runtime protocols as an invocable skill.

---

## 3. Verification Checklist for Activation
- [ ] `PROJECT/MD/stack.yaml` exists and contains valid technologies.
- [ ] `PROJECT/MD/frontend_capabilities.yaml` (if frontend is used) or `execution_engine.yaml` is declared.
- [ ] Host workspace instructions (`GEMINI.md` / `AGENTS.md`) point to `FRAMEWORK/03_ai_protocol/runtime/task_lifecycle.md`.
