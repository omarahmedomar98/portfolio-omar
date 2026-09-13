# Breadcrumb Navigation - دليل التنقل

## ✨ الميزة الجديدة

تم إضافة **Breadcrumb Navigation** في صفحات المشاريع لتحسين تجربة المستخدم والتنقل.

## 🎯 الوظائف

### في صفحات المشاريع:

بدلاً من Navigation العادي، يظهر الآن:

1. **زر HOME (الرئيسية)** 🏠
   - يرجع للصفحة الرئيسية من البداية
   - مع أيقونة home

2. **زر Projects (المشاريع)** 📁
   - يرجع لنفس النقطة في الصفحة الرئيسية (قسم المشاريع)
   - يستخدم anchor link: `#projects`
   - مع أيقونة folder

### التصميم

```
┌─────────────────────────────────────────┐
│  🏠 Home  →  📁 Projects                │
└─────────────────────────────────────────┘
```

**بالعربية:**
```
┌─────────────────────────────────────────┐
│  🏠 الرئيسية  ←  📁 المشاريع           │
└─────────────────────────────────────────┘
```

## 🛠️ التنفيذ التقني

### 1. تعديل Navbar Component

تم إضافة:
- **Interface جديد**: `BreadcrumbItem`
- **Props اختياري**: `breadcrumbs?: BreadcrumbItem[]`
- **Conditional Rendering**: يعرض breadcrumbs أو navigation عادي

```tsx
interface BreadcrumbItem {
    label: string;
    href: string;
}

interface NavbarProps {
    content: any;
    lang: "en" | "ar";
    breadcrumbs?: BreadcrumbItem[];
}
```

### 2. تعديل صفحة المشروع

```tsx
const breadcrumbs = [
    {
        label: isEn ? "Home" : "الرئيسية",
        href: `/${lang}`
    },
    {
        label: isEn ? "Projects" : "المشاريع",
        href: `/${lang}#projects`
    }
];

<Navbar lang={lang} content={content.nav} breadcrumbs={breadcrumbs} />
```

## 🎨 التصميم

### Desktop
- أزرار أفقية مع فواصل (chevron)
- Background شفاف مع border
- Hover effect: تحول للون الأساسي

### Mobile
- أزرار عمودية (كل زر في سطر)
- عرض كامل
- نفس التأثيرات

### الألوان
```css
.breadcrumb-item {
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid var(--primary);
    color: var(--primary);
}

.breadcrumb-item:hover {
    background: var(--primary);
    color: #fff;
}
```

## 📱 Responsive

### Desktop (> 768px)
```
🏠 Home  →  📁 Projects  [Theme] [Lang]
```

### Mobile (< 768px)
```
┌─────────────────┐
│  🏠 Home        │
├─────────────────┤
│  📁 Projects    │
├─────────────────┤
│  [Theme] [Lang] │
└─────────────────┘
```

## 🌍 دعم RTL

- **الفواصل**: تتغير من `→` إلى `←` في العربية
- **الترتيب**: يبقى نفسه (Home أولاً)
- **الأيقونات**: تبقى نفسها

## ✅ المزايا

1. **UX محسن**: المستخدم يعرف مكانه بالضبط
2. **Navigation سريع**: رجوع مباشر لأي نقطة
3. **SEO**: روابط داخلية أفضل
4. **Accessibility**: واضح ومفهوم

## 🚀 الاستخدام

### للصفحة الرئيسية
```tsx
<Navbar lang={lang} content={content.nav} />
// لا breadcrumbs = navigation عادي
```

### للصفحات الفرعية
```tsx
const breadcrumbs = [
    { label: "Home", href: "/en" },
    { label: "Section", href: "/en#section" }
];

<Navbar lang={lang} content={content.nav} breadcrumbs={breadcrumbs} />
```

## 📝 ملاحظات

- ✅ يعمل مع اللغتين (عربي/إنجليزي)
- ✅ Responsive بالكامل
- ✅ Smooth transitions
- ✅ يحافظ على scroll position عند الرجوع للقسم

## 🎯 النتيجة

المستخدم الآن يمكنه:
1. الرجوع للصفحة الرئيسية بسرعة
2. الرجوع لقسم المشاريع مباشرة
3. معرفة مكانه في الموقع
4. التنقل بسهولة

**تجربة مستخدم أفضل! ✨**
