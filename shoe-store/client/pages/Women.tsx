import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Eye, ArrowLeft } from "lucide-react";
import { useState } from "react";

const womenShoes = [
  {
    id: 201,
    name: "Rose Gold Runner",
    brand: "Nike",
    price: 189,
    originalPrice: 219,
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center",
    previewImages: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=600&fit=crop&crop=center",
    ],
    rating: 4.9,
    reviews: 234,
    isNew: true,
    category: "Running",
    colors: ["Rose Gold", "White", "Pink"],
  },
  {
    id: 202,
    name: "Elegant Heel",
    brand: "Jimmy Choo",
    price: 599,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviews: 167,
    isNew: false,
    category: "Formal",
    colors: ["Black", "Nude", "Red"],
  },
  {
    id: 203,
    name: "Casual Comfort",
    brand: "Adidas",
    price: 159,
    originalPrice: 189,
    image:
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1522016384738-5de5bc184fbe?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 198,
    isNew: true,
    category: "Casual",
    colors: ["White", "Gray", "Pink"],
  },
  {
    id: 204,
    name: "Yoga Flex",
    brand: "Adidas",
    price: 129,
    originalPrice: null,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.1VrREEymv24b-VRcVrJx9QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 145,
    isNew: false,
    category: "Training",
    colors: ["Purple", "Black", "Teal"],
  },
  {
    id: 205,
    name: "Fashion casual shoes",
    brand: "Jimmy Choo",
    price: 279,
    originalPrice: 319,
    image:
      "https://th.bing.com/th/id/OIP.OyFLG034e_Mr_pn3xhnQKQHaHu?w=192&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    hoverImage:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviews: 112,
    isNew: false,
    category: "Lifestyle",
    colors: ["Chestnut", "Black", "Gray"],
  },
  {
    id: 206,
    name: "Ballet Flat Classic",
    brand: "New Balance",
    price: 249,
    originalPrice: null,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.7toGk7xmS0tWWO05d6d4eAHaJ4?pid=ImgDet&w=184&h=245&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 178,
    isNew: true,
    category: "Formal",
    colors: ["Nude", "Black", "Navy"],
  },
];

interface WomenProps {
  onBack: () => void;
  onAddToWishlist: (product: any) => void;
  onAddToCart: (product: any) => void;
}

export default function Women({
  onBack,
  onAddToWishlist,
  onAddToCart,
}: WomenProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/30 dark:to-red-900/30 py-16">
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
            Women's Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Elegant and comfortable footwear for the modern woman. From
            professional elegance to athletic performance.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {womenShoes.map((product) => (
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
