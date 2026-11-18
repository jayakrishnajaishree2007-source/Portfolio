import { Camera, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const PORTRAIT_STORAGE_KEY = 'jk_portfolio_portrait_v1';

interface PortraitFrameProps {
  variant?: 'hero' | 'about';
  className?: string;
}

export function PortraitFrame({ variant = 'hero', className = '' }: PortraitFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PORTRAIT_STORAGE_KEY);
      if (saved) setCustomPhoto(saved);
    } catch {
      // Ignore storage errors
    }

    const onSync = (e: Event) => {
      const custom = e as CustomEvent<string | null>;
      setCustomPhoto(custom.detail ?? null);
    };
    window.addEventListener('jk-portrait-updated', onSync);
    return () => window.removeEventListener('jk-portrait-updated', onSync);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -ny * 7, ry: nx * 9 });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : null;
      if (!result) return;
      setCustomPhoto(result);
      try {
        window.localStorage.setItem(PORTRAIT_STORAGE_KEY, result);
      } catch {
        // Ignore quota errors
      }
      window.dispatchEvent(new CustomEvent('jk-portrait-updated', { detail: result }));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleReset = () => {
    setCustomPhoto(null);
    try {
      window.localStorage.removeItem(PORTRAIT_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    window.dispatchEvent(new CustomEvent('jk-portrait-updated', { detail: null }));
  };

  const isHero = variant === 'hero';

  return (
    <div
      ref={frameRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-cursor="PORTRAIT"
      className={`relative select-none group ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Subtle Cyan Studio Rim Backdrop */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 opacity-50 blur-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-80"
        style={{
          background: isHero
            ? 'radial-gradient(circle at 78% 22%, rgba(0,217,255,0.22), transparent 55%), radial-gradient(circle at 20% 80%, rgba(203,213,225,0.16), transparent 55%)'
            : 'radial-gradient(circle at 22% 24%, rgba(0,217,255,0.22), transparent 55%), radial-gradient(circle at 80% 76%, rgba(148,163,184,0.16), transparent 55%)',
        }}
      />

      <div
        className="relative border border-white/15 bg-[#0E1117] overflow-hidden shadow-[0_28px_75px_rgba(0,0,0,0.75)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform aspect-[4/5]"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Subtle Metallic Inner Rim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            boxShadow:
              'inset 1px 0 24px rgba(0,217,255,0.16), inset -1px 0 24px rgba(226,232,240,0.12)',
          }}
        />

        {customPhoto ? (
          <img
            src={customPhoto}
            alt="Portrait of Jayakrishna J"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top grayscale contrast-115 group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="relative w-full h-full bg-[#0C0F15] flex items-end justify-center overflow-hidden">
            <div aria-hidden="true" className="absolute inset-0 obsidian-grid-bg" />
            <svg
              viewBox="0 0 400 480"
              className="relative z-10 w-full h-full"
              aria-label="Metallic obsidian studio portrait of Jayakrishna J"
            >
              <defs>
                <linearGradient id={`chromeRim-${variant}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id={`torsoFill-${variant}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1A202B" />
                  <stop offset="50%" stopColor="#0F131B" />
                  <stop offset="100%" stopColor="#191F2A" />
                </linearGradient>
                <radialGradient id={`studioSpot-${variant}`} cx="50%" cy="36%" r="48%">
                  <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.16" />
                  <stop offset="60%" stopColor="#94A3B8" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#0C0F15" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width="400" height="480" fill={`url(#studioSpot-${variant})`} />

              <circle
                cx="200"
                cy="188"
                r="118"
                fill="none"
                stroke="#94A3B8"
                strokeOpacity="0.22"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="312"
                x2="400"
                y2="312"
                stroke="#FFFFFF"
                strokeOpacity="0.1"
                strokeWidth="1"
              />

              <path
                d="M 56 480 L 78 378 C 86 344 120 322 158 314 L 174 310 L 174 282 L 226 282 L 226 310 L 242 314 C 280 322 314 344 322 378 L 344 480 Z"
                fill={`url(#torsoFill-${variant})`}
                stroke={`url(#chromeRim-${variant})`}
                strokeWidth="1.8"
              />
              <path
                d="M 162 314 L 200 374 L 238 314"
                fill="none"
                stroke="#00D9FF"
                strokeOpacity="0.65"
                strokeWidth="1.5"
              />
              <path
                d="M 149 186 C 149 134 171 106 200 106 C 229 106 251 134 251 186 C 251 230 231 272 200 276 C 169 272 149 230 149 186 Z"
                fill="#11151E"
                stroke={`url(#chromeRim-${variant})`}
                strokeWidth="2"
              />
              <path
                d="M 146 174 C 145 126 172 95 204 97 C 238 99 258 128 254 174 C 244 144 226 130 200 130 C 174 130 156 144 146 174 Z"
                fill="#171C27"
                stroke="#CBD5E1"
                strokeOpacity="0.35"
                strokeWidth="1.2"
              />
              <text
                x="200"
                y="432"
                textAnchor="middle"
                fill="#E2E8F0"
                fillOpacity="0.88"
                fontFamily="Oxanium, sans-serif"
                fontWeight="800"
                fontSize="24"
                letterSpacing="3"
              >
                JK.
              </text>
            </svg>
          </div>
        )}

        {/* Minimal Graphite Caption Strip */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-4 py-3 bg-[#080A0E]/92 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#00D9FF]">
              Jayakrishna J
            </p>
            <p className="font-mono-tech text-[10px] text-[#94A3B8]">
              PSG Polytechnic · DCN 2025–27
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
              aria-label="Upload portrait photograph"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              data-cursor="PHOTO"
              className="px-2.5 py-1.5 border border-white/20 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] text-[10px] font-mono-tech uppercase tracking-wider text-white flex items-center gap-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
              title="Set personal portrait"
            >
              <Camera className="w-3 h-3 text-[#00D9FF]" />
              <span>{customPhoto ? 'Change' : 'Photo'}</span>
            </button>
            {customPhoto && (
              <button
                type="button"
                onClick={handleReset}
                aria-label="Reset portrait to default"
                className="p-1.5 border border-white/20 bg-[#10131A] hover:border-[#00D9FF] text-[#94A3B8] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
                title="Reset portrait"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
