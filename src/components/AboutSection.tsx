import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  Camera,
  CheckCircle2,
  Cpu,
  Globe,
  Layers,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { useState } from 'react';
import { PROFILE } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { SectionId } from './Navbar';

interface AboutSectionProps {
  onNavigate?: (id: SectionId) => void;
}

type ConsoleTab = 'topology' | 'standing' | 'studio';

export function AboutSection({ onNavigate }: AboutSectionProps) {
  const [activeTab, setActiveTab] = useState<ConsoleTab>('topology');

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
          <span className="text-[#C084FC]">Applied AI &amp; Predictive TE</span>
          <span className="text-[#FCD34D]">/</span>
          <span className="text-[#34D399]">Full-Stack Systems</span>
          <span className="text-[#00D9FF]">/</span>
          <span className="text-[#FDE047]">PSG Polytechnic College · 10.00 CGPA</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Editorial Statement & Architecture Narrative */}
          <div className="lg:col-span-7 space-y-8 about-scrub-copy">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#00D9FF] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>02 / Spatial Profile</span>
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#94A3B8] border border-white/10 px-2 py-0.5 bg-[#10131A]">
                  PSG Tech Campus · [11.024° N, 76.993° E]
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[0.95] text-white">
                Engineering <span className="gradient-text-cyan">Resilient Networks</span> &amp;{' '}
                <span className="gradient-text-emerald">Practical Software</span>.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-white/10">
              <p className="text-sm sm:text-base leading-relaxed text-[#F1F5F9]">
                I am a Diploma student in{' '}
                <span className="text-[#38BDF8] font-semibold">Computer Networking</span> at PSG
                Polytechnic College. I architect practical software systems and explore how machine
                learning makes computer networks{' '}
                <span className="text-[#34D399] font-medium">
                  smarter, resilient, and observable
                </span>
                .
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#F1F5F9]">
                Across <span className="text-[#38BDF8] font-medium">networking infrastructure</span>
                , applied <span className="text-[#C084FC] font-medium">machine learning</span>, and
                end-to-end web engineering, I turn technical constraints into{' '}
                <span className="text-[#FCD34D] font-medium">clean, reliable systems</span>.
              </p>
            </div>

            {/* Spatial Capabilities Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-3 border border-white/15 bg-[#0C0F15]/90 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-[#38BDF8] font-mono-tech text-[10px] uppercase tracking-wider">
                  <Network className="w-3 h-3" />
                  <span>Protocols</span>
                </div>
                <p className="font-display text-xs sm:text-sm font-bold text-white mt-1">
                  Segment Routing
                </p>
                <p className="font-mono-tech text-[10px] text-[#94A3B8]">IS-IS · SRv6</p>
              </div>

              <div className="p-3 border border-white/15 bg-[#0C0F15]/90 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-[#C084FC] font-mono-tech text-[10px] uppercase tracking-wider">
                  <Cpu className="w-3 h-3" />
                  <span>Applied AI</span>
                </div>
                <p className="font-display text-xs sm:text-sm font-bold text-white mt-1">
                  Predictive TE
                </p>
                <p className="font-mono-tech text-[10px] text-[#94A3B8]">XGBoost · ML</p>
              </div>

              <div className="p-3 border border-white/15 bg-[#0C0F15]/90 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-[#34D399] font-mono-tech text-[10px] uppercase tracking-wider">
                  <Globe className="w-3 h-3" />
                  <span>Full-Stack</span>
                </div>
                <p className="font-display text-xs sm:text-sm font-bold text-white mt-1">
                  Web Systems
                </p>
                <p className="font-mono-tech text-[10px] text-[#94A3B8]">React · FastAPI</p>
              </div>

              <div className="p-3 border border-white/15 bg-[#0C0F15]/90 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-[#FCD34D] font-mono-tech text-[10px] uppercase tracking-wider">
                  <Award className="w-3 h-3" />
                  <span>Academic</span>
                </div>
                <p className="font-display text-xs sm:text-sm font-bold text-[#FDE047] mt-1">
                  10.00 CGPA
                </p>
                <p className="font-mono-tech text-[10px] text-[#94A3B8]">Dept 1st Rank</p>
              </div>
            </div>

            {/* Key Institutional & Leadership Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border border-white/15 divide-y sm:divide-y-0 sm:divide-x divide-white/15 bg-[#0C0F15]/95 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
              <div className="p-5 space-y-1">
                <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38BDF8] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full inline-block" />
                  Institution
                </p>
                <p className="font-display font-bold text-base text-white">
                  {PROFILE.education.institution}
                </p>
                <p className="font-mono-tech text-xs text-[#94A3B8]">
                  {PROFILE.education.period} · DCN
                </p>
              </div>

              <div className="p-5 space-y-1">
                <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#FCD34D] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#FCD34D] rounded-full inline-block" />
                  Leadership
                </p>
                <p className="font-display font-bold text-base text-[#FDE047]">
                  CNA Secretary
                </p>
                <p className="font-mono-tech text-xs text-[#94A3B8]">
                  {PROFILE.currentRole.period} Term · Executive
                </p>
              </div>

              <div className="p-5 space-y-1 bg-[#10131A]">
                <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#C084FC] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#C084FC] rounded-full inline-block" />
                  Official Web Studio
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
                  Custom Engineering
                </p>
              </div>
            </div>

            {/* Dynamic CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {onNavigate && (
                <MagneticButton strength={0.18}>
                  <button
                    type="button"
                    onClick={() => onNavigate('album')}
                    data-cursor="ALBUM"
                    className="inline-flex items-center gap-2.5 px-5 py-3 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-xs font-semibold uppercase tracking-[0.18em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Visual Album (47 Photos)</span>
                  </button>
                </MagneticButton>
              )}

              <MagneticButton strength={0.18}>
                <a
                  href={PROFILE.servicesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="AETHELON"
                  className="inline-flex items-center gap-2.5 px-5 py-3 border border-white/20 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] text-white font-mono-tech text-xs uppercase tracking-[0.18em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                >
                  <Globe className="w-4 h-4 text-[#00D9FF]" />
                  <span>Web Studio · {PROFILE.servicesDomain}</span>
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Right: Interactive Spatial Telemetry Console */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="about-scrub-portrait w-full max-w-[460px] border border-white/20 bg-[#0C0F15]/95 backdrop-blur-md shadow-[0_24px_70px_rgba(0,0,0,0.75)] overflow-hidden flex flex-col justify-between">
              {/* Terminal Title Bar */}
              <div className="px-4 py-3 border-b border-white/10 bg-[#10131A] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="font-mono-tech text-[10px] text-[#94A3B8] uppercase tracking-wider ml-1">
                    JK_SPATIAL_TELEMETRY // v2.6
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                  <span className="font-mono-tech text-[10px] text-[#34D399] uppercase tracking-wider">
                    Online
                  </span>
                </div>
              </div>

              {/* Console Mode Selector Tabs */}
              <div className="grid grid-cols-3 border-b border-white/10 bg-[#080A0E] text-center font-mono-tech text-[11px] uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setActiveTab('topology')}
                  className={`py-2.5 px-2 border-r border-white/10 transition-colors ${
                    activeTab === 'topology'
                      ? 'bg-[#0C0F15] text-[#00D9FF] font-semibold border-b-2 border-b-[#00D9FF]'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Topology
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('standing')}
                  className={`py-2.5 px-2 border-r border-white/10 transition-colors ${
                    activeTab === 'standing'
                      ? 'bg-[#0C0F15] text-[#FDE047] font-semibold border-b-2 border-b-[#FDE047]'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Standing
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('studio')}
                  className={`py-2.5 px-2 transition-colors ${
                    activeTab === 'studio'
                      ? 'bg-[#0C0F15] text-[#C084FC] font-semibold border-b-2 border-b-[#C084FC]'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Studio
                </button>
              </div>

              {/* Main Interactive Screen Content */}
              <div className="p-6 space-y-5 min-h-[300px] flex flex-col justify-between">
                {activeTab === 'topology' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-xs font-mono-tech">
                      <span className="text-[#00D9FF] uppercase tracking-wider flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        Segment Routing TE Mesh
                      </span>
                      <span className="text-[#34D399] tabular-nums">SR-MPLS / IS-IS</span>
                    </div>

                    {/* Interactive Topology Graph Visual */}
                    <div className="relative aspect-[16/10] w-full border border-white/10 bg-[#080A0E] obsidian-grid-bg p-3 flex flex-col justify-between overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.1),transparent_70%)] pointer-events-none" />

                      <svg viewBox="0 0 320 180" className="w-full h-full">
                        {/* Connecting Mesh Links */}
                        <line x1="50" y1="90" x2="160" y2="40" stroke="#00D9FF" strokeWidth="1.8" strokeOpacity="0.7" />
                        <line x1="50" y1="90" x2="160" y2="140" stroke="#00D9FF" strokeWidth="1.8" strokeOpacity="0.7" />
                        <line x1="160" y1="40" x2="270" y2="90" stroke="#34D399" strokeWidth="1.8" strokeOpacity="0.7" />
                        <line x1="160" y1="140" x2="270" y2="90" stroke="#38BDF8" strokeWidth="1.8" strokeOpacity="0.7" />
                        <line x1="160" y1="40" x2="160" y2="140" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="3 3" />

                        {/* Animated Packets Moving Along Path */}
                        <circle cx="105" cy="65" r="3" fill="#00D9FF" className="animate-pulse" />
                        <circle cx="215" cy="65" r="3" fill="#34D399" className="animate-pulse" />

                        {/* Ingress Edge Router */}
                        <circle cx="50" cy="90" r="14" fill="#0E2433" stroke="#00D9FF" strokeWidth="2" />
                        <text x="50" y="93" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">LER-1</text>

                        {/* Top Transit LSR Core 1 */}
                        <circle cx="160" cy="40" r="14" fill="#0A2020" stroke="#34D399" strokeWidth="2" />
                        <text x="160" y="43" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">LSR-A</text>

                        {/* Bottom Transit LSR Core 2 */}
                        <circle cx="160" cy="140" r="14" fill="#1A1230" stroke="#C084FC" strokeWidth="2" />
                        <text x="160" y="143" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">LSR-B</text>

                        {/* Egress Edge Router */}
                        <circle cx="270" cy="90" r="14" fill="#0E2433" stroke="#00D9FF" strokeWidth="2" />
                        <text x="270" y="93" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">LER-2</text>
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-tech">
                      <div className="p-2 border border-white/10 bg-[#080A0E]">
                        <span className="text-[#94A3B8]">Policy:</span>{' '}
                        <span className="text-[#00D9FF]">Lowest Delay</span>
                      </div>
                      <div className="p-2 border border-white/10 bg-[#080A0E]">
                        <span className="text-[#94A3B8]">Telemetry:</span>{' '}
                        <span className="text-[#34D399]">0% Packet Loss</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'standing' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-xs font-mono-tech">
                      <span className="text-[#FDE047] uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        Verified Academic Record
                      </span>
                      <span className="text-[#34D399] font-bold">10.00 CGPA</span>
                    </div>

                    <div className="p-4 border border-[#FCD34D]/30 bg-[#080A0E] space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-display font-bold text-white text-base">
                            Department First Rank
                          </p>
                          <p className="font-mono-tech text-xs text-[#FDE047]">
                            Diploma in Computer Networking · PSG Polytechnic
                          </p>
                        </div>
                        <span className="px-2 py-0.5 border border-[#FCD34D] bg-[#FCD34D]/10 text-[#FDE047] font-mono-tech text-xs font-bold">
                          01st
                        </span>
                      </div>
                      <p className="text-xs text-[#CBD5E1] leading-relaxed">
                        Straight 'O' (Outstanding) marks across all theory &amp; lab exams. Honored on
                        stage at the college auditorium.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-tech">
                      <div className="p-2 border border-white/10 bg-[#080A0E]">
                        <span className="text-[#94A3B8]">SanTekFest '26:</span>{' '}
                        <span className="text-[#34D399]">1st Prize</span>
                      </div>
                      <div className="p-2 border border-white/10 bg-[#080A0E]">
                        <span className="text-[#94A3B8]">INFINITUM '26:</span>{' '}
                        <span className="text-[#38BDF8]">2nd Place</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'studio' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-xs font-mono-tech">
                      <span className="text-[#C084FC] uppercase tracking-wider flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" />
                        Web Studio Engine
                      </span>
                      <span className="text-[#34D399]">HTTP/2 · 200 OK</span>
                    </div>

                    <div className="p-4 border border-[#C084FC]/30 bg-[#080A0E] font-mono-tech text-xs space-y-2">
                      <div className="flex items-center justify-between text-[#94A3B8]">
                        <span>Domain:</span>
                        <a
                          href={PROFILE.servicesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#C084FC] hover:underline"
                        >
                          {PROFILE.servicesDomain}
                        </a>
                      </div>
                      <div className="flex items-center justify-between text-[#94A3B8]">
                        <span>Edge Response:</span>
                        <span className="text-[#34D399]">38ms (Global CDN)</span>
                      </div>
                      <div className="flex items-center justify-between text-[#94A3B8]">
                        <span>Architecture:</span>
                        <span className="text-white">React · Tailwind · Node</span>
                      </div>
                      <div className="flex items-center justify-between text-[#94A3B8]">
                        <span>Status:</span>
                        <span className="text-[#38BDF8]">Open for Client Projects</span>
                      </div>
                    </div>

                    <a
                      href={PROFILE.servicesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 border border-[#C084FC] bg-[#C084FC]/10 hover:bg-[#C084FC] text-[#C084FC] hover:text-[#080A0E] text-xs font-mono-tech uppercase font-semibold text-center block transition-colors"
                    >
                      Visit Official Studio →
                    </a>
                  </div>
                )}

                {/* Console System Gauges Footer */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono-tech">
                      <span className="text-[#94A3B8]">NETWORK OBSERVABILITY</span>
                      <span className="text-[#00D9FF]">98%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#10131A] overflow-hidden">
                      <div className="h-full bg-[#00D9FF] w-[98%]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono-tech">
                      <span className="text-[#94A3B8]">SYSTEMS ENGINEERING</span>
                      <span className="text-[#34D399]">95%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#10131A] overflow-hidden">
                      <div className="h-full bg-[#34D399] w-[95%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
