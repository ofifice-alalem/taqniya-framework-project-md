# Dependency Governance & Package Evaluation Policy

# Purpose
This document establishes the universal rules, evaluation criteria, and governance procedures for introducing, auditing, and maintaining third-party libraries across all software projects. It prevents supply-chain risks, licensing conflicts, and dependency bloat.

# Scope
Applies to all external package ecosystems across all runtimes (Composer, npm, pnpm, Cargo, Poetry, Pip, Go Modules, Maven, NuGet, etc.).

---

## 1. Universal Package Evaluation Criteria
Before introducing any new third-party dependency, engineers and AI agents MUST evaluate the candidate package against the following mandatory criteria:

| Evaluation Dimension | Requirement & Benchmark |
| :--- | :--- |
| **Maintenance & Health** | Active commits within the past 12 months; responsive maintainers; healthy issue triage. |
| **Security Track Record** | Zero unpatched High/Critical vulnerabilities; passing automated security audit scans. |
| **License Compliance** | Permissive open-source licenses (MIT, Apache 2.0, BSD-2/3-Clause, ISC). Copyleft licenses (GPLv3, AGPL) require explicit organizational approval. |
| **Transitive Tree Impact** | Minimal dependency footprint. Avoid packages that introduce massive trees of unvetted sub-dependencies. |
| **Typing & Documentation** | Clear documentation, active community adoption, and first-class type definitions. |

---

## 2. Dependency Rules & Best Practices

- **MUST NOT:** Introduce external packages for trivial tasks that can be accomplished with a few lines of clean, native standard library code (e.g., simple string formatting, basic array utilities).
- **MUST:** Check if the active runtime, framework, or already installed dependencies provide the required capability before searching for a new package.
- **MUST:** Commit lockfiles (`composer.lock`, `package-lock.json`, `pnpm-lock.yaml`, `poetry.lock`, `Cargo.lock`) to ensure deterministic builds across all environments.
- **MUST:** Separate development tooling (testing frameworks, linters, code generators) strictly into development dependency manifests (`require-dev`, `devDependencies`). Never bundle development tools in production builds.
- **SHOULD:** Run automated dependency security audit commands (`npm audit`, `composer audit`, `pip-audit`, `cargo audit`) during CI pipelines.

---

## 3. Technology & Stack-Specific Package Catalogs
- **Global Core Policy:** Governs the *evaluation criteria, licensing rules, and security benchmarks*.
- **Stack Profile Policy:** Vetted packages for specific technology ecosystems are documented under `06_stack_profiles/{stack}/package_policy.md`.
- **Project-Specific Policy:** The exact list of approved packages for an individual repository is maintained in `PROJECT/MD/stack.yaml` and `PROJECT/MD/business_rules.md`.

# Allowed
- Installing officially maintained packages from trusted framework ecosystems.
- Adding dev-dependencies for testing, static analysis, and code quality verification.

# Forbidden
- Installing unvetted, abandoned, or deprecated packages.
- Installing production dependencies for simple native utility functions.
- Committing manifest changes without updating corresponding lockfiles.

# Verification
1. Run automated package audit commands with zero critical vulnerabilities.
2. Confirm the lockfile is committed and synchronized with manifest files.
3. Verify that development tools are placed under development dependencies.
4. Verify that newly added packages are documented in `PROJECT/MD/stack.yaml`.
