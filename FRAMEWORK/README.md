# 🧠 Taqniya AI Development Framework — v1.0

> **Universal, Technology-Agnostic AI Development Framework Driven Dynamically by User-Provided Stack Configuration**

---

## 1. Executive Overview

The **Taqniya AI Development Framework** is an enterprise-grade, spec-driven software engineering framework designed for AI coding agents (such as Antigravity, Claude, and Gemini) and engineering teams. 

Taqniya Core is **100% technology-agnostic at the rule level**. It makes zero assumptions about your programming language, web framework, architectural style, database engine, or testing tools. Instead, technology-specific behavior is dynamically determined by a **User-Provided Stack Configuration (`PROJECT/MD/stack.yaml`)** and optional modular **Technology Profiles** (`06_stack_profiles/`).

---

## 2. Core Mental Model: The Technology Resolution Pipeline

```
                ┌─────────────────────────────────┐
                │          TAQNIYA CORE           │  ◄── Global Engineering Constitution
                │      (Technology-Agnostic)      │      (Boundary rules, clean code, security, data integrity,
                │                                 │       testing standards, DoD, AI invariants)
                └────────────────┬────────────────┘
                                 │
                                 ▼
                ┌─────────────────────────────────┐
                │       STACK CONFIGURATION       │  ◄── User-Provided (PROJECT/MD/stack.yaml)
                │         (Project-Owned)         │      Declares frontend, backend, database,
                │                                 │      testing tools, runtime versions & tooling.
                └────────────────┬────────────────┘
                                 │
                                 ▼
                ┌─────────────────────────────────┐
                │   STACK RESOLUTION PROTOCOL     │  ◄── Validates stack.yaml & resolves matching
                │                                 │      Technology Profiles (or falls back to Core)
                └────────────────┬────────────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             ▼                   ▼                   ▼
      Frontend Profile    Backend Profile     Database Profile  (06_stack_profiles/*)
      (e.g., frontend/..) (backend/laravel/)  (database/..)     [OPTIONAL EXTENSIONS]
             │                   │                   │
             └───────────────────┼───────────────────┘
                                 ▼
                ┌─────────────────────────────────┐
                │           PROJECT MD            │  ◄── Project Knowledge (PROJECT/MD/*)
                │    (PROJECT-SPECIFIC SPECS)     │      stack.yaml, business rules, global data,
                │                                 │      design tokens, AI prompts, and functional phases.
                └────────────────┬────────────────┘
                                 │
                                 ▼
                ┌─────────────────────────────────┐
                │           AI CONTEXT            │  ◄── 10-Step Lazy-Loaded Minimal Context
                └────────────────┬────────────────┘
                                 │
                                 ▼
                ┌─────────────────────────────────┐
                │          SOURCE CODE            │  ◄── The verified implementation
                └─────────────────────────────────┘
```

---

## 3. Clear Division of Responsibilities

| Artifact | Responsibility | Question It Answers |
| :--- | :--- | :--- |
| **`Taqniya Core`** | Universal engineering principles, data integrity, security, and AI protocols. | *"How should an AI engineer reason safely and consistently?"* |
| **`PROJECT/MD/stack.yaml`** | Authoritative declaration of runtimes, frameworks, databases, and tooling. | *"What technologies are we using in this project?"* |
| **`Technology Profiles`** | Ecosystem-specific syntax, idioms, lint rules, and vetted package policies. | *"How do we work correctly with those specific tools?"* |
| **`PROJECT/MD/`** | Business domain invariants, data architecture, design tokens, AI prompts, functional phases. | *"What are we building and what are our project specifications?"* |
| **`Source Code`** | Production software implementation. | *"The running system."* |

---

## 4. Universal Architectural & Data Agility

### A. Architectural Style Flexibility
Taqniya Core supports any architectural paradigm chosen by the project:
- **Layered (N-Tier)**
- **Clean / Hexagonal (Ports & Adapters)**
- **Modular Monolith**
- **Event-Driven / CQRS**
- **Microservices / Serverless**
- **Functional / Reactive Pipelines**

