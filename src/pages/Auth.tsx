
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import GradientButton from "@/components/ui/GradientButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, KeyRound, Mail, Lock, AlertCircle } from "lucide-react";
import { Navigate, Link } from "react-router-dom";
import GlassCard from "@/components/ui/GlassCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Auth = () => {
  const { user, signIn, signUp, isLoading, acceptedTOS, setAcceptedTOS } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tosError, setTosError] = useState(false);
  const [showTOS, setShowTOS] = useState(false);

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTOS) {
      setTosError(true);
      return;
    }
    
    await signUp(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full purple-pink-gradient flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold">TH</span>
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">TikTokHelper</h1>
          <p className="text-white/70">Sign in to access all features and tools</p>
        </div>

        <GlassCard>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black/30">
              <TabsTrigger value="signin" className="data-[state=active]:bg-white/10">
                <KeyRound className="mr-2 h-4 w-4" />
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-white/10">
                <User className="mr-2 h-4 w-4" />
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="p-4">
              <form onSubmit={handleSignIn}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <GradientButton
                    type="submit"
                    fullWidth
                    gradient="purple-pink"
                    isLoading={isLoading}
                    className="mt-6"
                  >
                    Sign In
                  </GradientButton>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="p-4">
              <form onSubmit={handleSignUp}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={acceptedTOS}
                      onCheckedChange={(checked) => {
                        setAcceptedTOS(checked === true);
                        if (checked) setTosError(false);
                      }} 
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <button 
                          type="button" 
                          onClick={() => setShowTOS(true)}
                          className="text-primary underline hover:text-primary/80"
                        >
                          Terms of Service
                        </button>
                      </label>
                      {tosError && (
                        <p className="text-xs text-destructive flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          You must accept the Terms of Service
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <GradientButton
                    type="submit"
                    fullWidth
                    gradient="teal-purple"
                    isLoading={isLoading}
                    className="mt-6"
                  >
                    Create Account
                  </GradientButton>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </GlassCard>
      </div>

      <Dialog open={showTOS} onOpenChange={setShowTOS}>
        <DialogContent className="bg-black/80 backdrop-blur-xl border-white/10 text-white max-w-3xl max-h-[80vh] overflow-auto">
          <DialogTitle className="text-2xl font-bold text-center text-gradient">Terms of Service</DialogTitle>
          <DialogDescription className="text-white/80">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-xl font-semibold mt-4">1. Ownership and Intellectual Property</h2>
              <p>
                TikTokHelper is a proprietary application owned exclusively by TikTokHelper Inc. All content, features, and intellectual property within this application, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, are the exclusive property of TikTokHelper Inc. and are protected by international copyright, trademark, and intellectual property laws.
              </p>
              
              <h2 className="text-xl font-semibold mt-4">2. Prohibited Activities</h2>
              <p>
                Users are strictly prohibited from copying, duplicating, reverse-engineering, or creating derivative works based on the TikTokHelper application or any part thereof. This includes, but is not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Creating a similar application with comparable features</li>
                <li>Replicating the user interface design</li>
                <li>Duplicating the business model</li>
                <li>Extracting or copying any data, algorithms, or functionality</li>
                <li>Reproducing the workflow or unique features of the application</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-4">3. Legal Consequences</h2>
              <p>
                Any unauthorized reproduction, distribution, or creation of similar applications will constitute a violation of this agreement and may result in severe legal consequences, including but not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Injunctive relief</li>
                <li>Monetary damages in the amount of millions of dollars</li>
                <li>Legal fees and court costs</li>
                <li>Statutory damages for copyright infringement</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-4">4. User Agreement</h2>
              <p>
                By creating an account and using TikTokHelper, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. Your continued use of the application constitutes your ongoing agreement to these terms.
              </p>
              
              <h2 className="text-xl font-semibold mt-4">5. Modifications to Terms</h2>
              <p>
                TikTokHelper Inc. reserves the right to modify these Terms of Service at any time without prior notice. It is your responsibility to review these Terms periodically for changes. Your continued use of the application following the posting of changes constitutes your acceptance of such changes.
              </p>
              
              <div className="bg-white/10 p-4 rounded-lg mt-6">
                <p className="font-semibold">By using TikTokHelper, you acknowledge that:</p>
                <p className="mt-2">
                  You will not copy, replicate, or create a similar application to TikTokHelper.
                  You understand that violation of these terms may result in legal action seeking monetary damages in excess of millions of dollars.
                  You have read and agree to all the terms and conditions outlined in this agreement.
                </p>
              </div>
            </div>
          </DialogDescription>
          <div className="flex justify-end mt-4">
            <GradientButton 
              onClick={() => {
                setAcceptedTOS(true);
                setShowTOS(false);
                setTosError(false);
              }}
              gradient="teal-purple"
            >
              I Accept
            </GradientButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;
