
import { Heart, Moon, Activity, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const wellnessData = {
  sleep: { hours: 6.5, quality: 72, target: 8 },
  stress: { level: 45, status: "moderate" },
  heart_rate: { resting: 62, avg_workout: 145 },
  recovery: { score: 78, recommendation: "Light workout recommended" }
};

export function WellnessPanel() {
  const { sleep, stress, heart_rate, recovery } = wellnessData;

  const getStressColor = (level: number) => {
    if (level < 30) return "text-cyber-green";
    if (level < 60) return "text-cyber-blue";
    return "text-cyber-pink";
  };

  return (
    <Card className="glass border-cyber-purple/30 neon-glow">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-cyber-pink" />
          <CardTitle className="text-cyber-white text-lg">Wellness Intelligence</CardTitle>
        </div>
        <CardDescription className="text-cyber-white/70">
          Holistic health monitoring & insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sleep Tracking */}
        <div className="p-3 rounded-lg bg-cyber-black/30 border border-cyber-blue/30">
          <div className="flex items-center space-x-2 mb-2">
            <Moon className="h-4 w-4 text-cyber-blue" />
            <span className="text-sm font-semibold text-cyber-white">Sleep Quality</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-cyber-white/70">{sleep.hours}h / {sleep.target}h</span>
            <span className="text-cyber-white/70">{sleep.quality}% quality</span>
          </div>
          <Progress value={(sleep.hours / sleep.target) * 100} className="h-2" />
        </div>

        {/* Stress Level */}
        <div className="p-3 rounded-lg bg-cyber-black/30 border border-cyber-pink/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-cyber-pink" />
              <span className="text-sm font-semibold text-cyber-white">Stress Level</span>
            </div>
            <Badge className={`text-xs ${getStressColor(stress.level)}`}>
              {stress.status.toUpperCase()}
            </Badge>
          </div>
          <div className="text-2xl font-bold text-cyber-pink mb-1">{stress.level}/100</div>
        </div>

        {/* Heart Rate */}
        <div className="p-3 rounded-lg bg-cyber-black/30 border border-cyber-green/30">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-4 w-4 text-cyber-green" />
            <span className="text-sm font-semibold text-cyber-white">Heart Rate</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-lg font-bold text-cyber-green">{heart_rate.resting}</div>
              <div className="text-xs text-cyber-white/70">Resting BPM</div>
            </div>
            <div>
              <div className="text-lg font-bold text-cyber-green">{heart_rate.avg_workout}</div>
              <div className="text-xs text-cyber-white/70">Avg Workout</div>
            </div>
          </div>
        </div>

        {/* Recovery Score */}
        <div className="p-3 rounded-lg bg-ai-glow/10 border border-cyber-green/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-cyber-white">Recovery Score</span>
            <Badge className="bg-cyber-green text-cyber-black font-mono">
              {recovery.score}/100
            </Badge>
          </div>
          <p className="text-xs text-cyber-green">{recovery.recommendation}</p>
        </div>

        {/* Meditation Tracker */}
        <div className="text-center">
          <Badge className="bg-cyber-purple/20 text-cyber-purple cursor-pointer hover:bg-cyber-purple/30">
            Start Meditation Session
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
