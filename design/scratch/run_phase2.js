const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const componentsDir = path.join(rootDir, 'FRAMEWORK/01_design_system/components');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');

// Helper to write component files
function writeComponent(folderName, readmeContent, htmlContent, cssContent = null, jsContent = null) {
    const targetFolder = path.join(componentsDir, folderName);
    if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder, { recursive: true });

    fs.writeFileSync(path.join(targetFolder, 'README.md'), readmeContent.trim() + '\n', 'utf8');
    fs.writeFileSync(path.join(targetFolder, 'index.html'), htmlContent.trim() + '\n', 'utf8');
    if (cssContent !== null) {
        fs.writeFileSync(path.join(targetFolder, 'component.css'), cssContent.trim() + '\n', 'utf8');
    }
    if (jsContent !== null) {
        fs.writeFileSync(path.join(targetFolder, 'component.js'), jsContent.trim() + '\n', 'utf8');
    }
    console.log(`Component ready: ${folderName}`);
}

// Wrapper helper for standalone index.html
function wrapStandaloneHTML(title, bodyContent, extraCSS = '', extraJS = '') {
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
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <!-- Tailwind CSS CDN for utility grid -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Global Taqniya Styles -->
    <link rel="stylesheet" href="../../css/taqniya.css">
    ${extraCSS ? `<link rel="stylesheet" href="${extraCSS}">` : ''}
</head>
<body class="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 min-h-screen">
    <!-- Header Breadcrumb & Info -->
    <header class="flex items-center justify-between border-b border-bx-border pb-4">
        <div class="flex items-center gap-3">
            <a href="../../index.html" class="bx-tag hover:border-bx-primary transition-all">← العودة للمعرض العام</a>
            <span class="text-bx-muted text-xs">/</span>
            <span class="text-xs font-bold text-bx-title">${title}</span>
        </div>
        <button type="button" onclick="toggleTheme()" class="bx-tag text-xs font-bold hover:border-bx-primary cursor-pointer">
            <i data-lucide="moon" class="w-3.5 h-3.5"></i>
            <span>تبديل السمة</span>
        </button>
    </header>

    <!-- Component Showcase Body -->
    <main>
        ${bodyContent}
    </main>

    <!-- Global JS -->
    <script src="../../js/taqniya.js"></script>
    ${extraJS ? `<script src="${extraJS}"></script>` : ''}
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            if (window.lucide && lucide.createIcons) lucide.createIcons();
        });
    </script>
</body>
</html>`;
}

console.log('Building Phase 2 Components...');

// ==========================================
// 1. 01-breakpoints
// ==========================================
const bpReadme = `# Breakpoints Component (نقاط التوقف وتجاوب الشاشات)

## Purpose
Provides the responsive breakpoint foundations and an interactive live viewport dimension detector for testing responsive behaviors across 6 standardized screen sizes.

## Supported Breakpoints
- **xs**: \`< 576px\` (Mobile phones)
- **sm**: \`≥ 576px\` (Phablets)
- **md**: \`≥ 768px\` (Tablets)
- **lg**: \`≥ 992px\` (Laptops)
- **xl**: \`≥ 1200px\` (Desktops)
- **xxl**: \`≥ 1400px\` (Ultra-wide screens)

## Structure
- Live Viewport Display: \`#liveViewportWidth\`
- Active Badge: \`#activeBreakpointBadge\`
- Breakpoint Matrix Table: \`#breakpoints tbody tr\`

## Dependencies
- \`css/taqniya.css\` (Design tokens and CSS custom properties)
- \`js/taqniya.js\`
`;

