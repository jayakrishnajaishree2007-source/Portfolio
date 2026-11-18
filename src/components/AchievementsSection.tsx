import { useEffect, useRef, useState } from 'react';
import { ACHIEVEMENTS } from '../data/portfolioData';

export function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progressRatio, setProgressRatio] = useState(0);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setProgressRatio(1);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          const start = performance.now();
          const duration = 950;
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setProgressRatio(eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative py-24 sm:py-32 border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#00D9FF]">
              06 / Verified Recognition
            </p>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white mt-2">
              <span className="chrome-text">Achievements</span> &amp; Distinctions
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-md">
            Documented academic honors, leadership service, and research milestones across state and national technical forums.
          </p>
        </div>

        {/* Monumental Obsidian & Chrome Editorial Rows */}
        <div className="border-t border-white/15">
          {ACHIEVEMENTS.map((item) => {
            let animatedMetric = item.metric;
            if (item.numericTarget !== undefined) {
              const val = Math.max(1, Math.round(progressRatio * item.numericTarget));
              const isOrdinal =
                item.numericSuffix === 'st' ||
                item.numericSuffix === 'nd' ||
                item.numericSuffix === 'rd';
              const formatted = isOrdinal && val < 10 ? `0${val}` : `${val}`;
              animatedMetric = `${formatted}${item.numericSuffix ?? ''}`;
            }

            const badgeStyle =
              item.accent === 'cyan'
                ? 'border-[#00D9FF]/50 bg-[#0D1A22] text-[#00D9FF]'
                : item.accent === 'chrome'
                ? 'border-white/30 bg-[#131822] chrome-text'
                : 'border-white/15 bg-[#0C0F15] text-white';

            return (
              <article
                key={item.id}
                className="ach-row group border-b border-white/15 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover:bg-[#10131A]/80 transition-colors px-2 sm:px-4"
              >
                <div className="lg:col-span-2 font-mono-tech text-xs uppercase tracking-widest text-[#94A3B8]">
                  Index / {item.index}
                </div>

                <div className="lg:col-span-3">
                  <span
                    className={`inline-block font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight px-4 py-2 border ${badgeStyle}`}
                  >
                    {animatedMetric}
                  </span>
                </div>

                <div className="lg:col-span-4">
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#00D9FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-mono-tech text-xs uppercase tracking-wider text-[#00D9FF] mt-1">
                    {item.subtitle}
                  </p>
                </div>

                <div className="lg:col-span-3 text-sm text-[#94A3B8] leading-relaxed">
                  {item.detail}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
