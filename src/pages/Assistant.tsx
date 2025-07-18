
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AIAssistant } from "@/components/AIAssistant";

const Assistant = () => {
  return (
    <div className="flex min-h-screen w-full bg-cyber-gradient">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="glass rounded-xl p-6 neon-glow">
              <h1 className="text-3xl font-bold text-cyber-white mb-2">
                <span className="text-transparent bg-clip-text bg-neon-gradient">AI Fitness Assistant</span>
              </h1>
              <p className="text-cyber-white/70">
                Your personal AI coach for workouts, nutrition, and fitness guidance.
              </p>
            </div>

            {/* AI Assistant Content */}
            <AIAssistant />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Assistant;
