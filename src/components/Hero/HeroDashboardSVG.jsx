import React, { useEffect, useState, useRef } from 'react';

const nodes = [
  { id: 'core', cx: 240, cy: 160, r: 10, label: 'CORE-01', isCenter: true },
  { id: 'p2p', cx: 80, cy: 80, r: 8, label: 'P2P-A4' },
  { id: 'pids', cx: 400, cy: 80, r: 8, label: 'PIDS-N' },
  { id: 'iot', cx: 80, cy: 240, r: 8, label: 'IOT-12', hasAlert: true },
  { id: 'noc', cx: 400, cy: 240, r: 8, label: 'NOC-3' },
  { id: 'wan', cx: 360, cy: 160, r: 8, label: 'WAN-07' },
];

const lines = nodes.filter(n => !n.isCenter).map(n => ({
  id: `line-${n.id}`,
  x1: 240, y1: 160,
  x2: n.cx, y2: n.cy,
}));

function getLineLength(l) {
  return Math.sqrt((l.x2 - l.x1) ** 2 + (l.y2 - l.y1) ** 2);
}

const HeroDashboardSVG = () => {
  const [started, setStarted] = useState(false);
  const [linesDrawn, setLinesDrawn] = useState(0);
  const [nodesVisible, setNodesVisible] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion.current) {
      setStarted(true);
      setLinesDrawn(lines.length);
      setNodesVisible(nodes.length);
      return;
    }

    const timer = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started || reducedMotion.current) return;

    // Draw lines sequentially with 150ms stagger
    lines.forEach((_, i) => {
      setTimeout(() => setLinesDrawn(i + 1), i * 150);
    });

    // After all lines drawn, fade in nodes
    const totalLineTime = lines.length * 150 + 400;
    nodes.forEach((_, i) => {
      setTimeout(() => setNodesVisible(i + 1), totalLineTime + i * 80);
    });
  }, [started]);

  return (
    <svg
      viewBox="0 0 480 320"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block' }}
    >
      <style>{`
        @keyframes hero-dash-alert-pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-dash-line, .hero-dash-node {
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Connecting lines */}
      {lines.map((l, i) => {
        const len = getLineLength(l);
        const drawn = i < linesDrawn;
        return (
          <line
            key={l.id}
            className="hero-dash-line"
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(240, 237, 230, 0.2)"
            strokeWidth="1.5"
            strokeDasharray={len}
            strokeDashoffset={drawn ? 0 : len}
            style={{ transition: drawn ? `stroke-dashoffset 400ms cubic-bezier(0.16, 1, 0.3, 1)` : 'none' }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={n.id} className="hero-dash-node" style={{
          opacity: nodesVisible > i ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}>
          <circle
            cx={n.cx} cy={n.cy} r={n.r}
            fill={n.isCenter ? '#E8622A' : 'rgba(240, 237, 230, 0.4)'}
          />
          {n.hasAlert && (
            <circle
              cx={n.cx} cy={n.cy} r={n.r}
              fill="none"
              stroke="#D4A843"
              strokeWidth="2"
              style={{
                transformOrigin: `${n.cx}px ${n.cy}px`,
                animation: nodesVisible > i ? 'hero-dash-alert-pulse 2.4s ease-out infinite' : 'none',
              }}
            />
          )}
          <text
            x={n.cx}
            y={n.cy + n.r + 16}
            textAnchor="middle"
            fill="rgba(240, 237, 230, 0.6)"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 500 }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default HeroDashboardSVG;
