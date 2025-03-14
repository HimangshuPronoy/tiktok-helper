
import React from "react";
import GlassCard from "../ui/GlassCard";
import GradientButton from "../ui/GradientButton";
import { LogIn } from "lucide-react";

const WelcomeSection = () => {
  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-tiktok-purple/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-tiktok-teal/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full purple-pink-gradient">
          Your TikTok Success Partner
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
          Elevate Your TikTok Game
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-6 max-w-2xl">
          Discover niches, analyze trends, generate content ideas, and master TikTok Shop with our
          AI-powered tools designed for creator success.
        </p>
        <div className="flex flex-wrap gap-4">
          <GradientButton size="lg" gradient="teal-purple">
            <span>Explore Features</span>
          </GradientButton>
          <GradientButton size="lg" variant="outline" className="flex items-center gap-2">
            <LogIn size={20} />
            <span>Sign in with TikTok</span>
          </GradientButton>
        </div>
      </div>
    </GlassCard>
  );
};

export default WelcomeSection;
