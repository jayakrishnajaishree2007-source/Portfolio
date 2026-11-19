import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PROJECTS, ProjectItem, SKILL_CATEGORIES, SKILLS, SkillCategory } from '../data/portfolioData';

interface SkillsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const SKILL_PROJECT_LINKS: Record<string, string[]> = {
  Python: ['aether-routine', 'predictive-te-sr'],
  JavaScript: ['alumni-management-system', 'aether-routine'],
  HTML: ['alumni-management-system'],
  CSS: ['alumni-management-system', 'aether-routine'],
  React: ['aether-routine'],
  Routing: ['predictive-te-sr'],
  'Network Engineering': ['predictive-te-sr'],
  'Machine Learning': ['aether-routine', 'predictive-te-sr'],
  XGBoost: ['predictive-te-sr'],
  MySQL: ['alumni-management-system', 'student-module', 'aether-routine'],
  Linux: ['predictive-te-sr'],
  Docker: ['predictive-te-sr'],
};

const CATEGORY_TEXT_CLASS: Record<string, string> = {
  Programming: 'text-[#38BDF8] hover:text-white',
  'Web Development': 'text-[#34D399] hover:text-white',
  Networking: 'text-[#00D9FF] hover:text-white',
  'AI / Machine Learning': 'text-[#C084FC] hover:text-white',
  'Databases & Tools': 'text-[#FCD34D] hover:text-white',
};

export function SkillsSection({ onSelectProject }: SkillsSectionProps) {
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

  const relatedProjects = useMemo(() => {
    const ids = SKILL_PROJECT_LINKS[activeItem.name] ?? [];
    return PROJECTS.filter((p) => ids.includes(p.id));
  }, [activeItem.name]);

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 border-b border-white/10 bg-[#0A0D12]/80 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#00D9FF]">
              05 · Metallic Geometric Stack
            </p>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white mt-2">
              <span className="text-[#00D9FF]">Technical</span> Capabilities
            </h2>
          </div>

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
                  className={`px-3.5 py-2 border font-mono-tech text-xs uppercase tracking-wider transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF] ${
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
          {/* Left: Interactive Chrome Typographic Field */}
          <div className="lg:col-span-8 skills-scrub-wall flex flex-wrap items-baseline gap-x-7 gap-y-4">
            {filteredSkills.map((skill) => {
              const isActive = activeItem.name === skill.name;

              return (
                <button
                  key={skill.name}
                  type="button"
                  onMouseEnter={() => setSelectedSkill(skill.name)}
                  onFocus={() => setSelectedSkill(skill.name)}
                  onClick={() => setSelectedSkill(skill.name)}
                  data-cursor="INSPECT"
                  className={`group inline-flex items-baseline gap-2 text-left transition-transform duration-150 focus-visible:outline-2 focus-visible:outline-[#00D9FF] ${
                    isActive ? 'translate-x-1' : ''
                  }`}
                >
                  <span
                    className={`font-display text-2xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight leading-none transition-colors ${
                      isActive
                        ? 'text-[#00D9FF] underline decoration-[#00D9FF] decoration-2 underline-offset-8'
                        : CATEGORY_TEXT_CLASS[skill.category] ?? 'text-[#D5DDE8] hover:text-[#00D9FF]'
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
              <span className="font-mono-tech text-xs text-[#7D8CA3] tabular-nums">
                {filteredSkills.length} in view
              </span>
            </div>

            <div
              aria-hidden="true"
              className="h-32 border border-white/10 bg-[#080A0E] obsidian-grid-bg relative overflow-hidden flex items-center justify-center"
            >
              <div
                className={`w-16 h-16 border transition-all duration-300 ${
                  activeItem.accent === 'cyan'
                    ? 'border-[#00D9FF] bg-[#00D9FF]/15 rotate-12'
                    : activeItem.accent === 'chrome'
                    ? 'border-white/70 bg-gradient-to-br from-white/30 to-slate-500/10 rounded-full scale-110'
                    : 'border-white/30 bg-[#141923] -rotate-12'
                }`}
              />
            </div>

            <div>
              <p className="font-mono-tech text-xs uppercase tracking-widest text-[#00D9FF] font-semibold">
                {activeItem.category}
              </p>
              <h3 className="font-display text-3xl font-extrabold text-white mt-1">
                {activeItem.name}
              </h3>
              <p className="text-sm sm:text-base text-[#94A3B8] mt-2 leading-relaxed">
                Applied across: <strong className="text-white font-medium">{activeItem.context}</strong>
              </p>
            </div>

            {relatedProjects.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#00D9FF]">
                  Explore in Portfolio Projects
                </p>
                <div className="flex flex-col gap-2">
                  {relatedProjects.map((proj) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => onSelectProject(proj)}
                      className="w-full px-3 py-2 border border-white/15 bg-[#10131A] hover:border-[#00D9FF] text-left flex items-center justify-between gap-2 transition-colors group"
                    >
                      <span className="font-mono-tech text-xs text-white group-hover:text-[#00D9FF] truncate">
                        {proj.number} · {proj.title}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#00D9FF] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
