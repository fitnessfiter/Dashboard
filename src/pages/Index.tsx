
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap, Brain, Activity, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-cyber-gradient flex flex-col relative overflow-x-hidden">
      {/* Subtle Background Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" className="absolute top-0 left-0 opacity-30" style={{ minHeight: 600 }}>
          <defs>
            <radialGradient id="heroGradient" cx="50%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0F0F1A" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50%" cy="40%" r="400" fill="url(#heroGradient)" />
        </svg>
      </div>

      {/* Header */}
      <header className="p-6 flex justify-between items-center z-10 relative">
        <div className="flex items-center space-x-2">
          {/* Optionally add a logo here */}
        </div>
        <div className="flex space-x-4">
          <Link to="/login">
            <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-neon-gradient hover:opacity-90 text-white font-semibold">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-cyber-white mb-6 leading-tight animate-slide-in-down">
              AI-Powered
              <span className="text-transparent bg-clip-text bg-neon-gradient block animate-pulse">
                Fitness Revolution
              </span>
            </h1>
            <p className="text-xl text-cyber-white/80 max-w-2xl mx-auto mb-8 animate-fade-in">
              Transform your fitness journey with intelligent workout planning, 
              personalized nutrition tracking, and real-time biometric analytics.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="glass rounded-xl p-6 neon-glow transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:scale-105 animate-fade-in">
              <Brain className="w-8 h-8 text-cyber-blue mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-semibold text-cyber-white mb-2">AI Smart Planner</h3>
              <p className="text-sm text-cyber-white/70">Intelligent workout scheduling</p>
            </div>
            <div className="glass rounded-xl p-6 neon-glow transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:scale-105 animate-fade-in">
              <Activity className="w-8 h-8 text-cyber-green mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-semibold text-cyber-white mb-2">Real-time Analytics</h3>
              <p className="text-sm text-cyber-white/70">Advanced progress tracking</p>
            </div>
            <div className="glass rounded-xl p-6 neon-glow transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:scale-105 animate-fade-in">
              <Target className="w-8 h-8 text-cyber-pink mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-semibold text-cyber-white mb-2">Nutrition Intelligence</h3>
              <p className="text-sm text-cyber-white/70">Personalized meal planning</p>
            </div>
            <div className="glass rounded-xl p-6 neon-glow transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:scale-105 animate-fade-in">
              <Zap className="w-8 h-8 text-cyber-purple mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-semibold text-cyber-white mb-2">Voice Coach</h3>
              <p className="text-sm text-cyber-white/70">Interactive AI assistant</p>
            </div>
          </div>

          {/* Testimonial/Trusted Section */}
          <div className="mb-12 animate-fade-in">
            <div className="flex flex-col items-center gap-2">
              <span className="text-cyber-white/80 text-lg font-semibold">Trusted by fitness enthusiasts worldwide</span>
              <div className="flex gap-4 mt-2">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="user1" className="w-10 h-10 rounded-full border-2 border-cyber-blue" />
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="user2" className="w-10 h-10 rounded-full border-2 border-cyber-pink" />
                <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="user3" className="w-10 h-10 rounded-full border-2 border-cyber-green" />
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="user4" className="w-10 h-10 rounded-full border-2 border-cyber-purple" />
              </div>
              <span className="text-cyber-white/60 text-xs mt-1">“The best fitness dashboard I’ve ever used!”</span>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4 animate-fade-in">
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="bg-neon-gradient hover:opacity-90 text-white font-semibold px-8 py-4 text-lg ai-pulse shadow-xl animate-bounce"
              >
                Launch Dashboard
              </Button>
            </Link>
            <p className="text-sm text-cyber-white/60">
              Start your transformation today — it’s free!
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-cyber-white/60 text-sm z-10 relative">
        <p>&copy; 2025 FitnessFiter.com - AI-Powered Fitness Platform</p>
      </footer>
    </div>
  );
};

export default Index;
