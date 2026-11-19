import { ArrowUpRight, Award, Camera, Globe, GraduationCap, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { SectionId } from './Navbar';

interface AboutSectionProps {
  onNavigate?: (id: SectionId) => void;
}

export function AboutSection({ onNavigate }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 border-b border-white/10 overflow-hidden"
    >
      {/* Scroll-Scrubbed Metallic Editorial Strip */}
      <div
        aria-hidden="true"
        className="border-y border-white/10 bg-[#0C0F15]/90 py-3.5 mb-16 overflow-hidden"
      >
        <div className="about-scrub-marquee flex items-center gap-8 whitespace-nowrap font-display text-lg sm:text-2xl font-bold uppercase tracking-tight will-change-transform">
          <span className="text-[#38BDF8]">Computer Networking</span>
          <span className="text-[#00D9FF]">/</span>
          <span className="text-[#C084FC]">Applied AI &amp; Machine Learning</span>
          <span className="text-[#FCD34D]">/</span>
          <span className="text-[#34D399]">Full-Stack Architecture</span>
          <span className="text-[#00D9FF]">/</span>
          <span className="text-[#FDE047]">PSG Polytechnic College · 9.92 CGPA</span>
          <span className="text-[#FCD34D]">/</span>
          <span className="text-[#38BDF8]">CNA Secretary 2026–27</span>
          <span className="text-[#00D9FF]">/</span>
          <span className="text-[#34D399]">Web Studio aethelontech.in</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative">
        {/* Subtle Floating Metallic Geometric Anchors (Scrubbed by ScrollTrigger) */}
        <div
          aria-hidden="true"
          className="about-float-shape hidden lg:block absolute -top-6 right-16 w-14 h-14 border border-white/25 bg-[#10131A] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="about-float-shape hidden lg:block absolute bottom-8 left-[42%] w-10 h-10 rounded-full border border-[#00D9FF]/60 bg-[#080A0E] pointer-events-none"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Clean Editorial Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-8 about-scrub-copy">
            {/* Narrative Editorial Card with Frosted Glass Blur Backdrop */}
            <div className="p-6 sm:p-8 border border-white/15 bg-[#0C0F15]/90 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.45)] space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.22em] text-[#00D9FF]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>02 · Spatial Profile</span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[0.96] text-white">
                  Engineering <span className="gradient-text-cyan">Resilient Networks</span> &amp;{' '}
                  <span className="gradient-text-emerald">Practical Software</span>.
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-white/10 text-sm sm:text-base leading-relaxed text-[#D5DDE8]">
                <p>
                  I am a Diploma student in{' '}
                  <span className="text-[#38BDF8] font-semibold">Computer Networking</span> at PSG
                  Polytechnic College. I enjoy architecting dependable systems and exploring how machine
                  learning makes networking infrastructure{' '}
                  <span className="text-[#34D399] font-medium">smarter, observable, and resilient</span>.
                </p>
                <p>
                  From <span className="text-[#38BDF8] font-medium">Segment Routing</span> topologies
                  to applied <span className="text-[#C084FC] font-medium">traffic engineering</span> and
                  full-stack web development, I focus on turning complex technical challenges into{' '}
                  <span className="text-[#FCD34D] font-medium">structured, scalable engineering</span>.
                </p>
              </div>
            </div>

            {/* Clean 3-Column Institutional Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border border-white/15 divide-y sm:divide-y-0 sm:divide-x divide-white/15 bg-[#0C0F15]/90 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
              <div className="p-6 space-y-1.5">
                <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38BDF8] flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Academics</span>
                </p>
                <p className="font-display font-bold text-base text-white">
                  PSG Polytechnic
                </p>
                <p className="font-mono-tech text-xs text-[#34D399]">
                  9.92 CGPA · 4th Sem (2nd Rank)
                </p>
              </div>

              <div className="p-6 space-y-1.5">
                <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#FCD34D] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Leadership</span>
                </p>
                <p className="font-display font-bold text-base text-[#FDE047]">
                  CNA Secretary
                </p>
                <p className="font-mono-tech text-xs text-[#94A3B8]">
                  2026–27 Executive Term
                </p>
              </div>

              <div className="p-6 space-y-1.5 bg-[#10131A]/80">
                <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#C084FC] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Web Studio</span>
                </p>
                <a
                  href={PROFILE.servicesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="VISIT"
                  className="font-display font-bold text-base text-[#C084FC] hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  <span>{PROFILE.servicesDomain}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C084FC]" />
                </a>
                <p className="font-mono-tech text-xs text-[#94A3B8]">
                  Production Web Systems
                </p>
              </div>
            </div>

            {/* Direct Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {onNavigate && (
                <MagneticButton strength={0.18}>
                  <button
                    type="button"
                    onClick={() => onNavigate('album')}
                    data-cursor="ALBUM"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-xs font-semibold uppercase tracking-[0.18em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                  >
                    <Camera className="w-4 h-4" />
                    <span>View Visual Journey (47 Photos)</span>
                  </button>
                </MagneticButton>
              )}

              <MagneticButton strength={0.18}>
                <a
                  href={PROFILE.servicesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="AETHELON"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-white/20 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] text-white font-mono-tech text-xs uppercase tracking-[0.18em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                >
                  <Globe className="w-4 h-4 text-[#00D9FF]" />
                  <span>Web Studio · {PROFILE.servicesDomain}</span>
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Right: Elegant, Clean Obsidian Specification Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="about-scrub-portrait w-full max-w-[420px] border border-white/15 bg-[#0C0F15]/95 backdrop-blur-md p-8 sm:p-10 shadow-[0_24px_75px_rgba(0,0,0,0.7)] space-y-7">
              {/* Card Header Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF]">
                    Spatial Specification
                  </p>
                  <h3 className="font-display text-2xl font-extrabold text-white mt-1">
                    Jayakrishna J
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 border border-[#34D399]/40 bg-[#34D399]/10 text-[#34D399] font-mono-tech text-[10px] tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Core Engineering Disciplines */}
              <div className="space-y-4">
                <p className="font-mono-tech text-xs uppercase tracking-wider text-[#94A3B8]">
                  Core Specializations
                </p>

                <div className="space-y-3 font-mono-tech text-xs">
                  <div className="flex items-start gap-3 p-3 border border-white/10 bg-[#080A0E]">
                    <span className="text-[#00D9FF] font-bold">01</span>
                    <div>
                      <p className="text-white font-semibold">Computer Networking</p>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5">Segment Routing, IS-IS, VLANs &amp; FRR</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border border-white/10 bg-[#080A0E]">
                    <span className="text-[#C084FC] font-bold">02</span>
                    <div>
                      <p className="text-white font-semibold">Applied Machine Learning</p>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5">XGBoost Traffic Engineering &amp; AI Tools</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border border-white/10 bg-[#080A0E]">
                    <span className="text-[#34D399] font-bold">03</span>
                    <div>
                      <p className="text-white font-semibold">Full-Stack Web Systems</p>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5">React, Tailwind CSS, FastAPI &amp; MySQL</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Institutional Summary */}
              <div className="pt-4 border-t border-white/10 space-y-2 font-mono-tech text-xs">
                <div className="flex items-center justify-between text-[#94A3B8]">
                  <span>Campus:</span>
                  <span className="text-white font-medium">PSG Polytechnic, Coimbatore</span>
                </div>
                <div className="flex items-center justify-between text-[#94A3B8]">
                  <span>Academic Standing:</span>
                  <span className="text-[#FDE047] font-semibold">9.92 CGPA (as of 4th Sem · 2nd Rank)</span>
                </div>
                <div className="flex items-center justify-between text-[#94A3B8]">
                  <span>Current Role:</span>
                  <span className="text-[#38BDF8] font-medium">CNA Secretary 2026–27</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
