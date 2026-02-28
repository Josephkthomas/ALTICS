import React, { useState, useRef, useEffect, useCallback } from 'react';
import EngageContent from './EngageContent';
import ConsultationSVG from './illustrations/ConsultationSVG';
import SiteSurveySVG from './illustrations/SiteSurveySVG';
import DeploymentSVG from './illustrations/DeploymentSVG';
import MonitoringSVG from './illustrations/MonitoringSVG';
import './HowWeEngage.css';

const STEPS = [
  {
    number: '01',
    title: 'Discovery & Consultation',
    shortDesc: 'We assess your infrastructure needs.',
    fullDesc: 'You tell us what you\u2019re protecting. We assess your infrastructure across fiber, perimeter, IoT, or network operations and identify the right monitoring approach.',
    illustration: ConsultationSVG,
    label: '01 \u2014 Discovery',
    highlights: [
      { icon: 'search', text: 'Full infrastructure audit across fiber, perimeter, IoT & network assets' },
      { icon: 'shield', text: 'Risk profiling tailored to your unique operational environment' },
      { icon: 'target', text: 'Custom monitoring strategy \u2014 never a one-size-fits-all package' },
    ],
  },
  {
    number: '02',
    title: 'Site Survey & System Design',
    shortDesc: 'We map your physical environment.',
    fullDesc: 'Our engineers visit your site, map the physical infrastructure, and design a monitoring architecture tailored to your environment and operational requirements.',
    illustration: SiteSurveySVG,
    label: '02 \u2014 Survey',
    highlights: [
      { icon: 'mapPin', text: 'On-site engineering visit to map your physical infrastructure' },
      { icon: 'blueprint', text: 'Bespoke monitoring architecture designed around your environment' },
      { icon: 'link', text: 'Integration blueprint aligned with your existing workflows' },
    ],
  },
  {
    number: '03',
    title: 'Deployment & Integration',
    shortDesc: 'We install and connect to your NOC.',
    fullDesc: 'We install sensors, configure the platform, and integrate seamlessly with your existing operations centre. Your system comes online with zero disruption.',
    illustration: DeploymentSVG,
    label: '03 \u2014 Deploy',
    highlights: [
      { icon: 'zap', text: 'Zero-disruption installation \u2014 your operations never pause' },
      { icon: 'plug', text: 'Seamless NOC integration with your existing toolchain' },
      { icon: 'check', text: 'Full system validation and sign-off before going live' },
    ],
  },
  {
    number: '04',
    title: 'Monitoring & Ongoing Support',
    shortDesc: '24/7 continuous monitoring goes live.',
    fullDesc: 'Continuous monitoring goes live around the clock. Proactive alerts, regular reporting, and a dedicated support line \u2014 we watch so you don\u2019t have to.',
    illustration: MonitoringSVG,
    label: '04 \u2014 Monitor',
    highlights: [
      { icon: 'radar', text: '24/7 continuous monitoring with proactive threat alerting' },
      { icon: 'chart', text: 'Regular reporting, analytics & performance insights' },
      { icon: 'headset', text: 'Dedicated support line with guaranteed response times' },
    ],
  },
];

const TOTAL_STEPS = STEPS.length;
const TIMER_DURATION = 5000;

