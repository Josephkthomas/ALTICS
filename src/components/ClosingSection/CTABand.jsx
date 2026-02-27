import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import NetworkCanvas from './NetworkCanvas';
import './CTABand.css';

export default function CTABand() {
  const [sectionRef, isVisible] = useIntersectionObserver(0.15);
  const buttonsRef = useRef(null);

  return (
    <div ref={sectionRef} className="closing-cta">
      <NetworkCanvas buttonsRef={buttonsRef} />

      <div
        className="closing-cta__content container-custom"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 500ms var(--ease-out), transform 500ms var(--ease-out)',
        }}
      >
        <h2 className="closing-cta__headline font-display font-extrabold">
          Your infrastructure is
          <br />
          running right now.
          <br />
          Is anyone
          <br />
          watching it?
        </h2>

        <p className="closing-cta__subline font-body">
          Schedule a call with our team and see exactly what Altics Monitoring
          can see on your network today.
        </p>

        <div ref={buttonsRef} className="closing-cta__buttons">
          <Link
            to="/contact"
            className="closing-cta__btn closing-cta__btn--primary font-body"
          >
            Request a Demo
          </Link>
          <Link
            to="/services"
            className="closing-cta__btn closing-cta__btn--ghost font-body"
          >
            Explore Solutions
          </Link>
        </div>
      </div>
    </div>
  );
}
