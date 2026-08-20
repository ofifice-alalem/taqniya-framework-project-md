# Change Management & Impact Classification

# Purpose
This document establishes the taxonomy for classifying code and documentation changes by their impact, scope, and risk. It defines the mandatory deliverables, testing rigor, and documentation updates required for each category of change.

# Scope
Applies to all pull requests, feature branches, refactors, and bug fixes across all repositories.

---

## 1. Change Classification Matrix

| Change Category | Definition & Examples | Mandatory Deliverables & Updates |
| :--- | :--- | :--- |
| **Tier 1: Patch / Minor** | Minor bug fixes, copy edits, styling micro-adjustments, comment improvements. | - Minimal code fix<br>- Regression test (if bug)<br>- Update `PROJECT/MD/phases/<phase>/README.md` |
| **Tier 2: Feature Addition** | New HTTP endpoints, new UI screens, new domain action/service, new model. | - Unit & Feature tests<br>- Update `PROJECT/MD/phases/<phase>/frontend.md`<br>- Update `PROJECT/MD/phases/<phase>/backend.md`<br>- Update `PROJECT/MD/phases/<phase>/routes.md` |
| **Tier 3: Data Mutation** | Schema alterations, adding/modifying fields/columns, creating indexes, new migrations. | - Migration/evolution script<br>- Update `PROJECT/MD/data.md`<br>- Update `PROJECT/MD/phases/<phase>/data.md`<br>- Verify data safety & integrity |
| **Tier 4: Breaking Change** | Altering public API response format, changing route URLs, removing deprecated methods. | - Deprecation notice<br>- Migration / translation layer<br>- Update all dependent tests<br>- Update `PROJECT/MD/phases/<phase>/routes.md`<br>- Update `PROJECT/MD/business_rules.md` |
| **Tier 5: Architecture / Stack** | Introducing new packages, switching auth mechanisms, adopting new cache/queue driver. | - Update `PROJECT/MD/stack.yaml`<br>- Update `PROJECT/MD/business_rules.md`<br>- Full verification pass |

---

## 2. Protocol for Breaking Changes (Tier 4)
When introducing a breaking change:
1. **Assess Impact:** Identify all downstream consumers (frontend components, mobile clients, external webhooks).
2. **Document Impact:** Detail why the breaking change is necessary in `PROJECT/MD/business_rules.md` and `PROJECT/MD/phases/<phase>/README.md`.
3. **Graceful Deprecation (Expand & Contract):** Where feasible, provide backward compatibility for at least one release cycle using deprecation warnings or versioned endpoints (`/api/v1` vs `/api/v2`).
4. **Update Specs:** Immediately update API signatures in `PROJECT/MD/phases/<phase>/routes.md`.

---

## 3. Protocol for Architecture Changes (Tier 5)
1. **Pre-Implementation Spec:** Never write code for an architectural pivot before updating `PROJECT/MD/stack.yaml` and `PROJECT/MD/business_rules.md`.
2. **Review Dependencies:** Check compliance against `FRAMEWORK/00_core/package_policy.md`.
3. **Verify Boundary Invariants:** Ensure new architecture does not violate defined boundaries or introduce circular dependencies.

# Verification
1. Confirm change category is accurately identified.
2. Verify all mandatory deliverables for the given change tier are present in the final commit.
3. Check that `PROJECT/MD/phases/` documentation includes a clear summary of changes.
