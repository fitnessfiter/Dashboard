
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SettingsNavigation } from "@/components/settings/SettingsNavigation";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { PrivacySettings } from "@/components/settings/PrivacySettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { Button } from "@/components/ui/button";
import { Database, LogOut, Download, Trash2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const handleExportData = () => {
    toast.success("Data export started!", {
      description: "Your fitness data will be emailed to you within 24 hours."
    });
  };

  const handleSignOut = () => {
    toast.info("Signed out successfully", {
      description: "You have been logged out of your account."
    });
  };

  const handleClearCache = () => {
    toast.success("Cache cleared!", {
      description: "Application cache has been cleared successfully."
    });
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "privacy":
        return <PrivacySettings />;
      case "appearance":
        return <AppearanceSettings />;
      case "data":
        return (
          <div className="space-y-8">
            <Card className="glass border-cyber-blue/40 neon-glow shadow-xl backdrop-blur-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-cyber-blue flex items-center text-2xl font-extrabold tracking-tight">
                  <Database className="w-6 h-6 mr-3 text-cyber-blue animate-pulse" />
                  Data Export & Management
                </CardTitle>
                <CardDescription className="text-cyber-white/80 text-base mt-2">
                  Download your data or manage your account securely. Choose the format that suits your needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Export All Data */}
                  <div className="rounded-xl glass border-2 border-cyber-blue/60 hover:border-cyber-blue/90 transition-all shadow-lg p-4 flex flex-col items-center group cursor-pointer hover:scale-105">
                    <Button
                      onClick={handleExportData}
                      className="bg-cyber-blue/90 hover:bg-cyber-blue/80 text-white w-full h-20 flex-col shadow-cyber-blue/30 shadow-md group-hover:shadow-xl"
                    >
                      <Download className="w-7 h-7 mb-2 animate-bounce" />
                      <span className="font-semibold">Export All Data</span>
                      <span className="text-xs opacity-80">JSON format</span>
                    </Button>
                  </div>
                  {/* Workout History */}
                  <div className="rounded-xl glass border-2 border-cyber-green/60 hover:border-cyber-green/90 transition-all shadow-lg p-4 flex flex-col items-center group cursor-pointer hover:scale-105">
                    <Button
                      variant="outline"
                      className="border-cyber-green/60 text-cyber-green hover:bg-cyber-green/20 w-full h-20 flex-col shadow-cyber-green/20 shadow-md group-hover:shadow-xl"
                    >
                      <Database className="w-7 h-7 mb-2" />
                      <span className="font-semibold">Workout History</span>
                      <span className="text-xs opacity-80">CSV export</span>
                    </Button>
                  </div>
                  {/* Nutrition Data */}
                  <div className="rounded-xl glass border-2 border-cyber-purple/60 hover:border-cyber-purple/90 transition-all shadow-lg p-4 flex flex-col items-center group cursor-pointer hover:scale-105">
                    <Button
                      variant="outline"
                      className="border-cyber-purple/60 text-cyber-purple hover:bg-cyber-purple/20 w-full h-20 flex-col shadow-cyber-purple/20 shadow-md group-hover:shadow-xl"
                    >
                      <Download className="w-7 h-7 mb-2" />
                      <span className="font-semibold">Nutrition Data</span>
                      <span className="text-xs opacity-80">Excel format</span>
                    </Button>
                  </div>
                  {/* Progress Photos */}
                  <div className="rounded-xl glass border-2 border-cyber-pink/60 hover:border-cyber-pink/90 transition-all shadow-lg p-4 flex flex-col items-center group cursor-pointer hover:scale-105">
                    <Button
                      variant="outline"
                      className="border-cyber-pink/60 text-cyber-pink hover:bg-cyber-pink/20 w-full h-20 flex-col shadow-cyber-pink/20 shadow-md group-hover:shadow-xl"
                    >
                      <Download className="w-7 h-7 mb-2" />
                      <span className="font-semibold">Progress Photos</span>
                      <span className="text-xs opacity-80">ZIP archive</span>
                    </Button>
                  </div>
                </div>
                <div className="p-6 bg-cyber-black/40 rounded-2xl border border-cyber-white/10 shadow-inner mt-4">
                  <h4 className="text-cyber-white font-bold text-lg mb-3 tracking-wide">Data Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-base">
                    <div className="flex flex-col items-center">
                      <div className="text-cyber-white/70">Workouts</div>
                      <div className="text-cyber-blue font-bold text-xl">247</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-cyber-white/70">Meals Logged</div>
                      <div className="text-cyber-green font-bold text-xl">1,432</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-cyber-white/70">Photos</div>
                      <div className="text-cyber-pink font-bold text-xl">89</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-cyber-white/70">Total Size</div>
                      <div className="text-cyber-purple font-bold text-xl">2.3 GB</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "advanced":
        return (
          <div className="space-y-8">
            <Card className="glass border-cyber-pink/40 neon-glow shadow-xl backdrop-blur-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-cyber-pink flex items-center text-2xl font-extrabold tracking-tight">
                  <RefreshCw className="w-6 h-6 mr-3 text-cyber-pink animate-spin-slow" />
                  Advanced Settings
                </CardTitle>
                <CardDescription className="text-cyber-white/80 text-base mt-2">
                  Advanced configuration and troubleshooting options. Use with caution!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Clear Cache */}
                  <div className="rounded-xl glass border-2 border-cyber-blue/60 hover:border-cyber-blue/90 transition-all shadow-lg p-4 flex flex-col items-center group cursor-pointer hover:scale-105">
                    <Button
                      onClick={handleClearCache}
                      variant="outline"
                      className="border-cyber-blue/60 text-cyber-blue hover:bg-cyber-blue/20 w-full h-20 flex-col shadow-cyber-blue/20 shadow-md group-hover:shadow-xl"
                    >
                      <RefreshCw className="w-7 h-7 mb-2 animate-spin-slow" />
                      <span className="font-semibold">Clear Cache</span>
                      <span className="text-xs opacity-80">Reset app data</span>
                    </Button>
                  </div>
                  {/* Reset Settings */}
                  <div className="rounded-xl glass border-2 border-cyber-purple/60 hover:border-cyber-purple/90 transition-all shadow-lg p-4 flex flex-col items-center group cursor-pointer hover:scale-105">
                    <Button
                      variant="outline"
                      className="border-cyber-purple/60 text-cyber-purple hover:bg-cyber-purple/20 w-full h-20 flex-col shadow-cyber-purple/20 shadow-md group-hover:shadow-xl"
                    >
                      <Database className="w-7 h-7 mb-2" />
                      <span className="font-semibold">Reset Settings</span>
                      <span className="text-xs opacity-80">Factory defaults</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-cyber-gradient">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="glass rounded-xl p-6 neon-glow mb-8">
              <h1 className="text-3xl font-bold text-cyber-white mb-2">
                <span className="text-transparent bg-clip-text bg-neon-gradient">Settings</span>
              </h1>
              <p className="text-cyber-white/70">
                Customize your FitnessFiter experience and manage your preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <Card className="glass border-cyber-purple/30 neon-glow sticky top-6">
                  <CardHeader>
                    <CardTitle className="text-cyber-white text-lg">Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SettingsNavigation 
                      activeSection={activeSection} 
                      onSectionChange={setActiveSection} 
                    />
                    
                    {/* Quick Actions */}
                    <div className="mt-6 pt-6 border-t border-cyber-white/10 space-y-2">
                      <Button
                        onClick={handleSignOut}
                        variant="outline"
                        className="w-full border-red-500/30 text-red-400 hover:bg-red-500/20 justify-start"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-3">
                {renderContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
