# 🤖 Prompt: Review Project Configuration (موجّه مراجعة إعدادات المشروع)

> **الغرض:** يُستخدم لمراجعة وتدقيق الإعدادات بعد التهيئة وقبل بدء العمل على المراحل، للتأكد من اتساق القرارات وخلوها من التعارضات.

---

## 📝 تعليمات التنفيذ للـ AI Agent

قم بإجراء فحص شامل للملفات الإعدادية الأساسية في المشروع:

### 1. مراجعة اتساق الـ Stack (`stack.yaml`)
- تحقق من أن جميع التقنيات المذكورة هي خيارات قياسية وغير متضاربة (Single Canonical Choice).
- تحقق من وجود أبعاد (Backend, Database, Testing, Build).
- تأكد من خلو الملف من الخيارات المزدوجة المبهمة.

### 2. تدقيق سياسة قدرات الواجهة (`frontend_capabilities.yaml`)
- إذا كان `frontend` معلناً في `stack.yaml`:
  - تحقق من وجود الملف وتطابق الـ 26 قدرة أداء بالكامل دون نقص أو زيادة في المفاتيح.
  - تحقق من أن كل قدرة تحمل إحدى الحالات الأربع المعتمدة فقط: (`required`, `enabled`, `disabled`, `optional`).
  - تأكد من عدم تعارض أي قدرة `required` مع قدرات محظورة `disabled`.

### 3. تدقيق محرك التنفيذ (`execution_engine.yaml`)
- تحقق من وجود الملف وقراءة قيمة `name`.
- تحقق من أن اسم المحرك مسجل ومعتمد في الكتالوج `FRAMEWORK/03_ai_protocol/runtime/execution_engines.yaml`.
- **فحص الصرامة:** تأكد من عدم وجود أي أعلام أو تفاصيل تنفيذية داخل الملف (مثل `tdd: true` أو `planning: true`).

### 4. التقرير النهائي (Configuration Health Report)
أصدر جدولاً تفصيلياً يوضح:
- حالة `stack.yaml`: `[PASS / FAIL]`
- حالة `frontend_capabilities.yaml`: `[PASS / FAIL / N/A]`
- حالة `execution_engine.yaml`: `[PASS / FAIL]`
- **النتيجة الكلية:** `READY FOR IMPLEMENTATION` أو قائمة الإجراءات التصحيحية المطلوبة.
