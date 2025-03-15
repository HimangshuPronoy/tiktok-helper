
import { useState, useEffect } from "react";
import GradientButton from "../ui/GradientButton";
import { Bell, Menu, User, X, ChevronDown, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 transition-all duration-300",
        isScrolled ? "backdrop-blur-xl bg-black/40 border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-all"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-gradient">TikTokHelper</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {user ? (
          <>
            <div className="relative">
              <button 
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-all relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full purple-pink-gradient"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg p-3 z-50">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Notifications</h3>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-white/60 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="divide-y divide-white/5">
                    {[
                      {title: "New trend detected", desc: "A new dance trend is gaining traction", time: "5m ago"},
                      {title: "Content idea suggestion", desc: "Try creating a video about your morning routine", time: "2h ago"},
                      {title: "Welcome to TikTokHelper", desc: "Explore our tools to grow your TikTok presence", time: "1d ago"},
                    ].map((notification, i) => (
                      <div key={i} className="py-2">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-white/60 text-xs mb-1">{notification.desc}</p>
                        <p className="text-white/40 text-xs">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-all">
                  <User size={20} />
                  <span className="hidden md:inline text-sm">{user.email?.split('@')[0] || 'User'}</span>
                  <ChevronDown size={14} className="text-white/60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/80 backdrop-blur-xl border-white/10 text-white">
                <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  className="hover:bg-white/10 cursor-pointer text-tiktok-pink"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex items-center">
            <Link to="/auth">
              <GradientButton size="sm" className="gap-2">
                <span>Sign in</span>
              </GradientButton>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
