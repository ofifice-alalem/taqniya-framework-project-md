# Project Data Architecture Specification — [PROJECT_NAME]

# 1. Storage Specifications & Paradigms
- **Storage Engine & Paradigm:** `[e.g., PostgreSQL (Relational) | MongoDB (Document) | DynamoDB (Key-Value) | Neo4j (Graph)]`
- **Primary Identity Strategy:** `[e.g., UUIDv7 | Auto-increment ID | ULID | Custom Natural Key | ObjectID]`
- **Consistency & Transaction Model:** `[e.g., Strong Consistency (ACID) | Eventual Consistency | Multi-Document Transactions]`
- **Timezone & Temporal Standards:** `UTC (All timestamps stored in ISO-8601 / UTC)`
- **Migration & Evolution Tool:** `[e.g., Native Migrations | Alembic | Prisma | Flyway | Dynamic Schema]`

---

## 2. Core Entities & Schema Catalog (Tables / Collections / Aggregates)

### Entity / Collection: `[ENTITY_OR_COLLECTION_NAME_1]`
- **Domain Purpose:** `[Brief business description of data stored in this entity]`
- **Storage Structure (Fields / Columns / Attributes):**
  - `id`: `[Unique Identifier / Primary Key]`
  - `[IDENTIFIER_OR_TENANT_REF]`: `[Reference / Partition Key / Scoping Identifier (if applicable)]`
  - `[PRIMARY_BUSINESS_FIELD]`: `[Data Type / Required / Unique constraint (if applicable)]`
  - `status`: `[Data Type / State Enum or String / Default value]`
  - `created_at` / `updated_at`: `[Timestamp in UTC]`
- **Access Patterns & Indexing:**
  - `[INDEX_NAME_1]`: `[Target fields / Index type (e.g., compound, unique, geospatial, text)]`
- **Relationships & References:**
  - `[RELATIONSHIP_DESCRIPTION]` (e.g., `Belongs to [PARENT_ENTITY]`, `Embedded array of [CHILD_ITEMS]`)

---

### Entity / Collection: `[ENTITY_OR_COLLECTION_NAME_2]`
- **Domain Purpose:** `[Brief business description]`
- **Storage Structure:**
  - `id`: `[Unique Identifier]`
  - `[PARENT_REFERENCE_ID]`: `[Relationship reference / Foreign reference]`
  - `[QUANTITATIVE_OR_FINANCIAL_FIELD]`: `[Integer minor units / Decimal / Float]`
  - `created_at` / `updated_at`: `[Timestamp in UTC]`
- **Access Patterns & Indexing:**
  - `[INDEX_NAME]`: `[Filter fields & Sorting keys]`

---

## 3. Storage Invariants & Security Controls
- **Validation:** Enforce validation constraints at application boundary and storage layer where supported.
- **Access Isolation:** Scope all data queries and mutations by the authorized entity or tenant context.
- **Non-Destructive Evolution:** Data structure evolution MUST preserve compatibility with active consumers and avoid unintended data loss. Use Expand-and-Contract where applicable and appropriate to the selected storage technology.
- **Parameterization:** All queries MUST utilize parameterized bindings or strongly typed query builders.
