
import { useState } from "react";
import { User, Camera, Trophy, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export function ProfileSettings() {
  const [profile, setProfile] = useState({
    firstName: "Alex",
    lastName: "Fitness",
    email: "alex@fitnessfiter.com",
    age: 28,
    height: 175,
    weight: 70,
    goal: "muscle-gain",
    experience: "intermediate",
    workoutDays: 5
  });

  const [achievements] = useState([
    { name: "30-Day Streak", icon: "🔥", earned: true },
    { name: "Macro Master", icon: "🥗", earned: true },
    { name: "Sleep Champion", icon: "😴", earned: false },
    { name: "Hydration Hero", icon: "💧", earned: true },
  ]);

  const handleSave = () => {
    toast.success("Profile updated successfully!", {
      description: "Your fitness profile has been saved."
    });
  };

  const bmi = (profile.weight / ((profile.height / 100) ** 2)).toFixed(1);
  const profileCompletion = 85;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="glass border-cyber-purple/30 neon-glow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-16 h-16 border-2 border-cyber-blue">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-neon-gradient text-white text-xl">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyber-blue hover:bg-cyber-blue/80"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyber-white">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-cyber-white/70">{profile.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className="bg-cyber-green/20 text-cyber-green">
                    {profile.experience.charAt(0).toUpperCase() + profile.experience.slice(1)}
                  </Badge>
                  <Badge className="bg-cyber-purple/20 text-cyber-purple">
                    BMI: {bmi}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-cyber-white/70 mb-1">Profile Completion</div>
              <div className="flex items-center space-x-2">
                <Progress value={profileCompletion} className="w-24" />
                <span className="text-cyber-white font-semibold">{profileCompletion}%</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card className="glass border-cyber-purple/30 neon-glow">
        <CardHeader>
          <CardTitle className="text-cyber-white flex items-center">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </CardTitle>
          <CardDescription className="text-cyber-white/70">
            Update your personal details and fitness metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-cyber-white">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-cyber-white">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-cyber-white">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age" className="text-cyber-white">Age</Label>
              <Input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-cyber-white">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={profile.height}
                onChange={(e) => setProfile({...profile, height: parseInt(e.target.value)})}
                className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white"
              />
            </div>
            <div>
              <Label htmlFor="weight" className="text-cyber-white">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({...profile, weight: parseInt(e.target.value)})}
                className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goal" className="text-cyber-white">Primary Fitness Goal</Label>
              <Select value={profile.goal} onValueChange={(value) => setProfile({...profile, goal: value})}>
                <SelectTrigger className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experience" className="text-cyber-white">Experience Level</Label>
              <Select value={profile.experience} onValueChange={(value) => setProfile({...profile, experience: value})}>
                <SelectTrigger className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleSave} className="bg-neon-gradient hover:opacity-90 text-white">
            Save Profile Changes
          </Button>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="glass border-cyber-purple/30 neon-glow">
        <CardHeader>
          <CardTitle className="text-cyber-white flex items-center">
            <Trophy className="w-5 h-5 mr-2" />
            Achievements & Badges
          </CardTitle>
          <CardDescription className="text-cyber-white/70">
            Your fitness milestones and accomplishments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  achievement.earned
                    ? "bg-cyber-green/10 border-cyber-green text-cyber-green"
                    : "bg-cyber-white/5 border-cyber-white/20 text-cyber-white/50"
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <div className="text-sm font-semibold">{achievement.name}</div>
                {achievement.earned && (
                  <Badge className="mt-2 bg-cyber-green/20 text-cyber-green text-xs">
                    Earned
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
