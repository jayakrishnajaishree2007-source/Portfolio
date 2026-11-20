import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles, X } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

/* ─── Character set for kinetic scramble morph ─── */
const GLYPHS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*<>/?█▓▒░';

/* ─── Boot sequence telemetry lines (strictly calibrated to 1.3s) ─── */
const BOOT_LINES = [
  { text: '> SYSTEM BOOT ... OK', delay: 0 },
  { text: '> JAYAKRISHNA® OS v3.0.1', delay: 220 },
  { text: '> COIMBATORE NODE — ACTIVE', delay: 480 },
  { text: '> RENDER PIPELINE — READY', delay: 750 },
];

/* ─── Letters of the name ─── */
const NAME_LETTERS = 'JAYAKRISHNA'.split('');

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

/* ─── Stages ─── */
type Stage =
  | 'boot'
  | 'exclamation'
  | 'name-settle'
  | 'morph'
  | 'portfolio'
  | 'exit';

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [stage, setStage] = useState<Stage>('boot');
  const [bootLineIdx, setBootLineIdx] = useState(-1);
  const [displayText, setDisplayText] = useState('JAYAKRISHNA');
  const [morphLocked, setMorphLocked] = useState<boolean[]>([]);
  const [showEnter, setShowEnter] = useState(false);
  const [showSideTelemetry, setShowSideTelemetry] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<Stage>('boot');
  const skippedRef = useRef(false);

  // GSAP animation refs for the exclamation turn & tumbling unroll
  const animContainerRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Keep stageRef in sync for canvas animation
  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  /* ─── Skip handler ─── */
  const handleSkip = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    setStage('exit');
    setTimeout(() => onComplete(), 700);
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
    // Trigger exclamation drop at exactly 1.3s
    timers.push(setTimeout(() => setStage('exclamation'), 1300));
    return () => timers.forEach(clearTimeout);
  }, [stage]);

  /* ═══════════════════════════════════════════════
     PHASE 2 & 3: EXCLAMATION DROP → PIVOT TILT → 3D TUMBLING UNROLL
     Recreated with GSAP 3D physics from the reference video!
     ═══════════════════════════════════════════════ */
  useEffect(() => {
    if (stage !== 'exclamation') return;

    const bar = barRef.current;
    const dot = dotRef.current;
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];

    if (!bar || !dot || letters.length === 0) return;

    // Reset initial states
    gsap.set(dot, { scale: 0, opacity: 0 });
    gsap.set(bar, { y: -120, scaleY: 1.4, opacity: 0, rotation: 0, transformOrigin: 'bottom center' });
    gsap.set(letters, {
      opacity: 0,
      rotationZ: -55,
      rotationX: 75,
      y: -35,
      x: (i) => -25 + i * 2,
      scale: 0.7,
      transformOrigin: 'bottom left',
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayText('JAYAKRISHNA');
        setStage('name-settle');
      },
    });

    // 1. Dot pops in center with pulse
    tl.to(dot, {
      scale: 1,
      opacity: 1,
      duration: 0.25,
      ease: 'back.out(2)',
    })
      // 2. Bar drops from above onto the dot
      .to(
        bar,
        {
          y: 0,
          scaleY: 1,
          opacity: 1,
          duration: 0.38,
          ease: 'power3.in',
        },
        '+=0.05'
      )
      // Slight bounce on impact
      .to(bar, {
        y: -6,
        duration: 0.1,
        ease: 'power1.out',
      })
      .to(bar, {
        y: 0,
        duration: 0.1,
        ease: 'power1.in',
      })
      // 3. Holds as completed "!" for a beat, then tilts counter-clockwise like a lever (-58°)
      .to(
        bar,
        {
          rotation: -58,
          duration: 0.42,
          ease: 'power2.inOut',
        },
        '+=0.18'
      )
      // 4. As the bar tilts, the letters tumble out in a 3D domino cascade onto the baseline!
      .to(
        letters,
        {
          opacity: 1,
          rotationZ: 0,
          rotationX: 0,
          y: 0,
          x: 0,
          scale: 1,
          stagger: 0.055,
          duration: 0.48,
          ease: 'back.out(2.2)',
        },
        '-=0.25'
      )
      // 5. Exclamation stick and dot dissolve smoothly as the full word JAYAKRISHNA locks in
      .to(
        [bar, dot],
        {
          opacity: 0,
          scale: 0.6,
          duration: 0.28,
          ease: 'power2.out',
        },
        '-=0.15'
      );

    return () => {
      tl.kill();
    };
  }, [stage]);

  /* ═══════════════════════════════════════════════
     PHASE 4: Name Settle & Chromatic Hold (~1.0s)
     JAYAKRISHNA holds centered before morphing
     ═══════════════════════════════════════════════ */
  useEffect(() => {
    if (stage !== 'name-settle') return;
    const t = setTimeout(() => setStage('morph'), 1000);
    return () => clearTimeout(t);
  }, [stage]);

  /* ═══════════════════════════════════════════════
     PHASE 5: Kinetic Scramble Morph JAYAKRISHNA → PORTFOLIO
     ═══════════════════════════════════════════════ */
  useEffect(() => {
    if (stage !== 'morph') return;

    const target = 'PORTFOLIO';
    const startWord = 'JAYAKRISHNA';
    const duration = 2000;
    const startTime = performance.now();
    setMorphLocked(new Array(target.length).fill(false));

    let frameId: number;

    const tick = (now: number) => {
      if (skippedRef.current) return;
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      if (progress < 1) {
        const currentLen = Math.round(
          startWord.length - (startWord.length - target.length) * progress
        );
        let morphed = '';
        const newLocked = new Array(target.length).fill(false);

        for (let i = 0; i < currentLen; i++) {
          const lockThreshold = (i + 1) / (target.length + 1);
          if (i < target.length && progress > lockThreshold) {
            morphed += target[i];
            newLocked[i] = true;
          } else {
            morphed += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        setDisplayText(morphed);
        setMorphLocked(newLocked);
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplayText('PORTFOLIO');
        setMorphLocked(new Array(target.length).fill(true));
        setStage('portfolio');
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [stage]);

  /* ═══════════════════════════════════════════════
     PHASE 6: Portfolio Stage — Heroic UI Emergence
     (Waits exclusively for user click on "Enter Studio")
     ═══════════════════════════════════════════════ */
  useEffect(() => {
    if (stage !== 'portfolio') return;
    const t1 = setTimeout(() => setShowSideTelemetry(true), 350);
    const t2 = setTimeout(() => setShowEnter(true), 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [stage]);

  /* ═══════════════════════════════════════════════
     BACKGROUND: Particle Starfield
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

    const PARTICLE_COUNT = 380;

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
        speed: 1.5 + Math.random() * 4,
        size: 0.6 + Math.random() * 1.8,
        color: Math.random() > 0.35 ? '#00D9FF' : '#FFFFFF',
        alpha: 0.15 + Math.random() * 0.85,
        prevX: 0,
        prevY: 0,
      });
    }

    let animationId: number;

    const render = () => {
      ctx.fillStyle = 'rgba(8, 10, 14, 0.2)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const currentStage = stageRef.current;

      let speedMul = 1;
      if (currentStage === 'exclamation') speedMul = 2.5;
      else if (currentStage === 'name-settle') speedMul = 1.8;
      else if (currentStage === 'morph') speedMul = 3;
      else if (currentStage === 'portfolio') speedMul = 0.6;
      else if (currentStage === 'exit') speedMul = 6;

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
          const alpha = Math.min(1, p.alpha * k2 * 0.6);

          if (speedMul > 2) {
            ctx.beginPath();
            ctx.moveTo(p.prevX, p.prevY);
            ctx.lineTo(px, py);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = alpha * 0.6;
            ctx.lineWidth = size * 0.5;
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
  }, []);

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
      {/* ── Particle Starfield Canvas ── */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* ── Background Embedded Portrait (Dark, Moody, Heroic with Studio Cyan Rim Glow) ── */}
      <div
        className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-all duration-1000 ease-out z-[1] ${
          stage === 'portfolio' ? 'opacity-85 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Subtle Cyan Studio Spot Rim Glow behind head (matches HeroSection) */}
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
           LEFT SIDE TELEMETRY (portfolio stage)
           ═══════════════════════════════════════ */}
      {stage === 'portfolio' && (
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
      )}

      {/* ═══════════════════════════════════════
           RIGHT SIDE TELEMETRY (portfolio stage)
           ═══════════════════════════════════════ */}
      {stage === 'portfolio' && (
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
      )}

      {/* ── Center Stage ── */}
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
             PHASE 2 & 3: EXCLAMATION DROP → PIVOT TILT → 3D UNROLL
             (Exact 3D physics from reference video)
             ══════════════════════════════════════════════════════════ */}
        {stage === 'exclamation' && (
          <div
            ref={animContainerRef}
            className="relative flex items-center justify-center min-h-[140px] w-full"
            style={{ perspective: '1200px' }}
          >
            {/* The Exclamation Mark Assembly (Bar + Dot) */}
            <div className="relative flex flex-col items-center justify-center">
              {/* Tilted / Dropping Exclamation Stick */}
              <div
                ref={barRef}
                className="w-4 sm:w-5 h-16 sm:h-20 rounded-t-sm mb-2.5"
                style={{
                  background:
                    'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 35%, #94A3B8 70%, #64748B 100%)',
                  boxShadow:
                    '0 0 25px rgba(0,217,255,0.7), 0 0 50px rgba(0,217,255,0.3)',
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

            {/* The 11 Letters Unrolling in 3D Domino Waves */}
            <div
              className="absolute flex items-center justify-center font-display font-black text-[clamp(2.4rem,8vw,5.5rem)] leading-none uppercase tracking-[0.06em] whitespace-nowrap"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {NAME_LETTERS.map((letter, idx) => (
                <span
                  key={idx}
                  ref={(el) => {
                    lettersRef.current[idx] = el;
                  }}
                  className="inline-block relative"
                  style={{
                    background:
                      'linear-gradient(180deg, #FFFFFF 15%, #E2E8F0 45%, #94A3B8 80%, #64748B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter:
                      'drop-shadow(0 4px 10px rgba(0,0,0,0.8)) drop-shadow(0 0 20px rgba(0,217,255,0.35))',
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
             PHASE 4–6: NAME SETTLE → MORPH → HEROIC PORTFOLIO
             ══════════════════════════════════════════════════════════ */}
        {(stage === 'name-settle' || stage === 'morph' || stage === 'portfolio') && (
          <div
            className={`relative flex flex-col items-center justify-center w-full z-10 transition-transform duration-700 ${
              stage === 'portfolio'
                ? 'pt-24 sm:pt-36 md:pt-40'
                : 'pt-0'
            }`}
          >
            {/* ── Main Title with Glitch / Morph ── */}
            <h1
              className="font-display font-black uppercase leading-none whitespace-nowrap relative"
              style={{
                fontSize: 'clamp(2.6rem, 11vw, 7.6rem)',
                letterSpacing: '0.06em',
              }}
            >
              {/* Subtle Chromatic Glitch during name-settle */}
              {stage === 'name-settle' && (
                <>
                  <span
                    className="absolute inset-0 chrome-text pointer-events-none"
                    style={{
                      color: 'transparent',
                      clipPath: 'polygon(0 0, 100% 0, 100% 33%, 0 33%)',
                      transform: 'translate(2px, -1px)',
                      opacity: 0.6,
                      filter: 'hue-rotate(-40deg)',
                    }}
                    aria-hidden="true"
                  >
                    {displayText}
                  </span>
                  <span
                    className="absolute inset-0 chrome-text pointer-events-none"
                    style={{
                      color: 'transparent',
                      clipPath: 'polygon(0 67%, 100% 67%, 100% 100%, 0 100%)',
                      transform: 'translate(-2px, 1px)',
                      opacity: 0.6,
                      filter: 'hue-rotate(40deg)',
                    }}
                    aria-hidden="true"
                  >
                    {displayText}
                  </span>
                </>
              )}

              {/* Character-by-character lock during kinetic morph */}
              {stage === 'morph' ? (
                <span className="relative inline-flex">
                  {displayText.split('').map((char, i) => (
                    <span
                      key={i}
                      className="inline-block transition-colors duration-100"
                      style={{
                        color: morphLocked[i]
                          ? '#00D9FF'
                          : 'rgba(255,255,255,0.75)',
                        textShadow: morphLocked[i]
                          ? '0 0 20px #00D9FF, 0 0 40px rgba(0,217,255,0.5)'
                          : '0 0 10px rgba(255,255,255,0.3)',
                        transform: morphLocked[i]
                          ? 'scale(1)'
                          : `translateY(${Math.random() * 2 - 1}px)`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ) : (
                <span
                  className="chrome-text tracking-[0.06em]"
                  style={{
                    filter:
                      stage === 'name-settle'
                        ? 'drop-shadow(0 0 50px rgba(0,217,255,0.5))'
                        : 'drop-shadow(0 0 40px rgba(0,217,255,0.4))',
                  }}
                >
                  {displayText}
                </span>
              )}

              {/* Cyan period dot */}
              {stage === 'portfolio' && (
                <span
                  className="text-[#00D9FF]"
                  style={{ textShadow: '0 0 20px #00D9FF' }}
                >
                  .
                </span>
              )}
            </h1>

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
              <div className="relative group animate-fade-in-up">
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
