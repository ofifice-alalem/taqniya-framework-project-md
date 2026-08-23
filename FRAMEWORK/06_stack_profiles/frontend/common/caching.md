# Client Caching & Stale-While-Revalidate (SWR)

# Purpose
This document establishes client-side caching mechanisms, offline data storage, and cache invalidation policies for web applications.

---

## 1. Stale-While-Revalidate (SWR) Pattern

- **MUST:** For standard data views, adopt the SWR caching pattern:
  1. Immediately serve cached data from memory upon screen render (0 ms latency).
  2. Silently revalidate data against the backend API in the background.
  3. Update the UI only if changes are detected, avoiding disruptive screen flickers.

---

## 2. Browser Storage for Lookup / Static Data

- **SHOULD:** Store infrequently changing static datasets (e.g., countries, categories, application settings, permission lists) in browser `IndexedDB` or `localStorage`.
- **Constraint:** Ensure cached lookup tables include a version timestamp or Time-To-Live (TTL) to allow transparent cache invalidation when backend updates occur.

---

## 3. Cache Invalidation upon Mutation

- **MUST:** When a mutation succeeds (e.g., creating a new user, updating an invoice, deleting a record), immediately invalidate or update the corresponding query cache keys so adjacent views display fresh data without requiring a manual page refresh.
