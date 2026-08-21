/**
 * 23-offcanvas component.js
 * 4-Directional Offcanvas & Slide Drawers Engine (Zero-Peek Guaranteed)
 */

function openOffcanvas(direction) {
    // 1. Close any open drawer first
    ['right', 'left', 'top', 'bottom'].forEach(dir => {
        const dId = 'offcanvas' + dir.charAt(0).toUpperCase() + dir.slice(1);
        const d = document.getElementById(dId);
        if (d) {
            if (dir === 'right') { d.classList.remove('translate-x-0'); d.classList.add('translate-x-full'); }
            else if (dir === 'left') { d.classList.remove('translate-x-0'); d.classList.add('-translate-x-full'); }
            else if (dir === 'top') { d.classList.remove('translate-y-0'); d.classList.add('-translate-y-full'); }
            else if (dir === 'bottom') { d.classList.remove('translate-y-0'); d.classList.add('translate-y-full'); }
            d.classList.remove('bx-drawer-open');
        }
    });

    // 2. Show Backdrop
    const backdrop = document.getElementById('offcanvasBackdrop');
    if (backdrop) {
        backdrop.classList.remove('hidden');
        backdrop.style.display = 'block';
    }

    // 3. Open requested drawer
    const drawerId = 'offcanvas' + direction.charAt(0).toUpperCase() + direction.slice(1);
    const drawer = document.getElementById(drawerId);

    if (drawer) {
        drawer.classList.add('bx-drawer-open');
        void drawer.offsetHeight; // Force reflow

        if (direction === 'right') {
            drawer.classList.remove('translate-x-full');
            drawer.classList.add('translate-x-0');
        } else if (direction === 'left') {
            drawer.classList.remove('-translate-x-full');
            drawer.classList.add('translate-x-0');
        } else if (direction === 'top') {
            drawer.classList.remove('-translate-y-full');
            drawer.classList.add('translate-y-0');
        } else if (direction === 'bottom') {
            drawer.classList.remove('translate-y-full');
            drawer.classList.add('translate-y-0');
        }
    }

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

function closeOffcanvas(direction) {
    const drawerId = 'offcanvas' + direction.charAt(0).toUpperCase() + direction.slice(1);
    const drawer = document.getElementById(drawerId);

    if (drawer) {
        if (direction === 'right') {
            drawer.classList.remove('translate-x-0');
            drawer.classList.add('translate-x-full');
        } else if (direction === 'left') {
            drawer.classList.remove('translate-x-0');
            drawer.classList.add('-translate-x-full');
        } else if (direction === 'top') {
            drawer.classList.remove('translate-y-0');
            drawer.classList.add('-translate-y-full');
        } else if (direction === 'bottom') {
            drawer.classList.remove('translate-y-0');
            drawer.classList.add('translate-y-full');
        }

        setTimeout(() => {
            if (!drawer.classList.contains('translate-x-0') && !drawer.classList.contains('translate-y-0')) {
                drawer.classList.remove('bx-drawer-open');
            }
        }, 300);
    }

    const backdrop = document.getElementById('offcanvasBackdrop');
    if (backdrop) {
        backdrop.classList.add('hidden');
        backdrop.style.display = 'none';
    }
}

function closeAllOffcanvas() {
    ['right', 'left', 'top', 'bottom'].forEach(dir => {
        const drawerId = 'offcanvas' + dir.charAt(0).toUpperCase() + dir.slice(1);
        const drawer = document.getElementById(drawerId);
        if (drawer) {
            if (dir === 'right') {
                drawer.classList.remove('translate-x-0');
                drawer.classList.add('translate-x-full');
            } else if (dir === 'left') {
                drawer.classList.remove('translate-x-0');
                drawer.classList.add('-translate-x-full');
            } else if (dir === 'top') {
                drawer.classList.remove('translate-y-0');
                drawer.classList.add('-translate-y-full');
            } else if (dir === 'bottom') {
                drawer.classList.remove('translate-y-0');
                drawer.classList.add('translate-y-full');
            }
            setTimeout(() => {
                drawer.classList.remove('bx-drawer-open');
            }, 300);
        }
    });

    const backdrop = document.getElementById('offcanvasBackdrop');
    if (backdrop) {
        backdrop.classList.add('hidden');
        backdrop.style.display = 'none';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllOffcanvas();
    }
});
