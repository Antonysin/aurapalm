import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Palm Reading", href: "/palm-reading" },
    { label: "Face Reading", href: "/face-reading" },
    { label: "Combo Reading", href: "/combo-reading" },
    { label: "Pricing", href: "/pricing" },
    { label: "Gift a Reading", href: "/gift" },
  ],
  Learn: [
    { label: "Palm Reading Guide", href: "/learn/palm-reading-guide" },
    { label: "Face Reading Guide", href: "/learn/face-reading-guide" },
    { label: "The Life Line", href: "/learn/life-line" },
    { label: "The Heart Line", href: "/learn/heart-line" },
    { label: "Blog", href: "/blog" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-display font-semibold terracotta-text tracking-wide">
                AuraPalm
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              AI-powered palm and face readings. Personal, private, and ready in 60 seconds.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {["Instagram", "TikTok", "Pinterest", "X"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-text-muted hover:text-terracotta transition-colors duration-200 text-sm"
                  aria-label={social}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-terracotta transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} AuraPalm. All rights reserved.
          </p>
          <p className="text-xs text-text-muted text-center sm:text-right max-w-lg">
            AuraPalm is for entertainment and self-reflection purposes only. Readings are AI-generated
            and should not be taken as factual statements about your future.
          </p>
        </div>
      </div>
    </footer>
  );
}
