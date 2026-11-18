import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  CheckCircle2,
  Layers,
  Save,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { PROJECTS, ProjectItem } from '../data/portfolioData';
import { GoogleSignInButton } from './GmailWorkspacePanel';
import { MagneticButton } from './MagneticButton';
import { ProjectSchematic } from './ProjectSchematic';

interface ProjectModalProps {
  project: ProjectItem | null;
  onSelectProject: (project: ProjectItem) => void;
  onClose: () => void;
}

export function ProjectModal({ project, onSelectProject, onClose }: ProjectModalProps) {
  const { user, bookmarks, toggleBookmark, saveBookmarkNote, login, isLoggingIn } = useFirebase();
  const [noteDraft, setNoteDraft] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [noteStatus, setNoteStatus] = useState<string | null>(null);

  const existingBookmark = project ? bookmarks[project.id] : undefined;

  useEffect(() => {
    setNoteDraft(existingBookmark?.note ?? '');
    setNoteStatus(null);
  }, [project?.id, existingBookmark?.note]);

  const currentIdx = project ? PROJECTS.findIndex((p) => p.id === project.id) : -1;
  const prevProject = currentIdx >= 0 ? PROJECTS[(currentIdx - 1 + PROJECTS.length) % PROJECTS.length] : null;
  const nextProject = currentIdx >= 0 ? PROJECTS[(currentIdx + 1) % PROJECTS.length] : null;

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditing =
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if (e.key === 'Escape') {
        onClose();
      } else if (!isEditing && e.key === 'ArrowLeft' && prevProject) {
        onSelectProject(prevProject);
      } else if (!isEditing && e.key === 'ArrowRight' && nextProject) {
        onSelectProject(nextProject);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose, prevProject, nextProject, onSelectProject]);

  if (!project) return null;

  const isSaved = Boolean(existingBookmark);

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingNote(true);
    setNoteStatus(null);
    try {
      await saveBookmarkNote(project, noteDraft);
      setNoteStatus('Review note saved to Firestore.');
    } catch (err) {
      setNoteStatus(err instanceof Error ? err.message : 'Unable to save note.');
    } finally {
      setSavingNote(false);
    }
  };

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
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
            {prevProject && (
              <button
                type="button"
                onClick={() => onSelectProject(prevProject)}
                aria-label={`Previous project: ${prevProject.title}`}
                className="h-9 px-3 border border-white/20 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] text-white font-mono-tech text-[10px] uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
            )}
            {nextProject && (
              <button
                type="button"
                onClick={() => onSelectProject(nextProject)}
                aria-label={`Next project: ${nextProject.title}`}
                className="h-9 px-3 border border-white/20 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] text-white font-mono-tech text-[10px] uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
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
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
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
            </div>

            {user && (
              <button
                type="button"
                onClick={() => void toggleBookmark(project)}
                className={`inline-flex items-center gap-2 px-4 py-2 border font-mono-tech text-xs uppercase tracking-wider transition-colors shrink-0 ${
                  isSaved
                    ? 'border-[#00D9FF] bg-[#0D1E26] text-[#00D9FF]'
                    : 'border-white/20 bg-[#10131A] hover:border-[#00D9FF] text-white'
                }`}
              >
                {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{isSaved ? 'Bookmarked' : 'Bookmark Project'}</span>
              </button>
            )}
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-[#D5DDE8]">
            {project.description}
          </p>
          {project.scopeNote && (
            <p className="font-mono-tech text-xs text-[#9FB0C7] border border-white/10 bg-[#080A0E] px-3.5 py-2.5">
              {project.scopeNote}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 border border-white/15 divide-y sm:divide-y-0 sm:divide-x divide-white/15 bg-[#10131A]">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="p-4">
                <p className="font-mono-tech text-[10px] uppercase tracking-wider text-[#7DD3FC]">
                  {metric.label}
                </p>
                <p className="font-display text-base sm:text-lg font-bold text-[#FCD34D] mt-1 tabular-nums">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 border border-[#00D9FF]/30 bg-[#080A0E]">
            <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF] mb-1">
              Architecture / Workflow
            </p>
            <p className="font-mono-tech text-xs sm:text-sm text-[#E0F2FE]">
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
                  <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#7DD3FC]">
                    Key Database Modules ({project.modules.length})
                  </p>
                  <ul className="space-y-1.5">
                    {project.modules.map((mod) => (
                      <li key={mod} className="flex items-start gap-2 text-xs sm:text-sm text-[#D5DDE8]">
                        <span aria-hidden="true" className="mt-1.5 w-1 h-1 bg-[#7DD3FC] shrink-0" />
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#7DD3FC] flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>System Pipeline</span>
              </h4>
              <div className="space-y-3">
                {project.architectureSteps.map((step) => (
                  <div key={step.stage} className="p-3.5 border border-white/10 bg-[#10131A]">
                    <p className="font-mono-tech text-xs font-semibold text-white">
                      {step.stage}
                    </p>
                    <p className="text-xs sm:text-sm text-[#D5DDE8] mt-1 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 border border-white/15 bg-[#10131A] space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF]">
                Saved Review Notes (Firestore)
              </p>
              {user && (
                <span className="font-mono-tech text-[10px] text-[#94A3B8] tabular-nums">
                  {noteDraft.length}/500
                </span>
              )}
            </div>

            {!user ? (
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <p className="text-xs text-[#94A3B8]">
                  Sign in with Google to bookmark this project and save personal review notes across sessions.
                </p>
                <GoogleSignInButton onClick={() => void login()} disabled={isLoggingIn} />
              </div>
            ) : (
              <form onSubmit={(e) => void handleSaveNote(e)} className="space-y-3">
                <textarea
                  rows={2}
                  maxLength={500}
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  placeholder="Write private technical review notes or questions about this architecture..."
                  className="w-full px-3.5 py-2.5 border border-white/15 bg-[#080A0E] text-xs sm:text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00D9FF]"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {noteStatus ? (
                    <span className="font-mono-tech text-xs text-[#00D9FF] inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{noteStatus}</span>
                    </span>
                  ) : (
                    <span className="font-mono-tech text-[11px] text-[#94A3B8]">
                      Stored privately under {user.email}
                    </span>
                  )}
                  <button
                    type="submit"
                    disabled={savingNote}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{savingNote ? 'Saving...' : 'Save Note'}</span>
                  </button>
                </div>
              </form>
            )}
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
