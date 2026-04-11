import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Heart,
  ShoppingBag,
  Search,
  User,
  Menu,
  Eye,
  Sun,
  Moon,
  LogOut,
  Package,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { apiUrl } from "@/lib/api";
import Wishlist from "@/components/Wishlist";
import Cart from "@/components/Cart";
import Toast from "@/components/Toast";
import Men from "./Men";
import Women from "./Women";
import Kids from "./Kids";
import Sale from "./Sale";
import Categories from "./Categories";
import Running from "./Running";
import Casual from "./Casual";
import Training from "./Training";
import Orders from "./Orders";
import Lifestyle from "./Lifestyle";
import Brands from "./Brands";
import AllProducts from "./AllProducts";
import SearchResults from "./SearchResults";
import BrandProducts from "./BrandProducts";

const featuredProducts = [
  {
    id: 1,
    name: "Air Max Revolution",
    brand: "Nike",
    price: 179,
    originalPrice: 199,
    image:
      "https://sneakernews.com/wp-content/uploads/2014/02/air-yeezy-2-red-october-508214-660-01.jpeg",
    hoverImage:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    category: "Running",
    colors: ["Red", "Black", "White"],
  },
  {
    id: 2,
    name: "Urban Walker Pro",
    brand: "Nike Air Jordan",
    price: 139,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop&crop=center",
    hoverImage:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop&crop=center",
   
    rating: 4.6,
    reviews: 89,
    isNew: false,
    category: "Casual",
    colors: ["Blue", "Gray", "White"],
  },
  {
    id: 3,
    name: "Elite Performance",
    brand: "Puma",
    price: 199,
    originalPrice: 249,
    image:
      "https://staticc.sportskeeda.com/editor/2023/03/5120d-16777600528430-1920.jpg?w=840",
    hoverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    rating: 4.9,
    reviews: 156,
    isNew: true,
    category: "Training",
    colors: ["Black", "Orange", "White"],
  },
  {
    id: 4,
    name: "Classic Canvas",
    brand: "Adidas",
    price: 89,
    originalPrice: null,
    image:
      "https://rarest.org/wp-content/uploads/2022/06/Adidas-x-Pharrell-x-Chanel-Human-Race-Trail-NMD.jpg",
    hoverImage:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviews: 67,
    isNew: false,
    category: "Lifestyle",
    colors: ["Black", "White", "Red"],
  },
];

const categories = [
  {
    name: "Running",
    icon: "🏃",
    description: "Performance running shoes",
    image:
      "https://static.nike.com/a/images/t_PDP_864_v1,f_auto,q_auto:eco/31f2acf8-1aad-4267-b7d3-74bef760845d/revolution-6-womens-road-running-shoes-6QLh9B.png",
    gallery: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d2f?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=400&fit=crop&crop=center",
    ],
  },
  {
    name: "Casual",
    icon: "👟",
    description: "Everyday comfort",
    image:
      "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=300&h=200&fit=crop&crop=center",
  },
  {
    name: "Training",
    icon: "💪",
    description: "Gym & fitness",
    image:
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=300&h=200&fit=crop&crop=center",
  },
  {
    name: "Lifestyle",
    icon: "✨",
    description: "Fashion forward",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=300&h=200&fit=crop&crop=center",
  },
];

