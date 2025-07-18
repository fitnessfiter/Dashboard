
import { useState } from "react";
import { BarChart3, TrendingUp, Award, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";

// Demo data for demonstration
const analyticsData = {
  weekly_progress: {
    workouts_completed: 5,
    total_planned: 6,
    calories_burned: 2400,
    strength_gain: "+12%",
    consistency_score: 92,
    improvement_rate: 8,
    best_day: "Thursday",
    daily: [
      { day: "Mon", completed: true, calories: 400 },
      { day: "Tue", completed: true, calories: 350 },
      { day: "Wed", completed: false, calories: 0 },
      { day: "Thu", completed: true, calories: 600 },
      { day: "Fri", completed: true, calories: 500 },
      { day: "Sat", completed: true, calories: 550 },
      { day: "Sun", completed: false, calories: 0 },
    ],
  },
  achievements: [
    { name: "Workout Streak", value: "7 days", status: "active" },
    { name: "Strength Master", value: "New PR", status: "new" },
    { name: "Consistency King", value: "92%", status: "active" },
  ],
};

function AnimatedProgressBar({ percent, color }: { percent: number; color: string }) {
  return (
    <div className="w-full h-3 bg-cyber-black/40 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-in-out ${color}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export function ProgressAnalytics() {
  const { weekly_progress, achievements } = analyticsData;
  const [showTooltip, setShowTooltip] = useState(false);

  // Calculate daily completion rate for chart
  const chartMax = Math.max(...weekly_progress.daily.map(d => d.calories), 600);

  return (
    <Card className="glass border-cyber-purple/30 neon-glow">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-cyber-pink" />
          <CardTitle className="text-cyber-white">Progress Analytics Hub</CardTitle>
        </div>
        <CardDescription className="text-cyber-white/70">
          Real-time performance tracking and trend analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Weekly Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 rounded-lg bg-cyber-black/30 border border-cyber-blue/30">
            <div className="text-2xl font-bold text-cyber-blue mb-1">
              {weekly_progress.workouts_completed}/{weekly_progress.total_planned}
            </div>
            <div className="text-xs text-cyber-white/70 flex items-center justify-center gap-1">
              Workouts
              <Info className="h-3 w-3 text-cyber-blue cursor-pointer" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} />
              {showTooltip && (
                <span className="absolute mt-6 px-2 py-1 bg-cyber-blue/90 text-xs text-white rounded shadow-lg z-10">Number of workouts completed this week</span>
              )}
            </div>
          </div>
          <div className="text-center p-4 rounded-lg bg-cyber-black/30 border border-cyber-pink/30">
            <div className="text-2xl font-bold text-cyber-pink mb-1">
              {weekly_progress.calories_burned}
            </div>
            <div className="text-xs text-cyber-white/70">Calories Burned</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-cyber-black/30 border border-cyber-green/30">
            <div className="text-2xl font-bold text-cyber-green mb-1">
              {weekly_progress.strength_gain}
            </div>
            <div className="text-xs text-cyber-white/70">Strength Gain</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-cyber-black/30 border border-cyber-purple/30">
            <div className="text-2xl font-bold text-cyber-purple mb-1">
              {weekly_progress.consistency_score}%
            </div>
            <div className="text-xs text-cyber-white/70">Consistency</div>
          </div>
        </div>

        {/* Demo Bar Chart for Daily Calories */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="h-5 w-5 text-cyber-pink" />
            <span className="font-semibold text-cyber-white">Weekly Calories Burned</span>
          </div>
          <div className="flex items-end gap-2 h-32 w-full">
            {weekly_progress.daily.map((d, i) => (
              <div key={d.day} className="flex flex-col items-center w-8">
                <div
                  className={`transition-all duration-700 ease-in-out rounded-t-md ${d.completed ? "bg-cyber-pink" : "bg-cyber-white/20"}`}
                  style={{ height: `${(d.calories / chartMax) * 100}%`, minHeight: 8 }}
                />
                <span className="text-xs text-cyber-white/70 mt-1">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Progress Breakdown */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-cyber-green" />
            <span className="font-semibold text-cyber-white">Daily Progress</span>
          </div>
          <div className="space-y-2">
            {weekly_progress.daily.map((d, i) => (
              <div key={d.day} className="flex items-center gap-2">
                <span className="w-10 text-xs text-cyber-white/70">{d.day}</span>
                <AnimatedProgressBar percent={d.completed ? 100 : 0} color={d.completed ? "bg-cyber-green" : "bg-cyber-white/20"} />
                <span className="w-16 text-xs text-cyber-white/70 text-right">{d.completed ? `${d.calories} cal` : "Missed"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center space-x-2 mb-3">
            <Award className="h-5 w-5 text-cyber-green" />
            <h4 className="font-semibold text-cyber-white">Recent Achievements</h4>
          </div>
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-cyber-purple/10 border border-cyber-purple/30 animate-fade-in">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-neon-gradient flex items-center justify-center animate-bounce-slow">
                  <Award className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-cyber-white">{achievement.name}</div>
                  <div className="text-sm text-cyber-white/70">{achievement.value}</div>
                </div>
              </div>
              <Badge 
                className={`$ {
                  achievement.status === "new" 
                    ? "bg-cyber-green text-cyber-black animate-pulse" 
                    : "bg-cyber-blue/20 text-cyber-blue"
                }`}
              >
                {achievement.status === "new" ? "NEW!" : "ACTIVE"}
              </Badge>
            </div>
          ))}
        </div>

        {/* Trend Indicator & Highlights */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 p-3 rounded-lg bg-cyber-green/10">
          <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-cyber-green" />
          <span className="text-cyber-green font-semibold">Overall progress trending upward!</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-cyber-white/70">
            <span>Best Day: <span className="text-cyber-green font-bold">{weekly_progress.best_day}</span></span>
            <span>Improvement: <span className="text-cyber-pink font-bold">+{weekly_progress.improvement_rate}%</span></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
