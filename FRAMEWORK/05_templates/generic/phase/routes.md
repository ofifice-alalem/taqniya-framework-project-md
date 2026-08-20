# Routes & API Specifications — Phase [PHASE_NUMBER]

> **HTTP Routes, API Endpoints, Request/Response Payloads, and Security for Phase [PHASE_NUMBER]**

---

## 1. API Endpoints Catalog

### 🔹 1. List Resources
- **Method:** `GET`
- **URI:** `/api/v1/[resources]`
- **Headers:** `Authorization: Bearer <token>`, `Accept: application/json`
- **Query Parameters:** `page`, `limit`, `search`, `status`
- **Success Response (200 OK):**
```json
{
  "success": true,
  "data": [],
  "meta": { "total": 0, "page": 1 }
}
```

---

### 🔹 2. Create Resource
- **Method:** `POST`
- **URI:** `/api/v1/[resources]`
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "[string]",
  "status": "active"
}
```
- **Success Response (201 Created):**
```json
{
  "success": true,
  "data": { "id": 1, "name": "[string]" }
}
```

---

### 🔹 3. Update Resource
- **Method:** `PUT` / `PATCH`
- **URI:** `/api/v1/[resources]/{id}`
- **Headers:** `Authorization: Bearer <token>`

---

### 🔹 4. Delete Resource
- **Method:** `DELETE`
- **URI:** `/api/v1/[resources]/{id}`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Resource deleted successfully"
}
```
