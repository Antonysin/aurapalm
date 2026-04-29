import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/Toast";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AuraPalm — AI-Powered Palm & Face Reading",
    template: "%s | AuraPalm",
  },
  description:
    "Upload a photo of your palm or face and receive a deeply personal AI-generated reading. Discover what your lines reveal about your personality, love, career, and life path.",
  keywords: [
    "palm reading",
    "face reading",
    "AI palm reading",
    "palmistry",
    "personality test",
    "self discovery",
  ],
  openGraph: {
    title: "AuraPalm — AI-Powered Palm & Face Reading",
    description:
      "Upload a photo. Discover yourself. AI-powered readings ready in 60 seconds.",
    url: "https://aurapalm.com",
    siteName: "AuraPalm",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuraPalm — AI-Powered Palm & Face Reading",
    description:
      "Upload a photo. Discover yourself. AI-powered readings ready in 60 seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "application-ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "AuraPalm",
      url: "https://aurapalm.com",
      description:
        "AI-powered palm and face readings. Personal, private, and ready in 60 seconds.",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://aurapalm.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
