const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const targetDir = path.join(rootDir, 'FRAMEWORK/01_design_system');
const componentsDir = path.join(targetDir, 'components');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');

// Function to extract exact section by ID
function extractExactSection(sectionId) {
    const startTagRegex = new RegExp(`<section\\s+id="${sectionId}"[\\s\\S]*?>`, 'i');
    const startMatch = startTagRegex.exec(htmlSource);
    if (!startMatch) {
        console.error(`Section #${sectionId} not found!`);
        return '';
    }

    const startIndex = startMatch.index;
    const nextSectionRegex = /<section\s+(?:id="[^"]*"|class="[^"]*")/gi;
    nextSectionRegex.lastIndex = startIndex + startMatch[0].length;
    const nextMatch = nextSectionRegex.exec(htmlSource);

    let endIndex = nextMatch ? nextMatch.index : htmlSource.lastIndexOf('</main>');
    let rawSection = htmlSource.substring(startIndex, endIndex).trim();

    rawSection = rawSection.replace(/src="assets\//g, 'src="../../assets/images/');
    rawSection = rawSection.replace(/href="assets\//g, 'href="../../assets/images/');

    return rawSection;
}

// Generate full HTML template for standalone preview
function wrapHTML(title, sectionHTML, jsPath = 'component.js') {
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl" class="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Taqniya Design System</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@600;700;800;900&family=JetBrains+Mono:wght@500;700&family=Syne:wght@700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
    <!-- Local Fast Offline Icons & Tailwind -->
    <script src="../../js/lucide.min.js"></script>
    <script src="../../js/tailwind.min.js"></script>
    <script src="../../js/tailwind.config.js"></script>
    <!-- Global Core Styles -->
    <link rel="stylesheet" href="../../css/taqniya.css">
</head>
<body class="min-h-screen bg-[var(--bx-canvas)] text-bx-text font-sans antialiased">

    <!-- Global Floating Toast Stack Container -->
    <div id="toastContainer" class="fixed top-4 left-4 z-[99999] flex flex-col gap-3 max-w-sm w-full pointer-events-none"></div>

    <div class="max-w-[1600px] mx-auto p-4 sm:p-8 lg:p-12 space-y-8">
        <!-- Component Header Navigation -->
        <header class="flex items-center justify-between border-b border-bx-border pb-4">
            <div class="flex items-center gap-3">
                <a href="../../index.html" class="bx-tag hover:border-bx-primary transition-all">← المعرض العام</a>
                <span class="text-bx-muted text-xs">/</span>
                <span class="text-xs font-black text-bx-title">${title}</span>
            </div>
            <button type="button" onclick="toggleTheme()" class="bx-tag text-xs font-bold hover:border-bx-primary cursor-pointer flex items-center gap-2">
                <i data-lucide="moon" class="w-3.5 h-3.5"></i>
                <span>تبديل السمة (Light / Dark)</span>
            </button>
        </header>

        <!-- Main Section Content -->
        <main class="space-y-8">
            ${sectionHTML}
        </main>
    </div>

    <!-- Global & Component JS -->
    <script src="../../js/taqniya.js"></script>
    ${jsPath ? `<script src="${jsPath}"></script>` : ''}
    <script>
        function renderIcons() {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }
        renderIcons();
        document.addEventListener('DOMContentLoaded', renderIcons);
        window.addEventListener('load', renderIcons);
    </script>
</body>
</html>`;
}

// 7 Phase 3 Components Definition
const phase3 = [
    {
        id: 'media',
        folder: '05-media',
        title: '5. الصور والوسائط والأفاتار (Images & Media)',
        readme: `# 5. الصور والوسائط والأفاتار (Images & Media)

## 📌 الغرض المعماري
مصفوفة متكاملة للتعامل مع الصور، الرموز الشخصية ثلاثية الأبعاد (3D Avatars)، وأغلفة المشاريع، مع نسب الأبعاد القياسية (Aspect Ratios) وتأثيرات الحواف والحالات التفاعلية.

## 🎨 التنويعات (Variants)
- **أفاتار ثلاثي الأبعاد (3D Avatars)**: مقاسات دقيقة (sm: 32px, md: 48px, lg: 64px, xl: 96px) مع مؤشرات الحالة النشطة (Online Indicator).
- **مجموعات الأفاتار المتداخلة (Avatar Stack Group)**: تراكب أفقي للأعضاء مع كبسولة العداد المتبقي (+5).
- **أغلفة المشاريع والبطاقات (Project Covers)**: نسب 16:9 و 4:3 و 1:1 مع تأثيرات الزجاج والعمق.

## 📐 قواعد الاستخدام
- استخدم دائماً الكلاسات المعيارية مثل \`.bx-avatar\` و \`.bx-avatar-group\`.
- حافظ على استخدام تنسيقات WEBP أو PNG الشفافة للأفاتار لضمان التوافق مع الوضعين الفاتح والداكن.
`,
        js: `/** 05-media component.js */\n`
    },
    {
        id: 'colors',
        folder: '07-color-palette',
        title: '7. لوحة الألوان والسمات (Color Palette & Semantic Tokens)',
        readme: `# 7. لوحة الألوان والسمات (Color Palette & Semantic Tokens)

## 📌 الغرض المعماري
المرجع الأساسي المعتمد لكافة التدرجات اللونية (Primary, Canvas, Surface, Border, Functional Colors) مع نسب التباين ومعايير WCAG AA.

## 🎨 التصنيفات
- **ألوان الهوية (Brand Colors)**: Primary (#5B3CE6), Primary Hover (#482FD0), Canvas, Surface Solid.
- **ألوان الحالات الوظيفية (Functional Colors)**: Danger (#EF4444), Success (#10B981), Warning (#F59E0B), Info (#3B82F6).
- **ألوان الحدود والفواصل (Borders & Dividers)**: Border, Border Strong, Divider, Pill.

## 📐 قواعد الاستخدام
- لا تقم أبداً بتضمين أكواد Hex لونية ثابتة داخل المكونات؛ اعتمد دائماً على متغيرات الـ CSS: \`var(--bx-*)\`.
`,
        js: `/** 07-color-palette component.js */\n`
    },
    {
        id: 'kpi',
        folder: '08-kpi-stat',
        title: '8. بطاقات مؤشرات الأداء (KPI & Stat Cards)',
        readme: `# 8. بطاقات مؤشرات الأداء (KPI & Stat Cards)

## 📌 الغرض المعماري
عرض المؤشرات الرقمية الحيوية (Uptime, Latency, Memory, Active Records) بأسلوب VisionOS ثلاثي الأبعاد مع شارات التغير النسبي (Delta % Chips) ومؤشرات الاتجاه (Trend Badges).

## 🎨 التنويعات
- **بطاقة مؤشر الأداء الكبرى (Primary Metric Card)**: قيمة بارزة بخط Alexandria الهندسي، مع أيقونة معزولة وشارة نسبة الإنجاز.
- **مصفوفة المؤشرات الرباعية (4-Col KPI Grid)**: جاهزية الخوادم (Uptime)، زمن الاستجابة (Latency)، والذاكرة.

## 📐 قواعد الاستخدام
- الأرقام والإحصائيات تستخدم دائماً خط \`Alexandria\` أو \`Syne\` بوزن \`font-black\`.
`,
        js: `/** 08-kpi-stat component.js */\n`
    },
    {
        id: 'buttons',
        folder: '09-button',
        title: '9. منظومة الأزرار التفاعلية (Interactive Buttons System)',
        readme: `# 9. منظومة الأزرار التفاعلية (Interactive Buttons System)

## 📌 الغرض المعماري
مصفوفة متكاملة لكافة أشكال الأزرار وأحجامها وحالاتها في المنظومة (Primary, Outline, Ghost, Danger, Success, Warning, Loading, Icon Buttons).

## 🎨 التنويعات
- **الأزرار الأساسية (Primary \`.bx-btn-primary\`)**: خلفية بنفسجية متباينة مع ظل خفيف وتفاعل رفع عند التحويم.
- **الأزرار المفرغة (Outline \`.bx-btn-outline\`)**: حدود ناعمة مع خلفية متكيفة.
- **الأزرار الشفافة (Ghost \`.bx-btn-ghost\`)**: مخصصة للإجراءات الثانوية داخل القوائم وأشرطة الأدوات.
- **الأزرار الوظيفية (Functional \`.bx-btn-danger\`, \`.bx-btn-success\`)**: مخصصة للحذف والاعتماد والتنبيه.
- **أزرار الأيقونات الدائرية والكبسولية (Icon Buttons)**.

## 📐 الحالات التفاعلية
- Hover, Active, Focus Ring, Disabled, Loading Spinner.
`,
        js: `/** 09-button component.js */\n`
    },
    {
        id: 'button-groups',
        folder: '10-button-group',
        title: '10. مجموعات الأزرار والتحكم المقسم (Button Groups & Segmented Controls)',
        readme: `# 10. مجموعات الأزرار والتحكم المقسم (Button Groups & Segmented Controls)

## 📌 الغرض المعماري
أدوات التبديل والاختيار المجمعة (Segmented Radio Controls, Checkbox Button Groups, Split Buttons, Toolbar Action Strips).

## 🎨 التنويعات
- **مبدل العرض المقسم (Segmented View Switcher)**: (عرض شبكي، عرض قائمة، عرض جدول).
- **شريط أدوات الإجراءات (Toolbar Strip)**: أزرار متصلة للتحرير والتنسيق والتصدير.
- **أزرار التنقل بين الصفحات (Pagination Joined Groups)**.

## 📐 التفاعل البرمجي
- \`setSegmentedRadio(btn, label)\`: تبديل خيار أحادي.
- \`toggleSegmentedCheckbox(btn)\`: تبديل خيارات متعددة.
- \`toggleToolbarBtn(btn)\`: تبديل زر أداة.
`,
        js: `/**
 * 10-button-group component.js
 * Segmented Controls & Button Groups Logic
 */

function setSegmentedRadio(btn, label) {
    const parent = btn.parentElement;
    if (parent) {
        parent.querySelectorAll('button').forEach(b => {
            b.classList.remove('bg-bx-primary', 'text-white', 'shadow-xs', 'font-black');
            b.classList.add('text-bx-muted');
        });
        btn.classList.add('bg-bx-primary', 'text-white', 'shadow-xs', 'font-black');
        btn.classList.remove('text-bx-muted');
    }
    if (typeof showToast === 'function') {
        showToast('info', 'التحكم المقسم (Segmented Radio)', 'تم اختيار: ' + label);
    }
}

function toggleSegmentedCheckbox(btn) {
    const isActive = btn.classList.contains('bg-bx-primary');
    if (isActive) {
        btn.classList.remove('bg-bx-primary', 'text-white', 'font-black');
        btn.classList.add('text-bx-muted');
    } else {
        btn.classList.add('bg-bx-primary', 'text-white', 'font-black');
        btn.classList.remove('text-bx-muted');
    }
}

function toggleToolbarBtn(btn) {
    btn.classList.toggle('bg-bx-primary');
    btn.classList.toggle('text-white');
}

function setToolbarRadio(btn) {
    const parent = btn.parentElement;
    if (parent) {
        parent.querySelectorAll('button').forEach(b => {
            b.classList.remove('bg-bx-primary', 'text-white');
        });
        btn.classList.add('bg-bx-primary', 'text-white');
    }
}
`
    },
    {
        id: 'cards',
        folder: '11-card',
        title: '11. منظومة البطاقات المكانية ثلاثية الأبعاد (Spatial Cards System)',
        readme: `# 11. منظومة البطاقات المكانية ثلاثية الأبعاد (Spatial Cards System)

## 📌 الغرض المعماري
العمود الفقري لبناء واجهات VisionOS المكانية: بطاقات الحزم المعمارية، بطاقات الخدمات السحابية، بطاقات التوثيق، بطاقات المستخدمين، والبطاقات التفاعلية الغنية.

## 🎨 التنويعات
- **بطاقات الخدمات المعمارية (Architecture Stack Cards)**: زوايا فائقة النعومة، تدرجات هادئة، إطارات متكيفة، وأزرار استكشاف سريعة.
- **بطاقات المعاينة المباشرة (Live Preview Media Cards)**: صور وأغلفة مع رؤوس تنفيذية.
- **بطاقات الملف الشخصي وفريق العمل (Profile & Member Cards)**.

## 📐 قواعد الاستخدام
- استخدم دائماً كلاس الأساس \`.bx-card\`.
- تدعم البطاقات التدرج اللوني الزجاجي في الوضعين الفاتح والداكن تلقائياً.
`,
        js: `/** 11-card component.js */\n`
    },
    {
        id: 'badges',
        folder: '16-badge',
        title: '16. الشارات والوسوم والكبسولات (Badges, Tags & Chips)',
        readme: `# 16. الشارات والوسوم والكبسولات (Badges, Tags & Chips)

## 📌 الغرض المعماري
عناصر التمييز اللوني والبياني السريع: شارات الحالة (Status Badges)، كبسولات العدادات (Counter Pills)، وسوم الفئات القابلة للإزالة (Dismissible Chips)، ونقاط الحالة الحية (Live Pulse Dots).

## 🎨 التنويعات
- **شارات الحالة الوظيفية (\`.bx-tag\`)**: (معتمد، قيد المراجعة، ملغي، مسودة).
- **الكبسولات المتفاعلة (Filter Chips)**: وسوم قابلة للإغلاق والحذف.
- **مؤشرات النبض اللحظية (Pulse Indicators)**: مؤشرات صحة النظام والربط السحابي.

## 📐 التفاعل البرمجي
- \`removeChip(btn)\`: حذف الكبسولة بتأثير حركي سلس.
`,
        js: `/**
 * 16-badge component.js
 * Badges, Tags & Chips Logic
 */

function removeChip(btn) {
    const chip = btn.closest('.bx-chip') || btn.parentElement;
    if (chip) {
        chip.style.transition = 'all 0.2s ease';
        chip.style.opacity = '0';
        chip.style.transform = 'scale(0.8)';
        setTimeout(() => chip.remove(), 200);
    }
}
`
    }
];

console.log('=== BUILDING PHASE 3 COMPONENTS ===');

phase3.forEach(cfg => {
    const folderPath = path.join(componentsDir, cfg.folder);
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

    const rawHTML = extractExactSection(cfg.id);
    const fullHTML = wrapHTML(cfg.title, rawHTML, 'component.js');

    fs.writeFileSync(path.join(folderPath, 'index.html'), fullHTML, 'utf8');
    fs.writeFileSync(path.join(folderPath, 'README.md'), cfg.readme.trim() + '\n', 'utf8');
    fs.writeFileSync(path.join(folderPath, 'component.js'), cfg.js.trim() + '\n', 'utf8');

    console.log(`Generated Phase 3 Component: ${cfg.folder} (${rawHTML.split('\n').length} lines of exact HTML)`);
});

console.log('All 7 Phase 3 components generated successfully!');
