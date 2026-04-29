import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Card";
import { Eye, Sparkles, Scan, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Face Reading Online",
  description:
    "Upload your photo for an AI-powered face reading. Discover what your facial features reveal about your personality, strengths, and life path.",
  openGraph: {
    title: "AI Face Reading Online — AuraPalm",
    description:
      "Upload your photo. Discover yourself. AI-powered face readings in 60 seconds.",
  },
};

const features = [
  {
    icon: Eye,
    title: "Facial Feature Analysis",
    description: "Eyes, brows, nose, jawline, and symmetry analyzed.",
  },
  {
    icon: Sparkles,
    title: "Personality Insights",
    description: "What your features reveal about your character.",
  },
  {
    icon: Scan,
    title: "AI-Powered Precision",
    description: "Computer vision identifies subtle feature patterns.",
  },
  {
    icon: Shield,
    title: "Your Privacy Matters",
    description: "Photo deleted immediately. Zero data retention.",
  },
];

export default function FaceReadingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender/10 border border-lavender/20 mb-6">
            <Sparkles size={14} className="text-lavender" />
            <span className="text-xs font-medium text-lavender uppercase tracking-wider">
              Face Reading
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold max-w-4xl mx-auto leading-tight">
            Your Face Tells a Story
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Ancient face reading tradition meets modern AI. Your facial features
            hold clues to your personality, strengths, and life journey &mdash;
            and we can read them in seconds.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/face-reading/upload">
              <Button size="lg" className="text-base">
                Read My Face — It&apos;s Free
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

      {/* Features */}
      <Section className="bg-bg-surface/50">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="glass-card rounded-xl p-6 glass-card-hover">
                <div className="w-10 h-10 rounded-xl bg-lavender/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-lavender" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-text-secondary">{f.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Analysis Detail */}
      <Section>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-center mb-12">
          What We Analyze in Your Face
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            { name: "Eye Shape & Spacing", desc: "Communication style and emotional expression" },
            { name: "Forehead & Brow", desc: "Thinking style, ambition, and approach to life" },
            { name: "Nose Profile", desc: "Self-confidence, drive, and social energy" },
            { name: "Jawline & Chin", desc: "Determination, resilience, and decision-making" },
            { name: "Facial Symmetry", desc: "Balance across different life dimensions" },
            { name: "Expression Lines", desc: "Tendencies and emotional patterns" },
          ].map((item) => (
            <div key={item.name} className="glass-card rounded-xl p-5 flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-lavender mt-2 flex-shrink-0" />
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
            See What Your Face Reveals
          </h2>
          <p className="text-text-secondary mb-8">
            Take a selfie. Discover what makes you, you.
          </p>
          <Link href="/face-reading/upload">
            <Button size="lg">Start Your Free Reading</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
