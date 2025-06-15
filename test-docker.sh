#!/bin/bash

echo "🐳 Testing Docker setup for Render deployment..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t meal-calorie-frontend . --no-cache

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed"
    exit 1
fi

echo "✅ Docker image built successfully"

# Run the container
echo "🚀 Starting container..."
docker run -d -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://meal-calorie-backend-shubham.onrender.com/api \
  -e NODE_ENV=production \
  --name meal-calorie-test \
  meal-calorie-frontend

if [ $? -ne 0 ]; then
    echo "❌ Failed to start container"
    exit 1
fi

echo "✅ Container started successfully"
echo "🌐 Open http://localhost:3000 to test your app"
echo "🛑 Run 'docker stop meal-calorie-test' to stop the container"
echo "🗑️ Run 'docker rm meal-calorie-test' to remove the container"
