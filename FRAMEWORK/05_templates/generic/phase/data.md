# Data Specifications — Phase [PHASE_NUMBER]

> **Phase Entity Schemas, Database Tables, Constraints, and Relationships for Phase [PHASE_NUMBER]**

---

## 1. Table Schema: `[table_name]`

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key, Auto-increment | Internal Identifier |
| `uuid` | `UUID` | Unique, Indexed | External Public Identifier |
| `name` | `VARCHAR(255)` | Not Null | Entity Name |
| `status` | `VARCHAR(50)` | Default: `'draft'` | Entity Status |
| `created_at` | `TIMESTAMP` | Nullable | Creation Timestamp |
| `updated_at` | `TIMESTAMP` | Nullable | Modification Timestamp |
| `deleted_at` | `TIMESTAMP` | Nullable | Soft Delete Timestamp |

---

## 2. Phase Relationships
- `[ThisEntity]` **BelongsTo** `[ParentEntity]` (`parent_id` ➔ `parent_table.id`)
- `[ThisEntity]` **HasMany** `[ChildEntity]`

---

## 3. Storage Invariants & Integrity Constraints
- **Uniqueness:** `[e.g., Unique constraint on (name, parent_id)]`
- **Soft Deletes:** `[Enforced via deleted_at query scopes]`
- **Indexes:** `[Indexed fields for search performance]`
