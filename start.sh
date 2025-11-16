#!/bin/bash

# Vibe Commerce - Quick Start Script
# This script sets up and runs both frontend and backend

echo "╔═══════════════════════════════════════════╗"
echo "║   🚀 Vibe Commerce Quick Start           ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# Check if MongoDB is running
echo "📊 Checking MongoDB..."
if mongosh --eval "db.version()" > /dev/null 2>&1; then
    echo "✅ MongoDB is running"
else
    echo "❌ MongoDB is not running"
    echo "Please start MongoDB:"
    echo "  Mac: brew services start mongodb-community"
    echo "  Linux: sudo systemctl start mongodb"
    exit 1
fi

# Setup backend
echo ""
echo "📦 Setting up backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

# Seed database
echo "🌱 Seeding database..."
npm run seed

# Start backend in background
echo "🚀 Starting backend server..."
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo "✅ Backend is running on http://localhost:5000"
else
    echo "❌ Backend failed to start. Check backend.log"
    exit 1
fi

# Setup frontend
cd ..
echo ""
echo "📦 Setting up frontend..."

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start frontend
echo "🚀 Starting frontend server..."
echo ""
echo "╔═══════════════════════════════════════════╗"
echo "║   ✨ Vibe Commerce is starting...        ║"
echo "║                                           ║"
echo "║   Backend:  http://localhost:5000        ║"
echo "║   Frontend: http://localhost:8080        ║"
echo "║                                           ║"
echo "║   Press Ctrl+C to stop all servers       ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

trap cleanup INT TERM

# Start frontend (will run in foreground)
npm run dev

# Cleanup when frontend exits
cleanup
