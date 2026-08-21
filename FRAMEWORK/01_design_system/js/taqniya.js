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
function showToast(type, title, msg) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'fixed top-4 left-4 z-[99999] flex flex-col gap-3 max-w-sm w-full pointer-events-none';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'bx-toast-item pointer-events-auto';

    let iconName = 'zap';
    let borderColor = 'var(--bx-primary)';
    let titleColor = 'var(--bx-title)';
    let iconBg = 'var(--bx-pill)';

    if (type === 'success') {
        iconName = 'check';
        borderColor = '#10B981';
        titleColor = '#10B981';
        iconBg = 'rgba(16, 185, 129, 0.1)';
    } else if (type === 'error' || type === 'danger') {
        iconName = 'x';
        borderColor = '#EF4444';
        titleColor = '#EF4444';
        iconBg = 'rgba(239, 68, 68, 0.1)';
    } else if (type === 'warning') {
        iconName = 'alert-triangle';
        borderColor = '#F59E0B';
        titleColor = '#F59E0B';
        iconBg = 'rgba(245, 158, 11, 0.1)';
    } else {
        iconName = 'info';
        borderColor = 'var(--bx-primary)';
        titleColor = 'var(--bx-title)';
        iconBg = 'var(--bx-pill)';
    }

    toast.style.borderColor = borderColor;

    toast.innerHTML = `
        <div class="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border" style="background-color: ${iconBg}; border-color: ${borderColor}; color: ${titleColor}">
            <i data-lucide="${iconName}" class="w-4 h-4"></i>
        </div>
        <div class="flex-1 space-y-0.5 pr-1">
            <div class="font-display font-black text-[13px] leading-snug tracking-wide" style="color: ${titleColor}">${title || 'إشعار النظام'}</div>
            <div class="text-[11.5px] text-[var(--bx-muted)] font-bold leading-relaxed">${msg || ''}</div>
        </div>
        <button onclick="this.closest('.bx-toast-item').remove()" class="w-5 h-5 rounded-full border border-bx-border hover:border-bx-primary flex items-center justify-center text-xs text-[var(--bx-muted)] hover:text-white hover:bg-bx-primary font-bold shrink-0 transition-colors cursor-pointer">
            <i data-lucide="x" class="w-3 h-3"></i>
        </button>
        <div class="bx-toast-progress" style="background-color: ${borderColor}; animation-duration: 4s;"></div>
    `;

    container.appendChild(toast);
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-15px) scale(0.9)';
        setTimeout(() => toast.remove(), 250);
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

// ================= 6. BUTTON GROUPS & SEGMENTED CONTROLS =================
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

// ================= 7. BADGES & CHIPS =================
function removeChip(btn) {
    const chip = btn.closest('.bx-chip') || btn.parentElement;
    if (chip) {
        chip.style.transition = 'all 0.2s ease';
        chip.style.opacity = '0';
        chip.style.transform = 'scale(0.8)';
        setTimeout(() => chip.remove(), 200);
    }
}

// ================= 8. MODAL DIALOGS ENGINE =================
function openModal(modalId) {
    closeAllModals();
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    if (modalId === 'wizardModal') {
        updateWizardUI();
    }

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
    const anyOpen = document.querySelectorAll('.bx-modal-card:not(.hidden), [id$="Modal"]:not(.hidden)');
    let stillOpen = false;
    anyOpen.forEach(m => {
        if (m.offsetParent !== null && !m.classList.contains('hidden')) stillOpen = true;
    });
    if (!stillOpen) {
        document.body.style.overflow = '';
    }
}

function closeAllModals() {
    document.querySelectorAll('[id$="Modal"]').forEach(m => {
        m.classList.add('hidden');
        m.style.display = 'none';
    });
    document.body.style.overflow = '';
}

// ================= WIZARD MODAL ENGINE =================
let currentWizardStep = 1;
const totalWizardSteps = 3;

function setWizardStep(step) {
    currentWizardStep = step;
    updateWizardUI();
}

function wizardNextStep() {
    if (currentWizardStep < totalWizardSteps) {
        currentWizardStep++;
        updateWizardUI();
    } else {
        finishWizard();
    }
}

function wizardPrevStep() {
    if (currentWizardStep > 1) {
        currentWizardStep--;
        updateWizardUI();
    }
}

function finishWizard() {
    closeModal('wizardModal');
    if (typeof showToast === 'function') {
        showToast('success', 'تدشين المنظومة', 'تم إكمال كافة خطوات التهيئة وتدشين المنظومة بنجاح!');
    }
}

