import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const categories = [
  {
    name: "Running",
    icon: "🏃",
    description: "Performance running shoes for every distance",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/12d0d09c-26bf-4d4a-9f66-04abb3a17f79/NIKE+AIR+WINFLO+11+WIDE.png",
    count: "120+ shoes",
    route: "running",
  },
  {
    name: "Casual",
    icon: "👟",
    description: "Everyday comfort meets timeless style",
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=400&fit=crop&crop=center",
    count: "200+ shoes",
    route: "casual",
  },
  {
    name: "Training",
    icon: "💪",
    description: "Built for intense workouts and gym sessions",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=400&fit=crop&crop=center",
    count: "85+ shoes",
    route: "training",
  },
  {
    name: "Lifestyle",
    icon: "✨",
    description: "Fashion-forward shoes for modern living",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=400&fit=crop&crop=center",
    count: "150+ shoes",
    route: "lifestyle",
  },
];

interface CategoriesProps {
  onBack: () => void;
  onCategorySelect: (category: string) => void;
}

export default function Categories({
  onBack,
  onCategorySelect,
}: CategoriesProps) {
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
            Shop by Category
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover the perfect shoes for every activity and style. From
            performance athletics to everyday fashion.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden transform hover:scale-105 hover:-translate-y-2"
                onClick={() => onCategorySelect(category.route)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                      {category.icon}
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-foreground transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                  >
                    Explore {category.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose StepUp?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We curate the finest selection of shoes from top brands worldwide,
            ensuring quality, comfort, and style in every step.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Free shipping on orders over ₹6000
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="font-semibold">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">
                30-day hassle-free returns
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-semibold">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                Authentic products from trusted brands
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
