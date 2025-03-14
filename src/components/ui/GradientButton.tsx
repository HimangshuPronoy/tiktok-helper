
import { cn } from "@/lib/utils";
import React from "react";
import { Loader2 } from "lucide-react";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
  gradient?: "purple-pink" | "teal-purple" | "pink-teal";
  isLoading?: boolean;
}

const GradientButton = ({
  children,
  variant = "primary",
  size = "md",
  className,
  fullWidth = false,
  gradient = "purple-pink",
  isLoading = false,
  ...props
}: GradientButtonProps) => {
  const gradientClass = {
    "purple-pink": "purple-pink-gradient",
    "teal-purple": "teal-purple-gradient",
    "pink-teal": "pink-teal-gradient",
  }[gradient];

  const sizeClass = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5",
    lg: "px-6 py-3 text-lg",
  }[size];

  const variantClass = {
    primary: `${gradientClass} text-white`,
    secondary: "bg-white/5 hover:bg-white/10 text-white border border-white/10",
    outline: "bg-transparent border text-white hover:bg-white/5 backdrop-blur-sm gradient-border",
  }[variant];

  return (
    <button
      className={cn(
        "rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2",
        sizeClass,
        variantClass,
        fullWidth && "w-full",
        isLoading && "opacity-80 pointer-events-none",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 size={size === "sm" ? 14 : size === "lg" ? 22 : 18} className="animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default GradientButton;
