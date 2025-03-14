
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import GlassCard from "./GlassCard";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  gradient: "purple-pink" | "teal-purple" | "pink-teal";
  className?: string;
  badge?: string;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  link,
  gradient,
  className,
  badge,
}: FeatureCardProps) => {
  const gradientClass = {
    "purple-pink": "purple-pink-gradient",
    "teal-purple": "teal-purple-gradient",
    "pink-teal": "pink-teal-gradient",
  }[gradient];

  return (
    <Link to={link} className="block">
      <GlassCard
        className={cn("h-full transition-all duration-300 hover:scale-[1.02]", className)}
        hoverEffect
        glowEffect
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", gradientClass)}>
              <Icon className="w-6 h-6 text-white" />
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
            <span className={cn("text-sm font-medium", gradientClass, "bg-clip-text text-transparent")}>
              Explore →
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
};

export default FeatureCard;
