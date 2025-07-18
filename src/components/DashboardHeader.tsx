
import { useState, useRef, useEffect } from "react";
import { Bell, Search, User, ChevronDown, LogOut, Settings, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function getDateString() {
  return new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
}

export function DashboardHeader() {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });
  const notifications = [
    { id: 1, text: "You hit a new PR on squats!", icon: <Sparkles className="h-4 w-4 text-cyber-pink" /> },
    { id: 2, text: "AI has a new nutrition tip for you.", icon: <Sparkles className="h-4 w-4 text-cyber-green" /> },
  ];
  const navigate = useNavigate();

  // Position dropdown below the button
  useEffect(() => {
    if (showProfile && profileBtnRef.current) {
      const rect = profileBtnRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right - 176 + window.scrollX, // 176px = dropdown width
        width: rect.width,
      });
    }
  }, [showProfile]);

  // Click-away handler
  useEffect(() => {
    if (!showProfile) return;
    const handleClick = (e: MouseEvent) => {
      if (
        profileBtnRef.current &&
        !profileBtnRef.current.contains(e.target as Node) &&
        !(document.getElementById("profile-dropdown")?.contains(e.target as Node))
      ) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showProfile]);

  // Handle logout navigation
  const handleLogout = () => {
    setShowProfile(false);
    navigate("/login");
  };

  return (
    <header className="glass border-b border-cyber-purple/30 p-4 shadow-sm bg-gradient-to-r from-cyber-black/60 to-cyber-purple/10 z-10 relative">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Greeting only (logo and app name removed) */}
        <div className="flex items-center gap-6 min-w-0">
          <div className="hidden md:flex flex-col ml-6">
            <span className="text-cyber-white/90 text-sm font-semibold">{getGreeting()} Alex!</span>
            <span className="text-cyber-white/60 text-xs">{getDateString()}</span>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-white/50" />
            <Input
              placeholder="Search workouts, nutrition, analytics..."
              className="pl-10 bg-cyber-black/30 border-cyber-purple/30 text-cyber-white placeholder:text-cyber-white/50 focus:ring-2 focus:ring-cyber-pink/40 transition"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 relative">
          {/* AI Status Badge */}
          <Badge className="bg-ai-glow text-white font-mono animate-pulse shadow-md">
            <span className="flex items-center gap-1"><Sparkles className="h-4 w-4 animate-bounce text-cyber-pink" />AI ACTIVE</span>
          </Badge>

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative text-cyber-white hover:bg-cyber-purple/20" onClick={() => setShowNotifications((v) => !v)}>
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-pink rounded-full animate-pulse"></span>
            </Button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-cyber-black/90 border border-cyber-purple/30 rounded-lg shadow-lg z-20 animate-fade-in">
                <div className="p-3 border-b border-cyber-purple/20 text-cyber-white font-semibold text-sm">Notifications</div>
                <ul className="max-h-40 overflow-y-auto">
                  {notifications.map((n) => (
                    <li key={n.id} className="flex items-center gap-2 px-4 py-2 text-xs text-cyber-white/90 hover:bg-cyber-purple/10 cursor-pointer">
                      {n.icon} {n.text}
                    </li>
                  ))}
                </ul>
                <div className="p-2 text-center text-xs text-cyber-white/50">View all</div>
              </div>
            )}
          </div>

          {/* Profile Dropdown Button and Portal Dropdown */}
          <Button
            ref={profileBtnRef}
            variant="ghost"
            size="icon"
            className="text-cyber-white hover:bg-cyber-purple/20 flex items-center"
            onClick={() => setShowProfile((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={showProfile}
            aria-controls="profile-dropdown"
          >
            <User className="h-5 w-5" />
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          {showProfile && createPortal(
            <div
              id="profile-dropdown"
              className="fixed w-44 bg-cyber-black/90 border border-cyber-purple/30 rounded-lg shadow-lg z-[99999] animate-fade-in"
              style={{ top: dropdownPos.top, left: dropdownPos.left }}
              role="menu"
              tabIndex={-1}
            >
              <div className="p-3 border-b border-cyber-purple/20 text-cyber-white font-semibold text-sm">Alex Fit</div>
              <ul>
                <li className="flex items-center gap-2 px-4 py-2 text-xs text-cyber-white/90 hover:bg-cyber-purple/10 cursor-pointer" role="menuitem">
                  <Settings className="h-4 w-4" /> Settings
                </li>
                <li className="flex items-center gap-2 px-4 py-2 text-xs text-cyber-white/90 hover:bg-cyber-pink/10 cursor-pointer" role="menuitem" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" /> Logout
                </li>
              </ul>
            </div>,
            document.body
          )}
        </div>
      </div>
    </header>
  );
}
