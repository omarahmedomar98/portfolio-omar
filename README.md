# Portfolio & Financial Dashboard Workspace
# بيئة عمل ملف الأعمال ولوحة التحكم المالية

هذا المجلد يضم مشروعين رئيسيين:
1. **Next.js Portfolio (`next-portfolio`)**: الموقع الشخصي التفاعلي ثنائي اللغة (عربي / إنجليزي) المبني على Next.js 16 و React 19 و TailwindCSS.
2. **Financial Dashboard (`dashboard`)**: لوحة التحكم المالية التفاعلية المبنية على Vite و React 19 و ECharts و TailwindCSS.

---

## 🚀 كيفية تشغيل المشروع من الترمينال (Terminal Run Commands)

### 1. تشغيل موقع البورتفوليو (Next.js Portfolio):
```bash
# من المجلد الرئيسي:
npm run dev:portfolio

# أو مباشرة من داخل مجلد next-portfolio:
cd next-portfolio
npm run dev
```
سيعمل الموقع على: `http://localhost:3000`

---

### 2. تشغيل لوحة التحكم المالية (Vite Dashboard):
```bash
# من المجلد الرئيسي:
npm run dev:dashboard

# أو مباشرة من داخل مجلد dashboard:
cd dashboard
npm run dev
```
ستعمل لوحة التحكم على: `http://localhost:5173`

---

### 3. تشغيل كلاً من المشروعين معاً (Windows Batch Scripts):
يمكنك النقر المزدوج أو كتابة الأوامر التالية من ترمينال Windows:
* `start-portfolio.bat` -> يفتح موقع Next.js
* `start-dashboard.bat` -> يفتح لوحة Dashboard
* `start-all.bat` -> يفتح المشروعين معاً في نافذتي ترمينال مستقلتين

---

## 🛠 بناء المشروع للإنتاج (Production Build)

```bash
# بناء المشروعين معاً من المجلد الرئيسي:
npm run build

# بناء البورتفوليو فقط:
npm run build:portfolio

# بناء لوحة التحكم فقط:
npm run build:dashboard
```

---

## 📋 هيكل المجلدات (Folder Structure)

```
portfolio/
├── package.json               # ملف التحكم والأوامر الرئيسي للمجلد
├── start-portfolio.bat        # سكربت تشغيل البورتفوليو من الترمينال
├── start-dashboard.bat        # سكربت تشغيل لوحة التحكم من الترمينال
├── start-all.bat              # سكربت تشغيل المشروعين معاً
├── next-portfolio/            # تطبيق Next.js 16 (البورتفوليو)
└── dashboard/                 # تطبيق Vite (لوحة التحكم المالية)
```
