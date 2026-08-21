/**
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

    toast.innerHTML = `
        <div class="w-9 h-9 rounded-xl ${iconBg} ${iconColor} border border-current/20 flex items-center justify-center shrink-0">
            <i data-lucide="${iconName}" class="w-5 h-5"></i>
        </div>
        <div class="flex-1 min-w-0">
            <div class="text-xs font-black text-bx-title leading-tight">${title}</div>
            ${message ? `<p class="text-[11px] text-bx-muted mt-0.5 leading-relaxed">${message}</p>` : ''}
        </div>
        <button onclick="this.closest('.bx-toast-item').remove()" class="text-bx-muted hover:text-bx-title p-1 rounded-lg transition-colors">
            <i data-lucide="x" class="w-3.5 h-3.5"></i>
        </button>
    `;

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

// ================= 4. SECTION COLLAPSE HELPER =================
function toggleSection(contentId, btnId) {
    const content = document.getElementById(contentId);
    const btn = document.getElementById(btnId);
    if (!content) return;

    const isHidden = content.classList.contains('hidden');
    if (isHidden) {
        content.classList.remove('hidden');
        if (btn) {
            const icon = btn.querySelector('.chevron-toggle, i');
            if (icon) icon.style.transform = 'rotate(0deg)';
        }
    } else {
        content.classList.add('hidden');
        if (btn) {
            const icon = btn.querySelector('.chevron-toggle, i');
            if (icon) icon.style.transform = 'rotate(180deg)';
        }
    }
}

// ================= 5. OFFCANVAS & SLIDE DRAWERS CONTROLLER =================
function openOffcanvas(direction) {
    ['right', 'left', 'top', 'bottom'].forEach(dir => {
        const dId = 'offcanvas' + dir.charAt(0).toUpperCase() + dir.slice(1);
        const d = document.getElementById(dId);
        if (d) {
            if (dir === 'right') { d.classList.remove('translate-x-0'); d.classList.add('translate-x-full'); }
            else if (dir === 'left') { d.classList.remove('translate-x-0'); d.classList.add('-translate-x-full'); }
            else if (dir === 'top') { d.classList.remove('translate-y-0'); d.classList.add('-translate-y-full'); }
            else if (dir === 'bottom') { d.classList.remove('translate-y-0'); d.classList.add('translate-y-full'); }
            d.classList.remove('bx-drawer-open');
        }
    });

    const backdrop = document.getElementById('offcanvasBackdrop');
    if (backdrop) {
        backdrop.classList.remove('hidden');
        backdrop.style.display = 'block';
    }

    const drawerId = 'offcanvas' + direction.charAt(0).toUpperCase() + direction.slice(1);
    const drawer = document.getElementById(drawerId);

    if (drawer) {
        drawer.classList.add('bx-drawer-open');
        void drawer.offsetHeight; // Force reflow

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
    }

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

function closeOffcanvas(direction) {
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

        setTimeout(() => {
            if (!drawer.classList.contains('translate-x-0') && !drawer.classList.contains('translate-y-0')) {
                drawer.classList.remove('bx-drawer-open');
            }
        }, 300);
    }

    const backdrop = document.getElementById('offcanvasBackdrop');
    if (backdrop) {
        backdrop.classList.add('hidden');
        backdrop.style.display = 'none';
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
            setTimeout(() => {
                drawer.classList.remove('bx-drawer-open');
            }, 300);
        }
    });

    const backdrop = document.getElementById('offcanvasBackdrop');
    if (backdrop) {
        backdrop.classList.add('hidden');
        backdrop.style.display = 'none';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllOffcanvas();
    }
});
