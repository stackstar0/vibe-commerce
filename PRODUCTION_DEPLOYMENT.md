# 🚀 Production Deployment Guide

This guide covers multiple deployment options for the Vibe Commerce application.

## 📋 Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ installed
- MongoDB Atlas account (for cloud database)
- Git repository setup

## 🏗️ Deployment Options

### 1. Docker Compose (Recommended for Self-Hosting)

#### Quick Start
```bash
# Clone the repository
git clone <your-repo-url>
cd vibe-commerce

# Configure environment variables
cp .env.example .env
# Edit .env with your configurations

# Deploy with our script
./deploy.sh docker
```

#### Manual Docker Compose
```bash
# Production deployment
docker-compose up --build -d

# Development deployment
docker-compose -f docker-compose.dev.yml up --build -d
```

### 2. Cloud Platform Deployment

#### Deploy to Render
1. Fork this repository to your GitHub account
2. Sign up for [Render](https://render.com)
3. Create a new Web Service for the backend:
   - Repository: Your forked repo
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     ```
     NODE_ENV=production
     PORT=5000
     MONGODB_URI=your_mongodb_atlas_uri
     MOCK_USER_ID=user_123456
     ```

4. Create a new Static Site for the frontend:
   - Repository: Your forked repo
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Environment Variables:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```

#### Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy backend
cd backend
railway up

# Deploy frontend
cd ..
railway up
```

#### Deploy to Vercel + Railway
```bash
# Deploy backend to Railway
cd backend
railway up

# Deploy frontend to Vercel
cd ..
npx vercel --prod
```

### 3. Kubernetes Deployment

```bash
# Apply Kubernetes manifests
kubectl apply -f k8s-deployment.yml

# Check deployment status
kubectl get pods -n vibe-commerce
```

## 🔧 Environment Configuration

### Backend Environment Variables
```env
# Required
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vibe-commerce

# Optional
MOCK_USER_ID=user_123456
CORS_ORIGIN=https://your-frontend-domain.com
JWT_SECRET=your-secret-key
LOG_LEVEL=info
```

### Frontend Environment Variables
```env
# Required
VITE_API_URL=https://your-backend-url.com/api

# Optional
VITE_NODE_ENV=production
VITE_ENABLE_DEBUG=false
```

## 🏃‍♂️ Quick Deployment Commands

### Using the Deployment Script
```bash
# Production deployment with Docker
./deploy.sh docker

# Development environment
./deploy.sh dev

# Build production images
./deploy.sh build

# View logs
./deploy.sh logs

# Cleanup resources
./deploy.sh cleanup
```

### Manual Commands
```bash
# Build frontend
npm run build:prod

# Build backend
cd backend && npm run prod

# Docker build
docker build -t vibe-commerce-frontend .
docker build -t vibe-commerce-backend ./backend

# Health checks
curl http://localhost:5000/api/health
curl http://localhost:80/health
```

## 🔍 Health Checks and Monitoring

### Health Check Endpoints
- Backend: `GET /api/health`
- Frontend: `GET /health` (nginx)

### Monitoring Commands
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f

# Monitor resources
docker stats

# Database status
docker-compose exec mongodb mongosh --eval "db.serverStatus()"
```

## 🛠️ Troubleshooting

### Common Issues

#### CORS Errors
- Update `CORS_ORIGIN` in backend environment
- Check frontend `VITE_API_URL` points to correct backend

#### Database Connection
- Verify MongoDB URI format
- Check network connectivity
- Ensure IP whitelist includes deployment server

#### Build Failures
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all environment variables are set

### Debug Commands
```bash
# Check container logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Test API connectivity
curl -v http://localhost:5000/api/health

# Test database connection
docker-compose exec backend npm run health-check
```

## 📊 Performance Optimization

### Production Optimizations Applied
- ✅ Docker multi-stage builds
- ✅ Nginx gzip compression
- ✅ Static asset caching
- ✅ Code splitting and minification
- ✅ Health checks and monitoring
- ✅ Security headers
- ✅ Non-root container users

### Scaling Considerations
- Use load balancer for multiple instances
- Implement Redis for session storage
- Add CDN for static assets
- Monitor database performance
- Set up log aggregation

## 🔐 Security Checklist

- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Input validation implemented
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Container security hardened

## 📈 CI/CD Pipeline

The repository includes GitHub Actions workflows:
- `.github/workflows/ci-cd.yml` - Main CI/CD pipeline
- `.github/workflows/deploy-render.yml` - Render deployment

### Required Secrets
```
RENDER_API_KEY
RENDER_BACKEND_SERVICE_ID
RENDER_FRONTEND_SERVICE_ID
BACKEND_URL
FRONTEND_URL
```

## 🎯 Next Steps

1. Set up monitoring and alerting
2. Configure backup strategies
3. Implement logging aggregation
4. Add performance monitoring
5. Set up automated testing
6. Configure SSL certificates
7. Set up domain and DNS

## 📞 Support

For deployment issues:
1. Check the logs first
2. Verify environment variables
3. Test health check endpoints
4. Review troubleshooting section
5. Check GitHub Issues for known problems