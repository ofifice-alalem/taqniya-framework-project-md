# 🗺️ Routes & API Endpoints - Phase 00

> **مرجع مسارات واجهات البرمجة (API Endpoints) الخاصة بهذه المرحلة.**

---

## 📡 1. مسارات الـ API (API Endpoints)

### 🔹 1. جلب قائمة العناصر
- **Method:** `GET`
- **Endpoint:** `/api/v1/samples`
- **Headers:** `Authorization: Bearer <token>`, `Accept: application/json`
- **Query Parameters:** `page`, `limit`, `search`, `status`
- **Response Success (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Sample Name",
      "status": "active",
      "created_at": "2026-08-20T12:00:00Z"
    }
  ],
  "meta": { "current_page": 1, "total": 1 }
}
```

---

### 🔹 2. إنشاء عنصر جديد
- **Method:** `POST`
- **Endpoint:** `/api/v1/samples`
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "New Sample Item",
  "status": "active",
  "category_id": 2
}
```
- **Response Success (201 Created):**
```json
{
  "success": true,
  "message": "Sample created successfully",
  "data": { "id": 2, "name": "New Sample Item" }
}
```

---

### 🔹 3. تعديل عنصر قائم
- **Method:** `PUT` / `PATCH`
- **Endpoint:** `/api/v1/samples/{id}`
- **Headers:** `Authorization: Bearer <token>`

---

### 🔹 4. حذف عنصر
- **Method:** `DELETE`
- **Endpoint:** `/api/v1/samples/{id}`
- **Headers:** `Authorization: Bearer <token>`
- **Response Success (200 OK):**
```json
{
  "success": true,
  "message": "Sample soft deleted successfully"
}
```
