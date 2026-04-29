import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "AuraPalm terms of service — the terms governing your use of our AI-powered reading service.",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold mb-8">Terms of Service</h1>
        <div className="surface-card rounded-2xl p-8 sm:p-10 space-y-6 text-sm text-text-secondary leading-relaxed">
          <p><strong className="text-text-primary">Last updated:</strong> April 2026</p>

          <h2 className="font-display text-xl font-semibold text-text-primary pt-4">1. Service Description</h2>
          <p>AuraPalm provides AI-generated palm and face readings for entertainment and self-reflection purposes. Our AI analyzes uploaded images and generates personalized interpretive reports based on palmistry and physiognomy traditions.</p>

          <h2 className="font-display text-xl font-semibold text-text-primary pt-4">2. User Responsibilities</h2>
          <p>By using AuraPalm, you agree to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide accurate and lawful information</li>
            <li>Not upload images that contain other people without their consent</li>
            <li>Not use the service for any illegal purpose</li>
            <li>Not attempt to reverse-engineer or abuse the AI system</li>
            <li>Not upload explicit, violent, or prohibited content</li>
          </ul>

          <h2 className="font-display text-xl font-semibold text-text-primary pt-4">3. Payment Terms</h2>
          <p>All prices are in USD. Payments are processed securely by Stripe. By making a purchase, you authorize Stripe to charge your selected payment method. Single purchases are one-time charges. Subscriptions renew automatically unless cancelled before the renewal date.</p>

          <h2 className="font-display text-xl font-semibold text-text-primary pt-4">4. Refund Policy</h2>
          <p>We offer a 7-day money-back guarantee on all purchases. To request a refund, contact us at support@aurapalm.com. Refunds are processed within 5-10 business days.</p>

          <h2 className="font-display text-xl font-semibold text-text-primary pt-4">5. Intellectual Property</h2>
          <p>Your AI-generated reading belongs to you. You may download, share, and use it as you wish. The AuraPalm service, branding, and technology are our intellectual property.</p>

          <h2 className="font-display text-xl font-semibold text-text-primary pt-4">6. Limitation of Liability</h2>
          <p>AuraPalm provides AI-generated content for entertainment purposes. We make no guarantees about the accuracy, completeness, or relevance of readings. AuraPalm is not liable for any decisions made based on reading content.</p>

          <h2 className="font-display text-xl font-semibold text-text-primary pt-4">7. Contact</h2>
          <p>For support: <strong className="text-text-primary">support@aurapalm.com</strong></p>
        </div>
      </div>
    </div>
  );
}
