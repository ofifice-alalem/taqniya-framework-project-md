# 🗺️ مواصفات المسارات ونقاط الاتصال — [اسم المرحلة / Phase Name] (نمط API-First)

> **الهدف:** توثيق كافة نقاط الاتصال البرمجية (RESTful API Endpoints) الخاصة بهذه المرحلة، بما يشمل المعاملات، وهياكل الطلبات (Request Payloads)، والاستجابات الموحدة (JSON Envelopes)، وقواعد المصادقة والصلاحيات.

---

## 1. الإعدادات والترويسات العامة (API Base Configuration)

- **المسار الأساسي (Base URI):** `/api/v1/[resources]`
- **بروتوكول النقل (Protocol):** `HTTPS`
- **صيغة البيانات (Data Format):** `JSON` (`application/json`)
- **الترويسات العامة الإلزامية (Common Headers):**
  ```http
  Authorization: Bearer <ACCESS_TOKEN>
  Accept: application/json
  Content-Type: application/json
  Accept-Language: ar
  ```
- **حدود معدل الطلبات (Rate Limiting):** `60 requests / minute` لكل مستخدم/مستأجر ما لم يُحدد خلاف ذلك في `MD/stack.yaml`.

---

## 2. مصفوفة نقاط الاتصال الشاملة (Endpoints Master Matrix)

| العملية (Action) | HTTP Method | الـ Endpoint | المصادقة | الصلاحية المطلوبة (Permission) | الغرض والوظيفة |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **استعراض القائمة** | `GET` | `/api/v1/[resources]` | مطلوبة | `[resource].read` | جلب قائمة العناصر مع الترقيم والبحث والفلترة. |
| **عرض عنصر محدد** | `GET` | `/api/v1/[resources]/:id` | مطلوبة | `[resource].read` | جلب التفاصيل الكاملة لعنصر مفرد. |
| **إنشاء عنصر جديد** | `POST` | `/api/v1/[resources]` | مطلوبة | `[resource].create` | إنشاء عنصر جديد بعد التحقق الصارم من المدخلات. |
| **تعديل عنصر قائم** | `PUT / PATCH` | `/api/v1/[resources]/:id` | مطلوبة | `[resource].update` | تعديل بيانات عنصر موجود مع منع IDOR. |
| **حذف عنصر (منطقي)** | `DELETE` | `/api/v1/[resources]/:id` | مطلوبة | `[resource].delete` | تنفيذ الحذف المنطقي (Soft Delete) للعنصر. |
| **رفع مرفق/ملف** | `POST` | `/api/v1/[resources]/:id/attachments` | مطلوبة | `[resource].update` | رفع ملفات ومرفقات مرتبطة بالكيان (`multipart/form-data`). |

---

## 3. تفاصيل عقود الطلب والاستجابة (Endpoint Contracts)

---

### 3.1 جلب قائمة العناصر (List Resources)

* **المسار:** `GET /api/v1/[resources]`
* **معاملات الاستعلام (Query Parameters):**

| المعامل (Parameter) | النوع (Type) | الإلزامية | القيمة الافتراضية | الوصف |
| :--- | :--- | :--- | :--- | :--- |
| `page` | `integer` | اختياري | `1` | رقم الصفحة الحالية للترقيم. |
| `per_page` | `integer` | اختياري | `20` | عدد العناصر في الصفحة (الحد الأقصى: 100). |
| `search` | `string` | اختياري | `null` | البحث النصي الآمن في حقل الاسم أو الرمز. |
| `status` | `string` | اختياري | `null` | الفلترة حسب الحالة (`active`, `draft`, `archived`). |
| `[foreign_id]` | `integer` | اختياري | `null` | الفلترة حسب الكيان الأب أو التصنيف. |
| `sort_by` | `string` | اختياري | `created_at` | حقل الترتيب (من الحقول المسموحة فقط). |
| `sort_order` | `string` | اختياري | `desc` | اتجاه الترتيب (`asc` أو `desc`). |

#### استجابة النجاح (200 OK):
```json
{
  "success": true,
  "message": "Resources retrieved successfully.",
  "data": [
    {
      "id": 1,
      "uuid": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
      "name": "Sample Item Name",
      "code": "ITEM-001",
      "status": "active",
      "foreign_key_id": 5,
      "amount_cents": 15000,
      "currency": "USD",
      "created_at": "2026-08-25T12:00:00Z",
      "updated_at": "2026-08-25T12:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total": 45,
    "last_page": 3
  }
}
```

---

### 3.2 عرض تفاصيل عنصر محدد (Show Resource)

* **المسار:** `GET /api/v1/[resources]/:id`
* **المعاملات (Route Parameters):** `:id` المعرف الرقمي أو الـ UUID الخاص بالعنصر.

