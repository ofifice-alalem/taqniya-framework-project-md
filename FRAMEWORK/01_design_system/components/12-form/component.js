/**
 * 12-form component.js
 * Comprehensive Form Studio, Live Validation, Dropdown & Multi-Select Logic
 */

// ================= 1. CLIENT-SIDE VALIDATION =================
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

// ================= 2. DROPDOWNS & SINGLE SELECT =================
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

// ================= 3. MULTI-SELECT WITH FUZZY SEARCH =================
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

// Global outside click listener to close dropdowns
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

// Run render immediately and on DOM load
renderMultiChips();
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderMultiChips);
}
window.addEventListener('load', renderMultiChips);
