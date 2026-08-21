/**
 * 06-table component.js
 * Comprehensive Table Selection, Filtering, Search, and Bulk Actions Engine
 */

function toggleSelectAll(masterCb) {
    const checkboxes = document.querySelectorAll('.tbl-check');
    checkboxes.forEach(cb => {
        cb.checked = masterCb.checked;
        const row = cb.closest('tr');
        if (row) {
            if (masterCb.checked) {
                row.classList.add('bg-[var(--bx-row-active)]');
            } else {
                row.classList.remove('bg-[var(--bx-row-active)]');
            }
        }
    });
    updateBulkBar();
}

function updateBulkBar() {
    const allCbs = document.querySelectorAll('.tbl-check');
    const checkedCbs = document.querySelectorAll('.tbl-check:checked');
    const bulkBar = document.getElementById('bulkBarFloating');
    const bulkText = document.getElementById('bulkText');
    const masterCb = document.querySelector('thead input[type="checkbox"]');

    // Update row highlighting
    allCbs.forEach(cb => {
        const row = cb.closest('tr');
        if (row) {
            if (cb.checked) {
                row.classList.add('bg-[var(--bx-row-active)]');
            } else {
                row.classList.remove('bg-[var(--bx-row-active)]');
            }
        }
    });

    if (bulkBar && bulkText) {
        if (checkedCbs.length > 0) {
            bulkText.textContent = 'تم تحديد ' + checkedCbs.length + ' عناصر';
            bulkBar.style.display = 'flex';
        } else {
            bulkBar.style.display = 'none';
        }
    }

    if (masterCb) {
        masterCb.checked = (allCbs.length > 0 && checkedCbs.length === allCbs.length);
    }
}

function unselectAll() {
    const allCbs = document.querySelectorAll('.tbl-check');
    allCbs.forEach(cb => {
        cb.checked = false;
        const row = cb.closest('tr');
        if (row) row.classList.remove('bg-[var(--bx-row-active)]');
    });

    const masterCb = document.querySelector('thead input[type="checkbox"]');
    if (masterCb) masterCb.checked = false;

    const bulkBar = document.getElementById('bulkBarFloating');
    if (bulkBar) bulkBar.style.display = 'none';
}

function filterTable(status, btn) {
    // 1. Update filter buttons UI
    const buttons = document.querySelectorAll('#sec-tables-body button[onclick*="filterTable"]');
    buttons.forEach(b => {
        b.classList.remove('bx-btn-primary');
        b.classList.add('bx-btn-outline');
    });

    // Mark current button active
    if (btn) {
        btn.classList.add('bx-btn-primary');
        btn.classList.remove('bx-btn-outline');
    } else if (event && event.currentTarget) {
        event.currentTarget.classList.add('bx-btn-primary');
        event.currentTarget.classList.remove('bx-btn-outline');
    }

    // 2. Filter Rows
    const rows = document.querySelectorAll('#tblBody tr');
    rows.forEach(r => {
        const rowStatus = r.getAttribute('data-status') || '';
        if (status === 'all' || rowStatus === status) {
            r.style.display = '';
        } else {
            r.style.display = 'none';
        }
    });
}

function filterRows(query) {
    const q = (query || '').trim().toLowerCase();
    const rows = document.querySelectorAll('#tblBody tr');
    rows.forEach(r => {
        const text = r.textContent.toLowerCase();
        if (!q || text.includes(q)) {
            r.style.display = '';
        } else {
            r.style.display = 'none';
        }
    });
}
