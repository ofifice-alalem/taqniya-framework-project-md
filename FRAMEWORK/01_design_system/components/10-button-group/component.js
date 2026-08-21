/**
 * 10-button-group component.js
 * Segmented Controls & Button Groups Logic
 */

function setSegmentedRadio(btn, label) {
    const parent = btn.parentElement;
    if (parent) {
        parent.querySelectorAll('button').forEach(b => {
            b.classList.remove('bg-bx-primary', 'text-white', 'shadow-xs', 'font-black');
            b.classList.add('text-bx-muted');
        });
        btn.classList.add('bg-bx-primary', 'text-white', 'shadow-xs', 'font-black');
        btn.classList.remove('text-bx-muted');
    }
    if (typeof showToast === 'function') {
        showToast('info', 'التحكم المقسم (Segmented Radio)', 'تم اختيار: ' + label);
    }
}

function toggleSegmentedCheckbox(btn) {
    const isActive = btn.classList.contains('bg-bx-primary');
    if (isActive) {
        btn.classList.remove('bg-bx-primary', 'text-white', 'font-black');
        btn.classList.add('text-bx-muted');
    } else {
        btn.classList.add('bg-bx-primary', 'text-white', 'font-black');
        btn.classList.remove('text-bx-muted');
    }
}

function toggleToolbarBtn(btn) {
    btn.classList.toggle('bg-bx-primary');
    btn.classList.toggle('text-white');
}

function setToolbarRadio(btn) {
    const parent = btn.parentElement;
    if (parent) {
        parent.querySelectorAll('button').forEach(b => {
            b.classList.remove('bg-bx-primary', 'text-white');
        });
        btn.classList.add('bg-bx-primary', 'text-white');
    }
}
