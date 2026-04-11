import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const brands = [
  {
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    description: "Just Do It",
    founded: "1964",
    products: "120+ shoes",
    specialty: "Athletic Performance",
  },
  {
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    description: "Impossible is Nothing",
    founded: "1949",
    products: "95+ shoes",
    specialty: "Sports & Lifestyle",
  },
  {
    name: "Puma",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Puma-logo-%28text%29.svg/768px-Puma-logo-%28text%29.svg.png?20230824220146",
    description: "Fast and fuming",
    founded: "1948",
    products: "80+ shoes",
    specialty: "Performance & Style",
  },
  {
    name: "Converse",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/Converse_logo.svg",
    description: "Made by You",
    founded: "1908",
    products: "45+ shoes",
    specialty: "Classic Sneakers",
  },
  {
    name: "Reebok",
    logo: "https://upload.wikimedia.org/wikipedia/en/8/87/Reebok_logo.svg",
    description: "Be More Human",
    founded: "1958",
    products: "60+ shoes",
    specialty: "Fitness & Training",
  },
  {
    name: "New Balance",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg",
    description: "Endorsed by No One",
    founded: "1906",
    products: "70+ shoes",
    specialty: "Running & Comfort",
  },
  {
    name: "Vans",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Vans-logo.svg",
    description: "Off The Wall",
    founded: "1966",
    products: "55+ shoes",
    specialty: "Skateboarding & Lifestyle",
  },
  {
    name: "Under Armour",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg",
    description: "I Will",
    founded: "1996",
    products: "40+ shoes",
    specialty: "Athletic Performance",
  },
  {
    name: "ASICS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1d/ASICS_Logo.svg",
    description: "Sound Mind, Sound Body",
    founded: "1949",
    products: "65+ shoes",
    specialty: "Running & Sports",
  },
  {
    name: "Brooks",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Brooks_Sports_logo.svg",
    description: "Run Happy",
    founded: "1914",
    products: "35+ shoes",
    specialty: "Running",
  },
  {
    name: "Timberland",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/73/Timberland-logo.svg",
    description: "Made for the Bold",
    founded: "1952",
    products: "50+ shoes",
    specialty: "Outdoor & Boots",
  },
  {
    name: "Skechers",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Skechers_logo.svg",
    description: "The Comfort Technology Company",
    founded: "1992",
    products: "85+ shoes",
    specialty: "Comfort & Lifestyle",
  },
];

interface BrandsProps {
  onBack: () => void;
  onBrandSelect: (brandName: string) => void;
}

export default function Brands({ onBack, onBrandSelect }: BrandsProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-brand-100/20 dark:from-primary/20 dark:to-brand-900/30 py-16">
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
            Explore Our Brands
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover the world's leading footwear brands. From athletic
            performance to lifestyle fashion, find your perfect brand match.
          </p>
        </div>
      </div>

      {/* Brands Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover:shadow-xl transition-all duration-500 border-0 overflow-hidden transform hover:scale-105 hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="h-16 flex items-center justify-center mb-4 dark:bg-white/10 dark:rounded-lg dark:p-2">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="max-h-12 max-w-full object-contain group-hover:scale-110 transition-transform duration-300 dark:brightness-0 dark:invert"
                      onError={(e) => {
                        // Fallback to text logo if image fails
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback = document.createElement("div");
                        fallback.textContent = brand.name;
                        fallback.className = "text-2xl font-bold text-primary";
                        target.parentNode?.appendChild(fallback);
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-muted-foreground italic">
                    "{brand.description}"
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Founded:</span>
                      <span className="font-medium">{brand.founded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Products:</span>
                      <span className="font-medium">{brand.products}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Specialty:</span>
                      <span className="font-medium text-primary">
                        {brand.specialty}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-primary hover:text-primary-foreground hover:border-primary dark:hover:bg-primary dark:hover:text-primary-foreground dark:hover:border-primary transition-all duration-300"
                    onClick={() => onBrandSelect(brand.name.toLowerCase())}
                  >
                    View {brand.name} Products
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Trusted by Millions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">12+</div>
              <div className="text-sm text-muted-foreground">
                Premium Brands
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">800+</div>
              <div className="text-sm text-muted-foreground">
                Total Products
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">
                Years Combined Experience
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">
                Happy Customers
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
