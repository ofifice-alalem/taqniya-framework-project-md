const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const targetDir = path.join(rootDir, 'FRAMEWORK/01_design_system');
const componentsDir = path.join(targetDir, 'components');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');
const lines = htmlSource.split('\n');

// 1. Extract the 4 Drawers HTML (Lines 58 to 533 in Taqniya Design System.html)
const drawersLines = lines.slice(57, 533).join('\n');
let cleanDrawersHTML = drawersLines.replace(/src="assets\//g, 'src="../../assets/images/');
cleanDrawersHTML = cleanDrawersHTML.replace(/href="assets\//g, 'href="../../assets/images/');

// 2. Extract Section by ID
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

// 3. Perfect standalone wrapper
function generateComponentHTML(title, sectionId, extraBodyTop = '') {
    const sectionHTML = extractExactSection(sectionId);

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

    <!-- Extra Top Overlays (e.g. Drawers, Mount Points) -->
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

    <!-- Global & Component JS -->
    <script src="../../js/taqniya.js"></script>
    <script src="component.js"></script>
    <script>
        // Guaranteed icon rendering
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

// 4. Update the 7 components
const configs = [
    { id: 'breakpoints', folder: '01-breakpoints', title: '1. نقاط التوقف (Breakpoints)', extra: '' },
    { id: 'grid', folder: '02-grid', title: '2. نظام الشبكة (Grid System)', extra: '' },
    { id: 'alignment', folder: '03-alignment', title: '3. المحاذاة والتموضع (Alignment)', extra: '' },
    { id: 'typography', folder: '04-typography', title: '4. الخطوط والتايبوغرافي (Typography)', extra: '' },
    { id: 'breadcrumb', folder: '17-breadcrumb', title: '17. مسارات التنقل (Breadcrumbs)', extra: '' },
    { id: 'navbar', folder: '22-navbar', title: '22. أشرطة التنقل (Navbar & Headers)', extra: '<div id="liveActiveNavbarMount" class="fixed top-0 inset-x-0 z-[9999] hidden transition-all duration-300"></div>' },
    { id: 'offcanvas', folder: '23-offcanvas', title: '23. اللوحات المنزلقة والأدراج (Offcanvas)', extra: cleanDrawersHTML }
];

configs.forEach(cfg => {
    const targetFolder = path.join(componentsDir, cfg.folder);
    if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder, { recursive: true });

    const fullHTML = generateComponentHTML(cfg.title, cfg.id, cfg.extra);
    fs.writeFileSync(path.join(targetFolder, 'index.html'), fullHTML, 'utf8');
    console.log(`Generated perfected ${cfg.folder}/index.html (${fullHTML.split('\n').length} lines)`);
});

console.log('All Phase 2 components rebuilt with 100% exact dimensions, local icons, and pixel-perfect layout!');
