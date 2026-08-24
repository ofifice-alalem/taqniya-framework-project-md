# 🤖 Prompt: Initialize Project (موجّه تهيئة المشروع)

> **الغرض:** يُستخدم عند بدء العمل على مشروع جديد أو تهيئة مستودع قائم وفق معايير Taqniya AI Framework.  
> **الدور:** يقرأ `stack.yaml` ويستخلص التقنيات، يحل البروفايلات، يستطلع خيارات سياسات الواجهة ومحرك التنفيذ، وينشئ ملفات الإعداد الثلاثية.

---

## 📝 تعليمات التنفيذ للـ AI Agent

عند تشغيل هذا الموجّه، اتبع التسلسل المحدد خطوة بخطوة:

### 1. قراءة وفحص التقنيات (`stack.yaml`)
- افتح واقرأ ملف `PROJECT/MD/stack.yaml`.
- استخرج أبعاد المشروع المعتمدة (Backend, Frontend, Database, State, Styling, Testing).
- **قاعدة صارمة:** لا تفترض وجود أي تقنية لم تُذكر صراحة في `stack.yaml`.

### 2. مطابقة وحل البروفايلات (`06_stack_profiles/*`)
- طابق التقنيات المعلنة مع المجلدات في `FRAMEWORK/06_stack_profiles/`.
- في حال عدم وجود بروفايل متخصص لأي تقنية (مثل Svelte, FastAPI, Django): فعّل بروتوكول `Unknown Technology Protocol` (الاعتماد على مبادئ النواة `00_core/*` دون اختلاق قواعد زائفة).

### 3. ضبط سياسات وقدرات الواجهة (`frontend_capabilities.yaml`)
- **إذا كان المشروع يحتوي على Frontend:**
  - اعرض على المطور خط الأساس الموصى به لتقنيته (React / Vue / Blade Recommended Baseline).
  - اسأل المطور: *"هل ترغب في اعتماد الإعدادات الموصى بها (Recommended Defaults) أم التخصيص اليدوي (Customize) للـ 26 قدرة أداء؟"*
  - **Recommended Defaults:** انسخ خط الأساس المناسب للمشروع إلى `PROJECT/MD/frontend_capabilities.yaml`.
  - **Customize:** اعرض القدرات الـ 26 لضبط حالتها (`required`, `enabled`, `disabled`, `optional`).
- **إذا كان المشروع Backend / API فقط:** تجاهل هذه الخطوة وضع علامة `N/A`.

### 4. اختيار محرك التنفيذ (`execution_engine.yaml`)
- اقرأ الكتالوج المعتمد في `FRAMEWORK/03_ai_protocol/runtime/execution_engines.yaml`.
- اعرض على المطور قائمة المحركات المتاحة:
  1. `superpowers`: التخطيط والتنفيذ عبر TDD وفرضيات تصحيح الأخطاء.
  2. `claude_code`: بيئة التنفيذ الطرفية عبر أوامر CLI.
  3. `antigravity`: بيئة IDE والأدوات التفاعلية وملفات الـ Artifacts.
  4. `codex`: توليد الكود والترقيع البرمجي المباشر.
  5. `custom`: سكريبت أو محرك مخصص للمطور.
  6. `native`: دورة التنفيذ الأساسية المدمجة في بروتوكول تقنية.
- بناءً على اختيار المطور، أنشئ ملف `PROJECT/MD/execution_engine.yaml` (مثال: `name: "superpowers"`).

### 5. التحقق من اكتمال التهيئة (Readiness Check)
- تأكد من وجود وتكامل الملفات الثلاثية:
  - [ ] `PROJECT/MD/stack.yaml`
  - [ ] `PROJECT/MD/frontend_capabilities.yaml` (إن وُجد Frontend)
  - [ ] `PROJECT/MD/execution_engine.yaml`
- أبلغ المطور باكتمال التهيئة بنجاح واعرض ملخص الإعدادات المعتمدة.
