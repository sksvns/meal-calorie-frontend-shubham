#!/bin/bash

echo "🔧 Fixing Docker deployment for Render..."

# Clean build artifacts
echo "🧹 Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules/.cache

# Test build locally
echo "🏗️ Testing build locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed - please fix the errors above"
    exit 1
fi

echo "✅ Build successful"

# Test Docker build locally
echo "🐳 Testing Docker build..."
docker build -t meal-calorie-test . --no-cache

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed"
    exit 1
fi

echo "✅ Docker build successful"

# Push changes to trigger redeploy
echo "🚀 Pushing changes to trigger Render redeploy..."
git add .
git commit -m "Fix: Simplified Next.js config for Docker standalone build"
git push origin main

echo "✅ Changes pushed!"
echo "🔄 Render will automatically redeploy in 2-3 minutes"
echo "🌐 Check your Render dashboard for deployment status"
echo "📱 Your app: https://meal-calorie-frontend-shubham.onrender.com"
