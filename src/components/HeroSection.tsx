import { ArrowDownRight, ArrowUpRight, Check, Copy, Github, Globe, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
import { PROFILE } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { SectionId } from './Navbar';
import { PortraitFrame } from './PortraitFrame';

interface HeroSectionProps {
  onNavigate: (id: SectionId) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-14 sm:pb-20 flex items-center border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 space-y-12">
        {/* Precision Studio Top Index Bar */}
        <div className="hero-stagger flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10 font-mono-tech text-xs tracking-[0.18em]">
          <span className="text-[#00D9FF] font-semibold uppercase">01 · Studio Index</span>
          <span className="uppercase text-[#7DD3FC]">{PROFILE.roleLine}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Oversized Liquid-Chrome Typography */}
          <div className="lg:col-span-7 space-y-6 hero-scrub-title">
            <h1 className="hero-stagger font-display font-extrabold uppercase leading-[0.94] tracking-[-0.03em] text-[clamp(1.95rem,8.2vw,3.6rem)] lg:text-[clamp(2.9rem,4.6vw,5.1rem)] whitespace-nowrap">
              <span className="chrome-text">{PROFILE.heroDisplayName}</span>
              <span className="text-[#00D9FF]">.</span>
            </h1>

            <div className="hero-stagger flex items-start gap-4 max-w-2xl">
              <span
                aria-hidden="true"
                className="mt-2.5 h-[2px] w-7 bg-[#00D9FF] shrink-0"
              />
              <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                Engineering <span className="gradient-text-cyan">ideas</span> into <span className="gradient-text-emerald">real-world systems</span>.
              </p>
            </div>

            <p className="hero-stagger text-sm sm:text-base leading-relaxed text-[#F1F5F9] max-w-xl">
              Diploma student in <span className="text-[#38BDF8] font-semibold">Computer Networking</span> at PSG Polytechnic College building <span className="text-[#67E8F9] font-medium">full-stack web platforms</span>, relational database architectures, <span className="text-[#C084FC] font-medium">AI-assisted study systems</span>, and <span className="text-[#FCD34D] font-medium">Segment Routing</span> traffic engineering workflows.
            </p>

            <div className="hero-stagger pt-2 flex flex-wrap items-center gap-4">
              <MagneticButton strength={0.2}>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  data-cursor="WORK"
                  className="px-6 py-3.5 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-xs font-semibold uppercase tracking-[0.18em] flex items-center gap-2.5 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
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
                  className="px-6 py-3.5 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] text-white font-mono-tech text-xs uppercase tracking-[0.18em] flex items-center gap-2.5 border border-white/20 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4 text-[#00D9FF]" />
                </button>
              </MagneticButton>
            </div>

            <div className="hero-stagger pt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 max-w-2xl">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#E2E8F0] hover:text-[#00D9FF] transition-colors whitespace-nowrap shrink-0"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINKEDIN"
                className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#E2E8F0] hover:text-[#00D9FF] transition-colors whitespace-nowrap shrink-0"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PROFILE.servicesUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="STUDIO"
                className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#00D9FF] hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <Globe className="w-4 h-4" />
                <span>{PROFILE.servicesDomain}</span>
              </a>

              <div className="inline-flex items-center gap-2">
                <a
                  href={`mailto:${PROFILE.email}`}
                  data-cursor="MAIL"
                  className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#94A3B8] hover:text-[#00D9FF] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#00D9FF]" />
                  <span className="truncate max-w-[190px] sm:max-w-none">{PROFILE.email}</span>
                </a>
                <button
                  type="button"
                  onClick={() => void handleCopyEmail()}
                  aria-label="Copy email address"
                  data-cursor="COPY"
                  className="px-2 py-1 border border-white/15 bg-[#10131A] hover:border-[#00D9FF] text-[10px] font-mono-tech uppercase tracking-wider text-[#CBD5E1] hover:text-[#00D9FF] inline-flex items-center gap-1 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-[#00D9FF]" />
                      <span className="text-[#00D9FF]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Integrated Portrait Composition */}
          <div className="lg:col-span-5 hero-scrub-portrait flex justify-center lg:justify-end">
            <div className="w-full max-w-[390px] xl:max-w-[420px]">
              <PortraitFrame variant="hero" />
            </div>
          </div>
        </div>

        {/* Full-Width Quantitative Proof Strip (Below Hero Split) */}
        <div className="hero-stagger grid grid-cols-2 lg:grid-cols-4 border border-white/15 divide-y lg:divide-y-0 sm:divide-x divide-white/15 bg-[#0C0F15]/90">
          <button
            type="button"
            onClick={() => onNavigate('achievements')}
            className="p-4 sm:p-5 text-left hover:bg-[#10131A] transition-colors group focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
          >
            <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#FCD34D] font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#FCD34D] rounded-full inline-block" />
              Academic Rank
            </p>
            <p className="font-display text-lg sm:text-xl font-extrabold text-[#FDE047] mt-1 tabular-nums group-hover:text-white transition-colors">
              10 CGPA · 1st Rank
            </p>
            <p className="font-mono-tech text-[11px] text-[#CBD5E1] mt-0.5">
              3rd Semester · DCN
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('achievements')}
            className="p-4 sm:p-5 text-left hover:bg-[#10131A] transition-colors group focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
          >
            <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#34D399] font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#34D399] rounded-full inline-block" />
              National Forum
            </p>
            <p className="font-display text-lg sm:text-xl font-extrabold text-[#34D399] mt-1 group-hover:text-white transition-colors">
              1st Prize · SanTekFest 2K26
            </p>
            <p className="font-mono-tech text-[11px] text-[#CBD5E1] mt-0.5">
              Paper Presentation
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="p-4 sm:p-5 text-left hover:bg-[#10131A] transition-colors group focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
          >
            <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38BDF8] font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full inline-block" />
              Engineering Work
            </p>
            <p className="font-display text-lg sm:text-xl font-extrabold text-[#38BDF8] mt-1 tabular-nums group-hover:text-white transition-colors">
              4 Core Systems
            </p>
            <p className="font-mono-tech text-[11px] text-[#CBD5E1] mt-0.5">
              Full-Stack · AI · Segment Routing
            </p>
          </button>

          <a
            href={PROFILE.servicesUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="STUDIO"
            className="p-4 sm:p-5 text-left hover:bg-[#10131A] transition-colors group focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
          >
            <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#C084FC] font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#C084FC] rounded-full inline-block" />
              Official Web Studio
            </p>
            <p className="font-display text-lg sm:text-xl font-extrabold text-[#C084FC] mt-1 inline-flex items-center gap-1.5 group-hover:text-white transition-colors">
              <span>{PROFILE.servicesDomain}</span>
              <ArrowUpRight className="w-4 h-4 text-[#C084FC]" />
            </p>
            <p className="font-mono-tech text-[11px] text-[#CBD5E1] mt-0.5">
              Custom Web Engineering
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
