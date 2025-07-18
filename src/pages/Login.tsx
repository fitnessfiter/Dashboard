
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login logic
    if (email === "demo@FitnessFiter.com" && password === "demo123") {
      toast({
        title: "Welcome to FitnessFiter!",
        description: "Successfully logged in to your AI fitness dashboard.",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Invalid credentials",
        description: "Use demo@FitnessFiter.com / demo123 for demo access.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-cyber-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Main Logo & Tagline (moved below form) */}
        <div className="flex flex-col items-center justify-center mt-10 animate-fade-in">
          <div className="relative flex items-center justify-center mb-2">
            <img
              src="/logo2.svg"
              alt="Fitness Logo"
              className="w-52 h-52 md:w-60 md:h-60 drop-shadow-2xl neon-glow-logo"
            />
            <span className="absolute inset-0 rounded-full pointer-events-none neon-glow-logo-bg" />
          </div>
          <span className="text-cyber-pink text-lg font-semibold mt-2 animate-pulse">Welcome Back, Champion!</span>
        </div>

        {/* Login Form */}
        <Card className="glass border-cyber-purple/30 neon-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-cyber-white">Welcome Back</CardTitle>
            <CardDescription className="text-cyber-white/70">
              Sign in to your AI fitness dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-cyber-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-cyber-blue" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="demo@FitnessFiter.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-cyber-black/50 border-cyber-purple/30 text-cyber-white placeholder:text-cyber-white/50"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-cyber-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-cyber-blue" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="demo123"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-cyber-black/50 border-cyber-purple/30 text-cyber-white placeholder:text-cyber-white/50"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-neon-gradient hover:opacity-90 text-white font-semibold"
              >
                Sign In
              </Button>
              <div className="text-center text-sm">
                <span className="text-cyber-white/70">Don't have an account? </span>
                <Link to="/signup" className="text-cyber-blue hover:text-cyber-pink font-semibold">
                  Sign up
                </Link>
              </div>
              <div className="text-center text-xs text-cyber-white/50 font-mono">
                Demo: demo@FitnessFiter.com / demo123
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-cyber-blue hover:text-cyber-pink text-sm font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
