
import { useEffect, useRef } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AISmartPlanner } from "@/components/AISmartPlanner";
import { NutritionDashboard } from "@/components/NutritionDashboard";
import { ProgressAnalytics } from "@/components/ProgressAnalytics";
import { AIAssistant } from "@/components/AIAssistant";
import { WellnessPanel } from "@/components/WellnessPanel";

let scrollToWelcomeSection: (() => void) | null = null;

const Dashboard = () => {
  const welcomeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToWelcomeSection = () => {
      if (welcomeRef.current) {
        welcomeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    // Always scroll to welcome on mount:
    scrollToWelcomeSection();
    return () => {
      scrollToWelcomeSection = null;
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-cyber-gradient">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-6 overflow-auto z-0 relative">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div ref={welcomeRef} className="glass rounded-xl p-6 neon-glow">
              <h1 className="text-3xl font-bold text-cyber-white mb-2">
                Welcome back, <span className="text-transparent bg-clip-text bg-neon-gradient">Fitness Warrior</span>!
              </h1>
              <p className="text-cyber-white/70">
                Your AI-powered fitness journey continues. Let's analyze your progress and optimize your routine.
              </p>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - AI Smart Planner */}
              <div className="lg:col-span-2 space-y-8">
                <AISmartPlanner />
                <ProgressAnalytics />
              </div>

              {/* Right Column - Side Panels */}
              <div className="space-y-8">
                <NutritionDashboard />
                <AIAssistant />
                <WellnessPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Export the scroll function for use elsewhere
export { scrollToWelcomeSection };

export default Dashboard;
