
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Nutrition from "./pages/Nutrition";
import Assistant from "./pages/Assistant";
import Wellness from "./pages/Wellness";
import Achievements from "./pages/Achievements";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/dashboard" 
            element={
              <SidebarProvider>
                <Dashboard />
              </SidebarProvider>
            } 
          />
          <Route 
            path="/dashboard/analytics" 
            element={
              <SidebarProvider>
                <Analytics />
              </SidebarProvider>
            } 
          />
          <Route 
            path="/dashboard/nutrition" 
            element={
              <SidebarProvider>
                <Nutrition />
              </SidebarProvider>
            } 
          />
          <Route 
            path="/dashboard/assistant" 
            element={
              <SidebarProvider>
                <Assistant />
              </SidebarProvider>
            } 
          />
          <Route 
            path="/dashboard/wellness" 
            element={
              <SidebarProvider>
                <Wellness />
              </SidebarProvider>
            } 
          />
          <Route 
            path="/dashboard/achievements" 
            element={
              <SidebarProvider>
                <Achievements />
              </SidebarProvider>
            } 
          />
          <Route 
            path="/dashboard/schedule" 
            element={
              <SidebarProvider>
                <Schedule />
              </SidebarProvider>
            } 
          />
          <Route 
            path="/dashboard/settings" 
            element={
              <SidebarProvider>
                <Settings />
              </SidebarProvider>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
