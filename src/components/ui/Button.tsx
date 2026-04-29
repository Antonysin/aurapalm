import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-terracotta text-bg-surface font-medium hover:bg-terracotta-soft btn-pill",
  secondary:
    "bg-transparent text-text-primary font-medium border border-border hover:border-terracotta/40 rounded-full",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 font-medium rounded-full",
  danger:
    "bg-error/10 text-error hover:bg-error/20 font-medium rounded-full",
};

const sizeStyles: Record<string, string> = {
  sm: "px-5 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-300",
          "hover:scale-[1.03] active:scale-[0.98]",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
