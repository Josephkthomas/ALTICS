import React, { useEffect, useState, useRef } from 'react';

const PerimeterMapSVG = ({ triggered }) => {
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
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [triggered]);

  const perimeterPath = "M80,40 L400,40 L400,160 L80,160 Z";
  const perimLen = 960;

  return (
    <svg viewBox="0 0 480 200" width="100%" preserveAspectRatio="xMidYMid meet">
      <style>{`
        @keyframes narrative-02-pulse {
          0% { r: 8; opacity: 1; }
          100% { r: 28; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .narrative-02-line { stroke-dashoffset: 0 !important; transition: none !important; opacity: 1 !important; }
          .narrative-02-label { opacity: 1 !important; }
        }
      `}</style>

      {/* Perimeter rectangle */}
      <path
        className="narrative-02-line"
        d={perimeterPath}
        fill="none"
        stroke="rgba(26,22,18,0.3)" strokeWidth="2"
        strokeDasharray={perimLen}
        strokeDashoffset={phase >= 1 ? 0 : perimLen}
        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />

      {/* Tick marks along fence line */}
      {[120, 160, 200, 240, 280, 320, 360].map((x, i) => (
        <line
          key={`tick-top-${i}`}
          className="narrative-02-line"
          x1={x} y1="35" x2={x} y2="45"
          stroke="rgba(26,22,18,0.3)" strokeWidth="1.5"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transition: 'opacity 0.4s ease',
            transitionDelay: `${i * 40}ms`,
          }}
        />
      ))}
      {[120, 160, 200, 240, 280, 320, 360].map((x, i) => (
        <line
          key={`tick-bot-${i}`}
          className="narrative-02-line"
          x1={x} y1="155" x2={x} y2="165"
          stroke="rgba(26,22,18,0.3)" strokeWidth="1.5"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transition: 'opacity 0.4s ease',
            transitionDelay: `${i * 40}ms`,
          }}
        />
      ))}

      {/* Breach section — top-right segment lights up orange */}
      <line
        className="narrative-02-line"
        x1="320" y1="40" x2="400" y2="40"
        stroke={phase >= 3 ? '#E8622A' : 'transparent'}
        strokeWidth="3"
        style={{ transition: 'stroke 0.4s ease' }}
      />

      {/* Breach pulse ring */}
      {phase >= 3 && (
        <circle
          cx="360" cy="40"
          r="8"
          fill="none"
          stroke="#E8622A" strokeWidth="1.5"
          style={{
            transformOrigin: '360px 40px',
            animation: 'narrative-02-pulse 2s ease-out infinite',
          }}
        />
      )}

      {/* Directional arrow pointing inward */}
      <path
        className="narrative-02-label"
        d="M360,28 L356,20 L364,20 Z"
        fill="#E8622A"
        style={{ opacity: phase >= 4 ? 1 : 0, transition: 'opacity 0.3s ease' }}
      />

      {/* BREACH DETECTED label */}
      <text
        className="narrative-02-label"
        x="300" y="18"
        fill="#E8622A"
        textAnchor="middle"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          fontWeight: 500,
          opacity: phase >= 4 ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        BREACH DETECTED
      </text>
    </svg>
  );
};

export default PerimeterMapSVG;
