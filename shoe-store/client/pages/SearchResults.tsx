import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Eye, ArrowLeft, Search } from "lucide-react";
import { useState } from "react";

const allProducts = [
  {
    id: 501,
    name: "Air Zoom Pegasus",
    brand: "Nike",
    price: 219,
    originalPrice: 249,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviews: 342,
    isNew: true,
    category: "Running",
    colors: ["Blue", "Black", "White"],
    searchTerms: [
      "air",
      "zoom",
      "pegasus",
      "nike",
      "running",
      "blue",
      "black",
      "white",
    ],
  },
  {
    id: 502,
    name: "UltraBoost DNA",
    brand: "Adidas",
    price: 199,
    originalPrice: null,
    image:
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/06c488fc8b364ff1bdbfe398bb98a406_9366/Y-3_Ultraboost_5_Black_IH0871_01_standard.jpg",
    hoverImage:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 287,
    isNew: false,
    category: "Running",
    colors: ["White", "Black", "Gray"],
    searchTerms: [
      "ultra",
      "boost",
      "dna",
      "adidas",
      "running",
      "white",
      "black",
      "gray",
    ],
  },
  {
    id: 601,
    name: "Stan Smith Classic",
    brand: "Adidas",
    price: 129,
    originalPrice: 149,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.gsBD7EJbDkR1-AkQ_XCfCQAAAA?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 456,
    isNew: false,
    category: "Casual",
    colors: ["White", "Green", "Navy"],
    searchTerms: [
      "stan",
      "smith",
      "classic",
      "adidas",
      "casual",
      "white",
      "green",
      "navy",
    ],
  },
  {
    id: 602,
    name: "Chuck Taylor All Star",
    brand: "Converse",
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
    searchTerms: [
      "chuck",
      "taylor",
      "all",
      "star",
      "converse",
      "casual",
      "black",
      "white",
      "red",
    ],
  },
  {
    id: 701,
    name: "Metcon 8",
    brand: "Nike",
    price: 199,
    originalPrice: 229,
    image:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviews: 298,
    isNew: true,
    category: "Training",
    colors: ["Black", "Orange", "White"],
    searchTerms: [
      "metcon",
      "8",
      "nike",
      "training",
      "black",
      "orange",
      "white",
    ],
  },
  {
    id: 702,
    name: "Nano X2",
    brand: "Reebok",
    price: 179,
    originalPrice: null,
    image:
      "https://th.bing.com/th/id/OIP.2nIoFGGFU38_CGLYlUNJoQHaHa?w=176&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d2f?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 234,
    isNew: false,
    category: "Training",
    colors: ["Blue", "Black", "Red"],
    searchTerms: ["nano", "x2", "reebok", "training", "blue", "black", "red"],
  },
  {
    id: 801,
    name: "Blazer Mid '77",
    brand: "Nike",
    price: 149,
    originalPrice: 169,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviews: 387,
    isNew: true,
    category: "Lifestyle",
    colors: ["White", "Black", "Cream"],
    searchTerms: [
      "blazer",
      "mid",
      "77",
      "nike",
      "lifestyle",
      "white",
      "black",
      "cream",
    ],
  },
  {
    id: 802,
    name: "Forum Low",
    brand: "Adidas",
    price: 139,
    originalPrice: null,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.vtWKRqDMtnYeKGrzsGCUUwHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
    hoverImage:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviews: 234,
    isNew: false,
    category: "Lifestyle",
    colors: ["White", "Blue", "Black"],
    searchTerms: [
      "forum",
      "low",
      "adidas",
      "lifestyle",
      "white",
      "blue",
      "black",
    ],
  },
];

interface SearchResultsProps {
  searchQuery: string;
  onBack: () => void;
  onAddToWishlist: (product: any) => void;
  onAddToCart: (product: any) => void;
}

export default function SearchResults({
  searchQuery,
  onBack,
  onAddToWishlist,
  onAddToCart,
}: SearchResultsProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Function to check if search query is valid (contains letters or numbers)
  const isValidSearch = (query: string) => {
    return /^[a-zA-Z0-9\s]+$/.test(query.trim()) && query.trim().length > 0;
  };

  // Function to search products
  const searchProducts = (query: string) => {
    if (!isValidSearch(query)) {
      return [];
    }

    const searchTerms = query
      .toLowerCase()
      .split(" ")
      .filter((term) => term.length > 0);

    return allProducts.filter((product) => {
      const productText = [
        product.name.toLowerCase(),
        product.brand.toLowerCase(),
        product.category.toLowerCase(),
        ...product.searchTerms,
      ].join(" ");

      return searchTerms.some((term) => productText.includes(term));
    });
  };

  const searchResults = searchProducts(searchQuery);
  const hasResults = searchResults.length > 0;
  const isValidQuery = isValidSearch(searchQuery);

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
          <div className="flex items-center gap-4 mb-4">
            <Search className="h-8 w-8 text-primary" />
            <h1 className="text-4xl lg:text-5xl font-bold">Search Results</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            {isValidQuery ? (
              hasResults ? (
                <>
                  Found {searchResults.length} result
                  {searchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
                </>
              ) : (
                <>No results found for "{searchQuery}"</>
              )
            ) : (
              <>Invalid search query: "{searchQuery}"</>
            )}
          </p>
        </div>
      </div>

      {/* Search Results */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {!isValidQuery ? (
            // Invalid search query
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-16 w-16 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-red-600">
                Item Not Found
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Your search "{searchQuery}" contains invalid characters. Please
                try searching with letters and numbers only.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>Try searching for:</strong>
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline">Nike</Badge>
                  <Badge variant="outline">Adidas</Badge>
                  <Badge variant="outline">Running shoes</Badge>
                  <Badge variant="outline">Casual</Badge>
                  <Badge variant="outline">Air Max</Badge>
                </div>
              </div>
            </div>
          ) : !hasResults ? (
            // No results found
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-16 w-16 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any products matching "{searchQuery}". Try
                searching with different keywords.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Popular searches:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      Nike Air Max
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      Adidas Stan Smith
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      Running shoes
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      Casual sneakers
                    </Badge>
                  </div>
                </div>
                <Button onClick={onBack} className="mt-4">
                  Browse All Products
                </Button>
              </div>
            </div>
          ) : (
            // Display search results
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product) => (
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
          )}
        </div>
      </section>
    </div>
  );
}
