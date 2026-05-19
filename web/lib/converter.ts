/**
 * LaTeX Formula → Word-compatible Unicode Converter (TypeScript)
 * Pure functions — usable in both Next.js Server and Client Components.
 */

// ── Symbol tables ──────────────────────────────────────────────────────────

const GREEK: Record<string, string> = {
  '\\alpha': 'α', '\\beta': 'β', '\\gamma': 'γ', '\\delta': 'δ',
  '\\epsilon': 'ε', '\\varepsilon': 'ε', '\\zeta': 'ζ', '\\eta': 'η',
  '\\theta': 'θ', '\\vartheta': 'ϑ', '\\iota': 'ι', '\\kappa': 'κ',
  '\\lambda': 'λ', '\\mu': 'μ', '\\nu': 'ν', '\\xi': 'ξ',
  '\\pi': 'π', '\\varpi': 'ϖ', '\\rho': 'ρ', '\\varrho': 'ϱ',
  '\\sigma': 'σ', '\\varsigma': 'ς', '\\tau': 'τ', '\\upsilon': 'υ',
  '\\phi': 'φ', '\\varphi': 'φ', '\\chi': 'χ', '\\psi': 'ψ', '\\omega': 'ω',
  '\\Gamma': 'Γ', '\\Delta': 'Δ', '\\Theta': 'Θ', '\\Lambda': 'Λ',
  '\\Xi': 'Ξ', '\\Pi': 'Π', '\\Sigma': 'Σ', '\\Upsilon': 'Υ',
  '\\Phi': 'Φ', '\\Psi': 'Ψ', '\\Omega': 'Ω',
};

const OPERATORS: Record<string, string> = {
  '\\pm': '±', '\\mp': '∓', '\\times': '×', '\\div': '÷',
  '\\cdot': '·', '\\ast': '∗', '\\star': '⋆', '\\circ': '∘',
  '\\bullet': '•', '\\oplus': '⊕', '\\ominus': '⊖', '\\otimes': '⊗',
  '\\oslash': '⊘', '\\odot': '⊙', '\\dagger': '†', '\\ddagger': '‡',
  '\\amalg': '⨿', '\\cap': '∩', '\\cup': '∪', '\\uplus': '⊎',
  '\\sqcap': '⊓', '\\sqcup': '⊔', '\\vee': '∨', '\\wedge': '∧',
  '\\setminus': '∖', '\\wr': '≀',
  '\\leq': '≤', '\\le': '≤', '\\geq': '≥', '\\ge': '≥',
  '\\neq': '≠', '\\ne': '≠', '\\equiv': '≡', '\\sim': '∼',
  '\\simeq': '≃', '\\approx': '≈', '\\cong': '≅', '\\doteq': '≐',
  '\\propto': '∝', '\\prec': '≺', '\\succ': '≻', '\\preceq': '⪯',
  '\\succeq': '⪰', '\\ll': '≪', '\\gg': '≫', '\\subset': '⊂',
  '\\supset': '⊃', '\\subseteq': '⊆', '\\supseteq': '⊇',
  '\\sqsubset': '⊏', '\\sqsupset': '⊐', '\\sqsubseteq': '⊑',
  '\\sqsupseteq': '⊒', '\\in': '∈', '\\ni': '∋', '\\notin': '∉',
  '\\vdash': '⊢', '\\dashv': '⊣', '\\models': '⊨', '\\perp': '⊥',
  '\\mid': '∣', '\\parallel': '∥', '\\smile': '⌣', '\\frown': '⌢',
  '\\asymp': '≍', '\\bowtie': '⋈', '\\Join': '⋈',
};

