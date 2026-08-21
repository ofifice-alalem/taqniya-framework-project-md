function setAlignmentMode(mode, btn) {
    const box = document.getElementById('alignPlayground');
    const label = document.getElementById('alignCodeLabel');
    if (!box || !label) return;

    box.className = 'h-[360px] rounded-2xl border border-bx-border flex p-6 transition-all duration-300 relative overflow-hidden';
    
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
    }

    document.querySelectorAll('.align-mode-btn').forEach(b => {
        b.classList.remove('active', 'bg-[var(--bx-primary)]', 'text-white');
    });
    if (btn) {
        btn.classList.add('active', 'bg-[var(--bx-primary)]', 'text-white');
    }
}
