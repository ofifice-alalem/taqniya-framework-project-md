/**
 * 17-breadcrumb component.js
 * Breadcrumb Trail Navigation Controller
 */

function setBreadcrumbActive(linkElement) {
    const parent = linkElement.closest('.bx-breadcrumb');
    if (!parent) return;

    parent.querySelectorAll('.bx-breadcrumb-item').forEach(item => {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
    });

    const currentItem = linkElement.closest('.bx-breadcrumb-item');
    if (currentItem) {
        currentItem.classList.add('active');
        currentItem.setAttribute('aria-current', 'page');
    }
}
