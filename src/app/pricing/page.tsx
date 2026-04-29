import type { Metadata } from "next";
import { PricingSnapshot } from "@/components/home/PricingSnapshot";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for AI-powered palm and face readings. Start free, upgrade when you want the full picture.",
  openGraph: {
    title: "Pricing — AuraPalm",
    description:
      "Start free. Upgrade when you want the full picture. Palm readings from $4.99.",
  },
};

export default function PricingPage() {
  return (
    <>
      <section className="pt-32 pb-8 sm:pt-40 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold">
            Choose Your Reading
          </h1>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
            Start with a free preview. Unlock the full picture when you&apos;re ready.
          </p>
        </div>
      </section>
      <PricingSnapshot />

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-center mb-10">
            Payment & Refund Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What payment methods do you accept?",
                a: "We accept Visa, Mastercard, American Express, Apple Pay, and Google Pay. All payments are processed securely through Stripe.",
              },
              {
                q: "How does the 7-day refund policy work?",
                a: "If you're not satisfied with your reading, simply contact us within 7 days of purchase and we'll issue a full refund. No questions asked. Refunds are processed within 5-10 business days.",
              },
              {
                q: "Can I upgrade from a single reading to a subscription?",
                a: "Yes! If you've purchased a single reading and decide you want unlimited access, you can upgrade to a monthly or annual subscription at any time. The cost of your single reading will be credited toward your first month.",
              },
              {
                q: "Is there a free trial for the subscription?",
                a: "Yes, the Unlimited plan includes a 7-day free trial. You won't be charged until the trial ends, and you can cancel anytime during the trial at no cost.",
              },
              {
                q: "Can I purchase a reading as a gift?",
                a: "Absolutely! We offer dedicated gift tiers ($9.99 / $14.99 / $24.99). You can schedule delivery for a specific date, and the recipient receives a beautifully branded email with their unique reading link.",
              },
            ].map((item, i) => (
              <div key={i} className="surface-card rounded-xl p-6">
                <h3 className="font-semibold text-sm mb-2">{item.q}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
