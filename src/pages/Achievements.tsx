
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Trophy, Star, Award, Target, Zap, Crown } from "lucide-react";

const Achievements = () => {
  const achievements = [
    {
      title: "First Workout",
      description: "Completed your first AI-generated workout",
      icon: Trophy,
      earned: true,
      date: "2024-01-15"
    },
    {
      title: "Macro Master",
      description: "Hit your macro targets for 7 consecutive days",
      icon: Star,
      earned: true,
      date: "2024-01-20"
    },
    {
      title: "Sleep Gold",
      description: "Maintained 8+ hours of sleep for 30 days",
      icon: Crown,
      earned: false,
      progress: 23
    },
    {
      title: "Consistency King",
      description: "Worked out 100 days in a row",
      icon: Target,
      earned: false,
      progress: 67
    },
    {
      title: "AI Enthusiast",
      description: "Used AI assistant 50 times",
      icon: Zap,
      earned: true,
      date: "2024-01-18"
    },
    {
      title: "Nutrition Ninja",
      description: "Logged meals for 60 consecutive days",
      icon: Award,
      earned: false,
      progress: 42
    }
  ];

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
                <span className="text-transparent bg-clip-text bg-neon-gradient">Achievements</span>
              </h1>
              <p className="text-cyber-white/70">
                Track your fitness milestones and unlock new challenges.
              </p>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass rounded-xl p-6 neon-glow">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyber-blue mb-2">3</div>
                  <div className="text-cyber-white/70">Earned</div>
                </div>
              </div>
              <div className="glass rounded-xl p-6 neon-glow">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyber-pink mb-2">3</div>
                  <div className="text-cyber-white/70">In Progress</div>
                </div>
              </div>
              <div className="glass rounded-xl p-6 neon-glow">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyber-white mb-2">6</div>
                  <div className="text-cyber-white/70">Total</div>
                </div>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className={`glass rounded-xl p-6 ${achievement.earned ? 'neon-glow' : 'opacity-75'}`}>
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      achievement.earned ? 'bg-neon-gradient' : 'bg-cyber-purple/20'
                    }`}>
                      <achievement.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-cyber-white mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-cyber-white/70 text-sm mb-3">
                        {achievement.description}
                      </p>
                      {achievement.earned ? (
                        <div className="flex items-center text-cyber-blue text-sm">
                          <Trophy className="w-4 h-4 mr-1" />
                          Earned on {achievement.date}
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between text-sm text-cyber-white/70 mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}/100</span>
                          </div>
                          <div className="w-full bg-cyber-purple/20 rounded-full h-2">
                            <div 
                              className="bg-neon-gradient h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Achievements;
