import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { EXPERIENCE_TIMELINE, PROFILE } from '../data/portfolioData';

const TYPE_STYLES: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  Education: { text: 'text-[#38BDF8]', bg: 'bg-[#38BDF8]/10', border: 'border-[#38BDF8]/40', dot: 'bg-[#38BDF8]' },
  Leadership: { text: 'text-[#34D399]', bg: 'bg-[#34D399]/10', border: 'border-[#34D399]/40', dot: 'bg-[#34D399]' },
  Internship: { text: 'text-[#C084FC]', bg: 'bg-[#C084FC]/10', border: 'border-[#C084FC]/40', dot: 'bg-[#C084FC]' },
  'Web Studio': { text: 'text-[#FCD34D]', bg: 'bg-[#FCD34D]/10', border: 'border-[#FCD34D]/40', dot: 'bg-[#FCD34D]' },
};

export function ExperienceSection() {
  const [focusedId, setFocusedId] = useState<string>(EXPERIENCE_TIMELINE[0].id);

  const handleFocusMilestone = (id: string) => {
    setFocusedId(id);
    const el = document.getElementById(`milestone-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  return (
    <section
      id="experience"
      className="exp-pin-section relative py-20 lg:py-24 border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 mb-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#00D9FF]">
              04 · Metallic Timeline
            </p>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white mt-2">
              <span className="text-[#00D9FF]">Experience</span> &amp; Web Studio
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden lg:inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#94A3B8]">
              <span>Scroll to advance timeline</span>
              <ArrowRight className="w-4 h-4 text-[#00D9FF]" />
            </span>

            <a
              href={PROFILE.servicesUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="AETHELON"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#10131A] hover:bg-[#00D9FF] text-white hover:text-[#080A0E] border border-white/20 hover:border-[#00D9FF] font-mono-tech text-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
            >
              <span>Web Studio · {PROFILE.servicesDomain}</span>
              <ArrowUpRight className="w-4 h-4 text-[#00D9FF]" />
            </a>
          </div>
        </div>

        {/* Interactive Milestone Filter / Focus Strip */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/10">
          {EXPERIENCE_TIMELINE.map((m) => {
            const active = focusedId === m.id;
            const style = TYPE_STYLES[m.type] ?? TYPE_STYLES.Education;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleFocusMilestone(m.id)}
                className={`px-3 py-1.5 border font-mono-tech text-[11px] uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${active
                  ? `${style.border} ${style.bg} ${style.text} font-semibold shadow-[0_0_12px_rgba(0,217,255,0.15)]`
                  : 'border-white/15 bg-[#0C0F15] text-[#CBD5E1] hover:border-white/30 hover:text-white'
                  }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                <span>{m.index} · {m.type}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Connected Metallic Timeline Track (Pinned on Desktop via GSAP ScrollTrigger) */}
      <div className="px-5 sm:px-8 lg:px-12">
        <div className="exp-track relative flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10 will-change-transform">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-11 left-0 right-0 h-[1px] bg-gradient-to-r from-[#00D9FF]/60 via-white/30 to-[#00D9FF]/60 pointer-events-none"
          />

          {EXPERIENCE_TIMELINE.map((item) => {
            const isHighlighted = focusedId === item.id;
            const style = TYPE_STYLES[item.type] ?? TYPE_STYLES.Education;
            return (
              <article
                id={`milestone-${item.id}`}
                key={item.id}
                onMouseEnter={() => setFocusedId(item.id)}
                className={`exp-milestone relative w-full lg:w-[44vw] xl:w-[38vw] shrink-0 border p-7 sm:p-9 flex flex-col justify-between gap-8 transition-colors duration-150 ${isHighlighted
                  ? 'border-[#00D9FF]/60 bg-[#10131A]/95 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                  : 'border-white/15 bg-[#0C0F15]/92'
                  }`}
              >
                <span
                  aria-hidden="true"
                  className="hidden lg:flex absolute -top-[7px] left-9 w-3.5 h-3.5 rotate-45 border border-[#00D9FF] bg-[#080A0E] items-center justify-center"
                >
                  <span className="w-1.5 h-1.5 bg-[#00D9FF]" />
                </span>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <span
                      className={`font-display text-4xl font-extrabold tabular-nums ${isHighlighted ? 'text-[#00D9FF]' : 'text-[#38BDF8]'
                        }`}
                    >
                      {item.index}
                    </span>
                    <div className="text-right">
                      <p className={`font-mono-tech text-[11px] uppercase tracking-widest font-semibold px-2 py-0.5 border ${style.border} ${style.bg} ${style.text}`}>
                        {item.type}
                      </p>
                      <p className="font-mono-tech text-xs text-[#94A3B8] mt-1">{item.period}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      {item.role}
                    </h3>
                    <p className={`font-mono-tech text-xs uppercase tracking-wider mt-1.5 font-medium ${style.text}`}>
                      {item.organization}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed text-[#F1F5F9]">
                    {item.summary}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <ul className="space-y-2">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-[#E2E8F0]">
                        <span
                          aria-hidden="true"
                          className="mt-2 w-1.5 h-1.5 bg-[#00D9FF] shrink-0"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {item.linkUrl && (
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="VISIT"
                      className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#00D9FF] hover:text-white pt-1 transition-colors"
                    >
                      <span>Explore {item.linkLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
