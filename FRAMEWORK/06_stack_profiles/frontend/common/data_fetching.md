# Asynchronous Data Fetching & Network Efficiency

# Purpose
This document establishes rules for client-side API consumption, asynchronous state management, network efficiency, and error normalization.

---

## 1. The 4 Standard UI States

Every asynchronous view or data-dependent component MUST explicitly handle:
1. **Loading State:** Skeleton loaders or subtle placeholders (no blocking modal overlays for non-blocking fetches).
2. **Success / Populated State:** Clean rendering of retrieved data.
3. **Empty State:** Clear explanatory message with an actionable Call-To-Action (CTA) when datasets are empty.
4. **Error State:** Human-readable error message with an explicit "Retry" action.

---

## 2. Request Deduplication & Debouncing

- **MUST (Debounce Input):** Apply a `300ms` debounce to real-time search inputs, auto-complete queries, and dynamic filters.
- **MUST (Deduplication):** Deduplicate concurrent identical API requests triggered by multiple independent components rendered on the same screen.

---

## 3. Request Cancellation (`AbortController`)

- **MUST:** Attach an `AbortController` (or framework-equivalent cancellation mechanism) to ongoing asynchronous requests:
  - When the user navigates away before a request completes.
  - When a new search query supersedes an ongoing in-flight query.
- **MUST NOT:** Allow stale response promises from previous queries to overwrite newer UI state (race condition prevention).

---

## 4. API Error Normalization

- **MUST:** Map backend HTTP 422 validation errors directly to the corresponding form input fields.
- **MUST:** Catch network failures, server errors (500), and expired sessions (401), presenting clear feedback and triggering authentication renewal workflows when appropriate.
