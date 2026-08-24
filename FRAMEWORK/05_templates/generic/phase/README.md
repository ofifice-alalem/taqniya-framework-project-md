# Phase [PHASE_NUMBER]: [PHASE_TITLE]

> **Executive Scope, Deliverables, and Roadmap Status for Phase [PHASE_NUMBER]**

---

## 1. Phase Metadata
- **Phase ID:** `phase_[PHASE_NUMBER]_[slug]`
- **Title:** `[PHASE_TITLE]`
- **Goal:** `[Clear high-level business and functional goal of this phase]`
- **Status:** `[PLANNED | IN_PROGRESS | COMPLETED]`

---

## 2. Scope of Work

### 🟢 In Scope
- `[Deliverable / Feature 1]`
- `[Deliverable / Feature 2]`
- `[Deliverable / Feature 3]`

### 🔴 Out of Scope
- `[Deferred or excluded capability 1]`
- `[Deferred or excluded capability 2]`

---

## 3. Dependencies & Prerequisites
- **Preceding Phases Required:** `[e.g., phase_00_auth, None]`
- **Required Stack Declarations:** `PROJECT/MD/stack.yaml` (Runtime, DB, Communication Mode)
- **Frontend Policy Compliance:** `PROJECT/MD/frontend_capabilities.yaml`
- **Active Execution Engine:** `PROJECT/MD/execution_engine.yaml`
- **Database Schema Blueprint (SSoT):** `PROJECT/MD/database.md`
- **Domain & Visual Invariants:** `PROJECT/MD/business_rules.md`, `PROJECT/MD/design_rules.md`

---

## 4. Phase Deliverables Checklist
- [ ] Backend logic and services documented in `backend.md`
- [ ] Frontend screens and UI states documented in `frontend.md`
- [ ] API endpoints and routes documented in `routes.md`
- [ ] Schema changes and phase entities documented in `data.md`
- [ ] Phase testing specifications and test cases pass 100%
- [ ] 8-Stage Verification Gatekeeper executed via `prompts/04_phases/review_phase.md`
- [ ] Definition of Done (DoD) verified in `03_ai_protocol/completion_criteria.md`
