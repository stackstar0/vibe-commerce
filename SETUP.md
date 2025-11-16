# 🚀 Quick Setup Guide - Vibe Commerce

## ⚡ Quick Start (5 Minutes)

### Step 1: Install MongoDB (if not installed)

**macOS (Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**Windows:**
- Download from https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Or use MongoDB Atlas (Cloud):**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update `backend/.env` with your connection string

---

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Verify .env file exists (already created)
cat .env

# Seed database with products
npm run seed

# Expected output:
# ✅ Connected to MongoDB
# 🗑️  Cleared existing products
# ✨ Successfully seeded 10 products

# Start backend server
npm run dev

# Expected output:
# ╔═══════════════════════════════════════════╗
# ║   🚀 Vibe Commerce API Server Running    ║
# ║   📡 Port: 5000                          ║
# ║   🌍 Environment: development            ║
# ║   🔗 URL: http://localhost:5000          ║
# ╚═══════════════════════════════════════════╝
# ✅ MongoDB Connected: localhost
```

**Keep this terminal running!**

---

### Step 3: Frontend Setup (New Terminal)

```bash
# Navigate to project root
cd swift-checkout-fun-main

# Install dependencies
npm install

# Verify .env exists
cat .env
# Should show: VITE_API_URL=http://localhost:5000/api

# Start frontend dev server
npm run dev

# Expected output:
# VITE v5.4.19  ready in 500 ms
# ➜  Local:   http://localhost:8080/
# ➜  Network: use --host to expose
```

---

### Step 4: Open Application

🎉 Open browser: **http://localhost:8080**

You should see:
- Product grid with 10 items
- Shopping cart in sidebar
- TechStore header

---

## ✅ Verification Checklist

### Backend Health Check
```bash
# Test API is running
curl http://localhost:5000/api/health

# Expected response:
# {
#   "success": true,
#   "message": "Vibe Commerce API is running",
#   "timestamp": "2025-10-27T..."
# }
```

### Test Products Endpoint
```bash
curl http://localhost:5000/api/products

# Should return JSON with 10 products
```

### Test Frontend
- [ ] Products load and display
- [ ] Can add items to cart
- [ ] Cart badge updates
- [ ] Toast notifications appear
- [ ] Can update quantities
- [ ] Can remove items
- [ ] Checkout modal opens
- [ ] Form validation works
- [ ] Order success modal appears

---

## 🔧 Troubleshooting

### MongoDB Connection Error
```
❌ Error: MongoServerError: connect ECONNREFUSED
```

**Fix:**
```bash
# Check if MongoDB is running
mongosh

# If not running:
# Mac:
brew services start mongodb-community

# Linux:
sudo systemctl start mongodb

# Windows:
net start MongoDB
```

### Port Already in Use
```
❌ Error: Port 5000 is already in use
```

**Fix:**
```bash
# Kill process on port 5000
# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in backend/.env:
PORT=5001
```

### Frontend API Connection Error
```
❌ Network Error: Failed to fetch
```

**Fix:**
1. Ensure backend is running on port 5000
2. Check `.env` file has correct API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
3. Restart frontend: `npm run dev`

### Products Not Loading
```
❌ No products displayed
```

**Fix:**
```bash
# Reseed database
cd backend
npm run seed

# Restart backend
npm run dev
```

---

## 📦 Database Management

### View Database
```bash
# Connect to MongoDB
mongosh

# Switch to database
use vibe-commerce

# View products
db.products.find().pretty()

# View carts
db.carts.find().pretty()

# View orders
db.orders.find().pretty()

# Count documents
db.products.countDocuments()  // Should be 10

# Exit
exit
```

### Reset Database
```bash
cd backend
npm run seed  # Clears and reseeds products
```

### Clear Cart
```bash
mongosh vibe-commerce
db.carts.deleteMany({})
exit
```

---

## 🌐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
NODE_ENV=development
MOCK_USER_ID=user_123456
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Testing API with Postman

### Import Collection

**1. Get Products**
```
GET http://localhost:5000/api/products
```

**2. Add to Cart**
```
POST http://localhost:5000/api/cart
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2
}
```

**3. Get Cart**
```
GET http://localhost:5000/api/cart
```

**4. Update Cart**
```
PUT http://localhost:5000/api/cart/1
Content-Type: application/json

{
  "quantity": 5
}
```

**5. Remove from Cart**
```
DELETE http://localhost:5000/api/cart/1
```

**6. Checkout**
```
POST http://localhost:5000/api/checkout
Content-Type: application/json

{
  "cartItems": [
    {
      "productId": 1,
      "name": "Wireless Gaming Mouse",
      "price": 799,
      "quantity": 2
    }
  ],
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "address": "123 Main St, City"
  }
}
```

---

## 🎯 Development Workflow

### Normal Development
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
npm run dev

# Terminal 3: MongoDB (optional)
mongosh vibe-commerce
```

### Making Changes

**Backend Changes:**
- Edit files in `backend/`
- Server auto-restarts (nodemon)
- Test with Postman/curl

**Frontend Changes:**
- Edit files in `src/`
- Hot reload updates browser
- Check console for errors

**Database Changes:**
- Modify schemas in `backend/models/`
- Run seed script to apply
- Restart backend

---

## 📱 Mobile Testing

### Test Responsive Design
```bash
# Open in browser
http://localhost:8080

# Then:
1. Press F12 (DevTools)
2. Click device toolbar icon
3. Select mobile device
4. Test all features
```

### Common Breakpoints
- Mobile: 375px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

---

## 🐛 Debug Mode

### Backend Debugging
```bash
# Enable detailed logging
NODE_ENV=development npm run dev

# Check MongoDB queries
# Add to controller:
console.log('Query:', query);
console.log('Result:', result);
```

### Frontend Debugging
```javascript
// In browser console:
localStorage.getItem('cart')  // Check cart data
axios.defaults.baseURL  // Check API URL

// In code:
console.log('API Response:', response);
console.log('Cart Items:', cartItems);
```

---

## 📊 Monitor Resources

### Check System Resources
```bash
# Backend memory usage
top -p $(pgrep -f "node server.js")

# MongoDB status
mongosh --eval "db.serverStatus()"

# Frontend build
npm run build
# Check dist/ folder size
```

---

## 🚀 Production Build

### Build Frontend
```bash
npm run build

# Output in dist/
# Serve with:
npm run preview
```

### Optimize Backend
```bash
cd backend
NODE_ENV=production npm start
```

---

## 💡 Pro Tips

1. **Always seed database first** before testing
2. **Keep terminals visible** to see API logs
3. **Use incognito mode** for clean testing
4. **Check MongoDB data** if something seems off
5. **Restart both servers** if things break
6. **Clear browser cache** for frontend issues

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Cart not updating | Check backend logs, verify API call |
| Products not loading | Reseed database, check MongoDB |
| CORS errors | Verify backend CORS config |
| Build errors | Delete node_modules, reinstall |
| Port conflicts | Change port in .env |
| TypeScript errors | Run `npm install` again |

---

## ✅ Pre-Demo Checklist

Before recording demo:
- [ ] MongoDB running
- [ ] Backend running on :5000
- [ ] Frontend running on :8080
- [ ] Database seeded
- [ ] Cart cleared
- [ ] Browser cache cleared
- [ ] All features tested
- [ ] No console errors
- [ ] Responsive design works

---

<div align="center">

**Ready to Rock! 🎸**

*If you encounter any issues, check the logs first!*

</div>
