import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Eye, ArrowLeft } from "lucide-react";
import { useState } from "react";

const saleShoes = [
  {
    id: 401,
    name: "Classic Air Max",
    brand: "Nike",
    price: 119,
    originalPrice: 199,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 345,
    discount: 40,
    category: "Running",
    colors: ["Red", "Black", "White"],
  },
  {
    id: 402,
    name: "Urban Street Style",
    brand: "Adidas",
    price: 99,
    originalPrice: 159,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.jAJwd-1KLzyG6w74sWrJwgHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 234,
    discount: 38,
    category: "Casual",
    colors: ["Blue", "Gray", "White"],
  },
  {
    id: 403,
    name: "Professional Oxfords",
    brand: "Cole Haan",
    price: 179,
    originalPrice: 299,
    image:
      "data:image/webp;base64,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",
    hoverImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviews: 156,
    discount: 40,
    category: "Formal",
    colors: ["Black", "Brown", "Cognac"],
  },
  {
    id: 404,
    name: "Training Beast",
    brand: "Puma",
    price: 89,
    originalPrice: 149,
    image:
      "https://th.bing.com/th/id/OIP.CHlEpKSmBd8LDMVjHZO2GAHaHa?w=203&h=190&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    hoverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviews: 198,
    discount: 40,
    category: "Training",
    colors: ["Black", "Orange", "Blue"],
  },
  {
    id: 405,
    name: "Elegant Casuals",
    brand: "Jimmy Choo",
    price: 399,
    originalPrice: 649,
    image:
      "data:image/webp;base64,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",
    hoverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    rating: 4.9,
    reviews: 123,
    discount: 39,
    category: "Formal",
    colors: ["Black", "Nude", "Red"],
  },
  {
    id: 406,
    name: "Canvas Classic",
    brand: "Converse",
    price: 49,
    originalPrice: 89,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.x_4G_kvXstPm2LwgXD7_IQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviews: 289,
    discount: 45,
    category: "Lifestyle",
    colors: ["Black", "White", "Red"],
  },
];

interface SaleProps {
  onBack: () => void;
  onAddToWishlist: (product: any) => void;
  onAddToCart: (product: any) => void;
}

export default function Sale({
  onBack,
  onAddToWishlist,
  onAddToCart,
}: SaleProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl lg:text-5xl font-bold">Sale Collection</h1>
            <Badge className="bg-red-500 text-white text-lg px-4 py-2 animate-pulse">
              Up to 45% OFF
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Don't miss out on these incredible deals! Limited time offers on
            premium footwear from top brands.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {saleShoes.map((product) => (
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
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white animate-pulse">
                    {product.discount}% OFF
                  </Badge>
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
                  <Badge
                    variant="destructive"
                    className="absolute bottom-3 left-3 animate-bounce"
                  >
                    Limited Time
                  </Badge>
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
                      <span className="text-xl font-bold text-red-600">
                        ₹{product.price * 80}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{product.originalPrice * 80}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="text-center text-sm text-green-600 font-medium">
                    You Save: ₹{(product.originalPrice - product.price) * 80}
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
