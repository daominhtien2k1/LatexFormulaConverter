"use client";
import { EXAMPLE_FORMULAS } from "@/lib/converter";

interface ExamplesGridProps {
  onSelect: (latex: string) => void;
}

export function ExamplesGrid({ onSelect }: ExamplesGridProps) {
  return (
    <section className="examples-section" aria-labelledby="examples-heading">
      <h2 className="examples-title" id="examples-heading">
        <svg
          className="examples-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        Input Examples
      </h2>

      <div className="examples-grid">
        {EXAMPLE_FORMULAS.map((ex) => (
          <button
            key={ex.label}
            className="example-card"
            onClick={() => onSelect(ex.latex)}
            aria-label={`Load example: ${ex.label}`}
            title={`Click to try: ${ex.label}`}
          >
            <div className="example-label">{ex.label}</div>
            <code className="example-code">{ex.latex}</code>
            <div className="example-result">→ {ex.result}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
