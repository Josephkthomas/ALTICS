import React from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const CTABand = () => {
  const [ref, isVisible] = useIntersectionObserver(0.15);

  return (
    <section
      ref={ref}
      style={{ background: 'var(--color-accent-orange)' }}
      className="section-padding"
    >
      <div
        className="container-custom"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h2
          className="font-display font-extrabold leading-tight mb-6"
          style={{
            fontSize: 'clamp(36px, 4vw, 56px)',
            color: '#FFFFFF',
          }}
        >
          Your infrastructure is running right now.
          <br />
          Is anyone watching it?
        </h2>

        <p
          className="font-body text-[17px] mb-10"
          style={{
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '65ch',
          }}
        >
          Schedule a call with our team and see exactly what Altics Monitoring can see on your network today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/contact"
            className="btn text-[14px] py-3 px-6 font-body font-medium"
            style={{
              background: '#FFFFFF',
              color: 'var(--color-accent-orange)',
              borderRadius: 'var(--radius-button)',
            }}
          >
            Request a Demo
          </Link>
          <Link
            to="/services"
            className="btn text-[14px] py-3 px-6 font-body font-medium"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-button)',
            }}
          >
            Explore Solutions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABand;
