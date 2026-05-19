"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "How do I convert LaTeX formulas to Word?",
    a: `Paste your LaTeX formula (e.g., <code>\\frac{a+b}{c}</code>) into the input box and click Convert (or just stop typing for auto-convert). The tool instantly produces Unicode characters compatible with Microsoft Word, Google Docs, and any text editor. Click "Copy Result" to copy to clipboard.`,
  },
  {
    q: "Does this work with ChatGPT, Gemini, and Copilot formulas?",
    a: "Yes. AI assistants like ChatGPT, Gemini, and Copilot output math formulas in LaTeX format. This converter handles all standard LaTeX commands from these AI tools and converts them to Unicode text you can paste directly into Word or any document.",
  },
  {
    q: "What LaTeX commands are supported?",
    a: `200+ commands including: Greek letters (<code>\\alpha</code>, <code>\\Omega</code>), fractions (<code>\\frac</code>, <code>\\dfrac</code>), roots (<code>\\sqrt</code>), integrals (<code>\\int</code>, <code>\\sum</code>, <code>\\prod</code>), arrows (<code>\\rightarrow</code>, <code>\\Leftrightarrow</code>), operators (<code>\\times</code>, <code>\\leq</code>, <code>\\approx</code>), matrices (<code>\\begin{pmatrix}</code>), accents (<code>\\hat</code>, <code>\\vec</code>), and more.`,
  },
  {
    q: "Is there a Chrome extension for right-click converting?",
    a: "Yes! The Chrome extension lets you right-click any selected LaTeX text on any webpage and instantly convert & copy it. You can also use Alt+Shift+C keyboard shortcut or click the floating green button that appears when you select LaTeX text.",
  },
  {
    q: "Do I need to install anything or create an account?",
    a: "No installation or account required. The web app works in any browser. For the Chrome Extension, load it as an unpacked extension in Chrome developer mode — no signup needed, completely free.",
  },
  {
    q: "Can I convert Word Unicode symbols back to LaTeX?",
    a: 'Yes. Switch to the "Word → LaTeX" tab to reverse-convert Unicode math symbols (∑, √, α…) back into LaTeX commands. Useful when editing LaTeX documents.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <h2 className="faq-title" id="faq-heading">
        Frequently Asked Questions
      </h2>

      {FAQS.map((faq, i) => (
        <div
          key={i}
          className={`faq-item${openIndex === i ? " open" : ""}`}
        >
          <button
            className="faq-q"
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
            id={`faq-question-${i}`}
          >
            <span>{faq.q}</span>
            <svg
              className="faq-chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div
            className="faq-a"
            id={`faq-answer-${i}`}
            role="region"
            aria-labelledby={`faq-question-${i}`}
            dangerouslySetInnerHTML={{ __html: faq.a }}
          />
        </div>
      ))}
    </section>
  );
}
