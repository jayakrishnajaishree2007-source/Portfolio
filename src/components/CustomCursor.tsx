import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<string | null>(null);
  const hoveringRef = useRef(false);
  const textInputRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const handleMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const target = e.target as HTMLElement | null;
      const inInput = Boolean(target?.closest('input, textarea, select'));
      const interactive = !inInput && target?.closest('a, button, [data-cursor]');
      const nextHover = Boolean(interactive);
      const nextLabel = interactive ? interactive.getAttribute('data-cursor') || null : null;

      if (inInput !== textInputRef.current) {
        textInputRef.current = inInput;
        setIsTextInput(inInput);
      }
      if (nextHover !== hoveringRef.current) {
        hoveringRef.current = nextHover;
        setIsHovering(nextHover);
      }
      if (nextLabel !== labelRef.current) {
        labelRef.current = nextLabel;
        setLabel(nextLabel);
      }
    };

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);
    const handleLeave = () => {
      mouseX = -100;
      mouseY = -100;
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);
    document.addEventListener('mouseleave', handleLeave);

    const loop = () => {
      ringX += (mouseX - ringX) * 0.24;
      ringY += (mouseY - ringY) * 0.24;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 z-[100] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-150 ${
          isTextInput ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className={`flex items-center justify-center border transition-all duration-150 ease-out ${
            label
              ? 'px-3 py-1 rounded-sm bg-[#00D9FF] border-[#00D9FF] text-[#080A0E]'
              : isHovering
              ? 'w-10 h-10 rounded-full border-[#00D9FF] bg-[#00D9FF]/10'
              : 'w-7 h-7 rounded-full border-white/35'
          } ${isPressed ? 'scale-90' : 'scale-100'}`}
        >
          {label && (
            <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap">
              {label}
            </span>
          )}
        </div>
      </div>

      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 z-[101] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-150 ${
          isTextInput ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full bg-[#00D9FF] transition-transform duration-150 ${
            label ? 'scale-0' : isHovering ? 'scale-125 bg-white' : 'scale-100'
          }`}
        />
      </div>
    </>
  );
}
