# 7. لوحة الألوان والسمات (Color Palette & Semantic Tokens)

## 📌 الغرض المعماري
المرجع الأساسي المعتمد لكافة التدرجات اللونية (Primary, Canvas, Surface, Border, Functional Colors) مع نسب التباين ومعايير WCAG AA.

## 🎨 التصنيفات
- **ألوان الهوية (Brand Colors)**: Primary (#5B3CE6), Primary Hover (#482FD0), Canvas, Surface Solid.
- **ألوان الحالات الوظيفية (Functional Colors)**: Danger (#EF4444), Success (#10B981), Warning (#F59E0B), Info (#3B82F6).
- **ألوان الحدود والفواصل (Borders & Dividers)**: Border, Border Strong, Divider, Pill.

## 📐 قواعد الاستخدام
- لا تقم أبداً بتضمين أكواد Hex لونية ثابتة داخل المكونات؛ اعتمد دائماً على متغيرات الـ CSS: `var(--bx-*)`.
