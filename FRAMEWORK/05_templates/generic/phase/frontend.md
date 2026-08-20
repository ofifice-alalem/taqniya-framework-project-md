# Frontend Specifications — Phase [PHASE_NUMBER]

> **UI Views, Screens, Components, and Interactive States for Phase [PHASE_NUMBER]**  
> ⚠️ **Note:** Visual design tokens (colors, fonts, spacing) are inherited from `PROJECT/MD/design_rules.md`.

---

## 1. Screens & UI Views

### 🖥️ `[ScreenName / ViewName]`
- **Route:** `[e.g., /dashboard/resources]`
- **Primary Purpose:** `[Main user screen to view and manage resources]`
- **Key UI Elements:**
  - `[Filter & Search Bar]`
  - `[Data Table / Grid with pagination]`
  - `[Primary Action Button: Create New]`
  - `[Row Action Menu: Edit, View, Delete]`

### 📝 `[ModalName / FormView]`
- **Form Fields:** `[Input fields, dropdowns, validation feedback]`
- **Actions:** `[Submit with loading state, Cancel button]`

---

## 2. Interactive States & Feedback

| State | Behavior & Visual Presentation |
| :--- | :--- |
| **Loading State** | Skeleton loader or spinner during async data fetching |
| **Empty State** | Descriptive message with a prominent primary Call-To-Action (CTA) |
| **Error State** | Clear accessible error alert with retry action |
| **Success State** | Toast notification or visual confirmation upon completion |

---

## 3. Client Interactions & Accessibility
- **Client-Side Validation:** `[Immediate validation feedback on field blur]`
- **Confirmation Modals:** `[Require explicit confirmation before destructive actions]`
- **Keyboard Navigation:** `[Full keyboard tab order, Enter/Space activation, Esc to close modals]`