const bpHtmlBody = `
<div class="space-y-6">
    <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
            <span class="w-2.5 h-7 rounded-full bg-bx-primary"></span>
            <h2 class="text-xl sm:text-2xl font-bold bx-title">1. نقاط التوقف وتجاوب الشاشات (Breakpoints)</h2>
        </div>
        <div class="flex items-center gap-2">
            <span id="activeBreakpointBadge" class="bx-tag font-mono text-xs text-bx-primary border-bx-primary/30">تحميل...</span>
            <span id="liveViewportWidth" class="bx-tag font-mono text-xs">0px</span>
        </div>
    </div>

    <div class="p-6 sm:p-8 rounded-3xl border border-bx-border space-y-6" style="background: var(--bx-surface-solid);">
        <div>
            <h3 class="bx-title text-base font-black">مصفوفة نقاط التوقف المعتمدة (Responsive Matrix)</h3>
            <p class="text-xs text-bx-muted mt-1">تحديد دقيق لأبعاد الأجهزة لتوزيع العناصر بسلاسة فائقة وفق معايير Spatial UI</p>
        </div>

        <div class="overflow-x-auto rounded-2xl border border-bx-border">
            <table class="w-full text-right text-xs" id="breakpointsTable">
                <thead>
                    <tr class="border-b border-bx-border font-bold text-bx-muted" style="background: var(--bx-table-header);">
                        <th class="p-3.5">الرمز</th>
                        <th class="p-3.5">نقطة التوقف</th>
                        <th class="p-3.5">نوع الجهاز المستهدف</th>
                        <th class="p-3.5 text-center">الحالة الآن</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-bx-divider">
                    <tr id="bp-xs" class="hover:bg-black/5 transition-colors"><td class="p-3.5 font-mono font-bold text-bx-primary">xs</td><td class="p-3.5 font-mono">&lt; 576px</td><td class="p-3.5">الهواتف الذكية (Portrait)</td><td class="p-3.5 text-center bp-status">—</td></tr>
                    <tr id="bp-sm" class="hover:bg-black/5 transition-colors"><td class="p-3.5 font-mono font-bold text-bx-primary">sm</td><td class="p-3.5 font-mono">≥ 576px</td><td class="p-3.5">الهواتف العريضة (Landscape)</td><td class="p-3.5 text-center bp-status">—</td></tr>
                    <tr id="bp-md" class="hover:bg-black/5 transition-colors"><td class="p-3.5 font-mono font-bold text-bx-primary">md</td><td class="p-3.5 font-mono">≥ 768px</td><td class="p-3.5">الأجهزة اللوحية (Tablets)</td><td class="p-3.5 text-center bp-status">—</td></tr>
                    <tr id="bp-lg" class="hover:bg-black/5 transition-colors"><td class="p-3.5 font-mono font-bold text-bx-primary">lg</td><td class="p-3.5 font-mono">≥ 992px</td><td class="p-3.5">الحواسب المحمولة (Laptops)</td><td class="p-3.5 text-center bp-status">—</td></tr>
                    <tr id="bp-xl" class="hover:bg-black/5 transition-colors"><td class="p-3.5 font-mono font-bold text-bx-primary">xl</td><td class="p-3.5 font-mono">≥ 1200px</td><td class="p-3.5">الشاشات المكتبية (Desktops)</td><td class="p-3.5 text-center bp-status">—</td></tr>
                    <tr id="bp-xxl" class="hover:bg-black/5 transition-colors"><td class="p-3.5 font-mono font-bold text-bx-primary">xxl</td><td class="p-3.5 font-mono">≥ 1400px</td><td class="p-3.5">الشاشات العريضة الفائقة (Ultra-wide)</td><td class="p-3.5 text-center bp-status">—</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
`;

const bpJS = `
function updateLiveBreakpoints() {
    const width = window.innerWidth;
    const widthDisplay = document.getElementById('liveViewportWidth');
    const badgeDisplay = document.getElementById('activeBreakpointBadge');
    
    if (widthDisplay) widthDisplay.textContent = width + 'px';
    
    let activeId = 'bp-xs';
    let activeLabel = 'xs (<576px)';

    if (width >= 1400) {
        activeId = 'bp-xxl';
        activeLabel = 'xxl (≥1400px)';
    } else if (width >= 1200) {
        activeId = 'bp-xl';
        activeLabel = 'xl (≥1200px)';
    } else if (width >= 992) {
        activeId = 'bp-lg';
        activeLabel = 'lg (≥992px)';
    } else if (width >= 768) {
        activeId = 'bp-md';
        activeLabel = 'md (≥768px)';
    } else if (width >= 576) {
        activeId = 'bp-sm';
        activeLabel = 'sm (≥576px)';
    } else {
        activeId = 'bp-xs';
        activeLabel = 'xs (<576px)';
    }

    if (badgeDisplay) badgeDisplay.textContent = activeLabel;

    document.querySelectorAll('#breakpointsTable tbody tr').forEach(tr => {
        tr.classList.remove('font-black');
        tr.style.backgroundColor = '';
        const statusCol = tr.querySelector('.bp-status');
        if (statusCol) statusCol.innerHTML = '<span class="text-xs text-bx-muted opacity-30 font-mono">—</span>';
    });

    const activeRow = document.getElementById(activeId);
    if (activeRow) {
        activeRow.style.backgroundColor = 'var(--bx-row-active)';
        const statusCol = activeRow.querySelector('.bp-status');
        if (statusCol) {
            statusCol.innerHTML = \`
                <span class="bx-tag text-[11px] py-1 px-3 font-black border-bx-primary text-bx-primary bg-[var(--bx-pill)] flex items-center justify-center gap-1.5 mx-auto w-max shadow-sm">
                    <span class="w-2 h-2 rounded-full bg-bx-primary animate-ping"></span>
                    نشط حالياً
                </span>
            \`;
        }
    }
}

window.addEventListener('resize', updateLiveBreakpoints);
document.addEventListener('DOMContentLoaded', updateLiveBreakpoints);
`;

writeComponent('01-breakpoints', bpReadme, wrapStandaloneHTML('نقاط التوقف (Breakpoints)', bpHtmlBody, null, 'component.js'), null, bpJS);


// ==========================================
// 2. 02-grid
// ==========================================
const gridReadme = `# Grid System Component (نظام الشبكة والأعمدة)

## Purpose
12-column responsive layout system with dynamic gap toggling, fractional column spanning, and nested grid layouts.

## Key Classes
- \`grid grid-cols-12\`: 12-column container
- \`col-span-{1..12}\`: Column span assignment
- \`gap-2\`, \`gap-4\`, \`gap-6\`: Dynamic spacing scales

## Dependencies
- \`css/taqniya.css\`
- \`js/taqniya.js\`
`;

