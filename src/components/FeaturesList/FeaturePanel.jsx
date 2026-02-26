import React from 'react';

const FeaturePanel = ({ features, productLabel }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 mt-10">
      {/* Left: feature items */}
      <div className="lg:w-[45%]">
        <ul className="flex flex-col gap-5">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 mt-1"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '2px',
                  background: 'var(--color-accent-amber)',
                }}
              />
              <span
                className="font-body font-medium text-[15px]"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: product visual placeholder */}
      <div
        className="lg:w-[55%] flex items-center justify-center rounded-[16px] p-8"
        style={{
          background: 'var(--color-surface-tint)',
          border: '1px solid var(--color-border)',
          minHeight: '200px',
        }}
      >
        <span
          className="font-mono text-[13px]"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {productLabel} — Capabilities View
        </span>
      </div>
    </div>
  );
};

export default FeaturePanel;
