import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Star, Trash2, ShoppingBag } from "lucide-react";

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onRemoveFromWishlist: (productId: number) => void;
  onAddToCart: (product: any) => void;
}

export default function Wishlist({
  isOpen,
  onClose,
  items,
  onRemoveFromWishlist,
  onAddToCart,
}: WishlistProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="animate-in fade-in-0 zoom-in-95 duration-300 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <Card className="border-0 shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">My Wishlist</h2>
              <Badge variant="secondary" className="text-sm">
                {items.length} items
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 hover:scale-110 transition-transform duration-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <CardContent className="p-6 max-h-[70vh] overflow-y-auto">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-4xl">💝</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-muted-foreground mb-6">
                  Add items you love to keep track of them
                </p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/50 to-card">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover p-2 group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-2 right-2 w-8 h-8 hover:scale-110 transition-transform duration-300"
                        onClick={() => onRemoveFromWishlist(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2 bg-primary text-xs">
                          New
                        </Badge>
                      )}
                      {product.originalPrice && (
                        <Badge
                          variant="destructive"
                          className="absolute bottom-2 left-2 text-xs"
                        >
                          Sale
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">
                          {product.brand}
                        </p>
                        <h3 className="font-semibold text-sm leading-tight">
                          {product.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">
                            ₹{product.price * 80}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              ₹{product.originalPrice * 80}
                            </span>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        className="w-full hover:scale-105 transition-transform duration-300"
                        style={{ backgroundColor: "rgba(63, 60, 68, 1)" }}
                        onClick={() => onAddToCart(product)}
                      >
                        <ShoppingBag className="h-3 w-3 mr-2" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>

          {items.length > 0 && (
            <div className="border-t p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Total: {items.length} items in your wishlist
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={onClose}>
                    Continue Shopping
                  </Button>
                  <Button
                    onClick={() => {
                      items.forEach((item) => onAddToCart(item));
                      onClose();
                    }}
                    style={{ backgroundColor: "rgba(63, 60, 68, 1)" }}
                  >
                    Add All to Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
