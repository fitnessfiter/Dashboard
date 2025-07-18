
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Brain,
  BarChart3,
  Apple,
  MessageSquare,
  Heart,
  Zap,
  Settings,
  Trophy,
  Calendar
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "AI Smart Planner", url: "/dashboard", icon: Brain },
  { title: "Progress Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Nutrition Dashboard", url: "/dashboard/nutrition", icon: Apple },
  { title: "AI Assistant", url: "/dashboard/assistant", icon: MessageSquare },
  { title: "Wellness Panel", url: "/dashboard/wellness", icon: Heart },
  { title: "Achievements", url: "/dashboard/achievements", icon: Trophy },
  { title: "Schedule", url: "/dashboard/schedule", icon: Calendar },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path || (path === "/dashboard" && currentPath === "/dashboard");

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-neon-gradient text-white font-semibold shadow-lg"
        : "text-cyber-white/70 hover:text-cyber-white hover:bg-cyber-purple/20"
    }`;

  return (
    <Sidebar
      className={`fixed top-0 left-0 h-screen z-20 ${collapsed ? "w-16" : "w-64"} glass border-r border-cyber-purple/30 transition-all duration-300 shadow-2xl backdrop-blur-lg bg-cyber-dark/70 border-cyber-purple/40 border-r-2 before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-cyber-purple/30 before:to-cyber-blue/10 before:blur-xl before:pointer-events-none`}
      collapsible="icon"
    >
      <SidebarContent className="pb-4 px-4 relative">
        {/* Logo */}
        <div className="flex flex-col items-center mt-2 mb-4">
          <img
            src="/logo2.svg"
            alt="FitnessFiter Logo"
            className="w-25 h-25 object-contain"
          />
          {/* Sidebar Toggle - moved here */}
          <SidebarTrigger className="mt-4 bg-cyber-purple/40 border border-cyber-blue/30 text-cyber-white hover:bg-cyber-purple/70 w-10 h-10 rounded-full shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center backdrop-blur-lg" />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-cyber-blue font-bold mb-4 tracking-wide drop-shadow-lg">
            {!collapsed && "AI FITNESS DASHBOARD"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group select-none ${
                        isActive
                          ? "bg-gradient-to-r from-cyber-purple via-cyber-blue to-cyber-pink text-white font-semibold shadow-xl border border-cyber-blue/40 scale-[1.04]"
                          : "text-cyber-white/80 hover:text-white hover:bg-cyber-purple/30 hover:scale-105 border border-transparent group-hover:shadow-lg"
                      }`}
                    >
                      <item.icon className={`h-5 w-5 ${collapsed ? "mx-auto" : ""} group-hover:drop-shadow-neon transition-all duration-200`} />
                      {!collapsed && <span className="font-medium tracking-tight group-hover:tracking-wide transition-all duration-200">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
