import React, { useEffect, useRef, useState } from 'react';
import { useReveal } from '../../utils/useReveal';

// Reusable Problem Node
const ProblemNode = ({ number, title, active, children, last }) => {
    return (
        <div className={`relative flex gap-8 md:gap-16 pb-32 transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-40'}`}>

            {/* Node & Connector */}
            <div className="relative flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-bg font-display font-bold text-lg transition-colors duration-300 z-10 
          ${active ? 'border-accent-orange text-accent-orange' : 'border-text-tertiary text-text-tertiary'}`}>
                    {number}
                </div>
                {!last && (
                    <div className="absolute top-12 bottom-[-2rem] w-[2px] bg-text-tertiary/20">
                        <div className={`w-full bg-accent-orange transition-all duration-[600ms] origin-top ease-out 
              ${active ? 'h-full scale-y-100' : 'h-0 scale-y-0'}`} />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 max-w-[480px]">
                <h3 className="text-3xl lg:text-[40px] font-display font-bold leading-tight mb-8 text-text-primary">
                    {title}
                </h3>
                {/* Placeholder for SVG Visuals that go here based on each node's specific requirement */}
                <div className="w-full aspect-[4/3] bg-surface rounded-card border border-border shadow-sm overflow-hidden p-6 relative">
                    {children}
                </div>
            </div>

        </div>
    );
};

const ProblemNarrative = () => {
    const containerRef = useRef(null);
    const revealRef = useReveal();
    const [activeNode, setActiveNode] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const nodes = containerRef.current.querySelectorAll('.problem-node');

            nodes.forEach((node, index) => {
                const rect = node.getBoundingClientRect();
                // Activate node when it's in the top 60% of viewport
                if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4) {
                    setActiveNode(index + 1);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="py-section bg-bg">
            <div className="container-custom reveal" ref={revealRef}>
                <div ref={containerRef} className="max-w-5xl mx-auto pl-4 md:pl-0">

                    <div className="problem-node">
                        <ProblemNode
                            number="01"
                            title="Your network is failing right now. You just don't know it yet."
                            active={activeNode >= 1}
                        >
                            {/* SVG 1 */}
                            <div className="w-full h-full flex flex-col justify-center relative">
                                <span className="font-mono text-sm text-text-secondary mb-2">OTDR TRACE SIGNAL</span>
                                <svg viewBox="0 0 400 200" className="w-full h-auto" stroke="var(--color-text-primary)">
                                    <path d="M 0 100 Q 50 100 100 100 T 200 100 T 250 150 T 300 100 T 400 100" fill="none" strokeWidth="2" strokeOpacity="0.8" />
                                    {activeNode >= 1 && (
                                        <circle cx="250" cy="150" r="6" fill="var(--color-accent-amber)" className="sensor-node" />
                                    )}
                                </svg>
                            </div>
                        </ProblemNode>
                    </div>

                    <div className="problem-node">
                        <ProblemNode
                            number="02"
                            title="Your perimeter was crossed last night. Your log shows nothing."
                            active={activeNode >= 2}
                        >
                            {/* SVG 2 */}
                            <div className="w-full h-full flex items-center justify-center">
                                <svg viewBox="0 0 200 200" className="w-3/4 h-auto" stroke="var(--color-border-strong)" fill="none" strokeWidth="1">
                                    {/* Grid */}
                                    <path d="M0 50 H200 M0 100 H200 M0 150 H200" />
                                    <path d="M50 0 V200 M100 0 V200 M150 0 V200" />
                                    {/* Breach point */}
                                    {activeNode >= 2 && (
                                        <circle cx="150" cy="50" r="8" fill="var(--color-accent-orange)" className="sensor-node" />
                                    )}
                                </svg>
                            </div>
                        </ProblemNode>
                    </div>

                    <div className="problem-node">
                        <ProblemNode
                            number="03"
                            title="By the time your team responds, the damage is already done."
                            active={activeNode >= 3}
                            last
                        >
                            {/* SVG 3 */}
                            <div className="w-full h-full flex flex-col justify-center space-y-6">
                                <div className="flex items-center">
                                    <div className="w-24 text-right pr-4 font-mono text-[12px] text-text-secondary">FAULT DETECT</div>
                                    <div className="h-2 bg-accent-orange w-12 rounded-full" />
                                </div>
                                <div className="flex items-center">
                                    <div className="w-24 text-right pr-4 font-mono text-[12px] text-text-secondary">MANUAL ALERT</div>
                                    <div className={`h-2 bg-text-tertiary rounded-full transition-all duration-[1s] ease-out ${activeNode >= 3 ? 'w-48' : 'w-0'}`} />
                                </div>
                                <div className="flex items-center">
                                    <div className="w-24 text-right pr-4 font-mono text-[12px] text-accent-orange/80">RESPONSE GAP</div>
                                    <div className={`h-2 border border-accent-orange border-dashed rounded-full transition-all duration-[1.5s] ease-out delay-500 ${activeNode >= 3 ? 'w-64' : 'w-0'}`} />
                                </div>
                            </div>
                        </ProblemNode>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemNarrative;
