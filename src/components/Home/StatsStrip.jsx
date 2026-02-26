import React, { useEffect, useRef, useState } from 'react';
import { useReveal } from '../../utils/useReveal';

const StatItem = ({ endValue, label, suffix = '', duration = 1200 }) => {
    const [value, setValue] = useState(0);
    const nodeRef = useRef(null);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        let hasRun = false;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasRun) {
                    hasRun = true;

                    const start = performance.now();
                    const target = parseFloat(endValue);

                    const update = (time) => {
                        const elapsed = time - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out

                        const currentValue = eased * target;

                        // Format smartly: integers vs decimals
                        setValue(Number.isInteger(target) ? Math.floor(currentValue) : currentValue.toFixed(1));

                        if (progress < 1) {
                            requestAnimationFrame(update);
                        } else {
                            setValue(target);
                        }
                    };
                    requestAnimationFrame(update);

                    observer.unobserve(node);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [endValue, duration]);

    return (
        <div ref={nodeRef} className="flex flex-col border-l border-border pl-8 py-2">
            <div className="text-[56px] md:text-[72px] font-mono font-medium leading-none text-accent-amber mb-2">
                {value}{suffix}
            </div>
            <div className="font-body text-[14px] text-text-secondary">
                {label}
            </div>
        </div>
    );
};

const StatsStrip = () => {
    const revealRef = useReveal();

    return (
        <section className="py-section-mobile lg:py-32 bg-bg border-t border-border">
            <div className="container-custom" ref={revealRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 reveal">
                    <StatItem endValue="99.9" suffix="%" label="Network Uptime Ensured" />
                    <StatItem endValue="1000" suffix="+" label="OTDR Units Supported" />
                    <StatItem endValue="2" suffix="min" label="Sub-2 Minute Fault Localization" />
                    <StatItem endValue="0" label="Surprise Outages" />
                </div>
            </div>
        </section>
    );
};

export default StatsStrip;
