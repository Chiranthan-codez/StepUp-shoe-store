import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Clock, CheckCircle2, XCircle, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import { apiUrl } from "@/lib/api";

interface OrderItem {
  id: number;
  product_name: string;
  product_brand: string;
  product_image: string;
  price: number;
  quantity: number;
  size: string;
}

interface Order {
  id: number;
  order_number: string;
  total: number;
  subtotal: number;
  shipping: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
  items: OrderItem[];
}

interface OrdersProps {
  onBack: () => void;
}

export default function Orders({ onBack }: OrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiUrl('/api/orders'), { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'delivered':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'cancelled':
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'delivered':
        return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400";
      case 'cancelled':
      case 'failed':
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 sm:mb-6 hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold">My Orders</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl font-sans">
            Track your recent purchases and manage your order history.
          </p>
        </div>
      </div>

      {/* Orders List */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <Card key={n} className="animate-pulse h-40" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-6">Looks like you haven't made any purchases yet.</p>
              <Button onClick={onBack}>Start Shopping</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden border-2 transition-all duration-300 hover:border-primary/20">
                  <div
                    className="p-6 cursor-pointer bg-card/50 hover:bg-muted/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                        <p className="font-mono font-semibold">{order.order_number}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Date</p>
                        <p className="font-medium">
                          {new Date(order.created_at).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total</p>
                        <p className="font-bold">₹{Number(order.total).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Status</p>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.order_status)}
                          <Badge variant="outline" className={getStatusColor(order.order_status)}>
                            {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end">
                      {expandedOrder === order.id ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Items */}
                  {expandedOrder === order.id && (
                    <CardContent className="p-0 border-t bg-muted/10">
                      <div className="p-6">
                        <h4 className="font-semibold mb-4 text-lg">Order Items</h4>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-background border">
                              <div className="w-20 h-20 bg-muted/50 rounded-lg overflow-hidden flex-shrink-0">
                                {item.product_image ? (
                                  <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No Image</div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground mb-1">{item.product_brand}</p>
                                <h5 className="font-semibold text-base truncate">{item.product_name}</h5>
                                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                  <span>Qty: {item.quantity}</span>
                                  <span>•</span>
                                  <span>Size: {item.size}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">₹{Number(item.price).toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Summary */}
                        <div className="mt-6 p-4 rounded-xl bg-card border">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Payment Method</span>
                              <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium uppercase">{order.payment_method}</span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Payment Status</span>
                              <Badge variant="outline" className={order.payment_status === 'paid' ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}>
                                {order.payment_status.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="border-t pt-2 mt-2">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>₹{Number(order.subtotal).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>{Number(order.shipping) === 0 ? "Free" : `₹${Number(order.shipping)}`}</span>
                              </div>
                              <div className="flex justify-between mt-2 pt-2 border-t font-bold text-lg">
                                <span>Total Paid</span>
                                <span>₹{Number(order.total).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
