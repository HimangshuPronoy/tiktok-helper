
import React, { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Copy, Check, Bookmark, BookmarkCheck, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ContentIdea {
  title: string;
  outline: string;
  hashtags: string[];
  saved: boolean;
  copied: boolean;
}

const ContentGenerator = () => {
  const [niche, setNiche] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ideas, setIdeas] = useState<ContentIdea[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!niche) {
      toast({
        title: "Niche is required",
        description: "Please enter a niche or topic to generate content ideas.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-content-ideas', {
        body: { niche },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setIdeas(data.ideas || []);
    } catch (err: any) {
      console.error("Error generating content ideas:", err);
      setError(err.message || "Failed to generate content ideas. Please try again.");
      toast({
        title: "Error",
        description: err.message || "Failed to generate content ideas. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSave = async (index: number) => {
    if (!ideas) return;
    
    const idea = ideas[index];
    const newSavedState = !idea.saved;
    
    try {
      if (newSavedState) {
        // Save the idea to the database
        // Generate a temporary user ID for demo purposes
        // In a real app, this would be the authenticated user's ID
        const tempUserId = "demo-user-123";
        
        const { data, error } = await supabase.functions.invoke('save-content-idea', {
          body: { 
            title: idea.title, 
            outline: idea.outline, 
            hashtags: idea.hashtags,
            userId: tempUserId 
          },
        });

        if (error) {
          throw new Error(error.message);
        }
        
        toast({
          title: "Content idea saved",
          description: "Content idea saved successfully!",
        });
      } else {
        // In a real app, you would delete from the database here
        toast({
          title: "Content idea removed",
          description: "Content idea removed from saved.",
        });
      }
      
      // Update the UI
      setIdeas(ideas.map((item, i) => 
        i === index ? { ...item, saved: newSavedState } : item
      ));
    } catch (err: any) {
      console.error("Error saving content idea:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to save content idea. Please try again.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (index: number) => {
    if (!ideas) return;
    
    const idea = ideas[index];
    const textToCopy = `${idea.title}\n\n${idea.outline}\n\nHashtags: ${idea.hashtags.join(' ')}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIdeas(ideas.map((item, i) => 
        i === index ? { ...item, copied: true } : item
      ));
      
      toast({
        title: "Copied to clipboard",
        description: "Content idea copied successfully!",
      });
      
      setTimeout(() => {
        setIdeas(ideas.map((item, i) => 
          i === index ? { ...item, copied: false } : item
        ));
      }, 2000);
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <GlassCard>
        <h1 className="text-3xl font-bold mb-6 text-gradient">Content Idea Generator</h1>
        <p className="text-white/70 mb-8 max-w-3xl">
          Transform your TikTok strategy with AI-powered content ideas tailored to your niche. Enter a topic or trend to generate engaging video concepts complete with scripts and hashtags.
        </p>
        
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Enter a niche or trend (e.g., quick recipes, home workouts)"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-tiktok-purple/50 placeholder:text-white/40"
            />
          </div>
          <GradientButton 
            type="submit" 
            disabled={isLoading} 
            className="flex items-center gap-2 min-w-[140px]"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Lightbulb size={18} />
                <span>Generate Ideas</span>
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
          <p className="text-white/60">Crafting creative content ideas...</p>
        </div>
      )}
      
      {error && !isLoading && (
        <GlassCard className="bg-red-950/20 border-red-500/20">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-white/80">{error}</p>
        </GlassCard>
      )}
      
      {ideas && ideas.length > 0 && !isLoading && (
        <div className="grid grid-cols-1 gap-6 animate-fade-in">
          {ideas.map((idea, index) => (
            <GlassCard 
              key={index} 
              className={`relative overflow-hidden animate-slide-up animate-delay-${(index % 4) * 100}`}
            >
              <div className="absolute -right-16 -top-16 w-32 h-32 teal-purple-gradient opacity-20 rounded-full blur-xl" />
              <div className="absolute -left-16 -bottom-16 w-32 h-32 purple-pink-gradient opacity-20 rounded-full blur-xl" />
              
              <div className="flex justify-between items-start mb-2 relative z-10">
                <h3 className="text-xl font-bold">{idea.title}</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => copyToClipboard(index)} 
                    className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/60 hover:text-white"
                    aria-label="Copy idea"
                  >
                    {idea.copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                  </button>
                  <button 
                    onClick={() => toggleSave(index)} 
                    className="p-2 rounded-full hover:bg-white/5 transition-colors"
                    aria-label={idea.saved ? "Remove from saved" : "Save idea"}
                  >
                    {idea.saved ? (
                      <BookmarkCheck size={20} className="text-tiktok-teal" />
                    ) : (
                      <Bookmark size={20} className="text-white/60" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="mb-6 relative z-10">
                <h4 className="text-sm font-medium text-white/70 mb-2">Script Outline:</h4>
                <pre className="whitespace-pre-wrap bg-white/5 p-4 rounded-lg text-white/80 font-mono text-sm">
                  {idea.outline}
                </pre>
              </div>
              
              <div className="relative z-10">
                <h4 className="text-sm font-medium text-white/70 mb-2">Recommended Hashtags:</h4>
                <div className="flex flex-wrap gap-2">
                  {idea.hashtags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end relative z-10">
                <GradientButton 
                  size="sm" 
                  gradient="teal-purple" 
                  className="flex items-center gap-2"
                  onClick={() => window.open("https://www.tiktok.com/upload", "_blank")}
                >
                  <span>Create with TikTok</span>
                  <ExternalLink size={14} />
                </GradientButton>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
