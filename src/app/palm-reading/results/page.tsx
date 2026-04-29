"use client";

import { useState, useEffect } from "react";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { Share2, Download, ArrowRight, Lock, Loader2, ImageIcon } from "lucide-react";
import Link from "next/link";

interface ReadingData {
  scores: Array<{ label: string; percentage: number; color: string }>;
  preview: string;
  fullReport: Record<string, string | string[]>;
}

export default function PalmResultsPage() {
  const [reading, setReading] = useState<ReadingData | null>(null);
  const [reportImage, setReportImage] = useState<string | null>(null);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load reading from sessionStorage
    const stored = sessionStorage.getItem('palmReading');
    if (stored) {
      try {
        setReading(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse reading:', e);
      }
    }
    setLoading(false);
  }, []);

  const handleGenerateImage = async () => {
    if (!reading) return;
    
    setGeneratingImage(true);
    try {
      const response = await fetch('/api/generate-report-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          palmReading: reading.preview,
          scores: reading.scores,
        }),
      });

      const data = await response.json();
      
      if (data.success && data.imageUrl) {
        setReportImage(data.imageUrl);
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setGeneratingImage(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 sm:pt-32 sm:pb-20 flex items-center justify-center min-h-[50vh]">
        <Loader2 size={32} className="animate-spin text-terracotta" />
      </div>
    );
  }

  // Default data if no reading available
  const scores = reading?.scores || [
    { label: "Love", percentage: 78, color: "#c47b8a" },
    { label: "Career", percentage: 82, color: "#d4a853" },
    { label: "Vitality", percentage: 65, color: "#4caf82" },
    { label: "Intuition", percentage: 91, color: "#9b7fd4" },
  ];

  const previewText = reading?.preview || `Your life line arcs with a steady, unhurried curve — suggesting someone who builds momentum over time rather than burning bright and fast. It speaks of resilience earned through experience, not given at birth. There's a small island near the midpoint, around what palmists would place in your late twenties, indicating a period of significant transition that ultimately strengthened your foundation rather than breaking it.

Your heart line tells a different story. It curves with unusual depth — suggesting someone who loves with intention, not impulse. The fork at its end, branching toward the mount of Jupiter, reveals a person who needs intellectual connection as much as emotional warmth. You don't just fall in love; you choose it, consciously and deliberately.`;

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
            Here&apos;s a preview of what your palm reveals.
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

        {/* Report Image (if generated) */}
        {reportImage && (
          <div className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-6 text-center">
              Your Visual Report
            </h2>
            <div className="surface-card rounded-2xl p-4 sm:p-6">
              <img 
                src={reportImage} 
                alt="Your palm reading report"
                className="w-full rounded-xl"
              />
              <div className="mt-4 flex justify-center gap-3">
                <a 
                  href={reportImage} 
                  download="aurapalm-reading.png"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-medium bg-transparent text-text-primary border border-border hover:border-terracotta/40 rounded-full transition-all duration-300 hover:scale-[1.03]"
                >
                  <Download size={14} /> Download
                </a>
                <Button variant="secondary" size="sm" className="gap-2">
                  <Share2 size={14} /> Share
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Generate Image Button */}
        {!reportImage && (
          <div className="text-center mb-12">
            <Button 
              onClick={handleGenerateImage}
              disabled={generatingImage}
              className="gap-2"
            >
              {generatingImage ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating Visual Report...
                </>
              ) : (
                <>
                  <ImageIcon size={16} />
                  Generate Visual Report Card
                </>
              )}
            </Button>
            <p className="text-xs text-text-muted mt-2">
              Powered by AI — Creates a beautiful shareable image of your reading
            </p>
          </div>
        )}

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
          {/* Blurred content (real content behind blur) */}
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

          {/* Blur Overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="surface-card rounded-2xl p-8 sm:p-10 max-w-sm mx-auto text-center animate-fade-in-up">
              <div className="text-3xl mb-2">&#10024;</div>
              <h3 className="font-display text-2xl font-semibold mb-3">
                Your Full Reading Awaits
              </h3>
              <ul className="space-y-2 mb-6 text-left">
                {[
                  "Complete analysis of all 4 lines",
                  "Your personality profile",
                  "Career & love insights",
                  "The year ahead",
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
            href="/face-reading/upload"
            className="text-sm text-terracotta hover:text-terracotta-soft transition-colors underline underline-offset-4 inline-flex items-center gap-1"
          >
            Want more depth? Try a face reading too <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
