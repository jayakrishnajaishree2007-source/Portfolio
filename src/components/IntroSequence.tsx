import { useEffect, useRef, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

const GLYPHS = '0123456789ABCDEF!@#$%^&*<>/?';

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  // Intro stages: 'beacon' -> 'name' -> 'morph' -> 'portfolio' -> 'exit'
  const [stage, setStage] = useState<'beacon' | 'name' | 'morph' | 'portfolio' | 'exit'>('beacon');
  const [displayText, setDisplayText] = useState('JAYAKRISHNA');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Handle ESC key to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSkip = () => {
    setStage('exit');
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  // Main Choreographed Animation Timeline
  useEffect(() => {
    // 1. Beacon pulse for 1.1s, then reveal name
    const timer1 = setTimeout(() => {
      setStage('name');
    }, 1100);

    // 2. Name stays for 1.3s, then morph starts
    const timer2 = setTimeout(() => {
      setStage('morph');
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Kinetic Text Scramble Morph from "JAYAKRISHNA" to "PORTFOLIO"
  useEffect(() => {
    if (stage !== 'morph') return;

    const startWord = 'JAYAKRISHNA';
    const targetWord = 'PORTFOLIO';
    const duration = 1400; // ms
    const startTime = performance.now();

    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      if (progress < 1) {
        // Calculate intermediate morph length
        const currentLen = Math.round(startWord.length - (startWord.length - targetWord.length) * progress);
        let morphed = '';

        for (let i = 0; i < currentLen; i++) {
          if (progress > (i + 1) / (targetWord.length + 2)) {
            // Letter has locked into target word
            morphed += targetWord[i] || '';
          } else {
            // Scrambling glyph
            morphed += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        setDisplayText(morphed);
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplayText('PORTFOLIO');
        setStage('portfolio');

        // After displaying PORTFOLIO with portrait for 1.8s, exit cleanly
        setTimeout(() => {
          setStage('exit');
          setTimeout(() => {
            onComplete();
          }, 700);
        }, 1800);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [stage, onComplete]);

  // Particle Constellation Starfield Canvas
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

    const particleCount = 140;
    interface Particle {
      x: number;
      y: number;
      z: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * width,
        speed: 1.5 + Math.random() * 4,
        size: 0.8 + Math.random() * 2,
        color: Math.random() > 0.4 ? '#00D9FF' : '#FFFFFF',
        alpha: 0.2 + Math.random() * 0.8,
      });
    }

    let animationId: number;

    const render = () => {
      ctx.fillStyle = 'rgba(8, 10, 14, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Accelerated speed when stage is morph or portfolio
      const speedMultiplier = stage === 'morph' || stage === 'portfolio' ? 3.5 : 1;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.z -= p.speed * speedMultiplier;

        if (p.z <= 0) {
          p.z = width;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.y = (Math.random() - 0.5) * height * 1.5;
        }

        const k = 250 / p.z;
        const px = p.x * k + cx;
        const py = p.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.5, p.size * k);
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.min(1, p.alpha * k * 0.8);
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
      className={`fixed inset-0 z-[100] bg-[#080A0E] flex flex-col items-center justify-center overflow-hidden transition-all duration-700 select-none ${
        stage === 'exit' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Starfield Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Top Bar with Skip Button */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between font-mono-tech text-xs tracking-widest text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
          <span className="uppercase text-[#38BDF8]">SYSTEM INITIALIZE</span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-white/15 bg-[#10131A]/80 hover:border-[#00D9FF] text-[#CBD5E1] hover:text-[#00D9FF] transition-colors"
        >
          <span>Skip [ESC]</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Composition Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl">
        {/* PHASE 1: Center Beacon Point */}
        {stage === 'beacon' && (
          <div className="relative flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_35px_#00D9FF,0_0_70px_#00D9FF] animate-ping" />
            <div className="absolute w-3 h-3 rounded-full bg-[#00D9FF] shadow-[0_0_20px_#00D9FF]" />
          </div>
        )}

        {/* PHASE 2, 3 & 4: Name -> Morph -> Portfolio */}
        {stage !== 'beacon' && (
          <div className="relative flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 w-full">
            {/* Portrait Constellation Silhouette behind PORTFOLIO */}
            <div
              className={`absolute -top-28 sm:-top-36 pointer-events-none transition-all duration-1000 ease-out ${
                stage === 'portfolio' ? 'opacity-70 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-6'
              }`}
            >
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border border-[#00D9FF]/40 shadow-[0_0_80px_rgba(0,217,255,0.35)]">
                <img
                  src="/assets/jk-portrait.jpeg"
                  alt="Jayakrishna J"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 mix-blend-screen scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A0E] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#080A0E_100%)]" />
              </div>
            </div>

            {/* Kinetic Morphing Title */}
            <h1 className="font-display font-extrabold uppercase tracking-tight text-[clamp(2.5rem,10vw,6.5rem)] leading-none text-white drop-shadow-[0_0_40px_rgba(0,217,255,0.45)] whitespace-nowrap">
              <span className="chrome-text tracking-[0.06em]">{displayText}</span>
              {stage === 'portfolio' && <span className="text-[#00D9FF]">.</span>}
            </h1>

            {/* Subtitle & Role Transition */}
            <div
              className={`mt-6 font-mono-tech uppercase tracking-[0.2em] text-xs sm:text-sm text-[#7DD3FC] transition-all duration-700 ${
                stage === 'portfolio' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <p className="flex items-center gap-2 sm:gap-3">
                <span>Computer Networking</span>
                <span className="text-[#00D9FF]">/</span>
                <span>Applied AI</span>
                <span className="text-[#00D9FF]">/</span>
                <span>Web Architecture</span>
              </p>
            </div>

            {/* Enter Button Indicator */}
            {stage === 'portfolio' && (
              <button
                type="button"
                onClick={handleSkip}
                className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 border border-[#00D9FF]/60 bg-[#00D9FF]/10 hover:bg-[#00D9FF] text-[#00D9FF] hover:text-[#080A0E] font-mono-tech text-xs uppercase tracking-widest transition-all duration-200 animate-pulse"
              >
                <span>Enter Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Telemetry Status */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between font-mono-tech text-[10px] text-[#64748B] tracking-wider">
        <span>STATION / 01 · COIMBATORE</span>
        <span>LATENCY: 12ms · SECURE BUFFER</span>
      </div>
    </div>
  );
}
