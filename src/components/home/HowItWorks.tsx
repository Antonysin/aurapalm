"use client";

import { Camera, Sparkles, ScrollText } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Upload Your Photo",
    description:
      "Take or upload a clear photo of your palm in natural light. Your image is encrypted and never stored.",
    color: "text-terracotta",
    bg: "bg-terracotta/8",
    num: "one",
  },
  {
    icon: Sparkles,
    title: "AI Reads Your Lines",
    description:
      "Our model identifies your unique palm lines and facial features — just like a master palmist would.",
    color: "text-ochre",
    bg: "bg-ochre/8",
    num: "two",
  },
  {
    icon: ScrollText,
    title: "Receive Your Reading",
    description:
      "A beautifully written, personal report — not a template. Yours alone, ready in under a minute.",
    color: "text-sage",
    bg: "bg-sage/8",
    num: "three",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light">
            How It Works
          </h2>
          <p className="mt-4 text-text-secondary text-lg leading-relaxed">
            Three simple steps to discover what your features reveal about you.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative text-center group"
              >
                {/* Step Number — handwritten style */}
                <div className="font-accent text-lg font-medium text-terracotta mb-4">
                  {step.num}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto rounded-full ${step.bg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={26} className={step.color} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>

                {/* Connector Line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-6 w-12 h-px bg-gradient-to-r from-terracotta/20 to-transparent" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
