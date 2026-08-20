# ⚙️ Backend Specifications - Phase 00

> **مواصفات ومتطلبات المعالجة والمنطق الخلفي (Backend Logic) لهذه المرحلة.**

---

## 🛠️ 1. الخدمات والمتحكمات المطلوبة (Controllers & Services)

### 🎮 `SampleController`
- **المسؤولية:** استقبال طلبات المستخدم الخاصة بهذه المرحلة ومعالجتها إما مباشرة أو عبر الخدمة المخصصة.
- **الأساليب (Methods):**
  - `index()`: إرجاع قائمة العناصر مع الدعم للصفحات والفلترة.
  - `show($id)`: إرجاع تفاصيل عنصر محدد.
  - `store(SampleRequest $request)`: إنشاء عنصر جديد بعد التحقق من الصحة.
  - `update(SampleRequest $request, $id)`: تعديل عنصر قائم.
  - `destroy($id)`: تنفيذ الحذف المفهومي (Soft Delete) للعنصر.

### 💼 `SampleService`
- **المسؤولية:** احتواء منطق الأعمال (Business Logic) وتغليف التعاملات المعقدة مع قاعدة البيانات.

---

## 🔒 2. الصلاحيات والتحقق (Authorization & Validation)

### 📋 قواعد التحقق من الإدخال (`SampleRequest`)
- `name`: مطلوب (required)، نصي (string)، حد أقصى 255 حرفاً.
- `status`: مطلوب (required)، قيم مسموحة: `draft`, `active`.
- `category_id`: مطلوب (required)، موجود في جدول الفئات `exists:categories,id`.

### 🛡️ الصلاحيات (Permissions Required)
- `sample.view`: لعرض العناصر.
- `sample.create`: لإنشاء عنصر جديد.
- `sample.update`: لتعديل عنصر.
- `sample.delete`: لحذف عنصر.

---

## 🌐 3. التكاملات والعمليات الخاصة (Operations & Integrations)
- **إرسال التنبيهات:** عند إتمام عملية الإنشاء يتم تفعيل حدث (Event) لإرسال تنبيه للمسؤولين.
- **Transaction:** مغلفة بـ `DB::transaction` لضمان سلامة العمليات المتعددة.
