const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const targetDir = path.join(rootDir, 'FRAMEWORK/01_design_system');
const sourceDesignDir = path.join(rootDir, 'design');

// 1. Create directory structure
const dirs = [
    path.join(targetDir, 'assets/images'),
    path.join(targetDir, 'assets/icons'),
    path.join(targetDir, 'assets/fonts'),
    path.join(targetDir, 'css'),
    path.join(targetDir, 'js'),
    path.join(targetDir, 'components')
];

dirs.forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// 2. Copy image assets
const sourceAssets = path.join(sourceDesignDir, 'assets');
if (fs.existsSync(sourceAssets)) {
    const files = fs.readdirSync(sourceAssets);
    files.forEach(file => {
        const srcFile = path.join(sourceAssets, file);
        if (fs.statSync(srcFile).isFile()) {
            fs.copyFileSync(srcFile, path.join(targetDir, 'assets/images', file));
            console.log(`Copied asset: ${file}`);
        }
    });
}

// 3. Generate tokens.md
const tokensMD = `# Taqniya Design System — Tokens (Design Values Contract)

This document defines the authoritative, technology-neutral visual tokens of the Taqniya Design System.
It describes **VALUES ONLY** (no component implementation code).

---

## 1. Token Architecture Hierarchy

\`\`\`
[ Tier 1: Global / Primitive Tokens ] ──> Raw HEX/RGBA values
                   │
                   ▼
[ Tier 2: Semantic / Role Tokens ]    ──> Contextual role (e.g., --bx-primary, --bx-surface-solid)
                   │
                   ▼
[ Tier 3: Component Tokens ]          ──> Scoped element (e.g., --bx-shadow-btn, --radius-m)
\`\`\`

---

## 2. Color Palette Tokens

### A. Theme Surface & Base Colors
| Token Name | Light Mode (Default) | Dark Mode (Soft) | Role / Usage |
| :--- | :--- | :--- | :--- |
| \`--bx-canvas\` | \`#EBEBFA\` | \`#28293D\` | Application background canvas |
| \`--bx-surface-solid\` | \`#EBEBFA\` | \`#31324B\` | Card, modal & drawer solid surface |
| \`--bx-primary\` | \`#5B3CE6\` | \`#8566FF\` | Brand primary action / active state |
| \`--bx-primary-hover\` | \`#482FD0\` | \`#987DFF\` | Hover state for primary actions |
| \`--bx-primary-contrast\`| \`#FFFFFF\` | \`#FFFFFF\` | Text color on primary backgrounds |
| \`--bx-title\` | \`#4834A6\` | \`#FFFFFF\` | Primary headings & high-contrast titles |
| \`--bx-text\` | \`#2D2B3D\` | \`#DCD9EF\` | Main body text |
| \`--bx-muted\` | \`#6B658E\` | \`#A5A0C8\` | Secondary / placeholder / muted text |
| \`--bx-border\` | \`#9D96D2\` | \`rgba(255, 255, 255, 0.18)\` | Default container borders |
| \`--bx-border-strong\` | \`#7870B8\` | \`rgba(255, 255, 255, 0.30)\` | Elevated & active element borders |
| \`--bx-divider\` | \`#B4AED8\` | \`rgba(255, 255, 255, 0.23)\` | Horizontal table/card row dividers |
| \`--bx-pill\` | \`rgba(91, 60, 230, 0.08)\` | \`rgba(133, 102, 255, 0.16)\` | Soft pill & badge background |
| \`--bx-table-header\` | \`rgba(91, 60, 230, 0.05)\` | \`rgba(255, 255, 255, 0.04)\` | Table header & panel background |
| \`--bx-row-hover\` | \`rgba(91, 60, 230, 0.06)\` | \`rgba(133, 102, 255, 0.14)\` | Table row hover background |
| \`--bx-row-active\` | \`rgba(91, 60, 230, 0.12)\` | \`rgba(133, 102, 255, 0.24)\` | Selected table row background |

### B. Functional & State Colors
| Token Name | Light Mode | Dark Mode | Semantic Meaning |
| :--- | :--- | :--- | :--- |
| \`--bx-danger\` | \`#EF4444\` | \`#F87171\` | Destructive, error, critical alerts |
| \`--bx-danger-bg\` | \`rgba(239, 68, 68, 0.08)\` | \`rgba(248, 113, 113, 0.15)\` | Danger tint background |
| \`--bx-success\` | \`#10B981\` | \`#34D399\` | Success, confirmation, online status |
| \`--bx-success-bg\` | \`rgba(16, 185, 129, 0.08)\` | \`rgba(52, 211, 153, 0.15)\` | Success tint background |
| \`--bx-warning\` | \`#F59E0B\` | \`#FBBF24\` | Caution, pending, review required |
| \`--bx-warning-bg\` | \`rgba(245, 158, 11, 0.08)\` | \`rgba(251, 191, 36, 0.15)\` | Warning tint background |
| \`--bx-info\` | \`#3B82F6\` | \`#60A5FA\` | Informational notice, secondary links |
| \`--bx-info-bg\` | \`rgba(59, 130, 246, 0.08)\` | \`rgba(96, 165, 250, 0.15)\` | Info tint background |

---

## 3. Typography Tokens

### A. Font Families
- **Primary Body Font**: \`'Tajawal', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif\`
- **Display & Headings**: \`'Alexandria', 'Syne', -apple-system, sans-serif\`
- **Monospace Code Font**: \`'JetBrains Mono', monospace\`

### B. Font Weights
- Regular: \`400\`
- Medium: \`500\`
- Bold: \`700\`
- Extra Bold / Heavy: \`800\`
- Black: \`900\`

---

## 4. Spacing, Radius & Elevation Tokens

### A. Border Radius Scale
- \`--radius-s\`: \`0.625rem\` (10px) — Small badges, mini buttons, inputs
- \`--radius-m\`: \`0.875rem\` (14px) — Buttons, input groups, dropdowns
- \`--radius-l\`: \`1.25rem\` (20px) — Cards, modals, drawers
- \`--radius-xl\`: \`1.75rem\` (28px) — Featured containers, carousels
- \`--radius-full\`: \`9999px\` — Pills, tags, circle action buttons

### B. Shadows & Spatial Depth
- \`--bx-shadow-btn\`: \`0 4px 14px rgba(91, 60, 230, 0.2)\`
- \`--bx-shadow-btn-hover\`: \`0 8px 22px rgba(91, 60, 230, 0.3)\`
- \`--bx-shadow-modal\`: \`0 25px 50px -12px rgba(72, 52, 166, 0.25)\`
- \`--bx-shadow-dropdown\`: \`0 15px 30px -5px rgba(72, 52, 166, 0.12)\`

### C. Motion & Easing
- Spring Transition: \`cubic-bezier(0.23, 0.65, 0.74, 1.09)\`
- Smooth Standard: \`cubic-bezier(0.4, 0, 0.2, 1)\`

---

## 5. Responsive Breakpoint Tokens
- \`xs\`: \`< 576px\` (Mobile phones)
- \`sm\`: \`≥ 576px\` (Large phones / phablets)
- \`md\`: \`≥ 768px\` (Tablets)
- \`lg\`: \`≥ 992px\` (Small laptops / desktops)
- \`xl\`: \`≥ 1200px\` (Desktops)
- \`xxl\`: \`≥ 1400px\` (Wide monitors / screens)
`;

