# Universal UI & Workflow Patterns

# Purpose
This document defines standard layout architectures, screen archetypes, and composite workflow patterns. It ensures that complex user journeys (listing, filtering, editing, multi-step creation, and status monitoring) remain predictable and intuitive across all applications.

# Scope
Applies to all full-page views, workflow layouts, and feature dashboards.

---

## 1. List & Data Grid Pattern
Used for managing collections of resources (e.g., Invoices, Users, Products).

```
┌────────────────────────────────────────────────────────────────────────┐
│ Page Title (H1)                     [ + Primary Action Button ]       │
│ Subtitle / Record Count                                                │
├────────────────────────────────────────────────────────────────────────┤
│ [ 🔍 Search Input ] [ Filter Dropdown ▼ ] [ Status Chip ] [ Clear All ] │
├────────────────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Table Header: [ Name ▲ ]   [ Status ]   [ Date ]   [ Actions ]     │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │ Row 1:        Acme Corp    Active       2026-08-19  [ Edit | ... ] │ │
│ │ Row 2:        Beta Ltd     Pending      2026-08-18  [ Edit | ... ] │ │
│ └────────────────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│ Showing 1 to 20 of 142 records                 [ < Prev ] [ 1 2 3 ] [ Next > ] │
└────────────────────────────────────────────────────────────────────────┘
```
- **Mandatory Elements:** Page Header with Primary CTA, Real-time Debounced Search, Filter Controls with Active Filter Badges, Responsive Table/Card view, Pagination Controls, and Graceful Empty/Loading States.

---

## 2. Resource Detail / View Pattern
Used for inspecting a single entity in depth.
- **Top Header:** Back breadcrumb, Entity Title, Status Badge, and Primary Action Group (e.g., Edit, Export, More Options).
- **Summary Cards (KPI Header):** 3–4 key metrics (e.g., Total Invoiced, Outstanding Balance, Last Activity Date).
- **Main Content Area:**
  - *Left Column (65–70%):* Tabbed panels (Overview, Line Items, Documents, Settings).
  - *Right Column (30–35%):* Metadata sidebar (Owner, Creation Timestamps, Tags, Audit Activity Timeline).

---

## 3. Create & Edit Form Pattern
Used for creating or updating records.
- **Form Architecture:**
  - Group fields into logical visual sections (Cards) with clear section headers and helper descriptions.
  - Required fields must be clearly marked (`*`).
  - Place primary action button (`Save / Create`) and secondary action (`Cancel`) in a clear header or sticky bottom action bar.
- **Validation Discipline:**
  - Provide inline error messages below each offending input immediately upon submit or blur.
  - Scroll the viewport automatically to the first invalid input on failed submission.
  - Warn users when navigating away with unsaved form changes (Dirty Form Guard).

---

## 4. Search & Filter Bar Pattern
- **Input Debounce:** Text search queries MUST be debounced (typically 300–400ms) before triggering network requests.
- **Filter Tags / Chips:** Selected filter values must display as dismissible chips above the data list with a prominent "Clear All Filters" button.
- **URL State Persistence:** Filter and search parameters should be mirrored to URL query parameters (`?status=active&search=acme&page=2`) so views are shareable and bookmarkable.

---

## 5. Destructive & High-Risk Confirmation Pattern
- **Standard Deletions:** Trigger a Confirmation Modal displaying:
  - Clear, non-generic title (e.g., `Delete Invoice #INV-2026-09` instead of `Are you sure?`).
  - Explanation of consequences (e.g., `This action will permanently delete 4 line items and cannot be undone.`).
  - Destructive Button (`Delete Invoice`) styled in danger red.
- **High-Risk / Production Deletions:** Require the user to type the exact resource name or confirmation phrase (e.g., `Type "DELETE" to confirm`) before the confirmation button is enabled.

---

## 6. Feedback States: Empty, Loading, and Error

### A. Empty State Pattern
When a query returns zero records:
- Display a friendly, uncluttered illustration or icon.
- Provide a clear headline (e.g., `No Invoices Found`).
- Provide an explanation and a primary action button (e.g., `Create your first invoice to get started`).
- If empty due to filters, provide a `Reset Filters` action.

### B. Loading / Skeleton Pattern
- Use content-matching Skeleton placeholders (pulsing gray blocks matching card/table layouts) rather than a single full-screen spinner.
- Avoid layout shift (CLS) by sizing skeletons to match loaded content dimensions.

### C. Error State Pattern
- Display a non-technical, helpful error message.
- Provide a clear `Retry Action` button.
- Provide an error reference ID or contact support link for debugging.

---

## 7. Multi-Step Wizard Pattern
Used for complex setup processes (e.g., Onboarding, Multi-step Checkout).
- **Stepped Progress Bar:** Show total steps, current step, completed steps, and step titles.
- **Independent Step Validation:** Validate step data before allowing the user to advance to the next step.
- **Summary & Confirmation Step:** The final step must display a complete review summary of all collected inputs before final submission.

# Verification
1. Verify that all list views include search, filters, pagination, and empty states.
2. Confirm destructive actions present explicit confirmation dialogs.
3. Check that loading states use layout skeletons that prevent cumulative layout shifts (CLS).
4. Verify dirty forms warn before navigation when unsaved changes exist.
