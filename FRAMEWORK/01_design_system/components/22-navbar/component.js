/**
 * 22-navbar component.js
 * Live Active Page Navbar Manager (4 Luxury Styles with Interactive Menus)
 */

let currentActiveHeaderStyle = null;

function applyLivePageHeader(styleNum) {
    let mount = document.getElementById('liveActiveNavbarMount');
    if (!mount) {
        mount = document.createElement('div');
        mount.id = 'liveActiveNavbarMount';
        mount.className = 'fixed top-0 inset-x-0 z-[9999] hidden transition-all duration-300';
        document.body.prepend(mount);
    }

    currentActiveHeaderStyle = styleNum;
    let headerHTML = '';
    let styleName = '';

    const assetPrefix = window.location.pathname.includes('/components/') ? '../../assets/images/' : 'assets/images/';

    if (styleNum === 1) {
        styleName = 'الشكل 1: شريط البوابة والتسويق الكلاسيكي (Portal & Marketing)';
        headerHTML = `
            <div class="w-full bg-[var(--bx-surface-solid)]/95 backdrop-blur-xl border-b border-bx-border shadow-2xl transition-all duration-300">
                <div class="w-full px-4 sm:px-8 lg:px-12 py-5 flex items-center justify-between gap-4">
                    <!-- Right: Brand Logo -->
                    <div class="flex items-center gap-3 shrink-0">
                        <div class="w-11 h-11 flex items-center justify-center shrink-0 transition-transform hover:scale-105">
                            <img src="${assetPrefix}logo.png" alt="Taqniya Logo" class="w-full h-full object-contain">
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="font-black text-sm text-bx-title">منظومة تقنية</span>
                                <span class="bx-tag text-[9px] py-0.5 px-2 text-bx-primary border-bx-primary/30">v3.0 Live</span>
                            </div>
                            <div class="text-[10px] text-bx-muted hidden sm:block">Spatial UI Active Header</div>
                        </div>
                    </div>

                    <!-- Center: Navigation Links -->
                    <nav class="hidden lg:flex items-center gap-1.5 text-xs font-bold text-bx-muted bg-[var(--bx-table-header)] p-1.5 rounded-2xl border border-bx-border">
                        <a href="#breakpoints" class="px-4 py-2 rounded-xl bg-[var(--bx-surface-solid)] text-bx-primary font-black border border-bx-border shadow-xs">الرئيسية</a>
                        <a href="#cards" class="px-3.5 py-2 rounded-xl hover:text-bx-title hover:bg-[var(--bx-surface-solid)]/60 transition-all">المكونات</a>
                        <a href="#tables" class="px-3.5 py-2 rounded-xl hover:text-bx-title hover:bg-[var(--bx-surface-solid)]/60 transition-all">قواعد البيانات</a>
                        <a href="#modals" class="px-3.5 py-2 rounded-xl hover:text-bx-title hover:bg-[var(--bx-surface-solid)]/60 transition-all">النوافذ</a>
                        <a href="#navbar" class="px-3.5 py-2 rounded-xl hover:text-bx-title hover:bg-[var(--bx-surface-solid)]/60 transition-all">أشرطة التنقل</a>
                    </nav>

                    <!-- Left: Quick Tools & Dismiss -->
                    <div class="flex items-center gap-2.5 shrink-0">
                        <button type="button" onclick="showToast('info', 'اللغة', 'تم التبديل')" class="px-3 py-2 rounded-xl border border-bx-border bg-[var(--bx-table-header)] text-xs font-black text-bx-title hover:border-bx-primary transition-all">
                            AR | EN
                        </button>
                        <button onclick="toggleTheme()" class="w-10 h-10 rounded-xl border border-bx-border hover:border-bx-primary bg-[var(--bx-table-header)] flex items-center justify-center text-bx-title transition-all" title="تبديل الثيم">
                            <i data-lucide="moon" class="w-4 h-4"></i>
                        </button>
                        <button onclick="openModal('createRecordModal')" class="bx-btn bx-btn-primary text-xs !h-10 px-4.5 rounded-xl shadow-md">
                            <span>سجل جديد</span>
                            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                        </button>
                        <button onclick="dismissLivePageHeader()" class="w-10 h-10 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-all shadow-sm" title="إغلاق شريط المعاينة">
                            <i data-lucide="x" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    } else if (styleNum === 2) {
        styleName = 'الشكل 2: شريط التطبيقات ولوحة التحكم (Enterprise App Header)';
        headerHTML = `
            <div class="w-full bg-[var(--bx-surface-solid)]/95 backdrop-blur-xl border-b border-bx-border shadow-2xl transition-all duration-300">
                <div class="w-full px-4 sm:px-8 lg:px-12 py-6 flex items-center justify-between gap-5">
                    <!-- Right: Official Logo with Cloud Context -->
                    <div class="flex items-center gap-3.5 shrink-0">
                        <div class="w-12 h-12 flex items-center justify-center shrink-0 transition-transform hover:scale-105">
                            <img src="${assetPrefix}logo.png" alt="Taqniya Logo" class="w-full h-full object-contain">
                        </div>
                        <div class="hidden sm:block space-y-0.5 border-r border-bx-border pr-3.5">
                            <div class="flex items-center gap-2">
                                <span class="font-black text-sm text-bx-title">منظومة تقنية السحابية</span>
                                <span class="bx-tag text-[9px] py-0.5 px-2 text-emerald-600 border-emerald-500/30">Enterprise</span>
                            </div>
                            <div class="text-[10px] text-bx-muted font-bold flex items-center gap-1.5">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span>مركز التحكم الموحد · الرياض</span>
                            </div>
                        </div>
                    </div>

                    <!-- Center: Search Command Bar -->
                    <div class="relative w-full max-w-2xl mx-auto">
                        <div class="flex items-center w-full !h-12 px-4 rounded-2xl border border-bx-border bg-[var(--bx-table-header)] focus-within:border-bx-primary focus-within:ring-4 focus-within:ring-bx-primary/10 transition-all shadow-inner">
                            <i data-lucide="search" class="w-4 h-4 text-bx-primary shrink-0 ml-3"></i>
                            <input type="text" placeholder="بحث شامل بالسجلات، الأوامر، والخدمات المعمارية..." class="w-full bg-transparent text-xs font-bold text-bx-title placeholder:text-bx-muted outline-none">
                            <div class="flex items-center gap-2 shrink-0 mr-2">
                                <span class="hidden md:inline-block px-2 py-1 rounded-lg bg-[var(--bx-surface-solid)] border border-bx-border text-[10px] font-black text-bx-muted">كل السجلات</span>
                                <kbd class="px-2 py-1 text-[10px] font-mono font-black text-bx-muted bg-[var(--bx-surface-solid)] border border-bx-border rounded-lg shadow-xs">⌘K</kbd>
                            </div>
                        </div>
                    </div>

                    <!-- Left: Action Tools + Avatar & Dismiss -->
                    <div class="flex items-center gap-3 shrink-0">
                        <button onclick="toggleTheme()" class="w-11 h-11 rounded-2xl border border-bx-border hover:border-bx-primary bg-[var(--bx-table-header)] flex items-center justify-center text-bx-title transition-all" title="تبديل الثيم">
                            <i data-lucide="moon" class="w-4 h-4"></i>
                        </button>
                        <button onclick="openModal('createRecordModal')" class="bx-btn bx-btn-primary text-xs !h-11 px-4.5 rounded-2xl shadow-md hidden md:flex items-center gap-2">
                            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                            <span>سجل جديد</span>
                        </button>

                        <div class="relative">
                            <div onclick="toggleDropdown('liveUserTopMenu')" class="flex items-center gap-2 p-1.5 pl-3 rounded-2xl border border-bx-border bg-[var(--bx-table-header)] cursor-pointer hover:border-bx-primary transition-all">
                                <div class="relative">
                                    <img src="${assetPrefix}avatar_3d_1.png" alt="Avatar" class="w-10 h-10 rounded-xl object-cover">
                                    <span class="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[var(--bx-surface-solid)]"></span>
                                </div>
                                <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-bx-muted"></i>
                            </div>

                            <!-- Interactive User Profile Dropdown Menu -->
                            <div id="liveUserTopMenu" class="hidden bx-dropdown-menu !w-64 left-0 right-auto z-50 p-2 space-y-1 shadow-2xl">
                                <div class="p-2.5 rounded-xl bg-[var(--bx-table-header)] border border-bx-border space-y-0.5">
                                    <div class="flex items-center justify-between">
                                        <span class="text-xs font-black text-bx-title">م. خالد العمري</span>
                                        <span class="bx-tag border-emerald-500/30 text-emerald-600 text-[9px] py-0.5">Admin</span>
                                    </div>
                                    <div class="text-[10px] text-bx-muted font-bold">Enterprise Architect</div>
                                </div>
                                <div class="py-1 space-y-0.5 text-xs font-bold">
                                    <div onclick="showToast('info', 'التنبيهات', 'لديك 3 سجلات معمارية قيد المراجعة'); toggleDropdown('liveUserTopMenu')" class="bx-dropdown-item flex items-center justify-between py-2 px-2.5 cursor-pointer">
                                        <div class="flex items-center gap-2"><i data-lucide="bell" class="w-4 h-4 text-bx-primary"></i><span>التنبيهات والإشعارات</span></div>
                                        <span class="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center">3</span>
                                    </div>
                                    <div onclick="openDrawer(); toggleDropdown('liveUserTopMenu')" class="bx-dropdown-item flex items-center justify-between py-2 px-2.5 cursor-pointer">
                                        <div class="flex items-center gap-2"><i data-lucide="settings" class="w-4 h-4 text-bx-muted"></i><span>إعدادات وتخصيص المنظومة</span></div>
                                    </div>
                                    <div onclick="showToast('success', 'البيئة السحابية', 'أنت متصل بسحابة الرياض me-central2'); toggleDropdown('liveUserTopMenu')" class="bx-dropdown-item flex items-center justify-between py-2 px-2.5 cursor-pointer">
                                        <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span>سحابة الرياض (me-central2)</span></div>
                                        <span class="text-[10px] font-mono text-emerald-500">Live</span>
                                    </div>
                                </div>
                                <div class="pt-1 border-t border-bx-divider">
                                    <div onclick="showToast('error', 'تسجيل الخروج', 'تم قفل الجلسة الحالية بنجاح'); toggleDropdown('liveUserTopMenu')" class="bx-dropdown-item flex items-center gap-2 py-2 px-2.5 text-red-500 hover:bg-red-500/10 cursor-pointer">
                                        <i data-lucide="log-out" class="w-4 h-4"></i><span>تسجيل الخروج</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button onclick="dismissLivePageHeader()" class="w-11 h-11 rounded-2xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-all shadow-sm" title="إغلاق شريط المعاينة">
                            <i data-lucide="x" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    } else if (styleNum === 3) {
        styleName = 'الشكل 3: الكبسولة العائمة المستقلة (Minimal Floating Capsule)';
        headerHTML = `
            <div class="w-full py-4 px-4 sm:px-8 flex justify-center bg-gradient-to-b from-[var(--bx-canvas)] to-transparent">
                <nav class="max-w-4xl w-full rounded-full px-5 py-2.5 border-2 border-bx-border bg-[var(--bx-surface-solid)]/95 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3 transition-all hover:border-bx-primary/40">
                    <div class="flex items-center gap-2.5 pr-1">
                        <div class="w-8 h-8 flex items-center justify-center shrink-0">
                            <img src="${assetPrefix}logo.png" alt="Taqniya Logo" class="w-full h-full object-contain">
                        </div>
                        <span class="font-black text-xs sm:text-sm text-bx-title">تقنية Spatial</span>
                    </div>

                    <div class="hidden sm:flex items-center gap-1 text-xs font-bold">
                        <a href="#breakpoints" class="px-3.5 py-1.5 rounded-full bg-bx-pill text-bx-primary font-black border border-bx-primary/20">نظرة عامة</a>
                        <a href="#cards" class="px-3.5 py-1.5 rounded-full text-bx-muted hover:text-bx-title hover:bg-[var(--bx-table-header)] transition-all">المعمارية</a>
                        <a href="#navbar" class="px-3.5 py-1.5 rounded-full text-bx-muted hover:text-bx-title hover:bg-[var(--bx-table-header)] transition-all">الأشرطة</a>
                    </div>

                    <div class="flex items-center gap-2">
                        <button onclick="showToast('info', 'تدشين سريع', 'تم تفعيل معالج التدشين السريع')" class="bx-btn bx-btn-primary text-xs !h-8.5 px-4 rounded-full shadow-md">
                            <i data-lucide="rocket" class="w-3.5 h-3.5"></i>
                            <span>تدشين سريع</span>
                        </button>
                        <button onclick="dismissLivePageHeader()" class="w-8 h-8 rounded-full border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-all shadow-sm" title="إغلاق المعاينة">
                            <i data-lucide="x" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                </nav>
            </div>
        `;
    } else if (styleNum === 4) {
        styleName = 'الشكل 4: شريط مساحة العمل متعدد الأدوات (Floating Workspace Island)';
        headerHTML = `
            <div class="w-full py-4 px-4 sm:px-8 flex justify-center bg-gradient-to-b from-[var(--bx-canvas)] to-transparent">
                <nav class="max-w-5xl w-full rounded-3xl p-3.5 border-2 border-bx-border bg-[var(--bx-surface-solid)]/95 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3 transition-all hover:border-bx-primary/40">
                    <div class="flex items-center gap-2.5">
                        <div class="w-9 h-9 flex items-center justify-center shrink-0">
                            <img src="${assetPrefix}logo.png" alt="Taqniya Logo" class="w-full h-full object-contain">
                        </div>
                        <div class="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border text-xs font-bold">
                            <i data-lucide="folder-git-2" class="w-3.5 h-3.5 text-bx-primary"></i>
                            <span class="text-bx-title font-black">مشروع تقنية 3.0</span>
                        </div>
                    </div>

                    <div class="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border text-xs font-bold">
                        <button type="button" class="px-3.5 py-1.5 rounded-xl bg-[var(--bx-surface-solid)] text-bx-primary border border-bx-border font-black shadow-xs">واجهات UI</button>
                        <button type="button" class="px-3.5 py-1.5 rounded-xl text-bx-muted hover:text-bx-title transition-all">قواعد البيانات</button>
                        <button type="button" class="px-3.5 py-1.5 rounded-xl text-bx-muted hover:text-bx-title transition-all">خدمات API</button>
                    </div>

                    <div class="flex items-center gap-2">
                        <button onclick="dismissLivePageHeader()" class="w-9 h-9 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-all shadow-sm" title="إغلاق المعاينة">
                            <i data-lucide="x" class="w-4 h-4"></i>
                        </button>
                    </div>
                </nav>
            </div>
        `;
    }

    mount.innerHTML = headerHTML;
    mount.classList.remove('hidden');
    
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('success', 'المعاينة الحية للـ Navbar', `تم تفعيل (${styleName}) في أعلى الصفحة بنجاح! 🚀`);
}

function dismissLivePageHeader() {
    const mount = document.getElementById('liveActiveNavbarMount');
    if (mount) {
        mount.classList.add('hidden');
        mount.innerHTML = '';
        showToast('info', 'إغلاق المعاينة', 'تمت إزالة الـ Header النشط من أعلى الصفحة');
    }
}
