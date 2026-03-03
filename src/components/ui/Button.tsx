import React, { forwardRef } from "react";
import { cn } from "@/src/utils/cn";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-brand-lime text-brand-dark hover:bg-brand-lime-hover shadow-[0_0_20px_rgba(180,255,0,0.2)] hover:shadow-[0_0_30px_rgba(180,255,0,0.4)]": variant === "primary",
            "bg-white/10 text-white hover:bg-white/20": variant === "secondary",
            "border border-white/20 text-white hover:bg-white/10": variant === "outline",
            "text-white hover:bg-white/10": variant === "ghost",
            "h-9 px-4 text-sm": size === "sm",
            "h-12 px-6 text-base": size === "md",
            "h-14 px-8 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export const MotionButton = motion.create(Button);
