import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhatWeAnalyze } from "@/components/home/WhatWeAnalyze";
import { SamplePreview } from "@/components/home/SamplePreview";
import { Testimonials } from "@/components/home/Testimonials";
import { PricingSnapshot } from "@/components/home/PricingSnapshot";
import { FAQ } from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhatWeAnalyze />
      <SamplePreview />
      <Testimonials />
      <PricingSnapshot />
      <FAQ />
    </>
  );
}
