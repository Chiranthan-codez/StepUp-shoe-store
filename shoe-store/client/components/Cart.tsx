import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Star,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CheckCircle2,
  CreditCard,
  Loader2,
  FileText,
  Smartphone,
  Landmark,
  Banknote,
  Wallet,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { apiUrl } from "@/lib/api";

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

interface OrderData {
  orderNumber: string;
  total: number;
  subtotal: number;
  shipping: number;
  items: any[];
  createdAt: string;
  paymentMethod: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveFromCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onOrderComplete?: () => void;
}

const paymentMethods = [
  {
    id: "upi",
    name: "UPI",
    description: "Google Pay, PhonePe, Paytm",
    icon: Smartphone,
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  },
  {
    id: "card",
    name: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay",
    icon: CreditCard,
    color: "#0ea5e9",
    gradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    description: "All major banks supported",
    icon: Landmark,
    color: "#14b8a6",
    gradient: "linear-gradient(135deg, #14b8a6, #2dd4bf)",
  },
  {
    id: "wallet",
    name: "Wallet",
    description: "Amazon Pay, Mobikwik",
    icon: Wallet,
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when you receive",
    icon: Banknote,
    color: "#22c55e",
    gradient: "linear-gradient(135deg, #22c55e, #4ade80)",
  },
];