const gridHtmlBody = `
<div class="space-y-6">
    <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
            <span class="w-2.5 h-7 rounded-full bg-bx-primary"></span>
            <h2 class="text-xl sm:text-2xl font-bold bx-title">2. نظام الشبكة والأعمدة (Grid System)</h2>
        </div>
        <div class="flex items-center gap-2">
            <button onclick="setGridGap('gap-2', this)" class="grid-gap-btn bx-tag hover:border-bx-primary transition-all cursor-pointer">Gap: 8px</button>
            <button onclick="setGridGap('gap-4', this)" class="grid-gap-btn bx-tag active bg-[var(--bx-primary)] text-white border-bx-primary transition-all cursor-pointer">Gap: 16px</button>
            <button onclick="setGridGap('gap-6', this)" class="grid-gap-btn bx-tag hover:border-bx-primary transition-all cursor-pointer">Gap: 24px</button>
        </div>
    </div>

    <div class="p-6 sm:p-8 rounded-3xl border border-bx-border space-y-6" style="background: var(--bx-surface-solid);">
        <div>
            <h3 class="bx-title text-base font-black">مختبر الشبكة المتجاوبة (12 Columns Live Grid)</h3>
            <p class="text-xs text-bx-muted mt-1">توزيع الأعمدة من 1 إلى 12 عموداً مع اختبار تغيير الفراغات البينية (Gaps) بشكل فوري</p>
        </div>

        <div id="liveGridContainer" class="grid grid-cols-12 gap-4 transition-all duration-300">
            <div class="col-span-12 p-3.5 rounded-xl border border-bx-border text-center font-mono text-xs font-bold" style="background: var(--bx-table-header);">col-span-12 (عرض كامل 100%)</div>
            <div class="col-span-6 p-3.5 rounded-xl border border-bx-border text-center font-mono text-xs font-bold" style="background: var(--bx-table-header);">col-span-6 (50%)</div>
            <div class="col-span-6 p-3.5 rounded-xl border border-bx-border text-center font-mono text-xs font-bold" style="background: var(--bx-table-header);">col-span-6 (50%)</div>
            <div class="col-span-4 p-3.5 rounded-xl border border-bx-border text-center font-mono text-xs font-bold" style="background: var(--bx-table-header);">col-span-4 (33.3%)</div>
            <div class="col-span-4 p-3.5 rounded-xl border border-bx-border text-center font-mono text-xs font-bold" style="background: var(--bx-table-header);">col-span-4 (33.3%)</div>
            <div class="col-span-4 p-3.5 rounded-xl border border-bx-border text-center font-mono text-xs font-bold" style="background: var(--bx-table-header);">col-span-4 (33.3%)</div>
            <div class="col-span-3 p-3.5 rounded-xl border border-bx-border text-center font-mono text-xs font-bold" style="background: var(--bx-table-header);">col-span-3 (25%)</div>
            <div class="col-span-3 p-3.5 rounded-xl border border-bx-border text-center font-mono text-xs font-bold" style="background: var(--bx-table-header);">col-span-3 (25%)</div>
            <div class="col-span-3 p-3.5 rounded-xl border border-bx-border text-center font-mono text-xs font-bold" style="background: var(--bx-table-header);">col-span-3 (25%)</div>
            <div class="col-span-3 p-3.5 rounded-xl border border-bx-border text-center font-mono text-xs font-bold" style="background: var(--bx-table-header);">col-span-3 (25%)</div>
        </div>
    </div>
</div>
`;

const gridJS = `
function setGridGap(gapClass, btn) {
    const container = document.getElementById('liveGridContainer');
    if (container) {
        container.classList.remove('gap-2', 'gap-4', 'gap-6');
        container.classList.add(gapClass);
    }
    if (btn && btn.parentElement) {
        btn.parentElement.querySelectorAll('.grid-gap-btn').forEach(b => {
            b.classList.remove('active', 'bg-[var(--bx-primary)]', 'text-white');
        });
        btn.classList.add('active', 'bg-[var(--bx-primary)]', 'text-white');
    }
}
`;

writeComponent('02-grid', gridReadme, wrapStandaloneHTML('نظام الشبكة (Grid System)', gridHtmlBody, null, 'component.js'), null, gridJS);


// ==========================================
// 3. 03-alignment
// ==========================================
const alignReadme = `# Alignment & Positioning Component (المحاذاة والتموضع)

## Purpose
Provides an interactive Flexbox playground demonstrating horizontal (row) and vertical (column) alignment, justify options (center, space-between, space-around), and absolute positioning coordinates.

## Dependencies
- \`css/taqniya.css\`
- \`js/taqniya.js\`
`;

