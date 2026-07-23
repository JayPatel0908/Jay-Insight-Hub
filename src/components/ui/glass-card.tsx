import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "orange" | "cyan";
  interactive?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, tone = "default", interactive = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass relative overflow-hidden rounded-3xl p-6 shadow-[var(--shadow-soft)]",
          tone === "orange" &&
            "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-orange before:to-transparent",
          tone === "cyan" &&
            "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-cyan before:to-transparent",
          interactive &&
            "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] hover:border-brand-orange/40",
          className,
        )}
        {...props}
      />
    );
  },
);
GlassCard.displayName = "GlassCard";
