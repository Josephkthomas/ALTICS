import React from 'react';

export default function CounterBadge({ activeIndex, progress, onPipClick }) {
    const radius = 14;
    const circumference = 2 * Math.PI * radius;
    // Offset moves backwards as progress increases
    const strokeDashoffset = circumference - (progress * circumference);

    return (
        <div className="flex items-center gap-4 bg-[rgba(28,27,20,0.6)] border border-[rgba(240,237,230,0.06)] backdrop-blur-md rounded-full px-4 py-2 w-max">
            {/* Timer Ring */}
            <div className="relative w-8 h-8 flex items-center justify-center">
                <svg fill="none" viewBox="0 0 32 32" className="absolute inset-0 -rotate-90">
                    {/* Background circle */}
                    <circle cx="16" cy="16" r={radius} stroke="rgba(240,237,230,0.1)" strokeWidth="2" />
                    {/* Progress circle */}
                    <circle
                        cx="16"
                        cy="16"
                        r={radius}
                        stroke="#E8622A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: strokeDashoffset,
                            transition: 'stroke-dashoffset 80ms ease-out',
                        }}
                    />
                </svg>
            </div>

            {/* Pips */}
            <div className="flex gap-1.5 px-1 bg-[rgba(0,0,0,0.2)] rounded-full py-1.5 px-2">
                {[0, 1, 2, 3].map((i) => (
                    <button
                        key={i}
                        onClick={() => onPipClick(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-[#E8622A] scale-110' : 'bg-[rgba(240,237,230,0.2)] hover:bg-[rgba(240,237,230,0.4)]'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Text Counter */}
            <div className="font-mono text-[12px] font-medium text-[rgba(240,237,230,0.6)]">
                0{activeIndex + 1} / 04
            </div>
        </div>
    );
}