const ARROWS: Record<string, string> = {
  '\\leftarrow': '←', '\\Leftarrow': '⇐', '\\rightarrow': '→',
  '\\Rightarrow': '⇒', '\\leftrightarrow': '↔', '\\Leftrightarrow': '⇔',
  '\\to': '→', '\\gets': '←', '\\longleftarrow': '⟵',
  '\\Longleftarrow': '⟸', '\\longrightarrow': '⟶', '\\Longrightarrow': '⟹',
  '\\longleftrightarrow': '⟷', '\\Longleftrightarrow': '⟺',
  '\\uparrow': '↑', '\\Uparrow': '⇑', '\\downarrow': '↓',
  '\\Downarrow': '⇓', '\\updownarrow': '↕', '\\Updownarrow': '⇕',
  '\\nearrow': '↗', '\\searrow': '↘', '\\swarrow': '↙', '\\nwarrow': '↖',
  '\\mapsto': '↦', '\\hookleftarrow': '↩', '\\hookrightarrow': '↪',
  '\\leftharpoonup': '↼', '\\leftharpoondown': '↽',
  '\\rightharpoonup': '⇀', '\\rightharpoondown': '⇁',
  '\\rightleftharpoons': '⇌', '\\implies': '⟹', '\\iff': '⟺',
};

const MISC: Record<string, string> = {
  '\\infty': '∞', '\\partial': '∂', '\\nabla': '∇', '\\forall': '∀',
  '\\exists': '∃', '\\nexists': '∄', '\\emptyset': '∅', '\\varnothing': '∅',
  '\\wp': '℘', '\\Re': 'ℜ', '\\Im': 'ℑ', '\\top': '⊤', '\\bot': '⊥',
  '\\angle': '∠', '\\measuredangle': '∡', '\\sphericalangle': '∢',
  '\\triangle': '△', '\\square': '□', '\\diamond': '◇',
  '\\lozenge': '◊', '\\blacksquare': '■', '\\checkmark': '✓',
  '\\neg': '¬', '\\lnot': '¬', '\\complement': '∁',
  '\\hbar': 'ℏ', '\\ell': 'ℓ', '\\imath': 'ı', '\\jmath': 'ȷ',
  '\\aleph': 'ℵ', '\\beth': 'ℶ', '\\gimel': 'ℷ', '\\daleth': 'ℸ',
  '\\ldots': '…', '\\cdots': '⋯', '\\vdots': '⋮', '\\ddots': '⋱',
  '\\therefore': '∴', '\\because': '∵',
  '\\prime': '′', '\\backprime': '‵', '\\degree': '°',
  '\\%': '%', '\\$': '$', '\\&': '&', '\\#': '#',
  '\\{': '{', '\\}': '}', '\\_': '_',
  '\\langle': '⟨', '\\rangle': '⟩',
  '\\lfloor': '⌊', '\\rfloor': '⌋', '\\lceil': '⌈', '\\rceil': '⌉',
  '\\|': '‖', '\\backslash': '\\',
  '\\mathbb{N}': 'ℕ', '\\mathbb{Z}': 'ℤ', '\\mathbb{Q}': 'ℚ',
  '\\mathbb{R}': 'ℝ', '\\mathbb{C}': 'ℂ', '\\mathbb{P}': 'ℙ',
};

const FUNCTIONS = new Set([
  'sin','cos','tan','cot','sec','csc','arcsin','arccos','arctan',
  'sinh','cosh','tanh','log','ln','lg','exp','det','dim','ker',
  'max','min','sup','inf','lim','limsup','liminf','gcd','lcm',
  'deg','arg','sgn','mod','Pr',
]);

const SUPERSCRIPT_MAP: Record<string, string> = {
  '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹',
  'a':'ᵃ','b':'ᵇ','c':'ᶜ','d':'ᵈ','e':'ᵉ','f':'ᶠ','g':'ᵍ','h':'ʰ','i':'ⁱ',
  'j':'ʲ','k':'ᵏ','l':'ˡ','m':'ᵐ','n':'ⁿ','o':'ᵒ','p':'ᵖ','r':'ʳ','s':'ˢ',
  't':'ᵗ','u':'ᵘ','v':'ᵛ','w':'ʷ','x':'ˣ','y':'ʸ','z':'ᶻ',
  'A':'ᴬ','B':'ᴮ','D':'ᴰ','E':'ᴱ','G':'ᴳ','H':'ᴴ','I':'ᴵ','J':'ᴶ',
  'K':'ᴷ','L':'ᴸ','M':'ᴹ','N':'ᴺ','O':'ᴼ','P':'ᴾ','R':'ᴿ','T':'ᵀ',
  'U':'ᵁ','V':'ⱽ','W':'ᵂ',
  '+':'⁺','-':'⁻','=':'⁼','(':'⁽',')':'⁾',
};

