
import { useState } from "react";
import { Apple, Zap, Target, Info, Utensils, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const nutritionData = {
  daily_nutrition: {
    target: { calories: 2150, protein: 128, carbs: 230, fat: 80 },
    actual: { calories: 1980, protein: 112, carbs: 185, fat: 72 },
    ai_suggestion: "Add 1 scoop whey protein post-workout",
    meals: [
      { name: "Breakfast", icon: "🍳", calories: 420, protein: 22, carbs: 45, fat: 15 },
      { name: "Lunch", icon: "🥗", calories: 610, protein: 35, carbs: 70, fat: 18 },
      { name: "Snack", icon: "🍎", calories: 180, protein: 2, carbs: 40, fat: 1 },
      { name: "Dinner", icon: "🍗", calories: 770, protein: 53, carbs: 30, fat: 38 },
    ],
    week: [1980, 2100, 1850, 2200, 2000, 2150, 1900],
  },
};

function DonutChart({ protein, carbs, fat }: { protein: number; carbs: number; fat: number }) {
  // Calculate angles
  const total = protein + carbs + fat;
  const proteinAngle = (protein / total) * 360;
  const carbsAngle = (carbs / total) * 360;
  const fatAngle = (fat / total) * 360;
  // SVG arc paths
  const describeArc = (start: number, end: number, color: string) => {
    const r = 36, cx = 40, cy = 40;
    const rad = (deg: number) => (Math.PI / 180) * deg;
    const x1 = cx + r * Math.cos(rad(start - 90));
    const y1 = cy + r * Math.sin(rad(start - 90));
    const x2 = cx + r * Math.cos(rad(end - 90));
    const y2 = cy + r * Math.sin(rad(end - 90));
    const largeArc = end - start > 180 ? 1 : 0;
    return (
      <path
        d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`}
        fill={color}
        fillOpacity={0.8}
      />
    );
  };
  return (
    <svg width={80} height={80} viewBox="0 0 80 80">
      {describeArc(0, proteinAngle, "#60a5fa")}
      {describeArc(proteinAngle, proteinAngle + carbsAngle, "#ec4899")}
      {describeArc(proteinAngle + carbsAngle, 360, "#22d3ee")}
      <circle cx={40} cy={40} r={24} fill="#18181b" />
    </svg>
  );
}

export function NutritionDashboard() {
  const { target, actual, ai_suggestion, meals, week } = nutritionData.daily_nutrition;
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  const getProgressColor = (actual: number, target: number) => {
    const percentage = (actual / target) * 100;
    if (percentage >= 90) return "bg-cyber-green";
    if (percentage >= 70) return "bg-cyber-blue";
    return "bg-cyber-pink";
  };

  return (
    <Card className="glass border-cyber-purple/30 neon-glow">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Apple className="h-5 w-5 text-cyber-green" />
          <CardTitle className="text-cyber-white text-lg">Nutrition Intelligence</CardTitle>
        </div>
        <CardDescription className="text-cyber-white/70">
          Today's macro tracking & AI recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Macro Donut Chart & Stats */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-2">
          <div className="flex flex-col items-center">
            <DonutChart protein={actual.protein} carbs={actual.carbs} fat={actual.fat} />
            <div className="flex gap-2 mt-2 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-cyber-blue inline-block" />Protein</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-cyber-pink inline-block" />Carbs</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-cyber-green inline-block" />Fat</span>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 gap-2 w-full">
        {/* Calories */}
        <div className="space-y-2">
              <div className="flex justify-between text-sm items-center">
                <span className="text-cyber-white flex items-center gap-1">
                  Calories
                  <Info className="h-3 w-3 text-cyber-blue cursor-pointer" onMouseEnter={() => setShowTooltip('calories')} onMouseLeave={() => setShowTooltip(null)} />
                  {showTooltip === 'calories' && (
                    <span className="absolute mt-6 px-2 py-1 bg-cyber-blue/90 text-xs text-white rounded shadow-lg z-10">Total calories consumed today</span>
                  )}
                </span>
            <span className="text-cyber-white/70">{actual.calories} / {target.calories}</span>
          </div>
          <Progress 
            value={(actual.calories / target.calories) * 100} 
                className="h-2 transition-all duration-700"
          />
        </div>
            {/* Macros */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-cyber-black/30">
                <div className="text-lg font-bold text-cyber-blue flex items-center justify-center gap-1">
                  {actual.protein}g
                  <Info className="h-3 w-3 text-cyber-blue cursor-pointer" onMouseEnter={() => setShowTooltip('protein')} onMouseLeave={() => setShowTooltip(null)} />
                </div>
            <div className="text-xs text-cyber-white/70">Protein</div>
            <div className="text-xs text-cyber-white/50">{target.protein}g goal</div>
                {showTooltip === 'protein' && (
                  <span className="absolute mt-6 px-2 py-1 bg-cyber-blue/90 text-xs text-white rounded shadow-lg z-10">Essential for muscle repair and growth</span>
                )}
          </div>
          <div className="text-center p-3 rounded-lg bg-cyber-black/30">
                <div className="text-lg font-bold text-cyber-pink flex items-center justify-center gap-1">
                  {actual.carbs}g
                  <Info className="h-3 w-3 text-cyber-pink cursor-pointer" onMouseEnter={() => setShowTooltip('carbs')} onMouseLeave={() => setShowTooltip(null)} />
                </div>
            <div className="text-xs text-cyber-white/70">Carbs</div>
            <div className="text-xs text-cyber-white/50">{target.carbs}g goal</div>
                {showTooltip === 'carbs' && (
                  <span className="absolute mt-6 px-2 py-1 bg-cyber-pink/90 text-xs text-white rounded shadow-lg z-10">Main energy source for workouts</span>
                )}
          </div>
          <div className="text-center p-3 rounded-lg bg-cyber-black/30">
                <div className="text-lg font-bold text-cyber-green flex items-center justify-center gap-1">
                  {actual.fat}g
                  <Info className="h-3 w-3 text-cyber-green cursor-pointer" onMouseEnter={() => setShowTooltip('fat')} onMouseLeave={() => setShowTooltip(null)} />
                </div>
            <div className="text-xs text-cyber-white/70">Fat</div>
            <div className="text-xs text-cyber-white/50">{target.fat}g goal</div>
                {showTooltip === 'fat' && (
                  <span className="absolute mt-6 px-2 py-1 bg-cyber-green/90 text-xs text-white rounded shadow-lg z-10">Supports hormone production</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Calories Trend */}
        <div className="mb-2">
          <div className="flex items-center space-x-2 mb-1">
            <Calendar className="h-4 w-4 text-cyber-pink" />
            <span className="font-semibold text-cyber-white text-xs">Weekly Calories Trend</span>
          </div>
          <div className="flex items-end gap-2 h-16 w-full">
            {week.map((cals, i) => (
              <div key={i} className="flex flex-col items-center w-6">
                <div
                  className="transition-all duration-700 ease-in-out rounded-t-md bg-cyber-pink"
                  style={{ height: `${(cals / Math.max(...week, 2200)) * 100}%`, minHeight: 6 }}
                />
                <span className="text-[10px] text-cyber-white/70 mt-1">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Meals */}
        <div className="mb-2">
          <div className="flex items-center space-x-2 mb-1">
            <Utensils className="h-4 w-4 text-cyber-green" />
            <span className="font-semibold text-cyber-white text-xs">Recent Meals</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {meals.map((meal, i) => (
              <div key={i} className="flex flex-col items-center p-2 rounded-lg bg-cyber-black/30 border border-cyber-green/20">
                <span className="text-2xl mb-1">{meal.icon}</span>
                <span className="text-xs text-cyber-white font-semibold">{meal.name}</span>
                <span className="text-xs text-cyber-white/70">{meal.calories} cal</span>
                <span className="text-[10px] text-cyber-blue">{meal.protein}P</span>
                <span className="text-[10px] text-cyber-pink">{meal.carbs}C</span>
                <span className="text-[10px] text-cyber-green">{meal.fat}F</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="flex items-start space-x-2 p-3 rounded-lg bg-ai-glow/10 border border-cyber-green/30 animate-fade-in">
          <Zap className="h-4 w-4 text-cyber-green mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-semibold text-cyber-green mb-1">AI RECOMMENDATION</div>
            <p className="text-sm text-cyber-white">{ai_suggestion}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Badge className="bg-cyber-blue/20 text-cyber-blue cursor-pointer hover:bg-cyber-blue/30">
            Log Meal
          </Badge>
          <Badge className="bg-cyber-pink/20 text-cyber-pink cursor-pointer hover:bg-cyber-pink/30">
            Scan Barcode
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
