"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Palm Reading", href: "/palm-reading" },
  { label: "Face Reading", href: "/face-reading" },
  { label: "Learn", href: "/learn" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-bg-base/85 backdrop-blur-xl" />
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl sm:text-3xl font-display font-semibold terracotta-text tracking-wide">
            AuraPalm
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-terracotta transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/palm-reading/upload"
            className="inline-flex items-center px-6 py-2.5 rounded-full text-sm font-medium text-bg-surface bg-terracotta transition-all duration-300 hover:bg-terracotta-soft hover:-translate-y-0.5"
            style={{
              boxShadow: "0 4px 14px rgba(184, 92, 56, 0.25)",
            }}
          >
            Try Free
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-bg-surface border-b border-border animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-text-secondary hover:text-terracotta transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/palm-reading/upload"
              onClick={() => setIsOpen(false)}
              className="block text-center px-6 py-3 rounded-full text-sm font-medium text-bg-surface bg-terracotta transition-all duration-300 hover:bg-terracotta-soft"
              style={{
                boxShadow: "0 4px 14px rgba(184, 92, 56, 0.25)",
              }}
            >
              Try Free — Read My Palm
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