export default function HowWeEngage() {
  const sectionRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Refs for high-frequency rAF values (avoid re-renders)
  const timerStartRef = useRef(null);
  const timerFillRef = useRef(0);
  const scrollFillRef = useRef(0);
  const scrollStepRef = useRef(0);
  const activeIndexRef = useRef(0);
  const isInViewportRef = useRef(false);
  const wasOutOfViewportRef = useRef(false);
  const pauseElapsedRef = useRef(0);
  const rafRef = useRef(null);
  const lastQuantizedRef = useRef(0);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Scroll handler — passive, writes to refs only
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = sectionHeight - viewportHeight;

      // Entry trigger
      if (rect.top < viewportHeight * 0.67 && !hasEntered) {
        setHasEntered(true);
      }

      // Viewport check for timer pause (must run on all viewports so timer works)
      const inViewport = rect.top < viewportHeight && rect.bottom > 0;
      if (!inViewport && isInViewportRef.current) {
        wasOutOfViewportRef.current = true;
      }
      isInViewportRef.current = inViewport;

      // Map scroll to step + progress
      const scrolled = -rect.top;
      const scrollProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      const stepFloat = scrollProgress * TOTAL_STEPS;
      const scrollStep = Math.min(TOTAL_STEPS - 1, Math.floor(stepFloat));
      const withinStep = stepFloat - scrollStep;

      scrollStepRef.current = scrollStep;
      scrollFillRef.current = Math.min(1, withinStep);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered, isMobile]);

  // Dual-track rAF loop
  useEffect(() => {
    if (!hasEntered) return;

    const tick = (timestamp) => {
      // --- Timer track ---
      if (!prefersReducedMotion.current && isInViewportRef.current) {
        // Handle pause/resume
        if (wasOutOfViewportRef.current) {
          // Re-entering viewport: adjust timer start to account for pause
          if (timerStartRef.current !== null) {
            timerStartRef.current = timestamp - pauseElapsedRef.current;
          }
          wasOutOfViewportRef.current = false;
        }

        if (timerStartRef.current === null) {
          timerStartRef.current = timestamp;
        }

        const elapsed = timestamp - timerStartRef.current;
        pauseElapsedRef.current = elapsed;
        timerFillRef.current = Math.min(1, elapsed / TIMER_DURATION);
      }

      // --- Combine tracks ---
      const scrollStep = scrollStepRef.current;
      const scrollFill = scrollFillRef.current;
      const timerFill = timerFillRef.current;
      let effectiveIndex = activeIndexRef.current;
      let effectiveFill;

      // Scroll only wins if it's AHEAD of the current position.
      // If scroll is behind (user hasn't scrolled but timer advanced), timer holds.
      if (scrollStep > effectiveIndex) {
        effectiveIndex = scrollStep;
        timerStartRef.current = timestamp;
        timerFillRef.current = 0;
        pauseElapsedRef.current = 0;
        effectiveFill = scrollFill;
      } else if (scrollStep === effectiveIndex) {
        effectiveFill = Math.max(timerFill, scrollFill);
      } else {
        // Scroll is behind timer — timer keeps its position
        effectiveFill = timerFill;
      }

      // Timer completed this step — advance (but NOT past last step)
      if (effectiveFill >= 1.0 && effectiveIndex < TOTAL_STEPS - 1) {
        effectiveIndex += 1;
        timerStartRef.current = timestamp;
        timerFillRef.current = 0;
        pauseElapsedRef.current = 0;
        effectiveFill = 0;
      }

      // On last step with fill complete — hold at 100%, stop timer
      if (effectiveIndex === TOTAL_STEPS - 1 && effectiveFill >= 1.0) {
        effectiveFill = 1.0;
        timerStartRef.current = null;
      }

      // Commit to React state only when changed
      if (effectiveIndex !== activeIndexRef.current) {
        activeIndexRef.current = effectiveIndex;
        setActiveIndex(effectiveIndex);
        lastQuantizedRef.current = 0;
        setFillProgress(0);
      } else {
        const quantized = Math.round(effectiveFill * 100) / 100;
        if (quantized !== lastQuantizedRef.current) {
          lastQuantizedRef.current = quantized;
          setFillProgress(quantized);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hasEntered]);

  // Click-to-jump handler
  const goToStep = useCallback((index) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
    setFillProgress(0);
    lastQuantizedRef.current = 0;
    timerStartRef.current = null;
    timerFillRef.current = 0;
    pauseElapsedRef.current = 0;
    // Sync scroll refs so the rAF loop doesn't immediately override the click
    scrollStepRef.current = index;
    scrollFillRef.current = 0;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="engage-section"
      aria-label="How we engage — four-step partnership process"
    >
      <div className="engage-sticky">
        <EngageContent
          steps={STEPS}
          activeIndex={activeIndex}
          fillProgress={fillProgress}
          overallProgress={(activeIndex + fillProgress) / TOTAL_STEPS}
          hasEntered={hasEntered}
          onStepClick={goToStep}
          isMobile={isMobile}
        />
      </div>
    </section>
  );
}
