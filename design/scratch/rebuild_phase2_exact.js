const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const targetDir = path.join(rootDir, 'FRAMEWORK/01_design_system');
const componentsDir = path.join(targetDir, 'components');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');
const originalCSS = fs.readFileSync(path.join(rootDir, 'design/css/style.css'), 'utf8');

// 1. Copy tailwind.config.js to js/
fs.copyFileSync(
    path.join(rootDir, 'design/js/tailwind.config.js'),
    path.join(targetDir, 'js/tailwind.config.js')
);
console.log('tailwind.config.js copied to js/');

// 2. Ensure taqniya.css has full complete original styles merged with tokens & fonts
const fullTaqniyaCSS = `/* ==========================================================================
   TAQNIYA DESIGN SYSTEM — AUTHORITATIVE CORE STYLESHEET
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@600;700;800;900&family=JetBrains+Mono:wght@500;700&family=Syne:wght@700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap');

${originalCSS.trim()}
`;

fs.writeFileSync(path.join(targetDir, 'css/taqniya.css'), fullTaqniyaCSS, 'utf8');
console.log('css/taqniya.css updated with full complete original stylesheet!');

// 3. Exact section extractor
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

    // Adjust relative asset paths from assets/ to ../../assets/images/
    rawSection = rawSection.replace(/src="assets\//g, 'src="../../assets/images/');
    rawSection = rawSection.replace(/href="assets\//g, 'href="../../assets/images/');

    return rawSection;
}

// 4. Exact wrapper with Tailwind config & full CSS
function wrapExactHTML(title, sectionHTML, jsPath = null) {
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
    <!-- Tailwind CSS CDN & Custom Config -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="../../js/tailwind.config.js"></script>
    <!-- Global Taqniya Styles -->
    <link rel="stylesheet" href="../../css/taqniya.css">
</head>
<body class="min-h-screen p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
    <!-- Component Navigation Bar -->
    <header class="flex items-center justify-between border-b border-bx-border pb-4">
        <div class="flex items-center gap-3">
            <a href="../../index.html" class="bx-tag hover:border-bx-primary transition-all">← المعرض العام</a>
            <span class="text-bx-muted text-xs">/</span>
            <span class="text-xs font-black text-bx-title">${title}</span>
        </div>
        <button type="button" onclick="toggleTheme()" class="bx-tag text-xs font-bold hover:border-bx-primary cursor-pointer">
            <i data-lucide="moon" class="w-3.5 h-3.5"></i>
            <span>تبديل السمة (Light / Dark)</span>
        </button>
    </header>

    <!-- Exact Original Section HTML -->
    <main>
        ${sectionHTML}
    </main>

    <!-- Global & Component JS -->
    <script src="../../js/taqniya.js"></script>
    ${jsPath ? `<script src="${jsPath}"></script>` : ''}
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            if (window.lucide && lucide.createIcons) lucide.createIcons();
        });
    </script>
</body>
</html>`;
}

// 5. Update the 7 components with EXACT original sections
const phase2Configs = [
    { id: 'breakpoints', folder: '01-breakpoints', title: '1. نقاط التوقف (Breakpoints)' },
    { id: 'grid', folder: '02-grid', title: '2. نظام الشبكة (Grid System)' },
    { id: 'alignment', folder: '03-alignment', title: '3. المحاذاة والتموضع (Alignment)' },
    { id: 'typography', folder: '04-typography', title: '4. الخطوط والتايبوغرافي (Typography)' },
    { id: 'breadcrumb', folder: '17-breadcrumb', title: '17. مسارات التنقل (Breadcrumbs)' },
    { id: 'navbar', folder: '22-navbar', title: '22. أشرطة التنقل (Navbar & Headers)' },
    { id: 'offcanvas', folder: '23-offcanvas', title: '23. اللوحات المنزلقة والأدراج (Offcanvas)' }
];

phase2Configs.forEach(cfg => {
    const rawHTML = extractExactSection(cfg.id);
    const targetFolder = path.join(componentsDir, cfg.folder);
    if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder, { recursive: true });

    const wrapped = wrapExactHTML(cfg.title, rawHTML, 'component.js');
    fs.writeFileSync(path.join(targetFolder, 'index.html'), wrapped, 'utf8');
    console.log(`Updated with EXACT original HTML: ${cfg.folder} (${rawHTML.split('\n').length} lines)`);
});

console.log('Phase 2 components regenerated with 100% exact original HTML & Tailwind config!');
