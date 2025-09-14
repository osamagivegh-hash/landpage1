@echo off
echo ========================================
echo    مطعم أوسال - إيقاف الخوادم
echo ========================================
echo.

echo [1/2] إيقاف جميع عمليات Node.js...
taskkill /f /im node.exe

echo [2/2] التحقق من المنافذ...
timeout /t 2 >nul
netstat -ano | findstr ":3000\|:5000"

echo.
echo ✅ تم إيقاف جميع الخوادم!
echo.
pause


