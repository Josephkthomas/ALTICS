import React from "react";

export default function RFTMIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ backgroundColor: "transparent" }}
    >
      <style>
        {`
          @media (prefers-reduced-motion: no-preference) {
            .rftm-trace-left {
              stroke-dasharray: 600;
              stroke-dashoffset: 600;
              animation: rftm-draw 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }
            .rftm-spike, .rftm-trace-right {
              opacity: 0;
              animation: rftm-fade-spike 2s infinite;
            }
            .rftm-label {
              opacity: 0;
              animation: rftm-fade-label 2s infinite;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .rftm-trace-left {
              stroke-dasharray: none;
              stroke-dashoffset: 0;
            }
            .rftm-spike, .rftm-trace-right, .rftm-label {
              opacity: 1;
            }
          }

          @keyframes rftm-draw {
            0% { stroke-dashoffset: 600; }
            100% { stroke-dashoffset: 0; }
          }
          
          @keyframes rftm-fade-spike {
            0%, 44.9% { opacity: 0; }
            45%, 80% { opacity: 1; }
            100% { opacity: 0; }
          }

          @keyframes rftm-fade-label {
            0%, 49.9% { opacity: 0; }
            50%, 80% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>

      {/* Static Geometry */}
      <g id="rftm-static">
        {/* Horizontal reference lines */}
        <line x1="0" y1="70" x2="200" y2="70" stroke="rgba(26,22,18,0.05)" strokeWidth="1" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(26,22,18,0.08)" strokeWidth="1" />
        <line x1="0" y1="130" x2="200" y2="130" stroke="rgba(26,22,18,0.05)" strokeWidth="1" />

        {/* Vertical tick marks */}
        <line x1="60" y1="96" x2="60" y2="104" stroke="rgba(26,22,18,0.15)" strokeWidth="1" />
        <line x1="100" y1="96" x2="100" y2="104" stroke="rgba(26,22,18,0.15)" strokeWidth="1" />
        <line x1="140" y1="96" x2="140" y2="104" stroke="rgba(26,22,18,0.15)" strokeWidth="1" />

        {/* Endpoint dots */}
        <circle cx="20" cy="100" r="2.5" fill="rgba(26,22,18,0.2)" />
        <circle cx="180" cy="100" r="2.5" fill="rgba(26,22,18,0.2)" />
      </g>

      {/* Left trace (drawn in) */}
      <path
        id="rftm-path-left"
        className="rftm-trace-left"
        d="M20,100 L92,100"
        stroke="rgba(26,22,18,0.18)"
        strokeWidth="1.2"
        fill="none"
      />

      {/* Fault spike & Right trace */}
      <g id="rftm-fault-group">
        <path
          className="rftm-trace-right"
          d="M108,100 L180,100"
          stroke="rgba(26,22,18,0.18)"
          strokeWidth="1.2"
          fill="none"
        />

        <g className="rftm-spike">
          {/* Spike Glow */}
          <path
            d="M92,100 L100,68 L108,100"
            stroke="#E8622A"
            strokeWidth="5"
            strokeLinejoin="miter"
            strokeLinecap="round"
            opacity="0.15"
            fill="none"
          />
          {/* Main Spike Line */}
          <path
            d="M92,100 L100,68 L108,100"
            stroke="#E8622A"
            strokeWidth="1.5"
            strokeLinejoin="miter"
            strokeLinecap="round"
            fill="none"
          />
          {/* Orange dot at peak */}
          <circle cx="100" cy="68" r="3" fill="#E8622A" />
        </g>
      </g>

      {/* FAULT Label */}
      <g id="rftm-label-group" className="rftm-label">
        <rect x="81" y="50" width="38" height="13" rx="3" fill="rgba(232,98,42,0.1)" stroke="rgba(232,98,42,0.3)" strokeWidth="0.8" />
        <text
          x="100"
          y="60"
          fill="#E8622A"
          fontSize="7"
          fontFamily="'JetBrains Mono', monospace"
          textAnchor="middle"
        >
          FAULT
        </text>
      </g>
    </svg>
  );
}
