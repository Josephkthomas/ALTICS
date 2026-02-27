import React from 'react';

export default function ProblemCard({ index, position, title, subtitle, icon, isEntering, useEntryDelay, children, onClick }) {
    // Construct classes for entry and position styling
    let className = `problem-card ${isEntering ? 'entering' : ''}`;

    return (
        <div
            className={className}
            data-pos={position}
            onClick={() => {
                // Only trigger click if not front and not exiting
                if (position !== 'front' && position !== 'exiting' && onClick) {
                    onClick(index);
                }
            }}
            style={{
                transitionDelay: useEntryDelay ? `${index * 120}ms` : '0ms'
            }}
        >
            {/* Top Bar */}
            <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[rgba(232,98,42,0.08)] flex items-center justify-center flex-shrink-0 text-[#E8622A]">
                    {icon}
                </div>
                <div>
                    <div className="font-mono text-[11px] text-[#E8622A] mb-1 font-medium select-none">/0{index + 1}</div>
                    <h4 className="font-display font-bold text-[18px] text-[#F0EDE6] select-none">{title}</h4>
                    <p className="font-body text-[13px] text-[rgba(240,237,230,0.4)] mt-0.5 select-none">{subtitle}</p>
                </div>
            </div>

            {/* Visual Frame */}
            <div className="flex-grow bg-[rgba(240,237,230,0.02)] border border-[rgba(240,237,230,0.06)] rounded-xl overflow-hidden relative">
                {children}
            </div>
        </div>
    );
}
