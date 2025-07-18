
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Calendar, Clock, Dumbbell, Apple, Heart } from "lucide-react";

const Schedule = () => {
  const todaySchedule = [
    {
      time: "06:00",
      type: "workout",
      title: "Morning HIIT Session",
      duration: "45 min",
      icon: Dumbbell,
      completed: true
    },
    {
      time: "08:00",
      type: "nutrition",
      title: "Protein Breakfast",
      duration: "30 min",
      icon: Apple,
      completed: true
    },
    {
      time: "12:00",
      type: "nutrition",
      title: "Balanced Lunch",
      duration: "45 min",
      icon: Apple,
      completed: false
    },
    {
      time: "15:00",
      type: "wellness",
      title: "Meditation Break",
      duration: "15 min",
      icon: Heart,
      completed: false
    },
    {
      time: "18:00",
      type: "workout",
      title: "Strength Training",
      duration: "60 min",
      icon: Dumbbell,
      completed: false
    },
    {
      time: "22:00",
      type: "wellness",
      title: "Sleep Preparation",
      duration: "30 min",
      icon: Heart,
      completed: false
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workout': return 'bg-cyber-blue/20 text-cyber-blue';
      case 'nutrition': return 'bg-cyber-pink/20 text-cyber-pink';
      case 'wellness': return 'bg-ai-green/20 text-ai-green';
      default: return 'bg-cyber-purple/20 text-cyber-white';
    }
  };

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
                <span className="text-transparent bg-clip-text bg-neon-gradient">AI Schedule</span>
              </h1>
              <p className="text-cyber-white/70">
                Your personalized daily schedule optimized by AI for maximum results.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Today's Schedule */}
              <div className="lg:col-span-2">
                <div className="glass rounded-xl p-6 neon-glow">
                  <div className="flex items-center space-x-2 mb-6">
                    <Calendar className="w-6 h-6 text-cyber-blue" />
                    <h2 className="text-xl font-semibold text-cyber-white">Today's Schedule</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {todaySchedule.map((item, index) => (
                      <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ${
                        item.completed ? 'bg-cyber-purple/10 opacity-60' : 'bg-cyber-purple/20 hover:bg-cyber-purple/30'
                      }`}>
                        <div className="text-cyber-white/70 font-mono text-sm w-12">
                          {item.time}
                        </div>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(item.type)}`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${item.completed ? 'text-cyber-white/60 line-through' : 'text-cyber-white'}`}>
                            {item.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-cyber-white/70">
                            <Clock className="w-3 h-3" />
                            <span>{item.duration}</span>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          item.completed ? 'bg-cyber-blue border-cyber-blue' : 'border-cyber-white/30'
                        }`}>
                          {item.completed && <div className="w-full h-full bg-cyber-blue rounded-full"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Schedule Stats */}
              <div className="space-y-6">
                <div className="glass rounded-xl p-6 neon-glow">
                  <h3 className="text-lg font-semibold text-cyber-white mb-4">Today's Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-cyber-white/70 mb-1">
                        <span>Completed</span>
                        <span>2/6</span>
                      </div>
                      <div className="w-full bg-cyber-purple/20 rounded-full h-2">
                        <div className="bg-neon-gradient h-2 rounded-full w-1/3"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyber-blue">2</div>
                        <div className="text-xs text-cyber-white/70">Workouts</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyber-pink">2</div>
                        <div className="text-xs text-cyber-white/70">Meals</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6 neon-glow">
                  <h3 className="text-lg font-semibold text-cyber-white mb-4">AI Insights</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-cyber-blue/10 rounded-lg border-l-2 border-cyber-blue">
                      <p className="text-cyber-white/80">Great job completing your morning workout! Your consistency is improving.</p>
                    </div>
                    <div className="p-3 bg-cyber-pink/10 rounded-lg border-l-2 border-cyber-pink">
                      <p className="text-cyber-white/80">Don't forget your lunch - your body needs fuel for the afternoon session.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Schedule;
