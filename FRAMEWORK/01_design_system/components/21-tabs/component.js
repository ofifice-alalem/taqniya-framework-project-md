/**
 * 21-tabs component.js
 * Interactive Tabs Switcher Engine
 */

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
