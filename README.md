# 𝑓 LaTeX Formula Converter

Convert LaTeX math formulas (from Gemini, ChatGPT, Copilot…) to **Word-compatible Unicode** — instantly, in your browser.

Built with Next.js + React, deployed as a static site to GitHub Pages.

## Features

- LaTeX → Word Unicode (and reverse: Word → LaTeX)
- Auto-convert while typing
- Copy to clipboard
- Example formula gallery
- FAQ + supported-commands reference

## Supported Conversions

- **Fractions**: `\frac{a}{b}` → `(a)/(b)`
- **Roots**: `\sqrt{x}`, `\sqrt[3]{x}` → `√(x)`, `∛(x)`
- **Greek letters**: `\alpha \beta \Omega` → `α β Ω`
- **Superscripts/Subscripts**: `x^2 y_i` → `x² yᵢ`
- **Operators**: `\times \div \pm \cdot` → `× ÷ ± ·`
- **Relations**: `\leq \geq \neq \approx` → `≤ ≥ ≠ ≈`
- **Arrows**: `\rightarrow \Leftrightarrow` → `→ ⇔`
- **Sums/Integrals**: `\sum \int \prod \oint` → `∑ ∫ ∏ ∮`
- **Accents**: `\hat{x} \vec{v} \bar{x}` → `x̂ v⃗ x̄`
- **Matrices**: `\begin{pmatrix}...\end{pmatrix}` → `(a  b; c  d)`
- **Binomial**: `\binom{n}{k}` → `C(n, k)`
- **Misc**: `\infty \partial \nabla \forall \exists` → `∞ ∂ ∇ ∀ ∃`

## Development

```bash
cd web
npm install
npm run dev      # localhost:3000
npm run build    # static export → web/out/
```

## Deployment

Deployed to Vercel. `vercel.json` at repo root tells Vercel to build from `web/` and serve `web/out/`. Pushing to `main` triggers automatic redeploy.

## Project Structure

```
LatexFormulaConverter/
├── vercel.json           # Vercel build config (cd web && npm run build)
└── web/                  # Next.js app (App Router, TypeScript)
    ├── app/              # Routes (page.tsx, layout.tsx, sitemap, robots)
    ├── components/       # ConverterPanel, ExamplesGrid, FaqSection, etc.
    ├── lib/converter.ts  # Core LaTeX↔Unicode engine
    ├── public/           # Static assets
    └── next.config.ts    # Static export config
```
