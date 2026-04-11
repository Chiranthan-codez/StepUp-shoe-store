import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Eye, ArrowLeft } from "lucide-react";
import { useState } from "react";

const menShoes = [
  {
    id: 101,
    name: "Air Max Professional",
    brand: "Nike",
    price: 199,
    originalPrice: 249,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
    previewImages: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop&crop=center",
    ],
    rating: 4.8,
    reviews: 156,
    isNew: true,
    category: "Running",
    colors: ["Black", "White", "Red"],
  },
  {
    id: 102,
    name: "Classic Leather Boot",
    brand: "Timberland",
    price: 249,
    originalPrice: null,
    image:
      "https://i.stpost.com/timberland-6-premium-boots-waterproof-insulated-for-men-in-dark-beige-nubuck~p~ds593_02~1500.2.jpg",
    hoverImage:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 203,
    isNew: false,
    category: "Casual",
    colors: ["Brown", "Black", "Tan"],
  },
  {
    id: 103,
    name: "Sport Runner Elite",
    brand: "Adidas",
    price: 179,
    originalPrice: 199,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.CIj6meIJ15QFWLLEnVRxiwHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 134,
    isNew: true,
    category: "Training",
    colors: ["Blue", "Gray", "Black"],
  },
  {
    id: 104,
    name: "Business Oxford",
    brand: "Cole Haan",
    price: 299,
    originalPrice: null,
    image:
      "data:image/webp;base64,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",
    hoverImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    rating: 4.9,
    reviews: 89,
    isNew: false,
    category: "Formal",
    colors: ["Black", "Brown", "Cognac"],
  },
  {
    id: 105,
    name: "Street Style Sneaker",
    brand: "Puma",
    price: 149,
    originalPrice: 179,
    image:
      "https://3.bp.blogspot.com/-_dGgTPvNK7g/UAfEpWd8SII/AAAAAAAAAHM/NzGMM2pVcNo/s1600/pumashoes01.jpg",
    hoverImage:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviews: 167,
    isNew: false,
    category: "Lifestyle",
    colors: ["White", "Black", "Gray"],
  },
  {
    id: 106,
    name: "Trail Running Pro",
    brand: "Merrell",
    price: 189,
    originalPrice: null,
    image:
      "https://s7d4.scene7.com/is/image/WolverineWorldWide/MRLW-J035494-062220-F20-000?wid=900&hei=900&resMode=bisharp&op_usm=0.5,1.0,8,0&iccEmbed=0&printRes=72",
    hoverImage:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviews: 142,
    isNew: true,
    category: "Outdoor",
    colors: ["Green", "Brown", "Black"],
  },
];

interface MenProps {
  onBack: () => void;
  onAddToWishlist: (product: any) => void;
  onAddToCart: (product: any) => void;
}

export default function Men({
  onBack,
  onAddToWishlist,
  onAddToCart,
}: MenProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-brand-100/20 py-16">
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
            Men's Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover our premium collection of men's footwear designed for every
            occasion. From athletic performance to professional style.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {menShoes.map((product) => (
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
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 transform group-hover:scale-105"
                    style={{ backgroundColor: "rgba(220, 38, 38, 1)" }}
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
