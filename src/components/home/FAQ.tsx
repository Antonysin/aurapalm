"use client";

import { Accordion } from "@/components/ui/Accordion";
import { Sparkles } from "lucide-react";

const faqItems = [
  {
    question: "How does AI palm reading work?",
    answer:
      "You upload a photo of your palm, and our AI model analyzes the lines, shapes, and mounts using computer vision. It identifies key features like your life line, heart line, head line, and fate line, then generates a personalized reading based on centuries of palmistry tradition enhanced by modern psychological insights.",
  },
  {
    question: "Is my photo stored or shared?",
    answer:
      "Never. Your image is uploaded securely, processed by the AI (which takes a few seconds), and then permanently deleted from our servers within one hour. We do not store, share, or use your photo for any other purpose. See our Privacy Policy for full details.",
  },
  {
    question: "How accurate are the readings?",
    answer:
      "Our AI is trained on thousands of palmistry interpretations and psychological profiling patterns. Users consistently report that readings feel remarkably personal and accurate. That said, AuraPalm is designed for entertainment and self-reflection — think of it as a tool for insight, not a scientific diagnostic.",
  },
  {
    question: "What's the difference between left and right hand?",
    answer:
      "In palmistry tradition, the left hand represents your innate potential and what you were born with, while the right hand shows what you've made of it — your current life path and choices. For the most complete reading, we analyze both. If you only upload one, we default to your dominant hand.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Absolutely. We offer a 7-day money-back guarantee, no questions asked. If you're not happy with your reading, just email us or use the refund option in your dashboard, and we'll process it within 5–10 business days.",
  },
  {
    question: "What's the difference between a palm and face reading?",
    answer:
      "A palm reading focuses on the lines, shapes, and mounts of your hand to reveal personality traits, emotional tendencies, and life patterns. A face reading analyzes your facial features — eyes, brows, nose, jawline — for complementary insights. The combined bundle gives you the most complete picture.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "You can try a free preview without an account. To unlock your full report, you'll need to create an account and complete payment. This lets you save your reading, access it from any device, and manage your subscription or purchase history.",
  },
  {
    question: "What kind of photo should I upload?",
    answer:
      "For palm reading: a clear photo of your palm facing up, fingers slightly spread, in natural daylight. Avoid flash — it washes out the lines. For face reading: a front-facing photo with good, even lighting, no sunglasses, and a neutral expression.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender/8 border border-lavender/15 mb-6">
            <Sparkles size={14} className="text-lavender" />
            <span className="text-xs font-medium text-lavender uppercase tracking-wider font-accent">
              Got Questions?
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
