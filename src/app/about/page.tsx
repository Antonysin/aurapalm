import type { Metadata } from "next";
import { Section } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description:
    "AuraPalm combines ancient palmistry and face reading traditions with modern AI to deliver deeply personal self-discovery experiences.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-8 sm:pt-40 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold">
            About AuraPalm
          </h1>
          <p className="mt-4 text-text-secondary text-lg leading-relaxed">
            Bridging ancient wisdom and modern AI for personal discovery.
          </p>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto prose prose-invert">
          <div className="glass-card rounded-2xl p-8 sm:p-10 space-y-6">
            <p className="text-text-secondary leading-relaxed">
              AuraPalm was built on a simple idea: the tools for self-discovery
              should be personal, private, and accessible to anyone.
            </p>
            <p className="text-text-secondary leading-relaxed">
              For centuries, palmists and face readers have helped people
              understand themselves better by interpreting the features they
              were born with. But traditional readings are expensive, hard to
              find, and often feel out of reach.
            </p>
            <p className="text-text-secondary leading-relaxed">
              We&apos;ve combined this ancient practice with cutting-edge AI
              vision technology to deliver readings that are deeply personal,
              beautifully written, and available in under 60 seconds &mdash;
              all from a single photo.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Our AI is trained on thousands of palmistry and physiognomy
              patterns, cross-referenced with psychological profiling frameworks.
              Every reading is unique, written in literary-quality prose &mdash;
              never a generic template.
            </p>
            <div className="pt-4 border-t border-border">
              <h3 className="font-display text-xl font-semibold mb-3">
                Our Principles
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    title: "Privacy First",
                    desc: "Your photo is processed and deleted within one hour. We never store or share your image. No exceptions.",
                  },
                  {
                    title: "Quality Over Quantity",
                    desc: "We'd rather deliver one deeply personal reading than a thousand generic ones. Every report is unique.",
                  },
                  {
                    title: "Accessible to All",
                    desc: "Self-discovery shouldn't be a luxury. Start free, and only pay if you want the full picture.",
                  },
                  {
                    title: "Entertainment with Substance",
                    desc: "We take what we do seriously without taking ourselves too seriously. Our readings are designed for insight and reflection.",
                  },
                ].map((p) => (
                  <li key={p.title} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-text-primary text-sm">{p.title}</strong>
                      <p className="text-sm text-text-secondary">{p.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
