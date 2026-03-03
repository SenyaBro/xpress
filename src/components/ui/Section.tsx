import React from "react";
import { cn } from "@/src/utils/cn";

export function Section({
  className,
  children,
  id,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-32 relative overflow-hidden", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 md:mb-20 text-center", className)}>
      {subtitle && (
        <p className="text-brand-lime font-medium tracking-wider uppercase text-sm mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gradient">
        {title}
      </h2>
    </div>
  );
}