// 4. Generate rules.md
const rulesMD = `# Taqniya Design System — Architectural Design Rules

This document governs the global design principles, accessibility, and visual guidelines of the Taqniya Design System.

---

## 1. Directionality & RTL First Principle
1. **Native RTL Support**: The primary reading flow is Right-to-Left (\`dir="rtl"\`).
2. **Logical CSS Properties**: Prefer logical properties (\`margin-inline\`, \`padding-inline\`, \`inset-inline\`, \`border-inline\`) over physical properties (\`left\`/\`right\`) where possible.
3. **Icon Alignment**: Interactive leading icons are placed at the start of text (right in RTL), and chevron/disclosure indicators are placed at the end (left in RTL).

---

## 2. Spatial UI (VisionOS Glassmorphism) Rules
1. **Layered Elevation**: Backgrounds use subtle translucent surfaces (\`rgba(...)\`) with background blur (\`backdrop-filter: blur(16px)\`).
2. **Subtle Outlines**: Surfaces must be bounded by fine, crisp borders (\`--bx-border\`) to maintain separation against light and dark backdrops.
3. **Contrast Discipline**: All body text must maintain a minimum contrast ratio of **4.5:1** against surface backgrounds (WCAG 2.1 AA standard).

---

## 3. Typography & Hierarchy Rules
1. **Headings Consistency**: All section and card headings use \`.bx-title\` or \`<h1>\`-\`<h6>\` with \`font-weight: 800\` and negative letter spacing (\`-0.01em\`).
2. **Numbers & Codes**: Numerical values, timestamps, and architectural IDs should use \`font-mono\` (\`JetBrains Mono\`) for alignment clarity.
3. **Text Hierarchy**:
   - Title: \`--bx-title\`
   - Body: \`--bx-text\`
   - Secondary / Helper: \`--bx-muted\`

---

## 4. Interaction & Micro-Animations
1. **State Completeness**: Every interactive element (Buttons, Nav items, Cards, Inputs) MUST specify:
   - **Default State**
   - **Hover State** (Elevation lift or color shift)
   - **Active State** (Pressed scale or border highlight)
   - **Focus-Visible State** (Accessible focus ring)
   - **Disabled State** (Opacity 0.45, \`pointer-events: none\`)
2. **Animation Duration**: Micro-interactions must not exceed **300ms** to ensure the interface feels instantaneous and crisp.

---

## 5. Technology Neutrality
1. The framework design system provides the **Visual Contract** in pure HTML/CSS/JS.
2. Target project implementations (Laravel Blade, React, Vue) must implement native components conforming strictly to these visual tokens.
`;

