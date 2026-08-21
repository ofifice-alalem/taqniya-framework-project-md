/**
 * 18-accordion component.js
 * Accordion Items Controller, Expand All & Collapse All Engine
 */

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
