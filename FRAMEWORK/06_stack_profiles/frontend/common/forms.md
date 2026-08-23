# Frontend Form Engineering & Validation Lifecycles

# Purpose
This document defines standards for client-side form state, real-time validation feedback, and submission lifecycle guards.

---

## 1. Submission Lifecycles & Double-Submit Prevention

- **MUST (Disable on Submit):** Disable the submit button immediately upon form submission and render a loading spinner.
- **MUST NOT:** Allow multiple rapid clicks to dispatch duplicate POST/PUT requests to the backend.

---

## 2. Validation Feedback Lifecycle

- **Client-Side Validation:** Provide immediate inline feedback on input blur (`touched` fields).
- **Backend Error Mapping:** If the server returns HTTP 422, map validation errors directly below the corresponding input controls and scroll the first invalid field into view.

---

## 3. Unsaved Changes Guard

- **SHOULD:** Track `isDirty` state on complex editing forms and prompt the user with a confirmation dialog if they attempt to navigate away with unsaved modifications.
