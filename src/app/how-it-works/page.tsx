import type { Metadata } from "next";
import { Section } from "@/components/ui/Card";
import { Shield, Zap, FileText, CreditCard, Download, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how AuraPalm works — from uploading your photo to receiving your deeply personal AI-powered reading.",
};

const steps = [
  {
    icon: Zap,
    title: "1. Upload Your Photo",
    description:
      "Take a clear photo of your palm or face and upload it. The process takes less than 10 seconds. Your image is encrypted during upload and never stored on our servers.",
  },
  {
    icon: RefreshCw,
    title: "2. AI Analysis",
    description:
      "Our AI model analyzes your unique features — identifying palm lines, hand shapes, facial features, and symmetry. It cross-references these with thousands of palmistry and physiognomy patterns.",
  },
  {
    icon: FileText,
    title: "3. Receive Your Free Preview",
    description:
      "Within 60 seconds, you'll receive a free preview of your reading — enough to see how personal and detailed it is. No account required for this step.",
  },
  {
    icon: CreditCard,
    title: "4. Unlock Your Full Report",
    description:
      "If you'd like the complete reading, unlock the full report for $4.99. You'll get 2,000+ words of beautifully written, deeply personal insights covering all aspects of your life.",
  },
  {
    icon: Download,
    title: "5. Download & Share",
    description:
      "Your full report is available as a downloadable PDF. You can also create shareable insight cards for social media — a great way to spark conversations with friends.",
  },
  {
    icon: Shield,
    title: "Your Privacy, Guaranteed",
    description:
      "Your photo is processed and then permanently deleted within one hour. We don't store, share, or train on your images. Your reading belongs to you, and you can delete your account and data at any time.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="pt-32 pb-8 sm:pt-40 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold">
            How It Works
          </h1>
          <p className="mt-4 text-text-secondary text-lg leading-relaxed">
            From photo to personal reading in under a minute. Here&apos;s exactly what happens.
          </p>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="glass-card rounded-2xl p-6 sm:p-8 flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-gold" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold mb-2">{step.title}</h2>
                  <p className="text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Trust Bar */}
      <Section className="bg-bg-surface/50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-semibold mb-6">
            Ready to Discover Yourself?
          </h2>
          <p className="text-text-secondary mb-8">
            No account needed. No commitment. Just upload and see what your features reveal.
          </p>
          <a
            href="/palm-reading/upload"
            className="inline-flex items-center px-8 py-3.5 rounded-lg text-base font-semibold text-bg-base transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #d4a853, #a07830)",
            }}
          >
            Start Your Free Reading
          </a>
        </div>
      </Section>
    </>
  );
}
