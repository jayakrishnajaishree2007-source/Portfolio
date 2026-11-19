import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { PortraitFrame } from './PortraitFrame';

export function AboutSection() {
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
          <span className="text-[#FDE047]">PSG Polytechnic College</span>
          <span className="text-[#FCD34D]">/</span>
          <span className="text-[#38BDF8]">Computer Networking</span>
          <span className="text-[#00D9FF]">/</span>
          <span className="text-[#C084FC]">Applied AI &amp; Machine Learning</span>
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
          {/* Left Editorial Statement & Bio */}
          <div className="lg:col-span-7 space-y-8 about-scrub-copy">
            <div className="space-y-3">
              <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#00D9FF]">
                02 / Spatial Profile
              </p>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[0.95] text-white">
                Building <span className="gradient-text-cyan">Resilient Networks</span> &amp; <span className="gradient-text-emerald">Practical Software</span>.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-white/10">
              <p className="text-sm sm:text-base leading-relaxed text-[#F1F5F9]">
                I am a Diploma student in <span className="text-[#38BDF8] font-medium">Computer Networking</span> at PSG Polytechnic College. I enjoy building practical software systems and exploring how artificial intelligence makes computer networks <span className="text-[#34D399] font-medium">smarter, resilient, and more observable</span>.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#F1F5F9]">
                Across <span className="text-[#38BDF8] font-medium">networking infrastructure</span>, applied <span className="text-[#C084FC] font-medium">machine learning</span>, and end-to-end web engineering, I focus on turning real institutional and technical constraints into <span className="text-[#FCD34D] font-medium">clean, structured systems</span>.
              </p>
            </div>

            {/* Key Institutional & Practice Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border border-white/15 divide-y sm:divide-y-0 sm:divide-x divide-white/15 bg-[#0C0F15]/90">
              <div className="p-5">
                <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38BDF8] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full inline-block" />
                  Institution
                </p>
                <p className="font-display font-bold text-base text-white mt-2">
                  {PROFILE.education.institution}
                </p>
                <p className="font-mono-tech text-xs text-[#94A3B8] mt-1">
                  {PROFILE.education.period}
                </p>
              </div>

              <div className="p-5">
                <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#FCD34D] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#FCD34D] rounded-full inline-block" />
                  Leadership
                </p>
                <p className="font-display font-bold text-base text-[#FDE047] mt-2">
                  CNA Secretary
                </p>
                <p className="font-mono-tech text-xs text-[#94A3B8] mt-1">
                  {PROFILE.currentRole.period} Term
                </p>
              </div>

              <div className="p-5 bg-[#10131A]">
                <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#C084FC] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#C084FC] rounded-full inline-block" />
                  Official Web Studio
                </p>
                <a
                  href={PROFILE.servicesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="VISIT"
                  className="font-display font-bold text-base text-[#C084FC] hover:text-white mt-2 inline-flex items-center gap-1 transition-colors"
                >
                  <span>{PROFILE.servicesDomain}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C084FC]" />
                </a>
                <p className="font-mono-tech text-xs text-[#94A3B8] mt-1">
                  Custom Web Engineering
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <MagneticButton strength={0.18}>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="LINKEDIN"
                  className="inline-flex items-center gap-2.5 px-5 py-3 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-xs font-semibold uppercase tracking-[0.18em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </MagneticButton>

              <MagneticButton strength={0.18}>
                <a
                  href={PROFILE.servicesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="AETHELON"
                  className="inline-flex items-center gap-2.5 px-5 py-3 border border-white/20 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] text-white font-mono-tech text-xs uppercase tracking-[0.18em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                >
                  <span>Web Studio · {PROFILE.servicesDomain}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#00D9FF]" />
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Right Scroll-Scrubbed Portrait Cutout */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="about-scrub-portrait w-full max-w-[390px]">
              <PortraitFrame variant="about" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
