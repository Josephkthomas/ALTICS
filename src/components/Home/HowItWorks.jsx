import React, { useEffect, useRef, useState } from 'react';
import { useReveal } from '../../utils/useReveal';
import { Activity, Radio, Search, Bell } from 'lucide-react';

const FlowNode = ({ icon: Icon, title, subtitle, active, index }) => {
    return (
        <div className="flex flex-col items-center relative z-10 w-40 text-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-700
        ${active ? 'bg-inversion-surface border border-accent-amber shadow-[0_0_30px_rgba(212,168,67,0.2)]' : 'bg-inversion-surface border border-white/10'}`}
            >
                <Icon size={24} className={`transition-colors duration-700 ${active ? 'text-accent-amber' : 'text-text-tertiary'}`} />
            </div>
            <h4 className="font-display font-bold text-lg text-inversion-text mb-2">{title}</h4>
            <p className="font-body text-[13px] text-text-tertiary">{subtitle}</p>
        </div>
    );
};

const HowItWorks = () => {
    const containerRef = useRef(null);
    const revealRef = useReveal();
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const scrollProgress = 1 - (rect.bottom / (window.innerHeight + rect.height));

            if (scrollProgress > 0.8) setActiveStep(4);
            else if (scrollProgress > 0.6) setActiveStep(3);
            else if (scrollProgress > 0.4) setActiveStep(2);
            else if (scrollProgress > 0.2) setActiveStep(1);
            else setActiveStep(0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="py-section bg-inversion-bg relative overflow-hidden">
            <div className="container-custom" ref={revealRef}>

                <div className="mb-24 reveal text-center max-w-3xl mx-auto">
                    <span className="eyebrow text-accent-amber">— HOW IT WORKS</span>
                    <h2 className="text-4xl lg:text-[56px] font-display font-bold text-inversion-text leading-tight w-full justify-center">
                        An integrated system of continuous intelligence
                    </h2>
                </div>

                {/* Desktop Pipeline visual */}
                <div
                    ref={containerRef}
                    className="relative hidden md:flex items-start justify-between min-h-[400px]"
                >
                    {/* Connecting Line Vector */}
                    <div className="absolute top-8 left-[10%] right-[10%] h-[2px] bg-white/10 z-0">
                        <div
                            className="h-full bg-accent-amber transition-all duration-700 ease-out"
                            style={{ width: `${Math.min(100, Math.max(0, (activeStep - 1) * 33.33))}%` }}
                        />
                    </div>

                    <FlowNode icon={Radio} title="Signal Captured" subtitle="Fiber or IoT sensor" active={activeStep >= 1} index={1} />
                    <FlowNode icon={Activity} title="Transmitted" subtitle="Network topology" active={activeStep >= 2} index={2} />
                    <FlowNode icon={Search} title="Analysed" subtitle="Nova Context engine" active={activeStep >= 3} index={3} />
                    <FlowNode icon={Bell} title="You're Alerted" subtitle="Mobile/NOC notification" active={activeStep >= 4} index={4} />
                </div>

                {/* Mobile Pipeline visual (Vertical) */}
                <div className="md:hidden flex flex-col space-y-12 items-center relative">
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/10 z-0" />

                    {/* Active mobile line */}
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-accent-amber transition-all duration-700 z-0 ease-out"
                        style={{ height: `${activeStep === 0 ? 0 : activeStep === 1 ? '10%' : activeStep === 2 ? '40%' : activeStep === 3 ? '70%' : '100%'}` }}
                    />

                    <FlowNode icon={Radio} title="Signal Captured" subtitle="Fiber or IoT sensor" active={activeStep >= 1} index={1} />
                    <FlowNode icon={Activity} title="Transmitted" subtitle="Network topology" active={activeStep >= 2} index={2} />
                    <FlowNode icon={Search} title="Analysed" subtitle="Nova Context engine" active={activeStep >= 3} index={3} />
                    <FlowNode icon={Bell} title="You're Alerted" subtitle="Mobile/NOC notification" active={activeStep >= 4} index={4} />
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;
