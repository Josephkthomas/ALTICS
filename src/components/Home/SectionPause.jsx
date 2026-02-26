import React from 'react';
import { useReveal } from '../../utils/useReveal';

const SectionPause = () => {
    const revealRef = useReveal();

    return (
        <section className="py-section-mobile lg:py-[180px] bg-bg flex items-center justify-center">
            <div className="container-custom text-center max-w-[720px]" ref={revealRef}>
                <h2 className="text-4xl md:text-5xl lg:text-[56px] font-display font-bold leading-tight text-text-primary reveal">
                    What if your infrastructure could <br className="hidden md:block" />
                    diagnose itself before you knew <br className="hidden md:block" />
                    something was <span className="text-accent-orange">wrong?</span>
                </h2>
            </div>
        </section>
    );
};

export default SectionPause;