const SUBSCRIPT_MAP: Record<string, string> = {
  '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉',
  'a':'ₐ','e':'ₑ','h':'ₕ','i':'ᵢ','j':'ⱼ','k':'ₖ','l':'ₗ','m':'ₘ','n':'ₙ',
  'o':'ₒ','p':'ₚ','r':'ᵣ','s':'ₛ','t':'ₜ','u':'ᵤ','v':'ᵥ','x':'ₓ',
  '+':'₊','-':'₋','=':'₌','(':'₍',')':'₎',
};

// ── Helpers ────────────────────────────────────────────────────────────────

function toSuperscript(str: string): string {
  return [...str].map(c => SUPERSCRIPT_MAP[c] ?? c).join('');
}

function toSubscript(str: string): string {
  return [...str].map(c => SUBSCRIPT_MAP[c] ?? c).join('');
}

interface Group { content: string; rest: string }

function extractGroup(s: string): Group {
  s = s.trimStart();
  if (s[0] === '{') {
    let depth = 0, i = 0;
    for (; i < s.length; i++) {
      if (s[i] === '{') depth++;
      else if (s[i] === '}') { depth--; if (depth === 0) { i++; break; } }
    }
    return { content: s.slice(1, i - 1), rest: s.slice(i) };
  }
  const m = s.match(/^(\\[a-zA-Z]+|.)/s);
  if (m) return { content: m[1], rest: s.slice(m[0].length) };
  return { content: '', rest: s };
}

// ── Environments ───────────────────────────────────────────────────────────

function handleEnvironments(s: string): string {
  s = s.replace(
    /\\begin\{(p?matrix|b?matrix|vmatrix|Vmatrix|smallmatrix|cases)\}([\s\S]*?)\\end\{\1\}/g,
    (_, type: string, inner: string) => {
      const rows = inner.split('\\\\').map((r: string) => r.trim());
      const open  = type === 'pmatrix' ? '(' : type === 'bmatrix' ? '[' :
                    type === 'vmatrix' ? '|' : type === 'Vmatrix' ? '‖' :
                    type === 'cases'   ? '{' : '';
      const close = type === 'pmatrix' ? ')' : type === 'bmatrix' ? ']' :
                    type === 'vmatrix' ? '|' : type === 'Vmatrix' ? '‖' : '';
      const converted = rows.map((r: string) =>
        r.split('&').map((c: string) => processTokens(c.trim())).join('  ')
      ).join('; ');
      return `${open}${converted}${close}`;
    }
  );
  s = s.replace(/\\begin\{[^}]+\}|\\end\{[^}]+\}/g, '');
  s = s.replace(/&/g, ' ');
  s = s.replace(/\\\\/g, '; ');
  return s;
}

// ── Token processor ────────────────────────────────────────────────────────

