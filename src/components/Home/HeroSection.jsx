import React from 'react';
import { useReveal } from '../../utils/useReveal';

const HeroSection = () => {
    const revealRef = useReveal();

    return (
        <section className="relative pt-32 pb-section-mobile lg:pt-48 lg:pb-section overflow-hidden bg-bg">
            <div className="container-custom relative z-10" ref={revealRef}>
                <div className="max-w-3xl reveal-group">
                    <span className="eyebrow reveal">— INTELLIGENT MONITORING</span>

                    <h1 className="text-5xl md:text-6xl lg:text-[80px] font-display font-extrabold leading-[1.05] tracking-[-0.02em] text-text-primary mb-8 reveal">
                        Zero blind spots. <br className="hidden md:block" /> Zero downtime.
                    </h1>

                    <p className="font-body text-lg md:text-[17px] leading-[1.7] text-text-secondary mb-10 max-w-2xl reveal">
                        Altics provides real-time, precision monitoring for fiber networks, perimeters, and critical infrastructure. See the fault before it becomes an outage.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 reveal">
                        <button className="btn btn-primary w-full sm:w-auto">
                            Schedule a Demo
                        </button>
                        <button className="btn btn-secondary w-full sm:w-auto">
                            Explore Solutions
                        </button>
                    </div>
                </div>
            </div>

            {/* Animated SVG Fiber Network Mesh (Ambient Background) */}
            <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-0 opacity-40 mix-blend-multiply pointer-events-none">
                <svg
                    viewBox="0 0 800 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-cover object-right-top"
                    preserveAspectRatio="xMaxYMin slice"
                >
                    {/* Abstract fiber lines */}
                    <g stroke="var(--color-accent-amber)" strokeWidth="1" strokeOpacity="0.3">
                        <path d="M800,100 C600,150 400,50 200,200 C100,275 0,200 -100,300"
                            className="fiber-path" style={{ '--path-length': '1200' }} />
                        <path d="M800,300 C650,250 500,400 300,350 C150,300 50,450 -100,400"
                            className="fiber-path" style={{ '--path-length': '1100', animationDelay: '200ms' }} />
                        <path d="M800,500 C700,550 500,450 350,600 C200,750 100,650 -100,800"
                            className="fiber-path" style={{ '--path-length': '1300', animationDelay: '400ms' }} />
                    </g>

                    {/* Accent nodes */}
                    <circle cx="650" cy="180" r="4" fill="var(--color-accent-orange)" className="sensor-node" />
                    <circle cx="450" cy="330" r="3" fill="var(--color-accent-amber)" className="sensor-node" style={{ animationDelay: '800ms' }} />
                    <circle cx="280" cy="530" r="5" fill="var(--color-accent-orange)" className="sensor-node" style={{ animationDelay: '1200ms' }} />
                    <circle cx="150" cy="270" r="3" fill="var(--color-text-primary)" className="sensor-node" opacity="0.3" style={{ animationDelay: '400ms' }} />
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;
