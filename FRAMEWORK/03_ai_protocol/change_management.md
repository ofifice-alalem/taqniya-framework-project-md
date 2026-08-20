# Change Management & Impact Classification

# Purpose
This document establishes the taxonomy for classifying code and documentation changes by their impact, scope, and risk. It defines the mandatory deliverables, testing rigor, and documentation updates required for each category of change.

# Scope
Applies to all pull requests, feature branches, refactors, and bug fixes across all repositories.

---

## 1. Change Classification Matrix

| Change Category | Definition & Examples | Mandatory Deliverables & Updates |
| :--- | :--- | :--- |
| **Tier 1: Patch / Minor** | Minor bug fixes, copy edits, styling micro-adjustments, comment improvements. | - Minimal code fix<br>- Regression test (if bug)<br>- Update `PROJECT/MD/07_change_log/changes.md` |
| **Tier 2: Feature Addition** | New HTTP endpoints, new UI screens, new domain action/service, new model. | - Unit & Feature tests<br>- Update `PROJECT/MD/03_features/`<br>- Update `PROJECT/MD/02_project_structure/`<br>- Check off `04_implementation_phases/`<br>- Update `07_change_log/changes.md` |
| **Tier 3: Data Mutation** | Schema alterations, adding/modifying fields/columns, creating indexes, new migrations. | - Migration/evolution script<br>- Update `PROJECT/MD/00_project/database.md`<br>- Update feature `data.md`<br>- Verify data safety & integrity |
| **Tier 4: Breaking Change** | Altering public API response format, changing route URLs, removing deprecated methods. | - Deprecation notice<br>- Migration / translation layer<br>- Update all dependent tests<br>- Author ADR in `06_decisions/ADR/`<br>- Update `07_change_log/changes.md` |
| **Tier 5: Architecture / Stack** | Introducing new packages, switching auth mechanisms, adopting new cache/queue driver. | - Formal ADR in `06_decisions/ADR/`<br>- Update `00_project/architecture_overrides.md`<br>- Update `00_project/project_context.md`<br>- Full verification pass |

---

## 2. Protocol for Breaking Changes (Tier 4)
When introducing a breaking change:
1. **Assess Impact:** Identify all downstream consumers (frontend components, mobile clients, external webhooks).
2. **Author ADR:** Detail why the breaking change is necessary and what alternatives were considered.
3. **Graceful Deprecation (Expand & Contract):** Where feasible, provide backward compatibility for at least one release cycle using deprecation warnings or versioned endpoints (`/api/v1` vs `/api/v2`).
4. **Update Specs:** Immediately update API signatures in `PROJECT/MD/02_project_structure/routes.md` or `interfaces.md`.

---

## 3. Protocol for Architecture Changes (Tier 5)
1. **Pre-Implementation ADR:** Never write code for an architectural pivot before writing and approving the ADR in `PROJECT/MD/06_decisions/ADR/ADR-[NUMBER].md`.
2. **Review Dependencies:** Check compliance against `FRAMEWORK/00_core/package_policy.md`.
3. **Verify Boundary Invariants:** Ensure new architecture does not violate defined boundaries or introduce circular dependencies.

# Verification
1. Confirm change category is accurately identified.
2. Verify all mandatory deliverables for the given change tier are present in the final commit.
3. Check that `PROJECT/MD/07_change_log/changes.md` includes a clear summary of changes.
