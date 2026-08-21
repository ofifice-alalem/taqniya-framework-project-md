# 🎨 Taqniya Framework Design System — v3.0

> **نظام التصميم المعماري الموحد لمنظومة تقنية (Single Source of Truth - SSoT)**  
> مكتبة مكونات معمارية متكاملة مبنية وفق أحدث معايير **Spatial UI (VisionOS Glassmorphism)** مع دعم أصيل ودقيق لتنسيق **RTL** واعتماد كلي على حزم محلية سريعة بدون أي اعتماديات خارجية أونلاين.

---

## 🏛️ 1. البنية المعمارية ثلاثية الطبقات للـ Tokens (3-Tier Token Architecture)

يعتمد النظام على هيكل ثلاثي الطبقات صارم لإدارة الألوان والمتغيرات البصرية:

```
┌────────────────────────────────────────────────────────┐
│ 1. Global Tokens (المتغيرات الشاملة - الألوان الخام)    │
│    #5B3CE6, #EBEBFA, #28293D, 0.875rem, ...            │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│ 2. Semantic Tokens (المتغيرات الدلالية والوظيفية)       │
│    --bx-primary, --bx-canvas, --bx-danger, --bx-title │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│ 3. Component Tokens (متغيرات المكونات الخاصة)          │
│    .bx-card, .bx-btn-primary, .bx-toast-item, ...      │
└────────────────────────────────────────────────────────┘
```

### ألوان الهوية والحالات الوظيفية:
- **اللون الأساسي (Brand Primary)**: `#5B3CE6` (البنفسجي المعماري الفاخر)
- **الخلفيات (Canvas Light / Dark)**: `#EBEBFA` (النهاري) / `#28293D` (الليلي)
- **الأسطح والبطاقات (Surface Solid)**: زجاجي عالي التعتيم مع حدود مضيئة
- **النجاح (Success)**: `#10B981` (الزمردي)
- **التحذير (Warning)**: `#F59E0B` (الكهرماني)
- **الخطر والحذف (Danger/Error)**: `#EF4444` (الياقوتي)

---

## 📂 2. خريطة المكونات الـ 23 (Component Taxonomy & Directory Map)

تم تقسيم وتوثيق المكونات الـ 23 في مجلدات مستقلة ومعيارية داخل `FRAMEWORK/01_design_system/components/`:

### 🔷 المجموعة الأولى: الهيكل والتنقل (Layout & Navigation)
| # | المكون | المجلد | الوصف والوظيفة |
| :---: | :--- | :--- | :--- |
| 01 | **Breakpoints** | `01-breakpoints/` | محددات الشاشات التجاوبية الـ 5 (`sm`, `md`, `lg`, `xl`, `2xl`) |
| 02 | **Grid System** | `02-grid/` | شبكة الأعمدة المرنة من 1 إلى 12 عموداً مع حساب الفواصل |
| 03 | **Alignment** | `03-alignment/` | المحاذاة والتموضع الهندسي وقواعد المسافات الرأسية والأفقية |
| 17 | **Breadcrumb** | `17-breadcrumb/` | مسار التنقل الهرمي التفاعلي مع علامات الفصل المتوافقة مع RTL |
| 22 | **Navbar** | `22-navbar/` | شريط التنقل العلوي الزجاجي المثبت مع مؤشرات النظام وقوائم المستخدم |

### 🔷 المجموعة الثانية: العناصر البصرية والبطاقات (Core Visuals & Cards)
| # | المكون | المجلد | الوصف والوظيفة |
| :---: | :--- | :--- | :--- |
| 04 | **Typography** | `04-typography/` | هرمية الخطوط (Alexandria للعناوين، Tajawal للنصوص، JetBrains Mono للأكواد) |
| 05 | **Media** | `05-media/` | الصور الرمزية المجسمة 3D، التراكب، ونسب أبعاد الأغلفة (16:9, 4:3, 1:1) |
| 07 | **Color Palette** | `07-color-palette/` | لوحة التوكنز المعمارية واختبارات تباين الألوان الفاتحة والداكنة |
| 08 | **KPI Stats** | `08-kpi-stat/` | بطاقات الإحصائيات الفائقة مع مؤشرات نسب النمو وخطوط Sparklines |
| 09 | **Buttons** | `09-button/` | الأزرار التفاعلية (Primary, Outline, Ghost, Danger, Loading) |
| 10 | **Button Groups** | `10-button-group/` | أشرطة الأدوات وأزرار التبديل المجزأة (Segmented Controls) |
| 11 | **Cards** | `11-card/` | بطاقات VisionOS الزجاجية، بطاقات التكديس المعماري والإجراءات |
| 16 | **Badges & Chips** | `16-badge/` | شارات الحالة، كبسولات العدادات، والرقائق القابلة للحذف ونقاط النبض |

