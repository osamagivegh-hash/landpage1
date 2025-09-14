# 🔧 حل مشكلة خطأ 502 - Server Not Responding

## 🚨 المشكلة:
```
Failed to load resource: the server responded with a status of 502 ()
```

## 🔍 أسباب محتملة:

### 1. **الخادم لم يبدأ بعد**
- Railway قد يكون ما زال في مرحلة النشر
- تحقق من Railway logs

### 2. **مشكلة في Environment Variables**
- `MONGODB_URI` غير محدد أو خاطئ
- `JWT_SECRET` غير محدد
- `NODE_ENV` غير محدد

### 3. **مشكلة في MongoDB Connection**
- MongoDB Atlas غير متاح
- IP غير مسموح في MongoDB Atlas
- Connection string خاطئ

### 4. **مشكلة في Railway Configuration**
- nixpacks.toml خاطئ
- railway.json خاطئ
- Start command خاطئ

## 🛠️ خطوات الحل:

### **الخطوة 1: تحقق من Railway Logs**
1. اذهب إلى [Railway Dashboard](https://railway.com/project/24879fee-ec2c-4646-acf7-b6350cad60b4/service/fae2f0bc-5563-4fdb-bbbc-5d78086026f9?environmentId=99e320ab-84ef-486c-83e7-75ea6d215259&id=532119be-daf2-4f1f-a16c-372d2edc57c0&context=2025-09-14T11%3A44%3A15.888815651Z#build)
2. انقر على "Logs" tab
3. ابحث عن أخطاء في النشر

### **الخطوة 2: إضافة Environment Variables**
في Railway Dashboard، أضف:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
NODE_ENV=production
FRONTEND_URL=https://restaurantsite-blue.vercel.app
```

### **الخطوة 3: اختبار محلي**
```bash
cd backend
npm run debug
```

ثم افتح: `http://localhost:5000/health`

### **الخطوة 4: تحقق من MongoDB Atlas**
1. اذهب إلى [MongoDB Atlas](https://cloud.mongodb.com)
2. تأكد من أن Cluster يعمل
3. أضف IP `0.0.0.0/0` في Network Access
4. تحقق من Database User

### **الخطوة 5: إعادة نشر**
1. في Railway، انقر على "Redeploy"
2. أو ادفع commit جديد إلى GitHub

## 🔍 Debug Commands:

### **اختبار محلي:**
```bash
cd backend
npm run debug
```

### **اختبار Environment Variables:**
```bash
cd backend
node -e "require('dotenv').config(); console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');"
```

### **اختبار MongoDB:**
```bash
cd backend
node -e "
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));
"
```

## 📋 Railway Configuration Check:

### **nixpacks.toml:**
```toml
[phases.setup]
nixPkgs = ["nodejs", "npm"]

[phases.install]
cmds = [
  "cd backend && npm install --only=production"
]

[phases.build]
cmds = []

[start]
cmd = "cd backend && npm start"

[variables]
NODE_ENV = "production"
```

### **railway.json:**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd backend && npm start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## 🎯 اختبارات سريعة:

### **1. Health Check:**
```
GET https://your-railway-app.railway.app/health
```

### **2. Version Check:**
```
GET https://your-railway-app.railway.app/version
```

### **3. Root Endpoint:**
```
GET https://your-railway-app.railway.app/
```

## 🚨 إذا استمرت المشكلة:

1. **تحقق من Railway Status:** [status.railway.app](https://status.railway.app)
2. **أعد إنشاء المشروع** في Railway
3. **استخدم Docker** بدلاً من Nixpacks
4. **تواصل مع دعم Railway**

## 📞 الدعم:
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Railway Docs: [docs.railway.app](https://docs.railway.app)
