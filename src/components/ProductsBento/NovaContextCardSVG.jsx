import React from 'react';

const NovaContextCardSVG = () => {
  const nodes = [
    { cx: 60, cy: 60 },
    { cx: 140, cy: 40 },
    { cx: 220, cy: 55 },
    { cx: 300, cy: 45 },
    { cx: 380, cy: 60 },
    { cx: 100, cy: 100 },
    { cx: 180, cy: 90 },
    { cx: 260, cy: 95 },
    { cx: 340, cy: 100 },
  ];

  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8], [8, 4],
    [1, 6], [2, 7], [3, 8],
  ];

  return (
    <svg viewBox="0 0 440 140" width="100%" preserveAspectRatio="xMidYMid meet">
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(26,22,18,0.1)" strokeWidth="1"
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r="5" fill="rgba(26,22,18,0.12)" />
      ))}

      {/* Highlight central node */}
      <circle cx="220" cy="55" r="7" fill="#E8622A" opacity="0.8" />
      <circle cx="220" cy="55" r="12" fill="none" stroke="#E8622A" strokeWidth="1" opacity="0.3" />

      {/* Status label */}
      <text x="220" y="130" textAnchor="middle" fill="rgba(26,22,18,0.3)" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px' }}>
        TOPOLOGY MAP — LIVE
      </text>
    </svg>
  );
};

export default NovaContextCardSVG;
