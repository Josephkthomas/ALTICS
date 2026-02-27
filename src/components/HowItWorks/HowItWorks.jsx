import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import FlowDiagramSVG from './FlowDiagramSVG';

const HowItWorks = () => {
  const [ref, isVisible] = useIntersectionObserver(0.15);

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--color-inversion-bg)',
        paddingTop: 'var(--space-section-mobile)',
        paddingBottom: 'var(--space-section-mobile)',
      }}
      className="lg:py-[120px]"
    >
      <div className="container-custom">
        <span
          className="font-display font-bold text-[11px] lg:text-[13px] tracking-[0.08em] uppercase block mb-6"
          style={{ color: 'var(--color-accent-amber)' }}
        >
          — HOW WE WORK
        </span>

        <h2
          className="font-display font-bold leading-tight mb-16"
          style={{
            fontSize: 'clamp(36px, 4vw, 48px)',
            color: 'var(--color-inversion-text)',
          }}
        >
          From signal to alert in under two minutes.
        </h2>

        <FlowDiagramSVG triggered={isVisible} />
      </div>
    </section>
  );
};

export default HowItWorks;
