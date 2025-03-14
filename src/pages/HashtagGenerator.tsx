
import React, { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Bookmark, BookmarkCheck, TrendingUp, Hash, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const HashtagGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [savedHashtags, setSavedHashtags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!keyword) {
      toast({
        title: "Keyword is required",
        description: "Please enter a keyword to generate hashtags.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-hashtags', {
        body: { keyword },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setHashtags(data.hashtags || []);
    } catch (err: any) {
      console.error("Error generating hashtags:", err);
      setError(err.message || "Failed to generate hashtags. Please try again.");
      toast({
        title: "Error",
        description: err.message || "Failed to generate hashtags. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveHashtag = async (hashtag: string) => {
    if (savedHashtags.includes(hashtag)) {
      // Remove hashtag if already saved
      setSavedHashtags(savedHashtags.filter((savedTag) => savedTag !== hashtag));
      toast({
        title: "Hashtag removed",
        description: `Hashtag "${hashtag}" removed from saved.`,
      });
    } else {
      // Save hashtag if not already saved
      try {
        // Generate a temporary user ID for demo purposes
        // In a real app, this would be the authenticated user's ID
        const tempUserId = "demo-user-123";
        
        const { data, error } = await supabase.functions.invoke('save-hashtag', {
          body: { hashtag, userId: tempUserId },
        });

        if (error) {
          throw new Error(error.message);
        }

        setSavedHashtags([...savedHashtags, hashtag]);
        toast({
          title: "Hashtag saved",
          description: `Hashtag "${hashtag}" saved successfully!`,
        });
      } catch (err: any) {
        console.error("Error saving hashtag:", err);
        toast({
          title: "Error",
          description: err.message || "Failed to save hashtag. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Hashtags copied successfully!",
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <GlassCard>
        <h1 className="text-3xl font-bold mb-6 text-gradient">TikTok Hashtag Generator</h1>
        <p className="text-white/70 mb-8 max-w-3xl">
          Supercharge your TikTok content with our AI-powered hashtag generator. Enter a keyword or topic to generate relevant and trending hashtags that will boost your content's visibility.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Enter a keyword (e.g., travel, cooking, fitness)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-tiktok-purple/50 placeholder:text-white/40"
            />
          </div>
          <GradientButton onClick={handleGenerate} disabled={isLoading} className="flex items-center gap-2 min-w-[140px]">
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Hash size={18} />
                <span>Generate</span>
              </>
            )}
          </GradientButton>
        </div>
      </GlassCard>

      {isLoading && (
        <div className="py-20 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full purple-pink-gradient p-3 mb-4">
            <div className="animate-spin w-full h-full border-2 border-white/20 border-t-white rounded-full" />
          </div>
          <p className="text-white/60">Generating relevant hashtags...</p>
        </div>
      )}

      {error && !isLoading && (
        <GlassCard className="bg-red-950/20 border-red-500/20">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-white/80">{error}</p>
        </GlassCard>
      )}

      {hashtags.length > 0 && !isLoading && (
        <GlassCard className="relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-32 h-32 teal-purple-gradient opacity-20 rounded-full blur-xl" />
          <div className="absolute -left-16 -bottom-16 w-32 h-32 purple-pink-gradient opacity-20 rounded-full blur-xl" />

          <div className="flex justify-between items-center mb-4 relative z-10">
            <h2 className="text-xl font-bold">Generated Hashtags</h2>
            <button
              onClick={() => handleCopyToClipboard(hashtags.join(" "))}
              className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/60 hover:text-white"
              aria-label="Copy all hashtags"
            >
              <Copy size={20} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 relative z-10">
            {hashtags.map((hashtag) => (
              <div key={hashtag} className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <span className="text-sm">{hashtag}</span>
                <button
                  onClick={() => handleSaveHashtag(hashtag)}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                  aria-label={savedHashtags.includes(hashtag) ? "Remove from saved" : "Save hashtag"}
                >
                  {savedHashtags.includes(hashtag) ? (
                    <BookmarkCheck size={16} className="text-tiktok-teal" />
                  ) : (
                    <Bookmark size={16} className="text-white/60" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {savedHashtags.length > 0 && (
        <GlassCard className="relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-32 h-32 pink-teal-gradient opacity-20 rounded-full blur-xl" />
          <div className="absolute -left-16 -bottom-16 w-32 h-32 purple-pink-gradient opacity-20 rounded-full blur-xl" />

          <div className="flex justify-between items-center mb-4 relative z-10">
            <h2 className="text-xl font-bold">Saved Hashtags</h2>
            <button
              onClick={() => handleCopyToClipboard(savedHashtags.join(" "))}
              className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/60 hover:text-white"
              aria-label="Copy all saved hashtags"
            >
              <Copy size={20} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 relative z-10">
            {savedHashtags.map((hashtag) => (
              <div key={hashtag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                {hashtag}
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default HashtagGenerator;
