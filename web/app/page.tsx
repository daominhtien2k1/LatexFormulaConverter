import { ConverterPanel } from "@/components/ConverterPanel";
import { FaqSection } from "@/components/FaqSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { JsonLd } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <>
      {/* JSON-LD structured data for Google rich results */}
      <JsonLd />

      <div className="wrapper">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="site-header">
          <div className="logo">
            <span className="logo-icon" aria-hidden="true">𝑓</span>
            <div>
              {/* h1 — only one per page, keyword-rich */}
              <h1 className="logo-title">
                LaTeX Formula Converter
              </h1>
              <p className="logo-sub">
                Convert Gemini / ChatGPT formulas to Word-ready Unicode
              </p>
            </div>
          </div>
        </header>

        {/* ── Converter (client component — all interactivity) ─────────── */}
        <ConverterPanel />

        {/* ── Supported features grid (static SSR — SEO content) ──────── */}
        <FeaturesSection />

        {/* ── FAQ accordion (good for Featured Snippets) ───────────────── */}
        <FaqSection />

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="site-footer">
          <p>
            LaTeX Formula Converter &nbsp;•&nbsp;
            Free online tool &nbsp;•&nbsp;
            Works with ChatGPT, Gemini, Copilot &nbsp;•&nbsp;
            <a href="https://github.com/yourusername/LatexFormulaConverter" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
          <p style={{ marginTop: "6px" }}>
            Supports 200+ LaTeX commands &nbsp;•&nbsp;
            No signup required &nbsp;•&nbsp;
            Open source
          </p>
        </footer>
      </div>
    </>
  );
}
