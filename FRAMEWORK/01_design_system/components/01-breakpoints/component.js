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
        activeLabel = 'xs (<576px)';
    }

    if (badgeDisplay) badgeDisplay.textContent = activeLabel;

    document.querySelectorAll('#breakpointsTable tbody tr').forEach(tr => {
        tr.classList.remove('font-black');
        tr.style.backgroundColor = '';
        const statusCol = tr.querySelector('.bp-status');
        if (statusCol) statusCol.innerHTML = '<span class="text-xs text-bx-muted opacity-30 font-mono">—</span>';
    });

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

window.addEventListener('resize', updateLiveBreakpoints);
document.addEventListener('DOMContentLoaded', updateLiveBreakpoints);
