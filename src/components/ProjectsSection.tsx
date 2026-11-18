import { ArrowUpRight, GitBranch } from 'lucide-react';
import { PROFILE, PROJECTS, ProjectItem } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { ProjectSchematic } from './ProjectSchematic';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [p1, p2, p3, p4] = PROJECTS;

  return (
    <section id="projects" className="relative border-b border-white/10">
      {/* Section Header */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#00D9FF]">
            03 / Four Engineered Environments
          </p>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white mt-2">
            <span className="chrome-text">Selected</span> Projects
          </h2>
        </div>

        <MagneticButton strength={0.18}>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GITHUB"
            className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-white border border-white/20 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] px-4 py-2.5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
          >
            <span>GitHub Profile</span>
            <ArrowUpRight className="w-4 h-4 text-[#00D9FF]" />
          </a>
        </MagneticButton>
      </div>

      {/* ENVIRONMENT 01 — ALUMNI MANAGEMENT SYSTEM (Asymmetric Left Copy / Right Floating DB Schematic) */}
      {p1 && (
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-16">
          <article className="project-env bg-[#0C0F15]/90 border-y border-white/15 py-12 sm:py-16 px-2 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.22em]">
                <span className="px-2.5 py-0.5 border border-[#00D9FF]/60 bg-[#00D9FF]/10 text-[#00D9FF] font-semibold">
                  {p1.number}
                </span>
                <span className="text-[#94A3B8]">{p1.category}</span>
              </div>

              <h3 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[0.95] text-white">
                {p1.title}
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1]">
                {p1.description}
              </p>

              {/* Architecture Flow Strip */}
              <div className="project-arch-strip p-3.5 border border-[#00D9FF]/30 bg-[#080A0E]">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF]">
                  Architecture
                </p>
                <p className="font-mono-tech text-xs sm:text-sm text-white mt-1">
                  {p1.architectureLabel}
                </p>
              </div>

              {/* Stack Breakdown */}
              {p1.stackGroups && (
                <div className="grid grid-cols-2 border border-white/15 divide-x divide-y divide-white/15 bg-[#10131A]">
                  {p1.stackGroups.map((sg) => (
                    <div key={sg.label} className="p-3.5">
                      <p className="font-mono-tech text-[10px] uppercase tracking-wider text-[#00D9FF]">
                        {sg.label}
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-white mt-1">
                        {sg.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* 8 Key Features */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-1">
                {p1.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-[#E2E8F0]">
                    <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 bg-[#00D9FF] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <MagneticButton strength={0.18}>
                  <a
                    href={p1.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="GITHUB"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>GitHub Repository</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </MagneticButton>

                <button
                  type="button"
                  onClick={() => onSelectProject(p1)}
                  data-cursor="INSPECT"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] text-white font-mono-tech text-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                >
                  <span>Inspect Details</span>
                  <ArrowUpRight className="w-4 h-4 text-[#00D9FF]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 project-visual-stage h-80 sm:h-[420px] border border-white/15 bg-[#080A0E]">
              <ProjectSchematic visualType={p1.visualType} />
            </div>
          </article>
        </div>
      )}

      {/* ENVIRONMENT 02 — STUDENT MODULE (Reversed Relational Database Architecture Spread) */}
      {p2 && (
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-16">
          <article className="project-env bg-[#10131A]/90 border border-white/15 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-5">
              <div className="project-visual-stage h-80 sm:h-[410px] border border-[#00D9FF]/35 bg-[#080A0E]">
                <ProjectSchematic visualType={p2.visualType} />
              </div>

              {/* 42-Table & 13-Migration Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 border border-white/15 divide-y sm:divide-y-0 sm:divide-x divide-white/15 bg-[#0C0F15]">
                {p2.metrics.map((m) => (
                  <div key={m.label} className="p-3.5">
                    <p className="font-mono-tech text-[10px] uppercase tracking-wider text-[#94A3B8]">
                      {m.label}
                    </p>
                    <p className="font-display text-sm sm:text-base font-bold text-[#00D9FF] mt-1">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Architecture Highlights */}
              <div className="p-4 border border-white/10 bg-[#0C0F15] space-y-2">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF]">
                  Architecture Highlights
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {p2.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs sm:text-sm text-[#E2E8F0]">
                      <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 bg-[#00D9FF] shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.22em]">
                <span className="px-2.5 py-0.5 bg-white text-[#080A0E] font-bold">
                  {p2.number}
                </span>
                <span className="text-[#00D9FF]">{p2.category}</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[0.98] chrome-text">
                {p2.title}
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1]">
                {p2.description}
              </p>

              {p2.scopeNote && (
                <p className="font-mono-tech text-xs text-[#94A3B8] border-l-2 border-[#00D9FF] pl-3">
                  {p2.scopeNote}
                </p>
              )}

              {/* Technology Stack */}
              {p2.stackGroups && (
                <div className="grid grid-cols-2 border border-white/15 divide-x divide-y divide-white/15 bg-[#0C0F15]">
                  {p2.stackGroups.map((sg) => (
                    <div key={sg.label} className="p-3">
                      <p className="font-mono-tech text-[10px] uppercase tracking-wider text-[#94A3B8]">
                        {sg.label}
                      </p>
                      <p className="font-mono-tech text-xs sm:text-sm text-white mt-1">
                        {sg.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* 13 Schema Modules */}
              {p2.modules && (
                <div className="space-y-2.5">
                  <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF]">
                    Schema &amp; System Modules ({p2.modules.length})
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                    {p2.modules.map((mod) => (
                      <li key={mod} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                        <span aria-hidden="true" className="mt-1.5 w-1 h-1 bg-[#00D9FF] shrink-0" />
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                <MagneticButton strength={0.18}>
                  <a
                    href={p2.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="GITHUB"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>GitHub Repository</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </MagneticButton>

                <button
                  type="button"
                  onClick={() => onSelectProject(p2)}
                  data-cursor="INSPECT"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#080A0E] hover:border-[#00D9FF] hover:text-[#00D9FF] text-white border border-white/20 font-mono-tech text-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                >
                  <span>Inspect Schema</span>
                  <ArrowUpRight className="w-4 h-4 text-[#00D9FF]" />
                </button>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* ENVIRONMENT 03 — AI STUDY ROUTINE MANAGER (AETHERROUTINE) (Top Spatial Architecture Banner + Study Calendar Split) */}
      {p3 && (
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-16">
          <article className="project-env bg-[#080A0E]/88 border-t-2 border-b border-white/20 py-12 sm:py-16 px-2 sm:px-6 space-y-10">
            {/* Top Editorial Header & Dual Architecture Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.22em]">
                  <span className="px-2.5 py-0.5 border border-[#00D9FF]/60 bg-[#00D9FF]/10 text-[#00D9FF] font-semibold">
                    {p3.number}
                  </span>
                  <span className="text-[#94A3B8]">{p3.category}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[0.95] text-white">
                  {p3.title}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1] max-w-2xl">
                  {p3.description}
                </p>
              </div>

              <div className="lg:col-span-5 project-arch-strip p-4 border border-white/15 bg-[#0C0F15] space-y-2">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF]">
                  System Architecture
                </p>
                <p className="font-mono-tech text-xs text-white leading-relaxed">
                  React Frontend → FastAPI REST API → SQLite / MySQL Database
                </p>
                <p className="font-mono-tech text-xs text-[#00D9FF]">
                  Google Gemini AI → Personalized Study Recommendations
                </p>
              </div>
            </div>

            {/* Middle Split: Study Calendar Schematic + Stack Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-7 project-visual-stage h-80 sm:h-[400px] border border-white/15 bg-[#0C0F15]">
                <ProjectSchematic visualType={p3.visualType} />
              </div>

              <div className="lg:col-span-5 space-y-5">
                {p3.stackGroups && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 border border-white/15 divide-y divide-white/10 bg-[#0C0F15]">
                    {p3.stackGroups.map((sg) => (
                      <div key={sg.label} className="px-4 py-2.5 flex items-baseline justify-between gap-4">
                        <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#00D9FF] shrink-0">
                          {sg.label}
                        </span>
                        <span className="font-mono-tech text-xs text-white text-right">
                          {sg.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <MagneticButton strength={0.18}>
                    <a
                      href={p3.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="GITHUB"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                    >
                      <GitBranch className="w-4 h-4" />
                      <span>GitHub Repository</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </MagneticButton>

                  <button
                    type="button"
                    onClick={() => onSelectProject(p3)}
                    data-cursor="INSPECT"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] text-white border border-white/20 font-mono-tech text-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                  >
                    <span>Inspect Routine AI</span>
                    <ArrowUpRight className="w-4 h-4 text-[#00D9FF]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom 10 Key Features Strip */}
            <div className="pt-4 border-t border-white/10">
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] mb-3">
                Key Capabilities
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {p3.highlights.map((feat) => (
                  <li
                    key={feat}
                    className="p-3 border border-white/10 bg-[#0C0F15] text-xs text-[#E2E8F0] flex items-start gap-2"
                  >
                    <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 bg-[#00D9FF] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      )}

      {/* ENVIRONMENT 04 — PREDICTIVE TRAFFIC ENGINEERING USING SEGMENT ROUTING (6-Stage Workflow Conduit + Multi-Router Topology) */}
      {p4 && (
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-24">
          <article className="project-env bg-[#0C0F15]/92 border border-white/15 p-6 sm:p-10 lg:p-12 space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.22em]">
                  <span className="px-2.5 py-0.5 bg-white text-[#080A0E] font-bold">
                    {p4.number}
                  </span>
                  <span className="text-[#00D9FF]">{p4.category}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[0.95] chrome-text">
                  {p4.title}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1]">
                  {p4.description}
                </p>

                {p4.scopeNote && (
                  <p className="font-mono-tech text-xs text-[#94A3B8] border-l-2 border-[#00D9FF] pl-3">
                    {p4.scopeNote}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <MagneticButton strength={0.18}>
                  <a
                    href={p4.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="GITHUB"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>GitHub Repository</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </MagneticButton>

                <button
                  type="button"
                  onClick={() => onSelectProject(p4)}
                  data-cursor="INSPECT"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] text-white border border-white/20 font-mono-tech text-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                >
                  <span>Inspect Workflow</span>
                  <ArrowUpRight className="w-4 h-4 text-[#00D9FF]" />
                </button>
              </div>
            </div>

            {/* 6-Stage Proposed Workflow Conduit */}
            <div className="project-arch-strip grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border border-white/15 divide-y sm:divide-y-0 sm:divide-x divide-white/15 bg-[#080A0E]">
              {[
                { step: '01', label: 'Network Topology' },
                { step: '02', label: 'Traffic Generation' },
                { step: '03', label: 'Telemetry Collection' },
                { step: '04', label: 'Congestion Prediction' },
                { step: '05', label: 'Path Optimization' },
                { step: '06', label: 'Segment Routing Forwarding' },
              ].map((stage) => (
                <div key={stage.step} className="project-workflow-node p-3.5">
                  <span className="font-mono-tech text-[10px] text-[#00D9FF]">
                    STAGE {stage.step}
                  </span>
                  <p className="font-display text-xs sm:text-sm font-bold text-white mt-1 leading-snug">
                    {stage.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Asymmetric Topology Schematic + Stack & Key Components */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-7 project-visual-stage h-80 sm:h-[390px] border border-[#00D9FF]/35 bg-[#080A0E]">
                <ProjectSchematic visualType={p4.visualType} />
              </div>

              <div className="lg:col-span-5 space-y-5">
                {p4.stackGroups && (
                  <div className="grid grid-cols-2 border border-white/15 divide-x divide-y divide-white/15 bg-[#10131A]">
                    {p4.stackGroups.map((sg) => (
                      <div key={sg.label} className="p-3">
                        <p className="font-mono-tech text-[10px] uppercase tracking-wider text-[#00D9FF]">
                          {sg.label}
                        </p>
                        <p className="font-mono-tech text-xs text-white mt-1">{sg.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]">
                    Key Components
                  </p>
                  <ul className="space-y-2">
                    {p4.highlights.map((comp) => (
                      <li key={comp} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E2E8F0]">
                        <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 bg-[#00D9FF] shrink-0" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