// 5. Generate css/taqniya.css
const taqniyaCSS = `/* ==========================================================================
   TAQNIYA DESIGN SYSTEM — CORE STYLESHEET (CSS VARIABLES & GLOBAL FOUNDATIONS)
   ========================================================================== */

/* 1. Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@600;700;800;900&family=JetBrains+Mono:wght@500;700&family=Syne:wght@700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap');

/* 2. Global CSS Variables (Light Mode Default) */
:root {
    --bx-canvas: #EBEBFA;
    --bx-surface-solid: #EBEBFA;
    --bx-primary: #5B3CE6;
    --bx-primary-hover: #482FD0;
    --bx-primary-contrast: #FFFFFF;
    --bx-title: #4834A6;
    --bx-text: #2D2B3D;
    --bx-muted: #6B658E;
    --bx-border: #9D96D2;
    --bx-border-strong: #7870B8;
    --bx-divider: #B4AED8;
    --bx-pill: rgba(91, 60, 230, 0.08);
    --bx-table-header: rgba(91, 60, 230, 0.05);
    --bx-row-hover: rgba(91, 60, 230, 0.06);
    --bx-row-active: rgba(91, 60, 230, 0.12);

    /* Functional Colors */
    --bx-danger: #EF4444;
    --bx-danger-bg: rgba(239, 68, 68, 0.08);
    --bx-success: #10B981;
    --bx-success-bg: rgba(16, 185, 129, 0.08);
    --bx-warning: #F59E0B;
    --bx-warning-bg: rgba(245, 158, 11, 0.08);
    --bx-info: #3B82F6;
    --bx-info-bg: rgba(59, 130, 246, 0.08);

    /* Shadows & Elevation */
    --bx-shadow-btn: 0 4px 14px rgba(91, 60, 230, 0.2);
    --bx-shadow-btn-hover: 0 8px 22px rgba(91, 60, 230, 0.3);
    --bx-shadow-modal: 0 25px 50px -12px rgba(72, 52, 166, 0.25);
    --bx-shadow-dropdown: 0 15px 30px -5px rgba(72, 52, 166, 0.12);

    /* Border Radii */
    --radius-s: 0.625rem;
    --radius-m: 0.875rem;
    --radius-l: 1.25rem;
    --radius-xl: 1.75rem;
    --radius-full: 9999px;

    /* Easings */
    --anim-spring: cubic-bezier(0.23, 0.65, 0.74, 1.09);
    --anim-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 3. Dark Mode Overrides */
.dark,
[data-theme="dark"] {
    --bx-canvas: #28293D;
    --bx-surface-solid: #31324B;
    --bx-primary: #8566FF;
    --bx-primary-hover: #987DFF;
    --bx-primary-contrast: #FFFFFF;
    --bx-title: #FFFFFF;
    --bx-text: #DCD9EF;
    --bx-muted: #A5A0C8;
    --bx-border: rgba(255, 255, 255, 0.18);
    --bx-border-strong: rgba(255, 255, 255, 0.30);
    --bx-divider: rgba(255, 255, 255, 0.23);
    --bx-pill: rgba(133, 102, 255, 0.16);
    --bx-table-header: rgba(255, 255, 255, 0.04);
    --bx-row-hover: rgba(133, 102, 255, 0.14);
    --bx-row-active: rgba(133, 102, 255, 0.24);

    --bx-danger: #F87171;
    --bx-danger-bg: rgba(248, 113, 113, 0.15);
    --bx-success: #34D399;
    --bx-success-bg: rgba(52, 211, 153, 0.15);
    --bx-warning: #FBBF24;
    --bx-warning-bg: rgba(251, 191, 36, 0.15);
    --bx-info: #60A5FA;
    --bx-info-bg: rgba(96, 165, 250, 0.15);

    --bx-shadow-btn: 0 4px 14px rgba(133, 102, 255, 0.25);
    --bx-shadow-btn-hover: 0 8px 22px rgba(133, 102, 255, 0.35);
    --bx-shadow-modal: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
    --bx-shadow-dropdown: 0 15px 30px -5px rgba(0, 0, 0, 0.35);
}

/* 4. Global Reset & Base Rules */
*, *::before, *::after {
    box-sizing: border-box;
}

html {
    background-color: var(--bx-canvas);
    color: var(--bx-text);
    font-family: 'Tajawal', sans-serif;
    direction: rtl;
    scroll-behavior: smooth;
    scroll-padding-top: 6.5rem;
}

body {
    background-color: var(--bx-canvas);
    color: var(--bx-text);
    font-family: 'Tajawal', sans-serif;
    direction: rtl;
    min-height: 100vh;
    width: 100%;
    overflow-x: clip;
    margin: 0;
    padding: 0;
    transition: background-color 0.3s ease, color 0.3s ease;
}

main {
    min-width: 0 !important;
    max-width: 100% !important;
}

/* Headings */
h1, h2, h3, h4, h5, h6,
.bx-title {
    font-family: 'Tajawal', sans-serif;
    color: var(--bx-title);
    font-weight: 800;
    line-height: 1.35;
    margin-top: 0;
}

.font-heading {
    font-family: 'Alexandria', 'Syne', sans-serif;
}

.font-mono {
    font-family: 'JetBrains Mono', monospace;
}

/* 5. Universal Utilities */
.bx-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.25rem 0.625rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 700;
    border: 1px solid var(--bx-border);
    background: var(--bx-pill);
    color: var(--bx-title);
    line-height: 1;
    white-space: nowrap;
    transition: all 0.2s ease;
}

@keyframes sectionTargetPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(91, 60, 230, 0.4);
        transform: scale(1);
    }
    40% {
        box-shadow: 0 0 0 8px rgba(91, 60, 230, 0.15);
        transform: scale(1.004);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(91, 60, 230, 0);
        transform: scale(1);
    }
}

.section-target-highlight {
    animation: sectionTargetPulse 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    border-color: var(--bx-primary) !important;
}
`;

