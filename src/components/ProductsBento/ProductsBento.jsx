import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RFTMIllustration from '../Hero/illustrations/RFTMIllustration';
import NovaIllustration from '../Hero/illustrations/NovaIllustration';
import PIDSIllustration from '../Hero/illustrations/PIDSIllustration';
import IoTIllustration from '../Hero/illustrations/IoTIllustration';
import './ProductsBento.css';

const products = [
  {
    eyebrow: 'RFTM',
    title: 'Real-time fault detection for P2P fibre networks.',
    description: 'Continuous OTDR diagnostics that find faults before they cause outages. Monitor every strand, every second.',
    href: '/rftm',
    Illustration: RFTMIllustration,
    gridClass: 'bento-card-rftm',
    highlights: [
      'Sub-second fault detection across every fibre strand',
      'Automated root-cause analysis reduces MTTR by 80%',
      'Preventive alerts before outages reach customers',
    ],
  },
  {
    eyebrow: 'PIDS',
    title: 'Your perimeter, always watching.',
    description: 'Fibre optic cable as a physical intrusion sensor. No breach goes undetected.',
    href: '/pids',
    Illustration: PIDSIllustration,
    gridClass: 'bento-card-pids',
    highlights: [
      'Detects intrusion, vibration, and tampering in real time',
      'Covers perimeters up to 80 km with a single sensor unit',
      'AI-driven classification eliminates false positives',
    ],
  },
  {
    eyebrow: 'NOVA CONTEXT',
    title: 'A digital twin of your entire network.',
    description: 'End-to-end monitoring, impact analysis, and root cause — unified in one topology view.',
    href: '/nova-context',
    Illustration: NovaIllustration,
    gridClass: 'bento-card-nova',
    highlights: [
      'Topology-aware impact analysis in seconds, not hours',
      'Correlates alarms across layers for true root cause',
      'Full asset lifecycle from planning to decommission',
    ],
  },
  {
    eyebrow: 'IOT MONITORING',
    title: 'Live data from every remote asset.',
    description: 'Temperature, level, motion, water, gas — all in one operational view.',
    href: '/iot',
    Illustration: IoTIllustration,
    gridClass: 'bento-card-iot',
    highlights: [
      'Supports 50+ sensor types out of the box',
      'Threshold alerts with escalation workflows built in',
      'Dashboards customised per site, region, or asset type',
    ],
  },
];

// Clockwise highlight order: Top-Left(RFTM=0) → Top-Right(PIDS=1) → Bottom-Right(IoT=3) → Bottom-Left(Nova=2)
const CLOCKWISE_ORDER = [0, 1, 3, 2];

export default function ProductsBento() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [activatedCards, setActivatedCards] = useState(() => new Set());
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Reveal content when section is ~1/3 visible
      if (rect.top < viewportHeight * 0.67 && !hasEntered) {
        setHasEntered(true);
      }

      // Scroll-driven step calculation (same pattern as ProblemSection)
      const scrollableDistance = sectionHeight - viewportHeight;
      const scrolled = -rect.top;
      const scrollProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      const totalSteps = 4;
      const stepFloat = scrollProgress * totalSteps;
      const step = Math.min(totalSteps - 1, Math.floor(stepFloat));

      setActiveStep(step);

      // On mobile: sequential order. On desktop: clockwise order.
      const cardIndex = isMobile ? step : CLOCKWISE_ORDER[step];
      setActivatedCards(prev => {
        if (prev.has(cardIndex)) return prev;
        const next = new Set(prev);
        next.add(cardIndex);
        return next;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered, isMobile]);

  const activeCardIndex = isMobile ? activeStep : CLOCKWISE_ORDER[activeStep];

  return (
    <section ref={sectionRef} className="bento-section" aria-label="Our solutions">
      <div className="bento-sticky">
        <div className="bento-content">
          {/* Header */}
          <div
            className="bento-header transition-all duration-500 ease-out"
            style={{
              opacity: hasEntered ? 1 : 0,
              transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            <span className="eyebrow">— OUR SOLUTION</span>
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'var(--color-text-primary)' }}
            >
              Four ways we make the invisible visible.
            </h2>
          </div>

          {/* Step pips (mobile only) */}
          {isMobile && (
            <div className="bento-step-rail">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={`bento-step-pip ${activeStep >= i ? 'bento-step-pip--active' : ''}`} />
              ))}
            </div>
          )}

          {/* Bento Grid */}
          <div className="bento-grid">
            {products.map((product, i) => {
              const isHighlighted = activeCardIndex === i;
              const isActivated = isMobile ? hasEntered : activatedCards.has(i);
              const isMobileActive = isMobile && activeCardIndex === i;
              const Illustration = product.Illustration;

              return (
                <div
                  key={product.eyebrow}
                  className={`${product.gridClass} bento-card-wrapper ${isHighlighted ? 'bento-highlight' : ''} ${isMobileActive ? 'bento-mobile-active' : ''}`}
                  style={isMobile ? {} : {
                    opacity: hasEntered ? 1 : 0,
                    transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '500ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <Link to={product.href} className="bento-card-link">
                    <div className="bento-card-illustration">
                      <div className="bento-card-illustration-inner">
                        <Illustration animate={isActivated} />
                      </div>
                    </div>
                    <div className="bento-card-copy">
                      <span className="bento-card-eyebrow font-display font-semibold">
                        — {product.eyebrow}
                      </span>
                      <h3 className="bento-card-title font-display font-bold">
                        {product.title}
                      </h3>
                      <p className="bento-card-desc font-body">
                        {product.description}
                      </p>
                      {product.highlights && (
                        <ul className="bento-card-bullets">
                          {product.highlights.map((text, hi) => (
                            <li key={hi} className="bento-card-bullet">
                              <svg className="bento-card-bullet-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4.5L5.5 10.5L3 8" />
                              </svg>
                              <span>{text}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <span className="bento-card-cta font-body font-medium">
                        Learn more →
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
