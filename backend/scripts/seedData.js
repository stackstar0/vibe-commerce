import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const products = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: 1299,
    category: "Dresses",
    description: "Beautiful floral print summer dress with lightweight fabric. Perfect for casual outings and beach days. Features adjustable straps and a flattering A-line silhouette.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    stock: 50,
    featured: true,
  },
  {
    id: 2,
    name: "Leather Ankle Boots",
    price: 2499,
    category: "Shoes",
    description: "Premium genuine leather ankle boots with comfortable heel. Versatile design suitable for both casual and formal occasions. Features cushioned insole for all-day comfort.",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
    stock: 35,
    featured: true,
  },
  {
    id: 3,
    name: "Designer Handbag",
    price: 3999,
    category: "Bags",
    description: "Elegant designer handbag crafted from premium materials. Spacious interior with multiple compartments. Features gold-tone hardware and adjustable strap.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    stock: 45,
    featured: true,
  },
  {
    id: 4,
    name: "Denim Jacket",
    price: 1799,
    category: "Outerwear",
    description: "Classic denim jacket with modern fit. Premium quality denim with distressed details. Perfect layering piece for any season.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    stock: 60,
    featured: false,
  },
  {
    id: 5,
    name: "Gold Statement Necklace",
    price: 899,
    category: "Jewelry",
    description: "Stunning gold-plated statement necklace. Adds elegance to any outfit. Hypoallergenic and tarnish-resistant. Comes with beautiful gift packaging.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    stock: 75,
    featured: true,
  },
  {
    id: 6,
    name: "Silk Scarf",
    price: 699,
    category: "Accessories",
    description: "Luxurious 100% silk scarf with vibrant print. Versatile accessory that can be worn multiple ways. Adds a pop of color to any ensemble.",
    image: "https://images.unsplash.com/photo-1601924638867-4a2f0f6d0c0f?w=800&q=80",
    stock: 40,
    featured: false,
  },
  {
    id: 7,
    name: "High-Waisted Jeans",
    price: 1599,
    category: "Bottoms",
    description: "Trendy high-waisted jeans with comfortable stretch denim. Flattering fit with classic five-pocket styling. Available in timeless blue wash.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
    stock: 30,
    featured: false,
  },
  {
    id: 8,
    name: "Sunglasses",
    price: 1199,
    category: "Accessories",
    description: "Stylish cat-eye sunglasses with UV protection. Lightweight frames with gradient lenses. Comes with protective case and cleaning cloth.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    stock: 55,
    featured: false,
  },
  {
    id: 9,
    name: "Evening Gown",
    price: 4999,
    category: "Dresses",
    description: "Elegant floor-length evening gown perfect for special occasions. Features intricate beading and flowing silhouette. Hidden back zipper and fully lined.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
    stock: 25,
    featured: true,
  },
  {
    id: 10,
    name: "Sneakers",
    price: 2299,
    category: "Shoes",
    description: "Comfortable fashion sneakers with premium leather upper. Cushioned sole for all-day wear. Trendy design suitable for casual and athleisure looks.",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
    stock: 80,
    featured: false,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log(`✨ Successfully seeded ${products.length} products`);

    console.log('\n📦 Products:');
    products.forEach((p) => {
      console.log(`   ${p.id}. ${p.name} - ₹${p.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
