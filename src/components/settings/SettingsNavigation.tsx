
import { User, Bell, Shield, Palette, Database, Settings as SettingsIcon } from "lucide-react";

interface SettingsNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function SettingsNavigation({ activeSection, onSectionChange }: SettingsNavigationProps) {
  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "data", label: "Data & Export", icon: Database },
    { id: "advanced", label: "Advanced", icon: SettingsIcon },
  ];

  return (
    <nav className="space-y-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
            activeSection === section.id
              ? "bg-neon-gradient text-white"
              : "text-cyber-white/70 hover:bg-cyber-purple/20 hover:text-cyber-white"
          }`}
        >
          <section.icon className="w-5 h-5" />
          <span className="text-sm font-medium">{section.label}</span>
        </button>
      ))}
    </nav>
  );
}
