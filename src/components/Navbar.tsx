import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PROFILE } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';

export type SectionId =
  | 'home'
  | 'about'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'achievements'
  | 'album'
  | 'contact';

interface NavbarProps {
  activeSection: SectionId;
  progressBarRef: React.RefObject<HTMLDivElement | null>;
  onNavigate: (id: SectionId) => void;
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'album', label: 'Album' },
];

export function Navbar({ activeSection, progressBarRef, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const handleLinkClick = (id: SectionId) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-[#080A0E]/95">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <a
            href="#home"
            data-cursor="TOP"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="font-display text-xl sm:text-2xl font-extrabold tracking-[-0.04em] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
          >
            <span className="gradient-text-cyan">JAYAKRISHNA</span>
            <span className="text-[#00D9FF] text-lg font-bold ml-0.5">®</span>
          </a>

          <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1 border border-[#34D399]/35 bg-[#34D399]/10 text-[#34D399] font-mono-tech text-[11px] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
            <span>Open for Opportunities</span>
          </div>
        </div>

        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className={`relative py-1.5 text-sm font-medium tracking-tight whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#00D9FF] ${
                  isActive ? 'text-[#00D9FF]' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#00D9FF] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <MagneticButton strength={0.18}>
            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              data-cursor="CONTACT"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#10131A] hover:bg-[#00D9FF] text-white hover:text-[#080A0E] border border-white/15 hover:border-[#00D9FF] text-xs font-mono-tech uppercase tracking-wider transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </MagneticButton>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden h-11 w-11 border border-white/15 bg-[#10131A] flex items-center justify-center text-white hover:border-[#00D9FF] transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Zero-rerender Scroll Progress Hairline */}
      <div aria-hidden="true" className="h-[1.5px] w-full bg-white/5 overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-[#00D9FF] origin-left will-change-transform"
          style={{ transform: 'scaleX(0.02)' }}
        />
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#080A0E] px-5 py-3 space-y-1">
          {[...NAV_ITEMS, { id: 'contact' as SectionId, label: 'Contact' }].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className={`flex items-center justify-between px-3 min-h-[44px] text-sm font-medium border-b border-white/5 last:border-b-0 transition-colors ${
                  isActive ? 'text-[#00D9FF] bg-[#10131A]' : 'text-[#F1F5F9] hover:text-[#00D9FF]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#00D9FF]">
                    Active
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
