import React from "react";

export default function PIDSIllustration() {
    const outerHexPoints = "100,24 166,62 166,138 100,176 34,138 34,62";
    const innerHexPoints = "100,52 133,70 133,108 100,126 67,108 67,70";

    return (
        <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            style={{ backgroundColor: "transparent" }}
        >
            <style>
                {`
          @media (prefers-reduced-motion: reduce) {
            .pids-comet {
              display: none;
            }
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
            <g id="pids-comet-group" className="pids-comet" fill="none">
                {/* Layer 3 - Far Tail */}
                <polygon
                    points={outerHexPoints}
                    stroke="#E8622A"
                    strokeWidth="1.0"
                    opacity="0.18"
                    strokeDasharray="28 1000"
                    strokeDashoffset="28"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="28"
                        to="-428"
                        dur="4s"
                        repeatCount="indefinite"
                        calcMode="linear"
                    />
                </polygon>

                {/* Layer 2 - Mid Tail */}
                <polygon
                    points={outerHexPoints}
                    stroke="#E8622A"
                    strokeWidth="1.8"
                    opacity="0.45"
                    strokeDasharray="20 1000"
                    strokeDashoffset="12"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="12"
                        to="-444"
                        dur="4s"
                        repeatCount="indefinite"
                        calcMode="linear"
                    />
                </polygon>

                {/* Layer 1 - Head */}
                <polygon
                    points={outerHexPoints}
                    stroke="#E8622A"
                    strokeWidth="2.5"
                    opacity="1.0"
                    strokeDasharray="12 1000"
                    strokeDashoffset="0"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="-456"
                        dur="4s"
                        repeatCount="indefinite"
                        calcMode="linear"
                    />
                </polygon>
            </g>
        </svg>
    );
}
