
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/90">
      <GlassCard className="max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-tiktok-purple/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-tiktok-teal/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto mb-6 purple-pink-gradient rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold">404</span>
          </div>
          
          <h1 className="text-2xl font-bold mb-4 text-gradient">Page Not Found</h1>
          
          <p className="text-white/70 mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton 
              variant="outline" 
              size="md" 
              className="flex items-center justify-center gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </GradientButton>
            
            <Link to="/">
              <GradientButton 
                gradient="teal-purple" 
                size="md" 
                className="flex items-center justify-center gap-2 w-full"
              >
                <Home size={18} />
                <span>Back to Home</span>
              </GradientButton>
            </Link>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default NotFound;
