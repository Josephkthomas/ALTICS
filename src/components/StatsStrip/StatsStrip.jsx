import React from 'react';
import CountUp from './CountUp';

const stats = [
  { label: 'OTDR UNITS', target: 1000, suffix: '', descriptor: 'Managed from one dashboard' },
  { label: 'NETWORK UPTIME', target: 99, suffix: '.3%', descriptor: 'Across monitored links' },
  { label: 'FAULT DETECTION', target: 2, prefix: '<', suffix: ' MIN', descriptor: 'From fault to alert' },
  { label: 'MONITORING DOMAINS', target: 4, suffix: '', descriptor: 'Fibre, perimeter, IoT, network ops' },
];

const StatsStrip = () => {
  return (
    <section
      style={{
        background: 'var(--color-inversion-bg)',
        paddingTop: 'var(--space-section-mobile)',
        paddingBottom: '0',
      }}
      className="lg:pt-[120px]"
    >
      <div className="container-custom">
        <span
          className="font-display font-semibold text-[12px] tracking-[0.08em] uppercase block mb-12"
          style={{ color: 'var(--color-accent-amber)' }}
        >
          — PROVEN AT SCALE
        </span>

        {/* Stats grid — 4 columns desktop, 2x2 mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span
                className="font-display font-semibold text-[11px] tracking-[0.08em] uppercase mb-3"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {stat.label}
              </span>
              <span
                className="font-mono font-medium leading-none mb-3"
                style={{
                  fontSize: 'clamp(40px, 5vw, 72px)',
                  color: 'var(--color-accent-amber)',
                }}
              >
                <CountUp
                  target={stat.target}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix}
                />
              </span>
              <span
                className="font-body text-[14px]"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {stat.descriptor}
              </span>
            </div>
          ))}
        </div>

        {/* Descriptor sentence */}
        <p
          className="font-body text-[17px] text-center pb-16"
          style={{ color: 'rgba(240, 237, 230, 0.7)' }}
        >
          Deployed across critical infrastructure networks in the UAE and the wider region.
        </p>
      </div>
    </section>
  );
};

export default StatsStrip;
