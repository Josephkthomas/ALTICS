import React from 'react';

const ProblemNarrative = () => {
  return (
    <section className="section-padding" style={{ background: 'var(--color-bg)' }}>
      <div className="container-custom">
        <span className="eyebrow mb-8">— THE INVISIBLE PROBLEM</span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '240px',
            border: '1px dashed var(--color-border-strong)',
            borderRadius: 'var(--radius-card)',
            background: 'var(--color-surface-tint)',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Problem Narrative — TBD
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProblemNarrative;
