import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const navLinks = [
  { name: 'Products', path: '/products' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav-pill${scrolled ? ' nav-pill--scrolled' : ''}`}>
      <Link to="/" className="nav-logo">
        <span className="nav-logo-dot" />
        <span className="nav-logo-text">Altics Monitoring</span>
      </Link>

      <div className="nav-links">
        {navLinks.map((link) => (
          <Link key={link.name} to={link.path} className="nav-link">
            {link.name}
          </Link>
        ))}
      </div>

      <Link to="/contact" className="nav-cta">
        Book a Demo
      </Link>
    </nav>
  );
}
