
import React, { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Zap, Copy, Check, Bookmark, BookmarkCheck, Rocket, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";

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
      const { data: responseData, error } = await supabase.functions.invoke('generate-titles-bios', {
        body: data,
      });

      if (error) {
        throw new Error(error.message || "Failed to generate content");
      }

      if (responseData.error) {
        throw new Error(responseData.error);
      }

      setGeneratedContent(responseData);
      
      toast({
        title: "Content generated",
        description: "We've created some awesome TikTok content for you!",
      });
    } catch (error: any) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation failed",
        description: error.message || "There was an error generating your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleSave = async (type: "title" | "bio", index: number) => {
    if (!generatedContent) return;
    
    // Generate a temporary user ID for demo purposes
    // In a real app, this would be the authenticated user's ID
    const tempUserId = "demo-user-123";
    
    try {
      if (type === "title") {
        const updatedTitles = [...generatedContent.titles];
        const item = updatedTitles[index];
        const newSavedState = !item.saved;
        
        if (newSavedState) {
          // Save to database (in production this would connect to a Supabase function)
          await supabase.from('saved_content').upsert({
            user_id: tempUserId,
            content_type: 'title',
            content: item.text,
            created_at: new Date().toISOString()
          }).select();
        } else {
          // Delete from database (in production)
          // This is simplified for demo purposes
        }
        
        updatedTitles[index].saved = newSavedState;
        setGeneratedContent({ ...generatedContent, titles: updatedTitles });
        
        toast({
          title: newSavedState ? "Title saved" : "Title removed",
          description: newSavedState ? "Title saved to your collection" : "Title removed from your collection",
        });
      } else {
        const updatedBios = [...generatedContent.bios];
        const item = updatedBios[index];
        const newSavedState = !item.saved;
        
        if (newSavedState) {
          // Save to database (in production this would connect to a Supabase function)
          await supabase.from('saved_content').upsert({
            user_id: tempUserId,
            content_type: 'bio',
            content: item.text,
            created_at: new Date().toISOString()
          }).select();
        } else {
          // Delete from database (in production)
          // This is simplified for demo purposes
        }
        
        updatedBios[index].saved = newSavedState;
        setGeneratedContent({ ...generatedContent, bios: updatedBios });
        
        toast({
          title: newSavedState ? "Bio saved" : "Bio removed",
          description: newSavedState ? "Bio saved to your collection" : "Bio removed from your collection",
        });
      }
    } catch (error: any) {
      console.error("Error saving content:", error);
      toast({
        title: "Save failed",
        description: "There was an error saving your content. Please try again.",
        variant: "destructive",
      });
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
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    <span>Generate Content</span>
                  </>
                )}
              </GradientButton>
            </div>
          </form>
        </Form>
      </GlassCard>
      
      {isGenerating && (
        <div className="py-20 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full purple-pink-gradient p-3 mb-4">
            <div className="animate-spin w-full h-full border-2 border-white/20 border-t-white rounded-full" />
          </div>
          <p className="text-white/60">Crafting creative titles and bios...</p>
        </div>
      )}
      
      {generatedContent && !isGenerating && (
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
