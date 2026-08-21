const fs = require('fs');

const tabsSectionHTML = `
            <!-- ==================== 21. TABS & SEGMENTED CONTROLS ==================== -->
            <section id="tabs" class="space-y-6 pb-16">
                <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                        <span class="w-2.5 h-7 rounded-full bg-bx-primary"></span>
                        <h2 class="text-xl sm:text-2xl font-bold bx-title">21. التبويبات وأشرطة التبديل (Tabs & Segmented Controls)</h2>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="bx-tag font-mono text-xs">Interactive · 5 Luxury Styles · VisionOS Depth</span>
                        <button onclick="toggleSection('sec-tabs-body', 'sec-tabs-btn')" id="sec-tabs-btn"
                            class="w-8 h-8 rounded-full border border-bx-border hover:border-bx-primary flex items-center justify-center text-bx-muted hover:border-bx-primary transition-all cursor-pointer"
                            title="طي / توسيع القسم">
                            <i data-lucide="chevron-down" class="w-4 h-4 chevron-toggle"></i>
                        </button>
                    </div>
                </div>

                <div id="sec-tabs-body" class="accordion-content space-y-8">

                    <!-- VARIATION 1: Line / Underline Tabs -->
                    <div class="bx-card p-6 sm:p-8 space-y-6">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-bx-divider">
                            <div>
                                <h3 class="bx-title text-base font-black">1. التبويبات الخطية الكلاسيكية (Underline Tabs)</h3>
                                <p class="text-xs text-bx-muted">شريط تبويب سفلي ذو مؤشر انسيابي مع شارات عددية وتفاعل فوري</p>
                            </div>
                            <span class="bx-tag text-xs font-mono text-bx-primary border-bx-primary/30">.bx-tab-nav-line</span>
                        </div>

                        <div id="tabsLineContainer" class="bx-tabs">
                            <!-- Nav Header -->
                            <div class="bx-tab-nav bx-tab-nav-line">
                                <button type="button" class="bx-tab-btn bx-tab-btn-line active" onclick="switchTab('tabsLineContainer', 'tab-line-general', this)">
                                    <i data-lucide="settings" class="w-4 h-4"></i>
                                    <span>الإعدادات العامة</span>
                                </button>
                                <button type="button" class="bx-tab-btn bx-tab-btn-line" onclick="switchTab('tabsLineContainer', 'tab-line-security', this)">
                                    <i data-lucide="shield-check" class="w-4 h-4 text-emerald-500"></i>
                                    <span>الأمان والمصادقة</span>
                                    <span class="bx-tab-badge">2FA</span>
                                </button>
                                <button type="button" class="bx-tab-btn bx-tab-btn-line" onclick="switchTab('tabsLineContainer', 'tab-line-cloud', this)">
                                    <i data-lucide="cloud" class="w-4 h-4 text-bx-primary"></i>
                                    <span>الربط السحابي</span>
                                    <span class="bx-tab-badge">3 عقد</span>
                                </button>
                                <button type="button" class="bx-tab-btn bx-tab-btn-line" onclick="switchTab('tabsLineContainer', 'tab-line-logs', this)">
                                    <i data-lucide="file-text" class="w-4 h-4"></i>
                                    <span>سجلات التدقيق</span>
                                </button>
                            </div>

                            <!-- Panes Content -->
                            <div class="bx-tab-content pt-2">
                                <!-- Pane 1 -->
                                <div id="tab-line-general" class="bx-tab-pane active space-y-4">
                                    <div class="p-5 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div class="space-y-1">
                                            <h4 class="text-sm font-black text-bx-title">هوية المنظومة وبيانات البيئة</h4>
                                            <p class="text-xs text-bx-muted leading-relaxed">إدارة المتغيرات الأساسية واسم النطاق والترميز الموحد للمؤسسة.</p>
                                        </div>
                                        <button class="bx-btn bx-btn-primary text-xs px-5 shrink-0">
                                            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                                            <span>تحديث الإعدادات</span>
                                        </button>
                                    </div>
                                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div class="p-4 rounded-2xl border border-bx-border bg-[var(--bx-surface-solid)] space-y-1">
                                            <span class="text-[10px] text-bx-muted font-bold block">إصدار المعمارية</span>
                                            <span class="text-sm font-black text-bx-title font-mono">v3.4.0-Enterprise</span>
                                        </div>
                                        <div class="p-4 rounded-2xl border border-bx-border bg-[var(--bx-surface-solid)] space-y-1">
                                            <span class="text-[10px] text-bx-muted font-bold block">المنطقة الجغرافية</span>
                                            <span class="text-sm font-black text-emerald-600">الرياض (me-central2)</span>
                                        </div>
                                        <div class="p-4 rounded-2xl border border-bx-border bg-[var(--bx-surface-solid)] space-y-1">
                                            <span class="text-[10px] text-bx-muted font-bold block">ترميز البيانات</span>
                                            <span class="text-sm font-black text-bx-primary font-mono">UTF-8 / Strict RTL</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Pane 2 -->
                                <div id="tab-line-security" class="bx-tab-pane space-y-4">
                                    <div class="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-2.5">
                                                <i data-lucide="shield-alert" class="w-5 h-5 text-emerald-500"></i>
                                                <h4 class="text-sm font-black text-emerald-600">بروتوكول الحماية الصارمة (2FA Enforcement)</h4>
                                            </div>
                                            <span class="bx-tag text-[10px] border-emerald-500/30 text-emerald-600">مفعّل بالكامل</span>
                                        </div>
                                        <p class="text-xs text-bx-muted leading-relaxed">كافة العمليات الحساسة وتعديلات قواعد البيانات تتطلب تأكيداً ثنائياً فورياً عبر مفاتيح الأمان المشفرة.</p>
                                    </div>
                                </div>

                                <!-- Pane 3 -->
                                <div id="tab-line-cloud" class="bx-tab-pane space-y-4">
                                    <div class="p-5 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border space-y-3">
                                        <h4 class="text-sm font-black text-bx-title">العقد السحابية النشطة (SSoT Cluster)</h4>
                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div class="p-3 rounded-xl border border-bx-border bg-[var(--bx-surface-solid)] flex items-center justify-between">
                                                <div class="flex items-center gap-2">
                                                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                                                    <span class="text-xs font-bold text-bx-title">Master Node 01</span>
                                                </div>
                                                <span class="text-[11px] font-mono text-emerald-600">Online · 18ms</span>
                                            </div>
                                            <div class="p-3 rounded-xl border border-bx-border bg-[var(--bx-surface-solid)] flex items-center justify-between">
                                                <div class="flex items-center gap-2">
                                                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                                                    <span class="text-xs font-bold text-bx-title">Replica Node 02</span>
                                                </div>
                                                <span class="text-[11px] font-mono text-emerald-600">Online · 24ms</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Pane 4 -->
                                <div id="tab-line-logs" class="bx-tab-pane space-y-4">
                                    <div class="p-4 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border font-mono text-xs space-y-2">
                                        <div class="text-bx-muted flex items-center justify-between border-b border-bx-divider pb-2">
                                            <span>سجل العمليات الأخير (SSoT Audit Stream)</span>
                                            <span class="text-emerald-500">Live Syncing</span>
                                        </div>
                                        <div class="text-bx-title"><span class="text-bx-primary">[12:44:02]</span> AUTH: Token verified for admin session (UID: 902)</div>
                                        <div class="text-bx-title"><span class="text-bx-primary">[12:45:18]</span> CLOUD: Schema migration applied successfully (0 errors)</div>
                                        <div class="text-bx-title"><span class="text-bx-primary">[12:46:55]</span> CACHE: Redis cache invalidated for perfume catalogue</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- VARIATION 2: Pill / Segmented Capsule Tabs -->
                    <div class="bx-card p-6 sm:p-8 space-y-6">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-bx-divider">
                            <div>
                                <h3 class="bx-title text-base font-black">2. التبويبات الكبسولية المقطعة (Segmented Pill Controls)</h3>
                                <p class="text-xs text-bx-muted">حاوية زجاجية عائمة مستوحاة من VisionOS تبرز التبويب النشط بظلال ثلاثية الأبعاد</p>
                            </div>
                            <span class="bx-tag text-xs font-mono text-bx-primary border-bx-primary/30">.bx-tab-nav-pill</span>
                        </div>

                        <div id="tabsPillContainer" class="bx-tabs">
                            <!-- Segmented Nav -->
                            <div class="flex items-center justify-center sm:justify-start">
                                <div class="bx-tab-nav bx-tab-nav-pill">
                                    <button type="button" class="bx-tab-btn bx-tab-btn-pill active" onclick="switchTab('tabsPillContainer', 'tab-pill-overview', this)">
                                        <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
                                        <span>نظرة عامة</span>
                                    </button>
                                    <button type="button" class="bx-tab-btn bx-tab-btn-pill" onclick="switchTab('tabsPillContainer', 'tab-pill-perf', this)">
                                        <i data-lucide="activity" class="w-4 h-4"></i>
                                        <span>مؤشرات الأداء</span>
                                    </button>
                                    <button type="button" class="bx-tab-btn bx-tab-btn-pill" onclick="switchTab('tabsPillContainer', 'tab-pill-storage', this)">
                                        <i data-lucide="database" class="w-4 h-4"></i>
                                        <span>التخزين وقواعد البيانات</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Panes Content -->
                            <div class="bx-tab-content pt-2">
                                <div id="tab-pill-overview" class="bx-tab-pane active space-y-4">
                                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div class="p-5 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border space-y-2">
                                            <span class="text-xs font-bold text-bx-muted">إجمالي الطلبات المعالجة</span>
                                            <div class="text-2xl font-black text-bx-title font-mono">1,482,900</div>
                                            <span class="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                                                <i data-lucide="trending-up" class="w-3 h-3"></i> +14.8% مقارنة بالأمس
                                            </span>
                                        </div>
                                        <div class="p-5 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border space-y-2">
                                            <span class="text-xs font-bold text-bx-muted">متوسط زمن الاستجابة</span>
                                            <div class="text-2xl font-black text-bx-primary font-mono">24.5 ms</div>
                                            <span class="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                                                <i data-lucide="check" class="w-3 h-3"></i> ممتاز تحت الضغط
                                            </span>
                                        </div>
                                        <div class="p-5 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border space-y-2">
                                            <span class="text-xs font-bold text-bx-muted">معدل الاستقرار الإجمالي</span>
                                            <div class="text-2xl font-black text-emerald-600 font-mono">99.99%</div>
                                            <span class="text-[10px] text-bx-muted font-bold">بدون أي انقطاع</span>
                                        </div>
                                    </div>
                                </div>

                                <div id="tab-pill-perf" class="bx-tab-pane space-y-4">
                                    <div class="p-6 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div class="space-y-2">
                                            <h4 class="text-sm font-black text-bx-title">تحليل استهلاك الموارد والذاكرة</h4>
                                            <p class="text-xs text-bx-muted leading-relaxed">استهلاك المعالجات المركزية عند 34% وسعة الذاكرة المستغلة 4.2GB من أصل 16GB.</p>
                                        </div>
                                        <div class="w-full md:w-48 bg-bx-pill p-3 rounded-xl border border-bx-border text-center">
                                            <span class="text-xs text-bx-muted block">مستوى الكفاءة</span>
                                            <span class="text-lg font-black text-emerald-500">Ultra Fast</span>
                                        </div>
                                    </div>
                                </div>

                                <div id="tab-pill-storage" class="bx-tab-pane space-y-4">
                                    <div class="p-6 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border space-y-3">
                                        <h4 class="text-sm font-black text-bx-title">قواعد البيانات المترابطة (PostgreSQL 16 Engine)</h4>
                                        <p class="text-xs text-bx-muted">حجم قاعدة البيانات الحالية: 8.4 GB مع تشفير كامل للقرص ومزامنة تلقائية مع S3.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- VARIATION 3: Card / Boxed Tabs -->
                    <div class="bx-card p-6 sm:p-8 space-y-6">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-bx-divider">
                            <div>
                                <h3 class="bx-title text-base font-black">3. التبويبات الصندوقية والبطاقات (Card & Boxed Tabs)</h3>
                                <p class="text-xs text-bx-muted">مربعات وبطاقات تفاعلية مستقلة مزودة بأيقونات وحالة تشغيل فورية</p>
                            </div>
                            <span class="bx-tag text-xs font-mono text-bx-primary border-bx-primary/30">.bx-tab-nav-card</span>
                        </div>

                        <div id="tabsCardContainer" class="bx-tabs">
                            <!-- Card Buttons Nav -->
                            <div class="bx-tab-nav bx-tab-nav-card">
                                <button type="button" class="bx-tab-btn bx-tab-btn-card active" onclick="switchTab('tabsCardContainer', 'tab-card-riyadh', this)">
                                    <div class="w-10 h-10 rounded-xl bg-bx-pill border border-bx-border flex items-center justify-center text-bx-primary bx-tab-card-icon">
                                        <i data-lucide="server" class="w-5 h-5"></i>
                                    </div>
                                    <div>
                                        <div class="text-xs font-black text-bx-title">سحابة الرياض (Primary)</div>
                                        <div class="text-[10px] text-emerald-500 font-bold mt-0.5">● متصل ونشط (Active)</div>
                                    </div>
                                </button>

                                <button type="button" class="bx-tab-btn bx-tab-btn-card" onclick="switchTab('tabsCardContainer', 'tab-card-jeddah', this)">
                                    <div class="w-10 h-10 rounded-xl bg-bx-pill border border-bx-border flex items-center justify-center text-bx-muted bx-tab-card-icon">
                                        <i data-lucide="hard-drive" class="w-5 h-5"></i>
                                    </div>
                                    <div>
                                        <div class="text-xs font-black text-bx-title">سحابة جدة (Backup)</div>
                                        <div class="text-[10px] text-bx-muted font-bold mt-0.5">○ عقدة احتياطية (Standby)</div>
                                    </div>
                                </button>

                                <button type="button" class="bx-tab-btn bx-tab-btn-card" onclick="switchTab('tabsCardContainer', 'tab-card-cache', this)">
                                    <div class="w-10 h-10 rounded-xl bg-bx-pill border border-bx-border flex items-center justify-center text-bx-muted bx-tab-card-icon">
                                        <i data-lucide="zap" class="w-5 h-5"></i>
                                    </div>
                                    <div>
                                        <div class="text-xs font-black text-bx-title">التخزين الفوري (Redis)</div>
                                        <div class="text-[10px] text-bx-primary font-bold mt-0.5">⚡ سرعة فائقة (0.4ms)</div>
                                    </div>
                                </button>
                            </div>

                            <!-- Panes Content -->
                            <div class="bx-tab-content pt-2">
                                <div id="tab-card-riyadh" class="bx-tab-pane active p-6 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border space-y-4">
                                    <div class="flex items-center justify-between">
                                        <div class="space-y-1">
                                            <h4 class="text-sm font-black text-bx-title">مواصفات مركز بيانات الرياض (me-central2)</h4>
                                            <p class="text-xs text-bx-muted">المعمارية الأساسية للإنتاج وتوزيع الحمل على 8 عقد حوسبة.</p>
                                        </div>
                                        <span class="bx-tag text-xs border-emerald-500/30 text-emerald-600 bg-emerald-500/10">100% Operational</span>
                                    </div>
                                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        <div class="p-3 rounded-xl bg-[var(--bx-surface-solid)] border border-bx-border text-center">
                                            <span class="text-[10px] text-bx-muted block font-bold">الذاكرة</span>
                                            <span class="text-xs font-black text-bx-title font-mono">64 GB</span>
                                        </div>
                                        <div class="p-3 rounded-xl bg-[var(--bx-surface-solid)] border border-bx-border text-center">
                                            <span class="text-[10px] text-bx-muted block font-bold">الأنوية</span>
                                            <span class="text-xs font-black text-bx-title font-mono">16 vCPUs</span>
                                        </div>
                                        <div class="p-3 rounded-xl bg-[var(--bx-surface-solid)] border border-bx-border text-center">
                                            <span class="text-[10px] text-bx-muted block font-bold">نطاق التردد</span>
                                            <span class="text-xs font-black text-bx-title font-mono">10 Gbps</span>
                                        </div>
                                        <div class="p-3 rounded-xl bg-[var(--bx-surface-solid)] border border-bx-border text-center">
                                            <span class="text-[10px] text-bx-muted block font-bold">التشفير</span>
                                            <span class="text-xs font-black text-emerald-500 font-mono">AES-256</span>
                                        </div>
                                    </div>
                                </div>

                                <div id="tab-card-jeddah" class="bx-tab-pane p-6 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border space-y-3">
                                    <h4 class="text-sm font-black text-bx-title">مركز بيانات جدة الاحتياطي (Disaster Recovery)</h4>
                                    <p class="text-xs text-bx-muted leading-relaxed">جاهز للاستجابة التلقائية ونقل حركة المرور في حال حدوث أي طارئ دون انقطاع البيانات.</p>
                                </div>

                                <div id="tab-card-cache" class="bx-tab-pane p-6 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border space-y-3">
                                    <h4 class="text-sm font-black text-bx-title">ذاكرة الكاش الموزعة (Distributed Redis Cluster)</h4>
                                    <p class="text-xs text-bx-muted leading-relaxed">معدل إصابة الكاش (Hit Ratio): 96.4% مما يقلل الضغط المباشر على خوادم الـ SQL.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- VARIATION 4: Vertical Tabs -->
                    <div class="bx-card p-6 sm:p-8 space-y-6">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-bx-divider">
                            <div>
                                <h3 class="bx-title text-base font-black">4. التبويبات الجانبية والعمودية (Vertical Navigation Tabs)</h3>
                                <p class="text-xs text-bx-muted">قائمة تبويب جانبية عمودية متناسقة مثالية للوحات التحكم والإعدادات المتقدمة</p>
                            </div>
                            <span class="bx-tag text-xs font-mono text-bx-primary border-bx-primary/30">.bx-tabs-vertical</span>
                        </div>

                        <div id="tabsVerticalContainer" class="bx-tabs-vertical">
                            <!-- Vertical Nav -->
                            <div class="bx-tab-nav-vertical">
                                <button type="button" class="bx-tab-btn bx-tab-btn-vertical active" onclick="switchTab('tabsVerticalContainer', 'tab-vert-users', this)">
                                    <i data-lucide="users" class="w-4 h-4"></i>
                                    <span>المستخدمون والأدوار</span>
                                </button>
                                <button type="button" class="bx-tab-btn bx-tab-btn-vertical" onclick="switchTab('tabsVerticalContainer', 'tab-vert-api', this)">
                                    <i data-lucide="key" class="w-4 h-4"></i>
                                    <span>مفاتيح الـ API</span>
                                </button>
                                <button type="button" class="bx-tab-btn bx-tab-btn-vertical" onclick="switchTab('tabsVerticalContainer', 'tab-vert-notifications', this)">
                                    <i data-lucide="bell" class="w-4 h-4"></i>
                                    <span>إعدادات الإشعارات</span>
                                </button>
                                <button type="button" class="bx-tab-btn bx-tab-btn-vertical" onclick="switchTab('tabsVerticalContainer', 'tab-vert-billing', this)">
                                    <i data-lucide="credit-card" class="w-4 h-4"></i>
                                    <span>الفواتير والاشتراك</span>
                                </button>
                            </div>

                            <!-- Panes Content -->
                            <div class="bx-tab-content">
                                <div id="tab-vert-users" class="bx-tab-pane active p-6 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border space-y-4">
                                    <div class="flex items-center justify-between border-b border-bx-divider pb-3">
                                        <h4 class="text-sm font-black text-bx-title">إدارة صلاحيات المستخدمين (RBAC Matrix)</h4>
                                        <button class="bx-btn bx-btn-primary text-xs px-4 py-2">
                                            <i data-lucide="user-plus" class="w-3.5 h-3.5"></i>
                                            <span>إضافة عضو جديد</span>
                                        </button>
                                    </div>
                                    <p class="text-xs text-bx-muted leading-relaxed">تحكم كامل في وصول المدراء والمشرفين إلى سجلات المعمارية والبيانات الحساسة.</p>
                                </div>

                                <div id="tab-vert-api" class="bx-tab-pane p-6 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border space-y-3">
                                    <h4 class="text-sm font-black text-bx-title">مفاتيح الربط والـ Webhooks</h4>
                                    <p class="text-xs text-bx-muted">توليد وتدوير المفاتيح السرية للربط مع الأنظمة الخارجية وتطبيقات الموبايل.</p>
                                </div>

                                <div id="tab-vert-notifications" class="bx-tab-pane p-6 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border space-y-3">
                                    <h4 class="text-sm font-black text-bx-title">تخصيص قنوات التنبيه</h4>
                                    <p class="text-xs text-bx-muted">استقبال الرسائل عبر البريد الإلكتروني وSlack وقنوات الـ Webhook الفورية.</p>
                                </div>

                                <div id="tab-vert-billing" class="bx-tab-pane p-6 rounded-2xl bg-[var(--bx-table-header)] border border-bx-border space-y-3">
                                    <h4 class="text-sm font-black text-bx-title">خطة الاشتراك السحابي</h4>
                                    <p class="text-xs text-bx-muted">باقة Enterprise المخصصة — تجديد تلقائي سنوي مع دعم فني متقدم 24/7.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- VARIATION 5: Sizes & States Showcase -->
                    <div class="bx-card p-6 sm:p-8 space-y-6">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-bx-divider">
                            <div>
                                <h3 class="bx-title text-base font-black">5. أحجام وحالات أزرار التبويب (Sizes & States)</h3>
                                <p class="text-xs text-bx-muted">استعراض أحجام التبويب المختلفة (صغير، افتراضي، كبير) وحالة التعطيل (Disabled)</p>
                            </div>
                            <span class="bx-tag text-xs font-mono text-bx-primary border-bx-primary/30">Sizes & States</span>
                        </div>

                        <div class="space-y-6">
                            <!-- Small Size -->
                            <div class="space-y-2">
                                <span class="text-xs font-bold text-bx-muted">الحجم الصغير (.bx-tab-btn-sm):</span>
                                <div class="bx-tab-nav bx-tab-nav-pill">
                                    <button class="bx-tab-btn bx-tab-btn-pill bx-tab-btn-sm active">
                                        <i data-lucide="filter" class="w-3.5 h-3.5"></i>
                                        <span>الكل</span>
                                    </button>
                                    <button class="bx-tab-btn bx-tab-btn-pill bx-tab-btn-sm">
                                        <span>المعتمدة</span>
                                    </button>
                                    <button class="bx-tab-btn bx-tab-btn-pill bx-tab-btn-sm">
                                        <span>المعلقة</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Regular Size with Disabled State -->
                            <div class="space-y-2">
                                <span class="text-xs font-bold text-bx-muted">الحجم الافتراضي مع حالة التعطيل (.disabled / disabled):</span>
                                <div class="bx-tab-nav bx-tab-nav-pill">
                                    <button class="bx-tab-btn bx-tab-btn-pill active">
                                        <i data-lucide="check" class="w-4 h-4"></i>
                                        <span>نشط (Active)</span>
                                    </button>
                                    <button class="bx-tab-btn bx-tab-btn-pill">
                                        <span>افتراضي (Default)</span>
                                    </button>
                                    <button class="bx-tab-btn bx-tab-btn-pill disabled" disabled title="هذا التبويب معطل">
                                        <i data-lucide="lock" class="w-3.5 h-3.5"></i>
                                        <span>معطل (Disabled)</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Large Size -->
                            <div class="space-y-2">
                                <span class="text-xs font-bold text-bx-muted">الحجم الكبير (.bx-tab-btn-lg):</span>
                                <div class="bx-tab-nav bx-tab-nav-pill">
                                    <button class="bx-tab-btn bx-tab-btn-pill bx-tab-btn-lg active">
                                        <i data-lucide="sparkles" class="w-5 h-5"></i>
                                        <span>الواجهات المكانية (Spatial UI)</span>
                                    </button>
                                    <button class="bx-tab-btn bx-tab-btn-pill bx-tab-btn-lg">
                                        <i data-lucide="layers" class="w-5 h-5"></i>
                                        <span>طبقات المعمارية (Architecture)</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
`;

