import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Eye, ArrowLeft } from "lucide-react";
import { useState } from "react";

const casualShoes = [
  {
    id: 601,
    name: "Stan Smith Classic",
    brand: "Adidas",
    price: 129,
    originalPrice: 149,
    image:
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 456,
    isNew: false,
    category: "Casual",
    colors: ["White", "Green", "Navy"],
  },
  {
    id: 602,
    name: "Chuck Taylor All Star",
    brand: "Nike",
    price: 89,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviews: 623,
    isNew: false,
    category: "Casual",
    colors: ["Black", "White", "Red"],
  },
  {
    id: 603,
    name: "Classic Leather",
    brand: "Reebok",
    price: 109,
    originalPrice: 129,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.PaqMuVI00HD9owTWlCgVqQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviews: 287,
    isNew: true,
    category: "Casual",
    colors: ["White", "Black", "Brown"],
  },
  {
    id: 604,
    name: "Air Force 1 Low",
    brand: "Nike",
    price: 159,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviews: 534,
    isNew: true,
    category: "Casual",
    colors: ["White", "Black", "Gray"],
  },
  {
    id: 605,
    name: "Suede Classic",
    brand: "Puma",
    price: 119,
    originalPrice: 139,
    image:
      "https://cdn.sportsshoes.com/product/P/PUM2450/PUM2450_400_8.jpg",
    hoverImage:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop&crop=center",
    rating: 4.3,
    reviews: 198,
    isNew: false,
    category: "Casual",
    colors: ["Blue", "Red", "Black"],
  },
  {
    id: 606,
    name: "Old Skool",
    brand: "Vans",
    price: 99,
    originalPrice: null,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.o1GqUftxNDlsA7KLHDMoMQHaIz?pid=ImgDet&w=184&h=219&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 342,
    isNew: false,
    category: "Casual",
    colors: ["Black", "White", "Checkered"],
  },
];

interface CasualProps {
  onBack: () => void;
  onAddToWishlist: (product: any) => void;
  onAddToCart: (product: any) => void;
}

export default function Casual({
  onBack,
  onAddToWishlist,
  onAddToCart,
}: CasualProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/30 dark:to-blue-900/30 py-16">
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
            <span className="text-5xl">👟</span>
            <h1 className="text-4xl lg:text-5xl font-bold">Casual Shoes</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Comfortable and stylish casual shoes perfect for everyday wear. From
            classic sneakers to modern street style - find your perfect everyday
            companion.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {casualShoes.map((product) => (
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
