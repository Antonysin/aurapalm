"use client";

import { Eye, Hand, Sparkles } from "lucide-react";

const categories = [
  {
    title: "Palm Reading",
    icon: Hand,
    items: [
      "Life Line — vitality & resilience",
      "Heart Line — love & emotional style",
      "Head Line — thinking & decisions",
      "Fate Line — purpose & career path",
      "Hand shape & mounts",
      "Minor lines & special markers",
    ],
    color: "text-terracotta",
    bg: "bg-terracotta/8",
    dot: "bg-terracotta",
  },
  {
    title: "Face Reading",
    icon: Eye,
    items: [
      "Eye shape & spacing",
      "Forehead & brow structure",
      "Nose & cheekbone profile",
      "Jawline & chin definition",
      "Overall facial symmetry",
      "Expression lines & features",
    ],
    color: "text-sage",
    bg: "bg-sage/8",
    dot: "bg-sage",
  },
];

export function WhatWeAnalyze() {
  return (
    <section className="py-20 sm:py-28 bg-bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terracotta/8 border border-terracotta/15 mb-6">
            <Sparkles size={14} className="text-terracotta" />
            <span className="text-xs font-medium text-terracotta uppercase tracking-wider font-accent">
              The Science Behind It
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light">
            What We Analyze
          </h2>
          <p className="mt-4 text-text-secondary text-lg leading-relaxed">
            Drawing from centuries of palmistry and face reading tradition, enhanced by modern AI analysis.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="surface-card p-8 sm:p-10"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center`}
                  >
                    <Icon size={24} className={cat.color} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold">
                    {cat.title}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-text-secondary">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${cat.dot}`} />
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
