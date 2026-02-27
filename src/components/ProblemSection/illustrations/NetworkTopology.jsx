import React from 'react';

export default function NetworkTopology() {
    return (
        <svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <style>
                {`
          .topo-font { font-family: 'JetBrains Mono', monospace; }
          .syne-font { font-family: 'Syne', sans-serif; font-weight: 700; }
        `}
            </style>

            {/* Header Label and Badge */}
            <text x="16" y="24" className="topo-font" fontSize="8" fill="rgba(240,237,230,0.3)">TOPOLOGY_VIEW</text>

            <g transform="translate(254, 14)">
                <rect width="70" height="14" rx="2" fill="rgba(240,237,230,0.05)" stroke="rgba(240,237,230,0.1)" />
                <text x="35" y="10" className="topo-font" fontSize="7" fill="rgba(240,237,230,0.5)" textAnchor="middle">147 ALARMS</text>
            </g>


            {/* Topology Tree - Centralized layout */}
            <g transform="translate(170, 0)">

                {/* Connection Lines */}
                {/* Core to Distribution */}
                <line x1="0" y1="45" x2="-80" y2="85" stroke="rgba(240,237,230,0.06)" strokeWidth="1" />
                <line x1="0" y1="45" x2="0" y2="85" stroke="rgba(240,237,230,0.06)" strokeWidth="1" />
                {/* Fault branch line */}
                <line x1="0" y1="45" x2="80" y2="85" stroke="rgba(232,98,42,0.2)" strokeWidth="1" strokeDasharray="3 2" />

                {/* Distribution to Edge */}
                {/* Left dist branch */}
                <line x1="-80" y1="85" x2="-110" y2="135" stroke="rgba(240,237,230,0.06)" strokeWidth="1" />
                <line x1="-80" y1="85" x2="-50" y2="135" stroke="rgba(240,237,230,0.06)" strokeWidth="1" />

                {/* Center dist branch */}
                <line x1="0" y1="85" x2="-20" y2="135" stroke="rgba(240,237,230,0.06)" strokeWidth="1" />
                <line x1="0" y1="85" x2="20" y2="135" stroke="rgba(240,237,230,0.06)" strokeWidth="1" />

                {/* Right dist branch (Fault) */}
                <line x1="80" y1="85" x2="50" y2="135" stroke="rgba(240,237,230,0.06)" strokeWidth="1" />
                {/* The truly broken link to edge */}
                <line x1="80" y1="85" x2="110" y2="135" stroke="rgba(232,98,42,0.2)" strokeWidth="1" strokeDasharray="3 2" />


                {/* Nodes */}
                {/* Core Node */}
                <circle cx="0" cy="45" r="9" fill="rgba(240,237,230,0.04)" stroke="rgba(240,237,230,0.1)" />
                <text x="14" y="47" className="topo-font" fontSize="6" fill="rgba(240,237,230,0.15)">agg-cr-01</text>

                {/* Distribution Nodes */}
                <circle cx="-80" cy="85" r="7" fill="rgba(240,237,230,0.03)" stroke="rgba(240,237,230,0.08)" />
                <circle cx="0" cy="85" r="7" fill="rgba(240,237,230,0.03)" stroke="rgba(240,237,230,0.08)" />

                {/* Fault Dist Node */}
                <g transform="translate(80, 85)">
                    <circle cx="0" cy="0" r="16" fill="none" stroke="#E8622A" opacity="0.12" />
                    <circle cx="0" cy="0" r="7" fill="rgba(232,98,42,0.08)" stroke="#E8622A" strokeOpacity="0.6" />
                    <text x="0" y="-12" className="syne-font" fontSize="12" fill="#E8622A" textAnchor="middle">?</text>
                    <text x="14" y="2" className="topo-font" fontSize="6" fill="#E8622A">dist-sw-0k</text>
                </g>

                {/* Edge Nodes */}
                <circle cx="-110" cy="135" r="4.5" fill="rgba(240,237,230,0.02)" stroke="rgba(240,237,230,0.06)" />
                <circle cx="-50" cy="135" r="4.5" fill="rgba(240,237,230,0.02)" stroke="rgba(240,237,230,0.06)" />

                <circle cx="-20" cy="135" r="4.5" fill="rgba(240,237,230,0.02)" stroke="rgba(240,237,230,0.06)" />
                <circle cx="20" cy="135" r="4.5" fill="rgba(240,237,230,0.02)" stroke="rgba(240,237,230,0.06)" />

                <circle cx="50" cy="135" r="4.5" fill="rgba(240,237,230,0.02)" stroke="rgba(240,237,230,0.06)" />

                {/* Fault Edge Node */}
                <circle cx="110" cy="135" r="4.5" fill="rgba(232,98,42,0.06)" stroke="rgba(232,98,42,0.25)" />
                <text x="117" y="137" className="topo-font" fontSize="6" fill="#E8622A" opacity="0.8">edge-rt-72</text>

            </g>

            {/* Footer Status Line */}
            <line x1="16" y1="175" x2="324" y2="175" stroke="rgba(240,237,230,0.04)" strokeWidth="1" />
            <text x="16" y="190" className="topo-font" fontSize="8" fill="rgba(240,237,230,0.15)">ROOT_CAUSE: UNKNOWN</text>
            <text x="324" y="190" className="topo-font" fontSize="8" fill="rgba(240,237,230,0.15)" textAnchor="end">MTTR: 4.2hrs</text>

        </svg>
    );
}
