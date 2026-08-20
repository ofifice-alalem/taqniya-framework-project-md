# Phase [PHASE_NUMBER] Operational Checklist — [PHASE_TITLE]

> **Universal Technology-Neutral Phase Checklist for [PROJECT_NAME]**
> *Mark items `[x]` as completed. Mark non-applicable workstreams as `[N/A]`.*

---

### 1. Requirements & Acceptance
- [ ] Requirements and user stories for phase deliverables reviewed and clarified.
- [ ] Acceptance criteria defined and mapped to deliverables.

---

### 2. Architecture & Boundaries
- [ ] Component boundaries, module structure, and dependency direction aligned with project architecture.
- [ ] Any architectural deviations or library additions documented in an ADR (`PROJECT/MD/06_decisions/ADR/`).

---

### 3. Core Implementation
- [ ] Domain logic, workflows, business invariants, and algorithms implemented.
- [ ] Code adheres to clean code, strong typing, and anti-overengineering standards.

---

### 4. Data / Storage *(If Applicable)*
- [ ] `[Applicable]` Entity schemas, collections, or data structures defined and created.
- [ ] `[Applicable]` Data integrity constraints, validation, and indexes/keys established.
- [ ] `[Applicable]` Non-destructive schema evolution / migrations tested with rollback or forward-healing.
- [ ] `[Applicable]` `PROJECT/MD/00_project/database.md` synchronized.

---

### 5. Interface / Transport / UI *(If Applicable)*
- [ ] `[Applicable]` Ingress points, endpoints, CLI commands, or event handlers registered.
- [ ] `[Applicable]` UI components created using semantic design tokens and existing primitives.
- [ ] `[Applicable]` Interactive states (Hover, Focus, Disabled, Loading, Error, Empty) handled.
- [ ] `[Applicable]` Accessibility (WCAG 2.1 AA) and responsive behavior verified.

---

### 6. Security & Safety
- [ ] Authentication, authorization, and permission controls verified at perimeter.
- [ ] Dynamic queries and inputs parameterized against injection vulnerabilities.
- [ ] Zero secrets, private tokens, or sensitive credentials committed.

---

### 7. Testing & Quality Assurance
- [ ] Unit tests authored for critical domain logic and calculations.
- [ ] Integration / Functional / Feature tests authored for primary workflows (where configured).
- [ ] Regression tests authored for any resolved defects.
- [ ] Task-relevant test suites pass 100%.

---

### 8. Documentation Synchronization
- [ ] Semantic specifications updated in relevant Project MD files (`00_project/`, `02_project_structure/`, `03_features/`).
- [ ] Active feature acceptance criteria verified.

---

### 9. Verification Gatekeeper
- [ ] Static analysis, type checking, and linters pass cleanly (where configured).
- [ ] Build, compilation, or packaging succeeds with zero fatal errors.
- [ ] All temporary debugging code, console logs, and breakpoints completely removed.

---

### 10. Phase Completion & Sign-off
- [ ] Structured entry logged in `PROJECT/MD/07_change_log/changes.md`.
- [ ] `phase_report.md` generated and reviewed upon completing all phase deliverables.
