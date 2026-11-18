import { useMemo, useState } from 'react';
import { SKILL_CATEGORIES, SKILLS, SkillCategory } from '../data/portfolioData';

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>(SKILLS[0].name);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return SKILLS;
    return SKILLS.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  const activeItem = useMemo(
    () =>
      filteredSkills.find((s) => s.name === selectedSkill) ??
      filteredSkills[0] ??
      SKILLS[0],
    [filteredSkills, selectedSkill]
  );

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 border-b border-white/10 bg-[#0A0D12]/80 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#00D9FF]">
              05 / Metallic Geometric Stack
            </p>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white mt-2">
              <span className="chrome-text">Technical</span> Capabilities
            </h2>
          </div>

          {/* Interactive Category Filter */}
          <div
            role="tablist"
            aria-label="Filter technical skills by category"
            className="flex flex-wrap gap-2"
          >
            {SKILL_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  data-cursor="FILTER"
                  className={`px-3.5 py-2 border font-mono-tech text-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF] ${
                    isSelected
                      ? 'border-[#00D9FF] bg-[#00D9FF] text-[#080A0E] font-semibold'
                      : 'border-white/15 bg-[#10131A] text-[#CBD5E1] hover:border-[#00D9FF] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Interactive Chrome Typographic + Metallic Geometric Field */}
          <div className="lg:col-span-8 skills-scrub-wall flex flex-wrap items-baseline gap-x-6 gap-y-4">
            {filteredSkills.map((skill, idx) => {
              const isActive = activeItem.name === skill.name;
              const shapeType = idx % 3;

              return (
                <button
                  key={skill.name}
                  type="button"
                  onMouseEnter={() => setSelectedSkill(skill.name)}
                  onFocus={() => setSelectedSkill(skill.name)}
                  onClick={() => setSelectedSkill(skill.name)}
                  data-cursor="INSPECT"
                  className={`group inline-flex items-center gap-3 text-left transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-[#00D9FF] ${
                    isActive ? 'translate-x-1' : ''
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-block shrink-0 border transition-transform duration-300 group-hover:rotate-45 ${
                      shapeType === 0
                        ? 'w-3.5 h-3.5 border-[#00D9FF] bg-[#00D9FF]/20'
                        : shapeType === 1
                        ? 'w-3.5 h-3.5 rounded-full border-[#CBD5E1] bg-white/10'
                        : 'w-3.5 h-3.5 rotate-45 border-white/40 bg-[#181D27]'
                    } ${isActive ? 'scale-125 border-[#00D9FF]' : ''}`}
                  />
                  <span
                    className={`font-display text-2xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight leading-none transition-colors ${
                      isActive
                        ? 'text-[#00D9FF] underline decoration-[#00D9FF] decoration-2 underline-offset-8'
                        : 'chrome-text opacity-80 hover:opacity-100'
                    }`}
                  >
                    {skill.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Graphite Metallic Inspector Panel */}
          <aside className="lg:col-span-4 border border-white/15 bg-[#0C0F15] p-7 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono-tech text-xs uppercase tracking-widest text-[#00D9FF]">
                Active Node
              </span>
              <span className="font-mono-tech text-xs text-[#94A3B8]">
                {filteredSkills.length} in view
              </span>
            </div>

            {/* Dynamic Metallic Geometry Stage */}
            <div
              aria-hidden="true"
              className="h-36 border border-white/10 bg-[#080A0E] obsidian-grid-bg relative overflow-hidden flex items-center justify-center"
            >
              <div
                className={`w-20 h-20 border transition-all duration-500 ${
                  activeItem.accent === 'cyan'
                    ? 'border-[#00D9FF] bg-[#00D9FF]/15 rotate-12'
                    : activeItem.accent === 'chrome'
                    ? 'border-white/70 bg-gradient-to-br from-white/30 to-slate-500/10 rounded-full scale-110'
                    : 'border-white/30 bg-[#141923] -rotate-12'
                }`}
              />
              <div className="absolute bottom-3 left-3 w-4 h-4 border border-[#00D9FF]/60 bg-[#080A0E]" />
              <div className="absolute top-3 right-3 w-4 h-4 rounded-full border border-white/40 bg-[#10131A]" />
            </div>

            <div>
              <p className="font-mono-tech text-xs uppercase tracking-widest text-[#94A3B8]">
                {activeItem.category}
              </p>
              <h3 className="font-display text-3xl font-extrabold text-white mt-1">
                {activeItem.name}
              </h3>
              <p className="text-sm sm:text-base text-[#94A3B8] mt-2 leading-relaxed">
                Applied across: <strong className="text-[#E2E8F0]">{activeItem.context}</strong>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
