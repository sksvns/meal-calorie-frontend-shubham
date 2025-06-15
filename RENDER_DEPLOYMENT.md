# 🐳 Render Docker Deployment Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Push to GitHub
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit - Ready for Render deployment"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/meal-calorie-frontend.git
git push -u origin main
```

### Step 2: Deploy to Render
1. **Visit**: [render.com](https://render.com)
2. **Sign up** with GitHub (free account)
3. **New → Web Service**
4. **Connect your GitHub repository**
5. **Configure settings:**

```
Name: meal-calorie-frontend
Environment: Docker
Branch: main
Root Directory: (leave blank)
Dockerfile Path: ./Dockerfile
```

### Step 3: Environment Variables
Add these in Render dashboard:
```
NEXT_PUBLIC_API_BASE_URL = https://meal-calorie-backend-shubham.onrender.com/api
NODE_ENV = production
PORT = 3000
```

### Step 4: Deploy!
- Click **Create Web Service**
- Wait 3-5 minutes for build and deployment
- Your app will be live at: `https://your-app-name.onrender.com`

---

## 🔄 Auto-Deployment with GitHub Actions

✅ **Already configured!** Every push to `main` branch will:
1. Run tests and linting
2. Build the application
3. Trigger auto-deployment to Render

Check `.github/workflows/render-deploy.yml` for the workflow.

---

## 📋 What's Included

✅ **Dockerfile** - Optimized multi-stage Docker build  
✅ **render.yaml** - Render service configuration  
✅ **.dockerignore** - Optimized Docker context  
✅ **GitHub Actions** - CI/CD pipeline  
✅ **next.config.ts** - Updated for standalone output  

---

## 🛠️ Local Docker Testing

Test your Docker setup locally:

```bash
# Build the Docker image
docker build -t meal-calorie-frontend .

# Run the container
docker run -p 3000:3000 -e NEXT_PUBLIC_API_BASE_URL=https://meal-calorie-backend-shubham.onrender.com/api meal-calorie-frontend

# Open http://localhost:3000
```

---

## 🔧 Troubleshooting

### Build Failures
```bash
# Check Docker build locally
docker build . --no-cache

# Check Next.js build
npm run build
```

### Memory Issues
If build fails due to memory limits on Render free tier:
1. Go to Render dashboard
2. Settings → Advanced
3. Add build command: `npm run build -- --max-old-space-size=1024`

### Environment Variables
- Make sure all env vars are set in Render dashboard
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Redeploy after changing environment variables

---

## 📊 Render Free Tier Limits

- ✅ **750 hours/month** (enough for 24/7)
- ✅ **Custom domains** supported
- ✅ **Automatic HTTPS** certificates
- ⚠️ **Spins down after 15min** of inactivity
- ⚠️ **Cold start delay** (~30 seconds)

---

## 🎯 Next Steps

1. **Custom Domain**: Add your domain in Render dashboard
2. **Monitoring**: Set up health checks
3. **Scaling**: Upgrade to paid plan for always-on service
4. **Database**: Add PostgreSQL service if needed

---

## 🔗 Useful Links

- **Render Dashboard**: https://dashboard.render.com
- **Render Docs**: https://render.com/docs
- **Your Backend API**: https://meal-calorie-backend-shubham.onrender.com/api

---

## 🎉 Success Checklist

- [ ] Repository pushed to GitHub
- [ ] Render service created and connected
- [ ] Environment variables configured
- [ ] First deployment successful
- [ ] Website accessible and functional
- [ ] Auto-deployment working on git push

**🚀 Your app will be live at: `https://your-app-name.onrender.com`**
