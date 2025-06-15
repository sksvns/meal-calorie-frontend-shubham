@echo off
echo 🐳 Testing Docker setup for Render deployment...

REM Build the Docker image
echo 📦 Building Docker image...
docker build -t meal-calorie-frontend . --no-cache

if %errorlevel% neq 0 (
    echo ❌ Docker build failed
    pause
    exit /b 1
)

echo ✅ Docker image built successfully

REM Run the container
echo 🚀 Starting container...
docker run -d -p 3000:3000 -e NEXT_PUBLIC_API_BASE_URL=https://meal-calorie-backend-shubham.onrender.com/api -e NODE_ENV=production --name meal-calorie-test meal-calorie-frontend

if %errorlevel% neq 0 (
    echo ❌ Failed to start container
    pause
    exit /b 1
)

echo ✅ Container started successfully
echo 🌐 Open http://localhost:3000 to test your app
echo 🛑 Run 'docker stop meal-calorie-test' to stop the container
echo 🗑️ Run 'docker rm meal-calorie-test' to remove the container
echo.
pause
