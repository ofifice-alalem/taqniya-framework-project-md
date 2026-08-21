function setGridGap(gapClass, btn) {
    const container = document.getElementById('liveGridContainer');
    if (container) {
        container.classList.remove('gap-2', 'gap-4', 'gap-6');
        container.classList.add(gapClass);
    }
    if (btn && btn.parentElement) {
        btn.parentElement.querySelectorAll('.grid-gap-btn').forEach(b => {
            b.classList.remove('active', 'bg-[var(--bx-primary)]', 'text-white');
        });
        btn.classList.add('active', 'bg-[var(--bx-primary)]', 'text-white');
    }
}
