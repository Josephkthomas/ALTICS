import React from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
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
  },
  {
    eyebrow: 'PIDS',
    title: 'Your perimeter, always watching.',
    description: 'Fibre optic cable as a physical intrusion sensor. No breach goes undetected.',
    href: '/pids',
    Illustration: PIDSIllustration,
    gridClass: 'bento-card-pids',
  },
  {
    eyebrow: 'NOVA CONTEXT',
    title: 'A digital twin of your entire network.',
    description: 'End-to-end monitoring, impact analysis, and root cause — unified in one topology view.',
    href: '/nova-context',
    Illustration: NovaIllustration,
    gridClass: 'bento-card-nova',
  },
  {
    eyebrow: 'IOT MONITORING',
    title: 'Live data from every remote asset.',
    description: 'Temperature, level, motion, water, gas — all in one operational view.',
    href: '/iot',
    Illustration: IoTIllustration,
    gridClass: 'bento-card-iot',
  },
];

const BentoCard = ({ eyebrow, title, description, href, Illustration, gridClass, delay }) => {
  const [ref, isVisible] = useIntersectionObserver(0.1);

  return (
    <div
      ref={ref}
      className={gridClass}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 400ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 400ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <Link
        to={href}
        className="group block h-full"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          background: 'var(--color-surface-tint)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',
          textDecoration: 'none',
          transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-accent-orange)';
          e.currentTarget.style.boxShadow = '0 0 0 1px var(--color-accent-orange), 0 8px 32px var(--color-orange-glow)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Illustration area */}
        <div
          style={{
            flex: '1 1 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            minHeight: '180px',
          }}
        >
          <div style={{ width: '100%', maxWidth: '200px', aspectRatio: '1 / 1' }}>
            <Illustration />
          </div>
        </div>

        {/* Copy */}
        <div style={{ padding: '0 24px 28px 24px' }}>
          <span
            className="font-display font-semibold"
            style={{
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              display: 'block',
              marginBottom: '10px',
            }}
          >
            — {eyebrow}
          </span>
          <h3
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(18px, 1.8vw, 22px)',
              lineHeight: 1.25,
              color: 'var(--color-text-primary)',
              marginBottom: '8px',
            }}
          >
            {title}
          </h3>
          <p
            className="font-body"
            style={{
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              marginBottom: '14px',
              maxWidth: '38ch',
            }}
          >
            {description}
          </p>
          <span
            className="font-body font-medium"
            style={{
              fontSize: '13px',
              color: 'var(--color-accent-orange)',
            }}
          >
            Learn more →
          </span>
        </div>
      </Link>
    </div>
  );
};

const ProductsBento = () => {
  return (
    <section className="section-padding" style={{ background: 'var(--color-bg)' }}>
      <div className="container-custom">
        <span className="eyebrow">— OUR SOLUTION</span>
        <h2
          className="font-display font-bold leading-tight mb-16"
          style={{ fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--color-text-primary)' }}
        >
          Four ways we make the invisible visible.
        </h2>

        <div className="bento-grid">
          {products.map((product, i) => (
            <BentoCard
              key={product.eyebrow}
              {...product}
              delay={i * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsBento;
