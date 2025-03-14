
import React, { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import { Search, TrendingUp, BarChart3, Hash, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TrendData {
  date: string;
  value: number;
}

interface TrendResults {
  overview: string;
  relatedHashtags: string[];
  suggestedStyles: string[];
  momentum: "rising" | "stable" | "declining";
  data: TrendData[];
}

const TrendAnalyzer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trendResults, setTrendResults] = useState<TrendResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm) {
      toast({
        title: "Search term is required",
        description: "Please enter a keyword or hashtag to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-trend', {
        body: { searchTerm },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setTrendResults(data.trendResults || null);
    } catch (err: any) {
      console.error("Error analyzing trend:", err);
      setError(err.message || "Failed to analyze trend. Please try again.");
      toast({
        title: "Error",
        description: err.message || "Failed to analyze trend. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <GlassCard>
        <h1 className="text-3xl font-bold mb-6 text-gradient">Trend Analyzer</h1>
        <p className="text-white/70 mb-8 max-w-3xl">
          Analyze current TikTok trends to inform your content strategy. Enter a keyword or hashtag to discover what's popular, related tags, and suggested content styles.
        </p>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter a keyword or hashtag (e.g., #foodie, dance)"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-tiktok-purple/50 placeholder:text-white/40"
            />
            <Search className="absolute right-3 top-3 text-white/40" size={20} />
          </div>
          <GradientButton 
            type="submit" 
            disabled={isLoading} 
            className="flex items-center gap-2 min-w-[120px]"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <TrendingUp size={18} />
                <span>Analyze Trend</span>
              </>
            )}
          </GradientButton>
        </form>
      </GlassCard>
      
      {isLoading && (
        <div className="py-20 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full purple-pink-gradient p-3 mb-4">
            <div className="animate-spin w-full h-full border-2 border-white/20 border-t-white rounded-full" />
          </div>
          <p className="text-white/60">Analyzing current trends...</p>
        </div>
      )}
      
      {error && !isLoading && (
        <GlassCard className="bg-red-950/20 border-red-500/20">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-white/80">{error}</p>
        </GlassCard>
      )}
      
      {trendResults && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          <GlassCard className="lg:col-span-2 animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className="text-tiktok-purple" />
              <h2 className="text-xl font-semibold">Trend Overview</h2>
            </div>
            
            <p className="text-white/80 mb-6">{trendResults.overview}</p>
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-tiktok-teal" />
                <h3 className="font-medium">Trend Momentum</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  trendResults.momentum === "rising" 
                    ? "bg-green-500/20 text-green-400" 
                    : trendResults.momentum === "stable"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-red-500/20 text-red-400"
                }`}>
                  {trendResults.momentum === "rising" 
                    ? "Rising Trend ↑" 
                    : trendResults.momentum === "stable"
                    ? "Stable Trend →"
                    : "Declining Trend ↓"
                  }
                </div>
                <span className="text-white/60 text-sm">
                  {trendResults.momentum === "rising" 
                    ? "Great time to create content!" 
                    : trendResults.momentum === "stable"
                    ? "Consistent interest over time"
                    : "Consider a different trend"
                  }
                </span>
              </div>
            </div>
            
            <div className="h-48 md:h-64 mb-2">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <BarChart3 size={18} className="text-tiktok-pink" />
                  <h3 className="font-medium">Interest Over Time</h3>
                </div>
              </div>
              
              <div className="h-full w-full flex items-end justify-between gap-1">
                {trendResults.data.map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full purple-pink-gradient rounded-t-sm transition-all duration-500"
                      style={{ 
                        height: `${item.value}%`,
                        animationDelay: `${index * 100}ms`,
                        opacity: 0,
                        animation: 'slide-up 0.5s ease-out forwards'
                      }}
                    />
                    <div className="mt-2 text-xs text-white/60">{item.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
          
          <div className="flex flex-col gap-6">
            <GlassCard className="animate-slide-up animate-delay-100">
              <div className="flex items-center gap-2 mb-4">
                <Hash size={18} className="text-tiktok-teal" />
                <h2 className="text-lg font-semibold">Related Hashtags</h2>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {trendResults.relatedHashtags.map((tag) => (
                  <div 
                    key={tag}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </GlassCard>
            
            <GlassCard className="animate-slide-up animate-delay-200">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-tiktok-pink" />
                <h2 className="text-lg font-semibold">Suggested Content Styles</h2>
              </div>
              
              <ul className="space-y-3">
                {trendResults.suggestedStyles.map((style, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-6 h-6 flex-shrink-0 rounded-full purple-pink-gradient flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-white/80">{style}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6">
                <GradientButton 
                  size="sm" 
                  fullWidth 
                  gradient="teal-purple"
                  onClick={() => {
                    toast({
                      title: "Coming Soon",
                      description: "This feature will be available in a future update!",
                    });
                  }}
                >
                  Generate Content Ideas
                </GradientButton>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendAnalyzer;
