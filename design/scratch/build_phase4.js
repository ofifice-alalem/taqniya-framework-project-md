const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const targetDir = path.join(rootDir, 'FRAMEWORK/01_design_system');
const componentsDir = path.join(targetDir, 'components');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');
const originalJS = fs.readFileSync(path.join(rootDir, 'design/js/main.js'), 'utf8');
const lines = htmlSource.split('\n');

// 1. Extract exact section by ID
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

// 2. Extract Floating Bulk Bar (Lines 31 to 56)
const bulkBarLines = lines.slice(30, 56).join('\n');
let cleanBulkBarHTML = bulkBarLines.replace(/src="assets\//g, 'src="../../assets/images/');

// 3. Extract All Modal Dialogs (Lines 7090 to 8015)
const modalLines = lines.slice(7089, 8015).join('\n');
let cleanModalsHTML = modalLines.replace(/src="assets\//g, 'src="../../assets/images/');
cleanModalsHTML = cleanModalsHTML.replace(/href="assets\//g, 'href="../../assets/images/');

// 4. Standalone Page Wrapper
function wrapHTML(title, sectionHTML, extraBodyTop = '', extraBodyBottom = '', jsPath = 'component.js') {
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

    <!-- Extra Top Overlays -->
    ${extraBodyTop}

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

    <!-- Extra Bottom Overlays (e.g. Modals) -->
    ${extraBodyBottom}

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

// 5. Phase 4 Component Definitions
const phase4 = [
    {
        id: 'tables',
        folder: '06-table',
        title: '6. جداول البيانات والسجلات (Data Tables & Records)',
        extraTop: cleanBulkBarHTML,
        extraBottom: '',
        readme: `# 6. جداول البيانات والسجلات (Data Tables & Records)

## 📌 الغرض المعماري
جدول بيانات متقدم بأسلوب Spatial UI: أعمدة قابلة للترتيب، مربعات اختيار للصفوف، شريط عائم للعمليات المجمعة (Floating Bulk Actions Bar)، أزرار التصفية الفورية، وبحث حي.

## 🎨 التنويعات
- **شريط العمليات المجمعة (\`#bulkBarFloating\`)**: يظهر تلقائياً عند تحديد صف أو أكثر، ويوفر تصدير، حذف مجمع، وإلغاء التحديد.
- **تصفية الحالة**: (الكل، نشط، معلق، مؤرشف).
- **تصميم الأسطر**: فواصل واضحة (\`--bx-divider\`)، تأثير تحويم ناعم (\`--bx-row-hover\`)، وحالة نشطة (\`--bx-row-active\`).
`,
        js: `/**
 * 06-table component.js
 * Table Selection, Search, and Filter Engine
 */

let selectedTableRows = [];

function toggleSelectAll(masterCheckbox) {
    const checkboxes = document.querySelectorAll('.table-row-cb');
    selectedTableRows = [];
    checkboxes.forEach(cb => {
        cb.checked = masterCheckbox.checked;
        const row = cb.closest('tr');
        if (masterCheckbox.checked) {
            selectedTableRows.push(cb.value);
            if (row) row.classList.add('bg-[var(--bx-row-active)]');
        } else {
            if (row) row.classList.remove('bg-[var(--bx-row-active)]');
        }
    });
    updateBulkBar();
}

function updateBulkBar() {
    const checkboxes = document.querySelectorAll('.table-row-cb:checked');
    const bulkBar = document.getElementById('bulkBarFloating');
    const bulkText = document.getElementById('bulkText');
    const masterCb = document.getElementById('selectAllRows');

    selectedTableRows = Array.from(checkboxes).map(cb => cb.value);

    // Update row highlighting
    document.querySelectorAll('.table-row-cb').forEach(cb => {
        const row = cb.closest('tr');
        if (row) {
            if (cb.checked) row.classList.add('bg-[var(--bx-row-active)]');
            else row.classList.remove('bg-[var(--bx-row-active)]');
        }
    });

    if (bulkBar && bulkText) {
        if (selectedTableRows.length > 0) {
            bulkText.textContent = 'تم تحديد ' + selectedTableRows.length + ' عناصر';
            bulkBar.style.display = 'flex';
        } else {
            bulkBar.style.display = 'none';
        }
    }

    if (masterCb) {
        const total = document.querySelectorAll('.table-row-cb').length;
        masterCb.checked = (selectedTableRows.length === total && total > 0);
    }
}

function unselectAll() {
    document.querySelectorAll('.table-row-cb').forEach(cb => {
        cb.checked = false;
        const row = cb.closest('tr');
        if (row) row.classList.remove('bg-[var(--bx-row-active)]');
    });
    const masterCb = document.getElementById('selectAllRows');
    if (masterCb) masterCb.checked = false;
    updateBulkBar();
}

function filterRows(status) {
    const rows = document.querySelectorAll('#tableBody tr');
    rows.forEach(r => {
        if (status === 'all' || r.dataset.status === status) {
            r.style.display = '';
        } else {
            r.style.display = 'none';
        }
    });
}
`
    },
    {
        id: 'forms',
        folder: '12-form',
        title: '12. حقول الإدخال والنماذج (Inputs & Form Studio)',
        extraTop: '',
        extraBottom: '',
        readme: `# 12. حقول الإدخال والنماذج (Inputs & Form Studio)

## 📌 الغرض المعماري
استوديو متكامل لحقول الإدخال والنماذج بأسلوب VisionOS: حقول نصية، تبديل كلمة المرور، القائمة المنسدلة متعددة الاختيارات مع البحث الذكي والشرائح (Multi-select with Filter Chips)، مربعات الاختيار المخصصة، أزرار الراديو، مزاليق المدى، ومساحة رفع الملفات بالسحب والإفلات.

## 📐 التفاعل البرمجي
- \`togglePasswordVisibility(inputId, btn)\`: إظهار/إخفاء كلمة المرور.
- \`filterMultiSelect(query)\`: فلترة الخيارات المنسدلة في الوقت الفعلي.
- \`toggleMultiItem(val, event)\`: تحديد وإلغاء تحديد العناصر بالشرائح.
- \`submitFormDemo()\`: التحقق وعرض إشعار النجاح.
`,
        js: `/**
 * 12-form component.js
 * Form Validation, Multi-Select Chips, and Password Toggle Logic
 */

let selectedMultiItems = ['arch_schema', 'vision_os'];
const multiItemsData = [
    { val: 'arch_schema', label: 'مخطط المعمارية السحابية (SSoT Schema)' },
    { val: 'vision_os', label: 'واجهة فيجن المكانية (VisionOS Spatial UI)' },
    { val: 'rest_api', label: 'بوابة الـ API المركزية (REST/gRPC)' },
    { val: 'db_cluster', label: 'عقدة قاعدة البيانات (Multi-Region Cluster)' },
    { val: 'k8s_mesh', label: 'شبكة الحاويات (Kubernetes Service Mesh)' },
    { val: 'cache_redis', label: 'نظام الذاكرة المؤقتة (Redis Cluster)' }
];

function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    const icon = btn.querySelector('i');
    if (icon) {
        icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
        if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
    }
}

function renderMultiChips() {
    const container = document.getElementById('selectedChipsContainer');
    const countBadge = document.getElementById('multiSelectCountBadge');
    if (!container) return;

    container.innerHTML = '';
    selectedMultiItems.forEach(val => {
        const item = multiItemsData.find(i => i.val === val);
        if (!item) return;
        const chip = document.createElement('div');
        chip.className = 'flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[var(--bx-surface-solid)] border border-bx-border text-xs font-bold text-bx-primary';
        chip.innerHTML = '<span>' + item.label + '</span><button type="button" onclick="removeMultiChip(\\'' + val + '\\', event)" class="hover:text-red-500 transition-colors"><i data-lucide="x" class="w-3 h-3"></i></button>';
        container.appendChild(chip);
    });

    if (countBadge) {
        countBadge.textContent = selectedMultiItems.length + ' محددة';
    }

    document.querySelectorAll('#multiSelectList .multi-item').forEach(el => {
        const val = el.dataset.val;
        const chk = el.querySelector('input[type="checkbox"]');
        if (chk) chk.checked = selectedMultiItems.includes(val);
    });

    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
}

function toggleMultiItem(val, event) {
    if (event) event.stopPropagation();
    if (selectedMultiItems.includes(val)) {
        selectedMultiItems = selectedMultiItems.filter(v => v !== val);
    } else {
        selectedMultiItems.push(val);
    }
    renderMultiChips();
}

function removeMultiChip(val, event) {
    if (event) event.stopPropagation();
    selectedMultiItems = selectedMultiItems.filter(v => v !== val);
    renderMultiChips();
}

function selectAllMulti(event) {
    if (event) event.stopPropagation();
    selectedMultiItems = multiItemsData.map(i => i.val);
    renderMultiChips();
}

function clearAllMulti(event) {
    if (event) event.stopPropagation();
    selectedMultiItems = [];
    renderMultiChips();
}

function filterMultiSelect(query) {
    const q = query.trim().toLowerCase();
    const items = document.querySelectorAll('#multiSelectList .multi-item');
    items.forEach(el => {
        const text = el.textContent.toLowerCase();
        el.style.display = (!q || text.includes(q)) ? 'flex' : 'none';
    });
}

function submitFormDemo() {
    if (typeof showToast === 'function') {
        showToast('success', 'حفظ النموذج', 'تم التحقق من كافة الحقول والمدخلات بنجاح وحفظ البيانات!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderMultiChips();
});
`
    },
    {
        id: 'modals',
        folder: '13-modal',
        title: '13. النوافذ المنبثقة والحوارية (Modals & Dialogs)',
        extraTop: '',
        extraBottom: cleanModalsHTML,
        readme: `# 13. النوافذ المنبثقة والحوارية (Modals & Dialogs)

## 📌 الغرض المعماري
منظومة متكاملة للنوافذ الحوارية ثلاثية الأبعاد: نافذة تفاصيل السجل، نافذة إنشاء سجل جديد، نافذة تأكيد الحذف، نافذة معالج التدشين متعدد الخطوات (Multi-step Wizard)، نافذة الأذونات، وتأكيد التقييم، مع خلفيات التعتيم الزجاجي والرسوم المتحركة.

## 📐 التفاعل البرمجي
- \`openModal(modalId)\`: فتح النافذة المحددة وتفعيل الرؤية والـ Backdrop.
- \`closeModal(modalId)\`: إغلاق النافذة بحركة انسيابية.
- \`closeAllModals()\`: إغلاق كافة النوافذ المفتوحة.
- دعم مفتاح \`Escape\` للإغلاق التلقائي.
`,
        js: `/**
 * 13-modal component.js
 * Modal Dialogs Controller Engine
 */

function openModal(modalId) {
    closeAllModals();
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Modal not found:', modalId);
        return;
    }
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
    const anyOpen = document.querySelectorAll('.bx-modal:not(.hidden)');
    if (anyOpen.length === 0) {
        document.body.style.overflow = '';
    }
}

function closeAllModals() {
    document.querySelectorAll('.bx-modal, [id$="Modal"]').forEach(m => {
        m.classList.add('hidden');
        m.style.display = 'none';
    });
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});
`
    },
    {
        id: 'tasks',
        folder: '14-progress',
        title: '14. أشرطة التقدم والمراحل (Progress & Steppers)',
        extraTop: '',
        extraBottom: '',
        readme: `# 14. أشرطة التقدم والمراحل (Progress & Steppers)

## 📌 الغرض المعماري
مؤشرات الإنجاز ومراحل تنفيذ المهام: أشرطة التقدم الخطية المتدرجة (Linear Gradients)، عدادات النسبة المئوية الدائرية، ومعالجات الخطوات المتسلسلة (Multi-step Wizards).

## 🎨 التنويعات
- أشرطة التقدم ذات الألوان الوظيفية (Primary, Emerald, Amber, Red).
- أشرطة التقدم النبضية المتحركة (Animated Striped Progress).
- معالج الخطوات الأفقي والعمودي.
`,
        js: `/** 14-progress component.js */\n`
    },
    {
        id: 'feedback',
        folder: '15-feedback',
        title: '15. التنبيهات والإشعارات وبطاقات الحالة (Feedback & Alerts)',
        extraTop: '',
        extraBottom: '',
        readme: `# 15. التنبيهات والإشعارات وبطاقات الحالة (Feedback & Alerts)

## 📌 الغرض المعماري
إشعار المستخدم بالحالات الوظيفية وردود الأفعال اللحظية: التنبيهات الزجاجية المضمنة (Inline Alerts)، بطاقات التنبيه المنبثقة (Toast Stack)، ولافتات الإعلان والتحذير الأمني.

## 🎨 التنويعات
- **تنبيهات النجاح (Success Alert)**: خلفية خضراء ناعمة مع أيقونة اعتماد.
- **تنبيهات الخطر (Danger Alert)**: إطار أحمر للتنبيهات الأمنية.
- **تنبيهات التحذير (Warning Alert)**: للتنبيهات المجدولة ومهام المراجعة.
- **تنبيهات المعلومات (Info Alert)**: للملاحظات التوضيحية والتحديثات.
`,
        js: `/** 15-feedback component.js */\n`
    },
    {
        id: 'accordion',
        folder: '18-accordion',
        title: '18. القوائم الأوكورديون القابلة للطي (Accordions)',
        extraTop: '',
        extraBottom: '',
        readme: `# 18. القوائم الأوكورديون القابلة للطي (Accordions)

## 📌 الغرض المعماري
عرض الأسئلة الشائعة، التوثيق الهيكلي، والتفاصيل المتشعبة في لوحات قابلة للطي والتوسيع مع حركة انسيابية وتدوير سلس لأيقونة الـ Chevron.

## 📐 التفاعل البرمجي
- \`toggleAccordion(bodyId, btnId)\`: فتح/إغلاق اللوحة وتدوير السهم.
`,
        js: `/**
 * 18-accordion component.js
 * Accordion Expand/Collapse Logic
 */

function toggleAccordion(bodyId, btnId) {
    const body = document.getElementById(bodyId);
    const btn = document.getElementById(btnId);
    if (!body) return;

    const isHidden = body.classList.contains('hidden');
    if (isHidden) {
        body.classList.remove('hidden');
        if (btn) {
            const icon = btn.querySelector('.chevron-toggle, i');
            if (icon) icon.style.transform = 'rotate(180deg)';
        }
    } else {
        body.classList.add('hidden');
        if (btn) {
            const icon = btn.querySelector('.chevron-toggle, i');
            if (icon) icon.style.transform = 'rotate(0deg)';
        }
    }
}
`
    },
    {
        id: 'collapse',
        folder: '19-collapse',
        title: '19. لوحات الطي والتوسيع البسيطة (Collapse Panels)',
        extraTop: '',
        extraBottom: '',
        readme: `# 19. لوحات الطي والتوسيع البسيطة (Collapse Panels)

## 📌 الغرض المعماري
عناصر التحكم المستقلة في إظهار وإخفاء الكتل البرمجية، الصناديق النصية، والبطاقات الفردية عبر زر تبديل بسيط.

## 📐 التفاعل البرمجي
- \`toggleCollapse(targetId, btn)\`: إظهار/إخفاء الحاوية المستهدفة.
`,
        js: `/**
 * 19-collapse component.js
 * Simple Collapse Panel Logic
 */

function toggleCollapse(targetId, btn) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const isHidden = target.classList.contains('hidden');
    if (isHidden) {
        target.classList.remove('hidden');
        if (btn) btn.classList.add('active');
    } else {
        target.classList.add('hidden');
        if (btn) btn.classList.remove('active');
    }
}
`
    },
    {
        id: 'carousel',
        folder: '20-carousel',
        title: '20. معرض الشرائح المنزلق (Interactive Carousel)',
        extraTop: '',
        extraBottom: '',
        readme: `# 20. معرض الشرائح المنزلق (Interactive Carousel)

## 📌 الغرض المعماري
معرض شرائح منزلق متوافق مع اتجاه اليمين لليسار (RTL Carousel): يدعم السحب، أزرار الانتقال السابق/التالي، نقاط المؤشر الحركية (Dot Indicators)، وشارات ترقيم الشرائح.

## 📐 التفاعل البرمجي
- \`carouselNextSlide()\`: الانتقال للشريحة التالية.
- \`carouselPrevSlide()\`: الانتقال للشريحة السابقة.
- \`goToCarouselSlide(index)\`: القفز لشريحة محددة.
`,
        js: `/**
 * 20-carousel component.js
 * RTL Carousel Slider Engine
 */

let currentCarouselIndex = 0;
const totalCarouselSlides = 3;

function updateCarouselView() {
    const track = document.getElementById('carouselTrack');
    const badge = document.getElementById('carouselSlideBadge');
    const dots = document.querySelectorAll('#carouselDotsGroup .carousel-dot');

    if (track) {
        track.style.transform = 'translateX(' + (currentCarouselIndex * 100) + '%)';
    }

    if (badge) {
        badge.textContent = 'الشريحة ' + (currentCarouselIndex + 1) + ' من ' + totalCarouselSlides;
    }

    dots.forEach((dot, idx) => {
        if (idx === currentCarouselIndex) {
            dot.className = 'carousel-dot h-2.5 w-7 rounded-full bg-bx-primary transition-all';
        } else {
            dot.className = 'carousel-dot h-2.5 w-2.5 rounded-full bg-bx-border hover:bg-bx-primary transition-all';
        }
    });

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

function carouselNextSlide() {
    currentCarouselIndex = (currentCarouselIndex + 1) % totalCarouselSlides;
    updateCarouselView();
}

function carouselPrevSlide() {
    currentCarouselIndex = (currentCarouselIndex - 1 + totalCarouselSlides) % totalCarouselSlides;
    updateCarouselView();
}

function goToCarouselSlide(index) {
    currentCarouselIndex = Math.max(0, Math.min(index, totalCarouselSlides - 1));
    updateCarouselView();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCarouselView();
});
`
    },
    {
        id: 'tabs',
        folder: '21-tabs',
        title: '21. أشرطة التبويبات التفاعلية (Tabs Navigation)',
        extraTop: '',
        extraBottom: '',
        readme: `# 21. أشرطة التبويبات التفاعلية (Tabs Navigation)

## 📌 الغرض المعماري
نظام التبويبات متعدد الأنماط: التبويبات السفلية ذات الخط المتحرك (Underline Tabs)، الكبسولات المفرغة (Pills Tabs)، الصناديق المتصلة (Boxed Tabs)، والتبويبات الرأسية مع أيقونات بصرية.

## 📐 التفاعل البرمجي
- \`switchTab(containerId, paneId, btn)\`: تبديل لوحة المحتوى وتنشيط الزر المحدد وتحديث الأيقونات.
`,
        js: `/**
 * 21-tabs component.js
 * Interactive Tabs Switcher Engine
 */

function switchTab(containerId, paneId, btn) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const nav = btn.closest('.bx-tab-nav') || container.querySelector('.bx-tab-nav');
    if (nav) {
        nav.querySelectorAll('.bx-tab-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
    }

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    container.querySelectorAll('.bx-tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });

    const targetPane = document.getElementById(paneId);
    if (targetPane) {
        targetPane.classList.add('active');
    }

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}
`
    }
];

console.log('=== GENERATING ALL 9 PHASE 4 COMPONENTS ===');

phase4.forEach(cfg => {
    const folderPath = path.join(componentsDir, cfg.folder);
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

    const rawHTML = extractExactSection(cfg.id);
    const fullHTML = wrapHTML(cfg.title, rawHTML, cfg.extraTop, cfg.extraBottom, 'component.js');

    fs.writeFileSync(path.join(folderPath, 'index.html'), fullHTML, 'utf8');
    fs.writeFileSync(path.join(folderPath, 'README.md'), cfg.readme.trim() + '\n', 'utf8');
    fs.writeFileSync(path.join(folderPath, 'component.js'), cfg.js.trim() + '\n', 'utf8');

    console.log(`Generated Component: ${cfg.folder} (${rawHTML.split('\n').length} lines of exact HTML)`);
});

console.log('All 9 Phase 4 components generated successfully!');
