import React from 'react';

const PIDSCardSVG = () => {
  return (
    <svg viewBox="0 0 200 140" width="100%" preserveAspectRatio="xMidYMid meet">
      {/* Perimeter outline */}
      <rect x="20" y="20" width="160" height="100" rx="4" fill="none" stroke="rgba(26,22,18,0.15)" strokeWidth="1.5" />

      {/* Sensor dots along perimeter */}
      {[40, 70, 100, 130, 160].map((x, i) => (
        <circle key={`top-${i}`} cx={x} cy="20" r="2.5" fill="rgba(26,22,18,0.2)" />
      ))}
      {[40, 70, 100, 130, 160].map((x, i) => (
        <circle key={`bot-${i}`} cx={x} cy="120" r="2.5" fill="rgba(26,22,18,0.2)" />
      ))}

      {/* Active alert on one sensor */}
      <circle cx="130" cy="20" r="2.5" fill="#E8622A" />
      <circle cx="130" cy="20" r="6" fill="none" stroke="#E8622A" strokeWidth="1" opacity="0.5" />

      {/* Zone label */}
      <text x="100" y="74" textAnchor="middle" fill="rgba(26,22,18,0.3)" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px' }}>
        ZONE A
      </text>
    </svg>
  );
};

export default PIDSCardSVG;
