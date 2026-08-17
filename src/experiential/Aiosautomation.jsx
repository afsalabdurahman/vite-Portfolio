// AiOsAssistantShowcase.jsx
// -----------------------------------------------------------------------------
// Drop-in showcase card for the "AI OS Assistant" project.
// Zero external deps (icons are inline SVG, no icon package required) — just
// React + Tailwind, so it should paste straight into your existing portfolio.
//
// Behavior: click the card and it swaps to a "process monitor" detail view
// in place (internal useState, no router needed). If you'd rather it be a
// real route, swap `onOpen`/`onBack` for your router's navigate/Link calls.
//
// Next.js App Router: add `"use client";` as the first line of this file,
// since it uses useState.
//
// Edit `project` below to update copy, progress, and proof links (github /
// medium / demo). Any step without a `proof` entry just won't render badges.
// -----------------------------------------------------------------------------

import React, { useState } from 'react';

/* ---------------------------------- Icons --------------------------------- */

const IconArrowLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const IconArrowRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

const IconChevronDown = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const IconCheck = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const IconCode = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 18l6-6-6-6" />
    <path d="M8 6l-6 6 6 6" />
  </svg>
);

const IconDoc = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M9 13h6M9 17h6" />
  </svg>
);

const IconPlay = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M10 8l6 4-6 4V8z" fill="currentColor" stroke="none" />
  </svg>
);

/* ------------------------------- Primitives -------------------------------- */

const COLOR = {
  bg: '#0E1420',
  surface: '#111826',
  surfaceHover: '#141C2C',
  border: '#1E2635',
  borderMuted: '#263047',
  track: '#1D2536',
  text: '#E7ECF3',
  textMuted: '#8593AC',
  done: '#4FD1AE',
  active: '#F0A94E',
  queued: '#5B6B8C',
};

function StatusDot({ status, size = 'sm' }) {
  const color = status === 'done' ? COLOR.done : status === 'active' ? COLOR.active : COLOR.queued;
  const dim = size === 'md' ? 'h-2.5 w-2.5' : 'h-2 w-2';
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center">
      {status === 'active' && (
        <span
          className={`absolute inline-flex ${dim} rounded-full motion-safe:animate-ping`}
          style={{ backgroundColor: color, opacity: 0.6 }}
        />
      )}
      <span className={`relative inline-flex ${dim} rounded-full`} style={{ backgroundColor: color }} />
    </span>
  );
}

function StatusLabel({ status }) {
  const map = {
    done: { text: 'DONE', color: COLOR.done },
    active: { text: 'RUNNING', color: COLOR.active },
    queued: { text: 'QUEUED', color: COLOR.queued },
  };
  const s = map[status];
  return (
    <span className="shrink-0 font-mono text-[11px] tracking-widest" style={{ color: s.color }}>
      {s.text}
    </span>
  );
}

function ProgressBar({ value, color = COLOR.active, height = 'h-1.5' }) {
  return (
    <div className={`w-full ${height} rounded-full overflow-hidden`} style={{ backgroundColor: COLOR.track }}>
      <div
        className="h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: color }}
      />
    </div>
  );
}

/* ------------------------------ Progress math ------------------------------ */
// done = 100, active = explicit progress (or 50 if unset), queued = 0.
// Averaged bottom-up: steps -> phase, phases -> module, modules -> overall.

function leafValue(status, progress) {
  if (status === 'done') return 100;
  if (status === 'active') return typeof progress === 'number' ? progress : 50;
  return 0;
}

function phaseValue(phase) {
  if (phase.steps && phase.steps.length) {
    const sum = phase.steps.reduce((acc, s) => acc + leafValue(s.status, s.progress), 0);
    return sum / phase.steps.length;
  }
  return leafValue(phase.status, phase.progress);
}

function moduleValue(module) {
  if (module.phases && module.phases.length) {
    const sum = module.phases.reduce((acc, p) => acc + phaseValue(p), 0);
    return sum / module.phases.length;
  }
  return leafValue(module.status, module.progress);
}

