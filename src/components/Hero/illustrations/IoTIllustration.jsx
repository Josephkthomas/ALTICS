import React from "react";

export default function IoTIllustration({ animate = true }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${animate ? 'iot-animate' : ''}`}
      style={{ backgroundColor: "transparent" }}
    >
      <style>
        {`
          .iot-circle {
            fill: transparent;
            stroke: rgba(26,22,18,0.13);
            stroke-width: 1px;
            transition: all 400ms ease;
          }

          /* Animations only run when .iot-animate is on the SVG root */
          @media (prefers-reduced-motion: no-preference) {
            .iot-animate .iot-circle-animated {
              animation: iot-active 7s ease infinite;
            }
            .iot-animate .iot-c1 { animation-delay: 0.000s; }
            .iot-animate .iot-c2 { animation-delay: 1.167s; }
            .iot-animate .iot-c3 { animation-delay: 2.333s; }
            .iot-animate .iot-c4 { animation-delay: 3.500s; }
            .iot-animate .iot-c5 { animation-delay: 4.667s; }
            .iot-animate .iot-c6 { animation-delay: 5.833s; }
          }

          @keyframes iot-active {
            0%, 100% {
              fill: transparent;
              stroke: rgba(26,22,18,0.13);
              stroke-width: 1px;
              filter: none;
            }
            15%, 30% {
              fill: rgba(232,98,42,0.12);
              stroke: #E8622A;
              stroke-width: 1.5px;
              filter: drop-shadow(0 0 6px rgba(232,98,42,0.35));
            }
          }
        `}
      </style>

      {/* Nodes + Central circle */}
      <g id="iot-geometry">
        {/* Wave Circles */}
        <circle className="iot-circle iot-circle-animated iot-c1" cx="100" cy="58" r="34" />
        <circle className="iot-circle iot-circle-animated iot-c2" cx="140" cy="81" r="34" />
        <circle className="iot-circle iot-circle-animated iot-c3" cx="140" cy="127" r="34" />
        <circle className="iot-circle iot-circle-animated iot-c4" cx="100" cy="150" r="34" />
        <circle className="iot-circle iot-circle-animated iot-c5" cx="60" cy="127" r="34" />
        <circle className="iot-circle iot-circle-animated iot-c6" cx="60" cy="81" r="34" />

        {/* Central static circle */}
        <circle
          cx="100"
          cy="104"
          r="34"
          fill="transparent"
          stroke="rgba(26,22,18,0.18)"
          strokeWidth="1.2"
        />

        {/* Centre markers for each circle */}
        <circle cx="100" cy="58" r="2" fill="rgba(26,22,18,0.15)" />
        <circle cx="140" cy="81" r="2" fill="rgba(26,22,18,0.15)" />
        <circle cx="140" cy="127" r="2" fill="rgba(26,22,18,0.15)" />
        <circle cx="100" cy="150" r="2" fill="rgba(26,22,18,0.15)" />
        <circle cx="60" cy="127" r="2" fill="rgba(26,22,18,0.15)" />
        <circle cx="60" cy="81" r="2" fill="rgba(26,22,18,0.15)" />

        {/* Central hub marker */}
        <circle cx="100" cy="104" r="3" fill="rgba(26,22,18,0.22)" />
      </g>
    </svg>
  );
}
