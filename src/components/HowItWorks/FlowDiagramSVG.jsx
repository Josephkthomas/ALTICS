import React, { useEffect, useState, useRef } from 'react';

const flowNodes = [
  { id: 'signal', label: 'Signal Captured', sub: 'Fiber / IoT sensor', cx: 120, cy: 80 },
  { id: 'transmit', label: 'Transmitted', sub: 'Network layer', cx: 340, cy: 80 },
  { id: 'analyse', label: 'Analysed', sub: 'Nova Context', cx: 560, cy: 80 },
  { id: 'alert', label: "You're Alerted", sub: 'Mobile / NOC', cx: 780, cy: 80 },
];

const flowNodesMobile = [
  { id: 'signal', label: 'Signal Captured', sub: 'Fiber / IoT sensor', cx: 150, cy: 60 },
  { id: 'transmit', label: 'Transmitted', sub: 'Network layer', cx: 150, cy: 180 },
  { id: 'analyse', label: 'Analysed', sub: 'Nova Context', cx: 150, cy: 300 },
  { id: 'alert', label: "You're Alerted", sub: 'Mobile / NOC', cx: 150, cy: 420 },
];

const iconPaths = [
  // Signal — 3 concentric arcs
  'M-6,4 A10,10 0 0,1 -6,-4 M-3,6 A14,14 0 0,1 -3,-6 M0,8 A18,18 0 0,1 0,-8',
  // Transmit — arrow between bars
  'M-8,-6 L-8,6 M8,-6 L8,6 M-4,0 L4,0 M2,-3 L5,0 L2,3',
  // Analyse — magnifying glass
  'M-4,-4 A6,6 0 1,0 4,4 M3,3 L7,7',
  // Alert — bell
  'M-5,2 A7,7 0 0,1 5,2 L6,5 L-6,5 Z M-1,5 L-1,7 A1,1 0 0,0 1,7 L1,5 M0,-6 L0,-4',
];

const FlowDiagramSVG = ({ triggered }) => {
  const [step, setStep] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced.current) { setStep(7); return; }
  }, []);

  useEffect(() => {
    if (!triggered || reduced.current) return;
    // Animation sequence: node1(400ms) → pause(200ms) → line1(300ms) → node2(400ms) → ...
    const delays = [
      0,     // Node 1 visible
      600,   // Line 1 drawn (400ms node + 200ms pause)
      1100,  // Node 2 visible (600 + 300ms line + 200ms pause)
      1700,  // Line 2 drawn
      2200,  // Node 3 visible
      2800,  // Line 3 drawn
      3300,  // Node 4 visible
    ];

    const timers = delays.map((d, i) =>
      setTimeout(() => setStep(i + 1), d)
    );
    return () => timers.forEach(clearTimeout);
  }, [triggered]);

  const lineLen = 180;

  return (
    <>
      {/* Desktop horizontal layout */}
      <svg
        className="hidden md:block"
        viewBox="0 0 900 200"
        width="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <style>{`
          @keyframes flow-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.12); }
            100% { transform: scale(1); }
          }
          @media (prefers-reduced-motion: reduce) {
            .flow-node, .flow-line { opacity: 1 !important; stroke-dashoffset: 0 !important; transition: none !important; animation: none !important; }
          }
        `}</style>

        {/* Connecting lines */}
        {[0, 1, 2].map((i) => {
          const x1 = flowNodes[i].cx + 40;
          const x2 = flowNodes[i + 1].cx - 40;
          const len = x2 - x1;
          const drawn = step >= (i * 2 + 2); // Lines at steps 2, 4, 6
          return (
            <line
              key={`line-${i}`}
              className="flow-line"
              x1={x1} y1={80} x2={x2} y2={80}
              stroke="#E8622A"
              strokeWidth="2"
              strokeDasharray={len}
              strokeDashoffset={drawn ? 0 : len}
              style={{ transition: drawn ? `stroke-dashoffset 300ms cubic-bezier(0.16, 1, 0.3, 1)` : 'none' }}
            />
          );
        })}

        {/* Nodes */}
        {flowNodes.map((n, i) => {
          const visible = step >= (i * 2 + 1); // Nodes at steps 1, 3, 5, 7
          return (
            <g
              key={n.id}
              className="flow-node"
              style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 400ms ease',
                transformOrigin: `${n.cx}px ${n.cy}px`,
                animation: visible ? 'flow-pulse 400ms ease 200ms' : 'none',
              }}
            >
              {/* Node circle */}
              <circle
                cx={n.cx} cy={n.cy} r="40"
                fill="#1C1B14"
                stroke="#E8622A"
                strokeWidth="2"
              />
              {/* Icon */}
              <g transform={`translate(${n.cx}, ${n.cy})`}>
                <path
                  d={iconPaths[i]}
                  fill="none"
                  stroke="#F0EDE6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              {/* Label */}
              <text
                x={n.cx} y={n.cy + 56}
                textAnchor="middle"
                fill="#D4A843"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 500 }}
              >
                {n.label}
              </text>
              {/* Sub-label */}
              <text
                x={n.cx} y={n.cy + 74}
                textAnchor="middle"
                fill="rgba(240,237,230,0.5)"
                style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '12px' }}
              >
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Mobile vertical layout */}
      <svg
        className="md:hidden"
        viewBox="0 0 300 480"
        width="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .flow-node, .flow-line { opacity: 1 !important; stroke-dashoffset: 0 !important; transition: none !important; animation: none !important; }
          }
        `}</style>

        {/* Vertical connecting lines */}
        {[0, 1, 2].map((i) => {
          const y1 = flowNodesMobile[i].cy + 40;
          const y2 = flowNodesMobile[i + 1].cy - 40;
          const len = y2 - y1;
          const drawn = step >= (i * 2 + 2);
          return (
            <line
              key={`mline-${i}`}
              className="flow-line"
              x1={150} y1={y1} x2={150} y2={y2}
              stroke="#E8622A"
              strokeWidth="2"
              strokeDasharray={len}
              strokeDashoffset={drawn ? 0 : len}
              style={{ transition: drawn ? `stroke-dashoffset 300ms cubic-bezier(0.16, 1, 0.3, 1)` : 'none' }}
            />
          );
        })}

        {/* Mobile nodes */}
        {flowNodesMobile.map((n, i) => {
          const visible = step >= (i * 2 + 1);
          return (
            <g
              key={`m-${n.id}`}
              className="flow-node"
              style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 400ms ease',
              }}
            >
              <circle cx={n.cx} cy={n.cy} r="30" fill="#1C1B14" stroke="#E8622A" strokeWidth="2" />
              <g transform={`translate(${n.cx}, ${n.cy})`}>
                <path d={iconPaths[i]} fill="none" stroke="#F0EDE6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <text x={n.cx + 50} y={n.cy - 4} fill="#D4A843" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 500 }}>
                {n.label}
              </text>
              <text x={n.cx + 50} y={n.cy + 12} fill="rgba(240,237,230,0.5)" style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '11px' }}>
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </>
  );
};

export default FlowDiagramSVG;