function moduleTopStatus(module) {
  const v = moduleValue(module);
  if (v >= 100) return 'done';
  if (v > 0) return 'active';
  return 'queued';
}

/* --------------------------------- Content ---------------------------------- */
// Edit freely. `proof` links only render once you fill them in.

const project = {
  name: 'AI OS Assistant',
  description:
    'An agent that runs your computer for you — browses, fills forms, extracts data, finishes tasks, and drives desktop apps, all from one plain-language instruction.',
  tags: ['Playwright', 'LLM Agents', 'Computer Use'],
  modules: [
    {
      id: 'web-automation',
      pid: '01',
      title: 'Web Automation',
      description: 'Browser agents built on Playwright that navigate sites and act on them autonomously.',
      tags: ['Playwright'],
      phases: [
        {
          id: 'phase-1',
          label: 'Phase 1',
          title: 'Form-Filling Agent',
          steps: [
            {
              name: 'Form Filling Agent',
              status: 'done',
              proof: {
                github: "https://github.com/afsalabdurahman/ai-os-assistant/tree/feat/formfilling_agent/apps", // TODO: replace with your repo URL
                medium: '#', // TODO: replace with your write-up URL
                demo: "https://lnkd.in/p/g3sGDG-4", // TODO: replace with your demo video URL
              },
            },
            { name: 'Interactive Form Filling', status: 'active', progress: 30 },
            { name: 'Smart Form Filling', status: 'queued' },
            {
              name: 'Fully Automated Form Filling',
              detail: 'Anti-detection, stealth rotation, human-like timing, and seeded personas — unifies every earlier phase into one pipeline.',
              status: 'queued',
            },
          ],
        },
        {
          id: 'phase-2',
          label: 'Phase 2',
          title: 'Data Extraction Aggregator',
          status: 'queued',
        },
        {
          id: 'phase-3',
          label: 'Phase 3',
          title: 'Task Completion',
          detail: 'End-to-end goals carried out autonomously — book a hotel, buy a flight, and similar multi-step jobs.',
          status: 'queued',
        },
      ],
    },
    {
      id: 'desktop-automation',
      pid: '02',
      title: 'Desktop Automation',
      description: 'Instruction-driven control of native apps — open, click, scroll, type, and read the screen the way a person would.',
      status: 'queued',
    },
    {
      id: 'module-3',
      pid: '03',
      title: 'Module 3',
      description: 'Reserved slot — scope isn\u2019t locked yet. Details land here once it\u2019s defined.',
      status: 'queued',
    },
    {
      id: 'multi-agent',
      pid: '04',
      title: 'Multi-Agent Orchestration',
      description: 'Several agents split a goal, plan around each other, and carry it out together.',
      status: 'queued',
    },
    {
      id: 'self-healing',
      pid: '05',
      title: 'Self-Healing & Monitoring',
      description: 'Watches every running agent, catches failures, and recovers without a human stepping in.',
      status: 'queued',
    },
  ],
};

/* ----------------------------- Composed pieces ------------------------------ */

function ProofLinks({ proof }) {
  if (!proof) return null;
  const items = [];
  if (proof.github) items.push({ key: 'github', href: proof.github, label: 'View repo', Icon: IconCode });
  if (proof.medium) items.push({ key: 'medium', href: proof.medium, label: 'Read the write-up', Icon: IconDoc });
  if (proof.demo) items.push({ key: 'demo', href: proof.demo, label: 'Watch demo', Icon: IconPlay });
  if (!items.length) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {items.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ borderColor: COLOR.borderMuted, backgroundColor: COLOR.bg, color: '#C7D0E0' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLOR.done; e.currentTarget.style.color = COLOR.done; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLOR.borderMuted; e.currentTarget.style.color = '#C7D0E0'; }}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </a>
      ))}
    </div>
  );
}