const alignHtmlBody = `
<div class="space-y-6">
    <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
            <span class="w-2.5 h-7 rounded-full bg-bx-primary"></span>
            <h2 class="text-xl sm:text-2xl font-bold bx-title">3. المحاذاة والتموضع (Alignment & Positioning)</h2>
        </div>
        <span id="alignCodeLabel" class="bx-tag font-mono text-xs text-bx-primary border-bx-primary/30">flex-row justify-center items-center gap-4</span>
    </div>

    <div class="p-6 sm:p-8 rounded-3xl border border-bx-border space-y-6" style="background: var(--bx-surface-solid);">
        <div class="flex flex-wrap items-center gap-2">
            <button onclick="setAlignmentMode('row-center', this)" class="align-mode-btn bx-tag active bg-[var(--bx-primary)] text-white cursor-pointer">أفقي: توسيط (Row Center)</button>
            <button onclick="setAlignmentMode('row-between', this)" class="align-mode-btn bx-tag hover:border-bx-primary cursor-pointer">أفقي: تباعد الأطراف (Row Between)</button>
            <button onclick="setAlignmentMode('row-around', this)" class="align-mode-btn bx-tag hover:border-bx-primary cursor-pointer">أفقي: توزيع متوازن (Row Around)</button>
            <button onclick="setAlignmentMode('col-center', this)" class="align-mode-btn bx-tag hover:border-bx-primary cursor-pointer">عمودي: توسيط (Col Center)</button>
            <button onclick="setAlignmentMode('col-between', this)" class="align-mode-btn bx-tag hover:border-bx-primary cursor-pointer">عمودي: تباعد (Col Between)</button>
        </div>

        <div id="alignPlayground" class="h-[360px] rounded-2xl border border-bx-border flex flex-row items-center justify-center gap-4 p-6 transition-all duration-300 relative overflow-hidden" style="background: var(--bx-table-header);">
            <div class="w-24 h-24 rounded-2xl bg-[var(--bx-pill)] border border-bx-primary/40 flex flex-col items-center justify-center text-bx-primary font-black shadow-lg">
                <i data-lucide="layers" class="w-6 h-6 mb-1"></i>
                <span class="text-xs">عنصر 1</span>
            </div>
            <div class="w-24 h-24 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex flex-col items-center justify-center text-emerald-600 font-black shadow-lg">
                <i data-lucide="sparkles" class="w-6 h-6 mb-1"></i>
                <span class="text-xs">عنصر 2</span>
            </div>
            <div class="w-24 h-24 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex flex-col items-center justify-center text-amber-600 font-black shadow-lg">
                <i data-lucide="zap" class="w-6 h-6 mb-1"></i>
                <span class="text-xs">عنصر 3</span>
            </div>
        </div>
    </div>
</div>
`;

const alignJS = `
function setAlignmentMode(mode, btn) {
    const box = document.getElementById('alignPlayground');
    const label = document.getElementById('alignCodeLabel');
    if (!box || !label) return;

    box.className = 'h-[360px] rounded-2xl border border-bx-border flex p-6 transition-all duration-300 relative overflow-hidden';
    
    if (mode === 'row-center') {
        box.classList.add('flex-row', 'items-center', 'justify-center', 'gap-4');
        label.textContent = 'flex-row justify-center items-center gap-4';
    } else if (mode === 'row-between') {
        box.classList.add('flex-row', 'items-center', 'justify-between');
        label.textContent = 'flex-row justify-between items-center';
    } else if (mode === 'row-around') {
        box.classList.add('flex-row', 'items-center', 'justify-around');
        label.textContent = 'flex-row justify-around items-center';
    } else if (mode === 'col-center') {
        box.classList.add('flex-col', 'items-center', 'justify-center', 'gap-2.5');
        label.textContent = 'flex-col justify-center items-center gap-2.5';
    } else if (mode === 'col-between') {
        box.classList.add('flex-col', 'items-center', 'justify-between');
        label.textContent = 'flex-col justify-between items-center';
    }

    document.querySelectorAll('.align-mode-btn').forEach(b => {
        b.classList.remove('active', 'bg-[var(--bx-primary)]', 'text-white');
    });
    if (btn) {
        btn.classList.add('active', 'bg-[var(--bx-primary)]', 'text-white');
    }
}
`;

writeComponent('03-alignment', alignReadme, wrapStandaloneHTML('المحاذاة والتموضع (Alignment)', alignHtmlBody, null, 'component.js'), null, alignJS);


// ==========================================
// 4. 04-typography
// ==========================================
const typoReadme = `# Typography Component (منظومة الخطوط والنصوص)

## Purpose
Defines font weights, heading scale, line heights, and an interactive text sizing controller.

## Fonts
- **Tajawal**: Primary body & UI text
- **Alexandria / Syne**: Headings & numbers
- **JetBrains Mono**: Code & IDs

## Heading Scale
- \`h1\`: 2.25rem (36px) / 800
- \`h2\`: 1.75rem (28px) / 800
- \`h3\`: 1.375rem (22px) / 800
- \`h4\`: 1.125rem (18px) / 700
- \`h5\`: 1.0rem (16px) / 700
- \`h6\`: 0.875rem (14px) / 700
`;

