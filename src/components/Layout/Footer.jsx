import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-inversion-bg text-inversion-text pt-section-mobile lg:pt-section pb-12">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Logo & Info */}
                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/" className="font-display font-bold text-2xl text-white mb-6 block">
                            Altics Monitoring
                        </Link>
                        <p className="font-body text-[15px] text-text-tertiary mb-8 max-w-sm">
                            Zero blind spots. Zero downtime. Precision monitoring for critical infrastructure.
                        </p>
                    </div>

                    {/* Products */}
                    <div>
                        <span className="eyebrow text-accent-amber mb-6">— PRODUCTS</span>
                        <ul className="space-y-4 font-body text-[15px] font-medium text-text-tertiary">
                            <li>
                                <Link to="/rftm" className="hover:text-white transition-colors">
                                    RFTM (Fiber Monitoring)
                                </Link>
                            </li>
                            <li>
                                <Link to="/pids" className="hover:text-white transition-colors">
                                    PIDS (Perimeter Detection)
                                </Link>
                            </li>
                            <li>
                                <Link to="/iot" className="hover:text-white transition-colors">
                                    IoT Sensor Networks
                                </Link>
                            </li>
                            <li>
                                <Link to="/nova-context" className="hover:text-white transition-colors">
                                    Nova Context
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div>
                        <span className="eyebrow text-accent-amber mb-6">— SOLUTIONS</span>
                        <ul className="space-y-4 font-body text-[15px] font-medium text-text-tertiary">
                            <li>
                                <Link to="#" className="hover:text-white transition-colors">
                                    Telecommunications
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-white transition-colors">
                                    Critical Infrastructure
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-white transition-colors">
                                    Smart Cities
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-white transition-colors">
                                    Data Centers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <span className="eyebrow text-accent-amber mb-6">— COMPANY</span>
                        <ul className="space-y-4 font-body text-[15px] font-medium text-text-tertiary">
                            <li>
                                <Link to="#" className="hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-white transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[rgba(240,237,230,0.08)] flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[13px] font-mono text-text-tertiary">
                    <p>© {new Date().getFullYear()} Altics Monitoring. Built by Alphalink Technologies.</p>
                    <div className="flex space-x-6">
                        <Link to="#" className="hover:text-white transition-colors">LinkedIn</Link>
                        <Link to="#" className="hover:text-white transition-colors">Twitter</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
