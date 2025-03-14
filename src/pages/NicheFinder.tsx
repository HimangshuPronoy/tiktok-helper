
import React, { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import { Search, Sparkles, Bookmark, BookmarkCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NicheFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<null | Array<{
    niche: string;
    description: string;
    trendinessScore: number;
    tags: string[];
    saved: boolean;
  }>>(null);
  
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-niches', {
        body: { topic: searchTerm },
      });
      
      if (error) {
        console.error("Error calling generate-niches function:", error);
        toast({
          title: "Error",
          description: "Failed to generate niches. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      console.log("Generated niches:", data);
      setResults(data.results);
    } catch (error) {
      console.error("Error in niche search:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSave = async (index: number) => {
    if (!results) return;
    
    const niche = results[index];
    
    try {
      if (niche.saved) {
        // TODO: Implement delete from saved niches when implementing auth
        toast({
          title: "Coming Soon",
          description: "Removing saved niches will be available after authentication is implemented.",
        });
      } else {
        // Call the save-niche function
        const { data, error } = await supabase.functions.invoke('save-niche', {
          body: {
            niche: niche.niche,
            description: niche.description,
            trendinessScore: niche.trendinessScore,
            tags: niche.tags,
            // We'll add userId when auth is implemented
            userId: null
          }
        });
        
        if (error) {
          console.error("Error saving niche:", error);
          toast({
            title: "Error",
            description: "Failed to save niche. Please try again.",
            variant: "destructive",
          });
          return;
        }
        
        toast({
          title: "Niche Saved",
          description: `"${niche.niche}" has been saved.`,
        });
      }
      
      // Update the UI
      setResults(results.map((item, i) => 
        i === index ? { ...item, saved: !item.saved } : item
      ));
    } catch (error) {
      console.error("Error toggling save:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <GlassCard>
        <h1 className="text-3xl font-bold mb-6 text-gradient">Niche Finder</h1>
        <p className="text-white/70 mb-8 max-w-3xl">
          Discover trending and profitable TikTok niches based on your interests. Enter a general topic, and our AI will suggest specific niches with audience potential.
        </p>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter a general topic (e.g., travel, cooking, fitness)"
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
                <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Find Niches</span>
              </>
            )}
          </GradientButton>
        </form>
        
        {!results && !isLoading && (
          <div className="flex items-center justify-center py-12 text-white/40">
            <p>Enter a topic to discover trending niches</p>
          </div>
        )}
      </GlassCard>
      
      {isLoading && (
        <div className="py-20 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full purple-pink-gradient p-3 mb-4">
            <div className="animate-spin w-full h-full border-2 border-white/20 border-t-white rounded-full" />
          </div>
          <p className="text-white/60">Analyzing trending niches...</p>
        </div>
      )}
      
      {results && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {results.map((result, index) => (
            <GlassCard 
              key={index} 
              className={`relative overflow-hidden animate-slide-up animate-delay-${(index % 5) * 100}`}
            >
              <div className="absolute -right-8 -top-8 w-16 h-16 purple-pink-gradient opacity-40 rounded-full blur-xl" />
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{result.niche}</h3>
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/10">
                    <Sparkles size={10} className="mr-1 text-tiktok-teal" />
                    <span>Trendiness Score: {result.trendinessScore}/100</span>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSave(index)} 
                  className="p-2 rounded-full hover:bg-white/5 transition-colors"
                  aria-label={result.saved ? "Remove from saved" : "Save niche"}
                >
                  {result.saved ? (
                    <BookmarkCheck size={20} className="text-tiktok-teal" />
                  ) : (
                    <Bookmark size={20} className="text-white/60" />
                  )}
                </button>
              </div>
              
              <p className="text-white/70 mb-4">{result.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-1">
                {result.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="mt-4 flex justify-end">
                <GradientButton size="sm" gradient="teal-purple">
                  Generate Content Ideas
                </GradientButton>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default NicheFinder;
