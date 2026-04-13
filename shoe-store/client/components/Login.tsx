import { useState } from "react";
import { apiUrl } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Eye, EyeOff, Mail, Lock, User, Phone, Sparkles } from "lucide-react";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (user: { name: string; email: string; avatar?: string }) => void;
}

export default function Login({ isOpen, onClose, onLogin }: LoginProps) {
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
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      onLogin?.(data.user);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="animate-in fade-in-0 zoom-in-95 duration-300 w-full max-w-md">
        <Card className="border-0 shadow-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-red-500 via-orange-400 to-red-600" />

          <CardHeader className="space-y-4 pb-4 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black" style={{ color: "rgb(208,2,27)" }}>StepUp</span>
                <Badge variant="secondary" className="text-xs">{isLogin ? "Login" : "Sign Up"}</Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 hover:rotate-90 transition-transform duration-300">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center space-y-1">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                {isLogin ? "Welcome Back!" : "Join StepUp"}
                <Sparkles className="h-5 w-5 text-yellow-500" style={{ animation: "spin 3s linear infinite" }} />
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Sign in to continue shopping" : "Create your account and start your journey"}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-5 pb-6">
            {/* Google OAuth Button */}
            <a
              href={apiUrl("/api/auth/google")}
              className="w-full h-11 border-2 border-input bg-background hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-300 font-medium group flex items-center justify-center rounded-md"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </a>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or use email</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="flex items-center gap-2 text-sm"><User className="h-3.5 w-3.5" /> Full Name</Label>
                  <Input id="name" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleInputChange} className="focus:ring-2 focus:ring-red-400" required={!isLogin} />
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm"><Mail className="h-3.5 w-3.5" /> Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} className="focus:ring-2 focus:ring-red-400" required />
              </div>

              {!isLogin && (
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-sm"><Phone className="h-3.5 w-3.5" /> Phone</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+91 9876543210" value={formData.phone} onChange={handleInputChange} className="focus:ring-2 focus:ring-red-400" />
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="flex items-center gap-2 text-sm"><Lock className="h-3.5 w-3.5" /> Password</Label>
                  {isLogin && <button type="button" className="text-xs text-red-600 hover:underline">Forgot password?</button>}
                </div>
                <div className="relative">
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={handleInputChange} className="pr-10 focus:ring-2 focus:ring-red-400" required />
                  <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm"><Lock className="h-3.5 w-3.5" /> Confirm Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleInputChange} className="focus:ring-2 focus:ring-red-400" required={!isLogin} />
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full h-11 font-semibold text-white hover:scale-[1.02] transition-all duration-300" style={{ background: "linear-gradient(135deg, rgb(208,2,27), rgb(160,0,20))" }}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </span>
                ) : isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button type="button" className="text-red-600 font-semibold hover:underline" onClick={() => { setIsLogin(!isLogin); setError(""); }}>
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>

            {!isLogin && (
              <p className="text-xs text-center text-muted-foreground">
                By signing up, you agree to our <span className="text-red-600 cursor-pointer hover:underline">Terms of Service</span> and <span className="text-red-600 cursor-pointer hover:underline">Privacy Policy</span>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
