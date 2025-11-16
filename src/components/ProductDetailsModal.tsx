import { X, ShoppingCart, Package, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types/product";

interface ProductDetailsModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailsModal = ({
  open,
  onClose,
  product,
  onAddToCart,
}: ProductDetailsModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Product Details</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover"
            />
            <Badge className="absolute top-4 left-4 bg-primary">
              {product.category}
            </Badge>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.8/5)</span>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                Description
              </p>
              <p className="text-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">In Stock - Ships within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Premium Quality Guaranteed</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground">Price:</span>
                <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>

              <Button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Free Shipping</strong> on orders above ₹1000 •
                <strong> 30-day Returns</strong> •
                <strong> 1 Year Warranty</strong>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