#### استجابة النجاح (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "uuid": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "name": "Sample Item Name",
    "code": "ITEM-001",
    "description": "Full detailed description text.",
    "status": "active",
    "foreign_key_id": 5,
    "amount_cents": 15000,
    "currency": "USD",
    "created_at": "2026-08-25T12:00:00Z",
    "updated_at": "2026-08-25T12:00:00Z"
  }
}
```

#### استجابة عدم الوجود (404 Not Found):
```json
{
  "success": false,
  "message": "Resource not found."
}
```

---

### 3.3 إنشاء عنصر جديد (Create Resource)

* **المسار:** `POST /api/v1/[resources]`
* **جسم الطلب (Request Payload):**
```json
{
  "name": "New Resource Item",
  "code": "ITEM-002",
  "description": "Optional description text",
  "foreign_key_id": 5,
  "amount_cents": 25000,
  "currency": "USD",
  "status": "active"
}
```

#### استجابة النجاح (201 Created):
```json
{
  "success": true,
  "message": "Resource created successfully.",
  "data": {
    "id": 2,
    "uuid": "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
    "name": "New Resource Item",
    "code": "ITEM-002",
    "status": "active",
    "created_at": "2026-08-25T14:30:00Z"
  }
}
```

#### استجابة فشل التحقق (422 Unprocessable Entity):
```json
{
  "success": false,
  "message": "The given data was invalid.",
  "errors": {
    "name": ["The name field is required."],
    "code": ["The code has already been taken."],
    "foreign_key_id": ["The selected foreign key id is invalid."]
  }
}
```

---

### 3.4 تعديل عنصر قائم (Update Resource)

* **المسار:** `PUT / PATCH /api/v1/[resources]/:id`
* **جسم الطلب (Request Payload):**
```json
{
  "name": "Updated Resource Name",
  "description": "Updated description text",
  "status": "active"
}
```

#### استجابة النجاح (200 OK):
```json
{
  "success": true,
  "message": "Resource updated successfully.",
  "data": {
    "id": 1,
    "name": "Updated Resource Name",
    "status": "active",
    "updated_at": "2026-08-25T15:00:00Z"
  }
}
```

---

### 3.5 حذف عنصر (Delete Resource - Soft Delete)

* **المسار:** `DELETE /api/v1/[resources]/:id`

#### استجابة النجاح (200 OK / 204 No Content):
```json
{
  "success": true,
  "message": "Resource deleted successfully."
}
```

#### استجابة منع الحذف لوجود ارتباطات (409 Conflict):
```json
{
  "success": false,
  "message": "Cannot delete resource because it is linked to active child records."
}
```

---

## 4. مصفوفة رموز وأخطاء الـ HTTP القياسية (Standard Error Responses)

تلتزم كافة المسارات بهياكل الأخطاء الموحدة التالية:

| كود الحالة | نوع الخطأ | هيكل الاستجابة المعياري |
| :--- | :--- | :--- |
| **`400 Bad Request`** | صياغة طلب خاطئة | `{"success": false, "message": "Malformed request payload."}` |
| **`401 Unauthorized`** | غياب أو انتهاء التوكن | `{"success": false, "message": "Unauthenticated access."}` |
| **`403 Forbidden`** | عدم امتلاك الصلاحية | `{"success": false, "message": "You do not have permission to perform this action."}` |
| **`404 Not Found`** | المورد غير موجود | `{"success": false, "message": "Resource not found."}` |
| **`409 Conflict`** | تعارض في الحالة أو العلاقات | `{"success": false, "message": "State conflict or dependency constraint violation."}` |
| **`422 Unprocessable`** | فشل التحقق من المدخلات | `{"success": false, "message": "Validation failed.", "errors": {"field": ["..."]}}` |
| **`429 Rate Limit`** | تجاوز معدل الطلبات | `{"success": false, "message": "Too many requests. Please try again later."}` |
| **`500 Server Error`** | خطأ خادم داخلي | `{"success": false, "message": "An internal server error occurred."}` |

---

## 5. قواعد الحماية وأمان المسارات (Security & Route Protection)

1. **المصادقة الإلزامية:** تغليف كافة مسارات المرحلة بـ Middleware التحقق من المصادقة (Auth Guard).
2. **فحص الصلاحيات (RBAC Middleware):** التحقق من امتلاك المستخدم للصلاحية المحددة في الجدول قبل وصول الطلب إلى المعالج.
3. **عزل المستأجرين (Tenant Scope):** حصر استعلامات المسارات تلقائياً بنطاق المستأجر الحالي لمنع تسريب البيانات.
4. **حماية الـ IDOR:** التأكد من أن المعرف الممرر في الرابط `:id` يتبع للمستأجر/المستخدم صاحب الطلب.

---

## 6. معايير القبول والاكتمال لمسارات الـ API (Acceptance Criteria)

- [ ] كافة المسارات المذكورة في هذا الملف مسجلة وتعمل بالـ HTTP Methods المحددة.
- [ ] الترويسات ومسارات الـ API تتبع نمط التسمية الجمع المعياري (`/api/v1/[resources]`).
- [ ] التحقق الصارم من صحة المدخلات مطبق على مسارات `POST` و `PUT/PATCH` مع إرجاع `422`.
- [ ] استجابات النجاح والفشل تلتزم بالهيكل الموحد (`success`, `data`, `message`, `errors`).
- [ ] الترقيم الإلزامي يعمل بنجاح مع معاملات `page` و `per_page`.
- [ ] اختبارات الـ API الآلية تغطي كافة المسارات والحالات الحدية (200, 201, 401, 403, 404, 422) بنسبة 100%.
- [ ] هذا الملف متطابق تماماً ومتزامن مع `MD/database.md` و `backend.md`.
