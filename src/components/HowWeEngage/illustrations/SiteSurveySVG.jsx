import React from 'react';

export default function SiteSurveySVG({ isActive }) {
  const playState = isActive ? 'running' : 'paused';

  return (
    <svg viewBox="0 0 96 96" width="96" height="96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes engage-survey-pin {
          0% { stroke-dashoffset: 20; opacity: 0; }
          5% { opacity: 1; }
          15% { stroke-dashoffset: 0; opacity: 1; }
          68% { stroke-dashoffset: 0; opacity: 1; }
          80% { opacity: 0; }
          100% { opacity: 0; stroke-dashoffset: 20; }
        }
        @keyframes engage-survey-lines {
          0%, 28% { stroke-dashoffset: 100; opacity: 0; }
          30% { opacity: 1; }
          42% { stroke-dashoffset: 0; opacity: 1; }
          68% { stroke-dashoffset: 0; opacity: 1; }
          80% { opacity: 0; }
          100% { opacity: 0; stroke-dashoffset: 100; }
        }
        @media (prefers-reduced-motion: reduce) {
          .engage-survey-pin, .engage-survey-dash {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
      {/* Perimeter rectangle — always visible */}
      <rect x="18" y="28" width="60" height="40" rx="4"
        stroke="#D4A843" strokeWidth="1.5" />

      {/* Pin 1 — top left */}
      <g className="engage-survey-pin"
        strokeDasharray="20" strokeDashoffset="20"
        style={{ animation: `engage-survey-pin 4.5s ease-out ${playState} infinite` }}>
        <circle cx="28" cy="32" r="3" stroke="#D4A843" strokeWidth="1.5" />
        <line x1="28" y1="35" x2="28" y2="40" stroke="#D4A843" strokeWidth="1.5" />
      </g>

      {/* Pin 2 — top right */}
      <g className="engage-survey-pin"
        strokeDasharray="20" strokeDashoffset="20"
        style={{ animation: `engage-survey-pin 4.5s ease-out ${playState} infinite`, animationDelay: '0.5s' }}>
        <circle cx="68" cy="32" r="3" stroke="#D4A843" strokeWidth="1.5" />
        <line x1="68" y1="35" x2="68" y2="40" stroke="#D4A843" strokeWidth="1.5" />
      </g>

      {/* Pin 3 — bottom centre */}
      <g className="engage-survey-pin"
        strokeDasharray="20" strokeDashoffset="20"
        style={{ animation: `engage-survey-pin 4.5s ease-out ${playState} infinite`, animationDelay: '1.0s' }}>
        <circle cx="48" cy="60" r="3" stroke="#D4A843" strokeWidth="1.5" />
        <line x1="48" y1="63" x2="48" y2="68" stroke="#D4A843" strokeWidth="1.5" />
      </g>

      {/* Dashed connections between pins */}
      <path className="engage-survey-dash"
        d="M28 32 L68 32 L48 60 Z"
        stroke="#D4A843" strokeWidth="1" strokeDasharray="4 3"
        fill="none"
        style={{
          strokeDashoffset: 100,
          animation: `engage-survey-lines 4.5s ease-out ${playState} infinite`,
        }}
      />
    </svg>
  );
}
