
import React from "react";
import FeatureCard from "../ui/FeatureCard";
import { Search, TrendingUp, Lightbulb, ShoppingBag, Award, Hash, Sparkles } from "lucide-react";

const FeatureAccess = () => {
  const features = [
    {
      title: "Niche Finder",
      description: "Discover profitable and trending niches for your TikTok content strategy.",
      icon: Search,
      link: "/niche-finder",
      gradient: "purple-pink" as const,
    },
    {
      title: "Trend Analyzer",
      description: "Stay ahead of the curve with real-time trend analysis and insights.",
      icon: TrendingUp,
      link: "/trend-analyzer",
      gradient: "teal-purple" as const,
    },
    {
      title: "Content Generator",
      description: "Get AI-powered content ideas tailored to your niche and audience.",
      icon: Lightbulb,
      link: "/content-generator",
      gradient: "pink-teal" as const,
    },
    {
      title: "Hashtag Generator",
      description: "Create optimized hashtag sets to maximize your content's reach and discoverability.",
      icon: Hash,
      link: "/hashtag-generator",
      gradient: "teal-purple" as const,
    },
    {
      title: "Title/Bio Generator",
      description: "Create eye-catching TikTok titles and bios that drive engagement and growth.",
      icon: Sparkles,
      link: "/title-bio-generator",
      gradient: "purple-pink" as const,
    },
    {
      title: "TikTok Shop",
      description: "Optimize your TikTok Shop strategy with powerful tools and insights.",
      icon: ShoppingBag,
      link: "/tiktok-shop",
      gradient: "pink-teal" as const,
    },
    {
      title: "CRP Guide",
      description: "Master the Creator Rewards Program to maximize your earning potential.",
      icon: Award,
      link: "/crp-guide",
      gradient: "teal-purple" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          {...feature}
          className={`opacity-0 animate-slide-up animate-delay-${(index + 1) * 100}`}
        />
      ))}
    </div>
  );
};

export default FeatureAccess;
