import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AuraPalm privacy policy — how we handle your data, images, and personal information.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold mb-8">Privacy Policy</h1>
        <div className="surface-card rounded-2xl p-8 sm:p-10 space-y-6 text-sm text-text-secondary leading-relaxed">
          <p><strong className="text-text-primary">Last updated:</strong> April 2026</p>

          <h2 className="font-display text-xl font-semibold text-text-primary pt-4">1. What We Collect</h2>
          <p>We collect the minimum data necessary to provide our service:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-text-primary">Account information:</strong> Email address and password (if you create an account)</li>
            <li><strong className="text-text-primary">Uploaded images:</strong> Photos of your palm or face submitted for analysis</li>
            <li><strong className="text-text-primary">Payment data:</strong> Processed entirely by Stripe — we never see or store your card details</li>
            <li><strong className="text-text-primary">Usage data:</strong> Anonymous analytics to improve our service</li>
          </ul>

          <h2 className="font-display text-xl font-semibold text-text-primary pt-4">2. How We Handle Your Images</h2>
          <p>Your privacy is our core design principle:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Uploaded images are encrypted in transit and at rest</li>
            <li>Images are sent to our AI provider for analysis only</li>
            <li>Images are permanently deleted within 1 hour of upload</li>
            <li>We do not use your images for training or any other purpose</li>
            <li>No facial recognition data or biometric data is stored</li>
          </ul>

          <h2 className="font-display text-xl font-semibold text-text-primary pt-4">3. Third-Party Services</h2>
          <p>We use the following trusted third-party services:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-text-primary">Stripe:</strong> Payment processing</li>
            <li><strong className="text-text-primary">Claude API (Anthropic):</strong> AI reading generation</li>
            <li><strong className="text-text-primary">Google Analytics &amp; PostHog:</strong> Anonymous usage analytics</li>
            <li><strong className="text-text-primary">Supabase:</strong> Database and authentication</li>
            <li><strong className="text-text-primary">Cloudflare R2:</strong> Temporary image storage (auto-deleted within 1 hour)</li>
            <li><strong className="text-text-primary">Resend:</strong> Transactional email delivery</li>
          </ul>

          <h2 className="font-display text-xl font-semibold text-text-primary pt-4">4. Your Rights (GDPR &amp; CCPA)</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Access all personal data we hold about you</li>
            <li>Request deletion of your account and associated data</li>
            <li>Export your data in a portable format</li>
            <li>Opt out of analytics tracking</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p>To exercise these rights, email us at privacy@aurapalm.com or use the data tools in your dashboard.</p>

          <h2 className="font-display text-xl font-semibold text-text-primary pt-4">5. Cookies</h2>
          <p>We use essential cookies for authentication and security. Analytics and marketing cookies are optional and can be managed via our cookie consent banner.</p>

          <h2 className="font-display text-xl font-semibold text-text-primary pt-4">6. Contact</h2>
          <p>For privacy-related inquiries: <strong className="text-text-primary">privacy@aurapalm.com</strong></p>
        </div>
      </div>
    </div>
  );
}
