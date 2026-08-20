# Backend Specifications — Phase [PHASE_NUMBER]

> **Backend Architecture, Controllers, Services, Logic, and Permissions for Phase [PHASE_NUMBER]**

---

## 1. Controllers & Service Layer

### 🎮 `[ControllerName]`
- **Responsibility:** `[Handles HTTP/CLI ingress requests and delegates to domain services]`
- **Actions / Methods:**
  - `index()`: `[List items with pagination & filters]`
  - `show($id)`: `[Retrieve single item by identifier]`
  - `store(Request $request)`: `[Validate and create new item]`
  - `update(Request $request, $id)`: `[Validate and update existing item]`
  - `destroy($id)`: `[Soft delete item]`

### 💼 `[ServiceName / ActionName]`
- **Responsibility:** `[Encapsulates core business calculations, invariants, and DB transactions]`

---

## 2. Validation & Authorization

### 📋 Request Validation Rules
- `[field_1]`: `[required | string | max:255]`
- `[field_2]`: `[required | in:draft,active]`

### 🛡️ Permissions & Security Gates
- `[resource.view]`: `[Permission to view list and detail]`
- `[resource.create]`: `[Permission to create item]`
- `[resource.update]`: `[Permission to modify item]`
- `[resource.delete]`: `[Permission to delete item]`

---

## 3. Integrations & Operations
- **Transactions:** `[Wrap multi-table mutations in DB transaction]`
- **Events & Notifications:** `[Dispatched domain events upon completion]`
