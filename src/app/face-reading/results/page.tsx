"use client";

import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { Share2, Download, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

const scores = [
  { label: "Expression", percentage: 84, color: "#d4a853" },
  { label: "Intuition", percentage: 73, color: "#9b7fd4" },
  { label: "Confidence", percentage: 69, color: "#c47b8a" },
  { label: "Diplomacy", percentage: 88, color: "#4caf82" },
];

const previewText = `Your facial structure reveals a natural balance between logic and empathy. The proportions of your features suggest someone who processes the world through both analysis and feeling — rarely one at the expense of the other.

Your eyes are set with a symmetry that indicates clear communication style. You have a natural ability to read a room, to understand what isn't being said. The spacing between them suggests someone who values perspective — you step back before you step in.

Your jawline speaks to your approach to challenges. There's a quiet determination there, not stubbornness but persistence. You see things through not because you hate to lose, but because you value completion.`;

export default function FaceResultsPage() {
  return (
    <div className="pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-4xl mb-4">&#10024;</div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold">
            Your Reading Is Ready
          </h1>
          <p className="mt-2 text-text-secondary">
            Here&apos;s a preview of what your face reveals.
          </p>
        </div>

        {/* Score Summary */}
        <div className="surface-card rounded-2xl p-8 mb-12">
          <h2 className="font-display text-xl font-semibold text-center mb-8">
            Your Energy Profile
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {scores.map((s) => (
              <div key={s.label} className="relative flex flex-col items-center">
                <ProgressRing
                  percentage={s.percentage}
                  label={s.label}
                  size={90}
                  color={s.color}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Free Preview */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-semibold mb-6">
            Your Reading Preview
          </h2>
          <div className="surface-card rounded-2xl p-6 sm:p-8">
            <p className="text-text-secondary leading-relaxed whitespace-pre-line">
              {previewText}
            </p>
          </div>
        </div>

        {/* Blur Paywall */}
        <div className="relative mb-12">
          <div className="space-y-4 blur-sm select-none">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="surface-card rounded-xl p-6">
                <div className="h-4 w-1/3 bg-bg-elevated rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-bg-elevated rounded" />
                  <div className="h-3 w-5/6 bg-bg-elevated rounded" />
                  <div className="h-3 w-4/5 bg-bg-elevated rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="surface-card rounded-2xl p-8 sm:p-10 max-w-sm mx-auto text-center animate-fade-in-up">
              <div className="text-3xl mb-2">&#10024;</div>
              <h3 className="font-display text-2xl font-semibold mb-3">
                Your Full Reading Awaits
              </h3>
              <ul className="space-y-2 mb-6 text-left">
                {[
                  "Complete facial feature analysis",
                  "Your personality profile",
                  "Strengths & growth areas",
                  "Relationship insights",
                  "Downloadable PDF",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-ochre mt-0.5">&bull;</span> {f}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="w-full text-base">
                Unlock Full Report &mdash; $4.99
              </Button>
              <p className="text-xs text-text-muted mt-4 flex items-center justify-center gap-1.5">
                <Lock size={12} className="text-terracotta" />
                Secure &middot; Instant &middot; Yours forever
              </p>
            </div>
          </div>
        </div>

        {/* Social Share */}
        <div className="text-center surface-card rounded-2xl p-6">
          <p className="text-sm text-text-secondary mb-4">
            Share your free preview and get 10% off your full report
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="secondary" size="sm" className="gap-2">
              <Share2 size={14} /> Share on Instagram
            </Button>
            <Button variant="secondary" size="sm" className="gap-2">
              <Share2 size={14} /> Share on X
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Download size={14} /> Copy Link
            </Button>
          </div>
        </div>

        {/* Upsell */}
        <div className="mt-8 text-center">
          <Link
            href="/palm-reading/upload"
            className="text-sm text-terracotta hover:text-terracotta-soft transition-colors underline underline-offset-4 inline-flex items-center gap-1"
          >
            Want more depth? Try a palm reading too <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
