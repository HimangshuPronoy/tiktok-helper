
import React from "react";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import FeatureAccess from "@/components/dashboard/FeatureAccess";
import TrendingSection from "@/components/dashboard/TrendingSection";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import { FileText, ExternalLink } from "lucide-react";

const Index = () => {
  // Resources with their URLs
  const resources = [
    {
      title: "Getting Started on TikTok",
      description: "Essential tips for new creators to establish a strong presence.",
      link: "https://www.tiktok.com/creator-portal/en-us/getting-started-on-tiktok/",
    },
    {
      title: "Optimizing Video SEO",
      description: "Learn how to make your videos discoverable on TikTok.",
      link: "https://www.tiktok.com/creator-portal/en-us/tiktok-content-strategy/",
    },
    {
      title: "TikTok Algorithm Guide",
      description: "Understanding how content gets promoted on the platform.",
      link: "https://www.tiktok.com/creator-portal/en-us/how-tiktok-works/",
    },
  ];

  return (
    <div className="flex flex-col gap-10 pb-20 pt-4">
      <WelcomeSection />
      
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gradient">Powerful Tools</h2>
        <FeatureAccess />
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gradient">Trending Now</h2>
        <TrendingSection />
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gradient">Tips & Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <GlassCard 
              key={resource.title} 
              className={`opacity-0 animate-slide-up animate-delay-${(index + 1) * 100} hover:bg-white/5`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full purple-pink-gradient flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                  <p className="text-white/70 mb-4">{resource.description}</p>
                  <a href={resource.link} target="_blank" rel="noopener noreferrer">
                    <GradientButton size="sm" variant="outline" className="flex items-center gap-2 text-xs">
                      <span>Read Guide</span>
                      <ExternalLink size={12} />
                    </GradientButton>
                  </a>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
      
      <section className="mt-4">
        <GlassCard className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4 text-gradient">Ready to Boost Your TikTok Success?</h2>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Explore all our tools and resources to take your TikTok presence to the next level.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="https://www.tiktok.com/creator-portal/en-us/" target="_blank" rel="noopener noreferrer">
              <GradientButton gradient="purple-pink" className="flex items-center gap-2">
                <span>TikTok Creator Portal</span>
                <ExternalLink size={16} />
              </GradientButton>
            </a>
            <a href="https://www.tiktok.com/business/en" target="_blank" rel="noopener noreferrer">
              <GradientButton gradient="teal-purple" variant="outline" className="flex items-center gap-2">
                <span>TikTok Business</span>
                <ExternalLink size={16} />
              </GradientButton>
            </a>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default Index;
