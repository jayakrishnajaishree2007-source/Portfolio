import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  PROJECTS,
  ProjectItem,
  SKILL_CATEGORIES,
  SKILLS,
  SkillCategory,
} from '../data/portfolioData';
import { TechIcon } from './TechIcon';

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
  Programming: 'text-[#38BDF8] group-hover:text-white',
  'Web Development': 'text-[#34D399] group-hover:text-white',
  Networking: 'text-[#00D9FF] group-hover:text-white',
  'AI / Machine Learning': 'text-[#C084FC] group-hover:text-white',
  'Databases & Tools': 'text-[#FCD34D] group-hover:text-white',
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
          {/* Left: Interactive Chrome Typographic Field with Tech Icons */}
          <div className="lg:col-span-8 skills-scrub-wall flex flex-wrap items-center gap-3 sm:gap-4">
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
                  className={`group inline-flex items-center gap-3 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#00D9FF] py-2.5 px-3.5 sm:px-4 border backdrop-blur-md ${
                    isActive
                      ? 'border-[#00D9FF] bg-[#10131A] shadow-[0_0_20px_rgba(0,217,255,0.25)] translate-x-1'
                      : 'border-white/15 bg-[#0C0F15]/90 hover:border-white/30 hover:bg-[#10131A]/90'
                  }`}
                >
                  <span className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <TechIcon name={skill.name} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                  </span>
                  <span
                    className={`font-display text-lg sm:text-2xl font-bold tracking-tight leading-none transition-colors ${
                      isActive
                        ? 'text-[#00D9FF]'
                        : CATEGORY_TEXT_CLASS[skill.category] ?? 'text-[#D5DDE8]'
                    }`}
                  >
                    {skill.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Graphite Metallic Inspector Panel with Large Tech Logo Stage */}
          <aside className="lg:col-span-4 border border-white/15 bg-[#0C0F15]/95 backdrop-blur-md p-7 sm:p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono-tech text-xs uppercase tracking-widest text-[#00D9FF]">
                Active Node
              </span>
              <span className="font-mono-tech text-xs text-[#7D8CA3] tabular-nums">
                {filteredSkills.length} in view
              </span>
            </div>

            {/* Official Tech Stack Logo Display Box */}
            <div
              aria-hidden="true"
              className="h-36 border border-white/15 bg-[#080A0E] obsidian-grid-bg relative overflow-hidden flex items-center justify-center p-4 group"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.18),transparent_65%)] pointer-events-none"
              />
              <div className="relative z-10 transition-transform duration-300 transform group-hover:scale-110 drop-shadow-[0_4px_20px_rgba(0,217,255,0.35)] flex flex-col items-center gap-2">
                <TechIcon name={activeItem.name} className="w-16 h-16 sm:w-20 sm:h-20" />
                <span className="font-mono-tech text-[10px] text-[#00D9FF] tracking-widest uppercase font-semibold">
                  {activeItem.name} Architecture
                </span>
              </div>
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