const heroShoes = [
  "https://sneakerbardetroit.com/wp-content/uploads/2016/03/nike-lebron-9-elite-championship-1-768x895.jpg",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&crop=center",
  "https://cdn.builder.io/api/v1/image/assets%2F8b39261676d1488287ee26a617ce70a7%2F8acfe831d390479c9fa8ca92e24c4b6e",
  "https://wallpapercave.com/wp/wp2958169.jpg",
];

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursorShoe, setShowCursorShoe] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<any>(null);
  const [currentPreviewImage, setCurrentPreviewImage] = useState(0);

  // Navigation state
  const [currentPage, setCurrentPage] = useState<string>("home");

  // Wishlist state
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  // Cart state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Toast state
  const [toast, setToast] = useState<{
    message: string;
    isVisible: boolean;
    type: "success" | "error" | "info";
  }>({
    message: "",
    isVisible: false,
    type: "success",
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Brand state
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldUseDark =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);

    setIsDarkMode(shouldUseDark);
    updateTheme(shouldUseDark);
  }, []);

  // Load cart from database on mount
  const loadCart = useCallback(async () => {
    try {
      const res = await fetch(apiUrl("/api/cart"), { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setCartItems(data.items || []);
      }
    } catch {
      // Silently fail — cart stays empty
    }
  }, []);

  // Load wishlist from database on mount
  const loadWishlist = useCallback(async () => {
    try {
      const res = await fetch(apiUrl("/api/wishlist"), { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setWishlistItems(data.items || []);
      }
    } catch {
      // Silently fail
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadCart();
      loadWishlist();
    }
  }, [user, loadCart, loadWishlist]);

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    updateTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  // Helper functions
  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success",
  ) => {
    setToast({ message, isVisible: true, type });
  };

  const addToWishlist = async (product: any) => {
    const isAlreadyInWishlist = wishlistItems.some(
      (item) => item.id === product.id,
    );
    if (!isAlreadyInWishlist) {
      setWishlistItems([...wishlistItems, product]);
      showToast(`${product.name} added to wishlist!`);

      // Sync to database
      try {
        await fetch(apiUrl("/api/wishlist"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            productId: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            rating: product.rating,
            reviews: product.reviews,
            category: product.category,
            isNew: product.isNew,
          }),
        });
      } catch {
        // API failed but UI already updated
      }
    } else {
      showToast(`${product.name} is already in your wishlist!`, "info");
    }
  };

  const removeFromWishlist = async (productId: number) => {
    const product = wishlistItems.find((item) => item.id === productId);
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId));
    if (product) {
      showToast(`${product.name} removed from wishlist!`);
    }

    // Sync to database
    try {
      await fetch(apiUrl(`/api/wishlist/${productId}`), {
        method: "DELETE",
        credentials: "include",
      });
    } catch {
      // API failed but UI already updated
    }
  };

  const addToCart = async (product: any) => {
    // Optimistic UI update
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    showToast(`${product.name} added to cart!`);

    // Sync to database
    try {
      await fetch(apiUrl("/api/cart"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          name: product.name,
          brand: product.brand,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          rating: product.rating,
          reviews: product.reviews,
          category: product.category,
        }),
      });
    } catch {
      // API failed but UI already updated
    }
  };

  const removeFromCart = async (productId: number) => {
    const product = cartItems.find((item) => item.id === productId);
    setCartItems(cartItems.filter((item) => item.id !== productId));
    if (product) {
      showToast(`${product.name} removed from cart!`);
    }

    // Sync to database
    try {
      await fetch(apiUrl(`/api/cart/${productId}`), {
        method: "DELETE",
        credentials: "include",
      });
    } catch {
      // API failed but UI already updated
    }
  };

  const updateCartQuantity = async (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );

      // Sync to database
      try {
        await fetch(apiUrl(`/api/cart/${productId}`), {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ quantity }),
        });
      } catch {
        // API failed but UI already updated
      }
    }
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage("search");
    setIsMenuOpen(false);
  };

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
    setCurrentPage("brandproducts");
  };

  // Render different pages based on current page
  if (currentPage === "men") {
    return (
      <>
        <Men
          onBack={() => setCurrentPage("home")}
          onAddToWishlist={addToWishlist}
          onAddToCart={addToCart}
        />
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onOrderComplete={() => { setCartItems([]); loadCart(); }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
          type={toast.type}
        />
      </>
    );
  }

  if (currentPage === "women") {
    return (
      <>
        <Women
          onBack={() => setCurrentPage("home")}
          onAddToWishlist={addToWishlist}
          onAddToCart={addToCart}
        />
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onOrderComplete={() => { setCartItems([]); loadCart(); }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
          type={toast.type}
        />
      </>
    );
  }

  if (currentPage === "kids") {
    return (
      <>
        <Kids
          onBack={() => setCurrentPage("home")}
          onAddToWishlist={addToWishlist}
          onAddToCart={addToCart}
        />
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onOrderComplete={() => { setCartItems([]); loadCart(); }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
          type={toast.type}
        />
      </>
    );
  }

  if (currentPage === "sale") {
    return (
      <>
        <Sale
          onBack={() => setCurrentPage("home")}
          onAddToWishlist={addToWishlist}
          onAddToCart={addToCart}
        />
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onOrderComplete={() => { setCartItems([]); loadCart(); }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
          type={toast.type}
        />
      </>
    );
  }

  if (currentPage === "categories") {
    return (
      <>
        <Categories
          onBack={() => setCurrentPage("home")}
          onCategorySelect={(category) => setCurrentPage(category)}
        />
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onOrderComplete={() => { setCartItems([]); loadCart(); }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
          type={toast.type}
        />
      </>
    );
  }

  if (currentPage === "running") {
    return (
      <>
        <Running
          onBack={() => setCurrentPage("categories")}
          onAddToWishlist={addToWishlist}
          onAddToCart={addToCart}
        />
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onOrderComplete={() => { setCartItems([]); loadCart(); }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
          type={toast.type}
        />
      </>
    );
  }

  if (currentPage === "casual") {
    return (
      <>
        <Casual
          onBack={() => setCurrentPage("categories")}
          onAddToWishlist={addToWishlist}
          onAddToCart={addToCart}
        />
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onOrderComplete={() => { setCartItems([]); loadCart(); }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
          type={toast.type}
        />
      </>
    );
  }

  if (currentPage === "training") {
    return (
      <>
        <Training
          onBack={() => setCurrentPage("categories")}
          onAddToWishlist={addToWishlist}
          onAddToCart={addToCart}
        />
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onOrderComplete={() => { setCartItems([]); loadCart(); }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
          type={toast.type}
        />
      </>
    );
  }

  if (currentPage === "lifestyle") {
    return (
      <>
        <Lifestyle
          onBack={() => setCurrentPage("categories")}
          onAddToWishlist={addToWishlist}
          onAddToCart={addToCart}
        />
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onOrderComplete={() => { setCartItems([]); loadCart(); }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
          type={toast.type}
        />
      </>
    );
  }

  if (currentPage === "brands") {
    return (
      <>
        <Brands
          onBack={() => setCurrentPage("home")}
          onBrandSelect={handleBrandSelect}
        />
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onOrderComplete={() => { setCartItems([]); loadCart(); }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
          type={toast.type}
        />
      </>
    );
  }

  if (currentPage === "brandproducts") {
    return (
      <>
        <BrandProducts
          brandName={selectedBrand}
          onBack={() => setCurrentPage("brands")}
          onAddToWishlist={addToWishlist}
          onAddToCart={addToCart}
        />
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onOrderComplete={() => { setCartItems([]); loadCart(); }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
          type={toast.type}
        />
      </>
    );
  }

  if (currentPage === "allproducts") {
    return (
      <>
        <AllProducts
          onBack={() => setCurrentPage("home")}
          onAddToWishlist={addToWishlist}
          onAddToCart={addToCart}
        />
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onOrderComplete={() => { setCartItems([]); loadCart(); }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
          type={toast.type}
        />
      </>
    );
  }

  if (currentPage === "search") {
    return (
      <>
        <SearchResults
          searchQuery={searchQuery}
          onBack={() => setCurrentPage("home")}
          onAddToWishlist={addToWishlist}
          onAddToCart={addToCart}
        />
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onOrderComplete={() => { setCartItems([]); loadCart(); }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
          type={toast.type}
        />
      </>
    );
  }

  if (currentPage === "orders") {
    return (
      <>
        <Orders onBack={() => setCurrentPage("home")} />
        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemoveFromWishlist={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onOrderComplete={() => { setCartItems([]); loadCart(); }}
        />
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
          type={toast.type}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background" onMouseMove={handleMouseMove}>
      {/* Floating Cursor Shoe */}
      {showCursorShoe && (
        <div
          className="fixed pointer-events-none z-[100] transition-all duration-300 ease-out"
          style={{
            left: cursorPosition.x + 10,
            top: cursorPosition.y - 10,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-20 h-20 bg-primary/10 backdrop-blur-sm rounded-full p-2 border border-primary/20">
            <img
              src={featuredProducts[0].image}
              alt="Cursor shoe"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div
                className="text-2xl font-bold bg-gradient-to-r from-primary to-brand-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300"
                onMouseEnter={() => setShowCursorShoe(true)}
                onMouseLeave={() => setShowCursorShoe(false)}
              >
                <h3>
                  <span style={{ color: "rgb(204, 50, 22)" }}>StepUp</span>
                </h3>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Men", "Women", "Kids", "Sale"].map((item, index) => (
                <div key={item} className="relative group">
                  <button
                    onClick={() => handleNavigation(item.toLowerCase())}
                    className="text-foreground hover:text-primary transition-all duration-300 transform hover:scale-105 font-medium"
                    onMouseEnter={() => setHoveredCategory(index)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    {item}
                  </button>
                  {hoveredCategory === index && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl p-4 opacity-0 animate-in fade-in-0 zoom-in-95 duration-200">
                      <img
                        src={categories[index % categories.length].image}
                        alt={item}
                        className="w-full h-24 object-cover rounded-md mb-2"
                      />
                      <p className="text-sm text-muted-foreground text-center">
                        Discover {item.toLowerCase()}'s collection
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search shoes..."
                  className="pl-10 pr-4 py-2 w-64 bg-muted rounded-full border-0 focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 focus:w-72"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const target = e.target as HTMLInputElement;
                      if (target.value.trim()) {
                        handleSearch(target.value.trim());
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform duration-300"
                onClick={toggleTheme}
                title={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <div className="relative hidden sm:block">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:scale-110 transition-transform duration-300"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-full object-cover" />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xs font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                </Button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-xl p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                    <div className="px-2 pb-2 mb-2 border-b border-border">
                      <p className="font-medium text-sm truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentPage("orders");
                        setShowUserMenu(false);
                      }}
                      className="flex items-center gap-2 w-full px-2 py-2 mb-1 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      <Package className="h-4 w-4" />
                      My Orders
                    </button>
                    <button
                      onClick={async () => {
                        await logout();
                        setShowUserMenu(false);
                        navigate("/login");
                      }}
                      className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-md transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex hover:scale-110 transition-transform duration-300 relative"
                onClick={() => setIsWishlistOpen(true)}
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform duration-300 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background animate-in slide-in-from-top-5 duration-200">
            <div className="px-4 py-4 space-y-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search shoes..."
                  className="pl-10 pr-4 py-2 w-full bg-muted rounded-full border-0 focus:ring-2 focus:ring-primary focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const target = e.target as HTMLInputElement;
                      if (target.value.trim()) {
                        handleSearch(target.value.trim());
                      }
                    }
                  }}
                />
              </div>
              {["Men", "Women", "Kids", "Sale"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavigation(item.toLowerCase())}
                  className="block text-foreground hover:text-primary transition-colors py-2 text-left w-full"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-background dark:via-background dark:to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
            <div className="space-y-8 flex flex-col items-center lg:items-start">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit animate-pulse">
                  New Collection 2024
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Step Into Your
                  <span className="block bg-gradient-to-r from-primary to-brand-600 bg-clip-text text-transparent">
                    <p>
                      <span style={{ color: "rgb(208, 2, 27)" }}>
                        Best Perfomance
                      </span>
                    </p>
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                  Discover premium athletic footwear designed for comfort,
                  style, and peak performance. From running to lifestyle, find
                  your perfect pair.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  size="lg"
                  className="text-lg px-8 hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
                  style={{ backgroundColor: "white", color: "#1a1a2e", border: "2px solid #e5e7eb" }}
                  onClick={() => setCurrentPage("categories")}
                >
                  <p>Shop collection</p>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
                  onClick={() => setCurrentPage("brands")}
                >
                  Explore Brands
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">✓</span>
                  </div>
                  Free shipping over ₹6000
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">↩</span>
                  </div>
                  30-day returns
                </div>
              </div>
            </div>
            <div className="relative group max-w-md mx-auto lg:max-w-full w-full">
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-brand-100/50 rounded-3xl p-8 relative overflow-hidden">
                <img
                  src={heroShoes[currentHeroImage]}
                  alt="Featured Shoe"
                  className="w-full h-full object-contain transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 ease-out font-medium border-gray-500 pb-4 -mr-4 -mt-1"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-brand-300/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>
              {/* Hero Image Selector */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {heroShoes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHeroImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentHeroImage
                        ? "bg-primary scale-125"
                        : "bg-primary/30 hover:bg-primary/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Shop by Category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect shoes for every activity and style preference
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card to-muted/50 overflow-hidden transform hover:scale-105 hover:-translate-y-2"
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setCurrentPage(category.name.toLowerCase())}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4 text-3xl group-hover:scale-125 transition-transform duration-300">
                    {category.icon}
                  </div>
                </div>
                <CardContent className="p-6 text-center space-y-3">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Featured Products
              </h2>
              <p className="text-lg text-muted-foreground">
                Handpicked favorites from our latest collection
              </p>
            </div>
            <Button
              variant="outline"
              className="hidden sm:flex hover:scale-105 transition-transform duration-300"
              onClick={() => setCurrentPage("allproducts")}
            >
              View All Products
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
                        addToWishlist(product);
                      }}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                      onClick={() => {
                        setPreviewProduct(product);
                        setCurrentPreviewImage(0);
                      }}
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
                  {/* Color Options */}
                  <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-125 transition-transform duration-300 ${
                          color.toLowerCase() === "red"
                            ? "bg-red-500"
                            : color.toLowerCase() === "black"
                              ? "bg-black"
                              : color.toLowerCase() === "white"
                                ? "bg-white"
                                : color.toLowerCase() === "blue"
                                  ? "bg-blue-500"
                                  : color.toLowerCase() === "gray"
                                    ? "bg-gray-500"
                                    : color.toLowerCase() === "orange"
                                      ? "bg-orange-500"
                                      : "bg-gray-300"
                        }`}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">
                      {product.brand}
                    </p>
                    <h3 className="font-semibold group-hover:text-red-600 transition-colors duration-300">
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
                    className="w-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-105"
                    style={{ backgroundColor: "white", color: "#1a1a2e", border: "2px solid #e5e7eb" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Button
              variant="outline"
              className="hover:scale-105 transition-transform duration-300"
              onClick={() => setCurrentPage("allproducts")}
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-primary to-brand-600 text-primary-foreground border-0 overflow-hidden relative group">
            <div className="absolute inset-0 bg-[url('https://as2.ftcdn.net/v2/jpg/03/91/36/13/1000_F_391361370_zdNTNqgEEcCMh3yrJIZtOc77o54yLReA.jpg')] opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
            <CardContent className="p-8 lg:p-12 text-center space-y-6 relative z-10">
              <h2 className="text-2xl lg:text-3xl font-bold">
                Stay in the Loop
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Be the first to know about new arrivals, exclusive deals, and
                style tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 text-foreground focus:ring-2 focus:ring-primary-foreground focus:outline-none transition-all duration-300 focus:scale-105"
                />
                <Button
                  variant="secondary"
                  className="px-8 hover:scale-105 transition-transform duration-300"
                >
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-brand-600 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <p>
                  <span style={{ color: "rgb(208, 2, 27)" }}>StepUp</span>
                </p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Premium athletic footwear for the modern athlete. Step up your
                game with our collection.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:scale-125 transition-transform duration-300"
                >
                  f
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:scale-125 transition-transform duration-300"
                >
                  𝕏
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:scale-125 transition-transform duration-300"
                >
                  in
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a
                  href="#"
                  className="block hover:text-foreground transition-all duration-300 hover:translate-x-1"
                >
                  Men's Shoes
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-all duration-300 hover:translate-x-1"
                >
                  Women's Shoes
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-all duration-300 hover:translate-x-1"
                >
                  Kids' Shoes
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-all duration-300 hover:translate-x-1"
                >
                  Sale
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a
                  href="#"
                  className="block hover:text-foreground transition-all duration-300 hover:translate-x-1"
                >
                  Size Guide
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-all duration-300 hover:translate-x-1"
                >
                  Returns
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-all duration-300 hover:translate-x-1"
                >
                  Shipping
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-all duration-300 hover:translate-x-1"
                >
                  Contact
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a
                  href="#"
                  className="block hover:text-foreground transition-all duration-300 hover:translate-x-1"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-all duration-300 hover:translate-x-1"
                >
                  Careers
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-all duration-300 hover:translate-x-1"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="block hover:text-foreground transition-all duration-300 hover:translate-x-1"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 StepUp. All rights reserved.</p>
          </div>
        </div>
      </footer>



      {/* Wishlist Modal */}
      <Wishlist
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemoveFromWishlist={removeFromWishlist}
        onAddToCart={addToCart}
      />

      {/* Cart Modal */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
      />

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
        type={toast.type}
      />

      {/* Product Preview Modal */}
      {previewProduct && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="animate-in fade-in-0 zoom-in-95 duration-300">
            <Card className="w-full max-w-2xl mx-auto border-0 shadow-2xl">
              <CardContent className="p-0 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPreviewProduct(null)}
                  className="absolute top-4 right-4 z-10 h-8 w-8 bg-background/80 backdrop-blur-sm hover:scale-110 transition-transform duration-300"
                >
                  <span className="text-lg">×</span>
                </Button>

                <div className="grid md:grid-cols-2 gap-6 p-6">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                    <div className="aspect-square bg-gradient-to-br from-muted/50 to-card rounded-xl overflow-hidden">
                      <img
                        src={
                          previewProduct.previewImages?.[currentPreviewImage] ||
                          previewProduct.image
                        }
                        alt={previewProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {previewProduct.previewImages && (
                      <div className="flex gap-2 overflow-x-auto">
                        {previewProduct.previewImages.map(
                          (img: string, index: number) => (
                            <button
                              key={index}
                              onClick={() => setCurrentPreviewImage(index)}
                              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                index === currentPreviewImage
                                  ? "border-primary scale-105"
                                  : "border-transparent hover:border-primary/50"
                              }`}
                            >
                              <img
                                src={img}
                                alt={`${previewProduct.name} preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ),
                        )}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">
                        {previewProduct.brand}
                      </p>
                      <h2 className="text-2xl font-bold">
                        {previewProduct.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {previewProduct.rating}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({previewProduct.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold">
                          ₹{previewProduct.price * 80}
                        </span>
                        {previewProduct.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            ₹{previewProduct.originalPrice * 80}
                          </span>
                        )}
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        {previewProduct.category}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Available Colors</h4>
                      <div className="flex gap-2">
                        {previewProduct.colors.map(
                          (color: string, index: number) => (
                            <div
                              key={index}
                              className={`w-8 h-8 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-125 transition-transform duration-300 ${
                                color.toLowerCase() === "red"
                                  ? "bg-red-500"
                                  : color.toLowerCase() === "black"
                                    ? "bg-black"
                                    : color.toLowerCase() === "white"
                                      ? "bg-white border-gray-300"
                                      : color.toLowerCase() === "blue"
                                        ? "bg-blue-500"
                                        : color.toLowerCase() === "gray"
                                          ? "bg-gray-500"
                                          : color.toLowerCase() === "orange"
                                            ? "bg-orange-500"
                                            : "bg-gray-300"
                              }`}
                              title={color}
                            />
                          ),
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Product Features</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full"></span>
                          Premium materials and construction
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full"></span>
                          Comfortable all-day wear
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full"></span>
                          Available in multiple colors
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full"></span>
                          Free shipping and returns
                        </li>
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        className="flex-1 hover:scale-105 transition-transform duration-300"
                        style={{ backgroundColor: "white", color: "#1a1a2e", border: "2px solid #e5e7eb" }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:scale-110 transition-transform duration-300"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
