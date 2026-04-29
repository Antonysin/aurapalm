import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "terracotta" | "sage" | "ochre" | "lavender";
  className?: string;
}

const badgeVariants: Record<string, string> = {
  terracotta: "bg-terracotta/10 text-terracotta border-terracotta/20",
  sage: "bg-sage/10 text-sage border-sage/20",
  ochre: "bg-ochre/10 text-ochre border-ochre/20",
  lavender: "bg-lavender/10 text-lavender border-lavender/20",
};

export function Badge({ children, variant = "terracotta", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
