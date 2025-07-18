
import { useState } from "react";
import { Palette, Monitor, Sun, Moon, Smartphone, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function AppearanceSettings() {
  const [appearance, setAppearance] = useState({
    theme: "dark",
    accentColor: "purple",
    fontSize: "medium",
    compactMode: false,
    animations: true,
    glowEffects: true,
    backgroundIntensity: 75,
    sidebarCollapsed: false,
    highContrast: false,
    reducedMotion: false
  });

  const themes = [
    { id: "dark", name: "Dark Cyber", preview: "bg-gradient-to-br from-cyber-black to-cyber-purple" },
    { id: "light", name: "Light Mode", preview: "bg-gradient-to-br from-white to-gray-100" },
    { id: "auto", name: "Auto", preview: "bg-gradient-to-br from-cyber-black via-cyber-purple to-cyber-blue" }
  ];

  const accentColors = [
    { id: "purple", name: "Cyber Purple", color: "bg-cyber-purple", active: true },
    { id: "blue", name: "Cosmic Blue", color: "bg-cyber-blue", active: false },
    { id: "pink", name: "AI Pink", color: "bg-cyber-pink", active: false },
    { id: "green", name: "AI Green", color: "bg-cyber-green", active: false },
  ];

  const fontSizes = [
    { id: "small", name: "Small", size: "text-sm" },
    { id: "medium", name: "Medium", size: "text-base" },
    { id: "large", name: "Large", size: "text-lg" },
    { id: "xlarge", name: "Extra Large", size: "text-xl" }
  ];

  const handleSave = () => {
    toast.success("Appearance saved!", {
      description: "Your visual preferences have been applied."
    });
  };

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <Card className="glass border-cyber-purple/30 neon-glow">
        <CardHeader>
          <CardTitle className="text-cyber-white flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Theme & Colors
          </CardTitle>
          <CardDescription className="text-cyber-white/70">
            Customize the visual appearance of your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Selection */}
          <div className="space-y-3">
            <Label className="text-cyber-white">Theme Mode</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setAppearance({...appearance, theme: theme.id})}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    appearance.theme === theme.id
                      ? "border-cyber-purple bg-cyber-purple/10"
                      : "border-cyber-white/20 hover:border-cyber-white/40"
                  }`}
                >
                  <div className={`w-full h-16 rounded-lg mb-3 ${theme.preview}`}></div>
                  <div className="text-cyber-white font-medium">{theme.name}</div>
                  {appearance.theme === theme.id && (
                    <Badge className="mt-2 bg-cyber-purple/20 text-cyber-purple">Active</Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Accent Colors */}
          <div className="space-y-3">
            <Label className="text-cyber-white">Accent Color</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setAppearance({...appearance, accentColor: color.id})}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    appearance.accentColor === color.id
                      ? "border-cyber-purple bg-cyber-purple/10"
                      : "border-cyber-white/20 hover:border-cyber-white/40"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${color.color}`}></div>
                  <div className="text-cyber-white text-sm">{color.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Background Intensity */}
          <div className="space-y-3">
            <Label className="text-cyber-white">Background Intensity</Label>
            <div className="space-y-2">
              <Slider
                value={[appearance.backgroundIntensity]}
                onValueChange={(value) => setAppearance({...appearance, backgroundIntensity: value[0]})}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-cyber-white/70">
                <span>Subtle</span>
                <span>{appearance.backgroundIntensity}%</span>
                <span>Vibrant</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography & Layout */}
      <Card className="glass border-cyber-purple/30 neon-glow">
        <CardHeader>
          <CardTitle className="text-cyber-white flex items-center">
            <Monitor className="w-5 h-5 mr-2" />
            Typography & Layout
          </CardTitle>
          <CardDescription className="text-cyber-white/70">
            Adjust text size and layout preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Font Size */}
          <div className="space-y-3">
            <Label className="text-cyber-white">Font Size</Label>
            <Select value={appearance.fontSize} onValueChange={(value) => setAppearance({...appearance, fontSize: value})}>
              <SelectTrigger className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontSizes.map((size) => (
                  <SelectItem key={size.id} value={size.id}>
                    <span className={size.size}>{size.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Layout Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-cyber-white font-medium">Compact Mode</div>
                <div className="text-cyber-white/70 text-sm">Reduce spacing for more content</div>
              </div>
              <Switch
                checked={appearance.compactMode}
                onCheckedChange={(checked) => setAppearance({...appearance, compactMode: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-cyber-white font-medium">Sidebar Collapsed</div>
                <div className="text-cyber-white/70 text-sm">Start with collapsed sidebar</div>
              </div>
              <Switch
                checked={appearance.sidebarCollapsed}
                onCheckedChange={(checked) => setAppearance({...appearance, sidebarCollapsed: checked})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Effects & Animations */}
      <Card className="glass border-cyber-purple/30 neon-glow">
        <CardHeader>
          <CardTitle className="text-cyber-white flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            Visual Effects
          </CardTitle>
          <CardDescription className="text-cyber-white/70">
            Control animations and visual effects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-cyber-white font-medium">Animations</div>
              <div className="text-cyber-white/70 text-sm">Enable smooth transitions and animations</div>
            </div>
            <Switch
              checked={appearance.animations}
              onCheckedChange={(checked) => setAppearance({...appearance, animations: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-cyber-white font-medium">Glow Effects</div>
              <div className="text-cyber-white/70 text-sm">Neon glow effects on cards and buttons</div>
            </div>
            <Switch
              checked={appearance.glowEffects}
              onCheckedChange={(checked) => setAppearance({...appearance, glowEffects: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-cyber-white font-medium">High Contrast</div>
              <div className="text-cyber-white/70 text-sm">Increase contrast for better visibility</div>
            </div>
            <Switch
              checked={appearance.highContrast}
              onCheckedChange={(checked) => setAppearance({...appearance, highContrast: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-cyber-white font-medium">Reduced Motion</div>
              <div className="text-cyber-white/70 text-sm">Minimize animations for accessibility</div>
            </div>
            <Switch
              checked={appearance.reducedMotion}
              onCheckedChange={(checked) => setAppearance({...appearance, reducedMotion: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="glass border-cyber-purple/30 neon-glow">
        <CardHeader>
          <CardTitle className="text-cyber-white">Live Preview</CardTitle>
          <CardDescription className="text-cyber-white/70">
            See how your changes will look
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 rounded-lg bg-cyber-black/30 border border-cyber-purple/30">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-neon-gradient"></div>
              <div>
                <div className="text-cyber-white font-semibold">Sample Dashboard Card</div>
                <div className="text-cyber-white/70 text-sm">This is how your content will appear</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" className="bg-neon-gradient hover:opacity-90">Primary Button</Button>
              <Button size="sm" variant="outline" className="border-cyber-purple/30 text-cyber-white">Secondary</Button>
            </div>
          </div>
          
          <Button onClick={handleSave} className="w-full mt-4 bg-neon-gradient hover:opacity-90 text-white">
            Apply Appearance Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
