import React from 'react';

const IoTCardSVG = () => {
  return (
    <svg viewBox="0 0 200 140" width="100%" preserveAspectRatio="xMidYMid meet">
      {/* Grid lines */}
      <line x1="20" y1="110" x2="180" y2="110" stroke="rgba(26,22,18,0.08)" strokeWidth="1" />
      <line x1="20" y1="80" x2="180" y2="80" stroke="rgba(26,22,18,0.05)" strokeWidth="1" />
      <line x1="20" y1="50" x2="180" y2="50" stroke="rgba(26,22,18,0.05)" strokeWidth="1" />

      {/* Sensor bars */}
      {[
        { x: 35, h: 45, label: 'TEMP' },
        { x: 65, h: 30, label: 'HUM' },
        { x: 95, h: 55, label: 'GAS' },
        { x: 125, h: 20, label: 'H2O' },
        { x: 155, h: 40, label: 'PWR' },
      ].map((bar) => (
        <g key={bar.label}>
          <rect
            x={bar.x - 8} y={110 - bar.h} width="16" height={bar.h}
            rx="2"
            fill="rgba(26,22,18,0.08)"
          />
          <rect
            x={bar.x - 8} y={110 - bar.h} width="16" height={bar.h}
            rx="2"
            fill={bar.label === 'GAS' ? 'rgba(232,98,42,0.2)' : 'rgba(26,22,18,0.06)'}
            stroke={bar.label === 'GAS' ? '#E8622A' : 'transparent'}
            strokeWidth="1"
          />
          <text x={bar.x} y="124" textAnchor="middle" fill="rgba(26,22,18,0.4)" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px' }}>
            {bar.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default IoTCardSVG;
