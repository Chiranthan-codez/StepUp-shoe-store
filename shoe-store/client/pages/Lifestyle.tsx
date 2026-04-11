import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Eye, ArrowLeft } from "lucide-react";
import { useState } from "react";

const lifestyleShoes = [
  {
    id: 801,
    name: "Blazer Mid '77",
    brand: "Nike",
    price: 149,
    originalPrice: 169,
    image:
      "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviews: 387,
    isNew: true,
    category: "Lifestyle",
    colors: ["White", "Black", "Cream"],
  },
  {
    id: 802,
    name: "Forum Low",
    brand: "Adidas",
    price: 139,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviews: 234,
    isNew: false,
    category: "Lifestyle",
    colors: ["White", "Blue", "Black"],
  },
  {
    id: 803,
    name: "Classic Leather",
    brand: "Reebok",
    price: 119,
    originalPrice: 139,
    image:
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e3ac8de8-8a06-44be-a623-2288d542ec23/custom-dunk-high-unlocked-by-you.png",
    hoverImage:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 198,
    isNew: false,
    category: "Lifestyle",
    colors: ["White", "Black", "Gray"],
  },
  {
    id: 804,
    name: "Court Vision Low",
    brand: "Nike",
    price: 109,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center",
    rating: 4.3,
    reviews: 167,
    isNew: true,
    category: "Lifestyle",
    colors: ["White", "Navy", "Red"],
  },
  {
    id: 805,
    name: "California",
    brand: "Puma",
    price: 129,
    originalPrice: 149,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 289,
    isNew: false,
    category: "Lifestyle",
    colors: ["White", "Black", "Pink"],
  },
  {
    id: 806,
    name: "Club C 85",
    brand: "Reebok",
    price: 99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviews: 156,
    isNew: false,
    category: "Lifestyle",
    colors: ["White", "Green", "Cream"],
  },
];

interface LifestyleProps {
  onBack: () => void;
  onAddToWishlist: (product: any) => void;
  onAddToCart: (product: any) => void;
}

export default function Lifestyle({
  onBack,
  onAddToWishlist,
  onAddToCart,
}: LifestyleProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">✨</span>
            <h1 className="text-4xl lg:text-5xl font-bold">Lifestyle Shoes</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Fashion-forward lifestyle shoes that blend style with comfort.
            Perfect for casual outings, social events, and making a statement
            wherever you go.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {lifestyleShoes.map((product) => (
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
