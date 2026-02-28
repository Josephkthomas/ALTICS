import { Link } from 'react-router-dom';
import './Footer.css';

const productLinks = [
  { name: 'RFTM', path: '/rftm' },
  { name: 'PIDS', path: '/pids' },
  { name: 'IoT Monitoring', path: '/iot' },
  { name: 'Nova Context', path: '/nova-context' },
];

const companyLinks = [
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="closing-footer">
      <div className="closing-footer__inner container-custom">
        <div className="closing-footer__grid">
          {/* Brand */}
          <div className="closing-footer__brand">
            <Link
              to="/"
              className="font-display font-bold text-[18px] block mb-4"
              style={{ color: 'var(--color-inversion-text)' }}
            >
              Altics Monitoring
            </Link>
            <p className="font-body text-[14px]" style={{ color: 'rgba(240, 237, 230, 0.4)' }}>
              Intelligent monitoring for critical infrastructure.
            </p>
          </div>

          {/* Products */}
          <div>
            <span className="closing-footer__col-title font-display font-semibold">Products</span>
            <ul className="flex flex-col gap-4">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="closing-footer__link font-body">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <span className="closing-footer__col-title font-display font-semibold">Company</span>
            <ul className="flex flex-col gap-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="closing-footer__link font-body">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span className="closing-footer__col-title font-display font-semibold">Contact</span>
            <ul className="flex flex-col gap-4">
              <li className="closing-footer__link font-body" style={{ cursor: 'default' }}>info@altics.ae</li>
              <li className="closing-footer__link font-body" style={{ cursor: 'default' }}>+971 4 000 0000</li>
              <li className="closing-footer__link font-body" style={{ cursor: 'default' }}>Dubai, UAE</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="closing-footer__bottom">
          <p className="closing-footer__copyright font-body">
            &copy; 2026 Altics Monitoring. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="closing-footer__social-link font-body">LinkedIn</a>
            <a href="mailto:info@altics.ae" className="closing-footer__social-link font-body">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
