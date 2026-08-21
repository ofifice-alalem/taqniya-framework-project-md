# 🗺️ وثيقة مراحل وخطة ترحيل وهيكلة منظومة تقنية للتصميم (Taqniya Design System Migration Roadmap)

توثق هذه الصفحة المراحل الخمس لتحويل النموذج الأولي الأحادي الضخم في مجلد `design/` إلى منظومة تصميم برمجية قياسية مجزأة في `FRAMEWORK/01_design_system/` (أو `01_design_system/`).

---

## 📌 جدول متابعة وحالة المراحل (Phase Tracker)

| رقم المرحلة | اسم المرحلة | الحالة الحالية | تاريخ/وقت البدء | تاريخ/وقت الانتهاء |
| :---: | :--- | :---: | :---: | :---: |
| **المرحلة 1** | **الأساسات البصرية والـ Tokens و `taqniya.css` / `taqniya.js`** | ✅ **مكتمل (Completed)** | 2026-08-21 | 2026-08-21 |
| **المرحلة 2** | **المكونات الهيكلية وأدوات التنقل الأساسي (7 مكونات)** | 🔄 **جاري التنفيذ (In Progress)** | 2026-08-21 | — |
| **المرحلة 3** | **العناصر البصرية الأساسية والأزرار والبطاقات (7 مكونات)** | ⏳ **قيد الانتظار (Pending)** | — | — |
| **المرحلة 4** | **النماذج والجداول والتفاعلات المتقدمة (9 مكونات)** | ⏳ **قيد الانتظار (Pending)** | — | — |
| **المرحلة 5** | **المعرض العام الموحد والتوثيق والتدقيق النهائي** | ⏳ **قيد الانتظار (Pending)** | — | — |

---

## 📝 تفاصيل المهام لكل مرحلة (Detailed Task Breakdown)

### 🔹 المرحلة 1: بناء الأساسات البصرية المشتركة والـ Tokens
- [ ] إنشاء الهيكل الرئيسي للمجلدات في `FRAMEWORK/01_design_system/`
- [ ] نقل وتنظيم الأصول البصرية في `assets/images/` و `assets/icons/`
- [ ] إنشاء وثيقة الـ Tokens النقية `tokens.md` (ألوان، أنصاف أقطار، ظلال، حركات)
- [ ] إنشاء وثيقة القواعد المعمارية والمبادئ `rules.md` (RTL, A11y, Contrast, Typography)
- [ ] تجميع وبناء ملف الأنماط العام `css/taqniya.css`
- [ ] تجميع وبناء ملف الجافاسكريبت العام `js/taqniya.js`
- [ ] **التحقق والتأكد من سلامة التأسيس والتوقف لسؤال المستخدم للموافقة والانتقال**.

---

### 🔹 المرحلة 2: المكونات الهيكلية وأدوات التنقل الأساسي (7 مكونات)
- [ ] `01-breakpoints` (README.md, index.html, component.js)
- [ ] `02-grid` (README.md, index.html, component.js)
- [ ] `03-alignment` (README.md, index.html, component.js)
- [ ] `04-typography` (README.md, index.html, component.js)
- [ ] `17-breadcrumb` (README.md, index.html, component.css)
- [ ] `22-navbar` (README.md, index.html, component.css, component.js)
- [ ] `23-offcanvas` (README.md, index.html, component.css, component.js)
- [ ] **التحقق المستقل من كل مكون والتوقف لسؤال المستخدم للموافقة والانتقال**.

---

### 🔹 المرحلة 3: العناصر البصرية الأساسية والأزرار والبطاقات (7 مكونات)
- [ ] `05-media` (README.md, index.html, component.css)
- [ ] `07-color-palette` (README.md, index.html, component.css)
- [ ] `08-kpi-stat` (README.md, index.html, component.css)
- [ ] `09-button` (README.md, index.html, component.css)
- [ ] `10-button-group` (README.md, index.html, component.css, component.js)
- [ ] `11-card` (README.md, index.html, component.css)
- [ ] `16-badge` (README.md, index.html, component.css)
- [ ] **التحقق من تطابق المظهر البصري والتوقف لسؤال المستخدم للموافقة والانتقال**.

---

### 🔹 المرحلة 4: النماذج والجداول والتفاعلات المتقدمة (9 مكونات)
- [ ] `06-table` (README.md, index.html, component.css, component.js)
- [ ] `12-form` (README.md, index.html, component.css, component.js)
- [ ] `13-modal` (README.md, index.html, component.css, component.js)
- [ ] `14-progress` (README.md, index.html, component.css)
- [ ] `15-feedback` (README.md, index.html, component.css, component.js)
- [ ] `18-accordion` (README.md, index.html, component.css, component.js)
- [ ] `19-collapse` (README.md, index.html, component.css, component.js)
- [ ] `20-carousel` (README.md, index.html, component.css, component.js)
- [ ] `21-tabs` (README.md, index.html, component.css, component.js)
- [ ] **التحقق من سلامة كافة التفاعلات البرمجية والتوقف لسؤال المستخدم للموافقة والانتقال**.

---

### 🔹 المرحلة 5: المعرض العام الموحد والتوثيق والتدقيق النهائي
- [ ] بناء المعرض الشامل `index.html` في جذر المنظومة
- [ ] كتابة الدليل العام `README.md` وإرشادات التكامل مع أطر العمل (Blade, React, Vue)
- [ ] تنفيذ التدقيق الشامل لـ 12 معيار جودة
- [ ] تحديث الحالة الإجمالية إلى **مكتمل بالكامل (Fully Completed)** وتقديم التقرير النهائي.