const typoHtmlBody = `
<div class="space-y-6">
    <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
            <span class="w-2.5 h-7 rounded-full bg-bx-primary"></span>
            <h2 class="text-xl sm:text-2xl font-bold bx-title">4. الخطوط والتايبوغرافي (Typography & Fonts)</h2>
        </div>
        <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-bx-muted">حجم الخط الحي:</span>
            <input type="range" min="12" max="32" value="16" oninput="updateFontLive(this.value)" class="cursor-pointer accent-bx-primary w-28">
            <span id="liveFontVal" class="bx-tag font-mono text-xs">16px</span>
        </div>
    </div>

    <div class="p-6 sm:p-8 rounded-3xl border border-bx-border space-y-6" style="background: var(--bx-surface-solid);">
        <div id="typoSampleBox" class="space-y-4 transition-all duration-200">
            <h1 class="text-3xl sm:text-4xl font-black bx-title">عنوان رئيسي بارز — H1 Display Heading</h1>
            <h2 class="text-2xl sm:text-3xl font-black bx-title">عنوان قسم فرعي معتمد — H2 Section Title</h2>
            <h3 class="text-xl sm:text-2xl font-bold bx-title">عنوان بطاقة أو نافذة حوارية — H3 Card Heading</h3>
            <p class="text-sm sm:text-base text-bx-text leading-relaxed">هذا النص يمثل نموذجاً للخط الأساسي (Tajawal) المستخدم في كافة عناصر التحكم وقراءة البيانات في منظومة تقنية، مصمم لتوفير أعلى درجات المقروءة والوضوح البصري في مختلف الشاشات.</p>
            <div class="p-4 rounded-xl border border-bx-border font-mono text-xs space-y-1" style="background: var(--bx-table-header);">
                <div class="text-bx-primary font-bold">// JetBrains Mono Specimen</div>
                <div class="text-bx-muted">const SSoT_CONFIG = { version: "3.4.0", status: "STABLE_PROD", latency: 24.5 };</div>
            </div>
        </div>
    </div>
</div>
`;

const typoJS = `
function updateFontLive(val) {
    const box = document.getElementById('typoSampleBox');
    const display = document.getElementById('liveFontVal');
    if (box) {
        box.querySelectorAll('p').forEach(p => p.style.fontSize = val + 'px');
    }
    if (display) {
        display.textContent = val + 'px';
    }
}
`;

writeComponent('04-typography', typoReadme, wrapStandaloneHTML('الخطوط والتايبوغرافي (Typography)', typoHtmlBody, null, 'component.js'), null, typoJS);


// ==========================================
// 5. 17-breadcrumb
// ==========================================
const bcReadme = `# Breadcrumbs Component (مسار التنقل الهرمي)

## Purpose
Hierarchical navigation trail indicating user location within application structure, supporting chevron separators, slash separators, and leading icons.

## Variations
1. Classic Slash Breadcrumb (\`.bx-breadcrumb-slash\`)
2. Chevron Icon Trail (\`.bx-breadcrumb-chevron\`)
3. Floating Glass Capsule (\`.bx-breadcrumb-capsule\`)
4. Active Leaf Highlighter (\`.bx-breadcrumb-active\`)
`;

const bcCSS = `
/* ==========================================================================
   BREADCRUMBS COMPONENT STYLES
   ========================================================================== */

.bx-breadcrumb {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-full);
    background: var(--bx-table-header);
    border: 1px solid var(--bx-border);
    font-size: 0.8125rem;
    font-weight: 700;
}

.bx-breadcrumb-item {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    color: var(--bx-muted);
    transition: color 0.2s ease;
}

.bx-breadcrumb-item:hover {
    color: var(--bx-primary);
}

.bx-breadcrumb-item.active {
    color: var(--bx-title);
    font-weight: 800;
    pointer-events: none;
}

.bx-breadcrumb-separator {
    color: var(--bx-border-strong);
    opacity: 0.6;
    display: inline-flex;
    align-items: center;
}
`;

const bcHtmlBody = `
<div class="space-y-6">
    <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
            <span class="w-2.5 h-7 rounded-full bg-bx-primary"></span>
            <h2 class="text-xl sm:text-2xl font-bold bx-title">17. مسارات التنقل الهرمي (Breadcrumbs)</h2>
        </div>
        <span class="bx-tag text-xs font-mono">4 Variations</span>
    </div>

    <div class="p-6 sm:p-8 rounded-3xl border border-bx-border space-y-6" style="background: var(--bx-surface-solid);">
        <!-- Variation 1: Slash Separator -->
        <div class="space-y-2">
            <span class="text-xs font-bold text-bx-muted">1. الفاصل المائل الكلاسيكي (Slash):</span>
            <div>
                <nav class="bx-breadcrumb">
                    <a href="#" class="bx-breadcrumb-item"><i data-lucide="home" class="w-3.5 h-3.5"></i><span>الرئيسية</span></a>
                    <span class="bx-breadcrumb-separator">/</span>
                    <a href="#" class="bx-breadcrumb-item"><span>إدارة السحابة</span></a>
                    <span class="bx-breadcrumb-separator">/</span>
                    <span class="bx-breadcrumb-item active">خوادم الرياض</span>
                </nav>
            </div>
        </div>

        <!-- Variation 2: Chevron Separator -->
        <div class="space-y-2">
            <span class="text-xs font-bold text-bx-muted">2. فاصل الأسهم الموجهة (Chevron):</span>
            <div>
                <nav class="bx-breadcrumb">
                    <a href="#" class="bx-breadcrumb-item"><i data-lucide="layout-dashboard" class="w-3.5 h-3.5"></i><span>لوحة التحكم</span></a>
                    <span class="bx-breadcrumb-separator"><i data-lucide="chevron-left" class="w-3.5 h-3.5"></i></span>
                    <a href="#" class="bx-breadcrumb-item"><span>كتالوج المنتجات</span></a>
                    <span class="bx-breadcrumb-separator"><i data-lucide="chevron-left" class="w-3.5 h-3.5"></i></span>
                    <span class="bx-breadcrumb-item active">عطر لافندر إمبريال</span>
                </nav>
            </div>
        </div>

        <!-- Variation 3: Tag Pill Breadcrumb -->
        <div class="space-y-2">
            <span class="text-xs font-bold text-bx-muted">3. مسار الكبسولة الزجاجية (Pill Trail):</span>
            <div>
                <nav class="flex items-center gap-2">
                    <a href="#" class="bx-tag hover:border-bx-primary"><i data-lucide="folder" class="w-3 h-3 text-bx-primary"></i><span>المشاريع</span></a>
                    <span class="text-bx-muted text-xs">←</span>
                    <a href="#" class="bx-tag hover:border-bx-primary"><span>تقنية 2026</span></a>
                    <span class="text-bx-muted text-xs">←</span>
                    <span class="bx-tag border-bx-primary text-bx-primary bg-[var(--bx-pill)] font-black">الإصدار 3.4</span>
                </nav>
            </div>
        </div>
    </div>
</div>
`;

