import { SectionId } from './Navbar';

interface SectionRailProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

const CHAPTERS: { id: SectionId; num: string; label: string }[] = [
  { id: 'home', num: '01', label: 'Studio' },
  { id: 'about', num: '02', label: 'Profile' },
  { id: 'projects', num: '03', label: 'Projects' },
  { id: 'experience', num: '04', label: 'Timeline' },
  { id: 'skills', num: '05', label: 'Skills' },
  { id: 'achievements', num: '06', label: 'Honors' },
  { id: 'album', num: '07', label: 'Album' },
  { id: 'contact', num: '08', label: 'Contact' },
];

export function SectionRail({ activeSection, onNavigate }: SectionRailProps) {
  return (
    <aside
      aria-label="Section Chapter Navigation"
      className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-1.5"
    >
      {CHAPTERS.map((chapter) => {
        const isActive = activeSection === chapter.id;
        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => onNavigate(chapter.id)}
            aria-label={`Jump to ${chapter.label}`}
            aria-current={isActive ? 'step' : undefined}
            className="group flex items-center gap-2.5 py-1 px-1.5 text-right focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
          >
            <span
              className={`font-mono-tech text-[10px] uppercase tracking-wider transition-all duration-150 ${
                isActive
                  ? 'opacity-100 text-[#00D9FF] translate-x-0'
                  : 'opacity-0 group-hover:opacity-100 text-[#94A3B8] translate-x-1 group-hover:translate-x-0'
              }`}
            >
              {chapter.num} · {chapter.label}
            </span>
            <span
              aria-hidden="true"
              className={`block h-[2px] transition-all duration-200 ${
                isActive
                  ? 'w-6 bg-[#00D9FF]'
                  : 'w-3 bg-white/25 group-hover:w-5 group-hover:bg-white/70'
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
}
