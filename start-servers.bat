@echo off
echo ========================================
echo    مطعم أوسال - تشغيل الخوادم
echo ========================================
echo.

echo [1/3] إيقاف العمليات السابقة...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 >nul

echo [2/3] تشغيل الباك إند...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo [3/3] انتظار 5 ثواني ثم تشغيل الفرونت إند...
timeout /t 5 >nul
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ تم تشغيل الخوادم بنجاح!
echo.
echo 🌐 الموقع الرئيسي: http://localhost:3000
echo 🔧 لوحة التحكم: http://localhost:3000/admin/login
echo 📊 API Health: http://localhost:5000/api/health
echo.
echo بيانات تسجيل الدخول:
echo - اسم المستخدم: admin
echo - كلمة المرور: osal123
echo.
pause

