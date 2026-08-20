# 📊 Data Specifications - Phase 00

> **التفاصيل الخاصة ببيانات وكيانات ورسومات قاعدة البيانات لهذه المرحلة.**

---

## 🗄️ 1. الجدول والكيان الخاص بالمرحلة (`samples`)

### 📋 حقول الجدول (`samples` table schema)

| اسم الحقل | النوع (Data Type) | القيود (Constraints) | الوصف |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key, Auto Increment | المعرف الداخلي |
| `uuid` | `UUID` | Unique, Indexed | المعرف الفريد الخارجي |
| `name` | `VARCHAR(255)` | Not Null | اسم العنصر |
| `status` | `ENUM` | Default: `'draft'`, Values: `'draft', 'active'` | حالة العنصر |
| `category_id` | `BIGINT UNSIGNED` | Foreign Key (`categories.id`), Indexed | الفئة التابع لها |
| `created_at` | `TIMESTAMP` | Nullable | تاريخ الإنشاء |
| `updated_at` | `TIMESTAMP` | Nullable | تاريخ التعديل |
| `deleted_at` | `TIMESTAMP` | Nullable (Soft Delete) | تاريخ الحذف المفهومي |

---

## 🔗 2. العلاقات الخاصة بالمرحلة (Phase Relationships)
- `Sample` **BelongsTo** `Category` (`category_id` ➔ `categories.id`)
- `Sample` **HasMany** `SampleLogs`

---

## 🔒 3. القيود والحالات المسموحة (Constraints & States)
- يمنع تكرار الـ `name` لنفس الـ `category_id`.
- الحذف يتم مفهوماً (Soft Delete) بتعبئة حقل `deleted_at`.
