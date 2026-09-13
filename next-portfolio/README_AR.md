# موقع عمر حسين - Portfolio

موقع شخصي احترافي لمحاسب مالي متخصص في التقارير المالية الآلية والتحليل المالي.

## 🚀 المميزات

### ⚡ الأداء
- ✅ استخدام Next.js 16 لأفضل أداء
- ✅ تحسين الخطوط باستخدام `next/font`
- ✅ تحسين الصور باستخدام `next/image`
- ✅ Server Components لتقليل حجم JavaScript
- ✅ Static Site Generation (SSG)

### 🌍 دعم اللغات
- ✅ دعم كامل للعربية والإنجليزية
- ✅ RTL/LTR تلقائي
- ✅ خطوط محسنة لكل لغة (Inter للإنجليزية، Cairo للعربية)

### 📱 Responsive Design
- ✅ تصميم متجاوب بالكامل
- ✅ دعم جميع أحجام الشاشات
- ✅ Navigation متحرك للموبايل
- ✅ تحسينات خاصة للشاشات الصغيرة

### 🎨 التصميم
- ✅ Dark/Light Mode
- ✅ أنيميشن سلس باستخدام Framer Motion
- ✅ تصميم حديث واحترافي
- ✅ ألوان متناسقة

### 📊 الأقسام
1. **Hero** - قسم رئيسي جذاب
2. **About** - نبذة عني مع إحصائيات
3. **Skills** - المهارات التقنية
4. **Experience** - الخبرات العملية (Timeline)
5. **Projects** - المشاريع مع صفحات تفاصيل
6. **Dashboard** - عرض Dashboard تفاعلي
7. **Services** - الخدمات المقدمة
8. **Calculators** - حاسبات مالية (ROI, NPV)
9. **Objective** - الهدف الوظيفي
10. **Contact** - نموذج تواصل

## 🛠️ التقنيات المستخدمة

- **Framework**: Next.js 16.1.1
- **UI Library**: React 19.2.3
- **Animation**: Framer Motion
- **Language**: TypeScript
- **Styling**: CSS Modules + Styled-JSX
- **Email**: EmailJS
- **Icons**: Font Awesome

## 📦 التثبيت والتشغيل

### المتطلبات
- Node.js 20+
- npm أو yarn

### خطوات التشغيل

1. **تثبيت المكتبات**:
```bash
npm install
```

2. **تشغيل الموقع (Development)**:
```bash
npm run dev
```
الموقع سيعمل على: `http://localhost:3000`

3. **بناء الموقع (Production)**:
```bash
npm run build
```

4. **تشغيل النسخة المبنية**:
```bash
npm start
```

## 📁 هيكل المشروع

```
next-portfolio/
├── src/
│   ├── app/
│   │   ├── [lang]/              # صفحات اللغات
│   │   │   ├── page.tsx         # الصفحة الرئيسية
│   │   │   ├── layout.tsx       # Layout للغات
│   │   │   └── projects/[id]/   # صفحات المشاريع
│   │   ├── globals.css          # CSS الرئيسي
│   │   └── layout.tsx           # Root Layout
│   ├── components/              # المكونات
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Services.tsx
│   │   ├── Contact.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── i18n/                    # الترجمات
│       ├── data.ts              # محتوى الموقع
│       └── projects.ts          # بيانات المشاريع
├── public/
│   ├── images/                  # الصور
│   └── dashboard/               # Dashboard منفصل
└── package.json
```

## 🎯 الصفحات المتاحة

### العربية
- `/ar` - الصفحة الرئيسية
- `/ar/projects/reporting` - نظام التقارير المالية
- `/ar/projects/inventory` - متتبع المخزون
- `/ar/projects/cashflow` - لوحة التدفق النقدي
- `/ar/projects/accounting` - نظام محاسبي مخصص

### الإنجليزية
- `/en` - الصفحة الرئيسية
- `/en/projects/reporting` - Financial Reporting System
- `/en/projects/inventory` - Inventory Tracker
- `/en/projects/cashflow` - Cash Flow Dashboard
- `/en/projects/accounting` - Custom Accounting System

## 🔧 التخصيص

### تعديل المحتوى
- **النصوص**: `src/i18n/data.ts`
- **المشاريع**: `src/i18n/projects.ts`
- **الألوان**: `src/app/globals.css` (CSS Variables)

### إضافة مشروع جديد
1. أضف بيانات المشروع في `src/i18n/projects.ts`
2. أضف الصورة في `public/images/`
3. أضف ID المشروع في `generateStaticParams`

### تعديل الألوان
في `globals.css`:
```css
:root {
  --primary: #38bdf8;      /* اللون الأساسي */
  --bg-body: #0f172a;      /* خلفية الموقع */
  --text-main: #f8fafc;    /* لون النص */
  /* ... */
}
```

## 📧 إعداد EmailJS

لتفعيل نموذج التواصل:

1. سجل في [EmailJS](https://www.emailjs.com/)
2. أنشئ Service و Template
3. عدّل في `src/components/Contact.tsx`:
```typescript
const SERVICE_ID = "your_service_id";
const TEMPLATE_ID = "your_template_id";
const PUBLIC_KEY = "your_public_key";
```

## 🚀 النشر

### Vercel (موصى به)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# ارفع مجلد .next
```

### أي استضافة Node.js
```bash
npm run build
npm start
```

## 📱 اختبار Responsive

1. افتح Developer Tools (F12)
2. اضغط على أيقونة الموبايل
3. جرب الأحجام:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - Desktop (1920px)

## 🐛 حل المشاكل

### الموقع لا يعمل
```bash
# احذف node_modules و .next
rm -rf node_modules .next
npm install
npm run dev
```

### أخطاء TypeScript
```bash
npm run build
# ستظهر الأخطاء بالتفصيل
```

### الصور لا تظهر
- تأكد أن الصور في `public/images/`
- استخدم المسار: `/images/filename.jpg`

## 📄 الترخيص

هذا المشروع للاستخدام الشخصي.

## 👤 المطور

**عمر أحمد عمر حسين**
- LinkedIn: [Omar Hussein](https://www.linkedin.com/in/omar-a-71a363103)
- Email: meroking1998@gmail.com

## 🙏 شكر خاص

- Next.js Team
- Vercel
- Font Awesome
- Framer Motion
- EmailJS

---

**تم التطوير بـ ❤️ باستخدام Next.js**
