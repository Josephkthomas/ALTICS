import React from 'react';

export default function DeploymentSVG({ isActive }) {
  const playState = isActive ? 'running' : 'paused';

  const nodes = [
    { cx: 48, cy: 20, delay: '0s' },    // top
    { cx: 76, cy: 48, delay: '0.5s' },   // right
    { cx: 48, cy: 76, delay: '1.0s' },   // bottom
    { cx: 20, cy: 48, delay: '1.5s' },   // left
  ];

  return (
    <svg viewBox="0 0 96 96" width="96" height="96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes engage-deploy-node {
          0% { transform: scale(0); opacity: 0; }
          6% { transform: scale(1.15); opacity: 1; }
          10% { transform: scale(1); opacity: 1; }
          68% { transform: scale(1); opacity: 1; }
          78% { transform: scale(1); opacity: 0; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes engage-deploy-line {
          0%, 4% { stroke-dashoffset: 30; opacity: 0; }
          6% { opacity: 1; }
          14% { stroke-dashoffset: 0; opacity: 1; }
          68% { stroke-dashoffset: 0; opacity: 1; }
          78% { opacity: 0; }
          100% { stroke-dashoffset: 30; opacity: 0; }
        }
        @keyframes engage-deploy-pulse {
          0%, 44% { opacity: 1; }
          50% { opacity: 0.6; }
          56% { opacity: 1; }
          100% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .engage-deploy-node, .engage-deploy-line, .engage-deploy-group {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
            transform: scale(1) !important;
          }
        }
      `}</style>

      {/* Pulse wrapper for whole graph */}
      <g className="engage-deploy-group"
        style={{ animation: `engage-deploy-pulse 5s ease-in-out ${playState} infinite` }}>

        {/* Central node — always visible */}
        <circle cx="48" cy="48" r="8" stroke="#D4A843" strokeWidth="1.5" />

        {/* Outer nodes + connecting lines */}
        {nodes.map((n, i) => (
          <g key={i}>
            <line
              className="engage-deploy-line"
              x1="48" y1="48" x2={n.cx} y2={n.cy}
              stroke="#D4A843" strokeWidth="1.5"
              strokeDasharray="30" strokeDashoffset="30"
              style={{
                animation: `engage-deploy-line 5s ease-out ${playState} infinite`,
                animationDelay: n.delay,
              }}
            />
            <circle
              className="engage-deploy-node"
              cx={n.cx} cy={n.cy} r="5"
              stroke="#D4A843" strokeWidth="1.5"
              style={{
                transformOrigin: `${n.cx}px ${n.cy}px`,
                animation: `engage-deploy-node 5s cubic-bezier(0.34, 1.56, 0.64, 1) ${playState} infinite`,
                animationDelay: n.delay,
              }}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
