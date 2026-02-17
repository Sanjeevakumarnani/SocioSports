import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../services/api';

const SimpleFooter = () => {
    const location = useLocation();
    const [settings, setSettings] = useState({
        socials: {
            instagram: 'https://instagram.com/sociosports',
            linkedin: 'https://linkedin.com/company/sociosports',
            twitter: '#',
            youtube: '#'
        },
        contact: {
            email: 'hello@sociosports.in',
            phone: '+91 98765 43210',
            address: 'Hitech City, Hyderabad'
        }
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await api.cms.get('global-settings');
                if (data && data.content) {
                    setSettings(prev => ({ ...prev, ...JSON.parse(data.content) }));
                }
            } catch (e) {
                console.error('Failed to load global settings', e);
            }
        };
        fetchSettings();
    }, []);

    const footerLinks = {
        Platform: [
            { label: 'Athletes', href: '/athletes' },
            { label: 'Coaches', href: '/coaches' },
            { label: 'Tournaments', href: '/events' },
            { label: 'Market', href: '/market' },
            { label: 'Community', href: '/community' },
            { label: 'Resources', href: '/resources' },
        ],
        Company: [
            { label: 'About Us', href: '/about' },
            { label: 'Careers', href: '/jobs' },
            { label: 'Blog', href: '/blog' },
            { label: 'Partners', href: '/vendors' },
        ],
        Support: [
            { label: 'Contact Us', href: '/contact' },
            { label: 'Privacy Policy', href: '/privacy-policy' },
            { label: 'Terms of Service', href: '/terms-conditions' },
            { label: 'Child Safety', href: '/child-safety' },
        ],
    };

    const scrollToSection = (href: string) => {
        if (href.startsWith('/#')) {
            const sectionId = href.replace('/#', '');
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <footer className="relative bg-[var(--bg-primary)] border-t border-[var(--border)]">
            <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        {/* Brand */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-2 mb-3" role="img" aria-label="SocioSports Logo">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: 'var(--accent-orange)' }}
                                    aria-hidden="true"
                                >
                                    <span className="text-white font-black text-base">S</span>
                                </div>
                                <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>SocioSports</span>
                            </div>
                            <p className="text-sm max-w-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                                India&apos;s sports ecosystem platform. Connecting athletes, coaches,
                                and organizers to build a stronger sports community.
                            </p>

                            {/* Social Icons */}
                            <div className="flex gap-3 mb-4">
                                {settings.socials.instagram && (
                                    <a href={settings.socials.instagram} target="_blank" rel="noopener noreferrer"
                                        aria-label="Follow SocioSports on Instagram"
                                        className="text-[var(--text-secondary)] hover:text-[var(--accent-orange)] transition-colors">
                                        <Instagram className="w-4 h-4" />
                                    </a>
                                )}
                                {settings.socials.linkedin && (
                                    <a href={settings.socials.linkedin} target="_blank" rel="noopener noreferrer"
                                        aria-label="Follow SocioSports on LinkedIn"
                                        className="text-[var(--text-secondary)] hover:text-[var(--accent-orange)] transition-colors">
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                )}
                                {settings.socials.twitter && settings.socials.twitter !== '#' && (
                                    <a href={settings.socials.twitter} target="_blank" rel="noopener noreferrer"
                                        aria-label="Follow SocioSports on Twitter"
                                        className="text-[var(--text-secondary)] hover:text-[var(--accent-orange)] transition-colors">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                )}
                                {settings.socials.youtube && settings.socials.youtube !== '#' && (
                                    <a href={settings.socials.youtube} target="_blank" rel="noopener noreferrer"
                                        aria-label="Follow SocioSports on Youtube"
                                        className="text-[var(--text-secondary)] hover:text-[var(--accent-orange)] transition-colors">
                                        <Youtube className="w-4 h-4" />
                                    </a>
                                )}
                            </div>

                            <div className="flex gap-4 mt-6">
                                <Link to="/mobile-app" className="hover:opacity-80 transition-opacity">
                                    <img src="/images/app-store-badge.svg" alt="Download on the App Store" className="h-10 w-auto" />
                                </Link>
                                <Link to="/mobile-app" className="hover:opacity-80 transition-opacity">
                                    <img src="/images/google-play-badge.svg" alt="Get it on Google Play" className="h-10 w-auto" />
                                </Link>
                            </div>
                        </div>

                        {/* Links */}
                        {Object.entries(footerLinks).map(([title, links]) => (
                            <div key={title}>
                                <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h4>
                                <ul className="space-y-2">
                                    {links.map((link) => {
                                        const isActive = link.href === '/'
                                            ? location.pathname === '/'
                                            : link.href.startsWith('/') && !link.href.startsWith('/#') && location.pathname.startsWith(link.href);

                                        return (
                                            <li key={link.label}>
                                                {link.href.startsWith('/#') ? (
                                                    <button
                                                        onClick={() => scrollToSection(link.href)}
                                                        className="text-sm transition-colors hover:text-[var(--accent-orange)]"
                                                        style={{ color: 'var(--text-secondary)' }}
                                                    >
                                                        {link.label}
                                                    </button>
                                                ) : (
                                                    <Link
                                                        to={link.href}
                                                        aria-current={isActive ? 'page' : undefined}
                                                        className={`text-sm transition-colors hover:text-[var(--accent-orange)] ${isActive ? 'font-bold' : ''}`}
                                                        style={{ color: isActive ? 'var(--accent-orange)' : 'var(--text-secondary)' }}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-3">
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            © 2026 SocioSports. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link to="/privacy-policy" className="text-sm transition-colors hover:text-[var(--accent-orange)]" style={{ color: 'var(--text-secondary)' }}>
                                Privacy Policy
                            </Link>
                            <Link to="/terms-conditions" className="text-sm transition-colors hover:text-[var(--accent-orange)]" style={{ color: 'var(--text-secondary)' }}>
                                Terms of Service
                            </Link>
                            <Link to="/child-safety" className="text-sm transition-colors hover:text-[var(--accent-orange)]" style={{ color: 'var(--text-secondary)' }}>
                                Child Safety
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default SimpleFooter;
