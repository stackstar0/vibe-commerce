import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Gaming Mouse",
    price: 799,
    category: "Accessories",
    description: "High-precision wireless mouse with RGB lighting and programmable buttons",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 1499,
    category: "Accessories",
    description: "RGB backlit mechanical keyboard with Cherry MX switches",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
  },
  {
    id: 3,
    name: "Gaming Headphones",
    price: 999,
    category: "Audio",
    description: "7.1 surround sound gaming headset with noise cancellation",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80",
  },
  {
    id: 4,
    name: "USB-C Hub",
    price: 649,
    category: "Accessories",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&q=80",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: 1299,
    category: "Audio",
    description: "True wireless earbuds with active noise cancellation",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
  },
  {
    id: 6,
    name: "External SSD 1TB",
    price: 2499,
    category: "Storage",
    description: "Portable SSD with 1TB capacity and USB 3.2 Gen 2 speed",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80",
  },
  {
    id: 7,
    name: "Webcam 4K",
    price: 1799,
    category: "Accessories",
    description: "4K webcam with auto-focus and dual microphones",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&q=80",
  },
  {
    id: 8,
    name: "Laptop Stand",
    price: 599,
    category: "Accessories",
    description: "Adjustable aluminum laptop stand with ergonomic design",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
  },
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    
    // Filter by category if provided
    let filteredProducts = products;
    if (category) {
      filteredProducts = products.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        data: filteredProducts,
        count: filteredProducts.length 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});
