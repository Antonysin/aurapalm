import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Card";
import { BookOpen, Eye, Hand, Heart, Brain, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Learn About Palm & Face Reading",
  description:
    "Explore our comprehensive guides to palm reading and face reading. Learn about the life line, heart line, head line, fate line, and more.",
};

const guides = [
  {
    title: "The Complete Palm Reading Guide",
    href: "/learn/palm-reading-guide",
    icon: BookOpen,
    description: "Everything you need to know to start reading palms.",
  },
  {
    title: "Face Reading: A Beginner's Guide",
    href: "/learn/face-reading-guide",
    icon: Eye,
    description: "Learn the basics of physiognomy and facial interpretation.",
  },
  {
    title: "The Life Line Explained",
    href: "/learn/life-line",
    icon: Hand,
    description: "What your life line reveals about vitality and life changes.",
  },
  {
    title: "The Heart Line Explained",
    href: "/learn/heart-line",
    icon: Heart,
    description: "Discover your emotional style through your heart line.",
  },
  {
    title: "The Head Line Explained",
    href: "/learn/head-line",
    icon: Brain,
    description: "How your head line reflects your thinking patterns.",
  },
  {
    title: "The Fate Line: Does Everyone Have One?",
    href: "/learn/fate-line",
    icon: Compass,
    description: "Understanding your fate line and what it means for your path.",
  },
];

export default function LearnPage() {
  return (
    <>
      <section className="pt-32 pb-8 sm:pt-40 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold">
            Learn Palm & Face Reading
          </h1>
          <p className="mt-4 text-text-secondary text-lg leading-relaxed">
            Deepen your understanding of palmistry and face reading traditions.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((g) => {
            const Icon = g.icon;
            return (
              <Link key={g.href} href={g.href} className="group">
                <div className="surface-card rounded-xl p-6 h-full surface-card-hover">
                  <div className="w-10 h-10 rounded-xl bg-ochre/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={20} className="text-ochre" />
                  </div>
                  <h2 className="font-display text-lg font-semibold mb-2 group-hover:text-ochre transition-colors">
                    {g.title}
                  </h2>
                  <p className="text-sm text-text-secondary">{g.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-bg-surface/50 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-3xl font-semibold mb-4">
            Curious What Your Lines Say?
          </h2>
          <p className="text-text-secondary mb-8">
            Try a free AI-powered reading and see what your unique features reveal.
          </p>
          <Link
            href="/palm-reading/upload"
            className="inline-flex items-center px-8 py-3.5 rounded-lg text-base font-semibold text-bg-base transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #d4a853, #a07830)",
            }}
          >
            Try a Free Reading
          </Link>
        </div>
      </Section>
    </>
  );
}
