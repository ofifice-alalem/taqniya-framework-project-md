# 🤖 Prompt: Design Database (موجّه تصميم مواصفة قاعدة البيانات)

> **المسمى المعماري:** `Database Specification Designer`  
> **الغرض:** يُستخدم لتصميم أو تعديل وثيقة مواصفة قاعدة البيانات الرسمية (`PROJECT/MD/database.md`) وتحويل متطلبات وقواعد العمل إلى مخطط هندسي دقيق ومعتمد.

---

## 🚦 شروط وتوقيت الاستدعاء (Trigger Condition)

```text
هل يوجد ملف PROJECT/MD/database.md معتمد ومكتمل؟
     │
     ├──► [نعم - موجود ومعتمد] ────► 🛑 لا تقم بتشغيل هذا الموجّه!
     │                                 انتقل مباشرة إلى: implement_database.md
     │
     └──► [لا - غير موجود أو يحتاج تعديل] ──► 🟢 شَغّل هذا الموجّه (Design Database)
                                               1. حلل قواعد العمل والكيانات
                                               2. صمم المخطط التفصيلي
                                               3. أنشئ/حدّث database.md
                                               4. اطلب اعتماد المطور الصريح
                                               5. انتقل بعد الاعتماد إلى: implement_database.md
```

---

## 📝 تعليمات التنفيذ للـ AI Agent

عند تشغيل هذا الموجّه، قم ببناء المواصفة الهندسية في `PROJECT/MD/database.md`:

### 1. المدخلات المرجعية الإلزامية
- اقرأ قواعد وشروط العمل من `PROJECT/MD/business_rules.md`.
- اقرأ مفاهيم الكيانات والعلاقات الأولية من `PROJECT/MD/data.md`.
- اقرأ محرك وقواعد التخزين المعتمدة من `PROJECT/MD/stack.yaml`.

### 2. تصميم المخطط التفصيلي (Schema Blueprint)
لكل جدول في النظام، حدد بدقة متناهية:
1. **اسم الجدول (Table Name):** التسمية القياسية الموحدة (مثل الجمع بصيغة snake_case).
2. **الأعمدة وأنواع البيانات (Columns & Strict Types):** (مثل `uuid`, `bigint unsigned`, `varchar(255)`, `decimal(12,2)`, `timestamp`, إلخ).
3. **المفاتيح الأساسية والأجنبية (Keys):** Primary Keys، Foreign Keys والعلاقات المرتبطة بها.
4. **القيود الصارمة (Constraints):** `NOT NULL`، `UNIQUE`، `CHECK` constraints، والقيم الافتراضية.
5. **الفهارس وتحسين الأداء (Indexes):** فهارس البحث والتصفية المتكررة وفهارس الأعمدة المركبة (Composite Indexes).
6. **سلوك الحذف والتحديث (Cascade Rules):** `onDelete('cascade')`، `onDelete('restrict')`، أو استراتيجيات الـ Soft Deleting.

### 3. حفظ المخطط وطلب الاعتماد (Developer Sign-off)
- اكتب أو حدّث ملف `PROJECT/MD/database.md` بجميع الجداول والعلاقات بصيغة Markdown منظمة وشاملة.
- 🛑 **توقف واطلب مراجعة واعتماد المطور للمخطط.**
- بعد موافقة المطور، يتم إطلاق موجّه التنفيذ البرمجي: [`implement_database.md`](implement_database.md).
