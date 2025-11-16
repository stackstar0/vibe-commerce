// MongoDB initialization script
db = db.getSiblingDB('vibe-commerce');

// Create collections
db.createCollection('products');
db.createCollection('carts');
db.createCollection('orders');

// Create indexes for better performance
db.products.createIndex({ "id": 1 }, { unique: true });
db.carts.createIndex({ "userId": 1 });
db.orders.createIndex({ "userId": 1 });
db.orders.createIndex({ "createdAt": 1 });

print('Database initialized successfully');