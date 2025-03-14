
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import NicheFinder from "./pages/NicheFinder";
import TrendAnalyzer from "./pages/TrendAnalyzer";
import ContentGenerator from "./pages/ContentGenerator";
import TikTokShop from "./pages/TikTokShop";
import CRPGuide from "./pages/CRPGuide";
import HashtagGenerator from "./pages/HashtagGenerator";
import TitleBioGenerator from "./pages/TitleBioGenerator";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import GradientButton from "@/components/ui/GradientButton";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  
  useEffect(() => {
    // Check if the user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 transition-all duration-300 min-h-screen bg-gradient-to-b from-background to-background/90">
        <Header toggleSidebar={toggleSidebar} />
        <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
      
      <Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
        <DialogContent className="bg-black/80 backdrop-blur-xl border-white/10 text-white max-w-md">
          <div className="p-4">
            <div className="w-12 h-12 rounded-full purple-pink-gradient flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">TH</span>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-gradient">Welcome to TikTokHelper</h2>
            <p className="text-white/80 text-center mb-6">
              Your ultimate companion for TikTok success! Explore our tools to find niches, analyze trends, generate content ideas, and more.
            </p>
            <div className="flex justify-center">
              <GradientButton 
                onClick={() => setShowWelcomeModal(false)}
                gradient="teal-purple"
              >
                Get Started
              </GradientButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page as the default route */}
          <Route path="/" element={<Landing />} />
          
          {/* Dashboard and other app routes */}
          <Route path="/dashboard" element={<AppLayout><Index /></AppLayout>} />
          <Route path="/niche-finder" element={<AppLayout><NicheFinder /></AppLayout>} />
          <Route path="/trend-analyzer" element={<AppLayout><TrendAnalyzer /></AppLayout>} />
          <Route path="/content-generator" element={<AppLayout><ContentGenerator /></AppLayout>} />
          <Route path="/tiktok-shop" element={<AppLayout><TikTokShop /></AppLayout>} />
          <Route path="/crp-guide" element={<AppLayout><CRPGuide /></AppLayout>} />
          <Route path="/hashtag-generator" element={<AppLayout><HashtagGenerator /></AppLayout>} />
          <Route path="/title-bio-generator" element={<AppLayout><TitleBioGenerator /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
