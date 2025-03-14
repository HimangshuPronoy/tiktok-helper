
import React from "react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import { ShoppingBag, CheckCircle, TrendingUp, ShoppingCart, PlusCircle, List, ExternalLink } from "lucide-react";

const TikTokShop = () => {
  const setupSteps = [
    "Link your TikTok business account to TikTok Shop",
    "Submit required business verification documents",
    "Set up payment processing",
    "Add products to your inventory",
    "Create shopping showcase videos",
    "Enable Live Shopping features"
  ];

  const salesTips = [
    {
      title: "Show Products in Action",
      description: "Create concise videos demonstrating the product benefits in real-life scenarios."
    },
    {
      title: "Time-Limited Offers",
      description: "Create urgency with limited-time discounts and special bundle deals."
    },
    {
      title: "Leverage LIVE Shopping",
      description: "Host live shopping sessions with Q&A, product demos, and exclusive offers."
    },
    {
      title: "Cross-Promote Products",
      description: "Feature complementary products together to increase average order value."
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-full purple-pink-gradient">
            <ShoppingBag size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gradient">TikTok Shop Assistant</h1>
            <p className="text-white/60">Optimize your TikTok Shop strategy and boost your sales</p>
          </div>
        </div>
        
        <p className="text-white/70 mb-8 max-w-3xl">
          TikTok Shop enables creators to sell products directly through their content and livestreams. Set up your shop, implement effective sales strategies, and drive revenue alongside your content creation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a 
            href="https://seller.tiktok.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <GradientButton 
              variant="outline" 
              size="lg" 
              className="flex items-center justify-center gap-2 w-full"
            >
              <ShoppingCart size={20} />
              <span>Launch Official TikTok Shop</span>
              <ExternalLink size={16} />
            </GradientButton>
          </a>
          
          <a 
            href="https://shop.tiktok.com/business/en/how-to-get-started" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <GradientButton 
              size="lg" 
              gradient="teal-purple" 
              className="flex items-center justify-center gap-2 w-full"
            >
              <PlusCircle size={20} />
              <span>Get Personalized Shop Strategy</span>
            </GradientButton>
          </a>
        </div>
      </GlassCard>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="animate-slide-up">
          <div className="flex items-center gap-2 mb-6">
            <List size={20} className="text-tiktok-teal" />
            <h2 className="text-xl font-semibold">Shop Setup Checklist</h2>
          </div>
          
          <div className="space-y-4 mb-6">
            {setupSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
                <div className="w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center border border-white/20 mt-0.5">
                  <span className="text-xs font-medium">{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium">{step}</p>
                </div>
              </div>
            ))}
          </div>
          
          <a 
            href="https://seller-us.tiktok.com/edu/article/1760425190914050" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <GradientButton 
              variant="outline" 
              size="sm" 
              fullWidth 
              className="flex items-center justify-center gap-2"
            >
              <span>View Detailed Setup Guide</span>
              <ExternalLink size={14} />
            </GradientButton>
          </a>
        </GlassCard>
        
        <GlassCard className="animate-slide-up animate-delay-100">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={20} className="text-tiktok-purple" />
            <h2 className="text-xl font-semibold">Sales Optimization Tips</h2>
          </div>
          
          <div className="space-y-6 mb-6">
            {salesTips.map((tip, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-3 top-0 w-1.5 h-full purple-pink-gradient rounded-full" />
                
                <div className="ml-4">
                  <h3 className="text-lg font-medium mb-1">{tip.title}</h3>
                  <p className="text-white/70">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <a 
            href="https://seller-us.tiktok.com/edu/article/7076383946779369477" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <GradientButton 
              gradient="teal-purple" 
              size="sm" 
              fullWidth 
              className="flex items-center justify-center gap-2"
            >
              <span>Get Custom Shop Strategy</span>
            </GradientButton>
          </a>
        </GlassCard>
      </div>
      
      <GlassCard className="animate-slide-up animate-delay-200">
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle size={20} className="text-tiktok-pink" />
          <h2 className="text-xl font-semibold">Shop Success Metrics</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { title: "Video-to-Sale Conversion", target: "3-5%", description: "Percentage of viewers who make a purchase" },
            { title: "Product Showcase Duration", target: "7-15 seconds", description: "Optimal time to feature product in video" },
            { title: "Livestream Sales Boost", target: "40-60%", description: "Increase in sales during livestreams vs. regular content" },
          ].map((metric, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-5">
              <h3 className="text-lg font-medium mb-2">{metric.title}</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="px-2 py-1 rounded-full text-xs font-medium purple-pink-gradient">
                  Target: {metric.target}
                </div>
              </div>
              <p className="text-white/60 text-sm">{metric.description}</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <a 
            href="https://seller-us.tiktok.com/edu/article/7042406016257048589" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <GradientButton 
              variant="outline" 
              size="sm" 
              className="flex items-center justify-center gap-2"
            >
              <span>View All Metrics & Benchmarks</span>
            </GradientButton>
          </a>
        </div>
      </GlassCard>
    </div>
  );
};

export default TikTokShop;
