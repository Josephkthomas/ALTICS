import React from 'react';

export default function ConsultationSVG({ isActive }) {
  const playState = isActive ? 'running' : 'paused';

  return (
    <svg viewBox="0 0 96 96" width="96" height="96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes engage-consult-draw {
          0% { stroke-dashoffset: 80; opacity: 0; }
          5% { opacity: 1; }
          37% { stroke-dashoffset: 0; opacity: 1; }
          72% { stroke-dashoffset: 0; opacity: 1; }
          85% { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 80; opacity: 0; }
        }
        @keyframes engage-consult-pulse {
          0%, 32% { transform: scale(1); }
          40% { transform: scale(1.15); }
          48% { transform: scale(1); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .engage-consult-path, .engage-consult-circle-l, .engage-consult-circle-r {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
      <circle
        className="engage-consult-circle-l"
        cx="20" cy="48" r="6"
        stroke="#D4A843" strokeWidth="1.5"
        style={{
          transformOrigin: '20px 48px',
          animation: `engage-consult-pulse 4s ease-in-out ${playState} infinite`,
        }}
      />
      <circle
        className="engage-consult-circle-r"
        cx="76" cy="48" r="6"
        stroke="#D4A843" strokeWidth="1.5"
        style={{
          transformOrigin: '76px 48px',
          animation: `engage-consult-pulse 4s ease-in-out ${playState} infinite`,
        }}
      />
      <path
        className="engage-consult-path"
        d="M26 48 C40 32, 56 32, 70 48"
        stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round"
        strokeDasharray="80"
        strokeDashoffset="80"
        style={{
          animation: `engage-consult-draw 4s ease-in-out ${playState} infinite`,
        }}
      />
    </svg>
  );
}
