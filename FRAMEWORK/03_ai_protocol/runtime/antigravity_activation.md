# Runtime Specification: Antigravity Activation & Entry Point

# Purpose
This document defines the activation specification for operating the **Taqniya AI Development Framework** within **Antigravity** (and compatible AI IDEs). It outlines the configuration models and hooks that enable an AI agent to discover `PROJECT/stack.yaml`, resolve Technology Profiles, and execute the 10-step Task Lifecycle.

---

## 1. Activation Specification vs Actual Host Configuration

```
┌────────────────────────────────────────────────────────────────────────┐
│              ACTIVATION SPECIFICATION vs HOST CONFIGURATION            │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Activation Specification (This Document):                           │
│    Defines the architectural contract, hook structure, and runtime     │
│    lifecycle expectations for AI agents.                               │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Actual Host Configuration (Physical Execution Trigger):             │
│    Taqniya cannot force an external AI host to execute instructions    │
│    merely because Markdown files exist in the repository.              │
│    Actual enforcement depends on the host's supported instruction      │
│    loading mechanism (e.g., workspace GEMINI.md, system rules,        │
│    or custom IDE skills).                                              │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Recommended Host Hook Models

### Model A: Project Workspace Hook (Recommended for Project-Level Activation)
When supported by the host, place a `GEMINI.md` or `AGENTS.md` file in the workspace root. This is the recommended project-level activation mechanism:

```markdown
# [PROJECT_NAME] — Antigravity Engineering Instructions

This project is governed by the **Taqniya AI Development Framework v1.0**.

- **Stack Configuration:** `PROJECT/stack.yaml`
- **Project Specifications (SSoT):** `PROJECT/MD/`
- **Taqniya Framework Root:** `C:\Users\alale\.gemini\antigravity-ide\scratch\FRAMEWORK` (or relative `FRAMEWORK/`)

## Operating Directives for AI Agents:
1. Read `PROJECT/stack.yaml` before proposing or generating code.
2. Perform Task Impact Analysis to load only relevant `PROJECT/MD/` and `06_stack_profiles/` files.
3. Obey the 9-level conflict hierarchy: Platform Safety > User Direction > Core Mandatory > ADRs > Profiles > Project MD.
4. Run task-relevant tests and static analysis before reporting completion.
5. Record completed deliverables in `PROJECT/MD/07_change_log/changes.md`.
```

### Model B: Global Host Rule (For Machine-Wide Auto-Discovery)
If the host supports global rule injection (e.g., `~/.gemini/config/rules/taqniya.md`), install a global rule that detects `PROJECT/stack.yaml` in opened workspaces and delegates execution to Taqniya runtime protocols.

### Model C: Custom IDE Skill (`taqniya`)
If the host utilizes on-demand skill discovery (e.g., `~/.gemini/config/skills/taqniya/SKILL.md`), wrap Taqniya runtime protocols as an invocable skill.

---

## 3. Verification Checklist for Activation

When testing activation in a target workspace:
1. [ ] The AI agent inspects `PROJECT/stack.yaml` upon initial task prompt.
2. [ ] The AI agent identifies declared technologies without assuming omitted dimensions.
3. [ ] The AI agent loads only task-relevant `PROJECT/MD/` files via Task Impact Analysis.
4. [ ] The AI agent executes the 8-stage verification gatekeeper before declaring completion.
