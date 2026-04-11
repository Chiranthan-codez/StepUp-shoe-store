import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Eye, ArrowLeft } from "lucide-react";
import { useState } from "react";

const trainingShoes = [
  {
    id: 701,
    name: "Metcon 8",
    brand: "Nike",
    price: 199,
    originalPrice: 229,
    image:
      "https://staticg.sportskeeda.com/editor/2024/04/0c58e-17135415029185-1920.jpg?w=1600",
    hoverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 298,
    isNew: true,
    category: "Training",
    colors: ["Black", "Orange", "White"],
  },
  {
    id: 702,
    name: "Nano X2",
    brand: "Nike",
    price: 179,
    originalPrice: null,
    image:
      "https://cdn.mos.cms.futurecdn.net/mBuSEJCZTH5JHJvZypH5Wk-1200-80.jpg",
    hoverImage:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d2f?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 234,
    isNew: false,
    category: "Training",
    colors: ["Blue", "Black", "Red"],
  },
  {
    id: 703,
    name: "DropSet Trainer",
    brand: "Adidas",
    price: 189,
    originalPrice: 219,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.wAME1sOQV5SZAkteehL9HAHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviews: 167,
    isNew: true,
    category: "Training",
    colors: ["Gray", "Black", "Green"],
  },
  {
    id: 704,
    name: "HIIT Trainer",
    brand: "Under Armour",
    price: 169,
    originalPrice: null,
    image:
      "https://tse1.mm.bing.net/th/id/OIP._nRqLAx4fZE1rJuQAYfLrwHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviews: 189,
    isNew: false,
    category: "Training",
    colors: ["Red", "Black", "White"],
  },
  {
    id: 705,
    name: "Cross Trainer Elite",
    brand: "Puma",
    price: 159,
    originalPrice: 179,
    image:
      "https://th.bing.com/th/id/OIP.AWoKA_TKLbC7QGzoKZK_kwHaHa?w=172&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    hoverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviews: 143,
    isNew: false,
    category: "Training",
    colors: ["Yellow", "Black", "Blue"],
  },
  {
    id: 706,
    name: "Training Flex",
    brand: "New Balance",
    price: 149,
    originalPrice: null,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.Zac3A-1J5HKErVdib156EwHaFI?pid=ImgDet&w=184&h=127&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d2f?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 198,
    isNew: true,
    category: "Training",
    colors: ["Navy", "Gray", "White"],
  },
];

interface TrainingProps {
  onBack: () => void;
  onAddToWishlist: (product: any) => void;
  onAddToCart: (product: any) => void;
}

export default function Training({
  onBack,
  onAddToWishlist,
  onAddToCart,
}: TrainingProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 py-16">
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
            <span className="text-5xl">💪</span>
            <h1 className="text-4xl lg:text-5xl font-bold">Training Shoes</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            High-performance training shoes built for intense workouts, gym
            sessions, and cross-training. Maximum stability and support for all
            your fitness goals.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingShoes.map((product) => (
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
