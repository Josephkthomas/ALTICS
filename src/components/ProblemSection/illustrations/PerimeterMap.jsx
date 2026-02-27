import React from 'react';

export default function PerimeterMap() {
    return (
        <svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>
                {`
          .map-font { font-family: 'JetBrains Mono', monospace; }
        `}
            </style>

            {/* Header Label and Badge */}
            <text x="16" y="24" className="map-font" fontSize="8" fill="rgba(240,237,230,0.3)">PERIMETER_MON</text>

            <g transform="translate(254, 14)">
                <rect width="70" height="14" rx="2" fill="rgba(232,98,42,0.1)" stroke="rgba(232,98,42,0.2)" />
                <text x="35" y="10" className="map-font" fontSize="7" fill="#E8622A" textAnchor="middle">2 BREACHES</text>
            </g>

            {/* Perimeter Boundary */}
            <g transform="translate(40, 45)">
                {/* Main boundary box */}
                <rect width="260" height="110" rx="4" fill="none" stroke="rgba(240,237,230,0.06)" strokeWidth="1" />

                {/* Vertical Zone Dividers */}
                <line x1="86" y1="0" x2="86" y2="110" stroke="rgba(240,237,230,0.03)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="173" y1="0" x2="173" y2="110" stroke="rgba(240,237,230,0.03)" strokeWidth="1" strokeDasharray="4 4" />

                {/* Zone Labels */}
                <text x="43" y="20" className="map-font" fontSize="8" fill="rgba(240,237,230,0.08)" textAnchor="middle">ZONE_A</text>
                <text x="130" y="20" className="map-font" fontSize="8" fill="rgba(240,237,230,0.08)" textAnchor="middle">ZONE_B</text>
                <text x="216" y="20" className="map-font" fontSize="8" fill="rgba(240,237,230,0.08)" textAnchor="middle">ZONE_C</text>

                {/* Regular Sensor Nodes */}
                {/* Top edge */}
                <circle cx="43" cy="0" r="2" fill="rgba(240,237,230,0.12)" />
                <circle cx="130" cy="0" r="2" fill="rgba(240,237,230,0.12)" />
                <circle cx="216" cy="0" r="2" fill="rgba(240,237,230,0.12)" />
                {/* Bottom edge */}
                <circle cx="43" cy="110" r="2" fill="rgba(240,237,230,0.12)" />
                <circle cx="130" cy="110" r="2" fill="rgba(240,237,230,0.12)" />
                {/* Left edge */}
                <circle cx="0" cy="55" r="2" fill="rgba(240,237,230,0.12)" />
                {/* Right edge */}
                <circle cx="260" cy="55" r="2" fill="rgba(240,237,230,0.12)" />

                {/* Breach 1: North perimeter (Zone A/B boundary roughly) */}
                <g transform="translate(86, 0)">
                    <circle r="20" fill="none" stroke="#E8622A" strokeWidth="1" opacity="0.1" />
                    <circle r="10" fill="none" stroke="#E8622A" strokeWidth="1" opacity="0.25" />
                    <circle r="4" fill="#E8622A" />
                </g>

                {/* Breach 2: South perimeter (Zone C area) */}
                <g transform="translate(216, 110)">
                    <circle r="20" fill="none" stroke="#E8622A" strokeWidth="1" opacity="0.1" />
                    <circle r="10" fill="none" stroke="#E8622A" strokeWidth="1" opacity="0.25" />
                    <circle r="4" fill="#E8622A" />
                </g>
            </g>

            {/* Footer Status Line */}
            <line x1="16" y1="175" x2="324" y2="175" stroke="rgba(240,237,230,0.04)" strokeWidth="1" />
            <text x="16" y="190" className="map-font" fontSize="8" fill="rgba(240,237,230,0.2)">STATUS: BREACH_DETECTED</text>

            <g transform="translate(274, 181)">
                <rect width="50" height="12" rx="6" fill="rgba(232,98,42,0.1)" />
                <text x="25" y="9" className="map-font" fontSize="7" fill="#E8622A" textAnchor="middle">ACTIVE</text>
            </g>
        </svg>
    );
}
