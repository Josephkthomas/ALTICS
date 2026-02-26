import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--color-inversion-bg)' }}>
      <div className="container-custom" style={{ paddingTop: 'var(--space-section-mobile)', paddingBottom: '48px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div>
            <Link
              to="/"
              className="font-display font-bold text-[16px] block mb-4"
              style={{ color: 'var(--color-inversion-text)' }}
            >
              Altics Monitoring
            </Link>
            <p
              className="font-body text-[14px]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Intelligent monitoring for critical infrastructure.
            </p>
          </div>

          {/* Products */}
          <div>
            <span
              className="font-display font-semibold text-[11px] tracking-[0.08em] uppercase block mb-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              PRODUCTS
            </span>
            <ul className="flex flex-col gap-4">
              {[
                { name: 'RFTM', path: '/rftm' },
                { name: 'PIDS', path: '/pids' },
                { name: 'IoT Monitoring', path: '/iot' },
                { name: 'Nova Context', path: '/nova-context' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-body text-[14px] transition-colors duration-[200ms]"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-inversion-text)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <span
              className="font-display font-semibold text-[11px] tracking-[0.08em] uppercase block mb-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              COMPANY
            </span>
            <ul className="flex flex-col gap-4">
              {[
                { name: 'About', path: '#' },
                { name: 'Services', path: '/services' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-body text-[14px] transition-colors duration-[200ms]"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-inversion-text)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span
              className="font-display font-semibold text-[11px] tracking-[0.08em] uppercase block mb-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              CONTACT
            </span>
            <ul className="flex flex-col gap-4 font-body text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>
              <li>info@altics.ae</li>
              <li>+971 4 000 0000</li>
              <li>Dubai, UAE</li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(240, 237, 230, 0.08)' }}
        >
          <p
            className="font-body text-[13px]"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            &copy; 2026 Altics Monitoring. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-body text-[13px] transition-colors duration-[200ms]"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-inversion-text)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
            >
              LinkedIn
            </a>
            <a
              href="mailto:info@altics.ae"
              className="font-body text-[13px] transition-colors duration-[200ms]"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-inversion-text)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