function StepRow({ step }) {
  return (
    <li className="py-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5">
            {step.status === 'done' ? (
              <IconCheck className="h-3.5 w-3.5" style={{ color: COLOR.done }} />
            ) : (
              <StatusDot status={step.status} />
            )}
          </span>
          <div>
            <p className="text-sm text-[color:var(--text)]" style={{ color: COLOR.text }}>{step.name}</p>
            {step.detail && <p className="mt-0.5 text-xs" style={{ color: COLOR.textMuted }}>{step.detail}</p>}
          </div>
        </div>
        <StatusLabel status={step.status} />
      </div>

      {step.status === 'active' && typeof step.progress === 'number' && (
        <div className="mt-2 flex items-center gap-2 pl-6">
          <div className="flex-1"><ProgressBar value={step.progress} color={COLOR.active} /></div>
          <span className="font-mono text-[11px]" style={{ color: COLOR.active }}>{step.progress}%</span>
        </div>
      )}

      {step.proof && <div className="pl-6"><ProofLinks proof={step.proof} /></div>}
    </li>
  );
}

function PhaseBlock({ phase }) {
  const value = phaseValue(phase);
  const status = value >= 100 ? 'done' : value > 0 ? 'active' : 'queued';

  return (
    <div className="border-l-2 pl-4" style={{ borderColor: COLOR.borderMuted }}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: COLOR.queued }}>
          {phase.label} <span className="normal-case tracking-normal" style={{ color: COLOR.text }}>— {phase.title}</span>
        </p>
        <StatusLabel status={status} />
      </div>

      {phase.detail && <p className="mt-1 text-xs" style={{ color: COLOR.textMuted }}>{phase.detail}</p>}

      {phase.steps && phase.steps.length > 0 && (
        <ul className="mt-1 divide-y" style={{ borderColor: COLOR.border }}>
          {phase.steps.map((s) => <StepRow key={s.name} step={s} />)}
        </ul>
      )}
    </div>
  );
}

