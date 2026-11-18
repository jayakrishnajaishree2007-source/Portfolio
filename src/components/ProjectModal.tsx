import { ArrowUpRight, CheckCircle2, Layers, X } from 'lucide-react';
import { useEffect } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { ProjectSchematic } from './ProjectSchematic';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain border border-white/15 bg-[#0C0F15] text-[#F1F5F9] shadow-[0_32px_100px_rgba(0,0,0,0.88)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-60 sm:h-72 w-full bg-[#080A0E] border-b border-white/10 overflow-hidden">
          <ProjectSchematic visualType={project.visualType} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            data-cursor="CLOSE"
            className="absolute top-4 right-4 z-10 h-10 w-10 border border-white/20 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#00D9FF]">
              Project {project.number} · {project.category}
            </p>
            <h3
              id="project-modal-title"
              className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-2"
            >
              {project.title}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8] mt-3">
              {project.description}
            </p>
            {project.scopeNote && (
              <p className="font-mono-tech text-xs text-[#CBD5E1] mt-3 border-l-2 border-[#00D9FF] pl-3">
                {project.scopeNote}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 border border-white/15 divide-y sm:divide-y-0 sm:divide-x divide-white/15 bg-[#10131A]">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="p-4">
                <p className="font-mono-tech text-[10px] uppercase tracking-wider text-[#94A3B8]">
                  {metric.label}
                </p>
                <p className="font-display text-base sm:text-lg font-bold text-white mt-1">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          {/* Architecture Flow Strip */}
          <div className="p-4 border border-[#00D9FF]/30 bg-[#080A0E]">
            <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF] mb-1">
              Architecture / Workflow
            </p>
            <p className="font-mono-tech text-xs sm:text-sm text-white">
              {project.architectureLabel}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#00D9FF] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Key Features &amp; Architecture</span>
              </h4>
              <ul className="space-y-2.5">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#E2E8F0]">
                    <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 bg-[#00D9FF] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {project.modules && (
                <div className="pt-4 space-y-2">
                  <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#CBD5E1]">
                    Key Database Modules ({project.modules.length})
                  </p>
                  <ul className="space-y-1.5">
                    {project.modules.map((mod) => (
                      <li key={mod} className="flex items-start gap-2 text-xs sm:text-sm text-[#94A3B8]">
                        <span aria-hidden="true" className="mt-1.5 w-1 h-1 bg-[#94A3B8] shrink-0" />
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#CBD5E1] flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>System Pipeline</span>
              </h4>
              <div className="space-y-3">
                {project.architectureSteps.map((step) => (
                  <div key={step.stage} className="p-3.5 border border-white/10 bg-[#10131A]">
                    <p className="font-mono-tech text-xs font-semibold text-white">
                      {step.stage}
                    </p>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="font-mono-tech text-xs text-[#94A3B8]">
              {project.technologies.join(' · ')}
            </p>

            <MagneticButton strength={0.18}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00D9FF] hover:bg-white text-[#080A0E] text-xs font-mono-tech font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
              >
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
