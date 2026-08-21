        // Live Breakpoint Detector
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
                activeLabel = 'None (<576px)';
            }

            if (badgeDisplay) badgeDisplay.textContent = activeLabel;

            // Reset all rows (clearing inline styles to allow CSS hover)
            document.querySelectorAll('#breakpoints tbody tr').forEach(tr => {
                tr.classList.remove('font-black');
                tr.style.backgroundColor = '';
                const statusCol = tr.querySelector('.bp-status');
                if (statusCol) statusCol.innerHTML = '<span class="text-xs text-bx-muted opacity-30 font-mono">—</span>';
            });

            // Highlight active row using Pure CSS Variables
            const activeRow = document.getElementById(activeId);
            if (activeRow) {
                activeRow.style.backgroundColor = 'var(--bx-row-active)';
                const statusCol = activeRow.querySelector('.bp-status');
                if (statusCol) {
                    statusCol.innerHTML = `
                        <span class="bx-tag text-[11px] py-1 px-3 font-black border-bx-primary text-bx-primary bg-[var(--bx-pill)] flex items-center justify-center gap-1.5 mx-auto w-max shadow-sm">
                            <span class="w-2 h-2 rounded-full bg-bx-primary animate-ping"></span>
                            نشط حالياً
                        </span>
                    `;
                }
            }
        }

        // Interactive Grid Gap Switcher
        function setGridGap(gapClass, btn) {
            const container = document.getElementById('liveGridContainer');
            if (container) {
                container.classList.remove('gap-2', 'gap-4', 'gap-6');
                container.classList.add(gapClass);
            }
            if (btn && btn.parentElement) {
                btn.parentElement.querySelectorAll('.grid-gap-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        }

        // Interactive Centering & Alignment Mode Switcher for 3 Elements (Row & Column)
        function setAlignmentMode(mode, btn) {
            const box = document.getElementById('alignPlayground');
            const label = document.getElementById('alignCodeLabel');
            if (!box || !label) return;

            box.className = 'h-[420px] rounded-2xl border border-[var(--bx-divider)] bg-[var(--bx-table-header)] flex p-6 transition-all duration-300 relative overflow-hidden';
            
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
            } else if (mode === 'col-around') {
                box.classList.add('flex-col', 'items-center', 'justify-around');
                label.textContent = 'flex-col justify-around items-center';
            }

            document.querySelectorAll('.align-mode-btn').forEach(b => b.classList.remove('active'));
            if (btn) {
                btn.classList.add('active');
            }
        }

        // Initialize Lucide Icons
        document.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
            updateLiveBreakpoints();
            window.addEventListener('resize', updateLiveBreakpoints);
        });

        // Toggle Theme
        function toggleTheme() {
            const html = document.documentElement;
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
            } else {
                html.classList.add('dark');
            }
            lucide.createIcons();
        }

        // Font Live Preview
        function updateFontSlider(val) {
            document.getElementById('fontLabel').textContent = val + 'px';
            document.getElementById('fontPreview').style.fontSize = val + 'px';
        }
        function updateFontLive(val) {
            document.getElementById('fontPreview').textContent = val || 'نظام تقنية';
        }
        function updateFontFamily(fontName, btn) {
            const preview = document.getElementById('fontPreview');
            if (preview) preview.style.fontFamily = fontName;
            document.querySelectorAll('.font-lab-family-btn').forEach(b => {
                b.classList.remove('bg-bx-primary', 'text-white');
                b.classList.add('text-bx-muted');
            });
            if (btn) {
                btn.classList.add('bg-bx-primary', 'text-white');
                btn.classList.remove('text-bx-muted');
            }
        }

        // Dropdowns
        function toggleDropdown(id) {
            const menu = document.getElementById(id);
            const isHidden = menu.classList.contains('hidden');
            document.querySelectorAll('.bx-dropdown-menu').forEach(m => m.classList.add('hidden'));
            if (isHidden) {
                menu.classList.remove('hidden');
                lucide.createIcons();
            }
        }
        function selectDropdown(valId, menuId, text, element) {
            const valEl = document.getElementById(valId);
            if (valEl) valEl.innerHTML = `<span>${text}</span>`;
            const menuEl = document.getElementById(menuId);
            if (menuEl) {
                menuEl.classList.add('hidden');
                if (element) {
                    menuEl.querySelectorAll('.bx-dropdown-item').forEach(item => {
                        item.classList.remove('active');
                        const radio = item.querySelector('.bx-custom-radio');
                        if (radio) radio.checked = false;
                    });
                    element.classList.add('active');
                    const radio = element.querySelector('.bx-custom-radio');
                    if (radio) radio.checked = true;
                }
            }
            lucide.createIcons();
        }
        window.addEventListener('click', function(e) {
            if (!e.target.closest('.relative')) {
                document.querySelectorAll('.bx-dropdown-menu').forEach(m => m.classList.add('hidden'));
            }
        });

        // Choice Cards
        function selectChoiceCard(el) {
            document.querySelectorAll('#choiceParent .bx-choice-card').forEach(c => {
                c.classList.remove('active');
                const h4 = c.querySelector('h4');
                if (h4) {
                    h4.classList.add('text-bx-title');
                }
            });
            el.classList.add('active');
            lucide.createIcons();
        }

        // Checklist / Progress Bar Controller
        function updateChecklist() {
            const total = document.querySelectorAll('.chk-box').length;
            const checked = document.querySelectorAll('.chk-box:checked').length;
            const pct = total > 0 ? Math.round((checked / total) * 100) : 0;
            
            const scoreEl = document.getElementById('chkScore');
            const countEl = document.getElementById('chkCount');
            const barEl = document.getElementById('chkBar');

            if (scoreEl) scoreEl.textContent = 'الإنجاز: ' + pct + '%';
            if (countEl) countEl.textContent = `${checked} من ${total} مكتملة`;
            if (barEl) barEl.style.width = pct + '%';

            // Update item status indicators
            document.querySelectorAll('.chk-box').forEach(cb => {
                const label = cb.closest('label');
                if (label) {
                    const statusSpan = label.querySelector('.chk-status-tag');
                    if (statusSpan) {
                        if (cb.checked) {
                            statusSpan.className = 'chk-status-tag text-xs font-bold text-emerald-500 flex items-center gap-1';
                            statusSpan.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i> <span>تم</span>';
                        } else {
                            statusSpan.className = 'chk-status-tag text-xs font-bold text-amber-500 flex items-center gap-1';
                            statusSpan.innerHTML = '<i data-lucide="clock" class="w-3.5 h-3.5"></i> <span>قيد الانتظار</span>';
                        }
                    }
                }
            });
            lucide.createIcons();
        }

        // Braxton Modern Floating Toast System with Lucide Vector Icons
        function showToast(type, title, msg) {
            const container = document.getElementById('toastContainer');
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
            } else if (type === 'error') {
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
                    <div class="text-[11.5px] text-[var(--bx-muted)] font-bold leading-relaxed">${msg}</div>
                </div>
                <button onclick="this.closest('.bx-toast-item').remove()" class="w-5 h-5 rounded-full border border-bx-border hover:border-bx-primary flex items-center justify-center text-xs text-[var(--bx-muted)] hover:text-white hover:bg-bx-primary font-bold shrink-0 transition-colors">
                    <i data-lucide="x" class="w-3 h-3"></i>
                </button>
                <div class="bx-toast-progress" style="background-color: ${borderColor}; animation-duration: 4s;"></div>
            `;

            container.appendChild(toast);
            lucide.createIcons();

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(-15px) scale(0.9)';
                setTimeout(() => toast.remove(), 250);
            }, 4000);
        }

        // Modals & Drawer System
        let currentWizardStep = 1;

        function openModal(id) {
            const m = document.getElementById(id);
            if (!m) return;
            m.classList.remove('hidden');
            m.classList.add('flex');
            document.body.style.overflow = 'hidden';
            lucide.createIcons();
        }
        function closeModal(id) {
            const m = document.getElementById(id);
            if (!m) return;
            m.classList.add('hidden');
            m.classList.remove('flex');
            document.body.style.overflow = '';
        }
        function closeAllModals() {
            document.querySelectorAll('[id$="Modal"]').forEach(m => {
                m.classList.add('hidden');
                m.classList.remove('flex');
            });
            document.body.style.overflow = '';
        }
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllModals();
                closeDrawer();
            }
        });

        // Wizard Stepper Controllers
        function setWizardStep(step) {
            currentWizardStep = step;
            const counter = document.getElementById('wizStepCounter');
            if (counter) {
                counter.textContent = `الخطوة ${step} من 3`;
            }

            for (let i = 1; i <= 3; i++) {
                const pane = document.getElementById(`wizPane-${i}`);
                const badge = document.getElementById(`wizBadge-${i}`);
                const label = document.getElementById(`wizLabel-${i}`);
                const line = document.getElementById(`wizLine-${i}`);

                if (pane) {
                    if (i === step) pane.classList.remove('hidden');
                    else pane.classList.add('hidden');
                }

                if (badge && label) {
                    if (i < step) {
                        badge.className = 'w-9 h-9 rounded-2xl bg-emerald-500 text-white font-black text-xs flex items-center justify-center shadow-md transition-all';
                        badge.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
                        label.className = 'text-[11px] font-black text-emerald-600';
                    } else if (i === step) {
                        badge.className = 'w-9 h-9 rounded-2xl bg-bx-primary text-white font-black text-xs flex items-center justify-center shadow-md transition-all';
                        badge.textContent = i;
                        label.className = 'text-[11px] font-black text-bx-primary';
                    } else {
                        badge.className = 'w-9 h-9 rounded-2xl bg-transparent border-2 border-bx-border text-bx-muted font-black text-xs flex items-center justify-center transition-all';
                        badge.textContent = i;
                        label.className = 'text-[11px] font-bold text-bx-muted';
                    }
                }

                if (line && i < 3) {
                    if (i < step) line.className = 'h-1 flex-1 rounded-full bg-emerald-500 transition-all';
                    else line.className = 'h-1 flex-1 rounded-full bg-bx-border transition-all';
                }
            }

            const prevBtn = document.getElementById('wizPrevBtn');
            const nextBtn = document.getElementById('wizNextBtn');

            if (prevBtn) {
                if (step === 1) {
                    prevBtn.disabled = true;
                    prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
                } else {
                    prevBtn.disabled = false;
                    prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            }

            if (nextBtn) {
                if (step === 3) {
                    nextBtn.innerHTML = '<span>إطلاق المنظومة</span><i data-lucide="rocket" class="w-4 h-4"></i>';
                    nextBtn.onclick = function() {
                        showToast('success', 'تم إطلاق المنظومة بنجاح!', 'تمت تهيئة البيئة وربط قواعد البيانات بنجاح 100%');
                        closeModal('wizardModal');
                        setWizardStep(1);
                    };
                } else {
                    nextBtn.innerHTML = '<span>التالي</span><i data-lucide="arrow-left" class="w-4 h-4"></i>';
                    nextBtn.onclick = wizardNextStep;
                }
            }
            lucide.createIcons();
        }

        function wizardNextStep() {
            if (currentWizardStep < 3) {
                setWizardStep(currentWizardStep + 1);
            }
        }

        function wizardPrevStep() {
            if (currentWizardStep > 1) {
                setWizardStep(currentWizardStep - 1);
            }
        }

        // Interactive Star Rating
        function setRatingStars(count) {
            const stars = document.querySelectorAll('#starRatingGroup .star-btn');
            const label = document.getElementById('starRatingLabel');
            const descriptions = [
                'تقييم سيء (1 من 5)',
                'تقييم مقبول (2 من 5)',
                'تقييم جيد (3 من 5)',
                'تقييم جيد جداً (4 من 5)',
                'تقييم ممتاز: 5 من 5 نجوم ★★★★★'
            ];

            stars.forEach((btn, index) => {
                const icon = btn.querySelector('svg') || btn.querySelector('i');
                if (index < count) {
                    btn.classList.add('text-amber-400');
                    btn.classList.remove('text-bx-border');
                    if (icon) icon.classList.add('fill-amber-400');
                } else {
                    btn.classList.remove('text-amber-400');
                    btn.classList.add('text-bx-border');
                    if (icon) icon.classList.remove('fill-amber-400');
                }
            });

            if (label) {
                label.textContent = descriptions[count - 1] || `${count} من 5 نجوم`;
            }
        }
        // ================= TAQNIYA OFFCANVAS SYSTEM (bx-offcanvas) =================
        function openOffcanvas(direction) {
            closeAllOffcanvas(); // Close others before opening target

            const backdrop = document.getElementById('offcanvasBackdrop');
            if (backdrop) {
                backdrop.classList.remove('hidden');
                backdrop.style.opacity = '1';
            }

            const drawerId = 'offcanvas' + direction.charAt(0).toUpperCase() + direction.slice(1).toLowerCase();
            const drawer = document.getElementById(drawerId);

            if (drawer) {
                drawer.classList.add('bx-offcanvas-open');
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
            const drawerId = 'offcanvas' + direction.charAt(0).toUpperCase() + direction.slice(1).toLowerCase();
            const drawer = document.getElementById(drawerId);

            if (drawer) {
                drawer.classList.remove('bx-offcanvas-open');
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

            // Check if any other offcanvas is still open
            const directions = ['right', 'left', 'top', 'bottom'];
            const anyOpen = directions.some(dir => {
                const el = document.getElementById('offcanvas' + dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase());
                return el && (el.classList.contains('bx-offcanvas-open') || el.classList.contains('translate-x-0') || el.classList.contains('translate-y-0'));
            });

            if (!anyOpen) {
                const backdrop = document.getElementById('offcanvasBackdrop');
                if (backdrop) {
                    backdrop.classList.add('hidden');
                }
            }
        }

        function closeAllOffcanvas() {
            ['right', 'left', 'top', 'bottom'].forEach(dir => {
                const drawerId = 'offcanvas' + dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase();
                const drawer = document.getElementById(drawerId);
                if (drawer) {
                    drawer.classList.remove('bx-offcanvas-open');
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
                backdrop.classList.add('hidden');
            }
        }

        // Backward-compatible aliases for legacy openDrawer / closeDrawer
        function openDrawer() {
            openOffcanvas('right');
        }
        function closeDrawer() {
            closeOffcanvas('right');
        }

        function setThemeMode(mode) {
            if (mode === 'dark') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                showToast('info', 'السمة البصرية', 'تم تفعيل الوضع الداكن 🌙');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                showToast('info', 'السمة البصرية', 'تم تفعيل الوضع الفاتح ☀️');
            }
        }

        // Keyboard ESC key closes all offcanvas & modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllOffcanvas();
                document.querySelectorAll('.bx-dropdown-menu').forEach(menu => menu.classList.add('hidden'));
            }
        });

        // Table Bulk Actions
        function toggleSelectAll(master) {
            document.querySelectorAll('.tbl-check').forEach(cb => cb.checked = master.checked);
            updateBulkBar();
        }
        function updateBulkBar() {
            const checkedBoxes = document.querySelectorAll('.tbl-check:checked');
            const count = checkedBoxes.length;
            const bar = document.getElementById('bulkBarFloating');
            const text = document.getElementById('bulkText');
            
            // Highlight selected rows
            document.querySelectorAll('.tbl-check').forEach(cb => {
                const row = cb.closest('.bx-table-row');
                if (row) {
                    if (cb.checked) row.classList.add('row-selected');
                    else row.classList.remove('row-selected');
                }
            });

            if (count > 0) {
                text.textContent = `تم تحديد ${count} عناصر`;
                bar.classList.add('active');
                lucide.createIcons();
            } else {
                bar.classList.remove('active');
            }
        }
        function unselectAll() {
            document.querySelectorAll('.tbl-check').forEach(cb => {
                cb.checked = false;
                const row = cb.closest('.bx-table-row');
                if (row) row.classList.remove('row-selected');
            });
            const selectAll = document.querySelector('thead input[type="checkbox"]');
            if (selectAll) selectAll.checked = false;
            updateBulkBar();
        }

        // Table Filter & Search
        function filterRows(query) {
            const rows = document.querySelectorAll('#tblBody tr');
            rows.forEach(r => {
                r.style.display = r.textContent.toLowerCase().includes(query.toLowerCase()) ? '' : 'none';
            });
        }
        function filterTable(status) {
            const rows = document.querySelectorAll('#tblBody tr');
            rows.forEach(r => {
                if (status === 'all' || r.dataset.status === status) r.style.display = '';
                else r.style.display = 'none';
            });
        }

        function handleFileSelected() {
            document.getElementById('fileNotice').classList.remove('hidden');
            lucide.createIcons();
        }

        function setNavActive(el) {
            document.querySelectorAll('.bx-nav-item').forEach(item => item.classList.remove('active'));
            el.classList.add('active');
        }

        // Sidebar & Category & Section Collapse Controllers
        function toggleSidebarCollapse() {
            const sidebar = document.getElementById('mainSidebar');
            const reopenBtn = document.getElementById('sidebarReopenBtn');
            if (!sidebar) return;
            const isHidden = sidebar.classList.toggle('sidebar-collapsed');
            if (reopenBtn) {
                if (isHidden) {
                    reopenBtn.classList.remove('hidden');
                    reopenBtn.classList.add('flex');
                } else {
                    reopenBtn.classList.add('hidden');
                    reopenBtn.classList.remove('flex');
                }
            }
            lucide.createIcons();
        }

        function toggleCategory(contentId, chevronId) {
            const content = document.getElementById(contentId);
            const chevron = document.getElementById(chevronId);
            if (content) content.classList.toggle('is-collapsed');
            if (chevron) chevron.classList.toggle('is-collapsed');
        }

        function toggleSection(contentId, btnId) {
            const content = document.getElementById(contentId);
            const btn = document.getElementById(btnId);
            if (content) content.classList.toggle('is-collapsed');
            if (btn) {
                const icon = btn.querySelector('.chevron-toggle');
                if (icon) icon.classList.toggle('is-collapsed');
            }
        }

        // ================= FORMS & CLIENT-SIDE VALIDATION =================
        function validateField(type) {
            if (type === 'projectName') {
                const input = document.getElementById('valProjectName');
                const icon = document.getElementById('valProjectIcon');
                const feedback = document.getElementById('valProjectFeedback');
                if (!input || !icon || !feedback) return;
                
                if (input.value.trim().length >= 4) {
                    input.style.borderColor = 'var(--bx-success)';
                    icon.className = 'absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500';
                    icon.innerHTML = '<i data-lucide="check-circle" class="w-4 h-4"></i>';
                    feedback.className = 'text-xs font-bold text-emerald-500 flex items-center gap-1';
                    feedback.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i> الاسم مستوفٍ للشروط ومعتمد';
                } else {
                    input.style.borderColor = 'var(--bx-danger)';
                    icon.className = 'absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500';
                    icon.innerHTML = '<i data-lucide="alert-circle" class="w-4 h-4"></i>';
                    feedback.className = 'text-xs font-bold text-red-500 flex items-center gap-1';
                    feedback.innerHTML = '<i data-lucide="alert-circle" class="w-3.5 h-3.5"></i> يجب أن يحتوي الاسم على 4 أحرف على الأقل';
                }
            } else if (type === 'email') {
                const input = document.getElementById('valEmail');
                const icon = document.getElementById('valEmailIcon');
                const feedback = document.getElementById('valEmailFeedback');
                if (!input || !icon || !feedback) return;
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(input.value.trim())) {
                    input.style.borderColor = 'var(--bx-success)';
                    icon.className = 'absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500';
                    icon.innerHTML = '<i data-lucide="check-circle" class="w-4 h-4"></i>';
                    feedback.className = 'text-xs font-bold text-emerald-500 flex items-center gap-1';
                    feedback.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i> عنوان البريد الإلكتروني صالح ومطابق';
                } else {
                    input.style.borderColor = 'var(--bx-danger)';
                    icon.className = 'absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500';
                    icon.innerHTML = '<i data-lucide="alert-circle" class="w-4 h-4"></i>';
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
            lucide.createIcons();
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
            lucide.createIcons();
        }

        // ================= SINGLE SELECT FILTER =================
        function filterSingleSelectOptions(query) {
            const q = query.trim().toLowerCase();
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
                display.innerHTML = `<span>${text}</span>`;
            }

            // Update active state & radio button in Single Select
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
            lucide.createIcons();
        }

        // ================= MULTI-SELECT WITH FUZZY / SUBSTRING SEARCH =================
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
                        chip.innerHTML = `
                            <span>${item.label}</span>
                            <button type="button" onclick="removeMultiChip('${item.val}', event)" class="hover:text-[var(--bx-danger)] transition-colors">
                                <i data-lucide="x" class="w-3 h-3"></i>
                            </button>
                        `;
                        container.appendChild(chip);
                    }
                });
            }
            
            if (countBadge) {
                countBadge.textContent = `${selectedMultiItems.length} محددة`;
            }
            
            // Update checkboxes in dropdown
            document.querySelectorAll('#multiSelectList .multi-item').forEach(el => {
                const val = el.dataset.val;
                const chk = el.querySelector('input[type="checkbox"]');
                if (chk) chk.checked = selectedMultiItems.includes(val);
            });
            
            lucide.createIcons();
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

        // Fuzzy / Substring Flexible Search for Multi-Select
        function filterMultiSelect(query) {
            const q = query.trim().toLowerCase();
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
            showToast('success', 'حفظ النموذج', 'تم التحقق من كافة الحقول والمدخلات بنجاح وحفظ البيانات!');
        }

        function resetFormDemo() {
            const pName = document.getElementById('valProjectName');
            const email = document.getElementById('valEmail');
            const pass = document.getElementById('valPassword');
            if (pName) pName.value = 'منظومة تقنية المعمارية';
            if (email) email.value = 'user@domain.com';
            if (pass) pass.value = 'Taqniya@2026';
            
            validateField('projectName');
            validateField('email');
            validateField('password');
            
            selectedMultiItems = ['auth', 'database', 'ui'];
            renderMultiChips();
            showToast('info', 'إعادة الضبط', 'تمت استعادة القيم الافتراضية للنموذج بنجاح');
        }

        // ================= BUTTON GROUPS & TOOLBAR HELPERS =================
        function setSegmentedRadio(btn, labelText) {
            const parent = btn.parentElement;
            if (parent) {
                parent.querySelectorAll('.bx-group-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
            const label = document.getElementById('activeViewModeLabel');
            if (label) label.textContent = 'الوضع: ' + labelText;
            showToast('info', 'طريقة العرض (View Mode)', 'تم التبديل إلى ' + labelText);
        }

        function toggleSegmentedCheckbox(btn) {
            btn.classList.toggle('active');
            const parent = btn.parentElement;
            if (parent) {
                const count = parent.querySelectorAll('.bx-group-item.active').length;
                const counter = document.getElementById('activeFeaturesCount');
                if (counter) counter.textContent = count + ' ميزات مفعلة';
            }
        }

        function toggleToolbarBtn(btn) {
            btn.classList.toggle('active');
        }

        function setToolbarRadio(btn) {
            const parent = btn.parentElement;
            if (parent) {
                parent.querySelectorAll('.bx-toolbar-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        }

        // ================= SIDEBAR NAVIGATION & SCROLLSPY =================
        function setNavActive(el) {
            document.querySelectorAll('.bx-nav-item').forEach(item => item.classList.remove('active'));
            if (el) {
                el.classList.add('active');
                const parentAccordion = el.closest('.accordion-content');
                if (parentAccordion && parentAccordion.classList.contains('is-collapsed')) {
                    parentAccordion.classList.remove('is-collapsed');
                    const chevId = parentAccordion.id.replace('cat', 'chev');
                    const chev = document.getElementById(chevId);
                    if (chev) chev.classList.remove('rotate-180');
                }
            }
        }

        // Active Section ScrollSpy using scroll position
        function updateScrollSpy() {
            const sections = document.querySelectorAll('main > section[id]');
            const scrollPos = window.scrollY || document.documentElement.scrollTop;
            const headerOffset = 180;

            let currentSectionId = '';

            sections.forEach(section => {
                const top = section.offsetTop - headerOffset;
                const height = section.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            // If at the bottom of the page, select the last section
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 80) && sections.length > 0) {
                currentSectionId = sections[sections.length - 1].getAttribute('id');
            }

            if (currentSectionId) {
                const activeNav = document.querySelector(`.bx-nav-item[href="#${currentSectionId}"]`);
                if (activeNav && !activeNav.classList.contains('active')) {
                    document.querySelectorAll('.bx-nav-item').forEach(item => item.classList.remove('active'));
                    activeNav.classList.add('active');

                    // Auto-open parent accordion category if collapsed
                    const parentAccordion = activeNav.closest('.accordion-content');
                    if (parentAccordion && parentAccordion.classList.contains('is-collapsed')) {
                        parentAccordion.classList.remove('is-collapsed');
                        const chevId = parentAccordion.id.replace('cat', 'chev');
                        const chev = document.getElementById(chevId);
                        if (chev) chev.classList.remove('rotate-180');
                    }
                }
            }
        }

        window.addEventListener('scroll', updateScrollSpy, { passive: true });
        window.addEventListener('DOMContentLoaded', updateScrollSpy);
        setTimeout(updateScrollSpy, 300);

        // ================= 16. BADGES & CHIPS CONTROLLERS =================
        function removeChip(btn) {
            const chip = btn.closest('.removable-chip');
            if (chip) {
                chip.style.opacity = '0';
                chip.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    chip.remove();
                    showToast('info', 'تمت إزالة الوسم', 'تم حذف الوسم المحدد من القائمة');
                }, 200);
            }
        }

        // ================= 18. ACCORDION CONTROLLERS =================
        function toggleAccordionItem(button) {
            const item = button.closest('.accordion-item');
            if (!item) return;
            const panel = item.querySelector('.accordion-panel');
            const icon = button.querySelector('.chevron-icon');

            if (!panel) return;

            const isCollapsed = panel.classList.toggle('is-collapsed');
            if (icon) {
                if (isCollapsed) icon.classList.remove('rotate-180');
                else icon.classList.add('rotate-180');
            }
        }

        function expandAllAccordions(groupId) {
            const group = document.getElementById(groupId);
            if (!group) return;
            group.querySelectorAll('.accordion-item').forEach(item => {
                const panel = item.querySelector('.accordion-panel');
                const icon = item.querySelector('.chevron-icon');
                if (panel) panel.classList.remove('is-collapsed');
                if (icon) icon.classList.add('rotate-180');
            });
        }

        function collapseAllAccordions(groupId) {
            const group = document.getElementById(groupId);
            if (!group) return;
            group.querySelectorAll('.accordion-item').forEach(item => {
                const panel = item.querySelector('.accordion-panel');
                const icon = item.querySelector('.chevron-icon');
                if (panel) panel.classList.add('is-collapsed');
                if (icon) icon.classList.remove('rotate-180');
            });
        }

        // ================= 19. COLLAPSE CONTROLLERS =================
        function toggleCollapseBlock(blockId, btnId) {
            const block = document.getElementById(blockId);
            const btn = document.getElementById(btnId);
            if (!block) return;

            const isOpen = block.classList.toggle('is-open');
            if (btn) {
                const icon = btn.querySelector('.chevron-icon') || btn.querySelector('[data-lucide="chevron-down"]');
                if (icon) {
                    if (isOpen) icon.classList.add('rotate-180');
                    else icon.classList.remove('rotate-180');
                }
                const btnText = btn.querySelector('#codeSchemaBtnText');
                if (btnText) {
                    btnText.textContent = isOpen ? 'إخفاء كود الـ Schema' : 'إظهار كود الـ Schema';
                }
            }
        }

        // ================= 20. CAROUSEL & SLIDER CONTROLLERS =================
        let currentCarouselIndex = 0;
        const totalCarouselSlides = 4;

        function updateCarouselView() {
            const track = document.getElementById('carouselTrack');
            const badge = document.getElementById('carouselCounterBadge');
            const dots = document.querySelectorAll('#carouselDotsGroup .carousel-dot');

            if (track) {
                // In RTL, translateX positive moves in right direction
                track.style.transform = `translateX(${currentCarouselIndex * 100}%)`;
            }

            if (badge) {
                badge.textContent = `الشريحة ${currentCarouselIndex + 1} من ${totalCarouselSlides}`;
            }

            dots.forEach((dot, idx) => {
                if (idx === currentCarouselIndex) {
                    dot.className = 'carousel-dot h-2.5 w-7 rounded-full bg-bx-primary transition-all';
                } else {
                    dot.className = 'carousel-dot h-2.5 w-2.5 rounded-full bg-bx-border hover:bg-bx-primary transition-all';
                }
            });
            lucide.createIcons();
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

        // Initialize multi chips on load
        setTimeout(renderMultiChips, 100);

        // ==================== LIVE ACTIVE PAGE NAVBAR MANAGER ====================
        let currentActiveHeaderStyle = null;

        function applyLivePageHeader(styleNum) {
            const mount = document.getElementById('liveActiveNavbarMount');
            if (!mount) return;

            currentActiveHeaderStyle = styleNum;
            
            let headerHTML = '';
            let styleName = '';

            if (styleNum === 1) {
                styleName = 'الشكل 1: شريط البوابة والتسويق الكلاسيكي (Portal & Marketing)';
                headerHTML = `
                    <div class="w-full bg-[var(--bx-surface-solid)]/95 backdrop-blur-xl border-b border-bx-border shadow-2xl transition-all duration-300">
                        <div class="w-full px-4 sm:px-8 lg:px-12 py-5 flex items-center justify-between gap-4">
                            <!-- Right: Brand Logo -->
                            <div class="flex items-center gap-3 shrink-0">
                                <div class="w-11 h-11 flex items-center justify-center shrink-0 transition-transform hover:scale-105">
                                    <img src="assets/logo.png" alt="Taqniya Logo" class="w-full h-full object-contain">
                                </div>
                                <div>
                                    <div class="flex items-center gap-2">
                                        <span class="font-black text-sm text-bx-title">منظومة تقنية</span>
                                        <span class="bx-tag text-[9px] py-0.5 px-2 text-bx-primary border-bx-primary/30">v3.0 Live</span>
                                    </div>
                                    <div class="text-[10px] text-bx-muted hidden sm:block">Spatial UI Active Header</div>
                                </div>
                            </div>

                            <!-- Center: Navigation Links -->
                            <nav class="hidden lg:flex items-center gap-1.5 text-xs font-bold text-bx-muted bg-[var(--bx-table-header)] p-1.5 rounded-2xl border border-bx-border">
                                <a href="#breakpoints" class="px-4 py-2 rounded-xl bg-[var(--bx-surface-solid)] text-bx-primary font-black border border-bx-border shadow-xs">الرئيسية</a>
                                <a href="#cards" class="px-3.5 py-2 rounded-xl hover:text-bx-title hover:bg-[var(--bx-surface-solid)]/60 transition-all">المكونات</a>
                                <a href="#tables" class="px-3.5 py-2 rounded-xl hover:text-bx-title hover:bg-[var(--bx-surface-solid)]/60 transition-all">قواعد البيانات</a>
                                <a href="#modals" class="px-3.5 py-2 rounded-xl hover:text-bx-title hover:bg-[var(--bx-surface-solid)]/60 transition-all">النوافذ</a>
                                <a href="#navbar" class="px-3.5 py-2 rounded-xl hover:text-bx-title hover:bg-[var(--bx-surface-solid)]/60 transition-all">أشرطة التنقل</a>
                            </nav>

                            <!-- Left: Quick Tools & Dismiss -->
                            <div class="flex items-center gap-2.5 shrink-0">
                                <button type="button" onclick="showToast('info', 'اللغة', 'تم التبديل')" class="px-3 py-2 rounded-xl border border-bx-border bg-[var(--bx-table-header)] text-xs font-black text-bx-title hover:border-bx-primary transition-all">
                                    AR | EN
                                </button>
                                <button onclick="toggleTheme()" class="w-10 h-10 rounded-xl border border-bx-border hover:border-bx-primary bg-[var(--bx-table-header)] flex items-center justify-center text-bx-title transition-all" title="تبديل الثيم">
                                    <i data-lucide="moon" class="w-4 h-4"></i>
                                </button>
                                <button onclick="openModal('createRecordModal')" class="bx-btn bx-btn-primary text-xs !h-10 px-4.5 rounded-xl shadow-md">
                                    <span>سجل جديد</span>
                                    <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                                </button>
                                <button onclick="dismissLivePageHeader()" class="w-10 h-10 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-all shadow-sm" title="إغلاق شريط المعاينة">
                                    <i data-lucide="x" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            } else if (styleNum === 2) {
                styleName = 'الشكل 2: شريط التطبيقات ولوحة التحكم (Enterprise App Header)';
                headerHTML = `
                    <div class="w-full bg-[var(--bx-surface-solid)]/95 backdrop-blur-xl border-b border-bx-border shadow-2xl transition-all duration-300">
                        <div class="w-full px-4 sm:px-8 lg:px-12 py-6 flex items-center justify-between gap-5">
                            <!-- Right: Official Logo with Cloud Context -->
                            <div class="flex items-center gap-3.5 shrink-0">
                                <div class="w-12 h-12 flex items-center justify-center shrink-0 transition-transform hover:scale-105">
                                    <img src="assets/logo.png" alt="Taqniya Logo" class="w-full h-full object-contain">
                                </div>
                                <div class="hidden sm:block space-y-0.5 border-r border-bx-border pr-3.5">
                                    <div class="flex items-center gap-2">
                                        <span class="font-black text-sm text-bx-title">منظومة تقنية السحابية</span>
                                        <span class="bx-tag text-[9px] py-0.5 px-2 text-emerald-600 border-emerald-500/30">Enterprise</span>
                                    </div>
                                    <div class="text-[10px] text-bx-muted font-bold flex items-center gap-1.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        <span>مركز التحكم الموحد · الرياض</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Center: Search Command Bar (Expanded) -->
                            <div class="relative w-full max-w-2xl mx-auto">
                                <div class="flex items-center w-full !h-12 px-4 rounded-2xl border border-bx-border bg-[var(--bx-table-header)] focus-within:border-bx-primary focus-within:ring-4 focus-within:ring-bx-primary/10 transition-all shadow-inner">
                                    <i data-lucide="search" class="w-4 h-4 text-bx-primary shrink-0 ml-3"></i>
                                    <input type="text" placeholder="بحث شامل بالسجلات، الأوامر، والخدمات المعمارية..." class="w-full bg-transparent text-xs font-bold text-bx-title placeholder:text-bx-muted outline-none">
                                    <div class="flex items-center gap-2 shrink-0 mr-2">
                                        <span class="hidden md:inline-block px-2 py-1 rounded-lg bg-[var(--bx-surface-solid)] border border-bx-border text-[10px] font-black text-bx-muted">كل السجلات</span>
                                        <kbd class="px-2 py-1 text-[10px] font-mono font-black text-bx-muted bg-[var(--bx-surface-solid)] border border-bx-border rounded-lg shadow-xs">⌘K</kbd>
                                    </div>
                                </div>
                            </div>

                            <!-- Left: Action Tools + Avatar & Dismiss -->
                            <div class="flex items-center gap-3 shrink-0">
                                <button onclick="toggleTheme()" class="w-11 h-11 rounded-2xl border border-bx-border hover:border-bx-primary bg-[var(--bx-table-header)] flex items-center justify-center text-bx-title transition-all" title="تبديل الثيم">
                                    <i data-lucide="moon" class="w-4 h-4"></i>
                                </button>
                                <button onclick="openModal('createRecordModal')" class="bx-btn bx-btn-primary text-xs !h-11 px-4.5 rounded-2xl shadow-md hidden md:flex items-center gap-2">
                                    <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                                    <span>سجل جديد</span>
                                </button>

                                <div class="relative">
                                    <div onclick="toggleDropdown('liveUserTopMenu')" class="flex items-center gap-2 p-1.5 pl-3 rounded-2xl border border-bx-border bg-[var(--bx-table-header)] cursor-pointer hover:border-bx-primary transition-all">
                                        <div class="relative">
                                            <img src="assets/avatar_3d_1.png" alt="Avatar" class="w-10 h-10 rounded-xl object-cover">
                                            <span class="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[var(--bx-surface-solid)]"></span>
                                        </div>
                                        <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-bx-muted"></i>
                                    </div>

                                    <!-- Interactive Dropdown -->
                                    <div id="liveUserTopMenu" class="hidden bx-dropdown-menu !w-64 left-0 right-auto z-50 p-2 space-y-1 shadow-2xl">
                                        <div class="p-2.5 rounded-xl bg-[var(--bx-table-header)] border border-bx-border space-y-0.5">
                                            <div class="flex items-center justify-between">
                                                <span class="text-xs font-black text-bx-title">م. خالد العمري</span>
                                                <span class="bx-tag border-emerald-500/30 text-emerald-600 text-[9px] py-0.5">Admin</span>
                                            </div>
                                            <div class="text-[10px] text-bx-muted font-bold">Enterprise Architect</div>
                                        </div>
                                        <div class="py-1 space-y-0.5 text-xs font-bold">
                                            <div onclick="showToast('info', 'التنبيهات', 'لديك 3 سجلات معمارية قيد المراجعة'); toggleDropdown('liveUserTopMenu')" class="bx-dropdown-item flex items-center justify-between py-2 px-2.5">
                                                <div class="flex items-center gap-2"><i data-lucide="bell" class="w-4 h-4 text-bx-primary"></i><span>التنبيهات والإشعارات</span></div>
                                                <span class="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center">3</span>
                                            </div>
                                            <div onclick="openDrawer(); toggleDropdown('liveUserTopMenu')" class="bx-dropdown-item flex items-center justify-between py-2 px-2.5">
                                                <div class="flex items-center gap-2"><i data-lucide="settings" class="w-4 h-4 text-bx-muted"></i><span>إعدادات وتخصيص المنظومة</span></div>
                                            </div>
                                            <div onclick="showToast('success', 'البيئة السحابية', 'أنت متصل بسحابة الرياض me-central2'); toggleDropdown('liveUserTopMenu')" class="bx-dropdown-item flex items-center justify-between py-2 px-2.5">
                                                <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span>سحابة الرياض (me-central2)</span></div>
                                                <span class="text-[10px] font-mono text-emerald-500">Live</span>
                                            </div>
                                        </div>
                                        <div class="pt-1 border-t border-bx-divider">
                                            <div onclick="showToast('error', 'تسجيل الخروج', 'تم قفل الجلسة الحالية بنجاح'); toggleDropdown('liveUserTopMenu')" class="bx-dropdown-item flex items-center gap-2 py-2 px-2.5 text-red-500 hover:bg-red-500/10">
                                                <i data-lucide="log-out" class="w-4 h-4"></i><span>تسجيل الخروج</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button onclick="dismissLivePageHeader()" class="w-11 h-11 rounded-2xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-all shadow-sm" title="إغلاق شريط المعاينة">
                                    <i data-lucide="x" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            } else if (styleNum === 3) {
                styleName = 'الشكل 3: الكبسولة العائمة المستقلة (Minimal Floating Capsule)';
                headerHTML = `
                    <div class="w-full py-4 px-4 sm:px-8 flex justify-center bg-gradient-to-b from-[var(--bx-canvas)] to-transparent">
                        <nav class="max-w-4xl w-full rounded-full px-5 py-2.5 border-2 border-bx-border bg-[var(--bx-surface-solid)]/95 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3 transition-all hover:border-bx-primary/40">
                            <div class="flex items-center gap-2.5 pr-1">
                                <div class="w-8 h-8 flex items-center justify-center shrink-0">
                                    <img src="assets/logo.png" alt="Taqniya Logo" class="w-full h-full object-contain">
                                </div>
                                <span class="font-black text-xs sm:text-sm text-bx-title">تقنية Spatial</span>
                            </div>

                            <div class="hidden sm:flex items-center gap-1 text-xs font-bold">
                                <a href="#breakpoints" class="px-3.5 py-1.5 rounded-full bg-bx-pill text-bx-primary font-black border border-bx-primary/20">نظرة عامة</a>
                                <a href="#cards" class="px-3.5 py-1.5 rounded-full text-bx-muted hover:text-bx-title hover:bg-[var(--bx-table-header)] transition-all">المعمارية</a>
                                <a href="#tables" class="px-3.5 py-1.5 rounded-full text-bx-muted hover:text-bx-title hover:bg-[var(--bx-table-header)] transition-all">قواعد البيانات</a>
                                <a href="#navbar" class="px-3.5 py-1.5 rounded-full text-bx-muted hover:text-bx-title hover:bg-[var(--bx-table-header)] transition-all">الأشرطة</a>
                            </div>

                            <div class="flex items-center gap-2">
                                <button onclick="openModal('wizardModal')" class="bx-btn bx-btn-primary text-xs !h-8.5 px-4 rounded-full shadow-md">
                                    <i data-lucide="rocket" class="w-3.5 h-3.5"></i>
                                    <span>تدشين سريع</span>
                                </button>
                                <button onclick="dismissLivePageHeader()" class="w-8 h-8 rounded-full border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-all shadow-sm" title="إغلاق المعاينة">
                                    <i data-lucide="x" class="w-3.5 h-3.5"></i>
                                </button>
                            </div>
                        </nav>
                    </div>
                `;
            } else if (styleNum === 4) {
                styleName = 'الشكل 4: شريط مساحة العمل متعدد الأدوات (Floating Workspace Island)';
                headerHTML = `
                    <div class="w-full py-4 px-4 sm:px-8 flex justify-center bg-gradient-to-b from-[var(--bx-canvas)] to-transparent">
                        <nav class="max-w-5xl w-full rounded-3xl p-3.5 border-2 border-bx-border bg-[var(--bx-surface-solid)]/95 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3 transition-all hover:border-bx-primary/40">
                            <div class="flex items-center gap-2.5">
                                <div class="w-9 h-9 flex items-center justify-center shrink-0">
                                    <img src="assets/logo.png" alt="Taqniya Logo" class="w-full h-full object-contain">
                                </div>
                                <div class="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border text-xs font-bold">
                                    <i data-lucide="folder-git-2" class="w-3.5 h-3.5 text-bx-primary"></i>
                                    <span class="text-bx-title font-black">مشروع تقنية 3.0</span>
                                </div>
                                <div class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-black">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span>38ms</span>
                                </div>
                            </div>

                            <div class="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border text-xs font-bold">
                                <button type="button" class="px-3.5 py-1.5 rounded-xl bg-[var(--bx-surface-solid)] text-bx-primary border border-bx-border font-black shadow-xs">واجهات UI</button>
                                <button type="button" class="px-3.5 py-1.5 rounded-xl text-bx-muted hover:text-bx-title transition-all">قواعد البيانات</button>
                                <button type="button" class="px-3.5 py-1.5 rounded-xl text-bx-muted hover:text-bx-title transition-all">خدمات API</button>
                            </div>

                            <div class="flex items-center gap-2">
                                <button type="button" onclick="showToast('info', 'اللغة', 'تم التبديل')" class="px-2.5 py-1.5 rounded-xl border border-bx-border bg-[var(--bx-table-header)] text-xs font-black text-bx-title hover:border-bx-primary transition-all">
                                    AR | EN
                                </button>
                                <button onclick="openModal('createRecordModal')" class="bx-btn bx-btn-primary text-xs !h-9 px-4 rounded-xl shadow-md">
                                    <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                                    <span class="hidden sm:inline">سجل جديد</span>
                                </button>
                                <button onclick="dismissLivePageHeader()" class="w-9 h-9 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-all shadow-sm" title="إغلاق المعاينة">
                                    <i data-lucide="x" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </nav>
                    </div>
                `;
            }

            mount.innerHTML = headerHTML;
            mount.classList.remove('hidden');
            
            // Re-initialize lucide icons for injected elements
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }

            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            showToast('success', 'المعاينة الحية للـ Navbar', `تم تفعيل (${styleName}) في أعلى الصفحة بنجاح! 🚀`);
        }

        function dismissLivePageHeader() {
            const mount = document.getElementById('liveActiveNavbarMount');
            if (mount) {
                mount.classList.add('hidden');
                mount.innerHTML = '';
                showToast('info', 'إغلاق المعاينة', 'تمت إزالة الـ Header النشط من أعلى الصفحة');
            }
        }

        // ================= SMOOTH ANCHOR NAVIGATION & DYNAMIC OFFSET =================
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

                    // Calculate dynamic header offset (accounts for live active navbar if mounted)
                    const liveMount = document.getElementById('liveActiveNavbarMount');
                    const liveMountHeight = (liveMount && !liveMount.classList.contains('hidden')) ? liveMount.offsetHeight : 0;
                    const topOffset = liveMountHeight + 28;

                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - topOffset;

                    window.scrollTo({
                        top: Math.max(0, offsetPosition),
                        behavior: 'smooth'
                    });

                    // Update URL hash smoothly without instant browser jump
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    } else {
                        location.hash = href;
                    }

                    // Elegant target section highlight pulse
                    targetElement.classList.remove('section-target-highlight');
                    void targetElement.offsetWidth; // Force reflow
                    targetElement.classList.add('section-target-highlight');
                    setTimeout(() => {
                        targetElement.classList.remove('section-target-highlight');
                    }, 1400);
                }
            });
        });