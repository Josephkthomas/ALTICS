import React from 'react';

export default function OTDRTrace() {
    return (
        <svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>
                {`
          .otdr-font { font-family: 'JetBrains Mono', monospace; }
        `}
            </style>

            {/* Background (Optional, though PRD says card bg is #1C1B14, 
          the visual frame is rgba(240,237,230,0.02) handled by the parent ProblemCard container) */}

            {/* Grid Lines */}
            <g stroke="rgba(240,237,230,0.035)" strokeWidth="0.5">
                {/* Horizontal */}
                <line x1="40" y1="40" x2="320" y2="40" />
                <line x1="40" y1="80" x2="320" y2="80" />
                <line x1="40" y1="120" x2="320" y2="120" />
                <line x1="40" y1="160" x2="320" y2="160" />

                {/* Vertical */}
                <line x1="40" y1="20" x2="40" y2="160" />
                <line x1="110" y1="20" x2="110" y2="160" />
                <line x1="180" y1="20" x2="180" y2="160" />
                <line x1="250" y1="20" x2="250" y2="160" />
                <line x1="320" y1="20" x2="320" y2="160" />
            </g>

            {/* Threshold Reference Line (-8dB) */}
            <line
                x1="40" y1="130"
                x2="320" y2="130"
                stroke="#E8622A"
                strokeWidth="0.5"
                strokeDasharray="4 3"
                opacity="0.18"
            />

            {/* Axis Labels */}
            <g className="otdr-font" fontSize="7" fill="rgba(240,237,230,0.15)">
                <text x="32" y="42" textAnchor="end">0dB</text>
                <text x="32" y="82" textAnchor="end">-5dB</text>
                <text x="32" y="122" textAnchor="end">-10dB</text>

                <text x="110" y="172" textAnchor="middle">12.4km</text>
                <text x="250" y="172" textAnchor="middle">34.0km</text>
                <text x="320" y="172" textAnchor="end">48.2km</text>
            </g>

            {/* primary trace line path */}
            <g>
                {/* Glow */}
                <path
                    d="M40,40 L90,48 L110,65 L115,55 L230,78 L250,140 L260,85 L320,95"
                    stroke="#E8622A"
                    strokeWidth="6"
                    strokeLinejoin="round"
                    fill="none"
                    opacity="0.06"
                    filter="blur(4px)"
                />
                {/* Main Line */}
                <path
                    d="M40,40 L90,48 L110,65 L115,55 L230,78 L250,140 L260,85 L320,95"
                    stroke="#E8622A"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    fill="none"
                />
            </g>

            {/* Fault Events */}
            <g>
                {/* Minor Fault at 110, 65 */}
                <circle cx="110" cy="65" r="10" fill="none" stroke="#E8622A" opacity="0.2" strokeWidth="1" />
                <circle cx="110" cy="65" r="4" fill="#E8622A" />

                <g transform="translate(100, 30)">
                    <rect x="-15" y="0" width="30" height="12" rx="2" fill="rgba(28,27,20,0.9)" stroke="rgba(240,237,230,0.08)" />
                    <text x="0" y="9" className="otdr-font" fontSize="7" fill="rgba(240,237,230,0.3)" textAnchor="middle">-0.3dB</text>
                    <line x1="10" y1="12" x2="10" y2="30" stroke="rgba(240,237,230,0.08)" strokeDasharray="2 2" />
                </g>

                {/* Major Fault at 250, 140 */}
                <circle cx="250" cy="140" r="14" fill="none" stroke="#E8622A" opacity="0.2" strokeWidth="1" />
                <circle cx="250" cy="140" r="5" fill="#E8622A" />

                <g transform="translate(250, 45)">
                    <rect x="-35" y="0" width="70" height="14" rx="2" fill="rgba(232,98,42,0.1)" stroke="rgba(232,98,42,0.25)" />
                    <text x="0" y="10" className="otdr-font" fontSize="7" fill="#E8622A" textAnchor="middle">FAULT -2.1dB</text>
                    <line x1="0" y1="14" x2="0" y2="90" stroke="#E8622A" strokeDasharray="2 2" opacity="0.25" />
                </g>
            </g>

            {/* Label Pill Overlay */}
            <g transform="translate(16, 16)">
                <rect width="60" height="14" rx="4" fill="rgba(232,98,42,0.08)" />
                <text x="30" y="10" className="otdr-font" fontSize="7" fill="#E8622A" textAnchor="middle">OTDR SCAN 04</text>
            </g>

            {/* Status Bar */}
            <rect x="16" y="184" width="308" height="2" rx="1" fill="rgba(240,237,230,0.03)" />
            <rect x="16" y="184" width="220" height="2" rx="1" fill="#E8622A" opacity="0.2" />
        </svg>
    );
}
