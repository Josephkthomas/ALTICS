import React, { useRef, useState, useEffect, useCallback } from 'react';
import './ProblemSection.css';
import StepRail from './StepRail';
import TextPanel from './TextPanel';
import CardStack from './CardStack';
import CounterBadge from './CounterBadge';

export default function ProblemSection() {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [hasEntered, setHasEntered] = useState(false);

    // Scroll-driven step calculation
    useEffect(() => {
        const handleScroll = () => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const viewportHeight = window.innerHeight;

            // scrollableDistance = how many pixels of scrolling happen while sticky
            const scrollableDistance = sectionHeight - viewportHeight;
            // scrolled = how far past the top of the section we've scrolled
            const scrolled = -rect.top;
            const scrollProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

            // Reveal content when the section is ~1/3 visible in the viewport
            if (rect.top < viewportHeight * 0.67 && !hasEntered) {
                setHasEntered(true);
            }

            // Map 0-1 progress to 4 steps (0,1,2,3)
            const totalSteps = 4;
            const stepFloat = scrollProgress * totalSteps;
            const step = Math.min(totalSteps - 1, Math.floor(stepFloat));
            const withinStep = stepFloat - step;

            setActiveIndex(step);
            setProgress(Math.min(1, withinStep));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasEntered]);

    const goTo = useCallback(() => {}, []); // no-op, scroll controls everything

    return (
        <section
            ref={sectionRef}
            className="problem-section"
            aria-label="The four problems we solve"
        >
            <div className="problem-sticky">
                {/* Noise Texture Background */}
                <div className="problem-noise"></div>

                <div className="problem-container">

                    {/* Section Header — spans full width */}
                    <div
                        className="transition-all duration-500 ease-out"
                        style={{
                            gridColumn: '1 / -1',
                            opacity: hasEntered ? 1 : 0,
                            transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
                        }}
                    >
                        <span className="problem-eyebrow problem-text-accent-amber block mb-3">— THE HIDDEN PROBLEM</span>
                        <h2 className="problem-main-headline problem-text-primary">
                            Invisible failures. <span className="problem-text-accent-orange">Real costs.</span>
                        </h2>
                    </div>

                    {/* Column 1: Step Rail */}
                    <div className="hidden md:block">
                        <StepRail
                            activeIndex={activeIndex}
                            progress={progress}
                            hasEntered={hasEntered}
                            onNavigate={goTo}
                        />
                    </div>

                    {/* Mobile horizontal step rail (hidden on desktop) */}
                    <div className="md:hidden flex justify-between w-full mb-6">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={`h-1 flex-1 mx-1 rounded-full transition-colors ${activeIndex >= i ? 'bg-[#E8622A]' : 'bg-[rgba(240,237,230,0.15)]'}`}
                            />
                        ))}
                    </div>

                    {/* Column 2: Text Panel */}
                    <div className="flex flex-col justify-center z-10 w-full relative min-h-0">
                        <TextPanel activeIndex={activeIndex} hasEntered={hasEntered} />

                        {/* CounterBadge — mobile only, below text */}
                        <div
                            className="problem-bottom-counter"
                            style={{ opacity: hasEntered ? 1 : 0, transition: 'opacity 500ms ease-out 500ms' }}
                        >
                            <CounterBadge
                                activeIndex={activeIndex}
                                progress={progress}
                                onPipClick={goTo}
                            />
                        </div>
                    </div>

                    {/* Column 3: Cards & Counter — hidden on mobile */}
                    <div className="problem-cards-column flex flex-col z-10 w-full relative min-h-0">
                        <div
                            className="flex justify-end mb-3 transition-opacity duration-500 delay-500 flex-shrink-0"
                            style={{ opacity: hasEntered ? 1 : 0 }}
                        >
                            <CounterBadge
                                activeIndex={activeIndex}
                                progress={progress}
                                onPipClick={goTo}
                            />
                        </div>

                        <CardStack
                            activeIndex={activeIndex}
                            hasEntered={hasEntered}
                            onCardClick={goTo}
                            onNext={goTo}
                            onPrev={goTo}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
