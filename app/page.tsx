"use client";

import React, { useMemo, useState } from "react";

// ------------------------------------------------------
// LOIDraft by Intenra — Proof‑of‑Concept UI (React + Tailwind)
// - Single file, default export, production‑ready styling
// - Includes: Landing, Dashboard, LOI Editor with drag‑to‑reorder clauses
// - Export buttons are stubbed (replace with real integrations later)
// ------------------------------------------------------

const DEFAULT_CLAUSES = [
  {
    id: "rent",
    title: "Base Rent",
    body:
      "Tenant shall pay base rent as outlined in the Financial Terms section, subject to annual adjustments if applicable.",
    included: true,
  },
  {
    id: "term",
    title: "Term",
    body:
      "Initial lease term of __ years, commencing upon Delivery of Possession or Substantial Completion, whichever occurs first.",
    included: true,
  },
  {
    id: "ti",
    title: "Tenant Improvements",
    body:
      "Landlord to provide a Tenant Improvement allowance of $__ per RSF, payable per mutually agreed draw schedule.",
    included: true,
  },
  {
    id: "nnn",
    title: "Operating Expenses (NNN)",
    body:
      "Tenant responsible for proportionate share of taxes, insurance, and common area maintenance as further defined herein.",
    included: true,
  },
  {
    id: "options",
    title: "Options",
    body:
      "Tenant to receive __ option(s) to extend at then‑market or fixed rates, with notice periods as mutually agreed.",
    included: true,
  },
  {
    id: "dd",
    title: "Due Diligence",
    body:
      "Tenant shall have a due diligence period of __ days following full execution to inspect title, survey, and property conditions.",
    included: true,
  },
  {
    id: "assignment",
    title: "Assignment/Subletting",
    body:
      "Tenant may assign or sublet subject to Landlord's reasonable consent, not to be unreasonably withheld, conditioned, or delayed.",
    included: false,
  },
  {
    id: "signage",
    title: "Signage",
    body:
      "Tenant shall be entitled to building and monument signage consistent with project standards and applicable codes.",
    included: true,
  },
  {
    id: "commission",
    title: "Commission",
    body:
      "Landlord agrees to pay a real estate commission per a separate commission agreement at execution of lease.",
    included: true,
  },
];

function classNames(...cn) {
  return cn.filter(Boolean).join(" ");
}