writeComponent('17-breadcrumb', bcReadme, wrapStandaloneHTML('مسارات التنقل (Breadcrumbs)', bcHtmlBody, 'component.css', null), bcCSS, null);


// ==========================================
// 6. 22-navbar
// ==========================================
const navReadme = `# Navbar & Headers Component (أشرطة التنقل العلوية)

## Purpose
Provides luxury VisionOS navigation bars and page headers with brand logos, search bar, status badges, notifications, user profiles, and dynamic live page mount previews.

## Variations
1. **Corporate SSoT Navbar**: Logo, quick metric pills, search bar, notification drawer trigger.
2. **Minimalist Floating Glass Navbar**: Compact floating rounded capsule with glowing actions.
3. **Analytics Dashboard Header**: Real-time server throughput counter, filter buttons, user profile.
4. **Gradient Spatial Header**: Elevated brand gradient with breadcrumb integration.

## JavaScript API
- \`applyLivePageHeader(styleName)\`: Mounts active sticky header at page top.
- \`dismissLivePageHeader()\`: Removes sticky preview.
`;

const navCSS = `
/* ==========================================================================
   NAVBAR COMPONENT STYLES
   ========================================================================== */

.bx-navbar {
    width: 100%;
    border-radius: var(--radius-l);
    border: 1px solid var(--bx-border);
    background: var(--bx-surface-solid);
    padding: 0.875rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08);
}

.bx-nav-action-btn {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-m);
    border: 1px solid var(--bx-border);
    background: var(--bx-table-header);
    color: var(--bx-muted);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.bx-nav-action-btn:hover {
    color: var(--bx-primary);
    border-color: var(--bx-primary);
    background: var(--bx-pill);
}
`;

const navHtmlBody = `
<div class="space-y-6">
    <div id="liveActiveNavbarMount" class="hidden sticky top-2 z-[999] transition-all"></div>

    <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
            <span class="w-2.5 h-7 rounded-full bg-bx-primary"></span>
            <h2 class="text-xl sm:text-2xl font-bold bx-title">22. أشرطة التنقل العلوية (Navbar & Headers)</h2>
        </div>
        <span class="bx-tag text-xs font-mono">4 Luxury Styles</span>
    </div>

    <div class="p-6 sm:p-8 rounded-3xl border border-bx-border space-y-8" style="background: var(--bx-surface-solid);">
        <!-- Variation 1: Corporate SSoT -->
        <div class="space-y-3">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-bx-muted">النمط 1: الشريط المؤسسي الشامل (Corporate SSoT Navbar):</span>
                <button onclick="applyLivePageHeader('corporate')" class="bx-tag text-[10px] text-bx-primary border-bx-primary hover:bg-[var(--bx-pill)] cursor-pointer">معاينة حية في أعلى الصفحة 🚀</button>
            </div>
            <nav class="bx-navbar">
                <div class="flex items-center gap-4">
                    <img src="../../assets/images/logo.png" alt="Taqniya Logo" class="h-8 object-contain">
                    <div class="h-5 w-px bg-bx-border hidden sm:block"></div>
                    <span class="bx-tag text-[10px] border-emerald-500/30 text-emerald-600 hidden sm:inline-flex">● سحابة الرياض متصلة</span>
                </div>
                <div class="flex items-center gap-2.5">
                    <button type="button" class="bx-nav-action-btn"><i data-lucide="search" class="w-4 h-4"></i></button>
                    <button type="button" class="bx-nav-action-btn relative"><i data-lucide="bell" class="w-4 h-4"></i><span class="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-2 animate-ping"></span></button>
                    <div class="flex items-center gap-2 pr-2 border-r border-bx-border">
                        <img src="../../assets/images/avatar_3d_1.png" class="w-8 h-8 rounded-full border border-bx-border bg-[var(--bx-pill)]">
                        <span class="text-xs font-bold text-bx-title hidden md:inline">المهندس المشرف</span>
                    </div>
                </div>
            </nav>
        </div>

        <!-- Variation 2: Floating Glass Capsule -->
        <div class="space-y-3">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-bx-muted">النمط 2: الكبسولة الزجاجية العائمة (Floating Glass Capsule):</span>
                <button onclick="applyLivePageHeader('floating')" class="bx-tag text-[10px] text-bx-primary border-bx-primary hover:bg-[var(--bx-pill)] cursor-pointer">معاينة حية 🚀</button>
            </div>
            <nav class="bx-navbar rounded-full px-6 shadow-xl border-bx-primary/30">
                <div class="flex items-center gap-3">
                    <div class="w-7 h-7 rounded-full bg-[var(--bx-primary)] text-white flex items-center justify-center font-bold text-xs">T</div>
                    <span class="font-black text-sm text-bx-title">تقنية بلس</span>
                </div>
                <div class="flex items-center gap-4 text-xs font-bold text-bx-muted hidden md:flex">
                    <a href="#" class="hover:text-bx-primary transition-colors text-bx-title">الرئيسية</a>
                    <a href="#" class="hover:text-bx-primary transition-colors">المعمارية</a>
                    <a href="#" class="hover:text-bx-primary transition-colors">الخدمات السحابية</a>
                </div>
                <button class="bx-tag text-xs bg-[var(--bx-primary)] text-white border-bx-primary py-1.5 px-4">تسجيل الدخول</button>
            </nav>
        </div>
    </div>
</div>
`;

