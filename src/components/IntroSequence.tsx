import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles, X } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

/* ─── Boot telemetry lines (paced strictly for 1.3s) ─── */
const BOOT_LINES = [
  { text: '> SYSTEM BOOT ... OK', delay: 0 },
  { text: '> JAYAKRISHNA® OS v3.0.1', delay: 240 },
  { text: '> COIMBATORE NODE — ACTIVE', delay: 520 },
  { text: '> RENDER PIPELINE — READY', delay: 820 },
];

/* ─── Morph sequence: JAYAKRISHNA (11) -> PORTFOLIO (9) ─── */
const INITIAL_WORD = 'JAYAKRISHNA'.split('');
const TARGET_WORD = 'PORTFOLIO'.split('');

/* ─── Side telemetry data for portfolio stage ─── */
const LEFT_TELEMETRY = [
  'SYS: ONLINE',
  'NODE: CBE-01',
  'PING: 12ms',
  'SEC: AES-256',
];

const RIGHT_TELEMETRY = [
  'VER: 3.0.1',
  'FPS: 60',
  'GPU: ACTIVE',
  'NET: STABLE',
];

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  // Master stages: 'boot' -> 'exclamation' -> 'unroll' -> 'name-hold' -> 'morph' -> 'portfolio' -> 'exit'
  const [stage, setStage] = useState<'boot' | 'animating' | 'portfolio' | 'exit'>('boot');
  const [bootLineIdx, setBootLineIdx] = useState(-1);
  const [currentLetters, setCurrentLetters] = useState<string[]>(INITIAL_WORD);
  const [showEnter, setShowEnter] = useState(false);
  const [showSideTelemetry, setShowSideTelemetry] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const skippedRef = useRef(false);

  // GSAP animation targets
  const assemblyRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const lettersWrapperRef = useRef<HTMLDivElement | null>(null);
  const letterSpanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  /* ─── Skip Handler ─── */
  const handleSkip = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    setStage('exit');
    setTimeout(() => onComplete(), 600);
  }, [onComplete]);

  /* ESC key listener */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  /* ═══════════════════════════════════════════════
     PHASE 1: Boot Sequence (0 – 1.3s)
     ═══════════════════════════════════════════════ */
  useEffect(() => {
    if (stage !== 'boot') return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, idx) => {
      timers.push(setTimeout(() => setBootLineIdx(idx), line.delay));
    });
    // Trigger the kinetic 3D sequence at exactly 1.3s
    timers.push(
      setTimeout(() => {
        setStage('animating');
      }, 1300)
    );
    return () => timers.forEach(clearTimeout);
  }, [stage]);

  /* ═══════════════════════════════════════════════
     PHASE 2, 3, 4 & 5: MASTER GSAP TIMELINE
     1. Dot pops
     2. Bar drops from above onto dot to form "!"
     3. Bar tilts -62deg on the dot like a lever
     4. JAYAKRISHNA letters tumble out in a 3D domino wave
     5. Name holds in chrome luster for 1.0s
     6. Progressive 3D split-flap flip to PORTFOLIO
     7. Heroic UI & portrait reveal
     ═══════════════════════════════════════════════ */
  useEffect(() => {
    if (stage !== 'animating') return;

    const dot = dotRef.current;
    const bar = barRef.current;
    const assembly = assemblyRef.current;
    const letters = letterSpanRefs.current.filter(Boolean) as HTMLSpanElement[];

    if (!dot || !bar || !assembly || letters.length === 0) return;

    // Initial setup
    gsap.set(dot, { scale: 0, opacity: 0 });
    gsap.set(bar, { y: -130, scaleY: 1.4, opacity: 0, rotation: 0, transformOrigin: 'bottom center' });
    gsap.set(letters, {
      opacity: 0,
      rotationZ: -58,
      rotationX: 80,
      y: -40,
      x: -30,
      scale: 0.6,
      transformOrigin: 'bottom left',
    });

    const masterTl = gsap.timeline();

    // ── 1. Dot pops in center with pulse ──
    masterTl.to(dot, {
      scale: 1,
      opacity: 1,
      duration: 0.22,
      ease: 'back.out(2)',
    })

    // ── 2. Bar drops onto dot with elastic momentum ──
    .to(
      bar,
      {
        y: 0,
        scaleY: 1,
        opacity: 1,
        duration: 0.35,
        ease: 'power3.in',
      },
      '+=0.04'
    )
    .to(bar, { y: -5, duration: 0.08, ease: 'power1.out' })
    .to(bar, { y: 0, duration: 0.08, ease: 'power1.in' })

    // ── 3. Bar tilts counter-clockwise like a mechanical lever (-62deg) ──
    .to(
      bar,
      {
        rotation: -62,
        duration: 0.38,
        ease: 'power2.inOut',
      },
      '+=0.15'
    )

    // ── 4. Letters tumble out in a 3D domino wave along the tilted plane ──
    .to(
      letters,
      {
        opacity: 1,
        rotationZ: 0,
        rotationX: 0,
        y: 0,
        x: 0,
        scale: 1,
        stagger: 0.045,
        duration: 0.45,
        ease: 'back.out(2.4)',
      },
      '-=0.22'
    )

    // ── 5. Exclamation stick and dot dissolve as JAYAKRISHNA locks in ──
    .to(
      assembly,
      {
        opacity: 0,
        scale: 0.5,
        duration: 0.25,
        ease: 'power2.out',
      },
      '-=0.15'
    )

    // ── 6. Name holds in liquid-chrome center for ~1.0 second ──
    .to({}, { duration: 0.9 })

    // ── 7. Progressive 3D Split-Flap Morph from JAYAKRISHNA to PORTFOLIO ──
    .call(() => {
      // Step-by-step split-flap replacement across the 9 letters
      TARGET_WORD.forEach((targetChar, i) => {
        const span = letters[i];
        if (!span) return;

        // Flip up and replace
        gsap.to(span, {
          rotationX: -90,
          opacity: 0.3,
          duration: 0.16,
          delay: i * 0.08,
          ease: 'power1.in',
          onComplete: () => {
            span.textContent = targetChar;
            gsap.fromTo(
              span,
              { rotationX: 90, opacity: 0.3 },
              {
                rotationX: 0,
                opacity: 1,
                duration: 0.22,
                ease: 'back.out(1.8)',
              }
            );
          },
        });
      });

      // Collapse the remaining 2 trailing letters (N, A)
      const trailing = [letters[9], letters[10]];
      gsap.to(trailing, {
        opacity: 0,
        scale: 0,
        width: 0,
        margin: 0,
        duration: 0.25,
        delay: 0.45,
        ease: 'power2.in',
      });
    })

    // ── 8. Transition to Portfolio Stage (Heroic Reveal) ──
    .to({}, { duration: 1.3 })
    .call(() => {
      setCurrentLetters(TARGET_WORD);
      setStage('portfolio');
      setShowSideTelemetry(true);
      setTimeout(() => setShowEnter(true), 400);
    });

    return () => {
      masterTl.kill();
    };
  }, [stage]);

  /* ═══════════════════════════════════════════════
     BACKGROUND: Starfield Particles
     ═══════════════════════════════════════════════ */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const PARTICLE_COUNT = 320;

    interface Particle {
      x: number;
      y: number;
      z: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
      prevX: number;
      prevY: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        speed: 1.2 + Math.random() * 3,
        size: 0.6 + Math.random() * 1.6,
        color: Math.random() > 0.4 ? '#00D9FF' : '#FFFFFF',
        alpha: 0.15 + Math.random() * 0.8,
        prevX: 0,
        prevY: 0,
      });
    }

    let animationId: number;

    const render = () => {
      ctx.fillStyle = 'rgba(8, 10, 14, 0.22)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      let speedMul = 1;
      if (stage === 'animating') speedMul = 2.2;
      else if (stage === 'portfolio') speedMul = 0.55;
      else if (stage === 'exit') speedMul = 6;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        const k = 280 / p.z;
        p.prevX = p.x * k + cx;
        p.prevY = p.y * k + cy;

        p.z -= p.speed * speedMul;

        if (p.z <= 0) {
          p.z = width;
          p.x = (Math.random() - 0.5) * width * 2;
          p.y = (Math.random() - 0.5) * height * 2;
        }

        const k2 = 280 / p.z;
        const px = p.x * k2 + cx;
        const py = p.y * k2 + cy;

        if (px >= -50 && px <= width + 50 && py >= -50 && py <= height + 50) {
          const size = Math.max(0.4, p.size * k2);
          const alpha = Math.min(1, p.alpha * k2 * 0.55);

          if (speedMul > 2) {
            ctx.beginPath();
            ctx.moveTo(p.prevX, p.prevY);
            ctx.lineTo(px, py);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = alpha * 0.5;
            ctx.lineWidth = size * 0.4;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, [stage]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none transition-all duration-700 ${
        stage === 'exit'
          ? 'opacity-0 scale-[1.08] blur-sm pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      style={{ background: '#080A0E' }}
    >
      {/* ── Background Particle Canvas ── */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* ── Background Embedded Constellation Portrait (Emerges in Portfolio Stage) ── */}
      <div
        className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-all duration-1000 ease-out z-[1] ${
          stage === 'portfolio' ? 'opacity-85 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Subtle Cyan Studio Rim Spotlight behind head (exact match to HeroSection) */}
        <div
          aria-hidden="true"
          className="absolute -top-12 sm:-top-20 w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full opacity-50 blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(0,217,255,0.25) 0%, rgba(56,189,248,0.1) 40%, transparent 70%)',
          }}
        />

        {/* Heroic Portrait with Background Fully Removed — Lifted so eyes/face are clear above text */}
        <div className="relative -translate-y-20 sm:-translate-y-28 md:-translate-y-32 flex justify-center">
          <img
            src="/assets/jk-intro-portrait-clean.png"
            alt="Jayakrishna J"
            className="w-auto h-[48vh] sm:h-[56vh] md:h-[62vh] max-h-[580px] max-w-none object-contain contrast-125 brightness-95 filter drop-shadow-[0_0_50px_rgba(0,217,255,0.2)]"
          />
        </div>
      </div>

      {/* ── CRT Scan Lines Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* ── Vignette Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(8,10,14,0.7) 100%)',
        }}
      />

      {/* ── Top Bar ── */}
      <div className="absolute top-5 left-5 right-5 sm:top-6 sm:left-6 sm:right-6 z-20 flex items-center justify-between font-mono-tech text-[10px] sm:text-xs tracking-widest text-[#475569]">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00D9FF]"
            style={{
              animation: 'pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite',
              boxShadow: '0 0 8px #00D9FF',
            }}
          />
          <span className="uppercase text-[#38BDF8]">SYSTEM INITIALIZE</span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 border border-white/10 bg-[#10131A]/80 hover:border-[#00D9FF]/60 text-[#475569] hover:text-[#00D9FF] transition-colors duration-200 cursor-pointer"
        >
          <span>SKIP</span>
          <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>

      {/* ═══════════════════════════════════════
           SIDE TELEMETRY RAILS (portfolio stage)
           ═══════════════════════════════════════ */}
      {stage === 'portfolio' && (
        <>
          {/* Left Rail */}
          <div
            className={`absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3 font-mono-tech text-[9px] tracking-widest transition-all duration-700 ${
              showSideTelemetry
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-6'
            }`}
          >
            <div className="w-5 h-5 border-l border-t border-[#00D9FF]/40" />
            {LEFT_TELEMETRY.map((line, i) => (
              <div key={i} className="text-[#64748B] flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#00D9FF]/60" />
                <span>{line}</span>
              </div>
            ))}
            <div className="w-5 h-5 border-l border-b border-[#00D9FF]/40" />
          </div>

          {/* Right Rail */}
          <div
            className={`absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-end gap-3 font-mono-tech text-[9px] tracking-widest transition-all duration-700 ${
              showSideTelemetry
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-6'
            }`}
          >
            <div className="w-5 h-5 border-r border-t border-[#00D9FF]/40 self-end" />
            {RIGHT_TELEMETRY.map((line, i) => (
              <div key={i} className="text-[#64748B] flex items-center gap-1.5">
                <span>{line}</span>
                <span className="w-1 h-1 rounded-full bg-[#00D9FF]/60" />
              </div>
            ))}
            <div className="w-5 h-5 border-r border-b border-[#00D9FF]/40 self-end" />
          </div>
        </>
      )}

      {/* ── Main Center Stage ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl">
        {/* PHASE 1: Boot Terminal (1.3s) */}
        {stage === 'boot' && (
          <div className="relative flex flex-col items-start gap-1 font-mono-tech text-[11px] sm:text-xs text-[#38BDF8] max-w-md w-full px-4 sm:px-0">
            {BOOT_LINES.map((line, idx) => (
              <div
                key={idx}
                className={`transition-all duration-150 ${
                  idx <= bootLineIdx
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-3'
                }`}
              >
                <span className="text-[#00D9FF]">{line.text.slice(0, 2)}</span>
                <span className="text-[#94A3B8]">{line.text.slice(2)}</span>
              </div>
            ))}
            {bootLineIdx >= 0 && (
              <span
                className="inline-block w-2 h-3.5 sm:h-4 bg-[#00D9FF] mt-1"
                style={{ animation: 'blink 0.7s step-end infinite' }}
              />
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
             UNIFIED PERSISTENT 3D STAGE
             (Continuous DOM element: No jumps, pure physical flow)
             ══════════════════════════════════════════════════════════ */}
        {(stage === 'animating' || stage === 'portfolio') && (
          <div
            className={`relative flex flex-col items-center justify-center w-full transition-transform duration-700 ${
              stage === 'portfolio' ? 'pt-24 sm:pt-36 md:pt-40' : 'pt-0'
            }`}
          >
            {/* The Exclamation Assembly (Bar + Dot) — Positioned directly at the start of the word */}
            <div
              ref={assemblyRef}
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none z-20"
              style={{ bottom: '18px' }}
            >
              {/* Vertical Dropping & Tilting Bar */}
              <div
                ref={barRef}
                className="w-4 sm:w-5 h-16 sm:h-20 rounded-t-sm mb-2"
                style={{
                  background:
                    'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 35%, #94A3B8 70%, #64748B 100%)',
                  boxShadow:
                    '0 0 25px rgba(0,217,255,0.8), 0 0 50px rgba(0,217,255,0.4)',
                }}
              />

              {/* Baseline Dot */}
              <div
                ref={dotRef}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white"
                style={{
                  boxShadow:
                    '0 0 20px #00D9FF, 0 0 40px rgba(0,217,255,0.8)',
                }}
              />
            </div>

            {/* The Unified 3D Letters Container */}
            <div
              ref={lettersWrapperRef}
              className="relative flex items-center justify-center font-display font-black uppercase leading-none whitespace-nowrap"
              style={{
                fontSize: 'clamp(2.6rem, 11vw, 7.4rem)',
                letterSpacing: '0.06em',
                perspective: '1200px',
                transformStyle: 'preserve-3d',
              }}
            >
              {INITIAL_WORD.map((letter, idx) => (
                <span
                  key={idx}
                  ref={(el) => {
                    letterSpanRefs.current[idx] = el;
                  }}
                  className="inline-block relative will-change-transform"
                  style={{
                    background:
                      'linear-gradient(180deg, #FFFFFF 15%, #E2E8F0 45%, #94A3B8 80%, #64748B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter:
                      'drop-shadow(0 4px 12px rgba(0,0,0,0.8)) drop-shadow(0 0 25px rgba(0,217,255,0.4))',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {letter}
                </span>
              ))}

              {/* Cyan period dot for PORTFOLIO. */}
              {stage === 'portfolio' && (
                <span
                  className="text-[#00D9FF] ml-0.5 animate-fade-in-up"
                  style={{ textShadow: '0 0 20px #00D9FF, 0 0 40px rgba(0,217,255,0.6)' }}
                >
                  .
                </span>
              )}
            </div>

            {/* ── Glowing Heroic Cyan Divider Line ── */}
            {stage === 'portfolio' && (
              <div
                className="w-32 sm:w-48 h-px my-5 sm:my-6 animate-fade-in-up"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, #00D9FF, transparent)',
                  boxShadow: '0 0 10px #00D9FF',
                }}
              />
            )}

            {/* ══════════════════════════════════════════════════════════
                 ULTRA-STYLISH, ATTRACTIVE "ENTER STUDIO" BUTTON
                 ══════════════════════════════════════════════════════════ */}
            {showEnter && stage === 'portfolio' && (
              <div className="relative group animate-fade-in-up mt-1">
                {/* Exterior Cyan Ambient Aura */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#00D9FF] via-[#38BDF8] to-[#00D9FF] opacity-50 blur-lg transition-all duration-500 group-hover:opacity-90 group-hover:blur-xl pointer-events-none"
                />

                <button
                  type="button"
                  onClick={handleSkip}
                  className="relative p-[1.5px] rounded-full overflow-hidden transition-transform duration-300 ease-out group-hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_35px_rgba(0,217,255,0.35)]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(0,217,255,0.9) 50%, rgba(56,189,248,0.4) 100%)',
                  }}
                >
                  {/* Glassmorphic Obsidian Button Core */}
                  <div className="relative flex items-center gap-3.5 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[#090C12]/92 backdrop-blur-xl transition-colors duration-300 group-hover:bg-[#00D9FF]/10 overflow-hidden">
                    {/* Animated Shimmer Light Sweep */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none animate-shimmer-sweep"
                    />

                    {/* Radar Pulse Beacon */}
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]" />
                    </span>

                    {/* Text Label */}
                    <span className="font-display font-extrabold uppercase text-xs sm:text-sm tracking-[0.22em] text-white group-hover:text-[#00D9FF] transition-colors duration-300 whitespace-nowrap">
                      Enter Studio
                    </span>

                    {/* Sparkle Icon */}
                    <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300" />

                    {/* Interactive Slide Arrow */}
                    <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00D9FF] group-hover:border-[#00D9FF] transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5 text-[#00D9FF] group-hover:text-[#080A0E] group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Bottom Telemetry ── */}
      <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex items-center justify-between font-mono-tech text-[9px] sm:text-[10px] text-[#475569] tracking-wider">
        <span>STATION / 01 · COIMBATORE</span>
        <span className="hidden sm:inline">
          LATENCY: 12ms · SECURE BUFFER · v3.0
        </span>
        <span className="sm:hidden">SECURE</span>
      </div>
    </div>
  );
}
