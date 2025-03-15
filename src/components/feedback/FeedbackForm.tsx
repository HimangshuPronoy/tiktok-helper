
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import GradientButton from "@/components/ui/GradientButton";
import { MessageSquare, Star, StarIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const FeedbackForm = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      toast.error("Please select a rating before submitting");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("user_feedback").insert({
        user_id: user?.id,
        rating,
        feedback,
      });

      if (error) throw error;

      toast.success("Thank you for your feedback!");
      setFeedback("");
      setRating(0);
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit feedback");
      console.error("Error submitting feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all shadow-lg">
          <MessageSquare className="h-6 w-6 text-white" />
        </button>
      </DrawerTrigger>
      
      <DrawerContent className="bg-black/90 backdrop-blur-md border-t border-white/10 text-white">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-center text-2xl font-bold text-gradient">We Value Your Feedback</DrawerTitle>
            <DrawerDescription className="text-center text-white/70">
              Help us improve TikTokHelper by sharing your experience
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4">
            <div className="mb-6">
              <Label htmlFor="rating" className="block mb-2">How would you rate your experience?</Label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition-all"
                  >
                    {rating >= star ? (
                      <StarIcon className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                    ) : (
                      <Star className="h-8 w-8 text-white/30 hover:text-white/50" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <Label htmlFor="feedback" className="block mb-2">Share your thoughts (optional)</Label>
              <Textarea
                id="feedback"
                placeholder="Tell us what you like or what we could improve..."
                className="min-h-32 bg-white/5 border-white/10 placeholder:text-white/30"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          </div>
          
          <DrawerFooter>
            <GradientButton
              onClick={handleSubmitFeedback}
              gradient="teal-purple"
              isLoading={isLoading}
              fullWidth
            >
              Submit Feedback
            </GradientButton>
            <DrawerClose asChild>
              <GradientButton variant="outline" fullWidth>
                Cancel
              </GradientButton>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FeedbackForm;
