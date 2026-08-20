# Phase [PHASE_NUMBER] Operational Checklist — [PHASE_TITLE]

> **Universal Technology-Neutral Phase Checklist for [PROJECT_NAME]**
> *Mark items `[x]` as completed. Mark non-applicable workstreams as `[N/A]`.*

---

### 1. Requirements & Acceptance
- [ ] Requirements and scope for phase deliverables reviewed in `PROJECT/MD/phases/<phase_name>/README.md`.
- [ ] Acceptance criteria defined and mapped to deliverables.

---

### 2. Architecture & Boundaries
- [ ] Component boundaries, module structure, and dependency direction aligned with project architecture.
- [ ] Any architectural deviations or library additions documented in `PROJECT/MD/business_rules.md`.

---

### 3. Core Implementation
- [ ] Domain logic, workflows, business invariants, and algorithms implemented in `backend.md`.
- [ ] Code adheres to clean code, strong typing, and anti-overengineering standards.

---

### 4. Data / Storage *(If Applicable)*
- [ ] `[Applicable]` Entity schemas, collections, or data structures defined in `PROJECT/MD/phases/<phase_name>/data.md`.
- [ ] `[Applicable]` Data integrity constraints, validation, and indexes/keys established.
- [ ] `[Applicable]` Non-destructive schema evolution / migrations tested with rollback or forward-healing.
- [ ] `[Applicable]` `PROJECT/MD/data.md` synchronized.

---

### 5. Interface / Transport / UI *(If Applicable)*
- [ ] `[Applicable]` Ingress points, endpoints, CLI commands, or event handlers registered in `routes.md`.
- [ ] `[Applicable]` UI components created in `frontend.md` using semantic design tokens from `design_rules.md`.
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
- [ ] Semantic specifications updated in relevant Project MD files (`PROJECT/MD/phases/<phase_name>/`).

---

### 9. Verification Gatekeeper
- [ ] Static analysis, type checking, and linters pass cleanly (where configured).
- [ ] Build, compilation, or packaging succeeds with zero fatal errors.
- [ ] All temporary debugging code, console logs, and breakpoints completely removed.

---

### 10. Phase Completion & Sign-off
- [ ] Deliverables and status updated in `PROJECT/MD/phases/<phase_name>/README.md`.
- [ ] AI review prompts (`Phase_Review.md` / `Module_Review.md`) executed for quality verification.
