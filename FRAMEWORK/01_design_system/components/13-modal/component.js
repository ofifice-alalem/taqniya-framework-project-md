/**
 * 13-modal component.js
 * Comprehensive Modal Dialogs Controller & Step Wizard Engine
 */

// ================= 1. MODAL OPEN/CLOSE ENGINE =================
function openModal(modalId) {
    closeAllModals();
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Modal not found:', modalId);
        return;
    }
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    if (modalId === 'wizardModal') {
        updateWizardUI();
    }

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
    const anyOpen = document.querySelectorAll('.bx-modal-card:not(.hidden), [id$="Modal"]:not(.hidden)');
    let stillOpen = false;
    anyOpen.forEach(m => {
        if (m.offsetParent !== null && !m.classList.contains('hidden')) stillOpen = true;
    });
    if (!stillOpen) {
        document.body.style.overflow = '';
    }
}

function closeAllModals() {
    document.querySelectorAll('[id$="Modal"]').forEach(m => {
        m.classList.add('hidden');
        m.style.display = 'none';
    });
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// ================= 2. MULTI-STEP WIZARD ENGINE =================
let currentWizardStep = 1;
const totalWizardSteps = 3;

function setWizardStep(step) {
    currentWizardStep = step;
    updateWizardUI();
}

function wizardNextStep() {
    if (currentWizardStep < totalWizardSteps) {
        currentWizardStep++;
        updateWizardUI();
    } else {
        finishWizard();
    }
}

function wizardPrevStep() {
    if (currentWizardStep > 1) {
        currentWizardStep--;
        updateWizardUI();
    }
}

function finishWizard() {
    closeModal('wizardModal');
    if (typeof showToast === 'function') {
        showToast('success', 'تدشين المنظومة', 'تم إكمال كافة خطوات التهيئة وتدشين المنظومة بنجاح!');
    }
}

function updateWizardUI() {
    const counter = document.getElementById('wizStepCounter');
    if (counter) {
        counter.textContent = 'الخطوة ' + currentWizardStep + ' من ' + totalWizardSteps;
    }

    for (let i = 1; i <= totalWizardSteps; i++) {
        const pane = document.getElementById('wizPane-' + i);
        const badge = document.getElementById('wizBadge-' + i);
        const label = document.getElementById('wizLabel-' + i);
        const line = document.getElementById('wizLine-' + i);

        if (pane) {
            if (i === currentWizardStep) {
                pane.classList.remove('hidden');
            } else {
                pane.classList.add('hidden');
            }
        }

        if (badge) {
            if (i <= currentWizardStep) {
                badge.className = 'w-9 h-9 rounded-2xl bg-bx-primary text-white font-black text-xs flex items-center justify-center shadow-md transition-all';
                if (i < currentWizardStep) {
                    badge.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
                } else {
                    badge.textContent = i;
                }
            } else {
                badge.className = 'w-9 h-9 rounded-2xl bg-transparent border-2 border-bx-border text-bx-muted font-black text-xs flex items-center justify-center transition-all';
                badge.textContent = i;
            }
        }

        if (label) {
            if (i === currentWizardStep) {
                label.className = 'text-[11px] font-black text-bx-primary';
            } else {
                label.className = 'text-[11px] font-bold text-bx-muted';
            }
        }

        if (line) {
            if (i < currentWizardStep) {
                line.className = 'h-1 flex-1 rounded-full bg-bx-primary transition-all';
            } else {
                line.className = 'h-1 flex-1 rounded-full bg-bx-border transition-all';
            }
        }
    }

    const prevBtn = document.getElementById('wizPrevBtn');
    const nextBtn = document.getElementById('wizNextBtn');

    if (prevBtn) {
        if (currentWizardStep === 1) {
            prevBtn.disabled = true;
            prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            prevBtn.disabled = false;
            prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    if (nextBtn) {
        if (currentWizardStep === totalWizardSteps) {
            nextBtn.innerHTML = '<span>تدشين المنظومة</span><i data-lucide="rocket" class="w-4 h-4"></i>';
        } else {
            nextBtn.innerHTML = '<span>التالي</span><i data-lucide="arrow-left" class="w-4 h-4"></i>';
        }
    }

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

// ================= 3. LAYER SELECTION IN CREATE RECORD MODAL =================
function selectModalLayer(layer, label, element) {
    const valDisplay = document.getElementById('modalLayerVal');
    if (valDisplay) {
        valDisplay.innerHTML = '<span>' + label + '</span>';
    }
    const menu = document.getElementById('modalLayerMenu');
    if (menu) {
        menu.classList.add('hidden');
    }
}

// ================= 4. STAR RATING IN FEEDBACK MODAL =================
function rateStar(count) {
    const stars = document.querySelectorAll('#starRatingContainer .star-btn');
    stars.forEach((s, idx) => {
        if (idx < count) {
            s.className = 'star-btn text-amber-400 fill-amber-400 hover:scale-125 transition-transform cursor-pointer';
        } else {
            s.className = 'star-btn text-bx-border hover:scale-125 transition-transform cursor-pointer';
        }
    });
}

function submitRecord() {
    closeModal('createRecordModal');
    if (typeof showToast === 'function') {
        showToast('success', 'إنشاء السجل المعماري', 'تم حفظ السجل الجديد وإدراجه في جدول المعمارية بنجاح!');
    }
}

function confirmDelete() {
    closeModal('deleteModal');
    if (typeof showToast === 'function') {
        showToast('error', 'حذف السجل', 'تم حذف السجل من قاعدة البيانات بشكل نهائي.');
    }
}
