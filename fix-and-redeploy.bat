@echo off
echo 🔧 Fixing Docker deployment for Render...

REM Clean build artifacts
echo 🧹 Cleaning build artifacts...
if exist .next rmdir /s /q .next
if exist node_modules\.cache rmdir /s /q node_modules\.cache

REM Test build locally
echo 🏗️ Testing build locally...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed - please fix the errors above
    pause
    exit /b 1
)

echo ✅ Build successful

REM Test Docker build locally (optional)
echo 🐳 Testing Docker build...
docker build -t meal-calorie-test . --no-cache

if %errorlevel% neq 0 (
    echo ❌ Docker build failed
    pause
    exit /b 1
)

echo ✅ Docker build successful

REM Push changes to trigger redeploy
echo 🚀 Pushing changes to trigger Render redeploy...
git add .
git commit -m "Fix: Simplified Next.js config for Docker standalone build"
git push origin main

echo ✅ Changes pushed!
echo 🔄 Render will automatically redeploy in 2-3 minutes
echo 🌐 Check your Render dashboard for deployment status
echo 📱 Your app: https://meal-calorie-frontend-shubham.onrender.com
echo.
pause
