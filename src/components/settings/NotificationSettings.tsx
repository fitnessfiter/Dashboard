
import { useState } from "react";
import { Bell, Smartphone, Mail, MessageSquare, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    mealTracking: true,
    aiInsights: true,
    achievements: true,
    socialUpdates: false,
    marketingEmails: false,
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    reminderTime: "08:00",
    frequency: "daily"
  });

  const handleToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSave = () => {
    toast.success("Notification settings saved!", {
      description: "Your preferences have been updated successfully."
    });
  };

  const notificationTypes = [
    {
      id: "workoutReminders",
      title: "Workout Reminders",
      description: "Get notified about scheduled workouts and rest days",
      icon: Clock,
      category: "fitness"
    },
    {
      id: "mealTracking",
      title: "Meal Tracking",
      description: "Reminders to log your meals and water intake",
      icon: Bell,
      category: "nutrition"
    },
    {
      id: "aiInsights",
      title: "AI Insights",
      description: "Receive personalized AI recommendations and tips",
      icon: MessageSquare,
      category: "ai"
    },
    {
      id: "achievements",
      title: "Achievement Alerts",
      description: "Celebrate your fitness milestones and badges",
      icon: Bell,
      category: "achievements"
    },
    {
      id: "socialUpdates",
      title: "Social Updates",
      description: "Updates from your fitness community and friends",
      icon: MessageSquare,
      category: "social"
    },
    {
      id: "marketingEmails",
      title: "Marketing & Promotions",
      description: "Special offers, new features, and fitness tips",
      icon: Mail,
      category: "marketing"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <Card className="glass border-cyber-purple/30 neon-glow">
        <CardHeader>
          <CardTitle className="text-cyber-white flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notification Preferences
          </CardTitle>
          <CardDescription className="text-cyber-white/70">
            Customize how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Delivery Methods */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-cyber-white">Delivery Methods</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-cyber-black/30">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-cyber-blue" />
                  <div>
                    <div className="text-cyber-white font-medium">Push Notifications</div>
                    <div className="text-cyber-white/70 text-sm">Mobile & Desktop</div>
                  </div>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={() => handleToggle("pushNotifications")}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-cyber-black/30">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-cyber-green" />
                  <div>
                    <div className="text-cyber-white font-medium">Email Notifications</div>
                    <div className="text-cyber-white/70 text-sm">Weekly summaries</div>
                  </div>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={() => handleToggle("emailNotifications")}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-cyber-black/30">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-cyber-pink" />
                  <div>
                    <div className="text-cyber-white font-medium">SMS Notifications</div>
                    <div className="text-cyber-white/70 text-sm">Important alerts only</div>
                  </div>
                </div>
                <Switch
                  checked={notifications.smsNotifications}
                  onCheckedChange={() => handleToggle("smsNotifications")}
                />
              </div>
            </div>
          </div>

          {/* Notification Types */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-cyber-white">Notification Types</h3>
            <div className="space-y-3">
              {notificationTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-cyber-black/30 hover:bg-cyber-black/40 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <type.icon className="w-5 h-5 text-cyber-blue" />
                    <div>
                      <div className="text-cyber-white font-medium flex items-center space-x-2">
                        <span>{type.title}</span>
                        <Badge className={`text-xs ${
                          type.category === 'fitness' ? 'bg-cyber-blue/20 text-cyber-blue' :
                          type.category === 'nutrition' ? 'bg-cyber-green/20 text-cyber-green' :
                          type.category === 'ai' ? 'bg-cyber-purple/20 text-cyber-purple' :
                          type.category === 'achievements' ? 'bg-cyber-pink/20 text-cyber-pink' :
                          'bg-cyber-white/20 text-cyber-white'
                        }`}>
                          {type.category}
                        </Badge>
                      </div>
                      <div className="text-cyber-white/70 text-sm">{type.description}</div>
                    </div>
                  </div>
                  <Switch
                    checked={notifications[type.id as keyof typeof notifications] as boolean}
                    onCheckedChange={() => handleToggle(type.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Timing Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-cyber-white">Timing Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reminderTime" className="text-cyber-white">Daily Reminder Time</Label>
                <Select value={notifications.reminderTime} onValueChange={(value) => setNotifications({...notifications, reminderTime: value})}>
                  <SelectTrigger className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="frequency" className="text-cyber-white">Notification Frequency</Label>
                <Select value={notifications.frequency} onValueChange={(value) => setNotifications({...notifications, frequency: value})}>
                  <SelectTrigger className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button onClick={handleSave} className="bg-neon-gradient hover:opacity-90 text-white">
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
