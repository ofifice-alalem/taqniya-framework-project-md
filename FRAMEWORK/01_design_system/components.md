# Universal Component Architecture & Catalog

# Purpose
This document defines the architecture, API contracts, variant structure, and state requirements for core UI components. It ensures all reusable interface primitives are predictable, accessible, and easily composable.

# Scope
Applies to all frontend component libraries (React, Vue, Blade, Svelte, Web Components) across all projects.

# Component Design Philosophy
1. **Single Responsibility:** A component should do one job well (e.g., a `Button` triggers actions; a `Modal` provides a focused overlay).
2. **Prop-Driven Customization:** Control appearance and behavior exclusively via typed, explicit props (e.g., `variant`, `size`, `isLoading`, `isDisabled`).
3. **Compound Components for Complexity:** Break complex widgets into composable subcomponents (e.g., `<Modal><Modal.Header /><Modal.Body /><Modal.Footer /></Modal>`).
4. **Zero Implicit Global Styles:** Components must encapsulate their layout and style using token variables without polluting global CSS cascades.

---

## 1. Core Component Catalog & Contracts

### A. Action & Input Primitives
- **`Button`:**
  - *Variants:* `primary` (default brand), `secondary` (neutral surface), `outline` (bordered), `ghost` (transparent hover), `danger` (destructive action).
  - *Sizes:* `sm`, `md` (default), `lg`.
  - *States:* `idle`, `hover`, `active`, `focus`, `loading` (shows spinner + disables click), `disabled`.
  - *Accessibility:* Native `<button>`, `type="button|submit"`, `aria-busy` when loading.

- **`Input` (Text / Email / Number / Password):**
  - *Props:* `label`, `name`, `type`, `placeholder`, `error`, `helperText`, `iconLeft`, `iconRight`, `isRequired`, `isDisabled`.
  - *States:* `default`, `hover`, `focus` (focus ring), `error` (danger border + error message), `disabled`.
  - *Accessibility:* Associated `<label for="id">`, `aria-invalid`, `aria-describedby` pointing to error/helper ID.

- **`Select` / `DropdownSelect`:**
  - *Props:* `options` (array of value/label), `value`, `placeholder`, `isSearchable`, `isClearable`, `error`.
  - *Keyboard:* Arrow key navigation, `Enter` to select, `Escape` to close.

- **`Checkbox` & `Radio`:**
  - *Props:* `label`, `value`, `isChecked`, `isDisabled`, `error`.
  - *Accessibility:* Semantic `<input type="checkbox|radio">` with visible focus indicator.

---

### B. Feedback & Overlay Primitives
- **`Modal` / `Dialog`:**
  - *Props:* `isOpen`, `onClose`, `title`, `size` (`sm`, `md`, `lg`, `full`), `closeOnOverlayClick`, `closeOnEscape`.
  - *Composition:* `Modal.Header`, `Modal.Body`, `Modal.Footer`.
  - *Behavior:* Focus trap active; restores focus to trigger on close; locks background body scroll; `aria-modal="true"`.

- **`Alert` / `Banner`:**
  - *Variants:* `info`, `success`, `warning`, `danger`.
  - *Props:* `title`, `description`, `icon`, `isDismissible`, `onDismiss`.
  - *Accessibility:* `role="alert"` for dynamic announcements.

- **`Badge` / `Tag`:**
  - *Variants:* `neutral`, `brand`, `success`, `warning`, `danger`, `info`.
  - *Sizes:* `sm`, `md`.
  - *Props:* `label`, `icon`, `isPill` (rounded-full), `onRemove`.

- **`Tooltip`:**
  - *Props:* `content`, `position` (`top`, `bottom`, `left`, `right`), `delay`.
  - *Behavior:* Shows on hover and keyboard focus; hidden on `Escape`; `role="tooltip"`.

---

### C. Data Display & Structure
- **`Card`:**
  - *Composition:* `Card.Header`, `Card.Body`, `Card.Footer`.
  - *Variants:* `default` (surface + subtle border), `elevated` (shadow), `interactive` (hover elevation + clickable).

- **`Table`:**
  - *Composition:* `Table.Header`, `Table.Body`, `Table.Row`, `Table.HeadCell`, `Table.Cell`, `Table.Pagination`.
  - *Features:* Column sorting indicators, empty state fallback, loading skeleton state, responsive horizontal scroll container.

- **`StatCard` / `MetricCard`:**
  - *Props:* `title`, `value`, `changePercentage`, `changeDirection` (`up`, `down`, `neutral`), `icon`, `trendPeriod`.

---

### D. Navigation Primitives
- **`Tabs`:**
  - *Props:* `tabs` (id, label, icon, badge), `activeTab`, `onChange`.
  - *Accessibility:* `role="tablist"`, `role="tab"`, `role="tabpanel"`, arrow key navigation.

- **`Pagination`:**
  - *Props:* `currentPage`, `totalPages`, `onPageChange`, `pageSize`.
  - *Controls:* Previous, Next, Page Numbers with truncated ellipsis (`...`).

- **`DropdownMenu`:**
  - *Composition:* `Dropdown.Trigger`, `Dropdown.Menu`, `Dropdown.Item`, `Dropdown.Divider`.
  - *Accessibility:* `aria-haspopup="menu"`, `aria-expanded`, keyboard navigation.

# Allowed
- Wrapping primitive components into domain-specific composites (e.g., `UserAvatarWithStatus`, `InvoiceStatusBadge`).
- Passing standard HTML attributes (e.g., `className`, `id`, `data-*`) to the root element.

# Forbidden
- Modifying core component source files to support a single one-off page quirk without adding a generic prop.
- Hardcoding domain-specific copy inside primitive component files.
- Omitting keyboard event listeners on custom interactive components.

# Verification
1. Verify that all components declare typed props and support disabled/loading/error states.
2. Confirm modals trap focus and dismiss with `Escape`.
3. Check that buttons and form elements render proper ARIA labels.