// 6. Generate js/taqniya.js
const taqniyaJS = `/**
 * TAQNIYA DESIGN SYSTEM — GLOBAL JAVASCRIPT FOUNDATIONS
 * Shared runtime behaviors: Theme management, Toast notifications, Smooth ScrollSpy, Modal helpers.
 */

// ================= 1. THEME MODE CONTROLLER =================
function setThemeMode(mode) {
    const html = document.documentElement;
    if (mode === 'dark') {
        html.classList.add('dark');
        html.classList.remove('light');
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('taqniya-theme', 'dark');
    } else {
        html.classList.remove('dark');
        html.classList.add('light');
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('taqniya-theme', 'light');
    }
    
    // Update theme toggle buttons if present
    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
        const btnMode = btn.getAttribute('data-theme-btn');
        if (btnMode === mode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    setThemeMode(isDark ? 'light' : 'dark');
}

// Initialize theme from storage
(function initTheme() {
    const savedTheme = localStorage.getItem('taqniya-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setThemeMode('dark');
    } else {
        setThemeMode('light');
    }
})();

// ================= 2. FLOATING TOAST NOTIFICATION STACK =================
function showToast(type = 'info', title = 'تنبيه', message = '') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'fixed top-4 left-4 z-[99999] flex flex-col gap-3 max-w-sm w-full pointer-events-none';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'bx-toast-item pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl border shadow-2xl transition-all duration-300 transform -translate-y-2 opacity-0';
    
    // Color mapping
    let iconName = 'info';
    let borderColor = 'border-bx-border';
    let iconColor = 'text-bx-primary';
    let iconBg = 'bg-bx-pill';

    if (type === 'success') {
        iconName = 'check-circle';
        borderColor = 'border-emerald-500/30';
        iconColor = 'text-emerald-500';
        iconBg = 'bg-emerald-500/10';
    } else if (type === 'danger' || type === 'error') {
        iconName = 'alert-triangle';
        borderColor = 'border-red-500/30';
        iconColor = 'text-red-500';
        iconBg = 'bg-red-500/10';
    } else if (type === 'warning') {
        iconName = 'alert-circle';
        borderColor = 'border-amber-500/30';
        iconColor = 'text-amber-500';
        iconBg = 'bg-amber-500/10';
    }

    toast.classList.add(borderColor);
    toast.style.background = 'var(--bx-surface-solid)';

    toast.innerHTML = \`
        <div class="w-9 h-9 rounded-xl \${iconBg} \${iconColor} border border-current/20 flex items-center justify-center shrink-0">
            <i data-lucide="\${iconName}" class="w-5 h-5"></i>
        </div>
        <div class="flex-1 min-w-0">
            <div class="text-xs font-black text-bx-title leading-tight">\${title}</div>
            \${message ? \`<p class="text-[11px] text-bx-muted mt-0.5 leading-relaxed">\${message}</p>\` : ''}
        </div>
        <button onclick="this.closest('.bx-toast-item').remove()" class="text-bx-muted hover:text-bx-title p-1 rounded-lg transition-colors">
            <i data-lucide="x" class="w-3.5 h-3.5"></i>
        </button>
    \`;

    container.appendChild(toast);

    if (window.lucide && lucide.createIcons) {
        lucide.createIcons();
    }

    // Slide in
    requestAnimationFrame(() => {
        toast.classList.remove('-translate-y-2', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    });

    // Auto dismiss after 4 seconds
    setTimeout(() => {
        toast.classList.add('opacity-0', '-translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ================= 3. SMOOTH ANCHOR NAVIGATION & DYNAMIC OFFSET =================
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href || href === '#' || href.length < 2) return;

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            e.preventDefault();

            const topOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - topOffset;

            window.scrollTo({
                top: Math.max(0, offsetPosition),
                behavior: 'smooth'
            });

            if (history.pushState) {
                history.pushState(null, null, href);
            } else {
                location.hash = href;
            }

            // Target highlight animation
            targetElement.classList.remove('section-target-highlight');
            void targetElement.offsetWidth;
            targetElement.classList.add('section-target-highlight');
            setTimeout(() => {
                targetElement.classList.remove('section-target-highlight');
            }, 1400);
        }
    });

    // Auto-init lucide icons
    if (window.lucide && lucide.createIcons) {
        lucide.createIcons();
    }
});
`;

fs.writeFileSync(path.join(targetDir, 'tokens.md'), tokensMD.trim() + '\n', 'utf8');
fs.writeFileSync(path.join(targetDir, 'rules.md'), rulesMD.trim() + '\n', 'utf8');
fs.writeFileSync(path.join(targetDir, 'css/taqniya.css'), taqniyaCSS.trim() + '\n', 'utf8');
fs.writeFileSync(path.join(targetDir, 'js/taqniya.js'), taqniyaJS.trim() + '\n', 'utf8');

console.log('Phase 1 files successfully generated in FRAMEWORK/01_design_system/');
