import React from 'react';

const RFTMCardSVG = () => {
  return (
    <svg viewBox="0 0 280 200" width="100%" preserveAspectRatio="xMidYMid meet">
      {/* OTDR trace lines */}
      <line x1="20" y1="160" x2="260" y2="160" stroke="rgba(26,22,18,0.1)" strokeWidth="1" />
      <line x1="20" y1="120" x2="260" y2="120" stroke="rgba(26,22,18,0.05)" strokeWidth="1" />
      <line x1="20" y1="80" x2="260" y2="80" stroke="rgba(26,22,18,0.05)" strokeWidth="1" />

      {/* Signal trace */}
      <path
        d="M20,140 C50,135 70,100 100,105 C130,110 150,80 170,85 C190,90 200,130 220,135 C240,140 260,145 260,145"
        fill="none"
        stroke="#E8622A"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Data points */}
      <circle cx="100" cy="105" r="3" fill="#E8622A" />
      <circle cx="170" cy="85" r="3" fill="#D4A843" />
      <circle cx="220" cy="135" r="3" fill="#E8622A" />

      {/* Fault marker */}
      <line x1="170" y1="75" x2="170" y2="165" stroke="#D4A843" strokeWidth="1" strokeDasharray="4 2" />
      <text x="176" y="72" fill="#D4A843" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 500 }}>
        -0.18dB
      </text>
    </svg>
  );
};

export default RFTMCardSVG;
