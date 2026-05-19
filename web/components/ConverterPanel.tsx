"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { convertLatex, reverseConvert } from "@/lib/converter";
import { ExamplesGrid } from "./ExamplesGrid";

type Mode = "ltw" | "wtl";

export function ConverterPanel() {
  const [mode, setMode] = useState<Mode>("ltw");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [hasResult, setHasResult] = useState(false);
  const [autoConvert, setAutoConvert] = useState(true);
  const [isConverting, setIsConverting] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ── Conversion logic ─────────────────────────────────────────────────────
  const doConvert = useCallback(
    (text: string, currentMode: Mode) => {
      if (!text.trim()) {
        setOutput("");
        setHasResult(false);
        return;
      }
      setIsConverting(true);
      // Use setTimeout so the spinner renders before heavy work
      setTimeout(() => {
        try {
          if (currentMode === "ltw") {
            const { output: result } = convertLatex(text);
            setOutput(result);
            setHasResult(!!result);
          } else {
            const result = reverseConvert(text);
            setOutput(result);
            setHasResult(!!result);
          }
        } finally {
          setIsConverting(false);
        }
      }, 10);
    },
    []
  );

  // ── Debounced auto-convert ────────────────────────────────────────────────
  const scheduleConvert = useCallback(
    (text: string, currentMode: Mode) => {
      if (!autoConvert) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      setIsConverting(true);
      debounceRef.current = setTimeout(() => doConvert(text, currentMode), 500);
    },
    [autoConvert, doConvert]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    scheduleConvert(val, mode);
  };

  // Ctrl+Enter to convert immediately
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      doConvert(input, mode);
    }
  };

  // Recalculate when mode changes
  useEffect(() => {
    if (input) doConvert(input, mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // ── Copy ─────────────────────────────────────────────────────────────────
  const copyResult = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = output;
      ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    showToast();
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1800);
  };

  const showToast = () => {
    setToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastVisible(false), 2200);
  };

  // ── Clear ─────────────────────────────────────────────────────────────────
  const handleClear = () => {
    setInput("");
    setOutput("");
    setHasResult(false);
    inputRef.current?.focus();
  };

  // ── Load example ──────────────────────────────────────────────────────────
  const loadExample = (latex: string) => {
    setMode("ltw");
    setInput(latex);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    doConvert(latex, "ltw");
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    inputRef.current?.focus();
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Mode tabs ───────────────────────────────────────────────── */}
      <nav className="mode-tabs" role="tablist" aria-label="Conversion direction">
        <button
          id="tab-ltw"
          className={`tab-btn${mode === "ltw" ? " active" : ""}`}
          role="tab"
          aria-selected={mode === "ltw"}
          aria-controls="panel-ltw"
          onClick={() => setMode("ltw")}
        >
          LaTeX → Word
        </button>
        <button
          id="tab-wtl"
          className={`tab-btn${mode === "wtl" ? " active" : ""}`}
          role="tab"
          aria-selected={mode === "wtl"}
          aria-controls="panel-wtl"
          onClick={() => setMode("wtl")}
        >
          Word → LaTeX
        </button>
      </nav>

      {/* ── Main card ───────────────────────────────────────────────── */}
      <main className="main-card" id={mode === "ltw" ? "panel-ltw" : "panel-wtl"}>

        {/* Tips bar */}
        <div className="tips-bar" role="note">
          <span className="tips-icon">💡</span>
          <div className="tips-content">
            <strong>Tips: </strong>
            {mode === "ltw" ? (
              <>
                Paste formulas with or without{" "}
                <code className="code-inline">$ … $</code> delimiters &nbsp;•&nbsp;
                Multi-line supported (one formula per line) &nbsp;•&nbsp;
                Press <code className="code-inline">Ctrl+Enter</code> to convert instantly
              </>
            ) : (
              <>
                Paste Unicode math symbols (∑, √, α…) to get LaTeX back &nbsp;•&nbsp;
                Useful when editing LaTeX documents
              </>
            )}
          </div>
        </div>

        {/* Input section */}
        <section aria-label={mode === "ltw" ? "LaTeX input" : "Unicode input"}>
          <div className="section-header">
            <label htmlFor="formula-input" className="section-title">
              {mode === "ltw" ? "LaTeX Input" : "Unicode / Word Input"}
            </label>
            <span className="char-count" aria-live="polite" aria-atomic="true">
              {input.length} {input.length === 1 ? "char" : "chars"}
            </span>
          </div>

          <div className="editor-container">
            <textarea
              id="formula-input"
              ref={inputRef}
              className="formula-editor"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={
                mode === "ltw"
                  ? "Paste LaTeX formula here…\n\nExamples:\n\\frac{a+b}{c} \\times \\sqrt{x^2 + y^2}\nE = mc^2\n\\sum_{i=1}^{n} x_i"
                  : "Paste Unicode math here…\n\nExample: (a+b)/c × √(x² + y²)"
              }
              spellCheck={false}
              aria-label={mode === "ltw" ? "LaTeX formula input" : "Unicode math input"}
              aria-describedby="input-hint"
            />
            <div className="editor-overlay" aria-hidden="true">
              <div className={`spinner${isConverting ? " active" : ""}`} />
            </div>
          </div>
          <p id="input-hint" className="sr-only">
            {autoConvert
              ? "Auto-converts 500ms after you stop typing. Press Ctrl+Enter to convert immediately."
              : "Press the Convert button to convert."}
          </p>
        </section>

        {/* Button row */}
        <div className="btn-row">
          <button
            id="btn-convert"
            className="btn btn-primary"
            onClick={() => {
              if (debounceRef.current) clearTimeout(debounceRef.current);
              doConvert(input, mode);
            }}
            aria-label={mode === "ltw" ? "Convert LaTeX to Word" : "Convert to LaTeX"}
          >
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            Convert
          </button>

          <button
            id="btn-copy"
            className="btn btn-secondary"
            onClick={copyResult}
            disabled={!hasResult}
            aria-label="Copy result to clipboard"
          >
            {copySuccess ? (
              <>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Copy Result
              </>
            )}
          </button>

          <button
            id="btn-clear"
            className="btn btn-ghost"
            onClick={handleClear}
            aria-label="Clear input and output"
          >
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
            </svg>
            Clear
          </button>

          <div className="auto-convert-toggle">
            <input
              type="checkbox"
              id="auto-convert"
              className="toggle-switch"
              checked={autoConvert}
              onChange={(e) => setAutoConvert(e.target.checked)}
            />
            <label htmlFor="auto-convert">Auto-convert</label>
          </div>
        </div>

        {/* Output section */}
        <section aria-label={mode === "ltw" ? "Converted Word output" : "Converted LaTeX output"}>
          <div className="output-wrapper">
            <div className="output-header">
              <span className="section-title">
                Result{" "}
                <span className={`badge${hasResult ? "" : " badge-hidden"}`} aria-hidden={!hasResult}>
                  {mode === "ltw" ? "Word-ready" : "LaTeX"}
                </span>
              </span>
              <button
                className="icon-btn"
                onClick={copyResult}
                disabled={!hasResult}
                title="Copy to clipboard"
                aria-label="Copy result to clipboard"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              </button>
            </div>

            <div
              id="output-area"
              className="output-display"
              aria-live="polite"
              aria-label={mode === "ltw" ? "Converted formula in Word-compatible Unicode" : "Converted LaTeX formula"}
              tabIndex={0}
            >
              {hasResult ? (
                output
              ) : (
                <span className="output-placeholder">
                  {mode === "ltw"
                    ? "Your Word-compatible formula will appear here…"
                    : "LaTeX formula will appear here…"}
                </span>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Toast notification */}
      <div
        className={`copy-toast${toastVisible ? " show" : ""}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        ✅ Copied to clipboard!
      </div>

      {/* Examples grid (passes callback to load formula into input) */}
      <ExamplesGrid onSelect={loadExample} />

      {/* Screen reader only helper class */}
      <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`}</style>
    </>
  );
}
