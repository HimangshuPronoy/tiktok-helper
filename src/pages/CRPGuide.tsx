
import { Award, CheckSquare, DollarSign, Info, TrendingUp, Users, ChevronRight, ExternalLink } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CRPGuide = () => {
  const requirements = [
    { title: "Minimum Age", description: "Be at least 18 years old", icon: Users },
    { title: "Follower Count", description: "Have at least 10,000 authentic followers", icon: Users },
    { title: "Video Views", description: "Accumulate at least 100,000 video views in the last 30 days", icon: TrendingUp },
    { title: "Content Guidelines", description: "Create original content that follows TikTok's Community Guidelines", icon: CheckSquare },
    { title: "Account Standing", description: "Maintain an account in good standing without recent violations", icon: CheckSquare }
  ];

  const strategies = [
    "Post consistently with 1-4 videos per day to maximize visibility",
    "Create content in trending categories like entertainment, lifestyle, and education",
    "Experiment with different video lengths to find your sweet spot",
    "Engage with followers by responding to comments and messages",
    "Collaborate with other creators to expand your reach",
    "Use trending sounds and hashtags relevant to your niche",
    "Analyze your performance metrics to identify what works best"
  ];

  const estimatedEarnings = [
    { followers: "10K-50K", views: "100K-500K", earnings: "$500-$1,000" },
    { followers: "50K-100K", views: "500K-1M", earnings: "$1,000-$2,500" },
    { followers: "100K-500K", views: "1M-5M", earnings: "$2,500-$5,000" },
    { followers: "500K-1M", views: "5M-10M", earnings: "$5,000-$10,000" },
    { followers: "1M+", views: "10M+", earnings: "$10,000+" }
  ];

  return (
    <div className="flex flex-col gap-8">
      <GlassCard glowEffect>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full teal-purple-gradient flex items-center justify-center">
            <Award size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gradient">Creator Rewards Program</h1>
            <p className="text-white/60">Monetize your TikTok presence and maximize your earnings</p>
          </div>
        </div>
        
        <p className="text-white/70 mb-8 max-w-3xl">
          The Creator Rewards Program (CRP) allows eligible TikTok creators to earn money based on their video performance. 
          Learn how to qualify, optimize your content, and maximize your earning potential.
        </p>
        
        <Alert variant="default" className="bg-white/5 border-white/10 mb-6">
          <Info className="h-4 w-4 text-tiktok-teal" />
          <AlertTitle>Program Updates</AlertTitle>
          <AlertDescription>
            TikTok regularly updates the CRP eligibility requirements and payout rates. Always check the official 
            Creator Portal for the most current information.
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-wrap gap-4">
          <a 
            href="https://www.tiktok.com/creators/creator-portal/en-us/getting-paid-to-create/creator-rewards/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <GradientButton 
              gradient="teal-purple" 
              size="lg" 
              className="flex items-center gap-2"
            >
              <span>Apply for CRP</span>
              <ExternalLink size={18} />
            </GradientButton>
          </a>
          
          <a 
            href="https://www.tiktok.com/creators/creator-portal/en-us/getting-paid-to-create/creator-fund/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <GradientButton 
              variant="outline" 
              size="lg" 
              className="flex items-center gap-2"
            >
              <span>View Official Guidelines</span>
              <ExternalLink size={18} />
            </GradientButton>
          </a>
        </div>
      </GlassCard>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="animate-slide-up">
          <div className="flex items-center gap-2 mb-6">
            <CheckSquare size={20} className="text-tiktok-teal" />
            <h2 className="text-xl font-semibold">Eligibility Requirements</h2>
          </div>
          
          <div className="space-y-4">
            {requirements.map((req, index) => (
              <div 
                key={index} 
                className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-start gap-3 transition-all hover:bg-white/10"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10">
                  <req.icon size={20} className="text-tiktok-teal" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{req.title}</h3>
                  <p className="text-white/70 text-sm">{req.description}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        
        <GlassCard className="animate-slide-up animate-delay-100">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={20} className="text-tiktok-purple" />
            <h2 className="text-xl font-semibold">Growth Strategies</h2>
          </div>
          
          <div className="space-y-3">
            {strategies.map((strategy, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-3 border-b border-white/5 last:border-0"
              >
                <ChevronRight size={16} className="text-tiktok-pink flex-shrink-0" />
                <p className="text-white/80">{strategy}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      
      <GlassCard className="animate-slide-up animate-delay-200">
        <div className="flex items-center gap-2 mb-6">
          <DollarSign size={20} className="text-tiktok-pink" />
          <h2 className="text-xl font-semibold">Estimated Monthly Earnings</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 font-medium text-white/70">Followers</th>
                <th className="py-3 px-4 font-medium text-white/70">Monthly Views</th>
                <th className="py-3 px-4 font-medium text-white/70">Potential Earnings</th>
              </tr>
            </thead>
            <tbody>
              {estimatedEarnings.map((tier, index) => (
                <tr key={index} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">{tier.followers}</td>
                  <td className="py-3 px-4 text-white">{tier.views}</td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-gradient">{tier.earnings}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 text-sm text-white/50 italic">
          <p>Note: Earnings vary based on content quality, engagement rates, viewer demographics, and many other factors. 
             These figures are estimates and not guaranteed.</p>
        </div>
      </GlassCard>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <GlassCard className="animate-slide-up animate-delay-300">
          <h3 className="text-xl font-semibold mb-4">Common Questions</h3>
          <div className="space-y-4">
            {[
              { q: "How do I join the Creator Rewards Program?", 
                a: "Apply through the Creator Portal once you meet eligibility requirements." },
              { q: "When do I get paid?", 
                a: "Payments are typically processed monthly, 30 days after the end of the earning period." },
              { q: "What affects my earnings?", 
                a: "Video views, watch time, engagement rates, and viewer demographics all impact earnings." },
            ].map((item, index) => (
              <div key={index} className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium mb-2">{item.q}</h4>
                <p className="text-white/70 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        
        <GlassCard className="animate-slide-up animate-delay-400">
          <h3 className="text-xl font-semibold mb-4">Additional Resources</h3>
          <div className="space-y-3">
            {[
              { title: "TikTok Creator Portal", desc: "Official resources and guidelines", url: "https://www.tiktok.com/creators/creator-portal/" },
              { title: "CRP Payment Guide", desc: "Understand payment schedules and methods", url: "https://www.tiktok.com/creators/creator-portal/en-us/getting-paid-to-create/" },
              { title: "Content Policy", desc: "Learn what type of content qualifies for CRP", url: "https://www.tiktok.com/community-guidelines/en/" },
              { title: "Analytics Guide", desc: "How to interpret your performance metrics", url: "https://www.tiktok.com/creators/creator-portal/en-us/content-and-accounts/analytics/" },
            ].map((resource, index) => (
              <a 
                key={index}
                href={resource.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
              >
                <div>
                  <h4 className="font-medium">{resource.title}</h4>
                  <p className="text-sm text-white/60">{resource.desc}</p>
                </div>
                <ChevronRight size={20} className="text-white/50" />
              </a>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default CRPGuide;
