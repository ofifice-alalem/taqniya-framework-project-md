# Feature Data Architecture & Storage: [FEATURE_NAME]

# 1. Persistent Entities, Collections, or Schemas *(If Applicable)*

### Storage Structure: `[ENTITY_OR_COLLECTION_OR_TABLE_NAME]`

| Field / Attribute | Data Type | Required | Default | Constraints & Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `[IDENTITY_TYPE]` | Yes | Auto | Unique Identifier / Primary Key |
| `[PARENT_OR_OWNER_REF]` | `[REF_TYPE]` | Yes | None | Reference / Partition Key *(if applicable)* |
| `[PRIMARY_BUSINESS_FIELD]`| `[STRING_OR_INT]` | Yes | None | Unique business identifier or attribute |
| `status` | `[ENUM_OR_STRING]`| Yes | `'active'`| Lifecycle state indicator |
| `created_at` | `[TIMESTAMP]` | Yes | UTC | Creation timestamp |
| `updated_at` | `[TIMESTAMP]` | Yes | UTC | Update timestamp |

---

## 2. Access Paths & Indexing Strategy *(If Applicable)*
- **Primary Access Patterns:** `[Describe query filters, lookup keys, or sort parameters]`
- **Index Definitions:** `[Index name, indexed attributes, and index type]`

---

## 3. Schema Evolution & Migration Plan *(If Applicable)*
- **Evolution Strategy:** Applies schema additions or collection indexes following the non-destructive expand-and-contract pattern.
- **Rollback Strategy:** Safe rollback or forward-healing procedure ensuring zero unintended data loss.
