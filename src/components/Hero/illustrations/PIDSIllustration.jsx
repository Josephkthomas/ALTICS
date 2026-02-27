import React from "react";

export default function PIDSIllustration({ animate = true }) {
    const outerHexPoints = "100,24 166,62 166,138 100,176 34,138 34,62";
    const innerHexPoints = "100,52 133,70 133,108 100,126 67,108 67,70";

    return (
        <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-full h-full ${animate ? 'pids-animate' : ''}`}
            style={{ backgroundColor: "transparent" }}
        >
            <style>
                {`
          /* Comets hidden by default */
          .pids-comet-tail,
          .pids-comet-mid,
          .pids-comet-head {
            opacity: 0;
          }

          /* Animations only run when .pids-animate is on the SVG root */
          @media (prefers-reduced-motion: no-preference) {
            .pids-animate .pids-comet-tail {
              opacity: 0.18;
              animation: pids-trail 4s linear infinite;
            }
            .pids-animate .pids-comet-mid {
              opacity: 0.45;
              animation: pids-mid 4s linear infinite;
            }
            .pids-animate .pids-comet-head {
              opacity: 1;
              animation: pids-head 4s linear infinite;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .pids-comet-tail,
            .pids-comet-mid,
            .pids-comet-head {
              display: none;
            }
          }

          @keyframes pids-trail {
            from { stroke-dashoffset: 28; }
            to { stroke-dashoffset: -428; }
          }
          @keyframes pids-mid {
            from { stroke-dashoffset: 12; }
            to { stroke-dashoffset: -444; }
          }
          @keyframes pids-head {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -456; }
          }
        `}
            </style>

            {/* Static Geometry */}
            <g id="pids-static">
                {/* Six dashed lines to centre */}
                <line x1="100" y1="24" x2="100" y2="100" stroke="rgba(26,22,18,0.05)" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="166" y1="62" x2="100" y2="100" stroke="rgba(26,22,18,0.05)" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="166" y1="138" x2="100" y2="100" stroke="rgba(26,22,18,0.05)" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="100" y1="176" x2="100" y2="100" stroke="rgba(26,22,18,0.05)" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="34" y1="138" x2="100" y2="100" stroke="rgba(26,22,18,0.05)" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="34" y1="62" x2="100" y2="100" stroke="rgba(26,22,18,0.05)" strokeWidth="1" strokeDasharray="2 4" />

                {/* Inner Hex */}
                <polygon points={innerHexPoints} fill="none" stroke="rgba(26,22,18,0.07)" />

                {/* Outer Hex Base */}
                <polygon points={outerHexPoints} fill="none" stroke="rgba(26,22,18,0.1)" strokeWidth="1" />

                {/* Outer Hex Vertex Dots */}
                <circle cx="100" cy="24" r="2" fill="rgba(26,22,18,0.15)" />
                <circle cx="166" cy="62" r="2" fill="rgba(26,22,18,0.15)" />
                <circle cx="166" cy="138" r="2" fill="rgba(26,22,18,0.15)" />
                <circle cx="100" cy="176" r="2" fill="rgba(26,22,18,0.15)" />
                <circle cx="34" cy="138" r="2" fill="rgba(26,22,18,0.15)" />
                <circle cx="34" cy="62" r="2" fill="rgba(26,22,18,0.15)" />

                {/* Centre Marker */}
                <circle cx="100" cy="100" r="5" fill="rgba(26,22,18,0.06)" stroke="rgba(26,22,18,0.18)" />
                <circle cx="100" cy="100" r="2" fill="rgba(26,22,18,0.3)" />
            </g>

            {/* Comet Layers */}
            <g id="pids-comet-group" fill="none">
                {/* Layer 3 - Far Tail */}
                <polygon
                    className="pids-comet-tail"
                    points={outerHexPoints}
                    stroke="#E8622A"
                    strokeWidth="1.0"
                    strokeDasharray="28 1000"
                    strokeDashoffset="28"
                />

                {/* Layer 2 - Mid Tail */}
                <polygon
                    className="pids-comet-mid"
                    points={outerHexPoints}
                    stroke="#E8622A"
                    strokeWidth="1.8"
                    strokeDasharray="20 1000"
                    strokeDashoffset="12"
                />

                {/* Layer 1 - Head */}
                <polygon
                    className="pids-comet-head"
                    points={outerHexPoints}
                    stroke="#E8622A"
                    strokeWidth="2.5"
                    strokeDasharray="12 1000"
                    strokeDashoffset="0"
                />
            </g>
        </svg>
    );
}