### B. Storage Paradigm Independence
Core data principles govern data integrity, consistency, non-destructive evolution (expand-and-contract), and injection prevention across any storage model:
- **Relational / SQL** (PostgreSQL, MySQL, SQLite, MariaDB, SQL Server)
- **Document / NoSQL** (MongoDB, CouchDB, Firestore)
- **Key-Value & In-Memory** (Redis, DynamoDB, Memcached)
- **Graph & Cloud-Native Stores** (Neo4j, Spanner, Bigtable)

### C. Task-Relevant Clarification Model
If a technology dimension is omitted from `PROJECT/MD/stack.yaml`, Taqniya **never assumes or guesses a default**. It prompts for clarification **only if that omitted technology is required for the active task**:
- Creating a database migration while frontend is omitted ➔ **Proceeds safely without asking about frontend.**
- Creating a UI component while frontend is omitted ➔ **Prompts user for the frontend framework.**

---

## 5. Directory Structure

```text
FRAMEWORK/
├── README.md                          # Framework Constitution & Resolution Model
├── FRAMEWORK_AUDIT.md                 # System Audit, Inventory & Readiness Review
│
├── 00_core/                           # Global Technical Standards (100% Tech-Agnostic)
│   ├── stack.md                       # Stack configuration & dynamic resolution governance
│   ├── architecture.md                # Structural principles & pluggable architecture styles
│   ├── coding_rules.md                # Clean code, strict typing & anti-overengineering
│   ├── database_rules.md              # Universal data integrity, ACID/NoSQL, evolution & safety
│   ├── security_rules.md              # OWASP defense, authorization & zero-secrets
│   ├── package_policy.md              # Universal dependency evaluation & licensing
│   └── documentation_rules.md         # Tripartite SSoT model & semantic sync rules
│
├── 01_design_system/                  # Taqniya Spatial UI Design System (VisionOS Glassmorphism)
│   ├── index.html                     # Unified Showcase Gallery (Interactive Component Dashboard)
│   ├── README.md                      # Design System Guide & 3-Tier Token Architecture
│   ├── rules.md                       # Accessibility (WCAG 2.1 AA), RTL-First & On-Demand AI Protocol
│   ├── tokens.md                      # Authoritative Design Values Contract (Colors, Radii, Shadows)
│   ├── css/taqniya.css                # Global CSS Engine (Tokens, Glassmorphism, Responsive Grid)
│   ├── js/taqniya.js                  # Global JS Engine (Theme Toggle, Toasts, Modals, Dropdowns)
│   └── components/                    # 23 Modular Standalone Components (HTML/CSS/JS + README)
│       ├── 01-breakpoints/ ... 11-card/ ... 13-modal/ ... 22-navbar/ ... 23-offcanvas/
│
├── 02_testing/                        # Quality Assurance & Verification
│   ├── testing_strategy.md            # Pragmatic test pyramid & quality governance
│   ├── testing_rules.md               # Behavioral testing & boundary edge cases
│   ├── test_quality.md                # AAA pattern, determinism & mocking boundaries
│   └── verification.md                # The 8-Stage Pre-Completion Gatekeeper
│
├── 03_ai_protocol/                    # AI Agent Behavioral Constitution
│   ├── mandatory_rules.md             # 8 Non-negotiable AI operating invariants
│   ├── context_loading.md             # 10-Step task-specific lazy context loading
│   ├── project_md_protocol.md         # Project MD interaction & 9-level rule hierarchy
│   ├── change_management.md           # 5-Tier change impact classification & ADR rules
│   ├── completion_criteria.md         # 10-Point Definition of Done (DoD)
│   └── runtime/                       # Taqniya Active Runtime Protocol
│       ├── README.md                  # Runtime architecture & role matrix
│       ├── bootstrap.md               # Workspace detection & startup sequence
│       ├── stack_resolution.md        # stack.yaml parsing & multi-dimensional extraction
│       ├── profile_resolution.md      # Profile matching & unknown fallback protocol
│       ├── context_resolution.md      # Task-driven minimal context loading algorithm
│       ├── conflict_resolution.md     # 9-level authority hierarchy & drift reconciliation
│       ├── task_lifecycle.md          # 10-step end-to-end task execution lifecycle
│       ├── execution_engine.md        # Universal Execution Engine interoperability contract
│       ├── execution_engines.yaml     # Master catalog of recognized execution engines
│       ├── engine_resolver.js         # Production runtime resolver module
│       └── audit_runtime.js           # Automated Execution Engine integration test suite
│
├── 04_workflows/                      # Integration & Compliance Procedures
│   ├── project_initialization.md      # 8-Step stack resolution & onboarding routine
│   ├── md_synchronization.md          # Semantic impact-driven documentation sync
│   ├── architecture_compliance.md     # Multi-tier compliance audit (Core + Profile + ADR)
│   ├── design_system_compliance.md    # UI token & accessibility verification
│   ├── documentation_update.md        # Post-implementation change logging routine
│   └── activations/                   # Environment Activation Procedures
│       └── antigravity.md             # Antigravity IDE activation & hook instructions
│
├── 05_templates/                      # Universal Project & Feature Blueprints
│   └── generic/                       # Technology-agnostic blueprints
│       └── project/                   # PROJECT/MD/ blueprints
│
└── 06_stack_profiles/                 # Modular Technology Profiles (Optional Extensions)
    ├── README.md                      # Dimensional profile architecture & discovery matrix
    ├── backend/                       # Backend Profiles
    │   └── laravel/                   # Laravel Stack Profile (PHP 8.2+ / Laravel 11.x)
    └── frontend/                      # Frontend Profiles & Common Capabilities
        ├── README.md                  # Frontend Profile Architecture & Policy
        ├── common/                    # Universal 26-Capability Performance Standards
        │   ├── capability_matrix.md   # Master index & 26-capability matrix
        │   └── capability_policy.md   # Policy states (required, enabled, disabled, optional)
        ├── react/                     # React 18.x / 19.x SPA Stack Profile
        ├── vue/                       # Vue 3.x SPA Stack Profile
        └── blade/                     # Laravel Blade / Livewire 3 / Alpine Stack Profile
```

