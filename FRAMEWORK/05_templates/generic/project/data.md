# Global Data Architecture — [PROJECT_NAME]

> **Single Source of Truth for Global Entities, Shared Schemas, and System-Wide Storage Rules**

---

## 1. Core Global Entities

### 👤 `[Global Entity 1: e.g., Users]`
- **Description:** `[Purpose of entity across the entire system]`
- **Key Attributes:** `[id, uuid, name, email, status, created_at, updated_at]`

### 🏢 `[Global Entity 2: e.g., Organizations / Tenants]`
- **Description:** `[Multi-tenancy or organizational unit definition]`

---

## 2. High-Level Entity Relationships

```text
[Entity 1] (1) ─────────── (N) [Entity 2]
[Entity 1] (1) ─────────── (N) [Activity Logs]
```

---

## 3. Global Storage & Data Policies
- **Soft Deletes:** `[e.g., Applied globally via deleted_at timestamp]`
- **Primary Keys:** `[e.g., BigInt auto-increment internal + UUIDv7 public]`
- **Localization:** `[e.g., JSON columns / separate translation tables]`

---

## 4. Hierarchy Clarification
> **Note:** This document defines shared, system-wide data architecture only. Granular entity definitions for specific functional phases reside in:
> `PROJECT/MD/phases/<phase_name>/data.md`
