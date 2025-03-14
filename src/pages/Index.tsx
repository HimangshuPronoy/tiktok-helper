
import React from "react";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import FeatureAccess from "@/components/dashboard/FeatureAccess";
import TrendingSection from "@/components/dashboard/TrendingSection";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import { FileText, ExternalLink } from "lucide-react";

const Index = () => {
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
          {[
            {
              title: "Getting Started on TikTok",
              description: "Essential tips for new creators to establish a strong presence.",
              link: "#"
            },
            {
              title: "Optimizing Video SEO",
              description: "Learn how to make your videos discoverable on TikTok.",
              link: "#"
            },
            {
              title: "TikTok Algorithm Guide",
              description: "Understanding how content gets promoted on the platform.",
              link: "#"
            },
          ].map((resource, index) => (
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
                  <GradientButton size="sm" variant="outline" className="flex items-center gap-2 text-xs">
                    <span>Read Guide</span>
                    <ExternalLink size={12} />
                  </GradientButton>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
