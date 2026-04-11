import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Sparkles,
 // ShoppingBag,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { apiUrl } from "@/lib/api";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    confirmPassword: "",
  });

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, go to home
  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(apiUrl(endpoint), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      login(data.user);
      navigate("/home", { replace: true });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = apiUrl("/api/auth/google");
  };

  // Floating shoe particles
  const particles = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0f0f0f 0%, #1a0a0a 25%, #0f0f0f 50%, #0a0a1a 75%, #0f0f0f 100%)",
        }}
      />

      {/* Animated glow orbs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgb(208, 2, 27), transparent)",
          top: "-10%",
          right: "-10%",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgb(255, 100, 50), transparent)",
          bottom: "-10%",
          left: "-10%",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]"
        style={{
          background: "radial-gradient(circle, rgb(255, 200, 100), transparent)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "pulse 6s ease-in-out infinite",
        }}
      />

      {/* Floating shoe emojis */}
      {particles.map((i) => (
        <div
          key={i}
          className="absolute text-2xl opacity-10 select-none pointer-events-none"
          style={{
            left: `${15 + i * 14}%`,
            top: `${10 + (i % 3) * 30}%`,
            animation: `float ${6 + i * 1.5}s ease-in-out infinite ${i * 0.8}s`,
          }}
        >
          👟
        </div>
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            {/*<div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background: "linear-gradient(135deg, rgb(208,2,27), rgb(160,0,20))",
                boxShadow: "0 8px 32px rgba(208, 2, 27, 0.4)",
              }}
            >*/}
              {/*<ShoppingBag className="w-6 h-6 text-white" />
            </div>*/}
            <h1
              className="text-4xl font-black tracking-tight"
              style={{ color: "rgb(208,2,27)" }}
            >
              StepUp
            </h1>
          </div>
          <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">
            Premium Footwear Collection
          </p>
        </div>

        {/* Login Card */}
        <Card
          className="border-0 shadow-2xl overflow-hidden"
          style={{
            background: "rgba(24, 24, 28, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="h-1"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgb(208,2,27), rgb(255,100,50), rgb(208,2,27), transparent)",
            }}
          />

          <CardHeader className="space-y-4 pb-4 pt-6">
            <div className="flex items-center justify-center gap-2">
              <Badge
                variant="secondary"
                className="text-xs px-3 py-1"
                style={{
                  background: "rgba(208, 2, 27, 0.15)",
                  color: "rgb(255, 120, 100)",
                  border: "1px solid rgba(208, 2, 27, 0.3)",
                }}
              >
                {isLogin ? "Welcome Back" : "Join Us"}
              </Badge>
            </div>
            <div className="text-center space-y-1">
              <CardTitle className="text-2xl flex items-center justify-center gap-2 text-white">
                {isLogin ? "Sign In" : "Create Account"}
               {/*} <Sparkles
                  className="h-5 w-5 text-yellow-500"
                  style={{ animation: "spin 3s linear infinite" }}
                />*/}
              </CardTitle>
              <p className="text-sm text-gray-400">
                {isLogin
                  ? "Sign in to explore premium kicks"
                  : "Start your sneaker journey today"}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-5 pb-6">
            {/* Google OAuth Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 font-medium group relative overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "white",
              }}
              onClick={handleGoogleLogin}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = "rgba(208, 2, 27, 0.5)";
                (e.target as HTMLElement).style.background = "rgba(208, 2, 27, 0.08)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              }}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span
                  className="w-full"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span
                  className="px-3 text-gray-500"
                  style={{ background: "rgba(24, 24, 28, 0.85)" }}
                >
                  or use email
                </span>
              </div>
            </div>

            {error && (
              <div
                className="text-sm px-4 py-2.5 rounded-lg"
                style={{
                  background: "rgba(208, 2, 27, 0.1)",
                  border: "1px solid rgba(208, 2, 27, 0.3)",
                  color: "rgb(255, 130, 120)",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1.5">
                  <Label
                    htmlFor="name"
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <User className="h-3.5 w-3.5" /> Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="h-11 border-0 text-white placeholder:text-gray-500"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                    }}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Mail className="h-3.5 w-3.5" /> Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-11 border-0 text-white placeholder:text-gray-500"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                  }}
                />
              </div>

              {!isLogin && (
                <div className="space-y-1.5">
                  <Label
                    htmlFor="phone"
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <Phone className="h-3.5 w-3.5" /> Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-11 border-0 text-white placeholder:text-gray-500"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                    }}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <Lock className="h-3.5 w-3.5" /> Password
                  </Label>
                  {isLogin && (
                    <button
                      type="button"
                      className="text-xs hover:underline"
                      style={{ color: "rgba(40, 40, 40, 1)" }}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-11 pr-10 border-0 text-white placeholder:text-gray-500"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-1.5">
                  <Label
                    htmlFor="confirmPassword"
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <Lock className="h-3.5 w-3.5" /> Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="h-11 border-0 text-white placeholder:text-gray-500"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                    }}
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 font-semibold text-white text-base hover:scale-[1.02] transition-all duration-300 border-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(208,2,27), rgb(160,0,20))",
                  boxShadow: "0 4px 24px rgba(208, 2, 27, 0.3)",
                }}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </span>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-400">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                className="font-semibold hover:underline"
                style={{ color: "rgb(255, 120, 100)" }}
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>

            {!isLogin && (
              <p className="text-xs text-center text-gray-500">
                By signing up, you agree to our{" "}
                <span
                  className="cursor-pointer hover:underline"
                  style={{ color: "rgb(255, 120, 100)" }}
                >
                  Terms of Service
                </span>{" "}
                and{" "}
                <span
                  className="cursor-pointer hover:underline"
                  style={{ color: "rgb(255, 120, 100)" }}
                >
                  Privacy Policy
                </span>
              </p>
            )}
          </CardContent>
        </Card>

        {/* Footer text */}
        <p className="text-center text-xs text-gray-600 mt-6">
          &copy; 2026 StepUp. All rights reserved.
        </p>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
