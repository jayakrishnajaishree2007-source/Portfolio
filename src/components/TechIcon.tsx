interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = 'w-16 h-16' }: TechIconProps) {
  switch (name) {
    case 'Python':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="Python">
          <path
            d="M31.8 6c-13.8 0-12.9 6-12.9 6l.01 6.2h13.2v1.9H13.6s-8.6.9-8.6 13c0 12.1 7.5 11.6 7.5 11.6h4.5v-6.3c0-7.3 6.3-7.1 6.3-7.1h12.8s6.1.1 6.1-5.9V12.1S43 6 31.8 6zm-7 3.9a2.3 2.3 0 110 4.6 2.3 2.3 0 010-4.6z"
            fill="#387EB8"
          />
          <path
            d="M32.2 58c13.8 0 12.9-6 12.9-6l-.01-6.2H31.9v-1.9h18.5s8.6-.9 8.6-13c0-12.1-7.5-11.6-7.5-11.6h-4.5v6.3c0 7.3-6.3 7.1-6.3 7.1H27.9s-6.1-.1-6.1 5.9v13.3s-.8 6.1 10.4 6.1zm7-3.9a2.3 2.3 0 110-4.6 2.3 2.3 0 010 4.6z"
            fill="#FFE052"
          />
        </svg>
      );

    case 'Java':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="Java">
          <path
            d="M26 43.5c6.5.6 12-.3 17.5-2.2 0 0-2.5 1.5-6.5 2.5-7.8 1.8-15.5 1.5-20.2-.3-2.5-.9 9.2 0 9.2 0z"
            fill="#E76F00"
          />
          <path
            d="M23.5 38c5.4.5 10.5-.2 16.5-1.9 0 0-2.2 1.2-5.5 2-6.8 1.6-13.8 1.3-18-.2-2.3-.8 7 0 7 0z"
            fill="#E76F00"
          />
          <path
            d="M34.8 28.5c3.2 3.5-1.5 6.8-1.5 6.8s7.5-3.8 4-9.2c-3.2-5-5.5-7.5 7.8-15.1 0 0-16.2 4-10.3 17.5z"
            fill="#5382A1"
          />
          <path
            d="M48.2 47.5c-4.8 3.8-21.5 5.5-29.2.5-3-2 4.5-3.2 7.5-3.5-7.8-2-19.5 4.5-9.2 6.8 13.5 2.8 32.2.8 30.9-3.8z"
            fill="#E76F00"
          />
          <path
            d="M21.2 26.5c3 3.5-1.2 6.8-1.2 6.8s6.8-3.5 3.5-8.8c-3-4.8-4.5-7.5 7-14.5 0 0-14.8 3.5-9.3 16.5z"
            fill="#5382A1"
          />
          <path
            d="M44.5 53.5c-12.8 3-29.2.8-34.5-2.5-2-1.2 3.5-2.5 6.5-2.8-7.8-1.8-17.5 4.5-7.5 6.5 13.5 2.5 36.5 1 35.5-1.2z"
            fill="#5382A1"
          />
        </svg>
      );

    case 'JavaScript':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="JavaScript">
          <rect width="64" height="64" rx="8" fill="#F7DF1E" />
          <path
            d="M18 48l4.5-2.7c1 1.8 2.2 3.2 4.4 3.2 2.2 0 3.6-1 3.6-3.8V28h5.7v16.8c0 5.8-3.4 8.5-8.8 8.5-4.8 0-7.8-2.5-9.4-5.3zm21.8-.7l4.5-2.6c1.2 2 2.8 3.5 5.5 3.5 2.4 0 3.9-1.2 3.9-2.8 0-2-1.6-2.7-4.4-3.9l-1.5-.6c-4.3-1.8-7.2-4.1-7.2-9 0-4.5 3.5-7.9 8.9-7.9 3.9 0 6.7 1.4 8.6 4.7l-4.4 2.8c-1-1.6-2.1-2.3-4.2-2.3-1.9 0-3.2 1.2-3.2 2.6 0 1.8 1.3 2.5 3.8 3.5l1.5.6c5.1 2.2 7.8 4.5 7.8 9.5 0 5.5-4.3 8.3-9.7 8.3-5.4 0-8.9-2.7-9.7-6.4z"
            fill="#000000"
          />
        </svg>
      );

    case 'HTML':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="HTML5">
          <path d="M10 6l4.5 50.5L32 61l17.5-4.5L54 6H10z" fill="#E44D26" />
          <path d="M32 10.5v45.8l13.8-3.8L49 10.5H32z" fill="#F16529" />
          <path
            d="M20 18.5h24l-.5 5.5H26l.5 5.5h16.5l-1.5 15.5L32 48l-9.5-3-.5-6h5.5l.3 3 4.2 1.2 4.2-1.2.5-5.5H19.5L20 18.5z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'CSS':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="CSS3">
          <path d="M10 6l4.5 50.5L32 61l17.5-4.5L54 6H10z" fill="#1572B6" />
          <path d="M32 10.5v45.8l13.8-3.8L49 10.5H32z" fill="#33A9DC" />
          <path
            d="M20 18.5h24l-.5 5.5H32v5.5h10.5l-1.5 15.5L32 48v-5.5l4.5-1.2.4-4.8H32v-5.5h-5.5l-.3-3.5h5.8V18.5H20z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'React':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="React">
          <ellipse cx="32" cy="32" rx="7" ry="24" stroke="#61DAFB" strokeWidth="2.8" />
          <ellipse
            cx="32"
            cy="32"
            rx="7"
            ry="24"
            transform="rotate(60 32 32)"
            stroke="#61DAFB"
            strokeWidth="2.8"
          />
          <ellipse
            cx="32"
            cy="32"
            rx="7"
            ry="24"
            transform="rotate(120 32 32)"
            stroke="#61DAFB"
            strokeWidth="2.8"
          />
          <circle cx="32" cy="32" r="4.2" fill="#61DAFB" />
        </svg>
      );

    case 'Routing':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="Routing / IS-IS">
          {/* Cylinder router chassis */}
          <ellipse cx="32" cy="18" rx="22" ry="9" fill="#0E2433" stroke="#00D9FF" strokeWidth="2.5" />
          <path
            d="M10 18v16c0 5 9.8 9 22 9s22-4 22-9V18"
            fill="#081520"
            stroke="#00D9FF"
            strokeWidth="2.5"
          />
          <path d="M10 26c0 5 9.8 9 22 9s22-4 22-9" stroke="#00D9FF" strokeWidth="1.5" strokeOpacity="0.5" />
          {/* 4 Directional Routing Arrows on Top Surface */}
          <path d="M26 15l-6 3 6 3M38 15l6 3-6 3M29 13l3-5 3 5M29 23l3 5 3-5" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Glowing node badge */}
          <circle cx="32" cy="53" r="3.5" fill="#34D399" />
          <line x1="32" y1="43" x2="32" y2="49.5" stroke="#34D399" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      );

    case 'Switching':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="Switching / VLANs">
          <rect x="8" y="16" width="48" height="28" rx="4" fill="#0C1D2A" stroke="#38BDF8" strokeWidth="2.5" />
          {/* 2 pairs of bidirectional switch arrows */}
          <path d="M16 26h18m-5-4l5 4-5 4" stroke="#00D9FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M48 34H30m5-4l-5 4 5 4" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Port LED row */}
          <circle cx="16" cy="38" r="1.8" fill="#34D399" />
          <circle cx="22" cy="38" r="1.8" fill="#34D399" />
          <circle cx="28" cy="38" r="1.8" fill="#38BDF8" />
          <circle cx="34" cy="38" r="1.8" fill="#38BDF8" />
          <circle cx="40" cy="38" r="1.8" fill="#00D9FF" />
          <circle cx="46" cy="38" r="1.8" fill="#00D9FF" />
        </svg>
      );

    case 'Network Engineering':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="Network Engineering">
          <line x1="32" y1="14" x2="14" y2="46" stroke="#38BDF8" strokeWidth="2.2" />
          <line x1="32" y1="14" x2="50" y2="46" stroke="#38BDF8" strokeWidth="2.2" />
          <line x1="14" y1="46" x2="50" y2="46" stroke="#00D9FF" strokeWidth="2.2" />
          <line x1="32" y1="14" x2="32" y2="35" stroke="#34D399" strokeWidth="1.8" strokeDasharray="3 3" />
          <circle cx="32" cy="14" r="7" fill="#081520" stroke="#00D9FF" strokeWidth="2.5" />
          <circle cx="14" cy="46" r="7" fill="#081520" stroke="#34D399" strokeWidth="2.5" />
          <circle cx="50" cy="46" r="7" fill="#081520" stroke="#C084FC" strokeWidth="2.5" />
          <circle cx="32" cy="35" r="4" fill="#34D399" />
        </svg>
      );

    case 'Access Connectivity':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="Access Connectivity">
          <circle cx="32" cy="48" r="4.5" fill="#00D9FF" />
          <path d="M22 39a14 14 0 0120 0" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <path d="M15 31a24 24 0 0134 0" stroke="#00D9FF" strokeWidth="3" strokeLinecap="round" />
          <path d="M8 23a34 34 0 0148 0" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'Machine Learning':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="Machine Learning / AI">
          <path d="M16 20l16-8 16 8v16l-16 16-16-16V20z" stroke="#C084FC" strokeWidth="2.2" fill="#140E26" />
          {/* Interconnected Neural Synapses */}
          <line x1="32" y1="20" x2="22" y2="34" stroke="#A855F7" strokeWidth="1.8" />
          <line x1="32" y1="20" x2="42" y2="34" stroke="#A855F7" strokeWidth="1.8" />
          <line x1="22" y1="34" x2="32" y2="44" stroke="#E879F9" strokeWidth="1.8" />
          <line x1="42" y1="34" x2="32" y2="44" stroke="#E879F9" strokeWidth="1.8" />
          <line x1="22" y1="34" x2="42" y2="34" stroke="#00D9FF" strokeWidth="1.8" strokeDasharray="2 2" />
          <circle cx="32" cy="20" r="3.8" fill="#C084FC" />
          <circle cx="22" cy="34" r="3.8" fill="#38BDF8" />
          <circle cx="42" cy="34" r="3.8" fill="#34D399" />
          <circle cx="32" cy="44" r="4.2" fill="#F472B6" />
        </svg>
      );

    case 'XGBoost':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="XGBoost">
          <rect x="8" y="8" width="48" height="48" rx="10" fill="#0B1C1A" stroke="#10B981" strokeWidth="2.2" />
          {/* Gradient Boosted Tree Structure */}
          <circle cx="32" cy="20" r="4.5" fill="#34D399" />
          <line x1="32" y1="20" x2="20" y2="34" stroke="#10B981" strokeWidth="2.2" />
          <line x1="32" y1="20" x2="44" y2="34" stroke="#10B981" strokeWidth="2.2" />
          <circle cx="20" cy="34" r="4" fill="#059669" />
          <circle cx="44" cy="34" r="4" fill="#059669" />
          <line x1="20" y1="34" x2="14" y2="46" stroke="#34D399" strokeWidth="1.8" />
          <line x1="20" y1="34" x2="26" y2="46" stroke="#34D399" strokeWidth="1.8" />
          <line x1="44" y1="34" x2="38" y2="46" stroke="#34D399" strokeWidth="1.8" />
          <line x1="44" y1="34" x2="50" y2="46" stroke="#34D399" strokeWidth="1.8" />
          <circle cx="14" cy="46" r="3" fill="#6EE7B7" />
          <circle cx="26" cy="46" r="3" fill="#6EE7B7" />
          <circle cx="38" cy="46" r="3" fill="#6EE7B7" />
          <circle cx="50" cy="46" r="3" fill="#6EE7B7" />
        </svg>
      );

    case 'Random Forest':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="Random Forest">
          {/* Center Main Tree */}
          <path d="M32 10l-10 16h6l-8 14h24l-8-14h6L32 10z" fill="#059669" stroke="#34D399" strokeWidth="1.8" />
          <rect x="30" y="40" width="4" height="12" fill="#78350F" />
          {/* Left Mini Tree */}
          <path d="M16 22l-7 12h4l-5 10h16l-5-10h4L16 22z" fill="#047857" opacity="0.85" />
          <rect x="15" y="44" width="2.5" height="8" fill="#78350F" opacity="0.85" />
          {/* Right Mini Tree */}
          <path d="M48 22l-7 12h4l-5 10h16l-5-10h4L48 22z" fill="#047857" opacity="0.85" />
          <rect x="47" y="44" width="2.5" height="8" fill="#78350F" opacity="0.85" />
        </svg>
      );

    case 'MLP':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="Multi-Layer Perceptron">
          {/* Layer 1 Input Nodes */}
          <circle cx="12" cy="18" r="4" fill="#38BDF8" />
          <circle cx="12" cy="32" r="4" fill="#38BDF8" />
          <circle cx="12" cy="46" r="4" fill="#38BDF8" />
          {/* Layer 2 Hidden Nodes */}
          <circle cx="32" cy="14" r="4" fill="#C084FC" />
          <circle cx="32" cy="26" r="4" fill="#C084FC" />
          <circle cx="32" cy="38" r="4" fill="#C084FC" />
          <circle cx="32" cy="50" r="4" fill="#C084FC" />
          {/* Layer 3 Output Nodes */}
          <circle cx="52" cy="24" r="4" fill="#34D399" />
          <circle cx="52" cy="40" r="4" fill="#34D399" />
          {/* Synapses L1 to L2 */}
          <line x1="12" y1="18" x2="32" y2="14" stroke="#818CF8" strokeWidth="1.2" strokeOpacity="0.6" />
          <line x1="12" y1="18" x2="32" y2="26" stroke="#818CF8" strokeWidth="1.2" strokeOpacity="0.6" />
          <line x1="12" y1="32" x2="32" y2="26" stroke="#818CF8" strokeWidth="1.2" strokeOpacity="0.6" />
          <line x1="12" y1="32" x2="32" y2="38" stroke="#818CF8" strokeWidth="1.2" strokeOpacity="0.6" />
          <line x1="12" y1="46" x2="32" y2="38" stroke="#818CF8" strokeWidth="1.2" strokeOpacity="0.6" />
          <line x1="12" y1="46" x2="32" y2="50" stroke="#818CF8" strokeWidth="1.2" strokeOpacity="0.6" />
          {/* Synapses L2 to L3 */}
          <line x1="32" y1="14" x2="52" y2="24" stroke="#A78BFA" strokeWidth="1.2" strokeOpacity="0.6" />
          <line x1="32" y1="26" x2="52" y2="24" stroke="#A78BFA" strokeWidth="1.2" strokeOpacity="0.6" />
          <line x1="32" y1="38" x2="52" y2="40" stroke="#A78BFA" strokeWidth="1.2" strokeOpacity="0.6" />
          <line x1="32" y1="50" x2="52" y2="40" stroke="#A78BFA" strokeWidth="1.2" strokeOpacity="0.6" />
        </svg>
      );

    case 'MySQL':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="MySQL">
          {/* Cylinder database stack with dolphin motif */}
          <ellipse cx="32" cy="16" rx="20" ry="7" fill="#00758F" />
          <path d="M12 16v12c0 3.8 9 7 20 7s20-3.2 20-7V16" fill="#005A6F" />
          <ellipse cx="32" cy="28" rx="20" ry="7" fill="#00758F" />
          <path d="M12 28v12c0 3.8 9 7 20 7s20-3.2 20-7V28" fill="#005A6F" />
          <ellipse cx="32" cy="40" rx="20" ry="7" fill="#00758F" />
          <path d="M12 40v12c0 3.8 9 7 20 7s20-3.2 20-7V40" fill="#004656" />
          <ellipse cx="32" cy="52" rx="20" ry="7" fill="#00758F" />
          {/* Orange dolphin wave arc */}
          <path d="M26 22c5-3 12-2 15 3 2 3-1 6-5 6-3 0-5-2-4-5" stroke="#F29111" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'Git':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="Git">
          <path
            d="M57.6 28.5L35.5 6.4a4.9 4.9 0 00-6.9 0l-4.5 4.5 6.2 6.2a5.4 5.4 0 016.9 6.9l5.9 5.9a5.4 5.4 0 11-3.6 3.6l-5.6-5.6v12.2a5.4 5.4 0 11-5.1 0V27.4a5.4 5.4 0 01-2.9-4.7c0-1.2.4-2.3 1-3.2L20.6 13 6.4 27.2a4.9 4.9 0 000 6.9l22.1 22.1c1.9 1.9 5 1.9 6.9 0l22.2-22.1c1.9-1.9 1.9-5 0-6.9z"
            fill="#F05032"
          />
        </svg>
      );

    case 'Linux':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="Linux">
          {/* Tux Penguin Silhouette */}
          <ellipse cx="32" cy="34" rx="16" ry="22" fill="#1E293B" />
          {/* White Belly */}
          <ellipse cx="32" cy="38" rx="10" ry="15" fill="#F8FAFC" />
          {/* Yellow Beak */}
          <path d="M28 22c2-3 6-3 8 0l-4 4-4-4z" fill="#FBBF24" />
          {/* Eyes */}
          <circle cx="28" cy="18" r="2.2" fill="#FFFFFF" />
          <circle cx="36" cy="18" r="2.2" fill="#FFFFFF" />
          <circle cx="28.5" cy="18" r="1.1" fill="#0F172A" />
          <circle cx="35.5" cy="18" r="1.1" fill="#0F172A" />
          {/* Yellow Feet */}
          <ellipse cx="23" cy="54" rx="6" ry="2.5" fill="#F59E0B" />
          <ellipse cx="41" cy="54" rx="6" ry="2.5" fill="#F59E0B" />
        </svg>
      );

    case 'ERPNext':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="ERPNext">
          <rect width="64" height="64" rx="12" fill="#0089FF" />
          {/* Stylized White 'E' */}
          <path
            d="M20 18h24v6H26v8h15v6H26v8h18v6H20V18z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'Docker':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-label="Docker">
          <path
            d="M60 30c-1.2-.8-3.8-.8-5.3-.2-1.1-2.4-3.5-3.8-6.1-3.8-.6 0-1.2.1-1.7.3-2.1-4.2-6.5-7.1-11.5-7.1v3.2c4.1 0 7.7 2.4 9.4 5.9-1.3.7-2.3 1.9-2.7 3.3H2.8C2 34.6 2 37.6 2.8 40.4 5.2 48.7 13.8 54 26.5 54c18.5 0 32.1-10.4 34.8-21.2 0-.2.1-.4.1-.6-.2-.7-.7-1.4-1.4-2.2z"
            fill="#2496ED"
          />
          {/* Cargo containers */}
          <rect x="18" y="24" width="5.5" height="4.5" fill="#2496ED" stroke="#0B132B" strokeWidth="1" />
          <rect x="25" y="24" width="5.5" height="4.5" fill="#2496ED" stroke="#0B132B" strokeWidth="1" />
          <rect x="32" y="24" width="5.5" height="4.5" fill="#2496ED" stroke="#0B132B" strokeWidth="1" />
          <rect x="18" y="18" width="5.5" height="4.5" fill="#2496ED" stroke="#0B132B" strokeWidth="1" />
          <rect x="25" y="18" width="5.5" height="4.5" fill="#2496ED" stroke="#0B132B" strokeWidth="1" />
          <rect x="32" y="18" width="5.5" height="4.5" fill="#2496ED" stroke="#0B132B" strokeWidth="1" />
          <rect x="25" y="12" width="5.5" height="4.5" fill="#2496ED" stroke="#0B132B" strokeWidth="1" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <rect x="12" y="12" width="40" height="40" rx="8" stroke="#00D9FF" strokeWidth="2.5" fill="#0C1D2A" />
          <circle cx="32" cy="32" r="8" fill="#00D9FF" />
        </svg>
      );
  }
}
