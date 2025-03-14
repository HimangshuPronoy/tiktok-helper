
import React, { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Zap, Copy, Check, Bookmark, BookmarkCheck, Rocket } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  contentType: z.string().min(1, "Please select a content type"),
  niche: z.string().min(1, "Please enter your content niche"),
  keywords: z.string().optional(),
  tone: z.string().min(1, "Please select a tone"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const TitleBioGenerator = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{
    titles: { text: string; saved: boolean; copied: boolean }[];
    bios: { text: string; saved: boolean; copied: boolean }[];
  } | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentType: "title",
      niche: "",
      keywords: "",
      tone: "engaging",
      description: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsGenerating(true);
    
    try {
      // Simulate API call to Gemini
      setTimeout(() => {
        const result = generateMockContent(data);
        setGeneratedContent(result);
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  const generateMockContent = (data: FormValues) => {
    // Mock data to simulate Gemini API response
    const isTitleType = data.contentType === "title" || data.contentType === "both";
    const isBioType = data.contentType === "bio" || data.contentType === "both";

    let titles: { text: string; saved: boolean; copied: boolean }[] = [];
    if (isTitleType) {
      const titleSamples = [
        `How I ${data.niche === "fitness" ? "Lost 10lbs" : "Grew My Following"} in Just 1 Week! 🔥`,
        `${data.tone === "humorous" ? "I Can't Believe This Actually Worked 😂" : "This Changed Everything For Me"}`,
        `${data.niche} Hack That Nobody Is Talking About`,
        `POV: When Your ${data.niche} Game Is Too Strong`,
        `${data.tone === "professional" ? "Professional Guide:" : ""} ${data.keywords ? data.keywords : "Secret"} Tips For ${data.niche} Success`,
        `This ${data.niche} Trick Went Viral Overnight!`,
      ];
      titles = titleSamples.map(title => ({ text: title, saved: false, copied: false }));
    }

    let bios: { text: string; saved: boolean; copied: boolean }[] = [];
    if (isBioType) {
      const bioSamples = [
        `${data.tone === "professional" ? "Expert" : "Creator"} sharing daily ${data.niche} content | ${data.keywords ? data.keywords : "Tips & Tricks"} | Join me for new ${data.niche} insights every day!`,
        `${data.tone === "humorous" ? "Just a ${data.niche} enthusiast who doesn't take life too seriously 😂" : `Passionate about all things ${data.niche}`} | New content drops MWF | DM for collabs`,
        `Transforming the way you think about ${data.niche} | ${data.keywords ? data.keywords + " |" : ""} Follow for daily inspiration and ${data.niche} hacks`,
        `${data.tone === "engaging" ? "Let's talk about" : "Exploring"} ${data.niche} together | ${data.keywords || "Trending tips"} | Join our community of ${Number(10000 + Math.random() * 90000).toLocaleString()} ${data.niche} lovers`,
        `Your go-to source for ${data.tone === "professional" ? "professional" : "amazing"} ${data.niche} content | ${data.keywords ? data.keywords + " |" : ""} New uploads every day at 6PM EST`,
      ];
      bios = bioSamples.map(bio => ({ text: bio, saved: false, copied: false }));
    }

    return { titles, bios };
  };

  const toggleSave = (type: "title" | "bio", index: number) => {
    if (!generatedContent) return;
    
    if (type === "title") {
      const updatedTitles = [...generatedContent.titles];
      updatedTitles[index].saved = !updatedTitles[index].saved;
      setGeneratedContent({ ...generatedContent, titles: updatedTitles });
    } else {
      const updatedBios = [...generatedContent.bios];
      updatedBios[index].saved = !updatedBios[index].saved;
      setGeneratedContent({ ...generatedContent, bios: updatedBios });
    }
  };

  const copyToClipboard = (type: "title" | "bio", index: number) => {
    if (!generatedContent) return;
    
    const content = type === "title" 
      ? generatedContent.titles[index].text 
      : generatedContent.bios[index].text;
    
    navigator.clipboard.writeText(content).then(() => {
      toast({
        title: "Copied to clipboard",
        description: `The ${type} has been copied to your clipboard.`,
      });
      
      if (type === "title") {
        const updatedTitles = [...generatedContent.titles];
        updatedTitles[index].copied = true;
        setGeneratedContent({ ...generatedContent, titles: updatedTitles });
        
        setTimeout(() => {
          updatedTitles[index].copied = false;
          setGeneratedContent({ ...generatedContent, titles: updatedTitles });
        }, 2000);
      } else {
        const updatedBios = [...generatedContent.bios];
        updatedBios[index].copied = true;
        setGeneratedContent({ ...generatedContent, bios: updatedBios });
        
        setTimeout(() => {
          updatedBios[index].copied = false;
          setGeneratedContent({ ...generatedContent, bios: updatedBios });
        }, 2000);
      }
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full purple-pink-gradient flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gradient">TikTok Title & Bio Generator</h1>
            <p className="text-white/70">Create attention-grabbing titles and bios that drive engagement</p>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">What do you want to generate?</FormLabel>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {["title", "bio", "both"].map((type) => (
                        <div 
                          key={type}
                          onClick={() => field.onChange(type)}
                          className={`flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                            field.value === type
                              ? "bg-white/10 border-tiktok-teal text-white"
                              : "bg-transparent border-white/10 text-white/60 hover:bg-white/5"
                          }`}
                        >
                          <span className="capitalize">{type}</span>
                        </div>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Content tone</FormLabel>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {["engaging", "professional", "humorous"].map((tone) => (
                        <div 
                          key={tone}
                          onClick={() => field.onChange(tone)}
                          className={`flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                            field.value === tone
                              ? "bg-white/10 border-tiktok-teal text-white"
                              : "bg-transparent border-white/10 text-white/60 hover:bg-white/5"
                          }`}
                        >
                          <span className="capitalize">{tone}</span>
                        </div>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="niche"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Content niche</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="e.g., fitness, cooking, fashion, tech reviews" 
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </FormControl>
                    <FormDescription className="text-white/60">
                      The main topic or category of your content
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Keywords (optional)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="e.g., workout, weightloss, motivation" 
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </FormControl>
                    <FormDescription className="text-white/60">
                      Specific terms to include in your title or bio
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Additional details (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Add any specific details about your content that will help generate better titles and bios..." 
                      className="bg-white/5 border-white/10 text-white resize-none h-24"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="pt-2">
              <GradientButton
                type="submit"
                gradient="teal-purple"
                isLoading={isGenerating}
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <Zap size={18} />
                <span>Generate Content</span>
              </GradientButton>
            </div>
          </form>
        </Form>
      </GlassCard>
      
      {generatedContent && (
        <div className="grid grid-cols-1 gap-6 animate-fade-in">
          {generatedContent.titles.length > 0 && (
            <GlassCard className="relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-32 h-32 purple-pink-gradient opacity-20 rounded-full blur-xl" />
              <div className="absolute -left-16 -bottom-16 w-32 h-32 teal-purple-gradient opacity-20 rounded-full blur-xl" />
              
              <div className="flex items-center gap-2 mb-6 relative z-10">
                <Rocket size={20} className="text-tiktok-teal" />
                <h2 className="text-xl font-bold">Catchy TikTok Titles</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {generatedContent.titles.map((title, index) => (
                  <div 
                    key={index} 
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02]"
                  >
                    <p className="text-white font-medium mb-3">{title.text}</p>
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => copyToClipboard("title", index)} 
                        className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                        aria-label="Copy title"
                      >
                        {title.copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                      </button>
                      <button 
                        onClick={() => toggleSave("title", index)} 
                        className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                        aria-label={title.saved ? "Remove from saved" : "Save title"}
                      >
                        {title.saved ? (
                          <BookmarkCheck size={18} className="text-tiktok-teal" />
                        ) : (
                          <Bookmark size={18} className="text-white/60" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
          
          {generatedContent.bios.length > 0 && (
            <GlassCard className="relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-32 h-32 pink-teal-gradient opacity-20 rounded-full blur-xl" />
              <div className="absolute -left-16 -bottom-16 w-32 h-32 purple-pink-gradient opacity-20 rounded-full blur-xl" />
              
              <div className="flex items-center gap-2 mb-6 relative z-10">
                <Zap size={20} className="text-tiktok-pink" />
                <h2 className="text-xl font-bold">Engaging TikTok Bios</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4 relative z-10">
                {generatedContent.bios.map((bio, index) => (
                  <div 
                    key={index} 
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all hover:scale-[1.01]"
                  >
                    <p className="text-white font-medium mb-3">{bio.text}</p>
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => copyToClipboard("bio", index)} 
                        className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                        aria-label="Copy bio"
                      >
                        {bio.copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                      </button>
                      <button 
                        onClick={() => toggleSave("bio", index)} 
                        className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                        aria-label={bio.saved ? "Remove from saved" : "Save bio"}
                      >
                        {bio.saved ? (
                          <BookmarkCheck size={18} className="text-tiktok-teal" />
                        ) : (
                          <Bookmark size={18} className="text-white/60" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>
      )}
    </div>
  );
};

export default TitleBioGenerator;
