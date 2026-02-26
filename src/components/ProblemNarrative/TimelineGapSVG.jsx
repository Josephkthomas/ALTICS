import React, { useEffect, useState, useRef } from 'react';

const markers = [
  { x: 72, label: 'FAULT OCCURS' },
  { x: 168, label: 'DETECTED' },
  { x: 264, label: 'ALERT SENT' },
  { x: 432, label: 'TEAM RESPONDS' },
];

const TimelineGapSVG = ({ triggered }) => {
  const [phase, setPhase] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced.current) { setPhase(3); return; }
  }, []);

  useEffect(() => {
    if (!triggered || reduced.current) return;
    const timers = [
      setTimeout(() => setPhase(1), 0),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [triggered]);

  const baselineLen = 440;

  return (
    <svg viewBox="0 0 480 120" width="100%" preserveAspectRatio="xMidYMid meet">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .narrative-03-line { stroke-dashoffset: 0 !important; transition: none !important; opacity: 1 !important; }
          .narrative-03-el { opacity: 1 !important; transition: none !important; }
        }
      `}</style>

      {/* Baseline */}
      <line
        className="narrative-03-line"
        x1="20" y1="60" x2="460" y2="60"
        stroke="rgba(26,22,18,0.2)" strokeWidth="2"
        strokeDasharray={baselineLen}
        strokeDashoffset={phase >= 1 ? 0 : baselineLen}
        style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />

      {/* Markers */}
      {markers.map((m, i) => (
        <g key={m.label}>
          <line
            className="narrative-03-el"
            x1={m.x} y1="54" x2={m.x} y2="66"
            stroke="rgba(26,22,18,0.4)" strokeWidth="2"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transition: 'opacity 0.3s ease',
              transitionDelay: `${i * 200}ms`,
            }}
          />
          <text
            className="narrative-03-el"
            x={m.x} y="82"
            textAnchor="middle"
            fill="rgba(26,22,18,0.5)"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 500,
              opacity: phase >= 2 ? 1 : 0,
              transition: 'opacity 0.3s ease',
              transitionDelay: `${i * 200}ms`,
            }}
          >
            {m.label}
          </text>
        </g>
      ))}

      {/* Response gap rectangle (between ALERT SENT and TEAM RESPONDS) */}
      <rect
        className="narrative-03-el"
        x="264" y="50" width="168" height="20"
        rx="4"
        fill="rgba(232,98,42,0.15)"
        stroke="#E8622A" strokeWidth="1"
        style={{
          opacity: phase >= 3 ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* RESPONSE GAP label */}
      <text
        className="narrative-03-el"
        x="348" y="44"
        textAnchor="middle"
        fill="#E8622A"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          fontWeight: 500,
          opacity: phase >= 3 ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        RESPONSE GAP
      </text>

      {/* ~47 MIN label below */}
      <text
        className="narrative-03-el"
        x="348" y="96"
        textAnchor="middle"
        fill="#D4A843"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '14px',
          fontWeight: 500,
          opacity: phase >= 3 ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        ~47 MIN
      </text>
    </svg>
  );
};

export default TimelineGapSVG;
