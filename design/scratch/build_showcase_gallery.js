const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const galleryPath = path.join(rootDir, 'FRAMEWORK/01_design_system/index.html');

const componentsData = [
    {
        num: "01",
        folder: "01-breakpoints",
        category: "layout",
        categoryName: "الهيكل والتنقل",
        icon: "monitor",
        title: "محددات الشاشات التجاوبية (Breakpoints)",
        desc: "5 مستويات قياس تبدأ من sm: 640px إلى 2xl: 1536px لتوافق تام عبر كافة الشاشات والأجهزة.",
        tag: "Core Layout",
        features: ["5 Breakpoints", "RTL Ready", "Zero Jitter"]
    },
    {
        num: "02",
        folder: "02-grid",
        category: "layout",
        categoryName: "الهيكل والتنقل",
        icon: "grid",
        title: "الشبكة المعمارية والتخطيط (Grid System)",
        desc: "شبكة أعمدة مرنة من 1 إلى 12 عموداً مع حساب الفواصل الدقيقة بنظام Flexbox & CSS Grid.",
        tag: "Structure",
        features: ["12 Columns", "Auto Gap", "Subgrid Support"]
    },
    {
        num: "03",
        folder: "03-alignment",
        category: "layout",
        categoryName: "الهيكل والتنقل",
        icon: "align-right",
        title: "المحاذاة والتموضع (Alignment & Spacing)",
        desc: "محاذاة العناصر وتوزيع المسافات الرأسية والأفقية وقواعد التموضع الهندسي الدقيق.",
        tag: "Spacing",
        features: ["RTL Alignment", "Center Stacks", "Flex Stretch"]
    },
    {
        num: "04",
        folder: "04-typography",
        category: "visuals",
        categoryName: "العناصر البصرية",
        icon: "type",
        title: "الخطوط والطباعة (Typography Hierarchy)",
        desc: "هرمية متكاملة لخطوط Alexandria و Tajawal و JetBrains Mono للعناوين والنصوص والأكواد.",
        tag: "Design Tokens",
        features: ["Alexandria", "Tajawal", "JetBrains Mono"]
    },
    {
        num: "05",
        folder: "05-media",
        category: "visuals",
        categoryName: "العناصر البصرية",
        icon: "image",
        title: "الوسائط والصور ثلاثية الأبعاد (Media & Avatars)",
        desc: "أشكال الصور الرمزية المجسمة، تراكب المجموعات، وأغلفة المشاريع بنسب أبعاد 16:9 و 4:3 و 1:1.",
        tag: "Spatial 3D",
        features: ["3D Avatars", "Avatar Stacks", "Aspect Ratios"]
    },
    {
        num: "06",
        folder: "06-table",
        category: "interactive",
        categoryName: "التفاعلات والجداول",
        icon: "table-2",
        title: "جداول البيانات والسجلات (Data Tables)",
        desc: "جداول متقدمة مع تحديد متعدد، شريط إجراءات عائم، تصفية لحظية حسب الحالة، وبحث فوري.",
        tag: "Data Grid",
        features: ["Floating Actions", "Filter Engine", "Row Selection"]
    },
    {
        num: "07",
        folder: "07-color-palette",
        category: "visuals",
        categoryName: "العناصر البصرية",
        icon: "palette",
        title: "لوحة الألوان والتوكنز (Color Tokens & Palette)",
        desc: "توكنز الألوان المعمارية الأساسية وحالات الخطر والنجاح والتحذير واختبار التباين الفاتح والداكن.",
        tag: "SSoT Tokens",
        features: ["Brand Violet", "Status Palettes", "Contrast Checked"]
    },
    {
        num: "08",
        folder: "08-kpi-stat",
        category: "visuals",
        categoryName: "العناصر البصرية",
        icon: "trending-up",
        title: "بطاقات المؤشرات والإحصائيات (KPI & Stats)",
        desc: "بطاقات الإحصائيات الفائقة مع إشارات نسب النمو والتراجع والرسوم البيانية المصغرة (Sparklines).",
        tag: "Metrics",
        features: ["Trend Badges", "Sparklines", "Delta Percent"]
    },
    {
        num: "09",
        folder: "09-button",
        category: "visuals",
        categoryName: "العناصر البصرية",
        icon: "mouse-pointer-click",
        title: "الأزرار التفاعلية (Interactive Buttons)",
        desc: "أزرار الأساسية (Primary)، المفرغة (Outline)، الشبحية (Ghost)، وحالات التحميل والتعطيل.",
        tag: "Core Action",
        features: ["Button Variants", "Loading Spinners", "Icon Triggers"]
    },
    {
        num: "10",
        folder: "10-button-group",
        category: "visuals",
        categoryName: "العناصر البصرية",
        icon: "layers",
        title: "مجموعات الأزرار وأشرطة الأدوات (Button Groups)",
        desc: "أشرطة الأدوات المترابطة، أزرار التبديل المجزأة (Segmented Controls)، والمحددات المتعددة.",
        tag: "Toolbars",
        features: ["Segmented Controls", "Multi-Toggle", "Toolbar Strips"]
    },
    {
        num: "11",
        folder: "11-card",
        category: "visuals",
        categoryName: "العناصر البصرية",
        icon: "credit-card",
        title: "البطاقات المعمارية الزجاجية (Spatial Cards)",
        desc: "بطاقات VisionOS الزجاجية، بطاقات التكديس المعماري، وبطاقات الإجراءات المتفاعلة مع الإضاءة.",
        tag: "VisionOS UI",
        features: ["Glassmorphism", "Elevation Borders", "Interactive Glow"]
    },
    {
        num: "12",
        folder: "12-form",
        category: "interactive",
        categoryName: "التفاعلات والجداول",
        icon: "file-input",
        title: "حقول الإدخال والنماذج الذكية (Inputs & Forms)",
        desc: "حقول نصية مع تحقق فوري، قوائم منسدلة ذكية، اختيار متعدد مع رقائق قابلة للحذف، ومربعات اختيار مخصصة.",
        tag: "Form Studio",
        features: ["Fuzzy Search", "Multi Chips", "Live Validation"]
    },
    {
        num: "13",
        folder: "13-modal",
        category: "overlays",
        categoryName: "التنبيهات والطبقات",
        icon: "sparkles",
        title: "النوافذ المنبثقة ومعالج التدشين (Modals & Wizard)",
        desc: "8 نوافذ حوارية تشمل معالج تهيئة متعدد الخطوات (Wizard)، تأكيد الحذف، الصلاحيات، واستطلاع الرأي.",
        tag: "Dialog Engine",
        features: ["3-Step Wizard", "Destructive Confirm", "Star Rating"]
    },
    {
        num: "14",
        folder: "14-progress",
        category: "interactive",
        categoryName: "التفاعلات والجداول",
        icon: "loader-2",
        title: "أشرطة ومؤشرات التقدم (Progress & Meters)",
        desc: "أشرطة التقدم الخطية المتدرجة، العدادات الدائرية النبضية، ومؤشرات مسار الخطوات التفاعلية.",
        tag: "Feedback",
        features: ["Gradient Bars", "Radial Meters", "Step Wizard Tracker"]
    },
    {
        num: "15",
        folder: "15-feedback",
        category: "overlays",
        categoryName: "التنبيهات والطبقات",
        icon: "bell-ring",
        title: "التنبيهات والإشعارات العائمة (Toasts & Alerts)",
        desc: "تنبيهات مؤطرة ثابتة ونظام إشعارات عائمة لحظي مع شريط تقدم متناقص وحركة الـ Spring Pop.",
        tag: "Toast System",
        features: ["Floating Toasts", "Live Progress Bar", "Status Banners"]
    },
    {
        num: "16",
        folder: "16-badge",
        category: "visuals",
        categoryName: "العناصر البصرية",
        icon: "tag",
        title: "الشارات والكبسولات الحية (Badges & Chips)",
        desc: "شارات الحالات المعمارية، كبسولات العدادات، الرقائق التفاعلية القابلة للحذف، ونقاط النبض الحية.",
        tag: "Status Tags",
        features: ["Dismissible Chips", "Pulse Dots", "Counter Pills"]
    },
    {
        num: "17",
        folder: "17-breadcrumb",
        category: "layout",
        categoryName: "الهيكل والتنقل",
        icon: "chevrons-right",
        title: "مسار التنقل الهرمي (Breadcrumb Trail)",
        desc: "مسارات تنقل واضحة تدعم الأيقونات والحالات النشطة وعلامات الفصل الهندسية المتوافقة مع RTL.",
        tag: "Navigation",
        features: ["Hierarchical Path", "Active Indicators", "RTL Arrows"]
    },
    {
        num: "18",
        folder: "18-accordion",
        category: "interactive",
        categoryName: "التفاعلات والجداول",
        icon: "fold-vertical",
        title: "القوائم المطوية الانسيابية (System Accordions)",
        desc: "قوائم مطوية فائقة الانسيابية بحركة CSS Grid الناعمة، مع أزرار توسيع وطي الكل ودوران الأسهم.",
        tag: "Collapsible List",
        features: ["Smooth Grid Transition", "Expand All", "Chevron Rotation"]
    },
    {
        num: "19",
        folder: "19-collapse",
        category: "interactive",
        categoryName: "التفاعلات والجداول",
        icon: "code-2",
        title: "الإخفاء والإظهار الانسيابي (Smooth Collapse)",
        desc: "كتل استعراض المخطط البرمجي ولوحات الفلاتر المتقدمة القابلة للطي بنقرة واحدة بدون وميض.",
        tag: "Code & Filters",
        features: ["Code Schema Drawer", "Filter Panel", "Zero Jitter"]
    },
    {
        num: "20",
        folder: "20-carousel",
        category: "interactive",
        categoryName: "التفاعلات والجداول",
        icon: "gallery-horizontal",
        title: "معرض الشرائح التفاعلي (Interactive Carousel)",
        desc: "معرض شرائح RTL مع مؤشر ترقيم ديناميكي (1 من 4)، نقاط تحكم، وأسهم تنقل انسيابية.",
        tag: "RTL Slider",
        features: ["Dynamic Counter", "Dot Pagination", "Touch / Click Swipes"]
    },
    {
        num: "21",
        folder: "21-tabs",
        category: "interactive",
        categoryName: "التفاعلات والجداول",
        icon: "layout-grid",
        title: "الألسنة والمبدلات المتعددة (Tabs Switcher)",
        desc: "4 أنماط ألسنة: الخط السفلي (Underline)، الكبسولات (Pills)، الصندوقية (Boxed)، ومع الأيقونات.",
        tag: "Tab Navigation",
        features: ["4 Visual Styles", "Instant Pane Switch", "Aria Accessible"]
    },
    {
        num: "22-navbar",
        folder: "22-navbar",
        category: "layout",
        categoryName: "الهيكل والتنقل",
        icon: "menu",
        title: "شريط التنقل العلوي الزجاجي (Spatial Navbar)",
        desc: "شريط علوي زجاجي مثبت مع روابط سريعة، مؤشر النظام الحي، وقائمة منسدلة للمستخدم.",
        tag: "Header Bar",
        features: ["Sticky Glass", "System Health Indicator", "User Dropdown"]
    },
    {
        num: "23",
        folder: "23-offcanvas",
        category: "overlays",
        categoryName: "التنبيهات والطبقات",
        icon: "panel-right-open",
        title: "الأدراج والألواح المنزلقة (Offcanvas & Drawers)",
        desc: "أدراج انزلاقية من اليمين واليسار وألواح سفلية (Bottom Sheets) مع إغلاق بمفتاح ESC وحماية الخلفية.",
        tag: "Slide Sheets",
        features: ["Right & Left Drawers", "Bottom Sheet Console", "Zero Peek Hide"]
    }
];

