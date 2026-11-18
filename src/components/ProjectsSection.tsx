import { ArrowUpRight, Bookmark, Check, GitBranch } from 'lucide-react';
import { useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { PROFILE, PROJECTS, ProjectItem } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { ProjectSchematic } from './ProjectSchematic';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

function ProjectBookmarkButton({ project }: { project: ProjectItem }) {
  const { user, bookmarks, toggleBookmark, login, isLoggingIn } = useFirebase();
  const [busy, setBusy] = useState(false);
  const isSaved = Boolean(bookmarks[project.id]);
  const hasNote = Boolean(bookmarks[project.id]?.note?.trim());

  const handleClick = async () => {
    setBusy(true);
    try {
      if (!user) {
        const signedIn = await login();
        if (!signedIn) return;
        return;
      }
      await toggleBookmark(project);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      disabled={busy || isLoggingIn}
      onClick={() => void handleClick()}
      aria-pressed={isSaved}
      data-cursor={isSaved ? 'SAVED' : 'SAVE'}
      className={`inline-flex items-center gap-2 px-4 py-3 border font-mono-tech text-xs uppercase tracking-wider transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF] ${
        isSaved
          ? 'border-[#00D9FF] bg-[#0D1E26] text-[#00D9FF]'
          : 'border-white/20 bg-[#10131A] hover:border-[#00D9FF] text-[#CBD5E1] hover:text-white'
      }`}
    >
      {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
      <span>{isSaved ? (hasNote ? 'Saved · Noted' : 'Saved') : 'Save'}</span>
    </button>
  );
}

function InteractiveSchematicStage({
  project,
  onInspect,
  borderClass = 'border-white/15 bg-[#080A0E]',
  heightClass = 'h-80 sm:h-[420px]',
}: {
  project: ProjectItem;
  onInspect: (p: ProjectItem) => void;
  borderClass?: string;
  heightClass?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onInspect(project)}
      data-cursor="INSPECT"
      aria-label={`Inspect architecture details for ${project.title}`}
      className={`group relative w-full text-left block border ${borderClass} ${heightClass} overflow-hidden focus-visible:outline-2 focus-visible:outline-[#00D9FF]`}
    >
      <ProjectSchematic visualType={project.visualType} />
      <span className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/20 bg-[#0C0F15]/95 group-hover:border-[#00D9FF] group-hover:text-[#00D9FF] font-mono-tech text-[10px] uppercase tracking-wider text-white transition-colors">
        <span>Inspect Architecture</span>
        <ArrowUpRight className="w-3 h-3 text-[#00D9FF]" />
      </span>
    </button>
  );
}

const PROJECT_JUMP_LABELS: Record<string, string> = {
  'alumni-management-system': '01. Alumni System',
  'student-module': '02. Student DB',
  'aether-routine': '03. AetherRoutine',
  'predictive-te-sr': '04. Segment Routing',
};

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [p1, p2, p3, p4] = PROJECTS;
  const { user, bookmarks } = useFirebase();
  const savedCount = Object.keys(bookmarks).length;

  const jumpToProject = (projectId: string) => {
    const el = document.getElementById(`proj-${projectId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="projects" className="relative border-b border-white/10">
      {/* Section Header + Quick Project Jump Bar */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#00D9FF]">
              03 · Four Engineered Environments
            </p>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white mt-2">
              <span className="text-[#00D9FF]">Selected</span> Projects
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {user && (
              <span className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#00D9FF] border border-[#00D9FF]/35 bg-[#0C0F15] px-3.5 py-2.5 tabular-nums">
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved ({savedCount}/4)</span>
              </span>
            )}

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
        </div>

        {/* Interactive Project Quick-Jump Strip */}
        <div
          aria-label="Jump to project environment"
          className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10"
        >
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#94A3B8] mr-2">
            Quick Jump:
          </span>
          {PROJECTS.map((proj) => (
            <button
              key={proj.id}
              type="button"
              onClick={() => jumpToProject(proj.id)}
              className="px-3 py-1.5 border border-white/15 bg-[#0C0F15] hover:border-[#00D9FF] hover:text-[#00D9FF] text-[#CBD5E1] font-mono-tech text-[11px] uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
            >
              {PROJECT_JUMP_LABELS[proj.id] ?? `${proj.number}. ${proj.title}`}
            </button>
          ))}
        </div>
      </div>

      {/* ENVIRONMENT 01 — ALUMNI MANAGEMENT SYSTEM */}
      {p1 && (
        <div id={`proj-${p1.id}`} className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-16">
          <article className="project-env bg-[#0C0F15]/90 border-y border-white/15 py-12 sm:py-16 px-2 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5 font-mono-tech text-xs uppercase tracking-[0.18em]">
                <span className="text-[#00D9FF] font-bold">{p1.number}</span>
                <span aria-hidden="true" className="text-white/30">/</span>
                <span className="text-[#7DD3FC]">{p1.category}</span>
              </div>

              <h3 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[0.95] text-white">
                {p1.title}
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-[#D5DDE8]">
                {p1.description}
              </p>

              <div className="project-arch-strip p-3.5 border border-[#00D9FF]/30 bg-[#080A0E]">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF]">
                  Architecture
                </p>
                <p className="font-mono-tech text-xs sm:text-sm text-[#E0F2FE] mt-1">
                  {p1.architectureLabel}
                </p>
              </div>

              {p1.stackGroups && (
                <div className="grid grid-cols-2 border border-white/15 divide-x divide-y divide-white/15 bg-[#10131A]">
                  {p1.stackGroups.map((sg) => (
                    <div key={sg.label} className="p-3.5">
                      <p className="font-mono-tech text-[10px] uppercase tracking-wider text-[#7DD3FC]">
                        {sg.label}
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-white mt-1">
                        {sg.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

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

                <ProjectBookmarkButton project={p1} />
              </div>
            </div>

            <div className="lg:col-span-6 project-visual-stage">
              <InteractiveSchematicStage project={p1} onInspect={onSelectProject} />
            </div>
          </article>
        </div>
      )}

      {/* ENVIRONMENT 02 — STUDENT MODULE */}
      {p2 && (
        <div id={`proj-${p2.id}`} className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-16">
          <article className="project-env bg-[#10131A]/90 border border-white/15 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-5">
              <div className="project-visual-stage">
                <InteractiveSchematicStage
                  project={p2}
                  onInspect={onSelectProject}
                  borderClass="border-[#00D9FF]/35 bg-[#080A0E]"
                  heightClass="h-80 sm:h-[410px]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 border border-white/15 divide-y sm:divide-y-0 sm:divide-x divide-white/15 bg-[#0C0F15]">
                {p2.metrics.map((m) => (
                  <div key={m.label} className="p-3.5">
                    <p className="font-mono-tech text-[10px] uppercase tracking-wider text-[#7DD3FC]">
                      {m.label}
                    </p>
                    <p className="font-display text-sm sm:text-base font-bold text-[#FCD34D] mt-1 tabular-nums">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 border border-white/10 bg-[#0C0F15] space-y-2">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF]">
                  Architecture Highlights
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {p2.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs sm:text-sm text-[#D5DDE8]">
                      <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 bg-[#00D9FF] shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5 font-mono-tech text-xs uppercase tracking-[0.18em]">
                <span className="text-[#00D9FF] font-bold">{p2.number}</span>
                <span aria-hidden="true" className="text-white/30">/</span>
                <span className="text-[#7DD3FC]">{p2.category}</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[0.98] text-white">
                {p2.title}
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-[#D5DDE8]">
                {p2.description}
              </p>

              {p2.scopeNote && (
                <p className="font-mono-tech text-xs text-[#9FB0C7] border border-white/10 bg-[#080A0E] px-3.5 py-2.5">
                  {p2.scopeNote}
                </p>
              )}

              {p2.stackGroups && (
                <div className="grid grid-cols-2 border border-white/15 divide-x divide-y divide-white/15 bg-[#0C0F15]">
                  {p2.stackGroups.map((sg) => (
                    <div key={sg.label} className="p-3">
                      <p className="font-mono-tech text-[10px] uppercase tracking-wider text-[#7DD3FC]">
                        {sg.label}
                      </p>
                      <p className="font-mono-tech text-xs sm:text-sm text-white mt-1">
                        {sg.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {p2.modules && (
                <div className="space-y-2.5">
                  <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#7DD3FC]">
                    Schema &amp; System Modules ({p2.modules.length})
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                    {p2.modules.map((mod) => (
                      <li key={mod} className="flex items-start gap-2 text-xs text-[#D5DDE8]">
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

                <ProjectBookmarkButton project={p2} />
              </div>
            </div>
          </article>
        </div>
      )}

      {/* ENVIRONMENT 03 — AETHERROUTINE */}
      {p3 && (
        <div id={`proj-${p3.id}`} className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-16">
          <article className="project-env bg-[#080A0E]/88 border-t-2 border-b border-white/20 py-12 sm:py-16 px-2 sm:px-6 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5 font-mono-tech text-xs uppercase tracking-[0.18em]">
                  <span className="text-[#00D9FF] font-bold">{p3.number}</span>
                  <span aria-hidden="true" className="text-white/30">/</span>
                  <span className="text-[#7DD3FC]">{p3.category}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[0.95] text-white">
                  {p3.title}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-[#D5DDE8] max-w-2xl">
                  {p3.description}
                </p>
              </div>

              <div className="lg:col-span-5 project-arch-strip p-4 border border-white/15 bg-[#0C0F15] space-y-2">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF]">
                  System Architecture
                </p>
                <p className="font-mono-tech text-xs text-[#E0F2FE] leading-relaxed">
                  React Frontend → FastAPI REST API → SQLite / MySQL Database
                </p>
                <p className="font-mono-tech text-xs text-[#FCD34D]">
                  Google Gemini AI → Personalized Study Recommendations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-7 project-visual-stage">
                <InteractiveSchematicStage
                  project={p3}
                  onInspect={onSelectProject}
                  borderClass="border-white/15 bg-[#0C0F15]"
                  heightClass="h-80 sm:h-[400px]"
                />
              </div>

              <div className="lg:col-span-5 space-y-5">
                {p3.stackGroups && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 border border-white/15 divide-y divide-white/10 bg-[#0C0F15]">
                    {p3.stackGroups.map((sg) => (
                      <div key={sg.label} className="px-4 py-2.5 flex items-baseline justify-between gap-4">
                        <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#7DD3FC] shrink-0">
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

                  <ProjectBookmarkButton project={p3} />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#7DD3FC] mb-3">
                Key Capabilities
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {p3.highlights.map((feat) => (
                  <li
                    key={feat}
                    className="p-3 border border-white/10 bg-[#0C0F15] text-xs text-[#D5DDE8] flex items-start gap-2"
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

      {/* ENVIRONMENT 04 — PREDICTIVE TRAFFIC ENGINEERING USING SEGMENT ROUTING */}
      {p4 && (
        <div id={`proj-${p4.id}`} className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-24">
          <article className="project-env bg-[#0C0F15]/92 border border-white/15 p-6 sm:p-10 lg:p-12 space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5 font-mono-tech text-xs uppercase tracking-[0.18em]">
                  <span className="text-[#00D9FF] font-bold">{p4.number}</span>
                  <span aria-hidden="true" className="text-white/30">/</span>
                  <span className="text-[#7DD3FC]">{p4.category}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[0.95] text-white">
                  {p4.title}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-[#D5DDE8]">
                  {p4.description}
                </p>

                {p4.scopeNote && (
                  <p className="font-mono-tech text-xs text-[#9FB0C7] border border-white/10 bg-[#080A0E] px-3.5 py-2.5">
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

                <ProjectBookmarkButton project={p4} />
              </div>
            </div>

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
                  <p className="font-display text-xs sm:text-sm font-bold text-[#E0F2FE] mt-1 leading-snug">
                    {stage.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-7 project-visual-stage">
                <InteractiveSchematicStage
                  project={p4}
                  onInspect={onSelectProject}
                  borderClass="border-[#00D9FF]/35 bg-[#080A0E]"
                  heightClass="h-80 sm:h-[390px]"
                />
              </div>

              <div className="lg:col-span-5 space-y-5">
                {p4.stackGroups && (
                  <div className="grid grid-cols-2 border border-white/15 divide-x divide-y divide-white/15 bg-[#10131A]">
                    {p4.stackGroups.map((sg) => (
                      <div key={sg.label} className="p-3">
                        <p className="font-mono-tech text-[10px] uppercase tracking-wider text-[#7DD3FC]">
                          {sg.label}
                        </p>
                        <p className="font-mono-tech text-xs text-white mt-1">{sg.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#7DD3FC]">
                    Key Components
                  </p>
                  <ul className="space-y-2">
                    {p4.highlights.map((comp) => (
                      <li key={comp} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#D5DDE8]">
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
