import React from 'react';

export default function MonitoringSVG({ isActive }) {
  const playState = isActive ? 'running' : 'paused';

  return (
    <svg viewBox="0 0 96 96" width="96" height="96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes engage-monitor-draw {
          0% { stroke-dashoffset: 140; }
          62% { stroke-dashoffset: 0; }
          75% { stroke-dashoffset: 0; opacity: 1; }
          90% { opacity: 0; }
          100% { stroke-dashoffset: 140; opacity: 0; }
        }
        @keyframes engage-monitor-alert {
          0%, 32% { transform: scale(0); opacity: 0; }
          38% { transform: scale(1.2); opacity: 1; }
          42% { transform: scale(1); opacity: 1; }
          52% { transform: scale(1); opacity: 1; }
          58% { transform: scale(0); opacity: 0; }
          100% { transform: scale(0); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .engage-monitor-path, .engage-monitor-alert {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
            transform: scale(1) !important;
          }
        }
      `}</style>

      {/* Heartbeat pulse line */}
      <path
        className="engage-monitor-path"
        d="M8 48 L42 48 L48 48 L54 24 L60 56 L64 48 L88 48"
        stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="140" strokeDashoffset="140"
        style={{
          animation: `engage-monitor-draw 4s ease-in-out ${playState} infinite`,
        }}
      />

      {/* Alert circle at spike peak */}
      <circle
        className="engage-monitor-alert"
        cx="54" cy="24" r="4"
        stroke="#D4A843" strokeWidth="1.5"
        style={{
          transformOrigin: '54px 24px',
          animation: `engage-monitor-alert 4s ease-out ${playState} infinite`,
        }}
      />
    </svg>
  );
}
