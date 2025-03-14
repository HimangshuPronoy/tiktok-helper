
import React from "react";
import GlassCard from "../ui/GlassCard";
import GradientButton from "../ui/GradientButton";
import { TrendingUp, ExternalLink } from "lucide-react";

const TrendingSection = () => {
  const trendingHashtags = [
    { tag: "#lifeprotips", count: "1.3B" },
    { tag: "#cleantok", count: "756M" },
    { tag: "#quickrecipes", count: "420M" },
    { tag: "#dancetrends", count: "2.7B" },
    { tag: "#techreview", count: "892M" },
  ];

  const spotlightTrend = {
    title: "Desk Transformation Videos",
    description:
      "Before-and-after desk setups are trending with creators showing productivity hacks and aesthetic improvements.",
    hashtags: ["#desksetup", "#productivityhack", "#workspace"],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <GlassCard className="lg:col-span-2 relative overflow-hidden animate-fade-in">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-tiktok-purple/30 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 mr-2 text-tiktok-teal" />
            <h2 className="text-xl font-semibold">Spotlight Trend</h2>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">{spotlightTrend.title}</h3>
          <p className="text-white/70 mb-4">{spotlightTrend.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {spotlightTrend.hashtags.map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <GradientButton gradient="teal-purple" className="flex items-center gap-2">
            <span>Try This Trend</span>
            <ExternalLink size={16} />
          </GradientButton>
        </div>
      </GlassCard>
      
      <GlassCard className="animate-fade-in">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 mr-2 text-tiktok-pink" />
          <h2 className="text-xl font-semibold">Trending Hashtags</h2>
        </div>
        
        <div className="space-y-3">
          {trendingHashtags.map((item, index) => (
            <div 
              key={item.tag}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="text-white/90 font-medium">{item.tag}</span>
              <span className="text-sm text-white/60">{item.count} views</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default TrendingSection;