function updateWizardUI() {
    const counter = document.getElementById('wizStepCounter');
    if (counter) {
        counter.textContent = 'الخطوة ' + currentWizardStep + ' من ' + totalWizardSteps;
    }

    for (let i = 1; i <= totalWizardSteps; i++) {
        const pane = document.getElementById('wizPane-' + i);
        const badge = document.getElementById('wizBadge-' + i);
        const label = document.getElementById('wizLabel-' + i);
        const line = document.getElementById('wizLine-' + i);

        if (pane) {
            if (i === currentWizardStep) {
                pane.classList.remove('hidden');
            } else {
                pane.classList.add('hidden');
            }
        }

        if (badge) {
            if (i <= currentWizardStep) {
                badge.className = 'w-9 h-9 rounded-2xl bg-bx-primary text-white font-black text-xs flex items-center justify-center shadow-md transition-all';
                if (i < currentWizardStep) {
                    badge.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
                } else {
                    badge.textContent = i;
                }
            } else {
                badge.className = 'w-9 h-9 rounded-2xl bg-transparent border-2 border-bx-border text-bx-muted font-black text-xs flex items-center justify-center transition-all';
                badge.textContent = i;
            }
        }

        if (label) {
            if (i === currentWizardStep) {
                label.className = 'text-[11px] font-black text-bx-primary';
            } else {
                label.className = 'text-[11px] font-bold text-bx-muted';
            }
        }

        if (line) {
            if (i < currentWizardStep) {
                line.className = 'h-1 flex-1 rounded-full bg-bx-primary transition-all';
            } else {
                line.className = 'h-1 flex-1 rounded-full bg-bx-border transition-all';
            }
        }
    }

    const prevBtn = document.getElementById('wizPrevBtn');
    const nextBtn = document.getElementById('wizNextBtn');

    if (prevBtn) {
        if (currentWizardStep === 1) {
            prevBtn.disabled = true;
            prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            prevBtn.disabled = false;
            prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    if (nextBtn) {
        if (currentWizardStep === totalWizardSteps) {
            nextBtn.innerHTML = '<span>تدشين المنظومة</span><i data-lucide="rocket" class="w-4 h-4"></i>';
        } else {
            nextBtn.innerHTML = '<span>التالي</span><i data-lucide="arrow-left" class="w-4 h-4"></i>';
        }
    }

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

function selectModalLayer(layer, label, element) {
    const valDisplay = document.getElementById('modalLayerVal');
    if (valDisplay) {
        valDisplay.innerHTML = '<span>' + label + '</span>';
    }
    const menu = document.getElementById('modalLayerMenu');
    if (menu) {
        menu.classList.add('hidden');
    }
}

function rateStar(count) {
    const stars = document.querySelectorAll('#starRatingContainer .star-btn');
    stars.forEach((s, idx) => {
        if (idx < count) {
            s.className = 'star-btn text-amber-400 fill-amber-400 hover:scale-125 transition-transform cursor-pointer';
        } else {
            s.className = 'star-btn text-bx-border hover:scale-125 transition-transform cursor-pointer';
        }
    });
}

function submitRecord() {
    closeModal('createRecordModal');
    if (typeof showToast === 'function') {
        showToast('success', 'إنشاء السجل المعماري', 'تم حفظ السجل الجديد وإدراجه في جدول المعمارية بنجاح!');
    }
}

function confirmDelete() {
    closeModal('deleteModal');
    if (typeof showToast === 'function') {
        showToast('error', 'حذف السجل', 'تم حذف السجل من قاعدة البيانات بشكل نهائي.');
    }
}

// ================= 9. ACCORDIONS & COLLAPSE =================
function toggleAccordionItem(btn) {
    const item = btn.closest('.accordion-item');
    if (!item) return;

    const panel = item.querySelector('.accordion-panel');
    const chevron = item.querySelector('.chevron-icon');

    if (panel) {
        const isCollapsed = panel.classList.contains('is-collapsed');
        if (isCollapsed) {
            panel.classList.remove('is-collapsed');
            if (chevron) chevron.classList.add('rotate-180');
        } else {
            panel.classList.add('is-collapsed');
            if (chevron) chevron.classList.remove('rotate-180');
        }
    }

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

function expandAllAccordions(groupId) {
    const group = document.getElementById(groupId) || document;
    group.querySelectorAll('.accordion-item').forEach(item => {
        const panel = item.querySelector('.accordion-panel');
        const chevron = item.querySelector('.chevron-icon');
        if (panel) panel.classList.remove('is-collapsed');
        if (chevron) chevron.classList.add('rotate-180');
    });
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
}

function collapseAllAccordions(groupId) {
    const group = document.getElementById(groupId) || document;
    group.querySelectorAll('.accordion-item').forEach(item => {
        const panel = item.querySelector('.accordion-panel');
        const chevron = item.querySelector('.chevron-icon');
        if (panel) panel.classList.add('is-collapsed');
        if (chevron) chevron.classList.remove('rotate-180');
    });
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
}

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

function toggleCollapseBlock(blockId, btnId) {
    const block = document.getElementById(blockId);
    const btn = document.getElementById(btnId);
    if (!block) return;

    const isOpen = block.classList.contains('is-open');
    if (isOpen) {
        block.classList.remove('is-open');
        if (btn) {
            const icon = btn.querySelector('.chevron-icon, .chevron-toggle');
            if (icon) icon.classList.remove('rotate-180');
            const textSpan = btn.querySelector('#codeSchemaBtnText');
            if (textSpan) textSpan.textContent = 'إظهار كود الـ Schema';
        }
    } else {
        block.classList.add('is-open');
        if (btn) {
            const icon = btn.querySelector('.chevron-icon, .chevron-toggle');
            if (icon) icon.classList.add('rotate-180');
            const textSpan = btn.querySelector('#codeSchemaBtnText');
            if (textSpan) textSpan.textContent = 'إخفاء كود الـ Schema';
        }
    }

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

// ================= 10. TABS SWITCHER =================
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

// ================= 11. CAROUSEL ENGINE =================
let currentCarouselIndex = 0;
const totalCarouselSlides = 4;

function updateCarouselView() {
    const track = document.getElementById('carouselTrack');
    const badge = document.getElementById('carouselCounterBadge') || document.getElementById('carouselSlideBadge');
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

// ================= 12. TABLE ACTIONS =================
function toggleSelectAll(masterCb) {
    const checkboxes = document.querySelectorAll('.tbl-check, .table-row-cb');
    checkboxes.forEach(cb => {
        cb.checked = masterCb.checked;
        const row = cb.closest('tr');
        if (row) {
            if (masterCb.checked) {
                row.classList.add('bg-[var(--bx-row-active)]');
            } else {
                row.classList.remove('bg-[var(--bx-row-active)]');
            }
        }
    });
    updateBulkBar();
}

function updateBulkBar() {
    const allCbs = document.querySelectorAll('.tbl-check, .table-row-cb');
    const checkedCbs = document.querySelectorAll('.tbl-check:checked, .table-row-cb:checked');
    const bulkBar = document.getElementById('bulkBarFloating');
    const bulkText = document.getElementById('bulkText');
    const masterCb = document.querySelector('thead input[type="checkbox"]');

    allCbs.forEach(cb => {
        const row = cb.closest('tr');
        if (row) {
            if (cb.checked) {
                row.classList.add('bg-[var(--bx-row-active)]');
            } else {
                row.classList.remove('bg-[var(--bx-row-active)]');
            }
        }
    });

    if (bulkBar && bulkText) {
        if (checkedCbs.length > 0) {
            bulkText.textContent = 'تم تحديد ' + checkedCbs.length + ' عناصر';
            bulkBar.style.display = 'flex';
        } else {
            bulkBar.style.display = 'none';
        }
    }

    if (masterCb) {
        masterCb.checked = (allCbs.length > 0 && checkedCbs.length === allCbs.length);
    }
}

function unselectAll() {
    const allCbs = document.querySelectorAll('.tbl-check, .table-row-cb');
    allCbs.forEach(cb => {
        cb.checked = false;
        const row = cb.closest('tr');
        if (row) row.classList.remove('bg-[var(--bx-row-active)]');
    });

    const masterCb = document.querySelector('thead input[type="checkbox"]');
    if (masterCb) masterCb.checked = false;

    const bulkBar = document.getElementById('bulkBarFloating');
    if (bulkBar) bulkBar.style.display = 'none';
}

function filterTable(status, btn) {
    const buttons = document.querySelectorAll('#sec-tables-body button[onclick*="filterTable"], #tables button[onclick*="filterTable"]');
    buttons.forEach(b => {
        b.classList.remove('bx-btn-primary');
        b.classList.add('bx-btn-outline');
    });

    if (btn) {
        btn.classList.add('bx-btn-primary');
        btn.classList.remove('bx-btn-outline');
    } else if (typeof event !== 'undefined' && event && event.currentTarget) {
        event.currentTarget.classList.add('bx-btn-primary');
        event.currentTarget.classList.remove('bx-btn-outline');
    }

    const rows = document.querySelectorAll('#tblBody tr, #tableBody tr');
    rows.forEach(r => {
        const rowStatus = r.getAttribute('data-status') || '';
        if (status === 'all' || rowStatus === status) {
            r.style.display = '';
        } else {
            r.style.display = 'none';
        }
    });
}

function filterRows(query) {
    const q = (query || '').trim().toLowerCase();
    const rows = document.querySelectorAll('#tblBody tr, #tableBody tr');
    rows.forEach(r => {
        const text = r.textContent.toLowerCase();
        if (!q || text.includes(q)) {
            r.style.display = '';
        } else {
            r.style.display = 'none';
        }
    });
}

// ================= 13. DROPDOWNS & FORM STUDIO =================
function toggleDropdown(menuId) {
    const menu = document.getElementById(menuId);
    if (!menu) return;
    const isHidden = menu.classList.contains('hidden');

    document.querySelectorAll('.bx-dropdown-menu').forEach(m => {
        if (m.id !== menuId) m.classList.add('hidden');
    });

    if (isHidden) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}

function filterSingleSelectOptions(query) {
    const q = (query || '').trim().toLowerCase();
    const items = document.querySelectorAll('#singleSelectOptionsList .bx-dropdown-item');
    items.forEach(el => {
        if (!q || el.textContent.toLowerCase().includes(q)) {
            el.style.display = 'flex';
        } else {
            el.style.display = 'none';
        }
    });
}

function selectSingleOption(text, element) {
    const display = document.getElementById('singleSelectVal');
    if (display) {
        display.innerHTML = '<span>' + text + '</span>';
    }

    if (element) {
        document.querySelectorAll('#singleSelectOptionsList .single-select-row').forEach(row => {
            row.classList.remove('active');
            const r = row.querySelector('.bx-custom-radio');
            if (r) r.checked = false;
        });
        element.classList.add('active');
        const radio = element.querySelector('.bx-custom-radio');
        if (radio) radio.checked = true;
    }

    const menu = document.getElementById('singleSelectMenu');
    if (menu) menu.classList.add('hidden');

    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
}

function validateField(type) {
    if (type === 'projectName') {
        const input = document.getElementById('valProjectName');
        const icon = document.getElementById('valProjectIcon');
        const feedback = document.getElementById('valProjectFeedback');
        if (!input || !feedback) return;

        if (input.value.trim().length >= 4) {
            input.style.borderColor = 'var(--bx-success)';
            if (icon) icon.className = 'absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500';
            if (icon) icon.innerHTML = '<i data-lucide="check-circle" class="w-4 h-4"></i>';
            feedback.className = 'text-xs font-bold text-emerald-500 flex items-center gap-1';
            feedback.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i> الاسم مستوفٍ للشروط ومعتمد';
        } else {
            input.style.borderColor = 'var(--bx-danger)';
            if (icon) icon.className = 'absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500';
            if (icon) icon.innerHTML = '<i data-lucide="alert-circle" class="w-4 h-4"></i>';
            feedback.className = 'text-xs font-bold text-red-500 flex items-center gap-1';
            feedback.innerHTML = '<i data-lucide="alert-circle" class="w-3.5 h-3.5"></i> يجب ألا يقل الاسم عن 4 أحرف';
        }
    } else if (type === 'email') {
        const input = document.getElementById('valEmail');
        const icon = document.getElementById('valEmailIcon');
        const feedback = document.getElementById('valEmailFeedback');
        if (!input || !feedback) return;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input.value.trim())) {
            input.style.borderColor = 'var(--bx-success)';
            if (icon) icon.className = 'absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500';
            if (icon) icon.innerHTML = '<i data-lucide="check-circle" class="w-4 h-4"></i>';
            feedback.className = 'text-xs font-bold text-emerald-500 flex items-center gap-1';
            feedback.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i> عنوان البريد الإلكتروني صالح ومطابق';
        } else {
            input.style.borderColor = 'var(--bx-danger)';
            if (icon) icon.className = 'absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500';
            if (icon) icon.innerHTML = '<i data-lucide="alert-circle" class="w-4 h-4"></i>';
            feedback.className = 'text-xs font-bold text-red-500 flex items-center gap-1';
            feedback.innerHTML = '<i data-lucide="alert-circle" class="w-3.5 h-3.5"></i> يرجى إدخال بريد إلكتروني صالح (مثال: name@domain.com)';
        }
    } else if (type === 'password') {
        const input = document.getElementById('valPassword');
        const feedback = document.getElementById('valPassFeedback');
        if (!input || !feedback) return;

        const val = input.value;
        const hasNumber = /\d/.test(val);
        if (val.length >= 6 && hasNumber) {
            input.style.borderColor = 'var(--bx-success)';
            feedback.className = 'text-xs font-bold text-emerald-500 flex items-center gap-1';
            feedback.innerHTML = '<i data-lucide="shield-check" class="w-3.5 h-3.5"></i> كلمة مرور قوية ومؤمنة';
        } else {
            input.style.borderColor = 'var(--bx-danger)';
            feedback.className = 'text-xs font-bold text-red-500 flex items-center gap-1';
            feedback.innerHTML = '<i data-lucide="alert-circle" class="w-3.5 h-3.5"></i> يجب ألا تقل عن 6 خانات وتحتوي على أرقام';
        }
    }

    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
}

function togglePassVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!input || !icon) return;

    if (input.type === 'password') {
        input.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
    } else {
        input.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
    }
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
}

function handleFileSelected() {
    const notice = document.getElementById('fileNotice');
    if (notice) {
        notice.classList.remove('hidden');
        notice.style.display = 'flex';
    }
    if (typeof showToast === 'function') {
        showToast('success', 'رفع الملفات', 'تم اختيار الملف بنجاح وجاهز للمزامنة!');
    }
}

// ================= 14. MULTI-SELECT WITH FUZZY SEARCH =================
let selectedMultiItems = ['auth', 'database', 'ui'];
const multiItemsData = [
    { val: 'auth', label: 'محرك المصادقة والأمان', code: 'auth' },
    { val: 'database', label: 'قاعدة البيانات ومستودع السجلات', code: 'db' },
    { val: 'ui', label: 'مكتبة العناصر البصرية', code: 'ui' },
    { val: 'analytics', label: 'تحليلات الأداء والمؤشرات', code: 'metrics' },
    { val: 'workflow', label: 'سير العمل والأتمتة', code: 'pipeline' }
];

function renderMultiChips() {
    const container = document.getElementById('multiSelectedChips');
    const countBadge = document.getElementById('multiSelectCount');
    if (!container) return;

    container.innerHTML = '';
    if (selectedMultiItems.length === 0) {
        container.innerHTML = '<span class="text-xs text-bx-muted font-bold">انقر لاختيار العناصر أو البحث...</span>';
    } else {
        selectedMultiItems.forEach(val => {
            const item = multiItemsData.find(i => i.val === val);
            if (item) {
                const chip = document.createElement('span');
                chip.className = 'multi-tag-chip';
                chip.innerHTML = '<span>' + item.label + '</span><button type="button" onclick="removeMultiChip(\'' + item.val + '\', event)" class="hover:text-[var(--bx-danger)] transition-colors cursor-pointer flex items-center justify-center"><i data-lucide="x" class="w-3 h-3"></i></button>';
                container.appendChild(chip);
            }
        });
    }

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
    const q = (query || '').trim().toLowerCase();
    const items = document.querySelectorAll('#multiSelectList .multi-item');
    items.forEach(el => {
        const label = el.dataset.label ? el.dataset.label.toLowerCase() : '';
        const val = el.dataset.val ? el.dataset.val.toLowerCase() : '';
        const text = el.textContent.toLowerCase();

        if (!q || text.includes(q) || label.includes(q) || val.includes(q)) {
            el.style.display = 'flex';
        } else {
            el.style.display = 'none';
        }
    });
}

function submitFormDemo() {
    if (typeof showToast === 'function') {
        showToast('success', 'حفظ النموذج', 'تم التحقق من كافة الحقول والمدخلات بنجاح وحفظ البيانات!');
    }
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.bx-dropdown-trigger') && 
        !e.target.closest('.bx-dropdown-menu') && 
        !e.target.closest('[onclick*="toggleDropdown"]') &&
        !e.target.closest('#multiSelectMenu') &&
        !e.target.closest('#singleSelectMenu') &&
        !e.target.closest('#multiSelectedChips')) {
        document.querySelectorAll('.bx-dropdown-menu').forEach(m => m.classList.add('hidden'));
    }
});

renderMultiChips();
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderMultiChips);
}
window.addEventListener('load', renderMultiChips);