export default function Cart({
  isOpen,
  onClose,
  items,
  onRemoveFromCart,
  onUpdateQuantity,
  onOrderComplete,
}: CartProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * 80 * item.quantity,
    0,
  );
  const shipping = subtotal > 6000 ? 0 : 500;
  const total = subtotal + shipping;

  const handleProceedToPayment = () => {
    setShowPaymentOptions(true);
  };

  const handlePaymentSelect = async (methodId: string) => {
    setSelectedPayment(methodId);
    setShowPaymentOptions(false);
    setIsProcessing(true);

    try {
      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const res = await fetch(apiUrl("/api/orders"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          paymentMethod: methodId,
          shippingAddress: "Default Address",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Payment failed");
      }

      const data = await res.json();
      setOrderData({ ...data.order, paymentMethod: methodId });
      setOrderComplete(true);
      onOrderComplete?.();
    } catch (err: any) {
      alert(err.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
      setSelectedPayment(null);
    }
  };

  const handleCloseAfterOrder = () => {
    setOrderComplete(false);
    setOrderData(null);
    setShowPaymentOptions(false);
    onClose();
  };

  const handleBackToCart = () => {
    setShowPaymentOptions(false);
    setSelectedPayment(null);
  };

  // ─── ORDER CONFIRMATION / INVOICE ───
  if (orderComplete && orderData) {
    const methodInfo = paymentMethods.find((m) => m.id === orderData.paymentMethod);
    return (
      <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div className="animate-in fade-in-0 zoom-in-95 duration-300 w-full max-w-lg my-auto">
          <Card className="border-0 shadow-2xl">
            <div
              className="p-8 text-center"
              style={{
                background: "linear-gradient(135deg, #059669, #10b981)",
              }}
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-in zoom-in-50 duration-500">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Payment Successful!
              </h2>
              <p className="text-emerald-100 text-sm">
                Your order has been confirmed
              </p>
            </div>

            <CardContent className="p-6 space-y-4">
              <div
                className="p-4 rounded-xl"
                style={{
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">
                    Invoice
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Number</span>
                    <span className="font-mono font-semibold">
                      {orderData.orderNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>
                      {new Date(orderData.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Paid via</span>
                    <span className="font-medium">{methodInfo?.name || orderData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge
                      className="text-xs"
                      style={{
                        background: "rgba(16, 185, 129, 0.15)",
                        color: "#059669",
                        border: "1px solid rgba(16, 185, 129, 0.3)",
                      }}
                    >
                      Paid ✓
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {orderData.items.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm py-2 border-b last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.brand} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{orderData.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={orderData.shipping === 0 ? "text-emerald-600" : ""}>
                    {orderData.shipping === 0 ? "Free" : `₹${orderData.shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-1 border-t">
                  <span>Total Paid</span>
                  <span style={{ color: "#059669" }}>
                    ₹{orderData.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                className="w-full h-12 font-semibold text-base"
                onClick={handleCloseAfterOrder}
                style={{
                  background: "linear-gradient(135deg, #059669, #10b981)",
                  color: "white",
                }}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ─── PAYMENT PROCESSING SPINNER ───
  if (isProcessing) {
    const method = paymentMethods.find((m) => m.id === selectedPayment);
    const MethodIcon = method?.icon || CreditCard;
    return (
      <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="animate-in fade-in-0 zoom-in-95 duration-300 w-full max-w-sm">
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-12 text-center space-y-6">
              <div className="relative w-24 h-24 mx-auto">
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-20"
                  style={{ background: method?.gradient || "rgba(208,2,27,0.2)" }}
                />
                <div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ background: `${method?.color}15` || "rgba(208,2,27,0.1)" }}
                >
                  <Loader2
                    className="w-10 h-10 animate-spin"
                    style={{ color: method?.color || "rgb(208, 2, 27)" }}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Processing Payment</h3>
                <p className="text-sm text-muted-foreground">
                  Paying via <span className="font-semibold">{method?.name}</span>
                </p>
                <p className="text-lg font-bold mt-2">₹{total.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <MethodIcon className="h-3.5 w-3.5" />
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ─── PAYMENT METHOD SELECTION ───
  if (showPaymentOptions) {
    return (
      <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div className="animate-in fade-in-0 slide-in-from-bottom-5 duration-300 w-full max-w-md my-auto">
          <Card className="border-0 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-bold">Choose Payment Method</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Total: <span className="font-semibold text-foreground">₹{total.toLocaleString()}</span>
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToCart}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <CardContent className="p-4 space-y-2 overflow-y-auto">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    className="w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group text-left"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `${method.color}10`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${method.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    }}
                    onClick={() => handlePaymentSelect(method.id)}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ background: method.gradient }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{method.name}</p>
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </button>
                );
              })}
            </CardContent>

            <div className="p-4 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleBackToCart}
              >
                Back to Cart
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ─── MAIN CART VIEW ───
  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="animate-in fade-in-0 slide-in-from-right-5 duration-300 w-full max-w-2xl my-auto">
        <Card className="border-0 shadow-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(208,2,27,0.1), rgba(255,100,50,0.1))",
                }}
              >
                <ShoppingBag className="h-5 w-5" style={{ color: "rgb(208, 2, 27)" }} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <p className="text-xs text-muted-foreground">
                  {items.reduce((sum, item) => sum + item.quantity, 0)} items
                </p>
              </div>
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

          <CardContent className="p-0 flex-1 overflow-y-auto min-h-0">
            {items.length === 0 ? (
              <div className="text-center py-16 px-6">
                <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-4xl">🛒</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Add some items to get started
                </p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="divide-y">
                {items.map((product) => (
                  <div key={product.id} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-muted/50 to-card rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground font-medium">{product.brand}</p>
                            <h3 className="font-semibold text-sm leading-tight truncate">{product.name}</h3>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{product.rating}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive hover:scale-110 transition-all duration-300 flex-shrink-0"
                            onClick={() => onRemoveFromCart(product.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">₹{(product.price * 80).toLocaleString()}</span>
                            {product.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through">
                                ₹{(product.originalPrice * 80).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-lg"
                              onClick={() => onUpdateQuantity(product.id, Math.max(1, product.quantity - 1))}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-semibold">{product.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-lg"
                              onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold">
                            ₹{(product.price * 80 * product.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>

          {items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? "text-emerald-600" : ""}`}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                {subtotal < 6000 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{(6000 - subtotal).toLocaleString()} more for free shipping
                  </p>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} className="flex-1 h-12">
                  Continue Shopping
                </Button>
                <Button
                  className="flex-1 h-12 font-semibold text-base border-0"
                  style={{
                    background: "linear-gradient(135deg, rgb(208,2,27), rgb(160,0,20))",
                    color: "white",
                    boxShadow: "0 4px 24px rgba(208, 2, 27, 0.3)",
                  }}
                  onClick={handleProceedToPayment}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Buy Now
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <CreditCard className="h-3 w-3" />
                <span>Secure payment • SSL encrypted</span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
