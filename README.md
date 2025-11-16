
# 🛒 Vibe Commerce – Full Stack E-Commerce Cart

*A simple, clean, and fully working shopping cart built from scratch.*

## 🚀 Overview

I built **Vibe Commerce** as a complete full-stack assignment covering **React + TypeScript + Node.js + MongoDB**.
The goal was to create a small but production-ready shopping cart with products, cart management, and a mock checkout flow.

This project meets **100% of the required features** + **all bonus tasks**.

---

## ✅ Features

### 🔹 Backend (Node + Express + MongoDB)

* `GET /products` – fetch 10 products
* `POST /cart` – add to cart
* `DELETE /cart/:id` – remove item
* `GET /cart` – get user cart
* `POST /checkout` – mock order receipt

**Bonus:**

* Update quantity, clear cart, order history
* MongoDB persistence
* Global error handling

### 🔹 Frontend (React + TypeScript + Tailwind)

* Product grid with “Add to Cart”
* Cart drawer with quantity controls
* Checkout modal (name + email)
* Order receipt pop-up
* Fully responsive UI
* Clean component structure

---

## 📦 Quick Setup

```bash
# Clone
git clone <repo-url>
cd vibe-commerce

# Frontend
npm install
npm run dev

# Backend
cd backend
npm install
cp .env.example .env   # Add MongoDB URI
npm run seed
npm run dev
```

**Frontend:** [http://localhost:8080](http://localhost:8080)
**Backend:** [http://localhost:5000/api](http://localhost:5000/api)

---

## 📚 API Endpoints

```
GET    /api/products
POST   /api/cart
DELETE /api/cart/:id
GET    /api/cart
POST   /api/checkout
```

Bonus endpoints included (product by ID, update qty, clear cart, order history, etc.)

---

## 🏗️ Tech Stack

### Frontend

* React + TypeScript
* Vite + Tailwind CSS
* shadcn/ui
* Axios

### Backend

* Node.js + Express
* MongoDB Atlas + Mongoose

---

## 📂 Project Structure

```
backend/
  controllers/
  models/
  routes/
  scripts/seedData.js

src/
  components/
  pages/
  services/api.ts
```

---

## 🏆 Completed Requirements

✔ All 5 backend APIs
✔ All 6 frontend features
✔ All 3 bonus features
✔ MongoDB integrated
✔ Postman collection added
✔ Screenshots & documentation included



If you want, I can also create a **super-short README**, a **portfolio-style version**, or a **recruiter-friendly version**.
