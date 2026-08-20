# Technology Profiles Extension Architecture

# Purpose
This directory houses modular **Technology Profiles** for the Taqniya Framework. Technology profiles provide specialized idioms, language syntax rules, coding standards, approved package catalogs, and testing patterns for specific programming languages, frameworks, databases, and tooling.

---

## 1. Dimensional Architecture & Discovery Model

The Taqniya resolver evaluates technologies across independent architectural dimensions:

```text
06_stack_profiles/
├── frontend/                  # UI Frameworks (e.g., react/, vue/, svelte/, angular/)
├── backend/                   # Application Runtimes & Frameworks
│   └── laravel/               # Laravel Stack Profile (PHP 8.2+ / Laravel 11.x)
├── database/                  # Storage Engines (e.g., postgresql/, mysql/, mongodb/)
├── testing/                   # Test Frameworks (e.g., pest/, vitest/, pytest/, playwright/)
├── styling/                   # CSS / Styling Systems (e.g., tailwind/)
├── state/                     # State Management (e.g., zustand/, redux/, pinia/)
├── build/                     # Bundlers & Toolchains (e.g., vite/, webpack/)
├── authentication/            # Auth Providers & Libraries (e.g., sanctum/, authjs/)
├── infrastructure/            # Containers & Cloud (e.g., docker/, k8s/)
└── README.md                  # This documentation
```

> **Note:** Profile directories are created on-demand as specialized profiles are authored. The framework never requires all categories or profiles to exist.

---

## 2. Dynamic Profile Discovery & Resolution Matrix

The resolver matches declarations in `PROJECT/stack.yaml` against available profiles using:

$$\text{Profile Key} = \text{Category} + \text{Technology Name} + \text{Version}$$

### Resolution Examples:
- `backend.framework: "Laravel"` (v11.x) ➔ Resolves to `06_stack_profiles/backend/laravel/`
- `frontend.framework: "React"` (v19.x) ➔ Resolves to `06_stack_profiles/frontend/react/` (if present)
- `database.engine: "PostgreSQL"` (v16.x) ➔ Resolves to `06_stack_profiles/database/postgresql/` (if present)
- `testing.unit: "Pest"` ➔ Resolves to `06_stack_profiles/testing/pest/` (if present)

---

## 3. Technology Dimension Independence

Every architectural dimension is independently resolvable. Taqniya Core assumes zero coupling between dimensions:
- `frontend.framework: React` does NOT assume `build_tool: Vite` or `language: TypeScript`.
- `backend.framework: Laravel` does NOT assume `frontend: Blade/Inertia` or `database: MySQL`.
- Any combination (e.g., React + Laravel, Svelte + Django, Vue + FastAPI, Angular + NestJS) resolves its respective dimension profiles independently.

---

## 4. Unknown Profile & Graceful Fallback Protocol

If a declared technology in `PROJECT/stack.yaml` lacks a specialized profile under `06_stack_profiles/`:

1. **Apply Taqniya Core:** Ingest universal principles (clean code, layered architecture, data integrity, security, verification).
2. **Issue Explicit Notice:** Transparently inform the user:
   > *"Notice: No specialized profile found for [Category: Technology]. Operating under universal Taqniya Core engineering standards."*
3. **Do Not Invent Rules:** Avoid inventing speculative conventions or hallucinated syntax rules.
4. **Continue Safely:** If the active task can proceed safely using standard language syntax and project documentation (`PROJECT/MD/`), continue execution.
5. **Ask Only When Critical:** Prompt the user for technology-specific clarification only if required knowledge cannot be deduced from existing project code or documentation.

---

## 5. Standard Profile Structure

When contributing a new profile, structure it with single-responsibility markdown files:

```text
06_stack_profiles/[category]/[technology]/
├── README.md                  # Profile overview & supported versions
├── stack.md                   # Runtime specifications, toolchains & package managers
├── architecture.md            # Framework-idiomatic architecture & layer boundaries
├── coding_rules.md            # Language idioms, strict typing, formatting, linters
├── database.md                # ORM / persistence conventions (if applicable)
├── security.md                # Security policies, auth libraries, input sanitization
├── testing.md                 # Testing framework conventions, runners, mock standards
└── package_policy.md          # Approved ecosystem packages & dependencies
```

---

## 6. Active Profiles Catalog

| Category | Profile | Target Version(s) | Status |
| :--- | :--- | :--- | :--- |
| **`backend/`** | **[`laravel/`](backend/laravel/README.md)** | PHP 8.2+ / Laravel 11.x | Active & Verified |
| *Other Categories* | *Modular extensions* | *Multi-stack* | *Added on-demand* |
