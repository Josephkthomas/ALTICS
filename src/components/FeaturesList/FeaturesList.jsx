import React, { useState } from 'react';
import FeaturePanel from './FeaturePanel';

const tabs = [
  {
    label: 'RFTM',
    features: [
      'Real-time fault localisation',
      'Continuous OTDR diagnostics',
      'Proactive maintenance alerts',
      'Scalable to 1,000 OTDR units',
      'Reduced OPEX and repair time',
    ],
  },
  {
    label: 'PIDS',
    features: [
      'Fibre optic used as physical sensor',
      'Vibration and pressure detection',
      'Cut attempt detection',
      'Alerts to central monitoring station',
      'Mobile device notifications',
    ],
  },
  {
    label: 'IoT',
    features: [
      'Temperature and humidity monitoring',
      'Water and gas level sensors',
      'Real-time location tracking',
      'Energy consumption monitoring',
      'Parking management',
    ],
  },
  {
    label: 'Nova Context',
    features: [
      'Digital twin network topology',
      'E2E inventory and alarm view',
      'Anomaly detection and KPI tracking',
      'Firewall analysis and vulnerability detection',
      'Service delivery automation',
    ],
  },
];

const FeaturesList = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="section-padding" style={{ background: 'var(--color-bg)' }}>
      <div className="container-custom">
        <span className="eyebrow">— CAPABILITIES</span>
        <h2
          className="font-display font-bold leading-tight mb-12"
          style={{ fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--color-text-primary)' }}
        >
          What each solution actually does.
        </h2>

        {/* Desktop tab strip */}
        <div className="hidden md:flex gap-8 border-b" style={{ borderColor: 'var(--color-border)' }}>
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className="font-body font-medium text-[14px] uppercase pb-3 relative transition-colors duration-[200ms]"
              style={{
                color: activeTab === i ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {tab.label}
              {activeTab === i && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--color-accent-orange)',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile select dropdown */}
        <div className="md:hidden mb-6">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(Number(e.target.value))}
            className="w-full font-body font-medium text-[14px] p-3 rounded-[8px]"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border-strong)',
              color: 'var(--color-text-primary)',
            }}
          >
            {tabs.map((tab, i) => (
              <option key={tab.label} value={i}>{tab.label}</option>
            ))}
          </select>
        </div>

        {/* Panel with cross-fade */}
        <div
          key={activeTab}
          style={{
            animation: 'fade-up 200ms cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <FeaturePanel
            features={tabs[activeTab].features}
            productLabel={tabs[activeTab].label}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;
