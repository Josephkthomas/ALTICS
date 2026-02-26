import React from "react";

export default function NovaIllustration() {
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
            .nova-sweep-group {
              transform-origin: 100px 100px;
              animation: nova-rotate 8s linear infinite;
            }
            .nova-node {
              animation: nova-node-in 400ms cubic-bezier(0.16,1,0.3,1) both;
              transform-box: fill-box;
              transform-origin: center;
            }
            .nova-edge {
              stroke-dasharray: 200;
              stroke-dashoffset: 200;
              animation: nova-edge-in 600ms cubic-bezier(0.16,1,0.3,1) both;
            }
            
            /* Staggering Nodes */
            .nova-n0 { animation-delay: 0ms; }
            .nova-n1 { animation-delay: 100ms; }
            .nova-n2 { animation-delay: 200ms; }
            .nova-n3 { animation-delay: 300ms; }
            .nova-n4 { animation-delay: 400ms; }
            .nova-n5 { animation-delay: 500ms; }
            
            /* Staggering Edges */
            .nova-e0 { animation-delay: 200ms; }
            .nova-e1 { animation-delay: 350ms; }
            .nova-e2 { animation-delay: 500ms; }
            .nova-e3 { animation-delay: 650ms; }
            .nova-e4 { animation-delay: 800ms; }
          }
          
          @media (prefers-reduced-motion: reduce) {
            .nova-sweep-group {
              transform-origin: 100px 100px;
            }
            .nova-node {
              opacity: 1;
              transform: scale(1);
            }
            .nova-edge {
              stroke-dasharray: none;
              stroke-dashoffset: 0;
            }
          }

          @keyframes nova-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes nova-node-in {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes nova-edge-in {
            from { stroke-dashoffset: 200; }
            to { stroke-dashoffset: 0; }
          }
        `}
            </style>

            <defs>
                <clipPath id="nova-clip">
                    <circle cx="100" cy="100" r="72" />
                </clipPath>

                <linearGradient id="nova-sweep-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E8622A" stopOpacity="0" />
                    <stop offset="100%" stopColor="#E8622A" stopOpacity="0.25" />
                </linearGradient>
            </defs>

            {/* Static Guide Circles */}
            <g id="nova-guides" fill="none">
                <circle cx="100" cy="100" r="72" stroke="rgba(26,22,18,0.1)" strokeWidth="1" />
                <circle cx="100" cy="100" r="48" stroke="rgba(26,22,18,0.06)" strokeWidth="1" />
                <circle cx="100" cy="100" r="24" stroke="rgba(26,22,18,0.06)" strokeWidth="1" />
            </g>

            {/* Radar Sweep */}
            <g id="nova-sweep" className="nova-sweep-group" clipPath="url(#nova-clip)">
                <path
                    d="M100 100 L100 28 A72 72 0 0 1 161 136 Z"
                    fill="url(#nova-sweep-grad)"
                />
                <line x1="100" y1="100" x2="100" y2="28" stroke="#E8622A" strokeWidth="1.5" strokeOpacity="0.45" />
            </g>

            {/* Topology Graph */}
            <g id="nova-topology">
                {/* Edges */}
                <line className="nova-edge nova-e0" x1="100" y1="100" x2="100" y2="28" stroke="rgba(26,22,18,0.16)" strokeWidth="1" />
                <line className="nova-edge nova-e1" x1="100" y1="100" x2="162" y2="136" stroke="rgba(26,22,18,0.16)" strokeWidth="1" />
                <line className="nova-edge nova-e2" x1="100" y1="100" x2="38" y2="136" stroke="rgba(26,22,18,0.16)" strokeWidth="1" />
                <line className="nova-edge nova-e3" x1="100" y1="28" x2="162" y2="136" stroke="rgba(26,22,18,0.16)" strokeWidth="1" />
                <line className="nova-edge nova-e4" x1="100" y1="28" x2="38" y2="136" stroke="rgba(26,22,18,0.16)" strokeWidth="1" />

                {/* Nodes */}
                {/* Core Node */}
                <g className="nova-node nova-n0">
                    <circle cx="100" cy="100" r="5" fill="rgba(26,22,18,0.12)" stroke="rgba(26,22,18,0.3)" strokeWidth="1" />
                    <circle cx="100" cy="100" r="2" fill="rgba(26,22,18,0.3)" />
                </g>

                {/* Mid Nodes */}
                <circle className="nova-node nova-n1" cx="131" cy="64" r="3" fill="rgba(26,22,18,0.06)" stroke="rgba(26,22,18,0.16)" strokeWidth="1" />
                <circle className="nova-node nova-n2" cx="69" cy="64" r="3" fill="rgba(26,22,18,0.06)" stroke="rgba(26,22,18,0.16)" strokeWidth="1" />

                {/* Outer Nodes */}
                <circle className="nova-node nova-n3" cx="100" cy="28" r="4" fill="rgba(26,22,18,0.08)" stroke="rgba(26,22,18,0.22)" strokeWidth="1" />
                <circle className="nova-node nova-n4" cx="162" cy="136" r="4" fill="rgba(26,22,18,0.08)" stroke="rgba(26,22,18,0.22)" strokeWidth="1" />
                <circle className="nova-node nova-n5" cx="38" cy="136" r="4" fill="rgba(26,22,18,0.08)" stroke="rgba(26,22,18,0.22)" strokeWidth="1" />
            </g>
        </svg>
    );
}