let html = fs.readFileSync('Taqniya Design System.html', 'utf8');

// 1. Update Sidebar Navigation
const targetNavSearch = '<a href="#navbar" class="bx-nav-item" onclick="setNavActive(this)">';
const newTabsLink = `<a href="#tabs" class="bx-nav-item" onclick="setNavActive(this)">
                                <div class="flex items-center gap-2.5">
                                    <div class="nav-icon-box">
                                        <i data-lucide="panels-top-left" class="w-3.5 h-3.5"></i>
                                    </div>
                                    <span>التبويبات (Tabs)</span>
                                </div>
                                <span class="nav-badge">21</span>
                            </a>\n\n                            `;

if (html.includes(targetNavSearch)) {
    // Replace the 21 badge for navbar with 22, and 22 for offcanvas with 23
    let parts = html.split(targetNavSearch);
    let before = parts[0];
    let after = parts[1];
    
    // In 'after', update badges
    after = after.replace('<span class="nav-badge">21</span>', '<span class="nav-badge">22</span>');
    after = after.replace('<span class="nav-badge">22</span>', '<span class="nav-badge">23</span>');
    
    html = before + newTabsLink + targetNavSearch + after;
    console.log('Sidebar navigation updated!');
} else {
    console.error('Target nav search not found!');
}

