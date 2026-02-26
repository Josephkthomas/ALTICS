import React from 'react';
import { useReveal } from '../../utils/useReveal';
import { ArrowRight } from 'lucide-react';

const ProductCard = ({ title, eyebrow, description, delay }) => {
    return (
        <div className={`card group p-8 lg:p-10 flex flex-col h-full reveal reveal-group`} style={{ transitionDelay: delay }}>
            <span className="eyebrow flex justify-between items-center mb-6">
                <span>— {eyebrow}</span>
                {/* Placeholder simple icon */}
                <div className="w-6 h-6 border rounded border-text-tertiary" />
            </span>

            <h3 className="text-[28px] md:text-[32px] font-display font-bold leading-tight mb-4 text-text-primary">
                {title}
            </h3>

            <p className="font-body text-[15px] text-text-secondary mb-8 pr-4">
                {description}
            </p>

            <div className="mt-auto w-full aspect-[16/9] bg-surface-tint border border-border rounded-lg mb-8" />

            <button className="flex items-center font-body font-medium text-accent-orange group-hover:text-[#D45520] transition-colors">
                Learn more <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

const BentoGrid = () => {
    const revealRef = useReveal();

    return (
        <section className="py-section bg-bg">
            <div className="container-custom" ref={revealRef}>
                <div className="mb-16 reveal">
                    <h2 className="text-4xl lg:text-[64px] font-display font-bold mb-6">Products overview</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] reveal-group">
                    <ProductCard
                        eyebrow="RFTM"
                        title="Remote Fiber Testing & Monitoring"
                        description="Continuous fiber link diagnostics for P2P networks. Proactive fault detection before outages."
                        delay="0ms"
                    />
                    <ProductCard
                        eyebrow="PIDS"
                        title="Perimeter Intrusion Detection"
                        description="Fiber optic physical sensors. Detect vibration, pressure, and cut attempts on critical boundaries."
                        delay="80ms"
                    />
                    <ProductCard
                        eyebrow="IOT"
                        title="IoT-Based Monitoring"
                        description="Real-time operational data from remote assets. Temperature, motion, fluid levels."
                        delay="160ms"
                    />
                    <ProductCard
                        eyebrow="NOVA"
                        title="Nova Context Platform"
                        description="Digital twin network topology modelling for immediate root cause analysis."
                        delay="240ms"
                    />
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
