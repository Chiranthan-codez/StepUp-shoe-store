import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Eye, ArrowLeft } from "lucide-react";
import { useState } from "react";

const kidsShoes = [
  {
    id: 301,
    name: "Rainbow Sneaker",
    brand: "Coverse Kids",
    price: 89,
    originalPrice: 109,
    image:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&crop=center",
    previewImages: [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop&crop=center",
    ],
    rating: 4.8,
    reviews: 156,
    isNew: true,
    category: "Casual",
    colors: ["Rainbow", "Pink", "Blue"],
  },
  {
    id: 302,
    name: "Little Explorer",
    brand: "Nike Kids",
    price: 79,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 134,
    isNew: false,
    category: "Outdoor",
    colors: ["Green", "Orange", "Navy"],
  },
  {
    id: 303,
    name: "School Runner",
    brand: "New Balance Kids",
    price: 69,
    originalPrice: 89,
    image:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 98,
    isNew: true,
    category: "School",
    colors: ["Black", "White", "Red"],
  },
  {
    id: 304,
    name: "Princess Sparkle",
    brand: "Skechers Kids",
    price: 59,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop&crop=center",
    rating: 4.9,
    reviews: 203,
    isNew: false,
    category: "Casual",
    colors: ["Pink", "Purple", "Silver"],
  },
  {
    id: 305,
    name: "Soccer Star",
    brand: "Nike Kids",
    price: 99,
    originalPrice: 129,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d2f?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviews: 167,
    isNew: true,
    category: "Sports",
    colors: ["Blue", "Yellow", "White"],
  },
  {
    id: 306,
    name: "Comfort Walker",
    brand: "Nike kids",
    price: 49,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 89,
    isNew: false,
    category: "Toddler",
    colors: ["Brown", "Pink", "Blue"],
  },
];

interface KidsProps {
  onBack: () => void;
  onAddToWishlist: (product: any) => void;
  onAddToCart: (product: any) => void;
}

export default function Kids({
  onBack,
  onAddToWishlist,
  onAddToCart,
}: KidsProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/30 dark:to-blue-900/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Kids' Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Fun and comfortable shoes for little adventurers. Designed for
            growing feet with style and safety in mind.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {kidsShoes.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 transform hover:scale-105 hover:-translate-y-3"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/50 to-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover p-4 group-hover:scale-110 transition-all duration-500 ease-out"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-3 left-3 bg-primary animate-bounce">
                      New
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToWishlist(product);
                      }}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  {product.originalPrice && (
                    <Badge
                      variant="destructive"
                      className="absolute bottom-3 left-3 animate-pulse"
                    >
                      Sale
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">
                      {product.brand}
                    </p>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">
                        ₹{product.price * 80}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice * 80}
                        </span>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80 transition-all duration-300 transform group-hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
