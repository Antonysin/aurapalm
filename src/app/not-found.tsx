import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl font-display font-semibold gold-text mb-4">404</div>
        <h1 className="font-display text-3xl font-semibold mb-3">
          Page Not Found
        </h1>
        <p className="text-text-secondary leading-relaxed mb-8">
          The universe hasn&apos;t mapped this path yet. Let&apos;s get you back on track.
        </p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
