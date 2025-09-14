# 🔐 دليل نظام JWT Authentication

## ✅ تم إضافة نظام JWT كامل للمشروع

### **المكونات المضافة:**

#### **1. Backend Components:**
- ✅ **User Model** (`backend/models/User.js`) - نموذج المستخدم مع تشفير كلمة المرور
- ✅ **Auth Middleware** (`backend/middleware/auth.js`) - middleware للتحقق من JWT
- ✅ **Auth Routes** (`backend/routes/auth.js`) - routes للمصادقة (login/register/refresh)
- ✅ **Protected Admin Routes** - جميع admin routes محمية بـ JWT
- ✅ **Admin Seed Script** (`backend/seedAdmin.js`) - إنشاء admin user افتراضي

#### **2. Frontend Components:**
- ✅ **Auth Context** (`frontend/contexts/AuthContext.tsx`) - إدارة حالة المصادقة
- ✅ **Auth Hook** (`frontend/hooks/useAuthRequest.ts`) - hook للطلبات المحمية
- ✅ **Updated Login Page** - استخدام JWT بدلاً من النظام البسيط
- ✅ **Updated Admin Dashboard** - حماية كاملة مع JWT

### **كيفية الاستخدام:**

#### **1. إنشاء Admin User:**
```bash
cd backend
npm run seed-admin
```

#### **2. بيانات الدخول الافتراضية:**
- **البريد الإلكتروني:** `admin@restaurant.com`
- **كلمة المرور:** `admin123`
- **الدور:** `admin`

#### **3. Environment Variables المطلوبة:**
```env
# في backend/.env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

```env
# في frontend/.env.local
NEXT_PUBLIC_API_URL=https://your-railway-backend.railway.app
```

### **API Endpoints الجديدة:**

#### **Authentication Routes:**
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/refresh` - تجديد التوكن
- `GET /api/auth/profile` - الحصول على معلومات المستخدم
- `PUT /api/auth/profile` - تحديث معلومات المستخدم
- `PUT /api/auth/change-password` - تغيير كلمة المرور
- `POST /api/auth/logout` - تسجيل الخروج

#### **Protected Admin Routes:**
جميع routes في `/api/admin/*` محمية الآن وتتطلب:
- JWT token صالح في header: `Authorization: Bearer <token>`
- دور admin للمستخدم

### **ميزات الأمان:**

#### **1. Password Security:**
- تشفير كلمات المرور باستخدام bcryptjs
- salt rounds: 12 (آمن جداً)

#### **2. JWT Security:**
- توكن انتهاء صلاحية: 24 ساعة
- refresh token انتهاء صلاحية: 7 أيام
- توقيع آمن باستخدام JWT_SECRET

#### **3. CORS Protection:**
- CORS محدد للدومينات المسموحة فقط
- دعم credentials للطلبات المحمية

#### **4. Role-Based Access:**
- نظام أدوار (admin/user)
- حماية admin routes
- التحقق من صلاحيات المستخدم

### **Frontend Authentication Flow:**

#### **1. Login Process:**
```typescript
const { login } = useAuth();
const result = await login(email, password);
if (result.success) {
  // تم تسجيل الدخول بنجاح
  // التوكن محفوظ تلقائياً
}
```

#### **2. Protected Requests:**
```typescript
const { makeRequest } = useAuthRequest();
const response = await makeRequest('/api/admin/meals', {
  method: 'GET',
  requireAuth: true
});
```

#### **3. Auto Token Refresh:**
- تجديد التوكن تلقائياً عند انتهاء الصلاحية
- تسجيل خروج تلقائي عند فشل التجديد

### **Testing the System:**

#### **1. Test Admin Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@restaurant.com","password":"admin123"}'
```

#### **2. Test Protected Route:**
```bash
curl -X GET http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### **Deployment Notes:**

#### **1. Railway Backend:**
- تأكد من إضافة JWT_SECRET في Railway environment variables
- تأكد من صحة MONGODB_URI
- تشغيل `npm run seed-admin` بعد النشر

#### **2. Vercel Frontend:**
- إضافة NEXT_PUBLIC_API_URL في Vercel environment variables
- تحديث CORS origins في backend لتشمل Vercel URL

### **Security Best Practices:**

#### **1. Production JWT_SECRET:**
```bash
# إنشاء JWT secret قوي
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### **2. Environment Variables:**
- لا تشارك JWT_SECRET في الكود
- استخدم متغيرات بيئة منفصلة للإنتاج والتطوير

#### **3. Database Security:**
- تأكد من أن MongoDB Atlas محمي
- استخدم IP whitelist أو VPC

### **Troubleshooting:**

#### **1. Login Issues:**
- تأكد من صحة بيانات الدخول
- تحقق من JWT_SECRET
- تأكد من اتصال MongoDB

#### **2. Token Issues:**
- تحقق من انتهاء صلاحية التوكن
- تأكد من إرسال التوكن في header صحيح
- تحقق من صحة JWT_SECRET

#### **3. CORS Issues:**
- تأكد من إضافة frontend URL في CORS origins
- تحقق من credentials: true

### **Next Steps:**

1. **إنشاء Admin User:** `npm run seed-admin`
2. **تحديث Environment Variables** في Railway و Vercel
3. **اختبار النظام** محلياً أولاً
4. **نشر التحديثات** على Railway و Vercel
5. **اختبار النظام** في الإنتاج

---

## 🎉 النظام جاهز للاستخدام!

النظام الآن آمن ومحمي بـ JWT مع جميع الميزات المطلوبة للأمان والحماية.
