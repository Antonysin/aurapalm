"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "I was skeptical, but the reading described my personality so accurately it gave me chills. The part about my career was especially spot-on.",
    name: "Emma R.",
    location: "London, UK",
    rating: 5,
  },
  {
    quote:
      "Got this as a gift and ended up buying the full bundle. The depth of the analysis surprised me — way beyond what I expected from an AI.",
    name: "James K.",
    location: "Austin, TX",
    rating: 5,
  },
  {
    quote:
      "My heart line reading was uncanny. It described my approach to relationships better than my therapist could.",
    name: "Sofia M.",
    location: "Melbourne, Australia",
    rating: 5,
  },
  {
    quote:
      "I've always been into palmistry, but getting an AI reading added a whole new dimension. Fascinating insights.",
    name: "David L.",
    location: "Vancouver, Canada",
    rating: 5,
  },
  {
    quote:
      "Bought this for a friend's birthday. She sent me her reading screenshot and we ended up talking about it for hours. Unique gift idea.",
    name: "Priya S.",
    location: "Manchester, UK",
    rating: 5,
  },
  {
    quote:
      "The face reading was eerily accurate about my personality type. Even my partner agreed. Highly recommend trying both.",
    name: "Michael T.",
    location: "Berlin, Germany",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(rating)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-ochre"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light">
            Loved by Thousands
          </h2>
          <p className="mt-4 text-text-secondary text-lg leading-relaxed">
            Real stories from people who discovered more about themselves.
          </p>
        </div>

        {/* Scrollable Cards */}
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="surface-card p-6 sm:p-8 min-w-[300px] sm:min-w-[340px] max-w-[340px] flex-shrink-0 snap-start"
            >
              <StarRating rating={t.rating} />
              <div className="mt-4 relative">
                <p className="text-sm text-text-secondary leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-border">
                <p className="text-sm font-medium text-text-primary">
                  {t.name}
                </p>
                <p className="text-xs text-text-muted mt-0.5">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
