
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
import Auth from "./pages/Auth";
import TermsOfService from "./pages/TermsOfService";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import FeedbackForm from "./components/feedback/FeedbackForm";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import GradientButton from "@/components/ui/GradientButton";
import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const { user } = useAuth();
  
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
      
      {user && <FeedbackForm />}
      
      <Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
        <DialogContent className="bg-black/80 backdrop-blur-xl border-white/10 text-white max-w-md">
          <DialogTitle className="text-2xl font-bold text-center text-gradient">Welcome to TikTokHelper</DialogTitle>
          <DialogDescription className="text-white/80 text-center">
            Your ultimate companion for TikTok success! Explore our tools to find niches, analyze trends, generate content ideas, and more.
          </DialogDescription>
          <div className="p-4">
            <div className="w-12 h-12 rounded-full purple-pink-gradient flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">TH</span>
            </div>
            <div className="flex justify-center mt-6">
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

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    {/* Landing page as the default route */}
    <Route path="/" element={<Landing />} />
    
    {/* Auth route */}
    <Route path="/auth" element={<Auth />} />
    
    {/* Terms of Service */}
    <Route path="/terms" element={<TermsOfService />} />
    
    {/* Protected routes */}
    <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Index /></AppLayout></ProtectedRoute>} />
    <Route path="/niche-finder" element={<ProtectedRoute><AppLayout><NicheFinder /></AppLayout></ProtectedRoute>} />
    <Route path="/trend-analyzer" element={<ProtectedRoute><AppLayout><TrendAnalyzer /></AppLayout></ProtectedRoute>} />
    <Route path="/content-generator" element={<ProtectedRoute><AppLayout><ContentGenerator /></AppLayout></ProtectedRoute>} />
    <Route path="/tiktok-shop" element={<ProtectedRoute><AppLayout><TikTokShop /></AppLayout></ProtectedRoute>} />
    <Route path="/crp-guide" element={<ProtectedRoute><AppLayout><CRPGuide /></AppLayout></ProtectedRoute>} />
    <Route path="/hashtag-generator" element={<ProtectedRoute><AppLayout><HashtagGenerator /></AppLayout></ProtectedRoute>} />
    <Route path="/title-bio-generator" element={<ProtectedRoute><AppLayout><TitleBioGenerator /></AppLayout></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