function handleCommand(
  cmd: string,
  rest: string,
  advance: (newRest: string) => void
): string | null {
  let s = rest;

  const fontCommands = new Set([
    '\\text','\\mathrm','\\mathit','\\mathbf','\\mathsf','\\mathtt',
    '\\mathcal','\\mathfrak','\\mathbb','\\boldsymbol','\\textbf',
    '\\textit','\\emph','\\operatorname',
  ]);

  if (fontCommands.has(cmd)) {
    const g = extractGroup(s); s = g.rest; advance(s);
    return processTokens(g.content);
  }

  switch (cmd) {
    case '\\frac': case '\\dfrac': case '\\tfrac': case '\\cfrac': {
      const g1 = extractGroup(s); s = g1.rest;
      const g2 = extractGroup(s); s = g2.rest;
      advance(s);
      return `(${processTokens(g1.content)})/(${processTokens(g2.content)})`;
    }
    case '\\sfrac': case '\\nicefrac': {
      const g1 = extractGroup(s); s = g1.rest;
      const g2 = extractGroup(s); s = g2.rest;
      advance(s);
      return `${processTokens(g1.content)}⁄${processTokens(g2.content)}`;
    }
    case '\\sqrt': {
      let degree = '';
      const trimmed = s.trimStart();
      if (trimmed[0] === '[') {
        const bracket = trimmed.indexOf(']');
        degree = trimmed.slice(1, bracket).trim();
        s = trimmed.slice(bracket + 1);
      }
      const g = extractGroup(s); s = g.rest; advance(s);
      const inner = processTokens(g.content);
      if (!degree || degree === '2') return `√(${inner})`;
      if (degree === '3') return `∛(${inner})`;
      if (degree === '4') return `∜(${inner})`;
      return `${toSuperscript(degree)}√(${inner})`;
    }
    case '\\sum': advance(s); return '∑';
    case '\\prod': advance(s); return '∏';
    case '\\coprod': advance(s); return '∐';
    case '\\int': advance(s); return '∫';
    case '\\iint': advance(s); return '∬';
    case '\\iiint': advance(s); return '∭';
    case '\\oint': advance(s); return '∮';
    case '\\hat': { const g = extractGroup(s); s = g.rest; advance(s); return processTokens(g.content) + '̂'; }
    case '\\tilde': { const g = extractGroup(s); s = g.rest; advance(s); return processTokens(g.content) + '̃'; }
    case '\\bar': case '\\overline': { const g = extractGroup(s); s = g.rest; advance(s); return processTokens(g.content) + '̄'; }
    case '\\underline': { const g = extractGroup(s); s = g.rest; advance(s); return '_' + processTokens(g.content) + '_'; }
    case '\\dot': { const g = extractGroup(s); s = g.rest; advance(s); return processTokens(g.content) + '̇'; }
    case '\\ddot': { const g = extractGroup(s); s = g.rest; advance(s); return processTokens(g.content) + '̈'; }
    case '\\vec': { const g = extractGroup(s); s = g.rest; advance(s); return processTokens(g.content) + '⃗'; }
    case '\\check': { const g = extractGroup(s); s = g.rest; advance(s); return processTokens(g.content) + '̌'; }
    case '\\widehat': { const g = extractGroup(s); s = g.rest; advance(s); return processTokens(g.content) + '̂'; }
    case '\\widetilde': { const g = extractGroup(s); s = g.rest; advance(s); return processTokens(g.content) + '̃'; }
    case '\\overbrace': case '\\underbrace': { const g = extractGroup(s); s = g.rest; advance(s); return processTokens(g.content); }
    case '\\overset': case '\\stackrel': {
      const g1 = extractGroup(s); s = g1.rest;
      const g2 = extractGroup(s); s = g2.rest;
      advance(s);
      return `${processTokens(g2.content)}^${processTokens(g1.content)}`;
    }
    case '\\underset': {
      const g1 = extractGroup(s); s = g1.rest;
      const g2 = extractGroup(s); s = g2.rest;
      advance(s);
      return `${processTokens(g2.content)}_${processTokens(g1.content)}`;
    }
    case '\\binom': case '\\dbinom': case '\\tbinom': {
      const g1 = extractGroup(s); s = g1.rest;
      const g2 = extractGroup(s); s = g2.rest;
      advance(s);
      return `C(${processTokens(g1.content)}, ${processTokens(g2.content)})`;
    }
    case '\\not': { const g = extractGroup(s); s = g.rest; advance(s); return processTokens(g.content) + '̸'; }
    case '\\phantom': case '\\vphantom': case '\\hphantom': { const g = extractGroup(s); s = g.rest; advance(s); return ''; }
    case '\\left': case '\\right':
    case '\\bigl': case '\\bigr': case '\\Bigl': case '\\Bigr':
    case '\\biggl': case '\\biggr': case '\\Biggl': case '\\Biggr':
    case '\\big': case '\\Big': case '\\bigg': case '\\Bigg':
      advance(s); return null;
    case '\\,': case '\\:': case '\\;': case '\\!':
    case '\\quad': case '\\qquad': case '\\enspace':
      advance(s); return ' ';
    case '\\displaystyle': case '\\textstyle': case '\\scriptstyle':
    case '\\scriptscriptstyle': case '\\normalsize': case '\\large': case '\\small':
    case '\\limits':
      advance(s); return '';
    case '\\\\': advance(s); return '; ';
    default:
      return null;
  }
}

