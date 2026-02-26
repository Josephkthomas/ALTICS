import React from 'react';

const logos = [
  'TeleCorp', 'MetroGrid', 'AeroTech', 'CityWater', 'NOC Global',
  'FibreMax', 'SecureNet', 'GridPoint',
];

const LogoTicker = () => {
  return (
    <section style={{ background: 'var(--color-bg)' }}>
      <div className="container-custom pt-8 pb-2">
        <span className="font-display font-semibold text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--color-text-secondary)' }}>
          — TRUSTED BY
        </span>
      </div>
      <div
        className="overflow-hidden"
        style={{ height: '64px' }}
      >
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            animation: 'ticker-scroll 30s linear infinite',
            width: 'max-content',
            height: '64px',
          }}
        >
          {/* Duplicate the list for seamless loop */}
          {[...logos, ...logos].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 mx-8 lg:mx-12 font-display font-bold text-[18px] select-none"
              style={{
                color: 'var(--color-text-secondary)',
                filter: 'grayscale(100%) opacity(0.5)',
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;
