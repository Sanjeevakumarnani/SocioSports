import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Calendar, MapPin, ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const EcosystemLiveAction = () => {
    const sectionRef = useRef<HTMLElement>(null);
    
    const [headerContent, setHeaderContent] = useState({
        label: "Live Action",
        titleLine1: "Compete.",
        titleLine2: "Conquer.",
        description: "Discover 20+ active tournaments in your city. From district rankings to corporate leagues."
    });

    const [stats, setStats] = useState([
        { value: '150+', label: 'Active Tournaments', icon: Trophy },
        { value: '50+', label: 'Cities Covered', icon: MapPin },
        { value: '10K+', label: 'Athletes Competing', icon: Calendar }
    ]);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const data = await import('../../services/api').then(m => m.api.cms.get('ecosystem-live-action'));
                if (data && data.content) {
                    const parsed = JSON.parse(data.content);
                    if (parsed.header) setHeaderContent(parsed.header);
                    if (parsed.stats) setStats(parsed.stats);
                }
            } catch (error) {
                console.error("Failed to load Ecosystem Live Action content", error);
            }
        };
        fetchContent();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.ela-header > *',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            );

            gsap.fromTo('.ela-stat',
                { opacity: 0, y: 20, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)',
                    scrollTrigger: { trigger: '.ela-stats-grid', start: 'top 85%' }
                }
            );

            gsap.fromTo('.ela-cta',
                { opacity: 0, x: -20 },
                {
                    opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
                    scrollTrigger: { trigger: '.ela-cta', start: 'top 90%' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 md:py-28 bg-[var(--bg-primary)] relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--accent-orange)]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left - Header Content */}
                    <div className="ela-header">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-1 bg-[var(--accent-orange)]" />
                            <span className="text-[var(--accent-orange)] font-black text-xs uppercase tracking-[0.2em]">
                                {headerContent.label}
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] mb-6 uppercase tracking-tighter leading-none">
                            {headerContent.titleLine1}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-orange)] to-yellow-500">
                                {headerContent.titleLine2}
                            </span>
                        </h2>

                        <p className="text-[var(--text-secondary)] text-lg font-medium max-w-md mb-8">
                            {headerContent.description}
                        </p>

                        {/* CTA */}
                        <div className="ela-cta">
                            <Link
                                to="/events"
                                className="group inline-flex items-center gap-3 bg-[var(--accent-orange)] text-white px-6 py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-[var(--accent-orange)]/90 transition-all hover:scale-[1.02]"
                            >
                                <Flame className="w-5 h-5" />
                                Explore Tournaments
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Right - Stats Grid */}
                    <div className="ela-stats-grid grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div 
                                    key={index}
                                    className="ela-stat group relative bg-[var(--bg-secondary)] rounded-2xl p-6 border border-[var(--border)] hover:border-[var(--accent-orange)]/30 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[var(--accent-orange)]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 text-[var(--accent-orange)]" />
                                    </div>
                                    <div className="text-3xl font-black text-[var(--text-primary)] mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-[var(--text-secondary)] font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Highlight Bar */}
                <div className="mt-16 p-6 bg-gradient-to-r from-[var(--accent-orange)]/10 to-yellow-500/10 border border-[var(--accent-orange)]/20 rounded-2xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-[var(--accent-orange)]" />
                            <span className="text-[var(--text-primary)] font-bold">
                                Join the competition. Build your legacy.
                            </span>
                        </div>
                        <Link 
                            to="/events" 
                            className="text-[var(--accent-orange)] font-bold text-sm uppercase tracking-wider hover:underline flex items-center gap-2"
                        >
                            View All Events
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EcosystemLiveAction;
