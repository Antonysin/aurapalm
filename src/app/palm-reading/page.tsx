import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Card";
import { Hand, Sparkles, ScrollText, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Palm Reading Online",
  description:
    "Upload a photo of your palm and get a deeply personal AI-generated reading. Discover what your life line, heart line, head line, and fate line reveal about you.",
  openGraph: {
    title: "AI Palm Reading Online — AuraPalm",
    description:
      "Upload your palm. Discover yourself. AI-powered readings in 60 seconds.",
  },
};

const features = [
  {
    icon: Hand,
    title: "All Major Lines",
    description: "Life, heart, head, and fate lines analyzed in depth.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Computer vision meets centuries of palmistry tradition.",
  },
  {
    icon: ScrollText,
    title: "Beautiful Report",
    description: "Literary-quality prose, not generic templates.",
  },
  {
    icon: Shield,
    title: "100% Private",
    description: "Your photo is deleted immediately after analysis.",
  },
];

export default function PalmReadingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ochre/10 border border-ochre/20 mb-6">
            <Sparkles size={14} className="text-ochre" />
            <span className="text-xs font-medium text-ochre uppercase tracking-wider">
              Palm Reading
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold max-w-4xl mx-auto leading-tight">
            What Do Your Hands Reveal?
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            For thousands of years, palmists have read the lines of the hand to
            uncover personality, purpose, and potential. Now AI brings this
            ancient practice to you — in seconds.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/palm-reading/upload">
              <Button size="lg" className="text-base">
                Read My Palm — It&apos;s Free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="secondary" size="lg" className="text-base">
                See Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <Section className="bg-bg-surface/50">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title} hover>
                <div className="w-10 h-10 rounded-xl bg-ochre/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-ochre" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-text-secondary">{f.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* What We Look At */}
      <Section>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-center mb-12">
          What We Analyze in Your Palm
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            { name: "Life Line", desc: "Vitality, health, and major life changes" },
            { name: "Heart Line", desc: "Emotional style, love, and relationships" },
            { name: "Head Line", desc: "Thinking patterns, intellect, and decisions" },
            { name: "Fate Line", desc: "Career path, purpose, and life direction" },
            { name: "Hand Shape", desc: "Earth, air, fire, or water hand types" },
            { name: "Mounts", desc: "Key personality amplifiers on the palm" },
          ].map((item) => (
            <div key={item.name} className="surface-card rounded-xl p-5 flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-ochre mt-2 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-sm">{item.name}</h3>
                <p className="text-xs text-text-secondary mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-bg-surface/50 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
            Ready to Discover Yourself?
          </h2>
          <p className="text-text-secondary mb-8">
            Take a photo of your palm. We&apos;ll do the rest.
          </p>
          <Link href="/palm-reading/upload">
            <Button size="lg">Start Your Free Reading</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