---

## 6. Rule Priority & Conflict Resolution Hierarchy

When executing any task, AI agents and developers MUST evaluate instructions against this strict 9-level precedence order:

1. **Level 1: Platform / System Safety Constraints** (Non-negotiable platform, system, and safety constraints).
2. **Level 2: Explicit Current User Direction** (Controls project choices and preferences; subject to Levels 1 & 3).
3. **Level 3: Taqniya Core Mandatory Invariants** (MUST / MUST NOT engineering rules: security, data safety, input protection, boundary integrity).
4. **Level 4: Project Global Specifications & Stack Configuration** (`PROJECT/MD/stack.yaml`, `frontend_capabilities.yaml`, `execution_engine.yaml`, `business_rules.md`, `data.md`, `design_rules.md`).
5. **Level 5: Technology / Stack Profiles** (`06_stack_profiles/*`).
6. **Level 6: Functional Phase Specifications** (`PROJECT/MD/phases/<phase_name>/*`).
7. **Level 7: Taqniya Recommended Guidelines** (SHOULD / SHOULD NOT guidance; `00_core/*`, `01_design_system/*`, `02_testing/*` baselines).
8. **Level 8: Existing Source Code / Implementation Evidence** (Executable ground truth; does not silently override approved specifications).
9. **Level 9: General Community Conventions & AI Preferences** (Lowest priority).

---

## 7. How to Adopt Taqniya in a Project

1. Create a `PROJECT/MD/` folder with:
   - `README.md` (Project scope & phase index)
   - `stack.yaml` (Technology stack configuration)
   - `frontend_capabilities.yaml` (Frontend capability policy decisions)
   - `execution_engine.yaml` (Declared execution engine methodology)
   - `business_rules.md` (Global business logic)
   - `data.md` (Global data architecture)
   - `design_rules.md` (Visual design tokens)
   - `prompts/` (AI management prompts)
   - `phases/` (Functional implementation phases)
2. Populate `stack.yaml`, choose your capability policy (`frontend_capabilities.yaml`), and select your execution engine (`execution_engine.yaml`).
3. Follow the 8-step initialization routine in [`04_workflows/project_initialization.md`](04_workflows/project_initialization.md).
4. Point your AI IDE (Antigravity / Cursor / Claude) rules to this framework root.
