
import { useState } from "react";
import { Shield, Eye, Lock, Key, Database, UserX, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function PrivacySettings() {
  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analyticsTracking: true,
    profileVisibility: "friends",
    workoutVisibility: "private",
    shareProgress: false,
    allowFriendRequests: true,
    showOnlineStatus: true,
    shareLocation: false,
    biometricData: true,
    thirdPartyIntegrations: false
  });

  const [passwordStrength] = useState(85);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleToggle = (key: string) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleChangePassword = () => {
    toast.info("Password change initiated", {
      description: "Check your email for password reset instructions."
    });
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(twoFactorEnabled ? "2FA disabled" : "2FA enabled", {
      description: twoFactorEnabled ? "Two-factor authentication has been disabled" : "Two-factor authentication is now active"
    });
  };

  const privacySettings = [
    {
      id: "dataSharing",
      title: "Anonymous Data Sharing",
      description: "Share anonymized data to improve AI recommendations",
      icon: Database,
      risk: "low"
    },
    {
      id: "analyticsTracking",
      title: "Analytics Tracking",
      description: "Help us improve the app experience with usage analytics",
      icon: Eye,
      risk: "low"
    },
    {
      id: "shareProgress",
      title: "Share Progress Updates",
      description: "Allow friends to see your fitness progress and achievements",
      icon: UserX,
      risk: "medium"
    },
    {
      id: "allowFriendRequests",
      title: "Friend Requests",
      description: "Allow other users to send you friend requests",
      icon: UserX,
      risk: "medium"
    },
    {
      id: "showOnlineStatus",
      title: "Online Status",
      description: "Show when you're active on the platform",
      icon: Eye,
      risk: "low"
    },
    {
      id: "shareLocation",
      title: "Location Sharing",
      description: "Share your location for local fitness recommendations",
      icon: AlertTriangle,
      risk: "high"
    },
    {
      id: "biometricData",
      title: "Biometric Data Storage",
      description: "Store detailed health metrics for advanced analytics",
      icon: Database,
      risk: "medium"
    },
    {
      id: "thirdPartyIntegrations",
      title: "Third-party Integrations",
      description: "Allow third-party apps to access your fitness data",
      icon: AlertTriangle,
      risk: "high"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card className="glass border-cyber-purple/30 neon-glow">
        <CardHeader>
          <CardTitle className="text-cyber-white flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Security Overview
          </CardTitle>
          <CardDescription className="text-cyber-white/70">
            Your account security status and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-cyber-green/10 border border-cyber-green/30">
              <div className="flex items-center space-x-3">
                <Lock className="w-6 h-6 text-cyber-green" />
                <div>
                  <div className="text-cyber-white font-semibold">Password Strength</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Progress value={passwordStrength} className="w-20" />
                    <span className="text-cyber-green text-sm">{passwordStrength}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              twoFactorEnabled 
                ? "bg-cyber-green/10 border-cyber-green/30" 
                : "bg-cyber-pink/10 border-cyber-pink/30"
            }`}>
              <div className="flex items-center space-x-3">
                <Key className="w-6 h-6 text-cyber-blue" />
                <div>
                  <div className="text-cyber-white font-semibold">Two-Factor Auth</div>
                  <Badge className={`mt-1 ${
                    twoFactorEnabled 
                      ? "bg-cyber-green/20 text-cyber-green" 
                      : "bg-cyber-pink/20 text-cyber-pink"
                  }`}>
                    {twoFactorEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30">
              <div className="flex items-center space-x-3">
                <Database className="w-6 h-6 text-cyber-blue" />
                <div>
                  <div className="text-cyber-white font-semibold">Data Encryption</div>
                  <Badge className="mt-1 bg-cyber-blue/20 text-cyber-blue">
                    AES-256
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button onClick={handleChangePassword} variant="outline" className="border-cyber-purple/30 text-cyber-white hover:bg-cyber-purple/20">
              Change Password
            </Button>
            <Button onClick={handleEnable2FA} variant="outline" className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/20">
              {twoFactorEnabled ? "Disable" : "Enable"} 2FA
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Controls */}
      <Card className="glass border-cyber-purple/30 neon-glow">
        <CardHeader>
          <CardTitle className="text-cyber-white flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            Privacy Controls
          </CardTitle>
          <CardDescription className="text-cyber-white/70">
            Manage your data privacy and sharing preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {privacySettings.map((setting) => (
            <div
              key={setting.id}
              className="flex items-center justify-between p-4 rounded-lg bg-cyber-black/30 hover:bg-cyber-black/40 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <setting.icon className="w-5 h-5 text-cyber-blue" />
                <div>
                  <div className="text-cyber-white font-medium flex items-center space-x-2">
                    <span>{setting.title}</span>
                    <Badge className={`text-xs ${
                      setting.risk === 'low' ? 'bg-cyber-green/20 text-cyber-green' :
                      setting.risk === 'medium' ? 'bg-cyber-blue/20 text-cyber-blue' :
                      'bg-cyber-pink/20 text-cyber-pink'
                    }`}>
                      {setting.risk} risk
                    </Badge>
                  </div>
                  <div className="text-cyber-white/70 text-sm">{setting.description}</div>
                </div>
              </div>
              <Switch
                checked={privacy[setting.id as keyof typeof privacy] as boolean}
                onCheckedChange={() => handleToggle(setting.id)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="glass border-cyber-purple/30 neon-glow">
        <CardHeader>
          <CardTitle className="text-cyber-white flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Data Management
          </CardTitle>
          <CardDescription className="text-cyber-white/70">
            Control your personal data and account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/20 h-16 flex-col"
            >
              <Database className="w-5 h-5 mb-1" />
              <span>Export My Data</span>
              <span className="text-xs opacity-70">Download all your data</span>
            </Button>
            
            <Button
              variant="outline"
              className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/20 h-16 flex-col"
            >
              <UserX className="w-5 h-5 mb-1" />
              <span>Delete Account</span>
              <span className="text-xs opacity-70">Permanently remove account</span>
            </Button>
          </div>
          
          <div className="p-4 rounded-lg bg-cyber-black/30 border border-cyber-white/10">
            <h4 className="text-cyber-white font-semibold mb-2">Data Retention Policy</h4>
            <p className="text-cyber-white/70 text-sm">
              Your workout and nutrition data is stored securely and retained for analysis. 
              You can request deletion at any time. Anonymized data may be used for 
              research and AI improvement.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
