"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Organic Blob Backgrounds */}
      <div
        className="blob-bg w-[500px] h-[500px] top-[-10%] left-[-5%]"
        style={{ backgroundColor: "rgba(184, 92, 56, 0.05)" }}
      />
      <div
        className="blob-bg w-[400px] h-[400px] top-[40%] right-[-10%]"
        style={{
          backgroundColor: "rgba(201, 162, 39, 0.04)",
          animationDelay: "-8s",
        }}
      />
      <div
        className="blob-bg w-[350px] h-[350px] bottom-[10%] left-[30%]"
        style={{
          backgroundColor: "rgba(107, 142, 107, 0.04)",
          animationDelay: "-16s",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
        <div className="animate-fade-in">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terracotta/8 border border-terracotta/15 mb-8">
            <Sparkles size={14} className="text-terracotta" />
            <span className="text-xs font-medium text-terracotta uppercase tracking-wider font-accent">
              AI-Powered Palmistry
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight max-w-4xl mx-auto">
            Your hands have always been{" "}
            <em className="not-italic text-terracotta font-normal">
              trying to tell you something
            </em>
            .
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            AI-powered palm and face readings. Personal, private, and ready in
            60 seconds.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/palm-reading/upload">
              <Button size="lg" className="text-base gap-2">
                Read My Palm
                <ArrowRight size={18} />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="secondary" size="lg" className="text-base">
                See How It Works
              </Button>
            </a>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-ochre"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-text-muted">
              Trusted by over{" "}
              <span className="text-text-secondary font-medium">200,000</span>{" "}
              readers worldwide
            </p>
          </div>

          {/* Privacy Micro-copy */}
          <p className="mt-6 text-xs text-text-muted flex items-center justify-center gap-1.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-terracotta"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            Your photo is analyzed and immediately deleted. We never store your
            image.
          </p>
        </div>
      </div>
    </section>
  );
}
