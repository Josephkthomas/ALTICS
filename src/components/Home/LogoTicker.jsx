import React from 'react';
import { useReveal } from '../../utils/useReveal';

const LogoTicker = () => {
    const revealRef = useReveal();

    return (
        <section className="py-section-mobile lg:py-24 bg-bg border-b border-border">
            <div className="container-custom" ref={revealRef}>
                <span className="eyebrow text-center mb-10 reveal">— TRUSTED BY CRITICAL INFRASTRUCTURE LEADERS</span>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300 reveal-group">
                    {/* Placeholder Logos */}
                    <div className="text-xl font-display font-bold text-text-primary reveal">TeleCorp</div>
                    <div className="text-xl font-display font-bold text-text-primary reveal">MetroGrid</div>
                    <div className="text-xl font-display font-bold text-text-primary reveal">AeroTech</div>
                    <div className="text-xl font-display font-bold text-text-primary reveal">CityWater</div>
                    <div className="text-xl font-display font-bold text-text-primary reveal">NOC Global</div>
                </div>
            </div>
        </section>
    );
};

export default LogoTicker;