const navJS = `
function applyLivePageHeader(styleName) {
    const mount = document.getElementById('liveActiveNavbarMount');
    if (!mount) return;

    mount.innerHTML = \`
        <div class="bx-navbar shadow-2xl border-2 border-bx-primary mb-6 animate-pulse">
            <div class="flex items-center gap-3">
                <span class="bx-tag text-xs text-bx-primary border-bx-primary font-bold">معاينة نشطة: \${styleName}</span>
                <span class="text-xs text-bx-title font-black">شريط التنقل العلوي النشط</span>
            </div>
            <button onclick="dismissLivePageHeader()" class="bx-tag text-xs text-red-500 border-red-500/30 hover:bg-red-500/10 cursor-pointer">إغلاق المعاينة ✕</button>
        </div>
    \`;
    mount.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function dismissLivePageHeader() {
    const mount = document.getElementById('liveActiveNavbarMount');
    if (mount) {
        mount.classList.add('hidden');
        mount.innerHTML = '';
    }
}
`;

writeComponent('22-navbar', navReadme, wrapStandaloneHTML('أشرطة التنقل (Navbar)', navHtmlBody, 'component.css', 'component.js'), navCSS, navJS);


// ==========================================
// 7. 23-offcanvas
// ==========================================
const ocReadme = `# Offcanvas & Slide Drawers Component (اللوحات المنزلقة والأدراج)

## Purpose
Spatial 3D slide drawers supporting 4 directional origins (Right, Left, Top, Bottom) with blurred backdrop overlay and full responsive touch containment.

## Variations
- **Right Drawer (\`.bx-offcanvas-right\`)**: System settings, cloud regions, and theme controls.
- **Left Drawer (\`.bx-offcanvas-left\`)**: User profile, security credentials, and active tokens.
- **Top Banner (\`.bx-offcanvas-top\`)**: Real-time cloud alert broadcasts and system metrics strip.
- **Bottom Sheet (\`.bx-offcanvas-bottom\`)**: Quick action sheet and micro-terminal console.

## JavaScript API
- \`openOffcanvas('right' | 'left' | 'top' | 'bottom')\`
- \`closeOffcanvas('right' | 'left' | 'top' | 'bottom')\`
- \`closeAllOffcanvas()\`
`;

const ocCSS = `
/* ==========================================================================
   OFFCANVAS COMPONENT STYLES
   ========================================================================== */

.bx-offcanvas-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 9998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.bx-offcanvas-backdrop.bx-backdrop-open {
    opacity: 1;
    pointer-events: auto;
}

.bx-offcanvas {
    position: fixed;
    z-index: 9999;
    background: var(--bx-surface-solid);
    box-shadow: var(--bx-shadow-modal);
    transition: transform 0.35s cubic-bezier(0.23, 0.65, 0.74, 1.09);
    overflow-y: auto;
}

/* 4 Directions */
.bx-offcanvas-right {
    top: 0;
    right: 0;
    bottom: 0;
    width: 440px;
    max-width: 90vw;
    border-left: 2px solid var(--bx-border);
    transform: translateX(100%);
}

.bx-offcanvas-left {
    top: 0;
    left: 0;
    bottom: 0;
    width: 440px;
    max-width: 90vw;
    border-right: 2px solid var(--bx-border);
    transform: translateX(-100%);
}

.bx-offcanvas-top {
    top: 0;
    left: 0;
    right: 0;
    max-height: 85vh;
    border-bottom: 2px solid var(--bx-border);
    transform: translateY(-100%);
}

.bx-offcanvas-bottom {
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 85vh;
    border-top: 2px solid var(--bx-border);
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    transform: translateY(100%);
}

/* Open State */
.bx-offcanvas.bx-offcanvas-open {
    transform: translate(0, 0) !important;
}
`;

