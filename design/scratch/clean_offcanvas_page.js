const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');
const lines = htmlSource.split('\n');

// Extract lines 58 to 533 (0-indexed: lines 57 to 533)
const drawersLines = lines.slice(57, 533).join('\n');
let cleanDrawersHTML = drawersLines.replace(/src="assets\//g, 'src="../../assets/images/');
cleanDrawersHTML = cleanDrawersHTML.replace(/href="assets\//g, 'href="../../assets/images/');

// Extract Section 23
const secStartIndex = htmlSource.indexOf('<section id="offcanvas"');
const secEndIndex = htmlSource.indexOf('</section>', secStartIndex) + '</section>'.length;
let sectionHTML = htmlSource.substring(secStartIndex, secEndIndex).trim();
sectionHTML = sectionHTML.replace(/src="assets\//g, 'src="../../assets/images/');
sectionHTML = sectionHTML.replace(/href="assets\//g, 'href="../../assets/images/');

const fullPageHTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl" class="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>23. اللوحات المنزلقة والأدراج (Offcanvas) — Taqniya Design System</title>
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

    <!-- 4 Spatial Offcanvas Drawers & Backdrop Overlay -->
    ${cleanDrawersHTML}

    <!-- Component Navigation Bar -->
    <header class="flex items-center justify-between border-b border-bx-border pb-4">
        <div class="flex items-center gap-3">
            <a href="../../index.html" class="bx-tag hover:border-bx-primary transition-all">← المعرض العام</a>
            <span class="text-bx-muted text-xs">/</span>
            <span class="text-xs font-black text-bx-title">23. اللوحات المنزلقة والأدراج (Offcanvas)</span>
        </div>
        <button type="button" onclick="toggleTheme()" class="bx-tag text-xs font-bold hover:border-bx-primary cursor-pointer">
            <i data-lucide="moon" class="w-3.5 h-3.5"></i>
            <span>تبديل السمة (Light / Dark)</span>
        </button>
    </header>

    <!-- Exact Original Section 23 HTML -->
    <main>
        ${sectionHTML}
    </main>

    <!-- Global & Component JS -->
    <script src="../../js/taqniya.js"></script>
    <script src="component.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            if (window.lucide && lucide.createIcons) lucide.createIcons();
        });
    </script>
</body>
</html>`;

const targetFile = path.join(rootDir, 'FRAMEWORK/01_design_system/components/23-offcanvas/index.html');
fs.writeFileSync(targetFile, fullPageHTML, 'utf8');

console.log('Clean 23-offcanvas index.html written successfully! Total lines:', fullPageHTML.split('\n').length);