### 🔷 المجموعة الثالثة: النماذج والجداول والتفاعلات (Interactive & Forms)
| # | المكون | المجلد | الوصف والوظيفة |
| :---: | :--- | :--- | :--- |
| 06 | **Tables** | `06-table/` | جداول البيانات مع تحديد متعدد، شريط إجراءات عائم، وتصفية لحظية |
| 12 | **Forms** | `12-form/` | حقول إدخال ذكية، تحقق فوري، اختيار متعدد مع رقائق، وقوائم بحث Fuzzy |
| 14 | **Progress** | `14-progress/` | أشرطة التقدم الخطية المتدرجة، العدادات الدائرية، ومؤشرات مسار الخطوات |
| 18 | **Accordion** | `18-accordion/` | قوائم مطوية فائقة الانسيابية بحركة CSS Grid الناعمة وزري توسيع/طي الكل |
| 19 | **Collapse** | `19-collapse/` | كتل استعراض المخطط البرمجي ولوحات الفلاتر المتقدمة بدون وميض |
| 20 | **Carousel** | `20-carousel/` | معرض الشرائح التفاعلي RTL مع مؤشر ترقيم ديناميكي (1 من 4) ونقاط تحكم |
| 21 | **Tabs** | `21-tabs/` | 4 أنماط ألسنة (Underline, Pills, Boxed, Icons) مع تبديل فوري للألواح |

### 🔷 المجموعة الرابعة: التنبيهات والطبقات المنبثقة (Feedback & Overlays)
| # | المكون | المجلد | الوصف والوظيفة |
| :---: | :--- | :--- | :--- |
| 13 | **Modals & Wizard** | `13-modal/` | 8 نوافذ حوارية تشمل معالج تهيئة من 3 خطوات، تأكيد الحذف، والتقييم |
| 15 | **Feedback Toasts** | `15-feedback/` | تنبيهات مؤطرة ثابتة ونظام إشعارات عائمة لحظي مع شريط تقدم متناقص وحركة Spring |
| 23 | **Offcanvas** | `23-offcanvas/` | أدراج جانبية (يمين/يسار) وألواح سفلية (Bottom Sheets) مع حماية الخلفية |

---

## ⚡ 3. دليل البدء السريع والاستخدام (Quick-Start Guide)

لاستخدام منظومة تقنية في أي صفحة ويب داخل إطار العمل، يكفي تضمين ملفات الـ CSS والـ JS المحلية التالية:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl" class="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مشروع تقنية</title>

    <!-- الخطوط المعتمدة -->
    <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@600;700;800;900&family=Tajawal:wght@400;500;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">

    <!-- الحزم المحلية السريعة (بدون اتصال خارجي) -->
    <script src="js/lucide.min.js"></script>
    <script src="js/tailwind.min.js"></script>
    <script src="js/tailwind.config.js"></script>

    <!-- ملف الأنماط الموحد لمنظومة تقنية -->
    <link rel="stylesheet" href="css/taqniya.css">
</head>
<body class="min-h-screen bg-[var(--bx-canvas)] text-bx-text font-sans antialiased">

    <!-- حاوية الإشعارات العائمة اللحظية -->
    <div id="toastContainer" class="fixed top-4 left-4 z-[99999] flex flex-col gap-3 max-w-sm w-full pointer-events-none"></div>

    <!-- مثال: زر وبطاقة تفاعلية -->
    <div class="p-8 space-y-4">
        <div class="bx-card p-6 space-y-3">
            <h3 class="font-display font-black text-lg text-bx-title">بطاقة معمارية بنظام تقنية</h3>
            <p class="text-xs text-bx-muted">واجهة تفاعلية زجاجية بنمط Spatial UI.</p>
            <button onclick="showToast('success', 'نجاح', 'تم تنفيذ الإجراء بنجاح!')" class="bx-btn bx-btn-primary text-xs">
                <i data-lucide="sparkles" class="w-4 h-4"></i>
                <span>تجربة التنبيه</span>
            </button>
        </div>
    </div>

    <!-- محرك الجافاسكريبت الموحد وتوليد الأيقونات -->
    <script src="js/taqniya.js"></script>
    <script>
        lucide.createIcons();
    </script>
</body>
</html>
```

---

## 🛡️ 4. قواعد ومبادئ الـ SSoT الصارمة (Strict Guidelines)

1. **الاعتماد الكلي على المتغيرات الدلالية (`CSS Custom Properties`)**:
   - يُمنع منعاً باتاً كتابة ألوان مخصصة (`hex`) داخل عناصر HTML. يجب دائماً استخدام المتغيرات مثل `var(--bx-primary)`, `var(--bx-canvas)`, `var(--bx-border)`.
2. **الاستقلالية وعدم الاعتماد على الإنترنت (`Zero CDN`)**:
   - جميع حزم Lucide Icons و TailwindCSS محملة محلياً داخل مجلد `js/` لضمان أداء فائق وسرعة فتح في أجزاء من الثانية.
3. **دعم الـ RTL في كامل المكونات**:
   - جميع الانزلاقات، الأكورديونات، الأدراج، والتنبيهات مصممة لتبدأ وتتحرك باتجاه اليمين الصحيح هندسياً.

---
**منظومة تقنية المعمارية © 2026 — مصممة للتميز المعماري والأداء الهندسي الفائق.**
