import React, { useEffect, useState, useRef } from 'react';

const OTDRTraceSVG = ({ triggered }) => {
  const [phase, setPhase] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced.current) { setPhase(4); return; }
  }, []);

  useEffect(() => {
    if (!triggered || reduced.current) return;
    const timers = [
      setTimeout(() => setPhase(1), 0),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [triggered]);

  const baselineLen = 440;
  const traceLen = 480;
  const markerLen = 40;

  return (
    <svg viewBox="0 0 480 160" width="100%" preserveAspectRatio="xMidYMid meet">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .narrative-01-line { stroke-dashoffset: 0 !important; transition: none !important; opacity: 1 !important; }
          .narrative-01-label { opacity: 1 !important; transition: none !important; }
        }
      `}</style>

      {/* Baseline */}
      <line
        className="narrative-01-line"
        x1="20" y1="100" x2="460" y2="100"
        stroke="rgba(26,22,18,0.2)" strokeWidth="2"
        strokeDasharray={baselineLen}
        strokeDashoffset={phase >= 1 ? 0 : baselineLen}
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />

      {/* Signal trace — waveform with fault drop at ~60% */}
      <path
        className="narrative-01-line"
        d="M20,80 C60,75 80,65 120,70 C160,75 180,60 200,65 C230,70 250,55 270,60 C280,62 285,85 290,100 C295,108 310,105 330,103 C360,100 400,98 460,100"
        fill="none"
        stroke="#E8622A" strokeWidth="2"
        strokeDasharray={traceLen}
        strokeDashoffset={phase >= 2 ? 0 : traceLen}
        style={{ transition: 'stroke-dashoffset 1.0s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />

      {/* Fault marker vertical line at ~60% (x≈290) */}
      <line
        className="narrative-01-line"
        x1="290" y1="45" x2="290" y2="125"
        stroke="#D4A843" strokeWidth="1.5"
        strokeDasharray={markerLen}
        strokeDashoffset={phase >= 3 ? 0 : markerLen}
        style={{ transition: 'stroke-dashoffset 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />

      {/* FAULT DETECTED label */}
      <text
        className="narrative-01-label"
        x="296" y="42"
        fill="#D4A843"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          fontWeight: 500,
          opacity: phase >= 3 ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        FAULT DETECTED
      </text>

      {/* Blinking cursor at trace end */}
      <rect
        x="458" y="96" width="2" height="8"
        fill="#D4A843"
        style={{
          opacity: phase >= 4 ? 1 : 0,
          animation: phase >= 4 ? 'blink-cursor 1s infinite' : 'none',
        }}
      />
    </svg>
  );
};

export default OTDRTraceSVG;
