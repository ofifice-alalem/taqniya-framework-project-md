# Prompt: Phase Review

> **Purpose:** Comprehensive audit of a completed phase before formal sign-off.

---

## Instructions for AI Agent

Audit the active phase: `[PHASE_NAME]`

1. **Review Phase Documentation:** Check `README.md`, `backend.md`, `frontend.md`, `routes.md`, `data.md`.
2. **Execute Verification:**
   - Are all backend controllers, services, and models implemented?
   - Are all frontend views, states (loading/error/empty), and interactions verified?
   - Are all API routes registered and tests passing?
3. **Phase Readiness Sign-off:**
   - **Progress Percentage:** `[e.g., 100%]`
   - **Deliverables Completed:** `[List]`
   - **Recommendation:** `[APPROVED | ACTION_REQUIRED]`
