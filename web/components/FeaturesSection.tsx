const FEATURES = [
  { icon: "𝑓", name: "Fractions", desc: "\\frac, \\dfrac, \\tfrac, \\cfrac, \\nicefrac" },
  { icon: "√", name: "Roots", desc: "\\sqrt, \\sqrt[n] — ², ³, ⁴ roots" },
  { icon: "Σ", name: "Operators", desc: "\\sum, \\prod, \\int, \\oint, \\coprod" },
  { icon: "α", name: "Greek Letters", desc: "All 24 lowercase and uppercase Greek letters" },
  { icon: "⁻¹", name: "Superscripts & Subscripts", desc: "Unicode super/subscript for most chars" },
  { icon: "→", name: "Arrows", desc: "25+ arrow variants including double and long arrows" },
  { icon: "≤", name: "Relations", desc: "\\leq, \\geq, \\neq, \\approx, \\equiv and more" },
  { icon: "⎡⎤", name: "Matrices", desc: "pmatrix, bmatrix, vmatrix, cases environments" },
  { icon: "x̂", name: "Accents", desc: "\\hat, \\tilde, \\bar, \\vec, \\dot, \\ddot" },
  { icon: "∞", name: "Misc Symbols", desc: "\\infty, \\partial, \\nabla, \\forall, \\exists" },
  { icon: "ℝ", name: "Number Sets", desc: "\\mathbb{R}, N, Z, Q, C, P" },
  { icon: "C(n,k)", name: "Combinatorics", desc: "\\binom, \\dbinom — binomial coefficients" },
];

export function FeaturesSection() {
  return (
    <section className="features-section" aria-labelledby="features-heading">
      <h2 className="features-title" id="features-heading">
        Supported LaTeX Commands
      </h2>
      <div className="features-grid">
        {FEATURES.map((f) => (
          <article key={f.name} className="feature-item">
            <div className="feature-icon" aria-hidden="true">{f.icon}</div>
            <h3 className="feature-name">{f.name}</h3>
            <p className="feature-desc">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
