import type { Metadata } from "next";
import "./globals.css";

// ── SEO Metadata (rendered server-side into <head>) ────────────────────────

const SITE_NAME = "LaTeX Formula Converter";
const SITE_URL = "https://yourusername.github.io/LatexFormulaConverter"; // ← change to your GitHub username

const TITLE = "LaTeX to Word Converter – Convert Math Formulas Online Free";
const DESCRIPTION =
  "Free online LaTeX formula converter. Convert LaTeX math equations from ChatGPT, Gemini, Copilot to Word-compatible Unicode instantly. Supports fractions, integrals, Greek letters, matrices, and 200+ commands. No signup required.";

const KEYWORDS = [
  // Primary
  "latex to word converter",
  "convert latex to word online free",
  "latex formula converter",
  "latex equation to word",
  "latex to unicode converter",
  // Secondary
  "math formula converter online",
  "chatgpt latex to word",
  "gemini latex formula converter",
  "copilot latex converter",
  "latex to microsoft word",
  "online latex equation converter",
  "latex math symbols converter",
  "latex to text converter",
  "convert math formula to word",
  "latex unicode converter",
  // Long-tail
  "how to convert latex to word",
  "copy latex formula to word document",
  "latex fraction to word",
  "latex greek letters converter",
  "latex integral converter",
  "latex matrix to word",
  "paste latex in word",
  "ai formula to word converter",
  "latex equation editor online",
  "free latex converter no signup",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Technology",
  classification: "Math Tools",
  applicationName: SITE_NAME,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LaTeX to Word Formula Converter — convert math equations instantly",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@yourusername",   // ← optional: your Twitter handle
  },

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  verification: {
    // google: "your-google-search-console-verification-id", // ← add after deploying
    // yandex: "yandex-verification-id",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for Google Fonts performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="bg-grid" aria-hidden="true" />
        <div className="bg-glow glow-1" aria-hidden="true" />
        <div className="bg-glow glow-2" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
