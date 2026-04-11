import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Star, Trash2, Plus, Minus } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveFromCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export default function Cart({
  isOpen,
  onClose,
  items,
  onRemoveFromCart,
  onUpdateQuantity,
}: CartProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * 80 * item.quantity,
    0,
  );
  const shipping = subtotal > 6000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="animate-in fade-in-0 slide-in-from-right-5 duration-300 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <Card className="border-0 shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <Badge variant="secondary" className="text-sm">
                {items.reduce((sum, item) => sum + item.quantity, 0)} items
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

          <CardContent className="p-0 max-h-[50vh] overflow-y-auto">
            {items.length === 0 ? (
              <div className="text-center py-16 px-6">
                <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-4xl">🛒</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground mb-6">
                  Add some items to get started
                </p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-4 p-6">
                {items.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-muted/50 to-card rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground font-medium">
                                {product.brand}
                              </p>
                              <h3 className="font-semibold text-sm leading-tight">
                                {product.name}
                              </h3>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">
                                  {product.rating}
                                </span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 hover:scale-110 transition-transform duration-300"
                              onClick={() => onRemoveFromCart(product.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
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
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  onUpdateQuantity(
                                    product.id,
                                    Math.max(1, product.quantity - 1),
                                  )
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">
                                {product.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  onUpdateQuantity(
                                    product.id,
                                    product.quantity + 1,
                                  )
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold">
                              ₹{product.price * 80 * product.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>

          {items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                {subtotal < 6000 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{(6000 - subtotal).toLocaleString()} more for free
                    shipping
                  </p>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Continue Shopping
                </Button>
                <Button
                  className="flex-1"
                  style={{ backgroundColor: "rgba(63, 60, 68, 1)" }}
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
