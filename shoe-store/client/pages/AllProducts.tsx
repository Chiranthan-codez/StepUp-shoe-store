import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Eye, ArrowLeft, Filter } from "lucide-react";
import { useState } from "react";

const allProducts = [
  // Running Shoes
  {
    id: 501,
    name: "Air Zoom Pegasus",
    brand: "Nike",
    price: 219,
    originalPrice: 249,
    image:
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1605367794049-84a5d8dde8e7?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviews: 342,
    isNew: true,
    category: "Running",
    colors: ["Blue", "Black", "White"],
  },
  {
    id: 502,
    name: "UltraBoost DNA",
    brand: "Adidas",
    price: 199,
    originalPrice: null,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.HxzmsJV9qwcXi14wU09bmwHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 287,
    isNew: false,
    category: "Running",
    colors: ["White", "Black", "Gray"],
  },
  // Casual Shoes
  {
    id: 601,
    name: "Stan Smith Classic",
    brand: "Adidas",
    price: 129,
    originalPrice: 149,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.kDtzx3OYqhnZbhH4mYG3zQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 456,
    isNew: false,
    category: "Casual",
    colors: ["White", "Green", "Navy"],
  },
  {
    id: 602,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 89,
    originalPrice: null,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.3r-9GawtSputBLpTSstxwQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviews: 623,
    isNew: false,
    category: "Casual",
    colors: ["Black", "White", "Red"],
  },
  // Training Shoes
  {
    id: 701,
    name: "Metcon 8",
    brand: "Nike",
    price: 199,
    originalPrice: 229,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.b4AjHbUCTnjjDiUuSDfWKQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
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
    brand: "Reebok",
    price: 179,
    originalPrice: null,
    image:
      "https://th.bing.com/th/id/R.229af8b38f2e7429dbfc196e2d12521f?rik=8g%2ffs6eVQNI%2bWA&riu=http%3a%2f%2freebok.ca%2fcdn%2fshop%2fproducts%2f100074657B0378.jpg%3fv%3d1705976785&ehk=KJqfuGra44rFI3JpnrvZQePWi4r6uaVHLsRarwaSEjw%3d&risl=&pid=ImgRaw&r=0",
    hoverImage:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d2f?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 234,
    isNew: false,
    category: "Training",
    colors: ["Blue", "Black", "Red"],
  },
  // Lifestyle Shoes
  {
    id: 801,
    name: "Blazer Mid '77",
    brand: "Nike",
    price: 149,
    originalPrice: 169,
    image:
      "https://tse2.mm.bing.net/th/id/OIP._n28TLg1WnVCAPT4jSxgZAHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop&crop=center",
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
      "https://tse3.mm.bing.net/th/id/OIP.lg1-4flYY5b77SlpRAjWvQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviews: 234,
    isNew: false,
    category: "Lifestyle",
    colors: ["White", "Blue", "Black"],
  },
  // Men's Collection
  {
    id: 101,
    name: "Air Max Professional",
    brand: "Nike",
    price: 199,
    originalPrice: 249,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.g1P3kFbnW2Q_Q5xwbbs8pgHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviews: 156,
    isNew: true,
    category: "Men",
    colors: ["Black", "White", "Red"],
  },
  {
    id: 102,
    name: "Classic Leather Boot",
    brand: "Timberland",
    price: 249,
    originalPrice: null,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.akJAl5MiwPdy5vCaE3yThAHaFj?pid=ImgDet&w=184&h=138&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 203,
    isNew: false,
    category: "Men",
    colors: ["Brown", "Black", "Tan"],
  },
  // Women's Collection
  {
    id: 201,
    name: "Rose Gold Runner",
    brand: "Nike",
    price: 189,
    originalPrice: 219,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.ttKD4tuxUvhO4YJE2h5NuAHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center",
    rating: 4.9,
    reviews: 234,
    isNew: true,
    category: "Women",
    colors: ["Rose Gold", "White", "Pink"],
  },
  {
    id: 202,
    name: "Elegant Heel",
    brand: "Jimmy Choo",
    price: 599,
    originalPrice: null,
    image:
      "https://th.bing.com/th/id/OIP.n5ZZpVdvcLztfDvPRkk1oAHaHa?w=216&h=216&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    hoverImage:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviews: 167,
    isNew: false,
    category: "Women",
    colors: ["Black", "Nude", "Red"],
  },
];

interface AllProductsProps {
  onBack: () => void;
  onAddToWishlist: (product: any) => void;
  onAddToCart: (product: any) => void;
}

export default function AllProducts({
  onBack,
  onAddToWishlist,
  onAddToCart,
}: AllProductsProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  const categories = [
    "all",
    "running",
    "casual",
    "training",
    "lifestyle",
    "men",
    "women",
  ];

  const filteredProducts = allProducts.filter(
    (product) =>
      filterCategory === "all" ||
      product.category.toLowerCase() === filterCategory,
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
      default:
        return a.name.localeCompare(b.name);
    }
  });

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
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">All Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse our complete collection of premium footwear. Find the perfect
            shoes for every occasion and style.
          </p>
        </div>
      </div>

      {/* Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground mr-2">
                Filter:
              </span>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {sortedProducts.length} products
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
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
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">
                      {product.brand}
                    </p>
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors duration-300">
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
                      <span className="text-lg font-bold">
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
