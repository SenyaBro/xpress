import React, { forwardRef } from "react";
import { cn } from "@/src/utils/cn";
import { motion } from "framer-motion";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const getButtonClasses = (variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) => {
  return cn(
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
  );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={getButtonClasses(variant as ButtonVariant, size as ButtonSize, className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={getButtonClasses(variant as ButtonVariant, size as ButtonSize, className)}
        {...props}
      />
    );
  }
);
ButtonLink.displayName = "ButtonLink";

export const MotionButton = motion.create(Button);
export const MotionButtonLink = motion.create(ButtonLink);
