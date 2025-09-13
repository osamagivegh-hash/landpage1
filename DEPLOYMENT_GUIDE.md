# 🚀 دليل النشر الشامل - مطعم أوسال

## 📋 نظرة عامة
هذا المشروع يتكون من:
- **الفرونت إند**: Next.js (سيتم نشره على Vercel)
- **الباك إند**: Node.js + Express (سيتم نشره على Railway)
- **قاعدة البيانات**: MongoDB Atlas

## 🎯 خطة النشر

### 1️⃣ **نشر الباك إند على Railway**

#### الخطوة 1: إنشاء حساب على Railway
1. اذهب إلى [railway.app](https://railway.app)
2. سجل دخول بحساب GitHub
3. اضغط "New Project"

#### الخطوة 2: رفع الباك إند
1. اختر "Deploy from GitHub repo"
2. اختر مستودع المشروع
3. اختر مجلد `backend`
4. اضغط "Deploy"

#### الخطوة 3: إعداد متغيرات البيئة
في لوحة تحكم Railway:
1. اذهب إلى "Variables" tab
2. أضف المتغيرات التالية:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
FRONTEND_URL=https://your-frontend-url.vercel.app
NODE_ENV=production
```

#### الخطوة 4: الحصول على URL الباك إند
- بعد النشر، ستحصل على URL مثل: `https://your-project.railway.app`
- احفظ هذا الرابط للخطوة التالية

### 2️⃣ **نشر الفرونت إند على Vercel**

#### الخطوة 1: إنشاء حساب على Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول بحساب GitHub
3. اضغط "New Project"

#### الخطوة 2: رفع الفرونت إند
1. اختر مستودع المشروع
2. اختر مجلد `frontend` كـ Root Directory
3. اضغط "Deploy"

#### الخطوة 3: إعداد متغيرات البيئة
في لوحة تحكم Vercel:
1. اذهب إلى "Settings" > "Environment Variables"
2. أضف المتغير التالي:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
```

#### الخطوة 4: إعادة النشر
- بعد إضافة متغيرات البيئة، اضغط "Redeploy"

### 3️⃣ **إعداد MongoDB Atlas**

#### الخطوة 1: إنشاء قاعدة البيانات
1. اذهب إلى [MongoDB Atlas](https://cloud.mongodb.com)
2. أنشئ cluster جديد
3. أنشئ database باسم `restaurant`

#### الخطوة 2: إعداد المستخدم
1. اذهب إلى "Database Access"
2. أضف مستخدم جديد
3. أعطه صلاحيات "Read and write to any database"

#### الخطوة 3: إعداد Network Access
1. اذهب إلى "Network Access"
2. أضف IP Address: `0.0.0.0/0` (للسماح من أي مكان)

#### الخطوة 4: الحصول على Connection String
1. اذهب إلى "Clusters"
2. اضغط "Connect"
3. اختر "Connect your application"
4. انسخ Connection String
5. استبدل `<password>` بكلمة مرور المستخدم

### 4️⃣ **إعداد البيانات الأولية**

#### تشغيل سكريبت البيانات
```bash
cd backend
node seedData.js
```

## 🔧 ملفات التكوين المطلوبة

### للباك إند (Railway):
- ✅ `railway.json` - تم إنشاؤه
- ✅ `package.json` - تم تحديثه
- ✅ متغيرات البيئة - جاهزة

### للفرونت إند (Vercel):
- ✅ `vercel.json` - تم إنشاؤه
- ✅ `package.json` - تم تحديثه
- ✅ متغيرات البيئة - جاهزة

## 🌐 URLs النهائية

بعد النشر ستحصل على:
- **الفرونت إند**: `https://your-project.vercel.app`
- **الباك إند**: `https://your-project.railway.app`
- **لوحة التحكم**: `https://your-project.vercel.app/admin/login`

## 🔐 معلومات تسجيل الدخول

- **اسم المستخدم**: `admin`
- **كلمة المرور**: `osal123`

## 📱 اختبار النشر

### 1. اختبار الفرونت إند
- اذهب إلى URL الفرونت إند
- تأكد من تحميل الصفحة الرئيسية
- تأكد من ظهور الوجبات والعروض

### 2. اختبار الباك إند
- اذهب إلى `https://your-backend-url.railway.app/api/health`
- يجب أن ترى: `{"message":"Restaurant API is running!"}`

### 3. اختبار لوحة التحكم
- اذهب إلى `/admin/login`
- سجل دخول بـ `admin` / `osal123`
- تأكد من عمل إضافة/تعديل/حذف الوجبات

## 🚨 استكشاف الأخطاء

### مشكلة: الفرونت إند لا يتصل بالباك إند
**الحل**: تأكد من:
- صحة `NEXT_PUBLIC_API_URL` في Vercel
- صحة `FRONTEND_URL` في Railway
- إعادة نشر كلا المشروعين

### مشكلة: خطأ في قاعدة البيانات
**الحل**: تأكد من:
- صحة `MONGODB_URI`
- إعداد Network Access في MongoDB Atlas
- تشغيل `seedData.js`

### مشكلة: CORS Error
**الحل**: تأكد من:
- صحة `FRONTEND_URL` في Railway
- إعادة نشر الباك إند

## 💰 التكلفة

### Vercel (الفرونت إند):
- **مجاني**: 100GB bandwidth/month
- **Pro**: $20/month (للمشاريع الكبيرة)

### Railway (الباك إند):
- **مجاني**: $5 credit/month
- **Pro**: $5/month (للاستخدام المستمر)

### MongoDB Atlas:
- **مجاني**: 512MB storage
- **M0**: $9/month (للإنتاج)

## 🎉 مبروك!

بعد اتباع هذا الدليل، سيكون موقع مطعم أوسال متاح على الإنترنت!

---

**📞 للدعم**: إذا واجهت أي مشاكل، راجع قسم استكشاف الأخطاء أعلاه.
