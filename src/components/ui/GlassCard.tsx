
import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
}

const GlassCard = ({ 
  children, 
  className, 
  hoverEffect = false, 
  glowEffect = false,
  ...props 
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-6 rounded-xl transition-all duration-300 relative",
        hoverEffect && "hover:bg-white/10 hover:shadow-lg hover:-translate-y-1",
        glowEffect && "before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-r before:from-tiktok-teal/20 before:via-tiktok-purple/20 before:to-tiktok-pink/20 before:blur-xl before:opacity-50 before:transition-opacity before:duration-1000 hover:before:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
