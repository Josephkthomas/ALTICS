import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'RFTM', path: '/rftm' },
  { name: 'PIDS', path: '/pids' },
  { name: 'IoT', path: '/iot' },
  { name: 'Nova Context', path: '/nova-context' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-[200ms] ease-out ${
          isScrolled
            ? 'border-b'
            : 'bg-transparent'
        } ${isMobileMenuOpen ? 'bg-[#F7F3EC] border-none' : ''}`}
        style={isScrolled && !isMobileMenuOpen ? {
          background: 'rgba(247, 243, 236, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderColor: 'var(--color-border)',
        } : undefined}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="font-display font-bold text-[18px] z-50"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Altics Monitoring
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="font-body font-medium text-[14px] transition-colors duration-[200ms]"
                    style={{ color: 'var(--color-text-primary)' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-orange)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-text-primary)'}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/contact"
                className="btn btn-primary text-[14px] py-[10px] px-[20px]"
                style={{ letterSpacing: '0.02em' }}
              >
                Request a Demo
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden z-50 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {isMobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="flex flex-col h-full pt-28 px-[20px]">
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-display font-bold text-[32px] transition-colors duration-[200ms]"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="mt-auto pb-12">
            <Link to="/contact" className="btn btn-primary w-full text-lg py-4 justify-center">
              Request a Demo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