function ModuleRow({ module, open, onToggle }) {
  const value = moduleValue(module);
  const status = moduleTopStatus(module);
  const barColor = status === 'done' ? COLOR.done : status === 'active' ? COLOR.active : COLOR.queued;

  return (
    <div className="rounded-2xl border" style={{ borderColor: COLOR.border, backgroundColor: COLOR.surface }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:gap-4 sm:px-5"
        style={{ ['--tw-ring-color']: COLOR.active, ['--tw-ring-offset-color']: COLOR.bg }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = COLOR.surfaceHover; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <StatusDot status={status} size="md" />
        <span className="hidden font-mono text-xs sm:inline" style={{ color: COLOR.queued }}>PID {module.pid}</span>
        <span className="min-w-0 flex-1 truncate text-sm font-semibold sm:text-base" style={{ color: COLOR.text }}>
          {module.title}
        </span>
        <span className="hidden w-28 sm:block"><ProgressBar value={value} color={barColor} /></span>
        <StatusLabel status={status} />
        <IconChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          style={{ color: COLOR.queued }}
        />
      </button>

      <div className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="space-y-4 px-4 pb-5 pt-1 sm:px-5">
            <p className="text-sm" style={{ color: COLOR.textMuted }}>{module.description}</p>

            {module.tags && (
              <div className="flex flex-wrap gap-2">
                {module.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                    style={{ borderColor: COLOR.borderMuted, color: COLOR.textMuted }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {module.phases && (
              <div className="space-y-5">
                {module.phases.map((p) => <PhaseBlock key={p.id} phase={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CardView({ onOpen }) {
  const overallPct = Math.round(
    project.modules.reduce((acc, m) => acc + moduleValue(m), 0) / project.modules.length
  );

  return (
    <div>
      <div className="flex items-center gap-2">
        <StatusDot status="active" size="md" />
       
        <span className="ml-auto font-mono text-[11px]" style={{ color: COLOR.queued }}>EXP-001</span>
      </div>

      <h2 className="mt-5 font-mono text-3xl font-semibold tracking-tight sm:text-5xl" style={{ color: COLOR.text }}>
        AI OS Assistant<span style={{ color: COLOR.active }}>_</span>
      </h2>

      <p className="mt-4 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: COLOR.textMuted }}>
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider"
            style={{ borderColor: COLOR.borderMuted, color: COLOR.textMuted }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between font-mono text-[11px]" style={{ color: COLOR.queued }}>
            <span>{project.modules.length} MODULES</span>
            <span>{overallPct}% COMPLETE</span>
          </div>
          <div className="mt-1.5"><ProgressBar value={overallPct} color={COLOR.active} /></div>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ backgroundColor: COLOR.active, color: COLOR.bg }}
        >
          Open process monitor
          <IconArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function DetailView({ openModules, onToggleModule, onBack }) {
  const overallPct = Math.round(
    project.modules.reduce((acc, m) => acc + moduleValue(m), 0) / project.modules.length
  );
  const counts = project.modules.reduce(
    (acc, m) => { acc[moduleTopStatus(m)] += 1; return acc; },
    { done: 0, active: 0, queued: 0 }
  );

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2"
        style={{ color: COLOR.textMuted }}
        onMouseEnter={(e) => { e.currentTarget.style.color = COLOR.text; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = COLOR.textMuted; }}
      >
        <IconArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: COLOR.active }}>
            Process Monitor
          </p>
          <h2 className="mt-1 font-mono text-2xl font-semibold sm:text-3xl" style={{ color: COLOR.text }}>
            {project.name}
          </h2>
          <p className="mt-2 max-w-xl text-sm" style={{ color: COLOR.textMuted }}>{project.description}</p>
        </div>

        <div className="shrink-0 rounded-2xl border px-4 py-3 font-mono text-[11px]" style={{ borderColor: COLOR.border, backgroundColor: COLOR.surface, color: COLOR.textMuted }}>
          <div className="flex gap-4">
            <span><span style={{ color: COLOR.done }}>{counts.done}</span> DONE</span>
            <span><span style={{ color: COLOR.active }}>{counts.active}</span> RUNNING</span>
            <span><span style={{ color: COLOR.queued }}>{counts.queued}</span> QUEUED</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between font-mono text-[11px]" style={{ color: COLOR.queued }}>
          <span>OVERALL PROGRESS</span>
          <span style={{ color: COLOR.text }}>{overallPct}%</span>
        </div>
        <div className="mt-1.5"><ProgressBar value={overallPct} color={COLOR.active} height="h-2" /></div>
      </div>

      <div className="mt-8 space-y-3">
        {project.modules.map((m) => (
          <ModuleRow key={m.id} module={m} open={openModules.has(m.id)} onToggle={() => onToggleModule(m.id)} />
        ))}
      </div>

      <p className="mt-8 text-center text-xs" style={{ color: COLOR.queued }}>
        Proof lands on each step as it ships — repo, write-up, demo.
      </p>
    </div>
  );
}

/* ---------------------------------- Root ------------------------------------ */

export default function AiOsAssistantShowcase() {
  const [showDetail, setShowDetail] = useState(false);
  const [openModules, setOpenModules] = useState(() => new Set([project.modules[0].id]));

  const toggleModule = (id) => {
    setOpenModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      className="w-full rounded-3xl p-[1px]"
      style={{ background: `linear-gradient(180deg, ${COLOR.border}, ${COLOR.bg} 40%)` }}
    >
      <div
        className="relative overflow-hidden rounded-[calc(1.5rem-1px)] p-6 sm:p-10"
        style={{
          backgroundColor: COLOR.bg,
          backgroundImage: `radial-gradient(circle at 1px 1px, ${COLOR.border} 1px, transparent 0)`,
          backgroundSize: '22px 22px',
        }}
      >
        {!showDetail ? (
          <CardView onOpen={() => setShowDetail(true)} />
        ) : (
          <DetailView openModules={openModules} onToggleModule={toggleModule} onBack={() => setShowDetail(false)} />
        )}
      </div>
    </section>
  );
}