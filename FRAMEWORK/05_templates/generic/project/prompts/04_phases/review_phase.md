# 🤖 Prompt: Review Phase (موجّه مراجعة وتدقيق اكتمال المرحلة)

> **الغرض:** يُستخدم بعد انتهاء التنفيذ البرمجي للمرحلة للتحقق من الجودة، والأمان، وتطابق الكود مع التوثيق، واجتياز بوابات التحقق الثمانية.

---

## 📝 تعليمات التنفيذ للـ AI Agent

قم بإجراء مراجعة شاملة وصارمة للمرحلة: `[أدخل اسم أو مسار مجلد المرحلة]`

### 1. تشغيل بوابات التحقق الثمانية (8-Stage Verification Gatekeeper)
قم بتقييم كل بوابة بإحدى الحالات: (`PASS`, `FAIL`, `N/A`):

1. **بوابة البناء والترجمة (Stage 1: Build & Static Analysis):** نجاح التحليل السكوني (`PHPStan`, `ESLint`, `TypeScript`) وخلو الكود من أخطاء الـ Syntax.
2. **بوابة الاختبارات الآلية (Stage 2: Automated Tests):** تشغيل كامل حزمة الاختبارات المعنية بالمرحلة (Pest/PHPUnit/Vitest) ونجاحها بنسبة 100%.
3. **بوابة الأمان والصلاحيات (Stage 3: Security & Auth):** التأكد من الـ Parameterized Queries، وفحص صلاحيات الـ RBAC/Policies، وخلو الكود من أي أسرار أو مفاتيح API مكشوفة.
4. **بوابة حدود الطبقات المعمارية (Stage 4: Architectural Boundaries):** منع استدعاء الـ Eloquent/ORM مباشرة في Controllers أو Views، والتزام نمط الطبقات المعتمد.
5. **بوابة التصميم والواجهات (Stage 5: Design Tokens & UI):** مطابقة الواجهات لنظام التصميم والرموز (Tokens) ودعم `dir="rtl"`.
6. **بوابة مزامنة التوثيق (Stage 6: Documentation Sync):** تحديث ملفات المرحلة (`README.md`, `backend.md`, `frontend.md`, `routes.md`) لتعكس الواقع البرمجي الفعلي.
7. **بوابة سياسات الأداء (Stage 7: Performance Policy Compliance):** التحقق من الالتزام بسياسات `frontend_capabilities.yaml` المعينة كـ `required` (مثل Lazy Loading, Virtualization, Form Debounce).
8. **بوابة معايير الاكتمال (Stage 8: Definition of Done - DoD):** التحقق من استيفاء كافة بنود معايير الاكتمال الـ 10 المحددة في `03_ai_protocol/completion_criteria.md`.

### 2. مطابقة المخطط وقواعد العمل
- هل احترم الكود مخطط قاعدة البيانات في `PROJECT/MD/database.md` دون أي جداول أو أعمدة مستحدثة عشوائياً؟
- هل احترم الكود شروط وقواعد العمل في `PROJECT/MD/business_rules.md`؟

### 3. القرار النهائي والتقرير (Phase Sign-Off)
أصدر تقريراً نهائياً يتضمن:
- **جدول تقييم البوابات الثمانية:** حالة كل مرحلة.
- **الحالة النهائية:**
  - 🟢 **`PHASE COMPLETE & SIGNED-OFF`** (إذا اجتازت كل البوابات بنجاح).
  - 🔴 **`PHASE INCOMPLETE - ACTION REQUIRED`** (قائمة نقطية صريحة بالثغرات أو الاختبارات الفاشلة لإصلاحها فوراً).
