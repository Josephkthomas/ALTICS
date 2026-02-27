import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const problemData = [
    {
        num: "/01",
        category: "Fibre Networks",
        headline: "Silent Signal Degradation",
        body: "Your fibre network is losing signal right now. Connectors loosen, splices age, cables bend — the loss compounds invisibly. By the time it surfaces as an outage, it's been accumulating for weeks. Field teams are dispatched without fault location data, wasting hours on the wrong span.",
        cta: "Explore RFTM →",
        link: "/rftm"
    },
    {
        num: "/02",
        category: "Perimeter Security",
        headline: "Undetected Perimeter Breaches",
        body: "Your perimeter was crossed last night. Your security log shows nothing. Legacy cameras and motion sensors drown your team in false alarms — or miss the real intrusion entirely. The compliance audit that follows finds gaps your existing systems never flagged.",
        cta: "Explore PIDS →",
        link: "/pids"
    },
    {
        num: "/03",
        category: "Remote Assets",
        headline: "Blind Operational Data",
        body: "Your remote assets are drifting out of spec right now. Tank levels rising, temperatures creeping, equipment degrading — and nobody will know until the next scheduled truck roll. Manual inspections are too infrequent to catch the drift before it becomes an incident.",
        cta: "Explore IoT Solutions →",
        link: "/iot"
    },
    {
        num: "/04",
        category: "Network Operations",
        headline: "Fragmented Network Visibility",
        body: "Your NOC team is firefighting right now — not because they lack skill, but because no single tool gives them the full picture. Five dashboards, five truths. When a major alarm hits, they spend hours correlating data instead of resolving the root cause.",
        cta: "Explore Nova Context →",
        link: "/nova-context"
    }
];

// Vertical offsets to align text with StepRail node positions
// StepRail is 560px tall with 4 evenly distributed nodes
const NODE_OFFSETS = [0, 150, 300, 440];

export default function TextPanel({ activeIndex, hasEntered }) {
    const [prevIndex, setPrevIndex] = useState(activeIndex);

    useEffect(() => {
        if (activeIndex !== prevIndex) {
            const timer = setTimeout(() => {
                setPrevIndex(activeIndex);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [activeIndex, prevIndex]);

    return (
        <div
            className="relative"
            style={{
                opacity: hasEntered ? 1 : 0,
                transition: 'opacity 500ms ease-out',
            }}
        >
            {/* Single text block that translates down to match active node */}
            <div
                style={{
                    transform: `translateY(${NODE_OFFSETS[activeIndex]}px)`,
                    transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                {problemData.map((data, i) => {
                    const isActive = i === activeIndex;
                    const isExiting = i === prevIndex && i !== activeIndex;

                    return (
                        <div
                            key={i}
                            className="absolute top-0 left-0 right-0 flex flex-col"
                            style={{
                                opacity: isActive ? 1 : isExiting ? 0 : 0,
                                transform: isActive
                                    ? 'translateY(0)'
                                    : isExiting
                                        ? 'translateY(-12px)'
                                        : 'translateY(16px)',
                                transition: isExiting
                                    ? 'opacity 300ms ease-out, transform 300ms ease-out'
                                    : 'opacity 500ms ease-out 100ms, transform 500ms ease-out 100ms',
                                pointerEvents: isActive ? 'auto' : 'none',
                            }}
                        >
                            <div className="flex items-center gap-2 mb-4 font-mono text-[13px] problem-text-accent-orange font-medium">
                                {data.num} — <span className="text-[rgba(240,237,230,0.5)] font-body uppercase text-[11px] tracking-widest">{data.category}</span>
                            </div>
                            <h3 className="font-display font-bold text-3xl mb-4 problem-text-primary">
                                {data.headline}
                            </h3>
                            <p className="font-body text-[15px] leading-relaxed problem-text-muted mb-6">
                                {data.body}
                            </p>
                            <div>
                                <Link to={data.link} className="font-body font-medium text-sm problem-text-accent-orange hover:text-[#D45520] transition-colors inline-flex items-center group">
                                    {data.cta}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
