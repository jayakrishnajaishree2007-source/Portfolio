import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { AchievementsSection } from './components/AchievementsSection';
import { AlbumSection } from './components/AlbumSection';
import { ChromeScene3D } from './components/ChromeScene3D';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ExperienceSection } from './components/ExperienceSection';
import { HeroSection } from './components/HeroSection';
import { Navbar, SectionId } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { SectionRail } from './components/SectionRail';
import { SkillsSection } from './components/SkillsSection';
import { FirebaseProvider } from './context/FirebaseContext';
import { ProjectItem } from './data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const ProjectModal = lazy(() =>
  import('./components/ProjectModal').then((m) => ({ default: m.ProjectModal }))
);

const SECTION_IDS: SectionId[] = [
  'home',
  'about',
  'projects',
  'experience',
  'skills',
  'achievements',
  'album',
  'contact',
];

function PortfolioShell() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const scrollProgressRef = useRef(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    if (selectedProject) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenisRef.current?.start();
    };
  }, [selectedProject]);

  // Lenis + GSAP ScrollTrigger Synchronized Ticker (Zero React re-renders on scroll)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', (e: { progress: number }) => {
      scrollProgressRef.current = e.progress;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${Math.max(0.02, e.progress)})`;
      }
      ScrollTrigger.update();
    });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Fallback native scroll tracking when reduced motion disables Lenis
  useEffect(() => {
    const onScroll = () => {
      if (lenisRef.current) return;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const p = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      scrollProgressRef.current = p;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${Math.max(0.02, p)})`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active Section Spy
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-32% 0px -48% 0px', threshold: 0.01 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Scroll-Scrubbed 7-Chapter GSAP Choreography
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      // 1. HERO: Kinetic entrance + scrubbed depth divergence
      gsap.from('.hero-stagger', {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.07,
        ease: 'power3.out',
      });

      gsap.to('.hero-scrub-title', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.hero-scrub-portrait', {
        yPercent: 12,
        rotate: 2.5,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 2. ABOUT: Scroll-scrubbed kinetic marquee, metallic shapes & portrait drift
      gsap.to('.about-scrub-marquee', {
        xPercent: -26,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.about-float-shape', {
        y: (i: number) => (i % 2 === 0 ? -90 : 80),
        rotation: (i: number) => (i % 2 === 0 ? 115 : -90),
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.fromTo(
        '.about-scrub-portrait',
        { y: 60, scale: 0.93 },
        {
          y: -24,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 85%',
            end: 'center center',
            scrub: true,
          },
        }
      );

      // 3. PROJECTS: Scroll-scrubbed scale, visual parallax & architecture strip per distinct environment
      gsap.utils.toArray<HTMLElement>('.project-env').forEach((panel) => {
        gsap.fromTo(
          panel,
          { scale: 0.96, y: 40 },
          {
            scale: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top 92%',
              end: 'top 35%',
              scrub: true,
            },
          }
        );

        const visual = panel.querySelector('.project-visual-stage');
        if (visual) {
          gsap.fromTo(
            visual,
            { y: 24 },
            {
              y: -18,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }

        const archStrip = panel.querySelector('.project-arch-strip');
        if (archStrip) {
          gsap.fromTo(
            archStrip,
            { x: -24, opacity: 0.6 },
            {
              x: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top 86%',
                end: 'top 48%',
                scrub: true,
              },
            }
          );
        }
      });

      // 4. EXPERIENCE: Desktop pinned horizontal spatial journey
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const track = document.querySelector('.exp-track') as HTMLElement | null;
        if (!track) return;
        const getAmount = () => -(track.scrollWidth - window.innerWidth + 96);

        gsap.to(track, {
          x: getAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: '.exp-pin-section',
            start: 'top 10%',
            end: () => `+=${Math.max(850, track.scrollWidth - window.innerWidth + 140)}`,
            pin: true,
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });
      });

      // 5. SKILLS: Scroll-scrubbed typographic field shift
      gsap.fromTo(
        '.skills-scrub-wall',
        { x: -36 },
        {
          x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#skills',
            start: 'top 88%',
            end: 'center center',
            scrub: true,
          },
        }
      );

      // 6. ACHIEVEMENTS: Scrubbed row slide-in
      gsap.utils.toArray<HTMLElement>('.ach-row').forEach((row, idx) => {
        gsap.fromTo(
          row,
          { x: idx % 2 === 0 ? -48 : 48, opacity: 0.35 },
          {
            x: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top 92%',
              end: 'top 58%',
              scrub: true,
            },
          }
        );
      });

      // 7. CONTACT FINALE: Scrubbed emergence
      gsap.fromTo(
        '.contact-finale',
        { y: 50 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.contact-finale',
            start: 'top 92%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    },
    { scope: rootRef }
  );

  const handleNavigate = useCallback((id: SectionId) => {
    const target = document.getElementById(id);
    if (!target) return;
    setActiveSection(id);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -56, duration: 1.05 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen bg-[#080A0E] text-[#F1F5F9] obsidian-grid-bg"
    >
      <CustomCursor />

      <ChromeScene3D
        scrollProgressRef={scrollProgressRef}
        lightingPreset="cyan"
        cameraMode="scroll"
      />

      <Navbar
        activeSection={activeSection}
        progressBarRef={progressBarRef}
        onNavigate={handleNavigate}
      />

      <main className="relative z-10">
        <HeroSection onNavigate={handleNavigate} />
        <AboutSection />
        <ProjectsSection onSelectProject={setSelectedProject} />
        <ExperienceSection />
        <SkillsSection onSelectProject={setSelectedProject} />
        <AchievementsSection />
        <AlbumSection />
        <ContactSection onNavigate={handleNavigate} />
      </main>

      <SectionRail activeSection={activeSection} onNavigate={handleNavigate} />

      <Suspense fallback={null}>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onSelectProject={setSelectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </Suspense>
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <FirebaseProvider>
        <PortfolioShell />
      </FirebaseProvider>
    </ErrorBoundary>
  );
}

export default App;
