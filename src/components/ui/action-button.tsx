import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-focus active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[var(--shadow-glow-orange)] hover:brightness-110",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[var(--shadow-glow-cyan)] hover:brightness-110",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-surface-2",
        ghost: "bg-transparent text-foreground hover:bg-surface-2",
        glass:
          "glass text-foreground hover:bg-surface-2",
        gradient:
          "text-primary-foreground shadow-[var(--shadow-glow-orange)] hover:brightness-110",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, leftIcon, rightIcon, children, style, ...props }, ref) => {
    const isGradient = variant === "gradient";
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        style={
          isGradient
            ? { backgroundImage: "var(--gradient-brand)", ...style }
            : style
        }
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
