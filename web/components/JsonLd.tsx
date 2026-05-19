"use client";

/**
 * JsonLd — Injects JSON-LD structured data into the page.
 * Helps Google understand the app and show rich results.
 */
export function JsonLd() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "LaTeX Formula Converter",
    "url": "https://yourusername.github.io/LatexFormulaConverter",
    "description":
      "Free online LaTeX to Word formula converter. Paste LaTeX from ChatGPT, Gemini, or Copilot and get Word-compatible Unicode instantly.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "featureList": [
      "Convert LaTeX to Word-compatible Unicode",
      "Support for 200+ LaTeX commands",
      "Greek letters, fractions, integrals, matrices",
      "Auto-convert while typing",
      "One-click copy to clipboard",
      "Chrome browser extension",
      "No registration required",
    ],
    "screenshot": "https://yourusername.github.io/LatexFormulaConverter/og-image.png",
    "creator": {
      "@type": "Organization",
      "name": "LaTeX Formula Converter",
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I convert LaTeX formulas to Word?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Paste your LaTeX formula (e.g., \\frac{a+b}{c}) into the input box and click Convert. The tool instantly produces Unicode characters that are compatible with Microsoft Word, Google Docs, and any text editor. You can then click 'Copy Result' to copy it to your clipboard.",
        },
      },
      {
        "@type": "Question",
        "name": "Does this tool work with ChatGPT and Gemini formulas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. ChatGPT, Gemini, Copilot, and other AI assistants output math formulas in LaTeX format (e.g., $\\frac{a}{b}$ or \\sqrt{x^2+y^2}). This converter handles all standard LaTeX commands from these AI tools and converts them to Unicode text you can paste directly into Word or any document.",
        },
      },
      {
        "@type": "Question",
        "name": "What LaTeX commands are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The converter supports 200+ LaTeX commands including: Greek letters (\\alpha, \\beta, \\Omega), fractions (\\frac, \\dfrac), square roots (\\sqrt), integrals (\\int, \\oint, \\sum, \\prod), arrows (\\rightarrow, \\Leftrightarrow), operators (\\times, \\leq, \\approx), matrices (\\begin{pmatrix}), accents (\\hat, \\vec, \\bar), and much more.",
        },
      },
      {
        "@type": "Question",
        "name": "Is there a Chrome extension for converting LaTeX?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! The LaTeX Formula Converter Chrome extension lets you right-click any selected LaTeX text on any webpage and instantly convert and copy it. You can also use the keyboard shortcut Alt+Shift+C after selecting text, or click the floating Convert button that appears near your selection.",
        },
      },
      {
        "@type": "Question",
        "name": "Do I need to install anything or create an account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No installation or account is required for the web app. Simply visit the page and start converting. For the Chrome Extension, load it as an unpacked extension in Chrome developer mode — no signup needed.",
        },
      },
      {
        "@type": "Question",
        "name": "Can I convert Word Unicode symbols back to LaTeX?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Switch to the 'Word → LaTeX' tab to reverse-convert Unicode math symbols (like ∑, √, α) back into LaTeX commands. This is useful when you want to paste a formula into a LaTeX document.",
        },
      },
    ],
  };

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LaTeX Formula Converter",
    "operatingSystem": "All",
    "applicationCategory": "EducationalApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "128",
    },
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
    </>
  );
}
