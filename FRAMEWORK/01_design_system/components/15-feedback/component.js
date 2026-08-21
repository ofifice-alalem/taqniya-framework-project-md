/**
 * 15-feedback component.js
 * Floating Toast Engine & Feedback Alerts Controller
 */

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
