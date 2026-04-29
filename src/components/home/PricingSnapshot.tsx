"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Preview",
    price: "Free",
    description: "Get a taste of what your lines reveal.",
    features: [
      "Summary report (150 words)",
      "3 key personality insights",
      "Free preview of all lines",
    ],
    cta: "Try Free",
    href: "/palm-reading/upload",
    featured: false,
  },
  {
    name: "Full Reading",
    price: "$4.99",
    description: "Your complete personal palm reading.",
    features: [
      "Full report (2,000+ words)",
      "All 4 palm lines analyzed",
      "Complete personality profile",
      "Downloadable PDF",
      "Shareable insight card",
    ],
    cta: "Get My Report",
    href: "#",
    featured: true,
  },
  {
    name: "Complete Bundle",
    price: "$12.99",
    description: "Palm + Face reading with everything included.",
    badge: "BEST VALUE",
    features: [
      "Palm + Face combined report",
      "12-month forward forecast",
      "Priority AI processing",
      "PDF download included",
      "Gift option available",
      "Share card for both readings",
    ],
    cta: "Get Bundle",
    href: "#",
    featured: false,
  },
];

export function PricingSnapshot() {
  return (
    <section className="py-20 sm:py-28 bg-bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-text-secondary text-lg leading-relaxed">
            Start free. Upgrade when you want the full picture.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
              className={`surface-card p-8 relative flex flex-col ${
                plan.featured
                  ? "border-terracotta/30 ring-1 ring-terracotta/10"
                  : ""
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 right-6">{plan.badge}</Badge>
              )}
              <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-display font-light terracotta-text">
                  {plan.price}
                </span>
              </div>
              <p className="mt-2 text-sm text-text-secondary">{plan.description}</p>

              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                    <Check size={16} className="text-sage mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="mt-8 block">
                <Button
                  variant={plan.featured ? "primary" : "secondary"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Subscription Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="surface-card p-8 max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-2 font-accent">
              Unlimited Plan
            </p>
            <p className="font-display text-3xl font-light">
              $9.99<span className="text-base font-body font-normal text-text-secondary">/month</span>
            </p>
            <p className="text-sm text-text-secondary mt-2 mb-6">
              Unlimited readings · Monthly forecast update · All PDFs included · Priority AI processing
            </p>
            <Button variant="secondary">Start 7-Day Free Trial</Button>
          </div>
        </motion.div>

        {/* Guarantee */}
        <div className="mt-8 text-center">
          <p className="text-sm text-text-muted">
            Not satisfied? We&apos;ll refund you. No questions asked.
          </p>
        </div>

        {/* View Full Pricing */}
        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="text-sm text-terracotta hover:text-terracotta-soft transition-colors underline underline-offset-4"
          >
            View full pricing details &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
