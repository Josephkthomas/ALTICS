import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Products', path: '/services' },
        { name: 'Solutions', path: '#' },
        { name: 'About', path: '#' },
        { name: 'Contact', path: '#' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? 'bg-[#F7F3EC]/92 backdrop-blur-[12px] border-b border-border shadow-sm'
                        : 'bg-transparent'
                    } ${isMobileMenuOpen ? 'bg-bg border-none' : ''}`}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="font-display font-bold text-lg text-text-primary z-50">
                            Altics Monitoring
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <div className="flex space-x-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="font-body font-medium text-[14px] text-text-primary hover:text-accent-orange transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                            <button className="btn btn-primary text-[14px] py-2.5 px-5">
                                Book a Demo
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center z-50">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-text-primary hover:text-accent-orange focus:outline-none p-2"
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-bg z-40 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } md:hidden`}
            >
                <div className="flex flex-col h-full pt-28 px-page-padding-mobile">
                    <div className="flex flex-col space-y-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="font-display font-bold text-3xl text-text-primary hover:text-accent-orange transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-auto pb-12">
                        <button className="btn btn-primary w-full text-lg py-4">
                            Book a Demo
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
