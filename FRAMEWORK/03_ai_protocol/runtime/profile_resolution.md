# Runtime Specification: Technology Profile Resolution

# Purpose
This document specifies how Antigravity resolves declared technologies in `PROJECT/MD/stack.yaml` into specialized **Technology Profiles** under `06_stack_profiles/`, defines deterministic resolution cases (A through E), and establishes the **Unknown Technology Protocol**.

---

## 1. Profile Discovery & Canonical Directory Pattern

The Profile Resolution Protocol maps declared dimensions to specific directory locations under `06_stack_profiles/`:

```
Canonical Path: 06_stack_profiles/{dimension}/{technology}/
```

### Standard Dimension Path Mapping *(Illustrative Examples)*

> **Note:** The technology names in the right-hand column are non-binding illustrative examples. Profiles are discovered modularly under `06_stack_profiles/{dimension}/{technology}/`.

| Dimension in `stack.yaml` | Resolved Directory Pattern | Illustrative Example Path |
| :--- | :--- | :--- |
| `backend.name` | `06_stack_profiles/backend/{tech}/` | `06_stack_profiles/backend/laravel/` *(Example)* |
| `frontend.name` | `06_stack_profiles/frontend/{tech}/` | `06_stack_profiles/frontend/react/` *(Example)* |
| `database.name` | `06_stack_profiles/database/{tech}/` | `06_stack_profiles/database/postgresql/` *(Example)* |
| `testing.name` | `06_stack_profiles/testing/{tech}/` | `06_stack_profiles/testing/pest/` *(Example)* |
| `styling.name` | `06_stack_profiles/styling/{tech}/` | `06_stack_profiles/styling/tailwind/` *(Example)* |
| `state.name` | `06_stack_profiles/state/{tech}/` | `06_stack_profiles/state/zustand/` *(Example)* |
| `build.name` | `06_stack_profiles/build/{tech}/` | `06_stack_profiles/build/vite/` *(Example)* |

---

## 2. Deterministic Profile Resolution Cases (A – E)

When matching declared technologies against available profiles, Antigravity evaluates these deterministic cases:

### Case A: Exact Technology & Version Profile Exists
- **Action:** Load the profile immediately. Apply its idiomatic coding rules, approved packages, and test commands.

### Case B: Generic Technology Profile Exists (Version Compatible)
- **Action:** If the declared version falls within the supported range of a generic profile (e.g., declared `laravel: 11.2`, profile covers `laravel: 11.x`), load the profile and note version compatibility status.

### Case C: Profile Exists but Declared Version is Unsupported
- **Action:** DO NOT silently claim compatibility.
  1. Notify the user of the version mismatch.
  2. Fall back safely to **Taqniya Core + Project MD**.
  3. Prompt for clarification ONLY if the active task strictly depends on version-specific APIs or syntax.

### Case D: No Profile Exists (Unknown Technology)
- **Action:** Activate the **Unknown Technology Protocol** (Section 3). Continue execution smoothly under Taqniya Core governance.

### Case E: Multiple Candidate Profiles Match
- **Action:** Resolve deterministically using strict precedence order:
  1. Exact dimension + Exact technology + Exact version match
  2. Exact dimension + Exact technology + Compatible version range
  3. Exact dimension + Generic technology profile
  4. If ambiguity remains unresolved ➔ Prompt the user for explicit selection.

---

## 3. The Unknown Technology Protocol

> **CORE INVARIANT:** **UNKNOWN TECHNOLOGY ≠ ERROR**

When a technology has no profile in `06_stack_profiles/` (e.g., Svelte, FastAPI, Django, Go-Fiber, MongoDB, DynamoDB, or custom in-house tools):

1. **Framework Operates Uninterrupted:** Taqniya NEVER fails, halts, or rejects a project due to a missing profile. Technology profiles are optional adapters, not mandatory dependencies.
2. **Universal Core Governance Applies:** Apply universal engineering principles from `00_core/*` (data safety, input protection, boundary isolation, test pyramid, anti-overengineering).
3. **No Hallucinated Taqniya Rules:** The AI agent MUST NOT invent fake "Taqniya rules" for the unknown technology. Standard official ecosystem documentation and language idioms may be used, but must be clearly distinguished from framework rules.
4. **Project MD Authority:** Adhere strictly to project-specific architecture guidelines and ADRs declared in `PROJECT/MD/`.
5. **No Automatic Framework Mutation:** Profile discovery is strictly read-only. Antigravity MUST NEVER create, modify, or rewrite framework files automatically during profile resolution.

---

## 4. Anatomy of a Resolved Technology Profile

When a profile is resolved, it exposes standard modular specifications:
- `stack.md`: Runtime specifications, compiler/interpreter versions, process managers.
- `architecture.md`: Idiomatic layer patterns, request lifecycles, and dependency injection conventions.
- `coding_rules.md`: Language-specific strict typing, linting flags, and code style standards.
- `database.md`: ORM idioms, query builders, migrations, and model casting rules.
- `security.md`: Framework auth mechanisms, middleware, policy gates, and IDOR prevention.
- `testing.md`: Test runner commands, mocking libraries, and test fixture conventions.
- `package_policy.md`: Approved and vetted ecosystem packages for this specific framework.
