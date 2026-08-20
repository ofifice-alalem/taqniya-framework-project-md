# Enterprise Security & Defense-in-Depth Standards

# Purpose
This document establishes non-negotiable security principles, secure-by-default design invariants, and defense-in-depth strategies for all software developed under the Taqniya Framework.

# Scope
Applies to all application ingress points, background workers, storage access, file handling, and external service communications.

---

## 1. Authentication & Identity Management *(Where Applicable)*
- **MUST:** Where authentication is implemented, store passwords using modern, salted cryptographic hashing algorithms (e.g., `Argon2id` or `Bcrypt`). Plaintext, unsalted, MD5, or SHA-1 hashes are STRICTLY FORBIDDEN.
- **MUST:** Where web/browser sessions are used, enforce `Secure`, `HttpOnly`, and `SameSite` flags on session cookies, and regenerate session identifiers upon privilege escalation.
- **MUST:** Set explicit expiration lifespans and revocation mechanics on issued API tokens or JWTs.

---

## 2. Authorization & Access Control (Default Deny)
- **MUST:** Default all protected operations, commands, actions, and data access points to "Access Denied" unless explicitly authorized.
- **MUST:** Enforce authorization at the trusted service boundary. Client-side UI controls MUST NOT be relied upon as a security mechanism.
- **MUST:** Scope resource queries and mutations to the authenticated entity, owner, or tenant context (where applicable according to the project's authentication, authorization, ownership, and tenancy model) to eliminate Insecure Direct Object References (IDOR).

---

## 3. Input Validation & Parameter Safety
- **MUST:** Validate all incoming parameters (payloads, headers, query arguments, path variables, CLI arguments) against explicit schema definitions and types before processing.
- **MUST:** Use allowlists (accepted fields) rather than blocklists.
- **MUST:** Where object-relational mapping or model-binding technologies are used, explicitly declare allowable/fillable attributes to prevent unvalidated mass-assignment vulnerabilities.

---

## 4. Injection & Interface Attack Mitigation
- **MUST (Injection Prevention):** Use parameterized queries, prepared statements, and strongly typed query builders exclusively. Direct string concatenation into dynamic queries, filters, or commands is STRICTLY FORBIDDEN (mitigating SQLi, NoSQL Injection, Command Injection).
- **MUST (Output Sanitization / XSS):** Perform context-aware output escaping when rendering dynamic content in user interfaces.
- **MUST (CSRF):** Enforce anti-forgery protection on state-changing browser/web endpoints (where applicable).
- **MUST (SSRF):** Validate and allowlist external URLs before making server-side network requests on behalf of users; restrict access to internal/private network ranges.
- **MUST (Path Traversal):** Sanitize and resolve file paths against a strict base directory before accessing the file system.

---

## 5. Secrets Management & Configuration Isolation
- **MUST NOT:** Hardcoded secrets, API keys, private certificates, or database credentials in source code or version control are STRICTLY FORBIDDEN.
- **MUST:** Load sensitive configuration via environment variables, secret stores, platform configuration, or another secure configuration mechanism appropriate to the runtime.
- **MUST NOT:** Application logs, error messages, and monitoring telemetry MUST NEVER record credentials, cryptographic secrets, auth tokens, or unmasked PII.

---

## 6. Secure File & Stream Handling *(Where Applicable)*
- **MUST:** Validate both file extensions and actual file content/magic bytes for uploaded content.
- **MUST:** Store user-uploaded files with randomly generated unique identifiers outside directly executable script directories or in dedicated object storage.
- **MUST:** Enforce payload size limits at both the application and transport proxy layers.

# Verification
1. Verify perimeter authorization checks exist on all sensitive operations.
2. Confirm dynamic queries and system commands utilize parameter bindings or typed builders.
3. Check that zero secrets or credentials exist in source code or committed fixtures.
4. Verify access control scoping on all read/update/delete operations where applicable.
