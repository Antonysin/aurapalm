import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "card" | "circle" | "image";
}

export function Skeleton({ className, variant = "text" }: SkeletonProps) {
  const base = "animate-pulse bg-bg-elevated rounded";

  const variants = {
    text: "h-4 w-full",
    card: "h-48 w-full rounded-xl",
    circle: "h-10 w-10 rounded-full",
    image: "aspect-[4/3] w-full rounded-xl",
  };

  return <div className={cn(base, variants[variant], className)} />;
}

export function ReportSkeleton() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Skeleton variant="text" className="h-10 w-3/4" />
      <Skeleton variant="image" />
      <div className="space-y-3">
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-5/6" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-4/5" />
      </div>
    </div>
  );
}
