/**
 * 19-collapse component.js
 * Collapsible Code Schema, Filter Panels & Dropdowns Controller
 */

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

function selectDropdown(valId, menuId, textOrHtml, item) {
    const valEl = document.getElementById(valId);
    if (valEl) {
        valEl.innerHTML = textOrHtml;
    }
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.classList.add('hidden');
    }
    if (item) {
        const parentMenu = item.closest('.bx-dropdown-menu');
        if (parentMenu) {
            parentMenu.querySelectorAll('.bx-dropdown-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const radio = item.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        }
    }
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

function toggleDropdown(menuId) {
    const menu = document.getElementById(menuId);
    if (!menu) return;
    const isHidden = menu.classList.contains('hidden');
    document.querySelectorAll('.bx-dropdown-menu').forEach(m => {
        if (m !== menu) m.classList.add('hidden');
    });
    if (isHidden) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}

function toggleCollapse(targetId, btn) {
    toggleCollapseBlock(targetId, btn);
}
