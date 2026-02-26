import React from 'react';
import { Link } from 'react-router-dom';

const BentoCard = ({ eyebrow, title, description, href, children, className = '' }) => {
  return (
    <Link
      to={href}
      className={`bento-card group flex flex-col p-7 ${className}`}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
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
      {/* Eyebrow */}
      <span
        className="font-display font-semibold text-[11px] tracking-[0.08em] uppercase mb-4"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        — {eyebrow}
      </span>

      {/* SVG area */}
      <div className="flex-1 flex items-center justify-center" style={{ minHeight: '160px' }}>
        {children}
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold text-[24px] leading-tight mt-auto mb-2"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="font-body text-[15px] leading-[1.6] mb-4"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {description}
      </p>

      {/* Learn more link */}
      <span
        className="font-body font-medium text-[14px]"
        style={{ color: 'var(--color-accent-orange)' }}
      >
        Learn more →
      </span>
    </Link>
  );
};

export default BentoCard;
