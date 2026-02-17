import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { gsap } from 'gsap';
import { Download, Home, Dumbbell, Trophy, Users, Newspaper, Truck, Store, Info, Mail, Briefcase, Building2, Network, Search } from 'lucide-react';
import SearchModal from '../components/SearchModal';

// Interactive Emoji Component with Eye Tracking
const InteractiveEmoji = ({ isHovered }: { isHovered: boolean }) => {
  // ... (keeping interactive emoji code as is) ...
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const faceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!faceRef.current) return;
      const rect = faceRef.current.getBoundingClientRect();
      const faceCenterX = rect.left + rect.width / 2;
      const faceCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - faceCenterX;
      const dy = e.clientY - faceCenterY;
      const angle = Math.atan2(dy, dx);
      // Limit eye movement radius
      const distance = Math.min(2, Math.hypot(dx, dy) / 20);

      const px = Math.cos(angle) * distance;
      const py = Math.sin(angle) * distance;

      setPupilPos({ x: px, y: py });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isHovered) {
    return (
      <img
        src="/images/emoji-heart-eyes.png"
        className="w-8 h-8 object-contain animate-in zoom-in duration-300"
        alt="Loving interaction emoji"
      />
    );
  }

  return (
    <div
      ref={faceRef}
      role="img"
      aria-label="Interactive emoji face looking at your cursor"
      className="w-8 h-8 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 relative flex items-center justify-center shadow-inner border border-yellow-600/20"
    >
      <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-sm" aria-hidden="true">
        {/* Eyes (White) - Bigger */}
        <circle cx="9.5" cy="12" r="5.5" fill="white" />
        <circle cx="22.5" cy="12" r="5.5" fill="white" />

        {/* Pupils (Black) - Moving & Bigger */}
        <circle cx={9.5 + pupilPos.x} cy={12 + pupilPos.y} r="3" fill="#1f2937" />
        <circle cx={22.5 + pupilPos.x} cy={12 + pupilPos.y} r="3" fill="#1f2937" />

        {/* Smile */}
        <path
          d="M 8 21 Q 16 27 24 21"
          stroke="#92400e"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGetAppHovered, setIsGetAppHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const { theme } = useTheme();

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Ecosystem', href: '/ecosystem', icon: Network },
    { label: 'Tournaments', href: '/events', icon: Trophy },
    { label: 'Community', href: '/community', icon: Users },
    { label: 'Jobs', href: '/jobs', icon: Briefcase },
    { label: 'Blog', href: '/blog', icon: Newspaper },
    { label: 'Institutions', href: '/institutions', icon: Building2 },
    { label: 'Sports on Wheels', href: '/sports-on-wheels', icon: Truck },
    { label: 'About', href: '/about', icon: Info },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine direction and toggle visibility
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling DOWN
          setIsVisible(false);
        } else {
          // Scrolling UP
          setIsVisible(true);
        }
      } else {
        // Always show at the very top
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 100);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out', onComplete: () => {
            if (navRef.current) {
              navRef.current.style.transform = '';
              navRef.current.style.opacity = '';
            }
          }
        }
      );
    }
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          } ${isScrolled || !isHomePage
            ? 'bg-[var(--bg-primary)]/90 backdrop-blur-lg shadow-lg'
            : theme === 'light'
              ? 'bg-white/85 backdrop-blur-lg shadow-sm border-b border-black/5'
              : 'bg-transparent'
          }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              aria-label="SocioSports Home - Visit the homepage"
              className="flex items-center gap-2 group"
            >
              <img
                src="/images/logo.png"
                alt="SocioSports Logo"
                className="h-10 w-auto object-contain transition-transform transform group-hover:scale-105"
              />
            </Link>

            {/* Responsive Navigation Pill */}
            <div className={`hidden lg:flex items-center gap-1 p-2 rounded-full border backdrop-blur-md transition-all duration-500 ${isHomePage && !isScrolled
              ? 'bg-black/50 border-white/10'
              : 'bg-[var(--bg-secondary)]/50 border-[var(--border)]'
              }`}>
              {navLinks.map((link) => {
                const isActive = link.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.href);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    aria-label={`Navigate to ${link.label}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      if (link.href.startsWith('/#')) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    className={`flex items-center justify-center p-2 rounded-full transition-all duration-500 relative group flex-shrink-0 ${isActive
                      ? 'bg-[var(--accent-orange)] text-white'
                      : isHomePage && !isScrolled
                        ? 'text-gray-400 hover:bg-white/10 hover:text-white'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                      }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-500 ${isActive ? 'scale-110' : ''}`} aria-hidden="true" />
                    <span className={`overflow-hidden transition-all duration-500 ease-out whitespace-nowrap font-medium text-sm ${isActive ? 'max-w-[150px] opacity-100 ml-2' : 'max-w-[150px] opacity-100 ml-2 lg:max-w-0 lg:opacity-0 lg:ml-0 lg:group-hover:max-w-[150px] lg:group-hover:opacity-100 lg:group-hover:ml-2'}`}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}

              <div className="w-px h-6 bg-[var(--border)] mx-2 flex-shrink-0" />

              <Link
                to="/contact"
                aria-label="Contact Us"
                className={`flex items-center justify-center p-2 rounded-full transition-all duration-500 relative group flex-shrink-0 ${location.pathname === '/contact'
                  ? 'bg-[var(--accent-orange)] text-white'
                  : isHomePage && !isScrolled
                    ? 'text-gray-400 hover:bg-white/10 hover:text-white'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                  }`}
              >
                <Mail className="w-5 h-5" />
                <span className={`overflow-hidden transition-all duration-500 ease-out whitespace-nowrap font-medium text-sm ${location.pathname === '/contact' ? 'max-w-[150px] opacity-100 ml-2' : 'max-w-[150px] opacity-100 ml-2 lg:max-w-0 lg:opacity-0 lg:ml-0 lg:group-hover:max-w-[150px] lg:group-hover:opacity-100 lg:group-hover:ml-2'}`}>
                  Contact Us
                </span>
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent-orange)] hover:border-[var(--accent-orange)] transition-all transform hover:scale-105"
                title="Search IDs & Profiles"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/mobile-app"
                aria-label="Download the SocioSports Mobile App for iOS and Android"
              >
                <button
                  className="btn-primary gap-3 pl-5 pr-4 py-2 flex items-center relative overflow-hidden group"
                  onMouseEnter={() => setIsGetAppHovered(true)}
                  onMouseLeave={() => setIsGetAppHovered(false)}
                  aria-label="Download App"
                >
                  <div className="flex items-center gap-2 relative z-10 text-white font-semibold">
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>Get the app</span>
                  </div>
                  <InteractiveEmoji isHovered={isGetAppHovered} />
                </button>
              </Link>
            </div>

            {/* Mobile Actions & Menu Toggle */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)]"
              >
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setIsMobileMenuOpen(true)}>
                <div className="space-y-1.5 p-2">
                  <span className="block w-6 h-0.5 bg-[var(--text-primary)]"></span>
                  <span className="block w-6 h-0.5 bg-[var(--text-primary)]"></span>
                  <span className="block w-6 h-0.5 bg-[var(--text-primary)]"></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 left-4 right-4 bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-xl animate-in fade-in slide-in-from-top-4 border border-[var(--border)] max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = link.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.href);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      if (link.href.startsWith('/#')) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-left text-lg font-medium py-3 border-b last:border-0 transition-colors"
                    style={{
                      color: isActive ? 'var(--accent-orange)' : 'var(--text-primary)',
                      borderColor: 'var(--border)'
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-lg font-medium py-3 border-b transition-colors"
                style={{
                  color: location.pathname === '/contact' ? 'var(--accent-orange)' : 'var(--text-primary)',
                  borderColor: 'var(--border)'
                }}
              >
                Contact Us
              </Link>
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full py-3 rounded-xl border border-[var(--border)] flex items-center justify-center gap-2 text-[var(--text-primary)] font-medium"
                >
                  <Search className="w-5 h-5" />
                  Search Profiles
                </button>

                <button
                  className="btn-primary w-full gap-2 justify-center"
                  onMouseEnter={() => setIsGetAppHovered(true)}
                  onMouseLeave={() => setIsGetAppHovered(false)}
                >
                  <Download className="w-4 h-4" />
                  Get the app
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navigation;