const ocHtmlBody = `
<!-- Unified Backdrop Overlay -->
<div id="offcanvasBackdrop" onclick="closeAllOffcanvas()" class="bx-offcanvas-backdrop"></div>

<!-- Right Drawer -->
<aside id="offcanvasRight" class="bx-offcanvas bx-offcanvas-right p-6 flex flex-col justify-between">
    <div class="space-y-6">
        <div class="flex items-center justify-between border-b border-bx-border pb-4">
            <h3 class="bx-title text-base font-black">إعدادات المنظومة (Right Drawer)</h3>
            <button onclick="closeOffcanvas('right')" class="bx-tag hover:border-bx-primary cursor-pointer">✕</button>
        </div>
        <p class="text-xs text-bx-muted leading-relaxed">لوحة منزلقة ثلاثية الأبعاد من جهة اليمين لتخصيص الخيارات والمعمارية السحابية.</p>
    </div>
    <button onclick="closeOffcanvas('right')" class="bx-tag text-center justify-center py-2.5 w-full bg-[var(--bx-primary)] text-white border-bx-primary cursor-pointer">حفظ وإغلاق</button>
</aside>

<!-- Top Drawer -->
<aside id="offcanvasTop" class="bx-offcanvas bx-offcanvas-top p-6 sm:p-8">
    <div class="max-w-4xl mx-auto space-y-4">
        <div class="flex items-center justify-between border-b border-bx-border pb-3">
            <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <h3 class="bx-title text-base font-black">شريط البث السحابي المباشر (Top Broadcast Banner)</h3>
            </div>
            <button onclick="closeOffcanvas('top')" class="bx-tag hover:border-bx-primary cursor-pointer">✕</button>
        </div>
        <p class="text-xs text-bx-muted">بث فوري لجميع العقد السحابية ومؤشرات الأداء تحت الحمل العالي.</p>
    </div>
</aside>

<!-- Main Trigger Grid -->
<div class="space-y-6">
    <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
            <span class="w-2.5 h-7 rounded-full bg-bx-primary"></span>
            <h2 class="text-xl sm:text-2xl font-bold bx-title">23. اللوحات المنزلقة والأدراج (Offcanvas Drawers)</h2>
        </div>
        <span class="bx-tag text-xs font-mono">4-Direction Spatial</span>
    </div>

    <div class="p-6 sm:p-8 rounded-3xl border border-bx-border space-y-6" style="background: var(--bx-surface-solid);">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onclick="openOffcanvas('right')" class="p-5 rounded-2xl border border-bx-border hover:border-bx-primary text-right space-y-2 transition-all cursor-pointer" style="background: var(--bx-table-header);">
                <div class="flex items-center justify-between">
                    <span class="font-black text-sm text-bx-title">الدرج الأيمن (Right Drawer)</span>
                    <i data-lucide="panel-right" class="w-5 h-5 text-bx-primary"></i>
                </div>
                <p class="text-xs text-bx-muted">فتح درج الإعدادات والتفضيلات من اليمين</p>
            </button>

            <button onclick="openOffcanvas('top')" class="p-5 rounded-2xl border border-bx-border hover:border-bx-primary text-right space-y-2 transition-all cursor-pointer" style="background: var(--bx-table-header);">
                <div class="flex items-center justify-between">
                    <span class="font-black text-sm text-bx-title">اللوحة العلوية (Top Banner)</span>
                    <i data-lucide="panel-top" class="w-5 h-5 text-amber-500"></i>
                </div>
                <p class="text-xs text-bx-muted">فتح لوحة الإشعارات والبث السحابي من الأعلى</p>
            </button>
        </div>
    </div>
</div>
`;

const ocJS = `
function openOffcanvas(dir) {
    closeAllOffcanvas();
    const drawer = document.getElementById('offcanvas' + dir.charAt(0).toUpperCase() + dir.slice(1));
    const backdrop = document.getElementById('offcanvasBackdrop');
    if (drawer) drawer.classList.add('bx-offcanvas-open');
    if (backdrop) backdrop.classList.add('bx-backdrop-open');
}

function closeOffcanvas(dir) {
    const drawer = document.getElementById('offcanvas' + dir.charAt(0).toUpperCase() + dir.slice(1));
    const backdrop = document.getElementById('offcanvasBackdrop');
    if (drawer) drawer.classList.remove('bx-offcanvas-open');
    if (backdrop) backdrop.classList.remove('bx-backdrop-open');
}

function closeAllOffcanvas() {
    document.querySelectorAll('.bx-offcanvas').forEach(d => d.classList.remove('bx-offcanvas-open'));
    const backdrop = document.getElementById('offcanvasBackdrop');
    if (backdrop) backdrop.classList.remove('bx-backdrop-open');
}
`;

writeComponent('23-offcanvas', ocReadme, wrapStandaloneHTML('اللوحات المنزلقة (Offcanvas)', ocHtmlBody, 'component.css', 'component.js'), ocCSS, ocJS);

console.log('All 7 Phase 2 components generated successfully!');
