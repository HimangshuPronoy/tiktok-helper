
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Search,
  Lightbulb,
  TrendingUp,
  ShoppingBag,
  Award,
  Settings,
  X,
  Hash,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isMobile]);

  if (!mounted) return null;

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Niche Finder", href: "/niche-finder", icon: Search },
    { name: "Trend Analyzer", href: "/trend-analyzer", icon: TrendingUp },
    { name: "Content Generator", href: "/content-generator", icon: Lightbulb },
    { name: "Hashtag Generator", href: "/hashtag-generator", icon: Hash },
    { name: "TikTok Shop", href: "/tiktok-shop", icon: ShoppingBag },
    { name: "CRP Guide", href: "/crp-guide", icon: Award },
  ];

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[280px] bg-black/30 backdrop-blur-xl border-r border-white/5 transition-all duration-300 ease-in-out transform",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : (isOpen ? "translate-x-0" : "-translate-x-[220px] hover:translate-x-0")
        )}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full purple-pink-gradient flex items-center justify-center">
              <span className="text-white font-bold">TH</span>
            </div>
            <h1 className="text-xl font-bold text-gradient">TikTokHelper</h1>
          </div>
          {isMobile && (
            <button 
              onClick={onClose}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/5"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        <nav className="mt-4 px-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "purple-pink-gradient text-white"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )
                  }
                  onClick={isMobile ? onClose : undefined}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-6 px-4 w-full">
          <NavLink
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            onClick={isMobile ? onClose : undefined}
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
