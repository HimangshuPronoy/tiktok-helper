
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Zap, Search, ShoppingBag, DollarSign, Sparkles, Star, Flame } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import GlassCard from "@/components/ui/GlassCard";

const Landing = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Parallax effect for hero section
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const moveX = (x - 0.5) * 30;
      const moveY = (y - 0.5) * 30;
      
      const elements = heroRef.current.querySelectorAll('.parallax-element');
      
      elements.forEach((el, index) => {
        const speed = 1 - (index * 0.1);
        const htmlEl = el as HTMLElement;
        htmlEl.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animate elements on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 overflow-x-hidden">
      {/* Hero Section */}
      <header className="py-6 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full purple-pink-gradient flex items-center justify-center">
            <span className="text-sm font-bold text-white">TH</span>
          </div>
          <span className="text-lg font-bold text-gradient">TikTokHelper</span>
        </div>
        <Link to="/dashboard">
          <GradientButton size="sm" gradient="teal-purple">
            Dashboard
          </GradientButton>
        </Link>
      </header>

      <main>
        {/* Epic Hero Section */}
        <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 w-full h-full">
            {/* Animated background elements */}
            <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-tiktok-purple/20 blur-3xl opacity-60 parallax-element animate-pulse-slow"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-tiktok-teal/20 blur-3xl opacity-70 parallax-element animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-tiktok-pink/20 blur-3xl opacity-60 parallax-element animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            
            {/* Floating 3D objects */}
            <div className="absolute top-1/4 right-1/3 parallax-element">
              <div className="w-16 h-16 md:w-24 md:h-24 pink-teal-gradient rounded-xl rotate-12 opacity-90 animate-float" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <div className="absolute bottom-1/3 left-1/5 parallax-element">
              <div className="w-20 h-20 md:w-28 md:h-28 purple-pink-gradient rounded-full opacity-80 animate-float" style={{ animationDelay: '1.2s' }}></div>
            </div>
            <div className="absolute top-1/2 right-1/5 parallax-element">
              <div className="w-14 h-14 md:w-20 md:h-20 teal-purple-gradient rounded-lg rotate-45 opacity-70 animate-float" style={{ animationDelay: '1.8s' }}></div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6 border border-white/10">
                <Sparkles className="w-4 h-4 mr-2 text-tiktok-teal" />
                <span className="text-sm text-white/80">The Ultimate TikTok Growth Tool</span>
              </div>
              
              {/* Free Banner Notification */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-tiktok-teal/20 mb-6 border border-tiktok-teal/30 mx-auto animate-pulse-slow">
                <Star className="w-4 h-4 mr-2 text-tiktok-teal" />
                <span className="text-sm font-bold text-tiktok-teal">✨ Limited Time Offer: Completely FREE Access ✨</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <span className="text-gradient">Elevate Your</span>
                  <div className="relative">
                    <span className="purple-pink-gradient bg-clip-text text-transparent">TikTok</span>
                    <span className="absolute -top-6 -right-6">
                      <Star className="w-8 h-8 text-tiktok-teal animate-spin-slow" />
                    </span>
                  </div>
                </div>
                <span className="text-gradient">Content Strategy</span>
              </h1>
              
              <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Unleash the power of AI to analyze trends, generate viral content ideas, and 
                skyrocket your TikTok presence to new heights.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/auth">
                  <GradientButton size="lg" gradient="purple-pink" className="gap-2">
                    <span>Get Started For Free</span>
                    <ArrowRight size={16} />
                  </GradientButton>
                </Link>
                <a href="#features">
                  <GradientButton size="lg" variant="outline" className="bg-black/20">
                    <span>Explore Features</span>
                  </GradientButton>
                </a>
              </div>
            </div>
            
            {/* 3D Phone Mockup */}
            <div className="relative max-w-md mx-auto mt-12 md:mt-20">
              <div className="w-64 h-[500px] mx-auto relative perspective-phone">
                <div className="absolute inset-0 w-full h-full phone-mockup purple-pink-gradient rounded-[36px] p-3 shadow-2xl transform rotate-x-12 rotateY-16 z-10">
                  <div className="w-full h-full rounded-[30px] overflow-hidden bg-black flex flex-col">
                    <div className="h-16 flex items-center justify-center border-b border-white/10">
                      <div className="w-24 h-6 rounded-full bg-white/10"></div>
                    </div>
                    <div className="flex-1 flex flex-col p-3 gap-3 overflow-hidden">
                      <div className="w-full h-24 rounded-lg purple-pink-gradient opacity-80"></div>
                      <div className="w-full h-32 rounded-lg teal-purple-gradient opacity-90"></div>
                      <div className="w-full h-24 rounded-lg pink-teal-gradient opacity-80"></div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                        <div className="w-16 h-8 rounded-full purple-pink-gradient"></div>
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Phone shadow */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-10 bg-black/40 rounded-full blur-xl z-0"></div>
                
                {/* Floating elements around phone */}
                <div className="absolute -top-6 -right-10 z-20 animate-float" style={{animationDelay: '0.5s'}}>
                  <div className="w-20 h-20 rounded-full pink-teal-gradient opacity-90 flex items-center justify-center">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-12 z-20 animate-float" style={{animationDelay: '1.2s'}}>
                  <div className="w-16 h-16 rounded-lg purple-pink-gradient rotate-12 opacity-90 flex items-center justify-center">
                    <Flame className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Stat counters */}
              <div className="grid grid-cols-3 gap-4 mt-8 max-w-sm mx-auto">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">10x</div>
                  <div className="text-sm text-white/60">Growth Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">5M+</div>
                  <div className="text-sm text-white/60">Analyzed Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">95%</div>
                  <div className="text-sm text-white/60">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6 border border-white/10">
              <Sparkles className="w-4 h-4 mr-2 text-tiktok-teal" />
              <span className="text-sm text-white/80">Powerful Creator Tools</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">Supercharge Your TikTok Strategy</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Our cutting-edge AI tools analyze trends, generate viral content ideas, and help you find your perfect niche.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureItem 
              icon={<Search className="w-6 h-6 text-white" />}
              title="Niche Finder"
              description="Discover profitable niches and untapped opportunities for your TikTok content."
              gradient="purple-pink"
              link="/niche-finder"
              animationDelay="0ms"
            />
            <FeatureItem 
              icon={<TrendingUp className="w-6 h-6 text-white" />}
              title="Trend Analyzer"
              description="Stay ahead of the curve with real-time trend insights and analytics."
              gradient="teal-purple"
              link="/trend-analyzer"
              badge="Popular"
              animationDelay="200ms"
            />
            <FeatureItem 
              icon={<Zap className="w-6 h-6 text-white" />}
              title="Content Generator"
              description="Get AI-powered content ideas tailored to your niche and audience."
              gradient="pink-teal"
              link="/content-generator"
              animationDelay="400ms"
            />
            <FeatureItem 
              icon={<ShoppingBag className="w-6 h-6 text-white" />}
              title="TikTok Shop"
              description="Optimize your TikTok Shop and boost your e-commerce presence."
              gradient="teal-purple"
              link="/tiktok-shop"
              animationDelay="600ms"
            />
            <FeatureItem 
              icon={<DollarSign className="w-6 h-6 text-white" />}
              title="CRP Guide"
              description="Master the Creator Rewards Program to maximize your earnings."
              gradient="pink-teal"
              link="/crp-guide"
              badge="New"
              animationDelay="800ms"
            />
            <FeatureItem 
              icon={<Flame className="w-6 h-6 text-white" />}
              title="Viral Formula"
              description="Unlock the secret formula to create content that goes viral consistently."
              gradient="purple-pink"
              link="/dashboard"
              badge="Hot"
              animationDelay="1000ms"
            />
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-tiktok-purple/10 blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-tiktok-teal/10 blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12 animate-on-scroll opacity-0">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6 border border-white/10">
                <Star className="w-4 h-4 mr-2 text-tiktok-teal" />
                <span className="text-sm text-white/80">Success Stories</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Creators Love Our Tools</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TestimonialCard 
                quote="TikTokHelper helped me grow from 500 to 50K followers in just 3 months. The trend analyzer is a game-changer!"
                author="Alex Martinez"
                handle="@alexcreates"
                gradient="purple-pink"
                animationDelay="0ms"
              />
              <TestimonialCard 
                quote="I found my perfect niche using the Niche Finder tool. My engagement has increased by 300% since I started using TikTokHelper."
                author="Sarah Johnson"
                handle="@sarahtiktoker"
                gradient="teal-purple"
                animationDelay="200ms"
              />
              <TestimonialCard 
                quote="The content ideas I get from this platform are incredible. I'm finally monetizing my account thanks to the CRP Guide!"
                author="Michael Lee"
                handle="@mikeontiktok"
                gradient="pink-teal"
                animationDelay="400ms"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 animate-on-scroll opacity-0">
          <GlassCard className="max-w-5xl mx-auto overflow-hidden">
            <div className="p-8 md:p-12 relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-tiktok-purple/10 via-tiktok-teal/10 to-tiktok-pink/10 opacity-50"></div>
              
              {/* Animated shapes */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 purple-pink-gradient rounded-full opacity-40 animate-pulse-slow"></div>
              <div className="absolute -top-6 -left-6 w-20 h-20 teal-purple-gradient rounded-full opacity-40 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative z-10">
                <div className="text-center">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">Ready to Transform Your TikTok Strategy?</h2>
                  <p className="text-white/70 mb-4 max-w-2xl mx-auto text-lg">
                    Join thousands of creators who are growing their audience and engagement with TikTokHelper.
                    Get started today and see results within your first week!
                  </p>
                  <p className="text-tiktok-teal font-bold mb-10 max-w-2xl mx-auto">
                    Currently FREE for a limited time only! Don't miss out!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/dashboard">
                      <GradientButton size="lg" gradient="purple-pink" className="w-full sm:w-auto">
                        Start Free Access Now
                      </GradientButton>
                    </Link>
                    <Link to="/trend-analyzer">
                      <GradientButton size="lg" variant="outline" className="w-full sm:w-auto">
                        Try Trend Analyzer
                      </GradientButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full purple-pink-gradient flex items-center justify-center">
                  <span className="text-sm font-bold text-white">TH</span>
                </div>
                <span className="text-lg font-bold text-gradient">TikTokHelper</span>
              </div>
              <p className="text-white/60 mb-4">
                Your ultimate companion for TikTok success. Find trends, generate content ideas, and grow your audience.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Tools</h3>
              <ul className="space-y-2">
                <li><Link to="/niche-finder" className="text-white/60 hover:text-white transition-colors">Niche Finder</Link></li>
                <li><Link to="/trend-analyzer" className="text-white/60 hover:text-white transition-colors">Trend Analyzer</Link></li>
                <li><Link to="/content-generator" className="text-white/60 hover:text-white transition-colors">Content Generator</Link></li>
                <li><Link to="/tiktok-shop" className="text-white/60 hover:text-white transition-colors">TikTok Shop</Link></li>
                <li><Link to="/crp-guide" className="text-white/60 hover:text-white transition-colors">CRP Guide</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-white/60 hover:text-white transition-colors">Dashboard</Link></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/50 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} TikTokHelper. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <span className="sr-only">TikTok</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature item component for the landing page
const FeatureItem = ({ 
  icon, 
  title, 
  description, 
  gradient, 
  link, 
  badge,
  animationDelay
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  gradient: "purple-pink" | "teal-purple" | "pink-teal"; 
  link: string;
  badge?: string;
  animationDelay: string;
}) => {
  const gradientClass = {
    "purple-pink": "purple-pink-gradient",
    "teal-purple": "teal-purple-gradient",
    "pink-teal": "pink-teal-gradient",
  }[gradient];

  return (
    <Link to={link}>
      <GlassCard 
        className={`h-full transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 animate-on-scroll opacity-0`} 
        style={{animationDelay}}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${gradientClass}`}>
              {icon}
            </div>
            {badge && (
              <span className="px-2 py-1 bg-white/10 rounded-full text-xs font-medium">
                {badge}
              </span>
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-400 flex-grow">{description}</p>
          <div className="mt-4 flex justify-end">
            <span className={`text-sm font-medium ${gradientClass} bg-clip-text text-transparent group-hover:underline`}>
              Explore →
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
};

// Testimonial card component
const TestimonialCard = ({
  quote,
  author,
  handle,
  gradient,
  animationDelay
}: {
  quote: string;
  author: string;
  handle: string;
  gradient: "purple-pink" | "teal-purple" | "pink-teal";
  animationDelay: string;
}) => {
  const gradientClass = {
    "purple-pink": "purple-pink-gradient",
    "teal-purple": "teal-purple-gradient",
    "pink-teal": "pink-teal-gradient",
  }[gradient];

  return (
    <GlassCard className={`animate-on-scroll opacity-0`} style={{animationDelay}}>
      <div className="p-6">
        <div className={`w-10 h-10 rounded-full ${gradientClass} flex items-center justify-center mb-4`}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </div>
        <p className="text-white/80 mb-4 italic">"{quote}"</p>
        <div>
          <div className="font-semibold text-white">{author}</div>
          <div className={`text-sm ${gradientClass} bg-clip-text text-transparent`}>{handle}</div>
        </div>
      </div>
    </GlassCard>
  );
};

export default Landing;
