/**
 * 16-badge component.js
 * Badges, Tags & Chips Logic
 */

function removeChip(btn) {
    const chip = btn.closest('.bx-chip') || btn.parentElement;
    if (chip) {
        chip.style.transition = 'all 0.2s ease';
        chip.style.opacity = '0';
        chip.style.transform = 'scale(0.8)';
        setTimeout(() => chip.remove(), 200);
    }
}
