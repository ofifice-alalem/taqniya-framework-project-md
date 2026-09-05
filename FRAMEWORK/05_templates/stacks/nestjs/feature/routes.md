# NestJS Feature Routes & Network SSoT: [FEATURE_NAME]

# 1. Endpoints Map

| HTTP Method | Route Endpoint | Controller Action | Guard / Roles | Success Code |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/[RESOURCES]` | `create(dto)` | `JwtAuthGuard`, `Roles('admin')` | `201 Created` |
| `GET` | `/api/v1/[RESOURCES]` | `findAll(query)` | `JwtAuthGuard` | `200 OK` |
| `GET` | `/api/v1/[RESOURCES]/:id` | `findOne(id)` | `JwtAuthGuard` | `200 OK` |
| `PUT` | `/api/v1/[RESOURCES]/:id` | `update(id, dto)` | `JwtAuthGuard`, `Roles('admin')` | `200 OK` |
| `DELETE` | `/api/v1/[RESOURCES]/:id` | `remove(id)` | `JwtAuthGuard`, `Roles('admin')` | `200 OK` |

---

## 2. Standard Response Envelope
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```
