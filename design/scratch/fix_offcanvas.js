const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const htmlSource = fs.readFileSync(path.join(rootDir, 'design/Taqniya Design System.html'), 'utf8');
const targetFolder = path.join(rootDir, 'FRAMEWORK/01_design_system/components/23-offcanvas');

// 1. Extract the 4 drawers markup (Lines 58 to 550 in Taqniya Design System.html)
const startDrawersMarker = '<!-- ==================== GLOBAL OFFCANVAS & SLIDE DRAWERS SYSTEM (4-DIRECTIONS) ==================== -->';
const endDrawersMarker = '<!-- ===== SIDEBAR NAVIGATION ===== -->';

const startIndex = htmlSource.indexOf(startDrawersMarker);
let endIndex = htmlSource.indexOf(endDrawersMarker);
if (endIndex === -1) {
    endIndex = htmlSource.indexOf('<!-- ===== MAIN CONTENT');
}

let drawersHTML = htmlSource.substring(startIndex, endIndex).trim();
// Fix relative asset paths
drawersHTML = drawersHTML.replace(/src="assets\//g, 'src="../../assets/images/');
drawersHTML = drawersHTML.replace(/href="assets\//g, 'href="../../assets/images/');

// 2. Extract Section 23 markup
const startSecMarker = '<section id="offcanvas"';
const endSecMarker = '</section>';
const secStartIndex = htmlSource.indexOf(startSecMarker);
const secEndIndex = htmlSource.indexOf(endSecMarker, secStartIndex) + endSecMarker.length;
let sectionHTML = htmlSource.substring(secStartIndex, secEndIndex).trim();
sectionHTML = sectionHTML.replace(/src="assets\//g, 'src="../../assets/images/');
sectionHTML = sectionHTML.replace(/href="assets\//g, 'href="../../assets/images/');

// 3. Build component.js
const offcanvasJS = `
/**
 * 23-offcanvas component.js
 * 4-Directional Offcanvas & Slide Drawers Engine
 */

function openOffcanvas(direction) {
    closeAllOffcanvas();
    const backdrop = document.getElementById('offcanvasBackdrop');
    const drawerId = 'offcanvas' + direction.charAt(0).toUpperCase() + direction.slice(1);
    const drawer = document.getElementById(drawerId);

    if (!drawer) {
        console.error('Drawer not found:', drawerId);
        return;
    }

    if (backdrop) {
        backdrop.classList.remove('hidden');
        requestAnimationFrame(() => {
            backdrop.classList.remove('opacity-0');
            backdrop.classList.add('opacity-100');
        });
    }

    if (direction === 'right') {
        drawer.classList.remove('translate-x-full');
        drawer.classList.add('translate-x-0');
    } else if (direction === 'left') {
        drawer.classList.remove('-translate-x-full');
        drawer.classList.add('translate-x-0');
    } else if (direction === 'top') {
        drawer.classList.remove('-translate-y-full');
        drawer.classList.add('translate-y-0');
    } else if (direction === 'bottom') {
        drawer.classList.remove('translate-y-full');
        drawer.classList.add('translate-y-0');
    }

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

function closeOffcanvas(direction) {
    const backdrop = document.getElementById('offcanvasBackdrop');
    const drawerId = 'offcanvas' + direction.charAt(0).toUpperCase() + direction.slice(1);
    const drawer = document.getElementById(drawerId);

    if (drawer) {
        if (direction === 'right') {
            drawer.classList.remove('translate-x-0');
            drawer.classList.add('translate-x-full');
        } else if (direction === 'left') {
            drawer.classList.remove('translate-x-0');
            drawer.classList.add('-translate-x-full');
        } else if (direction === 'top') {
            drawer.classList.remove('translate-y-0');
            drawer.classList.add('-translate-y-full');
        } else if (direction === 'bottom') {
            drawer.classList.remove('translate-y-0');
            drawer.classList.add('translate-y-full');
        }
    }

    if (backdrop) {
        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0');
        setTimeout(() => {
            backdrop.classList.add('hidden');
        }, 300);
    }
}

function closeAllOffcanvas() {
    ['right', 'left', 'top', 'bottom'].forEach(dir => {
        const drawerId = 'offcanvas' + dir.charAt(0).toUpperCase() + dir.slice(1);
        const drawer = document.getElementById(drawerId);
        if (drawer) {
            if (dir === 'right') {
                drawer.classList.remove('translate-x-0');
                drawer.classList.add('translate-x-full');
            } else if (dir === 'left') {
                drawer.classList.remove('translate-x-0');
                drawer.classList.add('-translate-x-full');
            } else if (dir === 'top') {
                drawer.classList.remove('translate-y-0');
                drawer.classList.add('-translate-y-full');
            } else if (dir === 'bottom') {
                drawer.classList.remove('translate-y-0');
                drawer.classList.add('translate-y-full');
            }
        }
    });

    const backdrop = document.getElementById('offcanvasBackdrop');
    if (backdrop) {
        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0');
        setTimeout(() => {
            backdrop.classList.add('hidden');
        }, 300);
    }
}

// Escape key listener to close offcanvas
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllOffcanvas();
    }
});
`;

// 4. Build complete index.html for 23-offcanvas
const completeHTML = `<!DOCTYPE html>
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
    ${drawersHTML}

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

fs.writeFileSync(path.join(targetFolder, 'index.html'), completeHTML, 'utf8');
fs.writeFileSync(path.join(targetFolder, 'component.js'), offcanvasJS.trim() + '\n', 'utf8');

console.log('23-offcanvas fixed with complete 4 drawers and full JS engine!');