export default function App() {
  const [route, setRoute] = useState("home");
  const [tenant, setTenant] = useState("Acme Retail LLC");
  const [locationName, setLocationName] = useState("123 Main Street, Orlando FL");
  const [author, setAuthor] = useState("LOIDraft by Intenra");
  const [clauses, setClauses] = useState(DEFAULT_CLAUSES);
  const [dragId, setDragId] = useState(null);

  const orderedClauses = useMemo(
    () => clauses,
    [clauses]
  );

  const onDragStart = (id) => setDragId(id);
  const onDragOver = (e) => e.preventDefault();
  const onDrop = (overId) => {
    if (!dragId || dragId === overId) return;
    const from = clauses.findIndex((c) => c.id === dragId);
    const to = clauses.findIndex((c) => c.id === overId);
    const copy = [...clauses];
    const [moved] = copy.splice(from, 1);
    copy.splice(to, 0, moved);
    setClauses(copy);
    setDragId(null);
  };

  const includedClausesText = useMemo(() => {
    const list = orderedClauses.filter((c) => c.included);
    return list
      .map((c, idx) => `${idx + 1}. ${c.title}\n\n${c.body}`)
      .join("\n\n");
  }, [orderedClauses]);

  const previewDoc = useMemo(() => {
    return `LETTER OF INTENT\n\nTenant: ${tenant}\nLocation: ${locationName}\n\n${includedClausesText}\n\nSincerely,\n${author}`;
  }, [tenant, locationName, includedClausesText, author]);

  function exportStub(kind) {
    alert(`${kind} export is a demo in this prototype. In production, connect DocxTemplater or a PDF service.`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2e3a4b] via-[#2a3545] to-[#232f3e] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/5">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo cluster: LOIDraft logo, small "by", Intenra logo */}
            <div className="flex items-center gap-2">
              <div className="h-7 w-28 bg-white/10 rounded-xl grid place-items-center text-sm font-semibold tracking-wide">
                LOIDraft
              </div>
              <span className="text-sm opacity-80 translate-y-[1px]">by</span>
              <div className="h-6 w-20 bg-white/10 rounded-xl grid place-items-center text-[11px] font-medium opacity-90">
                Intenra
              </div>
            </div>
          </div>
          <nav className="flex items-center gap-1 text-sm">
            <Tab label="Home" active={route === "home"} onClick={() => setRoute("home")} />
            <Tab label="Dashboard" active={route === "dash"} onClick={() => setRoute("dash")} />
            <Tab label="LOI Editor" active={route === "editor"} onClick={() => setRoute("editor")} />
          </nav>
        </div>
      </header>

      {/* Routes */}
      {route === "home" && <Home onGetStarted={() => setRoute("editor")} />}
      {route === "dash" && <Dashboard />}
      {route === "editor" && (
        <main className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column: Inputs and Clause List */}
          <section className="space-y-4">
            <Card>
              <h2 className="text-xl font-semibold">Deal Details</h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Tenant">
                  <input
                    className="w-full rounded-xl bg-white/10 px-3 py-2 outline-none focus:ring ring-white/20"
                    value={tenant}
                    onChange={(e) => setTenant(e.target.value)}
                  />
                </Field>
                <Field label="Location">
                  <input
                    className="w-full rounded-xl bg-white/10 px-3 py-2 outline-none focus:ring ring-white/20"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                  />
                </Field>
                <Field label="Signature Block">
                  <input
                    className="w-full rounded-xl bg-white/10 px-3 py-2 outline-none focus:ring ring-white/20"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </Field>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Clauses</h2>
                <p className="text-xs opacity-80">Drag to reorder. Use the switch to include or hide.</p>
              </div>

              <ul className="mt-4 space-y-2">
                {orderedClauses.map((c) => (
                  <li
                    key={c.id}
                    draggable
                    onDragStart={() => onDragStart(c.id)}
                    onDragOver={onDragOver}
                    onDrop={() => onDrop(c.id)}
                    className={classNames(
                      "group rounded-2xl border border-white/10 bg-white/5 p-3 transition",
                      dragId === c.id ? "ring-2 ring-white/30" : "",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <button
                          className="h-8 w-8 shrink-0 rounded-xl bg-white/10 grid place-items-center cursor-grab active:cursor-grabbing"
                          title="Drag to move"
                        >
                          <GripIcon />
                        </button>
                        <div>
                          <p className="font-semibold leading-tight">{c.title}</p>
                          <p className="text-xs opacity-80">{c.body.slice(0, 80)}{c.body.length > 80 ? "…" : ""}</p>
                        </div>
                      </div>
                      <label className="inline-flex items-center gap-2 text-xs">
                        <span>Include</span>
                        <input
                          type="checkbox"
                          checked={c.included}
                          onChange={(e) => {
                            setClauses((prev) => prev.map((x) => x.id === c.id ? { ...x, included: e.target.checked } : x));
                          }}
                          className="h-4 w-4 accent-white"
                        />
                      </label>
                    </div>
                    <details className="mt-2">
                      <summary className="text-xs opacity-80 cursor-pointer">View text</summary>
                      <textarea
                        value={c.body}
                        onChange={(e) => setClauses((prev) => prev.map((x) => x.id === c.id ? { ...x, body: e.target.value } : x))}
                        className="mt-2 w-full rounded-xl bg-white/10 p-3 text-sm outline-none focus:ring ring-white/20"
                        rows={4}
                      />
                    </details>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button onClick={() => exportStub("DOCX")} className="btn">
                  Export DOCX
                </button>
                <button onClick={() => exportStub("PDF")} className="btn btn-secondary">
                  Export PDF
                </button>
              </div>
            </Card>
          </section>

          {/* Right column: Live Preview */}
          <section className="space-y-4">
            <Card>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Preview</h2>
                <span className="text-xs opacity-80">Auto updates as you edit</span>
              </div>
              <div className="mt-3 rounded-2xl bg-white/90 text-[#1c2430] p-5 shadow-xl">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">{previewDoc}</pre>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold">Tips</h3>
              <ul className="mt-3 space-y-2 text-sm opacity-90 list-disc pl-5">
                <li>Drag the grip icon to change clause order.</li>
                <li>Uncheck a clause to hide it from the document.</li>
                <li>Click Export when you are ready to generate the LOI.</li>
              </ul>
            </Card>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="mt-12 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm opacity-80 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Intenra. All rights reserved.</p>
          <p>Prototype UI. For demonstration only.</p>
        </div>
      </footer>
    </div>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-3 py-1.5 rounded-xl",
        active ? "bg-white/20" : "hover:bg-white/10"
      )}
    >
      {label}
    </button>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">{children}</div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="text-xs opacity-80 mb-1">{label}</div>
      {children}
    </label>
  );
}

function GripIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 opacity-90">
      <path fill="currentColor" d="M7 9h2V7H7v2zm4 0h2V7h-2v2zm4 0h2V7h-2v2zM7 13h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM7 17h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2z"/>
    </svg>
  );
}

function Home({ onGetStarted }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] opacity-80">Commercial Real Estate</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
            Draft professional LOIs in minutes
          </h1>
          <p className="mt-4 text-white/90 text-base md:text-lg max-w-prose">
            LOIDraft lets you structure, reorder, and export clean Letters of Intent quickly. Built for brokers and developers who need speed and consistency.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={onGetStarted} className="btn text-base">Open the LOI Editor</button>
            <a href="#learn" className="inline-flex items-center gap-2 text-sm hover:underline">
              Learn more
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/></svg>
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 text-sm opacity-90">
            <Stat kpi="< 10 min" label="to first LOI" />
            <Stat kpi="> 90%" label="clause coverage" />
            <Stat kpi="DOCX + PDF" label="export ready" />
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="rounded-2xl bg-white/90 text-[#1c2430] p-5">
            <div className="text-xs uppercase tracking-widest text-[#64748b]">Live Preview</div>
            <div className="mt-2 text-xl font-bold">LOI Editor Mock</div>
            <ul className="mt-3 space-y-2 text-sm list-disc pl-5">
              <li>Drag to reorder clauses</li>
              <li>Toggle include or hide</li>
              <li>Export to DOCX or PDF</li>
            </ul>
            <div className="mt-4 h-24 rounded-xl bg-[#f3f5f7] grid place-items-center text-[#475569] text-sm">
              Preview area
            </div>
          </div>
        </div>
      </div>

      <section id="learn" className="mt-20 grid md:grid-cols-3 gap-4">
        <Feature title="Fast" text="Enter deal details and generate a clean LOI without retyping common clauses."/>
        <Feature title="Flexible" text="Reorder clauses and hide sections to match each negotiation."/>
        <Feature title="Professional" text="Export DOCX and PDF with your branding and formatting."/>
      </section>
    </main>
  );
}

function Dashboard() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-2xl font-bold">Your LOIs</h2>
      <p className="mt-2 text-white/80">This prototype shows how saved LOIs would appear once persistence is wired up.</p>
      <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm opacity-80">Oct {10 + i}, 2025</p>
            <h3 className="mt-1 font-semibold">Sample LOI #{i}</h3>
            <p className="text-sm opacity-80">Tenant: Demo Retail</p>
            <div className="mt-3 flex items-center gap-2">
              <button className="btn btn-secondary">View</button>
              <button className="btn">Download</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function Feature({ title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm opacity-80">Feature</div>
      <div className="mt-1 text-lg font-semibold">{title}</div>
      <p className="mt-2 text-sm opacity-90">{text}</p>
    </div>
  );
}

function Stat({ kpi, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-lg font-semibold">{kpi}</div>
      <div className="text-xs opacity-80">{label}</div>
    </div>
  );
}

// Tailwind utility buttons
const btnBase = "inline-flex items-center justify-center rounded-xl px-3.5 py-2.5 text-sm font-semibold shadow hover:shadow-lg transition";
function ButtonBase({ children, className }) {
  return <button className={classNames(btnBase, className)}>{children}</button>;
}

// Extend global styles inside the component file (scoped via Tailwind classes in this environment)
const style = `
.btn { @apply inline-flex items-center justify-center rounded-xl px-3.5 py-2.5 text-sm font-semibold bg-white text-[#1c2430] hover:bg-white/90 active:scale-[0.98] transition; }
.btn-secondary { @apply bg-white/10 text-white hover:bg-white/20; }
`;

// Inject style tag
if (typeof document !== "undefined" && !document.getElementById("loidraft-styles")) {
  const s = document.createElement("style");
  s.id = "loidraft-styles";
  s.innerHTML = style;
  document.head.appendChild(s);
}