function processTokens(s: string): string {
  let result = '';
  let i = 0;

  while (i < s.length) {
    if (/\s/.test(s[i])) {
      if (result.length && result[result.length - 1] !== ' ') result += ' ';
      while (i < s.length && /\s/.test(s[i])) i++;
      continue;
    }

    if (s[i] === '\\') {
      const cmdMatch = s.slice(i).match(/^\\([a-zA-Z]+|[^a-zA-Z\s])/);
      if (cmdMatch) {
        const fullCmd = '\\' + cmdMatch[1];
        const rest = s.slice(i + fullCmd.length);
        let advanced = false;
        const advanceFn = (newRest: string) => {
          i = s.length - newRest.length;
          advanced = true;
        };
        const handled = handleCommand(fullCmd, rest, advanceFn);
        if (handled !== null) { result += handled; if (!advanced) i += fullCmd.length; continue; }
        if (advanced) continue;

        const sym = GREEK[fullCmd] ?? OPERATORS[fullCmd] ?? ARROWS[fullCmd] ?? MISC[fullCmd];
        if (sym) { result += sym; i += fullCmd.length; continue; }
        if (FUNCTIONS.has(cmdMatch[1])) { result += cmdMatch[1]; i += fullCmd.length; continue; }
        result += cmdMatch[1]; i += fullCmd.length; continue;
      }
      result += '\\'; i++; continue;
    }

    if (s[i] === '^') {
      i++;
      const { content, rest } = extractGroup(s.slice(i));
      i = s.length - rest.length;
      result += toSuperscript(convertLatexLine(content));
      continue;
    }

    if (s[i] === '_') {
      i++;
      const { content, rest } = extractGroup(s.slice(i));
      i = s.length - rest.length;
      result += toSubscript(convertLatexLine(content));
      continue;
    }

    if (s[i] === '{') {
      let depth = 0, j = i;
      for (; j < s.length; j++) {
        if (s[j] === '{') depth++;
        else if (s[j] === '}') { depth--; if (depth === 0) break; }
      }
      result += processTokens(s.slice(i + 1, j));
      i = j + 1; continue;
    }
    if (s[i] === '}') { i++; continue; }

    result += s[i]; i++;
  }

  return result.trim();
}

function convertLatexLine(input: string): string {
  let s = input.trim();
  s = s.replace(/^\$\$|\$\$$/g, '').replace(/^\$|\$$/g, '');
  s = s.replace(/^\\\[|\\\]$/g, '').replace(/^\\\(|\\\)$/g, '');
  s = s.trim();
  s = handleEnvironments(s);
  return processTokens(s);
}

// ── Public API ─────────────────────────────────────────────────────────────

export interface ConversionResult {
  output: string;
  success: boolean;
  error?: string;
}

export function convertLatex(input: string): ConversionResult {
  if (!input?.trim()) return { output: '', success: true };
  try {
    const output = input
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(convertLatexLine)
      .join('\n');
    return { output, success: true };
  } catch (e) {
    return {
      output: '',
      success: false,
      error: e instanceof Error ? e.message : 'Unknown error',
    };
  }
}

