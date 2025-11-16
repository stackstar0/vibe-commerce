# 🚀 Deployment Guide - Vibe Commerce

## Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git installed
- GitHub account

## 📦 Project Structure
```
vibe-commerce/
├── backend/           # Node.js + Express API
├── src/              # React + TypeScript frontend
├── public/           # Static assets
└── documentation/    # Project docs
```

## 🔧 Local Setup

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/vibe-commerce.git
cd vibe-commerce
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI
```

**Backend .env:**
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
MOCK_USER_ID=user_123456
```

### 3. Seed Database
```bash
npm run seed
```

### 4. Start Backend
```bash
npm run dev
# Backend runs on http://localhost:5000
```

### 5. Frontend Setup (New Terminal)
```bash
cd ..  # Back to root
npm install

# Create .env file
cp .env.example .env
```

**Frontend .env:**
```env
VITE_API_URL=http://localhost:5000/api
```

### 6. Start Frontend
```bash
npm run dev
# Frontend runs on http://localhost:8080
```

## 🌐 Deployment Options

### Option 1: Deploy to Render (Recommended for Full Stack)

#### Backend Deployment
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: vibe-commerce-api
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   NODE_ENV=production
   MOCK_USER_ID=user_123456
   ```

6. Click "Create Web Service"
7. Copy your backend URL (e.g., https://vibe-commerce-api.onrender.com)

#### Frontend Deployment
1. Click "New +" → "Static Site"
2. Connect your repository
3. Configure:
   - **Name**: vibe-commerce
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: dist

4. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

5. Click "Create Static Site"

### Option 2: Deploy to Vercel (Frontend) + Render (Backend)

#### Backend on Render
Same as Option 1 above

#### Frontend on Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts and set environment variable:
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Option 3: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add two services:
   - **Backend**: Node.js service from /backend
   - **Frontend**: Static site from root

4. Configure backend environment variables
5. Update frontend to use backend Railway URL

## 📝 GitHub Repository Setup

### Create Repository
1. Go to https://github.com/new
2. Repository name: `vibe-commerce` (or your preferred name)
3. Description: "Premium Fashion E-Commerce Platform - Full Stack MERN Application"
4. Choose Public or Private
5. Click "Create repository"

### Push Code
```bash
# In your project directory
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

## 🔐 Environment Variables Checklist

### Backend (.env)
- [x] PORT
- [x] MONGODB_URI
- [x] NODE_ENV
- [x] MOCK_USER_ID

### Frontend (.env)
- [x] VITE_API_URL

## ✅ Pre-Deployment Checklist

- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Database seeded with products
- [ ] Backend running locally (test: http://localhost:5000/api/products)
- [ ] Frontend running locally (test: http://localhost:8080)
- [ ] API calls working between frontend and backend
- [ ] Git repository initialized
- [ ] .env files added to .gitignore
- [ ] Code committed to GitHub
- [ ] README.md updated with deployment URL

## 🧪 Testing Deployment

### Backend Health Check
```bash
curl https://your-backend-url.com/api/products
```

Should return JSON with 10 fashion products.

### Frontend Check
1. Visit your frontend URL
2. Products should load
3. Try adding items to cart
4. Test checkout flow
5. Verify all features work

## 🐛 Troubleshooting

### CORS Issues
If frontend can't connect to backend, add CORS configuration in `backend/server.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:8080', 'https://your-frontend-url.com'],
  credentials: true
}));
```

### MongoDB Connection Issues
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for cloud deployment)
- Verify connection string format
- Ensure database user has read/write permissions

### Build Failures
- Check Node.js version (should be 18+)
- Clear node_modules and reinstall
- Verify all dependencies in package.json

## 📊 Post-Deployment

### Monitor Your App
- Check deployment logs
- Test all API endpoints
- Verify database connections
- Monitor performance

### Update DNS (Optional)
- Add custom domain in deployment platform
- Update CNAME records
- Enable HTTPS/SSL

## 🎯 Production URLs

After deployment, update these in your README:

- **Live Demo**: https://your-app.vercel.app
- **API Endpoint**: https://your-api.onrender.com
- **GitHub Repo**: https://github.com/YOUR_USERNAME/vibe-commerce

## 📞 Support

If you encounter issues:
1. Check deployment platform logs
2. Verify environment variables
3. Test API endpoints individually
4. Review CORS configuration
5. Check MongoDB Atlas network access

---

**Deployment Status**: Ready for Production ✅

**Last Updated**: October 28, 2025
