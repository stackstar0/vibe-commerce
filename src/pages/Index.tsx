import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailsModal } from "@/components/ProductDetailsModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";
import { productsAPI, cartAPI } from "@/services/api";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Fetch products and cart on mount
  useEffect(() => {
    fetchProducts();
    fetchCartCount();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);

      // Fallback to local data if API fails
      const { products: localProducts } = await import("@/data/products");
      setProducts(localProducts);

      toast({
        title: "Using Local Data",
        description: "Backend not connected. Start MongoDB and backend server for full features.",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCartCount = async () => {
    try {
      const response = await cartAPI.get();
      const items = response.data?.items || [];
      const count = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartItemsCount(count);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (product: Product) => {
    try {
      setCartLoading(true);
      await cartAPI.add(product.id, 1);
      await fetchCartCount();
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setCartLoading(false);
    }
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Vibe Commerce
              </h1>
              <p className="text-sm text-muted-foreground">Premium Fashion & Apparel</p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/cart")}
              className="relative"
            >
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Cart
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-accent">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Featured Products</h2>
            <p className="text-lg text-muted-foreground">
              Discover our premium collection of fashion & apparel
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onViewDetails={handleViewDetails}
                  disabled={cartLoading}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Product Details Modal */}
      <ProductDetailsModal
        open={showProductDetails}
        onClose={() => setShowProductDetails(false)}
        product={selectedProduct}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default Index;
