/**
 * 04-typography component.js
 * Interactive Font Lab Logic
 */

function updateFontFamily(fontFamily, btn) {
    const preview = document.getElementById('fontPreview');
    if (preview) {
        preview.style.fontFamily = fontFamily;
        preview.style.fontWeight = '700';
    }
    if (btn && btn.parentElement) {
        btn.parentElement.querySelectorAll('.font-lab-family-btn').forEach(b => {
            b.classList.remove('bg-bx-primary', 'text-white');
            b.classList.add('text-bx-muted');
        });
        btn.classList.add('bg-bx-primary', 'text-white');
        btn.classList.remove('text-bx-muted');
    }
}

function updateFontSlider(val) {
    const preview = document.getElementById('fontPreview');
    const label = document.getElementById('fontLabel');
    if (preview) {
        preview.style.fontSize = val + 'px';
    }
    if (label) {
        label.textContent = val + 'px';
    }
}

function updateFontLive(text) {
    const preview = document.getElementById('fontPreview');
    if (preview) {
        preview.textContent = text || 'اكتب نصاً للمعاينة...';
    }
}