/** Reverse: basic Unicode → LaTeX symbol substitution */
export function reverseConvert(input: string): string {
  const MAP: [RegExp, string][] = [
    [/α/g,'\\alpha'],[/β/g,'\\beta'],[/γ/g,'\\gamma'],[/δ/g,'\\delta'],
    [/ε/g,'\\epsilon'],[/ζ/g,'\\zeta'],[/η/g,'\\eta'],[/θ/g,'\\theta'],
    [/λ/g,'\\lambda'],[/μ/g,'\\mu'],[/ν/g,'\\nu'],[/ξ/g,'\\xi'],
    [/π/g,'\\pi'],[/ρ/g,'\\rho'],[/σ/g,'\\sigma'],[/τ/g,'\\tau'],
    [/φ/g,'\\phi'],[/χ/g,'\\chi'],[/ψ/g,'\\psi'],[/ω/g,'\\omega'],
    [/Γ/g,'\\Gamma'],[/Δ/g,'\\Delta'],[/Θ/g,'\\Theta'],[/Λ/g,'\\Lambda'],
    [/Ξ/g,'\\Xi'],[/Π/g,'\\Pi'],[/Σ/g,'\\Sigma'],[/Ω/g,'\\Omega'],
    [/±/g,'\\pm'],[/×/g,'\\times'],[/÷/g,'\\div'],[/·/g,'\\cdot'],
    [/≤/g,'\\leq'],[/≥/g,'\\geq'],[/≠/g,'\\neq'],[/≈/g,'\\approx'],
    [/≡/g,'\\equiv'],[/∞/g,'\\infty'],[/∂/g,'\\partial'],[/∇/g,'\\nabla'],
    [/∀/g,'\\forall'],[/∃/g,'\\exists'],[/∅/g,'\\emptyset'],
    [/∑/g,'\\sum'],[/∏/g,'\\prod'],[/∫/g,'\\int'],[/∮/g,'\\oint'],
    [/√/g,'\\sqrt'],[/∛/g,'\\sqrt[3]'],[/∜/g,'\\sqrt[4]'],
    [/→/g,'\\rightarrow'],[/←/g,'\\leftarrow'],[/↔/g,'\\leftrightarrow'],
    [/⇒/g,'\\Rightarrow'],[/⇐/g,'\\Leftarrow'],[/⇔/g,'\\Leftrightarrow'],
    [/∈/g,'\\in'],[/∉/g,'\\notin'],[/⊂/g,'\\subset'],[/⊃/g,'\\supset'],
    [/⊆/g,'\\subseteq'],[/⊇/g,'\\supseteq'],[/∩/g,'\\cap'],[/∪/g,'\\cup'],
    [/⁰/g,'^0'],[/¹/g,'^1'],[/²/g,'^2'],[/³/g,'^3'],[/⁴/g,'^4'],
    [/⁵/g,'^5'],[/⁶/g,'^6'],[/⁷/g,'^7'],[/⁸/g,'^8'],[/⁹/g,'^9'],
    [/ⁿ/g,'^n'],[/ˣ/g,'^x'],
    [/₀/g,'_0'],[/₁/g,'_1'],[/₂/g,'_2'],[/₃/g,'_3'],[/₄/g,'_4'],
    [/₅/g,'_5'],[/₆/g,'_6'],[/₇/g,'_7'],[/₈/g,'_8'],[/₉/g,'_9'],
    [/ₙ/g,'_n'],[/ᵢ/g,'_i'],[/ₓ/g,'_x'],
  ];
  let result = input;
  for (const [rx, rep] of MAP) result = result.replace(rx, rep);
  return result;
}

export const EXAMPLE_FORMULAS = [
  { label: 'Fraction + Root',     latex: '\\frac{a+b}{c} \\times \\sqrt{x^2 + y^2}',         result: '(a+b)/(c) × √(x² + y²)' },
  { label: "Einstein's Energy",   latex: 'E = mc^2',                                           result: 'E = mc²' },
  { label: 'Summation',           latex: '\\sum_{i=1}^{n} x_i',                               result: '∑ᵢ₌₁ⁿ xᵢ' },
  { label: 'Gaussian Integral',   latex: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}', result: '∫₋∞^∞ e^(−x²) dx = √(π)' },
  { label: 'Greek Letters',       latex: '\\alpha + \\beta = \\frac{\\gamma}{\\delta} \\cdot \\Omega', result: 'α + β = (γ)/(δ) · Ω' },
  { label: 'Matrix',              latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',  result: '(a  b; c  d)' },
  { label: 'Limit',               latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1',          result: 'lim x → 0 (sin x)/(x) = 1' },
  { label: 'Binomial Coefficient',latex: '\\binom{n}{k} = \\frac{n!}{k!(n-k)!}',             result: 'C(n, k) = (n!)/(k!(n−k)!)' },
] as const;
