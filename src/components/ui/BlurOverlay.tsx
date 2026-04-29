import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface BlurOverlayProps {
  title?: string;
  features?: string[];
  price?: string;
  href?: string;
}

export function BlurOverlay({
  title = "Your Full Reading Awaits",
  features = [
    "Complete analysis of all 4 lines",
    "Your personality profile",
    "Career & love insights",
    "The year ahead",
    "Downloadable PDF",
  ],
  price = "$4.99",
  href = "#",
}: BlurOverlayProps) {
  return (
    <div className="relative">
      {/* Blurred content area (children would go here in actual usage) */}
      <div className="absolute inset-0 backdrop-blur-[8px] z-10" />
      {/* Gradient fade at top edge */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-bg-base to-transparent z-10" />
      {/* CTA overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="surface-card rounded-2xl p-8 sm:p-10 max-w-sm mx-auto text-center animate-fade-in-up">
          <div className="text-3xl mb-2">&#10024;</div>
          <h3 className="font-display text-2xl font-semibold mb-3">{title}</h3>
          <ul className="space-y-2 mb-6 text-left">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-ochre mt-0.5">&bull;</span> {f}
              </li>
            ))}
          </ul>
          <Link href={href}>
            <Button size="lg" className="w-full text-base">
              Unlock Full Report &mdash; {price}
            </Button>
          </Link>
          <p className="text-xs text-text-muted mt-4 flex items-center justify-center gap-1.5">
            <span className="text-ochre">&#x1f512;</span>
            Secure &middot; Instant &middot; Yours forever
          </p>
        </div>
      </div>
    </div>
  );
}
