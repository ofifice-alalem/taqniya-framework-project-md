# Data Architecture, Integrity & Storage Governance

# Purpose
This document defines universal principles for data integrity, storage architecture, transactional consistency, data-access performance, and data safety across all applications operating under the Taqniya Framework.

# Scope
Applies to all persistence layers and storage paradigms (Relational/SQL, Document/NoSQL, Key-Value, Graph, Time-Series, and Cloud-Native data stores). Technology-specific storage idioms are governed by respective Database Profiles under `06_stack_profiles/database/`.

---

## 1. Universal Data Integrity & Entity Identity
- **MUST:** Every persistent entity, document, or record MUST possess an immutable, unique identifier (`id`, `uuid`, `ulid`, or natural key as declared in project specifications).
- **MUST:** Store temporal timestamps in standardized UTC format.
- **MUST:** Enforce validation rules and domain invariants at both the application boundary and storage layer (where supported by the database engine).
- **SHOULD:** Preserve entity auditability (e.g., creation timestamp, update timestamp, and actor attribution where required).

---

## 2. Consistency Models & Transactional Integrity
- **Strong Consistency (ACID Stores):** Where supported, operations mutating multiple dependent records or entities MUST be wrapped in atomic transactions to guarantee atomicity and isolation.
- **Eventual Consistency (Distributed / Document Stores):** In distributed, event-driven, or NoSQL stores, handle concurrency and state reconciliation using explicit versioning, idempotency keys, or saga patterns.
- **MUST NOT:** Never execute slow external network requests (e.g., third-party payment APIs, email delivery) inside open database transactions or high-contention lock windows.
- **SHOULD:** Implement optimistic concurrency control (e.g., version counters or timestamp checks) on high-contention mutable entities.

---

## 3. Data Loss Prevention & Schema Evolution
- **MUST:** Data structure evolution MUST preserve compatibility with active consumers and avoid unintended data loss. Use the **Expand-and-Contract** evolution pattern where applicable and appropriate to the selected storage technology:
  1. *Expand:* Introduce new schema fields/collections alongside old ones without breaking existing code.
  2. *Migrate:* Transition application reads and writes to the new structure.
  3. *Contract:* Safely deprecate and remove obsolete structures only after all consumers are updated.
- **MUST NOT:** Destructive operations (e.g., dropping active production tables/collections, truncating data) MUST NEVER be executed without explicit verification and verified automated backups.
- **SHOULD:** Ensure migration and schema evolution scripts provide automated rollback or forward-healing procedures where supported.

---

## 4. Data-Access Performance & Query Bounding
- **MUST:** Bound operations over potentially unbounded data using an appropriate mechanism such as pagination, cursoring, streaming, batching, partitioning, limits, or equivalent. Unbounded scans over unbounded production datasets are STRICTLY FORBIDDEN.
- **MUST:** Avoid redundant or excessive data-access operations. Where N+1 patterns are applicable, eliminate or mitigate them through batching, eager loading, or aggregate pipeline joins.
- **SHOULD:** Design indexes based on primary query access patterns (e.g., equality filters, partition keys, range scans, and sort keys where applicable).
- **SHOULD:** Monitor and log slow queries, maintaining connection pooling appropriate to the deployment environment.

---

## 5. Financial Data Storage & Precision Invariant
- **MUST:** Store currency amounts in storage columns as integer minor units (e.g., `BIGINT` / `INTEGER` for cents, halalas, pence) using standardized column name suffixes like `amount_cents`, `total_cents`, or `price_cents`.
- **MUST:** Pair currency columns with an explicit 3-character ISO 4217 currency code column: `currency CHAR(3) DEFAULT 'USD'`.
- **MUST NOT:** Floating-point numbers (`FLOAT`, `DOUBLE`) MUST NEVER be used to store monetary or financial values (preventing rounding and precision loss).

---

## 6. Persistence Security & Injection Prevention
- **MUST:** All dynamic queries, filters, and commands MUST use parameterized inputs, prepared statements, or strongly typed query builders. Direct string concatenation into query strings is STRICTLY FORBIDDEN (eliminating SQLi, NoSQL Injection, and Query Injection).
- **MUST:** Apply authorization, ownership, tenancy, and access controls on every read, update, and delete operation where applicable.
- **MUST:** Protect sensitive data (passwords, tokens, PII) using strong one-way hashing or encryption at rest and in transit.

# Verification
1. Verify that dynamic queries use parameterized bindings or typed query builders.
2. Confirm that data-access operations over unbounded collections use bounding mechanisms (limits, cursors, pagination, or streaming).
3. Check that multi-entity mutations utilize atomic transactions (where supported) or idempotency controls.
4. Verify that schema evolution scripts follow non-destructive patterns.
5. Confirm that financial amounts are stored as integer minor units (`*_cents`) and never as floating-point numbers.
