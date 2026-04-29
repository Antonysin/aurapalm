"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronDown, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const sampleText = `Your heart line curves with an unusual depth — suggesting someone who loves with intention, not impulse. The fork at its end, branching toward the mount of Jupiter, reveals a person who needs intellectual connection as much as emotional warmth. You don't just fall in love; you choose it, consciously and deliberately.

Your life line arcs with a steady, unhurried cadence — the mark of someone who builds momentum over time rather than burning bright and fast. It speaks of resilience earned through experience, not given at birth. There's a small island near the midpoint, indicating a period of significant transition that ultimately strengthened your foundation.

The head line runs straight and clear across your palm, signaling a mind that values clarity. You're someone who needs to understand the why before the how. Your decisions are rarely impulsive; they're the product of quiet, thorough consideration.`;

export function SamplePreview() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light">
            See What a Reading Looks Like
          </h2>
          <p className="mt-4 text-text-secondary text-lg leading-relaxed">
            Every report is unique. Here&apos;s a sample to show you the depth and quality.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="surface-card p-8 sm:p-10">
            {/* Pull Quote */}
            <div className="relative mb-8 pb-6 border-b border-border">
              <p className="text-lg sm:text-xl font-display italic text-text-primary leading-relaxed">
                &ldquo;Your heart line curves with an unusual depth &mdash;
                suggesting someone who loves with intention, not impulse.&rdquo;
              </p>
            </div>

            {/* Sample Text (truncated when collapsed) */}
            <div className={cn("relative transition-all duration-500", !isExpanded && "max-h-40 overflow-hidden")}>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {sampleText}
              </p>
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-card to-transparent" />
              )}
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-sm text-terracotta hover:text-terracotta-soft transition-colors inline-flex items-center gap-1"
            >
              {isExpanded ? "Show less" : "See full example"}
              <ChevronDown
                size={14}
                className={cn("transition-transform", isExpanded && "rotate-180")}
              />
            </button>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Button className="gap-2">
              <Eye size={16} />
              Get Your Own Reading
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