// 2. Renumber Section 21 (Navbar) to 22, and Section 22 (Offcanvas) to 23
html = html.replace(
    '<!-- ==================== 21. NAVBAR & NAVIGATION BARS ==================== -->',
    '<!-- ==================== 22. NAVBAR & NAVIGATION BARS ==================== -->'
);
html = html.replace(
    '21. أشرطة التنقل العلوية (Navbar & Headers)',
    '22. أشرطة التنقل العلوية (Navbar & Headers)'
);

html = html.replace(
    '<!-- ==================== 22. OFFCANVAS & SLIDE DRAWERS ==================== -->',
    '<!-- ==================== 23. OFFCANVAS & SLIDE DRAWERS ==================== -->'
);
html = html.replace(
    '22. اللوحات المنزلقة والأدراج (Offcanvas',
    '23. اللوحات المنزلقة والأدراج (Offcanvas'
);

// 3. Insert Tabs section before Section 22 (Navbar)
const targetMarker = '<!-- ==================== 22. NAVBAR & NAVIGATION BARS ==================== -->';
if (html.includes(targetMarker)) {
    html = html.replace(targetMarker, tabsSectionHTML.trim() + '\n\n            ' + targetMarker);
    console.log('Tabs section inserted before Navbar successfully!');
} else {
    console.error('Could not find targetMarker in HTML!');
}

fs.writeFileSync('Taqniya Design System.html', html, 'utf8');
console.log('Saved Taqniya Design System.html');
