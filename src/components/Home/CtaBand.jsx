import React from 'react';
import { Link } from 'react-router-dom';

const CtaBand = () => {
    return (
        <section className="bg-accent-orange text-white py-section-mobile lg:py-section w-full">
            <div className="container-custom" style={{ '--max-width': '1000px' }}>
                <div className="text-center max-w-4xl mx-auto reveal-group">

                    <h2 className="text-4xl md:text-5xl lg:text-[56px] font-display font-extrabold mb-6 leading-tight reveal">
                        Your infrastructure is running right now. <br className="hidden md:block" /> Is anyone watching it?
                    </h2>

                    <p className="font-body text-lg text-white/80 mb-12 max-w-2xl mx-auto reveal">
                        Don't wait for the outage report to find the blind spots. Empower your NOC with precision fault detection.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 reveal">
                        <button className="btn w-full sm:w-auto bg-white text-accent-orange hover:bg-white/90 shadow-[0_4px_16px_rgba(255,255,255,0.2)]">
                            Schedule a Demo
                        </button>
                        <button className="btn w-full sm:w-auto btn-dark">
                            Explore Solutions
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CtaBand;
