import { ArrowDownRight, ArrowUpRight, Github, Globe, Linkedin, Mail } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { SectionId } from './Navbar';
import { PortraitFrame } from './PortraitFrame';

interface HeroSectionProps {
  onNavigate: (id: SectionId) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-16 sm:pb-24 flex items-center border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12">
        {/* Precision Studio Top Index Bar */}
        <div className="hero-stagger flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-white/10 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-[#00D9FF]" aria-hidden="true" />
            <span className="text-white font-semibold">01 / Studio Index</span>
          </div>
          <span>{PROFILE.roleLine}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Oversized Liquid-Chrome Typography */}
          <div className="lg:col-span-7 space-y-7 hero-scrub-title">
            <h1 className="hero-stagger font-display font-extrabold uppercase leading-[0.94] tracking-[-0.03em] text-[clamp(1.95rem,8.2vw,3.6rem)] lg:text-[clamp(2.9rem,4.6vw,5.1rem)] whitespace-nowrap">
              <span className="chrome-text">{PROFILE.heroDisplayName}</span>
              <span className="text-[#00D9FF]">.</span>
            </h1>

            <div className="hero-stagger flex items-start gap-4 max-w-2xl">
              <span
                aria-hidden="true"
                className="mt-2.5 h-[2px] w-7 bg-[#00D9FF] shrink-0"
              />
              <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#E2E8F0]">
                {PROFILE.tagline}
              </p>
            </div>

            <p className="hero-stagger text-sm sm:text-base leading-relaxed text-[#94A3B8] max-w-xl">
              {PROFILE.heroIntro}
            </p>

            <div className="hero-stagger pt-2 flex flex-wrap items-center gap-4">
              <MagneticButton strength={0.2}>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  data-cursor="WORK"
                  className="px-6 py-3.5 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-xs font-semibold uppercase tracking-[0.18em] flex items-center gap-2.5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                >
                  <span>Selected Work</span>
                  <ArrowDownRight className="w-4 h-4" />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  data-cursor="EMAIL"
                  className="px-6 py-3.5 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] text-white font-mono-tech text-xs uppercase tracking-[0.18em] flex items-center gap-2.5 border border-white/20 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4 text-[#00D9FF]" />
                </button>
              </MagneticButton>
            </div>

            <div className="hero-stagger pt-5 flex flex-wrap items-center gap-6 border-t border-white/10 max-w-xl">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#E2E8F0] hover:text-[#00D9FF] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINKEDIN"
                className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#E2E8F0] hover:text-[#00D9FF] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PROFILE.servicesUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="STUDIO"
                className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#00D9FF] hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{PROFILE.servicesDomain}</span>
              </a>

              <a
                href={`mailto:${PROFILE.email}`}
                data-cursor="MAIL"
                className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#94A3B8] hover:text-[#00D9FF] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#00D9FF]" />
                <span className="truncate max-w-[220px] sm:max-w-none">{PROFILE.email}</span>
              </a>
            </div>
          </div>

          {/* Right Integrated Portrait Composition */}
          <div className="lg:col-span-5 hero-scrub-portrait flex justify-center lg:justify-end">
            <div className="w-full max-w-[390px] xl:max-w-[420px]">
              <PortraitFrame variant="hero" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