const cardsHtml = componentsData.map(c => `
    <div class="component-card bx-card p-6 flex flex-col justify-between space-y-5 hover:border-bx-primary hover:shadow-2xl transition-all group"
        data-category="${c.category}" data-search="${c.title.toLowerCase()} ${c.desc.toLowerCase()} ${c.folder}">
        <div class="space-y-3.5">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-11 h-11 rounded-2xl bg-bx-pill text-bx-primary border border-bx-border flex items-center justify-center font-black text-lg group-hover:scale-110 group-hover:bg-bx-primary group-hover:text-white transition-all shadow-sm">
                        <i data-lucide="${c.icon}" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <span class="font-mono text-[11px] font-bold text-bx-primary uppercase tracking-wider">${c.num}</span>
                        <span class="text-xs text-bx-muted block">${c.categoryName}</span>
                    </div>
                </div>
                <span class="bx-tag text-[10px] font-mono">${c.tag}</span>
            </div>
            
            <h3 class="font-display font-extrabold text-base text-bx-title group-hover:text-bx-primary transition-colors leading-snug">
                ${c.title}
            </h3>
            <p class="text-xs text-bx-muted leading-relaxed line-clamp-2">
                ${c.desc}
            </p>
        </div>

        <div class="space-y-3 pt-3 border-t border-bx-divider">
            <div class="flex flex-wrap gap-1.5">
                ${c.features.map(f => `<span class="text-[10px] px-2 py-0.5 rounded-lg bg-[var(--bx-table-header)] border border-bx-border font-bold text-bx-muted">${f}</span>`).join('')}
            </div>

            <div class="flex items-center justify-between pt-1">
                <a href="components/${c.folder}/index.html" class="bx-btn bx-btn-primary w-full text-xs py-2.5 flex items-center justify-center gap-2 group-hover:shadow-lg transition-all">
                    <span>فتح واستعراض المكون</span>
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                </a>
            </div>
        </div>
    </div>
`).join('\n');

const fullGalleryHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl" class="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>معرض مكونات منظومة تقنية المعمارية — Taqniya Framework Design System</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@600;700;800;900&family=JetBrains+Mono:wght@500;700&family=Syne:wght@700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
    <!-- Local Offline JS Libraries -->
    <script src="js/lucide.min.js"></script>
    <script src="js/tailwind.min.js"></script>
    <script src="js/tailwind.config.js"></script>
    <!-- Global Design System Styles -->
    <link rel="stylesheet" href="css/taqniya.css">
</head>
<body class="min-h-screen bg-[var(--bx-canvas)] text-bx-text font-sans antialiased selection:bg-bx-primary selection:text-white">

    <!-- Floating Global Toast Stack -->
    <div id="toastContainer" class="fixed top-4 left-4 z-[99999] flex flex-col gap-3 max-w-sm w-full pointer-events-none"></div>

    <!-- Main Navigation Header Bar -->
    <header class="sticky top-0 z-40 bg-[var(--bx-surface-solid)]/85 backdrop-blur-xl border-b border-bx-border">
        <div class="max-w-[1600px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-bx-primary to-purple-400 text-white flex items-center justify-center font-black text-lg shadow-md shadow-bx-primary/20">
                    <i data-lucide="layers" class="w-5 h-5"></i>
                </div>
                <div>
                    <h1 class="font-display font-black text-base sm:text-lg text-bx-title leading-tight">منظومة تقنية المعمارية</h1>
                    <p class="text-[11px] text-bx-muted font-bold">Taqniya Framework Design System v3.0</p>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bx-table-header)] border border-bx-border text-xs">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span class="font-bold text-bx-title">23 مكوناً معمارياً معتمداً</span>
                </div>
                <button type="button" onclick="toggleTheme()" class="bx-tag text-xs font-bold hover:border-bx-primary cursor-pointer flex items-center gap-2 py-2 px-3.5">
                    <i data-lucide="moon" class="w-3.5 h-3.5"></i>
                    <span class="hidden sm:inline">تبديل السمة</span>
                </button>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <div class="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-10">

        <!-- Hero Showcase Banner -->
        <div class="relative rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-bx-border bg-gradient-to-br from-bx-pill via-[var(--bx-surface-solid)] to-[var(--bx-table-header)] shadow-2xl overflow-hidden">
            <div class="relative z-10 max-w-3xl space-y-4">
                <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-bx-primary/10 border border-bx-primary/30 text-bx-primary text-xs font-black">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                    <span>نظام التصميم المعماري الموحد — الإصدار 3.0</span>
                </div>
                <h2 class="font-display font-black text-2xl sm:text-4xl text-bx-title leading-tight">
                    معرض المكونات التفاعلية والهوية البصرية Spatial UI
                </h2>
                <p class="text-xs sm:text-sm text-bx-muted leading-relaxed max-w-2xl">
                    مكتبة معمارية شاملة مكونة من 23 عنصراً برمجياً مستقلاً، مبنية وفق أحدث معايير VisionOS الزجاجية مع دعم RTL أصيل، مكتبات محلية سريعة بنسبة 100%، وتوافق تام مع ملف المصدر الموحد (SSoT).
                </p>

                <!-- 4 Quick Stats Badges -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                    <div class="p-3.5 rounded-2xl bg-[var(--bx-surface-solid)] border border-bx-border text-center space-y-0.5">
                        <div class="font-display font-black text-xl text-bx-primary">23</div>
                        <div class="text-[10px] text-bx-muted font-bold">مكوناً مستقلاً</div>
                    </div>
                    <div class="p-3.5 rounded-2xl bg-[var(--bx-surface-solid)] border border-bx-border text-center space-y-0.5">
                        <div class="font-display font-black text-xl text-emerald-500">100%</div>
                        <div class="text-[10px] text-bx-muted font-bold">مطابقة SSoT</div>
                    </div>
                    <div class="p-3.5 rounded-2xl bg-[var(--bx-surface-solid)] border border-bx-border text-center space-y-0.5">
                        <div class="font-display font-black text-xl text-bx-title">0 Net</div>
                        <div class="text-[10px] text-bx-muted font-bold">اعتماديات أوفلاين</div>
                    </div>
                    <div class="p-3.5 rounded-2xl bg-[var(--bx-surface-solid)] border border-bx-border text-center space-y-0.5">
                        <div class="font-display font-black text-xl text-purple-500">VisionOS</div>
                        <div class="text-[10px] text-bx-muted font-bold">Spatial Glass UI</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filter & Search Studio Toolbar -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bx-surface-solid)] border border-bx-border shadow-sm">
            <!-- Filter Categories -->
            <div class="flex flex-wrap items-center gap-2 w-full md:w-auto" id="filterTabs">
                <button type="button" onclick="filterGallery('all', this)" class="filter-btn active bx-tag text-xs font-bold cursor-pointer py-2 px-3.5 hover:border-bx-primary">
                    <span>جميع المكونات (23)</span>
                </button>
                <button type="button" onclick="filterGallery('layout', this)" class="filter-btn bx-tag text-xs font-bold cursor-pointer py-2 px-3.5 hover:border-bx-primary">
                    <i data-lucide="layout" class="w-3.5 h-3.5"></i>
                    <span>الهيكل والتنقل (5)</span>
                </button>
                <button type="button" onclick="filterGallery('visuals', this)" class="filter-btn bx-tag text-xs font-bold cursor-pointer py-2 px-3.5 hover:border-bx-primary">
                    <i data-lucide="palette" class="w-3.5 h-3.5"></i>
                    <span>العناصر البصرية (7)</span>
                </button>
                <button type="button" onclick="filterGallery('interactive', this)" class="filter-btn bx-tag text-xs font-bold cursor-pointer py-2 px-3.5 hover:border-bx-primary">
                    <i data-lucide="sliders" class="w-3.5 h-3.5"></i>
                    <span>النماذج والجداول (8)</span>
                </button>
                <button type="button" onclick="filterGallery('overlays', this)" class="filter-btn bx-tag text-xs font-bold cursor-pointer py-2 px-3.5 hover:border-bx-primary">
                    <i data-lucide="bell" class="w-3.5 h-3.5"></i>
                    <span>التنبيهات والطبقات (3)</span>
                </button>
            </div>

            <!-- Search Input -->
            <div class="relative w-full md:w-80">
                <input type="text" id="gallerySearchInput" oninput="searchGallery(this.value)" placeholder="ابحث باسم المكون أو الوظيفة..."
                    class="bx-input text-xs pr-9 h-10 w-full">
                <i data-lucide="search" class="w-4 h-4 text-bx-muted absolute top-3 right-3 pointer-events-none"></i>
            </div>
        </div>

        <!-- Component Gallery Grid (23 Components) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" id="componentsGrid">
            ${cardsHtml}
        </div>

        <!-- No Results Fallback -->
        <div id="noResultsState" class="hidden p-12 text-center rounded-3xl border border-bx-border bg-[var(--bx-surface-solid)] space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-bx-pill text-bx-muted flex items-center justify-center mx-auto">
                <i data-lucide="search-x" class="w-6 h-6"></i>
            </div>
            <h4 class="font-bold text-base text-bx-title">لم يتم العثور على مكون مطابق للبحث</h4>
            <p class="text-xs text-bx-muted">جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً من الأعلى.</p>
        </div>
    </div>

    <!-- Global Footer -->
    <footer class="mt-16 border-t border-bx-border py-8 text-center text-xs text-bx-muted space-y-2">
        <div class="flex items-center justify-center gap-2 font-bold text-bx-title">
            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-500"></i>
            <span>Taqniya Architectural Design System — Strict Single Source of Truth (SSoT)</span>
        </div>
        <p class="text-[11px]">تم بناء وتوثيق كافة المكونات بالاعتماد على الهوية الإطارية الموحدة بنسبة 100%.</p>
    </footer>

    <!-- Global JS Scripts -->
    <script src="js/taqniya.js"></script>
    <script>
        function renderIcons() {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }
        renderIcons();
        document.addEventListener('DOMContentLoaded', renderIcons);
        window.addEventListener('load', renderIcons);

        let activeCategory = 'all';

        function filterGallery(category, btn) {
            activeCategory = category;
            document.querySelectorAll('#filterTabs .filter-btn').forEach(b => {
                b.classList.remove('active', 'border-bx-primary', 'bg-bx-primary', 'text-white');
            });
            if (btn) {
                btn.classList.add('active', 'border-bx-primary', 'bg-bx-primary', 'text-white');
            }
            applyFilters();
        }

        function searchGallery(query) {
            applyFilters(query);
        }

        function applyFilters(query) {
            const searchVal = (query !== undefined ? query : document.getElementById('gallerySearchInput').value || '').toLowerCase().trim();
            const cards = document.querySelectorAll('#componentsGrid .component-card');
            let visibleCount = 0;

            cards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                const cardSearch = card.getAttribute('data-search') || '';
                
                const matchesCat = (activeCategory === 'all' || cardCat === activeCategory);
                const matchesSearch = !searchVal || cardSearch.includes(searchVal);

                if (matchesCat && matchesSearch) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });

            const noResults = document.getElementById('noResultsState');
            if (noResults) {
                if (visibleCount === 0) noResults.classList.remove('hidden');
                else noResults.classList.add('hidden');
            }
        }
    </script>
</body>
</html>`;

fs.writeFileSync(galleryPath, fullGalleryHtml, 'utf8');
console.log('Unified Showcase Gallery created successfully at:', galleryPath);
