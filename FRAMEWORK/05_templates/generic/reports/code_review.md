# Code Review Report: [PR_OR_BRANCH_NAME]

# 1. Review Summary
- **Review Date:** `[YYYY-MM-DD]`
- **Reviewer:** `[REVIEWER_OR_AI_AGENT]`
- **Branch / PR / Task:** `[branch-name-or-task-id]`
- **Target Project:** `[PROJECT_NAME]`
- **Overall Verdict:** `[APPROVED | CHANGES_REQUESTED | BLOCKED]`

---

## 2. Review Dimension Scorecard

| Review Dimension | Status | Evaluation Criteria & Findings |
| :--- | :--- | :--- |
| **Architectural Compliance** | `[PASS / FAIL]` | Implementation respects the architecture, boundaries, and dependency direction defined in `PROJECT/MD/`. |
| **Security & Safety** | `[PASS / FAIL]` | Relevant security controls, perimeter validation, injection prevention, and zero-secrets standards are satisfied. |
| **Data Integrity *(if applicable)*** | `[PASS / N/A / FAIL]` | Persistence, consistency, validation, constraints, and non-destructive evolution satisfied according to storage technology. |
| **Code Quality & Hygiene** | `[PASS / FAIL]` | Maintainability, readability, low complexity, absence of duplication, no dead code, and clean error handling. |
| **Testing & Verification** | `[PASS / FAIL]` | Relevant automated tests exist, follow AAA structure, cover edge cases, and pass cleanly. |
| **UI & Design *(if applicable)*** | `[PASS / N/A / FAIL]` | Design tokens applied, existing components reused, interactive states handled, and accessibility verified. |
| **Documentation Synchronization** | `[PASS / FAIL]` | Relevant Project MD authorities synchronized with semantic code changes; change log recorded. |

---

## 3. Findings & Action Items

### 🟢 Commendable Implementations
- `[Highlight clean patterns, elegant solutions, or robust implementations]`

### 🟡 Minor Improvements (Non-Blocking)
- `[file_path:line]`: `[Suggestion for naming, clarity, comment, or minor optimization]`

### 🔴 Critical Issues (Blocking Merge)
- `[file_path:line]`: `[Security defect, architectural boundary breach, data loss risk, or failing test]`

---

## 4. Final Recommendation & Sign-Off
`[Summary recommendation on merge readiness and required follow-up actions.]`
