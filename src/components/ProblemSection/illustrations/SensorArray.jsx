import React from 'react';

export default function SensorArray() {
    return (
        <svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>
                {`
          .sensor-font { font-family: 'JetBrains Mono', monospace; }
        `}
            </style>

            {/* Header Label and Badge */}
            <text x="16" y="24" className="sensor-font" fontSize="8" fill="rgba(240,237,230,0.3)">SENSOR_ARRAY</text>

            <g transform="translate(260, 14)">
                <rect width="64" height="14" rx="2" fill="rgba(240,237,230,0.05)" stroke="rgba(240,237,230,0.1)" />
                <text x="32" y="10" className="sensor-font" fontSize="7" fill="rgba(240,237,230,0.5)" textAnchor="middle">4 OFFLINE</text>
            </g>

            {/* 2x2 Grid Layout starting at y=40 */}

            {/* Gauge 1 (Top-Left): TEMP_01 - Warning */}
            <g transform="translate(20, 40)">
                <rect width="145" height="65" rx="6" fill="rgba(232,98,42,0.02)" stroke="rgba(232,98,42,0.12)" />
                <text x="12" y="16" className="sensor-font" fontSize="7" fill="rgba(240,237,230,0.3)">TEMP_01</text>
                <text x="133" y="16" className="sensor-font" fontSize="7" fill="#E8622A" textAnchor="end">▲ WARN</text>

                <text x="12" y="44" className="sensor-font" fontSize="26" fill="#E8622A" fontWeight="500">47.8°</text>
                <text x="75" y="44" className="sensor-font" fontSize="9" fill="rgba(240,237,230,0.2)">/ 40° max</text>

                {/* Progress Bar */}
                <rect x="12" y="52" width="121" height="2" rx="1" fill="rgba(240,237,230,0.05)" />
                <rect x="12" y="52" width="105" height="2" rx="1" fill="#E8622A" opacity="0.6" />
            </g>

            {/* Gauge 2 (Top-Right): HUMID_03 - Normal */}
            <g transform="translate(175, 40)">
                <rect width="145" height="65" rx="6" fill="rgba(240,237,230,0.015)" stroke="rgba(240,237,230,0.05)" />
                <text x="12" y="16" className="sensor-font" fontSize="7" fill="rgba(240,237,230,0.3)">HUMID_03</text>
                <text x="133" y="16" className="sensor-font" fontSize="7" fill="rgba(240,237,230,0.15)" textAnchor="end">OK</text>

                <text x="12" y="44" className="sensor-font" fontSize="26" fill="rgba(240,237,230,0.45)" fontWeight="500">62%</text>
                <text x="60" y="44" className="sensor-font" fontSize="9" fill="rgba(240,237,230,0.2)">avg</text>

                {/* Progress Bar */}
                <rect x="12" y="52" width="121" height="2" rx="1" fill="rgba(240,237,230,0.05)" />
                <rect x="12" y="52" width="60" height="2" rx="1" fill="rgba(240,237,230,0.12)" />
            </g>

            {/* Gauge 3 (Bottom-Left): LEVEL_07 - Warning */}
            <g transform="translate(20, 115)">
                <rect width="145" height="65" rx="6" fill="rgba(232,98,42,0.02)" stroke="rgba(232,98,42,0.12)" />
                <text x="12" y="16" className="sensor-font" fontSize="7" fill="rgba(240,237,230,0.3)">LEVEL_07</text>
                <text x="133" y="16" className="sensor-font" fontSize="7" fill="#E8622A" textAnchor="end">▲ WARN</text>

                <text x="12" y="44" className="sensor-font" fontSize="26" fill="#E8622A" fontWeight="500">94%</text>
                <text x="60" y="44" className="sensor-font" fontSize="9" fill="rgba(240,237,230,0.2)">/ 80% max</text>

                {/* Progress Bar */}
                <rect x="12" y="52" width="121" height="2" rx="1" fill="rgba(240,237,230,0.05)" />
                <rect x="12" y="52" width="112" height="2" rx="1" fill="#E8622A" opacity="0.6" />
            </g>

            {/* Gauge 4 (Bottom-Right): MOTION_12 - Offline */}
            <g transform="translate(175, 115)">
                <rect width="145" height="65" rx="6" fill="rgba(240,237,230,0.008)" stroke="rgba(240,237,230,0.03)" />
                <text x="12" y="16" className="sensor-font" fontSize="7" fill="rgba(240,237,230,0.1)">MOTION_12</text>

                <text x="12" y="42" className="sensor-font" fontSize="18" fill="rgba(240,237,230,0.1)" fontWeight="500">OFFLINE</text>
                <text x="12" y="54" className="sensor-font" fontSize="7" fill="rgba(240,237,230,0.08)">Last seen: 14d ago</text>
            </g>

        </svg>
    );
}
