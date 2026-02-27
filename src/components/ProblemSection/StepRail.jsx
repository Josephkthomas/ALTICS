import React from 'react';

export default function StepRail({ activeIndex, onNavigate, hasEntered }) {
    const nodes = [
        { num: '01' },
        { num: '02' },
        { num: '03' },
        { num: '04' }
    ];

    return (
        <div className="flex flex-col items-center max-h-[560px] h-[560px] w-14">
            {nodes.map((node, i) => {
                const isActive = activeIndex === i;
                const isPast = activeIndex > i;
                const isLast = i === nodes.length - 1;

                return (
                    <React.Fragment key={i}>
                        {/* Node */}
                        <div
                            className={`flex flex-col items-center cursor-pointer group transition-all duration-500 ease-out`}
                            style={{
                                opacity: hasEntered ? 1 : 0,
                                transform: hasEntered ? 'translateY(0)' : 'translateY(20px)',
                                transitionDelay: `${i * 80}ms`
                            }}
                            onClick={() => onNavigate(i)}
                        >
                            <div
                                className={`w-3 h-3 rounded-full border-2 transition-all duration-400 ${isActive ? 'border-[#E8622A] bg-[#E8622A]' : isPast ? 'border-transparent bg-[#E8622A]' : 'border-[rgba(240,237,230,0.15)] bg-[#111008] group-hover:border-[rgba(240,237,230,0.3)]'}`}
                                style={isActive ? { boxShadow: '0 0 12px rgba(232,98,42,0.4)' } : {}}
                            />
                            <span
                                className={`mt-2 font-mono text-[9px] font-medium transition-colors duration-400 ${isActive ? 'text-[#E8622A]' : 'text-[rgba(240,237,230,0.3)] group-hover:text-[rgba(240,237,230,0.5)]'}`}
                            >
                                {node.num}
                            </span>
                        </div>

                        {/* Connector Line */}
                        {
                            !isLast && (
                                <div
                                    className="w-px flex-grow my-4"
                                    style={{
                                        backgroundColor: 'rgba(240,237,230,0.06)',
                                        opacity: hasEntered ? 1 : 0,
                                        transition: 'opacity 500ms ease-out',
                                        transitionDelay: `${(i * 80) + 40}ms`
                                    }}
                                >
                                    <div
                                        className="w-full bg-[#E8622A] transition-all duration-600 ease-out origin-top"
                                        style={{
                                            height: '100%',
                                            transform: isPast ? 'scaleY(1)' : 'scaleY(0)'
                                        }}
                                    />
                                </div>
                            )
                        }
                    </React.Fragment >
                );
            })}
        </div >
    );
}
