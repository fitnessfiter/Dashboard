
import { useEffect, useRef } from "react";
import { Calendar, Brain, Plus, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// Import the scrollToWelcomeSection function
import { scrollToWelcomeSection } from "@/pages/Dashboard";

const workoutPlan = [
  {
    day: "Monday",
    workout: "Upper Body Strength",
    duration: "60 min",
    ai_suggestion: "Focus on progressive overload",
    exercises: ["Bench Press", "Pull-ups", "Shoulder Press"],
    difficulty: "High"
  },
  {
    day: "Tuesday",
    workout: "HIIT Cardio",
    duration: "30 min",
    ai_suggestion: "Heart rate zones optimized",
    exercises: ["Burpees", "Mountain Climbers", "Jump Squats"],
    difficulty: "Medium"
  },
  {
    day: "Wednesday",
    workout: "Lower Body Power",
    duration: "45 min",
    ai_suggestion: "Recovery from yesterday's cardio",
    exercises: ["Squats", "Deadlifts", "Lunges"],
    difficulty: "High"
  },
  {
    day: "Today",
    workout: "Active Recovery",
    duration: "30 min",
    ai_suggestion: "Perfect for muscle recovery",
    exercises: ["Yoga Flow", "Stretching", "Light Walk"],
    difficulty: "Low"
  }
];

export function AISmartPlanner() {
  const plannerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Scroll to the welcome section at the top of the dashboard
    if (typeof scrollToWelcomeSection === "function") {
      scrollToWelcomeSection();
    }
  }, []);
  return (
    <Card ref={plannerRef} className="glass border-cyber-purple/30 neon-glow">
      {/* Welcome Message */}
      <div className="mb-4 p-4 rounded-xl bg-cyber-purple/10 border border-cyber-purple/30 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-cyber-white mb-1">
          Welcome back, <span className="text-transparent bg-clip-text bg-neon-gradient">Fitness Warrior</span>!
        </h2>
        <p className="text-cyber-white/70 text-sm">
          Your AI-powered fitness journey continues. Let's analyze your progress and optimize your routine.
        </p>
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-cyber-blue" />
            <CardTitle className="text-cyber-white">AI Smart Planner</CardTitle>
          </div>
          <Button size="sm" className="bg-neon-gradient hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Add Workout
          </Button>
        </div>
        <CardDescription className="text-cyber-white/70">
          Intelligent workout scheduling based on your progress and goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workoutPlan.map((day, index) => (
            <div
              key={day.day}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                day.day === "Today"
                  ? "border-cyber-green bg-cyber-green/10 shadow-lg"
                  : "border-cyber-purple/30 bg-cyber-black/20 hover:bg-cyber-purple/10"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-cyber-blue" />
                  <span className="font-semibold text-cyber-white">{day.day}</span>
                  {day.day === "Today" && (
                    <Badge className="bg-cyber-green text-cyber-black font-mono text-xs">
                      TODAY
                    </Badge>
                  )}
                </div>
                <Badge 
                  variant="outline" 
                  className={`${
                    day.difficulty === "High" ? "border-cyber-pink text-cyber-pink" :
                    day.difficulty === "Medium" ? "border-cyber-blue text-cyber-blue" :
                    "border-cyber-green text-cyber-green"
                  }`}
                >
                  {day.difficulty}
                </Badge>
              </div>
              
              <h4 className="text-lg font-semibold text-cyber-white mb-2">{day.workout}</h4>
              
              <div className="flex items-center space-x-4 text-sm text-cyber-white/70 mb-3">
                <span>⏱ {day.duration}</span>
                <span>• {day.exercises.length} exercises</span>
              </div>
              
              <div className="flex items-start space-x-2 mb-3">
                <Zap className="h-4 w-4 text-cyber-green mt-0.5 flex-shrink-0" />
                <p className="text-sm text-cyber-green font-medium">{day.ai_suggestion}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {day.exercises.map((exercise, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-cyber-purple/20 text-cyber-white text-xs">
                    {exercise}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
