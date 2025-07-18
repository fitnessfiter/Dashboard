
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Zap, User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function getPasswordStrength(password: string) {
  if (password.length < 6) return { label: "Too short", color: "text-cyber-pink" };
  if (password.length < 8) return { label: "Weak", color: "text-cyber-pink" };
  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { label: "Medium", color: "text-cyber-blue" };
  if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return { label: "Strong", color: "text-cyber-green" };
  return { label: "", color: "" };
}

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step] = useState(1); // For demonstration, single step
  const navigate = useNavigate();
  const { toast } = useToast();
  const passwordStrength = getPasswordStrength(password);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Welcome to FitnessFiter!",
      description: "Account created successfully. Redirecting to dashboard...",
    });
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  // Demo Google sign up handler
  const handleGoogleSignUp = () => {
    toast({
      title: "Google Sign Up (Demo)",
      description: "Google sign up is not implemented in this demo.",
    });
  };

  return (
    <div className="min-h-screen bg-cyber-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col justify-center min-h-[90vh]">
        {/* Logo at the Top */}
        <div className="flex flex-col items-center justify-center mb-6 animate-fade-in-up">
          <div className="relative flex items-center justify-center mb-2">
            <img
              src="/logo2.svg"
              alt="Fitness Logo"
              className="w-40 h-40 md:w-52 md:h-52 drop-shadow-2xl neon-glow-logo"
            />
            <span className="absolute inset-0 rounded-full pointer-events-none neon-glow-logo-bg" />
          </div>
          <span className="text-cyber-pink text-lg font-semibold mt-2 animate-pulse">Unleash Your Potential</span>
        </div>

        {/* Stepper/Progress Bar */}
        <div className="flex items-center justify-center mb-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 1 ? 'bg-cyber-pink text-white' : 'bg-cyber-black/40 text-cyber-white/60'}`}>
              1
            </div>
            <div className="w-16 h-1 bg-cyber-pink/40 rounded" />
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-cyber-black/40 text-cyber-white/60">
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Sign Up Form Card */}
        <div className="relative">
          <div className="absolute inset-0 blur-xl opacity-40 pointer-events-none" style={{ background: 'linear-gradient(135deg, #8A2BE2 0%, #00D1FF 100%)' }} />
          <Card className="glass border-cyber-purple/30 neon-glow animate-fade-in shadow-2xl rounded-2xl backdrop-blur-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-cyber-white">Create Your Account</CardTitle>
              <CardDescription className="text-cyber-white/70 mb-2">
                Start your AI-powered fitness journey<br />
                <span className="text-cyber-pink font-semibold text-sm">It’s fast, easy, and free!</span>
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-cyber-purple/30" />
                  <span className="text-xs text-cyber-white/50">or</span>
                  <div className="flex-1 h-px bg-cyber-purple/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-cyber-white">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-cyber-blue" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 bg-cyber-black/50 border-cyber-purple/30 text-cyber-white placeholder:text-cyber-white/50 focus:ring-2 focus:ring-cyber-pink/40 focus:scale-[1.03] transition"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-cyber-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-cyber-blue" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-cyber-black/50 border-cyber-purple/30 text-cyber-white placeholder:text-cyber-white/50 focus:ring-2 focus:ring-cyber-pink/40 focus:scale-[1.03] transition"
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
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-cyber-black/50 border-cyber-purple/30 text-cyber-white placeholder:text-cyber-white/50 focus:ring-2 focus:ring-cyber-pink/40 focus:scale-[1.03] transition"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5 text-cyber-blue hover:text-cyber-pink"
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {password && (
                    <div className={`text-xs font-semibold mt-1 ${passwordStrength.color}`}>{passwordStrength.label}</div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-neon-gradient hover:opacity-90 text-white font-semibold flex items-center justify-center gap-2 text-lg py-3 rounded-xl transition-all duration-200 hover:scale-[1.03] shadow-lg"
                >
                  <Zap className="h-5 w-5 animate-bounce" />
                  Create Account
                </Button>
                <div className="text-center text-sm">
                  <span className="text-cyber-white/70">Already have an account? </span>
                  <Link to="/login" className="text-cyber-blue hover:text-cyber-pink font-semibold">
                    Sign in
                  </Link>
                </div>
                <div className="text-xs text-cyber-white/50 mt-2">
                  By signing up, you agree to our <span className="underline cursor-pointer hover:text-cyber-pink">Terms</span>.
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6 animate-fade-in">
          <Link to="/" className="text-cyber-blue hover:text-cyber-pink text-sm font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

